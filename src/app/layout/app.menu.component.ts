import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GlobalConstants } from '../global/global-constants';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    loggedOutModel: any[] = [];
    loggedInModel: any[] = [];

    GlobalConstants = GlobalConstants;

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'E-Commerce',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Banking',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/dashboard-banking']
                    }
                ]
            },
            {
                label: 'Apps',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Blog',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                            {
                                label: 'Detail',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/blog/detail']
                            },
                            {
                                label: 'Edit',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/apps/blog/edit']
                            }
                        ]
                    },
                    {
                        label: 'Calendar',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/apps/calendar']
                    },
                    {
                        label: 'Chat',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/apps/chat']
                    },
                    {
                        label: 'Files',
                        icon: 'pi pi-fw pi-folder',
                        routerLink: ['/apps/files']
                    },
                    {
                        label: 'Kanban',
                        icon: 'pi pi-fw pi-sliders-v',
                        routerLink: ['/apps/kanban']
                    },
                    {
                        label: 'Mail',
                        icon: 'pi pi-fw pi-envelope',
                        items: [
                            {
                                label: 'Inbox',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/apps/mail/inbox']
                            },
                            {
                                label: 'Compose',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/apps/mail/compose']
                            },
                            {
                                label: 'Detail',
                                icon: 'pi pi-fw pi-comment',
                                routerLink: ['/apps/mail/detail/1000']
                            }
                        ]
                    },
                    {
                        label: 'Task List',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/apps/tasklist']
                    }
                ]
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-fw pi-star-fill',
                items: [
                    {
                        label: 'Form Layout',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/uikit/formlayout']
                    },
                    {
                        label: 'Input',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/uikit/input']
                    },
                    {
                        label: 'Float Label',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['/uikit/floatlabel']
                    },
                    {
                        label: 'Invalid State',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/uikit/invalidstate']
                    },
                    {
                        label: 'Button',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/uikit/button']
                    },
                    {
                        label: 'Table',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/uikit/table']
                    },
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/uikit/list']
                    },
                    {
                        label: 'Tree',
                        icon: 'pi pi-fw pi-share-alt',
                        routerLink: ['/uikit/tree']
                    },
                    {
                        label: 'Panel',
                        icon: 'pi pi-fw pi-tablet',
                        routerLink: ['/uikit/panel']
                    },
                    {
                        label: 'Overlay',
                        icon: 'pi pi-fw pi-clone',
                        routerLink: ['/uikit/overlay']
                    },
                    {
                        label: 'Media',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/uikit/media']
                    },
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: ['/uikit/menu'],
                        routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
                    },
                    {
                        label: 'Message',
                        icon: 'pi pi-fw pi-comment',
                        routerLink: ['/uikit/message']
                    },
                    {
                        label: 'File',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/uikit/file']
                    },
                    {
                        label: 'Chart',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/uikit/charts']
                    },
                    {
                        label: 'Misc',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/uikit/misc']
                    }
                ]
            },
            {
                label: 'Prime Blocks',
                icon: 'pi pi-fw pi-prime',
                items: [
                    {
                        label: 'Free Blocks',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/blocks']
                    },
                    {
                        label: 'All Blocks',
                        icon: 'pi pi-fw pi-globe',
                        url: ['https://www.primefaces.org/primeblocks-ng'],
                        target: '_blank'
                    }
                ]
            },
            {
                label: 'Utilities',
                icon: 'pi pi-fw pi-compass',
                items: [
                    {
                        label: 'PrimeIcons',
                        icon: 'pi pi-fw pi-prime',
                        routerLink: ['utilities/icons']
                    },
                    {
                        label: 'Colors',
                        icon: 'pi pi-fw pi-palette',
                        routerLink: ['utilities/colors']
                    },
                    {
                        label: 'PrimeFlex',
                        icon: 'pi pi-fw pi-desktop',
                        url: ['https://www.primefaces.org/primeflex/'],
                        target: '_blank'
                    },
                    {
                        label: 'Figma',
                        icon: 'pi pi-fw pi-pencil',
                        url: ['https://www.figma.com/file/zQOW0XBXdCTqODzEOqwBtt/Preview-%7C-Apollo-2022?node-id=335%3A21768&t=urYI89V3PLNAZEJG-1/'],
                        target: '_blank'
                    }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Register',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/auth/register']
                            },
                            {
                                label: 'Forgot Password',
                                icon: 'pi pi-fw pi-question',
                                routerLink: ['/auth/forgotpassword']
                            },
                            {
                                label: 'New Password',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/auth/newpassword']
                            },
                            {
                                label: 'Verification',
                                icon: 'pi pi-fw pi-envelope',
                                routerLink: ['/auth/verification']
                            },
                            {
                                label: 'Lock Screen',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/auth/lockscreen']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Invoice',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/pages/invoice']
                    },
                    {
                        label: 'About Us',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/aboutus']
                    },
                    {
                        label: 'Help',
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: ['/pages/help']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                    {
                        label: 'FAQ',
                        icon: 'pi pi-fw pi-question',
                        routerLink: ['/pages/faq']
                    },
                    {
                        label: 'Contact Us',
                        icon: 'pi pi-fw pi-phone',
                        routerLink: ['/pages/contact']
                    }
                ]
            },
            {
                label: 'E-Commerce',
                icon: 'pi pi-fw pi-wallet',
                items: [
                    {
                        label: 'Product Overview',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['ecommerce/product-overview']
                    },
                    {
                        label: 'Product List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['ecommerce/product-list']
                    },
                    {
                        label: 'New Product',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['ecommerce/new-product']
                    },
                    {
                        label: 'Shopping Cart',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['ecommerce/shopping-cart']
                    },
                    {
                        label: 'Checkout Form',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['ecommerce/checkout-form']
                    },
                    {
                        label: 'Order History',
                        icon: 'pi pi-fw pi-history',
                        routerLink: ['ecommerce/order-history']
                    },
                    {
                        label: 'Order Summary',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['ecommerce/order-summary']
                    }
                ]
            },
            {
                label: 'User Management',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['profile/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['profile/create']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 1.1.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 1.1.2',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 1.1.3',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 1.2.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 2.1.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 2.1.2',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 2.2.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Start',
                icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Buy Now',
                        icon: 'pi pi-fw pi-shopping-cart',
                        url: ['https://www.primefaces.org/store']
                    },
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-info-circle',
                        routerLink: ['/documentation']
                    }
                ]
            }
        ];
        this.loggedOutModel = [
            {
                label: 'Main',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Products',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/xetaproducts'],
                        //command: () => this.setCurrentComponent('Dashboard',''),
                        // routerLink: ['/']
                    },
                    {
                        label: 'About',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/xetaabout'] 
                        // routerLink: ['/dashboard-banking']
                    },
                    {
                        label: 'Contact',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/dashboard-banking']
                    }

                ]
            }
        ];

        this.loggedInModel = [
            {
                label: 'Contacts',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Contacts',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/contacts'],
                    }
                ]
            },
            // {
            //     label: 'Messages',
            //     icon: 'pi pi-fw pi-at',
            //     items: [
            //         {
            //             label: 'Messages',
            //             icon: 'pi pi-fw pi-at',
            //             routerLink: ['/messages']
            //         },
            //         {
            //             label: 'Recipients',
            //             icon: 'pi pi-fw pi-at',
            //             routerLink: ['/recipients']
            //         }
            //     ]
            // },
            // {
            //     label: 'Orders',
            //     icon: 'pi pi-fw pi-sync',
            //     items: [
            //         {
            //             label: 'Orders',
            //             icon: 'pi pi-fw pi-sync',
            //         }
            //     ]
            // },
            // {
            //     label: 'Tasks',
            //     icon: 'pi pi-fw pi-check-square',
            //     items: [
            //         {
            //             label: 'Tasks',
            //             icon: 'pi pi-fw pi-check-square',
            //         }
            //     ]
            // },
            // {
            //     label: 'Accounting',
            //     icon: 'pi pi-fw pi-book',
            //     items: [
            //         {
            //             label: 'Sales',
            //             icon: 'pi pi-fw pi-align-left',
            //         }
            //     ]
            // },
            {
                label: 'Accounts',
                icon: 'pi pi-fw pi-building',
                items: [
                    {
                        label: 'Sales',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales'],
                    },
                    {
                        label: 'Purchases',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/purchase'],
                    },
                    {
                        label: 'Sale Return',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales-return'],
                    },
                    {
                        label: 'Purcheses Return',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/purchasereturn'],
                    },
                    {
                        label: 'Payments',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales'],
                    },
                    {
                        label: 'Receipts',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales'],
                    },
                    {
                        label: 'Bank Reconcilation',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales'],
                    },
                    {
                        label: 'Production',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales'],
                    },
                    {
                        label: 'Consumption',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales'],
                    },
                    {
                        label: 'Journal Voucher',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/journal-voucher'],
                    },
                    {
                        label: 'Line Production',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales'],
                    },
                    {
                        label: 'Conversion',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/sales'],
                    },
                    {
                        label: 'Transfer',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/account/transfer'],
                    },
                    {
                        label: 'New Journal Voucher',
                        icon: 'pi pi-link',
                        routerLink: ['/account/new-journal-voucher'],
                    }
                    
                ]
            },
            {
                label: 'Entity',
                icon: 'pi pi-fw pi-building',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-users',
                        routerLink: ['/entity/profile'],
                    },                           
                    {
                        label: 'Party Accounts heads',
                        icon: 'pi pi-user',
                        routerLink: ['/entity/partyAccount'],
                    },
                    {
                        label: 'Others Accounts heads',
                        icon: 'pi pi-user',
                        routerLink: ['/entity/othersAccount'],
                    },
                       {

                        label: 'Items',
                        icon: 'pi pi-list',
                        routerLink: ['/entity/item'],
                    },
                    {
                        label: 'UOMs',
                        icon: 'pi pi-user',
                        routerLink: ['/entity/UOMs'],
                    },
                    {
                        label: 'Write Cheque',
                        icon: 'pi pi-link',
                        routerLink: ['/entity/writeCheque'],
                    },
                    {
                        label: 'Recieve Cheque',
                        icon: 'pi pi-link',
                        routerLink: ['/entity/recieveCheque'],
                    },
                    {
                        label: 'Tags',
                        icon: 'pi pi-tags',
                        routerLink: ['/entity/tags'],
                    },
                    {
                        label: 'Item Levels',
                        icon: 'pi pi-list',
                        routerLink: ['/entity/itemLevels'],
                    },
                    {
                        label: 'Stock Locations',
                        icon: 'pi pi-map',
                        routerLink: ['/entity/stockLocations'],
                    },
                    {
                        label: 'Opening Balances',
                        icon: 'pi pi-credit-card',
                        routerLink: ['/entity/openingBalance'],
                    }
                ]
            },
            {
                label: 'Reports',
                icon: 'pi pi-fw pi-percentage',
                items: [
                    {
                        label: 'General Ledger',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/generalLedger'],
                    },
                    {
                        label: 'Trial Balance',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/openingBalance'],
                    },
                    {
                        label: 'Stock Register',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/stockRegister'],
                    },
                    {
                        label: 'Trailing Final Accounts',
                        icon: 'pi pi-book',
                        routerLink: ['/report/trailingFinalAccount'],
                    },
                    {
                        label: 'Recipe Cost List',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/openingBalance'],
                    },
                    {
                        label: 'Final Accounts',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/openingBalance'],
                    },
                    {
                        label: 'Item Movement Register',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/openingBalance'],
                    },
                    {
                        label: 'Sale Invoice Ageing List',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/openingBalance'],
                    },
                    {
                        label: 'Purchase Invoice Ageing List',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/openingBalance'],
                    },
                    {
                        label: 'Resource Tracker',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: ['/report/openingBalance'],
                    },
                ]
            },
            {
                label: 'Products',
                icon: 'pi pi-fw pi-th-large',
                items: [
                    {
                        label: 'Products',
                        icon: 'pi pi-fw pi-th-large',
                         routerLink: ['/products'],
                    }
                ]
            },
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-chart-line',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: ['/dashboard']
                    }
                ]
            },
            // {
            //     label: 'Automation',
            //     icon: 'pi pi-fw pi-sliders-v',
            //     items: [
            //         {
            //             label: 'Automation',
            //             icon: 'pi pi-fw pi-sliders-v',
            //         }
            //     ]
            // }
        ]
    }
}
