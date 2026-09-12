# STUDIO VORTALIA — Tienda de playeras oversized

Landing page / e-commerce para vender playeras oversized por pedido, con el
flujo de compra terminando en un mensaje de WhatsApp prellenado hacia el
dueño de la tienda.

Este es un **proyecto independiente** dentro del repo (carpeta `/store`),
separado por completo de la landing de fitness coaching que vive en la raíz
del repositorio. Tiene su propio `package.json`, se instala y se corre por
separado.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion (animaciones y microinteracciones)
- html2canvas (para exportar el ticket como imagen PNG)

No usa GSAP ni una librería de animación adicional: Framer Motion ya cubre
todo lo pedido (marquee, blobs de fondo, parallax del hero, header que se
comprime al hacer scroll, scroll reveals, hover, el efecto de ticket saliendo de la
máquina, etc.) sin sumar peso extra al bundle.

## Cómo correr el proyecto

Esto **no es un HTML suelto que se abre con una extensión de VS Code tipo
Live Server** — es una app de React que necesita un paso de compilación
(Vite/TypeScript/Tailwind). La forma correcta de trabajar en VS Code es:

```bash
cd store
npm install
npm run dev
```

Esto levanta un servidor local (normalmente `http://localhost:5173`) con
recarga en caliente: cada vez que guardas un archivo, el navegador se
actualiza solo. Para generar la versión final que se sube a hosting:

```bash
npm run build   # genera /store/dist
npm run preview # sirve /store/dist para probarlo como quedaría en producción
```

## Estructura

```
src/
  config/store.ts        Configuración centralizada: marca, WhatsApp, moneda
  data/products.ts        Catálogo de productos (editar aquí para agregar/quitar playeras)
  lib/
    types.ts               Tipos (Product, CartLine, CustomerInfo...)
    cart.tsx                Estado del carrito (contexto + reducer)
    orders.ts               Generador de folio de pedido
    whatsapp.ts              Construcción del mensaje y link de WhatsApp
    validation.ts            Validación y sanitización del formulario
  components/
    Header, Hero, ProductCard, ProductGrid, About, Footer
    Cart/        CartDrawer, CartItem
    Checkout/    CheckoutForm, OrderSummary, CheckoutModal
    Ticket/      Ticket (diseño del recibo), TicketAnimation (efecto impresora)
```

## Tipografía y logo

El nombre de la marca (Header, Hero, Footer) usa la clase `.brand-wordmark`
(definida en `src/index.css`), que aplica la tipografía **Permanent
Marker** (Google Fonts) con un degradado dorado y sombra, imitando el estilo
de tag/grafiti del logo oficial de Studio Vortalia. El resto del sitio
(precios, botones, párrafos) sigue la paleta negro/blanco/verde normal — el
dorado es exclusivo del wordmark, no del sistema de color general.

El ticket de compra (`components/Ticket/Ticket.tsx`) usa tipografía
monoespaciada normal a propósito, para que se sienta como un recibo térmico
real y no compita visualmente con el logo.

## Cómo editar el catálogo (productos, colores, stock)

Todo vive en `src/data/products.ts`. Cada producto es un objeto:

```ts
{
  id: "oversized-negra",
  name: "Oversized Tee — Negra",
  description: "...",
  price: 450,
  color: "Negra",
  image: "/products/oversized-negra.jpg", // archivo dentro de /public/products
  imageAlt: "...",
  active: true, // false = oculto del catálogo
  sizes: [
    { size: "S", stock: 7 },
    { size: "M", stock: 12 },
    // stock: 0 = talla agotada (se muestra tachada y deshabilitada)
  ],
}
```

Para agregar una playera nueva: sube la foto a `public/products/`, agrega un
objeto nuevo a este arreglo. No hace falta tocar ningún componente.

### Sobre las imágenes actuales (IMPORTANTE)

Las imágenes en `public/products/placeholder-*.svg` son **marcadores
temporales** (silueta + color aproximado), no las fotos reales de las
playeras. Esto es una limitación técnica real: las fotos que se comparten
directamente en el chat no llegan a este proyecto como archivos — no hay
forma de "extraerlas" automáticamente del chat hacia el repositorio.

Para usar las fotos reales:
1. Colócalas en `store/public/products/` (ej. `oversized-negra.jpg`).
2. Cambia el campo `image` del producto correspondiente en `products.ts`
   a esa ruta, ej. `/products/oversized-negra.jpg`.

## Configuración centralizada (WhatsApp, nombre de marca, moneda)

Todo en `src/config/store.ts`. Es el único archivo que se debe tocar para
cambiar el número de WhatsApp, el nombre de la marca o la moneda — ningún
componente tiene el número de WhatsApp escrito directamente.

## Seguridad y precios — limitación real, no simulada

Este proyecto **no tiene backend**. Esto significa, en términos concretos:

- El precio que ve el cliente y el que se calcula en el carrito vienen del
  mismo archivo (`data/products.ts`) que corre en el navegador. Un usuario
  con conocimientos técnicos podría, en teoría, editar ese valor en las
  herramientas de desarrollador de su propio navegador antes de enviar el
  mensaje de WhatsApp.
- **No se simula una protección que no existe.** La única forma real de
  cerrar esto es agregar un backend (Node/Express, o funciones serverless)
  que:
  1. Reciba del frontend solo `productId`, `talla` y `cantidad`.
  2. Busque el precio real en una base de datos que el navegador nunca ve.
  3. Calcule el total en el servidor y sea ese total el que se usa para
     generar el pedido.
- La arquitectura actual ya está preparada para ese cambio sin rediseñar
  nada: `lib/cart.tsx` y `lib/whatsapp.ts` son los únicos lugares que
  tocarían una llamada a una API en vez de leer `products.ts` directamente.
- Como referencia de contexto: para un negocio pequeño que recibe y
  confirma cada pedido manualmente por WhatsApp antes de cobrar, este
  riesgo es bajo (el dueño ve el ticket y el precio real antes de aceptar
  el pedido), pero no es lo mismo que un cobro automático.

Ninguna API key ni secreto debe vivir en este frontend. Si en el futuro se
agrega WhatsApp Business Cloud API, el token va en un backend con variables
de entorno (`.env`, nunca commiteado), nunca en código que llega al
navegador.

## El ticket como imagen — limitación técnica real de WhatsApp

Un link `wa.me` **no puede adjuntar un archivo automáticamente** por
diseño de WhatsApp (es una limitación de la plataforma, no de este
proyecto). Lo que sí se implementó, siguiendo la opción técnicamente
correcta:

1. Al confirmar el pedido se abre WhatsApp con el mensaje de texto completo
   ya redactado (folio, productos, total, datos del cliente).
2. Se genera y anima el ticket en pantalla.
3. El botón **"Descargar imagen"** usa `html2canvas` para convertir el
   ticket a PNG y descargarlo al dispositivo del cliente.
4. El cliente adjunta esa imagen manualmente en el chat de WhatsApp que ya
   quedó abierto — el mismo flujo que usaría cualquier tienda que no tenga
   una integración con la API oficial de WhatsApp Business.

La única forma de automatizar el envío de la imagen sin este paso manual
es usar la WhatsApp Business Cloud API desde un backend propio (el token
de esa API nunca puede vivir en el frontend).

## Accesibilidad y rendimiento

- Animaciones respetan `prefers-reduced-motion`.
- Imágenes con `loading="lazy"`, `alt` descriptivo y `object-fit: contain`
  para no deformar las fotos de producto.
- Formulario con `label` asociado a cada campo y errores anunciados vía
  `aria-describedby`.
- Botones con áreas de toque ≥ 40px pensando en uso con el dedo.
