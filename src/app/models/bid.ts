export interface Bid{
    description: string,
    salary: number
    create_date?: Date,
    is_accepted?: boolean,
    _id?: string,
    employee?: {
        _id?: string,
        user_id?: string
    },
    ask?: string,
    
}