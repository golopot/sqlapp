import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Resizable } from 're-resizable';
import debounceFn from 'debounce-fn';
import SplitPane from 'react-split-pane';
import Sidebar from './Sidebar';
import TabContext, { Tab } from './TabContext';
import ConnectorContext from './ConnectorContext';
import './App.global.css';
import * as Connector from './connector';

import Editor from './Editor';
import './contextMenu';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const debouncer = debounceFn(
  (fn: any, x) => {
    fn(x);
  },
  { wait: 100, before: true }
);

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
          <SplitPane split="vertical" minSize={50} defaultSize={200}>
            <div>
              <Sidebar />
            </div>
            <div>
              <Editor />
            </div>
          </SplitPane>
        </Container>
      </ConnectorContext.Provider>
    </TabContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
