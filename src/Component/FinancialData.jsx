import React, { useEffect, useState } from "react"; // Importing necessary modules from React
import {
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"; // Importing Material-UI components
import initialData from "../initialData.json"; // Importing initial data from a JSON file

/* FinancialData: This is the main component of the application. It manages the inventory, transactions, and user interactions related to adding, selling, and restocking products.*/
const FinancialData = () => {
  // Storing data into Local Storage and Access it
  const [inventory, setInventory] = useState(() => {
    const localData = localStorage.getItem("inventory");
    return localData ? JSON.parse(localData) : initialData; // Load inventory data from local storage or use initialData
  });
  const [transactions, setTransactions] = useState(() => {
    const localTransactions = localStorage.getItem("transactions");
    return localTransactions ? JSON.parse(localTransactions) : []; // Load transaction data from local storage or initialize as an empty array
  });

  const [open, setOpen] = useState(false); // State to manage whether the dialog is open or not
  const [actionType, setActionType] = useState(""); // State to manage the type of action (sell, restock, add)
  const [currentProduct, setCurrentProduct] = useState({}); // State to store information about the currently selected product
  const [quantity, setQuantity] = useState(""); // State to store quantity input
  const [productId] = useState(""); // State to store product ID input
  const [productName, setProductName] = useState(""); // State to store product name input
  const [purchasingPrice, setPurchasingPrice] = useState(""); // State to store purchasing price input
  const [sellingPrice, setSellingPrice] = useState(""); // State to store selling price input

  // Update localStorage when inventory or transactions change
  /* useEffect: This is a React Hook used to perform side effects in function components. In this code, it's used to update the local storage whenever the `inventory` or `transactions` state changes. */
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [inventory, transactions]);

  //Open the Pop ups
  /* handleClickOpen: This function is triggered when a user clicks on a button to perform an action (add, sell, or restock). It opens a dialog box and sets the current product and action type accordingly. */
  const handleClickOpen = (product, type) => {
    setCurrentProduct(product);
    setActionType(type);
    setOpen(true);
  };

  //Close the Pop ups
  /* handleClose: This function is triggered when the user closes the dialog box. It resets the dialog-related states and clears the input fields. */
  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  // To execute the Sell , Restock and Add product operations
  /* handleConfirmAction: This function is triggered when the user confirms an action (add, sell, or restock) in the dialog box. It validates the inputs based on the action type and performs the corresponding action (e.g., selling, restocking, or adding a product). */
  const handleConfirmAction = () => {
    // Handling different types of actions
    if (actionType === "sell") {
      // Validation for selling action
      if (!quantity) {
        alert("this field is mandatory");
        return;
      }
      // Sell product logic
      const quantityInt = parseInt(quantity);
      if (quantityInt < 0) {
        alert(
          "Selling quantity cannot be negative. Go back to previous action?"
        );
        return; // Stop the selling action
      } else if (quantityInt === 0) {
        alert("Alert: Zero is not accepted in Quantity.");
        return;
      } else {
        handleSellProduct(currentProduct.id, quantityInt);
      }
    } else if (actionType === "restock") {
      // Validation for restocking action
      if (!quantity) {
        alert("this field is mandatory");
        return;
      }
      // Restock product logic
      const quantityInt = parseInt(quantity);
      if (quantityInt < 0) {
        alert(
          "Restocking quantity cannot be negative. Go back to previous action?"
        );
        return; // Stop the restocking action
      } else if (quantityInt === 0) {
        alert("Alert: Zero is not accepted in Quantity.");
        return;
      } else {
        handleRestockProduct(currentProduct.id, quantityInt);
      }
    } else if (actionType === "add") {
      // Validation for adding action
      const quantityInt = parseInt(quantity);
      // Add product logic
      if (quantityInt < 0) {
        alert("Quantity cannot be negative. Go back to previous action?");
        return; // Stop the adding action
      } else if (
        !productName ||
        !quantity ||
        !purchasingPrice ||
        !sellingPrice
      ) {
        alert("All fields are mandatory.");
        return;
      } else if (
        quantityInt <= 0 ||
        purchasingPrice <= 0 ||
        sellingPrice <= 0
      ) {
        alert(
          "Zero or negative values are not accepted in Quantity, Purchasing Price, or Selling Price."
        );
        return;
      } else {
        handleAddProduct();
      }
    }
    handleClose();
  };

  // Function for Selling Product
  /* handleSellProduct: This function is responsible for handling the logic of selling a product. It checks if the requested quantity is available in the inventory, updates the inventory accordingly, and logs the transaction. */
  const handleSellProduct = (id, quantity) => {
    // Logic to sell product
    const product = inventory.find((product) => product.id === id);
    if (!product || product.quantity < quantity) {
      alert("Insufficient quantity available for sale.");
      return;
    }
    const updatedInventory = inventory.map((product) => {
      if (product.id === id && product.quantity >= quantity) {
        return { ...product, quantity: product.quantity - quantity };
      }
      return product;
    });
    setInventory(updatedInventory);
    setTransactions([
      ...transactions,
      { type: "sell_product", productId: id, quantity: quantity },
    ]);
  };

  // Function for Restock Product
  /* handleRestockProduct: This function handles the logic of restocking a product. It increases the quantity of the specified product in the inventory and logs the transaction. */
  const handleRestockProduct = (id, quantity) => {
    // Logic to restock product
    const updatedInventory = inventory.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + quantity };
      }
      return product;
    });
    setInventory(updatedInventory);
    setTransactions([
      ...transactions,
      { type: "restock_product", productId: id, quantity: quantity },
    ]);
  };

  // to add product in inventory
  /* handleAddProduct: This function manages the logic of adding a new product to the inventory. It validates the input fields, generates a new product ID, adds the product to the inventory, and logs the transaction. */
  const handleAddProduct = () => {
    // Logic to add product
    const idExists = inventory.some((product) => product.id === productId);
    if (idExists) {
      alert("A product with this ID already exists.");
      return;
    }
    const newProductId = generateProductId();
    const newProduct = {
      id: newProductId,
      name: productName,
      quantity: parseInt(quantity, 10), // Parse quantity to integer
      purchasingPrice: parseFloat(purchasingPrice),
      sellingPrice: parseFloat(sellingPrice),
    };
    setInventory([...inventory, newProduct]);
    setTransactions([
      ...transactions,
      {
        type: "add_product",
        productId: newProductId,
        quantity: parseInt(quantity, 10),
      }, // Parse quantity to integer
    ]);
    // Clear the form fields
    resetState();
  };

  // Function to generate a new product ID
  /* generateProductId: This function generates a new product ID based on the existing IDs in the inventory. It finds the maximum ID and increments it by 1 to ensure uniqueness. */
  const generateProductId = () => {
    // Logic to generate product ID
    const ids = inventory.map((product) => product.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  };

  // resetState: This function is designed to reset the state of various variables typically used in a purchasing or inventory management system. It clears the values stored in the state variables for quantity, product name, purchasing price, and selling price. This function is useful in scenarios where you want to clear out previous inputs or selections, such as after completing a transaction or when starting a new entry process.
  const resetState = () => {
    setQuantity("");
    setProductName("");
    setPurchasingPrice("");
    setSellingPrice("");
  };

  // JSX rendering
  return (
    <Container maxWidth="lg">
      {/* Button to add a new product */}
      <Button
        sx={{ margin: "0 0 20px", ml: 1.3 }}
        variant="contained"
        onClick={() => handleClickOpen({}, "add")}
      >
        Add Product
      </Button>
      <Paper
        sx={{
          mb: 2,
          p: 2,
          border: "1px solid black",
          overflow: "auto",
          ml: 1.3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Inventory
        </Typography>
        {/* Table to display inventory */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Purchasing Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapping through inventory to display each product */}
            {inventory.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>€{product.purchasingPrice.toFixed(2)}</TableCell>
                <TableCell>€{product.sellingPrice.toFixed(2)}</TableCell>
                {/* Buttons for selling and restocking */}
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(product, "sell")}
                    disabled={product.quantity === 0}
                    sx={{ ml: 0.5 }}
                  >
                    Sell
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(product, "restock")}
                    sx={{ ml: 0.5, mt: 0.4 }}
                  >
                    Restock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* Dialog for adding, selling, or restocking products */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          resetState();
        }}
      >
        <DialogTitle>
          {actionType === "sell"
            ? "Sell Product"
            : actionType === "restock"
            ? "Restock Product"
            : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Text to guide user based on the selected action */}
            {actionType === "sell" || actionType === "restock"
              ? `Please enter the quantity to ${
                  actionType === "sell" ? "sell" : "restock"
                } for ${currentProduct.name}.`
              : "Please enter the details of the new product."}
          </DialogContentText>
          {/* Input fields for quantity, name, purchasing price, and selling price */}
          {actionType === "sell" || actionType === "restock" ? (
            <TextField
              autoFocus
              margin="dense"
              id="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          ) : (
            <>
              <TextField
                margin="dense"
                id="productName"
                label="Name"
                type="text"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <TextField
                margin="dense"
                id="quantity"
                label="Quantity"
                type="number"
                fullWidth
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                margin="dense"
                id="purchasingPrice"
                label="Purchasing Price"
                type="number"
                fullWidth
                value={purchasingPrice}
                onChange={(e) => setPurchasingPrice(e.target.value)}
              />
              <TextField
                margin="dense"
                id="sellingPrice"
                label="Selling Price"
                type="number"
                fullWidth
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {/* Buttons to cancel or confirm the action */}
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirmAction}
            disabled={
              !quantity ||
              (actionType === "sell" && quantity > currentProduct.quantity)
            }
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FinancialData; // Exporting FinancialData component
