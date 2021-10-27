import React from 'react';
import Formy from './containers/Formy';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Grid, Typography, CssBaseline } from '@material-ui/core';
import styles from "./styles/App.module.scss";


const App: React.FC<any> = (props) => {

  const theme = createTheme({
    palette: {
      type: 'light',
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    typography: {
      fontSize: 14,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Grid component="main" className={styles.root} container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="h5"
                    component="h1"
                    className={styles.titleTypo}
                >
                    Formy
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5"
                    align="right"
                    component="h1"
                    className={styles.titleTypo}
                >
                    A simple place search API
                </Typography>
            </Grid>
        </Grid>
        <Formy />
    </MuiThemeProvider>
  );
}

export default App;
