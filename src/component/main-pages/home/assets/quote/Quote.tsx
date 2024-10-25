import React, { useEffect, useState } from "react";
import quotes from "public/assets/MotivationalQuote.json"; // Import the JSON file
import "./Quote.scss";
const RandomQuote: React.FC = () => {
  // Set up state to hold the randomly selected quote
  const [randomQuote] = useState(getRandomQuote());
  const [visible, setVisible] = useState(false);
  // Function to get a random quote from the array
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 200);
  }, []);
  // Function to handle button click for getting a new random quote
  //   const handleNewQuote = () => {
  //     setRandomQuote(getRandomQuote());
  //   };

  return (
    <div className={`random-quote-container ${visible && "visible"}`} style={{ padding: "20px", textAlign: "center" }}>
      <p style={{ fontSize: "1.5rem" }}>"{randomQuote.quote}"</p>
      <p style={{ fontStyle: "italic" }}>- {randomQuote.author}</p>
    </div>
  );
};

export default RandomQuote;
