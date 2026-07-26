const Notice = require('../models/noticeModel');

// @desc    Get all notices
// @route   GET /api/notices
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new notice
// @route   POST /api/notices
const createNotice = async (req, res) => {
  try {
    const { category, title, date, summary, officialLink } = req.body;

    if (!title || !summary) {
      return res.status(400).json({ message: 'Title and Summary are required' });
    }

    const newNotice = await Notice.create({
      category: category || 'Notice',
      title,
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary,
      officialLink: officialLink || '#',
    });

    res.status(201).json(newNotice);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create notice', error: error.message });
  }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await notice.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Notice removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
};