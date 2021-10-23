const canvasSketch = require('canvas-sketch');
const { random } = require('canvas-sketch-util');

const settings = {
  dimensions: [2048, 2048]
};

let text = 'Text';
let fontSize = 1000;
let fontFamily = 'serif';

let manager;

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cells = 15;
  const cols = Math.floor(width / cells);
  const rows = Math.floor(height / cells);

  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return () => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols / 2;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft;
    const my = metrics.actualBoundingBoxAscent;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 + mx;
    const ty = (rows - mh) * 0.5 + my;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'align';

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cells;
      const y = row * cells;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.font = `${cells}px ${fontFamily}`;

      if (Math.random() < 0.1) {
        context.font = `${cells * 2}px ${fontFamily}`;
      }

      context.fillStyle = 'black';

      context.save();
      context.translate(x, y);
      context.fillText(glyph, 0, 0);

      context.restore();
    }

  };
};

const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return '.';
  if (v < 150) return '-';
  if (v < 200) return '*';

  const glyphs = ['_', '=', '/', 'some'];

  return random.pick(glyphs);
}

const onKeyup = (e) => {
  text = e.key.toUpperCase();
  manager.render();
}

document.addEventListener('keyup', onKeyup);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

start();
