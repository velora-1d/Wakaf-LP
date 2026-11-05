---
name: blossom-carousel-react
description: Builds carousels with @blossom-carousel/react in React and Next.js, covering BlossomCarousel setup, CSS scroll-snap layouts, BlossomPrev/BlossomNext/BlossomDots/BlossomDot controls, ref methods (prev, next, goTo), useBlossomNavigation for custom controls, and command and overscroll events. Use when a React or Next.js project imports @blossom-carousel/react or renders <BlossomCarousel>, or when the user wants a Blossom carousel, slider, or gallery in React or Next.js.
license: MIT
metadata:
  package: "@blossom-carousel/react"
  version: "1.8.0"
---

# Blossom Carousel for React and Next.js

`<BlossomCarousel>` renders a native horizontal scroll container. Layout, slide sizes, gaps, and snapping are plain CSS. Blossom adds mouse dragging with momentum and rubber-banding, and only downloads its drag engine on devices with a fine pointer. Touch devices keep native scrolling.

For migrations from Embla, Swiper, Splide, Slick, or Flickity, use the `blossom-carousel-migration` skill first.

## Setup

```bash
npm install @blossom-carousel/react
```

Import the stylesheet once from the app entry or root layout (`app/layout.tsx` for the Next.js App Router, `pages/_app.tsx` for the Pages Router):

```tsx
import "@blossom-carousel/react/style.css";
```

Then use the component wherever the carousel renders. The package doesn't ship a `"use client"` directive, so in the Next.js App Router, any file that renders Blossom components must start with `"use client"`:

```tsx
"use client";

import { BlossomCarousel } from "@blossom-carousel/react";

export function FeaturedCarousel({ items }) {
  return (
    <BlossomCarousel className="carousel">
      {items.map((item) => (
        <div key={item.id} className="slide">
          {item.title}
        </div>
      ))}
    </BlossomCarousel>
  );
}
```

## Layout

Style the carousel root and slides with regular CSS. Each direct child is a slide.

```css
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
```

Blossom's default styles are wrapped in `@layer blossom-carousel`, so normal CSS, CSS Modules, and Tailwind utilities override them without `!important`. Use Tailwind classes only if the project already uses Tailwind.

## Props

| Prop     | Type                        | Default         | Purpose                                                                                      |
| -------- | --------------------------- | --------------- | -------------------------------------------------------------------------------------------- |
| `as`     | `ElementType`               | `"div"`         | Root element. Use `as="ul"` with `<li>` slides for list semantics.                           |
| `load`   | `"conditional" \| "always"` | `"conditional"` | `conditional` loads the drag engine only when `(hover: hover) and (pointer: fine)` matches. |
| `repeat` | `boolean`                   | `false`         | Experimental looping mode.                                                                   |

Other HTML attributes such as `id`, `className`, and `aria-*` are passed to the root element.

## Navigation controls

Give the carousel an `id`, point each control's `for` prop at it, and mark slides with `data-blossom-slide`:

```tsx
import { BlossomCarousel, BlossomPrev, BlossomNext, BlossomDots } from "@blossom-carousel/react";

<>
  <BlossomCarousel id="gallery" className="carousel">
    {items.map((item) => (
      <div key={item.id} data-blossom-slide className="slide">
        {item.title}
      </div>
    ))}
  </BlossomCarousel>

  <BlossomPrev for="gallery" />
  <BlossomDots for="gallery" />
  <BlossomNext for="gallery" />
</>
```

- Controls are native buttons wired through the Invoker Commands API (with a built-in fallback). They need no ref and work on touch devices where the drag engine isn't loaded.
- `BlossomPrev` and `BlossomNext` move to the adjacent snap point, or page by about 85% of the viewport when nothing snaps. They disable themselves at the edges and default to the labels "Previous slide" and "Next slide". Pass a more specific `aria-label`, such as "Next products", when that's clearer.
- Pass children to replace the default `‹` and `›` icons: `<BlossomNext for="gallery"><ArrowRight /></BlossomNext>`.
- `behavior="instant"` or `behavior="auto"` changes the scroll animation (default `smooth`). On `BlossomDots` it applies to every dot, and a `BlossomDot` can override it.

Theme the default dots with CSS custom properties on the dots or any ancestor:

```css
.my-dots {
  --blossom-dot-size: 0.625rem;
  --blossom-dot-radius: 50%;
  --blossom-dot-color: currentColor;
  --blossom-dot-opacity: 0.35;
  --blossom-dot-hover-opacity: 0.6;
  --blossom-dot-active-opacity: 1;
}
```

For fully custom dots, such as thumbnails, pass a render function and return a `<BlossomDot>`. It renders the `<button>` with navigation and ARIA attributes already set:

```tsx
<BlossomDots for="gallery">
  {({ index, active }) => (
    <BlossomDot className="thumb" data-active={active} aria-label={`Show ${items[index].title}`}>
      <img src={items[index].thumb} alt="" />
    </BlossomDot>
  )}
</BlossomDots>
```

## Methods

Pass a ref to get a `BlossomCarouselHandle` with `prev(options?)`, `next(options?)`, `goTo(index, options?)`, and `element`, which is the root element. `goTo` takes a zero-based index into the `data-blossom-slide` elements. `options.behavior` is `"smooth"` (default), `"instant"`, or `"auto"`. These methods use native scrolling, so they work on touch devices too.

```tsx
import { useRef } from "react";
import { BlossomCarousel, type BlossomCarouselHandle } from "@blossom-carousel/react";

export function Gallery() {
  const carousel = useRef<BlossomCarouselHandle>(null);

  return (
    <>
      <BlossomCarousel ref={carousel} id="gallery">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} data-blossom-slide>
            Slide {i + 1}
          </div>
        ))}
      </BlossomCarousel>

      <button type="button" onClick={() => carousel.current?.goTo(0, { behavior: "instant" })}>
        Back to start
      </button>
    </>
  );
}
```

Commands are registered in a layout effect, so a parent's `useLayoutEffect` can call `goTo(i, { behavior: "instant" })` to set the starting slide before first paint.

## Custom controls with `useBlossomNavigation`

`useBlossomNavigation(id)` returns `{ activeIndex, count, canPrev, canNext }`. It's the same state the built-in controls use, and it only re-renders when a value changes. `activeIndex` is `-1` until the carousel has been measured.

```tsx
import { useRef } from "react";
import {
  BlossomCarousel,
  useBlossomNavigation,
  type BlossomCarouselHandle,
} from "@blossom-carousel/react";

export function Gallery() {
  const carousel = useRef<BlossomCarouselHandle>(null);
  const { activeIndex, count, canPrev, canNext } = useBlossomNavigation("gallery");

  return (
    <>
      <BlossomCarousel ref={carousel} id="gallery">
        {/* slides with data-blossom-slide */}
      </BlossomCarousel>

      <button type="button" disabled={!canPrev} onClick={() => carousel.current?.prev()}>
        Previous
      </button>
      <span>
        {activeIndex + 1} / {count}
      </span>
      <button type="button" disabled={!canNext} onClick={() => carousel.current?.next()}>
        Next
      </button>
    </>
  );
}
```

## Events

Pass `onOverscroll` and `onCommand` as props. `BlossomCarousel` attaches them with `addEventListener` and always calls the latest handler, so inline functions are fine:

```tsx
import {
  BlossomCarousel,
  type BlossomCommandEvent,
  type BlossomOverscrollEvent,
} from "@blossom-carousel/react";

export function Gallery() {
  const onOverscroll = (event: BlossomOverscrollEvent) => {
    event.preventDefault(); // replace the default rubber-band transform
    const offset = event.detail.left;
    for (const slide of (event.currentTarget as HTMLElement).children) {
      (slide as HTMLElement).style.transform = `scale(${1 - Math.abs(offset) * 0.001})`;
    }
  };

  const onCommand = (event: BlossomCommandEvent) => {
    const command = event.command ?? event.detail?.command;
    // "--blossom-prev" | "--blossom-next" | "--blossom-goto-{index}"
  };

  return (
    <BlossomCarousel onOverscroll={onOverscroll} onCommand={onCommand}>
      {/* slides */}
    </BlossomCarousel>
  );
}
```

These props require `@blossom-carousel/react` 1.8.0 or later. Check the installed version; on older versions React drops them with an "Unknown event handler property" warning, so attach listeners to `ref.current.element` in a `useEffect` instead.

- `command` fires when a control or method navigates. Dragging and free scrolling don't fire it.
- `overscroll` fires while the drag engine rubber-bands past an edge. `detail.left` is the offset in pixels.
- To react to the active slide, use `useBlossomNavigation().activeIndex`. The drag engine also emits `scrollend`, `scrollsnapchange`, and `scrollsnapchanging`, matching the native events. Attach those with `addEventListener` too.

## Gotchas

- `onOverscroll` and `onCommand` only work from 1.8.0. Other non-React events such as `scrollsnapchange` still need `addEventListener` on `ref.current.element`.
- The ref is a `BlossomCarouselHandle`, not an element. Use `ref.current.element` for the DOM node.
- In the Next.js App Router, files that render Blossom components need `"use client"`, even when the carousel has no interactivity of its own.
- Dots and `goTo` count only elements with `data-blossom-slide` (at any depth). Without the attribute, there are no dots and `goTo` does nothing. Prev and next work without it.
- The `for` prop must match the carousel `id` exactly. With several carousels on a page, generate ids with `useId()`.
- Render `<BlossomDots>` after its `<BlossomCarousel>` in the JSX. The carousel registers its slide count while rendering, so dots rendered earlier start empty during SSR and only fill in after hydration.
- `<BlossomDot>` only works inside the `<BlossomDots>` render function.
- Dot styling uses `[data-blossom-dots]`, `[data-blossom-dot]`, `[data-blossom-dot-marker]`, and `[aria-current="true"]`. The old `.blossom-dots` and `.blossom-dot` classes no longer exist.
- Keep `overflow-x` on the root as `auto` (the default). `overflow: hidden` disables dragging.
- The drag engine reads `scroll-snap-type` once, when it initializes, so a snap type that changes in a media query is ignored for mouse dragging. Keep `scroll-snap-type` constant and vary `scroll-snap-align` on the slides instead, or re-mount the carousel with a new `key` when the snap type has to change.
- Overscroll events come from the drag engine, so with the default `load="conditional"` they never fire on touch devices. Treat custom overscroll effects as a mouse enhancement.
- If slides change after mount, Blossom remeasures automatically. Don't change the carousel's `key` to force a refresh.
- `@blossom-carousel/react` 1.7.0 shipped development-only JSX and fails with production React. Use 1.7.1 or later.

## Accessibility baseline

Wrap the carousel in a labelled `<section>`, use `as="ul"` with `<li>` slides for lists of items, and include `BlossomPrev`/`BlossomNext` or dots, because dragging alone does not meet WCAG 2.5.7. Give controls names that describe what they show, for example "Next products".

## Further docs

Fetch these only when the task needs them:

- Layout recipes (cover flow, stacks, thumbnails, sticky, RTL, masonry): read the index at https://www.blossom-carousel.com/raw/docs/examples.md, then fetch the matching example. Examples use Vue-style `<BlossomCarousel>` markup with CSS and Tailwind variants. Convert `class` to `className`, add `key` props, and move event bindings into effects.
- Accessibility questions (ARIA, keyboard, focus, reduced motion, auto-rotation, screen readers, WCAG): https://www.blossom-carousel.com/raw/docs/a11y/accessibility-guide.md
- Full docs index: https://www.blossom-carousel.com/llms.txt
