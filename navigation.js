document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    const parent = this.parentElement;
    const isOpen = parent.classList.contains('open');

    // Fermer tous les autres menus
    document.querySelectorAll('.dropdown').forEach(d => {
      if (d !== parent) {
        d.classList.remove('open');
        const otherToggle = d.querySelector('.dropdown-toggle');
        if (otherToggle) {
          otherToggle.classList.remove('animate-in', 'animate-out');
        }
      }
    });

    if (isOpen) {
      this.classList.remove('animate-in');
      this.classList.add('animate-out');
      setTimeout(() => {
        parent.classList.remove('open');
        document.body.classList.remove('dropdown-mode');
        this.classList.remove('animate-out');
      }, 400);
    } else {
      this.classList.remove('animate-out');
      this.classList.add('animate-in');
      parent.classList.add('open');
      document.body.classList.add('dropdown-mode');
    }
  });
});

document.addEventListener('click', function(e) {
  if (window.innerWidth > 600) return; // ignore sur desktop

  // Si on clique sur un lien dans dropdown-content, laisse la navigation, ne ferme pas immédiatement
  if (e.target.closest('.dropdown-content a')) {
    // Ne pas fermer le menu ici, on peut laisser la navigation se faire naturellement
    return; 
  }

  // Sinon, si on clique en dehors du dropdown, ferme les menus
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    document.body.classList.remove('dropdown-mode');

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.classList.remove('animate-in', 'animate-out');
    });
  }
});
