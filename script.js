// ======================
// ELEMENTS
// ======================
const countdownElement = document.getElementById("countdown");
const ordersElement = document.getElementById("orders");
const couponBox = document.getElementById("couponBox");
const couponText = document.getElementById("couponText");
const outOfStock = document.querySelector(".out-stock");
const stock = document.querySelector(".stock");
const livePopup = document.getElementById("livePopup");

// ======================
// STATE
// ======================
let endTime;
let orders;

// ======================
// INIT
// ======================
function initSale() {
  endTime = parseInt(localStorage.getItem("saleEndTime"));
  orders = parseInt(localStorage.getItem("ordersCount"));

  if (!endTime) resetTimer();
  if (!orders && orders !== 0) resetOrders();

  updateOrdersUI();
  updateStockUI();
}

// ======================
// TIMER
// ======================
function resetTimer() {
  endTime = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem("saleEndTime", endTime);
}

function updateCountdown() {
  const now = Date.now();
  const distance = endTime - now;

  if (distance <= 0) {
    countdownElement.innerHTML = "EXPIRED";
    return;
  }

  const h = Math.floor(distance / (1000 * 60 * 60));
  const m = Math.floor((distance / (1000 * 60)) % 60);
  const s = Math.floor((distance / 1000) % 60);

  countdownElement.innerHTML =
    `${h.toString().padStart(2, "0")}:` +
    `${m.toString().padStart(2, "0")}:` +
    `${s.toString().padStart(2, "0")}`;
}

// ======================
// ORDERS
// ======================
function resetOrders() {
  orders = 500;
  localStorage.setItem("ordersCount", orders);
}

function decreaseOrders() {
  if (orders <= 0) return;

  const dec = Math.floor(Math.random() * 10) + 1;
  orders = Math.max(0, orders - dec);

  localStorage.setItem("ordersCount", orders);
  updateOrdersUI();
  updateChart(dec);

  if (orders === 0) handleOutOfStock();
}

// ======================
// UI
// ======================
function updateOrdersUI() {
  ordersElement.textContent = orders;
}

function updateStockUI() {
  if (orders === 0) {
    stock.setAttribute("id", "hidden");
    outOfStock.removeAttribute("id");

    setTimeout(() => {
      stock.removeAttribute("id");
      outOfStock.setAttribute("id", "hidden");
      console.log("this attribute run 500 become zero")
      orders = 500
    }, 10000)
  }
}

function handleOutOfStock() {
  updateStockUI();

  setTimeout(() => {
    resetOrders();
    resetTimer();
    updateOrdersUI();
    updateStockUI();
  }, 10000);
}

// ======================
// COUPON
// ======================
couponBox.addEventListener("click", () => {
  navigator.clipboard.writeText(couponText.innerText);
  couponBox.classList.add("applied");
  couponBox.innerHTML = "Coupon Applied ✔";

  setTimeout(() => {
    couponBox.classList.remove("applied");
    couponBox.innerHTML =
      `Coupon Code: <span id="couponText">${couponText.innerText}</span>`;
  }, 7000);
});

// ======================
// LIVE POPUP
// ======================
const names = [
  "Rohit",
  "Sneha",
  "Amit",
  "Pooja",
  "Shaan",
  "Vivek",
  "Ankit",
  "Neha",
  "Rahul",
  "Priya",
  "Karan",
  "Anjali",
  "Arjun",
  "Riya",
  "Manish",
  "Kavya",
  "Varun",
  "Isha",
  "Aditya",
  "Meera"
];
const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat"
];

function showLivePurchase() {
  const name = names[Math.floor(Math.random() * names.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const random = Math.floor((Math.random()*10) +1)

  livePopup.innerText = `${name} from ${city} purchased ${random} bottles`;

  livePopup.classList.remove("hidden");
  livePopup.classList.remove("show");

  void livePopup.offsetWidth; // force reflow (important)

  livePopup.classList.add("show");

  setTimeout(() => {
    livePopup.classList.add("hidden");
  }, 4000);
}

// ======================
// Analytics Chart
// ======================
const ctx = document.getElementById("analyticsChart").getContext("2d");
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"],
    datasets: [
      {
        label: "Orders",
        data: [10, 12, 15, 15, 20, 30, 35],
        borderColor: "#ffa500", // Orange accent
        backgroundColor: "rgba(255, 165, 0, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,

    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#3e2723",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#3e2723",
        },
      },
      y: {

        ticks: {
          color: "#3e2723",
        },
      },
    },
  },
});


function updateChart(dec) {
  const dataset = chart.data.datasets[0].data;
  const labels = chart.data.labels;

  dataset.shift();
  labels.shift();

  let lastValue = dataset[dataset.length - 1];
  let newValue = lastValue + dec; // jitna order gira utna badha

  dataset.push(newValue);

  // next hour label logic
  let lastLabel = labels[labels.length - 1];
  let hour = parseInt(lastLabel);
  let period = lastLabel.includes("PM") ? "PM" : "AM";

  hour++;
  if (hour === 12) period = period === "AM" ? "PM" : "AM";
  else if (hour === 13) hour = 1;

  labels.push(hour + " " + period);

  chart.update();
}


// ======================
// START
// ======================
initSale();
setInterval(updateCountdown, 1000);
setInterval(decreaseOrders, 5000);
setInterval(showLivePurchase, 5000);