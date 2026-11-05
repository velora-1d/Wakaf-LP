---
name: blossom-carousel-svelte
description: Builds carousels with @blossom-carousel/svelte in Svelte 5 and SvelteKit, covering BlossomCarousel setup, CSS scroll-snap layouts, BlossomPrev/BlossomNext/BlossomDots/BlossomDot controls, bind:this methods (prev, next, goTo), useBlossomNavigation for custom controls, and command and overscroll events. Use when a Svelte or SvelteKit project imports @blossom-carousel/svelte or renders <BlossomCarousel>, or when the user wants a Blossom carousel, slider, or gallery in Svelte or SvelteKit.
license: MIT
compatibility: Version 2.x requires Svelte 5. Svelte 4 projects need @blossom-carousel/svelte@1.
metadata:
  package: "@blossom-carousel/svelte"
  version: "2.3.0"
---

# Blossom Carousel for Svelte and SvelteKit

`<BlossomCarousel>` renders a native horizontal scroll container. Layout, slide sizes, gaps, and snapping are plain CSS. Blossom adds mouse dragging with momentum and rubber-banding, and only downloads its drag engine on devices with a fine pointer. Touch devices keep native scrolling.

For migrations from Embla, Swiper, Splide, Slick, or Flickity, use the `blossom-carousel-migration` skill first.

## Setup

```bash
npm install @blossom-carousel/svelte
```

Version 2.x uses Svelte 5 runes and snippets. Write Svelte 5 syntax (`$props`, `onclick`, `{#snippet}`). If the project is on Svelte 4, install `@blossom-carousel/svelte@1` and use slots and `on:` directives instead.

Import the stylesheet once from the root layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import "@blossom-carousel/svelte/style.css";

  let { children } = $props();
</script>

{@render children()}
```

Then use the component wherever the carousel renders. The package ships uncompiled Svelte and is SSR-safe, so no browser guard is needed.

```svelte
<script>
  import { BlossomCarousel } from "@blossom-carousel/svelte";

  let { items } = $props();
</script>

<BlossomCarousel class="carousel">
  {#each items as item (item.id)}
    <div class="slide">{item.title}</div>
  {/each}
</BlossomCarousel>
```

## Layout

Style the carousel root and slides with regular CSS. Each direct child is a slide. Slides are rendered by the parent component, but `BlossomCarousel` owns the root element, so target it with `:global()` from a scoped `<style>` block, or use a global stylesheet:

```svelte
<style>
  :global(.carousel) {
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

| Prop     | Type                        | Default         | Purpose                                                                                      |
| -------- | --------------------------- | --------------- | -------------------------------------------------------------------------------------------- |
| `as`     | `string`                    | `"div"`         | Root element tag. Use `as="ul"` with `<li>` slides for list semantics.                       |
| `load`   | `"conditional" \| "always"` | `"conditional"` | `conditional` loads the drag engine only when `(hover: hover) and (pointer: fine)` matches. |
| `repeat` | `boolean`                   | `false`         | Experimental looping mode.                                                                   |

Other props such as `id`, `class`, `aria-*`, and `on*` event handlers are passed to the root element.

## Navigation controls

Give the carousel an `id`, point each control's `forId` prop at it, and mark slides with `data-blossom-slide`. The Svelte prop is `forId`, while React and Vue use `for`.

```svelte
<script>
  import { BlossomCarousel, BlossomPrev, BlossomNext, BlossomDots } from "@blossom-carousel/svelte";
</script>

<BlossomCarousel id="gallery" class="carousel">
  {#each items as item (item.id)}
    <div data-blossom-slide class="slide">{item.title}</div>
  {/each}
</BlossomCarousel>

<BlossomPrev forId="gallery" />
<BlossomDots forId="gallery" />
<BlossomNext forId="gallery" />
```

- Controls are native buttons wired through the Invoker Commands API (with a built-in fallback). They need no `bind:this` and work on touch devices where the drag engine isn't loaded.
- `BlossomPrev` and `BlossomNext` move to the adjacent snap point, or page by about 85% of the viewport when nothing snaps. They disable themselves at the edges and default to the labels "Previous slide" and "Next slide". Pass a more specific `aria-label`, such as "Next products", when that's clearer.
- Pass children to replace the default `‹` and `›` icons: `<BlossomNext forId="gallery"><ArrowRight /></BlossomNext>`.
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

For fully custom dots, such as thumbnails, pass a `children` snippet and render a `<BlossomDot>`. It renders the `<button>` with navigation and ARIA attributes already set:

```svelte
<BlossomDots forId="gallery">
  {#snippet children({ index, active })}
    <BlossomDot class="thumb" data-active={active} aria-label="Show {items[index].title}">
      <img src={items[index].thumb} alt="" />
    </BlossomDot>
  {/snippet}
</BlossomDots>
```

## Methods

Bind the component instance with `bind:this` to call `prev(options?)`, `next(options?)`, and `goTo(index, options?)`. `goTo` takes a zero-based index into the `data-blossom-slide` elements. `options.behavior` is `"smooth"` (default), `"instant"`, or `"auto"`. These methods use native scrolling, so they work on touch devices too.

```svelte
<script>
  let carousel;
</script>

<BlossomCarousel bind:this={carousel} id="gallery">
  {#each items as item (item.id)}
    <div data-blossom-slide>{item.title}</div>
  {/each}
</BlossomCarousel>

<button type="button" onclick={() => carousel.goTo(0, { behavior: "instant" })}>Back to start</button>
```

## Custom controls with `useBlossomNavigation`

`useBlossomNavigation(id)` returns reactive `activeIndex`, `count`, `canPrev`, and `canNext`. It's the same state the built-in controls use. Call it during component initialization. Pass a string, or a getter such as `() => id` to follow a changing id. `activeIndex` is `-1` until the carousel has been measured.

```svelte
<script>
  import { BlossomCarousel, useBlossomNavigation } from "@blossom-carousel/svelte";

  let carousel;
  const nav = useBlossomNavigation("gallery");
</script>

<BlossomCarousel bind:this={carousel} id="gallery">
  <!-- slides with data-blossom-slide -->
</BlossomCarousel>

<button type="button" disabled={!nav.canPrev} onclick={() => carousel.prev()}>Previous</button>
<span>{nav.activeIndex + 1} / {nav.count}</span>
<button type="button" disabled={!nav.canNext} onclick={() => carousel.next()}>Next</button>
```

## Events

Pass `on*` props to `<BlossomCarousel>`, and they attach to the root element.

- `oncommand` fires when a control or method navigates. Read `event.command ?? event.detail?.command` to get `--blossom-prev`, `--blossom-next`, or `--blossom-goto-{index}`. Dragging and free scrolling don't fire it.
- `onoverscroll` fires while the drag engine rubber-bands past an edge, with `event.detail.left` as the offset in pixels. Call `event.preventDefault()` to replace the default rubber-band transform:

```svelte
<script>
  function onOverscroll(event) {
    event.preventDefault();
    const offset = event.detail.left;
    for (const slide of event.currentTarget.children) {
      slide.style.transform = `scale(${1 - Math.abs(offset) * 0.001})`;
    }
  }
</script>

<BlossomCarousel onoverscroll={onOverscroll}>
  {#each items as item (item.id)}
    <div>{item.title}</div>
  {/each}
</BlossomCarousel>
```

- To react to the active slide, use `useBlossomNavigation().activeIndex`. The drag engine also emits `scrollend`, `scrollsnapchange`, and `scrollsnapchanging`, matching the native events, so `onscrollsnapchange` works for both drag and touch scrolling.

## Gotchas

- Don't destructure the `useBlossomNavigation` result. Its fields are getters, so `const { activeIndex } = nav` loses reactivity. Read `nav.activeIndex` instead.
- The controls use `forId`, not `for`.
- Use keyed `{#each items as item (item.id)}` blocks, not React-style `key` props.
- Dots and `goTo` count only elements with `data-blossom-slide` (at any depth). Without the attribute, there are no dots and `goTo` does nothing. Prev and next work without it.
- Render `<BlossomDots>` after its `<BlossomCarousel>` in the markup. The carousel registers its slide count during SSR, so dots placed earlier start empty and only fill in on the client.
- `<BlossomDot>` only works inside the `<BlossomDots>` children snippet.
- Dot styling uses `[data-blossom-dots]`, `[data-blossom-dot]`, `[data-blossom-dot-marker]`, and `[aria-current="true"]`. The old `.blossom-dots` and `.blossom-dot` classes no longer exist.
- Keep `overflow-x` on the root as `auto` (the default). `overflow: hidden` disables dragging.
- The drag engine reads `scroll-snap-type` once, when it initializes, so a snap type that changes in a media query is ignored for mouse dragging. Keep `scroll-snap-type` constant and vary `scroll-snap-align` on the slides instead, or re-mount the carousel with `{#key}` when the snap type has to change.
- Overscroll events come from the drag engine, so with the default `load="conditional"` they never fire on touch devices. Treat custom overscroll effects as a mouse enhancement.
- If slides change after mount, Blossom remeasures automatically. Don't recreate the carousel with `{#key}` to refresh it.

## Accessibility baseline

Wrap the carousel in a labelled `<section>`, use `as="ul"` with `<li>` slides for lists of items, and include `BlossomPrev`/`BlossomNext` or dots, because dragging alone does not meet WCAG 2.5.7. Give controls names that describe what they show, for example "Next products".

## Further docs

Fetch these only when the task needs them:

- Layout recipes (cover flow, stacks, thumbnails, sticky, RTL, masonry): read the index at https://www.blossom-carousel.com/raw/docs/examples.md, then fetch the matching example. Examples use Vue-style `<BlossomCarousel>` markup with CSS and Tailwind variants. Convert `v-for` to keyed `{#each}`, `for` to `forId`, and `@event` to `onevent`.
- Accessibility questions (ARIA, keyboard, focus, reduced motion, auto-rotation, screen readers, WCAG): https://www.blossom-carousel.com/raw/docs/a11y/accessibility-guide.md
- Full docs index: https://www.blossom-carousel.com/llms.txt
