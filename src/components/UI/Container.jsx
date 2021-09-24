import React from "react";

const Container = ({ children }) => {
  return (
    <main
      style={{
        width: "90%",
        margin: "2rem auto",
      }}
    >
      {children}
    </main>
  );
};

export default Container;
