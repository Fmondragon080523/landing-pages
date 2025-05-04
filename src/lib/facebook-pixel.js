
export const initFacebookPixel = (pixelId) => {
  const fbq = function() {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  };

  if (!window._fbq) {
    window._fbq = fbq;
  }
  
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);

  window.fbq = fbq;
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
};
