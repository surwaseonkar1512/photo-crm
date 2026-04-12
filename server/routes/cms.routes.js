const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cms.controller");
const { protect } = require("../middleware/auth.middleware");
const { upload, processAndUploadImage } = require("../middleware/upload.middleware");

// Dynamic Variant Image Array Generator
const packageUploadFields = Array.from({ length: 15 }, (_, i) => ({ name: `variantImage_${i}`, maxCount: 1 }));

// ==========================
// SITE SETTINGS
// ==========================
router.get("/site-settings", cmsController.getSiteSettings);
router.put(
  "/site-settings",
  protect,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "stamp", maxCount: 1 },
    { name: "signature", maxCount: 1 }
  ]),
  processAndUploadImage,
  cmsController.updateSiteSettings
);

// ==========================
// BANNERS
// ==========================
router.get("/banner", cmsController.getBanners);
router.post(
  "/banner",
  protect,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "sideImage", maxCount: 1 }
  ]),
  processAndUploadImage,
  cmsController.createBanner
);
router.put(
  "/banner/:id",
  protect,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "sideImage", maxCount: 1 }
  ]),
  processAndUploadImage,
  cmsController.updateBanner
);
router.delete("/banner/:id", protect, cmsController.deleteBanner);

// ==========================
// TESTIMONIALS
// ==========================
router.get("/testimonial", cmsController.getTestimonials);
router.post("/testimonial", protect, upload.single("image"), processAndUploadImage, cmsController.createTestimonial);
router.put("/testimonial/:id", protect, upload.single("image"), processAndUploadImage, cmsController.updateTestimonial);
router.delete("/testimonial/:id", protect, cmsController.deleteTestimonial);

// ==========================
// PACKAGES
// ==========================
router.get("/package", cmsController.getPackages);
router.post("/package", protect, upload.fields(packageUploadFields), processAndUploadImage, cmsController.createPackage);
router.put("/package/:id", protect, upload.fields(packageUploadFields), processAndUploadImage, cmsController.updatePackage);
router.delete("/package/:id", protect, cmsController.deletePackage);

// ==========================
// ABOUT US
// ==========================
router.get("/about", cmsController.getAbout);
router.put("/about", protect, upload.single("image"), processAndUploadImage, cmsController.updateAbout);

// ==========================
// CONTACT US
// ==========================
router.get("/contact", cmsController.getContact);
router.put("/contact", protect, cmsController.updateContact); // No image needed inside Contact model typically

module.exports = router;
