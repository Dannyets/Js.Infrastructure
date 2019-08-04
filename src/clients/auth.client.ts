import axios from 'axios';

export class AuthClient {
    constructor(private baseUrl: string){

    }

    isAuthenticated = (accessibleForRoles: string[], authToken: string) => {
        const reqConfig = {
            headers: {
                Authorization: authToken,
            },
        };
    
        return axios.post(`${this.baseUrl}/${'api/auth/access'}`, accessibleForRoles, reqConfig);
    }
}