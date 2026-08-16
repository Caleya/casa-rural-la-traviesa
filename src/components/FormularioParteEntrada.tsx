import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CONTACT_EMAIL, TELEFONO } from "@/lib/casa";

const texto = (max: number, msg: string) =>
  z.string().trim().min(1, msg).max(max, `Máximo ${max} caracteres`);
const opcional = (max: number) =>
  z.string().trim().max(max, `Máximo ${max} caracteres`).optional().or(z.literal(""));

const esquema = z
  .object({
    entrada: z.string().min(1, "Indica la fecha de entrada"),
    salida: z.string().min(1, "Indica la fecha de salida"),
    personas: z.coerce.number().int().min(1, "Mínimo 1 persona").max(13, "Máximo 13 personas"),
    habitaciones: z.coerce
      .number()
      .int()
      .min(1, "Mínimo 1 habitación")
      .max(5, "Máximo 5 habitaciones"),
    tipoPago: texto(30, "Indica el tipo de pago"),
    medioPago: opcional(40),
    titularPago: opcional(80),
    nombre: texto(50, "Indica el nombre"),
    apellido1: texto(50, "Indica el primer apellido"),
    apellido2: opcional(50),
    nacimiento: z.string().min(1, "Indica la fecha de nacimiento"),
    nacionalidad: texto(40, "Indica la nacionalidad"),
    sexo: texto(20, "Indica el sexo"),
    tipoDocumento: texto(20, "Indica el tipo de documento"),
    documento: texto(20, "Indica el número de documento"),
    soporte: opcional(20),
    telefono: texto(20, "Indica un teléfono"),
    telefono2: opcional(20),
    email: z.string().trim().email("Email no válido").max(120),
    direccion: texto(100, "Indica la dirección"),
    direccion2: opcional(100),
    pais: texto(40, "Indica el país"),
    provincia: texto(40, "Indica la provincia"),
    municipio: texto(40, "Indica el municipio"),
    cp: texto(10, "Indica el código postal"),
  })
  .refine((d) => d.salida > d.entrada, {
    message: "La salida debe ser posterior a la entrada",
    path: ["salida"],
  });

type Errores = Partial<Record<string, string>>;

const campo =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";

function Campo({
  nombre,
  etiqueta,
  errores,
  tipo = "text",
  maxLength,
  min,
  max,
  ancho = "",
}: {
  nombre: string;
  etiqueta: string;
  errores: Errores;
  tipo?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  ancho?: string;
}) {
  return (
    <label className={`text-sm ${ancho}`}>
      {etiqueta}
      <input
        name={nombre}
        type={tipo}
        defaultValue=""
        maxLength={maxLength}
        min={min}
        max={max}
        step={tipo === "number" ? 1 : undefined}
        onKeyDown={
          tipo === "number"
            ? (e) => {
                if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault();
              }
            : undefined
        }
        className={campo}
      />
      {errores[nombre] && (
        <span className="mt-1 block text-xs text-destructive">{errores[nombre]}</span>
      )}
    </label>
  );
}

function Seleccion({
  nombre,
  etiqueta,
  opciones,
  errores,
}: {
  nombre: string;
  etiqueta: string;
  opciones: string[];
  errores: Errores;
}) {
  return (
    <label className="text-sm">
      {etiqueta}
      <select name={nombre} defaultValue="" className={campo}>
        <option value="">Selecciona…</option>
        {opciones.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {errores[nombre] && (
        <span className="mt-1 block text-xs text-destructive">{errores[nombre]}</span>
      )}
    </label>
  );
}

const Titulo = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-8 mb-3 border-b border-border pb-2 font-serif text-lg font-semibold first:mt-0">
    {children}
  </h3>
);

export function FormularioParteEntrada() {
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
    const cuerpo = [
      "PARTE DE ENTRADA",
      `Fechas: ${d.entrada} a ${d.salida}`,
      `Personas: ${d.personas} · Habitaciones: ${d.habitaciones}`,
      "",
      "PAGO",
      `Tipo de pago: ${d.tipoPago}`,
      `Medio de pago: ${d.medioPago || "-"}`,
      `Titular del pago: ${d.titularPago || "-"}`,
      "",
      "DATOS DEL TITULAR",
      `Nombre: ${d.nombre} ${d.apellido1} ${d.apellido2 || ""}`.trim(),
      `Fecha de nacimiento: ${d.nacimiento}`,
      `Nacionalidad: ${d.nacionalidad} · Sexo: ${d.sexo}`,
      `Documento: ${d.tipoDocumento} ${d.documento} (soporte: ${d.soporte || "-"})`,
      `Teléfono: ${d.telefono} · Adicional: ${d.telefono2 || "-"}`,
      `Email: ${d.email}`,
      "",
      "DIRECCIÓN",
      `${d.direccion} ${d.direccion2 || ""}`.trim(),
      `${d.cp} ${d.municipio} (${d.provincia}), ${d.pais}`,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Parte de entrada — ${d.nombre} ${d.apellido1} (${d.entrada})`,
    )}&body=${encodeURIComponent(cuerpo)}`;
    setEnviado(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-border bg-card p-6">
      <Titulo>Datos de la estancia</Titulo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo nombre="entrada" etiqueta="Fecha de entrada" tipo="date" errores={errores} />
        <Campo nombre="salida" etiqueta="Fecha de salida" tipo="date" errores={errores} />
        <Campo
          nombre="personas"
          etiqueta="Número de personas"
          tipo="number"
          min={1}
          max={13}
          errores={errores}
        />
        <Campo
          nombre="habitaciones"
          etiqueta="Número de habitaciones"
          tipo="number"
          min={1}
          max={5}
          errores={errores}
        />
      </div>

      <Titulo>Información del pago</Titulo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Seleccion
          nombre="tipoPago"
          etiqueta="Tipo de pago"
          opciones={["Transferencia", "Efectivo", "Tarjeta", "Bizum"]}
          errores={errores}
        />
        <Campo nombre="medioPago" etiqueta="Medio de pago" maxLength={40} errores={errores} />
        <Campo nombre="titularPago" etiqueta="Titular del pago" maxLength={80} errores={errores} />
      </div>

      <Titulo>Datos del titular</Titulo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo nombre="nombre" etiqueta="Nombre" maxLength={50} errores={errores} />
        <Campo nombre="apellido1" etiqueta="Primer apellido" maxLength={50} errores={errores} />
        <Campo nombre="apellido2" etiqueta="Segundo apellido" maxLength={50} errores={errores} />
        <Campo
          nombre="nacimiento"
          etiqueta="Fecha de nacimiento"
          tipo="date"
          errores={errores}
        />
        <Campo nombre="nacionalidad" etiqueta="Nacionalidad" maxLength={40} errores={errores} />
        <Seleccion
          nombre="sexo"
          etiqueta="Sexo"
          opciones={["Hombre", "Mujer", "Otro"]}
          errores={errores}
        />
        <Seleccion
          nombre="tipoDocumento"
          etiqueta="Tipo de documento"
          opciones={["DNI", "NIE", "Pasaporte"]}
          errores={errores}
        />
        <Campo nombre="documento" etiqueta="Documento" maxLength={20} errores={errores} />
        <Campo
          nombre="soporte"
          etiqueta="Soporte del documento"
          maxLength={20}
          errores={errores}
        />
        <Campo nombre="telefono" etiqueta="Teléfono" tipo="tel" maxLength={20} errores={errores} />
        <Campo
          nombre="telefono2"
          etiqueta="Teléfono adicional"
          tipo="tel"
          maxLength={20}
          errores={errores}
        />
        <Campo
          nombre="email"
          etiqueta="Correo electrónico"
          tipo="email"
          maxLength={120}
          errores={errores}
        />
      </div>

      <Titulo>Dirección del titular</Titulo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo nombre="direccion" etiqueta="Dirección" maxLength={100} errores={errores} />
        <Campo
          nombre="direccion2"
          etiqueta="Dirección adicional"
          maxLength={100}
          errores={errores}
        />
        <Campo nombre="pais" etiqueta="País" maxLength={40} errores={errores} />
        <Campo nombre="provincia" etiqueta="Provincia" maxLength={40} errores={errores} />
        <Campo nombre="municipio" etiqueta="Municipio" maxLength={40} errores={errores} />
        <Campo nombre="cp" etiqueta="Código postal" maxLength={10} errores={errores} />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        Enviar parte de entrada
      </button>

      {enviado && (
        <p className="mt-3 text-sm text-primary">
          Hemos abierto tu correo con el parte preparado. Si no se abre, llámanos al {TELEFONO}.
        </p>
      )}
    </form>
  );
}
