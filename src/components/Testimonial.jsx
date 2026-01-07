const Testimonial = ({ name, quote }) => (
    <div className="p-6 bg-white rounded-xl border shadow-sm">
        <div className="text-gray-700">"{quote}"</div>
        <div className="mt-3 font-semibold">— {name}</div>
    </div>
)

export default Testimonial;