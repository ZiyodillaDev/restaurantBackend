import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';

interface CustomRequest extends Request {
    imageName?: string;
}

const fileUpload = (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (req.files) {
        const image = req.files.image as UploadedFile;
        if (!image) res.status(400).json({ message: 'Image not found' });

        const extraname = path.extname(image.name);
        const imageName = `${uuid()}${extraname}`;

        image.mv(path.join(process.cwd(), 'uploads', imageName));
        req.imageName = imageName;
        next();
    } else {
        const image = req.body?.image;
        console.log(req.body?.image);
        if (!image) res.status(400).json({ message: 'Image not found' });

        req.imageName = image;
        next();
    }
};

export default fileUpload;