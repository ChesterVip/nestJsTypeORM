import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";

export interface CheckAgeOptions{
    minAge: number;
}

export class CheckAgePipe implements PipeTransform{

    constructor(
        private options: CheckAgeOptions,
    ) {}

    transform(value: any, metadata: ArgumentMetadata): number {
        const age = Number(value);
        if (Number.isNaN(age) || age < this.options.minAge){
            throw new BadRequestException({
                statusCode: 200,
                message:`Wyjebało coś i chuj albo nie jest liczbom albo poniżej ${this.options.minAge} lat!`,
                error: "Bad Kurwa request"
            })
        }
        return Number(value);
    }

}