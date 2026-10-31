const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((image) => {
    image.classList.add('is-pending');
    observer.observe(image);
  });
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) {
      observer.disconnect();
      document.querySelectorAll('.is-pending').forEach(image => image.classList.add('is-visible'));
    }
  });
}
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('.form-note').textContent = 'Это макет формы: данные не отправлены. Способ записи подключим позже.';
});

const programButtons = document.querySelectorAll('.program-toggle');
const programImages = document.querySelectorAll('.program-image');
programButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.program;
    programButtons.forEach((control) => {
      control.setAttribute('aria-pressed', String(control === button));
    });
    programImages.forEach((image) => {
      const active = image.dataset.programImage === selected;
      image.classList.toggle('is-active', active);
      image.setAttribute('aria-hidden', String(!active));
    });
  });
});
