import mongoose from 'mongoose';

const careerInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      default: '',
      trim: true,
    },
    age: {
      type: Number,
    },
    dob: {
      type: Date,
    },
    state: {
      type: String,
      default: '',
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

const CareerInquiry = mongoose.model('CareerInquiry', careerInquirySchema);

export default CareerInquiry;
