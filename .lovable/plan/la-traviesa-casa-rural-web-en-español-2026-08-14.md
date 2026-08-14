# La Traviesa Casa Rural — web en español

Landing page de una sola página (ruta `/`) para la casa rural de Aljucén (Badajoz), con la información real de su ficha de Booking, fotos reales enlazadas desde Booking, formulario de contacto y botón directo a Booking.

## Contenido de la página

1. **Cabecera fija** — nombre "La Traviesa", navegación por anclas (Casa, Galería, Servicios, Entorno, Contacto) y botón "Reservar en Booking".
2. **Hero** — foto grande de la casa/piscina, titular, ubicación (Calle Mayor 4, Aljucén, Badajoz), nota de valoración 8,9 · 23 comentarios, dos acciones: "Reservar en Booking" y "Consultar disponibilidad" (ancla al formulario).
3. **La casa** — 200 m², alojamiento completo para hasta 13 personas, 5 dormitorios y 5 baños, cocina totalmente equipada, salón, comedor, terraza con vistas y balcón.
4. **Galería** — cuadrícula con las fotos reales de la ficha (dormitorios, baño, salón, piscina, exteriores) y visor ampliado al hacer clic.
5. **Servicios** — piscina exterior de temporada, jardín, barbacoa, WiFi gratis, parking gratis, admite mascotas, habitaciones familiares, sin humo, ropa de cama y toallas, TV, lavadero, vistas a la montaña.
6. **Valoraciones** — desglose real de Booking (Personal 9,0 · Instalaciones 8,8 · Limpieza 8,8 · Confort 9,1 · Calidad-precio 9,3 · Ubicación 9,1) con enlace a los comentarios en Booking.
7. **El entorno** — Aljucén y alrededores: Acueducto de los Milagros (15 km), Basílica de Santa Eulalia y Mérida (16 km), aeropuerto de Badajoz (59 km), senderismo y ciclismo. Mapa embebido de la ubicación.
8. **Contacto** — formulario (nombre, email, teléfono, fechas de entrada/salida, nº de personas, mensaje) más datos de contacto y enlace a Booking.
9. **Pie** — dirección, enlace a Booking y aviso de que la disponibilidad y precios se gestionan en Booking.

## Formulario de contacto

- Validación con zod: campos obligatorios, email válido, límites de longitud, fecha de salida posterior a la de entrada.
- Al enviar, abre el cliente de correo del propietario con la consulta ya redactada (mailto codificado) y muestra confirmación en pantalla. Sin base de datos ni backend.
- Necesito el email (y teléfono/WhatsApp si quieres mostrarlo) al que deben llegar las consultas; mientras tanto dejo un marcador visible para sustituir.

## Diseño

Estética rural extremeña cálida y sobria, no genérica: fondo tipo cal/arena, verde olivo y terracota como acentos, tipografía serif de carácter para los títulos y sans limpia para el texto, esquinas suaves, fotografía a gran tamaño y mucho aire. Tokens definidos en `src/styles.css` (light y dark), sin colores fijos en los componentes.

## Detalles técnicos

- Se reescribe `src/routes/index.tsx` (sustituye el placeholder) con secciones en componentes separados dentro de `src/components/`.
- Las imágenes se enlazan desde las URL públicas de Booking (`cf.bstatic.com`) con `loading="lazy"` y `alt` descriptivos. Si Booking cambia las URL habría que sustituirlas por fotos propias subidas al proyecto.
- SEO: `head()` propio en la ruta con título y descripción específicos, og/twitter, `og:image` con la foto principal de Booking (URL https absoluta), un solo H1, HTML semántico y JSON-LD de tipo `LodgingBusiness` con dirección y valoración.
