// stranica prikazuje detalje o pojedinoj seriji prema ID-u u URL-u
// također generira dinamički SEO pomoću generateMetadata

import ShowDetails from "./ShowDetails";

export async function generateMetadata({ params }) {
  const res = await fetch(`https://api.tvmaze.com/shows/${params.id}`);
  if (!res.ok) return { title: "Serija nije pronađena" };

  const show = await res.json();
  const image = show.image?.original || show.image?.medium || "";

  return {
    title: `TV Serija | ${show.name}`,
    description: `${show.name} — status: ${show.status}, ocjena: ${show.rating?.average || "N/A"}`,
    openGraph: {
      images: [{ url: image, width: 800, height: 400 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [image],
    },
  };
}

export default function Page({ params }) {
  return <ShowDetails id={params.id} />;
}