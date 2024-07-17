import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter ad title"],
  },

  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  link: {
    type: String,
    required: [true, "Please enter ad link"],
    match: [/(http|https):\/\/[^\s$.?#].[^\s]*/, "Please enter a valid URL"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ads = mongoose.model("Ads", adSchema);

export default Ads;
