function SquareFactory () {

}

SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == undefined) {
        throw 'no this type';
    }
    if (SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }

    var newSquare = new SquareFactory.prototype[type](x, y, color);

    return newSquare
}

SquareFactory.prototype.init = function (square, color, touchStrategy) {
    // square.viewContent = x y width height color  body  tochStrategy
    square.viewContent.style.position = 'absolute';
    square .viewContent.style.width = SQUAREWIDTH + 'px';
    square.viewContent.style.height = SQUAREWIDTH + 'px';
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    square.touch = function () {
        return touchStrategy;
    }
}

SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH, document.createElement('div'));
    this.init(floor, color, TOUCHENUM.MOVE);
    return floor;
}

SquareFactory.prototype.Stone = function (x, y, color) {
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH, document.createElement('div'));
    this.init(stone, color, TOUCHENUM.DIE);
    return stone;
}

SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH, document.createElement('div'));
    this.init(food, color, TOUCHENUM.EAT);
    return food;
}

SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH, document.createElement('div'));
    this.init(snakeHead, color, TOUCHENUM.DIE);
    return snakeHead;
}

SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH, document.createElement('div'));
    this.init(snakeBody, color, TOUCHENUM.DIE)
    return snakeBody;
}

