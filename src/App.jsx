import { useState } from 'react'
import { Sparkles, Phone, Calendar, CheckCircle2, MapPin, Mail, Instagram, Facebook } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="p-5 rounded-xl bg-white/70 backdrop-blur shadow-sm border border-white/40">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-blue-600/10 text-blue-700">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    service_type: 'Wash & Fold',
    pickup_date: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const submitBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to submit')
      setMessage('Thanks! Your pickup is scheduled. We will contact you shortly.')
      setForm({ name: '', phone: '', address: '', service_type: 'Wash & Fold', pickup_date: '', notes: '' })
    } catch (err) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-white/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <Sparkles size={18} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">SRKLAUNDRY</span>
          </div>
          <a href="/test" className="text-sm text-blue-700 hover:underline">System Test</a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
            Fresh clothes, on your schedule.
          </h1>
          <p className="mt-4 text-gray-600 text-lg">Premium laundry and dry cleaning pickup & delivery service. Fast turnaround, fair pricing, trusted by locals.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#book" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700">Book Pickup</a>
            <a href="tel:+91" className="px-5 py-3 rounded-lg bg-white text-blue-700 font-semibold border border-blue-200 hover:bg-blue-50 flex items-center gap-2"><Phone size={18}/> Call Us</a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={18}/> 24-48h Turnaround</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={18}/> Free Pickup</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={18}/> Quality Guaranteed</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-white/60">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-blue-600"/>
            <h3 className="font-bold text-gray-900">Quick Pickup Booking</h3>
          </div>
          <form onSubmit={submitBooking} className="grid gap-3">
            <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full Name" className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none" />
            <input required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone Number" className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none" />
            <input required value={form.address} onChange={e=>setForm({...form, address:e.target.value})} placeholder="Pickup Address" className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.service_type} onChange={e=>setForm({...form, service_type:e.target.value})} className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none">
                <option>Wash & Fold</option>
                <option>Dry Cleaning</option>
                <option>Ironing</option>
                <option>Express</option>
              </select>
              <input required type="date" value={form.pickup_date} onChange={e=>setForm({...form, pickup_date:e.target.value})} className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none" />
            </div>
            <textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} placeholder="Notes (optional)" className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none min-h-[90px]" />
            <button disabled={loading} className="mt-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60">
              {loading ? 'Booking...' : 'Confirm Pickup'}
            </button>
            {message && <p className="text-sm text-center text-gray-700">{message}</p>}
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why choose SRKLAUNDRY?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Feature icon={CheckCircle2} title="Premium Care" desc="Handled by professionals with attention to detail." />
          <Feature icon={CheckCircle2} title="Affordable" desc="Transparent, competitive pricing for every service." />
          <Feature icon={CheckCircle2} title="Pickup & Delivery" desc="We collect and deliver at your convenience." />
          <Feature icon={CheckCircle2} title="Eco‑friendly" desc="We use safe detergents and efficient processes." />
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white/70 backdrop-blur border-t border-white/60">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Get in touch</h3>
            <p className="mt-2 text-gray-600">Questions or bulk orders? We’d love to help.</p>
            <div className="mt-6 space-y-3 text-gray-700">
              <p className="flex items-center gap-2"><Phone size={18}/> +91 XXXXX XXXXX</p>
              <p className="flex items-center gap-2"><Mail size={18}/> hello@srklaundry.com</p>
              <p className="flex items-center gap-2"><MapPin size={18}/> Your City, India</p>
              <div className="flex items-center gap-4 pt-2 text-blue-700">
                <a href="#" className="hover:underline flex items-center gap-2"><Facebook size={18}/> Facebook</a>
                <a href="#" className="hover:underline flex items-center gap-2"><Instagram size={18}/> Instagram</a>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-600">© {new Date().getFullYear()} SRKLAUNDRY. All rights reserved.</footer>
    </div>
  )
}

function ContactForm(){
  const [data, setData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSent('')
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed')
      setSent('Thanks! We will reply soon.')
      setData({ name: '', email: '', message: '' })
    } catch (e) {
      setSent('Could not send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div id="book" className="bg-white rounded-2xl shadow-xl p-6 border border-white/60">
      <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
      <form onSubmit={submit} className="grid gap-3">
        <input required value={data.name} onChange={e=>setData({...data, name:e.target.value})} placeholder="Your Name" className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none" />
        <input required type="email" value={data.email} onChange={e=>setData({...data, email:e.target.value})} placeholder="Email" className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none" />
        <textarea required value={data.message} onChange={e=>setData({...data, message:e.target.value})} placeholder="Message" className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 outline-none min-h-[120px]" />
        <button disabled={sending} className="mt-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60">
          {sending ? 'Sending...' : 'Send Message'}
        </button>
        {sent && <p className="text-sm text-center text-gray-700">{sent}</p>}
      </form>
    </div>
  )
}
