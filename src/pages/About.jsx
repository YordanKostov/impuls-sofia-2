import Container from "../components/Container";
import { instructors } from "../data/instuctors.js";

export default function About() {
  return (
    <main className="py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold">Our story</h2>
            <p className="mt-4 text-gray-700">
              Founded in 2010, Impuls Sofia has grown from a small community
              class to a vibrant hub for dancers of all ages. Our mission is to
              nurture creativity, technique, and community through joyful
              movement.
            </p>

            <div className="mt-6">
              <h3 className="font-semibold">Our instructors</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {instructors.map((ins) => (
                  <div key={ins.name} className="flex gap-3 items-center">
                    <img
                      src={ins.photo}
                      className="w-16 h-16 rounded-full object-cover"
                      alt={ins.name}
                    />
                    <div>
                      <div className="font-medium">{ins.name}</div>
                      <div className="text-sm text-gray-500">{ins.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1517904891960-6a3572b2f9f7?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=ghijkl"
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
