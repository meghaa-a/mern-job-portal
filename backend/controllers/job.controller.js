import { Job } from "../models/job.model.js";
// admin post krega job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// // student
// export const getAllJobs = async (req, res) => {
//   try {
//     const keyword = req.query.keyword || "";

//     let query = {};

//     // Location Filter
//     if (
//       keyword === "Delhi NCR" ||
//       keyword === "Bangalore" ||
//       keyword === "Hyderabad" ||
//       keyword === "Pune" ||
//       keyword === "Mumbai" ||
//       keyword === "Noida"
//     ) {
//       query = {
//         location: keyword,
//       };
//     }

//     // Industry Filter
//     else if (
//       keyword === "Frontend Developer" ||
//       keyword === "Backend Developer" ||
//       keyword === "FullStack Developer"
//     ) {
//       query = {
//         title: {
//           $regex: keyword,
//           $options: "i",
//         },
//       };
//     }

//     // Salary Filter
//     else if (keyword.includes("-")) {
//       const [min, max] = keyword.split("-").map(Number);

//       query = {
//         salary: {
//           $gte: min,
//           $lte: max,
//         },
//       };
//     }

//     // Search Bar
//     else {
//       query = {
//         $or: [
//           {
//             title: {
//               $regex: keyword,
//               $options: "i",
//             },
//           },
//           {
//             description: {
//               $regex: keyword,
//               $options: "i",
//             },
//           },
//         ],
//       };
//     }

//     const jobs = await Job.find(query)
//       .populate("company")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       jobs,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company");

    console.log("=================================");
    console.log("Jobs found:", jobs.length);

    jobs.forEach((job) => {
      console.log(job.title);
    });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
