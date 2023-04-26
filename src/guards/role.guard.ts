import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Role} from "../users/user.entity";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const expectedRole = this.reflector.get<string>('role', context.getHandler());

        if (!expectedRole) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const userRole = request.user.role;
        try{
        return userRole === expectedRole

        }catch (e){
            throw new Error(e.message);
        }
    }
}
