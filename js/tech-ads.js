// Tech Ads Section - Interactivity

document.addEventListener('DOMContentLoaded', function() {
    const adSlots = document.querySelectorAll('.ad-slot');
    
    // Adiciona efeito de clique em cada slot de anúncio
    adSlots.forEach((slot, index) => {
        slot.addEventListener('click', function() {
            const adLink = this.querySelector('.ad-link');
            if (adLink) {
                // Você pode adicionar lógica aqui para redirecionar ou abrir modal
                console.log(`Ad slot ${index + 1} clicado`);
                // Exemplo: window.open(adLink.href, '_blank');
            }
        });
    });

    // Animação de entrada para os slots
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    adSlots.forEach((slot, index) => {
        slot.style.opacity = '0';
        slot.style.animationDelay = `${index * 0.1}s`;
        observer.observe(slot);
    });
});

// Adiciona a animação CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
