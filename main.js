import { CanvasAPI } from './canvas.js'
import { Paint, DRAW, ERASE } from './paint.js'

const canvasElement = document.querySelector('.canvas-js');

const canvas = new CanvasAPI(canvasElement);
const editor = new Paint(canvas);
editor.setMode(DRAW);

const cleanButton = document.querySelector('.clean-button-js');
cleanButton.addEventListener('click', () => {
    editor.clean()
})

const drawButton = document.querySelector('.draw-button-js');
const eraseButton = document.querySelector('.erase-button-js');
const undoButton = document.querySelector('.undo-button-js');

drawButton.addEventListener('click', () => {
    editor.setMode(DRAW)
    drawButton.classList.add('active');
    eraseButton.classList.remove('active');
})

eraseButton.addEventListener('click', () => {
    editor.setMode(ERASE)
    drawButton.classList.remove('active');
    eraseButton.classList.add('active');
})


undoButton.addEventListener('click', () => {
    editor.undo()
})


const colorInput = document.querySelector('#color-input');

colorInput.addEventListener('input', (event) => {

    editor.setColor(event.target.value);
});


const brushSizeInput = document.querySelector('#brush-size');
const brushSizeValue = document.querySelector('#brush-size-value');




brushSizeInput.addEventListener('input', (event) => {

    const newSize = event.target.value;
    brushSizeValue.textContent = newSize;
    editor.setBrushSize(newSize);
});
