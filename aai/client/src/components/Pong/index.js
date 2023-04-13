import React from 'react';
import Box from './visuals.jsx';
import './App.css';
import { outer, inner, style, P1Score, P2Score, results } from './visuals.jsx';
import {
    MAP, PLAYER, BALL, BALL_SIZE, BALL_SPEED, MAX_SCORE, RACKET_SIZE, Y_SIZE, X_SIZE,
    P1_DOWN, P1_UP, P2_DOWN, P2_UP, PAUSE, RESTART
} from './Globals.js'

const InitialState = (props) => {
    const board = [...Array(RACKET_SIZE)].map((_, pos) => pos);
    return {
        P2: board.map(x => ((x + 1) * X_SIZE) - 2),
        P1: board.map(x => (x * X_SIZE) + 1),
        ball: Math.round((Y_SIZE * X_SIZE) / 2),
        ballSpeed: props.speed * 50,
        ballSize: props.size,
        ballY: -X_SIZE,
        ballX: -1,
        pause: true,
        P1Score: 0,
        P2Score: 0,
        gameStatus: 0
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = InitialState(props);
    }

    componentDidMount() {
        setInterval(() => {
            (this.state.P1Score === MAX_SCORE) ? this.setState({ gameStatus: 1 })
                : (this.state.P2Score === MAX_SCORE) ? this.setState({ gameStatus: 2 }) : this.setState({ gameStatus: 0 })
            if (!(this.state.pause) && !(this.state.gameStatus))
                this.bounceBall();
        }, this.state.ballSpeed);
        document.onkeydown = this.keyInput;
    }

    resetGame = () => this.setState({ ball: Math.round((Y_SIZE * X_SIZE) / 2) })

    moveBoard = (Rackett, isUp) => {
        const Edge = isUp ? Rackett[0] : Rackett[RACKET_SIZE - 1];

        if (!this.touchingEdge2(Edge)) {
            const ballY = (isUp ? -X_SIZE : X_SIZE);
            const newDir = (this.state.ballY !== X_SIZE ^ isUp) ? -this.state.ballY : this.state.ballY;

            if (!this.touchingEdge(this.state.ball)) {
                switch (this.state.ball) {
                    case Edge + ballY - 1:
                        this.setState({ ballY: newDir, ballX: -1 })
                        break;
                    case Edge:
                        this.setState({ ballY: newDir })
                        break;
                    case Edge + ballY + 1:
                        this.setState({ ballY: newDir, ballX: 1 })
                        break;
                    default:
                }
            }
            return Rackett.map(x => x + ballY);
        }
        return false
    }

    touchingEdge = (pos) => (0 <= pos - ((this.state.ballSize / 2) * X_SIZE) && pos - ((this.state.ballSize / 2) * X_SIZE) < X_SIZE) ||
        (X_SIZE * (Y_SIZE - 1) <= pos + ((this.state.ballSize / 2) * X_SIZE) && pos + ((this.state.ballSize / 2) * X_SIZE) < X_SIZE * Y_SIZE)

    touchingEdge2 = (pos) => (0 <= pos && pos < X_SIZE) ||
        (X_SIZE * (Y_SIZE - 1) <= pos && pos < X_SIZE * Y_SIZE)

    touchingPaddle = (pos) => {
        return (this.state.P1.indexOf(pos) !== -1) ||
            (this.state.P2.indexOf(pos) !== -1) ||
            this.state[(this.state.ballX === -1) ? "P1" : "P2"].indexOf(pos - (this.state.ballX)) !== -1;
    }

    touchingPaddleEdge = (pos) => this.state.P1[0] === pos ||
        this.state.P1[RACKET_SIZE - 1] === pos ||
        this.state.P2[0] === pos ||
        this.state.P2[RACKET_SIZE - 1] === pos

    isScore = (pos) => ((this.state.ballX) === -1 && (pos % X_SIZE) === 0) ||
        ((this.state.ballX === 1) && ((pos + 1) % X_SIZE) === 0)

    bounceBall = () => {
        const newState = this.state.ball + this.state.ballY + this.state.ballX;
        let str = '';

        if (this.touchingEdge(newState))
            this.setState({ ballY: -this.state.ballY })
        if (this.touchingPaddleEdge(newState))
            this.setState({ ballY: -this.state.ballY })
        for (let i = newState - (this.state.ballSize / 2) * X_SIZE; i <= newState + (this.state.ballSize / 2) * X_SIZE; i = i + X_SIZE) {
            if (this.touchingPaddle(i + ((this.state.ballSize / 2) * this.state.ballX))) {
                this.setState({ ballX: -this.state.ballX })
                break;
            }
        }
        this.setState({ ball: newState })

        if (this.isScore(newState)) {
            if (this.state.ballX !== -1)
                this.setState({ P1Score: this.state.P1Score + 1, ball: newState })
            else
                this.setState({ P2Score: this.state.P2Score + 1, ball: newState })
            this.setState({ pause: true })
            this.resetGame();
        }
    }

    keyInput = ({ keyCode }) => {
        switch (keyCode) {
            case P1_UP:
            case P1_DOWN:
                const movedP1 = this.moveBoard(this.state.P1, keyCode === P1_UP);
                if (movedP1)
                    this.setState({ P1: movedP1, pause: false })
                break;
            case P2_UP:
            case P2_DOWN:
                const movedP2 = this.moveBoard(this.state.P2, keyCode === P2_UP);
                if (movedP2)
                    this.setState({ P2: movedP2, pause: false })
                break;
            case PAUSE:
                this.setState({ pause: true })
                break;
            case RESTART:
                this.setState({ ball: Math.round((Y_SIZE * X_SIZE) / 2) })
                this.setState({ ballY: -X_SIZE, ballX: -1, pause: true, P1Score: 0, P2Score: 0, gameStatus: 0 })
                break;
            default:
        }
    }

    render() {
        const board = [...Array(Y_SIZE * X_SIZE)].map((_, pos) => {
            let val = MAP;
            if ((this.state.P1.indexOf(pos) !== -1) || (this.state.P2.indexOf(pos) !== -1))
                val = PLAYER;
            else if (this.state.ball === pos)
                val = BALL;
            return <Box key={pos} k={pos} name={val} size={this.state.ballSize} />;
        })

        return (
            <div style={outer}>
                <h1>Pong</h1>

                <div style={inner}>
                    <div style={style}>{board}</div>
                    <div style={P1Score}>{this.state.P1Score}</div>
                    <div style={P2Score}>{this.state.P2Score}</div>
                    <div style={results}>{(this.state.gameStatus === 1) ? "PLAYER1 WON" :
                        (this.state.gameStatus === 2) ? "PALYER2 WON" : this.state.pause ? "Game Paused" : ""}</div>
                </div>
            </div>
        )
    }
}

export default App;