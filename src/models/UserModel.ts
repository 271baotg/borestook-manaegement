import { Role } from "./Role";

class UserModel{
    id?: number;
    username: string;
    password: string;
    fullName?: string;
    roles?:Role[];

    constructor(username: string, password: string, fullName: string, id?: number, roles?:Role[],) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.roles = roles;
    }
}

export default UserModel;