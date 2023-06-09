export default (props = { variant: 'white' }) => {
  const variant = props.variant;
  const path = variant === 'blue' ? '/Severstal-logo-blue.svg' : '/Severstal-logo-white.svg';
  return <img src={path} alt="Логотип" height="100%" />;
};
