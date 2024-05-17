import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>¡Ups!</h2>
      <p>Esa iglesia todavia no existe.</p>
      <Link href="/">Volver a página principal</Link>
    </div>
  );
}
