import { useEffect, useState } from "react";
import { colors } from "../utils/constants";

const useRandomBackground = () => {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  return {
    backgroundColor,
  };
};

export default useRandomBackground;