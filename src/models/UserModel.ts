class UserModel{
    id: number;
    username: string;
    password: string;
    fullName: string;

    constructor(id: number, username: string, password: string, fullName: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
    }
}

export default UserModel;