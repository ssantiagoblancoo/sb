document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-block');
    const navLinks = document.querySelectorAll('#side-bar a');
    const sidebar = document.getElementById('side-bar');
    const overlayText = document.querySelector('.overlay-text');
    const moon = document.querySelector('.moon');
    const subsections = document.querySelector('.subsections');
    const animatedText = document.querySelector('.animated-text');
    const stretchedText = document.querySelector('.stretched-text');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const scaleFactor = 1 + scrollPosition / 100; // Adjust the divisor to control the scaling speed
        const opacityFactor = 1 - scrollPosition / 500; // Adjust the divisor to control the fade-out speed

        if (opacityFactor > 0) {
            overlayText.style.transform = `translate(-50%, -50%) scaleY(${scaleFactor})`;
        }
        overlayText.style.opacity = opacityFactor;
        moon.style.opacity = opacityFactor;

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Toggle sidebar visibility
        const div1Top = document.getElementById('div1').offsetTop;
        if (pageYOffset >= div1Top - window.innerHeight / 2) {
            sidebar.classList.add('visible');
        } else {
            sidebar.classList.remove('visible');
        }

        // Show subsections when scrolling to div2
        const div2Top = document.getElementById('div2').offsetTop;
        const div2Height = document.getElementById('div2').clientHeight;
        if (pageYOffset >= div2Top - div2Height / 3) {
            subsections.style.display = 'block';
            animatedText.textContent = 'Running script...';
            setTimeout(() => {
                animatedText.textContent = 'Loading projects...';
                setTimeout(() => {
                    animatedText.style.display = 'none';
                    stretchedText.style.opacity = 1;
                }, 2000);
            }, 2000);
        } else {
            subsections.style.display = 'none';
            animatedText.style.display = 'block';
            stretchedText.style.opacity = 0;
        }
    });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSubsections(event) {
    event.preventDefault();
    const subsections = event.target.nextElementSibling;
    if (subsections.style.display === 'none' || subsections.style.display === '') {
        subsections.style.display = 'block';
    } else {
        subsections.style.display = 'none';
    }
}