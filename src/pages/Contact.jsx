import Container from "../components/Container";
import { useForm } from "react-hook-form";
// 1. Import the hook
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  // 2. Get the translations
  const { t } = useLanguage();
  const content = t.contactPage;

  const onSubmit = (data) => {
    // Use the translated success message
    alert(content.form.success);
    reset();
  };

  return (
    <main className="py-20">
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
              <input
                {...register("name")}
                placeholder={content.form.namePh}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                required
              />
              <input
                {...register("email")}
                placeholder={content.form.emailPh}
                type="email"
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                required
              />
              <textarea
                {...register("message")}
                placeholder={content.form.msgPh}
                rows={5}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                required
              ></textarea>

              <div>
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-rose-600 text-white font-bold shadow-lg hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {content.form.btn}
                </button>
              </div>
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
              {/* I replaced the broken link with a functional Google Maps Embed for "Mladost 2" */}
              <iframe
                title="map"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=%D0%A3%D0%BB.%20%D0%A1%D0%B2%D0%B5%D1%82%D0%B8%20%D0%9A%D0%B8%D0%BF%D1%80%D0%B8%D1%8F%D0%BD%20236%201799%20Sofia%2C%20Bulgaria&maptype=roadmap"
                className="w-full h-full min-h-[300px] border-0"
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
