//广场
var XLen = 30;
var YLen = 30;

//每个方格的宽度
var SQUAREWIDTH = 20;

var BASE_X_POINT = 200;
var BASE_Y_POINT = 50;


//蛇每走一次的时间间隔
var INTERVAL = 350;

//定义方块基类
function Square (x, y, width, height, dom) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.viewContent = dom || null;
}

// Square.prototype.touch = function () {
//     console.log('touch')
// }

var Floor = jsUtil.extends(Square);

var Stone = jsUtil.extends(Square);

var Food = jsUtil.extends(Square);

var SnakeHead = jsUtil.extends(Square);

var SnakeBody = jsUtil.extends(Square);

var Snake = jsUtil.extends(Square)

var Game = jsUtil.single();

var TOUCHENUM = {
    DIE: 'DIE',
    EAT: 'EAT',
    MOVE: 'MOVE'
}