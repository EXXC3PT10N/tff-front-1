export interface Rates{
    "rates": Rate[]
}

export interface Rate{
    "grade": number,
    "description": string,
    "user_to": string,
    user_from?: User 
}

export interface User{
    "_id": string,
    "username": string,
    "last_name": string,
    "first_name": string
}