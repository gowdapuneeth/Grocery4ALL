import { Container, Tab, Tabs, Typography } from "@mui/material"; // Importing necessary Material-UI components
import React from "react"; // Importing React
import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation from react-router-dom

// Header component definition
// Header: This is the main component responsible for rendering the header section of the application.
const Header = () => {
  // useLocation: This is a hook provided by `react-router-dom` that returns the current location object. It's used here to determine the current path of the application.
  const location = useLocation(); // Getting the current location using useLocation hook

  // currentTab: This variable holds the current path obtained from the `location` object.
  const currentTab = location.pathname; // Getting the current path from the location

  return (
    <Container>
      {/* Container component to hold the header */}
      {/* Typography: This is a Material-UI component used to render text elements with various styles and variants. Here, it's used to display the title "Grocery4All". */}
      <Typography variant="h3" component="h1" gutterBottom>
        {/* Header title */}
        Grocery4All
      </Typography>
      {/* Tabs: This is a Material-UI component used to render a set of tab buttons for navigation. */}
      <Tabs
        value={currentTab} // Setting the current active tab based on the current location
        aria-label="Navigation Tabs"
        variant="scrollable" // Allowing scrollable tabs if there are many
      >
        {/* Tab for the Home page */}
        {/* Tab: This is a Material-UI component representing an individual tab within the `Tabs` component. It contains the label for the tab and is linked to a specific route using the `to` prop. It utilizes the `Link` component from `react-router-dom` to enable navigation to the specified route. */}
        {/* Link: This is a component provided by `react-router-dom` for declarative, accessible navigation around the application. It ensures that navigation occurs without a full page refresh, providing a smoother user experience. */}
        <Tab label="Home" value="/" to="/" component={Link} />
        {/* Tab for the Transaction History page */}
        <Tab
          label="Transaction History"
          value="/transaction-history"
          to="/transaction-history"
          component={Link} // Using Link component from react-router-dom for navigation
        />
        {/* Tab for the Financial Overview page */}
        <Tab
          label="Financial Overview"
          value="/financial-overview"
          to="/financial-overview"
          component={Link} // Using Link component from react-router-dom for navigation
        />
      </Tabs>
    </Container>
  );
};

export default Header; // Exporting Header component
