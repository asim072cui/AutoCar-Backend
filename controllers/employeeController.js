import EmployeeModel from "../models/EmployeeModel.js";
import cloudinary from "../config/cloudinary.js";
/* 🔥 ADD THIS FUNCTION (TOP OF FILE) */
const streamUpload = (buffer, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(buffer);
  });
};
// export const createEmployee = async (req, res) => {
//   try {
//     const applicationtype =
//       req.body.applicationtype ||
//       (req.files?.cvUrl ? "CV_ONLY" : "FULL_FORM");

//     let cvUrl = "";
//     let imgUrl = "";
//     if (applicationtype === "CV_ONLY" && req.files?.cvUrl) {
//       const result = await streamUpload(
//         req.files.cvUrl[0].buffer,
//         {
//           resource_type: "raw",
//           folder: "employee_cvs",
//           type: "upload",
//           access_mode: "public",
//           public_id: `${Date.now()}-cv.pdf`,
//         }
//       );

//       cvUrl = result.secure_url;
//     }

//     // ✅ FULL FORM (IMAGE)
//     if (applicationtype === "FULL_FORM" && req.files?.image) {
//       const result = await streamUpload(
//         req.files.image[0].buffer,
//         {
//           resource_type: "image",
//           folder: "employee_images"
//         }
//       );

//       imgUrl = result.secure_url;
//     }

//     const employee = new EmployeeModel({
//       ...req.body,
//       applicationtype,
//       cvUrl,
//       img: imgUrl
//     });

//     const savedEmployee = await employee.save();

//     res.status(201).json({
//       message: "Employee application submitted successfully",
//       employee: savedEmployee
//     });

//   } catch (error) {
//     console.error("Error creating employee:", error);
//     res.status(500).json({
//       message: "Server error",
//       error: error.message
//     });
//   }
// };

export const createEmployee = async (req, res) => {
  try {
    // 1️⃣ Get logged-in user's email from frontend
    // Frontend should send it in req.body.email
    const userEmail = req.body.email; // <-- required

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }
    // 2️⃣ Determine application type
    const applicationtype =
      req.body.applicationtype ||
      (req.files?.cvUrl ? "CV_ONLY" : "FULL_FORM");

    let cvUrl = "";
    let imgUrl = "";

    // 3️⃣ Upload CV
    if (applicationtype === "CV_ONLY" && req.files?.cvUrl) {
      const result = await streamUpload(req.files.cvUrl[0].buffer, {
        resource_type: "raw",
        folder: "employee_cvs",
        type: "upload",
        access_mode: "public",
        public_id: `${Date.now()}-cv.pdf`,
      });

      cvUrl = result.secure_url;
    }

    // 4️⃣ Upload image (if full form)
    if (applicationtype === "FULL_FORM" && req.files?.image) {
      const result = await streamUpload(req.files.image[0].buffer, {
        resource_type: "image",
        folder: "employee_images",
      });

      imgUrl = result.secure_url;
    }

    // 5️⃣ Create employee record
    const employee = new EmployeeModel({
      ...req.body,
      email: userEmail, // <-- store user email from frontend
      applicationtype,
      cvUrl,
      img: imgUrl,
    });
    const savedEmployee = await employee.save();

    res.status(201).json({
      message: "Employee application submitted successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: " Employees fetched sucessfully", employees });
  } catch (error) {
    res.status(500).json({ message: " Server error", error: error.message });
  }
}
export const getEmployeebyId = async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    console.log('Check this what is the employee data  ', employee);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: " Employee fetched sucessfully", employee });
  } catch (error) {
    res.status(500).json({ message: " Server error", error: error.message })
  }
}
export const updateEmployeeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    const employee = await EmployeeModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee is not found" })
    }
    employee.status = status;
    await employee.save();
    res.status(200).json({ message: "Employee status updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: " Server error", error: error.message })
  }
}
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee is not found" })
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: " Server error", error: error.message })
  }
}
export const getMyEmployeeApplications = async (req, res) => {
  try {
    let { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Trim and convert to lowercase
    email = email.trim().toLowerCase();

    // Find by email (case-insensitive)
    const employees = await EmployeeModel.find({
      email: { $regex: `^${email}$`, $options: "i" }
    }).sort({ createdAt: -1 });

    if (!employees.length) {
      return res.status(404).json({ message: "No applications found for this email" });
    }

    res.status(200).json({
      message: "User applications fetched successfully",
      total: employees.length,
      employees
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

