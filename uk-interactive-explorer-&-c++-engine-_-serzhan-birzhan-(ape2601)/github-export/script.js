/**
 * Standalone JavaScript for UK Geo-Tech Portal
 * Author: Serzhan Birzhan (APE2601)
 */

// Web Audio API Sound Synthesizer
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(freq, duration = 0.2, type = 'sine') {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn(e);
  }
}

const countryData = {
  scotland: {
    name: 'Шотландия (Scotland)',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    capital: 'Эдинбург (Edinburgh)',
    desc: 'Занимает 32.1% площади Великобритании. Имеет собственный парламент в Holyrood и лидерство в морской ветроэнергетике.',
    bullets: [
      'Высшая точка Великобритании: гора Бен-Невис (1,345 м).',
      'Крупнейший город: Глазго — мировой хаб малых спутников.',
      'Экспорт шотландского виски превышает £5.6 млрд ежегодно.'
    ]
  },
  england: {
    name: 'Англия (England)',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    capital: 'Лондон (London)',
    desc: 'Крупнейшая страна Соединенного Королевства (84% населения, 53.7% территории).',
    bullets: [
      'Лондон — второй по величине финансовый центр мира.',
      'Родина промышленной революции (Манчестер, Бирмингем).',
      'Золотой научный треугольник: Oxford, Cambridge, London.'
    ]
  },
  wales: {
    name: 'Уэльс (Wales)',
    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    capital: 'Кардифф (Cardiff)',
    desc: 'Двуязычный регион с парламентом Senedd Cymru. Крупнейший кластер высокотехнологичного машиностроения.',
    bullets: [
      'Все композитные крылья для лайнеров Airbus производятся в Бротоне (Уэльс).',
      'Высшая точка: пик Сноудон / Yr Wyddfa (1,085 м).',
      '2,700 км береговой линии и национальные парки.'
    ]
  },
  ni: {
    name: 'Северная Ирландия (Northern Ireland)',
    flag: '🇬🇧',
    capital: 'Белфаст (Belfast)',
    desc: 'Единственная часть Великобритании с сухопутной границей с ЕС (Ирландией). Ассамблея в Стормонте.',
    bullets: [
      'Европейский кластер кибербезопасности и финтех-софта.',
      'Озеро Лох-Ней (392 км²) — крупнейшее пресное озеро Британских островов.',
      'Родина верфей Harland & Wolff (постройка «Титаника»).'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const soundBtn = document.getElementById('soundToggle');
  soundBtn?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? '🔊 Sound ON' : '🔇 Muted';
    if (soundEnabled) playTone(587, 0.15);
  });

  ['scotland', 'england', 'wales', 'ni'].forEach(id => {
    const el = document.getElementById('path-' + id);
    if (!el) return;
    el.addEventListener('click', () => {
      playTone(id === 'scotland' ? 659 : id === 'england' ? 440 : id === 'wales' ? 523 : 784, 0.25);
      const data = countryData[id];
      if (!data) return;
      document.getElementById('detFlag').textContent = data.flag;
      document.getElementById('detTitle').textContent = data.name;
      document.getElementById('detCapital').textContent = 'Столица: ' + data.capital;
      document.getElementById('detDescription').textContent = data.desc;
      
      const ul = document.getElementById('detBullets');
      ul.innerHTML = '';
      data.bullets.forEach(b => {
        const li = document.createElement('li');
        li.textContent = b;
        ul.appendChild(li);
      });
      document.getElementById('currentSelection').textContent = 'Выбран: ' + data.name;
    });
  });
});
