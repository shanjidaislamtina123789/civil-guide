const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    category: { type: String, default: 'Notice' },
    title: { type: String, required: true },
    date: { type: String },
    summary: { type: String, required: true },
    officialLink: { type: String, default: '#' },
  },
  { timestamps: true }
);

// 👈 ৩ নম্বর প্যারামিটার হিসেবে 'notices' যুক্ত করে দাও
module.exports = mongoose.model('Notice', noticeSchema, 'notices');