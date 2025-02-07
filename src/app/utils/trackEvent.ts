// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

export const initFbPixel = (fbPixelId: string) => {
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  `;
  document.head.appendChild(script);

  const listFbPixel = fbPixelId
    .split(/,\s*/)
    .map((id) => id.trim())
    .filter((id) => id);

  if (fbq) {
    for (const pixel of listFbPixel) {
      fbq('init', `${pixel}`);
      fbq('track', 'PageView');
      fbq('track', 'ViewContent');
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1"
  />`;
      document.head.appendChild(noscript);
    }
  }
};

export const trackEventAddToCart = () => {
  if (fbq) {
    fbq('track', 'AddToCart', {});
  }
};

export const trackEventCheckoutInitiated = () => {
  if (fbq) {
    fbq('track', 'InitiateCheckout', {});
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackEventAddPaymentInfo = (bodyTrack: any) => {
  if (fbq) {
    fbq('track', 'AddPaymentInfo', {
      content_type: bodyTrack.productName || '',
      currency: 'USD',
      value: bodyTrack.value || 1,
    });
  }
};

export const trackEventPurchased = () => {

};
