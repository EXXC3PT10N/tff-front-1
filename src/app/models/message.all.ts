export interface MessageAll {
  messages: [Message],
  count: number
}

export interface Message {
  _id: string,
  content: string,
  send_date: Date,
  is_read: boolean,
  is_send: boolean,
  username: string,
  first_name: string,
  last_name: string,
  image: string
}

