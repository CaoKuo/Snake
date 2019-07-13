var game = new Game();
game.timer = null;
game.score = 0;
game.init = function () {
    ground.init();
    snake.init(ground);
}

game.start = function () {
    game.timer = setInterval(function () {
        snake.move(ground);
    }, INTERVAL);
    document.onkeydown = function (e) {
        // 向左走
        if(e.which == 37 && snake.direction != DIRECTIONENUM.RIGHT) {
            snake.direction = DIRECTIONENUM.LEFT;
        }else if (e.which == 38 && snake.direction != DIRECTIONENUM.DOWN) {
            snake.direction = DIRECTIONENUM.UP;
        }else if (e.which == 39 && snake.direction != DIRECTIONENUM.Left) {
            snake.direction = DIRECTIONENUM.RIGHT;
        }else if (e.which == 40 && snake.direction != DIRECTIONENUM.UP) {
            snake.direction = DIRECTIONENUM.DOWN;
        }
    }
}

game.over = function () {
    clearInterval(game.timer);
    alert(this.score);
}




game.init();
game.start();

var x = null;
var y = null;
var flag = true;
while (flag) {
    x = 1 + parseInt(Math.random() * 27);
    y = 1 + parseInt(Math.random() * 27);
    var ok = true;
    for (var i = snake; i; i = snake.next) {
        // 重新创造
        if (x == i.x && y == i.y) {
            ok = false;
            break;
        }
    }
    if (ok) {
        flag = false;
    }
}
    // 生成新食物
var food = SquareFactory.create('Food', x, y, 'green');

console.log(food);
// 拆地板放新食物
ground.remove(x, y);
ground.append(food.x, food.y, food);


//