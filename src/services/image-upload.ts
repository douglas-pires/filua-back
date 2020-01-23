import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../config';

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: 'us-east-1',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'filua',
    metadata: (req, file, cb) => {
      cb(null);
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

export default upload;
