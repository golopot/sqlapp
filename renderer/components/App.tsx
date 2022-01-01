import React from "react";
import Sidebar from "./Sidebar";
import TabContext, { Tab } from "./TabContext";
import ConnectorContext from "./ConnectorContext";
import { readConnections } from "./connector/connector";
import { SplitViewContainer } from "./split-view";
import Editor from "./Editor";
import Alerts from "./Alerts";

export default function Hello() {
  const [tabId, setTabId] = React.useState("");
  const [tabs, setTabs] = React.useState([] as Tab[]);
  const [connectors, setConnectors] = React.useState(readConnections());
  // const [connectors, setConnectors] = [1, 2];
  // console.log(SplitViewContainer);
  return (
    <TabContext.Provider value={{ tabs, tabId, setTabId, setTabs }}>
      <ConnectorContext.Provider value={{ connectors, setConnectors }}>
        <div>
          <SplitViewContainer
            views={[
              { element: <Sidebar />, initialSize: 260, key: "sidebar" },
              { element: <Editor />, key: "editor" },
            ]}
          />
          <Alerts />
        </div>
      </ConnectorContext.Provider>
    </TabContext.Provider>
  );
}
