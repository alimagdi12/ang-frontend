import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  public payPalConfig: any;
  public showPaypalButtons!: boolean;

  showSuccess: boolean = false;
  cartTotal: number = 0;

  constructor(private router: Router) {}

  //////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.payPalConfig = {
      currency: 'EUR',
      clientId:
        'AYvU7p49APJ3TWCP7EPq6Z1Sm7LijDirPdDI-G6DjNasJ2tyIVCwb0IZL1v5cKy_tw7qPr_2ybS62gCR',
      createOrder: () =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: '9.99',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data: any, actions: any) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data: any) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data: any, actions: any) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err: any) => {
        console.log('OnError', err);
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
      },
    };

    // this.initConfig();
    const cartTotalFromLocalStorage = localStorage.getItem('cart_total');
    console.log(cartTotalFromLocalStorage);

    this.cartTotal = cartTotalFromLocalStorage
      ? parseFloat(cartTotalFromLocalStorage)
      : 0;
    console.log(this.cartTotal);
  }

  pay() {
    this.showPaypalButtons = true;
  }

  back() {
    this.showPaypalButtons = false;
  }
  goBackToSuccess() {
    this.router.navigate(['success']);
  }

  // private initConfig(): void {
  //   this.payPalConfig = {
  //     currency: 'EUR',
  //     clientId:
  //       'ASeS9mqnwYJs_Qlij4odlQerHzVh66xUb6RisyQUU6Ag_SarhxjRhf28qIHKnwkKfBk2R69Aobve_pTF',
  //     createOrderOnClient: (data) =>
  //       <ICreateOrderRequest>{
  //         intent: 'CAPTURE',
  //         purchase_units: [
  //           {
  //             amount: {
  //               currency_code: 'EUR',
  //               value: `${this.cartTotal}`,
  //               breakdown: {
  //                 item_total: {
  //                   currency_code: 'EUR',
  //                   value: `${this.cartTotal}`,
  //                 },
  //               },
  //             },
  //             items: [
  //               {
  //                 name: 'Enterprise Subscription',
  //                 quantity: '1',
  //                 category: 'DIGITAL_GOODS',
  //                 unit_amount: {
  //                   currency_code: 'EUR',
  //                   value: `${this.cartTotal}`,
  //                 },
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     advanced: {
  //       commit: 'true',
  //     },
  //     style: {
  //       label: 'paypal',
  //       layout: 'vertical',
  //     },
  //     onApprove: (data, actions) => {
  //       console.log(
  //         'onApprove - transaction was approved, but not authorized',
  //         data,
  //         actions
  //       );
  //       actions.order.get().then((details: any) => {
  //         console.log(
  //           'onApprove - you can get full order details inside onApprove: ',
  //           details
  //         );
  //       });
  //     },
  //     onClientAuthorization: (data) => {
  //       console.log(
  //         'onClientAuthorization - you should probably inform your server about completed transaction at this point',
  //         data
  //       );
  //       if (data.status === 'COMPLETED') {
  //         this.router.navigate(['/success']);
  //       }
  //       this.showSuccess = true;
  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);
  //     },
  //     onError: (err) => {
  //       console.log('OnError', err);
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //     },
  //   };
  // }
  // goBackToSuccess() {
  //   this.router.navigate(['/']);
  // }
}
