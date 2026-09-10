window.addEventListener('load', () => {
  document.querySelectorAll('.fade-in').forEach((element) => {
    element.classList.add('visible');
  });
  document.body.classList.add('page-loaded');
});
