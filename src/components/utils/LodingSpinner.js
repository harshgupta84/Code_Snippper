import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import loadingAnimation from "./loadingAnimation.json";

const LoadingSpinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 1000); // Set the delay duration here (1000 milliseconds = 1 second)

    return () => clearTimeout(timer);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    showSpinner && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Lottie options={defaultOptions} height={120} width={120} />
      </div>
    )
  );
};

export default LoadingSpinner;
