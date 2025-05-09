import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SingleWord from "./pages/SingleWord";
import EditWord from "./pages/EditWord";

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/word/:id" element={<SingleWord />} />
        <Route path="/edit-word/:id" element={<EditWord />} />
      </Routes>
    </div>
  );
}

export default App;



