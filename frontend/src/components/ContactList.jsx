import React, { useState, useEffect } from 'react';
import Loader from './Loader';

function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    async function fetchContacts() {
        setIsLoading(true);
        try {
            const res = await fetch('https://contactslist-6v83.onrender.com/contacts');
            const data = await res.json();
            // Debug API data shape
            console.log('Fetched data:', data);
            // Always use array, no matter the API format (array or {contacts: []})
            setContacts(Array.isArray(data) ? data : (data.contacts || []));
        } catch (error) {
            setContacts([]); // fallback to empty if fetch fails
        }
        setIsLoading(false);
    }

    // Handle delete action
    async function handleDelete(id) {
        const res = await fetch(`https://contactslist-6v83.onrender.com/contacts/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setContacts(contacts.filter(contact => contact._id !== id));
        } else {
            alert('Failed to delete contact');
        }
    }

    // Always work only with an array!
    const arrContacts = Array.isArray(contacts) ? contacts : [];
    const totalPages = Math.max(1, Math.ceil(arrContacts.length / limit));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageContacts = arrContacts.slice(startIndex, endIndex);

    return (
        <div className="w-full">
            <h2 className="font-bold mt-5 mb-2 text-center text-lg sm:text-xl">Contact List</h2>
            {isLoading ? (
                <div className="text-center my-4"><Loader /></div>
            ) : (
                <div className="border-2 border-gray-200 rounded-lg overflow-x-auto w-full">
                    <table className="min-w-full border-collapse border border-gray-200 text-sm sm:text-base rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2 text-center">Name</th>
                                <th className="border px-4 py-2 text-center">Email</th>
                                <th className="border px-4 py-2 text-center">Phone</th>
                                <th className="border px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageContacts.map(contact => (
                                <tr key={contact._id}>
                                    <td className="border px-4 py-2">{contact.name}</td>
                                    <td className="border px-4 py-2">{contact.email}</td>
                                    <td className="border px-4 py-2">{contact.phone}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            className="bg-red-500 cursor-pointer text-white font-bold py-1 px-2 rounded shadow transition"
                                            onClick={() => handleDelete(contact._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex gap-2 mt-2 justify-center">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
                >Prev</button>
                <span className="text-sm sm:text-base">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
                >Next</button>
            </div>
        </div>
    );
}

export default ContactList;
