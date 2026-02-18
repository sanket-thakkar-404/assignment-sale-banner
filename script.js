document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------------------------------------------------------- */
    /*                               CONFIGURATION                                */
    /* -------------------------------------------------------------------------- */
    const CONFIG = {
        saleDurationHours: 24, // Reset every 24 hours
        initialOrders: 120,    // Starting "base" orders
        maxOrderJump: 4,       // Max increment per update
        totalStock: 500,
        updateIntervalMin: 3000,  // ms
        updateIntervalMax: 8000,  // ms,
        storageKeys: {
            timer: 'sale_timer',
            orders: 'orders_count'
        }
    };
    const ordersRemainingEl = document.getElementById('orders-remaining');

    /* -------------------------------------------------------------------------- */
    /*                             COUNTDOWN TIMER                                */
    /* -------------------------------------------------------------------------- */
    const timerEls = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    function initTimer() {
        let deadline = localStorage.getItem(CONFIG.storageKeys.timer);

        // If no deadline or it has passed, set new one
        if (!deadline || new Date(deadline) < new Date()) {
            const now = new Date();
            now.setHours(now.getHours() + CONFIG.saleDurationHours);
            deadline = now.toISOString();
            localStorage.setItem(CONFIG.storageKeys.timer, deadline);
        }

        updateTimerDisplay(deadline);

        setInterval(() => {
            updateTimerDisplay(deadline);
        }, 1000);
    }

    function updateTimerDisplay(deadlineISO) {
        const total = Date.parse(deadlineISO) - Date.parse(new Date());

        if (total <= 0) {
            // Timer expired, restart it for demo purposes logic
            localStorage.removeItem(CONFIG.storageKeys.timer);
            initTimer();
            return;
        }

        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        timerEls.days.textContent = ('0' + days).slice(-2);
        timerEls.hours.textContent = ('0' + hours).slice(-2);
        timerEls.minutes.textContent = ('0' + minutes).slice(-2);
        timerEls.seconds.textContent = ('0' + seconds).slice(-2);
    }

    /* -------------------------------------------------------------------------- */
    /*                             ORDER SIMULATION                               */
    /* -------------------------------------------------------------------------- */
    const ordersEl = document.getElementById('orders-count');
    const stockBarEl = document.getElementById('stock-bar');
    let currentOrders = parseInt(localStorage.getItem(CONFIG.storageKeys.orders)) || CONFIG.initialOrders;

    function initOrderSimulation() {
        updateOrderDisplay();
        scheduleNextOrderUpdate();
    }

    function updateOrderDisplay() {

        const remaining = CONFIG.totalStock - currentOrders;
        ordersRemainingEl.textContent = remaining
        if (remaining < 50) {
            ordersRemainingEl.style.color = 'red';
        }
        if (remaining < 0) {
            ordersRemainingEl.textContent = 0;
        }
        ordersEl.textContent = currentOrders;
        localStorage.setItem(CONFIG.storageKeys.orders, currentOrders);

        const maxCapacity = 500;
        const percentage = Math.min((currentOrders / maxCapacity) * 100, 100);
        stockBarEl.style.width = `${percentage}%`;
    }

    function scheduleNextOrderUpdate() {
        const randomDelay = Math.floor(Math.random() * (CONFIG.updateIntervalMax - CONFIG.updateIntervalMin + 1) + CONFIG.updateIntervalMin);

        setTimeout(() => {
            const increment = Math.floor(Math.random() * CONFIG.maxOrderJump) + 1;
            if (currentOrders + increment >= CONFIG.totalStock) {
                currentOrders = CONFIG.totalStock;
                updateOrderDisplay();
                return; // stop simulation
            }
            currentOrders += increment;

            // Trigger animation on number
            ordersEl.style.color = '#C05621'; // flash color
            ordersEl.style.transform = 'scale(1.2)';
            ordersEl.style.display = 'inline-block';
            ordersEl.style.transition = 'all 0.2s';

            updateOrderDisplay();
            updateChartData(currentOrders); // Update Chart

            setTimeout(() => {
                ordersEl.style.color = '';
                ordersEl.style.transform = 'scale(1)';
            }, 300);

            scheduleNextOrderUpdate();
        }, randomDelay);
    }

    /* -------------------------------------------------------------------------- */
    /*                           COPY COUPON LOGIC                                */
    /* -------------------------------------------------------------------------- */
    const copyBtn = document.getElementById('copy-btn');
    const couponCode = document.getElementById('coupon-code').textContent;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(couponCode).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'COPIED!';
            copyBtn.style.backgroundColor = '#c05621'; // Success green

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        });
    });

    /* -------------------------------------------------------------------------- */
    /*                           ANALYTICS CHART (CANVAS)                         */
    /* -------------------------------------------------------------------------- */
    // Simple Line Chart implementation using HTML5 Canvas
    const canvas = document.getElementById('salesChart');
    const ctx = canvas.getContext('2d');

    // Resize handling to keep it crisp
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Init

    // Data points (simulated history)
    // Let's create an array of "last 10 updates" for the chart
    let chartData = [];
    // Initialize with some data leading up to current
    for (let i = 10; i > 0; i--) {
        chartData.push(currentOrders - (i * 5));
    }
    chartData.push(currentOrders);

    function updateChartData(newValue) {
        chartData.shift(); // Remove oldest
        chartData.push(newValue);
        drawChart();
    }

    function drawChart() {
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const padding = 35;

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Settings
        const chartW = width - (padding * 2);
        const chartH = height - (padding * 2);

        // Min/Max for scaling
        const minVal = Math.min(...chartData) - 5;
        const maxVal = Math.max(...chartData) + 5;
        const range = maxVal - minVal;

        // Draw Background Grid (Horizontal lines)
        ctx.strokeStyle = '#e0e0e0'; // Light grey
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= 4; i++) {
            const y = height - padding - (i * (chartH / 4));
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
        }
        ctx.stroke();

        // Draw Line
        ctx.strokeStyle = '#C05621'; // Accent color
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();

        chartData.forEach((val, index) => {
            const x = padding + (index * (chartW / (chartData.length - 1)));
            // Invert Y because canvas 0 is top
            const y = height - padding - ((val - minVal) / range) * chartH;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Y AXIS NUMBERS (LEFT SIDE)
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';

        for (let i = 0; i <= 4; i++) {
            const value = Math.round(minVal + (range / 4) * i);
            const y = height - padding - (i * (chartH / 4));
            ctx.fillText(value, padding - 8, y + 4);
        }

        // Fill Area under line
        ctx.fillStyle = 'rgba(192, 86, 33, 0.1)'; // Transparent accent
        ctx.lineTo(width - padding, height - padding);
        ctx.lineTo(padding, height - padding);
        ctx.closePath();
        ctx.fill();

        // Draw dots
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#C05621';
        ctx.lineWidth = 2;

        chartData.forEach((val, index) => {
            const x = padding + (index * (chartW / (chartData.length - 1)));
            const y = height - padding - ((val - minVal) / range) * chartH;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });

        // X AXIS TIME (DYNAMIC)
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        let startTime = new Date(); // हर redraw पे new time

        chartData.forEach((_, index) => {
            const x = padding + (index * (chartW / (chartData.length - 1)));

            const labelTime = new Date(startTime);
            labelTime.setHours(startTime.getHours() + index);

            let hour = labelTime.getHours();
            const ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12 || 12;

            const timeLabel = hour + ampm;

            ctx.fillText(timeLabel, x, height - 10);
        });
    }
    // Run Logic
    initTimer();
    setInterval(() => {
        drawChart();
    }, 60000); // har 1 minute
    initOrderSimulation();
    // Initial draw
    setTimeout(drawChart, 400); // Small delay to ensure sizing
});
