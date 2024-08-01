import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (localFilePath) {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      public_id: "shoes",
    });
    console.log("Uploaded file with URL:", uploadResult.url);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url("shoes", {
      fetch_format: "auto",
      quality: "auto",
    });
    console.log("Optimized URL:", optimizeUrl);

    // Transform the image: auto-crop to square aspect ratio
    const autoCropUrl = cloudinary.url("shoes", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });
    console.log("Auto-cropped URL:", autoCropUrl);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    fs.unlinkSync(localFilePath);
  }
};

// Example call to the function (you need to provide the actual local file path)
// uploadOnCloudinary('/path/to/your/local/image.jpg');

export { uploadOnCloudinary };



// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// // Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
// });

//  const uploadonCloudinary = (async function (localfilepath) {
//   try {
    
//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload(localfilepath, {
//       public_id: "shoes",
//     });
//     console.log("Uploaded file with url :", uploadResult.url);
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//       fetch_format: "auto",
//       quality: "auto",
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//       crop: "auto",
//       gravity: "auto",
//       width: 500,
//       height: 500,
//     });

//     console.log(autoCropUrl);
//   } catch (error) {
//     console.log(error);
//     fs.unlinkSync(localfilepath);
//   }
// })();

// export {uploadonCloudinary}
