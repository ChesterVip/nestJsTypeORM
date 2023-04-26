import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";

@Injectable()
export class PasswordProtectGuard implements CanActivate{


    constructor(
        private reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const goodPass = this.reflector.get<string>("passwordProtectLog", context.getHandler());

        return request.headers['x-password'] === goodPass;

    }

}9