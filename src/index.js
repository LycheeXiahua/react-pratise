import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // constructor(props){
//     //     super(props) //固定的开头
//     //     this.state = {
//     //         value: null
//     //     }
//     // }

//     render() {
//         return (
//             <button 
//                 className="square"
//                 onClick={
//                     () => {this.props.onClick() }
//                 }
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

//只包含一个redner方法、没有state的组件，可以使用函数组件。
//以下改写 Square 组件：

function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}


class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        }
    }

    handleClick(i){
        const squares = this.state.squares.slice(); //拷贝了一个数组
        squares[i] = 'X' //修改新数组，而不是原数组
        this.setState({
            squares:squares  //赋值新数组
        })
    }

    //不直接修改原数据，方便实现撤销和恢复功能。 —— 那如果我不需要这个功能？
    //虽然UIDP确实有这个需求。

    //作用：可以轻松确定数据是否发生了改变，从而确定组件是否需要重新渲染 —— 我想起UIDP中那个，需要 watch+computed 配合判断是否改变数据的场景
    //这是性能优化的一个方向 —— 配合 shouldComponentUpdate 使用

    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={()=>{this.handleClick(i)}}
            />
        ) //return 的内容多行，需要用小括号包裹
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {/* Question:为什么不直接写 <Square /> 呢？*/}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
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
