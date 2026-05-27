// ----- DROPDOWN TOGGLES -----
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    if (window.innerWidth > 768) {
      // Sur desktop, on ne fait rien au clic
      return;
    }

    const parent = this.parentElement;
    const isOpen = parent.classList.contains('open');

    // Fermer tous les autres menus ouverts
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

// ----- FERMETURE DROPDOWN AU CLIC EXTERNE -----
document.addEventListener('click', function(e) {
  if (window.innerWidth > 600) return; // ignore sur desktop

  if (e.target.closest('.dropdown-content a')) {
    return; // Laisse la navigation naturelle
  }

  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    document.body.classList.remove('dropdown-mode');

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.classList.remove('animate-in', 'animate-out');
    });
  }
});

// ----- VIDEO CONTROLS + FULLSCREEN BUTTON -----
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("mainVideo");
  const playButton = document.getElementById("playButton");
  const fullscreenButton = document.getElementById("fullscreenButton");

  if (video && playButton) {
    playButton.addEventListener("click", () => {
      video.play();
      playButton.style.display = "none";
    });

    video.addEventListener("click", (e) => {
      // Do not interfere if we are in fullscreen (native player handles it)
      if (document.fullscreenElement || document.webkitFullscreenElement) return;
      
      video.muted = false;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", () => {
      playButton.style.display = "none";
    });

    video.addEventListener("pause", () => {
      playButton.style.display = "block";
    });

    video.addEventListener("ended", () => {
      playButton.style.display = "block";
    });
  }

  if (fullscreenButton && video) {
    fullscreenButton.addEventListener("click", () => {
      // iOS Safari
      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      } else if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      } else {
        console.warn("Fullscreen non supporté");
      }
    });
  }
});
