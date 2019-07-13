var snake = new Snake();
snake.head = null;
snake.tail = null;

var DIRECTIONENUM = {
    UP: {
        x: 0, y: -1
    },
    DOWN: {
        x: 0, y: 1
    },
    LEFT: {
        x: -1, y: 0
    },
    RIGHT: {
        x: 1, y: 0
    }
}


snake.init = function (ground) {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');


    // 链接蛇
    this.head = snakeHead;

    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;


    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    this.tail = snakeBody2;

    // 默认方向
    this.direction = DIRECTIONENUM.RIGHT;

    // 添加蛇
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead.x, snakeHead.y, snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1.x, snakeBody1.y, snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2.x, snakeBody2.y, snakeBody2);    
}

snake.move = function (ground) {
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // console.log(square.x, square.y);

    if( typeof square.touch == 'function') {
        this.startegies[square.touch()](this, square, ground);
    }
}

snake.startegies =  {
    MOVE: function (snake, square, ground, flag) {
        
        // 新建身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'blue');
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody.x, newBody.y, newBody);


        // 新建头
        // console.log(square, newHead);
        

        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(newHead.x, newHead.y);
        ground.append(newHead.x, newHead.y, newHead);

        snake.head = newHead;
        // console.log(newBody, newHead);
        // // 删尾巴
        // console.log(snake.tail);
        if (!flag) {
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor.x, newFloor.y, newFloor);  
            // console.log(snake.tail);
            snake.tail = snake.tail.last;
        }
    },
    EAT: function (snake, square, ground) {
        this.MOVE(snake, square, ground, true);
        game.score++;


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

        // 拆地板放新食物
        ground.remove(x, y);
        ground.append(food.x, food.y, food);
    },
    DIE: function () {
        game.over();
    }
}