// =====================================================
// PAGE NAVIGATION
// =====================================================

const loginPage = document.getElementById("loginPage");
const portfolioPage = document.getElementById("portfolioPage");
const profilePage = document.getElementById("profilePage");

function showPage(page) {
    loginPage.classList.add("hidden");
    portfolioPage.classList.add("hidden");
    profilePage.classList.add("hidden");

    page.classList.remove("hidden");

    // تصفير الـ Scroll لفوق كل ما ننتقل لصفحة
    window.scrollTo(0, 0);
    const stockList = document.querySelector('.stock-list');
    if(stockList) stockList.scrollTop = 0;
}


// =====================================================
// LOGIN
// =====================================================

const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const button = document.getElementById("loginBtn");

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

// إظهار وإخفاء كلمة المرور
togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
    }
});

// بيانات تسجيل الدخول
const validUsername = "abdelazez mohamed ibrahem";
const validPassword = "SsOii<>O";
const validPhone = "0553821110";

// تسجيل الدخول
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();

    if (
        username.toLowerCase() === validUsername.toLowerCase() &&
        password === validPassword &&
        phone === validPhone
    ) {
        message.className = "success";
        message.innerHTML = "Login Successful...";

        button.disabled = true;
        button.innerHTML = "Loading...";

        setTimeout(function () {
            showPage(portfolioPage);
            button.disabled = false;
            button.innerHTML = "LOGIN";
        }, 1500);

    } else {
        message.className = "error";
        message.innerHTML = "Incorrect Username, Password or Phone Number";

        document.querySelector(".login-container").animate(
            [
                { transform: "translateX(0px)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(0px)" }
            ],
            { duration: 400 }
        );
    }
});


// =====================================================
// PORTFOLIO
// =====================================================

const startingCapital = 0;
let portfolio = startingCapital;
let cashBalance = 0;

// BNNK
let bnnk = 12.50;
const bnnkStartPrice = 12.50;
const bnnkSharesCount = 0;

// PAPL
let papl = 1.020;
const paplStartPrice = 1.020;
const paplSharesCount = 0;

// SLV
let slv = 28.50;
const slvStartPrice = 28.50;
const slvSharesCount = 0;


// =====================================================
// HTML ELEMENTS
// =====================================================

const portfolioValue = document.getElementById("portfolioValue");
const profit = document.getElementById("profit");
const cash = document.getElementById("cash");
const buying = document.getElementById("buying");

const bnnkPrice = document.getElementById("bnnkPrice");
const bnnkShares = document.getElementById("bnnkShares");
const bnnkProfit = document.getElementById("bnnkProfit");

const paplPrice = document.getElementById("paplPrice");
const paplShares = document.getElementById("paplShares");
const paplProfit = document.getElementById("paplProfit");

const slvPrice = document.getElementById("slvPrice");
const slvShares = document.getElementById("slvShares");
const slvProfit = document.getElementById("slvProfit");


// =====================================================
// HELPER
// =====================================================

function formatMoney(number) {
    return "$" + number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// =====================================================
// CALCULATIONS & UPDATES
// =====================================================

function calculateStocksValue() {
    const bnnkValue = bnnk * bnnkSharesCount;
    const paplValue = papl * paplSharesCount;
    const slvValue = slv * slvSharesCount;
    return bnnkValue + paplValue + slvValue;
}

function calculateProfit() {
    return portfolio - startingCapital;
}

function updatePortfolio() {
    const stocksValue = calculateStocksValue();
    portfolio = cashBalance + stocksValue;
    const totalProfit = calculateProfit();

    portfolioValue.innerHTML = formatMoney(portfolio);
    profit.innerHTML = (totalProfit >= 0 ? "+" : "") + formatMoney(totalProfit);
    cash.innerHTML = formatMoney(cashBalance);

    const buyingPower = cashBalance * 0.80;
    buying.innerHTML = formatMoney(buyingPower);

    // Profile Page Updates
    const profilePortfolio = document.querySelector(".profile-info div:nth-child(1) h3");
    const profileProfit = document.querySelector(".profile-info div:nth-child(2) h3");

    if (profilePortfolio) profilePortfolio.innerHTML = formatMoney(portfolio);
    if (profileProfit) profileProfit.innerHTML = (totalProfit >= 0 ? "+" : "") + formatMoney(totalProfit);
}

function updateStocks() {
    // زيادة الأسعار
    bnnk += 0.03;
    papl += 0.004;
    slv += 0.05;

    // تحديث الأسعار في الصفحة
    bnnkPrice.innerHTML = formatMoney(bnnk);
    paplPrice.innerHTML = formatMoney(papl);
    slvPrice.innerHTML = formatMoney(slv);

    // تحديث عدد الأسهم
    bnnkShares.innerHTML = bnnkSharesCount.toLocaleString() + " Shares";
    paplShares.innerHTML = paplSharesCount.toLocaleString() + " Shares";
    slvShares.innerHTML = slvSharesCount.toLocaleString() + " Shares";

    // حساب وتحديث نسبة الربح
    const bnnkPercentage = ((bnnk - bnnkStartPrice) / bnnkStartPrice) * 100;
    const paplPercentage = ((papl - paplStartPrice) / paplStartPrice) * 100;
    const slvPercentage = ((slv - slvStartPrice) / slvStartPrice) * 100;

    bnnkProfit.innerHTML = "+" + bnnkPercentage.toFixed(2) + "%";
    paplProfit.innerHTML = "+" + paplPercentage.toFixed(2) + "%";
    slvProfit.innerHTML = "+" + slvPercentage.toFixed(2) + "%";

    // تحديث الإجمالي
    updatePortfolio();
}

// تشغيل مبدئي وتحديث كل 2.5 ثانية
updatePortfolio();
updateStocks();
setInterval(updateStocks, 2500);


// =====================================================
// NAVIGATION EVENTS
// =====================================================

document.getElementById("profileNav").addEventListener("click", function () {
    showPage(profilePage);
});

document.getElementById("backHomeBtn").addEventListener("click", function () {
    showPage(portfolioPage);
});
