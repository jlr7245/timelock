import React from 'react';
import './App.styles.css';

import SiteList from './SiteList'

const App = () => (
  <div className="container">
    <h1 className="title">timelock</h1>
    <h3 className="subtitle">
      A friendly warlock to help you with your time management by locking away
      various sites.
    </h3>
    <SiteList />
  </div>
);

export default App;
