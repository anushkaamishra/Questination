          import { useState } from "react";
import { Landmark, Download, HelpCircle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { getToken } from "../api/auth";

const API_BASE = "https://questination-production.up.railway.app";

interface QuestionInput {
  question: string;
  options: string[];
  correct_option: string;
}

function emptyQuestion(): QuestionInput {
  return { question: "", options: ["", "", ""], correct_option: "" };
}

function MonumentSeeder() {
  const [step, setStep] = useState<"quest" | "questions" | "done">("quest");

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [qrCodeInput, setQrCodeInput] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [xp, setXp] = useState("");

  const [questions, setQuestions] = useState<QuestionInput[]>(
    Array.from({ length: 5 }, emptyQuestion)
  );

  const [questId, setQuestId] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateQuestionText(index: number, value: string) {
    const updated = [...questions];
    updated[index] = { ...updated[index], question: value };
    setQuestions(updated);
  }

  function updateOption(qIndex: number, optIndex: number, value: string) {
    const updated = [...questions];
    const newOptions = [...updated[qIndex].options];
    newOptions[optIndex] = value;
    updated[qIndex] = { ...updated[qIndex], options: newOptions };
    setQuestions(updated);
  }

  function updateCorrectOption(qIndex: number, value: string) {
    const updated = [...questions];
    updated[qIndex] = { ...updated[qIndex], correct_option: value };
    setQuestions(updated);
  }

  async function handleCreateQuest() {
    if (!name || !city) return;
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const finalQrCode =
        qrCodeInput || `${name.replace(/\s+/g, "-")}-${Date.now()}`;

      const response = await fetch(`${API_BASE}/api/qr/quest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          city,
          qr_code: finalQrCode,
          description,
          lat: Number(lat),
          lng: Number(lng),
          xp: Number(xp),
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setQuestId(data.id);
        setStep("questions");
      } else {
        setError("Could not create monument quest. Please check the details and try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitQuestions() {
    if (!questId) return;
    setLoading(true);
    setError("");
    try {
      const token = getToken();

      for (const q of questions) {
        const response = await fetch(`${API_BASE}/api/qr/quest/${questId}/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: q.question,
            options: q.options,
            correct_option: q.correct_option,
          }),
        });
        if (!response.ok) {
          throw new Error("One of the questions failed to save.");
        }
      }

      // All 5 questions saved - now fetch the QR image
      const qrResponse = await fetch(`${API_BASE}/api/qr/quest/${questId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const qrData = await qrResponse.json();
      setQrImage(qrData.qrCode || qrData.qr_image || null);
      setStep("done");
    } catch (err) {
      setError("Could not save all questions. Please check each one and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Add Monument" subtitle="Seed a new heritage site into the platform." />

      {step === "quest" && (
        <div className="bg-white p-8 rounded-2xl shadow-lg shadow-emerald-900/5 border border-amber-100 w-full max-w-md">
          <div className="flex items-center gap-2 mb-4 text-emerald-700">
            <Landmark size={22} />
            <span className="font-semibold">Monument Details</span>
          </div>

          <label className="block text-sm font-medium mb-1 text-gray-700">Monument Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />

          <label className="block text-sm font-medium mb-1 text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />

          <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />

                    <label className="block text-sm font-medium mb-1 text-gray-700">QR Code</label>
          <input
            type="text"
            value={qrCodeInput}
            onChange={(e) => setQrCodeInput(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />
          

          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">Latitude</label>
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">Longitude</label>
              <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>
          </div>

          <label className="block text-sm font-medium mb-1 text-gray-700">XP</label>
          <input
            type="number"
            value={xp}
            onChange={(e) => setXp(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />

          <button
            onClick={handleCreateQuest}
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Quest"}
          </button>

          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </div>
      )}

      {step === "questions" && (
        <div className="bg-white p-8 rounded-2xl shadow-lg shadow-emerald-900/5 border border-amber-100 w-full max-w-lg">
          <div className="flex items-center gap-2 mb-4 text-emerald-700">
            <HelpCircle size={22} />
            <span className="font-semibold">Add 5 Quiz Questions</span>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-5 pb-5 border-b border-gray-100 last:border-0">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />

              {q.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                />
              ))}

              <label className="block text-sm font-medium mb-1 text-gray-700">
                Correct Option (must match one option exactly)
              </label>
              <input
                type="text"
                value={q.correct_option}
                onChange={(e) => updateCorrectOption(qIndex, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>
          ))}

          <button
            onClick={handleSubmitQuestions}
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Submit Questions"}
          </button>

          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </div>
      )}

      {step === "done" && (
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-emerald-900/5 border border-amber-100 flex flex-col items-center w-full max-w-md">
          <p className="font-semibold text-gray-800 mb-3">
            {name} added! Scan or download the QR below.
          </p>
          {qrImage ? (
            <>
              <img src={qrImage} alt="Monument QR" className="w-48 h-48 mb-4" />
              <a href={qrImage} download={`${name}-qr.png`}>
                <button className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition">
                  <Download size={18} /> Download QR
                </button>
              </a>
            </>
          ) : (
            <p className="text-gray-500 text-sm">QR code could not be loaded.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MonumentSeeder;