export default function Head() {
  return (
    <>
      {/* Primary favicon for browsers */}
      <link rel="icon" type="image/png" href="/logo.png" sizes="any" />
      
      {/* Fallback for older browsers */}
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      
      {/* Apple touch icon for iOS home screen */}
      <link rel="apple-touch-icon" href="/logo.png" type="image/png" />
      
      {/* Android Chrome app icon */}
      <link rel="icon" type="image/png" sizes="192x192" href="/logo.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/logo.png" />
      
      {/* PWA manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme color for browser chrome */}
      <meta name="theme-color" content="#B39977" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Emerald Bay Resort" />
    </>
  );
}
