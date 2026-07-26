import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaConciergeBell,
  FaBullhorn,
  FaQuestionCircle,
  FaPlus,
  FaTimes,
  FaTrash,
  FaReply,
} from "react-icons/fa";
import axios from "axios";

const defaultServices = [
  {
    id: "1",
    name: "E-Passport Application & Renewal",
    category: "Passport",
    fee: "৳5,750+",
    time: "7-15 Days",
    desc: "Apply for a new e-passport online.",
  },
  {
    id: "2",
    name: "Smart NID Card Correction",
    category: "NID",
    fee: "৳230+",
    time: "15-30 Days",
    desc: "Correct mistakes in name, birth date, or address.",
  },
  {
    id: "3",
    name: "Digital Birth Certificate",
    category: "Birth Certificate",
    fee: "৳50+",
    time: "3-7 Days",
    desc: "Register or correct digital birth certificates.",
  },
  {
    id: "4",
    name: "BRTA Driving License",
    category: "Driving License",
    fee: "৳500+",
    time: "30 Days",
    desc: "Driving license application and renewal.",
  },
  {
    id: "5",
    name: "e-TIN Registration",
    category: "e-TIN",
    fee: "Free",
    time: "Instant",
    desc: "Get your 12-digit Tax Identification Number.",
  },
  {
    id: "6",
    name: "Trade License Renewal",
    category: "Trade License",
    fee: "Varies",
    time: "2-5 Days",
    desc: "Apply for or renew your business trade license.",
  },
];

const defaultFaqs = [
  {
    id: "1",
    q: "How long does e-passport processing take?",
    a: "Regular processing takes 15 to 21 working days.",
  },
  {
    id: "2",
    q: "Can I apply for NID correction online?",
    a: "Yes, via the official NID portal.",
  },
];

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [notices, setNotices] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  const [replyingFaqId, setReplyingFaqId] = useState(null);
  const [replyAnswer, setReplyAnswer] = useState("");

  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceCategory, setNewServiceCategory] =
    useState("Passport");

  const [newNoticeTitle, setNewNoticeTitle] = useState("");
  const [newNoticeDesc, setNewNoticeDesc] = useState("");
  const [newNoticeCategory, setNewNoticeCategory] =
    useState("Notice");
  const [newNoticeLink, setNewNoticeLink] = useState("");

  const loadNotices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/notices"
      );

      setNotices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadNotices();

    const savedServices =
      JSON.parse(localStorage.getItem("appServices")) ||
      defaultServices;

    const savedFaqs =
      JSON.parse(localStorage.getItem("appFaqs")) ||
      defaultFaqs;

    setServices(savedServices);
    setFaqs(savedFaqs);
  }, []);
  // =========================
// Add Service
// =========================
const handleAddService = (e) => {
  e.preventDefault();

  if (!newServiceName.trim()) return;

  const newService = {
    id: Date.now().toString(),
    name: newServiceName,
    category: newServiceCategory,
    fee: "৳100+",
    time: "1-3 Days",
    desc: "Newly added government service."
  };

  const updated = [newService, ...services];

  setServices(updated);

  localStorage.setItem(
    "appServices",
    JSON.stringify(updated)
  );

  setNewServiceName("");
  setNewServiceCategory("Passport");

  setShowServiceModal(false);
};

// =========================
// Add Notice
// =========================
const handleAddNotice = async (e) => {
  e.preventDefault();

  if (!newNoticeTitle || !newNoticeDesc) {
    alert("Please fill all fields.");
    return;
  }

  try {

    const noticeData = {
      title: newNoticeTitle,
      summary: newNoticeDesc,
      category: newNoticeCategory,
      officialLink: newNoticeLink || "#",
    };

    await axios.post(
      "http://localhost:8000/api/notices",
      noticeData
    );

    await loadNotices();

    setNewNoticeTitle("");
    setNewNoticeDesc("");
    setNewNoticeCategory("Notice");
    setNewNoticeLink("");

    setShowNoticeModal(false);

    alert("Notice published successfully!");

  } catch (err) {

    console.log(err);

    alert("Failed to publish notice.");

  }
};

// =========================
// Delete Notice
// =========================
const handleDeleteNotice = async (id) => {

  if (!window.confirm("Delete this notice?")) return;

  try {

    await axios.delete(
      `http://localhost:8000/api/notices/${id}`
    );

    await loadNotices();

  } catch (err) {

    console.log(err);

    alert("Delete failed.");

  }

};

// =========================
// Delete Service
// =========================
const handleDeleteService = (id) => {

  const updated = services.filter(
    (item) => item.id !== id
  );

  setServices(updated);

  localStorage.setItem(
    "appServices",
    JSON.stringify(updated)
  );

};

// =========================
// Delete FAQ
// =========================
const handleDeleteFaq = (id) => {

  const updated = faqs.filter(
    (item) => item.id !== id
  );

  setFaqs(updated);

  localStorage.setItem(
    "appFaqs",
    JSON.stringify(updated)
  );

};

// =========================
// Reply FAQ
// =========================
const handleAnswerFaq = (id) => {

  if (!replyAnswer.trim()) return;

  const updated = faqs.map((item) =>
    item.id === id
      ? { ...item, a: replyAnswer }
      : item
  );

  setFaqs(updated);

  localStorage.setItem(
    "appFaqs",
    JSON.stringify(updated)
  );

  setReplyingFaqId(null);

  setReplyAnswer("");

};
return (
  <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh]">

    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
      Admin Dashboard
    </h1>

    {/* Dashboard Cards */}

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

      <div className="bg-white rounded-2xl shadow border p-5 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Users</p>
          <h2 className="text-3xl font-bold">2</h2>
        </div>

        <FaUsers className="text-3xl text-orange-500" />
      </div>

      <div className="bg-white rounded-2xl shadow border p-5 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Services</p>
          <h2 className="text-3xl font-bold">
            {services.length}
          </h2>
        </div>

        <FaConciergeBell className="text-3xl text-orange-500" />
      </div>

      <div className="bg-white rounded-2xl shadow border p-5 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Notices</p>
          <h2 className="text-3xl font-bold">
            {notices.length}
          </h2>
        </div>

        <FaBullhorn className="text-3xl text-orange-500" />
      </div>

      <div className="bg-white rounded-2xl shadow border p-5 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">FAQs</p>
          <h2 className="text-3xl font-bold">
            {faqs.length}
          </h2>
        </div>

        <FaQuestionCircle className="text-3xl text-orange-500" />
      </div>

    </div>

    {/* Buttons */}

    <div className="flex gap-3 mb-8">

      <button
        onClick={() => setShowServiceModal(true)}
        className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
      >
        <FaPlus />
        Add Service
      </button>

      <button
        onClick={() => setShowNoticeModal(true)}
        className="bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2"
      >
        <FaPlus />
        Post Notice
      </button>

    </div>

    {/* Three Columns */}

    <div className="grid lg:grid-cols-3 gap-6">

      {/* Services */}

      <div className="bg-white rounded-2xl border shadow p-5">

        <h3 className="font-bold mb-4">
          Services ({services.length})
        </h3>

        <div className="space-y-3">

          {services.map((item) => (

            <div
              key={item.id}
              className="bg-gray-50 rounded-xl p-3 flex justify-between items-center"
            >

              <div>

                <h4 className="font-semibold text-sm">
                  {item.name}
                </h4>

                <p className="text-xs text-gray-500">
                  {item.category}
                </p>

              </div>

              <button
                onClick={() =>
                  handleDeleteService(item.id)
                }
                className="text-red-500"
              >
                <FaTrash />
              </button>

            </div>

          ))}

        </div>

      </div>
           {/* Notices */}

           <div className="bg-white rounded-2xl border shadow p-5">

<h3 className="font-bold mb-4">
  Recent Notices ({notices.length})
</h3>

<div className="space-y-3">

  {notices.length === 0 ? (

    <p className="text-sm text-gray-500">
      No notices found.
    </p>

  ) : (

    notices.map((item) => (

      <div
        key={item._id}
        className="bg-gray-50 rounded-xl p-3 flex justify-between items-start"
      >

        <div className="flex-1">

          <h4 className="font-semibold text-sm">
            {item.title}
          </h4>

          <p className="text-xs text-gray-500 mt-1">
            {item.summary}
          </p>

          <div className="flex gap-2 mt-2">

            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-[10px]">
              {item.category}
            </span>

            <span className="text-[10px] text-gray-400">
              {item.date}
            </span>

          </div>

        </div>

        <button
          onClick={() => handleDeleteNotice(item._id)}
          className="text-red-500 hover:text-red-700 ml-3"
        >
          <FaTrash />
        </button>

      </div>

    ))

  )}

</div>

</div>

{/* FAQ */}

<div className="bg-white rounded-2xl border shadow p-5">

<h3 className="font-bold mb-4">
  FAQs ({faqs.length})
</h3>

<div className="space-y-4">

  {faqs.map((item) => (

    <div
      key={item.id}
      className="bg-gray-50 rounded-xl p-3"
    >

      <h4 className="font-semibold text-sm">
        {item.q}
      </h4>

      <p className="text-xs text-gray-500 mt-2">
        {item.a}
      </p>

      {replyingFaqId === item.id ? (

        <div className="mt-3 space-y-2">

          <textarea
            rows="3"
            value={replyAnswer}
            onChange={(e) =>
              setReplyAnswer(e.target.value)
            }
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Write your answer..."
          />

          <button
            onClick={() =>
              handleAnswerFaq(item.id)
            }
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Save Reply
          </button>

        </div>

      ) : (

        <div className="flex gap-2 mt-3">

          <button
            onClick={() => {
              setReplyingFaqId(item.id);
              setReplyAnswer(item.a);
            }}
            className="text-blue-600"
          >
            <FaReply />
          </button>

          <button
            onClick={() =>
              handleDeleteFaq(item.id)
            }
            className="text-red-500"
          >
            <FaTrash />
          </button>

        </div>

      )}

    </div>

  ))}

</div>

</div>

</div> 
    {/* ================= Service Modal ================= */}

    {showServiceModal && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

        <div className="bg-white w-full max-w-lg rounded-3xl p-6 relative shadow-xl">

          <button
            onClick={() => setShowServiceModal(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-red-500"
          >
            <FaTimes />
          </button>

          <h2 className="text-xl font-bold mb-5">
            Add New Service
          </h2>

          <form
            onSubmit={handleAddService}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Service Name"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <select
              value={newServiceCategory}
              onChange={(e) => setNewServiceCategory(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Passport</option>
              <option>NID</option>
              <option>Driving License</option>
              <option>Birth Certificate</option>
              <option>Trade License</option>
              <option>e-TIN</option>
            </select>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold"
            >
              Add Service
            </button>

          </form>

        </div>

      </div>
    )}

    {/* ================= Notice Modal ================= */}

    {showNoticeModal && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

        <div className="bg-white w-full max-w-lg rounded-3xl p-6 relative shadow-xl">

          <button
            onClick={() => setShowNoticeModal(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-red-500"
          >
            <FaTimes />
          </button>

          <h2 className="text-xl font-bold mb-5">
            Publish Notice
          </h2>

          <form
            onSubmit={handleAddNotice}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Notice Title"
              value={newNoticeTitle}
              onChange={(e) => setNewNoticeTitle(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <textarea
              rows="4"
              placeholder="Notice Summary"
              value={newNoticeDesc}
              onChange={(e) => setNewNoticeDesc(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <select
              value={newNoticeCategory}
              onChange={(e) => setNewNoticeCategory(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="Notice">Notice</option>
              <option value="Update">Update</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Rule Update">Rule Update</option>
            </select>

            <input
              type="text"
              placeholder="Official Link (Optional)"
              value={newNoticeLink}
              onChange={(e) => setNewNoticeLink(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-orange-600 text-white py-3 rounded-xl font-bold"
            >
              Publish Notice
            </button>

          </form>

        </div>

      </div>
    )}

  </div>
);

};

export default AdminDashboard;
