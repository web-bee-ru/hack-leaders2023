import dynamic from 'next/dynamic';

const Identity: React.FC = ({ children }) => {
  return <>{children}</>;
};

// Disables SSR
const SafeHydrate = dynamic(async () => Identity, { ssr: false });

export default SafeHydrate;
