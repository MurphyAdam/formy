import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    paddingTop: theme.spacing(1),
  },
}));

export function CircularLoader(props) {
  const classes = useStyles();

  return (
    <Typography 
      align={props.align || "center"}
      className={classes.root} component="div">
      <CircularProgress 
        color="secondary" 
        size={30} 
        thickness={5} 
        disableShrink/>
    </Typography>
  );
}
