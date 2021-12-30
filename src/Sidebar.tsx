import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { uuid } from 'uuidv4';
import ConnectionModal from './ConnectionModal';
import * as Connector from './connector';
import TabContext, { Tab } from './TabContext';
import ConnectorContext from './ConnectorContext';
import { Menu, MenuItem, getCurrentWindow } from './contextMenu';
import { without } from './helpers';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: '#efefef',
  },
  group: {
    transition: 'none',
  },
});

function connectionName(c: Connector.Connector) {
  return `${c.user}@${c.host}`;
}

function dbId(conn: Connector.Connector, db: Connector.Database): string {
  return `${conn.id}-${db.name}`;
}

export default function Sidebar(): React.ReactElement {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([] as string[]);
  const [open, setOpen] = React.useState(false);

  const { tabs, setTabId, setTabs } = React.useContext(TabContext);
  const { connectors, setConnectors } = React.useContext(ConnectorContext);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleCreateConnector = (conn: Connector.Connector) => {
    const conns = [...connectors, conn];
    setConnectors(conns);
    Connector.writeConnections(conns);
  };

  const handleDeleteConnector = (conn: Connector.Connector) => {
    const conns = without(connectors, conn);
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
      await Connector.connect(conn);
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
            classes={{ group: classes.group }}
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
            onContextMenu={(event) => {
              console.log(event);
              event.preventDefault();

              const menu = new Menu();
              menu.append(
                new MenuItem({
                  label: 'Edit Connection',
                  click() {
                    console.log(123);
                  },
                })
              );
              menu.append(
                new MenuItem({
                  label: 'Delete Connection',
                  click() {
                    handleDeleteConnector(conn);
                  },
                })
              );
              menu.popup({ window: getCurrentWindow() });
            }}
          >
            {conn.databases.map((db) => (
              <TreeItem
                classes={{ group: classes.group }}
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
                onContextMenu={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                {db.tables.map((table) => (
                  <TreeItem
                    classes={{ group: classes.group }}
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
        <button type="button" onClick={handleOpenModal}>
          + create new connection
        </button>
        <ConnectionModal
          open={open}
          handleCreate={handleCreateConnector}
          handleClose={handleCloseModal}
        />
      </TreeView>
    </div>
  );
}
