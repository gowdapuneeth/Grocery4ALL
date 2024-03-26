import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter from react-router-dom for routing
import Header from "./Component/Header"; // Importing the Header component
import GroceryRoute from "./Routes/GroceryRoute"; // Importing the GroceryRoute component
import { Container, Divider } from "@mui/material"; // Importing necessary Material-UI components

// App component definition
const App = () => {
  return (
    <>
      {/* Fragment shorthand syntax */}
      <BrowserRouter>
        {/* Wrapping the app with BrowserRouter for routing */}
        <Container>
          {/* Container to hold the app content */}
          <Header /> {/* Rendering the Header component */}
          <Divider sx={{ my: 3 }} />
          {/* Divider to separate sections with some margin */}
          <GroceryRoute />
          {/* Rendering the GroceryRoute component for routing */}
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App; // Exporting the App component
