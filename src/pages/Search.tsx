import SearchBar from "../components/searchBar.component";
import RandomPokemon from "../components/randomPokemon.component";
import PokemonTable from "../components/PokemonTable.component";
import "./Search.css";

function SearchPage() {
  return (
    <main>
      <div className="mainContainer">
        <h1>Search your pokemon</h1>
        <SearchBar resultsHeight={60} minChar={1} nbrOfElements={5} />
        <RandomPokemon imgHeight={66} />
      </div>
      <h2>Or browse them !</h2>
      <PokemonTable />
    </main>
  );
}

export default SearchPage;
