---
name: 3d-animation-studio
description: Build self-contained interactive 3D animation mini apps, product scenes, scroll stories, configurators, particle systems, and cinematic UI demos using HTML, CSS, Canvas, and lightweight JavaScript.
---

# 3D Animation Studio

Use this skill when you want a polished browser-based 3D animation surface that can be dropped into a landing page, product page, portfolio, dashboard, course, store, or app prototype.

## Design DNA

- Dark editorial canvas: `#050505`, `#0a0a0a`, `#111111`.
- Accent color: `#ff2a2a`.
- Success/status accent: `#00ff9d`.
- Inter for readable interface copy.
- Space Mono for labels, coordinates, timelines, scene metadata, and controls.
- Small radii: 4-8px for controls, 8-12px for panels.
- Motion should feel cinematic but controlled: smooth easing, stable layout, no decorative clutter.

## Build Rules

1. Keep each deliverable as a single self-contained `.html` file.
2. Use semantic HTML for the surrounding UI.
3. Use CSS 3D transforms, Canvas, or SVG for the animation layer.
4. Include real controls: play/pause, speed, scene/mode switching, scrubbing, or input-driven changes.
5. Respect reduced motion when possible.
6. Avoid external dependencies unless the user asks for Three.js or a framework version.
7. Keep the scene inspectable and editable: name constants clearly and group scene config near the top of the script.
8. Make it responsive: desktop gets a cinematic stage; mobile gets fewer controls and readable text.

## Default Mini App Structure

```html
<section class="studio">
  <header class="topbar">...</header>
  <main class="stage">...</main>
  <aside class="controls">...</aside>
</section>
<script>
  const scene = {
    accent: "#ff2a2a",
    speed: 1,
    mode: "orbit"
  };
</script>
```

## Useful Patterns

- **Product hero:** rotating product object, feature callouts, CTA state.
- **Scroll story:** chaptered camera movement controlled by scroll or buttons.
- **Configurator:** user switches materials, colors, lighting, and angle.
- **Dashboard:** 3D data objects mapped to real metrics.
- **Course/tool embed:** interactive demo inside a learning page.
- **Portfolio:** spatial gallery with project cards.
- **Audio/visual stage:** reactive objects driven by sliders or generated waveform.
- **Launch page:** animated object that demonstrates the product promise without a video.

## Prompt Template

```text
Build a single-file HTML mini app using the 3D Animation Studio skill.

Use case:
[Describe the product/app/page]

Scene:
[Objects, camera mood, animation behavior]

Controls:
[Buttons, sliders, toggles, selectable modes]

Style:
Dark noCode.media style, red accent #ff2a2a, Space Mono labels, Inter body copy.

Output:
One self-contained HTML file with inline CSS and JavaScript. No build step.
```

## Quality Checklist

- The first viewport communicates the use case immediately.
- Animation starts in a pleasing state before interaction.
- Controls visibly change the scene.
- Text does not overlap on mobile.
- The file opens directly in a browser.
- The code has obvious edit points for colors, labels, and scene values.
