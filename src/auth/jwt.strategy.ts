import {Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {User} from "../users/user.entity";

export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.TOKENSALT,
        })
    }

    async validate(payload: JwtPayload, done: (error, user) => void) {
        if (!payload || !payload.id){
            return done(new UnauthorizedException(), false);
        }
        const user = await User.findOne({ where: {currentTokenId: payload.id}});
        if (!user) return done(new UnauthorizedException(), false);

        console.log(user)
        done(null, user);
    }
}

// import { Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { User } from '../users/user.entity';
//
// export interface JwtPayload {
//     id: string;
// }
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor() {
//         super({
//             jwtFromRequest: (req) => {
//                 const authHeader = req.headers.authorization;
//                 if (authHeader && authHeader.startsWith('Bearer ')) {
//                     return authHeader.slice(7);
//                 }
//                 return null;
//             },
//             secretOrKey: process.env.TOKENSALT,
//         });
//     }
//
//     async validate(payload: JwtPayload, done: (error, user) => void) {
//         if (!payload || !payload.id) {
//             return done(new UnauthorizedException(), false);
//         }
//         const user = await User.findOne({ where: { currentTokenId: payload.id } });
//         if (!user) return done(new UnauthorizedException(), false);
//
//         done(null, user);
//     }
// }
