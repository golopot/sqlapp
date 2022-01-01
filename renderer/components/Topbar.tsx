import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext, { Tab as TabType } from "./TabContext";
import { Menu, MenuItem, getCurrentWindow } from "./contextMenu";

import { without } from "./helpers";

export default function Topbar(): React.ReactElement {
  const { tabId, tabs, setTabId, setTabs } = React.useContext(TabContext);

  const handleChange = (_, newValue) => {
    setTabId(newValue);
  };

  const handleCloseTab = (tab: TabType) => {
    const i = tabs.findIndex((t) => t === tab);
    if (i === -1) {
      console.error("cannot find tab");
      return;
    }
    const newTabs = without(tabs, tab);

    if (tab.id === tabId) {
      if (newTabs.length === 0) {
        setTabId("");
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
      console.error("cannot find tab");
      return;
    }
    const newTabs = tabs.slice(0, i + 1);
    setTabs(newTabs);
  };

  return (
    <Tabs
      value={tabId || false}
      onChange={handleChange}
      aria-label="tabs"
      variant="scrollable"
    >
      {tabs.map((tab) => (
        <Tab
          disableRipple
          label={tab.name}
          value={tab.id}
          key={tab.id}
          onContextMenu={(event) => {
            event.preventDefault();
            const menu = new Menu();
            menu.append(
              new MenuItem({
                label: "Close",
                click() {
                  handleCloseTab(tab);
                },
              })
            );
            menu.append(
              new MenuItem({
                label: "Close tabs to the right",
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
