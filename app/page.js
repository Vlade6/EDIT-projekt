"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ShowCard from "../components/ShowCard";

/**
 * HomePageContent komponenta prikazuje početnu stranicu s listom popularnih TV serija.
 * također omogućuje pretragu serija po nazivu i prikazuje rezultate.
 */
export default function HomePageContent() {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // na prvom renderu dohvaćamo prvih 20 serija sa servera
  useEffect(() => {
    fetch("https://api.tvmaze.com/shows?page=1")
      .then(res => res.json())
      .then(data => setShows(data.slice(0, 20))) // koristimo samo prvih 20 za brže učitavanje
      .catch(err => console.error("Greška kod dohvata serija:", err));
  }, []);

  // funkcija za pretragu serija putem API-ja
  const handleSearch = () => {
    if (!query.trim()) return;

    // TVMaze API podržava pretragu bez autentifikacije
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(res => res.json())
      .then(data => setSearchResults(data.map(item => item.show))) // dohvaćamo samo 'show' objekte
      .catch(err => console.error("Greška kod pretrage:", err));
  };

  return (
    <main className="p-4">
      {/* Gumb za prikaz spremljenih favorita */}
      <Link href="/favorites">
        <button className="border p-2 mb-4">Moji favoriti</button>
      </Link>

      {/* Polje za unos pretraživanog pojma */}
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

      {/* Rezultati pretrage */}
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

      {/* Prikaz početnih serija ako nema rezultata pretrage */}
      {searchResults.length === 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Popularne TV Serije</h1>
          <div className="flex flex-wrap gap-4">
            {shows.map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}