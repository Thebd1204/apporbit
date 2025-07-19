import React, { useEffect } from "react";
import AdminStatusPieChart from "./AdminStatusPieChart";

const Statistics = () => {
  useEffect(() => {
    document.title = "Statistics";
  }, []);
  return (
    <div>
      <AdminStatusPieChart />
    </div>
  );
};

export default Statistics;
