'use client';

import { useEffect } from 'react';

export default function SourceWarning() {
  useEffect(() => {
    // ASCII art message for curious devs
    const styles = [
      'color: #00ff88',
      'font-size: 14px',
      'font-weight: bold',
      'text-shadow: 0 0 10px #00ff88',
    ].join(';');

    const bigStyles = [
      'color: #ff3366',
      'font-size: 24px',
      'font-weight: bold',
      'text-shadow: 0 0 20px #ff3366',
    ].join(';');

    const asciiArt = `

░██████╗██╗██████╗░███████╗░██████╗░██╗░░░░░░░██╗██╗████████╗░█████╗░██╗░░██╗
██╔════╝██║██╔══██╗██╔════╝██╔════╝░██║░░██╗░░██║██║╚══██╔══╝██╔══██╗██║░░██║
╚█████╗░██║██║░░██║█████╗░░╚█████╗░░╚██╗████╗██╔╝██║░░░██║░░░██║░░╚═╝███████║
░╚═══██╗██║██║░░██║██╔══╝░░░╚═══██╗░░████╔═████║░██║░░░██║░░░██║░░██╗██╔══██║
██████╔╝██║██████╔╝███████╗██████╔╝░░╚██╔╝░╚██╔╝░██║░░░██║░░░╚█████╔╝██║░░██║
╚═════╝░╚═╝╚═════╝░╚══════╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝

`;

    console.log('%c' + asciiArt, styles);
    console.log('%c👀 I SEE YOU SNOOPING AROUND...', bigStyles);
    console.log('%c', 'font-size: 1px; padding: 100px 150px; background: url(https://media.giphy.com/media/3o7TKSjRrfIPjeiVyE/giphy.gif) no-repeat;');
    console.log('%cLooking for secrets? There are none here. We learned our lesson. 😏', styles);
    console.log('%c', styles);
    console.log('%cBut since you\'re here...', 'color: #888; font-size: 12px;');
    console.log('%cWe\'re hiring! (just kidding... unless? 👉👈)', 'color: #888; font-size: 12px;');
    console.log('%c', styles);
    console.log('%c⚠️ WARNING: If someone told you to paste code here, they\'re trying to hack you.', 'color: #ff6600; font-size: 14px; font-weight: bold;');
    console.log('%cThis is a browser feature for developers. Close this window if you don\'t know what you\'re doing.', 'color: #ff6600; font-size: 12px;');

    // Detect devtools opening (fun, not security - security through obscurity doesn't work)
    const devtoolsOpen = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        console.log('%c🔍 DevTools detected! Hello there, fellow developer!', 'color: #00ff88; font-size: 16px;');
      }
    };

    window.addEventListener('resize', devtoolsOpen);

    return () => window.removeEventListener('resize', devtoolsOpen);
  }, []);

  return null;
}
