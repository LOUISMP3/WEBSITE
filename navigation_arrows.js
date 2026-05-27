(function() {
  const prevBtn = document.getElementById('prevButton');
  const nextBtn = document.getElementById('nextButton');
  const mobileNextBtn = document.getElementById('mobilePageDownButton');
  const currentPage = window.location.pathname.split('/').pop();
  const isLocal = window.location.protocol === 'file:';

  let currentSequence = [];
  if (projectSequence.includes(currentPage)) {
    currentSequence = projectSequence;
  } else if (shortFilmSequence.includes(currentPage)) {
    currentSequence = shortFilmSequence;
  } else if (othersSequence.includes(currentPage)) {
    currentSequence = othersSequence;
  }

  const idx = currentSequence.indexOf(currentPage);

  if (idx !== -1) {
    if (prevBtn) {
      if (idx > 0) {
        prevBtn.onclick = () => {
          const target = currentSequence[idx - 1];
          window.location.href = isLocal ? target : '/' + target;
        };
      } else {
        prevBtn.style.display = 'none';
      }
    }

    if (nextBtn) {
      if (idx < currentSequence.length - 1) {
        nextBtn.onclick = () => {
          const target = currentSequence[idx + 1];
          window.location.href = isLocal ? target : '/' + target;
        };
      } else {
        nextBtn.style.display = 'none';
      }
    }

    if (mobileNextBtn) {
      if (idx < currentSequence.length - 1) {
        mobileNextBtn.onclick = () => {
          const target = currentSequence[idx + 1];
          window.location.href = isLocal ? target : '/' + target;
        };
      } else {
        mobileNextBtn.style.display = 'none';
      }
    }
  }
})();
