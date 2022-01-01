/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import EventEmitter from 'events';

const emitter = new EventEmitter();

export function useSubscribe(
  type: string,
  listener: (event: any) => void
): void {
  useEffect(() => {
    emitter.on(type, listener);
    return function cleanUp() {
      emitter.off(type, listener);
    };
  });
}

export function emit(type: string, event: unknown): void {
  emitter.emit(type, event);
}
