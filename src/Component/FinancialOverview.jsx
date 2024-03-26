import { Box, Card, Typography } from "@mui/material"; // Importing necessary Material-UI components
import React, { useState } from "react"; // Importing React and useState hook

/* FinancialOverview: This is the main component responsible for rendering financial overview details such as total inventory value, total revenue, total profit, and total cost. */
const FinancialOverview = () => {
  // State for inventory and transactions, initialized from localStorage or default values
  /* useState: This is a React Hook used to manage state within a functional component. In this component, it's used to maintain the states of inventory and transactions. */
  const [inventory] = useState(() => {
    const localData = localStorage.getItem("inventory");
    return localData ? JSON.parse(localData) : initialData; // Parse JSON or use default data
  });
  const [transactions, setTransactions] = useState(() => {
    const localTransactions = localStorage.getItem("transactions");
    return localTransactions ? JSON.parse(localTransactions) : []; // Parse JSON or use empty array
  });

  // Function for Calculate total revenue
  /* calculateTotalRevenue: This function calculates the total revenue generated from selling products. It iterates over the transactions, finds the corresponding product in the inventory, and calculates the revenue based on the selling price and quantity sold. */
  const calculateTotalRevenue = () => {
    const totalRevenue = transactions.reduce((acc, curr) => {
      if (curr.type === "sell_product") {
        const product = inventory.find((p) => p.id === curr.productId); // Find product in inventory
        return acc + (product ? product.sellingPrice * curr.quantity : 0); // Calculate revenue for sold products
      }
      return acc;
    }, 0);
    return totalRevenue;
  };

  // Function for Calculate total Inventory Value
  /* calculateTotalInventoryValue: This function calculates the total value of the current inventory. It iterates over the inventory and computes the total value by multiplying the quantity of each product by its purchasing price. */
  const calculateTotalInventoryValue = () => {
    const totalValue = inventory.reduce(
      (acc, curr) => acc + curr.quantity * curr.purchasingPrice, // Calculate total value of all products in inventory
      0
    );
    return totalValue;
  };

  // Function for Calculate total Profit
  /* calculateTotalProfit: This function computes the total profit generated from selling products. It iterates over the transactions, finds the corresponding product in the inventory, and calculates the profit by subtracting the purchasing price from the selling price and then multiplying it by the quantity sold. */
  const calculateTotalProfit = () => {
    let totalProfit = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "sell_product") {
        const product = inventory.find((p) => p.id === transaction.productId); // Find product in inventory
        if (product) {
          totalProfit +=
            (product.sellingPrice - product.purchasingPrice) *
            transaction.quantity; // Calculate profit for sold products
        }
      }
    });
    return totalProfit;
  };

  // Function to calculate total cost
  /* calculateTotalCost: This function calculates the total cost incurred in adding and restocking products. It filters the transactions to find those related to adding and restocking products, retrieves the corresponding product from the inventory, and calculates the total cost by multiplying the quantity by the purchasing price. */
  const calculateTotalCost = () => {
    // Filter transactions for adding and restocking products
    const addTransactions = transactions.filter(
      (transaction) => transaction.type === "add_product"
    );
    const restockTransactions = transactions.filter(
      (transaction) => transaction.type === "restock_product"
    );

    // Calculate cost for adding products
    const addProductCost = addTransactions.reduce((acc, curr) => {
      const product = inventory.find((p) => p.id === curr.productId); // Find product in inventory
      return acc + (product ? product.purchasingPrice * curr.quantity : 0); // Calculate total cost for adding products
    }, 0);

    // Calculate cost for restocking products
    const restockProductCost = restockTransactions.reduce((acc, curr) => {
      const product = inventory.find((p) => p.id === curr.productId); // Find product in inventory
      return acc + (product ? product.purchasingPrice * curr.quantity : 0); // Calculate total cost for restocking products
    }, 0);

    return addProductCost + restockProductCost; // Return total cost
  };

  // JSX rendering
  /* This section renders the financial overview details using Material-UI Typography components, displaying the calculated values for total inventory value, total revenue, total profit, and total cost. */
  return (
    /* Card, Typography, Box: These are Material-UI components used for styling and structuring the financial overview details. */
    <Card sx={{ border: "1px solid black", mt: 2 }}>
      <Typography variant="h5" sx={{ mt: 4, ml: 3, mb: 4 }}>
        Financial Overview
      </Typography>
      <Box sx={{ mt: 4, ml: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Total Inventory Value: €{calculateTotalInventoryValue().toFixed(2)}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Total Revenue: €{calculateTotalRevenue().toFixed(2)}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Total Profit: €{calculateTotalProfit().toFixed(2)}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Total cost: €{calculateTotalCost().toFixed(2)}
        </Typography>
      </Box>
    </Card>
  );
};

export default FinancialOverview; // Exporting FinancialOverview component
