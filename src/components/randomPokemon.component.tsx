import "./randomPokemon.component.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface randomPokemonProps {
  imgHeight: number;
}
function RandomPokemon({ imgHeight }: randomPokemonProps) {
  const [pokemonURL, setPokemonURL] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  async function getPokemon() {
    const id = Math.floor(Math.random() * 1025);
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data.sprites.front_default;
  }

  async function fetchPokemons() {
    const test = await getPokemon();
    setPokemonURL(test);
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  return isLoaded ? (
    <img style={{ height: `${imgHeight}vh` }} src={pokemonURL} alt="pokemon" />
  ) : (
    <span style={{ marginTop: `${imgHeight / 2}vh` }} className="loader"></span>
  );
}

export default RandomPokemon;
