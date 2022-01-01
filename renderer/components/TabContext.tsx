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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTabId: (_: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTabs: (_: Tab[]) => {},
});
