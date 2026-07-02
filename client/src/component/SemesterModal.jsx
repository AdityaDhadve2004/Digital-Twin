import { useState, useEffect, useRef } from "react";
import { Form, useNavigation, useRevalidator } from "react-router-dom";
import { deleteSubjectFromDatabase } from "../api";
const gradeClasses = {
  null: "text-grey-400 border-black-400/20 bg-black-400/5",
  s: "text-green-400 border-green-400/20 bg-green-400/5",
  a: "text-green-400 border-green-400/20 bg-green-400/5",
  b: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  c: "text-orange-400 border-orange-400/20 bg-orange-400/5",
  f: "text-red-400 border-red-400/20 bg-red-400/5",
};

export default function SemesterModal({ isOpen, onClose, semester, onUpdateSubject, onDeleteSubject }) {

  const { revalidate } = useRevalidator()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, setForm] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [subjectsHeight, setSubjectsHeight] = useState("auto");
  const subjectsRef = useRef(null);
  const overlayRef = useRef(null);

  // Animate collapse by measuring real scrollHeight
  useEffect(() => {
    if (!subjectsRef.current) return;
    if (!collapsed) {
      subjectsRef.current.style.height = "auto";
      setSubjectsHeight(subjectsRef.current.scrollHeight + "px");
    } else {
      setSubjectsHeight("0px");
    }
  }, [collapsed, semester]);

  // Entry / exit gate
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      setCollapsed(false);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  const gradeKey = (g) => {
    if (g == null || g === "") {
      return "text-neutral-400 border-neutral-700 bg-neutral-800";
    }

    return (
      gradeClasses[g.toLowerCase()] ??
      "text-orange-500 border-neutral-700 bg-neutral-800"
    );
  };
  return (
    <>
      <style>{`
        @keyframes rowIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .row-in { animation: rowIn 0.3s ease both; }

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .modal-in  { animation: modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
        .modal-out { opacity: 0; transform: translateY(28px) scale(0.96); transition: opacity 0.2s, transform 0.2s; }
      `}</style>

      {/* ── Overlay ── */}
      <div
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
        className={`

  fixed inset-0 z-50
  flex items-center justify-center
  p-4
  overflow-y-auto
  bg-[#1F1F1F] backdrop-blur-sm
  border: 1px solid #2C2C2C
  transition-opacity duration-300
  ${visible ? "opacity-100" : "opacity-0"}
`}
      >
        {/* ── Card ── */}
        <div
          className={`
    w-[min(520px,92vw)]
    max-h-[90vh]
    rounded-2xl
    overflow-hidden
    flex flex-col
    bg-[#1F1F1F]
    border: 1px solid #2C2C2C
    shadow-[0_0_40px_rgba(255,106,0,0.2),0_20px_60px_rgba(0,0,0,0.8)]
    ${visible ? "modal-in" : "modal-out"}
  `}
        >

          {/* ── Header ── */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5 bg-gradient-to-br from-[#1a0a00] to-[#111]">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white">
                Semester
              </span>
              <h2 className="text-white text-lg font-bold tracking-tight">
                Semester {semester?.semester ?? "—"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Collapse toggle */}
              <button
                title={collapsed ? "Expand subjects" : "Collapse subjects"}
                onClick={() => setCollapsed((c) => !c)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-orange-500 hover:border-orange-500 transition-colors duration-200"
              >
                <svg
                  style={{
                    transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
                    transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Close */}
              <button
                title="Close"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-orange-500 hover:border-orange-500 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── SGPA strip ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-0.5">
                SGPA
              </p>
              <p
                className="text-3xl font-extrabold tracking-tighter"
                style={{
                  background: "linear-gradient(135deg,#ff6a00,#ffb347)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {semester?.sgpa != null ? Number(semester.sgpa).toFixed(2) : "—"}
              </p>
            </div>
          </div>

          {/* ── Subjects (collapsible) ── */}
          <div
            ref={subjectsRef}
            className="flex-1 overflow-y-auto"
            style={{
              height: subjectsHeight,
              transition: "height 0.38s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div className="flex flex-col gap-2 px-5 pt-3 pb-5">
              {semester?.subjects?.length ? (
                semester.subjects.map((sub, i) => (
                  <div
                    key={sub.id}
                    className="row-in flex items-center justify-between px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/70 hover:border-orange-500/40 transition group"
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    {/* Subject info */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-white font-medium truncate">
                        {sub.name}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {sub.code} • {sub.credits} Credits
                      </span>
                    </div>

                    {/* Right side: grade + action buttons */}
                    <div className="flex items-center gap-2 ml-3 shrink-0">
                      <span
                        className={`text-sm font-bold border rounded-md px-3 py-1 ${gradeKey(
                          sub.grade || null
                        )}`}
                      >
                        {sub.grade || "Pending"}
                      </span>

                      {/* Update button */}
                      <button
                        title="Update subject"
                        onClick={() => {
                          setForm(true)
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-orange-400 hover:border-orange-500/60 hover:bg-orange-500/10 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      >
                        {/* Pencil icon */}
                        <svg width="13" height="13" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>

                      {/* Delete button */}
                      <button
                        title="Delete subject"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteSubject(sub.id)
                        }
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-500/60 hover:bg-red-500/10 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      >
                        {/* Cross icon */}
                        <svg width="13" height="13" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-600 text-center py-5">
                  No subjects added yet.
                </p>
              )}
            </div>{form ? (<Form>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">Credits *</label>
                  <input
                    type="number"
                    name="credits"
                    placeholder="e.g., 4"
                    min="1"
                    max="8"
                    required
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                </div>

              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Grade (Optional)</label>
                <select
                  name="grade"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                >
                  <option value="">Select Grade</option>
                  <option value="O">O (10)</option>
                  <option value="A">A (9)</option>
                  <option value="B">B (8)</option>
                  <option value="C">C (7)</option>
                  <option value="D">D (6)</option>
                  <option value="E">E (5)</option>
                  <option value="P">P (4)</option>
                  <option value="F">F (0)</option>
                </select>
              </div>


              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Subject Code *</label>
                <input
                  type="text"
                  name="code"
                  placeholder="e.g., CS201"
                  required
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>

              <div>
                <button onClick={(e) => {
                  e.stopPropagation();
                  onUpdateSubject(sub.id)
                }}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
                >
                  Add Subject
                </button>
              </div>
            </Form>

            ) : null}

          </div>

        </div>
      </div>
     
    </>
  )

}

