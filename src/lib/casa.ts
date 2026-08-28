export const BOOKING_URL =
  "https://www.booking.com/hotel/es/la-traviesa-casa-rural.es.html";

export const CONTACT_EMAIL = "casarurallaplata@gmail.com";

export const TELEFONO = "615 66 32 49";
export const TELEFONO_TEL = "+34615663249";

export const DIRECCION = "Calle Mayor, 4, 06894 Aljucén, Badajoz";


const imagenes = import.meta.glob("../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

export const fotos = Object.entries(imagenes)
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB, undefined, { numeric: true }))
  .map(([ruta, src]) => ({
    src,
    alt: `Fotografía de La Traviesa Casa Rural: ${ruta.split("/").pop()?.replace(/\.[^.]+$/, "")}`,
  }));

const fotosExcluidas = new Set(["1000150542.jpg", "1000150533.jpg"]);

const gruposDeFotos = [
  { titulo: "Dormitorios", indices: [0, 1, 2, 3, 4, 6, 7, 19, 24, 26, 27, 28, 34, 35, 36, 37] },
  { titulo: "Baños", indices: [5, 15, 17, 29, 30] },
  { titulo: "Salón y cocina", indices: [12, 13, 14, 18, 20, 21, 22, 23, 38] },
  { titulo: "Exteriores y piscina", indices: [8, 9, 10, 11, 31, 32, 33, 41, 43] },
  { titulo: "Detalles y rincones", indices: [16, 25, 39, 40, 42, 44] },
] as const;

export const seccionesFotos = gruposDeFotos.map(({ titulo, indices }) => ({
  titulo,
  fotos: indices.map((indice) => fotos[indice]).filter((foto) => !fotosExcluidas.has(foto.alt.split(": ").pop() + ".jpg")),
}));

export const fotosGaleria = seccionesFotos.flatMap((seccion) => seccion.fotos);

export const FOTO_PRINCIPAL = fotos[8]?.src ?? "";
export const FOTO_PISCINA_BALCON = fotos[31]?.src ?? FOTO_PRINCIPAL;

export const valoraciones = [
  { etiqueta: "Personal", nota: 9.0 },
  { etiqueta: "Instalaciones y servicios", nota: 8.8 },
  { etiqueta: "Limpieza", nota: 8.8 },
  { etiqueta: "Confort", nota: 9.1 },
  { etiqueta: "Relación calidad-precio", nota: 9.3 },
  { etiqueta: "Ubicación", nota: 9.1 },
];

export const servicios = [
  { icono: "piscina", titulo: "Piscina exterior", texto: "Piscina privada de temporada al aire libre." },
  { icono: "barbacoa", titulo: "Jardín y barbacoa", texto: "Zona exterior con jardín y barbacoa para usar a tu aire." },
  { icono: "parking", titulo: "Parking gratis", texto: "Aparcamiento gratuito junto a la casa." },
  { icono: "wifi", titulo: "WiFi gratis", texto: "Conexión wifi gratuita en todo el alojamiento." },
  { icono: "mascotas", titulo: "Admite mascotas", texto: "Tus animales de compañía son bienvenidos." },
  { icono: "cocina", titulo: "Cocina equipada", texto: "Cocina completa, zona de comedor y lavadero." },
  { icono: "familias", titulo: "Habitaciones familiares", texto: "Cinco dormitorios y cinco baños para grupos grandes." },
  { icono: "vistas", titulo: "Vistas y terraza", texto: "Terraza y balcón con vistas al pueblo y a la montaña." },
] as const;


export const entorno = [
  { titulo: "Teatro Romano de Mérida", texto: "A solo 15 km." },
  { titulo: "Dólmenes de Lácara", texto: "Monumento megalítico de la prehistoria, uno de los más grandes de la península ibérica." },
  { titulo: "Senderismo y ciclismo", texto: "Rutas por la sierra y el valle del Aljucén desde la puerta." },
  { titulo: "Aeropuerto de Badajoz", texto: "A 59 km por autovía." },
];
