---
name: blossom-carousel-migration
description: Migrates carousels from Embla, Swiper, Splide, Slick (including react-slick), Flickity, or similar libraries to Blossom Carousel by mapping wrappers, options, methods, events, and plugins to native scrolling, CSS scroll snap, and Blossom's controls and APIs. Use when the user wants to replace, remove, or move off one of these carousel libraries, or compares them with Blossom Carousel.
license: MIT
---

# Migrating to Blossom Carousel

Blossom keeps the carousel as a native scroll container. Most configuration from other libraries becomes CSS, navigation becomes Blossom's control components or methods, and many plugins become browser features. Migrations usually delete more code than they add.

## Workflow

1. Identify the source library and the project's framework from `package.json` and imports. If several libraries are in use, migrate one carousel at a time.
2. Fetch the matching guide:
   - Embla: https://www.blossom-carousel.com/raw/docs/migration-guides/embla.md
   - Swiper: https://www.blossom-carousel.com/raw/docs/migration-guides/swiper.md
   - Splide: https://www.blossom-carousel.com/raw/docs/migration-guides/splide.md
   - Slick or react-slick: https://www.blossom-carousel.com/raw/docs/migration-guides/slick.md
   - Flickity: https://www.blossom-carousel.com/raw/docs/migration-guides/flickity.md

   For any other library (Glide, Keen Slider, Owl, Tiny Slider, and so on), say there's no dedicated guide and use the mapping below.
3. Load the framework skill for implementation details: `blossom-carousel-vue`, `blossom-carousel-react`, `blossom-carousel-svelte`, or `blossom-carousel-web`.
4. Inventory what the existing carousel actually uses (options, methods, events, plugins, CSS overrides). Map each item, and tell the user which features have no direct equivalent before you remove them.
5. Replace the markup, move configuration into CSS, swap the controls, and then remove the old package, its CSS imports, and any dead wrapper styles.

## Concept mapping

The guides predate `goTo` and `useBlossomNavigation`. Where a guide suggests hand-written `scrollIntoView` or `IntersectionObserver` code for navigation or the active index, prefer the APIs in this table.

| Old library concept                                                   | Blossom equivalent                                                                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Viewport, container, track, and list wrappers                         | A single `<BlossomCarousel>` (or `<blossom-carousel>`), which is the scroll container                               |
| Slides or cells                                                       | Direct children, with `data-blossom-slide` when you use dots or `goTo`                                              |
| `slidesPerView`, `perPage`, `slidesToShow`, `cellAlign`, `gap`, `spaceBetween` | CSS: `grid-auto-columns` or slide widths, `gap`, and `scroll-snap-align`                                    |
| `align`, `centeredSlides`, `focus: "center"`                          | `scroll-snap-align: center` on the slides                                                                           |
| `containScroll`, `freeMode`, `dragFree`                               | `scroll-snap-type: inline proximity`, or no snapping at all                                                         |
| `loop`, `infinite`, `wrapAround`, `type: "loop"`                      | Prefer bounded scrolling. `repeat` is experimental.                                                                 |
| `direction: "rtl"`, `rightToLeft`                                     | `dir="rtl"` on the carousel or an ancestor                                                                          |
| Breakpoints and responsive options                                    | CSS media and container queries (keep `scroll-snap-type` constant, as the framework skills explain)                 |
| Prev and next arrows, navigation module                               | `BlossomPrev` and `BlossomNext` (`<blossom-prev>` and `<blossom-next>` in HTML)                                     |
| Pagination, dots, thumbnails                                          | `BlossomDots`, with `BlossomDot` for custom or thumbnail dots                                                       |
| `scrollPrev()`, `slidePrev()`, `previous()`, `next()`                 | `prev()` and `next()` on the carousel ref or element                                                                |
| `scrollTo(i)`, `slideTo(i)`, `go(i)`, `select(i)`, `slickGoTo(i)`     | `goTo(i, { behavior })`                                                                                             |
| `selectedScrollSnap()`, `activeIndex`, `canScrollPrev()`, `canScrollNext()` | `useBlossomNavigation(id)` returns `activeIndex`, `count`, `canPrev`, and `canNext` (Web Components: watch `scrollsnapchange`) |
| `select`, `slideChange`, `moved`, `afterChange` events                | `scrollsnapchange` for settled changes, `command` for control or method navigation                                 |
| `scroll`, `progress` events and parallax effects                      | Native `scroll` events, or CSS scroll-driven animations (`view-timeline`)                                           |
| Autoplay plugins                                                      | A small timer calling `next()`, with pause and play controls and reduced-motion handling (see the accessibility guide) |
| Lazy-load plugins                                                     | `loading="lazy"` on images                                                                                          |
| Class names such as `is-selected` and `swiper-slide-active`           | CSS `scroll-state()` queries, or `aria-current="true"` on the dots                                                  |
| `destroy()`, `reInit()`                                               | Not needed. Framework components clean up on unmount, and Blossom remeasures when slides change.                     |

## Gotchas

- Delete the old library's CSS and wrapper styles. Leftover `overflow: hidden` or `transform` rules on the container break native scrolling and dragging.
- Don't recreate a JavaScript "slides per view" calculation. Size the slides in CSS.
- Old libraries often clone slides for looping. Remove any code that de-duplicates clones or reads `data-swiper-slide-index`-style attributes.
- To update the UI before scrolling settles, as `slideChangeTransitionStart`-style events did, listen for `scrollsnapchanging`.

## Further docs

- Accessibility guide, for autoplay, live regions, and control names: https://www.blossom-carousel.com/raw/docs/a11y/accessibility-guide.md
- Layout recipes for recreating effects such as cover flow, cards, or stacks: https://www.blossom-carousel.com/raw/docs/examples.md
