# E‑Commerce Flash Sales Banner Component

## Overview
The **Flash Sales Banner** is a reusable front‑end UI component designed to increase urgency and conversions on an e‑commerce product page.  
It combines a **countdown timer, coupon copy system, live order simulation, stock indicator, CTA button, and analytics chart** into one interactive section.

---

## Tech Stack

| Layer | Technology |
|------|-----------|
| Structure | HTML5 |
| Styling | CSS3 (Variables, Flexbox, Media Queries) |
| Logic | Vanilla JavaScript (ES6) |
| Storage | localStorage |
| Visualization | HTML5 Canvas |

---

## Core Features

### 1. Countdown Timer
**Purpose:** Creates urgency using a 24‑hour reset timer.

**Logic:**
- Deadline stored in `localStorage`
- Automatically resets on expiry
- Updates every second using `setInterval`

**Main Functions:**
- `initTimer()`
- `updateTimerDisplay()`

---

### 2. Coupon Copy System
**Purpose:** Improves user convenience and interaction.

**Logic:**
- Uses `navigator.clipboard.writeText`
- Button text changes to **COPIED!** for 2 seconds
- Visual feedback with color change

---

### 3. Order Simulation Engine
**Purpose:** Displays social proof such as “124 orders placed recently”.

**Logic:**
- Orders stored in `localStorage`
- Random increments at random intervals
- Stops when stock limit is reached
- Updates chart and triggers small animation

**Main Functions:**
- `initOrderSimulation()`
- `updateOrderDisplay()`
- `scheduleNextOrderUpdate()`

---

### 4. Stock Progress Bar
**Purpose:** Shows scarcity visually.

**Logic:**
- Width = `(currentOrders / totalStock) * 100`
- Remaining stock text turns **red** if less than 50
- Prevents negative stock display

---

### 5. Analytics Chart (Canvas)
**Purpose:** Displays simulated sales trend.

**Logic:**
- Maintains last 10 data points
- Dynamic scaling for min/max range
- Redraws every 60 seconds
- Shows grid lines, axis labels, dots, and filled area

**Main Functions:**
- `drawChart()`
- `updateChartData()`
- `resizeCanvas()`

---

## Configuration Object

All dynamic values are centralized in a single object for easy modification:

```js
const CONFIG = {
  saleDurationHours: 24,
  initialOrders: 120,
  maxOrderJump: 4,
  totalStock: 500,
  updateIntervalMin: 3000,
  updateIntervalMax: 8000,
  storageKeys: {
    timer: 'sale_timer',
    orders: 'orders_count'
  }
};
```

**Benefits:**
- Easy scaling
- Quick testing
- Reusability across products

---

## UI Structure

### Left Panel
- Sale Badge
- Offer Heading
- Description
- Coupon Copy Box

### Right Panel
- Countdown Timer
- Order Counter
- Stock Progress Bar
- CTA Button

### Below Banner
- Live Sales Analytics Chart

---

## Responsiveness
- Built with Flexbox
- Uses `flex-wrap` for small screens
- Mobile breakpoint at **768px**
- Adjusts borders and padding for stacked layout

---

## Accessibility
- `aria-label` on copy button
- Clear typography and color contrast
- Hover and active button states

---

## Performance Considerations
- No heavy libraries
- Canvas used instead of external chart libraries
- LocalStorage avoids server calls
- Controlled intervals to prevent excessive re‑renders

---

## Reusability & Scalability
- Can be converted into React / Vue component
- CONFIG enables multi‑product reuse
- Chart logic can later connect to real APIs

---

## Future Enhancements
- Backend integration for real order data
- Multiple coupon variants
- A/B testing
- Dark mode theme
- Real analytics integration

---

## Conclusion
This Flash Sales Banner works as a **conversion‑focused micro‑system**, combining urgency, scarcity, and social proof with lightweight front‑end engineering. It is fast, reusable, and easily extendable for real‑world e‑commerce platforms.
