import React, { useState } from "react";
import { Battle } from "./Battle";
import { CapitalizeFirstLetter } from "./functions/CapitalizeFirstLetter";

let index = null;

export const PokemonFound = ({
  pokemon,
  usersPokemon,
  opponentUrl,
  ourPokemons,
  onEncounterEnd,
  user,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleEncounterEnd = () => {
    onEncounterEnd(true);
  };

  const choosePokemon = (id) => {
    index = id;
    setIsClicked(true);
  };

  return (
    <div>
      {isClicked ? (
        <Battle
          myPokemon={ourPokemons[index]}
          opponent={pokemon}
          encounterEnd={handleEncounterEnd}
          usersPokemon={usersPokemon}
          opponentUrl={opponentUrl}
          user={user}
        />
      ) : (
        <div>
          <div id="ourPokemons">
            <div className="container text-center">
              <h2>Choose your pokemon</h2>
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
                            onClick={() => choosePokemon(i)}
                          >
                            <img
                              src={ourPoke.sprites.other.home.front_shiny}
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
            </div>
            <div className="row justify-content-md-center mb-5  text-center">
              <h2>Your opponent</h2>
              <div id="opponent" className="col-md-auto">
                <div className="card text-center" style={{ width: "15rem" }}>
                  <div className="card-header bg-transparent">
                    <h4 className="text-center">
                      {CapitalizeFirstLetter(pokemon.name)}
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <img
                        src={pokemon.sprites.other.home.front_shiny}
                        alt={pokemon.name}
                        className="w-25"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <button
              className="btn btn-info w-auto"
              onClick={handleEncounterEnd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-skip-backward-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M11.729 5.055a.5.5 0 0 0-.52.038L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.271-.445z" />
              </svg>
              &nbsp; Locations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
