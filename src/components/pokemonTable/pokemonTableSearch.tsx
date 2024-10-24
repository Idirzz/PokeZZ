import SortByASC from "./sortByASC.component";
import SortByElement from "./sortByElement.component";
import SortByRegion from "./sortByRegion.component";
import "./pokemonTableSearch.css";

interface PokemonTableSearchProps {
  sortByAsc: () => void;
  sortByASC: boolean;
  setSelectedType: (type: string) => void;
  selectedType: string;
  setSelectedRegion: (type: string) => void;
  selectedRegion: string;
}

function PokemonTableSearch({
  sortByAsc,
  sortByASC,
  selectedType,
  setSelectedType,
  selectedRegion,
  setSelectedRegion,
}: PokemonTableSearchProps) {
  return (
    <ul className="tableSearchUL">
      <li>
        <SortByASC sortByAsc={sortByAsc} sortByASC={sortByASC} />
      </li>
      <li>
        <SortByElement
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </li>
      <li>
        <SortByRegion
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </li>
    </ul>
  );
}

export default PokemonTableSearch;
