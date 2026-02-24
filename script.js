document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar-content');
  const viewer = document.getElementById('pdf-viewer');
  const toggleBtn = document.getElementById('toggle-menu');
  const sidebarContainer = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebarContainer.classList.toggle('collapsed');
  });

  fetch('data.json')
    .then(r => r.json())
    .then(data => {
      buildMenu(data);
      handleRouting();
    })
    .catch(err => console.error('Error cargando data.json:', err));

  window.addEventListener('hashchange', () => handleRouting());

  function buildMenu(data) {
    sidebar.innerHTML = '';

    const secciones = data.secciones || [];
    secciones.forEach((seccion, secIndex) => {
      const seccionId = seccion.id || `sec${secIndex}`;

      // Nivel 0: Sección
      const seccionDiv = createItem(seccion.titulo, 'level-seccion');
      const seccionContainer = document.createElement('div');

      seccionDiv.addEventListener('click', () => toggleVisibility(seccionContainer));

      sidebar.appendChild(seccionDiv);
      sidebar.appendChild(seccionContainer);

      // Nivel 1: Items (Cursos / Recursos)
      (seccion.items || []).forEach((item, itemIndex) => {
        const itemId = item.id || `item${itemIndex}`;

        const cursoDiv = createItem(item.titulo, 'level-curso');
        const cursoContainer = document.createElement('div');
        cursoContainer.classList.add('hidden');

        cursoDiv.addEventListener('click', () => toggleVisibility(cursoContainer));

        seccionContainer.appendChild(cursoDiv);
        seccionContainer.appendChild(cursoContainer);

        // Nivel 2: Unidades
        (item.unidades || []).forEach((unidad, uIndex) => {
          const unidadDiv = createItem(unidad.titulo, 'level-unidad');
          const unidadContainer = document.createElement('div');
          unidadContainer.classList.add('hidden');

          unidadDiv.addEventListener('click', () => toggleVisibility(unidadContainer));

          cursoContainer.appendChild(unidadDiv);
          cursoContainer.appendChild(unidadContainer);

          // Nivel 3: Semanas
          (unidad.semanas || []).forEach((semana, wIndex) => {
            const semanaDiv = createItem(semana.titulo, 'level-semana');
            const semanaContainer = document.createElement('div');
            semanaContainer.classList.add('hidden');

            semanaDiv.addEventListener('click', () => toggleVisibility(semanaContainer));

            unidadContainer.appendChild(semanaDiv);
            unidadContainer.appendChild(semanaContainer);

            // Nivel 4: Sesiones
            (semana.sesiones || []).forEach((sesion, sIndex) => {
              const sesionDiv = createItem(sesion.titulo, 'level-sesion');

              // Ruta: seccionId/itemId/uIndex/wIndex/sIndex
              const uniquePath = `${seccionId}/${itemId}/${uIndex}/${wIndex}/${sIndex}`;
              sesionDiv.dataset.path = uniquePath;
              sesionDiv.dataset.pdf = sesion.archivo;

              sesionDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.hash = uniquePath;
              });

              semanaContainer.appendChild(sesionDiv);
            });
          });
        });
      });

      // Por defecto, colapsa el contenedor de sección (opcional)
      seccionContainer.classList.add('hidden');
    });
  }

  function handleRouting() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const target = document.querySelector(`.level-sesion[data-path="${hash}"]`);
    if (!target) return;

    loadPDF(target.dataset.pdf);

    // Activo
    document.querySelectorAll('.level-sesion').forEach(el => el.classList.remove('active'));
    target.classList.add('active');

    expandParents(target);
  }

  function expandParents(element) {
    let parent = element.parentElement;
    while (parent && parent.id !== 'sidebar-content') {
      if (parent.classList.contains('hidden')) parent.classList.remove('hidden');
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
    if (viewer.getAttribute('src') !== url) viewer.src = url;
  }
});
