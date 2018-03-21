export interface MessageWith {
  with: With,
  messages: [Message],
  count: number
}

export interface With {
  _id: string,
  username: string,
  last_name: string,
  first_name: string
}

export interface Message {
  send_date: Date,
  is_read: boolean,
  _id: string,
  content: string,
  is_send: boolean
}

export interface MessagePost {
  success: string,
  message: Message,
}
