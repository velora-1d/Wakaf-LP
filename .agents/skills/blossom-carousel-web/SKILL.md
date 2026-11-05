---
name: blossom-carousel-web
description: Builds carousels with @blossom-carousel/web custom elements in plain HTML or any framework without a dedicated package, covering npm and CDN setup, CSS scroll-snap layouts, blossom-prev/blossom-next/blossom-dots/blossom-dot controls, renderDot for per-slide dots, element methods (prev, next, goTo), and command and overscroll events. Use when a project uses <blossom-carousel> or @blossom-carousel/web, or when the user wants a Blossom carousel in static HTML, a CMS template, Astro, Rails, Django, Laravel, or another setup without a React, Vue, or Svelte component.
license: MIT
metadata:
  package: "@blossom-carousel/web"
  version: "1.6.1"
---

# Blossom Carousel Web Components

`<blossom-carousel>` is a custom element that wraps a native horizontal scroll container. Layout, slide sizes, gaps, and snapping are plain CSS. Blossom adds mouse dragging with momentum and rubber-banding, while touch devices keep native scrolling.

If the project uses React, Vue, or Svelte, use the matching `blossom-carousel-react`, `blossom-carousel-vue`, or `blossom-carousel-svelte` skill instead. For migrations from Embla, Swiper, Splide, Slick, or Flickity, use the `blossom-carousel-migration` skill first.

## Setup

With a bundler:

```bash
npm install @blossom-carousel/web
```

```js
import "@blossom-carousel/web"; // registers all custom elements
import "@blossom-carousel/web/style.css";
```

Without a build step, load the UMD build and stylesheet from a CDN. Pin the major version so a future major release can't break the page:

```html
<link rel="stylesheet" href="https://unpkg.com/@blossom-carousel/web@1/dist/blossom-carousel-web.css" />
<script defer src="https://unpkg.com/@blossom-carousel/web@1/dist/blossom-carousel-web.umd.js"></script>
```

Importing the module registers `<blossom-carousel>`, `<blossom-prev>`, `<blossom-next>`, `<blossom-dots>`, and `<blossom-dot>`. The module is safe to import during SSR, and repeated imports don't register the elements twice.

## Layout

Style the element and its slides with regular CSS. Slides are the element's direct light-DOM children.

```html
<blossom-carousel class="carousel">
  <div class="slide">Slide 1</div>
  <div class="slide">Slide 2</div>
  <div class="slide">Slide 3</div>
</blossom-carousel>

<style>
  .carousel {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 200px;
    gap: 1rem;
    scroll-snap-type: inline mandatory; /* optional: snapping */
  }

  .slide {
    scroll-snap-align: center;
  }
</style>
```

Blossom's default styles are wrapped in `@layer blossom-carousel`, so normal CSS and Tailwind utilities override them without `!important`. Use Tailwind classes only if the project already uses Tailwind.

## Attributes

| Attribute | Purpose                                                                           |
| --------- | --------------------------------------------------------------------------------- |
| `repeat`  | Experimental looping mode. It's a boolean attribute, so its presence enables it.  |
| `id`      | Required when using navigation controls.                                          |

Unlike the framework packages, the Web Component initializes the drag engine as soon as the element connects. There's no `load` option. On touch devices, the engine stays idle and native scrolling is used.

## Navigation controls

Give the carousel an `id`, point each control's `for` attribute at it, and mark slides with `data-blossom-slide`:

```html
<blossom-carousel id="gallery" class="carousel">
  <div data-blossom-slide class="slide">Slide 1</div>
  <div data-blossom-slide class="slide">Slide 2</div>
  <div data-blossom-slide class="slide">Slide 3</div>
</blossom-carousel>

<blossom-prev for="gallery"></blossom-prev>
<blossom-dots for="gallery"></blossom-dots>
<blossom-next for="gallery"></blossom-next>
```

- Each control renders a native `<button>` wired through the Invoker Commands API (with a built-in fallback). Controls work on touch devices too.
- `<blossom-prev>` and `<blossom-next>` move to the adjacent snap point, or page by about 85% of the viewport when nothing snaps. They disable themselves at the edges and default to the labels "Previous slide" and "Next slide".
- Child content, including SVG icons, becomes the button's content: `<blossom-next for="gallery"><svg>…</svg></blossom-next>`. A `<button>` placed as the direct child is reused instead of wrapped.
- For a more specific name, set `aria-label` on the host, such as `<blossom-next for="gallery" aria-label="Next products">`. It's moved onto the inner button, including when set later. An `aria-label` on your own `<button>` child takes precedence. This needs 1.6.1 or later; older versions overwrite the button label with the default.
- `behavior="instant"` or `behavior="auto"` changes the scroll animation (default `smooth`). On `<blossom-dots>` it applies to every dot, and a `<blossom-dot>` prototype can override it.

Theme the default dots with CSS custom properties on the dots or any ancestor:

```css
blossom-dots {
  --blossom-dot-size: 0.625rem;
  --blossom-dot-radius: 50%;
  --blossom-dot-color: currentColor;
  --blossom-dot-opacity: 0.35;
  --blossom-dot-hover-opacity: 0.6;
  --blossom-dot-active-opacity: 1;
}
```

For custom dots that look the same on every slide, put one `<blossom-dot>` inside `<blossom-dots>`. It acts as a hidden prototype that is cloned for each slide, and navigation attributes are merged onto its `<button>`, which is created automatically if it's missing:

```html
<blossom-dots for="gallery">
  <blossom-dot class="my-dot">•</blossom-dot>
</blossom-dots>
```

For per-slide content, such as thumbnails, set the `renderDot` property on `<blossom-dots>`. The callback receives `(index, active, forId)` and must return an element containing a `<button>`. It takes priority over a `<blossom-dot>` prototype.

```html
<blossom-dots for="gallery" id="gallery-dots"></blossom-dots>

<script type="module">
  document.getElementById("gallery-dots").renderDot = (index) => {
    const button = document.createElement("button");
    button.className = "thumb";
    button.setAttribute("aria-label", `Show slide ${index + 1}`);
    button.innerHTML = `<img src="/thumbs/${index}.jpg" alt="">`;
    return button;
  };
</script>
```

## Methods

Call these on the `<blossom-carousel>` element: `prev(options?)`, `next(options?)`, and `goTo(index, options?)`. `goTo` takes a zero-based index into the `data-blossom-slide` elements. `options.behavior` is `"smooth"` (default), `"instant"`, or `"auto"`.

```js
const carousel = document.getElementById("gallery");
carousel.goTo(0, { behavior: "instant" });
```

The elements must be defined before you call these methods. With the CDN script, call them after `DOMContentLoaded` or `await customElements.whenDefined("blossom-carousel")`.

## Events

Listen on the `<blossom-carousel>` element:

```js
const carousel = document.getElementById("gallery");

carousel.addEventListener("command", (event) => {
  const command = event.command ?? event.detail?.command;
  // "--blossom-prev" | "--blossom-next" | "--blossom-goto-{index}"
});

carousel.addEventListener("overscroll", (event) => {
  event.preventDefault(); // replace the default rubber-band transform
  const offset = event.detail.left;
  for (const slide of event.currentTarget.children) {
    slide.style.transform = `scale(${1 - Math.abs(offset) * 0.001})`;
  }
});
```

- `command` fires when a control or method navigates. Dragging and free scrolling don't fire it, and it doesn't bubble, so attach the listener to the carousel itself.
- `overscroll` fires while the drag engine rubber-bands past an edge. `detail.left` is the offset in pixels.
- For the active slide, listen for `scrollsnapchange` (with `event.snapTargetInline` natively, or `event.detail.snapTargetInline` from the drag engine), or watch `aria-current="true"` on the dots. The drag engine also emits `scrollend` and `scrollsnapchanging`, matching the native events.

## Gotchas

- Dots and `goTo` count only elements with `data-blossom-slide` (at any depth). Without the attribute, there are no dots and `goTo` does nothing. Prev and next work without it.
- The `for` attribute must match the carousel `id` exactly, and the carousel must be in the DOM when the controls connect.
- Use `renderDot` for content that differs per slide. A `<blossom-dot>` prototype is cloned, so every dot gets identical content.
- Dot styling uses `[data-blossom-dots]`, `[data-blossom-dot]`, `[data-blossom-dot-marker]`, and `[aria-current="true"]`. The old `.blossom-dots` and `.blossom-dot` classes no longer exist.
- Keep `overflow-x` on the carousel as `auto` (the default). `overflow: hidden` disables dragging.
- The drag engine reads `scroll-snap-type` once, when the element connects, so a snap type that changes in a media query is ignored for mouse dragging. Keep `scroll-snap-type` constant and vary `scroll-snap-align` on the slides instead, or remove and re-insert the element when the snap type has to change.
- Overscroll effects only run where the drag engine is active (mouse and trackpad), so treat them as an enhancement.
- If slides change after the element connects, Blossom remeasures automatically. Removing and re-adding the element also works, because it cleans up on disconnect.

## Accessibility baseline

Wrap the carousel in a labelled `<section>`, use list markup inside slides when it fits the content, and include `<blossom-prev>`/`<blossom-next>` or dots, because dragging alone does not meet WCAG 2.5.7.

## Further docs

Fetch these only when the task needs them:

- Layout recipes (cover flow, stacks, thumbnails, sticky, RTL, masonry): read the index at https://www.blossom-carousel.com/raw/docs/examples.md, then fetch the matching example. Examples use Vue-style `<BlossomCarousel>` markup. Convert it to `<blossom-carousel>`, `<blossom-prev>`, and the other custom elements, and replace bindings with `addEventListener`. The CSS can be used as-is.
- Accessibility questions (ARIA, keyboard, focus, reduced motion, auto-rotation, screen readers, WCAG): https://www.blossom-carousel.com/raw/docs/a11y/accessibility-guide.md
- Full docs index: https://www.blossom-carousel.com/llms.txt
