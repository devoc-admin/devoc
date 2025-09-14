import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute z-10 top-0 left-0 w-full h-16 bg-white/50 backdrop-blur-sm flex items-center justify-center">
      <nav>
        <ul className="flex text-gray-800 items-center gap-12 font-semibold">
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/showcase">Showcase</Link>
          </li>
          <li>
            <Link href="/about">À propos</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
