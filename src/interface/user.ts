import {User} from "../users/user.entity";

export interface RegisterUserResponse {
    id: string;
    email: string;
}
export type GetUsersResponse = User[];
export type GetOneUserResponse = User;