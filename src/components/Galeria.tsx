import { useState } from "react";
import { X } from "lucide-react";
import { fotos } from "@/lib/casa";

export function Galeria() {
  const [activa, setActiva] = useState<number | null>(null);
  const foto = activa === null ? null : fotos[activa];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {fotos.map((f, i) => (
          <button
            key={f.src}
            type="button"
            onClick={() => setActiva(i)}
            className="group aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
          >
            <img
              src={f.src}
              alt={f.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
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
          <img
            src={foto.src}
            alt={foto.alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
