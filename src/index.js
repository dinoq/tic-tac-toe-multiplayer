import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <div 
        className="square" 
        onClick={props.onClick}
      >
        {props.squareID}
      </div>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square 
      key={i}
      squareID={this.props.squares[i]}
      onClick={()=>this.props.onClick(i)}/>;
  }

  getRow(squares){
    return(
      <div 
        className="board-row"
        key={squares[0].key}>
        {squares}
      </div>
    )
  }

  render() {
    let boardRows = [];
    const squaresLimit = (this.props.gameType == "tic-tac-toe")? 3:10;
    for(let i = 0; i < squaresLimit; i++){
      let squares = [];
      for(let j = 0; j < squaresLimit; j++){
        squares.push(this.renderSquare(i*squaresLimit+j));
      }
      boardRows.push(this.getRow(squares));
    }
    
    return (
      <div>
        <div className="status">{this.props.status}</div>
        {boardRows}
      </div>
    );
  }
}

class GameScreen extends React.Component {
  constructor(props){
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
  handleClick(i){
    if(this.state.winner !== null)
      return;
    const step = this.state.step;
    const history = this.state.stepHistory.slice(0, this.state.step + 1);
    const curr = this.state.stepHistory[step].slice();
    if(curr[i] != null)
      return;
    curr[i] = this.state.currPlayer;
    let nextPlayer = (this.state.currPlayer == "X")? "O" : "X";
    const end = this.setWinner(curr);
    if(end)
      nextPlayer = this.state.currPlayer;
    
    this.setState({
      stepHistory: this.state.stepHistory.concat([curr]),
      step: history.length,
      currPlayer: nextPlayer
    })
  }
  
  setWinner(squares){
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

    const winner = winnerCombinations.find((combination) =>{
      const [i0, i1, i2] = combination;
      const sq0 = squares[i0]===null? "":squares[i0];
      const sq1 = squares[i1]===null? "":squares[i1];
      const sq2 = squares[i2]===null? "":squares[i2];
      if(sq0 !== "" && sq0 === sq1 && sq0 === sq2 && sq1 === sq2){
        return sq0;
      }
    })
    if(winner != undefined){
      this.setState({winner: winner});
    }
    return winner;
  }
  render() {
    const c = this.state.currPlayer;
    const status = (this.state.winner == null)? 'Current player: ' + c : "Won player: " + c;

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
            onClick={(i)=>this.handleClick(i)}
            gameType={this.props.gameType}/>
        </div>
      </div>
    );
  }
}

class MainMenuScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gameType: "",
    }
  }
  handleClick(type){
    this.setState({gameType: type});
  }
  render(){
    let screen = "";
    if(this.state.gameType == "tic-tac-toe"){
      
      screen =  (<div className="flex-column content-container">
                  <button onClick={(gType, mType)=>this.props.onClick("tic-tac-toe", "hotseat")}>hot seat</button>
                  <button onClick={(gType, mType)=>this.props.onClick("tic-tac-toe", "internet")}>Internet</button>
                  <button onClick={() => this.handleClick("")}>Zpět</button>
                </div>)
    }else if(this.state.gameType == "5-in-a-row"){
      screen =  (<div className="flex-column content-container">
                  <button onClick={(gType, mType)=>this.props.onClick("5-in-a-row", "hotseat")}>hot seat</button>
                  <button onClick={(gType, mType)=>this.props.onClick("5-in-a-row", "internet")}>Internet</button>
                  <button onClick={() => this.handleClick("")}>Zpět</button>
                </div>)
    }else if(this.state.gameType == "settings"){
      screen =  (<div className="flex-column content-container">
                  <button onClick={() => this.handleClick("")}>Uložit</button>
                </div>)
    }else{
      screen =  (<div className="flex-column content-container">
                  <button onClick={() => this.handleClick("tic-tac-toe")}>Tic Tac Toe</button>
                  <button onClick={() => this.handleClick("5-in-a-row")}>Piškvorky</button>
                  <button onClick={() => this.handleClick("settings")}>Nastavení</button>
                </div>)
    }
    return(
      <div className="flex-center">{screen}</div>
    )
  }
}

class SettingsScreen extends React.Component{
  render(){
    return(
      <button>Uložit</button>
    )
  }
}

class StateManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentState: "",
      gameType: "", // tic-tac-toe / five-in-row
      multiplayerType: "", //internet / hotseat
    }
  }

  handleClick(gType, mType){
    this.setState({
      gameType: gType, 
      multiplayerType: mType,
      currentState: "game"
    });
  }
  render(){
    
    let screen = <MainMenuScreen onClick={(gType, mType)=>this.handleClick(gType, mType)}/>;
    switch(this.state.currentState){
      case "menu":
        screen = <MainMenuScreen onClick={(gType, mType)=>this.handleClick(gType, mType)}/>
      break;
      case "game":
        screen = <GameScreen gameType={this.state.gameType}/>
      break;
      case "settings":
        screen = <SettingsScreen/>
      break;

    }

    return(
      <div>{screen}</div>
    );
  }
}
// ========================================

ReactDOM.render(
  <StateManager />,
  document.getElementById('root')
);
