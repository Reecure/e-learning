export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
    TEACHER = "teacher"
}

export interface User {
    id: string
    courses: any
    email: string
    firstname: string
    is_new_user: boolean
    lastname: string
    password: string
    registration_date: string
    role: UserRoles | string
}
