import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Route path="/" element={<div>Root</div>} />
      </Router>
    </div>
  );
};

export default App;
