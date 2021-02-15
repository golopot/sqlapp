import React from 'react';

export interface Tab {
  id: string;
  name: string;
  connectionId: string;
  database: string;
  table: string;
}

export default React.createContext({
  tabs: [] as Tab[],
  tabId: '',
  setTabId: (_: string) => {},
  setTabs: (_: Tab[]) => {},
});
