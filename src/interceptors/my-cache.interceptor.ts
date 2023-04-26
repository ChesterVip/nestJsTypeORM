import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable, of, tap} from "rxjs";
import {CacheEntity} from "../cache/cache-entity";


@Injectable()
export class MyCacheInterceptor implements NestInterceptor {

    constructor(
        private reflector: Reflector,
    ) {
    }

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<any>> {
        const method = context.getHandler();
        const goodPass = this.reflector.get<number>("timeoutOfMethod", context.getHandler());
        const actionName = context.getHandler().name;
        const controllerName = context.getClass().name;

        const cachedData = await CacheEntity.findOneBy({
            controllerName, actionName,
        });


        if (cachedData) {
            if (+cachedData.createdAt + (goodPass * 1000) > +new Date()) {
                console.log("Using cached data", cachedData.dataJson);
                return of(JSON.parse(cachedData.dataJson));
            } else {

                console.log("Removing old cached Data..")
                await cachedData.remove();

                return next.handle().pipe(
                    tap(async data => {
                        console.log("Creating new cache...");
                        const newCachedData = new CacheEntity();
                        newCachedData.actionName = actionName;
                        newCachedData.controllerName = controllerName;
                        newCachedData.dataJson = JSON.stringify(data);
                        await newCachedData.save();

                    }))
            }
        }


    }
}