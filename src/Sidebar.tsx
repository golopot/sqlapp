import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ConnectionModal from './ConnectionModal';
import * as Connection from './connection';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    maxWidth: 250,
    backgroundColor: 'red',
  },
});

function connectionName(c: Connection.Connection) {
  return `${c.user}@${c.host}`;
}

export default function Sidebar() {
  const classes = useStyles();

  const [shouldLoad, setShouldLoad] = React.useState(true);

  const [connections, setConnections] = React.useState(
    [] as Connection.Connection[]
  );

  const [open, setOpen] = React.useState(false);

  if (shouldLoad) {
    const conns = Connection.readConnections();
    setConnections(conns);
    setShouldLoad(false);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (conn: Connection.Connection) => {
    const conns = [...connections, conn];
    setConnections(conns);
    Connection.writeConnections(conns);
  };

  return (
    <div>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {connections.map((conn) => (
          <TreeItem
            nodeId={connectionName(conn)}
            key={connectionName(conn)}
            label={connectionName(conn)}
          />
        ))}
        <button type="button" onClick={handleOpen}>
          + create new connection{' '}
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
