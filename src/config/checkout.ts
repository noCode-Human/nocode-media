type CheckoutProvider = 'kofi' | 'polar';

const provider = (import.meta.env.VITE_CHECKOUT_PROVIDER || 'kofi') as CheckoutProvider;

const resolveCheckoutUrl = (kofiUrl?: string, polarUrl?: string) => {
  if (provider === 'polar' && polarUrl) {
    return polarUrl;
  }

  return kofiUrl || polarUrl || '';
};

const kofi = {
  htmlTemplateEngine: import.meta.env.VITE_KOFI_HTML_TEMPLATE_ENGINE_URL || 'https://ko-fi.com/s/768aff36b3',
  tip: import.meta.env.VITE_KOFI_TIP_URL || 'https://ko-fi.com/s/768aff36b3',
};

const polar = {
  htmlTemplateEngine: import.meta.env.VITE_POLAR_HTML_TEMPLATE_ENGINE_URL || '',
  animationStudio: import.meta.env.VITE_POLAR_3D_ANIMATION_STUDIO_URL || '',
  tip: import.meta.env.VITE_POLAR_TIP_URL || '',
};

export const checkoutConfig = {
  provider,
  urls: {
    htmlTemplateEngine: resolveCheckoutUrl(kofi.htmlTemplateEngine, polar.htmlTemplateEngine),
    animationStudio: resolveCheckoutUrl('', polar.animationStudio),
    tip: resolveCheckoutUrl(kofi.tip, polar.tip),
  },
};
