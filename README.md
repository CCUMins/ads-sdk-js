# CCU Ads SDK

## Installation

1. npm.
    ```javascript
    npm install ccu-ads
    ```

1. cdn.
    ```html
    <script src='https://cdn.jsdelivr.net/npm/ccu-ads/dist/ccu-ads.min.js' integrity='sha256-w3VXV8zrnhri4whWseSn2RwXgVazUgILidcQpUh96Fk=' crossorigin='anonymous'></script>
    ```

## Implementation
1.
    ```javascript
    import CCUAds from 'ccu-ads';

    /* sdk initialization */
    CCUAds.current.initialize('API_KEY');

    /* request and show ad */
    CCUAds.current.requestAndShowAd();
    ```
