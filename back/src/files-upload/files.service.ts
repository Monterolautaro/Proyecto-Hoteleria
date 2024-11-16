import { Injectable } from "@nestjs/common";
import { FilesUploadRepository } from "./files.repository";



@Injectable()
export class FilesUploadService{
    constructor(private readonly filsUploadRepository: FilesUploadRepository) {}
    
    uploadImageToCloud(file: Express.Multer.File, roomId: string) {

        

    }
    

}