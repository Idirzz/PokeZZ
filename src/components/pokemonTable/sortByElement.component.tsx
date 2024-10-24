import axios from "axios";
import { useState, useEffect } from "react";

interface Item {
  value: string;
}

interface SortByElementProps {
  setSelectedType: (type: string) => void;
  selectedType: string;
}

function SortByElement({ setSelectedType, selectedType }: SortByElementProps) {
  const [types, setTypes] = useState<Item[]>([]);

  async function fetchTypes() {
    const res = await axios.get(`https://pokeapi.co/api/v2/type/`);
    for (const type of res.data.results) {
      const typeData = await axios.get(type.url);
      const newType =
        typeData.data.sprites["generation-iv"]["diamond-pearl"].name_icon;
      if (newType) {
        setTypes((prevTypes) => [...prevTypes, { value: type.name }]);
      }
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <select value={selectedType} onChange={handleSelectChange}>
      <option value="none">Type</option>
      {types.map((el) => {
        return (
          <option key={el.value} value={el.value}>
            {el.value}
          </option>
        );
      })}
    </select>
  );
}

export default SortByElement;
