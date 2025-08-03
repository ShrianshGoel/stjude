

const layers = document.querySelectorAll(".lr");
console.log(layers);

let xvalue = 0, yvalue = 0;

window.addEventListener("mousemove", function(e) {
  xvalue = e.clientX - (window.innerWidth / 2);
  yvalue = e.clientY - (window.innerHeight / 2);

  layers.forEach((el) => {
    let speedX = parseFloat(el.dataset.speedX);
   speedX=parseFloat(xvalue*speedX);
 var speedY=parseFloat(el.dataset.speedY);
 speedY=parseFloat(yvalue*speedY);
    el.style.transform = `translateX(calc(${-speedX}px)) translateY(calc(${speedY}px))`;
  });
});
layers.forEach(el=>{
el.style.animationDuration=(Math.random()+0.3)*2.3+"s";
});
const container = document.querySelector(".items");
let imageIndex = 1;
let currentPlaying = false;


const minDistance = 50;
let lastX = null, lastY = null;

function addNewItem(x, y) {
  const newItem = document.createElement("div");
  newItem.className = "item";
  newItem.style.left = `${x - 75}px`;
  newItem.style.top = `${y - 100}px`;

  const img = document.createElement('img');
  img.src = `./style/t${imageIndex}.png`;

  if (imageIndex === 8) {
    imageIndex = 0;
  }
  imageIndex += 1;

  newItem.appendChild(img);
  container.appendChild(newItem);


  // After 20 seconds, trigger fall animation
  setTimeout(() => {
    newItem.classList.add("fall");
    
    // Optional: remove from DOM after fall completes (3s here)
    setTimeout(() => {
      if (newItem.parentElement) {
        newItem.parentElement.removeChild(newItem);
      }
    }, 400);
  }, 400);

  manageItemLimit();
}

function manageItemLimit(){
  while (container.children.length > 7){
    container.removeChild(container.firstChild);
  }
}

container.addEventListener("mousemove", function(e){
  // Skip if first movement
  if (lastX === null || lastY === null) {
    lastX = e.clientX;
    lastY = e.clientY;
    addNewItem(e.clientX, e.clientY);
    return;
  }

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const dist = Math.hypot(dx, dy);

  if (dist >= minDistance) {
    addNewItem(e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

function startAnimation(){
  if (currentPlaying || container.children.length === 0) return;
  currentPlaying = true;

}
