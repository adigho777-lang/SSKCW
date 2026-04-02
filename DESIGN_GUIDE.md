# Design Guide

Visual design specifications and guidelines for the FitLife fitness website.

## Color Palette

### Primary Colors
```
Primary Green:   #10b981 (rgb(16, 185, 129))
Secondary Green: #059669 (rgb(5, 150, 105))
```

### Neutral Colors
```
White:      #ffffff
Gray 50:    #f9fafb (backgrounds)
Gray 100:   #f3f4f6 (hover states)
Gray 300:   #d1d5db (borders)
Gray 600:   #4b5563 (secondary text)
Gray 700:   #374151 (labels)
Gray 900:   #111827 (headings)
Black:      #000000
```

### Status Colors
```
Success:  #10b981 (green)
Warning:  #f59e0b (yellow)
Error:    #ef4444 (red)
Info:     #3b82f6 (blue)
```

### Gradient Backgrounds
```
Green to Blue: from-green-50 to-blue-50
Green to Blue (darker): from-green-100 to-blue-100
```

## Typography

### Font Family
```
Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
         'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
         sans-serif
```

### Font Sizes
```
Hero Headline:     text-4xl md:text-6xl (36px / 60px)
Section Heading:   text-4xl (36px)
Card Title:        text-2xl (24px)
Subheading:        text-xl md:text-2xl (20px / 24px)
Body Text:         text-base (16px)
Small Text:        text-sm (14px)
Button Text:       text-lg (18px)
```

### Font Weights
```
Regular:   font-normal (400)
Semibold:  font-semibold (600)
Bold:      font-bold (700)
```

## Spacing

### Padding
```
Small:     p-4 (16px)
Medium:    p-6 (24px)
Large:     p-8 (32px)
Section:   py-20 (80px vertical)
```

### Margins
```
Small:     mb-2 (8px)
Medium:    mb-4 (16px)
Large:     mb-6 (24px)
Section:   mb-16 (64px)
```

### Gaps
```
Small:     gap-4 (16px)
Medium:    gap-6 (24px)
Large:     gap-8 (32px)
```

## Components

### Buttons

#### Primary Button
```
Background: bg-primary (#10b981)
Text: text-white
Padding: px-8 py-4
Border Radius: rounded-lg
Font: text-lg font-semibold
Hover: hover:bg-secondary
Transform: hover:scale-105
Shadow: shadow-lg
```

#### Secondary Button
```
Background: bg-green-500
Text: text-white
Padding: px-8 py-4
Border Radius: rounded-lg
Font: text-lg font-semibold
Hover: hover:bg-green-600
Transform: hover:scale-105
Shadow: shadow-lg
```

#### Admin Button
```
Background: bg-blue-500 / bg-red-500
Text: text-white
Padding: px-4 py-2
Border Radius: rounded-lg
Hover: hover:bg-blue-600 / hover:bg-red-600
```

### Cards

#### Service Card
```
Background: bg-gradient-to-br from-green-50 to-blue-50
Padding: p-8
Border Radius: rounded-xl
Shadow: shadow-lg
Hover Shadow: hover:shadow-2xl
Transform: hover:-translate-y-2
Animation: animate-fade-in
```

#### Product Card
```
Background: bg-white
Border Radius: rounded-xl
Shadow: shadow-lg
Hover Shadow: hover:shadow-2xl
Transform: hover:-translate-y-2
Overflow: overflow-hidden
```

#### Stat Card (Admin)
```
Background: bg-white
Padding: p-6
Border Radius: rounded-lg
Shadow: shadow-lg
```

### Forms

#### Input Field
```
Border: border border-gray-300
Padding: px-4 py-3
Border Radius: rounded-lg
Focus: focus:ring-2 focus:ring-primary focus:border-transparent
```

#### Textarea
```
Border: border border-gray-300
Padding: px-4 py-2
Border Radius: rounded-lg
Focus: focus:ring-2 focus:ring-primary
Rows: 3-4
```

#### Select Dropdown
```
Border: border border-gray-300
Padding: px-4 py-3
Border Radius: rounded-lg
Focus: focus:ring-2 focus:ring-primary
```

### Badges

#### Status Badge
```
Padding: px-3 py-1
Border Radius: rounded-full
Font: text-sm font-semibold

Pending:   bg-yellow-100 text-yellow-800
Confirmed: bg-blue-100 text-blue-800
Delivered: bg-green-100 text-green-800
```

#### Goal Badge
```
Padding: px-3 py-1
Border Radius: rounded-full
Font: text-sm font-semibold

Weight Loss: bg-red-100 text-red-800
Fitness:     bg-blue-100 text-blue-800
Energy:      bg-green-100 text-green-800
```

### Navigation

#### Navbar
```
Background: bg-white
Shadow: shadow-md
Position: fixed top-0
Height: h-16 (64px)
Z-index: z-40
```

#### Admin Sidebar
```
Background: bg-gray-900
Text: text-white
Width: w-64 (256px)
Position: fixed
Z-index: z-50
```

### Modals

#### Order Modal
```
Background: bg-white
Border Radius: rounded-xl
Max Width: max-w-md
Padding: p-6
Shadow: shadow-2xl
Backdrop: bg-black bg-opacity-50
```

## Animations

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

Duration: 0.6s
Easing: ease-in
```

### Hover Scale
```
Transform: hover:scale-105
Transition: transition-all duration-300
```

### Hover Lift
```
Transform: hover:-translate-y-2
Transition: transition-all duration-300
```

## Icons

### Icon Library
React Icons (react-icons)

### Icon Sizes
```
Small:  size={20}
Medium: size={24}
Large:  size={32}
XLarge: text-5xl (48px)
Hero:   text-8xl (96px)
```

### Icon Colors
```
Primary:   text-primary
White:     text-white
Gray:      text-gray-600
Success:   text-green-500
Error:     text-red-500
```

## Responsive Breakpoints

```
Mobile:     < 640px (default)
Tablet:     sm: 640px
Desktop:    md: 768px
Large:      lg: 1024px
XLarge:     xl: 1280px
```

### Responsive Patterns

#### Grid Layouts
```
Mobile:  grid-cols-1
Tablet:  md:grid-cols-2
Desktop: lg:grid-cols-3
```

#### Text Sizes
```
Mobile:  text-4xl
Desktop: md:text-6xl
```

#### Padding
```
Mobile:  px-4
Desktop: sm:px-6 lg:px-8
```

## Layout Structure

### Container
```
Max Width: max-w-7xl (1280px)
Margin: mx-auto (centered)
Padding: px-4 sm:px-6 lg:px-8
```

### Section
```
Padding: py-20 (80px vertical)
Background: Alternating white / gray-50
```

### Grid
```
Display: grid
Columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Gap: gap-6 / gap-8
```

## Shadows

```
Small:  shadow
Medium: shadow-lg
Large:  shadow-2xl
Hover:  hover:shadow-2xl
```

## Border Radius

```
Small:  rounded (4px)
Medium: rounded-lg (8px)
Large:  rounded-xl (12px)
Full:   rounded-full (9999px)
```

## Z-Index Layers

```
Base:           z-0
Navbar:         z-40
WhatsApp:       z-50
Sidebar:        z-50
Modal Backdrop: z-50
Modal Content:  z-50
```

## Accessibility

### Focus States
```
Ring: focus:ring-2
Color: focus:ring-primary
Border: focus:border-transparent
Outline: focus:outline-none
```

### ARIA Labels
```
Buttons: aria-label="descriptive text"
Links: aria-label="descriptive text"
Forms: proper label associations
```

### Color Contrast
```
All text meets WCAG AA standards
Minimum contrast ratio: 4.5:1 for normal text
Minimum contrast ratio: 3:1 for large text
```

## Image Guidelines

### Product Images
```
Aspect Ratio: 4:3 or 1:1
Minimum Size: 800x600px
Maximum Size: 2000x1500px
Format: JPG, PNG, WebP
File Size: < 500KB (optimized)
```

### Display
```
Object Fit: object-cover
Height: h-48 / h-64 (192px / 256px)
Width: w-full
```

## Loading States

### Spinner
```
Border: border-4 border-gray-200
Border Top: border-t-primary
Animation: animate-spin
Size: w-8 h-8
```

### Skeleton
```
Background: bg-gray-200
Animation: animate-pulse
```

### Text
```
"Loading..." / "Submitting..." / "Saving..."
Color: text-gray-600
```

## Success States

### Checkmark
```
Icon: ✓
Size: text-5xl
Color: text-green-500
```

### Message
```
Background: bg-green-100
Border: border-green-400
Text: text-green-700
Padding: px-4 py-3
Border Radius: rounded
```

## Error States

### Message
```
Background: bg-red-100
Border: border-red-400
Text: text-red-700
Padding: px-4 py-3
Border Radius: rounded
```

## Design Principles

### 1. Clarity
- Clear hierarchy
- Obvious CTAs
- Simple navigation
- Readable text

### 2. Consistency
- Uniform spacing
- Consistent colors
- Standard components
- Predictable behavior

### 3. Feedback
- Loading states
- Success messages
- Error handling
- Hover effects

### 4. Accessibility
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus indicators

### 5. Performance
- Optimized images
- Minimal animations
- Fast load times
- Efficient code

## Brand Voice

### Tone
- Motivational
- Supportive
- Professional
- Friendly
- Action-oriented

### Language
- Clear and direct
- Benefit-focused
- Encouraging
- Simple terms
- Active voice

## Mobile-First Approach

1. Design for mobile first
2. Add complexity for larger screens
3. Touch-friendly targets (min 44x44px)
4. Readable text without zoom
5. Accessible navigation

## Best Practices

### Do's
✓ Use consistent spacing
✓ Maintain color hierarchy
✓ Provide clear feedback
✓ Optimize images
✓ Test on real devices
✓ Use semantic HTML
✓ Add loading states
✓ Handle errors gracefully

### Don'ts
✗ Mix different design patterns
✗ Use too many colors
✗ Ignore mobile users
✗ Skip loading states
✗ Forget error handling
✗ Use tiny touch targets
✗ Overcomplicate layouts
✗ Ignore accessibility

## Future Enhancements

### Potential Additions
- Dark mode support
- Custom illustrations
- Video backgrounds
- Parallax effects
- Micro-interactions
- Advanced animations
- Custom fonts
- Brand mascot

---

This design system ensures consistency, accessibility, and a professional appearance across the entire website! 🎨
