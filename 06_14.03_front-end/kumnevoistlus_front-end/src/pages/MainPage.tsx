import { useCallback, useEffect, useRef, useState } from "react";
import { Athlete } from "../models/Athletes";
import { Link } from "react-router-dom";

function MainPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [totalAthletes, setTotalAthletes] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [countriesByPage, setCountriesByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [activeCountry, setActiveCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [sort, setSort] = useState("name,asc");
  const countriesByPageRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then((json: Athlete[]) => setCountries([...new Set(json.map((a: Athlete) => a.country))]))
  }, []);

  const showByCountry = useCallback((athleteCountry: string, currentPage: number) => {
    setActiveCountry(athleteCountry);
    setPage(currentPage);
    fetch("http://localhost:8080/athletes-country?country=" + athleteCountry + 
      "&size=" + countriesByPage + 
      "&page=" + currentPage + 
      "&sort=" + sort
    )
      .then(res => res.json())
      .then(json => {
        setAthletes(json.content);
        setTotalAthletes(json.totalElements);
        setTotalPages(json.totalPages);
      })
  }, [countriesByPage, sort]);

  useEffect(() => {
    showByCountry(activeCountry, 0);
  }, [showByCountry, activeCountry, sort]);
  

  function updatePage(newPage: number) {
    showByCountry(activeCountry, newPage);
  }

  return (
    <div>
      <button onClick={() => setSort("name,asc")}>Sorteeri A-Z</button>
      <button onClick={() => setSort("name,desc")}>Sorteeri Z-A</button>
      <button onClick={() => setSort("age,asc")}>Sorteeri vanuse järgi kasvav</button>
      <button onClick={() => setSort("age,desc")}>Sorteeri vanuse järgi kahanev</button>
      <button onClick={() => setSort("totalPoints,asc")}>Sorteeri punktide järgi kasvav</button>
      <button onClick={() => setSort("totalPoints,desc")}>Sorteeri punktide järgi kahanev</button>

      <select 
        ref={countriesByPageRef}
        onChange={() => setCountriesByPage(Number(countriesByPageRef.current?.value))}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>      

      <div>Sportlasi kokku: {totalAthletes}</div>

      <button onClick={() => showByCountry("", 0)}>All athletes</button>

      {countries.map(country => (
        <button key={country} onClick={() => showByCountry(country, 0)}>
          {country}
        </button>
      ))}

      <br />
      <br />

      {athletes.map(athlete => (
        <div key={athlete.id} className="athlete-card">
          <div className="athlete-name">{athlete.name}</div>
          <div>{athlete.country}</div>
          <div>{athlete.age}</div>
          <div>{athlete.totalPoints}</div>
          <Link to={"/athlete/" + athlete.id}>
            <button>Vaata sportlast</button>
          </Link>
        </div>
      ))}

      <button disabled={page === 0} onClick={() => updatePage(page - 1)}>Eelmine</button>
      <span>{page + 1}</span>
      <button disabled={page >= totalPages - 1} onClick={() => updatePage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default MainPage;
