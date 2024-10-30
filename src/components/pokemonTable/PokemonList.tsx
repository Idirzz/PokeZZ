import { useState, useEffect } from "react";
import axios from "axios";
import "./pokemonList.css";
import Loader from "../Loader.component";

interface PokemonTableSearchProps {
  sortByASC: boolean;
  selectedType: string;
}

interface PokemonListData {
  results: [
    {
      name: string;
      url: string;
    }
  ];
}
interface PokemonTypeData {
  type: {
    name: string;
    url: string;
  };
}

interface PokemonData {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string; url?: string } }[];
}

function PokemonTableSearch({
  sortByASC,
  selectedType,
}: PokemonTableSearchProps) {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offSet, setOffset] = useState<number>(0);

  async function getTypesImgs(arr: any) {
    let ret: PokemonTypeData[] = [];
    for (const el of arr) {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/type/${el.type.name}`
      );
      const url = res.data.sprites["generation-vii"]["sun-moon"].name_icon;
      ret.push({
        type: {
          name: el.type.name,
          url: url,
        },
      });
    }
    return ret;
  }

  async function checkPokemons(type: string, arr: PokemonListData) {
    let tmpArr: PokemonData[] = [];
    for (const pokemon of arr.results) {
      {
        let res = await axios.get(pokemon.url);
        const types = await getTypesImgs(res.data.types);
        const pokemonData: PokemonData = {
          name: res.data.name,
          id: res.data.id,
          sprites: {
            front_default: res.data.sprites.front_default,
          },
          types: types,
        };
        if (type !== "none") {
          if (res.data.types.some((t: PokemonTypeData) => t.type.name === type))
            tmpArr.push(pokemonData);
        } else {
          tmpArr.push(pokemonData);
        }
      }
    }
    return tmpArr;
  }

  async function fetchPokemons(offsetParam: number, type: string) {
    let tmpPokemonList: PokemonData[] = pokemonList;
    if (offsetParam === 0) tmpPokemonList = [];
    let newPokemons: PokemonData[] = [];
    let whileOffSet = offsetParam;
    while (newPokemons.length < 10 && whileOffSet < 1025) {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${whileOffSet}`
      );
      newPokemons = newPokemons.concat(await checkPokemons(type, res.data));
      whileOffSet += 10;
    }
    if (newPokemons.length > 10) {
      newPokemons = newPokemons.slice(0, 10);
      whileOffSet = newPokemons[9].id;
    }
    setOffset(whileOffSet);
    tmpPokemonList = tmpPokemonList.concat(newPokemons);
    setPokemonList(tmpPokemonList);
    setIsLoaded(true);
    setIsLoading(false);
  }

  function onClickLoadMore() {
    setIsLoading(true);
    fetchPokemons(offSet, selectedType);
  }

  useEffect(() => {
    setIsLoaded(false);
    setPokemonList([]);
    setOffset(0);
    fetchPokemons(0, selectedType);
  }, [selectedType]);

  return isLoaded ? (
    <>
      <ul
        style={
          sortByASC
            ? { flexDirection: "column" }
            : { flexDirection: "column-reverse" }
        }
        className="listPokemonContainer"
      >
        {pokemonList.map((pokemon) => {
          return (
            <li className="pokemonListElementContainer" key={pokemon.id}>
              <ul className="PokemonListElement fadeIn">
                <li>{pokemon.id}</li>

                <li>
                  <a href={"/pokemon/" + pokemon.name}>
                    <img src={pokemon.sprites.front_default} />
                  </a>
                </li>
                <li>
                  <a href={"/pokemon/" + pokemon.name}>{pokemon.name}</a>
                </li>

                <ul className="typeList">
                  {pokemon.types.map((type) => {
                    return (
                      <li key={type.type.name}>
                        <img alt="pokemon" src={type.type.url} />
                      </li>
                    );
                  })}
                </ul>
              </ul>
            </li>
          );
        })}
      </ul>
      {isLoading ? (
        <Loader />
      ) : (
        <img
          id="load-more"
          src="https://www.svgrepo.com/show/532997/plus-large.svg"
          onClick={onClickLoadMore}
          alt="Load more"
        />
      )}
    </>
  ) : (
    <Loader />
  );
}

export default PokemonTableSearch;
