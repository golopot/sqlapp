import React from 'react';

declare var ResizeObserver: any;

interface Size {
  width: number;
  height: number;
}

function getOffsetLeft(sizes: Size[], index: number) {
  let sum = 0;
  for (let i = 0; i < index; i++) {
    sum += sizes[i]?.width ?? 0;
  }
  return sum;
}

interface DragStart {
  x: number;
  y: number;
  width: number;
  nextWidth: number;
  index: number;
}

interface ViewProp {
  initialSize?: number;
  minSize?: number;
  element: React.ReactNode;
}

export function SplitViewContainer({ views }: { views: ViewProp[] }) {
  const [sizes, setSizes] = React.useState([] as Size[]);
  const [dragStart, setDragStart] = React.useState(
    undefined as DragStart | undefined
  );

  const ref = React.useRef(null);

  const handleSizeInit = () => {
    const containerWidth = (ref.current as any).clientWidth;
    const containerHeight = (ref.current as any).clientHeight;

    let sumOfWidths = 0;
    let undefinedCount = 0;
    for (const view of views) {
      if (view.initialSize == undefined) {
        undefinedCount++;
      } else {
        sumOfWidths += view.initialSize;
      }
    }

    const spreadedWidth = (containerWidth - sumOfWidths) / undefinedCount;
    for (const view of views) {
      const width =
        view.initialSize === undefined ? spreadedWidth : view.initialSize;
      sizes.push({
        width,
        height: containerHeight,
      });
    }
    setSizes(sizes.slice());
  };

  const handleSizeChange = () => {
    const containerWidth = (ref.current as any).clientWidth;
    const containerHeight = (ref.current as any).clientHeight;

    const lastWidth =
      containerWidth -
      sum(sizes.slice(0, sizes.length - 1).map((x) => x.width));

    sizes[sizes.length - 1].width = lastWidth;
    setSizes(sizes.slice());
  };

  React.useEffect(() => {
    handleSizeInit();
  }, [0]);

  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      handleSizeChange();
    });
    observer.observe(ref.current);

    return function cleanup() {
      observer.disconnect();
    };
  }, [0]);

  const viewsCount = views.length;

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragStart) {
      return;
    }

    const deltaX = event.clientX - dragStart.x;
    sizes[dragStart.index].width = dragStart.width + deltaX;
    sizes[dragStart.index + 1].width = dragStart.nextWidth - deltaX;
    setSizes(sizes.slice());
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    setDragStart(undefined);
  };

  return (
    <div
      className="split-view-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={ref}
    >
      {views.map((view, i) => {
        return (
          <React.Fragment key={i}>
            <div
              className="split-view-view"
              style={{
                position: 'absolute',
                width: sizes[i]?.width ?? 0,
                height: sizes[i]?.height ?? 0,
                left: getOffsetLeft(sizes, i),
              }}
            >
              {view.element}
            </div>
            {i === viewsCount - 1 ? null : (
              <SplitViewBar
                sizes={sizes}
                index={i}
                setDragStart={setDragStart}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function SplitViewBar({ sizes, index, setDragStart }: any) {
  return (
    <div
      className="split-view-bar"
      role="presentation"
      onMouseDown={(event: React.MouseEvent) => {
        if (event.button !== 0) {
          return;
        }

        setDragStart({
          x: event.clientX,
          y: event.clientY,
          width: sizes[index].width,
          nextWidth: sizes[index + 1].width,
          index: index,
        });
      }}
      style={{
        position: 'absolute',
        height: '100%',
        left: getOffsetLeft(sizes, index + 1),
      }}
      tabIndex={-1}
    ></div>
  );
}

function sum(array: number[]): number {
  let s = 0;
  for (let i = 0; i < array.length; i++) {
    s += array[i];
  }
  return s;
}
