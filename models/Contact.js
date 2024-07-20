import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },

  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid mobile number with 10 digits"],
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

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
