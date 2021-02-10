import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 5,
  },
  tab: {
    textTransform: 'none',
    minWidth: 40,
    width: 100,
    minHeight: 5,
    padding: '2px 2px',
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
}));

export default function Topbar() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      className={classes.root}
      value={value}
      onChange={handleChange}
      aria-label="simple tabs example"
    >
      <Tab className={classes.tab} disableRipple label="Item One" />
      <Tab className={classes.tab} disableRipple label="Item Two" />
      <Tab className={classes.tab} disableRipple label="Item Three" />
    </Tabs>
  );
}
