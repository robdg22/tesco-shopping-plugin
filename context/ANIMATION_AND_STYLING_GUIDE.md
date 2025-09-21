# Animation & Styling Guide

## Overview
This guide defines our animation philosophy, the signature "boop" interaction, and how to customize shadcn/ui components to match our design system while maintaining accessibility and performance.

## Table of Contents
1. [Animation Philosophy](#animation-philosophy)
2. [The Boop Effect](#the-boop-effect)
3. [Tailwind vs shadcn/ui Guidelines](#tailwind-vs-shadcnui-guidelines)
4. [shadcn/ui Component Customization](#shadcnui-component-customization)
5. [Implementation Patterns](#implementation-patterns)
6. [Performance Guidelines](#performance-guidelines)

---

## Animation Philosophy

### Core Principles

**1. Purposeful Motion**
- Every animation should have a clear purpose (feedback, guidance, delight)
- Avoid animation for animation's sake
- Support the user's mental model of the interface

**2. Subtle & Refined**
- Prefer micro-interactions over dramatic effects
- Use easing curves that feel natural
- Keep durations short (100-300ms for most interactions)

**3. Consistent Timing**
- Establish a timing scale: `fast: 150ms`, `normal: 200ms`, `slow: 300ms`
- Use consistent easing functions across the interface
- Maintain visual hierarchy through animation timing

**4. Accessibility First**
- Respect `prefers-reduced-motion` user preferences
- Provide instant alternatives for essential interactions
- Never rely solely on animation to convey information

### Animation Categories

**Micro-interactions**
- Button hovers and active states
- Input focus states
- Checkbox/toggle transitions
- Loading indicators

**State Transitions**
- Modal enter/exit
- Drawer slide in/out
- Content expand/collapse
- Tab switching

**Feedback Animations**
- Success confirmations
- Error states
- Progress indicators
- The "boop" effect

---

## The Boop Effect

### What is a "Boop"?

A boop is a gentle, playful animation that provides instant tactile feedback when users interact with elements. It's characterized by:

- **Quick scale transformation** (usually 0.95x to 1.05x)
- **Smooth spring-like motion**
- **Subtle visual feedback** without being distracting
- **Universal applicability** across buttons, cards, and interactive elements

### Implementation

#### CSS-Based Boop

```css
/* Core boop animation */
@keyframes boop {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Boop utility classes */
.boop {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.boop:hover {
  transform: scale(1.02);
}

.boop:active {
  transform: scale(0.98);
}

/* Trigger boop animation */
.boop-trigger {
  animation: boop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  .boop {
    transition: none;
  }
  
  .boop:hover,
  .boop:active {
    transform: none;
  }
  
  .boop-trigger {
    animation: none;
  }
}
```

#### Tailwind CSS Boop Utilities

```javascript
// tailwind.config.js - Add custom animations
module.exports = {
  theme: {
    extend: {
      animation: {
        'boop': 'boop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'boop-sm': 'boop-sm 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        boop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'boop-sm': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    }
  }
}
```

#### React Hook for Boop

```typescript
// useBoop.ts
import { useState, useCallback } from 'react';

interface BoopConfig {
  scale?: number;
  duration?: number;
  timing?: string;
}

export function useBoop({ 
  scale = 1.05, 
  duration = 200,
  timing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
}: BoopConfig = {}) {
  const [isBooped, setIsBooped] = useState(false);
  
  const trigger = useCallback(() => {
    setIsBooped(true);
    setTimeout(() => setIsBooped(false), duration);
  }, [duration]);
  
  const style = {
    transform: isBooped ? `scale(${scale})` : 'scale(1)',
    transition: `transform ${duration}ms ${timing}`,
  };
  
  return { trigger, style, isBooped };
}

// Usage example
function BoopButton({ children, onClick, ...props }) {
  const { trigger, style } = useBoop({ scale: 1.05 });
  
  const handleClick = (e) => {
    trigger();
    onClick?.(e);
  };
  
  return (
    <button 
      style={style} 
      onClick={handleClick}
      className="transition-transform"
      {...props}
    >
      {children}
    </button>
  );
}
```

#### Framer Motion Boop

```typescript
import { motion } from 'framer-motion';

const boopVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
  boop: { 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 0.3,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

function MotionBoopButton({ children, onBoop, ...props }) {
  return (
    <motion.button
      variants={boopVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={() => onBoop?.()}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### When to Use Boop

**✅ Good Use Cases:**
- Primary action buttons
- Interactive cards
- Success confirmations
- Playful UI elements
- Achievement celebrations

**❌ Avoid for:**
- Text links in paragraphs
- Navigation items
- Form inputs (use focus states instead)
- Repeated interactions in quick succession

---

## Tailwind vs shadcn/ui Guidelines

### When to Use Tailwind CSS

**✅ Use Tailwind for:**

**Layout & Spacing**
```html
<!-- Grid layouts, flexbox, spacing -->
<div class="grid grid-cols-3 gap-4 p-6">
<div class="flex items-center justify-between mb-4">
<div class="space-y-2 max-w-sm mx-auto">
```

**Simple Styling**
```html
<!-- Colors, typography, basic states -->
<div class="bg-blue-500 text-white rounded-lg shadow-md">
<p class="text-lg font-semibold text-gray-900">
<span class="text-sm text-gray-500 hover:text-gray-700">
```

**Custom Animations**
```html
<!-- Transitions, transforms, custom animations -->
<div class="transition-all duration-200 hover:scale-105">
<div class="animate-pulse bg-gray-200 rounded">
<div class="transform rotate-45 transition-transform">
```

**Responsive Design**
```html
<!-- Breakpoint-specific styling -->
<div class="block md:flex lg:grid lg:grid-cols-4">
<p class="text-sm sm:text-base lg:text-lg">
```

**One-off Styling**
```html
<!-- Unique styles that won't be reused -->
<div class="bg-gradient-to-r from-purple-400 to-pink-400 rotate-12">
```

### When to Use shadcn/ui Components

**✅ Use shadcn/ui for:**

**Interactive Elements**
```tsx
// Buttons, inputs, forms with built-in behavior
<Button variant="outline" size="lg">Click me</Button>
<Input placeholder="Enter text..." />
<Checkbox checked={checked} onCheckedChange={setChecked} />
```

**Complex UI Patterns**
```tsx
// Dialogs, dropdowns, tabs with accessibility
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>

<Select>
  <SelectTrigger>...</SelectTrigger>
  <SelectContent>...</SelectContent>
</Select>
```

**Accessibility-Critical Components**
```tsx
// Components that need ARIA attributes, keyboard nav
<AlertDialog>
<NavigationMenu>
<Tooltip>
<RadioGroup>
```

**Design System Components**
```tsx
// Consistent, reusable UI elements
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Hybrid Approach (Best Practice)

**Combine Both Effectively:**

```tsx
// shadcn component + Tailwind for layout/spacing
<Card className="max-w-md mx-auto shadow-lg">
  <CardHeader className="pb-3">
    <CardTitle className="text-xl font-bold text-center">
      Profile
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="flex items-center gap-3">
      <Avatar className="h-12 w-12">
        <AvatarImage src="/avatar.jpg" />
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">John Doe</p>
        <p className="text-xs text-gray-500">john@example.com</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### Decision Framework

**Ask yourself:**

1. **Does it need interactive behavior?** → Use shadcn/ui
2. **Does it need accessibility features?** → Use shadcn/ui  
3. **Is it a standard UI pattern?** → Use shadcn/ui
4. **Is it just styling/layout?** → Use Tailwind
5. **Will it be reused frequently?** → Consider shadcn/ui
6. **Is it a one-off design?** → Use Tailwind

---

## shadcn/ui Component Customization

### Approach to Customization

**1. Preserve Base Functionality**
- Keep accessibility features intact
- Maintain keyboard navigation
- Preserve ARIA attributes
- Don't break responsive behavior

**2. Extend, Don't Replace**
- Add new variants rather than modifying defaults
- Use composition over modification
- Create wrapper components when needed

**3. Consistent Styling**
- Follow established design patterns
- Maintain visual consistency
- Use semantic class names

### Customization Patterns

#### Pattern 1: Variant Extension

```typescript
// components/ui/button.tsx (customized)
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base classes (keep shadcn defaults)
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Keep original variants
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Add custom variants
        boop: "bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-[1.02] active:scale-[0.98]",
        gradient: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700",
        glowing: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow",
      },
      size: {
        // Keep original sizes + add custom
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        // Custom sizes
        xl: "h-12 rounded-lg px-10 text-base",
        compact: "h-8 px-2 text-xs",
      },
      // Add new variant dimensions
      animation: {
        none: "",
        boop: "transition-transform hover:scale-[1.02] active:scale-[0.98]",
        bounce: "transition-transform hover:animate-pulse",
        glow: "transition-shadow hover:shadow-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

#### Pattern 2: Wrapper Components

```typescript
// components/ui/enhanced-card.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { cn } from "@/lib/utils"

interface EnhancedCardProps extends React.ComponentProps<typeof Card> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass'
  interactive?: boolean
}

export function EnhancedCard({ 
  variant = 'default', 
  interactive = false,
  className,
  children,
  ...props 
}: EnhancedCardProps) {
  const variantClasses = {
    default: 'border bg-card text-card-foreground shadow-sm',
    elevated: 'border-0 bg-card text-card-foreground shadow-lg',
    bordered: 'border-2 bg-card text-card-foreground shadow-none',
    glass: 'border bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg',
  }
  
  const interactiveClasses = interactive 
    ? 'transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer' 
    : ''

  return (
    <Card 
      className={cn(
        variantClasses[variant],
        interactive && interactiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
}

// Export original components for flexibility
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
```

#### Pattern 3: Behavior Enhancement

```typescript
// components/ui/animated-input.tsx
import * as React from "react"
import { Input } from "./input"
import { cn } from "@/lib/utils"

interface AnimatedInputProps extends React.ComponentProps<typeof Input> {
  hasError?: boolean
  isLoading?: boolean
}

export const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, hasError = false, isLoading = false, ...props }, ref) => {
    return (
      <Input
        className={cn(
          // Enhanced animations and states
          "transition-all duration-200",
          "focus:ring-2 focus:ring-offset-2",
          "focus:scale-[1.02]",
          hasError && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          isLoading && "animate-pulse",
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      />
    )
  }
)
AnimatedInput.displayName = "AnimatedInput"
```


---

## Implementation Patterns

### Component Composition Pattern

```typescript
// components/animated/AnimatedButton.tsx
import { Button, ButtonProps } from "@/components/ui/button"
import { useBoop } from "@/hooks/useBoop"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonProps {
  boopOnClick?: boolean
  boopOnHover?: boolean
}

export function AnimatedButton({
  boopOnClick = false,
  boopOnHover = false,
  className,
  onClick,
  children,
  ...props
}: AnimatedButtonProps) {
  const { trigger, style } = useBoop({ scale: 1.05 })
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (boopOnClick) trigger()
    onClick?.(e)
  }
  
  return (
    <Button
      className={cn(
        // Base animation classes
        "transition-all duration-200",
        // Hover boop if enabled
        boopOnHover && "hover:scale-[1.02]",
        className
      )}
      style={style}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  )
}
```

### Animation Context Provider

```typescript
// context/AnimationContext.tsx
import React, { createContext, useContext, useState } from 'react'

interface AnimationConfig {
  reducedMotion: boolean
  boopIntensity: number
  globalSpeed: number
}

const AnimationContext = createContext<AnimationConfig | null>(null)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [config] = useState<AnimationConfig>(() => ({
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    boopIntensity: 1.05,
    globalSpeed: 1.0,
  }))
  
  return (
    <AnimationContext.Provider value={config}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider')
  }
  return context
}
```

---

## Performance Guidelines

### Best Practices

**1. Use CSS Transforms**
```css
/* ✅ Good - Uses GPU acceleration */
.animated-element {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* ❌ Avoid - Causes layout shifts */
.bad-animation {
  width: 110%;
  height: 110%;
}
```

**2. Limit Concurrent Animations**
```typescript
// Use animation queues for complex sequences
const animationQueue = {
  add: (animation: () => void) => { /* queue logic */ },
  process: () => { /* process queue */ }
}
```

**3. Cleanup and Memory Management**
```typescript
// Always cleanup animation listeners
useEffect(() => {
  const handleAnimationEnd = () => setIsAnimating(false)
  
  element.addEventListener('animationend', handleAnimationEnd)
  
  return () => {
    element.removeEventListener('animationend', handleAnimationEnd)
  }
}, [])
```

**4. Respect User Preferences**
```typescript
// Always check for reduced motion
const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (shouldAnimate) {
  // Trigger animation
} else {
  // Provide instant feedback
}
```

---

## Quick Reference

### Boop Implementation Checklist

- [ ] Add boop classes to Tailwind config
- [ ] Create useBoop hook
- [ ] Implement reduced motion detection
- [ ] Add to interactive elements only
- [ ] Test accessibility
- [ ] Verify performance impact

### shadcn Customization Checklist

- [ ] Extend variants, don't replace
- [ ] Preserve accessibility attributes
- [ ] Follow consistent design patterns
- [ ] Test responsive behavior
- [ ] Document custom props
- [ ] Maintain TypeScript types

### Tailwind vs shadcn Decision Checklist

- [ ] Does it need interactive behavior? → shadcn/ui
- [ ] Does it need accessibility features? → shadcn/ui
- [ ] Is it a standard UI pattern? → shadcn/ui
- [ ] Is it just styling/layout? → Tailwind
- [ ] Will it be reused frequently? → Consider shadcn/ui
- [ ] Is it a one-off design? → Tailwind

---

This guide provides a solid foundation for creating delightful, accessible, and performant animations while maintaining consistency across your component library.
