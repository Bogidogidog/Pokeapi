import React, { useState, useEffect } from "react";
import { LocationButtons } from "./buttons/LocationButtons.js";
import { PrevButton } from "./buttons/PrevButton";
import { NextButton } from "./buttons/NextButton";
import { CapitalizeFirstLetter } from "./functions/CapitalizeFirstLetter.js";

const Locations = ({ onSelect }) => {
  const [locations, setLocations] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/location/");
        const data = await response.json();
        setLocations(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocations();
  }, []);

  const handleNextPage = async () => {
    try {
      const response = await fetch(nextPage);
      const data = await response.json();
      setLocations(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrevPage = async () => {
    try {
      const response = await fetch(prevPage);
      const data = await response.json();
      setLocations(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="root">
      <div className="container text-center">
        <h2 className="m-5">Please select city or place</h2>
        <div className="row justify-content-md-center">
          {locations.map((location) => (
            <div key={location.name} className="col-md-auto m-3">
              <LocationButtons
                text={CapitalizeFirstLetter(location.name)}
                onClick={() => onSelect(location.url)}
              />
            </div>
          ))}
        </div>
        <div className="col justify-content-md-center m-5">
          <PrevButton onPrevClick={handlePrevPage} />
          <NextButton onNextClick={handleNextPage} />
        </div>
      </div>
    </div>
  );
};

export default Locations;
