import { useState } from "react";

// ── Field must be OUTSIDE ContactForm so it doesn't get recreated on every
//    keystroke. When defined inside, every state change makes React treat it
//    as a brand-new component type → unmount + remount → focus lost. ─────────
function Field({ label, name, type = "text", value, onChange }) {
  const has = Boolean(value);
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
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 pb-3 pt-6 font-sans text-[14px] text-white outline-none transition-colors focus:border-[#3b82f6]"
      />
    </label>
  );
}

export default function ContactForm({ onToast }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (name, value) =>
    setForm((s) => ({ ...s, [name]: value }));

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      onToast?.("Fill all fields");
      return;
    }

    const message = `*New Contact Form Submission*
*Name:* ${form.name}
*Email:* ${form.email}
*Message:* ${form.message}`;

const whatsappUrl = `https://wa.me/919316847190?text=${encodeURIComponent(message)}`;
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    try {
      setStatus("sending");

      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
      }

      window.open(whatsappUrl, "_blank");
      setForm({ name: "", email: "", message: "" });
      onToast?.("Opening WhatsApp");
      setStatus("idle");
    } catch {
      onToast?.("Send failed");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={submit} className="mt-6 flex w-full flex-col gap-4 text-left">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Name"  name="name"  value={form.name}  onChange={handleChange} />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
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
          onChange={(e) => handleChange("message", e.target.value)}
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
