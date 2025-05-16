import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AddPost from "./pages/AddPost";
import SinglePost from "./pages/SinglePost"; // ← lisa see import
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/post/:id" element={<SinglePost />} /> {/* ← uus route */}
        <Route path="*" element={<div>404 – Lehte ei leitud</div>} />
      </Routes>
    </>
  );
}

export default App;



