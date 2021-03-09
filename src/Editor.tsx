import React from 'react';
import Topbar from './Topbar';
import QueryResult from './QueryResult';
import TabContext from './TabContext';
import ConnectorContext from './ConnectorContext';
import * as Connector from './connector';

function findConnector(connectors: Connector.Connector[], id: string) {
  return connectors.find((x) => x.id === id) as Connector.Connector;
}

export default function Editor() {
  const { tabId, tabs } = React.useContext(TabContext);
  const { connectors } = React.useContext(ConnectorContext);
  const tab = tabs.find((x) => x.id === tabId);

  return (
    <div
      className="editor"
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <Topbar />
      <div
        style={{
          height: 'calc(100vh - 36px)',
          padding: '10px 10px',
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      >
        {tab === undefined ? (
          <div />
        ) : (
          <QueryResult
            connector={findConnector(connectors, tab.connectionId)}
            database={tab.database}
            tableName={tab.table}
          />
        )}
      </div>
    </div>
  );
}
