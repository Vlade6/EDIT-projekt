// stranica "/favorites" prikazuje sve naše spremljene omiljene serije koje smo označili
// serije se dohvaćaju iz localStorage i zatim preko API-ja

"use client";
import { useEffect, useState } from "react";
import ShowCard from "../../components/ShowCard";
import Link from "next/link";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteShows, setFavoriteShows] = useState([]);

  //iz našeg localStorage se dohvaćaju spremljeni ID od serija
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteIds(stored);
  }, []);

  //za svaki taj ID dohvaćamo podatke o seriji s API-ja
  useEffect(() => {
    const fetchFavorites = async () => {
      const results = await Promise.all(
        favoriteIds.map(id =>
          fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json())
        )
      );
      setFavoriteShows(results);
    };

    if (favoriteIds.length) {
      fetchFavorites();
    }
  }, [favoriteIds]);

  if (!favoriteIds.length) {
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Favoriti</h1>
        <p>Nema spremljenih serija.</p>
        <Link href="/">
          <button className="border p-2 mt-4">Natrag na početnu</button>
        </Link>
      </main>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tvoje omiljene serije</h1>
      <Link href="/">
        <button className="border p-2 mb-4">Natrag na početnu</button>
      </Link>
      <div className="flex flex-wrap gap-4">
        {favoriteShows.map(show => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </main>
  );
}
