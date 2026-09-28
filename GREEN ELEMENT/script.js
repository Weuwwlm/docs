// ===== ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ =====
(function initScrollAnimation() {
    // Выбираем элементы для анимации
    const elements = document.querySelectorAll(
        '.catalog-card, .usp__item, .hero__content, .category-card, ' +
        '.ge198-block, .ge47-block, .ge20-block, .technology-block'
    );

    // Если IntersectionObserver не поддерживается — просто показываем всё
    if (!('IntersectionObserver' in window)) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0,             // ← срабатывает, даже если видно 1px
        rootMargin: '0px 0px -50px 0px'  // ← чуть раньше нижнего края
    });

    elements.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
})();
// ===== МОБИЛЬНОЕ МЕНЮ =====
(function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mobileNav');
    if (!burger || !nav) return;

    // Создаём затемнение
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const closeMenu = () => {
        burger.classList.remove('is-active');
        nav.classList.remove('is-open');
        overlay.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        burger.classList.add('is-active');
        nav.classList.add('is-open');
        overlay.classList.add('is-open');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    // Открытие/закрытие по бургеру
    burger.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Закрытие по клику на затемнение
    overlay.addEventListener('click', closeMenu);

    // ===== ДРОПДАУН "Продукция" НА МОБИЛЬНЫХ =====
    const dropdownItem = nav.querySelector('.nav__item--dropdown');
    const dropdownLink = dropdownItem?.querySelector('.nav__link');

    if (dropdownItem && dropdownLink) {
        dropdownLink.addEventListener('click', (e) => {
            // Раскрываем только на мобильных
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownItem.classList.toggle('is-open');
            }
            // На десктопе — работает hover, ничего не делаем
        });
    }

    // ===== ЗАКРЫТИЕ МЕНЮ ПОСЛЕ ПЕРЕХОДА ПО ССЫЛКЕ =====
    // Просто закрываем меню, НЕ мешая переходу
    nav.querySelectorAll('.nav__dropdown a, .nav__list > .nav__item:not(.nav__item--dropdown) a').forEach((link) => {
        link.addEventListener('click', () => {
            // Не блокируем переход, просто закрываем через 200мс
            // к этому моменту браузер уже начал переход
            closeMenu();
        });
    });

    // ===== ЗАКРЫТИЕ ПРИ РАСШИРЕНИИ ЭКРАНА =====
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
})();