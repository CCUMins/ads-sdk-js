/* modules */
import { API_analytics } from './Api';

/* utils */
import { isMobile, isAndroid, isIOS } from './Utils';

export default class Analytics {

  static trackEvent = (token, key) => {
    let platform = isAndroid() ? 'android' : isIOS() ? 'ios' : 'desktop';
    const params = {
      tk: token,
      key: key,
      value: {
        count: 1,
        [`${platform}.count`]: 1
      }
    }
    API_analytics.logEvent(params);
  }

}
