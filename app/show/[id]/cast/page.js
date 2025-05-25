// ova komponenta prikazuje glumačku postavu serije prema serijskom ID-u u URL-u
// podaci se dohvaćaju s TVMaze API-ja i prikazujemo imena i slike glumaca


"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CastPage() {
  const { id } = useParams();
  const [cast, setCast] = useState([]);

  // dohvaćanje tih glumaca serije nakon što komponenta primi ID
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then(res => res.json())
      .then(data => setCast(data))
      .catch(err => console.error("Greška kod dohvaćanja glumaca:", err));
  }, [id]);

  if (!cast.length) return <p>Učitavanje glumaca...</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Glumačka postava</h1>
      <Link href={`/show/${id}`}>
        <button className="border p-2 mb-4">Natrag na detalje</button>
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cast.map(({ person, character }, index) => (
          <div key={index} className="border p-2 text-center">
            {person.image?.medium && (
              <img
                src={person.image.medium}
                alt={person.name}
                className="mx-auto mb-2"
              />
            )}
            <h3 className="font-semibold">{person.name}</h3>
            <p className="text-sm text-gray-600">kao {character.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
