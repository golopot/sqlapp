import React from 'react';
import Topbar from './Topbar';
import QueryResult from './QueryResult';
import TabContext from './TabContext';
import ConnectorContext from './ConnectorContext';
import * as Connector from './connector';
import useDocumentSize from './useDocumentSize';

function findConnector(connectors: Connector.Connector[], id: string) {
  return connectors.find((x) => x.id === id) as Connector.Connector;
}

export default function Editor() {
  const { tabId, tabs } = React.useContext(TabContext);
  const { connectors } = React.useContext(ConnectorContext);
  const tab = tabs.find((x) => x.id === tabId);

  const ref = React.useRef(null);

  const size = useDocumentSize(ref);

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
        ref={ref}
        style={{
          height: 'calc(100vh - 36px)',
          padding: '0',
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      >
        {tab === undefined ? (
          <div />
        ) : (
          <QueryResult
            height={size.height}
            connector={findConnector(connectors, tab.connectionId)}
            database={tab.database}
            tableName={tab.table}
          />
        )}
      </div>
    </div>
  );
}
