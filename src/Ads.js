/* modules */
import { API_ads, API_analytics } from './Api';
import Withdrawal from './Withdrawal';
import Templates from './Templates';

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

    const root = document.createElement('div');
    root.classList.add('ccu-ads');
    root.id = 'ccu-ads-player-dialog';

    document.body.append(root);

    const onStreamError = async () => {
      console.warn(`ADS SDK Error: Unable to show the ad. Try again later`);
      document.body.removeChild(root);
      await API_ads.streamError({
        token: token.streamToken
      });
    }
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.style.cssText = 'object-fit: contain;';
    video.src = streamURL;
    video.loop = false;
    video.autoplay = false;

    video.onloadedmetadata = async () => {

      let viewHeight = window.innerHeight - 100 // banner height in full screen mode;

      if( isMobile() ) {
        if( video.videoHeight > video.videoWidth ) {
          viewHeight = window.innerHeight - 125;
          // is portrait
          root.innerHTML = Templates(false, media, parsedAction, token);
          video.style.height = `${viewHeight}px`;
        } else {
          // is landscape
          root.innerHTML = Templates(true, media, parsedAction, token);
        }
      } else {

        root.innerHTML = Templates(true, media, parsedAction, token);
        //if( viewHeight <= video.videoHeight) {
          video.style.height = `${viewHeight}px`;
        //}

      }

      const closeButton = document.querySelector('#ccu-ads-close-ad-button') || document.querySelector('#ccu-ads-close-ad-button-mobile');
      if( closeButton ) {
        closeButton.addEventListener('click', () => {
          video.pause();
          document.body.removeChild(root);
        })
      }

      const videoContainer = document.querySelector('#ccu-ads-player-container-id');
      videoContainer.append(video);


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



    video.onerror = () => {
      onStreamError();
    }

  }

}

global.CCUAds = CCUAds;
