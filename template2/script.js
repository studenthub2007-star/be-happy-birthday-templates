const intro = document.getElementById("intro");
const mainPage = document.getElementById("mainPage");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const canvas = document.getElementById("loveCanvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const cake = document.getElementById("cake");
const cakeText = document.getElementById("cakeText");

let startedAt = performance.now();
let opened = false;
let particles = [];

function resizeCanvas(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const chars = ["L","O","V","E","♥","U","♥","M","E"];

function makeParticle(){
  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;
  const angle = Math.random() * Math.PI * 2;
  const radius = 80 + Math.random() * Math.max(innerWidth, innerHeight) * .45;
  return {
    x:centerX + Math.cos(angle)*radius,
    y:centerY + Math.sin(angle)*radius,
    vx:(centerX-(centerX + Math.cos(angle)*radius))*0.0009 + (Math.random()-.5)*.15,
    vy:(centerY-(centerY + Math.sin(angle)*radius))*0.0009 + (Math.random()-.5)*.15,
    size:8 + Math.random()*10,
    char:chars[Math.floor(Math.random()*chars.length)],
    alpha:.15 + Math.random()*.7,
    pink:Math.random() > .35
  };
}
for(let i=0;i<220;i++) particles.push(makeParticle());

function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const p of particles){
    p.x += p.vx;
    p.y += p.vy;
    p.vy += .0015;
    if(p.y > innerHeight+30 || p.x < -30 || p.x > innerWidth+30){
      Object.assign(p, makeParticle(), {y:-20});
    }
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.font = `${p.size}px Arial`;
    ctx.fillStyle = p.pink ? "#ff5b9d" : "#fff4fa";
    ctx.shadowBlur = p.pink ? 10 : 5;
    ctx.shadowColor = p.pink ? "#ff3c87" : "#ffffff";
    ctx.fillText(p.char,p.x,p.y);
    ctx.restore();
  }
  requestAnimationFrame(draw);
}
draw();

function updateProgress(){
  if(opened) return;
  const elapsed = performance.now() - startedAt;
  const pct = Math.min(elapsed / 20000, 1);
  progressBar.style.width = (pct * 100) + "%";
  if(pct < 1) requestAnimationFrame(updateProgress);
}
updateProgress();

function openMainPage(){
  if(opened) return;
  opened = true;
  intro.classList.add("hidden");
  mainPage.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"instant"});
  createSparkles();
}

setTimeout(() => {
  nextBtn.style.pointerEvents = "auto";
}, 20000);

nextBtn.addEventListener("click", openMainPage);

function createSparkles(){
  const layer = document.getElementById("sparkles");
  for(let i=0;i<35;i++){
    const s=document.createElement("span");
    s.className="sparkle";
    s.style.left=(Math.random()*100)+"%";
    s.style.top=(Math.random()*100)+"%";
    s.style.animationDelay=(Math.random()*2)+"s";
    layer.appendChild(s);
  }
}

document.getElementById("scrollGallery").addEventListener("click",()=>{
  document.getElementById("gallery").scrollIntoView({behavior:"smooth"});
});

musicBtn.addEventListener("click", async ()=>{
  try{
    if(music.paused){
      await music.play();
      musicBtn.textContent="♫ Playing";
    }else{
      music.pause();
      musicBtn.textContent="♫ Music";
    }
  }catch{
    musicBtn.textContent="Add assets/music.mp3";
  }
});

document.querySelectorAll(".photo-input").forEach(input=>{
  input.addEventListener("change",()=>{
    const card=input.closest(".photo-card");
    const img=card.querySelector(".memory-image");
    const file=input.files && input.files[0];
    if(!file) return;
    const url=URL.createObjectURL(file);
    img.src=url;
    card.classList.add("has-image");
  });
});

let cakeCut=false;
function cutCake(){
  if(cakeCut) return;
  cakeCut=true;
  cake.style.transform="rotate(-4deg) scale(.96)";
  cakeText.textContent="Wish made! ❤️ May your dream come true.";
  for(let i=0;i<25;i++){
    const heart=document.createElement("span");
    heart.textContent="♥";
    heart.style.position="fixed";
    heart.style.left=(50 + (Math.random()-.5)*18)+"%";
    heart.style.top="55%";
    heart.style.color="#ff5b9d";
    heart.style.fontSize=(12+Math.random()*20)+"px";
    heart.style.zIndex="100";
    document.body.appendChild(heart);
    const dx=(Math.random()-.5)*260;
    const dy=-80-Math.random()*220;
    heart.animate([
      {transform:"translate(0,0) scale(.6)",opacity:1},
      {transform:`translate(${dx}px,${dy}px) scale(1.2)`,opacity:0}
    ],{duration:1200+Math.random()*900,easing:"cubic-bezier(.2,.8,.2,1)"}).onfinish=()=>heart.remove();
  }
}
cake.addEventListener("click",cutCake);
cake.addEventListener("keydown",e=>{
  if(e.key==="Enter" || e.key===" ") {e.preventDefault();cutCake();}
});
