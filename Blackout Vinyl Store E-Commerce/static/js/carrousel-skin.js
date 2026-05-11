document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('carousel-skin');
  const navButtons = document.querySelectorAll('#navigation button');
  const panelCountInput = document.getElementById('panel-count');
  const axisButton = document.getElementById('toggle-axis');
  const backfaceVisibilityButton = document.getElementById('toggle-backface-visibility');
  const panel = document.getElementById('panel');

  if (!carousel) return;

  const panels = Array.from(carousel.children);
  if (!panels.length) return;

  class Carousel3D {
    constructor(element) {
      this.element = element;
      this.rotation = 0;
      this.totalPanelCount = panels.length;
      this.panelCount = this.getRequestedPanelCount();
      this.theta = 0;
      this.radius = 0;
      this.isHorizontal = true;
      this.rotateFn = 'rotateY';
      this.panelSize = 0;
      this.init();
    }

    getRequestedPanelCount() {
      const requested = panelCountInput
        ? parseInt(panelCountInput.value, 10)
        : this.totalPanelCount;

      if (!requested || requested < 1) {
        return this.totalPanelCount;
      }

      return Math.min(requested, this.totalPanelCount);
    }

    init() {
      this.panelCount = this.getRequestedPanelCount();

      if (!panels[0]) return;

      this.panelSize = panels[0][this.isHorizontal ? 'offsetWidth' : 'offsetHeight'];
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
      this.theta = 360 / this.panelCount;
      this.radius = Math.round(
        (this.panelSize / 2) / Math.tan(Math.PI / this.panelCount)
      );

      for (let i = 0; i < this.totalPanelCount; i++) {
        const currentPanel = panels[i];

        if (i < this.panelCount) {
          const angle = this.theta * i;

          currentPanel.style.opacity = '1';
          currentPanel.style.pointerEvents = 'auto';

          // À retirer si tu ne veux aucune couleur de fond sur les panneaux
       

          currentPanel.style.transform =
            `${this.rotateFn}(${angle}deg) translateZ(${this.radius}px)`;
        } else {
          currentPanel.style.opacity = '0';
          currentPanel.style.pointerEvents = 'none';
          currentPanel.style.transform = 'none';
        }
      }

      if (this.theta && Number.isFinite(this.theta)) {
        this.rotation = Math.round(this.rotation / this.theta) * this.theta;
      }

      this.transform();
    }

    transform() {
      this.element.style.transform =
        `translateZ(-${this.radius}px) ${this.rotateFn}(${this.rotation}deg)`;
    }

    next() {
      this.rotation -= this.theta;
      this.transform();
    }

    previous() {
      this.rotation += this.theta;
      this.transform();
    }

    toggleAxis() {
      this.isHorizontal = !this.isHorizontal;
      this.init();
    }
  }

  const carousel3D = new Carousel3D(carousel);

  let autoRotate = null;
  const autoRotateDelay = 3000;

  function startAutoRotate() {
    stopAutoRotate();

    autoRotate = setInterval(() => {
      carousel3D.next();
    }, autoRotateDelay);
  }

  function stopAutoRotate() {
    if (autoRotate) {
      clearInterval(autoRotate);
      autoRotate = null;
    }
  }

  navButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const increment = parseInt(
        event.currentTarget.getAttribute('data-increment'),
        10
      );

      if (increment === 1) {
        carousel3D.next();
      } else if (increment === -1) {
        carousel3D.previous();
      }
    });
  });

  axisButton?.addEventListener('click', () => {
    carousel3D.toggleAxis();
  });

  panelCountInput?.addEventListener('input', () => {
    carousel3D.init();
  });

  backfaceVisibilityButton?.addEventListener('click', () => {
    carousel.classList.toggle('panels-backface-invisible');
  });

  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);

  window.addEventListener('resize', () => {
    carousel3D.init();
  });

  if (panel) {
    setTimeout(() => {
      panel.classList.remove('visible');
    }, 5000);
  }

  setTimeout(() => {
    document.body.classList.add('ready');
  }, 0);

  startAutoRotate();
});