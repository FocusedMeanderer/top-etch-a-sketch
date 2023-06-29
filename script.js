const container = document.querySelector('div.container');

function createGrid(dim = 16) {
  for (let i = 0; i < dim*dim; i++) {
    const aDiv = document.createElement('div');
    aDiv.style.width = `${Math.floor(100/16 * 100) / 100}%`;
    aDiv.style.height = '40px';
    aDiv.style.border = '1px solid black';
    aDiv.textContent = +(i+1);
    aDiv.style.border = '1';
    aDiv.style.textAlign = 'center';
    aDiv.classList.add('gridItem');

    container.appendChild(aDiv);
  }
}

function removeGrid() {
  const divs = document.querySelectorAll('div.gridItem');

  console.log(divs);

  divs.forEach(aDiv => {
    container.removeChild(aDiv);
  });
}

createGrid();