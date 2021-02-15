import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Resizable } from 're-resizable';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import QueryResult from './QueryResult';
import TabContext, { Tab } from './TabContext';
import './App.global.css';
import ConnectorContext from './ConnectorContext';
import * as Connector from './connector';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

function Right() {
  const { tabId, tabs } = React.useContext(TabContext);
  const { connectors } = React.useContext(ConnectorContext);
  const tab = tabs.find((x) => x.id === tabId);

  let Content: JSX.Element;

  if (tab === undefined) {
    Content = <div />;
  } else {
    const connector = connectors.find((x) => x.id === tab.connectionId);
    Content = (
      <QueryResult
        connector={connector as Connector.Connector}
        database={tab.database}
        tableName={tab.table}
      />
    );
  }
  return (
    <div>
      <Topbar />
      <div style={{ padding: '10px 10px' }}>
        <div>{tabId}</div>
        {Content}
      </div>
    </div>
  );
}

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
          <Resizable>
            <Sidebar />
          </Resizable>
          <div style={{ flexGrow: 1, backgroundColor: '#e8e8e8' }}>
            <Right />
          </div>
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
