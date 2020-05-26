import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Admin from './components/Admin';
import Results from './components/Results';

const BaseLayout = () => (
  <div className="container-fluid">
    <div className="content">
      <Route path="/" exact component={Main} />
      <Route path="/results/:keyword" component={Results} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
    </div>

  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <BaseLayout/>
    </BrowserRouter>
  );
}

export default App;