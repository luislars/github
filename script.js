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

    // Event listener para el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            // Al usar Formspree con un 'action' y 'method' en el HTML,
            // no necesitamos JavaScript para manejar el envío en sí.
            // El navegador se encargará de hacer el POST a Formspree.
            // Formspree luego mostrará su página de "gracias" o redirigirá
            // a la URL que hayas configurado en tu cuenta de Formspree.

            // Opcionalmente, podríamos cerrar el modal aquí justo antes de que el navegador envíe el formulario,
            // aunque la navegación a la página de Formspree lo hará irrelevante.
            // Si quisiéramos una experiencia más fluida donde el modal se cierra y LUEGO se envía
            // (útil si Formspree estuviera configurado para AJAX y no redirigiera),
            // necesitaríamos un `event.preventDefault()` y manejar el envío con `fetch` o `XMLHttpRequest`.
            // Pero para un envío HTML simple, no es necesario.

            // Considera que después de un envío exitoso a Formspree, el usuario
            // normalmente no regresa a la misma instancia de la página donde estaba el modal abierto.
            // Por lo tanto, limpiar el formulario (`contactForm.reset()`) o cerrar el modal (`closeModal()`)
            // aquí tiene un efecto limitado en la experiencia post-envío.
            // Sin embargo, si el usuario usa el botón "atrás" del navegador después de ver la página de "gracias" de Formspree,
            // podría ser útil que el modal estuviera cerrado y el formulario limpio.
            // Para este caso, un pequeño delay podría ser una opción, aunque no es lo ideal.

            // Por ahora, para mantenerlo simple y confiar en el flujo de Formspree:
            // No se requiere ninguna acción de JavaScript aquí para el envío.
            // Se podría añadir un indicador de "Enviando..." si se desea, pero eso
            // complicaría el script innecesariamente para un envío HTML estándar.
            console.log('Formulario de contacto enviado a Formspree (o lo intentará el navegador).');
            // No llamamos a closeModal() ni a contactForm.reset() aquí para permitir
            // que el navegador maneje la acción del formulario completamente.
        });
    }

    // Función para actualizar el año del copyright automáticamente
    function updateCopyrightYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        } else {
            console.warn('Advertencia: Elemento con ID "current-year" no encontrado para actualizar el año del copyright.');
        }
    }

    // Llamar a las funciones que deben ejecutarse al cargar el DOM
    updateCopyrightYear(); // Actualiza el año del copyright

    // -------------------------------------------------------------------------- //
    //                             LÓGICA DEL CARRITO DE COMPRAS                  //
    // -------------------------------------------------------------------------- //
    let cart = []; // Array para almacenar los productos del carrito

    // Función para añadir un producto al carrito
    // Recibe el ID, nombre, precio e imagen del producto desde los data-attributes del botón
    function addToCart(productId, name, price, image) {
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            cart[existingProductIndex].quantity += 1;
            console.log(`Cantidad actualizada para ${name}: ${cart[existingProductIndex].quantity}`);
        } else {
            // Si el producto no está, añadirlo con cantidad 1
            const product = { id: productId, name, price: parseFloat(price), image, quantity: 1 };
            cart.push(product);
            console.log('Producto añadido:', product);
        }

        saveCart();
        renderCart();
        console.log('Carrito actual:', cart);
    }

    // Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Función para cargar el carrito desde localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        } else {
            cart = []; // Inicializar como array vacío si no hay nada guardado
        }
    }

    // Función para renderizar/actualizar la visualización del carrito
    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartTotalPriceElement = document.getElementById('cart-total-price');
        const cartItemCountElement = document.getElementById('cart-item-count');
        const cartToggleBtn = document.getElementById('cart-toggle');
        const cartEmptyMessage = cartItemsContainer ? cartItemsContainer.querySelector('.cart-empty-message') : null;

        if (!cartItemsContainer || !cartTotalPriceElement || !cartItemCountElement || !cartToggleBtn) {
            console.error("Error: No se encontraron todos los elementos del DOM para el carrito.");
            return;
        }

        cartItemsContainer.innerHTML = ''; // Limpiar ítems anteriores
        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        } else {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                // TODO: Añadir controles de cantidad y botón de eliminar funcional más adelante
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Precio: $${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <label for="qty-${item.id}" class="sr-only">Cantidad para ${item.name}</label>
                            <input type="number" id="qty-${item.id}" class="cart-item-qty-input" value="${item.quantity}" min="1" max="99" data-product-id="${item.id}" aria-label="Cantidad">
                        </div>
                    </div>
                    <div class="cart-item-price-subtotal">
                        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-from-cart-btn" data-product-id="${item.id}" aria-label="Eliminar ${item.name} del carrito"><i class="bi bi-trash-fill"></i></button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;
            });
        }

        cartTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        cartItemCountElement.textContent = totalItems;

        if (totalItems > 0) {
            cartToggleBtn.classList.add('has-items');
        } else {
            cartToggleBtn.classList.remove('has-items');
        }
    }

    // Cargar y renderizar el carrito al iniciar la página
    loadCart();
    renderCart();

    // Función para eliminar un producto del carrito
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        console.log(`Producto ${productId} eliminado.`);
        saveCart();
        renderCart();
    }

    // Función para actualizar la cantidad de un producto en el carrito
    function updateQuantity(productId, quantity) {
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex > -1) {
            const newQuantity = parseInt(quantity, 10);
            if (newQuantity > 0 && newQuantity <= 99) { // Límite de cantidad
                cart[productIndex].quantity = newQuantity;
                console.log(`Cantidad de ${cart[productIndex].name} actualizada a ${newQuantity}`);
            } else if (newQuantity <= 0) {
                // Si la cantidad es 0 o menos, eliminar el producto
                return removeFromCart(productId);
            }
            // Si la cantidad es > 99, no hacer nada o mostrar un mensaje (no implementado aquí)
        }
        saveCart();
        renderCart();
    }

    // Delegación de eventos en el contenedor de ítems del carrito para botones de eliminar y cambio de cantidad
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.closest('.remove-from-cart-btn')) {
                const button = event.target.closest('.remove-from-cart-btn');
                const productId = button.dataset.productId;
                removeFromCart(productId);
            }
        });

        cartItemsContainer.addEventListener('change', (event) => {
            if (event.target.classList.contains('cart-item-qty-input')) {
                const input = event.target;
                const productId = input.dataset.productId;
                const newQuantity = parseInt(input.value, 10);
                updateQuantity(productId, newQuantity);
            }
        });
    }


    // --- Funcionalidad del Modal del Carrito ---
    const cartModal = document.getElementById('cart-modal');
    const cartToggleBtn = document.getElementById('cart-toggle');
    const closeCartModalButton = cartModal ? cartModal.querySelector('.cart-modal-close') : null;

    if (!cartModal) {
        console.warn('Advertencia: El elemento del modal de carrito con ID "cart-modal" no fue encontrado.');
    }
    if (!cartToggleBtn) {
        console.warn('Advertencia: El botón para abrir/cerrar el modal de carrito con ID "cart-toggle" no fue encontrado.');
    }
    if (cartModal && !closeCartModalButton) {
        console.warn('Advertencia: El botón de cierre del modal de carrito (con clase "cart-modal-close") no fue encontrado dentro de #cart-modal.');
    }

    function openCartModal() {
        if (cartModal) {
            renderCart(); // Asegurar que el contenido esté actualizado
            cartModal.classList.add('is-open');
        }
    }

    function closeCartModal() {
        if (cartModal) {
            cartModal.classList.remove('is-open');
        }
    }

    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openCartModal();
        });
    }

    if (closeCartModalButton) {
        closeCartModalButton.addEventListener('click', closeCartModal);
    }

    if (cartModal) {
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) { // Si el clic es en el fondo del modal
                closeCartModal();
            }
        });
    }
    // --- Fin Funcionalidad del Modal del Carrito ---

    // --- Funcionalidad de Checkout Simulado (WhatsApp, Email) ---
    function generateOrderSummaryText() {
        if (cart.length === 0) {
            return "El carrito está vacío.";
        }

        let summary = "Resumen del Pedido:\n\n";
        let totalPrice = 0;

        cart.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            summary += `${item.name}\n`;
            summary += `  Cantidad: ${item.quantity}\n`;
            summary += `  Precio Unitario: $${item.price.toFixed(2)}\n`;
            summary += `  Subtotal: $${itemSubtotal.toFixed(2)}\n\n`;
            totalPrice += itemSubtotal;
        });

        summary += `TOTAL DEL PEDIDO: $${totalPrice.toFixed(2)}\n\n`;
        summary += `¡Gracias por tu interés en Resistoma!`;
        return summary;
    }

    const whatsappCheckoutButton = document.getElementById('whatsapp-checkout-btn');
    const emailCheckoutButton = document.getElementById('email-checkout-btn');

    if (whatsappCheckoutButton) {
        whatsappCheckoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Tu carrito está vacío. Añade productos antes de enviar tu pedido.");
                return;
            }
            const orderText = generateOrderSummaryText();
            const whatsappNumber = "573142700201"; // Número proporcionado por el usuario
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
            window.open(whatsappUrl, '_blank');
            // Opcional: limpiar carrito después de enviar
            // cart = [];
            // saveCart();
            // renderCart();
            // closeModal(); // o closeCartModal() si se renombra
        });
    }

    if (emailCheckoutButton) {
        emailCheckoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Tu carrito está vacío. Añade productos antes de enviar tu pedido.");
                return;
            }
            const orderText = generateOrderSummaryText();
            const storeEmail = "temporal@resistoma.com"; // Correo proporcionado por el usuario
            const subject = "Nuevo Pedido desde la Tienda Web Resistoma";
            const mailtoUrl = `mailto:${storeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(orderText)}`;
            window.location.href = mailtoUrl; // Usar window.location.href para mailto
        });
    }
    // --- Fin Funcionalidad de Checkout Simulado ---


    // Seleccionar todos los botones "Añadir al Carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Añadir event listener a cada botón
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.dataset.productId;
                const productName = productCard.dataset.productName;
                const productPrice = productCard.dataset.productPrice;
                const productImage = productCard.dataset.productImage;

                addToCart(productId, productName, productPrice, productImage);
                // Aquí podríamos dar algún feedback visual, como cambiar el texto del botón temporalmente.
            }
        });
    });

});
