import { useMemo } from 'react';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import { themeSettings } from './themes';
import { useSelector } from 'react-redux';
import { Profile } from './pages/profile';
import { createTheme } from '@mui/material/styles';
import { InitialState } from './interfaces/initialState';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/index.css';

export const App = () => {
  const mode = useSelector((state: InitialState) => state.mode);
  const correctedMode = mode !== 'dark' ? 'light' : 'dark';

  const theme = useMemo(
    () => createTheme(themeSettings(correctedMode)),
    [correctedMode]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
