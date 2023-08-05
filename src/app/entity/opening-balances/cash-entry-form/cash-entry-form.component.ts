import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash-entry-form',
  templateUrl: './cash-entry-form.component.html',
  styleUrls: ['./cash-entry-form.component.scss']
})
export class CashEntryFormComponent {
  @Input() displayCashModal:boolean = false;
  @Input() cashAmount:Number = 0
  cashForm:any
  @Output() onHideDialog:EventEmitter<void> = new EventEmitter<void>();
  @Output() onSaveDialog:EventEmitter<void> = new EventEmitter<void>();
  

  constructor() {}

  ngOnInit(): void {
    this.cashForm = new FormGroup({
      amount: new FormControl('',[Validators.required])
    });
  }

  handleSaveCashForm() {

    this.cashForm.controls['amount'].touched = true

    if (this.cashForm.controls['amount'].errors ||  this.cashForm.controls['amount'].invalid) {
        const input = document.getElementById('amount');
        if (input) {
          input.classList.add('ng-dirty', 'ng-invalid');
        }
        //return
    }

    if (this.cashForm.invalid) {
      console.log('FORM IS INVALID')
      for (const controlName in this.cashForm.controls) {
          if (this.cashForm.controls.hasOwnProperty(controlName)) {
            const control = this.cashForm.controls[controlName];
            
            if (control.errors) {
              console.log(`Validation errors for control ${controlName}:`, control.errors);
            }
          }
      }
      return;
    }

    this.onSaveDialog.emit(this.cashForm)
    this.cashForm.reset()

  }

  hideDialog() {
    this.cashForm.reset()
    this.onHideDialog.emit()
  }

} 
