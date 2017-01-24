import React from 'react';
import { Grid, GridCell, LogoHorizontal } from 'bw-axiom';
import { PodListContainer } from './PodList';
import { NodeListContainer } from './NodeList';

import './styles/App.css';

const App = () =>
  <div className="Container">
    <LogoHorizontal width="12rem" />
    <Grid gutters="large" theme="dark">
      <GridCell width={50}>
        <h1>Pods</h1>
        <PodListContainer />
      </GridCell>
      <GridCell width={50}>
        <h1>Nodes</h1>
        <NodeListContainer />
      </GridCell>
    </Grid>
  </div>

export default App
