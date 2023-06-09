import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ImATeapotException} from "@nestjs/common";
import { Response, Request} from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        response.json({
            status,
        })
    }
}