import React from "react"; // Importing React
import { Route, Routes } from "react-router-dom"; // Importing Route and Routes from react-router-dom
import FinancialData from "../Component/FinancialData"; // Importing FinancialData component
import FinancialOverview from "../Component/FinancialOverview"; // Importing FinancialOverview component
import TransactionHistory from "../Component/TransactionHistory"; // Importing TransactionHistory component

// GroceryRoute component definition
const GroceryRoute = () => (
  <Routes>
    {/* Defining routes for navigation */}
    <Route path="/" element={<FinancialData />} />
    {/* Route for the FinancialOverview component, mapped to the /financial-overview path */}
    <Route path="/financial-overview" element={<FinancialOverview />} />
    {/* Route for the TransactionHistory component, mapped to the /transaction-history path */}
    <Route path="/transaction-history" element={<TransactionHistory />} />
  </Routes>
);

export default GroceryRoute; // Exporting GroceryRoute component
