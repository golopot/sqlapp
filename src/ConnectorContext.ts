import React from 'react';
import * as Connector from './connector';

export default React.createContext({
  connectors: [] as Connector.Connector[],
  setConnectors: (_: Connector.Connector[]) => {},
});
