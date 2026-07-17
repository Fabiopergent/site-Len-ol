document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. NAVBAR INTERATIVA (Mudança de cor no scroll)
       ========================================================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. MENU HAMBÚRGUER (Mobile)
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       3. SCROLLSPY (Link Ativo Dinâmico)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       4. CONTADORES ANIMADOS
       ========================================================================== */
    const counterNumbers = document.querySelectorAll('.numero-card h3');
    const startCounting = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const speed = target / 80;

        const updateCount = () => {
            count += speed;
            if (count < target) {
                el.innerText = '+' + Math.floor(count).toLocaleString('pt-BR');
                setTimeout(updateCount, 15);
            } else {
                el.innerText = '+' + target.toLocaleString('pt-BR');
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterNumbers.forEach(num => observer.observe(num));

    /* ==========================================================================
       5. LIGHTBOX DA GALERIA
       ========================================================================== */
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galeriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            lightboxImg.setAttribute('src', src);
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== lightboxClose) {
            lightbox.classList.remove('active');
        }
    });

    /* ==========================================================================
       6. CARROSSEL DE DEPOIMENTOS
       ========================================================================== */
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    };

    const nextSlide = () => {
        showSlide((currentSlide + 1) % slides.length);
    };

    const startCarousel = () => { slideInterval = setInterval(nextSlide, 5000); };
    const resetCarousel = () => { clearInterval(slideInterval); startCarousel(); };

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.getAttribute('data-slide')));
            resetCarousel();
        });
    });

    startCarousel();

    /* ==========================================================================
       7. ACCORDION DO FAQ
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = null;
                item.classList.remove('active');
            } else {
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                });
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       8. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const form = document.getElementById('contact-form');
    const nome = document.getElementById('form-nome');
    const email = document.getElementById('form-email');
    const tel = document.getElementById('form-tel');
    const cidade = document.getElementById('form-cidade');
    const estado = document.getElementById('form-estado');
    const mensagem = document.getElementById('form-mensagem');

    const showError = (inputEl, errorEl, msg) => {
        errorEl.innerText = msg;
        errorEl.style.display = 'block';
        inputEl.style.borderColor = '#E63946';
    };

    const hideError = (inputEl, errorEl) => {
        errorEl.style.display = 'none';
        inputEl.style.borderColor = 'rgba(15, 30, 54, 0.1)';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (nome.value.trim() === '') {
            showError(nome, document.getElementById('error-nome'), 'Insira seu nome completo.');
            isValid = false;
        } else { hideError(nome, document.getElementById('error-nome')); }

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.value.trim())) {
            showError(email, document.getElementById('error-email'), 'Insira um e-mail válido.');
            isValid = false;
        } else { hideError(email, document.getElementById('error-email')); }

        if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(tel.value.trim())) {
            showError(tel, document.getElementById('error-tel'), 'Use o formato (00) 00000-0000.');
            isValid = false;
        } else { hideError(tel, document.getElementById('error-tel')); }

        if (cidade.value.trim() === '') {
            showError(cidade, document.getElementById('error-cidade'), 'Insira sua cidade.');
            isValid = false;
        } else { hideError(cidade, document.getElementById('error-cidade')); }

        if (estado.value.trim() === '' || estado.value.trim().length > 2) {
            showError(estado, document.getElementById('error-estado'), 'Insira a UF (2 letras).');
            isValid = false;
        } else { hideError(estado, document.getElementById('error-estado')); }

        if (mensagem.value.trim().length < 20) {
            showError(mensagem, document.getElementById('error-mensagem'), 'Mínimo de 20 caracteres.');
            isValid = false;
        } else { hideError(mensagem, document.getElementById('error-mensagem')); }

        if (isValid) {
            const toast = document.getElementById('success-toast');
            toast.classList.add('active');
            form.reset();
            setTimeout(() => toast.classList.remove('active'), 5000);
        }
    });

    /* ==========================================================================
       9. BOTÃO VOLTAR AO TOPO
       ========================================================================== */
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { backToTop.classList.add('active'); } 
        else { backToTop.classList.remove('active'); }
    });

    /* ==========================================================================
       10. ANO AUTOMÁTICO DO RODAPÉ
       ========================================================================== */
    document.getElementById('current-year').innerText = new Date().getFullYear();
});