import Container from "./Container.jsx";
import instagram_logo from "../assets/instagram_logo.png";
import facebook_logo from "../assets/facebook_logo.png";

export default function Footer() {
  return (
    <footer className="mt-8 py-6 border-t border-gray-200/30">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-semibold text-lg">Impuls Sofia</div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Impuls Sofia — All rights reserved.
            </div>
          </div>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/ImpulsSofiq">
              <img src={facebook_logo} alt="Facebook" className="w-10 h-10" />
            </a>
            <a href="https://www.instagram.com/impuls_sofia">
              <img src={instagram_logo} alt="Instagram" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
