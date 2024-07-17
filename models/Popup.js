import mongoose from "mongoose";

const popupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  offer: {
    type: Object,
    properties: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      discountPercentage: {
        type: Number,
      },
      couponCode: {
        type: String,
      },
    },
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

const Popup = new mongoose.model("Popup", popupSchema);

export default Popup;
