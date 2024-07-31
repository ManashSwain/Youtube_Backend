import multer from "multer" ;
import path from "path" ;
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDirectoryPath = path.resolve(__dirname, '../../public/temp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempDirectoryPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
   export const upload = multer({ storage: storage })