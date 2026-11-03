import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';    

dotenv.config();

// AWS S3 configuration
aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

// This upload object will act as a middleware to handle file uploads to S3. It uses multer and multer-s3 to handle the file upload process.
const upload = multer({ 
    storage: multerS3({ 
        s3: s3, //s3 instance
        bucket: process.env.AWS_BUCKET_NAME, //s3 bucket name
        metadata: function (req, file, cb) { //metadata for the file
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) { //unique file name generation
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});

export default upload;