function createDraggableDiv() {
  const draggableDiv = document.createElement('div');
  draggableDiv.style.width = '100px';
  draggableDiv.style.height = '100px';
  draggableDiv.style.backgroundColor = 'lightgreen';
  draggableDiv.style.position = 'absolute';
  draggableDiv.style.left = '0';
  draggableDiv.style.top = '0';

  // Make the div draggable
  draggableDiv.draggable = true;

  draggableDiv.addEventListener('drag', (event) => {
    // Update the position of the div during the drag
    draggableDiv.style.left = `${event.clientX - draggableDiv.offsetWidth / 2}px`;
    draggableDiv.style.top = `${event.clientY - draggableDiv.offsetHeight / 2}px`;
  });

  document.body.appendChild(draggableDiv);
}

function createConnectButton() {
  const connectButton = document.createElement('button');
  connectButton.textContent = 'Connect Divs';
  connectButton.addEventListener('click', connectDivs);

  document.body.appendChild(connectButton);
}

function connectDivs() {
  // Get all draggable divs
  const draggableDivs = document.querySelectorAll('.draggable');

  // Create lines between draggable divs
  for (let i = 0; i < draggableDivs.length - 1; i++) {
    const line = document.createElement('div');
    line.style.width = '2px';
    line.style.height = '50px'; // Adjust as needed
    line.style.backgroundColor = 'black';
    line.style.position = 'absolute';
    line.style.left = `${parseInt(draggableDivs[i].style.left) + parseInt(draggableDivs[i].style.width)}px`;
    line.style.top = `${parseInt(draggableDivs[i].style.top) + parseInt(draggableDivs[i].style.height) / 2 - 25}px`; // Adjust as needed
    document.body.appendChild(line);
  }
}

// Create draggable div on button click
const addButton = document.createElement('button');
addButton.textContent = 'Add Draggable Div';
addButton.addEventListener('click', createDraggableDiv);
document.body.appendChild(addButton);

// Create connect button
createConnectButton();