import { Link } from "react-router-dom"
import Container from "../components/Container"
import { motion } from "framer-motion"
import classes from "../data/classes.js"

export default function Classes() {
    return (
        <main className="py-20">
            <Container>
                <h2 className="text-3xl font-extrabold">Classes</h2>
                <p className="mt-3 text-gray-600 max-w-2xl">We offer a range of classes — from ballet and contemporary to hip hop and salsa. Find the right level for you.</p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {classes.map((c) => (
                        <motion.div key={c.title} whileHover={{ y: -6 }} className="p-6 rounded-xl border bg-white shadow">
                            <div className="font-semibold text-lg">{c.title}</div>
                            <div className="text-sm text-gray-500 mt-1">Level: {c.level}</div>
                            <p className="mt-3 text-gray-700">{c.desc}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-600">Duration: {c.duration}</div>
                                <Link to="/contact" className="px-3 py-2 rounded-full bg-rose-600 text-white text-sm">Join</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </main>
    )
}