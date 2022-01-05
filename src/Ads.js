/* modules */
import { API_ads, API_analytics } from './Api';
import Withdrawal from './Withdrawal';

/* utils */
import { isMobile, isAndroid, isIOS, numberFormat } from './Utils';

/* styles */
import './styles.css';

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
    root.innerHTML = `
      <div class='fixed w-full h-full items-center justify-center bg-black' style='z-index: 999999999;'>
        <div class='w-full h-full items-center ${template == 'PARTIAL_SCREEN' ? 'justify-center' : 'justify-between'}'>
          <div id='ccu-ads-player-container-id' class='w-full ${template == 'PARTIAL_SCREEN' ? '' : 'flex-1'} items-center justify-center'>
            <video id='ccu-ads-player-video-id' />
          </div>
          <div id='ccu-ads-player-banner' class='${template == 'PARTIAL_SCREEN' ? 'w-full' : 'w-80'} items-center justify-center bg-white' style='${template == 'PARTIAL_SCREEN' ? 'flex: 1;' : 'height: 100px; border-radius: 2rem 2rem 0 0; padding: 0 1rem'}'>
            <div class='w-full h-full items-center justify-center ${template == 'FULL_SCREEN' ? 'flex-row justify-between' : ''}'>
              <div class='${template == 'FULL_SCREEN' ? '' : 'w-90'} flex-row justify-start' style='height: 3rem;'>
                <span class='${template == 'FULL_SCREEN' && isMobile() ? 'font-xs' : 'font-sm'} text-white text-center bg-light-blue' style='padding: 5px 10px; border-radius: 50%;'>Ad</span>
                <span class='${template == 'FULL_SCREEN' && isMobile() ? 'font-xs' : 'font-xs ml-1'} font-bold'>${template == 'FULL_SCREEN' ? '' : parsedAction}</span>
              </div>
              <div class='${template == 'FULL_SCREEN' ? '' : 'w-90'} h-full items-center justify-center ${template == 'PARTIAL_SCREEN' ? '' : 'flex-row'}'>
                <div class='${template == 'PARTIAL_SCREEN' ? 'mt-2' : 'flex-row ml-2'}'>
                  <span class='${template == 'FULL_SCREEN' && isMobile() ? 'font-base' : 'font-lg'} font-bold italic'>${media.name}</span>
                  <span class='${template == 'FULL_SCREEN' && isMobile() ? 'font-xs' : 'font-sm'} text-gray ${template == 'PARTIAL_SCREEN' ? '' : 'ml-1'}'>${parsedAction}</span>
                  <button onclick='window.open("${cta}")' class='flex ${template == 'PARTIAL_SCREEN' ? 'mt-1' : 'ml-1'} bg-green flex-row' style='padding: 0.3rem 1rem; border-radius: 100px;'>
                    <span class='uppercase text-white font-xs spacing'>Open Link</span>
                    <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/open.svg' style='width: 15px; height: 15px; margin-left: 0.5rem;' />
                  </button>
                </div>
              </div>
              <div class='items-center justify-center flex-row bg-gray ${template == 'PARTIAL_SCREEN' && isMobile() ? 'mb-1' : ''}' style='height: 2.8rem; border-radius: 1.5rem; padding-right: 0.5rem;'>
                <div>
                  <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 34px; height: 34px;' />
                  <svg><circle id='ccu-countdown' r='18' cx='20' cy='20'></circle></svg>
                </div>
                <span class='${template == 'FULL_SCREEN' && isMobile() ? 'font-xs' : 'font-sm'} ml-1'><span class='font-bold'>${numberFormat(media.reward, 0)} SATs</span> will be yours in <span id='ccu-ads-player-timer'></span> seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.append(root);

    const onStreamError = async () => {
      console.warn(`ADS SDK Error: Unable to show the ad. Try again later`);
      document.body.removeChild(root);
      await API_ads.streamError({
        token: token.streamToken
      });
    }

    let video = document.getElementById('ccu-ads-player-video-id');
    video.setAttribute('playsinline', '');
    video.style.cssText = 'object-fit: contain;';
    video.src = streamURL;
    video.loop = false;
    video.autoplay = false;
    video.onloadedmetadata = async () => {
      let response = await API_ads.streamStarted({
        token: token.streamToken
      });
      if( response && response.serverStatus == 'SUCCESS' ) {
        video.play();

        document.getElementById('ccu-countdown').style.animationName = 'countdown';
        document.getElementById('ccu-countdown').style.WebkitAnimationName = 'countdown';
        document.getElementById('ccu-countdown').style.animationDuration = `${video.duration}s`;
        document.getElementById('ccu-countdown').style.WebkitAnimationDuration = `${video.duration}s`;

      } else {
        onStreamError();
      }
    }
    video.ontimeupdate = () => {
      document.getElementById('ccu-ads-player-timer').innerHTML = Math.ceil(video.duration - video.currentTime)
    }
    video.onended = async () => {
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
    video.onerror = () => {
      onStreamError();
    }

  }

}

window.CCUAds = CCUAds;
