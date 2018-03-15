export interface MenuMessage{
    with: {
        id: string,
        username: string
    },
    last: {
        content: string,
        send_date: Date,
        received: boolean
    }
}