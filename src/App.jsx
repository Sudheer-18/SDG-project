import React, { useState, useEffect } from "react";
import { sdgData } from "./sdgData";
import SdgKeywordList from "./SdgKeywordList";
import mammoth from "mammoth";

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import LoginPage from "./login";
import Header from "./header";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
  const [userRole, setUserRole] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [activeTab, setActiveTab] = useState("search");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [noMatchMessage, setNoMatchMessage] = useState("");

  /* ---------------- Scroll Button ---------------- */
  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* ---------------- Back to Login ---------------- */
  const goBackToLogin = () => {
    setUserRole(null);
    setActiveTab("search");
    setLastResult(null);
    setStatusMessage("");
    setNoMatchMessage("");
  };

  /* ---------------- SDG SEARCH (PER-SDG ≥5 RULE) ---------------- */
  const runSearch = (text) => {
    setStatusMessage("Analyzing keywords...");
    setNoMatchMessage("");

    const normalizedInput = text.toLowerCase();
    let matchedSdgs = {};
    let hasValidSDG = false;

    for (const sdgKey in sdgData) {
      const sdg = sdgData[sdgKey];
      let foundKeywords = new Set();

      sdg.keywords.forEach((keyword) => {
        if (normalizedInput.includes(keyword.toLowerCase())) {
          foundKeywords.add(keyword);
        }
      });

      if (foundKeywords.size >= 5) {
        hasValidSDG = true;
        matchedSdgs[sdgKey] = {
          ...sdg,
          foundKeywords: Array.from(foundKeywords),
          count: foundKeywords.size,
        };
      }
    }

    if (!hasValidSDG) {
      setLastResult({ matchedSdgs: {} });
      setNoMatchMessage("No keywords matched");
      setStatusMessage("");
      setIsLoading(false);
      return;
    }

    setLastResult({ matchedSdgs });
    setStatusMessage("");
    setIsLoading(false);
  };

  /* ---------------- Extract Sections (VALIDATION ONLY) ---------------- */
  const extractSections = (text) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let title = lines[0] || "";
    let abstract = "";
    let keywords = [];
    let description = "";

    const abstractIndex = lines.findIndex((l) =>
      l.toLowerCase().startsWith("abstract")
    );
    const keywordsIndex = lines.findIndex((l) =>
      l.toLowerCase().startsWith("keywords")
    );
    const descriptionIndex = lines.findIndex((l) =>
      l.toLowerCase().startsWith("description")
    );

    if (abstractIndex !== -1) {
      abstract = lines.slice(abstractIndex + 1, abstractIndex + 5).join(" ");
    }

    if (keywordsIndex !== -1) {
      keywords = lines[keywordsIndex]
        .replace(/keywords[:\-]?/i, "")
        .split(",")
        .map((k) => k.trim());
    }

    if (descriptionIndex !== -1) {
      description = lines
        .slice(descriptionIndex + 1, descriptionIndex + 5)
        .join(" ");
    }

    return { title, abstract, keywords, description };
  };

  /* ---------------- File Upload ---------------- */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setLastResult(null);
    setNoMatchMessage("");
    setStatusMessage("Reading file...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      let text = "";

      if (file.type === "application/pdf") {
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let allText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          allText += content.items.map((i) => i.str).join("\n") + "\n";
        }
        text = allText.trim();
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        setStatusMessage("Unsupported file type");
        setIsLoading(false);
        return;
      }

      if (!text.trim()) {
        setStatusMessage("No readable text found");
        setIsLoading(false);
        return;
      }

      const extracted = extractSections(text);

      /* Validation only */
      if (
        !extracted.title ||
        !extracted.abstract ||
        !extracted.keywords.length ||
        !extracted.description
      ) {
        setStatusMessage(
          "Uploaded file must contain Title, Abstract, Keywords, and Description."
        );
        setIsLoading(false);
        return;
      }

      runSearch(text);
    } catch (err) {
      console.error(err);
      setStatusMessage("Error reading file");
      setIsLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-[#f8f8f8] font-sans text-gray-800">
      <Header />

      {userRole && (
        <div className="max-w-7xl mx-auto px-4 mt-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goBackToLogin();
            }}
            className="text-[#E76B00] font-semibold hover:underline"
          >
            ← Back to Login
          </a>
        </div>
      )}

      {!userRole ? (
        <LoginPage onLogin={setUserRole} />
      ) : (
        <div className="max-w-7xl mx-auto py-4 px-4 md:px-8">
          {/* Tabs */}
          <div className="flex justify-center border-b-2 border-[#E76B00]/40 mb-2">
            <button
              className={`py-3 px-8 text-lg font-semibold ${
                activeTab === "search"
                  ? "border-b-4 border-[#E76B00] text-[#E76B00]"
                  : "text-gray-500 hover:text-[#E76B00]"
              }`}
              onClick={() => setActiveTab("search")}
            >
              SDG Search Tool
            </button>

            {userRole === "employee" && (
              <button
                className={`py-3 px-8 text-lg font-semibold ${
                  activeTab === "keywords"
                    ? "border-b-4 border-[#E76B00] text-[#E76B00]"
                    : "text-gray-500 hover:text-[#E76B00]"
                }`}
                onClick={() => setActiveTab("keywords")}
              >
                Full Keywords List
              </button>
            )}
          </div>

          {activeTab === "search" && (
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl text-center">
              <label
                htmlFor="file-upload"
                className={`cursor-pointer px-10 py-3 bg-[#E76B00] text-white text-xl font-bold rounded-lg shadow-lg ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#d16100]"
                }`}
              >
                {isLoading ? "Processing..." : "Upload .pdf or .docx File"}
              </label>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                disabled={isLoading}
              />

              <div className="h-8 mt-4">
                {statusMessage && (
                  <p className="text-lg text-gray-600">{statusMessage}</p>
                )}
                {noMatchMessage && (
                  <p className="text-lg text-red-600 font-semibold">
                    {noMatchMessage}
                  </p>
                )}
              </div>

              {/* SDG Matches */}
              {lastResult?.matchedSdgs &&
                Object.keys(lastResult.matchedSdgs).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {Object.entries(lastResult.matchedSdgs).map(
                      ([sdgKey, sdg]) => (
                        <div
                          key={sdgKey}
                          className="border rounded-lg shadow-md overflow-hidden"
                        >
                          <img
                            src={"/" + sdg.imageName}
                            alt={sdg.title}
                            className="w-full h-auto object-cover"
                          />
                          <div className="p-4 bg-white">
                            <h3 className="text-lg font-bold mb-2">
                              {sdg.title}
                            </h3>
                            <p className="font-bold text-sm">
                              Total Matched: {sdg.count}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
          )}

          {activeTab === "keywords" && userRole === "employee" && (
            <SdgKeywordList />
          )}
        </div>
      )}

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#E76B00] text-white w-14 h-14 rounded-full shadow-lg"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
