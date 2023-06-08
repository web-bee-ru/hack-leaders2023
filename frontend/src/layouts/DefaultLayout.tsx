import { Box, Paper, styled } from '@mui/material';
import { muiHelper } from '@/lib/muiThemeInterpolation';
import { PropChildren } from '@/types/UtilityProps';

const PageWrapper = styled(Paper)`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: ${muiHelper.palette.background.default};
  padding: ${muiHelper.spacing(3, 12.25, 8)};
`;

const DefaultLayout = ({ children }: PropChildren) => {
  return (
    <PageWrapper elevation={0}>
      <Box maxWidth={1244} flexGrow={1} display="flex" flexDirection="column">
        {children}
      </Box>
    </PageWrapper>
  );
};

export default DefaultLayout;
