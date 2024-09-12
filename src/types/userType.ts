export type TUser = {
    _id: string;
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    avatar: string;
    sex: string;
    address: string;
    newUser?: boolean;
    iat: number;
    exp: number;
};