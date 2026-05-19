---
name: Precision Infrastructure
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#43474f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#405f91'
  primary: '#001736'
  on-primary: '#ffffff'
  primary-container: '#002b5b'
  on-primary-container: '#7594ca'
  inverse-primary: '#a9c7ff'
  secondary: '#555f70'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f4'
  on-secondary-container: '#596374'
  tertiary: '#050060'
  on-tertiary: '#ffffff'
  tertiary-container: '#0e009c'
  on-tertiary-container: '#8386ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#264778'
  secondary-fixed: '#d9e3f7'
  secondary-fixed-dim: '#bdc7db'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4757'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.01em
  code-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style

The design system is engineered for mission-critical environments where stability, authority, and technical precision are paramount. It targets institutional stakeholders and enterprise partners who require visual proof of uptime, security, and operational excellence. 

The visual style is **Corporate / Modern** with a focus on "High-Density Utility." It borrows from industrial control rooms and financial terminals, prioritizing clarity and data integrity over decorative flourishes. The interface should feel robust and "engineered," utilizing structural alignment and rhythmic spacing to convey a sense of unbreakable logic. High-quality imagery should feature network infrastructure, macro-photography of hardware, and sophisticated data visualizations.

## Colors

The palette is anchored by **Deep Blue**, representing institutional trust and depth. **Graphite** provides a neutral, grounding force for secondary text and structural borders. The background is predominantly clean **White** to ensure maximum legibility and a sense of open, professional space.

**Electric Blue** and **Technological Purple** are used sparingly as high-visibility accents for data points, active states, and call-to-action elements. These accents mimic the glow of LED indicators and network activity lights. Success, warning, and error states must follow standard industry conventions but should be slightly desaturated to maintain the professional, "sober" aesthetic of the design system.

## Typography

This design system utilizes a dual-font approach to balance personality with utility. **Hanken Grotesk** is used for headlines; its sharp, contemporary geometry communicates technological forwardness. **Inter** is used for body copy and UI elements due to its exceptional legibility at small sizes and its neutral, systematic character.

Maintain high contrast between headlines and body text. For data-heavy views, use the `code-sm` or `label-md` roles to ensure density without sacrificing clarity. All caps should be reserved for short labels and category headers to reinforce the institutional "ordered" feel.

## Layout & Spacing

The design system employs a **Fixed Grid** layout for desktop (1280px max width) to maintain a centered, authoritative presence. Content follows a 12-column structure with a 24px gutter, allowing for diverse data layouts and dashboard-style configurations.

Spacing is governed by a strict 8px base unit. Section-level gaps are generous (80px+) to allow the "White" background to act as a visual breather between complex technical sections. On mobile devices, the margins shrink to 16px, and the grid collapses to a single column, prioritizing vertical flow and readability of technical specifications. Use horizontal scrolling "carousels" sparingly, only for secondary data sets.

## Elevation & Depth

To maintain a sense of "sobriety," depth is conveyed through **low-contrast outlines** and **tonal layers** rather than dramatic shadows. Surfaces are primarily flat, using subtle 1px borders in a light Graphite or Neutral gray to define boundaries.

When a hierarchy of "stacking" is required (e.g., in complex dashboards or modals), use a soft, low-opacity ambient shadow (Blur: 12px, Y: 4px, Opacity: 5%) or background color shifts. For example, a card might sit on a `#F9FAFB` surface with a white background and a subtle border. This "plinth" approach keeps the UI feeling grounded and permanent.

## Shapes

The shape language is **Soft (Level 1)**. A 4px (0.25rem) corner radius is the standard for buttons, input fields, and cards. This provides just enough approachable modernity while retaining the rigid, structural "block" feel associated with enterprise engineering.

Avoid circular treatments except for strictly utilitarian elements like status indicators or user avatars. Operational maps and data containers should maintain sharp, clear corners or the standard 4px radius to ensure a precise, technical look.

## Components

### Buttons
Primary buttons use the Deep Blue background with White text, signifying authority. Secondary buttons use Graphite outlines. For "Critical Actions," use the Electric Blue accent. All buttons should have a fixed height (e.g., 48px) and use `label-md` typography.

### Input Fields & Controls
Form fields should be minimalist with a 1px border. Focus states must use a 2px Electric Blue stroke to indicate active "input mode." Checkboxes and radio buttons are geometric and sharp, avoiding excessive roundness.

### Data Tables & Chips
Tables are the heart of this design system. Use `body-md` for row data and `label-md` (All Caps) for headers. Rows should have a subtle hover state transition to `#F3F4F6`. Status chips (e.g., "Online", "Operational") use a desaturated background with a high-contrast dot indicator.

### Dashboards & Operational Maps
Visuals for network status and maps should be rendered in a "wireframe" or "dark-mode-on-light" style. Use the Technological Purple for data paths and Electric Blue for active nodes. Lines should be thin (1px to 1.5px) to maintain the technical precision of the brand.

### Cards
Cards are used to group operational metrics. They should feature a 1px neutral border, no shadow, and a clear "Header" section separated by a horizontal rule to emphasize the structured nature of the data.