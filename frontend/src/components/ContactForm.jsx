import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (!name || !email || !phone) {
      setError('Please fill all fields');
      return;
    }

    try {
      const response = await fetch("https://contactslist-6v83.onrender.com/contacts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone })
      });
      const data = await response.json();
      if (response.ok) {
        setMsg('Contact added successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setTimeout(() => window.location.reload(), 800);
      } else {
        setError(data.msg || 'Failed to add contact');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="mb-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-5 border border-blue-100"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          Add a Contact
        </h2>
        {msg && <p className="bg-green-50 text-green-700 px-3 py-2 rounded">{msg}</p>}
        {error && <p className="bg-red-50 text-red-700 px-3 py-2 rounded">{error}</p>}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="flex-1 p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-200 transition"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="flex-1 p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-200 transition"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="flex-1 p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-200 transition"
            id="phone"
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer mt-2 w-full md:w-fit bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold transition"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
