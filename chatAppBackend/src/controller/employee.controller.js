import { Employee } from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiArror.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinery } from "../utils/cloudinary.js";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";

const createEmployee = asyncHandler(async (req, res) => {
  const csvFilePath = req.file?.path;
  const csvFile = req.file;
  // console.log(req.file);

  try {
    const filetypes = /csv/;
    const extname = filetypes.test(
      path.extname(csvFile.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(csvFile.mimetype);
    // console.log(extname, mimetype);
    if (!extname || !mimetype) {
      throw new ApiError(400, "Invalid file type. Please upload a CSV file.");
    }
    const employees = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        console.log(row);
        const { name, phone, location, address, campaign_name } = row;
        employees.push({ name, phone, location, address, campaign_name });
      })
      .on("end", async () => {
        const employee = await Employee.insertMany(employees);
        fs.unlinkSync(csvFilePath);
        return res
          .status(201)
          .json(
            new ApiResponse(201, employee, "Employees created successfully")
          );
      });
  } catch (error) {
    throw error;
  }
});

const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, employees, "Employees fetched successfully"));
});

export { createEmployee, getAllEmployees };
