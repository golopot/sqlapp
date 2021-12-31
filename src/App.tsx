import React from 'react';
import Sidebar from './Sidebar';
import TabContext, { Tab } from './TabContext';
import ConnectorContext from './ConnectorContext';
import './App.global.css';
import * as Connector from './connector';

import { SplitViewContainer } from './split-view';

import Editor from './Editor';
import './contextMenu';
import Alerts from './Alerts';

function Hello() {
  const [tabId, setTabId] = React.useState('');
  const [tabs, setTabs] = React.useState([] as Tab[]);
  const [connectors, setConnectors] = React.useState(
    Connector.readConnections()
  );

  return (
    <TabContext.Provider value={{ tabs, tabId, setTabId, setTabs }}>
      <ConnectorContext.Provider value={{ connectors, setConnectors }}>
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
          <SplitViewContainer
            views={[
              { element: <Sidebar />, initialSize: 260, key: 'sidebar' },
              { element: <Editor />, key: 'editor' },
            ]}
          />
          <Alerts />
        </div>
      </ConnectorContext.Provider>
    </TabContext.Provider>
  );
}

export default function App(): React.ReactElement {
  return <Hello />;
}
