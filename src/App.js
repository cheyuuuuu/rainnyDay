import Sketch from "react-p5";
import "./App.css";

function App() {
  let drops = [];
  const dropsCount = 500;
  const umbrellaSize = 300;
  const minHeight = 700;

  // setup() 函數在畫布創建時執行一次
  const setup = (p5, canvasParentRef) => {
    // 創建畫布並將其附加到父元素
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(100);
    //初始化雨滴
    for (let i = 0; i < dropsCount; i++) {
      drops.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        length: p5.random(10, 20),
        speed: p5.random(2, 6),
      });
    }
  };

  // draw() 函數持續循環執行
  const draw = (p5) => {
    //背景色
    p5.background(230, 230, 250);
    //雨滴顏色
    p5.stroke(138, 143, 226);
    //雨滴粗細
    p5.strokeWeight(p5.random(1, 2));

    const limitedMouseY = p5.constrain(p5.mouseY, minHeight, p5.height);

    //畫出雨滴
    drops.forEach((drop) => {
      p5.line(drop.x, drop.y, drop.x, drop.y + drop.length);

      drop.y += drop.speed;

      //重置超出畫面的雨滴
      if (drop.y > p5.height) {
        drop.y = -drop.length;
        drop.x = p5.random(p5.width);
      }
      //判斷雨滴有沒有碰到傘
      const distance = p5.dist(drop.x, drop.y, p5.mouseX, limitedMouseY);
      if (distance < umbrellaSize / 2) {
        drop.y = -drop.length;
        drop.x = p5.random(p5.width);
      }
    });
    //畫出雨傘
    // 畫三角形傘
    p5.push(); // 保存當前繪圖狀態

    // 畫傘柄
    p5.stroke(100);
    p5.strokeWeight(4);
    p5.line(p5.mouseX, limitedMouseY, p5.mouseX, limitedMouseY + 100);

    // 畫三角形傘面
    p5.fill(200, 100, 100, 200); // 紅色半透明
    p5.stroke(150, 75, 75);
    p5.strokeWeight(2);
    p5.triangle(
      p5.mouseX - umbrellaSize / 2,
      limitedMouseY, // 左頂點
      p5.mouseX + umbrellaSize / 2,
      limitedMouseY, // 右頂點
      p5.mouseX,
      limitedMouseY - umbrellaSize / 2 // 上頂點
    );

    p5.pop(); // 恢復繪圖狀態
  };

  const windowResized = (p5) => {
    // 當視窗大小改變時，重新設置畫布大小
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  // const mousePressed = (p5) => {
  //   // 滑鼠點擊時執行的程式
  // };

  const cleanup = (p5) => {
    p5.remove();
  };

  return (
    <div className="App">
      <Sketch
        setup={setup}
        draw={draw}
        unmount={cleanup}
        windowResized={windowResized}
      />
    </div>
  );
}

export default App;
