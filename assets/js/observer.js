document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 750) {
        const cards = document.querySelectorAll('.register__stages-card');
        
        cards.forEach(card => {
            card.style.transition = 'transform 0.3s';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    entry.target.style.transform = 'scale(1.1)';
                } else {
                    entry.target.style.transform = 'scale(1)';
                }
            });
        }, {
            threshold: [0, 1]
        });

        cards.forEach(card => observer.observe(card));
    }
});
