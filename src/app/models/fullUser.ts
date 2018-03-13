export interface FullUser{
    "user": {
        "rate": number,
        "username": string,
        "email": string,
        "city": string,
        "phone": string,
        "last_name": string,
        "first_name": string,
        "status": number
    },
    "employee": {
        "bids": object,
        "languages": any[],
        "software": any[],
        "specs": any[],
        "certifications": any[],
        "categories": any[]

    },
    "employer": {
        "asks": object,
        "company": [
            {
                "name": string,
                "NIP": string,
                "city": string
            }
        ]
    }
}