import { Html, Head, Main, NextScript } from 'next/document';

import { html5Shiv } from '~snippets/html5shiv';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="msapplication-TileColor" content="#28a745" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          href="https://quimea.s3.us-east-2.amazonaws.com/icones/icone-econext.ico"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="msapplication-TileImage" content="favicon.svg" />
        <meta name="theme-color" content="#28a745" />
        <script id="html5shiv" dangerouslySetInnerHTML={{ __html: html5Shiv }} />

        {/* facebook domain verification */}
        <meta name="facebook-domain-verification" content="yadapeinaowfuikh33mnc6yfvdwpue" />
        {/* end facebook domain verification */}

        {/* facebook pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1978759455620915');
          fbq('track', 'PageView');
          `,
          }}
        />
        <noscript>
          <img
            alt="script"
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1978759455620915&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
