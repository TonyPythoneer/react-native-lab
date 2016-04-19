/* rotateLeft */
/* status : OK (20160420)*/
function rotateLeft(matrix: Tile[][]) {
    let rows: number = matrix.length;
    let cols: number = matrix[0].length;
    let res = [];

    /* make matrix */
    for (let row = 0; row < rows; row++) {
        res.push([]);
        for (let col = 0; col < cols; ++col) {
            res[row][col] = matrix[col][cols - row - 1];
        }
    }
    return res;
}


/* Tile */
/* status : OK (20160420)*/
class Tile {
    public oldRow: number = -1;
    public oldColumn: number = -1;
    public markForDeletion: boolean = false;
    public mergedInto: any = null;
    public id: number;
    public static id: number = 0;
    constructor(public value: number = 0, public row: number = -1, public column: number = -1) {
        this.id = Tile.id++;
    }
    moveTo(row: number, column: number): void {
        [this.oldRow, this.oldColumn, this.row, this.column] = [this.row, this.row, row, column];
    }
    isNew(): boolean {
        return this.oldRow === -1 && !this.mergedInto;
    }
    hasMoved() {
        return (this.fromRow() !== -1 && (this.fromRow() !== this.toRow() || this.fromColumn() !== this.toColumn())) ||
            this.mergedInto;
    }
    fromColumn() {
        return this.mergedInto ? this.column : this.oldColumn;
    }
    fromRow(): number {
        return this.mergedInto ? this.row : this.oldRow;
    }
    toRow(): number {
        return this.mergedInto ? this.mergedInto.row : this.row;
    }
    toColumn(): number {
        return this.mergedInto ? this.mergedInto.column : this.column;
    }
}


/* Board */
/* status : OK (20160420)*/
export default class Board {
    public tiles: Tile[] = [];
    public cells: Tile[][] = [];
    public won: boolean = false;
    public static size: number = 4;
    public static fourProbability: number = 0.1;
    public static deltaX: number[] = [-1, 0, 1, 0];
    public static deltaY: number[] = [0, -1, 0, 1];
    constructor() {
        this.buildLayout();
        this.addRandomTile();
        this.setPositions();
    }
    /**
     * buildLayout 4*4 layout
     */
    buildLayout() {
        for (var i = 0; i < Board.size; i++) {
            this.cells[i] = [this.addTile(), this.addTile(), this.addTile(), this.addTile()];
        }
    }
    addTile(...args): Tile {
        let res: Tile = new Tile();
        Tile.apply(res, args);
        this.tiles.push(res);
        return res
    }
    moveLeft(): boolean {
        let hasChanged: boolean = false;
        for (let row = 0; row < Board.size; row++) {
            let currentRow: Tile[] = this.cells[row].filter(function(tile: Tile) { return tile.value !== 0; });
            let resultRow: Tile[] = [];

            for (let target = 0; target < Board.size; ++target) {
                let targetTile: Tile = currentRow.length ?
                    currentRow.shift() :
                    this.addTile();
                if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
                    let tile1: Tile = targetTile;
                    targetTile = this.addTile(targetTile.value);
                    tile1.mergedInto = targetTile;
                    let tile2: Tile = currentRow.shift();
                    tile2.mergedInto = targetTile;
                    targetTile.value += tile2.value;
                }
                resultRow[target] = targetTile;
                this.won = this.won || (targetTile.value === 2048);
                hasChanged = hasChanged || (targetTile.value !== this.cells[row][target].value);
            }
            this.cells[row] = resultRow;
        }
        return hasChanged;
    }
    setPositions(): void {
        this.cells.forEach(function(row: Tile[], rowIndex: number) {
            row.forEach(function(tile: Tile, colIndex: number) {
                [tile.oldRow, tile.oldColumn, tile.row, tile.column] =
                    [tile.row, tile.column, rowIndex, colIndex]
                tile.markForDeletion = false;
            })
        })
    }
    addRandomTile() {
        let emptyCells = [];
        for (let r = 0; r < Board.size; r++) {
            for (let c = 0; c < Board.size; c++) {
                if (this.cells[r][c].value === 0) {
                    emptyCells.push({ r: r, c: c });
                }
            }
        }
        let index = Math.floor(Math.random() * emptyCells.length);
        let cell = emptyCells[index];
        let newValue = Math.random() < Board.fourProbability ? 4 : 2;
        this.cells[cell.r][cell.c] = this.addTile(newValue);
    };
    move(direction: number): Board {
        // rules: 0 -> left, 1 -> up, 2 -> right, 3 -> down
        this.clearOldTiles();
        for (let i = 0; i < direction; ++i) {
            this.cells = rotateLeft(this.cells);
        }
        let hasChanged: boolean = this.moveLeft();
        for (var i = direction; i < 4; ++i) {
            this.cells = rotateLeft(this.cells);
        }
        if (hasChanged) {
            this.addRandomTile();
        }
        this.setPositions();
        return this;
    }
    clearOldTiles(): void {
        this.tiles = this.tiles.filter(function(tile: Tile) { return tile.markForDeletion === false; });
        this.tiles.forEach(function(tile: Tile) { tile.markForDeletion = true; });
    }
    hasWon(): boolean {
        return this.won;
    }
    hasLost(): boolean {
        let canMove: boolean = false;

        for (let row = 0; row < Board.size; ++row) {
            for (let col = 0; col < Board.size; ++col) {
                canMove = canMove || (this.cells[row][col].value === 0);
                for (var dir = 0; dir < 4; ++dir) {
                    let newRow: number = row + Board.deltaX[dir];
                    let newColumn: number = col + Board.deltaY[dir];
                    if (newRow < 0 || newRow >= Board.size || newColumn < 0 || newColumn >= Board.size) {
                        continue;
                    }
                    canMove = canMove || (this.cells[row][col].value === this.cells[newRow][newColumn].value);
                }
            }
        }
        return !canMove;
    }
}