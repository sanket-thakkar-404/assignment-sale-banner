🛒 Ayurvedic Sales Countdown Banner – Features Documentation

⏳ Countdown Timer
	•	Displays a live 24-hour countdown in HH:MM:SS format.
	•	Automatically resets when:
	•	Timer expires, or
	•	Product goes out of stock.
	•	State is persisted using localStorage, so timer continues even after page reload.
	•	Updates every 1 second using setInterval.

⸻

📉 Decreasing Order Counter
	•	Initial stock starts at 500 remaining orders.
	•	Decreases randomly by 1–10 units every 5 seconds to simulate real-time purchases.
	•	Dynamically updates the UI.
	•	Triggers Out-of-Stock mode when it reaches 0.
	•	Order count is stored in localStorage for persistence.

⸻

🎟 Coupon Code Functionality
	•	Clickable coupon box displaying code: AYUR10
	•	On click:
	•	Copies code to clipboard using navigator.clipboard.
	•	Shows “Applied” state with green background.
	•	Reverts back to normal after 7 seconds.

⸻

🔔 Live Purchase Popups
	•	Displays random notifications like:
	•	“Rohit from Delhi purchased 5 bottles”
	•	Appears every 5 seconds.
	•	Uses predefined arrays of:
	•	Names
	•	Cities
	•	Includes slide-up animation.
	•	Visible for 4 seconds before disappearing.

⸻

📊 Analytics Chart
	•	Implemented using Line Chart.
	•	Shows Order Trend vs Time (e.g., 10 AM → 4 PM).
	•	Dynamically updates when orders decrease:
	•	Adds new data points.
	•	Shifts labels.
	•	Fully responsive with orange accent styling.

⸻

🚫 Out-of-Stock Handling

When order count reaches 0:
	•	Stock section is hidden.
	•	Displays “Sale Ended” message.
	•	Coupon becomes expired.
	•	Shows a “Notify Me” button (UI only – non-functional).
	•	After 10 seconds, system automatically:
	•	Resets stock to 500
	•	Restarts timer.

⸻

🎨 UI Animations & Styling
	•	Pulse animation on “10% OFF” discount badge.
	•	Fade-in animation on banner load.
	•	Slide-up animation for purchase popups.
	•	Fully responsive design:
	•	Sections stack vertically on screens < 768px.

⸻

⚡ Urgency & Sales Elements
	•	Sale Badge with time icon: “Limited Time Sale!”
	•	Urgency slogan:
Hurry! Ayurvedic Wellness Products at Unbeatable Prices!
	•	Discount Highlight with pulsing 10% OFF.

⸻

💾 Persistence & State Management
	•	Uses localStorage to store:
	•	Timer end time
	•	Remaining orders
	•	Ensures continuity across page refreshes.

⸻

📱 Responsive Layout
	•	Built using Flexbox Layout:
	•	Left Section: Text + Countdown + Coupon + Orders
	•	Right Section: Analytics Chart
	•	Mobile Adaptations:
	•	Full-width stacked sections
	•	Smaller chart size
	•	Adjusted popup positioning


## Features
- **Countdown Timer**: Displays remaining time for the sale (resets every 24 hours).
- **Order Tracking**: Shows decreasing remaining orders (starts at 500, decreases randomly every 5 seconds).
- **Coupon Code**: Clickable coupon box that copies the code ("AYUR10") to clipboard and shows an "applied" state.
- **Live Purchase Popups**: Random notifications of purchases (e.g., "Rohit from Delhi purchased 5 bottles") appearing every 5 seconds.
- **Analytics Chart**: A line chart (using Chart.js) showing order trends over time, updating dynamically.
- **Out-of-Stock Handling**: When orders reach 0, switches to an "out of stock" view with a notify button, then resets after 10 seconds.
- **Responsive Design**: Adapts to mobile screens with stacked layout.
- **Persistence**: Uses localStorage to save timer and order state across page reloads.
- **Animations**: Pulse effect on discount number, fade-in for banner, and slide-up for popups.

## Technologies Used
- **HTML**: Structure of the banner.
- **CSS**: Styling, animations, and responsiveness.
- **JavaScript**: Logic for timer, orders, popups, and chart updates.
- **Chart.js**: Library for rendering the analytics chart.
- **Remixicon**: Icon library for the time icon.

