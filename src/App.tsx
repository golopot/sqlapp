import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Table from './Table';
import ConnectionForm from './ConnectionForm';
import './App.global.css';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

function Right() {
  return (
    <div>
      <Topbar />
      <div style={{ padding: '10px 10px' }}>
        <Table />
      </div>
    </div>
  );
}

function Hello() {
  return (
    <Container>
      <div style={{ width: 200, flexGrow: 0 }}>
        <Sidebar />
      </div>
      <div style={{ flexGrow: 1, backgroundColor: 'orange' }}>
        <Right />
      </div>
    </Container>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
