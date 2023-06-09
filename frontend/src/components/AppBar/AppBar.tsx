import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import DownloadIcon from '@mui/icons-material/Download';
import SeverstalLogo from '@/components/SeverstalLogo/SeverstalLogo';
import { Link } from '@mui/material';
import Simulation from '@/components/AppBar/Simulation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const pages: string[] = [];
// @TODO: добавить кнопки скачивания результатов
const downloadable: {name: string; link: string;}[] = [
  { name: 'Презентация', link: 'presentation.zip' },
  { name: 'Задача-1', link: 'task-1.zip' },
  { name: 'Задача-2', link: 'task-2.zip' },
  { name: 'Задача-3', link: 'task-3.zip' },
  { name: 'Отчет о работе', link: 'result.zip' },
];
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" color={'primary'}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" height={40}>
            <SeverstalLogo variant="white" />
          </Link>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {/* @NOTE: обычная навигация, пока убрана */}
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}

            <Simulation />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Различная отчетность">
              <IconButton onClick={handleOpenUserMenu}>
                <DownloadIcon />
              </IconButton>
              {/*<Button variant="contained" onClick={handleOpenUserMenu} startIcon={<DownloadIcon />}>*/}
              {/*  Скачать*/}
              {/*</Button>*/}
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {downloadable.map(({name, link}) => (
                <MenuItem key={name} sx={{padding: 0}}>
                  <Link sx={{px: 3, py: 1, width: '100%', height: '100%'}} onClick={handleCloseUserMenu} href={`/uploads/${link}`} target={"_blank"} style={{textDecoration: 'none'}}>{name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
