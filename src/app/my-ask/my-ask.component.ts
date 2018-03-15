import { Component, OnInit } from '@angular/core';
import { Ask } from '../models/ask';
import { AskService } from '../services/ask.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-ask',
  templateUrl: './my-ask.component.html',
  styleUrls: ['./my-ask.component.css']
})
export class MyAskComponent implements OnInit {

  userAsks: Ask[];

  constructor(private _askService: AskService) { }

  ngOnInit() {
    this.getAsks();
  }

  getAsks(): void{
    this._askService.getMyAsks().subscribe(userAsks => this.userAsks = userAsks);
  }

  deleteAsk(id: string): void{
    this._askService.deleteAsk(id).subscribe();
  }

}
