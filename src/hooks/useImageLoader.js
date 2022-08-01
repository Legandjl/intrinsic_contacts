import { useState } from "react";

const useImageLoader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const loadImage = (url) => {
    setImageLoaded(false);
    const image = new Image();
    image.src = url;
    image.onload = () => {
      setImageLoaded(true);
    };
    image.onerror = () => {
      setImageLoaded(true);
      setImageError(true);
    };
  };

  return [imageLoaded, loadImage, imageError];
};

export default useImageLoader;
