// ===== NHẠC =====
const bgm = document.getElementById("bgm");

function startMusic() {
  bgm.volume = 0.5;
  bgm.play().catch(() => {});
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);


// ===== SAO + POPUP =====
const stars = ["⭐","🌟","✨","💫","🌠","✦","✧"];

const cards = [
  { img:"anh1.jpg", text:"❤️Chúc NThư năm mới sẽ có thêm thật là nhiều niềm vui ❤️" },
  { img:"anh2.jpg", text:"Sau gặp lại đừng có nhìn t thế này nhá" },
  { img:"anh1.jpg", text:"😍Chúc Thư sang năm mới sẽ ngày càng xinh đẹp hơn cả 😍" },
  { img:"anh3.jpg", text:"💔Có gặp lại đừng tỏ ra không quen biết nhe💔" },
  { img:"anh1.jpg", text:"💕Mong Thư sẽ luôn nhận được sự yêu thương và trân trọng 💕" },
  { img:"anh1.jpg", text:"☁️Chúc cho Thư có một năm nhẹ nhàng và ít phải lo nghĩ nhe ☁️" },
  { img:"anh1.jpg", text:"💜Mong cho Thư có một năm thật thuận lợi và hạnh phúc 💜" }
];

// preload ảnh
cards.forEach(card => {
  const img = new Image();
  img.src = card.img;
});

let currentIndex = 0;

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");

function createStar() {
  const star = document.createElement("div");
  star.className = "star";
  star.textContent = stars[Math.floor(Math.random()*stars.length)];

  star.style.left = Math.random()*window.innerWidth + "px";
  star.style.fontSize = (24 + Math.random()*20) + "px";
  star.style.animationDuration = (6 + Math.random()*4) + "s";

  star.onclick = () => {
    popupImg.src = cards[currentIndex].img;
    popupText.innerText = cards[currentIndex].text;
    popup.style.display = "flex";

    currentIndex++;
    if(currentIndex >= cards.length){
      currentIndex = 0;
    }
  };

  document.body.appendChild(star);
  setTimeout(() => star.remove(), 12000);
}

setInterval(createStar, 700);

popup.onclick = () => {
  popup.style.display = "none";
};


// ===== PHÁO HOA =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

class Firework {
  constructor() {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height*0.6;
    this.particles = [];
    this.color = `hsla(${Math.random()*360},80%,65%,0.8)`;

    for(let i=0;i<20;i++){
      this.particles.push({
        x:this.x,
        y:this.y,
        a:Math.random()*Math.PI*2,
        s:Math.random()*1.5+0.5,
        l:60
      });
    }
  }

  update(){
    this.particles.forEach(p=>{
      p.x+=Math.cos(p.a)*p.s;
      p.y+=Math.sin(p.a)*p.s;
      p.l--;
    });
    this.particles=this.particles.filter(p=>p.l>0);
  }

  draw(){
    this.particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,1.5,0,Math.PI*2);
      ctx.fillStyle=this.color;
      ctx.fill();
    });
  }
}

let fireworks = [];

function animate(){
  ctx.fillStyle="rgba(0,0,20,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if(Math.random()<0.04) fireworks.push(new Firework());

  fireworks.forEach((f,i)=>{
    f.update();
    f.draw();
    if(!f.particles.length) fireworks.splice(i,1);
  });

  requestAnimationFrame(animate);
}

animate();
