import {jwtDecode} from 'jwt-decode'

export const verifyToken = (token: string) => {
    console.log("verifyToken => ", jwtDecode(token));
    return jwtDecode(token);
}