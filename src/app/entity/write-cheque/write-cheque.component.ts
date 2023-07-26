import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { PeopleService } from 'src/app/services/people.service';
import { Xetaerror } from 'src/app/global/xetaerror';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { Search } from 'src/app/services/search';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InvoiceListService } from 'src/app/services/invoice-list.service';
import { ChequesOfPersonService } from 'src/app/services/cheques-of-person.service';
import { SavePaymentService } from 'src/app/services/save-payment.service';
import { SaveReceiptService } from 'src/app/services/save-receipt.service';
import { ChequeListService } from 'src/app/services/cheque-list.service';
import { SaveChequeService } from 'src/app/services/save-cheque.service';
import { GlobalConstants } from 'src/app/global/global-constants';
import { Table } from 'primeng/table';
@Component({
    selector: 'app-write-cheque',
    templateUrl: './write-cheque.component.html',
    styleUrls: ['./write-cheque.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class WriteChequeComponent {
    constructor(
        private router: Router,
        private eventBusService: EventBusServiceService,
        private httpClient: HttpClient,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    selectedDate: Date = new Date();
    lo: any;
    displayModal = false;
    displayViewModal = false;

    chequeList: any[] = [];
    inProgress: boolean = false;
    private _invSub: any;
    totalRecords: number = 0;

    selectedBankParty: any;
    filteredBankParties: any[] = new Array();
    private _bpSub: any;
    @ViewChild('selectBankParty') selectBankParty: any;
    placeholderBankParty = 'select bank';

    selectedParty: any;
    filteredParties: any[] = new Array();
    private _pSub: any;
    @ViewChild('selectParty') selectParty: any;
    placeholderParty = 'select party';

    navigateToCreateItems() {
        this.router.navigate(['entity/writtenChequecreate']);
    }

    showModalDialog() {
        this.selectedDate = new Date();
        this.selectedParty = null;
        this.selectedBankParty = null;

        this.displayModal = true;
    }
    navigateToCreateItems1() {
        this.router.navigate(['entity/writtenChequecreate']);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    ngOnInit(): void {
        this.lo = GlobalConstants.loginObject;
        this.loadCheques(0, 0);
    }

    loadCheques(offset: number, moreoffset: number) {
        this.inProgress = true;

        let ahlService: ChequeListService = new ChequeListService(
            this.httpClient
        );
        let criteria: any = { draweeis: 'ourbank', offset: moreoffset };
        console.log('CRITERIA', criteria);
        this._invSub = ahlService.fetchCheques(criteria).subscribe({
            complete: () => {
                console.info('complete');
            },
            error: (e) => {
                this.inProgress = false;
                this.confirm(
                    'A server error occured while fetching cheques. ' +
                        e.message
                );
                return;
            },
            next: (v) => {
                console.log('NEXT', v);
                if (v.hasOwnProperty('error')) {
                    let dataError: Xetaerror = <Xetaerror>v;
                    this.confirm(dataError.error);
                    this.inProgress = false;
                    return;
                } else if (v.hasOwnProperty('success')) {
                    let dataSuccess: XetaSuccess = <XetaSuccess>v;
                    this.chequeList = [];
                    this.chequeList = dataSuccess.success;
                    this.totalRecords = this.chequeList.length;
                    console.log('TOTAL RECORDS', this.totalRecords);
                    // this.items = this.masterCopy.slice(offset,this.recordsPerPage+offset);

                    this.inProgress = false;
                    return;
                } else if (v == null) {
                    this.inProgress = false;
                    this.confirm(
                        'A null object has been returned. An undefined error has occurred.'
                    );
                    return;
                } else {
                    //alert('An undefined error has occurred.')
                    this.inProgress = false;
                    this.confirm('An undefined error has occurred.');
                    return false;
                }
            },
        });
    }

    confirm(msg: string) {
        this.confirmationService.confirm({
            header: 'Error',
            message: msg,
            acceptVisible: true,
            rejectVisible: false,
            acceptLabel: 'Ok',
            accept: () => {
                //Actual logic to perform a confirmation
            },
        });
    }
}
