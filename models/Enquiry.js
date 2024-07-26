import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },

  postName: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid mobile number with 10 digits"],
  },

  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },

  message: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
