import React from 'react'
import { Link } from 'react-router-dom'

function MobileMenu({ nav }) {
    const [open, setOpen] = React.useState(false)
    return (
        <div className="md:hidden">
            <button onClick={() => setOpen((s) => !s)} className="p-2 rounded-md">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {open && (
                <div className="absolute right-4 top-16 bg-white rounded-xl shadow-md w-48 border">
                    <div className="flex flex-col p-3">
                        {nav.map(n => (
                            <Link onClick={() => setOpen(false)} key={n.to} to={n.to} className="py-2 text-sm text-gray-700">{n.label}</Link>
                        ))}
                        <Link onClick={() => setOpen(false)} to="/contact" className="mt-2 px-3 py-2 rounded-full bg-rose-600 text-white text-sm text-center">Book</Link>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MobileMenu; 