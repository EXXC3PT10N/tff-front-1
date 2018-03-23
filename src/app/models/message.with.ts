export interface MessageWith {
  with: User,
  me: User,
  messages: [Message],
  count: number
}

export interface User {
  _id: string,
  username: string,
  last_name: string,
  first_name: string,
  image: string
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

export interface GroupMessage {
  is_send: boolean,
  messages: [Message]
}
