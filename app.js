const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
//const saveBtn = document.addEventListener("jsSave");
const saveBtn = document.getElementById("jsSave");
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}
function startPainting(){
  painting = true;
}
function onMouseMove(event){
  const x = event.offsetX;  //캔버스 위의 마우스 포인터의 좌표 x
  const y = event.offsetY;  //캔버스 위의 마우스 포인터의 좌표 y
  if(!painting){
    ctx.beginPath();  // path == line 을 만든다. path는 line이긴 한데 그려진 건 아니고 위치를 저장해놓은 거지.
    ctx.moveTo(x,y);  // 마우스 포인터를 따라 path를 움직이는 거지.
  } else{
    ctx.lineTo(x, y);  // 이전 위치에서 현재 위치까지 직선을 저장한다.(아직 화면에 그린 건 아니고 path를 통해 직선을 저장(?)해놓는거지.)
    ctx.stroke();  // stroke를 통해 화면에 stroke.style로 직선(line)을 그린다.
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;

}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else{
    filling = true;
    mode.innerText = "Paint";

  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);  // 마우스 포인터 움직임 감지
  canvas.addEventListener("mousedown", startPainting);  // mousedown은 클릭할 때 발생하는 event
  canvas.addEventListener("mouseup", stopPainting);  // mouseupd은 클릭을 하지 않을 때 발생하는 event
  canvas.addEventListener("mouseleave", stopPainting); //mouse 포인터가 canvas 밖으로 벗어나는 event
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); // 화면에서 특정 색상을 클릭하면 handleColorClike()으로 이동

if (range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}