/* utils */
import { isMobile, isAndroid, isIOS, numberFormat } from './Utils';

const template = (isLandscape, media, parsedAction, token) => {

  const cta = `https://api.bysato.com/ads/sdk/rewardedVideo/streamClicked.php?token=${encodeURIComponent(token.streamToken)}&action=${encodeURIComponent(media.action)}`;

  if( isMobile() && isLandscape ) {
    /* partial screen */
    return `
  <div class='ads-style-fixed ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-bg-black' style='z-index: 999999999;'>
    <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center'>
      <div id='ccu-ads-player-container-id' class='ads-style-w-full ads-style-items-center ads-style-justify-center'>
        <!-- <video id='ccu-ads-player-video-id' /> -->
      </div>
      <div id='ccu-ads-player-banner' class='ads-style-w-full ads-style-items-center ads-style-justify-center ads-style-bg-white' style='flex: 1;'>
        <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center'>
          <div class='ads-style-w-full ads-style-px-1 ads-style-flex-row ads-style-justify-start' style='height: 3.5rem; border-bottom: 1px solid #799499;'>
            <span class='ads-style-font-sm ads-style-text-white ads-style-text-center ads-style-bg-light-blue' style='padding: 5px 10px; border-radius: 1000px;'><img style='width: 60px;' src='https://ccu-public.s3.us-east-2.amazonaws.com/adsLogoSmallV2.svg'/></span>
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
          <div class='ads-style-items-center ads-style-justify-center ads-style-flex-row ads-style-bg-blue ${isMobile() ? 'ads-style-mb-1' : ''}' style='height: 2.8rem; border-radius: 1.5rem; padding-right: 0.5rem;'>
            <div>
              <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 34px; height: 34px;' />
              <svg><circle id='ccu-countdown' r='18' cx='20' cy='20'></circle></svg>
            </div>
            <span class=' ads-style-font-sm ml-1 ads-style-text-white'><span class='ads-style-font-bold'>${numberFormat(media.reward, 0)} SATs</span> will be yours in <span id='ccu-ads-player-timer'></span> seconds</span>
          </div>
        </div>
      </div>
    </div>
  </div>
      `

    } else {
      /* full screen */
      if( isMobile() ) {
      /* mobile full screen */
        return `
          <div class='ads-style-fixed ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-bg-black' style='z-index: 999999999;'>
            <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-between'>
              <div id='ccu-ads-player-container-id' class='ads-style-w-full ads-style-flex-1 ads-style-items-center ads-style-justify-center'>
                <div class='ads-style-absolute ads-style-cursor-pointer' id='ccu-ads-close-ad-button' style='width: 1.5rem; height: 1.5rem; top: 1.5rem; right: 1.5rem; z-index: 3;' >
                  <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close_white.svg'/>
                </div>
                <!-- <video id='ccu-ads-player-video-id' /> -->
              </div>
              <div id='ccu-ads-player-banner' class='ads-style-w-full ads-style-max-w-7xl ads-style-items-center ads-style-justify-center ads-style-bg-white' style='height: 125px; padding: 0 1rem'>
                <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center'>
                  <div class='ads-style-flex-row ads-style-justify-start ads-style-w-full'>
                    <span class='ads-style-text-white ads-style-text-center ads-style-bg-light-blue' style='padding: 5px 10px; border-radius: 1000px; font-size: 10px; white-space: nowrap;'><img style='width: 60px;' src='https://ccu-public.s3.us-east-2.amazonaws.com/adsLogoSmallV2.svg'/></span>
                    <div class='ads-style-items-start ads-style-ml-1'>
                      <span class='ads-style-font-xs ads-style-font-bold ads-style-italic'>${media.name}</span>
                      <span class='${isMobile() ? 'ads-style-font-xs' : 'ads-style-font-sm'} ads-style-text-gray'>${parsedAction}</span>
                    </div>
                  </div>
                  <div class='ads-style-items-center ads-style-justify-center ads-style-flex-row ads-style-bg-blue ads-style-mt-1' style='height: 40px; border-radius: 24px; padding-right: 8px;'>
                    <div>
                      <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 40px; height: 40;' />
                      <svg><circle id='ccu-countdown' r='18' cx='20' cy='20'></circle></svg>
                    </div>
                    <span class='${isMobile() ? 'ads-style-font-xs' : 'ads-style-font-sm'} ads-style-ml-1 ads-style-text-white'><span class='ads-style-font-bold ads-style-text-white'>${numberFormat(media.reward, 0)} SATs</span> will be yours in <span id='ccu-ads-player-timer'></span> seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      } else {
        /* desktop fullscreen */
          return `
           <div class='ads-style-fixed ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-bg-black' style='z-index: 999999999;'>
            <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-between'>
              <div id='ccu-ads-player-container-id' class='ads-style-w-full ads-style-flex-1 ads-style-items-center ads-style-justify-center'>
                <div class='ads-style-absolute ads-style-cursor-pointer' id='ccu-ads-close-ad-button' style='width: 1.5rem; height: 1.5rem; top: 1.5rem; right: 1.5rem; z-index: 3;' >
                  <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/close_white.svg'/>
                </div>
                <!--<video id='ccu-ads-player-video-id' />-->
              </div>
              <div id='ccu-ads-player-banner' class='ads-style-w-full ads-style-max-w-7xl ads-style-items-center ads-style-justify-center ads-style-bg-white' style='height: 100px; border-radius: 2rem 2rem 0 0; padding: 0 1rem'>
                <div class='ads-style-w-full ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-flex-row ads-style-justify-between'>
                  <div class='ads-style-flex-row ads-style-justify-start ads-style-absolute' style='top: -1rem'>
                    <span class='${isMobile() ? 'ads-style-font-xs' : 'ads-style-font-sm'} ads-style-text-white ads-style-text-center ads-style-bg-light-blue' style='padding: 5px 10px; border-radius: 1000px;'><img style='width: 80px;' src='https://ccu-public.s3.us-east-2.amazonaws.com/adsLogoSmallV2.svg'/></span>
                  </div>
                  <div class='ads-style-h-full ads-style-items-center ads-style-justify-center ads-style-flex-row'>
                    <div class='ads-style-flex-row ads-style-ml-2 ads-style-w-full'>
                      <img class='${media.logo ? 'ads-style-mr-2' : ''} ${isMobile() ? 'ads-style-hidden' : ''}' src='${media.logo}' style='display: ${media.logo ? 'block' : 'none'}; width: 4rem; height: 4rem; border-radius: 2.5rem; object-fit: cover;' />
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
                  <div class='ads-style-items-center ads-style-justify-center ads-style-flex-row ads-style-bg-blue' style='height: 40px; border-radius: 24px; padding-right: 8px;'>
                    <div>
                      <img src='https://ccu-public.s3.us-east-2.amazonaws.com/ads-sdk-assets/bitcoin.svg' style='width: 40px; height: 40;' />
                      <svg><circle id='ccu-countdown' r='18' cx='20' cy='20'></circle></svg>
                    </div>
                    <span class='${isMobile() ? 'ads-style-font-xs' : 'ads-style-font-sm'} ads-style-ml-1 text-white'><span class='ads-style-font-bold'>${numberFormat(media.reward, 0)} SATs</span> will be yours in <span id='ccu-ads-player-timer'></span> seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
      }

    }

}

export default template;
