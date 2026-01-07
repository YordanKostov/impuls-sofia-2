import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-page-gradient min-h-screen">
      <main>{children}</main>
      <Footer />
    </div>
  );
}
