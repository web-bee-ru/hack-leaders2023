import type { AppProps } from 'next/app';
import CommonProviders from '@/Providers/CommonProviders';
import DefaultLayout from '@/layouts/DefaultLayout';
import { darkTheme } from '@/const/defaultTheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CommonProviders theme={darkTheme}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </CommonProviders>
  );
}
