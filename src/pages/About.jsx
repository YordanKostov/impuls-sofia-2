import Container from "../components/Container";
// 1. Remove the old static import
// import { instructors } from "../data/instuctors.js";

// 2. Import the hook
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  // 3. Get the data
  const { t } = useLanguage();

  return (
    <main className="py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t.about.title}
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">{t.about.desc}</p>

            <div className="mt-8">
              <h3 className="font-bold text-xl text-gray-900 mb-4">
                {t.about.teamTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 4. Map over the list from 't' instead of the file */}
                {t.about.instructors.map((ins) => (
                  <div
                    key={ins.name}
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={ins.photo}
                      className="w-16 h-16 rounded-full object-cover shadow-sm"
                      alt={ins.name}
                    />
                    <div>
                      <div className="font-bold text-gray-900">{ins.name}</div>
                      <div className="text-sm text-pink-600 font-medium">
                        {ins.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1517904891960-6a3572b2f9f7?q=80&w=1400&auto=format&fit=crop"
                alt="studio"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
