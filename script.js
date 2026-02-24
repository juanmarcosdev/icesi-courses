document.addEventListener('DOMContentLoaded', () => {

  if (window.marked && window.markedMath) {
    marked.use({
      extensions: [markedMath()]
    });
  }

  const sidebar = document.getElementById('sidebar-content');
  const pdfViewer = document.getElementById('pdf-viewer');

  // IMPORTANTE: este div debe existir en index.html (ver sección 2)
  const mdViewer = document.getElementById('md-viewer');

  const toggleBtn = document.getElementById('toggle-menu');
  const sidebarContainer = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebarContainer.classList.toggle('collapsed');
  });

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      buildMenu(data);
      handleRouting();
    })
    .catch(err => console.error('Error cargando cursos:', err));

  window.addEventListener('hashchange', () => handleRouting());

  function buildMenu(cursos) {
    sidebar.innerHTML = '';

    cursos.forEach((curso, cIndex) => {
      const cursoId = curso.id || `c${cIndex}`;

      const cursoDiv = createItem(curso.titulo, 'level-curso');
      const cursoContainer = document.createElement('div');
      cursoContainer.classList.add('hidden'); // colapsado por defecto

      cursoDiv.dataset.path = cursoId;
      cursoDiv.addEventListener('click', () => toggleVisibility(cursoContainer));

      sidebar.appendChild(cursoDiv);
      sidebar.appendChild(cursoContainer);

      (curso.unidades || []).forEach((unidad, uIndex) => {
        const unidadDiv = createItem(unidad.titulo, 'level-unidad');
        const unidadContainer = document.createElement('div');
        unidadContainer.classList.add('hidden');

        unidadDiv.addEventListener('click', () => toggleVisibility(unidadContainer));

        cursoContainer.appendChild(unidadDiv);
        cursoContainer.appendChild(unidadContainer);

        (unidad.semanas || []).forEach((semana, wIndex) => {
          const semanaDiv = createItem(semana.titulo, 'level-semana');
          const semanaContainer = document.createElement('div');
          semanaContainer.classList.add('hidden');

          semanaDiv.addEventListener('click', () => toggleVisibility(semanaContainer));

          unidadContainer.appendChild(semanaDiv);
          unidadContainer.appendChild(semanaContainer);

          (semana.sesiones || []).forEach((sesion, sIndex) => {
            const sesionDiv = createItem(sesion.titulo, 'level-sesion');

            // Ruta compartible
            const uniquePath = `${cursoId}/${uIndex}/${wIndex}/${sIndex}`;
            sesionDiv.dataset.path = uniquePath;

            // Tipo de contenido: pdf por defecto
            const tipo = (sesion.tipo || 'pdf').toLowerCase();
            sesionDiv.dataset.tipo = tipo;

            // Archivo (pdf o md)
            sesionDiv.dataset.archivo = sesion.archivo;

            sesionDiv.addEventListener('click', (e) => {
              e.stopPropagation();
              window.location.hash = uniquePath;
            });

            semanaContainer.appendChild(sesionDiv);
          });
        });
      });
    });
  }

  function handleRouting() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const target = document.querySelector(`.level-sesion[data-path="${hash}"]`);
    if (!target) return;

    const tipo = (target.dataset.tipo || 'pdf').toLowerCase();
    const archivo = target.dataset.archivo;

    // Highlight
    document.querySelectorAll('.level-sesion').forEach(el => el.classList.remove('active'));
    target.classList.add('active');

    // Mostrar contenido
    if (tipo === 'markdown' || tipo === 'md') {
      showMarkdown(archivo);
    } else {
      showPDF(archivo);
    }

    expandParents(target);
  }

  function showPDF(url) {
    if (!url) return;

    // Mostrar iframe, ocultar markdown
    if (mdViewer) mdViewer.classList.add('hidden');
    pdfViewer.classList.remove('hidden');

    if (pdfViewer.getAttribute('src') !== url) {
      pdfViewer.src = url;
    }
  }

  function showMarkdown(url) {
    if (!url) return;
    if (!mdViewer) {
      console.error('No existe #md-viewer en el HTML.');
      return;
    }

    // Ocultar iframe, mostrar markdown
    pdfViewer.classList.add('hidden');
    mdViewer.classList.remove('hidden');

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`No se pudo cargar: ${url}`);
        return res.text();
      })
      .then(mdText => {
        // marked debe estar cargado en index.html (ver sección 2)
        mdViewer.innerHTML = marked.parse(mdText);

        // Re-render de matemáticas (si usas MathJax)
        if (window.MathJax) {
            MathJax.typesetClear([mdViewer]);
            MathJax.typesetPromise([mdViewer])
                .catch(err => console.error(err));
        }
      })
      .catch(err => {
        mdViewer.innerHTML = `<p style="color:#b00020;font-weight:600;">Error cargando Markdown.</p><p>${url}</p>`;
        console.error(err);
      });
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
});
