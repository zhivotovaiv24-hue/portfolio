let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const indicatorsContainer = document.createElement('div');

// Создаём контейнер для индикаторов
indicatorsContainer.className = 'indicators';
slider.appendChild(indicatorsContainer);

// Функция создания индикаторов
function createIndicators() {
  indicatorsContainer.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('span');
    indicator.className = `indicator ${i === currentSlide ? 'active' : ''}`;
    indicator.addEventListener('click', () => showSlide(i));
    indicatorsContainer.appendChild(indicator);
  }
}

// Функция показа слайда
function showSlide(n) {
  // Ограничиваем диапазон слайдов
  if (n >= totalSlides) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = n;
  }

  // Скрываем все слайды
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Показываем текущий слайд
  slides[currentSlide].classList.add('active');

  // Обновляем индикаторы
  updateIndicators();
}

// Функция обновления индикаторов
function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

// Функция смены слайда
function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

// Автоматическая смена слайдов
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000); // Смена каждые 5 секунд
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Запускаем автоматическую смену слайдов при загрузке
document.addEventListener('DOMContentLoaded', () => {
  createIndicators();
  startAutoSlide();

  // Останавливаем автосмену при наведении на слайдер
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
});

// Добавляем клавиатурную навигацию
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    changeSlide(-1);
  } else if (e.key === 'ArrowRight') {
    changeSlide(1);
  }
});
