/* eslint-disable react/jsx-props-no-spreading */
import '~styles/globals.scss';
import '~styles/icons.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CookiesAccept from '~components/CookiesAccept';
import PopUp from '~components/Layout/PopUp/PopUp';

import { UseAuthenticated } from '~hooks/store/UseAuthenticated';

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const getSession = async () => {
      await UseAuthenticated();
    };

    getSession();
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        return navigator.serviceWorker.register('/sw.js').then(
          (registration) =>
            console.log('Service Worker registration successful with scope: ', registration.scope),
          (err) => console.log('Service Worker registration failed: ', err)
        );
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
        <PopUp />
      </QueryClientProvider>
      <CookiesAccept />
    </ThemeProvider>
  );
}

export default App;
