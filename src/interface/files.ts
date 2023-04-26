export interface MulterDiskUploadedFiles{
    [fieldname:string]: {
        filename: string;
        size: number;
        minetype:string;
        originalname: string;
        fieldname: string;
        encoding: string
        path: string;
    }[] | undefined;
}

