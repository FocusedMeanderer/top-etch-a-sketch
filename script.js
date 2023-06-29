const container = document.querySelector('div.container');
const go = document.querySelector('button.go');
let   newDim = 16;
const GRID_SZ = 800;
const PENS = {
  black:  { r: 0,   g: 0,   b: 0   },
  red:    { r: 255, g: 0,   b: 0   },
  orange: { r: 255, g: 165, b: 0   },
  yellow: { r: 255, g: 255, b: 0   },
  green:  { r: 0,   g: 255, b: 0   },
  blue:   { r: 0,   g: 0,   b: 255 },
  indigo: { r: 750, g: 0,   b: 130 },
  violet: { r: 238, g: 130, b: 238 },
  kaleidoscope: { r: -1, g: -1, b: -1 }
}
let pen = PENS['black'];

const clear = document.querySelector('button.clear');
const colors = document.querySelector('div.colors');

function createGrid(dim = 16) {
  for (let i = 0; i < dim*dim; i++) {
    const aDiv = document.createElement('div');
    aDiv.style.width = `${Math.floor(GRID_SZ/dim * 100) / 100}px`;
    aDiv.style.height = `${Math.floor(GRID_SZ/dim * 100) / 100}px`;
    aDiv.style.border = '1px solid black';
    aDiv.style.border = '1px dotted lightgrey';
    aDiv.style.textAlign = 'center';
    aDiv.classList.add('grid-item');
    aDiv.dataset.intensity = 0.1;

    container.appendChild(aDiv);
  }
}

function removeGrid() {
  const divs = document.querySelectorAll('div.grid-item');

  divs.forEach(aDiv => {
    container.removeChild(aDiv);
  });
}

function recreateGrid(e){
  if (validateInput()) {
    removeGrid();
    createGrid(newDim);
  }
  else {
    alert('Check your input!')
  }
}

function validateInput() {
  newDim = document.querySelector('input#dimension').value;

  if (Number.isInteger(+newDim) && (+newDim > 0 && +newDim <= 100)) {
    newDim = +newDim;
    return true;
  }

  return false;
}

createGrid();

go.addEventListener('click', recreateGrid);
clear.addEventListener('click', clearCanvas);
colors.addEventListener('click', setPenColor);

function setPenColor(e) {
  if (e.target.classList.contains('pen')) {
    const penColor = document.querySelector('div.palette');

    if (e.target.id === 'kaleidoscope') {
      penColor.style.backgroundImage = 'linear-gradient(to right, black, indigo)';
    }
    else {
      penColor.style.backgroundImage = '';
      penColor.style.backgroundColor = e.target.id;
    }
    
    pen = PENS[e.target.id];
  }
}

function clearCanvas(e) {
  const divs = document.querySelectorAll('div.grid-item');

  divs.forEach(aDiv => {
    aDiv.style.backgroundColor = 'white';
    aDiv.dataset.intensity = 0.1;
  });
}

function fillItem(e) {
  if (e.target.classList.contains('grid-item')) {
    if (pen['r'] === -1 && pen['g'] === -1 && pen['b'] === -1) {
      e.target.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${e.target.dataset.intensity})`;
    }
    else {
      e.target.style.backgroundColor = `rgba(${pen['r']},${pen['g']},${pen['b']},${e.target.dataset.intensity})`;
    }
    if ((e.target.dataset.intensity * 10) < 10) {
      e.target.dataset.intensity = ((e.target.dataset.intensity * 10) + 1)/10;
    }
  }

  e.stopPropagation();
}

container.addEventListener('mouseover', fillItem);
