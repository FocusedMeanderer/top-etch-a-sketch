const container = document.querySelector('div.container');
const go = document.querySelector('button.go');
let   newDim = 16;

function createGrid(dim = 16) {
  for (let i = 0; i < dim*dim; i++) {
    const aDiv = document.createElement('div');
    aDiv.style.width = `${Math.floor(100/dim * 100) / 100}%`;
    aDiv.style.height = `${Math.floor(960/dim * 100) / 100}px`;
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

function fillItem(e) {
  if (e.target.classList.contains('grid-item')) {
    e.target.style.backgroundColor = `rgba(0,0,0,${e.target.dataset.intensity})`;
    if ((e.target.dataset.intensity * 10) < 10) {
      e.target.dataset.intensity = ((e.target.dataset.intensity * 10) + 1)/10;
    }
  }

  e.stopPropagation();
}

container.addEventListener('mouseover', fillItem);
