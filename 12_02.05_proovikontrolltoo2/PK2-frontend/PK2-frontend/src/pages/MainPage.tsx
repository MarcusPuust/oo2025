import { useCallback, useEffect, useState, useRef } from 'react'
import type { Manager } from '../models/Manager'
import type { Word } from '../models/Word'
import { Link } from 'react-router-dom';

function MainPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [wordsByPage, setWordsByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("type,asc");
  const [activeManager, setActiveManager] = useState(-1);

  const wordsByPageRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/manager")
      .then(res => res.json())
      .then(json => setManagers(json));
  }, []);

  const showByManager = useCallback((managerId: number, currentPage: number) => {
    setActiveManager(managerId);
    setPage(currentPage);
    fetch(`http://localhost:8080/words-manager?managerId=${managerId}&size=${wordsByPage}&page=${currentPage}&sort=${sort}`)
      .then(res => res.json())
      .then(json => {
        setWords(json.content);
        setTotalWords(json.totalElements);
        setTotalPages(json.totalPages);
      });
  }, [wordsByPage, sort]);

  useEffect(() => {
    showByManager(activeManager, 0);
  }, [showByManager, activeManager, wordsByPage, sort]);

  function updatePage(newPage: number) {
    showByManager(activeManager, newPage);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <div>
          <h5>Sorteeri</h5>
          <button onClick={() => setSort("type,asc")} className="btn btn-outline-primary me-2">A-Z</button>
          <button onClick={() => setSort("type,desc")} className="btn btn-outline-primary">Z-A</button>
        </div>

        <div>
          <h5>Sõnu lehel</h5>
          <select ref={wordsByPageRef} onChange={() => setWordsByPage(Number(wordsByPageRef.current?.value))} className="form-select w-auto">
            <option>1</option>
            <option>3</option>
            <option>5</option>
          </select>
        </div>

        <div>
          <h5>Haldajad</h5>
          <button onClick={() => showByManager(-1, 0)} className="btn btn-outline-secondary me-1">Kõik</button>
          {managers.map(manager =>
            <button key={manager.id} onClick={() => showByManager(manager.id, 0)} className="btn btn-outline-secondary me-1">
              {manager.name}
            </button>
          )}
        </div>
      </div>

      <h4>Kokku sõnu: {totalWords}</h4>
      <div className="mb-3">
        {words.map(word =>
          <div key={word.id} className="mb-3 border-bottom pb-2">
            <strong>{word.type}</strong>
            <Link to={'/word/' + word.id}>
              <button className="btn btn-sm btn-primary ms-2">Vaata tähendust</button>
            </Link>
            <br />
            Haldaja:
            <Link to={'/manager/' + word.manager?.id}>
              <button className="btn btn-sm btn-secondary ms-2">{word.manager?.name}</button>
            </Link>
          </div>
        )}
      </div>

      <div className="d-flex align-items-center gap-3">
        <button disabled={page === 0} onClick={() => updatePage(page - 1)} className="btn btn-secondary">Eelmine</button>
        <span>Leht {page + 1}</span>
        <button disabled={page + 1 >= totalPages} onClick={() => updatePage(page + 1)} className="btn btn-secondary">Järgmine</button>
      </div>
    </div>
  )
}

export default MainPage;



