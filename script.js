const wishButton = document.querySelector('#wishButton');
const wishStatus = document.querySelector('#wishStatus');
const confettiLayer = document.querySelector('#confettiLayer');
const soundToggle = document.querySelector('#soundToggle');
const soundLabel = document.querySelector('#soundLabel');
const birthdaySong = document.querySelector('#birthdaySong');
const lockScreen = document.querySelector('#lockScreen');
const passwordForm = document.querySelector('#passwordForm');
const passwordInput = document.querySelector('#passwordInput');
const passwordError = document.querySelector('#passwordError');
const heartsCanvas = document.querySelector('#heartsCanvas');
const answerYes = document.querySelector('#answerYes');
const answerNo = document.querySelector('#answerNo');
const answerStatus = document.querySelector('#answerStatus');
const giftReveal = document.querySelector('#giftReveal');

const colors = ['#f06b55', '#f5c95d', '#83c8be', '#19363a', '#f29141'];

const heartSymbols = ['♥', '♡', '✦', '✿'];
const heartTotal = window.innerWidth < 600 ? 14 : 24;
for (let index = 0; index < heartTotal; index += 1) {
  const heart = document.createElement('span');
  heart.className = 'heart-particle';
  heart.textContent = heartSymbols[index % heartSymbols.length];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heart.style.setProperty('--drift', `${Math.random() * 140 - 70}px`);
  heart.style.animationDuration = `${10 + Math.random() * 14}s`;
  heart.style.animationDelay = `${Math.random() * 12}s`;
  heartsCanvas.appendChild(heart);
}

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (passwordInput.value === '05.10.1999') {
    lockScreen.classList.add('is-open');
    document.body.classList.remove('is-locked');
    passwordError.textContent = '';
    return;
  }

  passwordError.textContent = 'That date is not quite right. Try again.';
  passwordInput.select();
});

function celebrate() {
  wishStatus.textContent = 'Wish released. May this year be wonderfully yours.';
  wishButton.querySelector('span:first-child').textContent = 'Wish made';
  wishButton.disabled = true;

  for (let index = 0; index < 48; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.borderRadius = index % 3 === 0 ? '50%' : '1px';
    confettiLayer.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

wishButton.addEventListener('click', celebrate);
soundToggle.addEventListener('click', () => {
  const isOn = soundToggle.getAttribute('aria-pressed') === 'true';
  if (isOn) {
    birthdaySong.pause();
    soundToggle.setAttribute('aria-pressed', 'false');
    soundLabel.textContent = 'Good vibes';
    return;
  }

  birthdaySong.play().then(() => {
    soundToggle.setAttribute('aria-pressed', 'true');
    soundLabel.textContent = 'Music on';
  }).catch(() => {
    soundLabel.textContent = 'Tap to play';
  });
});

birthdaySong.addEventListener('ended', () => {
  soundToggle.setAttribute('aria-pressed', 'false');
  soundLabel.textContent = 'Good vibes';
});

answerYes.addEventListener('click', () => {
  answerStatus.textContent = 'Yay! Your special surprise is already waiting in the memories above. ♥';
  answerYes.textContent = 'Surprise unlocked ♥';

  if (giftReveal) {
    giftReveal.classList.add('is-visible');
    giftReveal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

answerNo.addEventListener('click', () => {
  answerStatus.textContent = 'That is okay. The surprise will wait for you. ♡';
});
