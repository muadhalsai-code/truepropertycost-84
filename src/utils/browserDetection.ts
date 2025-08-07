export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isIOSSafari = isIOS && isSafari;
  const isMacSafari = isSafari && !isIOS;
  
  // Get Safari version
  const safariVersion = isSafari ? 
    parseFloat((userAgent.match(/Version\/(\d+\.\d+)/) || [])[1]) : null;
  
  return {
    isSafari,
    isIOS,
    isIOSSafari,
    isMacSafari,
    safariVersion,
    userAgent,
    supportsLocalStorage: (() => {
      try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    })()
  };
};

export const logBrowserInfo = () => {
  const info = getBrowserInfo();
  console.log('Browser Information:', info);
  
  if (info.isSafari) {
    console.log('Safari-specific features enabled');
    if (info.safariVersion && info.safariVersion < 14) {
      console.warn('Old Safari version detected. Some features may not work correctly.');
    }
  }
  
  return info;
};