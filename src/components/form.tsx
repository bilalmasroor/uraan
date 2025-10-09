import { useEffect, useState } from "react";

declare global {
  interface Window {
    openContactModal?: () => void;
  }
}

export default function ReachOutModalPreview() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", contact: "", comments: "" });
  const [errors, setErrors] = useState<{ email?: string; contact?: string }>({});

  // expose global opener
  useEffect(() => {
    window.openContactModal = () => setOpen(true);
    return () => {
      if (window.openContactModal) delete window.openContactModal;
    };
  }, []);

  // lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Simple validators (per user request)
  const isEmailSimple = (v: string) => v.includes("@");
  const isDigitsOnly = (v: string) => v.length > 0 && [...v].every((ch) => ch >= "0" && ch <= "9");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setForm((f) => ({ ...f, [name]: value }));

    // live-validate email/contact and clear errors when fixed (fixed extra parens)
    if (name === "email") {
      setErrors((er) => ({
        ...er,
        email: value && !isEmailSimple(value) ? "Email must contain @" : undefined,
      }));
    }
    if (name === "contact") {
      setErrors((er) => ({
        ...er,
        contact: value && !isDigitsOnly(value) ? "Contact must be numbers only" : undefined,
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; contact?: string } = {};
    if (!isEmailSimple(form.email)) newErrors.email = "Email must contain @";
    if (!isDigitsOnly(form.contact)) newErrors.contact = "Contact must be numbers only";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // demo: simulate a request
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          contact: form.contact,
          message: form.comments, // Web3Forms expects "message"
          subject: "New Contact Form Submission - Uraan VC",
          from_name: form.name,
          replyto: form.email,
        }),
      });
    
      const result = await response.json();
    
      if (result.success) {
        alert("✅ Thank you! Your message has been sent.");
        setForm({ name: "", email: "", contact: "", comments: "" });
        setErrors({});
        setOpen(false);
      } else {
        alert("❌ Error: " + (result.message || "Something went wrong."));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("⚠️ Network error — please try again later.");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white w-full max-w-md mx-4 p-6 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-5">Get in touch</h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Your Name *"
                value={form.name}
                onChange={onChange}
                required
                className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-[#FC4C00] outline-none"
              />

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email Address *"
                  value={form.email}
                  onChange={onChange}
                  required
                  aria-invalid={!!errors.email}
                  className={`w-full p-3 rounded outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-500 border" : "border border-gray-300 focus:ring-[#FC4C00]"}`}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  name="contact"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Contact Number *"
                  value={form.contact}
                  onChange={onChange}
                  required
                  aria-invalid={!!errors.contact}
                  className={`w-full p-3 rounded outline-none focus:ring-2 ${errors.contact ? "border-red-500 focus:ring-red-500 border" : "border border-gray-300 focus:ring-[#FC4C00]"}`}
                />
                {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact}</p>}
              </div>

              <textarea
                name="comments"
                placeholder="Additional Comments *"
                value={form.comments}
                onChange={onChange}
                required
                className="w-full border border-gray-300 p-3 rounded h-28 focus:ring-2 focus:ring-[#FC4C00] outline-none"
              />

              <p className="text-sm text-gray-600">We never share your contact info with anyone.</p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FC4C00] text-white font-bold py-3 rounded-md hover:brightness-110 transition flex items-center justify-center"
              >
                {loading ? "Submitting…" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
