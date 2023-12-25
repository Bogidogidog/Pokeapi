import React, { useState } from "react";
import ConstGeneral from "../constants/ConstGeneral";
import { CapitalizeFirstLetter } from "./functions/CapitalizeFirstLetter";

export const Battle = ({
  myPokemon,
  opponent,
  encounterEnd,
  usersPokemon,
  opponentUrl,
  user,
}) => {
  const [battleEnded, setBattleEnded] = useState(false);
  const [win, setWin] = useState(false);
  const [displayOurHP, setDisplayOurHP] = useState(null);
  const [displayOpponentHP, setDisplayOpponentHP] = useState(null);
  const [startBattle, setStartBattle] = useState(false);

  const handleEncounterEnd = () => {
    encounterEnd(true);
  };
  const handleCatch = () => {console.log("add to pokemons");
  const request = {
    method: "POST",
    headers:{ "Content-Type": "text/plain"},
    body: (opponentUrl),
  };
  fetch(`${ConstGeneral.API_URL}/users/${user.id}/pokemons`, request)
    .then((response) => response.json())
    .then((data) => console.log("worked", data))
    .catch((error) => console.error("damnit", error));
};

  const handleHp = async () => {
    let playerTurn = true;
    let opponentHp = opponent.stats[0].base_stat;
    let ourHp = myPokemon.stats[0].base_stat;

    while (ourHp > 0 && opponentHp > 0) {
      if (playerTurn) {
        opponentHp -=
          ((((2 / 5 + 2) * myPokemon.stats[1].base_stat * 60) /
            opponent.stats[2].base_stat /
            50 +
            2) *
            Math.floor(Math.random(217) * 255)) /
          255;
        await new Promise((resolve) => setTimeout(resolve, 100));
        setDisplayOpponentHP(opponentHp);
      } else {
        ourHp -=
          ((((2 / 5 + 2) * opponent.stats[1].base_stat * 60) /
            myPokemon.stats[2].base_stat /
            50 +
            2) *
            Math.floor(Math.random(217) * 255)) /
          255;
        await new Promise((resolve) => setTimeout(resolve, 100));
        setDisplayOurHP(ourHp);
      }
      playerTurn = !playerTurn;
      setStartBattle(true);
    }

    if (opponentHp <= 0) {
      setWin(true);
      setBattleEnded(true);
      if (!usersPokemon.includes(opponentUrl)){
        usersPokemon.push(opponentUrl)
        handleCatch();
      }
    }
    if (ourHp <= 0) {
      setWin(false);
      setBattleEnded(true);
    }
  };

  return (
    <div>
      {battleEnded ? (
        <div>
          {win ? (
            <div className="container text-center mt-5">
              <div className="row justify-content-md-center">
                <div className="col-md-auto">
                  <h1>You won!</h1>
                  <h2>You have captured:</h2>
                  <h4>
                    {CapitalizeFirstLetter(opponent.name)}
                  </h4>
                  <div>
                    <img
                      src={opponent.sprites.other.home.front_shiny}
                      alt={opponent.name}
                      className="w-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container text-center mt-5">
              <div className="row justify-content-md-center">
                <div className="col-md-auto">
                  <h1>You lost the battle!</h1>
                </div>
              </div>
            </div>
          )}

          <div className="row justify-content-md-center">
            <div className="col-md-auto mt-5 pt-5">
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
        </div>
      ) : (
        <div>
          <div className="container text-center">
            <div className="row justify-content-md-center">
              <div id="ourPoke" className="col-md-auto m-5 p-5">
                <h2>Your Pokemon</h2>
                <h4>
                  {CapitalizeFirstLetter(myPokemon.name)}
                </h4>

                {startBattle ? (
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Example with label"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-info"
                      style={{ width: `${Math.floor(displayOurHP)}%` }}
                    >
                      {Math.floor(displayOurHP)}
                    </div>
                  </div>
                ) : (
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Example with label"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-info"
                      style={{ width: "100%" }}
                    >
                      {myPokemon.stats[0].base_stat}
                    </div>
                  </div>
                )}

                <div>
                  <img
                    src={myPokemon.sprites.front_default}
                    // src={myPokemon.sprites.other.home.front_shiny}
                    alt={myPokemon.name}
                  />
                </div>
              </div>
              <div id="opponent" className="col-md-auto m-5 p-5">
                <h2>Your opponent</h2>
                <h4>
                  {CapitalizeFirstLetter(opponent.name)}
                </h4>

                {startBattle ? (
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Example with label"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-info"
                      style={{ width: `${Math.floor(displayOpponentHP)}%` }}
                    >
                      {Math.floor(displayOpponentHP)}
                    </div>
                  </div>
                ) : (
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Example with label"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-info"
                      style={{ width: "100%" }}
                    >
                      {opponent.stats[0].base_stat}
                    </div>
                  </div>
                )}

                <div>
                  <img
                    src={opponent.sprites.front_default}
                    // src={opponent.sprites.other.home.front_shiny}
                    alt={opponent.name}
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-md-auto m-5 pt-5">
                <button className="btn btn-danger w-auto" onClick={handleHp}>
                  Start Battle
                </button>
              </div>
            </div>
            {/* <div class="row justify-content-md-center">
              <div class="col-md-auto">
              <button
                className="btn btn-info w-auto"
                onClick={handleEncounterEnd}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-skip-backward-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M11.729 5.055a.5.5 0 0 0-.52.038L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.271-.445z" />
                </svg>
                &nbsp; Locations
              </button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
