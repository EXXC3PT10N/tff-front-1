import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.all';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message.all',
  templateUrl: './message.all.component.html',
  styleUrls: ['./message.all.component.css']
})
export class MessageAllComponent implements OnInit {
  messages: Message[];
  count: number;
  page: number;
  pagesize: number;
  constructor(private _messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this._messageService.getNewestMessages(this.page, this.pagesize).subscribe(
      res => {
        this.messages = res.messages;
        this.count = res.count;
      },
      err => {
        console.error(err);
      }
    )
  }
}
