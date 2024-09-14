const path = require('path');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Upload file
const cloudinaryUploadDocument = async (fileToUpload) => {
    try {
        const folderName = 'Zidyia';
        const fileName = `${folderName}/${path.basename(fileToUpload)}`;
        const data = await cloudinary.uploader.upload(fileToUpload, {
            public_id: fileName,
            resource_type: 'auto',
        });
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}

// Cloudinary Upload Image
const cloudinaryUploadImage = async (fileToUpload) => {
    try {
        const folderName = 'Zidyia';
        const fileName = `${folderName}/${path.basename(fileToUpload)}`;
        const data = await cloudinary.uploader.upload(fileToUpload, {
            public_id: fileName,
            resource_type: 'auto',
        });
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}

// Cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryUploadDocument,
}