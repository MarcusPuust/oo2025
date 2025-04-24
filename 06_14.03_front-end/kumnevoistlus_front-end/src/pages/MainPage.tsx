import { useCallback, useEffect, useRef, useState } from "react";
import { Athlete } from "../models/Athletes";
import { Result } from "../models/Results";
import "bootstrap/dist/css/bootstrap.min.css";

function MainPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [totalAthletes, setTotalAthletes] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [countriesByPage, setCountriesByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [activeCountry, setActiveCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  const countriesByPageRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then((json: Athlete[]) => {
        setCountries([...new Set(json.map((a: Athlete) => a.country))]);
      });
  }, []);

  const showByCountry = useCallback((athleteCountry: string, currentPage: number) => {
    setActiveCountry(athleteCountry);
    setPage(currentPage);
    setSelectedAthlete(null);

    fetch(
      `http://localhost:8080/athletes-country?country=${athleteCountry}&size=${countriesByPage}&page=${currentPage}`
    )
      .then(res => res.json())
      .then(json => {
        setAthletes(json.content);
        setTotalAthletes(json.totalElements);
        setTotalPages(json.totalPages);
      });

    fetch(`http://localhost:8080/results-by-country?country=${athleteCountry}`)
      .then(res => res.json())
      .then((json: Result[]) => {
        setResults(json);
      });
  }, [countriesByPage]);

  useEffect(() => {
    showByCountry("", 0);
  }, [showByCountry]);

  function updatePage(newPage: number) {
    showByCountry(activeCountry, newPage);
  }

  function handleAthleteClick(athlete: Athlete) {
    setSelectedAthlete(athlete);
    fetch(`http://localhost:8080/results-by-country?country=${athlete.country}`)
      .then(res => res.json())
      .then((json: Result[]) => {
        const filtered = json.filter(r => r.athlete.id === athlete.id);
        setResults(filtered);
      });
  }

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="pageSizeSelect" className="form-label">Athletes on page:</label>
        <select
          ref={countriesByPageRef}
          className="form-select w-auto d-inline-block ms-2"
          onChange={() => setCountriesByPage(Number(countriesByPageRef.current?.value))}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>

        <label htmlFor="countrySelect" className="form-label ms-3">Choose country:</label>
        <select
          id="countrySelect"
          className="form-select w-auto d-inline-block ms-2"
          value={activeCountry}
          onChange={(e) => showByCountry(e.target.value, 0)}
        >
          <option value="">All countries</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">Total athletes: {totalAthletes}</div>

      {!selectedAthlete && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Age</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map(athlete => (
              <tr key={athlete.id} onClick={() => handleAthleteClick(athlete)} style={{ cursor: 'pointer' }}>
                <td>{athlete.name}</td>
                <td>{athlete.country}</td>
                <td>{athlete.age}</td>
                <td>{athlete.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedAthlete && (
        <div className="mb-4">
          <h2>{selectedAthlete.name} tulemused</h2>
          <button className="btn btn-outline-secondary mb-3" onClick={() => setSelectedAthlete(null)}>Back</button>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Event</th>
                <th>Score</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.id}>
                  <td>{result.event}</td>
                  <td>{result.score}</td>
                  <td>{result.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!selectedAthlete && (
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light" disabled={page === 0} onClick={() => updatePage(page - 1)}>Previous</button>
          <span>{page + 1}</span>
          <button className="btn btn-light" disabled={page >= totalPages - 1} onClick={() => updatePage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default MainPage;