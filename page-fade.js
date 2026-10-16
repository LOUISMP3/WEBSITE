// Révèle la page dès que le HTML et les images sont prêts,
// sans attendre les iframes (lecteurs Spotify) qui retardaient le fondu.
function revealPage() {
  document.querySelectorAll('.fade-in').forEach((element) => {
    element.classList.add('visible');
  });
  document.body.classList.add('page-loaded');
}

function whenImagesReady(callback) {
  const pending = Array.from(document.images).filter((img) => !img.complete);
  if (pending.length === 0) return callback();
  let remaining = pending.length;
  const done = () => { if (--remaining === 0) callback(); };
  pending.forEach((img) => {
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => whenImagesReady(revealPage));
} else {
  whenImagesReady(revealPage);
}
