import React, {Component} from "react";

interface ISquareProps {
    onClick: Function,
    addedClasses: string,
    squareID: string
}

interface ISquareState {    
    addedClasses: string
}

class Square extends Component<ISquareProps, {}> {
    constructor(props: ISquareProps){
      super(props);
      this.state = {
        addedClasses: ""
      }
    }


    render(){
      return (
        <div className="square-container"
          onClick={()=>{this.props.onClick()}}
        >
          <div 
            className = {"square " + this.props.addedClasses} 
          >
            {this.props.squareID}
          </div>
        </div>
      );
    }
}

export default Square;