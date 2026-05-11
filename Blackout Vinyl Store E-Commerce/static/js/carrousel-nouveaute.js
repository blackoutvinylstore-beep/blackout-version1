
let move;
let autoScrollId = null;
let isDragging = false;
let startX = 0;
let startScrollLeft = 0;
const speed = 0.7;
let oneSetWidth = 0;

function normalizeScroll() {
    if (move.scrollLeft <= 0) {
        move.scrollLeft += oneSetWidth;
    } else if (move.scrollLeft >= oneSetWidth * 2) {
        move.scrollLeft -= oneSetWidth;
    }
}

function autoScroll() {
    if (!isDragging) {
        move.scrollLeft += speed;
        normalizeScroll();
    }
    autoScrollId = requestAnimationFrame(autoScroll);
}

function startAutoScroll() {
    if (!autoScrollId) {
        autoScrollId = requestAnimationFrame(autoScroll);
    }
}

function stopAutoScroll() {
    if (autoScrollId) {
        cancelAnimationFrame(autoScrollId);
        autoScrollId = null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    move = document.getElementById("news-carousel");
    if (!move) return;

    const originalItems = Array.from(move.children);
    if (originalItems.length < 1) return;

    // Duplication avant + après pour créer la boucle
    const beforeFragment = document.createDocumentFragment();
    const afterFragment = document.createDocumentFragment();

    originalItems.forEach((item) => {
        beforeFragment.appendChild(item.cloneNode(true));
    });

    originalItems.forEach((item) => {
        afterFragment.appendChild(item.cloneNode(true));
    });

    move.prepend(beforeFragment);
    move.append(afterFragment);

    oneSetWidth = move.scrollWidth / 3;
    move.scrollLeft = oneSetWidth;

        function dragStart(e) {
            isDragging = true;
            move.classList.add("active");
    
            const pageX = e.pageX || e.touches[0].pageX;
            startX = pageX;
            startScrollLeft = move.scrollLeft;
        }
    
        function dragMove(e) {
            if (!isDragging) return;
    
            if (e.cancelable) {
                e.preventDefault();
            }
    
            const pageX = e.pageX || e.touches[0].pageX;
            const walk = (pageX - startX) * 1.2;
    
            move.scrollLeft = startScrollLeft - walk;
            normalizeScroll();
        }
    
        function dragEnd() {
            isDragging = false;
            move.classList.remove("active");
        }
    
        move.addEventListener("mousedown", dragStart);
        move.addEventListener("mousemove", dragMove);
        move.addEventListener("mouseup", dragEnd);
        move.addEventListener("mouseleave", dragEnd);
    
        move.addEventListener("touchstart", dragStart, { passive: true });
        move.addEventListener("touchmove", dragMove, { passive: false });
        move.addEventListener("touchend", dragEnd);
        move.addEventListener("touchcancel", dragEnd);
    
        move.addEventListener("mouseenter", stopAutoScroll);
        move.addEventListener("mouseleave", startAutoScroll);
    
        window.addEventListener("resize", () => {
            oneSetWidth = move.scrollWidth / 3;
            move.scrollLeft = oneSetWidth;
        });
    
        startAutoScroll();
    });

const prevButton = document.getElementById("news-prev");
const nextButton = document.getElementById("news-next");

prevButton?.addEventListener("click", () => {
    stopAutoScroll();
    move.scrollBy({ left: -260, behavior: "smooth" });
});

nextButton?.addEventListener("click", () => {
    stopAutoScroll();
    move.scrollBy({ left: 260, behavior: "smooth" });
});
