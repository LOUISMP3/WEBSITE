(function() {
  const prevBtn = document.getElementById('prevButton');
  const nextBtn = document.getElementById('nextButton');
  const mobileNextBtn = document.getElementById('mobilePageDownButton');
  
  // Extraire proprement le nom du fichier actuel en minuscules (ex: "forma.html")
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '') {
    currentPage = 'index.html';
  }
  currentPage = currentPage.split('?')[0].split('#')[0].toLowerCase();

  let currentSequence = [];
  
  // Fonction utilitaire pour chercher de façon insensible à la casse
  const findSequence = (seq) => {
    if (typeof seq === 'undefined' || !Array.isArray(seq)) return false;
    return seq.map(p => p.toLowerCase()).includes(currentPage);
  };

  if (findSequence(projectSequence)) {
    currentSequence = projectSequence;
  } else if (findSequence(shortFilmSequence)) {
    currentSequence = shortFilmSequence;
  } else if (findSequence(othersSequence)) {
    currentSequence = othersSequence;
  }

  // Obtenir l'index de façon insensible à la casse
  const idx = currentSequence.map(p => p.toLowerCase()).indexOf(currentPage);

  if (idx !== -1) {
    if (prevBtn) {
      if (idx > 0) {
        prevBtn.style.display = ''; // Restaure l'affichage par défaut si masqué auparavant
        prevBtn.onclick = (e) => {
          e.preventDefault();
          const target = currentSequence[idx - 1];
          window.location.href = target;
        };
      } else {
        prevBtn.style.display = 'none';
      }
    }

    if (nextBtn) {
      if (idx < currentSequence.length - 1) {
        nextBtn.style.display = ''; // Restaure l'affichage par défaut si masqué auparavant
        nextBtn.onclick = (e) => {
          e.preventDefault();
          const target = currentSequence[idx + 1];
          window.location.href = target;
        };
      } else {
        nextBtn.style.display = 'none';
      }
    }

    if (mobileNextBtn) {
      if (idx < currentSequence.length - 1) {
        mobileNextBtn.style.display = ''; // Restaure l'affichage par défaut si masqué auparavant
        mobileNextBtn.onclick = (e) => {
          e.preventDefault();
          const target = currentSequence[idx + 1];
          window.location.href = target;
        };
      } else {
        mobileNextBtn.style.display = 'none';
      }
    }
  } else {
    // Si on ne trouve pas la page dans les listes, on cache les flèches par précaution
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (mobileNextBtn) mobileNextBtn.style.display = 'none';
  }
})();
