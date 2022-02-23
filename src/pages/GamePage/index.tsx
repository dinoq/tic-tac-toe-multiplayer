import React, { Component } from "react"
import Board from "../../components/Board";
import { GameType, MultiplayerType, Page, setGameType, setMultiplayerType, setPage } from "../../helpers/constants";

interface IGamePageProps {
    gameType: GameType,
    setGameType: typeof setGameType,
    setMultiplayerType: typeof setMultiplayerType,
    setCurrentPage: typeof setPage
}
interface IGamePageState {
    stepHistory: Array<any>,
    step: number,
    winner: any,
    currPlayer: string
}
class GamePage extends Component<IGamePageProps, IGamePageState> {
    constructor(props: IGamePageProps) {
        super(props);
        this.state = {
            stepHistory: [
                new Array(9).fill(null)
            ],
            step: 0,
            winner: null,
            currPlayer: "X",
        }
    }
    handleClick(i: number) {
        if (this.state.winner !== null)
            return;
        const step = this.state.step;
        const history = this.state.stepHistory.slice(0, this.state.step + 1);
        const curr = this.state.stepHistory[step].slice();
        if (curr[i] !== null)
            return;
        curr[i] = this.state.currPlayer;
        let nextPlayer = (this.state.currPlayer === "X") ? "O" : "X";
        const end = this.setWinner(curr);
        if (end)
            nextPlayer = this.state.currPlayer;

        this.setState({
            stepHistory: this.state.stepHistory.concat([curr]),
            step: history.length,
            currPlayer: nextPlayer
        })
    }

    setWinner(squares: Array<any>) {
        console.log('squares: ', squares);
        const winnerCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        const winner = winnerCombinations.find((combination) => {
            const [i0, i1, i2] = combination;
            const sq0 = squares[i0] === null ? "" : squares[i0];
            const sq1 = squares[i1] === null ? "" : squares[i1];
            const sq2 = squares[i2] === null ? "" : squares[i2];
            if (sq0 !== "" && sq0 === sq1 && sq0 === sq2 && sq1 === sq2) {
                return sq0;
            }
            return null;
        })
        if (winner !== undefined) {
            this.setState({ winner: this.state.currPlayer });
        }
        return winner;
    }

    goToMenu(){
        this.props.setGameType(GameType.NONE);
        this.props.setMultiplayerType(MultiplayerType.NONE);
        this.props.setCurrentPage(Page.MENU);
    }
    render() {
        const c = this.state.currPlayer;
        const status = (this.state.winner === null) ? 'Current player: ' + c : "Won player: " + c;

        const step = this.state.step;
        const current = this.state.stepHistory[step];
        return (
            <div className="game">
                <div className="game-info">
                    <div>{status}</div>
                </div>
                <div className="game-board flex-center">
                    <Board
                        squares={current}
                        onClick={(i: number) => this.handleClick(i)}
                        gameType={this.props.gameType}
                        status={status} />
                </div>
                {this.state.winner != null &&
                <div className="flex-center">
                <div className="flex-column">
                        <h1>Player {this.state.winner} won!</h1>
                        <button onClick={this.goToMenu.bind(this)}>Go back</button>
                        </div>
                </div>
                }
            </div>
        );
    }
}

export default GamePage;