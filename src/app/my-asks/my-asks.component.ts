import { Component, OnInit } from '@angular/core';
import { AskService } from '../services/ask.service';
import { Ask } from '../models/ask';

@Component({
  selector: 'app-my-asks',
  templateUrl: './my-asks.component.html',
  styleUrls: ['./my-asks.component.css']
})
export class MyAsksComponent implements OnInit {

  userAsks: Ask[];

  constructor(private _askService: AskService) { }

  ngOnInit() {
    this._askService.getMyAsks().subscribe(userAsks => this.userAsks = userAsks);
  }

  getAsks(): void{
    
  }

  deleteAsk(id: string): void{
    this._askService.deleteAsk(id).subscribe();
    
  }

}
