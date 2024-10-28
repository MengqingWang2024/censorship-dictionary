let myInput; //variable for input field
let val; //variable for input value
let mainContent;
let replaceWordButton; 
let title;
let emojis = ["❌", "🚫", "⛔","🔞","🤐","🔇","❓"]; 
let wordList = [];
let articleDiv; // div element for displaying article content
let wordListDiv; // div element for displaying word list
let titleDiv; 
let instructionDiv; // div element for displaying instruction
let h1Div;
let titleText = "  '"+ "Censorship Dictionary"+"'  ";
let titleFontSizePercentage = 6.7;
let lineX;
let templateCanvas; 
let x1 = 80;
let x2;
let speed = 2;

function preload(){
  news = loadJSON("data/person.json");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  mainContent = news.results[0].content;
  title = news.results[0].title;

  //textAlign(CENTER, TOP); // 居中对齐，顶部对齐
  setRelativeFontSize(titleFontSizePercentage);
  titleWidth = textWidth(titleText.toUpperCase());
  x2 = windowWidth;

  
  lineX = width / 2;



  // 创建输入框 
  myInput = createInput("");
  myInput.position(70,height-40);
  //resize the input
  myInput.size(width-210);
  myInput.attribute('maxlength', '30'); //set maximum length for input field
  myInput.style('height', '20px'); // 你可以根据需要调整具体的数值


    // 创建替换按钮
    replaceWordButton = createButton('Submit');
    replaceWordButton.position(myInput.x + myInput.width+5, height - 40);
    replaceWordButton.mousePressed(replaceWord);
    replaceWordButton.style('height', '26px'); // 你可以根据需要调整具体的数值




    // 创建主要元素，用于显示文本
    // main = createElement("p", myText);
    // main.position(10, 10);
    // main.style('font-size', '9px');

    // 创建标题
    titleDiv = createDiv("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + title);
    titleDiv.style('font-size', '21px');
    titleDiv.position(width / 2, 150);
    titleDiv.size(width/2 - 70, height / 1.5); 
    titleDiv.style('color', 'white');
    titleDiv.style('font-style', 'italic'); // 设置字体为斜体
    titleDiv.style('color', 'rgba(255,255,255, 0.7)'); // 设置字体颜色为 90% 黑色
    


      // 创建 div 元素，用于显示文章内容
  mainContent = mainContent.replace(/\n/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp');
      articleDiv = createDiv();


 // articleDiv = createDiv(mainContent);
  
  //articleDiv.position(width / 4, 10);
  articleDiv.position(width / 2, height / 3.3);
  articleDiv.style('font-size', '15px');
  //articleDiv.style('overflow', 'auto'); // 添加滚动条
  //articleDiv.size(width-400, height - 60); // 设置尺寸，避免超出屏幕范围
  articleDiv.size(width/2 - 70, height / 1.9); 
  articleDiv.style('color', 'white');
  articleDiv.style('font-style', 'italic'); // 设置字体为斜体
  articleDiv.style('color', 'rgba(255,255,255, 0.7)'); // 设置字体颜色为 90% 黑色
  articleDiv.style('overflow', 'scroll');
  
  let contentParagraph = createElement('p', mainContent);

  // 将 p 元素插入到 div 中
  contentParagraph.parent(articleDiv);

  // 为了让滚动条生效，将 overflow 属性设置为 'auto'
  articleDiv.style('overflow', 'auto');




   // 创建 div 元素，用于显示单词列表
   wordListDiv = createDiv();
   wordListDiv.position(70, 150);
   wordListDiv.style('background-color', 'white');
   wordListDiv.style('color', 'black');
   wordListDiv.style('font-size', '25px');
   wordListDiv.style('display', 'flex'); // 使用 flex 布局
   wordListDiv.style('flex-direction', 'column'); // 垂直排列
   wordListDiv.style('font-style', 'italic'); // 设置字体为斜体
   wordListDiv.style('border', '0.5px solid black'); // 添加黑色边框
   wordListDiv.style('padding-left', '5px'); // 调整左边 padding
   wordListDiv.style('padding-right', '5px'); // 调整右边 padding
   wordListDiv.style('overflow-y', 'auto'); // 垂直滚动条
   wordListDiv.style('max-height', '525px'); // 设置最大高度，超过这个高度将出现滚动条

   displayWordList();

   //显示提示词
   instructionDiv = createDiv("Enter the words you think should be censored and replaced in the news");
   instructionDiv.position(70, height-70);
   instructionDiv.style('color', 'white');
   instructionDiv.style('font-size', '20px');
   instructionDiv.style('font-style', 'italic'); // 设置字体为斜体

}

// 替换内容的函数
function replaceWord() {
  let val = myInput.value();
  mainContent = mainContent.replace(new RegExp(`\\b${val}\\b`, 'gi'), random(emojis));
  title = title.replace(new RegExp(`\\b${val}\\b`, 'gi'), random(emojis));

  // 将当前输入的单词添加到数组中
  wordList.push(val);

  // 更新主要元素的文本
 // main.html(myText);
  articleDiv.html(mainContent);
  titleDiv.html(title);
 
  // 显示单词列表
  displayWordList();

  generateAndSaveImage();

  scrollToLatestWord();
}

function scrollToLatestWord() {
  // 获取底层的原生 DOM 元素
  let divElement = wordListDiv.elt;

  // 滚动到单词列表的最底部
  divElement.scrollTop = divElement.scrollHeight;
}




function displayWordList() {
  wordListDiv.html('');

  for (let i = 0; i < wordList.length; i++) {
    // 创建一个外部的 <div> 元素用于包装单词
    let wordContainer = createElement('div');
    wordContainer.style('margin-bottom', '5px'); // 调整下边距

    // 在外部 <div> 元素中创建单词 <span> 元素
    let wordSpan = createElement('span', wordList[i]);
    wordSpan.style('background-color', 'rgba(255, 255, 255, 0.7)'); // 设置背景颜色
    wordSpan.style('padding', '5px'); // 调整内边距
    wordSpan.style('border', '0.5px solid black'); // 添加黑色边框

    // 将单词 <span> 元素添加到外部 <div> 中
    wordSpan.parent(wordContainer);
    
    // 将外部 <div> 元素添加到 wordListDiv 中
    wordContainer.parent(wordListDiv);
  }
}



// function generateAndSaveImage() {
//   // 将绘制操作放在主 Canvas 上

//   // let canvas = createCanvas(400, 100);
//   // canvas.hide();

//   background(255);
//   textStyle(BOLD);
//   textFont('Arial');
//   text(myInput.value(), 10, 50);

//   // 暂停 draw 函数
//   noLoop();

//   // 保存主 Canvas 为图片
//   saveCanvas('censored_image', 'png');

//   // 恢复 draw 函数
//   loop();
// }

function generateAndSaveImage() {
  // 在模板画布上绘制用户输入的单词
  templateCanvas = createGraphics(1500, 800);
  templateCanvas.background(255); // 清空模板画布
  templateCanvas.textSize(250);
  templateCanvas.fill(0);
  templateCanvas.textStyle(ITALIC);
  templateCanvas.textFont('Arial');
  templateCanvas.textAlign(CENTER, CENTER);
  templateCanvas.text(myInput.value(), templateCanvas.width / 2, templateCanvas.height / 2);
  templateCanvas.textSize(400);
  templateCanvas.text("'", 100, 300);
  templateCanvas.text("'", 1300, 300);
  templateCanvas.strokeWeight(1);
  templateCanvas.line(300, 770, 1200, 770);
  //templateCanvas.line(200, 0, 200, height);
  //templateCanvas.line(1300, 0, 1300, height);
  templateCanvas.rect(0,0,1500,30);
  templateCanvas.textSize(24);
  templateCanvas.text("censorship dictionary", 150, 770);
  templateCanvas.text("censorship dictionary", 1500-150, 770);
  



  // 将模板画布保存为图片
  saveCanvas(templateCanvas, 'censored_image', 'png');
}


//提取内容
function draw() {
  background(20);

  push()
  stroke(255); // 设置线条颜色为黑色
  strokeWeight(0.2);
  line(70, 0, 70, height);
  line(lineX, 0, lineX, height);
  line((width/2+70)/2, 0, (width/2+70)/2, height);
  line(width-70, 0, width-70, height);
  line((width/2-70)/2+width/2, 0, (width/2-70)/2+width/2, height);
  pop()

  push();
  rectMode(CORNER);
  noStroke();
  fill(255); // 设置文字颜色为黑色
  rect(70, 0, width-140, 100); // 绘制白色背景矩形
  pop();

  fill(20); 
  textStyle(BOLD); // 设置为粗体
  textFont('Arial');
  text(titleText.toUpperCase(), x1, 85);
  text(titleText.toUpperCase(), x2, 85);
  x1 += speed;
  x2 += speed;

  if (x1 > windowWidth ) {
    x1 = -titleWidth;
  }

  // 当第二个标题完全移出屏幕时，重置 x2 坐标，并考虑空隙
  if (x2 > windowWidth) {
    x2 = -titleWidth;
  }


  //text("'"+titleText.toUpperCase()+"'", width / 2, 10);

}




function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  // 调整输入框位置
  myInput.position(70,height-40);
  myInput.size(width-210);

  // 调整按钮位置
  replaceWordButton.position(myInput.x + myInput.width+5, height - 40);

  // 调整标题、文章内容和单词列表的位置和尺寸
  titleDiv.position(width / 2, 150);
  articleDiv.position(width / 2, height / 3.3);
  wordListDiv.position(70, 150);
  instructionDiv.position(70, height-70);

  setRelativeFontSize(titleFontSizePercentage);

  lineX = width / 2;


}
function setRelativeFontSize(percentage) {
  let newSize = windowWidth * (percentage / 100);
  textSize(newSize);
}