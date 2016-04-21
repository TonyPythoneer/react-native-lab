import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const Animated = require('Animated');  // No ts defination. It's from 'react-native/Libraries/Animated/src/Animated'
const TouchableBounce = require('TouchableBounce');  // No ts defination. It's from 'react-native/Libraries/Components/Touchable/TouchableBounce'

import GameBoard from './GameBoard';


const BOARD_PADDING = 3;
const CELL_MARGIN = 4;
const CELL_SIZE = 60;


/* status : OK (20160421) - Add jsdoc */
/**
 * A cell representing each block of the board
 */
class Cell extends React.Component<{}, {}> {
    render() {
        return <View style={styles.cell} />;
    }
}


/* status : OK (20160421) - Add jsdoc */
/**
 * A board is compose of 4*4 cells
 */
class Board extends React.Component<{}, {}> {
    render() {
        return (
            <View style={styles.board}>
                <View style={styles.row}><Cell/><Cell/><Cell/><Cell/></View>
                <View style={styles.row}><Cell/><Cell/><Cell/><Cell/></View>
                <View style={styles.row}><Cell/><Cell/><Cell/><Cell/></View>
                <View style={styles.row}><Cell/><Cell/><Cell/><Cell/></View>
                {this.props.children}
            </View>
        );
    }
}


/* status : OK (20160421) - Add jsdoc */
/**
 * Tile - Component
 */
class Tile extends React.Component<any, any> {
    static _getPosition(index): number {
        return BOARD_PADDING + (index * (CELL_SIZE + CELL_MARGIN * 2) + CELL_MARGIN);
    };

    constructor(props) {
        super(props);

        let tile = this.props.tile;
        this.state = {
            opacity: new Animated.Value(0),
            top: new Animated.Value(Tile._getPosition(tile.toRow())),
            left: new Animated.Value(Tile._getPosition(tile.toColumn())),
        };
    }
    /**
     * Excute animation of movement of the tiles
     */
    calculateOffset(): { top: number; left: number; opacity: number } {
        let tile = this.props.tile;

        let offset = {
            top: this.state.top,
            left: this.state.left,
            opacity: this.state.opacity,
        };

        if (tile.isNew()) {
            Animated.timing(this.state.opacity, {
                duration: 100,
                toValue: 1,
            }).start();
        } else {
            Animated.parallel([
                Animated.timing(offset.top, {
                    duration: 100,
                    toValue: Tile._getPosition(tile.toRow()),
                }),
                Animated.timing(offset.left, {
                    duration: 100,
                    toValue: Tile._getPosition(tile.toColumn()),
                }),
            ]).start();
        }
        return offset;
    }
    render() {
        let tile = this.props.tile;

        let tileStyles = [
            styles.tile,
            styles[`tile${tile.value}`],
            this.calculateOffset(),
        ];

        let textStyles = [
            styles.value,
            tile.value > 4 && styles.whiteText,
            tile.value > 100 && styles.threeDigits,
            tile.value > 1000 && styles.fourDigits,
        ];

        return (
            <Animated.View style={tileStyles}>
                <Text style={textStyles}>{tile.value}</Text>
            </Animated.View>
        );
    }
}


/**
 * GameEndOverlay - Component
 */
class GameEndOverlay extends React.Component<any, {}> {
    render() {
        let board = this.props.board;

        /* Continue game when player hasn't won and cells can't move */
        if (!board.hasWon() && !board.hasLost()) { return <View/>; }

        /* Good End or Game over*/
        let message: string = board.hasWon() ? 'Good Job!' : 'Game Over';
        return (
            <View style={ styles.overlay } >
                <Text style={ styles.overlayMessage }>{ message } </Text>
                <TouchableBounce onPress= { this.props.onRestart } style= { styles.tryAgain } >
                    <Text style={ styles.tryAgainText }>Try Again?</Text>
                </TouchableBounce>
            </View>
        );
    }
}


/**
 * Game2048 - Main App
 */
export default class Game2048 extends React.Component<{},any> {
    public startX: number = 0;
    public startY: number = 0;
    public state = { board: new GameBoard() };
    constructor(props: {}) {
        super(props);
    }
    /**
     * restartGame
     */
    restartGame() {
        this.setState({ board: new GameBoard() });
    }
    /**
     * Start to touch when triggering gesture event on screen
     * @param  {React.GestureResponderEvent} event
     */
    handleTouchStart(event: React.GestureResponderEvent) {
        // Logic process: Stop any gesture event when game is ending
        if (this.state.board.hasWon()) { return; }
        // Variables process: Record delta when starting to touch
        this.startX = event.nativeEvent.pageX;
        this.startY = event.nativeEvent.pageY;
    }
    /**
     * Ending to touch when triggering gesture event on screen
     * @param  {React.GestureResponderEvent} event
     */
    handleTouchEnd(event: React.GestureResponderEvent) {
        // Logic process: Stop any gesture event when game is ending
        if (this.state.board.hasWon()) { return; }
        // Variables process: Calculate the delta when ending to touch
        let deltaX: number = event.nativeEvent.pageX - this.startX;
        let deltaY: number = event.nativeEvent.pageY - this.startY;

        // Variables process: Calculate the direction of the delta
        let direction: number = -1;
        if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
            direction = deltaX > 0 ? 2 : 0;
        } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
            direction = deltaY > 0 ? 3 : 1;
        }

        // State process: Decide to direction of moving
        if (direction !== -1) {
            this.setState({ board: this.state.board.move(direction) });
        }
    }
    /**
     * render
     */
    render() {
        let tiles = this.state.board.tiles
            .filter((tile) => { return tile.value > 0; })
            .map((tile) => <Tile ref={tile.id} key={tile.id} tile={tile} />);

        return (
            <View
                style={styles.container}
                onTouchStart={(event) => this.handleTouchStart(event) }
                onTouchEnd={(event) => this.handleTouchEnd(event) }>
                <Board>
                    {tiles}
                </Board>
                <GameEndOverlay board={this.state.board} onRestart={() => this.restartGame() } />
            </View>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    board: {
        padding: BOARD_PADDING,
        backgroundColor: '#bbaaaa',
        borderRadius: 5,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayMessage: {
        fontSize: 40,
        marginBottom: 20,
    },
    tryAgain: {
        backgroundColor: '#887761',
        padding: 20,
        borderRadius: 5,
    },
    tryAgainText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '500',
    },
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        borderRadius: 5,
        backgroundColor: '#ddccbb',
        margin: CELL_MARGIN,
    },
    row: {
        flexDirection: 'row',
    },
    tile: {
        position: 'absolute',
        width: CELL_SIZE,
        height: CELL_SIZE,
        backgroundColor: '#ddccbb',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    value: {
        fontSize: 24,
        color: '#776666',
        fontFamily: 'Verdana',
        fontWeight: '500',
    },
    tile2: {
        backgroundColor: '#eeeeee',
    },
    tile4: {
        backgroundColor: '#eeeecc',
    },
    tile8: {
        backgroundColor: '#ffbb87',
    },
    tile16: {
        backgroundColor: '#ff9966',
    },
    tile32: {
        backgroundColor: '#ff7755',
    },
    tile64: {
        backgroundColor: '#ff5533',
    },
    tile128: {
        backgroundColor: '#eecc77',
    },
    tile256: {
        backgroundColor: '#eecc66',
    },
    tile512: {
        backgroundColor: '#eecc55',
    },
    tile1024: {
        backgroundColor: '#eecc33',
    },
    tile2048: {
        backgroundColor: '#eecc22',
    },
    whiteText: {
        color: '#ffffff',
    },
    threeDigits: {
        fontSize: 20,
    },
    fourDigits: {
        fontSize: 18,
    },
});
