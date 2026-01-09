import express from 'express';
import multer from 'multer';
import { createEmployee, getAllEmployees, getEmployeebyId, updateEmployeeStatus, deleteEmployee, getMyEmployeeApplications } from '../controllers/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage });
// const upload = multer({
//   storage: multer.memoryStorage(),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype !== "application/pdf") {
//       cb(new Error("Only PDF files are allowed"), false);
//     } else {
//       cb(null, true);
//     }
//   }
// });


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allow PDFs
  if (file.mimetype === "application/pdf") {
    return cb(null, true);
  }

  // Allow images
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  // Reject everything else
  cb(new Error("Only PDF and image files are allowed"), false);
};

export const upload = multer({
  storage,
  fileFilter,
});


router.post('/create-employee', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cvUrl', maxCount: 1 }]), createEmployee);
router.get('/all-employees', protect, getAllEmployees);
router.get('/employee/:id', protect, getEmployeebyId);
router.put('/update-status/:id', updateEmployeeStatus);
router.delete('/delete-employee/:id', protect, deleteEmployee);
router.get('/employee-records', getMyEmployeeApplications);  

export default router;