import React, { useEffect, useState } from "react";
import ConstGeneral from "../constants/ConstGeneral";
import { CapitalizeFirstLetter } from "./functions/CapitalizeFirstLetter";

let starterPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/squirtle",
];

const StarterPokemon = ({ user, onClick }) => {
    const [ourPokemons, setOurPokemons] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const usersPokemons = await Promise.all(
                    starterPokemon.map(async (pokeApi) => {
                        const pokeApiResponse = await fetch(pokeApi);
                        const pokeApiData = await pokeApiResponse.json();
                        
                        return pokeApiData;
                    })
                );
                setOurPokemons(usersPokemons);
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                console.error(err);
                setLoading(false); // Set loading to false on error
            }
        };
        fetchPokemons();
    }, [user.id]);

    const choosePokemon = (ourPoke, i) => {
        console.log(starterPokemon[i])
      const request = {
        
        method: "POST",
        headers:{ "Content-Type": "text/plain"},
        body: starterPokemon[i],
      };
      fetch(`${ConstGeneral.API_URL}/users/${user.id}/pokemons`, request)
        .then((response) => response.json())
        .then((data) => console.log("worked", data))
        .catch((error) => console.error("damnit", error));

        onClick(true);
    };

    return (
        <div id="ourPokemons">
            <div className="container text-center">
                <h2>Choose your pokemon</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="row justify-content-md-center">
                        {ourPokemons.map((ourPoke, i) => (
                            <div key={i} className="col-md-3">
                                <div className="card w-75 mb-3">
                                <div className="card-header bg-transparent">
                                    <h4 className="text-center">
                                        {CapitalizeFirstLetter(ourPoke.name)}
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="mx-auto text-center">
                                        <button
                                            className="btn"
                                            onClick={() => choosePokemon(ourPoke, i)}
                                        >
                                            <img
                                                src={
                                                    ourPoke.sprites.other.home
                                                        .front_shiny
                                                }
                                                alt={ourPoke.name}
                                                className="w-50"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
                </div>
                </div>
      );
};

export default StarterPokemon;
