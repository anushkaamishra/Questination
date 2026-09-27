const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createJournalEntry, getUserJournal } = require('../controllers/journal.controller.cjs');

const upload = multer({ storage: multer.memoryStorage() }); 

router.post('/', upload.array('photos'), createJournalEntry);
router.get('/:userId', getUserJournal);

module.exports = router;