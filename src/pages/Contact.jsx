import { useState } from "react";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success' or 'error'

  const { t } = useLanguage();
  const content = t.contactPage;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // -----------------------------------------------------------
          // 1. PASTE YOUR ACCESS KEY HERE
          // -----------------------------------------------------------
          access_key: import.meta.env.VITE_ACCESS_KEY,

          name: data.name,
          email: data.email,
          message: data.message,
          subject: "New Message from Impuls Website", // Email subject line
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus("success");
        reset(); // Clear the form
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-20 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT COLUMN: Form & Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {content.title}
            </h2>
            <p className="mt-3 text-gray-600 text-lg leading-relaxed">
              {content.desc}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              {/* Hidden honeypot field to prevent spam bots */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                {...register("botcheck")}
              ></input>

              <input
                {...register("name", { required: true })}
                placeholder={content.form.namePh}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              />
              <input
                {...register("email", { required: true })}
                placeholder={content.form.emailPh}
                type="email"
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              />
              <textarea
                {...register("message", { required: true })}
                placeholder={content.form.msgPh}
                rows={5}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
              ></textarea>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-rose-600 text-white hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {isSubmitting ? "..." : content.form.btn}
                </button>
              </div>

              {/* Success/Error Messages */}
              {formStatus === "success" && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  {content.form.success}
                </div>
              )}
              {formStatus === "error" && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-gray-600">
              <div className="flex gap-2 mb-2">
                <strong className="text-gray-900">
                  {content.info.addressLabel}
                </strong>
                <span>{content.info.addressVal}</span>
              </div>
              <div className="flex gap-2">
                <strong className="text-gray-900">
                  {content.info.phoneLabel}
                </strong>
                <a
                  href="tel:+359888123456"
                  className="hover:text-rose-600 transition-colors"
                >
                  +359 888 123 456
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Map */}
          <div className="h-full min-h-[400px]">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl h-full border border-gray-100 bg-gray-100 relative">
              {/* I added a working Google Map focused on Mladost 2 */}
              <iframe
                title="Impuls Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.619066606394!2d23.376828576632486!3d42.648218971167446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa868f0445d44d%3A0xc367699732732943!2sMladost%202%2C%20Sofia!5e0!3m2!1sen!2sbg!4v1709289283721!5m2!1sen!2sbg"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
