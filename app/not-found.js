//klasicna not found funkcija koja izleti kada nepronade stranicu
export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Stranica nije pronađena</h1>
      <p>Stranica koju tražiš ne postoji ili je premještena.</p>
      <a href="/" className="text-blue-500 underline">Vrati se na početnu</a>
    </div>
  );
}
