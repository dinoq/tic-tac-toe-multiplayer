import React, {Component} from "react";
import { GameType } from "../../helpers/constants";
import Square from "../Square";

interface IBoardProps{
    squares: Array<any>,
    onClick: Function,
    gameType: GameType,
    status: string
}

interface IBoardState{

}
class Board extends Component<IBoardProps, IBoardState> {
    renderSquare(i: number) {
      return <Square 
        key={i}
        squareID={this.props.squares[i]}
        addedClasses={(this.props.squares[i] === null)? "" : this.props.squares[i].toLowerCase()+" expand"}
        onClick={()=>this.props.onClick(i)}/>;
    }
  
    getRow(squares: Array<any>){
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
      const squaresLimit = (this.props.gameType === GameType.TIC_TAC_TOE)? 3:10;
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

  export default Board  ;