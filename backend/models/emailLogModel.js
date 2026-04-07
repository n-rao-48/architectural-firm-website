import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema(
  {
    architectEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
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
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['sent', 'failed'],
      required: true,
      default: 'sent',
    },
    error: {
      type: String,
      default: '',
      trim: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

export default EmailLog;
