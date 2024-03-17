import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleOnError = (error) => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <>
        <h1>404 - Not Found</h1>
        <button onClick={() => navigate("/")}>go to home</button>
      </>
    );
  }

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          onError: handleOnError,
        });
      })}
    </React.Fragment>
  );
}

export default ErrorBoundary;
