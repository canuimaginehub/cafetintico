
# TINTICO — Rediseño Premium Editorial

Una experiencia de café de especialidad colombiano elevada al nivel de Blue Bottle / Onyx / Aesop, conservando la calidez y la identidad colombiana de TINTICO. Todo en español argentino.

## Dirección de marca y diseño

**Paleta híbrida por sección**
- **Espresso atmosphere** (hero, storytelling, suscripción, journal): negro espresso `#1a1410`, marrón tostado profundo, crema cálida para texto, terracota y oro tenue como acentos
- **Boutique claro** (shop, producto, brewing, B2B): ivory `#f5f1ea`, beige latte, tipografía espresso, detalles terracota
- Transiciones cinematográficas entre secciones oscuras y claras

**Tipografía editorial**
- Display: serif premium (Fraunces o Playfair) para titulares grandes, tracking abierto
- Body: Inter para legibilidad, jerarquía generosa
- Eyebrows en uppercase con letter-spacing amplio

**Sistema visual**
- Whitespace abundante, grids editoriales
- Microanimaciones Framer Motion: fade-up con stagger, parallax sutil en hero, hover scale en cards, drawer del carrito con spring premium
- Cursor refinado, scroll suave, números animados, tasting notes con dots de color

## Arquitectura técnica

- **Front**: React + Vite + TypeScript + Tailwind + Framer Motion + shadcn
- **Backend (Lovable Cloud)**: auth de clientes, productos, variantes (molienda/tamaño), pedidos, suscripciones, leads B2B, reseñas, resultados del quiz
- **MercadoPago**: integración custom vía Edge Function (Checkout Pro + webhook de pagos). Requiere que después conectes tus credenciales de MercadoPago Argentina
- **Contenido editorial** (productores, posts del Coffee Journal, secciones del home, brewing guides): estructurado en archivos TypeScript tipados, listos para migrar a Sanity más adelante sin refactor
- **Panel admin interno** (ruta protegida `/admin`): gestión de productos, pedidos, suscripciones y leads B2B

## Sitemap completo (todo en español)

| Ruta | Página |
|---|---|
| `/` | Home |
| `/tienda` | Shop con filtros |
| `/tienda/cafe` · `/tienda/equipos` · `/tienda/combos` | Colecciones |
| `/producto/:slug` | Producto premium |
| `/nuestro-cafe` | Nuestro café |
| `/origen` | Origen Colombia + productores |
| `/experiencia` | Experiencia / brewing |
| `/diario` · `/diario/:slug` | Coffee Journal |
| `/suscripcion` | Landing suscripción |
| `/mayoristas` | Wholesale B2B |
| `/quiz` · `/quiz/resultado` | Coffee Finder |
| `/contacto` | Contacto + WhatsApp |
| `/cuenta` · `/cuenta/login` · `/cuenta/pedidos` · `/cuenta/suscripcion` | Cliente |
| `/admin/*` | Panel autoadministrable |

## Home — 9 secciones cinematográficas

1. **Hero oscuro fullscreen** — video/imagen macro de café, headline serif "Café de especialidad de Colombia", sub "Microlotes seleccionados. Tostado fresco. Enviado a tu casa.", CTAs "Comprar café" + "Descubrí tu perfil"
2. **Coffee Finder Quiz** — entrada interactiva con preview de las 4 preguntas
3. **Best Sellers** — grid editorial de 3-4 productos con tasting notes, badges, hover premium
4. **Storytelling productores** — "No vendemos café. Compartimos historias." Galería de fincas con altitud, proceso, productor
5. **Brewing experience** — V60, Chemex, French Press, Espresso, Moka — cada método con guía corta + producto asociado
6. **Social proof editorial** — testimonios + UGC + feed Instagram
7. **Suscripción** — "Tu café perfecto. Cada mes." con planes 15/30 días
8. **Coffee Journal** — últimos 3 artículos en formato magazine
9. **Wholesale teaser** — CTA hacia B2B + footer premium con newsletter

## Páginas clave

**Producto** — galería izquierda con zoom y lifestyle, panel derecho con nombre tipo "Tolima — Bourbon Rosado", tasting notes visuales (acidez/cuerpo/dulzor en sliders), proceso, altitud, productor, perfil de tueste, selector de molienda y tamaño, sticky add-to-cart. Debajo: historia del café, historia del productor, guía de brewing, reseñas, productos relacionados.

**Shop** — sidebar filtros minimalistas (perfil de sabor, origen, método, tueste, proceso), grid editorial, ordenamiento, vista rápida.

**Quiz** — 4 pasos animados pantalla completa (intensidad, notas, método, momento del día), barra de progreso elegante, página de resultado con perfil personalizado + 3 cafés recomendados + opción de armar suscripción.

**Suscripción** — landing emocional con planes (frecuencia, tamaño, cantidad de cafés), beneficios miembro, FAQ, gestión desde cuenta.

**Wholesale** — propuesta de valor segmentada (hoteles, restos, oficinas, cafeterías), formulario premium multi-step, casos de éxito.

**Coffee Journal** — magazine layout, hero por categoría, artículos con tipografía editorial.

## Features premium

- Cart Drawer con animación spring, upsells, envío gratis CABA
- Búsqueda con command palette (⌘K)
- Recomendaciones personalizadas según quiz
- WhatsApp consultation flotante elegante
- Newsletter con doble opt-in
- Auth de clientes (email + password) con perfil, pedidos, suscripción gestionable
- SEO completo: meta tags, Open Graph, JSON-LD de productos
- Mobile-first con menú drawer fullscreen luxury

## Panel admin (`/admin`)

CRUD de productos (con variantes y badges), pedidos con estados, suscripciones activas, leads B2B, reseñas a moderar, suscriptores newsletter. Protegido con rol `admin` en tabla `user_roles`.

## Modelo de datos (Lovable Cloud)

`profiles`, `user_roles`, `products`, `product_variants`, `categories`, `producers`, `orders`, `order_items`, `subscriptions`, `subscription_plans`, `wholesale_leads`, `reviews`, `quiz_results`, `newsletter_subscribers`. RLS estricto en todas las tablas.

## Entrega por fases dentro de esta build

1. Sistema de diseño + tipografías + tokens + layout base (header/footer luxury)
2. Home completo con las 9 secciones y animaciones
3. Shop + Producto + Cart Drawer
4. Quiz interactivo + resultado
5. Suscripción + Wholesale + Coffee Journal + Origen + Experiencia
6. Auth + Cuenta + Admin + datos seed
7. Edge Function MercadoPago + webhook (te pediré las credenciales al final)

> **Nota sobre pagos**: MercadoPago no es built-in en Lovable, pero lo integro vía Edge Function con Checkout Pro. Vas a necesitar generar tus `MP_ACCESS_TOKEN` y `MP_PUBLIC_KEY` en tu cuenta de MercadoPago Argentina cuando lleguemos a ese paso.

