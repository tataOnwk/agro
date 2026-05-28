// AgroMundo Kids — script.js | Por Thaina

/* === CURIOSIDADES === */
function revealFact(box) {
  const front = box.querySelector('.fact-front');
  const back  = box.querySelector('.fact-back');
  if (back.classList.contains('hidden')) {
    front.classList.add('hidden');
    back.classList.remove('hidden');
    box.style.background = 'linear-gradient(135deg,#FFD93D,#FFB347)';
    box.style.color = '#2D1B00';
  } else {
    back.classList.add('hidden');
    front.classList.remove('hidden');
    box.style.background = '';
    box.style.color = '';
  }
}

/* === JOGO === */
const plants = [
  { emoji:'🌽', name:'Milho',    soil:'argiloso', tip:'O milho ama solo argiloso, que retém umidade!' },
  { emoji:'🌻', name:'Girassol', soil:'arenoso',  tip:'Girassol prefere solo arenoso e bem drenado!' },
  { emoji:'🍅', name:'Tomate',   soil:'humoso',   tip:'Tomate cresce melhor em solo húmico, rico em nutrientes!' },
  { emoji:'🥕', name:'Cenoura',  soil:'arenoso',  tip:'Cenoura precisa de solo arenoso para crescer direito!' },
  { emoji:'🌿', name:'Hortelã',  soil:'humoso',   tip:'Hortelã adora solo húmico com bastante matéria orgânica!' },
  { emoji:'🍋', name:'Limão',    soil:'calcario', tip:'Limoeiro se dá bem em solo calcário e bem drenado!' },
  { emoji:'🥦', name:'Brócolis', soil:'argiloso', tip:'Brócolis gosta de solo argiloso, rico em nutrientes!' },
  { emoji:'🌾', name:'Trigo',    soil:'argiloso', tip:'Trigo precisa de solo argiloso com boa retenção de água!' },
];

let gameScore=0, gameLevel=1, currentIndex=0, answered=false, shuffledPlants=[];

function initGame() {
  shuffledPlants = [...plants].sort(() => Math.random()-0.5);
  currentIndex=0; gameScore=0; gameLevel=1; answered=false;
  updateGameUI(); renderPlant();
}

function renderPlant() {
  const p = shuffledPlants[currentIndex];
  document.getElementById('currentPlant').textContent = p.emoji;
  document.getElementById('plantName').textContent    = p.name;
  document.getElementById('feedback').textContent     = '';
  document.getElementById('nextBtn').style.display    = 'none';
  answered = false;
  document.querySelectorAll('.soil').forEach(s => s.classList.remove('correct','wrong'));
}

function tryPlant(soilEl) {
  if (answered) return;
  const p = shuffledPlants[currentIndex];
  answered = true;
  const fb = document.getElementById('feedback');
  if (soilEl.dataset.type === p.soil) {
    soilEl.classList.add('correct');
    gameScore += 10 * gameLevel;
    fb.textContent = '✅ Correto! ' + p.tip;
    fb.style.color = '#4CAF50';
    launchConfetti();
  } else {
    soilEl.classList.add('wrong');
    document.querySelectorAll('.soil').forEach(s => { if (s.dataset.type===p.soil) s.classList.add('correct'); });
    fb.textContent = '❌ Quase! ' + p.tip;
    fb.style.color = '#F44336';
  }
  updateGameUI();
  document.getElementById('nextBtn').style.display = 'block';
}

function nextPlant() {
  currentIndex++;
  if (currentIndex >= shuffledPlants.length) {
    shuffledPlants = [...plants].sort(() => Math.random()-0.5);
    currentIndex=0; gameLevel++;
  }
  renderPlant();
}

function updateGameUI() {
  document.getElementById('score').textContent = gameScore;
  document.getElementById('level').textContent = gameLevel;
}

function launchConfetti() {
  const colors = ['#FFD93D','#FF6B35','#FF8C42','#4CAF50','#87CEEB'];
  for (let i=0; i<30; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `position:fixed;width:10px;height:10px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:50%;top:\({Math.random()*60+20}%;left:\){Math.random()*80+10}%;
      pointer-events:none;z-index:9999;animation:confettiFall 1.2s ease forwards;`;
    document.body.appendChild(dot);
    setTimeout(()=>dot.remove(), 1400);
  }
}
const s = document.createElement('style');
s.textContent = `@keyframes confettiFall{from{opacity:1;transform:translateY(0) rotate(0deg)}to{opacity:0;transform:translateY(120px) rotate(360deg)}}`;
document.head.appendChild(s);

/* === QUIZ === */
const quizData = [
  { question:'🛰️ Para que serve um satélite na agricultura?',
    options:['Para conectar à internet','Para fotografar e monitorar plantações do espaço','Para fazer chuva artificial','Para controlar tratores'],
    correct:1, explanation:'✅ Satélites fotografam plantações e detectam problemas como secas e pragas.' },
  { question:'🌧️ Por que a previsão do tempo é importante para os agricultores?',
    options:['Para saber que roupa usar','Para programas de TV','Para plantar e colher na hora certa','Para aumentar o sinal do celular'],
    correct:2, explanation:'✅ Saber quando vai chover ajuda a economizar água e proteger a colheita.' },
  { question:'📱 Como os apps de agro tech ajudam os fazendeiros?',
    options:['Só servem para redes sociais','Mostram mapas, alertas de pragas e previsão do tempo','Fazem o plantio automático','Substituem o agricultor'],
    correct:1, explanation:'✅ Apps modernos colocam dados da fazenda na palma da mão.' },
  { question:'🌱 O que a tecnologia pode detectar nas plantas antes que seja tarde?',
    options:['A cor favorita do agricultor','Quantos anos tem a planta','Doenças e falta de nutrientes','O sabor do fruto'],
    correct:2, explanation:'✅ Sensores identificam doenças cedo, salvando a plantação inteira.' },
  { question:'💧 Quanto de água pode ser economizado com irrigação inteligente?',
    options:['5%','15%','30%','Até 50%'],
    correct:3, explanation:'✅ A irrigação inteligente pode economizar até 50% de água!' },
];

let currentQuestion=0, quizScore=0;

function initQuiz() {
  currentQuestion=0; quizScore=0;
  document.getElementById('qTotal').textContent   = quizData.length;
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizBox').style.display    = 'block';
  renderQuestion();
}

function renderQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById('qNum').textContent         = currentQuestion+1;
  document.getElementById('questionText').textContent = q.question;
  document.getElementById('quizFeedback').textContent = '';
  const box = document.getElementById('optionsBox');
  box.innerHTML = '';
  q.options.forEach((opt,i) => {
    const btn = document.createElement('button');
    btn.className='option-btn'; btn.textContent=opt;
    btn.onclick=()=>selectAnswer(i,btn);
    box.appendChild(btn);
  });
}

function selectAnswer(index,btn) {
  const q   = quizData[currentQuestion];
  const fb  = document.getElementById('quizFeedback');
  const all = document.querySelectorAll('.option-btn');
  all.forEach(b=>b.disabled=true);
  if (index===q.correct) {
    btn.classList.add('correct');
    quizScore++;
    fb.textContent=q.explanation; fb.style.color='#4CAF50';
    launchConfetti();
  } else {
    btn.classList.add('wrong');
    all[q.correct].classList.add('correct');
    fb.textContent='❌ ' + q.explanation; fb.style.color='#F44336';
  }
  setTimeout(()=>{ currentQuestion++; currentQuestion<quizData.length ? renderQuestion() : showResult(); }, 2200);
}

function showResult() {
  document.getElementById('quizBox').style.display    = 'none';
  document.getElementById('quizResult').style.display = 'block';
  const pct = quizScore/quizData.length;
  const emoji = pct===1 ? '🏆🌟' : pct>=0.6 ? '🎉😊' : '💪📚';
  const text  = pct===1
    ? `Perfeito! \({quizScore} de \){quizData.length} acertos!\nVocê é um gênio do Agro Tech!`
    : pct>=0.6
    ? `Muito bom! \({quizScore} de \){quizData.length} acertos!\nVocê sabe bastante sobre tecnologia no campo!`
    : `\({quizScore} de \){quizData.length} acertos.\nEstude mais e tente de novo — você chega lá!`;
  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultText').textContent  = text;
  if (pct===1) launchConfetti();
}

function restartQuiz() { initQuiz(); }

/* === SCROLL ANIMADO === */
window.addEventListener('DOMContentLoaded', () => {
  initGame();
  initQuiz();
  const sections = document.querySelectorAll('.section, .curiosidades-section, .quiz-section');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
        e.target.style.transition= 'opacity 0.7s ease, transform 0.7s ease';
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(sec => {
    sec.style.opacity  = '0';
    sec.style.transform= 'translateY(40px)';
    obs.observe(sec);
  });
});