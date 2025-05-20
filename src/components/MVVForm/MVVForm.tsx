"use client";

import type { GradeResponse } from "@/types/grade";
import { useState } from "react";
import GradeResult from "./GradeResult";
import Loader from "./Loader";
import SectionInput from "./SectionInput";
import { useMVVForm } from "./useMVVForm";

export default function MVVForm() {
  const { vision, mission, values, updateSection } = useMVVForm();
  const [result, setResult] = useState<GradeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = { vision, mission, values };
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.error || "採点に失敗しました");
      }

      const data: GradeResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知のエラーです");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <SectionInput
        section="Mission"
        values={mission}
        type="textarea"
        onChange={(i, v) => updateSection("mission", i, v)}
      />
      <SectionInput
        section="Vision"
        values={vision}
        type="textarea"
        onChange={(i, v) => updateSection("vision", i, v)}
      />
      <SectionInput
        section="Values"
        values={values}
        type="input"
        onChange={(i, v) => updateSection("values", i, v)}
      />

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "採点中..." : "採点する"}
      </button>

      {loading && <Loader />}

      {error && (
        <div className="text-red-500 font-bold mt-4">エラー: {error}</div>
      )}

      {result && <GradeResult result={result} />}
    </div>
  );
}
