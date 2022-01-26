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

    let deeplink = `flashboy://ads?withdrawalId=${this.id}`;

    const root = document.createElement('div');
    root.classList.add('ccu-ads');
    root.id = 'ccu-ads-withdrawal-dialog';
    root.innerHTML = `
      <div class='fixed w-full h-full items-center justify-center' style='z-index: 999999; background-color: rgba(120, 148, 155, 0.9);'>
        <button onclick='document.body.removeChild(document.getElementById("ccu-ads-withdrawal-dialog"));'><img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close.svg' style='width: 2rem;' /></button>
        <div class='mt-1' style='max-width: 300px;'>
          <div class='w-full p-2 bg-white' style='border-radius: 1rem;'>
            <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 4rem;' />
            <span class='font-sm text-gray italic mt-1'>You earned</span>
            <div class='w-full flex-row'>
              <span class='font-bold font-xl'>${numberFormat(this.amount, 0)} satoshis</span>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/questionMark.svg' id='question-mark-button' class='cursor-pointer' style='width: 1.2rem; margin-left: 0.5rem;' />
            </div>
            <div id="ccu-ads-withdrawal-dialog-action" />
          </div>
        </div>
        <div class='w-full p-2 pt-0'>
          <span class='text-sm text-white italic mt-1 text-center'>Don't have FlashBoy?</span>
          <div class='w-full flex-row' style='margin-top: 0.5rem;'>
            <div onclick="window.open('https://testflight.apple.com/join/7Sb1ATjm')" class='flex-1' style='padding-right: 0.25rem;'>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/appStore.svg' alt='' />
            </div>
            <div onclick="window.open('https://play.google.com/store/apps/details?id=com.ccu.flashboy')" class='flex-1' style='padding-left: 0.25rem;'>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/playStore.svg' alt='' />
            </div>
          </div>
        </div>
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

    const questionMarkButtonRef = document.querySelector('#question-mark-button');
    if( questionMarkButtonRef ) {

      questionMarkButtonRef.addEventListener('click', () => {
        const aboutSato = document.createElement('div');
        aboutSato.classList.add('w-full', 'fixed', 'bg-white');
        aboutSato.style.top = 0;
        aboutSato.style.left = 0;
        aboutSato.style.zIndex = 9999999;
        aboutSato.style.paddingLeft = '1rem';
        aboutSato.style.paddingRight = '1rem';
        aboutSato.style.paddingBottom = '1rem';
        aboutSato.style.height = window.innerHeight+'px';
        aboutSato.style.overflow = 'auto';
        aboutSato.style.justifyContent = 'flex-start';

        aboutSato.innerHTML = `
        <div class='w-full h-20' style='border-bottom:solid 1px #ededed' >
          <div class='w-full max-w-xl items-end h-20'>
            <div id='about-sato-close-button' class='w-10 '>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close_white_mb.svg' class='cursor-pointer'/>
            </div>
          </div>
        </div>
        <div class='w-full p-1 max-w-xl'>
          <span class='text-2xl font-bold'>What are Satoshis?</span>
          <span class='text-md mt-6'>
            A satoshi is the <b>smallest</b> unit of the bitcoin cryptocurrency, named after its pseudonymous creator, or creators, <b>Satoshi Nakamoto.</b>
            You may have stumbled upon this page hoping to find out how many satoshis are in a bitcoin or the USD value of your satoshis. According to the software rules, each bitcoin can be subdivided into a satoshi to bitcoin ratio of 100 million to 1, meaning: 
          </span>
          <span class='text-md mt-6'>1 satoshi = 0.00000001</span>
          <span class='text-md'>or</span>
          <span class='text-md mt-2'>1 bitcoin = 100,000,000</span>
          <span class='text-md mt-6'>Of note, you will often find satoshis abbreviated as sats. </span>
        </div>
        <div class='w-full p-1 mt-8 rounded-xl max-w-xl' style='background-color: #e8f1f5' >
          <div class='w-full flex-row'>
            <div class='flex-1 items-start'>
              <span class='font-bold' style='color: #79939b' >SATOSHI</span>
              <span class='text-xs mb-1'>1</span>
              <span class='text-xs mb-1'>10</span>
              <span class='text-xs mb-1'>100</span>
              <span class='text-xs mb-1'>1,000</span>
              <span class='text-xs mb-1'>10,000</span>
              <span class='text-xs mb-1'>100,000</span>
              <span class='text-xs mb-1'>1,000,000</span>
              <span class='text-xs mb-1'>10,000,000</span>
              <span class='text-xs mb-1'>100,000,000</span>
            </div>
            <div class='flex-1 items-start'>
              <span class='font-bold' style='color: #79939b' >BITCOIN</span>
              <span class='text-xs mb-1'>0.00000001</span>
              <span class='text-xs mb-1'>0.00000010</span>
              <span class='text-xs mb-1'>0.00000100</span>
              <span class='text-xs mb-1'>0.00001000</span>
              <span class='text-xs mb-1'>0.00010000</span>
              <span class='text-xs mb-1'>0.00100000</span>
              <span class='text-xs mb-1'>0.01000000</span>
              <span class='text-xs mb-1'>0.10000000</span>
              <span class='text-xs mb-1'>1.00000000</span>
            </div>
            <div class='flex-1 items-start'>
              <span class='font-bold' style='color: #79939b' >NAME</span>
              <span class='text-xs mb-1'>Satoshi</span>
              <span class='text-xs mb-1'>-</span>
              <span class='text-xs mb-1'>Bit</span>
              <span class='text-xs mb-1'>-</span>
              <span class='text-xs mb-1'>-</span>
              <span class='text-xs mb-1'>1mBTC</span>
              <span class='text-xs mb-1'>1cBTC</span>
              <span class='text-xs mb-1'>-</span>
              <span class='text-xs mb-1'>Bitcoin</span>
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
