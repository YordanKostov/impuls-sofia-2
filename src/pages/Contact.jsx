import Container from "../components/Container"
import { useForm } from "react-hook-form"

export default function Contact() {
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = (data) => {
        // For a real project, integrate an email API or your backend here.
        alert('Thanks — we got your message! (demo)')
        reset()
    }

    return (
        <main className="py-20">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-3xl font-extrabold">Get in touch</h2>
                        <p className="mt-3 text-gray-600">Questions about classes, schedule, or booking performances? Send us a message.</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                            <input {...register('name')} placeholder="Your name" className="w-full p-3 rounded-lg border" />
                            <input {...register('email')} placeholder="Email" type="email" className="w-full p-3 rounded-lg border" />
                            <textarea {...register('message')} placeholder="Message" rows={5} className="w-full p-3 rounded-lg border"></textarea>
                            <div>
                                <button type="submit" className="px-5 py-3 rounded-full bg-rose-600 text-white">Send message</button>
                            </div>
                        </form>

                        <div className="mt-6 text-sm text-gray-500">
                            <div><strong>Address:</strong> g.k. Mladost 2, ul. "Sv. Kipriyan" 236, 1799 Sofia</div>
                            <div className="mt-1"><strong>Phone:</strong> (555) 123-4567</div>
                        </div>
                    </div>

                    <div>
                        <div className="rounded-xl overflow-hidden shadow-lg h-full">
                            <iframe title="map" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=%D0%A3%D0%BB.%20%D0%A1%D0%B2%D0%B5%D1%82%D0%B8%20%D0%9A%D0%B8%D0%BF%D1%80%D0%B8%D1%8F%D0%BD%20236%201799%20Sofia%2C%20Bulgaria&maptype=roadmap" className="w-full h-full min-h-[300px] border-0" />
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    )
}