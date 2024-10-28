import SortByASC from "./SortByASC";
import SortByElement from "./SortByElement";

interface PokemonTableSearchProps {
  sortByAsc: () => void;
  sortByASC: boolean;
  setSelectedType: (type: string) => void;
  selectedType: string;
}

function PokemonTableSearch({
  sortByAsc,
  sortByASC,
  selectedType,
  setSelectedType,
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
    </ul>
  );
}

export default PokemonTableSearch;
