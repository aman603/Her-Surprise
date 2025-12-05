// ---------------- Custom cursor ----------------
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    if (!cursor) return;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ---------------- Typing effect ----------------
const greetingText =
    "Hey Princess… in a world full of people, you’re the one my heart chooses every single time. 💖";

const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (!greetingElement) return;

    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 60); // typing speed
    }
}

// ---------------- Animations + iframe navigation + music ----------------
window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.cta-button');
    const bgMusic = document.getElementById('bg-music');
    const container = document.getElementById('hero');
    const frameWrapper = document.getElementById('frame-wrapper');
    const contentFrame = document.getElementById('content-frame');

    // Start typing on homepage
    typeGreeting();

    // Entry animation for hero
    if (container && window.gsap) {
        gsap.from(container, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power2.out'
        });
    }

    // Button breathing + hover
    if (button && window.gsap) {
        gsap.fromTo(
            button,
            { scale: 0.96 },
            {
                scale: 1,
                duration: 0.8,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true
            }
        );

        button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.2 });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1.0, duration: 0.2 });
        });
    }

    // On click: start music + fade hero + show iframe with cause.html
    if (button) {
        button.addEventListener('click', () => {
            if (bgMusic) {
                bgMusic.currentTime = 0;
                bgMusic.volume = 0.6;
                bgMusic.play().catch(() => {});
            }

            if (window.gsap && container && frameWrapper && contentFrame) {
                gsap.to(container, {
                    opacity: 0,
                    y: -20,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        container.style.display = 'none';
                        // activate iframe view
                        frameWrapper.classList.add('active');
                        // load the reasons page inside iframe
                        contentFrame.src = 'cause.html';
                    }
                });
            } else if (frameWrapper && contentFrame) {
                container.style.display = 'none';
                frameWrapper.classList.add('active');
                contentFrame.src = 'cause.html';
            }
        });
    }
});
