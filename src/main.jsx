import React from "react"; // Importing the React library
import ReactDOM from "react-dom/client"; // Importing the ReactDOM library from the client bundle
import App from "./App.jsx"; // Importing the main App component
import "./index.css"; // Importing the index.css file for styling

// Rendering the root component using ReactDOM's createRoot method
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping the App component with React.StrictMode for additional development mode checks
  <React.StrictMode>
    <App /> {/* Rendering the main App component */}
  </React.StrictMode>
);
