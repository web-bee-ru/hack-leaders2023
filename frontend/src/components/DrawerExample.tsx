import { FC } from 'react';
import DefaultDrawer from '@/components/UI/DefaultDrawer';
import { Box } from '@mui/material';
import { NecessarilyModalProps } from '@/Providers/ModalProvider';

// @NOTE: Describe z interface
interface DrawerExampleProps extends NecessarilyModalProps {
  label?: string;
}

const DrawerExample: FC<DrawerExampleProps> = ({ label = 'Пример', ...props }) => {
  return (
    <DefaultDrawer label={label} {...props}>
      <Box>Lorem ipsum</Box>
    </DefaultDrawer>
  );
};

export default DrawerExample;
