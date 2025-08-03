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
