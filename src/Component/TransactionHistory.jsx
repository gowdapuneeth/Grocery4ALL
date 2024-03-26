import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"; // Importing necessary Material-UI components
import React, { useState } from "react"; // Importing React and useState hook

// TransactionHistory component definition
// TransactionHistory: This is the main component responsible for rendering the transaction history of the application.
const TransactionHistory = () => {
  // State for inventory and transactions, initialized from localStorage or default values
  //  useState: This is a React Hook used to manage state within a functional component. In this component, it's used to maintain the states of inventory and transactions.
  const [inventory] = useState(() => {
    const localData = localStorage.getItem("inventory");
    return localData ? JSON.parse(localData) : initialData; // Parse JSON or use default data
  });
  const [transactions] = useState(() => {
    const localTransactions = localStorage.getItem("transactions");
    return localTransactions ? JSON.parse(localTransactions) : []; // Parse JSON or use empty array
  });

  // Function to calculate transaction value based on transaction type
  /* calculateTransactionValue: This function calculates the value of each transaction based on its type (sell, restock, add). It retrieves the corresponding product from the inventory and calculates the value by multiplying the quantity with the appropriate price (selling price for sold products, purchasing price for restocked and added products).
   */
  const calculateTransactionValue = (transaction) => {
    const product = inventory.find((p) => p.id === transaction.productId); // Find product in inventory
    if (!product) return 0; // Return 0 if product not found

    // Calculate transaction value based on transaction type
    if (transaction.type === "sell_product") {
      return product.sellingPrice * transaction.quantity; // Calculate value for sold products
    } else if (transaction.type === "restock_product") {
      return product.purchasingPrice * transaction.quantity; // Calculate value for restocked products
    } else if (transaction.type === "add_product") {
      return product.purchasingPrice * transaction.quantity; // Calculate value for added products
    }
    return 0; // Default case
  };

  // Function to get human-readable transaction type
  /* getReadableTransactionType: This function returns a human-readable version of the transaction type based on the provided type string. It's used to display more user-friendly transaction types in the table.
   */
  const getReadableTransactionType = (type) => {
    switch (type) {
      case "sell_product":
        return "Sold";
      case "restock_product":
        return "Restocked";
      case "add_product":
        return "Added";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      {/* Paper: This is a Material-UI component used to create a paper-like container for the transaction history table. It's primarily used for styling purposes. */}
      <Paper sx={{ p: 2, border: "1px solid black", overflow: "auto" }}>
        {/* Paper component for styling */}
        {/* Typography: This is a Material-UI component used to render text elements with various styles and variants. Here, it's used to display the title "Transaction History". */}
        <Typography variant="h5">Transaction History</Typography> {/* Title */}
        {/* Table, TableHead, TableBody, TableCell, TableRow: These are Material-UI components used to create a structured table for displaying transaction history. TableHead contains the header row of the table, TableBody contains the rows with transaction details, and TableCell represents individual cells in the table. */}
        <Table size="small">
          {/* Table component for displaying transaction history */}
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell> {/* Table header for Date */}
              <TableCell>Type</TableCell>
              {/* Table header for Transaction Type */}
              <TableCell>Product ID</TableCell>
              {/* Table header for Product ID */}
              <TableCell>Quantity</TableCell> {/* Table header for Quantity */}
              <TableCell>Value</TableCell> {/* Table header for Value */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapping through transactions to display each transaction */}
            {/* transactions.map: This method iterates over the transactions array to generate table rows for each transaction. It displays details such as the date, transaction type, product ID, quantity, and value of each transaction. */}
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                {/* new Date().toLocaleDateString(): This line retrieves the current date and formats it as a string in the local date format. It's used to display the date of each transaction in the table. */}
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                {/* Displaying current date */}
                <TableCell>
                  <span>{getReadableTransactionType(transaction.type)}</span>
                  {/* Displaying human-readable transaction type */}
                </TableCell>
                <TableCell>{transaction.productId}</TableCell>
                {/* Displaying product ID */}
                <TableCell>{transaction.quantity}</TableCell>
                {/* Displaying quantity */}
                <TableCell>
                  <span>
                    {/* calculateTransactionValue(transaction).toFixed(2): This line calculates the value of each transaction using the calculateTransactionValue function and formats it to two decimal places. It displays the transaction value in the table. */}
                    {calculateTransactionValue(transaction).toFixed(2)}
                    {/* Displaying transaction value */}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default TransactionHistory; // Exporting TransactionHistory component
