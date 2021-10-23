const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const renderRect = (context) => (options = {}) => {
  const { x = 100, y = 100, width = 400, height = 400, fillStyle, strokeStyle, lineWidth = 2 } = options;
  
  context.beginPath();
  context.lineWidth = lineWidth;
  context.rect(x, y, width, height);
  context.strokeStyle = strokeStyle;
  context.stroke();

  context.fillStyle = fillStyle
  context.fill();
}

const renderCircle = (context) => (options = {}) => {
  const { x = 300, y = 300, radius = 150, fillStyle, strokeStyle, lineWidth = 2 } = options;
  
  context.beginPath();
  context.fillStyle = fillStyle;
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
  
  context.lineWidth = lineWidth;
  context.strokeStyle = strokeStyle;
  context.stroke();
}

const sketch = () => {
  return ({ context, width, height }) => {
    const INITIAL_WIDTH = width * 0.129;
    const radius = width * 0.032;
    const GAP = width * 0.016;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 5; j++) {
        renderRect(context)({ x: (INITIAL_WIDTH + GAP) * i, y: (INITIAL_WIDTH + GAP) * j + GAP, width: INITIAL_WIDTH, height: INITIAL_WIDTH, fillStyle: 'blue' });
        renderRect(context)({ x: (INITIAL_WIDTH + GAP) * i + GAP, y: (INITIAL_WIDTH + GAP) * j + 2 * GAP, width: INITIAL_WIDTH - 2 * GAP, height: INITIAL_WIDTH - 2 * GAP, fillStyle: 'orange', strokeStyle: 'white', lineWidth: 6 });
        renderCircle(context)({ x: (INITIAL_WIDTH + GAP) * i + INITIAL_WIDTH / 2, y: (INITIAL_WIDTH + GAP) * j + INITIAL_WIDTH / 2 + GAP, radius, fillStyle: 'red', strokeStyle: 'black' });        
      }
    }
  };
};

canvasSketch(sketch, settings);
