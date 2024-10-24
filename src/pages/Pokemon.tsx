import "./Pokemon.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Pokemon() {
  const [pokemonData, setPokemonData] = useState(null);
  const { pokemonName } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        console.log(res.data);
        setPokemonData(res.data);
      });
  }, []);

  return <main></main>;
}

export default Pokemon;
