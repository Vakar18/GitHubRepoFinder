import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import RepositoryListPage from "./components/RepositoryList";
import RepositoryDetailsPage from "./components/RepositoryDetails";
import FollowersPage from "./components/Followers";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" Component={HomePage} />
        </Routes>
        <Routes>
          <Route
            path="/repositories/:username"
            Component={RepositoryListPage}
          />
        </Routes>
        <Routes>
          <Route
            path="/repositories/:username/:repoName"
            Component={RepositoryDetailsPage}
          />
        </Routes>
        <Routes>
          <Route path="/followers/:username" Component={FollowersPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
