document.addEventListener('DOMContentLoaded', function () {
    // ��� ���� ������� ��������
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // ����� ��� �������
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

    // ��� �������� ������ ��������
    const homeSlides = document.querySelectorAll('#home .slide');
    let currentHomeSlide = 0;
    let homeSlideInterval;

    function startHomeSlider() {
        if (homeSlides.length > 0) {
            // ����� ������ ������ ������
            homeSlides[0].classList.add('active');

            // ��� ��������
            homeSlideInterval = setInterval(() => {
                homeSlides[currentHomeSlide].classList.remove('active');
                currentHomeSlide = (currentHomeSlide + 1) % homeSlides.length;
                homeSlides[currentHomeSlide].classList.add('active');
            }, 4000);
        }
    }

    // ������ ��� �� ���
    const aboutSlides = document.querySelectorAll('.about-slideshow .slide');
    let currentAboutSlide = 0;
    let aboutSlideInterval;

    function startAboutSlider() {
        if (aboutSlides.length > 0) {
            // ����� ������ ������ ������
            aboutSlides[0].classList.add('active');

            // ��� ��������
            aboutSlideInterval = setInterval(() => {
                aboutSlides[currentAboutSlide].classList.remove('active');
                currentAboutSlide = (currentAboutSlide + 1) % aboutSlides.length;
                aboutSlides[currentAboutSlide].classList.add('active');
            }, 3000);
        }
    }

    // ��� ������� �������
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

    // ��� ���� ���������� ��� ����� ������
    startHomeSlider();
    startAboutSlider();

    // ����� ����� ���������� ��� ����� ��� �������
    window.addEventListener('resize', function () {
        clearInterval(homeSlideInterval);
        clearInterval(aboutSlideInterval);
        startHomeSlider();
        startAboutSlider();
    });
});