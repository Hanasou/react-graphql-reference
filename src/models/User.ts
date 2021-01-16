export interface UserGet {
    id: string,
    firstName: string;
    age: number;
    company: Company;
}

export interface UserGetData {
    users: UserGet[];
}

export interface AddUserRequest {
    firstName: string;
    age: number;
    companyName: string;
}

interface Company {
    name: string;
    description: string;
}