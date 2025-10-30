import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    sclassName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    feeType: { type: String, required: true },
    amount: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    dueDate: { type: Date, required: true },
    paymentStatus: { type: String, default: "Pending" },
    remarks: { type: String, default: "" },
    academicYear: { type: String },
    semester: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Fee", feeSchema);
