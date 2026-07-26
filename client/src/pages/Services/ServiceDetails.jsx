import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaDownload, FaPrint, FaExternalLinkAlt, FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const servicesData = {
  '1': {
    title: 'E-Passport Application & Renewal',
    category: 'Passport',
    fee: '৳5,750 (5 Years / 48 Pages)',
    time: '7 to 15 Working Days',
    overview: 'The e-Passport (Electronic Passport) contains an embedded microchip that holds biometric information used to authenticate the identity of the bearer. Bangladesh offers e-passports with 5 or 10 years validity.',
    eligibility: [
      'Must be a citizen of Bangladesh by birth or naturalization',
      'Minimum age 18 for 10-year validity passport',
      'Must possess a valid National ID (NID) or Digital Birth Registration Certificate (BRC)'
    ],
    documents: [
      'Original NID Card or Online Verified Birth Registration Certificate (BRC)',
      'Printed copy of Online Application Summary & Application Form',
      'Payment Slip (e-Challan / Bank receipt)',
      'Previous Passport copy (for Renewal)',
      'GO / NOC (for Government Officials)'
    ],
    steps: [
      'Fill out the online application form at epassport.gov.bd.',
      'Pay the government fee via e-Challan or online payment gateways.',
      'Schedule an appointment for biometric enrollment at your local passport office.',
      'Visit the passport office on the scheduled date with all required documents.',
      'Receive SMS confirmation and collect your passport upon completion.'
    ],
    officialLink: 'https://epassport.gov.bd',
    notes: 'Make sure the details on your NID exactly match your application form to avoid rejection during police verification.',
    faqs: [
      { q: 'Is police verification required for e-Passport?', a: 'Police verification is mandatory for new applicants who do not have an existing NID/Passport database match.' },
      { q: 'Can I pay the passport fee online?', a: 'Yes, you can pay using Bkash, Nagad, Rocket, or A-Challan directly through the official portal.' }
    ]
  },
  '2': {
    title: 'Smart NID Card Correction',
    category: 'NID',
    fee: '৳230 (Regular) / ৳345 (Urgent)',
    time: '15 to 30 Days',
    overview: 'Correct your name, parents details, date of birth, or address on your Smart National Identity Card online via NID Service portal.',
    eligibility: ['Registered citizen holding a valid NID number'],
    documents: ['SSC Certificate / Birth Registration', 'Utility Bill / Chairman Certificate', 'NID Correction Application Form'],
    steps: ['Register at services.nidw.gov.bd', 'Select correction type & upload documents', 'Pay fee via Mobile Banking', 'Download corrected e-NID'],
    officialLink: 'https://services.nidw.gov.bd',
    notes: 'Document verification takes 7-10 working days after submission.',
    faqs: [{ q: 'Can I download e-NID immediately?', a: 'Yes, after approval you can download the PDF version from the portal.' }]
  }
};

const ServiceDetails = () => {
  const { id } = useParams();
  const service = servicesData[id] || servicesData['1']; // fallback to ID 1 if not found
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div className="text-xs text-gray-500">
          <Link to="/services" className="hover:text-orange-600">Services</Link> / <span className="text-gray-800 font-semibold">{service.category}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
          >
            <FaPrint /> Print Guide
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
          >
            <FaDownload /> Download Checklist
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
        <span className="text-[10px] font-bold tracking-widest uppercase bg-orange-600 px-3 py-1 rounded-full text-white inline-block mb-3">
          {service.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">{service.title}</h1>
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-3xl mb-6">{service.overview}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/10 p-4 rounded-xl text-xs backdrop-blur-sm">
          <div><span className="text-gray-400 block font-semibold text-[10px]">GOVERNMENT FEE</span><span className="font-bold text-orange-400">{service.fee}</span></div>
          <div><span className="text-gray-400 block font-semibold text-[10px]">ESTIMATED TIME</span><span className="font-bold text-white">{service.time}</span></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Details & Steps */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Eligibility */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-orange-600" /> Eligibility Criteria
            </h2>
            <ul className="space-y-2.5 text-xs text-gray-600">
              {service.eligibility.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Required Documents */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">📄 Required Documents</h2>
            <div className="space-y-2">
              {service.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl text-xs text-gray-700">
                  <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Step-by-Step Process */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">🔄 Step-by-Step Application Process</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-orange-100">
              {service.steps.map((step, idx) => (
                <div key={idx} className="relative pl-8 flex items-start gap-3">
                  <span className="absolute left-0 top-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Accordion */}
          {service.faqs && (
            <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">❓ Frequently Asked Questions</h2>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-3.5 bg-gray-50 flex justify-between items-center text-xs font-bold text-gray-800 hover:bg-gray-100 transition"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {openFaq === idx && (
                      <div className="p-3.5 text-xs text-gray-600 bg-white border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Official Website Card */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Apply on Official Portal</h3>
            <p className="text-xs text-gray-600 mb-4">Go directly to Bangladesh Government official website to submit your form.</p>
            <a
              href={service.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
            >
              Visit Official Website <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-800">
            <span className="font-bold block mb-1">⚠️ Important Note:</span>
            {service.notes}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ServiceDetails;