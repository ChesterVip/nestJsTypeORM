import * as path from "path";
import * as fs from "fs";
import multer, { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import * as mime from "mime";

export function storageDir() {
    const pathFile = path.join(__dirname, "../../../", "storage") as string;
    return pathFile;
}

export function multerStorage() {
    return diskStorage({
        destination: (req, file, cb) => {
            const key = file.fieldname;
            const dirPath = path.join(storageDir(), key);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
            cb(null, dirPath);
        },
        filename: (req, file, cb) => {
            const ext = mime.getExtension(file.mimetype);
            cb(null, `${uuid()}.${ext}`);
        },
    });
}

export enum STORAGE_FIELD {
    PRODUCT_UTILS = "product-utils",
    PHOTO = "photo",
    FILM = "film",
}
