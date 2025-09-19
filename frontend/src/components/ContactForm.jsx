import React, { useState } from 'react';

function ContactForm() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    console.log(name)
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
                window.location.reload();
            } else {
                setError(data.msg || 'Failed to add contact');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        }
    };

    return (
        <div>
            <h2 className='text-left text-green-500 text-base sm:text-lg md:text-xl lg:text-lg font-bold mb-3'>
                Fill this Form and Add Contact
            </h2>

            {msg && <div className="text-green-700 font-bold mb-2">{msg}</div>}
            {error && <div className="text-red-500 font-bold mb-2">{error}</div>}
            
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <label className='text-left font-bold' htmlFor='name'>Name</label>
                <input
                    className="block w-full sm:w-2/3 md:w-1/2 lg:w-2/3 p-2 sm:p-3 md:p-3 text-sm sm:text-base md:text-lg border border-black-300 rounded-lg"
                    id="name"
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <label className='text-left font-bold' htmlFor="email">Email</label>
                <input
                    className="block w-full sm:w-2/3 md:w-1/2 lg:w-2/3 p-2 sm:p-3 md:p-3 text-sm sm:text-base md:text-lg border border-black-300 rounded-lg"
                    id="email"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <label className='text-left font-bold' htmlFor="phone">Phone</label>
                <input
                    className="block w-full sm:w-2/3 md:w-1/2 lg:w-2/3 p-2 sm:p-3 md:p-3 text-sm sm:text-base md:text-lg border border-black-300 rounded-lg"
                    id="phone"
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                />
                <button
                    type="submit"
                    className="cursor-pointer mt-2 block w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-2 sm:p-3 md:p-3 text-sm sm:text-base md:text-lg border border-black-300 rounded-lg bg-blue-500 text-white">
                    Add Contact
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
