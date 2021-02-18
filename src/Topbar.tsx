import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import TabContext, { Tab as TabType } from './TabContext';
import { Menu, MenuItem, getCurrentWindow } from './contextMenu';

import { without } from './helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 5,
    height: 24,
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

  const handleCloseTab = (tab: TabType) => {
    const i = tabs.findIndex((t) => t === tab);
    if (i === -1) {
      console.error('cannot find tab');
      return;
    }
    const newTabs = without(tabs, tab);

    if (tab.id === tabId) {
      if (newTabs.length === 0) {
        setTabId('');
        return;
      }

      let index = 0;
      if (i < newTabs.length) {
        index = i;
      } else {
        index = i - 1;
      }
      setTabId(newTabs[index].id);
    }

    setTabs(newTabs);
  };

  return (
    <Tabs
      className={classes.root}
      value={tabId || false}
      onChange={handleChange}
      aria-label="tabs"
      variant="scrollable"
      scrollButtons="off"
    >
      {tabs.map((tab) => (
        <Tab
          className={classes.tab}
          disableRipple
          label={tab.name}
          value={tab.id}
          key={tab.id}
          onContextMenu={(event) => {
            event.preventDefault();
            const menu = new Menu();
            menu.append(
              new MenuItem({
                label: 'Close',
                click() {
                  handleCloseTab(tab);
                },
              })
            );
            menu.popup({ window: getCurrentWindow() });
          }}
        />
      ))}
    </Tabs>
  );
}
