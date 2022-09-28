import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { JwtAuthGuard } from "src/guard/jwt-auth-guard";
import { CreateUserDto } from "src/interfaces/user/create-user.dto";

@ApiBearerAuth('defaultBearerAuth')
@Controller()
@ApiTags("User")
export class UserController {
    constructor(private readonly appService: AppService,
        @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
        private readonly jwtService: JwtService
    ) { }

    public async register(@Body() userRegister: any): Promise<any> {
        return await this.userServiceClient.send<any>({ cmd: "user_register" }, userRegister).toPromise();
    }
    @ApiOperation({ summary: 'Login With Google' })
    @Get('/login')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() userRequest: CreateUserDto) { }
    @ApiOperation({ summary: 'Redirect Page' })
    @Get('/google/redirect')
    @UseGuards(AuthGuard('google'))
    public async googleAuthRedirect(@Req() req) {
        let user = await this.register(req.user);
        if (user) {
            let payload = { user: user.name, _id: user._id }
            var token = this.jwtService.sign(payload);
            return { token, user }
        }
        //   return this.appService.googleLogin({token,user});
    }

}