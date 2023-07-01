import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as shortId from 'shortId';

@Injectable()
export class FileService {
  createFile(file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = shortId.generate() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return fileName;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(filePath: string) {
    const fullFilePath = path.resolve(__dirname, '..', 'static', filePath);
    try {
      fs.unlinkSync(fullFilePath);
    } catch (err) {
      console.log('File with this path was not found!');
    }
  }
}
