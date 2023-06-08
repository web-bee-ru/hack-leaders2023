import ClearIcon from '@mui/icons-material/Clear';
import { Box, Drawer, DrawerProps, IconButton, Typography } from '@mui/material';
import { ReactNode, useCallback, useEffect, useState } from 'react';

export interface DefaultDrawerProps extends Omit<DrawerProps, 'onSubmit' | 'onClose'> {
  label: string | ReactNode;
  onCloseModal?: () => void;
}

const DefaultDrawer = ({
  children,
  label,
  onCloseModal,
  open = true,
  anchor = 'right',
  ...drawerProps
}: DefaultDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const startClosing = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Drawer
      {...drawerProps}
      open={isOpen && open}
      onClose={startClosing}
      anchor={anchor}
      ModalProps={{ BackdropProps: { style: { opacity: 0 } } }}
      SlideProps={{
        onExited: onCloseModal,
      }}
      sx={{
        '.MuiDrawer-paper': {
          width: 488,
        },
      }}
    >
      <Box p={3} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {typeof label === 'string' ? (
            <Typography variant="subtitle1" fontWeight="500">
              {label}
            </Typography>
          ) : (
            label
          )}
          <IconButton
            size="small"
            onClick={startClosing}
            sx={{ flexShrink: 0, my: -0.625, alignSelf: 'start' }}
            className="onboarding__close-drawer"
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <Box mt={2} flexGrow="1" display="flex" flexDirection="column">
          {children}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DefaultDrawer;
