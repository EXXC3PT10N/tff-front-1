import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.all';
import { MessageService } from '../services/message.service';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';

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
  basePath = environment.path;
  defaultImg: string = environment.defaultImage;
  constructor(private _messageService: MessageService, private _authService: AuthService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this._messageService.getNewestMessages(this.page, this.pagesize).subscribe(
      res => {
        this.messages = res.messages;
        this.count = res.count;
        this.messages = this.messages.map(msg => {
          msg.image = msg.image || this.defaultImg;
          return msg;
        });
      },
      err => {
        console.error(err);
      }
    )
  }
  logout() {
    this._authService.logout();
  }
}
