import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminPage } from "./Pages/AdminPage/AdminPage";
// import { LoginPage } from "./components/LoginPage"; // Optional if you plan to add login
// import { NotFoundPage } from "./components/NotFoundPage"; // Optional for error handling
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* AdminPage handles all admin-specific routes */}
          <Route path="/*" element={<AdminPage />} />
          {/* Add other global routes if needed */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}