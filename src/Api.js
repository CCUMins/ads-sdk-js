/* constants */
const API_URL_BASE = 'https://api.flashboy.com/ads/';
const noParams = {};

const doApiCall = async (endpoint, params, fallback = null) => {
  let headers = {
    'Content-Type': 'application/json',
    'ads-api-key': window.ads_api_key
  }
  try {
    const response = await fetch(`${API_URL_BASE}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: headers
    });
    const parsedResponse = await response.json();
    if( parsedResponse == null || parsedResponse.error ) {
      return fallback
    } else {
      return parsedResponse
    }
  } catch(error) {
    console.log(`API ERROR: ${error.message}`);
    return fallback
  }
}

/* APIs ads */
export const API_ads = {
  requestRewardedVideo: async (params) => {
    return doApiCall('sdk/rewardedVideo/request.php', params)
  },
  streamStarted: async (params) => {
    return doApiCall('sdk/rewardedVideo/streamStarted.php', params)
  },
  streamEnded: async (params) => {
    return doApiCall('sdk/rewardedVideo/streamEnded.php', params)
  },
  streamError: async (params) => {
    return doApiCall('sdk/rewardedVideo/streamError.php', params)
  },
  streamClicked: async (params) => {
    return doApiCall('sdk/rewardedVideo/streamClicked.php', params)
  }
}

/* APIs analytics */
export const API_analytics = {
  logEvent: async (params) => {
    return doApiCall('sdk/analytics/logEvent.php', params)
  }
}
