import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BOOKING_URL } from "@/lib/casa";

const enlaces = [
  { href: "#la-casa", texto: "La casa" },
  { href: "#galeria", texto: "Galería" },
  { href: "#servicios", texto: "Servicios" },
  { href: "#entorno", texto: "Entorno" },
  { href: "#contacto", texto: "Contacto" },
];

export function SiteHeader() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a href="#inicio" className="font-serif text-xl font-semibold tracking-tight">
          La Traviesa
          <span className="ml-2 hidden text-xs font-normal uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            Casa rural
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {enlaces.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {e.texto}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Reservar en Booking
          </a>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex items-center justify-center rounded-md border border-border p-2 md:hidden"
          >
            {abierto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {abierto && (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
          {enlaces.map((e) => (
            <a
              key={e.href}
              href={e.href}
              onClick={() => setAbierto(false)}
              className="block py-2 text-sm text-muted-foreground"
            >
              {e.texto}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground"
          >
            Reservar en Booking
          </a>
        </nav>
      )}
    </header>
  );
}
