"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ShowCard from "../components/ShowCard";

//page.js komponenta prikazuje početnu stranicu s listom popularnih TV serija
//također sam implementirao da se omogućuje pretraga serija po nazivu te da prikazuje rezultate te da se moze ucitati vise serija 

export default function HomePageContent() {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1); 

  // dohvat serija za određenu stranicu
  const fetchShows = (pageNum) => {
    fetch(`https://api.tvmaze.com/shows?page=${pageNum}`)
      .then(res => res.json())
      .then(data => {
        // za pocetak dodaj samo prvih 20 serija iz stranice
        const nextBatch = data.slice(0, 20);
        setShows(prev => [...prev, ...nextBatch]);
      })
      .catch(err => console.error("Greška kod dohvaćanja serija:", err));
  };

  // inicijalno dohvaćamo page 0
  useEffect(() => {
    fetchShows(0);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(res => res.json())
      .then(data => setSearchResults(data.map(item => item.show)))
      .catch(err => console.error("Greška kod pretrage:", err));
  };

  // klikom na "Učitaj više" dohvaća sljedeću stranicu
  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchShows(nextPage);
    setPage(nextPage);
  };

  return (
    <main className="p-4">
      <Link href="/favorites">
        <button className="border p-2 mb-4">Moji favoriti</button>
      </Link>

      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pretraži serije..."
          className="border p-2 mr-2 w-64"
        />
        <button onClick={handleSearch} className="border p-2">Traži</button>
      </div>

      {/* Ako se prikazuju rezultati pretrage */}
      {searchResults.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Rezultati pretrage:</h2>
          <div className="flex flex-wrap gap-4">
            {searchResults.map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      )}

      {/* Ako nije pretraga, prikazujemo sve dohvaćene serije */}
      {searchResults.length === 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Popularne TV Serije</h1>
          <div className="flex flex-wrap gap-4">
            {shows.map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>

          {/* Gumb za učitavanje više serija */}
          <div className="mt-6 text-center">
            <button onClick={handleLoadMore} className="border p-2">
              Učitaj još serija
            </button>
          </div>
        </>
      )}
    </main>
  );
}
