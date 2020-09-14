import React from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import UserSubmission from './pages/UserSubmission';
import ArtistInformation from './components/ArtistInformation';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserSubmission} />
        <Route path="/user-stats" component={ArtistInformation} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
