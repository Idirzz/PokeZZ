import { Routes, Route, Navigate } from "react-router-dom";
import SearchPage from "./pages/Search";
import Pokemon from "./pages/Pokemon";
import "./main.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/pokemon/:pokemonName" element={<Pokemon />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/Search" replace />} />
      </Routes>
    </>
  );
}

export default App;
