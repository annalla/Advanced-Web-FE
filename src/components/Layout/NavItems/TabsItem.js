
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: '#2D2C2C',
    },
  },
});
const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontSize: 18,
  fontWeight: 500,
  marginRight: theme.spacing(1),
  color: '#636464',
  opacity: 0.8,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#2D2C2C',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#000000',
    fontWeight:"650"
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#1E1E1E',
  },
}));
function TabsItem() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', height: '70%', bgcolor: '#F8F9F9' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ mt: 1.7 }}
          value={value}
          onChange={handleChange} centered>
          <AntTab label='Stream'></AntTab>
          <AntTab label='Classwork'></AntTab>
          <AntTab label='People'></AntTab>
          <AntTab label='Grades'></AntTab>
        </Tabs>
      </Box>
    </ThemeProvider>
  );
}
export { TabsItem };
