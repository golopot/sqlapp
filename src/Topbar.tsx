import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import TabContext, { Tab as TabType } from './TabContext';
import { Menu, MenuItem, getCurrentWindow } from './contextMenu';

import { without } from './helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    fontSize: 14,
    textTransform: 'none',
    minWidth: 120,
    minHeight: 5,
    paddingLeft: '6px',
    paddingRight: '6px',
    fontFamily: 'inherit',
    fontWeight: theme.typography.fontWeightRegular,
    // '&:hover': {
    //   color: '#40a9ff',
    //   opacity: 1,
    // },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  wrapper: {
    alignItems: 'unset',
    justifyContent: 'center',
  },
  indicator: {
    display: 'none',
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

  const handleCloseToTheRight = (tab: TabType) => {
    const i = tabs.findIndex((t) => t === tab);
    if (i === -1) {
      console.error('cannot find tab');
      return;
    }
    const newTabs = tabs.slice(0, i + 1);
    setTabs(newTabs);
  };

  return (
    <Tabs
      classes={{
        root: classes.root,
        indicator: classes.indicator,
      }}
      value={tabId || false}
      onChange={handleChange}
      aria-label="tabs"
      variant="scrollable"
      scrollButtons="off"
    >
      {tabs.map((tab) => (
        <Tab
          classes={{ root: classes.tab, wrapper: classes.wrapper }}
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
            menu.append(
              new MenuItem({
                label: 'Close tabs to the right',
                click() {
                  handleCloseToTheRight(tab);
                },
              })
            );
            menu.popup({ window: getCurrentWindow() });
          }}
          onAuxClick={(event) => {
            if (event.button === 1) {
              handleCloseTab(tab);
            }
          }}
        />
      ))}
    </Tabs>
  );
}
