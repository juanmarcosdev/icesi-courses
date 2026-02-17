document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar-content');
    const viewer = document.getElementById('pdf-viewer');
    const toggleBtn = document.getElementById('toggle-menu');
    const sidebarContainer = document.getElementById('sidebar');

    // 1. Toggle Menú (Móvil/Desktop)
    toggleBtn.addEventListener('click', () => {
        sidebarContainer.classList.toggle('collapsed');
    });

    // 2. Cargar datos y configurar el ruteo
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            buildMenu(data);
            handleRouting(data); // Verificar si hay un link específico al cargar
        })
        .catch(err => console.error('Error cargando cursos:', err));

    // 3. Escuchar cambios en la URL (Navegación del navegador atrás/adelante)
    window.addEventListener('hashchange', () => {
        // Recargamos el JSON (o usamos una variable global) para buscar la ruta
        fetch('data.json')
            .then(res => res.json())
            .then(data => handleRouting(data));
    });

    function buildMenu(cursos) {
        sidebar.innerHTML = ''; // Limpiar menú previo

        cursos.forEach((curso, cIndex) => {
            // ID del curso o índice si no tiene ID
            const cursoId = curso.id || `c${cIndex}`;

            // Nivel 1: Curso
            const cursoDiv = createItem(curso.titulo, 'level-curso');
            const cursoContainer = document.createElement('div');
            
            // Atributos para ruteo (opcional en nivel curso)
            cursoDiv.dataset.path = cursoId; 

            cursoDiv.addEventListener('click', () => toggleVisibility(cursoContainer));
            
            sidebar.appendChild(cursoDiv);
            sidebar.appendChild(cursoContainer);

            if(curso.unidades) {
                curso.unidades.forEach((unidad, uIndex) => {
                    // Nivel 2: Unidad
                    const unidadDiv = createItem(unidad.titulo, 'level-unidad');
                    const unidadContainer = document.createElement('div');
                    unidadContainer.classList.add('hidden'); 
                    
                    unidadDiv.addEventListener('click', () => toggleVisibility(unidadContainer));

                    cursoContainer.appendChild(unidadDiv);
                    cursoContainer.appendChild(unidadContainer);

                    if(unidad.semanas) {
                        unidad.semanas.forEach((semana, wIndex) => {
                            // Nivel 3: Semana
                            const semanaDiv = createItem(semana.titulo, 'level-semana');
                            const semanaContainer = document.createElement('div');
                            semanaContainer.classList.add('hidden');

                            semanaDiv.addEventListener('click', () => toggleVisibility(semanaContainer));

                            unidadContainer.appendChild(semanaDiv);
                            unidadContainer.appendChild(semanaContainer);

                            if(semana.sesiones) {
                                semana.sesiones.forEach((sesion, sIndex) => {
                                    // Nivel 4: Sesión
                                    const sesionDiv = createItem(sesion.titulo, 'level-sesion');
                                    
                                    // CREAMOS LA RUTA ÚNICA: cursoID/unidadIndex/semanaIndex/sesionIndex
                                    const uniquePath = `${cursoId}/${uIndex}/${wIndex}/${sIndex}`;
                                    sesionDiv.dataset.path = uniquePath; // Guardamos la ruta en el HTML
                                    sesionDiv.dataset.pdf = sesion.archivo; // Guardamos el PDF

                                    sesionDiv.addEventListener('click', (e) => {
                                        e.stopPropagation();
                                        // Actualizamos la URL del navegador
                                        window.location.hash = uniquePath; 
                                        // La función handleRouting se encargará de cargar el PDF y pintar el menú
                                    });
                                    semanaContainer.appendChild(sesionDiv);
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    // Función principal de navegación
    function handleRouting(data) {
        const hash = window.location.hash.substring(1); // Quitar el '#'
        if (!hash) return;

        // Buscar el elemento en el DOM que tenga este data-path
        const targetElement = document.querySelector(`.level-sesion[data-path="${hash}"]`);

        if (targetElement) {
            // 1. Cargar PDF
            const pdfUrl = targetElement.dataset.pdf;
            loadPDF(pdfUrl);

            // 2. Resaltar selección
            document.querySelectorAll('.level-sesion').forEach(el => 
                el.style.backgroundColor = 'transparent');
            targetElement.style.backgroundColor = 'var(--icesi-yellow)';

            // 3. Expandir menús padres automáticamente
            expandParents(targetElement);
        }
    }

    // Sube por el árbol DOM y quita la clase 'hidden' a los contenedores
    function expandParents(element) {
        let parent = element.parentElement;
        while (parent && parent.id !== 'sidebar-content') {
            if (parent.classList.contains('hidden')) {
                parent.classList.remove('hidden');
            }
            parent = parent.parentElement;
        }
    }

    function createItem(text, className) {
        const div = document.createElement('div');
        div.textContent = text;
        div.className = `menu-item ${className}`;
        return div;
    }

    function toggleVisibility(element) {
        element.classList.toggle('hidden');
    }

    function loadPDF(url) {
        if (!url) return;
        // Evitar recargar si es el mismo PDF
        if(viewer.getAttribute('src') !== url) {
            viewer.src = url;
        }
    }
});
