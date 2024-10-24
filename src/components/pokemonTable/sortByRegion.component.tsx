import axios from "axios";
import { useState, useEffect } from "react";

interface Item {
  value: string;
}

interface SortByElementProps {
  setSelectedRegion: (type: string) => void;
  selectedRegion: string;
}

function SortByElement({
  setSelectedRegion,
  selectedRegion,
}: SortByElementProps) {
  const [regions, setRegions] = useState<Item[]>([]);

  async function fetchRegions() {
    const res = await axios.get(`https://pokeapi.co/api/v2/region/`);
    for (const region of res.data.results) {
      if (region.name) {
        setRegions((prevRegions) => [...prevRegions, { value: region.name }]);
      }
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  return (
    <select value={selectedRegion} onChange={handleSelectChange}>
      <option value="none">Region</option>
      {regions.map((el) => {
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
