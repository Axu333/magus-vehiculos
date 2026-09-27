/* ==========================================================
   Magus Vehículos · Interacciones
   ========================================================== */
(function () {
  'use strict';

  var datos = window.MAGUS || { unidades: [], entregas: [], whatsapp: '' };
  var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  var revelador = null;
  if ('IntersectionObserver' in window && !sinMovimiento) {
    revelador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); revelador.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  function revelar(nodos) {
    nodos.forEach(function (n) {
      if (revelador) revelador.observe(n); else n.classList.add('visible');
    });
  }

  /* ---------- Inicio: fondo con las fotos de unidades en movimiento ---------- */
  var fondo = document.getElementById('hero-fondo');
  if (fondo && datos.unidades.length) {
    fondo.querySelectorAll('.hero-pista').forEach(function (pista, fila) {
      var desde = Number(pista.getAttribute('data-desde')) || 0;
      var n = datos.unidades.length;
      // cada fila arranca en otra foto; la lista va dos veces para que el loop sea continuo
      for (var vuelta = 0; vuelta < 2; vuelta++) {
        for (var i = 0; i < n; i++) {
          var u = datos.unidades[(i + desde) % n];
          var base = 'img/unidades/' + u.foto;
          var primeras = fila === 0 && vuelta === 0 && i < 4;
          pista.appendChild(el(
            '<li><img src="' + base + '-480.jpg" srcset="' + base + '-480.jpg 480w, ' + base + '-800.jpg 800w" ' +
              'sizes="(min-width: 960px) 420px, 46vh" width="800" height="800" decoding="async" ' +
              (primeras ? 'fetchpriority="high"' : 'loading="lazy"') + ' alt=""></li>'
          ));
        }
      }
      pista.style.setProperty('--duracion', (n * Number(pista.getAttribute('data-velocidad') || 7)) + 's');
    });

    var heroPausa = document.getElementById('hero-pausa');
    if (heroPausa && !sinMovimiento) {
      heroPausa.hidden = false;
      heroPausa.addEventListener('click', function () {
        var pausada = fondo.classList.toggle('pausada');
        heroPausa.setAttribute('aria-pressed', String(pausada));
        heroPausa.querySelector('span').textContent = pausada ? 'Reanudar el movimiento de las fotos' : 'Pausar el movimiento de las fotos';
      });
    }
  }

  /* ---------- Entregas: cinta que avanza sola, despacio ---------- */
  var pista = document.getElementById('entregas-pista');
  if (pista) {
    // la lista va dos veces para que el loop sea continuo; la copia se oculta a lectores de pantalla
    [false, true].forEach(function (copia) {
      datos.entregas.forEach(function (e) {
        var base = 'img/entregas/' + e.foto;
        pista.appendChild(el(
          '<li class="entrega"' + (copia ? ' aria-hidden="true"' : '') + '>' +
            '<figure>' +
              '<img src="' + base + '-600.jpg" srcset="' + base + '-600.jpg 600w, ' + base + '-1000.jpg 1000w" ' +
                'sizes="(min-width: 960px) 380px, (min-width: 600px) 44vw, 78vw" width="1000" height="1250" loading="lazy" decoding="async" alt="' + (copia ? '' : esc(e.alt)) + '">' +
              '<figcaption><small>Entrega</small>' + esc(e.vehiculo) + '</figcaption>' +
            '</figure>' +
          '</li>'
        ));
      });
    });
    pista.style.setProperty('--duracion', (datos.entregas.length * 9) + 's');

    var cintaEntregas = document.getElementById('entregas-cinta');
    var pausaEntregas = document.getElementById('entregas-pausa');
    if (pausaEntregas && !sinMovimiento) {
      pausaEntregas.hidden = false;
      pausaEntregas.addEventListener('click', function () {
        var pausada = cintaEntregas.classList.toggle('pausada');
        pausaEntregas.setAttribute('aria-pressed', String(pausada));
        pausaEntregas.querySelector('span').textContent = pausada ? 'Reanudar' : 'Pausar';
      });
    }
  }

  /* ---------- Resto de apariciones ---------- */
  revelar(document.querySelectorAll('[data-reveal]'));

  /* ---------- Encabezado ---------- */
  var encabezado = document.getElementById('encabezado');
  var alScroll = function () { encabezado.classList.toggle('con-scroll', window.scrollY > 8); };
  window.addEventListener('scroll', alScroll, { passive: true });
  alScroll();

  /* ---------- Menú móvil ---------- */
  var botonMenu = document.querySelector('.menu-boton');
  var menu = document.getElementById('menu-movil');
  var cierre = null;

  function abrirMenu(teclado) {
    clearTimeout(cierre);
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('abierto'); });
    botonMenu.setAttribute('aria-expanded', 'true');
    botonMenu.setAttribute('aria-label', 'Cerrar menú');
    document.body.classList.add('menu-abierto');
    var primero = menu.querySelector('a');
    if (primero) primero.focus({ preventScroll: true, focusVisible: teclado });
  }
  function cerrarMenu(devolverFoco) {
    if (botonMenu.getAttribute('aria-expanded') !== 'true') return;
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-abierto');
    cierre = setTimeout(function () { menu.hidden = true; }, 220);
    if (devolverFoco) botonMenu.focus();
  }
  if (botonMenu && menu) {
    botonMenu.addEventListener('click', function (e) {
      botonMenu.getAttribute('aria-expanded') === 'true' ? cerrarMenu(false) : abrirMenu(e.detail === 0);
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) cerrarMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarMenu(true); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches) cerrarMenu(false); });
  }

  /* ---------- Link activo del menú ---------- */
  var links = document.querySelectorAll('.nav-lista a');
  if ('IntersectionObserver' in window && links.length) {
    var porId = {};
    links.forEach(function (a) { porId[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var a = porId[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          a.setAttribute('aria-current', 'true');
        } else if (a.getAttribute('aria-current')) {
          a.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(porId).forEach(function (id) { var s = document.getElementById(id); if (s) obs.observe(s); });
  }

  /* ---------- Botón flotante de WhatsApp ---------- */
  var flotante = document.getElementById('flotante');
  var hero = document.getElementById('inicio');
  // Aparece al salir del inicio y queda fijo hasta el final (no se esconde bajo el dedo)
  if (flotante && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      flotante.classList.toggle('visible', e[0].intersectionRatio < 0.35);
    }, { threshold: [0, 0.35, 1] }).observe(hero);
  } else if (flotante) {
    flotante.classList.add('visible');
  }

  /* ---------- Horario: "abierto ahora" (hora de Argentina) ---------- */
  var HORARIO = { 1: [[8, 12], [16, 19.5]], 2: [[8, 12], [16, 19.5]], 3: [[8, 12], [16, 19.5]], 4: [[8, 12], [16, 19.5]], 5: [[8, 12], [16, 19.5]], 6: [[8, 12]] };
  try {
    var partes = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
    }).formatToParts(new Date());
    var p = {};
    partes.forEach(function (x) { p[x.type] = x.value; });
    var dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    var hora = (Number(p.hour) % 24) + Number(p.minute) / 60;
    var abierto = (HORARIO[dia] || []).some(function (r) { return hora >= r[0] && hora < r[1]; });

    var estado = document.getElementById('estado-horario');
    if (estado) {
      estado.textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
      estado.classList.toggle('abierto', abierto);
      estado.hidden = false;
    }
    document.querySelectorAll('.horarios tr[data-dias]').forEach(function (tr) {
      if (tr.getAttribute('data-dias').split(',').indexOf(String(dia)) > -1) tr.classList.add('hoy');
    });
  } catch (err) { /* navegador sin Intl: se muestra la tabla sin estado */ }

  /* ---------- Año del pie ---------- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
