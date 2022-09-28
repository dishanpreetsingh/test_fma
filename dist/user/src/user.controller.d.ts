import { UserService } from "./services/user.services";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createuser(data: any): Promise<any>;
}
