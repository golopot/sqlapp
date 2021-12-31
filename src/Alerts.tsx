/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { emit, useSubscribe } from './events';

interface AlertEntry {
  message: string;
}

const ALERT_KEY = 'alert';

export default function Alerts(): React.ReactElement {
  const [alerts, setAlerts] = useState([] as AlertEntry[]);

  useSubscribe(ALERT_KEY, (alert) => {
    setAlerts(alerts.concat(alert));
  });

  return (
    <div className="alerts">
      {alerts.map((a) => (
        <Alert severity="error">{a.message}</Alert>
      ))}
    </div>
  );
}

export function useAlert(): (message: any) => void {
  return function alert(payload: any) {
    let message;
    if (typeof payload.message === 'string') {
      message = payload.message;
    } else {
      message = String(payload);
    }

    emit(ALERT_KEY, { message });
  };
}
