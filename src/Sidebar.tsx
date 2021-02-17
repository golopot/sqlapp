import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { uuid } from 'uuidv4';
import ConnectionModal from './ConnectionModal';
import * as Connector from './connector';
import TabContext, { Tab } from './TabContext';
import ConnectorContext from './ConnectorContext';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: '#efefef',
  },
});

function connectionName(c: Connector.Connector) {
  return `${c.user}@${c.host}`;
}

function without<T>(a: T[], e: T): T[] {
  const i = a.findIndex((x) => x === e);
  if (i === -1) {
    return a.slice();
  }
  return [...a.slice(0, i), ...a.slice(i + 1)];
}

function dbId(conn: Connector.Connector, db: Connector.Database): string {
  return `${conn.id}-${db.name}`;
}

export default function Sidebar() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([] as string[]);
  const [open, setOpen] = React.useState(false);

  const { tabs, setTabId, setTabs } = React.useContext(TabContext);
  const { connectors, setConnectors } = React.useContext(ConnectorContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (conn: Connector.Connector) => {
    const conns = [...connectors, conn];
    setConnectors(conns);
    Connector.writeConnections(conns);
  };

  const handleClickConnection = async (conn: Connector.Connector) => {
    try {
      const connection = await Connector.connect(conn);
      try {
        const dbs = await connection.getDatabases();
        conn.databases = dbs.map((db) => ({ name: db, tables: [] }));
        setConnectors(connectors.slice());
      } catch (e) {
        console.error(e);
        window.alert(e);
      }
    } catch (e) {
      console.error(e);
      window.alert('fail to connect');
    }
  };

  const handleClickDatabase = async (
    conn: Connector.Connector,
    db: Connector.Database
  ) => {
    try {
      const connection = await Connector.connect(conn);
      try {
        const tables = await connection.getTables(db.name);
        db.tables = tables;
        setConnectors(connectors.slice());
      } catch (e) {
        console.error(e);
        window.alert(e);
      }
    } catch (e) {
      console.error(e);
      window.alert('fail to connect');
    }
  };

  const handleClickTable = async (
    conn: Connector.Connector,
    db: Connector.Database,
    table: string
  ) => {
    try {
      const connection = await Connector.connect(conn);
      try {
        const tab: Tab = {
          id: uuid(),
          name: table,
          connectionId: conn.id,
          database: db.name,
          table,
        };
        setTabs([...tabs, tab]);
        setTabId(tab.id);
      } catch (e) {
        console.error(e);
        window.alert(e);
      }
    } catch (e) {
      console.error(e);
      window.alert('fail to connect');
    }
  };

  return (
    <div>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
      >
        {connectors.map((conn) => (
          <TreeItem
            nodeId={conn.id}
            key={conn.id}
            label={connectionName(conn)}
            onLabelClick={() => {
              if (expanded.find((id) => id === conn.id)) {
                setExpanded(without(expanded, conn.id));
                return;
              }
              setExpanded([...expanded, conn.id]);
              handleClickConnection(conn);
            }}
          >
            {conn.databases.map((db) => (
              <TreeItem
                nodeId={`${conn.id}-${db.name}`}
                key={`${conn.id}-${db.name}`}
                label={db.name}
                onLabelClick={() => {
                  if (expanded.find((id) => id === dbId(conn, db))) {
                    setExpanded(without(expanded, dbId(conn, db)));
                    return;
                  }
                  setExpanded([...expanded, dbId(conn, db)]);
                  handleClickDatabase(conn, db);
                }}
              >
                {db.tables.map((table) => (
                  <TreeItem
                    nodeId={`${conn.id}-${db.name}-${table}`}
                    key={`${conn.id}-${db.name}-${table}`}
                    label={table}
                    onLabelClick={() => {
                      handleClickTable(conn, db, table);
                    }}
                  />
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
        <button type="button" onClick={handleOpen}>
          + create new connection
        </button>
        <ConnectionModal
          open={open}
          handleCreate={handleCreate}
          handleClose={handleClose}
        />
      </TreeView>
    </div>
  );
}