module.exports = {
    init: () => {
        if (process.env.GOOGLE_TRACKING_ID) {
            /* eslint-disable */
            // Google Analytics
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', process.env.GOOGLE_TRACKING_ID, 'auto');
            ga('send', 'pageview');
            /* eslint-enable */
        }
    }
};
