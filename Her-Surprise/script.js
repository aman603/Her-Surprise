// ---------------- Custom cursor ----------------
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    if (!cursor) return;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ---------------- Typing effect ----------------
const greetingText =
    "Hey Princess, you know what? You’re my favourite person in this whole world. 💖";

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

// ---------------- Animations + navigation + music ----------------
window.addEventListener('DOMContentLoaded', () => {
    // Start typing
    typeGreeting();

    const button = document.querySelector('.cta-button');
    const bgMusic = document.getElementById('bg-music');

    // Entry animation
    gsap.from('.container', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out'
    });

    // Subtle breathing animation on button
    gsap.fromTo(
        '.cta-button',
        { scale: 0.96 },
        {
            scale: 1,
            duration: 0.8,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        }
    );

    // Hover micro-interaction
    if (button) {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.2 });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1.0, duration: 0.2 });
        });

        // On click: start music (user gesture) + transition to reasons page
        button.addEventListener('click', () => {
            if (bgMusic) {
                // Try to start background music after user interaction
                bgMusic.play().catch(() => {
                    // If browser blocks autoplay, you can ignore the error
                    // or later add a small "Tap to enable sound" message.
                });
            }

            gsap.to('body', {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    window.location.href = 'cause.html';
                }
            });
        });
    }
});
