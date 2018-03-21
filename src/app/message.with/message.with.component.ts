import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.with';
import { With } from '../models/message.with';
import {ActivatedRoute} from '@angular/router';
import {withIdentifier} from 'codelyzer/util/astQuery';

@Component({
  selector: 'app-message.with',
  templateUrl: './message.with.component.html',
  styleUrls: ['./message.with.component.css']
})
export class MessageWithComponent implements OnInit {
  messages: Message[];
  with: With;
  count: number;
  page: number;
  pagesize: number;
  withId: string;
  textValue: string;
  constructor(private _messageService: MessageService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this._route.params.subscribe(params => {
      this.withId = params.id;
      this._messageService.getMessagesWith(this.withId, this.page, this.pagesize).subscribe(
        res => {
          this.messages = res.messages;
          this.count = res.count;
        },
        err => {
          console.error(err);
        }
      )
    });
  }
  sendMessage() {
    console.log(this.textValue);
    this._messageService.sendMessage(this.textValue, this.withId)
      .subscribe(res => {
        if (res.success) {
          this.messages.push(res.message);
          this.count++;
        } else {
          console.log(res.message);
        }
      });
  }
}
