import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
    
      return (
        <button className={`square ${props.selectedSquare ? "selected" : ""}`} onClick={props.onClick}>
          {props.value}
        </button>
      );
    
  }
  
  class Board extends React.Component {
    
    isSquareSelected(i){
      let selectedSquare = false ;
      if(this.props.selectedSquare === i ){
        selectedSquare = true;
        
        return selectedSquare

      } 
    }

    renderSquare(i) {
      const resSquareSelected = this.isSquareSelected(i)
      console.log(resSquareSelected) ;

        return <Square selectedSquare={resSquareSelected} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
      let boardSquares = [] ;
      for(let row = 0; row < 3; row++){
        let boardRow = [] ;
        for(let col = 0; col< 3; col++){
          boardRow.push(<span key={(row * 3) + col} >{this.renderSquare((row * 3) + col)}</span>)
        }
        boardSquares.push(<div className="board-row" key={row}>{boardRow}</div>)
      }
      return (
        <div>
          {boardSquares}
        </div>
      ) ;
    }



  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          history:[{
            squares: Array(9).fill(null), selected : false ,
          }],
          xIsNext: true ,
          stepNumber: 0,
          locationHistory: [["x","x"]],
          selectedSquare: null,
      };
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0 ,
    })
    
  }

  handleClick(i){
    const history = this.state.history.slice(0,
      this.state.stepNumber + 1 );
      const locationHistory = this.state.locationHistory.slice(0,
        this.state.stepNumber + 1 );
    const current = history[history.length - 1] ;

    const squares= current.squares.slice();
    const location = findPostion(i);

    const selectedSquare = i ;

    if( calculateWinner(squares) || squares[i]){
        return 
    }
    squares[i] = this.state.xIsNext ? "X" : "O" ;
    this.setState({ // state change comes by modifying directly object in the history array
        history: history.concat([{ // adds state of squares each move to history array
          squares:squares,
        }]), 
        xIsNext : !this.state.xIsNext,
        stepNumber: history.length,
        locationHistory: locationHistory.concat([location]),
        selectedSquare:selectedSquare,


    })
}


    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber] ; 
      const winner = calculateWinner(current.squares);
      const lastLocation = this.state.locationHistory[history.length - 1]
      console.log(lastLocation)
      const moves = history.map((step, move) => {
        const location = this.state.locationHistory[move] ; 
        const description = move ?
          "Go to move #" + move :
          "Go to game start" ;
      
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{description}</button>
              <h4>Move Location :</h4>
              <h5>Column: {location[0]}</h5> <h5>Row: {location[1]}</h5>
            </li>
          );
      });

        let status;
        if(winner) {
            status = "Winner: " + winner; 
        } else {
            status = this.state.xIsNext ? 'Next player: X' : 'Next player: O' ;
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    selectedSquare = {this.state.selectedSquare}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ul>{moves}</ul>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log(squares[a])
        return squares[a];

      }
    }
    return null;
  } 

  function findPostion(index) {
    const locations = [
      [1,1],
      [2,1],
      [3,1],
      [1,2],
      [2,2],
      [3,2],
      [1,3],
      [2,3],
      [3,3],
    ]
    const[col , row] = locations[index]
    return [col, row]

  }