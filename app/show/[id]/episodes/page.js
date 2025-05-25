// ova komponenta prikazuje sve epizode odabrane serije
// svaka epizoda prikazuje naziv, sezonu, broj epizode i opcionalno sliku

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EpisodesPage() {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);

  // dohvaćaju se sve epizode serije po ID-u serije
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then(res => res.json())
      .then(data => setEpisodes(data))
      .catch(err => console.error("Greška kod epizoda:", err));
  }, [id]);

  if (!episodes.length) return <p>Učitavanje epizoda...</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Epizode serije</h1>
      <Link href={`/show/${id}`}>
        <button className="border p-2 mb-4">Natrag na detalje</button>
      </Link>

      <ul className="space-y-4">
        {episodes.map(ep => (
          <li key={ep.id} className="border p-4">
            <h2 className="text-lg font-semibold">
              S{ep.season}E{ep.number}: {ep.name}
            </h2>
            <p><strong>Datum prikazivanja:</strong> {ep.airdate}</p>
            {ep.image?.medium && (
              <img
                src={ep.image.medium}
                alt={ep.name}
                className="mt-2 w-48"
              />
            )}
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: ep.summary || "" }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
