export interface FullUser{
    "user": {
        "username": string,
        "email": string,
        "city": string,
        "phone": string,
        "last_name": string,
        "first_name": string,
        "status": number,
        unread_messages: number,
        image?: string,
        _id?: string
    },
    "rate": number,
    "employee": {
        "bids": object,
        "languages": any[],
        "software": any[],
        "specs": any[],
        "certifications": any[],
        "categories": any[],
        description?: string,
        portfolio_link?: string,
        git_link?: string,
        linked_in_link?: string,
        education?: string,
        finished_asks?: number,
        in_progress_asks?: number,
        waiting_asks?: number
    

    },
    "employer": {
        "asks": object,
        "company": Company[],
        git_link?: string,
        linked_in_link?: string,
        active_asks?: number,
        finished_asks?: number,
        in_progress_asks?: number
    },
    
}

export interface Company{
    "name": string,
    "NIP": string,
    "city": string,
    _id?: string
}