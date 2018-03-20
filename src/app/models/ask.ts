export interface Ask{
    description: string,
    salary: number,
    work_time: number,
    categories: string[],
    languages: string[],
    software: string[],
    specs: string[],
    certifications: string[],
    _id?: string,
    employer?: {
        company: string[];
    }
    bids?: {
        description: string,
        salary: number
    },
    is_active?: boolean,
	is_complete?: false,
    creation_date?: Date,
    title?: string
}