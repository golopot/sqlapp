import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ConnectionModal from './ConnectionModal';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    maxWidth: 250,
    backgroundColor: 'red',
  },
});

export default function Sidebar() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="Postgres1">
          <TreeItem nodeId="2" label="table1" />
          <TreeItem nodeId="3" label="table2" />
          <TreeItem nodeId="4" label="table3" />
        </TreeItem>
        <TreeItem nodeId="5" label="Mariadb">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="Material-UI" />
        </TreeItem>
        <button type="button" onClick={handleOpen}>
          + create new connection{' '}
        </button>
        <ConnectionModal open={open} handleClose={handleClose} />
      </TreeView>
    </div>
  );
}
