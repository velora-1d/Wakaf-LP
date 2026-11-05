---
name: blossom-carousel-vue
description: Builds carousels with @blossom-carousel/vue in Vue 3 and Nuxt, covering BlossomCarousel setup, CSS scroll-snap layouts, BlossomPrev/BlossomNext/BlossomDots/BlossomDot controls, template-ref methods (prev, next, goTo), useBlossomNavigation for custom controls, and command and overscroll events. Use when a Vue or Nuxt project imports @blossom-carousel/vue or renders <BlossomCarousel>, or when the user wants a Blossom carousel, slider, or gallery in Vue or Nuxt.
license: MIT
metadata:
  package: "@blossom-carousel/vue"
  version: "1.8.1"
---

# Blossom Carousel for Vue and Nuxt

`<BlossomCarousel>` renders a native horizontal scroll container. Layout, slide sizes, gaps, and snapping are plain CSS. Blossom adds mouse dragging with momentum and rubber-banding, and only downloads its drag engine on devices with a fine pointer. Touch devices keep native scrolling.

For migrations from Embla, Swiper, Splide, Slick, or Flickity, use the `blossom-carousel-migration` skill first.

## Setup

```bash
npm install @blossom-carousel/vue
```

Import the component and the stylesheet where the carousel is used:

```vue
<script setup>
import { BlossomCarousel } from "@blossom-carousel/vue";
import "@blossom-carousel/vue/style.css";
</script>
```

For Nuxt, register the components once in a plugin. The components are SSR-safe, so a `.client` plugin or `<ClientOnly>` is not needed.

```ts
// plugins/blossom-carousel.ts
import {
  BlossomCarousel,
  BlossomPrev,
  BlossomNext,
  BlossomDots,
  BlossomDot,
} from "@blossom-carousel/vue";
import "@blossom-carousel/vue/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("BlossomCarousel", BlossomCarousel);
  nuxtApp.vueApp.component("BlossomPrev", BlossomPrev);
  nuxtApp.vueApp.component("BlossomNext", BlossomNext);
  nuxtApp.vueApp.component("BlossomDots", BlossomDots);
  nuxtApp.vueApp.component("BlossomDot", BlossomDot);
});
```

In a plain Vue app, register the same components with `app.component(...)` in `main.js`. Only register the controls the project uses.

## Layout

Style the carousel root and slides with regular CSS. Each direct child is a slide.

```vue
<template>
  <BlossomCarousel class="carousel">
    <div v-for="item in items" :key="item.id" class="slide">{{ item.title }}</div>
  </BlossomCarousel>
</template>

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

## Props

| Prop     | Type                        | Default         | Purpose                                                                                                   |
| -------- | --------------------------- | --------------- | --------------------------------------------------------------------------------------------------------- |
| `as`     | `string`                    | `"div"`         | Root element tag. Use `as="ul"` with `<li>` slides for list semantics.                                    |
| `load`   | `"conditional" \| "always"` | `"conditional"` | `conditional` loads the drag engine only when `(hover: hover) and (pointer: fine)` matches.              |
| `repeat` | `boolean`                   | `false`         | Experimental looping mode.                                                                                |

Other attributes such as `id`, `class`, and `aria-*` fall through to the root element.

## Navigation controls

Give the carousel an `id`, point each control's `for` prop at it, and mark slides with `data-blossom-slide`:

```vue
<template>
  <BlossomCarousel id="gallery" class="carousel">
    <div v-for="item in items" :key="item.id" data-blossom-slide class="slide">
      {{ item.title }}
    </div>
  </BlossomCarousel>

  <BlossomPrev for="gallery" />
  <BlossomDots for="gallery" />
  <BlossomNext for="gallery" />
</template>
```

- Controls are native buttons wired through the Invoker Commands API (with a built-in fallback). They need no ref and work on touch devices where the drag engine isn't loaded.
- `BlossomPrev` and `BlossomNext` move to the adjacent snap point, or page by about 85% of the viewport when nothing snaps. They disable themselves at the edges and default to the labels "Previous slide" and "Next slide". Pass a more specific `aria-label`, such as "Next products", when that's clearer.
- Pass slot content to replace the default `‹` and `›` icons: `<BlossomNext for="gallery"><MyIcon /></BlossomNext>`.
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

For fully custom dots, such as thumbnails, use the scoped slot and render a `<BlossomDot>`. It renders the `<button>` with navigation and ARIA attributes already set:

```vue
<BlossomDots for="gallery" v-slot="{ index, active }">
  <BlossomDot class="thumb" :data-active="active" :aria-label="`Show ${items[index].title}`">
    <img :src="items[index].thumb" alt="" />
  </BlossomDot>
</BlossomDots>
```

## Methods

Use a template ref to navigate from code. The ref exposes `prev(options?)`, `next(options?)`, `goTo(index, options?)`, and `el`, which is the root element. `goTo` takes a zero-based index into the `data-blossom-slide` elements. `options.behavior` is `"smooth"` (default), `"instant"`, or `"auto"`. These methods use native scrolling, so they work on touch devices too.

```vue
<script setup>
import { useTemplateRef } from "vue";

const carousel = useTemplateRef("carousel");
</script>

<template>
  <BlossomCarousel ref="carousel" id="gallery">
    <div v-for="i in 12" :key="i" data-blossom-slide>Slide {{ i }}</div>
  </BlossomCarousel>

  <button type="button" @click="carousel.goTo(0, { behavior: 'instant' })">Back to start</button>
</template>
```

## Custom controls with `useBlossomNavigation`

`useBlossomNavigation(id)` returns a `Ref<NavigationState>` with `activeIndex`, `count`, `canPrev`, and `canNext`. It's the same state the built-in controls use. `activeIndex` is `-1` until the carousel has been measured. Pass a string or a ref, for example from `useId()`.

```vue
<script setup>
import { useTemplateRef } from "vue";
import { useBlossomNavigation } from "@blossom-carousel/vue";

const carousel = useTemplateRef("carousel");
const nav = useBlossomNavigation("gallery");
</script>

<template>
  <BlossomCarousel ref="carousel" id="gallery">
    <div v-for="i in 12" :key="i" data-blossom-slide>Slide {{ i }}</div>
  </BlossomCarousel>

  <button type="button" :disabled="!nav.canPrev" @click="carousel.prev()">Previous</button>
  <span>{{ nav.activeIndex + 1 }} / {{ nav.count }}</span>
  <button type="button" :disabled="!nav.canNext" @click="carousel.next()">Next</button>
</template>
```

## Events

Listeners on `<BlossomCarousel>` attach to the root element.

- `@command` fires when a control or method navigates. Read `event.command ?? event.detail?.command` to get `--blossom-prev`, `--blossom-next`, or `--blossom-goto-{index}`. Dragging and free scrolling don't fire it.
- `@overscroll` fires while the drag engine rubber-bands past an edge, with `event.detail.left` as the offset in pixels. Use `.prevent` to replace the default rubber-band transform:

```vue
<template>
  <BlossomCarousel @overscroll.prevent="onOverscroll">
    <div v-for="i in 12" :key="i">Slide {{ i }}</div>
  </BlossomCarousel>
</template>

<script setup>
function onOverscroll(event) {
  const offset = event.detail.left;
  for (const slide of event.currentTarget.children) {
    slide.style.transform = `scale(${1 - Math.abs(offset) * 0.001})`;
  }
}
</script>
```

- To react to the active slide, use `useBlossomNavigation().activeIndex`. The drag engine also emits `scrollend`, `scrollsnapchange`, and `scrollsnapchanging`, matching the native events so the same listeners work for both drag and touch scrolling.

## Gotchas

- `useNavigation` is a deprecated alias. Use `useBlossomNavigation`.
- A template ref to `<BlossomCarousel>` gives the component's exposed API, not an element. Use `carousel.value.el` for the DOM node, or `event.currentTarget` inside event handlers.
- Dots and `goTo` count only elements with `data-blossom-slide` (at any depth). Without the attribute, there are no dots and `goTo` does nothing. Prev and next work without it.
- The `for` prop must match the carousel `id` exactly. With several carousels on a page, generate ids with `useId()`.
- Render `<BlossomDots>` after its `<BlossomCarousel>` in the template. The carousel registers its slide count while rendering, so dots placed earlier render empty during SSR and only fill in after hydration.
- `<BlossomDot>` only works inside the `<BlossomDots>` slot.
- Dot styling uses `[data-blossom-dots]`, `[data-blossom-dot]`, `[data-blossom-dot-marker]`, and `[aria-current="true"]`. The old `.blossom-dots` and `.blossom-dot` classes no longer exist.
- Keep `overflow-x` on the root as `auto` (the default). `overflow: hidden` disables dragging.
- The drag engine reads `scroll-snap-type` once, when it initializes, so a snap type that changes in a media query is ignored for mouse dragging. Keep `scroll-snap-type` constant and vary `scroll-snap-align` on the slides instead, or re-mount the carousel with a `:key` when the snap type has to change.
- Overscroll events come from the drag engine, so with the default `load="conditional"` they never fire on touch devices. Treat custom overscroll effects as a mouse enhancement.
- If slides change after mount, Blossom remeasures automatically through a `MutationObserver` and `ResizeObserver`. Don't remount the carousel to refresh it.

## Accessibility baseline

Wrap the carousel in a labelled `<section>`, use `as="ul"` with `<li>` slides for lists of items, and include `BlossomPrev`/`BlossomNext` or dots, because dragging alone does not meet WCAG 2.5.7. Give controls names that describe what they show, for example "Next products".

## Further docs

Fetch these only when the task needs them:

- Layout recipes (cover flow, stacks, thumbnails, sticky, RTL, masonry): read the index at https://www.blossom-carousel.com/raw/docs/examples.md, then fetch the matching example. Examples use `<BlossomCarousel>` markup with CSS and Tailwind variants, so you can adapt them directly to Vue.
- Accessibility questions (ARIA, keyboard, focus, reduced motion, auto-rotation, screen readers, WCAG): https://www.blossom-carousel.com/raw/docs/a11y/accessibility-guide.md
- Full docs index: https://www.blossom-carousel.com/llms.txt
