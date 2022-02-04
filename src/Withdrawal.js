/* utils */
import { numberFormat, isMobile } from './Utils';

/* styles */
import './styles.scss';

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

    let deeplink = `btcwallet://ads?withdrawalId=${this.id}`;

    const root = document.createElement('div');
    root.classList.add('ccu-ads');
    root.id = 'ccu-ads-withdrawal-dialog';
    root.innerHTML = `
      <div class='ads-style-fixed ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center' style='z-index: 999999; background-color: rgba(120, 148, 155, 0.9);'>
      <div class='ads-style-items-end' style='width: 300px;'>
        <button onclick='document.body.removeChild(document.getElementById("ccu-ads-withdrawal-dialog"));' style='background: none; border: none;'><img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close.svg' style='width: 32px; ' /></button>
      </div>
        <div class='ads-style-mt-1' style='max-width: 300px;'>
          <div class='ads-style-w-full ads-style-p-2 ads-style-bg-white ads-style-items-center' style='border-radius: 16px;'>
            <div class='ads-style-absolute' style='top: -40px; background-color: #003359; padding: 8px; border-radius: 5px;'>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/rewards.svg' style='width: 50px;' />
            </div>
            <span class='ads-style-font-sm ads-style-text-gray ads-style-mt-1 ads-style-uppercase' style='color: #003359;'>Congratulations</span>
            <span class='ads-style-font-lg ads-style-text-gray ads-style-font-bold ads-style-uppercase' style='color: #003359;'>you have earned</span>
            <div class='ads-style-w-full ads-style-flex-row ads-style-justify-center ads-style-mt-1'>
              <span class='ads-style-font-bold ads-style-font-2xl' style='color: #003359; line-height: 1;'>${numberFormat(this.amount, 0)}</span>
            </div>
            <div class='ads-style-w-full ads-style-flex-row'>
              <span class='ads-style-font-sm ads-style-uppercase'>satoshis</span>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/questionMark.svg' id='question-mark-button' class='ads-style-cursor-pointer' style='width: 15px; margin-left: 8px;' />
            </div>
            <div id="ccu-ads-withdrawal-dialog-action" class='ads-style-w-full' ></div>
            <span class='ads-style-font-xs ads-style-mt-1 ads-style-text-center' style='color: #859ea5;'><b>BTCWallet is the Bitcoin wallet by Sato,</b> a public blockchain company listed on the TSX.V</span>
          </div>
        </div>
        <div class='ads-style-w-full ads-style-p-2 ads-style-pt-0' style='max-width: 300px;'>
          <span class='ads-style-text-sm ads-style-text-white ads-style-italic ads-style-mt-1 ads-style-text-center'>Don't have BTCWallet by SATO?</span>
          <div class='ads-style-w-full ads-style-flex-row' style='margin-top: 8px;'>
            <div onclick="window.open('https://apps.apple.com/us/app/btcwallet-by-sato/id1608434283')" class='ads-style-flex-1' style='padding-right: 4px;'>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/appStore.svg' alt='' />
            </div>
            <div onclick="window.open('https://play.google.com/store/apps/details?id=com.ccu.btcwallet')" class='ads-style-flex-1' style='padding-left: 4px;'>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/playStore.svg' alt='' />
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.append(root);

    if( isMobile() ) {
      document.getElementById('ccu-ads-withdrawal-dialog-action').innerHTML = `
        <button onclick='window.open("${deeplink}")' class='ads-style-bg-green ads-style-mt-1 ads-style-w-full' style='padding: 10px 16px; border-radius: 8px;'><span class='ads-style-text-sm ads-style-text-white ads-style-uppercase ads-style-spacing'>Claim in BTCWallet</span></button>
      `;
    } else {
      document.getElementById('ccu-ads-withdrawal-dialog-action').innerHTML = `
        <span class='ads-style-font-sm ads-style-text-gray ads-style-italic ads-style-text-center ads-style-mt-2'>Scan this QR with BTCWallet by SATO app to claim the withdrawal.</span>
        <img src='https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(deeplink)}&chs=250x250&chld=L|0' />
      `;
    }

    const questionMarkButtonRef = document.querySelector('#question-mark-button');
    if( questionMarkButtonRef ) {

      questionMarkButtonRef.addEventListener('click', () => {
        const aboutSato = document.createElement('div');
        aboutSato.classList.add('ads-style-w-full', 'ads-style-fixed', 'ads-style-bg-white', 'ads-style-items-center');
        aboutSato.style.top = 0;
        aboutSato.style.left = 0;
        aboutSato.style.zIndex = 9999999;
        aboutSato.style.paddingLeft = '16px';
        aboutSato.style.paddingRight = '16px';
        aboutSato.style.paddingBottom = '16px';
        aboutSato.style.height = window.innerHeight+'px';
        aboutSato.style.overflow = 'auto';
        aboutSato.style.justifyContent = 'flex-start';

        aboutSato.innerHTML = `
        <div class='ads-style-w-full ads-style-h-20 ads-style-items-center' style='border-bottom:solid 1px #ededed' >
          <div class='ads-style-w-full ads-style-max-w-xl ads-style-items-end ads-style-h-20 ads-style-justify-center'>
            <div id='about-sato-close-button' class='ads-style-w-10 '>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close_white_mb.svg' class='ads-style-cursor-pointer'/>
            </div>
          </div>
        </div>
        <div class='ads-style-w-full ads-style-p-1 ads-style-max-w-xl'>
          <span class='ads-style-text-2xl ads-style-font-bold'>What are Satoshis?</span>
          <span class='ads-style-text-md ads-style-mt-6'>
            A satoshi is the <b>smallest</b> unit of the bitcoin cryptocurrency, named after its pseudonymous creator, or creators, <b>Satoshi Nakamoto.</b>
            You may have stumbled upon this page hoping to find out how many satoshis are in a bitcoin or the USD value of your satoshis. According to the software rules, each bitcoin can be subdivided into a satoshi to bitcoin ratio of 100 million to 1, meaning:
          </span>
          <span class='ads-style-text-md ads-style-mt-6'>1 satoshi = 0.00000001</span>
          <span class='ads-style-text-md'>or</span>
          <span class='ads-style-text-md ads-style-mt-2'>1 bitcoin = 100,000,000</span>
          <span class='ads-style-text-md ads-style-mt-6'>Of note, you will often find satoshis abbreviated as sats. </span>
        </div>
        <div class='ads-style-w-full ads-style-p-1 ads-style-mt-8 ads-style-rounded-xl ads-style-max-w-xl' style='background-color: #e8f1f5' >
          <div class='ads-style-w-full ads-style-flex-row'>
            <div class='ads-style-flex-1 ads-style-items-start'>
              <span class='ads-style-font-bold' style='color: #79939b' >SATOSHI</span>
              <span class='ads-style-text-xs ads-style-mb-1'>1</span>
              <span class='ads-style-text-xs ads-style-mb-1'>10</span>
              <span class='ads-style-text-xs ads-style-mb-1'>100</span>
              <span class='ads-style-text-xs ads-style-mb-1'>1,000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>10,000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>100,000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>1,000,000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>10,000,000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>100,000,000</span>
            </div>
            <div class='ads-style-flex-1 ads-style-items-start'>
              <span class='ads-style-font-bold' style='color: #79939b' >BITCOIN</span>
              <span class='ads-style-text-xs ads-style-mb-1'>0.00000001</span>
              <span class='ads-style-text-xs ads-style-mb-1'>0.00000010</span>
              <span class='ads-style-text-xs ads-style-mb-1'>0.00000100</span>
              <span class='ads-style-text-xs ads-style-mb-1'>0.00001000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>0.00010000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>0.00100000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>0.01000000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>0.10000000</span>
              <span class='ads-style-text-xs ads-style-mb-1'>1.00000000</span>
            </div>
            <div class='ads-style-flex-1 ads-style-items-start'>
              <span class='ads-style-font-bold' style='color: #79939b' >NAME</span>
              <span class='ads-style-text-xs ads-style-mb-1'>Satoshi</span>
              <span class='ads-style-text-xs ads-style-mb-1'>-</span>
              <span class='ads-style-text-xs ads-style-mb-1'>Bit</span>
              <span class='ads-style-text-xs ads-style-mb-1'>-</span>
              <span class='ads-style-text-xs ads-style-mb-1'>-</span>
              <span class='ads-style-text-xs ads-style-mb-1'>1mBTC</span>
              <span class='ads-style-text-xs ads-style-mb-1'>1cBTC</span>
              <span class='ads-style-text-xs ads-style-mb-1'>-</span>
              <span class='ads-style-text-xs ads-style-mb-1'>Bitcoin</span>
            </div>
          </div>
        </div>
      `
        root.append(aboutSato)

        const aboutSatoClose = document.querySelector('#about-sato-close-button');
        aboutSatoClose.addEventListener('click', () => {
          aboutSato.remove();
        })
      })
    }
  }

}
