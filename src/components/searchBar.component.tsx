import axios from "axios";
import { useState, useEffect } from "react";
import "./searchBar.component.css";

interface Item {
  name: string;
  url: string;
  imgUrl?: string;
}
interface SearchBarProps {
  resultsHeight: number;
  nbrOfElements: number;
  minChar: number;
}

async function getImgUlrs(pokemons: Item[]) {
  for (const pokemon of pokemons) {
    const res = await axios.get(pokemon.url);
    pokemon.imgUrl = res.data.sprites.front_default;
  }
  return pokemons;
}

async function getPokemons() {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  return res.data.results;
}

function SearchBar({ resultsHeight, nbrOfElements, minChar }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setsearchResults] = useState<Item[]>([]);
  const [pokemons, setPokemons] = useState<Item[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const test = await getPokemons();
      setPokemons(test);
    };
    fetchPokemons();
  }, []);

  async function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    if (e.target.value.length >= minChar) {
      const foundResults = checkInclude(pokemons, e.target.value);
      setsearchResults(await foundResults);
    }
  }

  async function checkInclude(arr: Item[], str: string) {
    arr = arr
      .filter((el) => {
        return el.name.includes(str.toLowerCase());
      })
      .splice(0, nbrOfElements);
    arr = await getImgUlrs(arr);
    return arr;
  }

  return (
    <div id="searchBarContainer">
      <input
        placeholder="Charizard"
        value={search}
        onChange={handleSearchChange}
        type="text"
      ></input>
      <ul style={{ maxHeight: resultsHeight + "vh" }} className="resultList">
        {searchResults.map((pokemon) => (
          <li
            style={{ maxHeight: resultsHeight / nbrOfElements + "vh" }}
            key={pokemon.name}
          >
            <a key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
              <p>{pokemon.name}</p>
              <img
                style={{ height: resultsHeight / nbrOfElements + "vh" }}
                src={pokemon.imgUrl}
                alt="pokemon"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
