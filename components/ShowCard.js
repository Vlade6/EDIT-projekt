// komponenta ShowCard prikazuje pojedinačnu seriju gdje se prikazuju slika, naziv i ocjena
// također omogućuje dodavanje i uklanjanje iz favorita pomoću localStoragea.
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShowCard({ show }) {
  const [isFavorite, setIsFavorite] = useState(false);

// ode izvršavamo provjeru je li serija već u favoritima (localStorage)
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(show.id));
  }, [show.id]);

  //dodavanje ili uklanjanje iz favorita
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(show.id)) {
      const updated = favorites.filter(id => id !== show.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(show.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div style={{ width: "200px", border: "1px solid #ccc", padding: "10px" }}>
      <Link href={`/show/${show.id}`}>
        <img
          src={show.image?.medium}
          alt={show.name}
          style={{ width: "100%" }}
        />
        <h3>{show.name}</h3>
        <p>Ocjena: {show.rating?.average || "N/A"}</p>
      </Link>
      <button onClick={toggleFavorite}>
        {isFavorite ? "Ukloni iz favorita" : "Dodaj u favorite"}
      </button>
    </div>
  );
}
