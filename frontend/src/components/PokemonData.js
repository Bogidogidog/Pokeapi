import React, { useEffect, useState } from "react";
import { NoPokemonFound } from "./NoPokemonFound";
import { PokemonFound } from "./PokemonFound";
import ConstGeneral from "../constants/ConstGeneral";
import { GetRandomItemFromArray } from "./functions/GetRandomItemFromArray";

// starting pokemons
let usersPokemon = [];

const PokemonData = ({ user, locationUrl, setEncounterEnded }) => {
  const [pokemon, setPokemon] = useState(null);
  const [ourPokemons, setOurPokemons] = useState(null);
  const [opponentUrl, setOpponentUrl] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(`${ConstGeneral.API_URL}/users/${user.id}/profile`)
        if(!response.ok){
          throw new Error("failed to fetch")
        }
        const data = await response.json();
        usersPokemon = data.pokemons
        console.log(usersPokemon)
        // set user's pokemons
        const usersPokemons = await Promise.all(
          usersPokemon.map(async (pokeApi) => {
            const pokeApiResponse = await fetch(pokeApi);
            const pokeApiData = await pokeApiResponse.json();
            return pokeApiData;
          })
        );
        setOurPokemons(usersPokemons);

        // set the adversary pokemon
        const locationResponse = await fetch(locationUrl);
        const locationData = await locationResponse.json();
        const areas = locationData.areas;
        const randomAreas = GetRandomItemFromArray(areas);
        const areaUrl = randomAreas.url;
        const areaResponse = await fetch(areaUrl);
        const areaData = await areaResponse.json();
        const pokemonEncounters = areaData.pokemon_encounters;
        if (pokemonEncounters.length > 0) {
          const randomPokemonEncounter =
            GetRandomItemFromArray(pokemonEncounters);
          const pokemonUrl = randomPokemonEncounter.pokemon.url;
          setOpponentUrl(pokemonUrl);
          const pokemonResponse = await fetch(pokemonUrl);
          const pokemonData = await pokemonResponse.json();
          setPokemon(pokemonData);
        } else {
          setPokemon("none");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPokemons();
  }, [locationUrl, user.id]);

  const handleEncounterEnd = () => {
    setEncounterEnded(true);
  };

  return (
    <div>
      {pokemon === null || pokemon === "none" ? (
        <NoPokemonFound onTryAnotherLocation={handleEncounterEnd} />
      ) : (
        <PokemonFound
          pokemon={pokemon}
          usersPokemon={usersPokemon}
          opponentUrl={opponentUrl}
          ourPokemons={ourPokemons}
          onEncounterEnd={handleEncounterEnd}
          user={user}
        />
      )}
    </div>
  );
};

export default PokemonData