import { PropChildren } from '@/types/UtilityProps';

// Disables SSR
const SafeHydrate = ({ children }: PropChildren) => {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>;
};

export default SafeHydrate;
