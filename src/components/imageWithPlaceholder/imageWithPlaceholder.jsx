import { useEffect, useState } from "react";

function ImageWithPlaceholder({ src, alt, width, height }) {
  const [isLoaded, setIsLoaded] = useState(false);

  console.log({ isLoaded })

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Reiniciar el estado de carga cuando se cambie la imagen
  useEffect(() => {
    setIsLoaded(false);  // Reiniciar el estado cuando la imagen cambia
  }, [src]);
  
  return (
    <div className="relative" style={{ width, height }}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin" />
         </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`w-full h-[380px] object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        style={{
          objectFit: "cover",  // Esto asegura que la imagen cubra todo el contenedor sin deformarse
          objectPosition: "center",  // Esto asegura que la imagen esté centrada
        }}
      />
    </div>
  );
}

export default ImageWithPlaceholder;
