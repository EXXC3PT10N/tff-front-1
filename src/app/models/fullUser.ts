export interface FullUser{
    "user": {
        "rate": number,
        "username": string,
        "email": string,
        "city": string,
        "phone": string,
        "last_name": string,
        "first_name": string,
        "status": number,
        image?: string
    },
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
        education?: string

    },
    "employer": {
        "asks": object,
        "company": [
            {
                "name": string,
                "NIP": string,
                "city": string
            }
        ],
        git_link?: string,
        linked_in_link?: string
    }
}