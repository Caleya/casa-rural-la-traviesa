import { useState, type ReactNode } from "react";
import { z } from "zod";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Mail, CheckCircle2 } from "lucide-react";

export const CONTACT_EMAIL = "casarurallaplata@gmail.com";
const MAX = 60;
const req = (msg: string) => z.string().trim().min(1, msg).max(MAX, `Máximo ${MAX} caracteres`);
const num = (msg: string) =>
  z
    .string()
    .trim()
    .min(1, msg)
    .max(3)
    .refine((value) => /^\d+$/.test(value) && Number(value) > 0, "Introduce un número mayor que 0");

const schema = z.object({
  referencia: req("Indica la referencia"),
  fechaContrato: z.string().min(1, "Indica la fecha del contrato"),
  entrada: z.string().min(1, "Indica la fecha de entrada"),
  salida: z.string().min(1, "Indica la fecha de salida"),
  personas: num("Indica el nº de personas"),
  habitaciones: num("Indica el nº de habitaciones"),
  tipoPago: req("Indica el tipo de pago"),
  medioPago: req("Indica el medio de pago"),
  titularPago: req("Indica el titular del pago"),
  fechaPago: z.string().min(1, "Indica la fecha de pago"),
  tNombre: req("Indica el nombre"),
  tApellido1: req("Indica el primer apellido"),
  tApellido2: req("Indica el segundo apellido"),
  tNacimiento: z.string().min(1, "Indica la fecha de nacimiento"),
  tNacionalidad: req("Indica la nacionalidad"),
  tSexo: req("Indica el sexo"),
  tTipoDoc: req("Indica el tipo de documento"),
  tDocumento: req("Indica el documento"),
  tSoporteDoc: req("Indica el soporte del documento"),
  tTelefono: req("Indica un teléfono"),
  tTelefono2: req("Indica un teléfono adicional"),
  tEmail: z.string().trim().email("Email no válido").max(80, "Máximo 80 caracteres"),
  tDireccion: req("Indica la dirección"),
  tDireccion2: req("Indica la dirección adicional"),
  tPais: req("Indica el país"),
  tProvincia: req("Indica la provincia"),
  tMunicipio: req("Indica el municipio"),
  tCodigoPostal: req("Indica el código postal"),
  vNombre: req("Indica el nombre"),
  vApellido1: req("Indica el primer apellido"),
  vApellido2: req("Indica el segundo apellido"),
  vNacimiento: z.string().min(1, "Indica la fecha de nacimiento"),
  vNacionalidad: req("Indica la nacionalidad"),
  vSexo: req("Indica el sexo"),
  vTipoDoc: req("Indica el tipo de documento"),
  vDocumento: req("Indica el documento"),
  vSoporteDoc: req("Indica el soporte del documento"),
  vTelefono: req("Indica un teléfono"),
  vTelefono2: req("Indica un teléfono adicional"),
  vEmail: z.string().trim().email("Email no válido").max(80, "Máximo 80 caracteres"),
  vParentesco: req("Indica el parentesco"),
  vDireccion: req("Indica la dirección"),
  vDireccion2: req("Indica la dirección adicional"),
  vPais: req("Indica el país"),
  vProvincia: req("Indica la provincia"),
  vMunicipio: req("Indica el municipio"),
  vCodigoPostal: req("Indica el código postal"),
});

type FormValues = z.infer<typeof schema>;
type FieldName = keyof FormValues;
const initialValues = Object.fromEntries(
  Object.keys(schema.shape).map((key) => [key, ""]),
) as FormValues;
const formatDate = (value?: string) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return day && month && year ? `${day}/${month}/${year}` : value;
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <fieldset className="rounded-xl border border-border p-3 sm:p-4">
    <legend className="px-2 font-serif text-base font-semibold text-foreground">{title}</legend>
    <div className="grid gap-2.5 sm:grid-cols-3">{children}</div>
  </fieldset>
);
type Cell = { label: string; value: string; span?: number };

function buildPdf(v: FormValues) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const left = 42;
  const width = 511;
  let y = 40;
  const heading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20);
    doc.text(text, left, y);
    y += 12;
  };
  const table = (rows: Cell[][]) => {
    rows.forEach((row) => {
      const units = row.reduce((sum, cell) => sum + (cell.span ?? 1), 0);
      const unit = width / units;
      const prepared = row.map((cell) => {
        const cellWidth = unit * (cell.span ?? 1);
        return {
          ...cell,
          cellWidth,
          lines: doc.splitTextToSize(cell.value || "", cellWidth - 8) as string[],
        };
      });
      const rowHeight =
        10 +
        Math.max(
          11,
          ...prepared.map((cell) => Math.min(2, Math.max(1, cell.lines.length)) * 7.5 + 3),
        );
      let x = left;
      prepared.forEach((cell) => {
        doc.rect(x, y, cell.cellWidth, rowHeight);
        doc.line(x, y + 10, x + cell.cellWidth, y + 10);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.text(cell.label, x + 3, y + 7);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text(cell.lines.slice(0, 2), x + 3, y + 17.5, { lineHeightFactor: 1.05 });
        x += cell.cellWidth;
      });
      y += rowHeight + 2;
    });
    y += 4;
  };
  table([
    [
      { label: "Referencia", value: v.referencia },
      { label: "Fecha del contrato", value: formatDate(v.fechaContrato) },
      {
        label: "Fecha entrada y salida",
        value: `${formatDate(v.entrada)} - ${formatDate(v.salida)}`,
      },
    ],
    [
      { label: "Número de personas", value: v.personas },
      { label: "Número de habitaciones", value: v.habitaciones },
      { label: "", value: "" },
    ],
  ]);
  heading("Información del pago");
  table([
    [
      { label: "Tipo de pago", value: v.tipoPago },
      { label: "Medios de pago", value: v.medioPago },
      { label: "Titular del pago", value: v.titularPago },
    ],
    [
      { label: "Fecha de pago", value: formatDate(v.fechaPago) },
      { label: "", value: "", span: 2 },
    ],
  ]);
  heading("Datos del titular");
  table([
    [
      { label: "Nombre", value: v.tNombre },
      { label: "Primer apellido", value: v.tApellido1 },
      { label: "Segundo apellido", value: v.tApellido2 },
    ],
    [
      { label: "Fecha de nacimiento", value: formatDate(v.tNacimiento) },
      { label: "Nacionalidad", value: v.tNacionalidad },
      { label: "Sexo", value: v.tSexo },
    ],
    [
      { label: "Tipo de documento", value: v.tTipoDoc },
      { label: "Documento", value: v.tDocumento },
      { label: "Soporte del documento", value: v.tSoporteDoc },
    ],
    [
      { label: "Teléfono", value: v.tTelefono },
      { label: "Teléfono adicional", value: v.tTelefono2 },
      { label: "Correo electrónico", value: v.tEmail },
    ],
  ]);
  heading("Dirección del titular");
  table([
    [
      { label: "Dirección", value: v.tDireccion },
      { label: "Dirección adicional", value: v.tDireccion2 },
      { label: "País", value: v.tPais },
    ],
    [
      { label: "Provincia", value: v.tProvincia },
      { label: "Municipio", value: v.tMunicipio },
      { label: "Código postal", value: v.tCodigoPostal },
    ],
  ]);
  heading("Datos del viajero");
  table([
    [
      { label: "Nombre", value: v.vNombre },
      { label: "Primer apellido", value: v.vApellido1 },
      { label: "Segundo apellido", value: v.vApellido2 },
    ],
    [
      { label: "Fecha de nacimiento", value: formatDate(v.vNacimiento) },
      { label: "Nacionalidad", value: v.vNacionalidad },
      { label: "Sexo", value: v.vSexo },
    ],
    [
      { label: "Tipo de documento", value: v.vTipoDoc },
      { label: "Documento", value: v.vDocumento },
      { label: "Soporte del documento", value: v.vSoporteDoc },
    ],
    [
      { label: "Teléfono", value: v.vTelefono },
      { label: "Teléfono adicional", value: v.vTelefono2 },
      { label: "Correo electrónico", value: v.vEmail },
      { label: "Parentesco", value: v.vParentesco },
    ],
  ]);
  heading("Dirección del viajero");
  table([
    [
      { label: "Dirección", value: v.vDireccion },
      { label: "Dirección adicional", value: v.vDireccion2 },
      { label: "País", value: v.vPais },
    ],
    [
      { label: "Provincia", value: v.vProvincia },
      { label: "Municipio", value: v.vMunicipio },
      { label: "Código postal", value: v.vCodigoPostal },
    ],
  ]);
  return doc;
}

const buildMailto = (v: FormValues) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Parte de entrada - ${v.tNombre} ${v.tApellido1} (${formatDate(v.entrada)} a ${formatDate(v.salida)})`)}&body=${encodeURIComponent(["Hola, aquí tienes que adjuntar el formulario descargado.", "", `Titular: ${v.tNombre} ${v.tApellido1} ${v.tApellido2}`.trim(), `Teléfono: ${v.tTelefono}`, `Entrada: ${formatDate(v.entrada)}`, `Salida: ${formatDate(v.salida)}`, `Personas: ${v.personas}`, "", "ADJUNTAR EL PDF DESCARGADO CON TODOS LOS DATOS."].join("\n"))}`;
const TITULAR_TO_VIAJERO: Array<[FieldName, FieldName]> = [
  ["tNombre", "vNombre"],
  ["tApellido1", "vApellido1"],
  ["tApellido2", "vApellido2"],
  ["tNacimiento", "vNacimiento"],
  ["tNacionalidad", "vNacionalidad"],
  ["tSexo", "vSexo"],
  ["tTipoDoc", "vTipoDoc"],
  ["tDocumento", "vDocumento"],
  ["tSoporteDoc", "vSoporteDoc"],
  ["tTelefono", "vTelefono"],
  ["tTelefono2", "vTelefono2"],
  ["tEmail", "vEmail"],
  ["tDireccion", "vDireccion"],
  ["tDireccion2", "vDireccion2"],
  ["tPais", "vPais"],
  ["tProvincia", "vProvincia"],
  ["tMunicipio", "vMunicipio"],
  ["tCodigoPostal", "vCodigoPostal"],
];

export function FormularioParteEntrada() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sameAsTitular, setSameAsTitular] = useState(true);
  const [mailHref, setMailHref] = useState<string | null>(null);
  const syncViajero = (source: FormValues) => {
    const next = { ...source };
    TITULAR_TO_VIAJERO.forEach(([from, to]) => {
      next[to] = source[from] ?? "";
    });
    next.vParentesco = "Titular";
    return next;
  };
  const update = (field: FieldName, value: string) => {
    setValues((previous) => {
      const next = { ...previous, [field]: value };
      return sameAsTitular ? syncViajero(next) : next;
    });
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };
  const toggleSame = (checked: boolean) => {
    setSameAsTitular(checked);
    if (checked) setValues((previous) => syncViajero(previous));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<FieldName, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as FieldName;
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      document
        .getElementById("formulario-reserva")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (result.data.salida <= result.data.entrada) {
      setErrors({ salida: "La salida debe ser posterior a la entrada" });
      return;
    }
    const doc = buildPdf(result.data);
    const filename = `parte-entrada-${result.data.tApellido1.toLowerCase().replace(/\s+/g, "-")}.pdf`;
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    setMailHref(buildMailto(result.data));
    window.setTimeout(
      () =>
        document
          .getElementById("enviar-solicitud")
          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
      100,
    );
  };
  const renderField = (
    name: FieldName,
    label: string,
    options?: {
      type?: string;
      className?: string;
      placeholder?: string;
      disabled?: boolean;
      maxLength?: number;
    },
  ) => (
    <div key={name} className={options?.className}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={options?.type ?? "text"}
        value={values[name] ?? ""}
        onChange={(event) => {
          const limit = options?.maxLength ?? 60;
          let next = event.target.value;
          if (options?.type === "number") next = next.replace(/[^\d]/g, "");
          update(name, next.slice(0, limit));
        }}
        placeholder={options?.placeholder}
        disabled={options?.disabled}
        maxLength={options?.maxLength ?? 60}
        min={options?.type === "number" ? 1 : undefined}
        step={options?.type === "number" ? 1 : undefined}
        className="mt-1 h-8 text-sm"
      />
      {errors[name] && <p className="mt-1 text-sm text-destructive">{errors[name]}</p>}
    </div>
  );
  const renderSelect = (name: FieldName, label: string, options: string[], disabled?: boolean) => (
    <div key={name}>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        value={values[name] ?? ""}
        onChange={(event) => update(name, event.target.value)}
        disabled={disabled}
        className="mt-1 flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-60"
      >
        <option value="">Selecciona</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <p className="mt-1 text-sm text-destructive">{errors[name]}</p>}
    </div>
  );
  const docTypes = ["DNI", "NIE", "Pasaporte", "Permiso de conducir", "Otro"];
  const sexes = ["Mujer", "Hombre", "Otro"];
  const payTypes = ["Efectivo", "Tarjeta", "Transferencia", "Plataforma de pago", "Otro"];
  return (
    <form id="formulario-reserva" onSubmit={handleSubmit} className="space-y-3" noValidate>
      <Section title="Datos de la reserva">
        {renderField("referencia", "Referencia")}
        {renderField("fechaContrato", "Fecha del contrato", { type: "date" })}
        {renderField("entrada", "Fecha de entrada", { type: "date" })}
        {renderField("salida", "Fecha de salida", { type: "date" })}
        {renderField("personas", "Número de personas", { type: "number", maxLength: 3 })}
        {renderField("habitaciones", "Número de habitaciones", { type: "number", maxLength: 3 })}
      </Section>
      <Section title="Información del pago">
        {renderSelect("tipoPago", "Tipo de pago", payTypes)}
        {renderField("medioPago", "Medios de pago")}
        {renderField("titularPago", "Titular del pago")}
        {renderField("fechaPago", "Fecha de pago", { type: "date" })}
      </Section>
      <Section title="Datos del titular">
        {renderField("tNombre", "Nombre")}
        {renderField("tApellido1", "Primer apellido")}
        {renderField("tApellido2", "Segundo apellido")}
        {renderField("tNacimiento", "Fecha de nacimiento", { type: "date" })}
        {renderField("tNacionalidad", "Nacionalidad")}
        {renderSelect("tSexo", "Sexo", sexes)}
        {renderSelect("tTipoDoc", "Tipo de documento", docTypes)}
        {renderField("tDocumento", "Documento")}
        {renderField("tSoporteDoc", "Soporte del documento")}
        {renderField("tTelefono", "Teléfono", { type: "tel" })}
        {renderField("tTelefono2", "Teléfono adicional", { type: "tel" })}
        {renderField("tEmail", "Correo electrónico", { type: "email", maxLength: 80 })}
      </Section>
      <Section title="Dirección del titular">
        {renderField("tDireccion", "Dirección")}
        {renderField("tDireccion2", "Dirección adicional")}
        {renderField("tPais", "País")}
        {renderField("tProvincia", "Provincia")}
        {renderField("tMunicipio", "Municipio")}
        {renderField("tCodigoPostal", "Código postal")}
      </Section>
      <label className="flex items-center gap-3 rounded-xl bg-muted p-4 text-sm font-medium">
        <input
          type="checkbox"
          checked={sameAsTitular}
          onChange={(event) => toggleSame(event.target.checked)}
          className="h-4 w-4 accent-primary"
        />
        Los datos del viajero son los mismos que los del titular
      </label>
      <Section title="Datos del viajero">
        {renderField("vNombre", "Nombre", { disabled: sameAsTitular })}
        {renderField("vApellido1", "Primer apellido", { disabled: sameAsTitular })}
        {renderField("vApellido2", "Segundo apellido", { disabled: sameAsTitular })}
        {renderField("vNacimiento", "Fecha de nacimiento", {
          type: "date",
          disabled: sameAsTitular,
        })}
        {renderField("vNacionalidad", "Nacionalidad", { disabled: sameAsTitular })}
        {renderSelect("vSexo", "Sexo", sexes, sameAsTitular)}
        {renderSelect("vTipoDoc", "Tipo de documento", docTypes, sameAsTitular)}
        {renderField("vDocumento", "Documento", { disabled: sameAsTitular })}
        {renderField("vSoporteDoc", "Soporte del documento", { disabled: sameAsTitular })}
        {renderField("vTelefono", "Teléfono", { type: "tel", disabled: sameAsTitular })}
        {renderField("vTelefono2", "Teléfono adicional", { type: "tel", disabled: sameAsTitular })}
        {renderField("vEmail", "Correo electrónico", {
          type: "email",
          disabled: sameAsTitular,
          maxLength: 80,
        })}
        {renderField("vParentesco", "Parentesco", { disabled: sameAsTitular })}
      </Section>
      <Section title="Dirección del viajero">
        {renderField("vDireccion", "Dirección", { disabled: sameAsTitular })}
        {renderField("vDireccion2", "Dirección adicional", { disabled: sameAsTitular })}
        {renderField("vPais", "País", { disabled: sameAsTitular })}
        {renderField("vProvincia", "Provincia", { disabled: sameAsTitular })}
        {renderField("vMunicipio", "Municipio", { disabled: sameAsTitular })}
        {renderField("vCodigoPostal", "Código postal", { disabled: sameAsTitular })}
      </Section>
      <Button type="submit" size="lg" className="w-full">
        <Download className="mr-2 h-5 w-5" />
        Descargar PDF del parte de entrada
      </Button>
      {mailHref && (
        <div id="enviar-solicitud" className="space-y-3 rounded-xl bg-accent/10 p-4" tabIndex={-1}>
          <p className="flex items-start gap-2 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
            PDF descargado. Ahora abre tu correo, ADJUNTA el PDF y envíanoslo.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => window.location.assign(mailHref)}
          >
            <Mail className="mr-2 h-5 w-5" />
            Abrir correo con la solicitud
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Si no se abre tu aplicación, mándalo manualmente a{" "}
            <a className="font-medium text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      )}
      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
        Al enviar se descarga un PDF idéntico al parte de entrada de viajeros. Envíalo a{" "}
        {CONTACT_EMAIL} o tráelo a tu llegada.
      </p>
    </form>
  );
}
