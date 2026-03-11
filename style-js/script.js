const grid = document.querySelector('.product-grid');
const dots = document.querySelectorAll('.dot');
let currentStep = 0;
let isUserScrolling = false;

// 1. 自动滚动函数
function autoScroll() {
    if (isUserScrolling) return; // 如果用户正在操作，跳过本次自动滚动

    const cards = document.querySelectorAll('.product-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const maxSteps = cards.length - (window.innerWidth > 768 ? 4 : 2); // 电脑减4，手机减2

    currentStep++;
    if (currentStep > maxSteps) currentStep = 0;

    grid.scrollTo({
        left: currentStep * cardWidth,
        behavior: 'smooth'
    });
}

// 2. 监听手动滚动，同步小圆点
grid.addEventListener('scroll', () => {
    const cardWidth = document.querySelector('.product-card').offsetWidth;
    // 计算当前滚动到了第几个 index
    const index = Math.round(grid.scrollLeft / cardWidth);
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === (index % dots.length));
    });
});

// 3. 处理手动与自动的冲突
grid.addEventListener('touchstart', () => {
    isUserScrolling = true; // 用户手指碰到屏幕，停止自动走
});

grid.addEventListener('touchend', () => {
    // 手指离开 8 秒后，重新开启自动滚动
    setTimeout(() => { isUserScrolling = false; }, 8000);
});

// 轮播定时器
let scrollTimer = setInterval(autoScroll, 8000);

// 鼠标悬停（电脑端）
grid.addEventListener('mouseenter', () => clearInterval(scrollTimer));
grid.addEventListener('mouseleave', () => {
    clearInterval(scrollTimer); // 先确保旧的彻底死了
    scrollTimer = setInterval(autoScroll, 8000); // 再起个新的
});