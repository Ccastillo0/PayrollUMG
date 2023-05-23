export interface User {
    userId: Number
    username: string
    password: string
    email: string
    createdAt: Date
}

export interface UserApi{
    data: any
    totalRecords: number
}

