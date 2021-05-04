import { User } from "./user.model";

export class Session {
    public access_token: string;
    public user: User;

    constructor(access_token: string, user: User) {
        this.access_token = access_token; 
        this.user = user;
    }
}
