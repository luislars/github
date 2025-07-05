document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleButton.querySelector('i');

    // Función para aplicar el tema y guardar la preferencia
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.remove('icon-moon');
            icon.classList.add('icon-sun');
            themeToggleButton.setAttribute('aria-label', 'Activar modo claro');
            themeToggleButton.setAttribute('title', 'Activar modo claro');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            icon.classList.remove('icon-sun');
            icon.classList.add('icon-moon');
            themeToggleButton.setAttribute('aria-label', 'Activar modo oscuro');
            themeToggleButton.setAttribute('title', 'Activar modo oscuro');
            localStorage.setItem('theme', 'light');
        }
    }

    // Cargar el tema guardado o detectar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Por defecto tema claro si no hay nada guardado ni preferencia de sistema
    }

    // Event listener para el botón
    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    });

    // Escuchar cambios en la preferencia de sistema (si el usuario la cambia mientras la página está abierta)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Solo cambia si no hay una preferencia explícita guardada por el usuario
        if (!localStorage.getItem('theme')) {
            if (event.matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
        }
    });
});
