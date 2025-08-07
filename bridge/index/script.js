document.addEventListener('DOMContentLoaded', function () {
    // ÌáÈ ÌãíÚ ÇáÑæÇÈØ æÇáÃŞÓÇã
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // ÅÖÇİÉ ÍÏË ÇáÊãÑíÑ
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ßæÏ ÇáÓáÇíÏÑ ááÕİÍÉ ÇáÑÆíÓíÉ
    const homeSlides = document.querySelectorAll('#home .slide');
    let currentHomeSlide = 0;
    let homeSlideInterval;

    function startHomeSlider() {
        if (homeSlides.length > 0) {
            // ÅÙåÇÑ ÇáÕæÑÉ ÇáÃæáì ãÈÇÔÑÉ
            homeSlides[0].classList.add('active');

            // ÈÏÁ ÇáÓáÇíÏÑ
            homeSlideInterval = setInterval(() => {
                homeSlides[currentHomeSlide].classList.remove('active');
                currentHomeSlide = (currentHomeSlide + 1) % homeSlides.length;
                homeSlides[currentHomeSlide].classList.add('active');
            }, 4000);
        }
    }

    // ÓáÇíÏÑ ŞÓã ãä äÍä
    const aboutSlides = document.querySelectorAll('.about-slideshow .slide');
    let currentAboutSlide = 0;
    let aboutSlideInterval;

    function startAboutSlider() {
        if (aboutSlides.length > 0) {
            // ÅÙåÇÑ ÇáÕæÑÉ ÇáÃæáì ãÈÇÔÑÉ
            aboutSlides[0].classList.add('active');

            // ÈÏÁ ÇáÓáÇíÏÑ
            aboutSlideInterval = setInterval(() => {
                aboutSlides[currentAboutSlide].classList.remove('active');
                currentAboutSlide = (currentAboutSlide + 1) % aboutSlides.length;
                aboutSlides[currentAboutSlide].classList.add('active');
            }, 3000);
        }
    }

    // ßæÏ ÇáÃÓÆáÉ ÇáÔÇÆÚÉ
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');

            const answer = faqItem.querySelector('.faq-answer');
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // ÈÏÁ ÌãíÚ ÇáÓáÇíÏÑÇÊ ÚäÏ ÊÍãíá ÇáÕİÍÉ
    startHomeSlider();
    startAboutSlider();

    // ÅÚÇÏÉ ÊåíÆÉ ÇáÓáÇíÏÑÇÊ ÚäÏ ÊÛííÑ ÍÌã ÇáäÇİĞÉ
    window.addEventListener('resize', function () {
        clearInterval(homeSlideInterval);
        clearInterval(aboutSlideInterval);
        startHomeSlider();
        startAboutSlider();
    });
});