import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const quizQuestions = [
  // ============================================================
  // Q01 - BARA IMAMBARA
  // ============================================================

  {
    id: "qq01",
    quest_id: "q01",
    question: "Who commissioned the construction of Bara Imambara in Lucknow?",
    options: {
      A: "Asaf-ud-Daula",
      B: "Muhammad Ali Shah",
      C: "Saadat Ali Khan II",
      D: "Wajid Ali Shah",
    },
    correct_option: "A",
  },
  {
    id: "qq02",
    quest_id: "q01",
    question: "What historical circumstance is closely associated with the construction of Bara Imambara?",
    options: {
      A: "A famine and the need to provide employment",
      B: "A military victory over the British",
      C: "The founding of Lucknow as a capital",
      D: "The construction of a railway station",
    },
    correct_option: "A",
  },
  {
    id: "qq03",
    quest_id: "q01",
    question: "What is the famous labyrinth inside Bara Imambara commonly called?",
    options: {
      A: "Bhul Bhulaiya",
      B: "Shahi Darwaza",
      C: "Husainabad Maze",
      D: "Asafi Tunnel",
    },
    correct_option: "A",
  },
  {
    id: "qq04",
    quest_id: "q01",
    question: "Which mosque is located within the Bara Imambara complex?",
    options: {
      A: "Asafi Mosque",
      B: "Husainabad Mosque",
      C: "Jama Masjid Delhi",
      D: "Tila Wali Masjid",
    },
    correct_option: "A",
  },
  {
    id: "qq05",
    quest_id: "q01",
    question: "Bara Imambara is also commonly known by which name?",
    options: {
      A: "Asafi Imambara",
      B: "Husainabad Imambara",
      C: "Kaiserbagh Imambara",
      D: "Awadh Imambara",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q02 - CHOTA IMAMBARA
  // ============================================================

  {
    id: "qq06",
    quest_id: "q02",
    question: "Who commissioned the Chota Imambara in Lucknow?",
    options: {
      A: "Muhammad Ali Shah",
      B: "Asaf-ud-Daula",
      C: "Saadat Ali Khan II",
      D: "Wajid Ali Shah",
    },
    correct_option: "A",
  },
  {
    id: "qq07",
    quest_id: "q02",
    question: "What is another well-known name for Chota Imambara?",
    options: {
      A: "Husainabad Imambara",
      B: "Asafi Imambara",
      C: "Kaiserbagh Imambara",
      D: "Farhat Baksh Imambara",
    },
    correct_option: "A",
  },
  {
    id: "qq08",
    quest_id: "q02",
    question: "Which feature is especially notable inside Chota Imambara?",
    options: {
      A: "Chandeliers, mirrors and gilded decoration",
      B: "Stone battle towers",
      C: "Large underground aqueducts",
      D: "Wooden watchtowers",
    },
    correct_option: "A",
  },
  {
    id: "qq09",
    quest_id: "q02",
    question: "Whose tomb is located inside the Chota Imambara complex?",
    options: {
      A: "Muhammad Ali Shah",
      B: "Asaf-ud-Daula",
      C: "Saadat Ali Khan II",
      D: "Henry Lawrence",
    },
    correct_option: "A",
  },
  {
    id: "qq10",
    quest_id: "q02",
    question: "During which Nawabi reign was Chota Imambara built?",
    options: {
      A: "1837–1842",
      B: "1775–1785",
      C: "1856–1860",
      D: "1700–1705",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q03 - RUMI DARWAZA
  // ============================================================

  {
    id: "qq11",
    quest_id: "q03",
    question: "What was the primary architectural role of Rumi Darwaza?",
    options: {
      A: "A monumental gateway",
      B: "A royal tomb",
      C: "A religious shrine",
      D: "A defensive fort",
    },
    correct_option: "A",
  },
  {
    id: "qq12",
    quest_id: "q03",
    question: "Under whose patronage was Rumi Darwaza built?",
    options: {
      A: "Asaf-ud-Daula",
      B: "Muhammad Ali Shah",
      C: "Saadat Ali Khan II",
      D: "Wajid Ali Shah",
    },
    correct_option: "A",
  },
  {
    id: "qq13",
    quest_id: "q03",
    question: "Rumi Darwaza is often associated with which architectural influence?",
    options: {
      A: "Turkish or Constantinople-inspired design",
      B: "European Gothic design",
      C: "Dravidian temple architecture",
      D: "Rajput fort architecture",
    },
    correct_option: "A",
  },
  {
    id: "qq14",
    quest_id: "q03",
    question: "What distinctive structure appears at the top of Rumi Darwaza?",
    options: {
      A: "An octagonal chhatri",
      B: "A large minaret",
      C: "A stone dome with four towers",
      D: "A stepped pyramid",
    },
    correct_option: "A",
  },
  {
    id: "qq15",
    quest_id: "q03",
    question: "What did Rumi Darwaza historically help mark in Lucknow?",
    options: {
      A: "An entrance to Old Lucknow City",
      B: "The boundary of the British Residency",
      C: "The entrance to Chota Imambara",
      D: "The route to the Gomti railway station",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q04 - BRITISH RESIDENCY
  // ============================================================

  {
    id: "qq16",
    quest_id: "q04",
    question: "What was the British Residency originally associated with?",
    options: {
      A: "The residence of the British Resident General",
      B: "A Mughal royal tomb",
      C: "A railway headquarters",
      D: "A Hindu pilgrimage centre",
    },
    correct_option: "A",
  },
  {
    id: "qq17",
    quest_id: "q04",
    question: "During which major historical event did the Residency become a site of prolonged fighting?",
    options: {
      A: "The Revolt of 1857",
      B: "The Battle of Plassey",
      C: "The Third Battle of Panipat",
      D: "The Dandi March",
    },
    correct_option: "A",
  },
  {
    id: "qq18",
    quest_id: "q04",
    question: "What is a striking feature of the Residency today?",
    options: {
      A: "Ruined buildings with visible historical damage",
      B: "A completely reconstructed palace",
      C: "A modern glass museum",
      D: "A functioning royal residence",
    },
    correct_option: "A",
  },
  {
    id: "qq19",
    quest_id: "q04",
    question: "Which museum within the Residency complex focuses on the events of 1857?",
    options: {
      A: "1857 Memorial Museum",
      B: "Awadh Royal Museum",
      C: "Nawabi Heritage Museum",
      D: "Lucknow Palace Museum",
    },
    correct_option: "A",
  },
  {
    id: "qq20",
    quest_id: "q04",
    question: "The Residency was developed during the rule of which Nawab?",
    options: {
      A: "Saadat Ali Khan II",
      B: "Asaf-ud-Daula",
      C: "Muhammad Ali Shah",
      D: "Wajid Ali Shah",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q05 - CHATTAR MANZIL
  // ============================================================

  {
    id: "qq21",
    quest_id: "q05",
    question: "What does the name 'Chattar Manzil' refer to?",
    options: {
      A: "The umbrella-shaped chhatris associated with the building",
      B: "A series of underground tunnels",
      C: "A royal garden",
      D: "A fortified entrance",
    },
    correct_option: "A",
  },
  {
    id: "qq22",
    quest_id: "q05",
    question: "Chattar Manzil is historically associated with which type of building?",
    options: {
      A: "A royal palace",
      B: "A Buddhist monastery",
      C: "A military barracks",
      D: "A marketplace",
    },
    correct_option: "A",
  },
  {
    id: "qq23",
    quest_id: "q05",
    question: "Which river is closely associated with the location of Chattar Manzil?",
    options: {
      A: "Gomti",
      B: "Ganga",
      C: "Yamuna",
      D: "Saryu",
    },
    correct_option: "A",
  },
  {
    id: "qq24",
    quest_id: "q05",
    question: "Chattar Manzil is an important example of the architectural heritage of which period in Lucknow?",
    options: {
      A: "The Nawabi era",
      B: "The Mauryan era",
      C: "The Gupta era",
      D: "The Vedic era",
    },
    correct_option: "A",
  },
  {
    id: "qq25",
    quest_id: "q05",
    question: "For a visitor exploring Lucknow's historic riverfront, Chattar Manzil is especially relevant because of its connection with which setting?",
    options: {
      A: "The Gomti riverfront",
      B: "The Ganga ghats",
      C: "The Yamuna fortifications",
      D: "The Saryu pilgrimage route",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q06 - KASHI VISHWANATH TEMPLE
  // ============================================================

  {
    id: "qq26",
    quest_id: "q06",
    question: "Which Hindu deity is the Kashi Vishwanath Temple dedicated to?",
    options: {
      A: "Lord Shiva",
      B: "Lord Vishnu",
      C: "Lord Brahma",
      D: "Lord Hanuman",
    },
    correct_option: "A",
  },
  {
    id: "qq27",
    quest_id: "q06",
    question: "Who built the present form of the Kashi Vishwanath Temple in 1780?",
    options: {
      A: "Ahilyabai Holkar",
      B: "Rani Lakshmibai",
      C: "Maharani Jind Kaur",
      D: "Begum Hazrat Mahal",
    },
    correct_option: "A",
  },
  {
    id: "qq28",
    quest_id: "q06",
    question: "Kashi Vishwanath is closely associated with which major river?",
    options: {
      A: "Ganga",
      B: "Yamuna",
      C: "Gomti",
      D: "Narmada",
    },
    correct_option: "A",
  },
  {
    id: "qq29",
    quest_id: "q06",
    question: "What is a distinctive feature of the Kashi Vishwanath Temple?",
    options: {
      A: "Its gold-covered domes",
      B: "Its wooden suspension bridge",
      C: "Its giant stone gateway",
      D: "Its underground palace",
    },
    correct_option: "A",
  },
  {
    id: "qq30",
    quest_id: "q06",
    question: "Kashi Vishwanath is traditionally regarded as one of the twelve what?",
    options: {
      A: "Jyotirlingas",
      B: "Shakti Peethas",
      C: "Char Dhams",
      D: "Buddhist Viharas",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q07 - DASHASHWAMEDH GHAT
  // ============================================================

  {
    id: "qq31",
    quest_id: "q07",
    question: "Which river flows beside Dashashwamedh Ghat?",
    options: {
      A: "Ganga",
      B: "Yamuna",
      C: "Gomti",
      D: "Saryu",
    },
    correct_option: "A",
  },
  {
    id: "qq32",
    quest_id: "q07",
    question: "Which famous ceremony is held at Dashashwamedh Ghat every evening?",
    options: {
      A: "Ganga Aarti",
      B: "Subah-e-Banaras",
      C: "Dev Deepavali Parade",
      D: "Ram Lila",
    },
    correct_option: "A",
  },
  {
    id: "qq33",
    quest_id: "q07",
    question: "What does the name 'Dashashwamedh' traditionally refer to?",
    options: {
      A: "A sacrifice involving ten horses",
      B: "Ten sacred temples",
      C: "Ten river crossings",
      D: "Ten royal palaces",
    },
    correct_option: "A",
  },
  {
    id: "qq34",
    quest_id: "q07",
    question: "Which important temple is located close to Dashashwamedh Ghat?",
    options: {
      A: "Kashi Vishwanath Temple",
      B: "Sankat Mochan Temple",
      C: "Durga Temple",
      D: "Bharat Mata Temple",
    },
    correct_option: "A",
  },
  {
    id: "qq35",
    quest_id: "q07",
    question: "Why is Dashashwamedh Ghat particularly memorable for visitors in the evening?",
    options: {
      A: "The Ganga Aarti combines lamps, chants and ritual worship",
      B: "The fort opens its royal museum",
      C: "The ghat hosts a daily military parade",
      D: "The river is closed to all visitors",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q08 - SARNATH
  // ============================================================

  {
    id: "qq36",
    quest_id: "q08",
    question: "What major event in Buddhist history is associated with Sarnath?",
    options: {
      A: "The Buddha's first sermon",
      B: "The Buddha's birth",
      C: "The Buddha's death",
      D: "The construction of the first Buddhist temple",
    },
    correct_option: "A",
  },
  {
    id: "qq37",
    quest_id: "q08",
    question: "Which prominent monument stands at the site associated with the Buddha's first sermon in Sarnath?",
    options: {
      A: "Dhamek Stupa",
      B: "Ramnagar Fort",
      C: "Ashoka's Palace",
      D: "Chota Imambara",
    },
    correct_option: "A",
  },
  {
    id: "qq38",
    quest_id: "q08",
    question: "Sarnath is primarily associated with which religious tradition?",
    options: {
      A: "Buddhism",
      B: "Jainism",
      C: "Sikhism",
      D: "Zoroastrianism",
    },
    correct_option: "A",
  },
  {
    id: "qq39",
    quest_id: "q08",
    question: "Who received the Buddha's first sermon at Sarnath according to Buddhist tradition?",
    options: {
      A: "Five ascetics",
      B: "Ten kings",
      C: "A group of merchants",
      D: "The Mauryan royal family",
    },
    correct_option: "A",
  },
  {
    id: "qq40",
    quest_id: "q08",
    question: "Why is Sarnath particularly important when exploring Varanasi's heritage?",
    options: {
      A: "It adds an important Buddhist dimension to the region's religious heritage",
      B: "It was the main residence of the Nawabs of Awadh",
      C: "It contains the largest Mughal fort in Uttar Pradesh",
      D: "It was the original capital of Awadh",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q09 - RAMNAGAR FORT
  // ============================================================

  {
    id: "qq41",
    quest_id: "q09",
    question: "On which river is Ramnagar Fort located?",
    options: {
      A: "Ganga",
      B: "Yamuna",
      C: "Gomti",
      D: "Saryu",
    },
    correct_option: "A",
  },
  {
    id: "qq42",
    quest_id: "q09",
    question: "Which ruler is associated with the construction of Ramnagar Fort?",
    options: {
      A: "Maharaja Balwant Singh",
      B: "Asaf-ud-Daula",
      C: "Muhammad Ali Shah",
      D: "Ahilyabai Holkar",
    },
    correct_option: "A",
  },
  {
    id: "qq43",
    quest_id: "q09",
    question: "What material is Ramnagar Fort notably built from?",
    options: {
      A: "Red sandstone",
      B: "White marble",
      C: "Black granite",
      D: "Timber",
    },
    correct_option: "A",
  },
  {
    id: "qq44",
    quest_id: "q09",
    question: "What can visitors explore in the museum associated with Ramnagar Fort?",
    options: {
      A: "Royal collections and historical artefacts",
      B: "Modern railway engines",
      C: "Only Buddhist manuscripts",
      D: "Only contemporary paintings",
    },
    correct_option: "A",
  },
  {
    id: "qq45",
    quest_id: "q09",
    question: "What makes Ramnagar Fort especially useful for understanding Varanasi's heritage?",
    options: {
      A: "It represents the region's royal and architectural history",
      B: "It is the site of Buddha's first sermon",
      C: "It is a major Mughal-era mosque",
      D: "It was built as a British military cemetery",
    },
    correct_option: "A",
  },

  // ============================================================
  // Q10 - ASSI GHAT
  // ============================================================

  {
    id: "qq46",
    quest_id: "q10",
    question: "Where is Assi Ghat located?",
    options: {
      A: "At the southern end of Varanasi's main ghat area",
      B: "Inside Ramnagar Fort",
      C: "Near Sarnath's Dhamek Stupa",
      D: "Inside the Kashi Vishwanath Temple complex",
    },
    correct_option: "A",
  },
  {
    id: "qq47",
    quest_id: "q10",
    question: "Which river meets the Ganga near Assi Ghat?",
    options: {
      A: "Assi River",
      B: "Yamuna",
      C: "Gomti",
      D: "Saryu",
    },
    correct_option: "A",
  },
  {
    id: "qq48",
    quest_id: "q10",
    question: "Which morning cultural programme is associated with Assi Ghat?",
    options: {
      A: "Subah-e-Banaras",
      B: "Ganga Aarti",
      C: "Lucknow Mahotsav",
      D: "Ramnagar Ramlila",
    },
    correct_option: "A",
  },
  {
    id: "qq49",
    quest_id: "q10",
    question: "Which activity is commonly associated with the morning atmosphere at Assi Ghat?",
    options: {
      A: "Yoga and meditation",
      B: "Horse racing",
      C: "Military drills",
      D: "Royal court ceremonies",
    },
    correct_option: "A",
  },
  {
    id: "qq50",
    quest_id: "q10",
    question: "What makes Assi Ghat useful for experiencing Varanasi beyond its monuments?",
    options: {
      A: "It offers a living riverfront culture of rituals, visitors and daily activities",
      B: "It is primarily an abandoned archaeological ruin",
      C: "It is a closed royal palace",
      D: "It is exclusively a museum complex",
    },
    correct_option: "A",
  },
];

async function main() {
  console.log(`Starting quiz seed...`);
  console.log(`Total questions: ${quizQuestions.length}`);
const result = await prisma.quiz_questions.createMany({
  data: quizQuestions,
  skipDuplicates: true,
});

console.log(`Questions inserted: ${result.count}`);
  console.log("Quiz seed completed successfully!");
  console.log("Questions added/updated: 50");
  console.log("q01 - q10: 5 questions each");
}

main()
  .catch((error) => {
    console.error("Quiz seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });