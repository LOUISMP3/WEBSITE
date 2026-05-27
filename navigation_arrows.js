(function() {
  const prevBtn = document.getElementById('prevButton');
  const nextBtn = document.getElementById('nextButton');
  const mobileNextBtn = document.getElementById('mobilePageDownButton');
  
  // Extraire proprement le nom du fichier actuel (ex: "forma.html")
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '') {
    currentPage = 'index.html';
  }
  currentPage = currentPage.split('?')[0].split('#')[0];

  let currentSequence = [];
  if (typeof projectSequence !== 'undefined' && projectSequence.includes(currentPage)) {
    currentSequence = projectSequence;
  } else if (typeof shortFilmSequence !== 'undefined' && shortFilmSequence.includes(currentPage)) {
    currentSequence = shortFilmSequence;
  } else if (typeof othersSequence !== 'undefined' && othersSequence.includes(currentPage)) {
    currentSequence = othersSequence;
  }

  const idx = currentSequence.indexOf(currentPage);

  if (idx !== -1) {
    if (prevBtn) {
      if (idx > 0) {
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
