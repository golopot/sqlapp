import React from 'react';
import Topbar from './Topbar';
import QueryResult from './QueryResult';
import TabContext, { Tab } from './TabContext';
import ConnectorContext from './ConnectorContext';
import * as Connector from './connector';

export default function Editor() {
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
        <div>{tabId}</div>
        {Content}
      </div>
    </div>
  );
}
