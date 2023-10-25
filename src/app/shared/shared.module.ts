import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessBoardComponent } from './components/chess-board/chess-board.component';
import { ChessBoardService } from './services/chess-board/chess-board.service';

@NgModule({
  declarations: [ChessBoardComponent],
  imports: [CommonModule],
  exports: [ChessBoardComponent],
  providers: [ChessBoardService],
})
export class SharedModule {}
