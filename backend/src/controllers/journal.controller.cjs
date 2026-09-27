const prisma = require('../db/prismaClient.cjs');
const supabase = require('../db/supabaseClient.cjs');

// POST /api/journal
// multipart/form-data: fields { user_id, quest_id, caption, sticker_id }, files: photos[]
async function createJournalEntry(req, res) {
  const { user_id, quest_id, caption, sticker_id } = req.body;
  const files = req.files; // array, from multer

  if (!user_id || !quest_id) {
    return res.status(400).json({ error: 'user_id and quest_id are required' });
  }
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'At least one photo is required' });
  }

  try {
    // Upload each photo to the bucket, collect its public URL
    const photo_urls = [];

    for (const file of files) {
      const fileName = `${user_id}/${Date.now()}-${file.originalname}`;

      const { error: uploadError } = await supabase.storage
        .from('journal-photos')
        .upload(fileName, file.buffer, { contentType: file.mimetype });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('journal-photos').getPublicUrl(fileName);
      photo_urls.push(data.publicUrl);
    }

    const entry = await prisma.journal_entries.create({
      data: { user_id, quest_id, photo_urls, caption, sticker_id },
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
}

// GET /api/journal/:userId
// Returns all journal entries for a user — photo_urls come straight from the
// database row, so the app never re-fetches from storage directly, just displays these
async function getUserJournal(req, res) {
  const { userId } = req.params;

  try {
    const entries = await prisma.journal_entries.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      include: { quests: { select: { name: true, city_id: true } } },
    });

    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch journal' });
  }
}

module.exports = { createJournalEntry, getUserJournal };