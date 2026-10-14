require('dotenv').config();
const mongoose = require('mongoose');
const Faq = require('../models/Faq');
const Enquiry = require('../models/Enquiry');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const faqs = await Faq.find().sort({ order: 1 });
  console.log('FAQs count in DB:', faqs.length);
  faqs.forEach((f, i) => console.log(`${i}: [${f._id}] ${f.question}`));

  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  console.log('Enquiries count in DB:', enquiries.length);
  enquiries.forEach((e, i) => console.log(`${i}: [${e._id}] ${e.name} - ${e.phone} - ${e.service} - ${e.status}`));
  process.exit(0);
}

check().catch((err) => {
  console.error(err);
  process.exit(1);
});
