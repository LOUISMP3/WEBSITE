// Fondu d'entrée et de sortie des pages.
// La page reste masquée jusqu'à ce que les polices, les images et les vignettes
// des vidéos (posters) soient prêtes, avec un délai maximum pour ne jamais
// laisser l'écran vide si un fichier est lent (réseau mobile).

const FADE_MAX_WAIT = 2500; // ms : délai maximum avant d'afficher quand même la page
const FADE_OUT_DURATION = 350; // ms : doit correspondre à page-fade.css (.page-leaving)

let pageRevealed = false;

function revealPage() {
  if (pageRevealed) return;
  pageRevealed = true;
  document.querySelectorAll('.fade-in').forEach((element) => {
    element.classList.add('visible');
  });
  document.body.classList.remove('page-leaving');
  document.body.classList.add('page-loaded');
}

function waitForImage(img) {
  if (img.complete) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });
}

function waitForPoster(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

function whenPageReady(callback) {
  const tasks = [];

  // Polices (évite que le texte change de police juste après l'apparition)
  if (document.fonts && document.fonts.ready) tasks.push(document.fonts.ready);

  // Images de la page
  Array.from(document.images).forEach((img) => tasks.push(waitForImage(img)));

  // Vignettes des vidéos (ne font pas partie de document.images)
  const posters = new Set();
  document.querySelectorAll('video[poster]').forEach((video) => {
    const src = video.getAttribute('poster');
    if (src) posters.add(src);
  });
  posters.forEach((src) => tasks.push(waitForPoster(src)));

  Promise.all(tasks).then(callback, callback);
  setTimeout(callback, FADE_MAX_WAIT);
}

// Fondu de sortie avant de changer de page, puis navigation
function fadeNavigate(url) {
  document.body.classList.add('page-leaving');
  setTimeout(() => { window.location.href = url; }, FADE_OUT_DURATION);
}
window.fadeNavigate = fadeNavigate;

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href]');
  if (!link) return;
  if (link.target && link.target !== '_self') return;
  if (link.hasAttribute('download')) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/i.test(href)) return;
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return;
  if (url.pathname === window.location.pathname && url.hash) return;
  event.preventDefault();
  fadeNavigate(url.href);
});

// Retour arrière / avant du navigateur : la page sort du cache, on la réaffiche
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.remove('page-leaving');
    document.body.classList.add('page-loaded');
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => whenPageReady(revealPage));
} else {
  whenPageReady(revealPage);
}
