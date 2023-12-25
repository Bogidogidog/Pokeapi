import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Locations from "../components/Locations";
import PokemonData from "../components/PokemonData";
import Starterpokemon from "../components/Starterpokemon";

const PageHome = () => {
    const user = useLocation().state.user;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [encounterEnded, setEncounterEnded] = useState(true);
    const [starterPokemon, setStarterPokemon] = useState(false);
    
    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setEncounterEnded(false);
    };

    const handleEncounterEnd = () => {
        setSelectedLocation(null);
        setEncounterEnded(true);
    };

    const handlerStarterPokemon = () => {
        setStarterPokemon(true);
        console.log("clicked");
    };

    return (
        <div>
            {starterPokemon || user.pokemons.length > 0 ? (
                encounterEnded ? (
                    <Locations user={user} onSelect={handleLocationSelect} />
                ) : (
                    <PokemonData
                        user={user}
                        locationUrl={selectedLocation}
                        setEncounterEnded={handleEncounterEnd}
                    />
                )
            ) : (
                <Starterpokemon user={user} onClick={handlerStarterPokemon} />
            )}
        </div>
    );
};

export default PageHome;
