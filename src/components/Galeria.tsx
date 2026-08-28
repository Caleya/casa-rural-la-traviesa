import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { fotosGaleria, seccionesFotos } from "@/lib/casa";

export function Galeria() {
  const [activa, setActiva] = useState<number | null>(null);
  const foto = activa === null ? null : fotosGaleria[activa];

  useEffect(() => {
    if (activa === null) return;

    const navegar = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiva(null);
      if (event.key === "ArrowLeft") setActiva((indice) => (indice === null ? null : (indice - 1 + fotosGaleria.length) % fotosGaleria.length));
      if (event.key === "ArrowRight") setActiva((indice) => (indice === null ? null : (indice + 1) % fotosGaleria.length));
    };

    window.addEventListener("keydown", navegar);
    return () => window.removeEventListener("keydown", navegar);
  }, [activa]);

  return (
    <>
      <div className="space-y-12">
        {seccionesFotos.map((seccion) => (
          <div key={seccion.titulo}>
            <h3 className="mb-5 font-serif text-2xl font-semibold">{seccion.titulo}</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {seccion.fotos.map((f) => {
                const indice = fotosGaleria.indexOf(f);
                return (
                  <button
                    key={f.src}
                    type="button"
                    onClick={() => setActiva(indice)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
                  >
                    <img
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-md bg-foreground/80 px-2 py-1 text-xs font-medium text-background opacity-90 transition-opacity group-hover:opacity-100">
                      <Maximize2 className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">Ampliar imagen</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {foto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4"
          onClick={() => setActiva(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Cerrar imagen"
            onClick={() => setActiva(null)}
            className="absolute right-5 top-5 rounded-md bg-background/90 p-2 text-foreground"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={(event) => {
              event.stopPropagation();
              setActiva((indice) => (indice === null ? null : (indice - 1 + fotosGaleria.length) % fotosGaleria.length));
            }}
            className="absolute left-4 rounded-md bg-background/90 p-2 text-foreground sm:left-8"
          >
            <ChevronLeft className="size-6" />
          </button>
          <img
            src={foto.src}
            alt={foto.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={(event) => {
              event.stopPropagation();
              setActiva((indice) => (indice === null ? null : (indice + 1) % fotosGaleria.length));
            }}
            className="absolute right-4 rounded-md bg-background/90 p-2 text-foreground sm:right-8"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}
