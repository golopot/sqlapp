import React, { useState } from "react";
import { uuid } from "uuidv4";
import InputText from "./InputText";
import { Connector } from "./connector/connector";

import { Modal } from "antd";

export default function ConnectionModal(props: {
  open: boolean;
  handleCreate: (conn: Connector) => void;
  handleClose: () => void;
}): React.ReactElement {
  const { open, handleCreate, handleClose } = props;

  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCreate({
      id: uuid(),
      host,
      user,
      password,
      databases: [],
      driverId: "mysql",
    });
    handleClose();
  };

  return (
    <Modal visible={open} onCancel={handleClose} footer={false} width={""}>
      <div>
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
    </Modal>
  );
}
