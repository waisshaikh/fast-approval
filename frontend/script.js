const heading = document.querySelector('.animated-heading');

if (heading) {
  const text = heading.dataset.text || '';
  const charDelay = 30;
  const initialDelay = 200;
  const lines = text.split('\n');

  heading.innerHTML = '';

  lines.forEach((line, lineIndex) => {
    const lineElement = document.createElement('span');
    lineElement.className = 'line';

    [...line].forEach((character, charIndex) => {
      const characterElement = document.createElement('span');
      characterElement.className = 'char';
      characterElement.textContent = character === ' ' ? '\u00A0' : character;
      characterElement.style.transitionDelay = `${initialDelay + lineIndex * line.length * charDelay + charIndex * charDelay}ms`;
      lineElement.appendChild(characterElement);
    });

    heading.appendChild(lineElement);
  });

  requestAnimationFrame(() => {
    heading.classList.add('ready');
  });
}

document.querySelectorAll('.fade-in').forEach((element) => {
  const delayClass = [...element.classList].find((className) => className.startsWith('delay-'));
  const delay = delayClass ? Number(delayClass.replace('delay-', '')) : 0;

  window.setTimeout(() => {
    element.classList.add('visible');
  }, delay);
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
});

if (window.lucide) {
  window.lucide.createIcons({ 'stroke-width': 1.7 });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
