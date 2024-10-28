import PokemonList from "./pokemonTable/PokemonList";
import PokemonTableSearch from "./pokemonTable/PokemonTableSearch";
import { useState } from "react";
import "./PokemonTable.component.css";

function PokemonTable() {
  const [sortByASC, setSortByASC] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>("none");

  function handleTypeChange(type: string) {
    setSelectedType(type);
  }

  return (
    <>
      <PokemonTableSearch
        sortByAsc={() => setSortByASC(!sortByASC)}
        sortByASC={sortByASC}
        selectedType={selectedType}
        setSelectedType={handleTypeChange}
      />
      <PokemonList sortByASC={sortByASC} selectedType={selectedType} />
    </>
  );
}
export default PokemonTable;
