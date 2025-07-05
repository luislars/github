document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Comprobación: Asegurarse de que el botón de tema exista en el DOM.
    if (!themeToggleButton) {
        console.error('Error: El botón de conmutación de tema con ID "theme-toggle" no fue encontrado.');
        return; // Detener la ejecución si el botón no existe para evitar más errores.
    }

    const icon = themeToggleButton.querySelector('.theme-icon'); // Selección del icono usando su nueva clase específica.

    // Comprobación: Asegurarse de que el icono dentro del botón exista.
    if (!icon) {
        console.error('Error: El elemento para el icono (con clase "theme-icon") no fue encontrado dentro del botón de tema.');
        return; // Detener la ejecución si el icono no existe.
    }

    // Función para aplicar el tema (claro u oscuro) y guardar la preferencia del usuario.
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.remove('bi-moon-stars-fill'); // Clase de Bootstrap Icons para luna
            icon.classList.add('bi-sun-fill');         // Clase de Bootstrap Icons para sol
            themeToggleButton.setAttribute('aria-label', 'Activar modo claro');
            themeToggleButton.setAttribute('title', 'Activar modo claro');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            icon.classList.remove('bi-sun-fill');         // Clase de Bootstrap Icons para sol
            icon.classList.add('bi-moon-stars-fill'); // Clase de Bootstrap Icons para luna
            themeToggleButton.setAttribute('aria-label', 'Activar modo oscuro');
            themeToggleButton.setAttribute('title', 'Activar modo oscuro');
            localStorage.setItem('theme', 'light');
        }
    }

    // Lógica para determinar y aplicar el tema inicial al cargar la página.
    // Prioridad: 1. Tema guardado en localStorage, 2. Preferencia del sistema, 3. Tema claro por defecto.
    const savedTheme = localStorage.getItem('theme'); // Intenta obtener el tema guardado por el usuario.
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // Comprueba si el sistema operativo prefiere el modo oscuro.

    if (savedTheme) {
        // Si hay un tema guardado, aplicarlo.
        applyTheme(savedTheme);
    } else if (prefersDark) {
        // Si no hay tema guardado pero el sistema prefiere oscuro, aplicar modo oscuro.
        applyTheme('dark');
    } else {
        // Por defecto (o si el sistema prefiere claro y no hay nada guardado), aplicar modo claro.
        applyTheme('light');
    }

    // Añadir el manejador de eventos al botón de conmutación de tema.
    themeToggleButton.addEventListener('click', () => {
        // Comprobar si el cuerpo ya tiene la clase 'dark-mode'.
        if (body.classList.contains('dark-mode')) {
            // Si está en modo oscuro, cambiar a modo claro.
            applyTheme('light');
        } else {
            // Si está en modo claro, cambiar a modo oscuro.
            applyTheme('dark');
        }
    });

    // Escuchar cambios en la preferencia de color del sistema operativo.
    // Esto permite que el tema del sitio se actualice automáticamente si el usuario cambia la configuración de su SO
    // mientras la página está abierta, pero SOLO si el usuario no ha establecido una preferencia explícita en el sitio.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Solo se actualiza el tema si el usuario NO ha guardado una preferencia explícita en localStorage.
        // Esto evita sobrescribir la elección del usuario en el sitio.
        if (!localStorage.getItem('theme')) {
            if (event.matches) { // Si el sistema ahora prefiere el modo oscuro.
                applyTheme('dark');
            } else { // Si el sistema ahora prefiere el modo claro.
                applyTheme('light');
            }
        }
    });

    // Lógica para el Modal de Contacto
    const contactModal = document.getElementById('contact-modal');
    const contactLink = document.getElementById('contact-link');
    const closeModalButton = contactModal ? contactModal.querySelector('.modal-close') : null;
    const contactForm = document.getElementById('contact-form');

    // Comprobaciones para los elementos del modal
    if (!contactModal) {
        console.warn('Advertencia: El elemento del modal de contacto con ID "contact-modal" no fue encontrado.');
    }
    if (!contactLink) {
        console.warn('Advertencia: El enlace para abrir el modal de contacto con ID "contact-link" no fue encontrado.');
    }
    if (contactModal && !closeModalButton) {
        console.warn('Advertencia: El botón de cierre del modal (con clase "modal-close") no fue encontrado dentro de #contact-modal.');
    }
    if (!contactForm) {
        console.warn('Advertencia: El formulario de contacto con ID "contact-form" no fue encontrado.');
    }

    // Función para abrir el modal
    function openModal() {
        if (contactModal) {
            contactModal.classList.add('is-open');
            // Opcional: enfocar el primer campo del formulario al abrir
            const firstInput = contactModal.querySelector('input, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }
    }

    // Función para cerrar el modal
    function closeModal() {
        if (contactModal) {
            contactModal.classList.remove('is-open');
        }
    }

    // Event listener para abrir el modal
    if (contactLink) {
        contactLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace (#)
            openModal();
        });
    }

    // Event listener para cerrar el modal con el botón 'X'
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Event listener para cerrar el modal haciendo clic fuera de modal-content
    if (contactModal) {
        contactModal.addEventListener('click', (event) => {
            // Si el clic fue directamente sobre el fondo del modal (y no en su contenido)
            if (event.target === contactModal) {
                closeModal();
            }
        });
    }

    // Event listener para el envío del formulario (por ahora solo cierra el modal)
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevenir el envío real del formulario
            // Aquí iría la lógica de envío de datos del formulario (AJAX, etc.)
            // Por ahora, solo mostramos un mensaje y cerramos el modal.
            alert('Mensaje enviado (simulación). ¡Gracias por contactarnos!');
            closeModal();
            contactForm.reset(); // Limpiar el formulario
        });
    }
});
