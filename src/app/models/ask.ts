export interface Ask{
    _id?: string,
    description: string,
    salary: number,
    work_time: number,
    categories: string[],
    languages: string[],
    software: string[],
    specs: string[],
    certifications: string[],
    is_active?: boolean,
	is_complete?: false,
    create_date?: Date,
    title?: string,
    employer?: {
        company: string[];
    }
    bids?: Bid[]
    
}

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