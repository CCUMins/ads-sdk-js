/* modules */
import { API_ads, API_analytics } from './Api';
import Withdrawal from './Withdrawal';

/* utils */
import { isMobile, isAndroid, isIOS, numberFormat } from './Utils';

/* styles */
import './styles.scss';

export default class CCUAds {

  constructor(apiKey) {
    window.ads_api_key = apiKey;
  }

  /* actions */
  async requestAndShowAd() {
    if( !window.ads_api_key ) {
      console.warn(`ADS SDK Error: Api key is not defined, initialize the sdk before requesting an ad`);
      return;
    }
    let response = await API_ads.requestRewardedVideo({
      platform: isAndroid() ? 'android' : isIOS() ? 'ios' : 'desktop'
    });
    if( response && response.streamToken ) {
      this.showAd(response);
      return;
    };
    console.warn(`ADS SDK Error: Unable to request an ad. Try again later`);
  }

  /* ui */
  showAd(token) {

    let streamURL = token.streamURL;
    let media = token.media;
    let template = media.template;
    if( template == 'PARTIAL_SCREEN' && !isMobile() ) {
      template = 'FULL_SCREEN';
    }

    let parsedAction = media.action;
    parsedAction = parsedAction.split('://')[1];
    parsedAction = parsedAction.split('?')[0];

    let cta = `https://api.flashboy.com/ads/sdk/rewardedVideo/streamClicked.php?token=${encodeURIComponent(token.streamToken)}&action=${encodeURIComponent(media.action)}`;

    const root = document.createElement('div');
    root.classList.add('ccu-ads');
    root.id = 'ccu-ads-player-dialog';
    if( template == 'FULL_SCREEN' && !isMobile()) {
      root.innerHTML = `
        <div class='fixed w-full h-full items-center justify-center bg-black' style='z-index: 999999999;'>
        <div class='w-full h-full items-center justify-between'>
          <div id='ccu-ads-player-container-id' class='w-full flex-1 items-center justify-center'>
            <div class='absolute cursor-pointer' id='ccu-ads-close-ad-button' style='width: 1.5rem; height: 1.5rem; top: 1.5rem; right: 1.5rem;' >
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close_white.svg'/>
            </div>
            <video id='ccu-ads-player-video-id' />
          </div>
          <div id='ccu-ads-player-banner' class='w-full max-w-7xl items-center justify-center bg-white' style='height: 100px; border-radius: 2rem 2rem 0 0; padding: 0 1rem'>
            <div class='w-full h-full items-center justify-center flex-row justify-between'>
              <div class='flex-row justify-start absolute' style='top: -1rem'>
                <span class='${isMobile() ? 'font-xs' : 'font-sm'} text-white text-center bg-light-blue' style='padding: 5px 10px; border-radius: 1000px;'>Ad</span>
              </div>
              <div class='h-full items-center justify-center flex-row'>
                <div class='flex-row ml-2'>
                  <img class='${media.logo ? 'mr-2' : ''}' src='${media.logo}' style='display: ${media.logo ? 'block' : 'none'}; width: 4rem; height: 4rem; border-radius: 2.5rem; object-fit: cover;' />
                  <div class='items-start'>
                    <span class='${isMobile() ? 'font-base' : 'font-sm'} font-bold italic'>${media.name}</span>
                    <span class='${isMobile() ? 'font-xs' : 'font-sm'} text-gray'>${parsedAction}</span>
                  </div>
                  <button onclick='window.open("${cta}")' class='flex ml-1 bg-green flex-row' style='padding: 0.3rem 1rem; border-radius: 100px;'>
                    <span class='uppercase text-white font-xs spacing'>Open Link</span>
                    <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/open.svg' style='width: 15px; height: 15px; margin-left: 0.5rem;' />
                  </button>
                </div>
              </div>
              <div class='items-center justify-center flex-row bg-gray' style='height: 2.8rem; border-radius: 1.5rem; padding-right: 0.5rem;'>
                <div>
                  <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 34px; height: 34px;' />
                  <svg><circle id='ccu-countdown' r='18' cx='20' cy='20'></circle></svg>
                </div>
                <span class='${isMobile() ? 'font-xs' : 'font-sm'} ml-1'><span class='font-bold'>${numberFormat(media.reward, 0)} SATs</span> will be yours in <span id='ccu-ads-player-timer'></span> seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    } else {
      root.innerHTML = `
      <div class='fixed w-full h-full items-center justify-center bg-black' style='z-index: 999999999;'>
        <div class='w-full h-full items-center justify-center'>
          <div id='ccu-ads-player-container-id' class='w-full items-center justify-center'>
            <video id='ccu-ads-player-video-id' />
          </div>
          <div id='ccu-ads-player-banner' class='w-full items-center justify-center bg-white' style='flex: 1;'>
            <div class='w-full h-full items-center justify-center'>
              <div class='w-full px-1 flex-row justify-start' style='height: 3.5rem; border-bottom: 1px solid #799499;'>
                <span class='font-sm text-white text-center bg-light-blue' style='padding: 5px 10px; border-radius: 1000px;'>Ad</span>
                <span class='font-xs ml-1 font-bold'>${parsedAction}</span>
                <div id='ccu-ads-close-ad-button-mobile' style='width: 1.5rem; height: 1.5rem; margin-left: auto;'>
                  <img class='w-full' src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close_white_mb.svg'/>
                </div>
              </div>
              <div class='w-90 h-full items-center justify-center'>
                <div class='mt-2'>
                  <img class='${media.logo ? 'mb-2' : ''}' src='${media.logo}' style='width: ${media.logo ? '4rem;' : '0;'} height: ${media.logo ? '4rem;' : '0;'} border-radius: 2.5rem; object-fit: cover;' />
                  <span class='${isMobile() ? 'text-center' : 'text-left' } font-lg font-bold italic'>${media.name}</span>
                  <span class='font-sm text-gray'>${parsedAction}</span>
                  <button onclick='window.open("${cta}")' class='flex mt-1 bg-green flex-row' style='padding: 0.3rem 1rem; border-radius: 100px;'>
                    <span class='uppercase text-white font-xs spacing'>Open Link</span>
                    <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/open.svg' style='width: 15px; height: 15px; margin-left: 0.5rem;' />
                  </button>
                </div>
              </div>
              <div class='items-center justify-center flex-row bg-gray ${isMobile() ? 'mb-1' : ''}' style='height: 2.8rem; border-radius: 1.5rem; padding-right: 0.5rem;'>
                <div>
                  <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 34px; height: 34px;' />
                  <svg><circle id='ccu-countdown' r='18' cx='20' cy='20'></circle></svg>
                </div>
                <span class=' font-sm ml-1'><span class='font-bold'>${numberFormat(media.reward, 0)} SATs</span> will be yours in <span id='ccu-ads-player-timer'></span> seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
`
    }
    document.body.append(root);

    const onStreamError = async () => {
      console.warn(`ADS SDK Error: Unable to show the ad. Try again later`);
      document.body.removeChild(root);
      await API_ads.streamError({
        token: token.streamToken
      });
    }

    let video = document.getElementById('ccu-ads-player-video-id');
    if( video ) {

      video.setAttribute('playsinline', '');
      video.style.cssText = `object-fit: contain;`;
      video.src = streamURL;
      video.loop = false;
      video.autoplay = false;
    }
    video.onloadedmetadata = async () => {

      let viewHeight = window.innerHeight - 100 // banner height in full screen mode;
      if( template == 'FULL_SCREEN' && viewHeight <= video.videoHeight ) {
        video.style.height = `${viewHeight}px`;
      }
      if( isMobile() && video.videoHeight > video.videoWidth ) {
        video.style.height = `${viewHeight / 2}px`;
      }

      let response = await API_ads.streamStarted({
        token: token.streamToken
      });
      if( response && response.serverStatus == 'SUCCESS' ) {
        video.play();
        document.getElementById('ccu-countdown').style.webkitAnimationName = 'countdown';
        document.getElementById('ccu-countdown').style.animationName = 'countdown';
        document.getElementById('ccu-countdown').style.webkitAnimationDuration = `${video.duration}s`;
        document.getElementById('ccu-countdown').style.animationDuration = `${video.duration}s`;

      } else {
        onStreamError();
      }
    }
    video.ontimeupdate = () => {
      const timer = document.getElementById('ccu-ads-player-timer');
      if( timer ) {
        timer.innerHTML = Math.ceil(video.duration - video.currentTime);
      }
    }
    video.onended = async (e) => {
      if( e && e.isTrusted ) {
        document.body.removeChild(root);
        let response = await API_ads.streamEnded({
          token: token.streamToken
        });
        if( response && response.serverStatus == 'SUCCESS' && response.pendingWithdrawal ) {
          let reward = new Withdrawal({ id: response.pendingWithdrawal.id, amount: response.pendingWithdrawal.amount, action: `https://api.flashboy.com/ads/sdk/rewardedVideo/streamClicked.php?token=${encodeURIComponent(token.streamToken)}&action=${encodeURIComponent(token.action)}` });
          reward.show();
        } else {
          console.warn(`ADS SDK Error: Unable to get reward`);
        }
      }
    }

    const closeButton = document.querySelector('#ccu-ads-close-ad-button') || document.querySelector('#ccu-ads-close-ad-button-mobile');
    if( closeButton ) {
      closeButton.addEventListener('click', () => {
        video.pause();
        document.body.removeChild(root);
      })
    }

    video.onerror = () => {
      onStreamError();
    }

  }

}

global.CCUAds = CCUAds;
