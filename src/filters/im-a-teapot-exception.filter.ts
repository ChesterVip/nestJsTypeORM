import {ArgumentsHost, Catch, ExceptionFilter, ImATeapotException} from "@nestjs/common";
import { Response, Request} from "express";

@Catch(ImATeapotException)
export class ImATeapotExceptionFilter implements ExceptionFilter{
    catch(exception: ImATeapotException, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        response.json({})
    }
}