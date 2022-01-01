import React from "react";

type Size = number | undefined;

function getOffsetLeft(sizes: Size[], index: number) {
  let sum = 0;
  for (let i = 0; i < index; i++) {
    sum += sizes[i] ?? 0;
  }
  return sum;
}

interface DragStart {
  x: number;
  y: number;
  index: number;
}

interface ViewProp {
  key: string;
  initialSize?: number;
  minSize?: number;
  element: React.ReactNode;
}

const DEFAULT_SIZE = 100;

function getLinePositions(views: ViewProp[]): number[] {
  const positions = [];

  let lastPosition = 0;
  for (let i = 0; i < views.length - 1; i++) {
    positions[i] = views[i].initialSize || DEFAULT_SIZE + lastPosition;
    lastPosition = positions[i];
  }
  return positions;
}

// TODO: implement direction = "vertical"
export function SplitViews({
  views,
  direction = "horizontal",
}: {
  views: ViewProp[];
  direction?: "horizontal" | "vertical";
}): React.ReactElement {
  const [positions, setPositions] = React.useState(getLinePositions(views));
  const [dragStart, setDragStart] = React.useState(
    undefined as DragStart | undefined
  );

  const viewsCount = views.length;

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragStart) {
      return;
    }

    positions[dragStart.index] = event.clientX;
    setPositions(positions.slice());
  };

  const handleMouseUp = () => {
    setDragStart(undefined);
  };

  return (
    <div
      className="split-view-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {views.map((view, i) => {
        return (
          <React.Fragment key={view.key}>
            <div
              className="split-view-view"
              style={{
                position: "absolute",
                width:
                  i === views.length - 1
                    ? `calc(100% - ${positions[i - 1]}px)`
                    : positions[i],
                height: "100%",
                left: i === 0 ? 0 : positions[i - 1],
              }}
              data-split-view-key={view.key}
            >
              {view.element}
            </div>
            {i === viewsCount - 1 ? null : (
              <SplitViewBar
                position={positions[i]}
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

const BUTTON_LEFT_CLICK = 0;

function SplitViewBar({
  position,
  index,
  setDragStart,
}: {
  position: number;
  index: number;
  setDragStart: (_: DragStart) => void;
}) {
  return (
    <div
      className="split-view-bar"
      role="presentation"
      onMouseDown={(event: React.MouseEvent) => {
        if (event.button !== BUTTON_LEFT_CLICK) {
          return;
        }
        setDragStart({
          x: event.clientX,
          y: event.clientY,
          index,
        });
      }}
      style={{
        position: "absolute",
        height: "100%",
        left: position,
      }}
      tabIndex={-1}
    />
  );
}

function sum(array: number[]): number {
  let s = 0;
  for (let i = 0; i < array.length; i++) {
    s += array[i];
  }
  return s;
}
