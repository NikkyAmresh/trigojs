const can = document.getElementById("canvas");
can.height = window.innerHeight;
can.width = window.innerWidth;
const ctx = can.getContext("2d");

const gui = new dat.GUI();

let wave = {
  y: can.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
};

wave = {
  y: can.height / 2,
  length: 0.01,
  amplitude: 298,
  frequency: 0.084,
};


let strokeColor = {
  h: 200,
  s: 50,
  l: 50,
};

let color = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};

const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y", 0, can.height);
waveFolder.add(wave, "length", -0.01, 0.01);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "frequency", -0.01, 1);

const strokeColorFolder = gui.addFolder("strokeColor");

strokeColorFolder.add(strokeColor, "h", 0, 255);
strokeColorFolder.add(strokeColor, "s", 0, 100);
strokeColorFolder.add(strokeColor, "l", 0, 100);

const colorFolder = gui.addFolder("color");

colorFolder.add(color, "r", 0, 255);
colorFolder.add(color, "g", 0, 255);
colorFolder.add(color, "b", 0, 255);
colorFolder.add(color, "a", 0, 1);

ctx.moveTo(0, can.height / 2);
let increment = wave.frequency;
const animate = () => {
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
  ctx.fillRect(0, 0, can.width, can.height);
  requestAnimationFrame(animate);
  ctx.beginPath();
  for (let i = 0; i < can.width; i++) {
    ctx.lineTo(
      i,
      wave.y +
        ((Math.sin(i * wave.length + increment) *
          wave.amplitude)/i)*100
    );
    // ctx.lineTo(
      
    //   wave.y +
    //     ((Math.sin(i * wave.length + increment) *
    //       wave.amplitude)/i)*100,i
    // );
  }
  ctx.strokeStyle = `hsl(${Math.abs(Math.sin(increment) * strokeColor.h)},${
    strokeColor.s
  }%,${strokeColor.l}%)`;
  ctx.stroke();
  increment += wave.frequency;
};

animate();
