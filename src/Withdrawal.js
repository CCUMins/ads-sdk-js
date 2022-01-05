/* utils */
import { numberFormat, isMobile } from './Utils';

/* styles */
import './styles.css';

export default class Withdrawal {

  constructor({ id, amount = 0, action }) {
    this.id = id;
    this.amount = amount;
    this.action = action;
  }

  show() {
    let oldChild = document.querySelector('#ccu-ads-withdrawal-dialog');
    if( oldChild ) {
      document.body.removeChild(oldChild);
    }

    let deeplink = `flashboy://ads?withdrawalId=${this.id}`;

    const root = document.createElement('div');
    root.classList.add('ccu-ads');
    root.id = 'ccu-ads-withdrawal-dialog';
    root.innerHTML = `
      <div class='fixed w-full h-full items-center justify-center' style='z-index: 999999999; background-color: rgba(234, 241, 245, 0.8);'>
        <button onclick='document.body.removeChild(document.getElementById("ccu-ads-withdrawal-dialog"));'><img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close.svg' style='width: 2rem;' /></button>
        <div class='bg-white p-2 mt-1' style='border-radius: 1rem; max-width: 300px;'>
          <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 4rem;' />
          <span class='font-sm text-gray italic mt-1'>You earned</span>
          <span class='font-bold font-xl'>${numberFormat(this.amount, 0)} satoshis</span>
          <div id="ccu-ads-withdrawal-dialog-action" />
        </div>
        <span class='text-sm text-gray italic mt-2 text-center'>Don't have FlashBoy? <span class='font-bold'><a class='underline' href='https://www.flashboy.com' target='_blank'>Download now.</a></span></span>
      </div>
    `;
    document.body.append(root);

    if( isMobile() ) {
      document.getElementById('ccu-ads-withdrawal-dialog-action').innerHTML = `
        <button onclick='window.open("${deeplink}")' class='bg-green mt-1' style='padding: 0.5rem 1rem; border-radius: 100px;'><span class='font-bold text-sm text-white uppercase spacing'>Claim on flashboy</span></button>
      `;
    } else {
      document.getElementById('ccu-ads-withdrawal-dialog-action').innerHTML = `
        <span class='font-sm text-gray italic text-center mt-2'>Scan this QR with FlashBoy app to claim the withdrawal.</span>
        <img src='https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(deeplink)}&chs=250x250&chld=L|0' />
      `;
    }
  }

}
