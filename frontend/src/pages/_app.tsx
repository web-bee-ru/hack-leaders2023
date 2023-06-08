import type { AppProps } from 'next/app';
import CommonProviders from '@/Providers/CommonProviders';
import DefaultLayout from '@/layouts/DefaultLayout';
import { darkTheme } from '@/const/defaultTheme';
import SafeHydrate from '@/Next/SafeHydrate';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <CommonProviders theme={darkTheme}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </CommonProviders>
    </SafeHydrate>
  );
}
