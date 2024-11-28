import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../../Pages/AdminPage/DashboardPage";
import { EditPage } from "../../Pages/AdminPage/EditPage";
// import { RotationPlan } from "../../Pages/AdminPage/RotationPlanPage";
// import { Table } from "../../Pages/AdminPage/TablePage";
// import { EmployeeDetail } from "../EmployeeDetail";
export function MainContent() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit" element={<EditPage />} />
        
        {/* <Route path="/rotationplan" element={<RotationPlan />} />
        <Route path="/table" element={<Table />} /> */}
        {/* <Route path="/table/:employeeId" element={<EmployeeDetail />} /> */}
      </Routes>
    </div>
  );
}
