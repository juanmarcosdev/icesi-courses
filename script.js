document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar-content');
    const viewer = document.getElementById('pdf-viewer');
    const toggleBtn = document.getElementById('toggle-menu');
    const sidebarContainer = document.getElementById('sidebar');


    toggleBtn.addEventListener('click', () => {
        sidebarContainer.classList.toggle('collapsed');
    });


    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            buildMenu(data);
            handleRouting(data); 
        })
        .catch(err => console.error('Error cargando cursos:', err));

    window.addEventListener('hashchange', () => {

        fetch('data.json')
            .then(res => res.json())
            .then(data => handleRouting(data));
    });

    function buildMenu(cursos) {
        sidebar.innerHTML = ''; 

        cursos.forEach((curso, cIndex) => {
            const cursoId = curso.id || `c${cIndex}`;

            const cursoDiv = createItem(curso.titulo, 'level-curso');
            const cursoContainer = document.createElement('div');

            cursoContainer.classList.add('hidden'); //Colapsar unidades al cargar

            cursoDiv.dataset.path = cursoId;

            cursoDiv.addEventListener('click', () => toggleVisibility(cursoContainer));

            sidebar.appendChild(cursoDiv);
            sidebar.appendChild(cursoContainer);


            if(curso.unidades) {
                curso.unidades.forEach((unidad, uIndex) => {
                    const unidadDiv = createItem(unidad.titulo, 'level-unidad');
                    const unidadContainer = document.createElement('div');
                    unidadContainer.classList.add('hidden'); 
                    
                    unidadDiv.addEventListener('click', () => toggleVisibility(unidadContainer));

                    cursoContainer.appendChild(unidadDiv);
                    cursoContainer.appendChild(unidadContainer);

                    if(unidad.semanas) {
                        unidad.semanas.forEach((semana, wIndex) => {
                            const semanaDiv = createItem(semana.titulo, 'level-semana');
                            const semanaContainer = document.createElement('div');
                            semanaContainer.classList.add('hidden');

                            semanaDiv.addEventListener('click', () => toggleVisibility(semanaContainer));

                            unidadContainer.appendChild(semanaDiv);
                            unidadContainer.appendChild(semanaContainer);

                            if(semana.sesiones) {
                                semana.sesiones.forEach((sesion, sIndex) => {

                                    const sesionDiv = createItem(sesion.titulo, 'level-sesion');
                                    
                                    //cursoID/unidadIndex/semanaIndex/sesionIndex
                                    const uniquePath = `${cursoId}/${uIndex}/${wIndex}/${sIndex}`;
                                    sesionDiv.dataset.path = uniquePath; // Guardamos la ruta en el HTML
                                    sesionDiv.dataset.pdf = sesion.archivo; // Guardamos el PDF

                                    sesionDiv.addEventListener('click', (e) => {
                                        e.stopPropagation();
                                        window.location.hash = uniquePath; 
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


    function handleRouting(data) {
        const hash = window.location.hash.substring(1); 
        if (!hash) return;


        const targetElement = document.querySelector(`.level-sesion[data-path="${hash}"]`);

        if (targetElement) {

            const pdfUrl = targetElement.dataset.pdf;
            loadPDF(pdfUrl);


            document.querySelectorAll('.level-sesion').forEach(el => 
                el.style.backgroundColor = 'transparent');
            targetElement.style.backgroundColor = 'var(--icesi-yellow)';


            expandParents(targetElement);
        }
    }


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
        if(viewer.getAttribute('src') !== url) {
            viewer.src = url;
        }
    }
});
