---
name: blossom-carousel-core
description: Drives the framework-agnostic @blossom-carousel/core drag engine directly on a DOM element, covering Blossom(element, options), init and destroy lifecycle, lazy loading on pointer devices, prev and next methods, repeat mode, and the overscroll, scrollend, and scroll-snap events it emits. Use when code imports @blossom-carousel/core, when building a custom wrapper for a framework without a Blossom package (Solid, Angular, Lit, Qwik, Alpine), or when debugging engine behavior shared by the React, Vue, Svelte, and Web packages.
license: MIT
metadata:
  package: "@blossom-carousel/core"
  version: "1.1.10"
---

# Blossom Carousel Core

Core is the drag engine behind every Blossom package. It enhances an existing native scroll container with mouse dragging, momentum, snap-aware flinging, and rubber-banding. Touch devices keep native scrolling.

Prefer a wrapper package when one fits, because wrappers add lifecycle handling and navigation controls:

- Vue or Nuxt: `blossom-carousel-vue`
- React or Next.js: `blossom-carousel-react`
- Svelte or SvelteKit: `blossom-carousel-svelte`
- Plain HTML or anything else: `blossom-carousel-web` (custom elements, including prev, next, and dot controls)

Use Core directly only when you need manual control or are writing a wrapper. Core has no prev, next, or dot components.

## Setup

```bash
npm install @blossom-carousel/core
```

```html
<div id="gallery" blossom-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</div>
```

```js
import { Blossom } from "@blossom-carousel/core";
import "@blossom-carousel/core/style.css";

const element = document.querySelector("#gallery");

if (element) {
  const blossom = Blossom(element);
  blossom.init();
}
```

- The element must be the scroll container, and its direct children are the slides.
- The stylesheet targets `[blossom-carousel]`, which provides horizontal overflow, a hidden scrollbar, and inline-block slides. `init()` adds the attribute, but put it in the markup too so the defaults also apply before the engine loads, or when it never loads on touch devices. The wrapper packages do this for you.
- The `options` argument is optional from 1.1.10. On older versions, TypeScript requires it, so pass `{}`.

## Layout

Configure layout and snapping with CSS on the element and its children:

```css
#gallery {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 200px;
  gap: 1rem;
  scroll-snap-type: inline mandatory; /* optional: snapping */
}

#gallery > * {
  scroll-snap-align: center;
}
```

Blossom reads `scroll-snap-type`, `scroll-snap-align`, `scroll-padding`, `scroll-margin`, `padding-inline`, and `dir="rtl"` from computed styles. Proximity snapping is supported. Default styles are wrapped in `@layer blossom-carousel`, so your CSS and Tailwind utilities override them without `!important`.

## Options

| Option   | Type      | Default | Purpose                                                              |
| -------- | --------- | ------- | -------------------------------------------------------------------- |
| `repeat` | `boolean` | `false` | Experimental looping mode. Adds 50% inline padding to the container. |

## Instance API

| Member               | Purpose                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `init()`             | Attaches listeners and observers. Call it once, after the slides are in the DOM.                                                                    |
| `destroy()`          | Removes listeners, observers, and the attribute. Call it on teardown.                                                                                |
| `prev({ align? })`   | Smooth-scrolls to the previous snap point, or the previous slide when nothing snaps. `align` (`"start"`, `"center"`, `"end"`) only applies without snapping. |
| `next({ align? })`   | Same as `prev`, in the other direction.                                                                                                               |

Core's `prev()` and `next()` always scroll smoothly. The wrapper packages' `prev`, `next`, and `goTo(index)` methods are a separate, native-scroll implementation that supports `{ behavior }`, works without the engine, and dispatches `command` events.

## Lazy loading

Load the engine only where it's used. This is what the wrappers do by default:

```js
const element = document.querySelector("#gallery");
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (element && hasFinePointer) {
  const { Blossom } = await import("@blossom-carousel/core");
  const blossom = Blossom(element);
  blossom.init();
}
```

Import `@blossom-carousel/core/style.css` statically, and keep the `blossom-carousel` attribute in the markup, so touch devices get the same layout defaults without the engine.

## Events

Core dispatches these on the container element. All of them bubble and are cancelable.

| Event                | `detail`                                                        | Notes                                                                                     |
| -------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `overscroll`         | `{ left: number }`                                              | Fires while rubber-banding past an edge. Call `preventDefault()` to replace the default transform. |
| `scrollend`          | none                                                            | Fires when a drag fling settles.                                                          |
| `scrollsnapchanging` | `{ snapTargetInline: HTMLElement \| null, snapTargetBlock: HTMLElement \| null }` | Fires during a drag when the predicted snap target changes.                               |
| `scrollsnapchange`   | `{ snapTargetInline: HTMLElement \| null, snapTargetBlock: HTMLElement \| null }` | Fires after a drag settles on a new snap target.                                          |

The snap events mirror the native `scrollsnapchange` and `scrollsnapchanging` events, which put `snapTargetInline` on the event itself rather than in `detail`. Handle both shapes so the same listener works for drag and touch scrolling:

```js
element.addEventListener("scrollsnapchange", (event) => {
  const target = event.snapTargetInline ?? event.detail?.snapTargetInline;
});

element.addEventListener("overscroll", (event) => {
  event.preventDefault();
  const offset = event.detail.left;
  for (const slide of element.children) {
    slide.style.transform = `scale(${1 - Math.abs(offset) * 0.001})`;
  }
});
```

## Gotchas

- Call `destroy()` before removing the element or re-initializing it. A second `init()` without `destroy()` duplicates listeners and observers. `destroy()` also removes the `blossom-carousel` attribute, so re-add it if the element stays on the page uninitialized.
- Don't re-create the instance when slides change. `init()` installs a `MutationObserver` and `ResizeObserver` that remeasure automatically.
- Keep `overflow-x: auto` (the default from the stylesheet). With `overflow: hidden` or `visible`, Blossom detects no overflow and disables dragging.
- `scroll-snap-type` is read once, in `init()`. On mouse devices, Blossom then sets an inline `scroll-snap-type: none` and re-applies the captured value through the `--snap-type` custom property. As a result, a snap type that changes later, for example in a media query, is ignored until you call `destroy()` and `init()` again. Changing `scroll-snap-align` on the slides is fine.
- Blossom suppresses the click that ends a drag of more than 10px, so dragging across a link or button doesn't activate it.
- Blossom patches the element's `scrollTo` and `scrollBy` and the global `Element.prototype.scrollIntoView`, so programmatic scrolls cancel an in-progress fling. `destroy()` restores them.

## Further docs

Fetch these only when the task needs them:

- Layout recipes: read the index at https://www.blossom-carousel.com/raw/docs/examples.md, then fetch the matching example. The CSS applies directly to a Core container.
- Accessibility (ARIA, keyboard, focus, reduced motion, WCAG): https://www.blossom-carousel.com/raw/docs/a11y/accessibility-guide.md
- Full docs index: https://www.blossom-carousel.com/llms.txt
