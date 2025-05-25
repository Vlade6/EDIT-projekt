// u ovoj komponenti dohvaćamo i prikazujemo te detalje pojedinih serija preko ID-a, a prikazuju se osnovne informacije, epizode i glumci 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShowDetails({ id }) {
  const [show, setShow] = useState(null);

// ode useEffect koristimo za dohvat podataka o seriji kad se komponenta učita
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(res => res.json())
      .then(data => setShow(data));
  }, [id]);

  if (!show) return <p>Učitavanje...</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{show.name}</h1>
      <img src={show.image?.medium} alt={show.name} className="mb-4" />
      <p>Status: {show.status}</p>
      <p>Ocjena: {show.rating?.average || "N/A"}</p>
      <div dangerouslySetInnerHTML={{ __html: show.summary }} />

      <div className="mt-4 flex gap-4">
        <Link href={`/show/${id}/episodes`}><button className="border p-2">Epizode</button></Link>
        <Link href={`/show/${id}/cast`}><button className="border p-2">Glumci</button></Link>
        <Link href="/"><button className="border p-2">Natrag</button></Link>
      </div>
    </main>
  );
}
