import React from 'react';

declare const ResizeObserver: any;

function noop() {}

export default function useDocumentSize(
  ref,
  handleSizeChange: () => void = noop
): {
  width: number;
  height: number;
} {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  });

  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
      handleSizeChange();
    });
    observer.observe(ref.current);

    return function cleanup() {
      observer.disconnect();
    };
  }, [0]);

  return { width, height };
}
