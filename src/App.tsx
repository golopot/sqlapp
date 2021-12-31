import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import TabContext, { Tab } from './TabContext';
import ConnectorContext from './ConnectorContext';
import './App.global.css';
import * as Connector from './connector';

import { SplitViewContainer } from './split-view';

import Editor from './Editor';
import './contextMenu';
import Alerts from './Alerts';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

function Hello() {
  const [tabId, setTabId] = React.useState('');
  const [tabs, setTabs] = React.useState([] as Tab[]);
  const [connectors, setConnectors] = React.useState(
    Connector.readConnections()
  );

  return (
    <TabContext.Provider value={{ tabs, tabId, setTabId, setTabs }}>
      <ConnectorContext.Provider value={{ connectors, setConnectors }}>
        <Container>
          <SplitViewContainer
            views={[
              { element: <Sidebar />, initialSize: 260, key: 'sidebar' },
              { element: <Editor />, key: 'editor' },
            ]}
          />
          <Alerts />
        </Container>
      </ConnectorContext.Provider>
    </TabContext.Provider>
  );
}

export default function App(): React.ReactElement {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
