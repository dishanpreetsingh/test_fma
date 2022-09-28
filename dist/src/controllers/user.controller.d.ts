import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { AppService } from "src/app.service";
import { CreateUserDto } from "src/interfaces/user/create-user.dto";
export declare class UserController {
    private readonly appService;
    private readonly userServiceClient;
    private readonly jwtService;
    constructor(appService: AppService, userServiceClient: ClientProxy, jwtService: JwtService);
    register(userRegister: any): Promise<any>;
    googleAuth(userRequest: CreateUserDto): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        token: string;
        user: any;
    }>;
}
