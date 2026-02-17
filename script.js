document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar-content');
    const viewer = document.getElementById('pdf-viewer');
    const toggleBtn = document.getElementById('toggle-menu');
    const sidebarContainer = document.getElementById('sidebar');

    // Toggle Menú
    toggleBtn.addEventListener('click', () => {
        sidebarContainer.classList.toggle('collapsed');
    });

    // Cargar datos
    fetch('data.json')
        .then(response => response.json())
        .then(data => buildMenu(data))
        .catch(err => console.error('Error cargando cursos:', err));

    function buildMenu(cursos) {
        cursos.forEach(curso => {
            // Nivel 1: Curso
            const cursoDiv = createItem(curso.titulo, 'level-curso');
            const cursoContainer = document.createElement('div');
            
            // Toggle visibilidad hijos
            cursoDiv.addEventListener('click', () => toggleVisibility(cursoContainer));
            
            sidebar.appendChild(cursoDiv);
            sidebar.appendChild(cursoContainer);

            if(curso.unidades) {
                curso.unidades.forEach(unidad => {
                    // Nivel 2: Unidad
                    const unidadDiv = createItem(unidad.titulo, 'level-unidad');
                    const unidadContainer = document.createElement('div');
                    unidadContainer.classList.add('hidden'); // Oculto por defecto
                    
                    unidadDiv.addEventListener('click', () => toggleVisibility(unidadContainer));

                    cursoContainer.appendChild(unidadDiv);
                    cursoContainer.appendChild(unidadContainer);

                    if(unidad.semanas) {
                        unidad.semanas.forEach(semana => {
                            // Nivel 3: Semana
                            const semanaDiv = createItem(semana.titulo, 'level-semana');
                            const semanaContainer = document.createElement('div');
                            semanaContainer.classList.add('hidden');

                            semanaDiv.addEventListener('click', () => toggleVisibility(semanaContainer));

                            unidadContainer.appendChild(semanaDiv);
                            unidadContainer.appendChild(semanaContainer);

                            if(semana.sesiones) {
                                semana.sesiones.forEach(sesion => {
                                    // Nivel 4: Sesión (Click carga PDF)
                                    const sesionDiv = createItem(sesion.titulo, 'level-sesion');
                                    sesionDiv.addEventListener('click', (e) => {
                                        e.stopPropagation(); // Evitar cerrar menús padres
                                        loadPDF(sesion.archivo);
                                        
                                        // Highlight activo
                                        document.querySelectorAll('.level-sesion').forEach(el => 
                                            el.style.backgroundColor = 'transparent');
                                        sesionDiv.style.backgroundColor = 'var(--icesi-yellow)';
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
        // Verifica si la URL es válida o está vacía
        if (!url) return;
        viewer.src = url;
    }
});
