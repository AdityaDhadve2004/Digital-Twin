import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        
        console.log("Uploading to Cloudinary:", localFilePath)
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            resource_type: "auto"
        })
        
        console.log("Cloudinary upload success:", response.url)
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.error("Cloudinary upload error:", error)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
        return null;
    }
}

export {uploadOnCloudinary}