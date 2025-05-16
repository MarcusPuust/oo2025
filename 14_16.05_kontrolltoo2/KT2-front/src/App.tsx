import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AddPost from "./pages/AddPost";
import SinglePost from "./pages/SinglePost"; 
import Menu from "./components/Menu";
import UsersPage from "./pages/UsersPage";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserPosts />} />
        <Route path="*" element={<div>404 – Lehte ei leitud</div>} />
      </Routes>
    </>
  );
}

export default App;




