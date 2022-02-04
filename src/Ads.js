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

    let cta = `https://api.bysato.com/ads/sdk/rewardedVideo/streamClicked.php?token=${encodeURIComponent(token.streamToken)}&action=${encodeURIComponent(media.action)}`;

    const root = document.createElement('div');
    root.classList.add('ccu-ads');
    root.id = 'ccu-ads-player-dialog';
    if( template == 'FULL_SCREEN' && !isMobile()) {
      root.innerHTML = `
        <div class='ads-style-fixed ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-bg-black' style='z-index: 999999999;'>
        <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-between'>
          <div id='ccu-ads-player-container-id' class='ads-style-w-full ads-style-flex-1 ads-style-items-center ads-style-justify-center'>
            <div class='ads-style-absolute ads-style-cursor-pointer' id='ccu-ads-close-ad-button' style='width: 1.5rem; height: 1.5rem; top: 1.5rem; right: 1.5rem;' >
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close_white.svg'/>
            </div>
            <video id='ccu-ads-player-video-id' />
          </div>
          <div id='ccu-ads-player-banner' class='ads-style-w-full ads-style-max-w-7xl ads-style-items-center ads-style-justify-center ads-style-bg-white' style='height: 100px; border-radius: 2rem 2rem 0 0; padding: 0 1rem'>
            <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-flex-row ads-style-justify-between'>
              <div class='ads-style-flex-row ads-style-justify-start ads-style-absolute' style='top: -1rem'>
                <span class='${isMobile() ? 'ads-style-font-xs' : 'ads-style-font-sm'} ads-style-text-white ads-style-text-center ads-style-bg-light-blue' style='padding: 5px 10px; border-radius: 1000px;'>Ad</span>
              </div>
              <div class='ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-flex-row'>
                <div class='ads-style-flex-row ads-style-ml-2'>
                  <img class='${media.logo ? 'ads-style-mr-2' : ''}' src='${media.logo}' style='display: ${media.logo ? 'block' : 'none'}; width: 4rem; height: 4rem; border-radius: 2.5rem; object-fit: cover;' />
                  <div class='ads-style-items-start'>
                    <span class='${isMobile() ? 'ads-style-font-base' : 'ads-style-font-sm'} ads-style-font-bold ads-style-italic'>${media.name}</span>
                    <span class='${isMobile() ? 'ads-style-font-xs' : 'ads-style-font-sm'} ads-style-text-gray'>${parsedAction}</span>
                  </div>
                  <button onclick='window.open("${cta}")' class='ads-style-items-center ads-style-flex ads-style-ml-1 ads-style-bg-green ads-style-flex-row' style='border: none; padding: 0.3rem 1rem; border-radius: 100px;'>
                    <span class='ads-style-uppercase ads-style-text-white ads-style-font-xs ads-style-spacing'>Open Link</span>
                    <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/open.svg' style='width: 15px; height: 15px; margin-left: 0.5rem;' />
                  </button>
                </div>
              </div>
              <div class='ads-style-items-center ads-style-justify-center ads-style-flex-row ads-style-bg-gray' style='height: 40px; border-radius: 24px; padding-right: 8px;'>
                <div>
                  <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 40px; height: 40;' />
                  <svg><circle id='ccu-countdown' r='18' cx='20' cy='20'></circle></svg>
                </div>
                <span class='${isMobile() ? 'ads-style-font-xs' : 'ads-style-font-sm'} ads-style-ml-1'><span class='ads-style-font-bold'>${numberFormat(media.reward, 0)} SATs</span> will be yours in <span id='ccu-ads-player-timer'></span> seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    } else {
      root.innerHTML = `
      <div class='ads-style-fixed ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-bg-black' style='z-index: 999999999;'>
        <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center'>
          <div id='ccu-ads-player-container-id' class='ads-style-w-full ads-style-items-center ads-style-justify-center'>
            <video id='ccu-ads-player-video-id' />
          </div>
          <div id='ccu-ads-player-banner' class='ads-style-w-full ads-style-items-center ads-style-justify-center ads-style-bg-white' style='flex: 1;'>
            <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center'>
              <div class='ads-style-w-full ads-style-px-1 ads-style-flex-row ads-style-justify-start' style='height: 3.5rem; border-bottom: 1px solid #799499;'>
                <span class='ads-style-font-sm ads-style-text-white ads-style-text-center ads-style-bg-light-blue' style='padding: 5px 10px; border-radius: 1000px;'>Ad</span>
                <span class='ads-style-font-xs ads-style-ml-1 ads-style-font-bold'>${parsedAction}</span>
                <div id='ccu-ads-close-ad-button-mobile' style='width: 1.5rem; height: 1.5rem; margin-left: auto;'>
                  <img class='ads-style-w-full' src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close_white_mb.svg'/>
                </div>
              </div>
              <div class='ads-style-w-90 ads-style-h-full ads-style-items-center ads-style-justify-center'>
                <div class='ads-style-mt-2'>
                  <img class='${media.logo ? 'ads-style-mb-2' : ''}' src='${media.logo}' style='width: ${media.logo ? '4rem;' : '0;'} height: ${media.logo ? '4rem;' : '0;'} border-radius: 2.5rem; object-fit: cover;' />
                  <span class='${isMobile() ? 'ads-style-text-center' : 'ads-style-text-left' } ads-style-font-lg ads-style-font-bold ads-style-italic'>${media.name}</span>
                  <span class='ads-style-font-sm ads-style-text-gray'>${parsedAction}</span>
                  <button onclick='window.open("${cta}")' class='ads-style-flex ads-style-mt-1 ads-style-bg-green ads-style-flex-row' style='padding: 0.3rem 1rem; border-radius: 100px;'>
                    <span class='ads-style-uppercase ads-style-text-white ads-style-font-xs ads-style-spacing'>Open Link</span>
                    <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/open.svg' style='width: 15px; height: 15px; margin-left: 0.5rem;' />
                  </button>
                </div>
              </div>
              <div class='ads-style-items-center ads-style-justify-center ads-style-flex-row ads-style-bg-gray ${isMobile() ? 'ads-style-mb-1' : ''}' style='height: 2.8rem; border-radius: 1.5rem; padding-right: 0.5rem;'>
                <div>
                  <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 34px; height: 34px;' />
                  <svg><circle id='ccu-countdown' r='18' cx='20' cy='20'></circle></svg>
                </div>
                <span class=' ads-style-font-sm ml-1'><span class='ads-style-font-bold'>${numberFormat(media.reward, 0)} SATs</span> will be yours in <span id='ccu-ads-player-timer'></span> seconds</span>
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
          let reward = new Withdrawal({ id: response.pendingWithdrawal.id, amount: response.pendingWithdrawal.amount, action: `https://api.bysato.com/ads/sdk/rewardedVideo/streamClicked.php?token=${encodeURIComponent(token.streamToken)}&action=${encodeURIComponent(token.action)}` });
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
