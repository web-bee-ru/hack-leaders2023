import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const Identity: React.FC = (props: PropsWithChildren) => {
  return <>{props ? props.children : []}</>;
};

// Disables SSR
const SafeHydrate = dynamic(async () => Identity, { ssr: false });

export default SafeHydrate;
