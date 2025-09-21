# Clipping Path Animations Documentation

This document outlines the advanced clipping path animations implemented in the Tesco Figma Plugin. These animations can be reused in other projects to create smooth, modern UI transitions.

## Table of Contents
1. [Segment Control Animation](#segment-control-animation)
2. [Filter Chip Circle Expansion](#filter-chip-circle-expansion)
3. [Implementation Details](#implementation-details)
4. [Usage Guidelines](#usage-guidelines)
5. [Browser Support](#browser-support)

---

## Segment Control Animation

### Overview
A three-segment tab control with a sliding active state overlay that uses `clip-path` with `inset()` to create smooth transitions between tabs.

### Visual Description
- **Structure**: 3 equal-width segments (Search, Browse, Basket)
- **Animation**: A blue overlay slides horizontally to highlight the active segment
- **Timing**: 300ms ease-in-out transition

### CSS Implementation

```css
/* Container for the segment control */
.segment-control {
  display: flex;
  position: relative;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  padding: 2px;
  overflow: hidden;
  width: 100%;
  height: 32px;
}

/* Base segment buttons (inactive state) */
.segment-button {
  position: relative;
  z-index: 1;
  padding: 1px 16px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 400;
  border-radius: 36px;
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333; /* Inactive text color */
  transition: none;
}

/* Overlay container with clip-path animation */
.segment-control .clip-path-container {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  z-index: 2;
  pointer-events: none;
  
  /* Default: Show first tab (Search) - covers left 33.33% */
  clip-path: inset(0 66.666% 0 0 round 14px);
  transition: clip-path 300ms ease-in-out;
}

/* Active states with different clip-path values */
.segment-control.browse-active .clip-path-container {
  /* Show middle tab - covers middle 33.33% */
  clip-path: inset(0 33.333% 0 33.333% round 14px);
}

.segment-control.basket-active .clip-path-container {
  /* Show right tab - covers right 33.33% */
  clip-path: inset(0 0 0 66.666% round 14px);
}

/* Overlay content with active styling */
.segment-control .clip-path-container .segment-list {
  display: flex;
  width: 100%;
  height: 100%;
  background: #00539F; /* Active background */
  border-radius: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Overlay buttons with active styling */
.segment-control .clip-path-container .segment-button-overlay {
  padding: 1px 16px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 400;
  border-radius: 36px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff; /* Active text color */
  pointer-events: auto;
}
```

### HTML Structure

```html
<div class="segment-control">
  <!-- Base layer with inactive styling -->
  <button class="segment-button" data-mode="search">
    <span>Search</span>
  </button>
  <button class="segment-button" data-mode="browse">
    <span>Browse</span>
  </button>
  <button class="segment-button" data-mode="basket">
    <span>Basket</span>
  </button>
  
  <!-- Overlay layer with active styling -->
  <div class="clip-path-container">
    <ul class="segment-list">
      <li>
        <button class="segment-button-overlay" data-mode="search">
          <span>Search</span>
        </button>
      </li>
      <li>
        <button class="segment-button-overlay" data-mode="browse">
          <span>Browse</span>
        </button>
      </li>
      <li>
        <button class="segment-button-overlay" data-mode="basket">
          <span>Basket</span>
        </button>
      </li>
    </ul>
  </div>
</div>
```

### JavaScript Control

```javascript
function setupSegmentControl() {
  const segmentButtons = document.querySelectorAll('.segment-button');
  const overlayButtons = document.querySelectorAll('.segment-button-overlay');
  const segmentControl = document.querySelector('.segment-control');
  
  function handleButtonClick(button) {
    // Update segment control clip-path animation class
    segmentControl.classList.remove('browse-active', 'basket-active');
    
    if (button.dataset.mode === 'browse') {
      segmentControl.classList.add('browse-active');
    } else if (button.dataset.mode === 'basket') {
      segmentControl.classList.add('basket-active');
    }
    // Default state (search) requires no additional class
  }
  
  // Add click handlers to both base and overlay buttons
  [...segmentButtons, ...overlayButtons].forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button));
  });
}
```

### Key Concepts

1. **Dual Layer System**: Inactive buttons below, active overlay above
2. **Clip-path Inset**: `inset(top right bottom left round radius)` syntax
3. **Percentage-based positioning**: Each segment is 33.333% wide
4. **Pointer Events**: Base layer clickable, overlay layer passes through except for buttons

---

## Filter Chip Circle Expansion

### Overview
Filter chips with a circular expansion animation that starts from the right edge (90% position) and expands to fill the entire chip when activated.

### Visual Description
- **Structure**: Pill-shaped filter chips with text and icon button
- **Animation**: Blue circle expands from right edge (90%) to center (50%) covering entire chip
- **Timing**: 300ms with cubic-bezier easing
- **Color Change**: Text and icon colors invert during animation

### CSS Implementation

```css
/* Filter chip container */
.filter-chip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  box-shadow: inset 0px 0px 0px 2px #00539f;
  border-radius: 16px;
  padding: 4px 4px 4px 16px;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.filter-chip.active {
  box-shadow: inset 0px 0px 0px 2px #007eb3;
}

/* Clip-path overlay for circle expansion animation */
.filter-chip::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #007eb3;
  border-radius: 16px;
  
  /* Start: Small circle at 90% (right side near button) */
  clip-path: circle(0% at 90% 50%);
  transition: clip-path 300ms cubic-bezier(0.77, 0, 0.175, 1);
  z-index: 1;
  pointer-events: none;
}

/* Active state: Large circle at center covering entire chip */
.filter-chip.active::before {
  clip-path: circle(100% at 50% 50%);
}

/* Chip text with color transition */
.filter-chip-text {
  color: #00539F;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  position: relative;
  z-index: 2;
  transition: color 300ms ease;
}

.filter-chip.active .filter-chip-text {
  color: #ffffff;
}

/* Chip button with icon rotation */
.filter-chip-button {
  width: 24px;
  height: 24px;
  background: #00539f;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: background-color 300ms ease;
}

.filter-chip.active .filter-chip-button {
  background: #ffffff;
}

/* Icon with rotation animation */
.filter-chip-button svg {
  width: 16px;
  height: 16px;
  color: #ffffff;
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  transform-origin: center;
}

.filter-chip.active .filter-chip-button svg {
  color: #007eb3;
  transform: rotate(315deg); /* Rotate plus to create X */
}
```

### HTML Structure

```html
<div class="filter-chip">
  <span class="filter-chip-text">Filter Name</span>
  <button class="filter-chip-button">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>
</div>
```

### JavaScript Control

```javascript
function createFilterChip(text, isActive = false) {
  const chip = document.createElement('div');
  chip.className = isActive ? 'filter-chip active' : 'filter-chip';
  
  chip.innerHTML = `
    <span class="filter-chip-text">${text}</span>
    <button class="filter-chip-button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  chip.onclick = () => {
    // Toggle active state for animation
    chip.classList.toggle('active');
    
    // Optional: Handle filter logic after animation
    setTimeout(() => {
      const isActive = chip.classList.contains('active');
      // Apply/remove filter logic here
    }, 350); // Wait for animation to complete
  };

  return chip;
}
```

### Key Concepts

1. **Circle Positioning**: `circle(radius at x y)` where x,y are percentages
2. **Expansion Animation**: Start at 0% radius, expand to 100%
3. **Position Shift**: Start at 90% x-position (right), end at 50% (center)
4. **Layering**: Pseudo-element overlay with higher z-index
5. **Color Inversion**: Text and icons change color as background animates

---

## Implementation Details

### Clip-path Syntax Reference

#### Inset (for rectangular clipping)
```css
clip-path: inset(top right bottom left round border-radius);

/* Examples */
clip-path: inset(0 66.666% 0 0 round 14px);        /* Left third */
clip-path: inset(0 33.333% 0 33.333% round 14px);  /* Middle third */
clip-path: inset(0 0 0 66.666% round 14px);        /* Right third */
```

#### Circle (for circular clipping)
```css
clip-path: circle(radius at x y);

/* Examples */
clip-path: circle(0% at 90% 50%);    /* Hidden circle at right edge */
clip-path: circle(100% at 50% 50%);  /* Full circle at center */
```

### Transition Properties

#### Recommended Timing Functions
- **Segment Control**: `ease-in-out` for smooth linear movement
- **Filter Chips**: `cubic-bezier(0.77, 0, 0.175, 1)` for natural expansion feel

#### Duration Guidelines
- **300ms**: Standard for most UI transitions
- **350ms buffer**: When chaining animations with JavaScript

---

## Usage Guidelines

### When to Use Clipping Path Animations

✅ **Good Use Cases:**
- Tab controls with sliding indicators
- Filter toggles with expansion effects  
- Progressive disclosure animations
- Morphing button states
- Creative loading indicators

❌ **Avoid When:**
- Simple show/hide interactions (use opacity instead)
- Performance is critical (clip-path can be expensive)
- Supporting very old browsers
- Animating many elements simultaneously

### Performance Considerations

1. **GPU Acceleration**: Clip-path animations are GPU-accelerated
2. **Repaints**: Clip-path changes don't trigger layout repaints
3. **Complexity**: Simple shapes perform better than complex paths
4. **Quantity**: Limit concurrent clip-path animations

### Accessibility

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .segment-control .clip-path-container,
  .filter-chip::before {
    transition: none;
  }
}
```

### Fallbacks

```css
/* Fallback for unsupported browsers */
@supports not (clip-path: inset(0 0 0 0)) {
  .segment-control .clip-path-container {
    /* Use transform or opacity instead */
    transform: translateX(0);
    transition: transform 300ms ease-in-out;
  }
}
```

---

## Browser Support

### Clip-path Support
- **Chrome**: 55+ (full support)
- **Firefox**: 54+ (full support)  
- **Safari**: 13.1+ (full support)
- **Edge**: 79+ (full support)

### Transition Support
- **All modern browsers**: Full support
- **IE11**: Basic support (no clip-path)

### Testing Recommendations
1. Test on target browsers during development
2. Provide fallbacks for unsupported browsers
3. Consider progressive enhancement approach
4. Test with reduced motion preferences

---

## Advanced Patterns

### Chaining Animations
```javascript
// Wait for one animation before starting another
element.addEventListener('transitionend', (e) => {
  if (e.propertyName === 'clip-path') {
    // Start next animation
  }
});
```

### Dynamic Clip-path Values
```javascript
// Calculate clip-path based on element count
const segmentWidth = 100 / segmentCount;
const clipPath = `inset(0 ${100 - segmentWidth}% 0 ${activeIndex * segmentWidth}% round 14px)`;
element.style.clipPath = clipPath;
```

### Custom Easing Functions
```css
/* Natural expansion feel */
transition: clip-path 300ms cubic-bezier(0.77, 0, 0.175, 1);

/* Bouncy effect */
transition: clip-path 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Sharp snap */
transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

---

## Conclusion

These clipping path animations provide modern, smooth transitions that enhance user experience without being overly flashy. The key is using the right technique for the right interaction:

- **Inset clip-path**: For sliding/revealing rectangular areas
- **Circle clip-path**: For expansion/contraction effects
- **Proper timing**: 300ms with appropriate easing functions
- **Layering**: Overlay techniques for color transitions

Copy and adapt these patterns for your own projects, adjusting colors, timing, and dimensions to match your design system.
