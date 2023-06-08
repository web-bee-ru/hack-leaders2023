import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Menu, MenuItem, styled, Tooltip, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { muiHelper } from '@/lib/muiThemeInterpolation';

export const StyledMenu = styled(Menu)`
  .MuiMenu-list {
    display: flex;
    flex-direction: column;
    padding: ${muiHelper.spacing(0.5)};
    gap: ${muiHelper.spacing(0.5)};
  }
  .MuiMenuItem-root {
    height: 20px;
    padding: ${muiHelper.spacing(0, 1)};
    &:hover {
      border-radius: 4px;
    }
  }
` as typeof Menu;

export interface MenuOptionProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  tooltipTitle?: string;
}

export interface ContextMenuProps {
  text: string;
  options: MenuOptionProps[];
}

const DefaultMenu: FC<ContextMenuProps> = ({ text, options }) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>();

  return (
    <>
      <Box display="flex" alignItems="center" height="100%">
        <Button
          onClick={(e) => {
            setAnchor(e.currentTarget);
          }}
          endIcon={<MoreHorizIcon />}
          disabled={!options.length}
        >
          {text}
        </Button>
      </Box>

      <StyledMenu onClose={() => setAnchor(null)} open={!!anchor} anchorEl={anchor}>
        {options.map((option) => (
          <Tooltip key={option.title} title={option.tooltipTitle ?? ''}>
            <Box>
              <MenuItem
                key={option.title}
                disabled={option.disabled}
                onClick={() => {
                  setAnchor(null);
                  option.onClick();
                }}
              >
                <Typography variant="caption">{option.title}</Typography>
              </MenuItem>
            </Box>
          </Tooltip>
        ))}
      </StyledMenu>
    </>
  );
};

export default DefaultMenu;
