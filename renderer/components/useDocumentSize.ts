import React from 'react';

function noop() {}

export default function useDocumentSize(
  ref: React.RefObject<HTMLDivElement>,
  handleSizeChange: () => void = noop
): {
  width: number;
  height: number;
} {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setWidth(ref.current!.clientWidth);
    setHeight(ref.current!.clientHeight);
  }, [ref]);

  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      setWidth(ref.current!.clientWidth);
      setHeight(ref.current!.clientHeight);
      handleSizeChange();
    });
    observer.observe(ref.current!);

    return function cleanup() {
      observer.disconnect();
    };
  }, [ref, handleSizeChange]);

  return { width, height };
}
