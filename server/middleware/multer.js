// For storing the video and the image

import multer from 'multer'
import {v4 as uuid} from 'uuid'

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads")
    },
    filename(req,file,cb){
       const id = uuid();

       const extName = file.originalname.split(".").pop();

       const fileName = `${id}.${extName}`;

       cb(null,fileName);
    }
});

export const  uploadFiles = multer({storage}).single("file");


// import multer from 'multer';
// import { v4 as uuid } from 'uuid';

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads'); // Specifies the destination directory for the files
//     },
//     filename(req, file, cb) {
//         const id = uuid(); // Generates a unique identifier for the file
//         const extName = file.originalname.split('.').pop(); // Extracts the file extension
//         const fileName = `${id}.${extName}`; // Creates the new file name
//         cb(null, fileName); // Passes the file name to the callback
//     }
// });

// export const uploadFiles = multer({ storage }).single("file"); // Configures multer for single file uploads
