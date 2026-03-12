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

// 头部右侧图片，语言选择和购物车
// 1. 初始化图标 (必须有这行，否则图标不显示)
lucide.createIcons();

// 2. 语言下拉菜单控制
// 1. 获取所有需要的元素
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
const langText = document.querySelector('.lang-text'); // 确保 HTML 里有这个 class
const langOptions = document.querySelectorAll('.lang-dropdown span');

if (langBtn && langMenu) {
    // 2. 点击地球区域：切换下拉菜单的显示/隐藏
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止点击事件冒泡到 document
        langMenu.classList.toggle('show');
    });

    // 3. 点击菜单选项：切换文字内容并关闭菜单
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // 避免触发父级的 toggle 导致菜单关了又开
            
            // 更新显示的文本
            if (langText) {
                if (option.textContent.includes('English')) {
                    langText.textContent = 'EN';
                } else if (option.textContent.includes('中文')) {
                    langText.textContent = '中文';
                }
            }
            
            // 选完后自动隐藏菜单
            langMenu.classList.remove('show');
        });
    });

    // 4. 点击页面其他地方：强制隐藏菜单
    document.addEventListener('click', () => {
        langMenu.classList.remove('show');
    });
}