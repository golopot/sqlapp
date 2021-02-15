import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import TabContext from './TabContext';

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

  const { tabId, tabs, setTabId, setTabs } = React.useContext(TabContext);

  const handleChange = (_, newValue) => {
    setTabId(newValue);
  };

  return (
    <Tabs
      className={classes.root}
      value={tabId || false}
      onChange={handleChange}
      aria-label="tabs"
    >
      {tabs.map((tab) => (
        <Tab
          className={classes.tab}
          disableRipple
          label={tab.name}
          value={tab.id}
          key={tab.id}
        />
      ))}
    </Tabs>
  );
}
