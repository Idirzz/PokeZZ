import PokemonTableSearch from "./pokemonTableSearch";
import { useState, useEffect } from "react";

function PokemonTable() {
  const [sortByASC, setSortByASC] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>("none");
  const [selectedRegion, setSelectedRegion] = useState<string>("none");

  function handleTypeChange(type: string) {
    setSelectedType(type);
  }
  function handleRegionChange(region: string) {
    setSelectedRegion(region);
  }

  useEffect(() => {
    console.log(
      "Une variable a changé :",
      sortByASC,
      selectedType,
      selectedRegion
    );
  }, [sortByASC, selectedType, selectedRegion]);

  return (
    <>
      <PokemonTableSearch
        sortByAsc={() => setSortByASC(!sortByASC)}
        sortByASC={sortByASC}
        selectedType={selectedType}
        setSelectedType={handleTypeChange}
        selectedRegion={selectedRegion}
        setSelectedRegion={handleRegionChange}
      />
    </>
  );
}
export default PokemonTable;
