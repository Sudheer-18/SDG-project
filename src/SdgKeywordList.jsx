import React, { useState } from "react";
import { sdgData } from "./sdgData";

function SdgKeywordList() {
  const [data, setData] = useState(sdgData);
  const [editingSDG, setEditingSDG] = useState(null);
  const [newKeyword, setNewKeyword] = useState("");

  // Add keyword
  const addKeyword = (sdgKey) => {
    if (!newKeyword.trim()) return;

    setData((prev) => ({
      ...prev,
      [sdgKey]: {
        ...prev[sdgKey],
        keywords: [...prev[sdgKey].keywords, newKeyword.trim()],
      },
    }));

    setNewKeyword("");
    setEditingSDG(null);
  };

  // Remove keyword
  const removeKeyword = (sdgKey, keywordToRemove) => {
    setData((prev) => ({
      ...prev,
      [sdgKey]: {
        ...prev[sdgKey],
        keywords: prev[sdgKey].keywords.filter(
          (kw) => kw !== keywordToRemove
        ),
      },
    }));
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-orange-700">
          Full SDG Keyword List
        </h1>
        <p className="text-gray-600">
          A complete reference of all keywords used for the search.
        </p>
      </header>

      <div className="space-y-6">
        {Object.entries(data).map(([sdgKey, sdg]) => (
          <div
            key={sdgKey}
            className="relative border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
          >
            {/* EDIT BUTTON – TOP RIGHT */}
            <button
              onClick={() =>
                setEditingSDG(editingSDG === sdgKey ? null : sdgKey)
              }
              className="absolute top-3 right-3 bg-orange-700 text-white text-xs px-4 py-1 rounded-full
                         transition-all duration-300 ease-in-out
                         hover:scale-110 hover:bg-orange-800
                         active:scale-95 shadow-md"
            >
              {editingSDG === sdgKey ? "Close" : "Edit"}
            </button>

            <div className="md:w-1/3">
              <img
                src={"/" + sdg.imageName}
                alt={sdg.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-2/3 p-4 bg-white">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {sdg.title}
              </h2>

              {/* Keyword badges with remove option */}
              <div className="flex flex-wrap gap-2 mb-4">
                {sdg.keywords.map((keyword) => (
                  <div
                    key={keyword}
                    className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-300"
                  >
                    <span className="text-xs font-semibold">{keyword}</span>
                    {editingSDG === sdgKey && (
                      <button
                        onClick={() => removeKeyword(sdgKey, keyword)}
                        className="ml-1 text-red-500 text-xs font-bold hover:text-red-700 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add keyword section */}
              {editingSDG === sdgKey && (
                <div className="flex gap-2 mt-2 animate-fade-in">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add new keyword"
                    className="border border-gray-300 px-3 py-1 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={() => addKeyword(sdgKey)}
                    className="bg-orange-700 text-white px-4 py-1 rounded-md text-sm
                               transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SdgKeywordList;
