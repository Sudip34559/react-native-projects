import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    campaign_name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Not Connected", "Follow up", "Not interested", "Converted"],
      default: "Not Connected",
    },
  },
  { timestamps: true }
);

export const Employee = model("Employee", employeeSchema);
