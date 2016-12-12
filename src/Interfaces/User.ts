export interface User {
    id?: Number
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    birthdate?: Date;
    createdAt?: Date;
    apiKey?: string
}

export interface NewUser extends User{
    password?: string
}
