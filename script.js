const container = document.querySelector('#container')
const slider = document.querySelector('.slider')
const sliderValue = document.querySelector('.value')
const colorSelector = document.querySelector('#colorWheel')
const rgbButton = document.querySelector('#rgbButton')
const clearGridButton = document.querySelector('.removeColor')
const eraserButton = document.querySelector('.eraser')
clearGridButton.addEventListener('click',removeGridColor)
rgbButton.addEventListener('click',isRGBClicked)
eraserButton.addEventListener('click',isEraserOn)
colorSelector.onchange = (e)=>setNewColor(e.target.value)
eraserButton.onclick = (e)=>setNewColor(e.target.value)
let rgbButtonOn = false
let eraserButtonOn = false
const DEFAULT_SIZE = 16
const DEFAULT_COLOR = 'black'
let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE
function isEraserOn(){
    eraserButtonOn = !eraserButtonOn
    if(rgbButtonOn){
        isRGBClicked()
    }
    if(eraserButtonOn==true){
        eraserButton.style.backgroundColor= 'gray'
    }else{
        eraserButton.style.backgroundColor ='buttonface'
    }
}
function randomRGB(){
    let r = randomInteger();
    let g = randomInteger();
    let b = randomInteger();
    return `rgb(${r},${g},${b})`
}
function removeGridColor(){
    const pixels = document.querySelectorAll('.grid-pixel')
    pixels.forEach(pixel=>{
        pixel.style.backgroundColor = 'white'
    })
}
function isRGBClicked(){
    rgbButtonOn = !rgbButtonOn
    if(rgbButtonOn==true){
        rgbButton.style.backgroundColor= 'gray'
    }else{
        rgbButton.style.backgroundColor ='buttonface'
    }
}
function randomInteger(){
    return Math.floor(Math.random()*(255+1))
}
function setCurrentSize(newSize){
    currentSize = newSize
}
function setNewColor(newColor){
    currentColor = newColor
}
slider.onmousemove = function(){
    sliderValue.textContent =  `${slider.value} x ${slider.value}`;
    
}
slider.onchange = (e)=>changeSize(e.target.value)

function changeSize(value){
    setCurrentSize(value);
    reloadGrid()
}
function reloadGrid(){
    clearGrid();
    drawSketchArea(currentSize)
}
function clearGrid(){
    container.innerHTML=''
}
function drawSketchArea(size){
    let base = parseInt(size)
    container.style.gridTemplateColumns=`repeat(${base}, 1fr)`
    container.style.gridTemplateRows = `repeat(${base}, 1fr)`
    for(let i = 0;i < base * base;i++){
        const gridPixel = document.createElement('div');
        gridPixel.className = 'grid-pixel';
        container.appendChild(gridPixel);
    }
    const pixels = document.querySelectorAll('.grid-pixel')
    let moved
    pixels.forEach(pixel =>{
        let downListener =()=>{
        moved = true
        }
        let moveListener = ()=>{
            if((moved)&& rgbButtonOn !== true){
                pixel.style.backgroundColor =`${currentColor}`
            }
            if((moved)&&(rgbButtonOn)){
                pixel.style.backgroundColor = randomRGB()
            }
        }
        let upListener = ()=>{
            moved = false
        }
    pixel.addEventListener('mousedown',downListener)
    pixel.addEventListener('mousemove', moveListener)
    pixel.addEventListener('mouseup',upListener)
})
}
window.onload = ()=>{
    drawSketchArea(DEFAULT_SIZE)
}




