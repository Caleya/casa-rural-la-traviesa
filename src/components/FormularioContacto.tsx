import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/casa";

const esquema = z
  .object({
    nombre: z.string().trim().min(2, "Indica tu nombre").max(80, "Nombre demasiado largo"),
    email: z.string().trim().email("Email no válido").max(160),
    telefono: z.string().trim().max(30).optional().or(z.literal("")),
    entrada: z.string().min(1, "Indica la fecha de entrada"),
    salida: z.string().min(1, "Indica la fecha de salida"),
    personas: z.coerce.number().int().min(1, "Mínimo 1 persona").max(13, "Máximo 13 personas"),
    mensaje: z.string().trim().max(1000, "Máximo 1000 caracteres").optional().or(z.literal("")),
  })
  .refine((d) => d.salida > d.entrada, {
    message: "La salida debe ser posterior a la entrada",
    path: ["salida"],
  });

type Errores = Partial<Record<string, string>>;

const campo =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";

export function FormularioContacto() {
  const [errores, setErrores] = useState<Errores>({});
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const datos = Object.fromEntries(fd.entries());
    const res = esquema.safeParse(datos);

    if (!res.success) {
      const errs: Errores = {};
      for (const issue of res.error.issues) {
        const key = String(issue.path[0]);
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrores(errs);
      setEnviado(false);
      return;
    }

    setErrores({});
    const d = res.data;
    const asunto = `Consulta de disponibilidad — ${d.entrada} a ${d.salida}`;
    const cuerpo = [
      `Nombre: ${d.nombre}`,
      `Email: ${d.email}`,
      `Teléfono: ${d.telefono || "-"}`,
      `Entrada: ${d.entrada}`,
      `Salida: ${d.salida}`,
      `Personas: ${d.personas}`,
      "",
      d.mensaje || "",
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(cuerpo)}`;
    setEnviado(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-border bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Nombre
          <input name="nombre" className={campo} maxLength={80} />
          {errores["nombre"] && (
            <span className="mt-1 block text-xs text-destructive">{errores["nombre"]}</span>
          )}
        </label>
        <label className="text-sm">
          Email
          <input name="email" type="email" className={campo} maxLength={160} />
          {errores["email"] && (
            <span className="mt-1 block text-xs text-destructive">{errores["email"]}</span>
          )}
        </label>
        <label className="text-sm">
          Teléfono (opcional)
          <input name="telefono" className={campo} maxLength={30} />
        </label>
        <label className="text-sm">
          Personas
          <input name="personas" type="number" min={1} max={13} defaultValue={2} className={campo} />
          {errores["personas"] && (
            <span className="mt-1 block text-xs text-destructive">{errores["personas"]}</span>
          )}
        </label>
        <label className="text-sm">
          Entrada
          <input name="entrada" type="date" className={campo} />
          {errores["entrada"] && (
            <span className="mt-1 block text-xs text-destructive">{errores["entrada"]}</span>
          )}
        </label>
        <label className="text-sm">
          Salida
          <input name="salida" type="date" className={campo} />
          {errores["salida"] && (
            <span className="mt-1 block text-xs text-destructive">{errores["salida"]}</span>
          )}
        </label>
        <label className="text-sm sm:col-span-2">
          Mensaje
          <textarea name="mensaje" rows={4} maxLength={1000} className={campo} />
          {errores["mensaje"] && (
            <span className="mt-1 block text-xs text-destructive">{errores["mensaje"]}</span>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        Enviar consulta
      </button>

      {enviado && (
        <p className="mt-3 text-sm text-primary">
          Hemos abierto tu programa de correo con la consulta preparada. Si no se abre, escríbenos a{" "}
          {CONTACT_EMAIL}.
        </p>
      )}
    </form>
  );
}
