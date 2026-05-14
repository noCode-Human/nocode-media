---
version: alpha
name: noCode.media Visual System
description: Editorial-to-terminal marketplace UI with monochrome structure, dense dark modules, and a red neon highlight accent.
colors:
  primary: "#ff2a2a"
  secondary: "#6b6b6b"
  surface: "#0a0a0a"
  on-surface: "#ffffff"
  background: "#f7f7f7"
  foreground: "#000000"
  terminal-bg: "#050505"
  terminal-surface: "#0a0a0a"
  terminal-surface-raised: "#1a1a1a"
  terminal-border: "#222222"
  muted: "#6b6b6b"
  muted-dark: "#888888"
  accent: "#ff2a2a"
  accent-deep: "#8b0000"
  success: "#00ff9d"
typography:
  hero-cycle:
    fontFamily: Inter
    fontSize: 80px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0em
  label-mono:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 1px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 80px
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
components:
  terminal-highlight:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.terminal-bg}"
    rounded: "{rounded.sm}"
    typography: "{typography.label-mono}"
  terminal-card:
    backgroundColor: "{colors.terminal-surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
  terminal-card-hover:
    backgroundColor: "{colors.terminal-surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xl}"
---

## Overview

noCode.media opens with a quiet editorial white hero, then drops into a dense black terminal marketplace. The structure stays monochrome and restrained; red is the only highlight accent for interactive state, category badges, ratings, tabs, preview affordances, and glowing borders.

## Colors

Use `#ff2a2a` for highlights that used to be blue/cyan. Keep black, white, gray, and dark surfaces unchanged so the current contrast and visual weight stay intact. Skill media may be hue-shifted at render time so cyan artwork aligns with the red accent without editing source assets. Keep `#00ff9d` only for success/online/copied states.

## Typography

Inter owns product copy and titles. Space Mono owns terminal labels, filters, metadata, status text, and code-like UI. Letter spacing stays non-negative.

## Layout

Keep the existing split: full-height centered hero, then sticky terminal header and bento grid. Cards, modals, and preview panes keep their current dimensions and responsive behavior.

## Elevation & Depth

Depth comes from dark surfaces, thin borders, subtle hover lift, and red glow. Do not add extra shadows, glass panels, or decorative gradients beyond the existing preview content.

## Shapes

Small controls use 4-8px radii. Bento cards use 12px. Do not round marketplace cards further.

## Components

Active filters, category badges, ratings, modal tabs, loading text, terminal cursors, and hover borders use the red accent token. Status dots and copied states remain green.

## Do's and Don'ts

Do preserve the existing composition and spacing. Do swap accent color through tokens when touching app chrome. Do not introduce blue/cyan as a highlight accent. Do not redesign the hero, grid, card anatomy, modal structure, or typography scale for this color update.
