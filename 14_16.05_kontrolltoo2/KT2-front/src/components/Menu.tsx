import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Postitused</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/">Avaleht</Link>
        <Link className="nav-link" to="/add">Lisa postitus</Link>
        <Link className="nav-link" to="/users">Kasutajad</Link> {/* ← Lisatud */}
      </div>
    </nav>
  );
}

export default Menu;

