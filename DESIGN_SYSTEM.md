# VSR Atelier design system

## Reference observations

- **Hierarchy:** an ultra-light display serif carries campaign statements; a quiet uppercase sans carries navigation, metadata and actions. The scale jump is intentionally large rather than incremental.
- **Image / whitespace ratio:** photography owns roughly 55–65% of the home experience, balanced by long ivory pauses that let each campaign image reset the eye.
- **Section proportions:** the opening is dense and image-led; the middle expands into full-viewport statements and asymmetric editorial spreads; the close compresses into services, invitation and footer.
- **Composition:** the strongest spreads use one dominant portrait with two partial edge images. Typography crosses image boundaries but remains readable.
- **Scroll choreography:** motion is built from masked vertical reveals, 20–50px parallax shifts, slow crossfades and restrained horizontal type drift. No bounce, spin or dramatic 3D movement.
- **Navigation:** compact utility scale, centered wordmark and wide desktop spacing. The bar becomes a shorter warm-white layer after the first scroll.
- **Spacing:** a 4/8 base is expanded into editorial intervals of 24, 48, 80, 120 and up to 240px between major moments.
- **Editorial pattern:** alternate full-bleed photography, typographic whitespace, asymmetric collage, campaign lockup, process story and product edit rather than repeating equal-height ecommerce sections.

## Tokens

- Canvas: `#FAF8F3`
- Paper: `#F4F0E9`
- Stone: `#E8E2D9`
- Ink: `#151413`
- Champagne accent: `#B9A98F`
- Display: Cormorant Garamond, weights 300–500
- Utility: Manrope, weights 300–600
- Page gutter: `clamp(20px, 4vw, 72px)`
- Section interval: `clamp(112px, 14vw, 240px)`
- Motion ease: `power3.out` / cubic-bezier `(0.22, 1, 0.36, 1)`
- Motion duration: 0.8–1.6s
- Parallax limit: 20–50px

## Responsive principles

Desktop behaves like a fashion editorial with long horizontal sight-lines. Mobile is recomposed as a vertical lookbook: full-screen menu, stacked campaign panels, swipeable product imagery, two-column catalogue and typography resized by composition—not by proportional shrinking.
