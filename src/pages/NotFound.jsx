import Container from "../components/Container"

export default function NotFound() {
    return (
        <main className="py-40">
            <Container>
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold">Page not found</h2>
                    <p className="mt-4 text-gray-600">Return <Link to="/" className="text-rose-600">home</Link>.</p>
                </div>
            </Container>
        </main>
    )
}