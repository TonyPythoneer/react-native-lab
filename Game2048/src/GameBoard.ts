/* status : OK (20160421) - Add jsdoc */
/**
 * rotateLeft
 * @param {Tile[][]} matrix [description]
 * @example
 * [[ 1,  2,  3,  4],       [[4, 8, 12, 16],
 *  [ 5,  6,  7,  8],   =>   [3, 7, 11, 15],
 *  [ 9, 10, 11, 12],        [2, 6, 10, 14],
 *  [13, 14, 15, 16]]        [1, 5,  9, 13]]
 */
function rotateLeft(matrix: Tile[][]) {
    let rows: number = matrix.length;
    let cols: number = matrix[0].length;
    let res = [];  // result
    for (let row = 0; row < rows; row++) {
        res.push([]);
        for (let col = 0; col < cols; col++) {
            res[row][col] = matrix[col][cols - row - 1];
        }
    }
    return res;
}


/* status : OK (20160420)*/
/**
 * A tile for recording position
 */
class Tile {
    public oldRow: number = -1;
    public oldColumn: number = -1;
    public markForDeletion: boolean = false;
    public mergedInto: Tile = null;
    public id: number;
    public static id: number = 0;
    /**
     * Create a tile.
     * @param {number} value - The value is on the tile.
     * @param {number} row - The row of position.
     * @param {number} column - The column of position.
     */
    constructor(public value: number = 0, public row: number = -1, public column: number = -1) {
        this.id = Tile.id++;
    }
    /**
     * New for old cover on position
     * @param {number} row - new row of
     * @param {number} column [description]
     */
    moveTo(row: number, column: number): void {
        [this.oldRow, this.oldColumn, this.row, this.column] = [this.row, this.row, row, column];
    }
    /**
     * [moveTo description]
     * @param {number} row - new row of
     * @param {number} column [description]
     */
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
     * Build of 4*4 board
     */
    buildLayout(): void {
        for (let i = 0; i < Board.size; i++) {
            this.cells[i] = [];
            for (let j = 0; j < Board.size; j++) {
                this.cells[i].push(this.addTile());
            }
        }
    }
    /**
     * The value is top of cell
     * @param  {number[]} args - value, row, column
     * @return {Tile}
     */
    addTile(...args): Tile {
        let tile: Tile = new Tile();
        Tile.apply(tile, args);  // Instance process: Apply new args for instance
        this.tiles.push(tile);
        return tile
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
                    let tile2: Tile = currentRow.shift();
                    targetTile = this.addTile(targetTile.value);
                    [tile1.mergedInto, tile2.mergedInto] = [targetTile, targetTile]
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
    /**
     * Pick up any empty cell randomly as new tile
     */
    addRandomTile() {
        // Instance process: Find empty cells and record in array
        let emptyCells = [];
        for (let r = 0; r < Board.size; r++) {
            for (let c = 0; c < Board.size; c++) {
                if (this.cells[r][c].value === 0) {
                    emptyCells.push({ r: r, c: c });
                }
            }
        }

        // Instance process: Pick up any empty cell randomly
        let index = Math.floor(Math.random() * emptyCells.length);
        let cell = emptyCells[index];
        // Instance process: Decide to set 4 or 2 as value of the tile
        let newValue = Math.random() < Board.fourProbability ? 4 : 2;
        // Instance process: Insert to new random value in cells
        this.cells[cell.r][cell.c] = this.addTile(newValue);
    };
    move(direction: number): Board {
        // rules: 0 -> left, 1 -> up, 2 -> right, 3 -> down
        this.clearOldTiles();
        for (let i = 0; i < direction; i++) {
            this.cells = rotateLeft(this.cells);
        }
        let hasChanged: boolean = this.moveLeft();
        for (var i = direction; i < 4; i++) {
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
    /**
     * hasWon
     * @return {boolean} The player has won or not
     */
    hasWon(): boolean {
        return this.won;
    }
    /**
     * You has lost suppose the board hasn't empty cell or can't merge cells
     * @return {boolean} It means player is lost or not
     */
    hasLost(): boolean {
        let canMove: boolean = false;

        for (let row = 0; row < Board.size; ++row) {
            for (let col = 0; col < Board.size; ++col) {
                // Logic process: It can move if the board has a empty cell
                let hasEmptyCell: boolean = (this.cells[row][col].value === 0);
                canMove = canMove || hasEmptyCell;

                for (var dir = 0; dir < 4; ++dir) {
                    // Variable process: The new position is ready for checking available
                    let newRow: number = row + Board.deltaX[dir];
                    let newColumn: number = col + Board.deltaY[dir];

                    // Validation process: Avoid to use the new position that it's out of range of the board
                    let [isOutOfRight, isOutOfLeft, isOutOfDown, isOutOfUp]: boolean[] =
                        [newRow < 0, newRow >= Board.size, newColumn < 0, newColumn >= Board.size]
                    if (isOutOfRight || isOutOfLeft || isOutOfDown || isOutOfUp) { continue; }

                    // Logic process: It can move if the two cells can merge
                    let canMerge: boolean = this.cells[row][col].value === this.cells[newRow][newColumn].value;
                    canMove = canMove || canMerge;
                }
            }
        }
        return !canMove;
    }
}
