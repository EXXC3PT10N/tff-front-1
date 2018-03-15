export interface Message{
    with: {
        id: string,
        username: string
    },
    texts: [
        {
            content: string,
            send_date: Date,
            received: boolean
        }
    ]
}