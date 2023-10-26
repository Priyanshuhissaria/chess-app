import { Component, Input, OnInit } from '@angular/core';
import {
  DEFAULT_INITIAL_BLACK_POSITION,
  DEFAULT_INITIAL_WHITE_POSITION,
  PIECES_COLOR,
} from '../../constants/chess-board.constant';
import { ChessBoardService } from '../../services/chess-board/chess-board.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
})
export class ChessBoardComponent implements OnInit {
  @Input()
  public initialPosition: string[][] = [];
  //contains the list of each ngClass that has been assigned to each square
  public squareClasses: string[][][] = [];
  public boardConfig: PIECES_COLOR = PIECES_COLOR.WHITE;
  public playerToMove: PIECES_COLOR = PIECES_COLOR.WHITE;

  private selectedPiece: number[] = [];
  private availableMoves: number[][] = [];

  constructor(private chessBoardService: ChessBoardService) {}

  ngOnInit(): void {
    if (this.initialPosition.length == 0) this.defineInitialPosition();
    this.chessBoardService.setCurrentPosition(this.initialPosition);
    this.defineInitialClasses();
  }

  public onChessSquareClick = (row: number, col: number) => {
    //check if already a piece is selected
    if (this.selectedPiece.length != 0) {
      //if yes, check if selected square is available for move
      if (
        this.canMoveOrCapture(
          [this.selectedPiece[0], this.selectedPiece[1]],
          [row, col]
        )
      ) {
        //if yes, make the move or capture
        this.makeMove(
          [this.selectedPiece[0], this.selectedPiece[1]],
          [row, col]
        );
        return;
      } else {
        this.clearSelectedPiece();
      }
    }
    //if no piece is selected, if the selected square has a piece, select it and get availble moves
    this.selectPieceAndShowHints(row, col);
  };

  private defineInitialPosition = (): void => {
    switch (this.boardConfig) {
      case PIECES_COLOR.BLACK: {
        this.initialPosition = DEFAULT_INITIAL_BLACK_POSITION;
        break;
      }
      default: {
        this.initialPosition = DEFAULT_INITIAL_WHITE_POSITION;
      }
    }
  };

  private defineInitialClasses = (): void => {
    for (let i = 0; i < this.initialPosition.length; i++) {
      const row: string[][] = [];
      for (let j = 0; j < this.initialPosition[0].length; j++) {
        const col: string[] = [];
        if (this.initialPosition[i][j]) col.push(this.initialPosition[i][j]);
        row.push(col);
      }
      this.squareClasses.push(row);
    }
  };

  private selectPieceAndShowHints = (row: number, col: number): void => {
    const currSquare = this.initialPosition[row][col];

    if (currSquare == '') {
      this.clearSelectedPiece();
      return;
    }
    const [selectedColor, selectedPiece] = currSquare.split('-');
    if (selectedColor != this.playerToMove) return;
    this.selectedPiece = [row, col];
    this.squareClasses[row][col].push('highlight');
    this.availableMoves = this.chessBoardService.getAvailableMoves(
      row,
      col,
      this.boardConfig,
      this.playerToMove,
      selectedPiece
    );
    this.showAvailableMoves(this.availableMoves);
  };

  private showAvailableMoves = (availableMoves: number[][]): void => {
    availableMoves.forEach((move) => {
      this.squareClasses[move[0]][move[1]].push('move-hint');
    });
  };

  private clearSelectedPiece = () => {
    if (this.selectedPiece.length) {
      this.squareClasses[this.selectedPiece[0]][this.selectedPiece[1]].pop();
      this.selectedPiece.length = 0;
    }
    this.availableMoves.forEach((square) => {
      this.squareClasses[square[0]][square[1]].pop();
    });
    this.availableMoves.length = 0;
  };

  private canMoveOrCapture = (
    intitialSqure: number[],
    finalSquare: number[]
  ): boolean => {
    // if (this.availableMoves.length == 0) {
    //   this.selectPieceAndShowHints(intitialSqure[0], intitialSqure[1]);
    // }
    return this.availableMoves.some((ele) => {
      return ele[0] == finalSquare[0] && ele[1] == finalSquare[1];
    });
  };

  private makeMove = (initialSquare: number[], finalSquare: number[]) => {
    if (this.initialPosition[finalSquare[0]][finalSquare[1]] == '')
      this.movePiece(initialSquare, finalSquare);
    else this.capturePiece(initialSquare, finalSquare);
  };

  private movePiece = (initialSquare: number[], finalSquare: number[]) => {
    //saving the piece change
    const piece = this.initialPosition[initialSquare[0]][initialSquare[1]];
    this.initialPosition[initialSquare[0]][initialSquare[1]] = '';
    this.initialPosition[finalSquare[0]][finalSquare[1]] = piece;

    this.clearSelectedPiece();

    //updating the styling
    this.squareClasses[initialSquare[0]][initialSquare[1]].length = 0;
    this.squareClasses[finalSquare[0]][finalSquare[1]].length = 0;
    this.squareClasses[finalSquare[0]][finalSquare[1]].push(piece);

    this.changeTurn();
  };

  private capturePiece = (initialSquare: number[], finalSquare: number[]) => {
    const capturedPiece = this.initialPosition[finalSquare[0]][finalSquare[1]];
    console.log(capturedPiece);
    this.initialPosition[finalSquare[0]][finalSquare[1]] = '';
    this.movePiece(initialSquare, finalSquare);
  };

  private changeTurn = () => {
    this.playerToMove =
      this.playerToMove === PIECES_COLOR.WHITE
        ? PIECES_COLOR.BLACK
        : PIECES_COLOR.WHITE;
  };
}
