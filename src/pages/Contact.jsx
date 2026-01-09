import { useState } from "react";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const { t } = useLanguage();
  const content = t.contactPage;
  // Shortcut to validation messages
  const errorMsg = content.form.validation;

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
          access_key: "f7271db1-1833-4958-ad13-ae3d33835390",
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          subject: "New Inquiry from Impuls Website",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-20 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* LEFT COLUMN: Form */}
          <div className="flex flex-col h-full justify-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {content.title}
            </h2>
            <p className="mt-3 text-gray-600 text-lg leading-relaxed">
              {content.desc}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              {/* Name */}
              <div>
                <input
                  {...register("name", { required: true })}
                  placeholder={content.form.namePh}
                  className={`w-full p-4 rounded-xl border outline-none transition-all ${
                    errors.name
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errorMsg.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  placeholder={content.form.emailPh}
                  type="email"
                  className={`w-full p-4 rounded-xl border outline-none transition-all ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errorMsg.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  {...register("phone", {
                    required: true,
                    minLength: 6,
                    pattern: /^[0-9+\s-]+$/,
                  })}
                  placeholder={content.form.phonePh}
                  type="tel"
                  className={`w-full p-4 rounded-xl border outline-none transition-all ${
                    errors.phone
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errorMsg.phone}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  {...register("message", { required: true })}
                  placeholder={content.form.msgPh}
                  rows={5}
                  className={`w-full p-4 rounded-xl border outline-none transition-all resize-none ${
                    errors.message
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errorMsg.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-full font-bold shadow-lg transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-rose-600 text-white hover:bg-rose-700 hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? "..." : content.form.btn}
              </button>

              {/* Status Messages */}
              {formStatus === "success" && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  ✅ {content.form.success}
                </div>
              )}
              {formStatus === "error" && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {content.form.error}
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
                <span>+359 888 123 456</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Map */}
          <div className="relative h-full min-h-[450px] w-full">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-100">
              <iframe
                title="Impuls Location"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=%D0%A3%D0%BB.%20%D0%A1%D0%B2%D0%B5%D1%82%D0%B8%20%D0%9A%D0%B8%D0%BF%D1%80%D0%B8%D1%8F%D0%BD%20236%201799%20Sofia%2C%20Bulgaria&maptype=roadmap"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
