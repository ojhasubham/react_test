import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = lazy(() => import("../screen/home"));

function App() {
  return (
    <div className="h-100">
      <div className="App">
        <Suspense fallback={<></>}>
          <Router>
            <Route path="/" exact component={Home} />
          </Router>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
