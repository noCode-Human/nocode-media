import skillMarkdown from '../../3D Animation Studio/SKILL.md?raw';
import productHeroOrbit from '../../3D Animation Studio/product-hero-orbit.html?raw';
import scrollStoryScene from '../../3D Animation Studio/scroll-story-scene.html?raw';
import particleTitleReveal from '../../3D Animation Studio/particle-title-reveal.html?raw';
import appOnboardingDevice from '../../3D Animation Studio/app-onboarding-device.html?raw';
import portfolioGallerySpace from '../../3D Animation Studio/portfolio-gallery-space.html?raw';
import dataVisualizerOrbit from '../../3D Animation Studio/data-visualizer-orbit.html?raw';
import ecommerceConfigurator from '../../3D Animation Studio/ecommerce-configurator.html?raw';
import audioReactiveStage from '../../3D Animation Studio/audio-reactive-stage.html?raw';

export const animationStudioSkillMarkdown = skillMarkdown.replace(/^---[\s\S]*?---\n+/, '');

export const animationStudioExamples = [
  {
    title: "Product Hero Orbit",
    fileName: "product-hero-orbit.html",
    description: "A cinematic product hero with material switching, speed controls, and orbiting 3D objects.",
    html: productHeroOrbit,
  },
  {
    title: "Scroll Story Scene",
    fileName: "scroll-story-scene.html",
    description: "A chaptered 3D story scene for launches, essays, product narratives, and case studies.",
    html: scrollStoryScene,
  },
  {
    title: "Particle Title Reveal",
    fileName: "particle-title-reveal.html",
    description: "A canvas particle system with editable headline, density control, and burst interaction.",
    html: particleTitleReveal,
  },
  {
    title: "App Onboarding Device",
    fileName: "app-onboarding-device.html",
    description: "A 3D device tour for SaaS onboarding, product walkthroughs, and feature demos.",
    html: appOnboardingDevice,
  },
  {
    title: "Portfolio Gallery Space",
    fileName: "portfolio-gallery-space.html",
    description: "A spatial project carousel for portfolios, case studies, and studio pages.",
    html: portfolioGallerySpace,
  },
  {
    title: "Data Visualizer Orbit",
    fileName: "data-visualizer-orbit.html",
    description: "Animated 3D metric objects for dashboards, reports, analytics products, and recaps.",
    html: dataVisualizerOrbit,
  },
  {
    title: "Ecommerce Configurator",
    fileName: "ecommerce-configurator.html",
    description: "A product configurator with material, color, lighting, and angle controls.",
    html: ecommerceConfigurator,
  },
  {
    title: "Audio Reactive Stage",
    fileName: "audio-reactive-stage.html",
    description: "A fake audio-reactive canvas stage with energy, complexity, and pulse controls.",
    html: audioReactiveStage,
  },
];
