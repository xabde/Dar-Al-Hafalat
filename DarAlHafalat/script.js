// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger pour mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Fermer le menu mobile quand un lien est cliqué
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Gestion de la recherche
    const searchBtn = document.querySelector('#search-btn');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('#search-input');

    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });

        // Fermer la recherche quand on clique ailleurs
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });

        // Prévenir la propagation du clic dans le conteneur de recherche
        searchContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Scroll doux pour les liens d'ancrage
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validation du formulaire
    const reservationForm = document.querySelector('#reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const phone = document.querySelector('#phone').value.trim();
            const eventType = document.querySelector('#event_type').value;
            const date = document.querySelector('#date').value;
            const message = document.querySelector('#message').value.trim();
            
            // Validation basique
            if (!name || !email || !phone || !eventType || !date) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Validation du téléphone
            const phoneRegex = /^\+?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Veuillez entrer un numéro de téléphone valide.');
                return;
            }
            
            // Si toutes les validations sont passées, on peut soumettre le formulaire
            console.log('Formulaire validé, envoi des données...');
            alert('Merci pour votre réservation ! Nous vous contacterons bientôt.');
            
            // Pour un vrai envoi à Formspree, décommentez la ligne suivante
            this.submit();
        });
    }

    // Animation au défilement pour les éléments
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    }

    // Ajouter la classe 'fade-in' aux éléments à animer
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Exécuter l'animation au chargement et au défilement
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});