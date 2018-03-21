import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {environment} from '../../environments/environment';
import { MessageAll } from '../models/message.all';
import { MessageWith } from '../models/message.with';
import { MessagePost } from '../models/message.with';

@Injectable()
export class MessageService {
  baseUrl: string = environment.path + '/api';
  constructor(private _http: HttpClient) { }

  getNewestMessages(page ?: number, pagesize ?: number): Observable<MessageAll> {
    const url = this.createUrl(this.baseUrl + '/message/all', page, pagesize);
    return this._http.get<MessageAll>(url);
  }
  getMessagesWith(id: string, page ?: number, pagesize ?: number): Observable<MessageWith> {
    const url = this.createUrl(this.baseUrl + '/message/with/' + id, page, pagesize);
    return this._http.get<MessageWith>(url);
  }
  sendMessage(text: string, toId: string): Observable<MessagePost> {
    const url = this.baseUrl + '/message/send';
    const postBody = {
      content: text,
      to: toId
    };
    return this._http.post<MessagePost>(url, postBody);
  }
  private createUrl(url, page ?: number, pagesize ?: number): string {
    if (page && pagesize) {
      return `${url}?page=${page}&pagesize${pagesize}`;
    } else if (page) {
      return `${url}?page=${page}`;
    } else if (pagesize) {
      return `${url}?pagesize${pagesize}`;
    } else {
      return url;
    }
  }
}
