import "./App.css";

import { useEffect, useState } from "react";
import InlinePicker from "./components/picker/picker";

import { imageMap } from "./constants/images";

const values = {
  environment: ["beach", "city", "forest", "mountain"],
  weather: ["cloudy", "rainy", "snowy", "sunny"],
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [currentImage, setCurrentImage] = useState(imageMap["beach_sunny"]);
  const [pickerValue, setPickerValue] = useState({
    environment: "beach",
    weather: "sunny",
  });

  console.log({ pickerValue });

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
    <section className="p-6 sm:p-10 md:p-12 flex w-full flex-col bg-black text-white min-h-screen">
      <header className="mb-8 w-full text-center text-3xl font-bold leading-[36px] text-white hover:text-gray-300 transition duration-300">
  Weather Wheel
</header>

      <main className="flex w-full items-center justify-center gap-8 md:gap-20 [flex-flow:column]  md:[flex-flow:initial]">
        <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 h-80 overflow-hidden border-4 border-gray-700 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          <img
            src={currentImage}
            alt="image"
            className="w-full h-full object-cover mix-blend-multiply rounded-xl"
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
