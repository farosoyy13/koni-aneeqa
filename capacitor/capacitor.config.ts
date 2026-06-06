import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chicaniqa.store',
  appName: 'متجر أناقة CHIC',
  webDir: '../artifacts/chic-aniqa/dist/public',
  server: {
    // أزيلي هذا السطر عند البناء offline وأبقيه للتطوير فقط
    // url: 'https://YOUR-REPLIT-APP.replit.app',
    // cleartext: true,
  },
  ios: {
    contentInset: 'always',
    preferredContentMode: 'mobile',
    backgroundColor: '#FAF1F5',
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#FAF1F5',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#FAF1F5',
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
