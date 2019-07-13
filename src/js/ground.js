var Ground = jsUtil.single(Square);
var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLen * SQUAREWIDTH, YLen * SQUAREWIDTH, document.createElement('div'));
// console.log(ground)
ground.init = function () {
    //this ground

    this.viewContent.style.position = 'absolute';
    this.viewContent.style.backgroundColor = '#0ff';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';

    document.body.appendChild(this.viewContent);

    this.SquareTable = [];

    for (var i = 0; i < YLen; i ++) {
        //(x, y) => (j, i)
        this.SquareTable[i] = new Array(XLen);
        for (var j = 0; j < XLen; j ++) {
            //生成小方块
            var newSquare = null; 
            if (j == 0 || i == 0 || j == XLen - 1 || i == YLen - 1) {
                newSquare = SquareFactory.create('Stone', j, i, 'black');
            } else {
                newSquare = SquareFactory.create('Floor', j, i, 'orange');
            }

            this.SquareTable[i][j] = newSquare;

            this.viewContent.appendChild(newSquare.viewContent)
        }
    } 

    ground.remove = function (x, y) {
        this.viewContent.removeChild(this.SquareTable[y][x].viewContent);
        this.SquareTable[y][x] = null;

    }

    ground.append = function (x, y, square) {
        this.SquareTable[y][x] = square;
        this.viewContent.appendChild(square.viewContent);
    }
}

