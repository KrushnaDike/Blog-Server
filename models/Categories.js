import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
    minLength: [4, "Name must be at least 4 characters"],
    maxLength: [50, "Name can exceed 50 characters"],
  },

  status: {
    type: String,
    required: true,
  },

  thumbnailImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Categories = new mongoose.model("Categories", categorySchema);

export default Categories;
