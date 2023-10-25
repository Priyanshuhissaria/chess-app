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

  constructor(private chessBoardService: ChessBoardService) {}

  ngOnInit(): void {
    if (this.initialPosition.length == 0) this.defineInitialPosition();
    this.chessBoardService.setCurrentPosition(this.initialPosition);
    this.defineInitialClasses();
  }

  public onChessSquareClick = (row: number, col: number) => {
    const currSquare = this.initialPosition[row][col];
    if (currSquare == '') return;
    const [selectedColor, selectedPiece] = currSquare.split('-');
    if (selectedColor != this.playerToMove) return;

    const availableMoves: number[][] = this.chessBoardService.getAvailableMoves(
      row,
      col,
      this.boardConfig,
      this.playerToMove,
      selectedPiece
    );
    
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
}
