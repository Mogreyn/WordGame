import React from "react";

const CorrectWordsList = ({ correctWords }) => {
  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      {correctWords.map((word, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            minWidth: "120px",
            textAlign: "center",
            transition: "transform 0.3s",
          }}
        >
          <p>{word}</p>
        </div>
      ))}
    </div>
  );
};

export default CorrectWordsList;
