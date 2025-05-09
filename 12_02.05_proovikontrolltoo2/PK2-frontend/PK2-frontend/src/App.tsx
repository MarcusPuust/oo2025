import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SingleWord from "./pages/SingleWord";

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/word/:id" element={<SingleWord />} />
      </Routes>
    </div>
  );
}

export default App;



