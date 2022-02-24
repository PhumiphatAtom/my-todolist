import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./pages/TodoList.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<TodoList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
