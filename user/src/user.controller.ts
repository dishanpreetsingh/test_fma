import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./services/user.services";

@Controller()
export class UserController{
    constructor(private readonly userService: UserService) {}

    @MessagePattern({cmd: "user_register"})
    public async createuser(data:any):Promise<any>{
        let user = await this.userService.createUser(data);
        if(user){
            return user;
        }else{
            return false;
        }
        
    }
}