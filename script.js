
        /* Timeline Interactive Horizontal Scroll */
    const container = document.getElementById('timeline-container');
    const track = document.getElementById('track');

    let scrollPos = 0;

    const autoSpeed = 1.5;
    const reverseSpeed = -3.5;

    let targetSpeed = autoSpeed;
    let currentSpeed = autoSpeed;

    let isMobile = window.innerWidth <= 900;

    let isVisible = false;



    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                isVisible = true;
            } else {
                isVisible = false;
            }

        });

    }, {
        threshold: 0.1
    });

    observer.observe(container);


    /* 
       RESPONSIVE
     */

    window.addEventListener('resize', () => {

        isMobile = window.innerWidth <= 900;

        if (isMobile) {
            track.style.transform = 'none';
        }

    });


    /*
     mouse control
     */

    container.addEventListener('mousemove', (e) => {

        if (isMobile || !isVisible) return;

        const rect = container.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const width = rect.width;


        // gauche
        if (mouseX < width * 0.25) {

            targetSpeed = reverseSpeed;

        }

        // milieu
        else if (
            mouseX > width * 0.3 &&
            mouseX < width * 0.7
        ) {

            targetSpeed = 0;

        }

        // droite
        else {

            targetSpeed = autoSpeed * 1.5;

        }

    });


    /* 
       mouse leave
     */

    container.addEventListener('mouseleave', () => {

        if (!isMobile) {
            targetSpeed = autoSpeed;
        }

    });


    
    function animateScroll() {

        // Animation uniquement si timeline visible
        if (!isMobile && isVisible) {

            currentSpeed +=
                (targetSpeed - currentSpeed) * 0.05;

            scrollPos += currentSpeed;


            const maxScroll = Math.max(
                0,
                track.scrollWidth - container.clientWidth
            );


            // début
            if (scrollPos < 0) {

                scrollPos = 0;
                currentSpeed = 0;

            }

            // fin
            else if (scrollPos >= maxScroll) {

                scrollPos = maxScroll;
                currentSpeed = 0;

            }


            track.style.transform =
                `translateX(-${scrollPos}px)`;

        }


        requestAnimationFrame(animateScroll);
    }


    // animation start
    animateScroll();




        /* center img Zoom  */
        const slider = document.getElementById('projectSlider');
        const cards = document.querySelectorAll('.project-card');
        const slideLeft = document.getElementById('slideLeft');
        const slideRight = document.getElementById('slideRight');

        function checkCenterCard() {
            if (!slider || cards.length === 0) return;
            
            const sliderRect = slider.getBoundingClientRect();
            const sliderCenter = sliderRect.left + (sliderRect.width / 2);
            
            let closestCard = null;
            let minDistance = Infinity;

            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + (cardRect.width / 2);
                const distance = Math.abs(sliderCenter - cardCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            });

            cards.forEach(card => card.classList.remove('center-card'));
            if (closestCard) {
                closestCard.classList.add('center-card');
            }
        }

        slider.addEventListener('scroll', checkCenterCard);
        window.addEventListener('resize', checkCenterCard);
        
        setTimeout(checkCenterCard, 100);

        slideLeft.addEventListener('click', () => {
            const cardWidth = cards[0].offsetWidth + 25;
            slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        slideRight.addEventListener('click', () => {
            const cardWidth = cards[0].offsetWidth + 25;
            slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        const refTrack = document.getElementById('refTrack');
        let refIndex = 0;
        const totalGroups = 3;

        setInterval(() => {
            refIndex++;
            refTrack.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            refTrack.style.transform = `translateX(-${refIndex * 100}%)`;

            if (refIndex === totalGroups) {
                setTimeout(() => {
                    refTrack.style.transition = 'none';
                    refTrack.style.transform = 'translateX(0)';
                    refIndex = 0;
                }, 700);
            }
        }, 4000);

