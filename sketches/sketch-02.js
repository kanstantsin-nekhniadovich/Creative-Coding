const canvasSketch = require('canvas-sketch');
const { math, random } = require('canvas-sketch-util');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = width * 0.3;

    const w = width * 0.01;
    const h = width * 0.1;

    context.fillStyle = 'black';

    const num = 30;
    const slice = math.degToRad(360 / num);
    
    for (let i = 0; i < num; i++) {
      const angle = slice * i;

      const x = cx + radius * Math.sin(angle);
      const y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));
      context.beginPath();
      context.fillRect(-0.5 * w, random.range(0, -h * 0.5), w, h);
      context.restore();

      context.lineWidth = random.range(5, 15);

      context.save();
      context.translate(cx, cy);
      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), 0.5 * random.range(0, -10), random.range(0, 1));
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
