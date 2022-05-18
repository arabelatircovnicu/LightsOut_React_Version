import { Component } from "react";
import Button from "./Button.js";

class GameTable extends Component {
  static defaultProps = {
    NumberOfLines: 4,
    NumberOfColumns: 4,
    table: [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      gameTable: this.createGameTable()
    };
  }

  createGameTable() {
    let gameTable = [];
    for (let lineIndex = 0; lineIndex < this.props.NumberOfLines; lineIndex++) {
      let row = [];
      for (
        let columnIndex = 0;
        columnIndex < this.props.NumberOfColumns;
        columnIndex++
      ) {
        row.push(this.props.table[lineIndex][columnIndex]);
      }
      gameTable.push(row);
    }
    return gameTable;
  }

  render() {
    let board = [];
    for (let lineIndex = 0; lineIndex < this.props.NumberOfLines; lineIndex++) {
      let row = [];
      for (
        let columnIndex = 0;
        columnIndex < this.props.NumberOfColumns;
        columnIndex++
      ) {
        let coord = `${lineIndex}-${columnIndex}`;
        row.push(
          <Button
            key={coord}
            lineIndex={lineIndex}
            columnIndex={columnIndex}
            Text={this.state.gameTable[lineIndex][columnIndex]}
            flipCellsAroundMe={() =>
              this.FlipTheCurrentButtonAndTheButtonsAround(
                lineIndex,
                columnIndex
              )
            }
          />
        );
      }
      board.push(<tr key={lineIndex}>{row}</tr>);
    }

    return (
      <div>
        {this.state.hasWon ? (
          <div>
            <span>YOU WIN!</span>
          </div>
        ) : (
          <div>
            <table>
              <tbody>{board}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  FlipTheCurrentButtonAndTheButtonsAround(lineIndex, columnIndex) {
    let table = this.props.table;
    let numberOfLines = this.props.NumberOfLines;
    let numberOfColumns = this.props.NumberOfColumns;

    function FlipButton(lineIndex, columnIndex, table) {
      const lineIndexIsValid = lineIndex >= 0 && lineIndex < numberOfLines;

      const columnIndexIsValid =
        columnIndex >= 0 && columnIndex < numberOfColumns;

      if (lineIndexIsValid && columnIndexIsValid) {
        table[lineIndex][columnIndex] = (table[lineIndex][columnIndex] + 1) % 2;
      }
    }

    FlipButton(lineIndex - 1, columnIndex, table);
    FlipButton(lineIndex + 1, columnIndex, table);
    FlipButton(lineIndex, columnIndex - 1, table);
    FlipButton(lineIndex, columnIndex + 1, table);

    let hasWon = this.state.gameTable.every((row) =>
      row.every((cell) => cell === 0)
    );
    this.setState({ hasWon: hasWon, gameTable: table });
  }
}
export default GameTable;
