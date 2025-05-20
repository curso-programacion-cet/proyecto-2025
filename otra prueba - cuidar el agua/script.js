// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // --------- Animación para el menú de navegación ---------
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el destino del desplazamiento desde el atributo href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Desplazamiento suave hacia el elemento
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste para el menú fijo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --------- Contador de ahorro de agua ---------
    const waterdropCounter = {
        dropsSaved: 0,
        litersPerDrop: 0.05, // Cada gota estimada en 0.05 litros
        
        // Incrementar el contador de gotas
        saveWaterDrop: function() {
            this.dropsSaved++;
            this.updateCounter();
        },
        
        // Actualizar el contador en la interfaz
        updateCounter: function() {
            const liters = (this.dropsSaved * this.litersPerDrop).toFixed(2);
            const counterElement = document.getElementById('water-counter');
            
            if (counterElement) {
                counterElement.textContent = `Has ahorrado aproximadamente ${liters} litros de agua desde tu visita`;
            }
        },
        
        // Inicializar el contador
        init: function() {
            // Crear el elemento del contador si no existe
            if (!document.getElementById('water-counter')) {
                const counterContainer = document.createElement('div');
                counterContainer.className = 'water-counter-container';
                
                const counterElement = document.createElement('p');
                counterElement.id = 'water-counter';
                counterElement.textContent = 'Has ahorrado aproximadamente 0.00 litros de agua desde tu visita';
                
                counterContainer.appendChild(counterElement);
                
                // Insertarlo antes del footer
                const footer = document.querySelector('footer');
                document.body.insertBefore(counterContainer, footer);
                
                // Estilizar el contador
                counterContainer.style.backgroundColor = '#e6f7ff';
                counterContainer.style.padding = '15px';
                counterContainer.style.textAlign = 'center';
                counterContainer.style.margin = '0 auto 20px';
                counterContainer.style.maxWidth = '600px';
                counterContainer.style.borderRadius = '8px';
                counterContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                counterContainer.style.fontWeight = 'bold';
                counterContainer.style.color = '#0077be';
            }
            
            // Incrementar el contador cada 5 segundos para simular ahorro de agua
            setInterval(() => this.saveWaterDrop(), 5000);
        }
    };
    
    // --------- Validación del formulario de contacto ---------
    // Esta función se activará si decides añadir un formulario más adelante
    function setupContactForm() {
        const contactButton = document.querySelector('.contact-button');
        
        if (contactButton) {
            contactButton.addEventListener('click', function(e) {
                // Si hay un formulario, podemos añadir validación aquí
                // De momento, solo añadimos una alerta al hacer clic en el botón
                // para demostrar la interactividad
                alert('¡Gracias por tu interés en contactarnos! Juntos podemos hacer la diferencia en el cuidado del agua.');
                
                // Si el botón es un mailto, permitimos que continúe su comportamiento predeterminado
                if (!this.getAttribute('href').startsWith('mailto:')) {
                    e.preventDefault();
                }
            });
        }
    }
    
    // --------- Funcionalidad para el carrusel de Bootstrap ---------
    function setupCarousel() {
        // Inicialización del carrusel
        const carousel = document.getElementById('carouselAgua');
        
        if (carousel) {
            // El carrusel ya viene inicializado con Bootstrap
            // Solo agregamos funcionalidad adicional si es necesario
            
            // Por ejemplo, cambiar automáticamente las imágenes cada 5 segundos
            const carouselInstance = new bootstrap.Carousel(carousel, {
                interval: 5000,
                wrap: true
            });
            
            // Agregar efecto de pausa al pasar el ratón
            carousel.addEventListener('mouseenter', function() {
                carouselInstance.pause();
            });
            
            carousel.addEventListener('mouseleave', function() {
                carouselInstance.cycle();
            });
            
            // Hacer que las imágenes sean más grandes en pantallas pequeñas al hacer clic
            const carouselItems = carousel.querySelectorAll('.carousel-item img');
            
            carouselItems.forEach(img => {
                img.addEventListener('click', function() {
                    // En dispositivos móviles, hacer que las imágenes tengan un comportamiento especial
                    if (window.innerWidth <= 768) {
                        if (this.style.height === '100vh') {
                            this.style.height = '300px';
                        } else {
                            this.style.height = '100vh';
                            this.style.objectFit = 'contain';
                            this.style.backgroundColor = 'rgba(0,0,0,0.8)';
                        }
                    }
                });
            });
        }
    }
    
    // --------- Consejos aleatorios sobre el cuidado del agua ---------
    const waterTips = {
        tips: [
            "Cierra la llave mientras te cepillas los dientes y ahorrarás hasta 12 litros de agua.",
            "Una ducha de 5 minutos consume 95 litros menos que un baño completo.",
            "Reparar una fuga en un grifo puede ahorrar más de 12,000 litros de agua al año.",
            "Usa una regadera para regar las plantas en lugar de una manguera.",
            "Lavar frutas y verduras en un recipiente en lugar de bajo el grifo ahorra hasta 20 litros por lavado.",
            "Instalar aireadores en los grifos puede reducir el consumo hasta un 50%.",
            "Reutiliza el agua de la lluvia para regar tu jardín.",
            "El agua utilizada para lavar frutas y verduras puede usarse para regar plantas.",
            "Una carga completa de lavadora usa menos agua que dos medias cargas.",
            "Instala un sistema de doble descarga en el inodoro para usar solo el agua necesaria."
        ],
        
        // Mostrar un consejo aleatorio
        displayRandomTip: function() {
            const tipContainer = document.getElementById('random-tip');
            if (tipContainer) {
                const randomIndex = Math.floor(Math.random() * this.tips.length);
                tipContainer.textContent = this.tips[randomIndex];
            }
        },
        
        // Inicializar el contenedor de consejos
        init: function() {
            if (!document.getElementById('random-tip-container')) {
                const tipSection = document.createElement('div');
                tipSection.id = 'random-tip-container';
                tipSection.className = 'tip-container';
                
                const tipTitle = document.createElement('h3');
                tipTitle.textContent = '¿Sabías que?';
                
                const tipContent = document.createElement('p');
                tipContent.id = 'random-tip';
                
                const refreshButton = document.createElement('button');
                refreshButton.textContent = 'Otro consejo';
                refreshButton.className = 'refresh-tip';
                
                tipSection.appendChild(tipTitle);
                tipSection.appendChild(tipContent);
                tipSection.appendChild(refreshButton);
                
                // Insertar después de la sección de consejos
                const consejosSection = document.getElementById('consejos');
                if (consejosSection) {
                    consejosSection.parentNode.insertBefore(tipSection, consejosSection.nextSibling);
                } else {
                    // Si no encuentra la sección, lo añade antes del footer
                    const footer = document.querySelector('footer');
                    document.body.insertBefore(tipSection, footer);
                }
                
                // Estilizar el contenedor de consejos
                tipSection.style.backgroundColor = '#ffcc00';
                tipSection.style.color = '#333';
                tipSection.style.padding = '20px';
                tipSection.style.maxWidth = '800px';
                tipSection.style.margin = '30px auto';
                tipSection.style.borderRadius = '10px';
                tipSection.style.textAlign = 'center';
                tipSection.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                
                tipContent.style.fontSize = '18px';
                tipContent.style.fontWeight = '500';
                tipContent.style.margin = '15px 0';
                
                refreshButton.style.backgroundColor = '#0077be';
                refreshButton.style.color = 'white';
                refreshButton.style.border = 'none';
                refreshButton.style.padding = '10px 20px';
                refreshButton.style.borderRadius = '30px';
                refreshButton.style.cursor = 'pointer';
                refreshButton.style.fontWeight = 'bold';
                refreshButton.style.transition = 'all 0.3s ease';
                
                refreshButton.addEventListener('mouseover', function() {
                    this.style.backgroundColor = '#005c91';
                });
                
                refreshButton.addEventListener('mouseout', function() {
                    this.style.backgroundColor = '#0077be';
                });
                
                // Evento para mostrar un nuevo consejo al hacer clic
                refreshButton.addEventListener('click', () => this.displayRandomTip());
            }
            
            // Mostrar el primer consejo
            this.displayRandomTip();
        }
    };
    
    // Inicializar todas las funcionalidades
    setupContactForm();
    setupCarousel();
    waterdropCounter.init();
    waterTips.init();
});

// Efecto de animación para elementos al hacer scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.tip-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Configuración inicial para efectos de animación
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.tip-card');
    
    elements.forEach(element => {
        // Estilo inicial para los elementos que se animarán
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Activar animación para elementos que ya están visibles al cargar
    setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
    }, 200);
});