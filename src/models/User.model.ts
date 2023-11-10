import { Address } from "./Location";

export class UserModel {
    constructor(data: UserModel) {
        this._id = data._id;
        this.email = data.email;
        this.userName = data.userName;
        this.password = data.password;
        this.emailVerified = data.emailVerified;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    _id: string;
    email: string;
    userName: string;
    emailVerified?: boolean;
    password: string;
    role?: string;
    address?: Address[];
    firstName: string;
    lastName: string;
    // block?: BlockSchema;
    // avatar?: ImageSchema;
    createdAt?: Date;
    updatedAt?: Date;
}
