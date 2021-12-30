import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputText from './InputText';
import { Connector } from './connector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default function ConnectionModal(props: {
  open: boolean;
  handleCreate: (conn: Connector) => void;
  handleClose: () => void;
}): React.ReactElement {
  const classes = useStyles();
  const { open, handleCreate, handleClose } = props;

  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCreate({
      id: uuid(),
      host,
      user,
      password,
      databases: [],
      driverId: 'mysql',
    });
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <InputText
              label="host"
              value={host}
              required
              onChange={(ev) => setHost(ev.target.value)}
            />
            <InputText
              label="user"
              value={user}
              required
              onChange={(ev) => setUser(ev.target.value)}
            />
            <InputText
              label="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button type="submit">Create</button>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}
