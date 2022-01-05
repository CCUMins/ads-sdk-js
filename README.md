# CCU Ads SDK

## Installation

1. npm.
    ```javascript
    npm install ccu-ads
    ```

1. cdn.
    ```html
    <script src='https://cdn.jsdelivr.net/npm/ccu-ads/dist/ccu-ads.min.js'></script>
    ```

## Implementation
1.
    ```javascript
    import CCUAds from 'ccu-ads';

    /* sdk initialization */
    const ads = new CCUAds('API_KEY');

    /* request and show ad */
    ads.requestAndShowAd();
    ```
