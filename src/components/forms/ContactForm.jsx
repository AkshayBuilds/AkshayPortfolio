import { useState } from "react";

export default function ContactForm({ onToast }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      onToast?.("Fill all fields");
      return;
    }

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      onToast?.("Formspree endpoint missing (set VITE_FORMSPREE_ENDPOINT)");
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Bad response");
      setForm({ name: "", email: "", message: "" });
      onToast?.("Message sent");
      setStatus("idle");
    } catch {
      onToast?.("Send failed");
      setStatus("idle");
    }
  };

  const Field = ({ label, name, type = "text" }) => {
    const has = Boolean(form[name]);
    return (
      <label className="relative w-full">
        <span
          className={`pointer-events-none absolute left-3 top-3 font-sans text-[12px] font-semibold tracking-wide text-white/60 transition-all duration-200 ${
            has ? "-translate-y-4 scale-[0.92]" : ""
          }`}
        >
          {label}
        </span>
        <input
          type={type}
          value={form[name]}
          onChange={(e) => setForm((s) => ({ ...s, [name]: e.target.value }))}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 pb-3 pt-6 font-sans text-[14px] text-white outline-none transition-colors focus:border-[#3b82f6]"
        />
      </label>
    );
  };

  return (
    <form onSubmit={submit} className="mt-6 flex w-full flex-col gap-4 text-left">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Name" name="name" />
        <Field label="Email" name="email" type="email" />
      </div>
      <label className="relative w-full">
        <span
          className={`pointer-events-none absolute left-3 top-3 font-sans text-[12px] font-semibold tracking-wide text-white/60 transition-all duration-200 ${
            form.message ? "-translate-y-4 scale-[0.92]" : ""
          }`}
        >
          Message
        </span>
        <textarea
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          rows={5}
          className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-3 pb-3 pt-6 font-sans text-[14px] text-white outline-none transition-colors focus:border-[#3b82f6]"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#3b82f6] px-6 py-3 font-sans text-[13px] font-semibold tracking-wide text-white shadow-[0_0_26px_#3b82f680] transition-all disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
