
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 25;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your order! This is a demo. We have collected your info for: ' + formData.fullName);
    window.location.hash = '#/';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fadeIn">
        <h2 className="text-3xl font-serif italic text-[#2C3468] mb-6">Your bag is empty</h2>
        <a href="#/shop" className="inline-block bg-[#2C3468] text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90">
          Return to Shop
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Form */}
          <div className="flex-1 space-y-12 animate-fadeIn">
            <div>
              <h1 className="text-4xl font-serif italic text-[#2C3468] mb-2">Checkout</h1>
              <p className="text-slate-400 text-xs uppercase tracking-[0.3em] font-medium">Secure Sartorial Procurement</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="space-y-6">
                <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#2C3468] border-b border-slate-100 pb-2">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                    <input 
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="e.g. James Harrison" 
                      className="w-full border-b border-slate-200 py-3 focus:border-[#2C3468] focus:outline-none text-sm transition-colors font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      placeholder="james@example.com" 
                      className="w-full border-b border-slate-200 py-3 focus:border-[#2C3468] focus:outline-none text-sm transition-colors font-light"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Phone Number</label>
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    className="w-full border-b border-slate-200 py-3 focus:border-[#2C3468] focus:outline-none text-sm transition-colors font-light"
                  />
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#2C3468] border-b border-slate-100 pb-2">Shipping Destination</h3>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Street Address</label>
                  <textarea 
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Madison Avenue, 4th Floor..." 
                    className="w-full border-b border-slate-200 py-3 focus:border-[#2C3468] focus:outline-none text-sm transition-colors font-light resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400">City</label>
                    <input 
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full border-b border-slate-200 py-3 focus:border-[#2C3468] focus:outline-none text-sm transition-colors font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400">ZIP / Postal Code</label>
                    <input 
                      required
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full border-b border-slate-200 py-3 focus:border-[#2C3468] focus:outline-none text-sm transition-colors font-light"
                    />
                  </div>
                </div>
              </section>

              <button 
                type="submit"
                className="w-full bg-[#2C3468] text-white py-5 text-xs font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-opacity-90 active:scale-[0.99] transition-all"
              >
                Place Your Order — ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-96 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <div className="bg-slate-50 p-8 sticky top-44 rounded-sm border border-slate-100">
              <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#2C3468] border-b border-slate-200 pb-4 mb-6">Order Summary</h3>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-white flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase truncate">{item.title}</h4>
                      {/* Fix: removed non-existent item.color */}
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">Size {item.size}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-slate-500">Qty: {item.quantity}</span>
                        <span className="text-xs font-bold text-[#2C3468]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-800">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif italic text-[#2C3468] pt-4 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="font-bold not-italic font-sans">${total.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-[9px] text-slate-400 uppercase tracking-widest text-center mt-8 font-medium">
                Complimentary Shipping on all orders over $150
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
