const Feature = ({ title, desc }) => (
    <div className="p-6 rounded-xl bg-white border shadow-sm">
        <div className="font-semibold">{title}</div>
        <div className="mt-2 text-gray-600 text-sm">{desc}</div>
    </div>
)

export default Feature;