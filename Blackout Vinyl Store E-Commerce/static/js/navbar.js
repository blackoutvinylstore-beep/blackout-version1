/* pour le carrousel haut fixe */

  const move = document.querySelector('.wrap');
let xv = null;
let startX = null;
let isScrolling = false;

function down(e) {
  move.classList.add('active');
  startX = (e.pageX ? e.pageX : e.targetTouches[0].pageX) - move.offsetLeft;
  xv = move.scrollLeft;
  isScrolling = true;
}

function upLeave() {
  move.classList.remove('active');
  isScrolling = false;
}

function moving(e) {
  if (!move.classList.contains('active')) {
    return false;
  }

  let x = (e.pageX ? e.pageX : e.targetTouches[0].pageX) - move.offsetLeft;
  let walk = (x - startX) * 1.5;
  move.scrollTo(xv - walk, 0);
}

function autoScroll(direction) {
  if (isScrolling) {
    return; // Si l'utilisateur est en train de faire défiler manuellement, ne pas effectuer le défilement automatique
  }
//direction et defilement du carrousel
  if (direction === 'left') {
    move.scrollBy({
      left: -10, // Déplacez-vous vers la gauche à une vitesse de 10 pixels à chaque intervalle
      behavior: 'smooth'
    });
  } else if (direction === 'right') {
    move.scrollBy({
      left: 10, // Déplacez-vous vers la droite à une vitesse de 10 pixels à chaque intervalle
      behavior: 'smooth'
    });
  }
}

// Événements de bureau
move.addEventListener('mousedown', down);
move.addEventListener('mouseup', upLeave);
move.addEventListener('mouseleave', upLeave);
move.addEventListener('mousemove', moving);

// Événements mobiles
move.addEventListener('touchstart', down);
move.addEventListener('touchend', upLeave);
move.addEventListener('touchcancel', upLeave);
move.addEventListener('touchmove', moving);

// Défilement automatique vers la gauche toutes les 2 secondes
setInterval(() => {
  autoScroll('left');
},50);

// Défilement automatique vers la droite toutes les 2 secondes
setInterval(() => {
  autoScroll('right');
}, 50);


// Initialize WOW.js animations if library is loaded
if (typeof window.WOW !== 'undefined') {
  try {
    new window.WOW().init();
  } catch (error) {
    console.warn('Error initializing WOW.js:', error);
  }
} else {
  console.warn('WOW.js library is not loaded. Please include wow.js script in your HTML.');
}

// Défilement fluide pour les liens ancrés dans le pied de page
document.addEventListener('DOMContentLoaded', function() {
  const liens = document.querySelectorAll('.liens-footer a');

  liens.forEach(function(lien) {
    lien.addEventListener('click', function(e) {
      e.preventDefault();
      const idCible = this.getAttribute('href').substring(1);
      const elementCible = document.getElementById(idCible);

      if (elementCible) {
        window.scrollTo({
          top: elementCible.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

  

