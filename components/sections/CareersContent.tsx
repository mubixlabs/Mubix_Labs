"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { careerPositions, type CareerPosition } from "@/data/careers";
import {
  MapPin,
  Briefcase,
  X,
  UploadCloud,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function CareersContent() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [applyingTo, setApplyingTo] = useState<CareerPosition | null>(null);

  return (
    <>
      <section className="relative bg-white/90 backdrop-blur-sm py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Careers
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Work With Us
          </h1>
          <p className="mt-6 text-zinc-600 leading-relaxed">
            We&apos;re a small team that values ownership, craft, and shipping things that
            actually matter. No pointless meetings, no red tape just good work and people who
            care about it.
          </p>
        </div>
      </section>

      <section className="bg-brand-50/40 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900">Open Positions</h2>

          {careerPositions.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white py-16 text-center">
              <Briefcase size={32} className="text-zinc-300" />
              <p className="mt-4 font-medium text-zinc-500">No open positions right now</p>
              <p className="mt-1 max-w-sm text-sm text-zinc-400">
                We&apos;re not actively hiring at the moment, but we&apos;re always open to
                hearing from talented people.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-brand-700"
              >
                Reach Out Anyway
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {careerPositions.map((position) => {
                const isOpen = openSlug === position.slug;
                return (
                  <motion.div
                    key={position.slug}
                    className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm"
                  >
                    <button
                      onClick={() => setOpenSlug(isOpen ? null : position.slug)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <div>
                        <h3 className="font-semibold text-zinc-900">{position.title}</h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} /> {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {position.location}
                          </span>
                          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-brand-600">
                        {isOpen ? "Close" : "View"}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-zinc-100 px-6"
                        >
                          <div className="py-6">
                            <p className="text-zinc-600">{position.description}</p>

                            <h4 className="mt-5 text-sm font-semibold text-zinc-900">
                              Responsibilities
                            </h4>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
                              {position.responsibilities.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>

                            <h4 className="mt-5 text-sm font-semibold text-zinc-900">
                              Requirements
                            </h4>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
                              {position.requirements.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>

                            <button
                              onClick={() => setApplyingTo(position)}
                              className="mt-6 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-brand-700"
                            >
                              Apply Now
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {applyingTo && <ApplyModal position={applyingTo} onClose={() => setApplyingTo(null)} />}
      </AnimatePresence>
    </>
  );
}

function ApplyModal({
  position,
  onClose,
}: {
  position: CareerPosition;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [basic, setBasic] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setStatus("error");
      return;
    }
    setStatus("loading");

    try {
      const cvUrl = await uploadFileToCloudinary(cvFile);

      await addDoc(collection(db, "career_applications"), {
        positionTitle: position.title,
        positionSlug: position.slug,
        ...basic,
        cvUrl,
        answers,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7 shadow-xl sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900">Apply — {position.title}</h3>
          <button onClick={onClose} aria-label="Close">
            <X size={20} className="text-zinc-500" />
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-8 flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 size={36} className="text-green-600" />
            <p className="font-medium text-zinc-800">
              Application submitted! We&apos;ll be in touch if there&apos;s a fit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              required
              placeholder="Full name"
              value={basic.name}
              onChange={(e) => setBasic((p) => ({ ...p, name: e.target.value }))}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={basic.email}
              onChange={(e) => setBasic((p) => ({ ...p, email: e.target.value }))}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <input
              required
              type="tel"
              placeholder="Phone number"
              value={basic.phone}
              onChange={(e) => setBasic((p) => ({ ...p, phone: e.target.value }))}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 px-4 py-3 text-sm text-brand-700">
              <UploadCloud size={18} />
              {cvFile ? cvFile.name : "Upload your CV (PDF or DOCX)"}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="hidden"
                onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
              />
            </label>

            {position.questions.map((q) => (
              <div key={q.id}>
                <label className="text-sm font-medium text-zinc-700">{q.label}</label>
                {q.type === "textarea" ? (
                  <textarea
                    rows={3}
                    required={q.required}
                    onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                    className="mt-1.5 w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                ) : q.type === "select" ? (
                  <select
                    required={q.required}
                    defaultValue=""
                    onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {q.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    required={q.required}
                    onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                )}
              </div>
            ))}

            <textarea
              rows={3}
              placeholder="Anything else you'd like to add? (optional)"
              value={basic.message}
              onChange={(e) => setBasic((p) => ({ ...p, message: e.target.value }))}
              className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-700 disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>

            {status === "error" && (
              <p className="flex items-center gap-2 text-sm font-medium text-red-600">
                <AlertCircle size={16} />
                Please attach your CV and check all required fields.
              </p>
            )}
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}