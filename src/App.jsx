import "./App.css";

import { useEffect, useState } from "react";
import InlinePicker from "./components/picker/picker";

import { imageMap, svgMap } from "./constants/images";

const values = {
  environment: ["beach", "city", "forest", "mountain"],
  weather: ["cloudy", "rainy", "snowy", "sunny"],
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [currentImage, setCurrentImage] = useState(imageMap["beach_sunny"]);
  const [currentIcons, setCurrentIcons] = useState({
    environment: svgMap["beach"],
    weather: svgMap["sunny"]
  });
  const [pickerValue, setPickerValue] = useState({
    environment: "beach",
    weather: "sunny",
  });

  const [isFadingLeft, setIsFadingLeft] = useState(false); 
  const [isFadingRight, setIsFadingRight] = useState(false);

  const handleLeftChange = (value) => {
    if (typeof value === "function") {
      console.warn(
        "Un valor inesperado fue recibido en handleLeftChange:",
        value
      );
      return;
    }
    setPickerValue(value);
  };

  useEffect(() => {
    setIsFadingLeft(true);
    setCurrentIcons((prevIcons) => ({
      ...prevIcons,
      environment: svgMap[pickerValue.environment],
    }));
    const timeout = setTimeout(() => setIsFadingLeft(false),1000); 
    return () => clearTimeout(timeout);
  }, [pickerValue.environment]);


  useEffect(() => {
    setIsFadingRight(true);
    setCurrentIcons((prevIcons) => ({
      ...prevIcons,
      weather: svgMap[pickerValue.weather],
    }));
    const timeout = setTimeout(() => setIsFadingRight(false), 1000);
    return () => clearTimeout(timeout);
  }, [pickerValue.weather]);

  useEffect(() => {
    const key = `${pickerValue.environment}_${pickerValue.weather}`;
    if (imageMap[key]) {
      console.log("imageMap[key] -> ", imageMap[key]);
      const listImagesSelected = imageMap[key];
      const index = getRandomInt(listImagesSelected.length);
      console.log({ index });

      setCurrentImage(imageMap[key][index]);
    }
  }, [pickerValue]);

  return (
    <section className="p-6 sm:p-10 md:p-12 flex w-full flex-col bg-[#222] text-white min-h-screen">
      <header className="mb-8 w-full text-center text-3xl font-bold leading-[36px] text-white hover:text-gray-300 transition duration-300 flex items-center justify-center gap-x-4">
        <h1 className="text-[25px] md:text-[30px]">
        Weather Wheel
        </h1>
        <div className="flex items-center gap-x-2">
          <img src={currentIcons.environment} className={`w-12 h-12 ${isFadingLeft ? 'animate-fade-up': ''}`}/>
          <img src={currentIcons.weather} className={`w-12 h-12 ${isFadingRight ? 'animate-fade-left' : '' }`}/>
        </div>
      </header>

      <main className="flex w-full items-center justify-center gap-8 md:gap-20 [flex-flow:column]  md:[flex-flow:initial]">
        <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 h-80 overflow-hidden border-4 border-gray-700 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          <img
            src={currentImage}
            alt="image"
            className="w-full h-full object-cover mix-blend-multiply rounded-lg"
          />
        </div>
        <InlinePicker
          label=""
          values={values}
          pickerValue={pickerValue}
          setPickerValue={handleLeftChange}
        />
      </main>
    </section>
  );
}

export default App;
