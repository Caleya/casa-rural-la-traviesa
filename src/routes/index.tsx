import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Star,
  Phone,
  Waves,
  Flame,
  Car,
  Wifi,
  Dog,
  CookingPot,
  Users,
  Mountain,
  Mail,
  Clock,
  ExternalLink,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Galeria } from "@/components/Galeria";
import { FormularioParteEntrada } from "@/components/FormularioParteEntrada";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  DIRECCION,
  FOTO_PRINCIPAL,
  FOTO_PISCINA_BALCON,
  TELEFONO,
  TELEFONO_TEL,
  entorno,
  servicios,
  valoraciones,
} from "@/lib/casa";

const iconos: Record<string, LucideIcon> = {
  piscina: Waves,
  barbacoa: Flame,
  parking: Car,
  wifi: Wifi,
  mascotas: Dog,
  cocina: CookingPot,
  familias: Users,
  vistas: Mountain,
};


const TITULO = "La Traviesa Casa Rural — Casa completa con piscina en Aljucén, Badajoz";
const DESCRIPCION =
  "Casa rural completa de 200 m² en Aljucén: 5 dormitorios, 5 baños, piscina privada, barbacoa y jardín. A 15 km de Mérida.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRIPCION },
      { property: "og:url", content: "/" },
      { property: "og:image", content: FOTO_PRINCIPAL },
      { name: "twitter:image", content: FOTO_PRINCIPAL },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "La Traviesa Casa Rural",
          description: DESCRIPCION,
          image: FOTO_PRINCIPAL,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Calle Mayor, 4",
            postalCode: "06894",
            addressLocality: "Aljucén",
            addressRegion: "Badajoz",
            addressCountry: "ES",
          },
          amenityFeature: ["Piscina exterior", "WiFi gratis", "Parking gratis", "Barbacoa"],
          petsAllowed: true,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: 8.9,
            bestRating: 10,
            reviewCount: 23,
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />

      <main id="inicio">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[68vh] min-h-[420px] w-full overflow-hidden">
            <img
              src={FOTO_PRINCIPAL}
              alt="Interior de La Traviesa Casa Rural en Aljucén"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/45" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-6xl px-5 text-background">
                <p className="flex items-center gap-2 text-sm uppercase tracking-[0.25em]">
                  <MapPin className="size-4" /> Aljucén · Badajoz
                </p>
                <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-semibold sm:text-6xl">
                  Una casa entera para los tuyos, con piscina y barbacoa en Aljucén
                </h1>
                <p className="mt-4 max-w-xl text-base opacity-95">
                  200 m², cinco dormitorios y cinco baños a quince minutos de Mérida.
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm">
                  <Star className="size-4 fill-current" />
                  8,9 · Fabuloso — 23 comentarios en Booking
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${TELEFONO_TEL}`}
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-4 text-base font-semibold text-accent-foreground shadow-lg transition-opacity hover:opacity-90"
                  >
                    <Phone className="size-5" />
                    Reserva por teléfono: {TELEFONO}
                  </a>
                  <a
                    href="#reservar"
                    className="rounded-md border border-background/70 px-6 py-3 text-sm font-medium transition-colors hover:bg-background/15"
                  >
                    Formulario de entrada
                  </a>
                </div>
                <p className="mt-3 text-sm opacity-90">
                  Atendemos llamadas. Reserva rápida y sencilla.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* La casa */}
        <section id="la-casa" className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">La casa</h2>
              <p className="mt-5 text-muted-foreground">
                La Traviesa es una casa rural completa en el centro de Aljucén: todo el alojamiento
                es para ti, con piscina privada de temporada al aire libre, jardín y salón común.
                Desde la terraza y el balcón se ven el pueblo y la montaña.
              </p>
              <p className="mt-4 text-muted-foreground">
                Dispone de cinco dormitorios y cinco baños, ropa de cama y toallas, TV de pantalla
                plana, zona de comedor y cocina totalmente equipada. Fuera, barbacoa para las cenas
                largas de verano. Es una zona ideal para senderismo y ciclismo.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-4 self-start">
              {[
                ["300 m²", "Superficie"],
                ["13", "Huéspedes"],
                ["5", "Dormitorios"],
                ["5", "Baños"],
              ].map(([valor, etiqueta]) => (
                <div key={etiqueta} className="rounded-xl border border-border bg-card p-5">
                  <dt className="font-serif text-3xl font-semibold text-primary">{valor}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{etiqueta}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Galería */}
        <section id="galeria" className="border-y border-border bg-secondary/50 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Galería</h2>
            <p className="mt-3 mb-8 text-muted-foreground">
              Fotografías del alojamiento.
            </p>
            <Galeria />
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Servicios</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {servicios.map((s) => {
              const IconComponent = iconos[s.icono];
              return (
                <div key={s.titulo} className="rounded-xl border border-border bg-card p-5">
                  {IconComponent && (
                    <div className="mb-3 flex items-center justify-center">
                      <IconComponent className="size-10 text-primary" />
                    </div>
                  )}
                  <h3 className="font-serif text-lg font-semibold">{s.titulo}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.texto}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Valoraciones */}
        <section className="border-y border-border bg-secondary/50 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[auto_1fr] md:items-center">
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <p className="font-serif text-6xl font-semibold text-primary">8,9</p>
              <p className="mt-2 text-sm font-medium">Fabuloso</p>
              <p className="text-sm text-muted-foreground">23 comentarios</p>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
                Lo que dicen los huéspedes
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {valoraciones.map((v) => (
                  <li key={v.etiqueta}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{v.etiqueta}</span>
                      <span className="font-medium">{v.nota.toFixed(1).replace(".", ",")}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${v.nota * 10}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href={`${BOOKING_URL}#tab-reviews`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-medium text-accent underline underline-offset-4"
              >
                Leer los comentarios en Booking
              </a>
            </div>
          </div>
        </section>

        {/* Entorno */}
        <section id="entorno" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">El entorno</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Aljucén es un pueblo tranquilo rodeado de naturaleza en Extremadura y a un paso del conjunto
            monumental de Mérida.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ul className="grid gap-4 sm:grid-cols-2">
              {entorno.map((e) => (
                <li key={e.titulo} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-serif text-lg font-semibold">{e.titulo}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.texto}</p>
                </li>
              ))}
            </ul>
            <div
              className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-cover bg-center p-8 text-center text-background lg:min-h-full"
              style={{ backgroundImage: `url(${FOTO_PISCINA_BALCON})` }}
            >
              <div className="absolute inset-0 bg-foreground/55" />
              <div className="relative flex flex-col items-center">
                <MapPin className="size-10" />
                <h3 className="mt-4 font-serif text-2xl font-semibold">Cómo llegar</h3>
                <p className="mt-2 max-w-sm text-sm">{DIRECCION}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-md bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Abrir en Google Maps
              </a>
              </div>
            </div>
          </div>
        </section>

        {/* Solicitud de reserva */}
        <section id="reservar" className="border-t border-border bg-secondary/50 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Reserva directa
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Formulario de reserva
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-serif text-xl font-bold text-foreground">
                Obligatorio rellenar todos los campos y enviar después de concretar fecha de reserva
                por teléfono.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Rellena el formulario y te generamos un PDF del parte de entrada de viajeros, listo
                para enviárnoslo por correo. ¿Algún problema? Llámanos al{" "}
                <a href={`tel:${TELEFONO_TEL}`} className="font-semibold text-primary hover:underline">
                  {TELEFONO}
                </a>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
              <FormularioParteEntrada />
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="border-t border-primary-foreground/10 bg-[oklch(0.38_0.08_242)] py-20 text-primary-foreground sm:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/75">
                  Estamos aquí para ayudarte
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Hablemos de tu estancia</h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/85">
                  Cuéntanos qué necesitas y te ayudaremos a organizar tu visita a Aljucén. Para
                  consultar fechas disponibles, la forma más rápida es llamarnos directamente.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="border-l border-primary-foreground/30 pl-4">
                    <MapPin className="mb-3 size-5" />
                    <h3 className="font-semibold">Dónde estamos</h3>
                    <p className="mt-1 text-sm text-primary-foreground/80">{DIRECCION}</p>
                  </div>
                  <div className="border-l border-primary-foreground/30 pl-4">
                    <Phone className="mb-3 size-5" />
                    <h3 className="font-semibold">Llámanos</h3>
                    <a href={`tel:${TELEFONO_TEL}`} className="mt-1 inline-block text-lg font-semibold hover:underline">
                      {TELEFONO}
                    </a>
                  </div>
                  <div className="border-l border-primary-foreground/30 pl-4">
                    <Mail className="mb-3 size-5" />
                    <h3 className="font-semibold">Escríbenos</h3>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 inline-block text-sm text-primary-foreground/80 hover:underline">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                  <div className="border-l border-primary-foreground/30 pl-4">
                    <Clock className="mb-3 size-5" />
                    <h3 className="font-semibold">Llegadas y salidas</h3>
                    <p className="mt-1 text-sm text-primary-foreground/80">Entrada de 16:00 a 22:00</p>
                    <p className="text-sm text-primary-foreground/80">Salida de 09:00 a 12:00</p>
                  </div>
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href={`tel:${TELEFONO_TEL}`}
                    className="inline-flex items-center gap-2 rounded-md bg-primary-foreground px-15 py-3 font-semibold text-primary transition-opacity hover:opacity-90"
                  >
                    <Phone className="size-7" /> Llamar ahora
                  </a>
                  <a
                    href="#reservar"
                    className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 px-5 py-3 font-medium transition-colors hover:bg-primary-foreground/10"
                  >
                    <CalendarCheck className="size-4" /> Ir al formulario
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
                  Planifica sin prisas
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold">Todo listo para recibirte</h3>
                <ul className="mt-6 space-y-4 text-primary-foreground/85">
                  <li className="flex gap-3"><Waves className="mt-0.5 size-5 shrink-0" /><span>Piscina privada de temporada para disfrutar al aire libre.</span></li>
                  <li className="flex gap-3"><Car className="mt-0.5 size-5 shrink-0" /><span>Parking gratuito junto al alojamiento.</span></li>
                  <li className="flex gap-3"><Wifi className="mt-0.5 size-5 shrink-0" /><span>WiFi incluido en toda la casa.</span></li>
                </ul>
                <a
                  href={`${BOOKING_URL}#availability`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-primary-foreground/80"
                >
                  Consultar también en Booking.com <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>La Traviesa Casa Rural · {DIRECCION}</p>
          <p>© 2026 Casa Rural La Traviesa. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
