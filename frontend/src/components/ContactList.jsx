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

  useEffect(() => {
    const arrContacts = Array.isArray(contacts) ? contacts : [];
    const totalPages = Math.max(1, Math.ceil(arrContacts.length / limit));
    if (page > totalPages) setPage(totalPages);
  }, [contacts, page, limit]);

  async function fetchContacts() {
    setIsLoading(true);
    try {
      const res = await fetch('https://contactslist-6v83.onrender.com/contacts');
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : (data.contacts || []));
    } catch {
      setContacts([]);
    }
    setIsLoading(false);
  }

  async function handleDelete(id) {
    await fetch(`https://contactslist-6v83.onrender.com/contacts/${id}`, { method: 'DELETE' });
    setContacts(contacts.filter(contact => contact._id !== id));
  }

  const arrContacts = Array.isArray(contacts) ? contacts : [];
  const totalPages = Math.max(1, Math.ceil(arrContacts.length / limit));
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageContacts = arrContacts.slice(startIndex, endIndex);

  return (
    <section>
      <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
        Your Contacts
      </h2>
      {isLoading ? (
        <div className="text-center py-10 text-blue-400 font-bold"><Loader/></div>
      ) : (
        <div className="flex flex-row overflow-auto scrollbar-hide md:flex-col gap-6">
          {pageContacts.length === 0 ? (
            <div className="text-gray-400 italic text-center">No contacts found.</div>
          ) : (
            pageContacts.map(contact => (
              <div
                key={contact._id}
                className="bg-white shadow hover:shadow-lg border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-center justify-between transition-all"
              >
                <div className="flex items-center gap-4 w-full flex-1">
                  <div className="bg-blue-50 p-4 rounded-full text-blue-600 font-bold text-xl">
                    {contact.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="w-full">
                    <div className="font-bold text-lg text-blue-700">{contact.name}</div>
                    <div className="text-gray-600 text-base">
                      <span className="font-semibold">Email:</span> {contact.email}
                    </div>
                    <div className="text-gray-600 text-base">
                      <span className="font-semibold">Phone:</span> {contact.phone}
                    </div>
                  </div>
                </div>
                <button
                  title="Delete"
                  aria-label="Delete"
                  onClick={() => handleDelete(contact._id)}
                  className="align-items-end cursor-pointer text-red-500 hover:text-white hover:bg-red-500 border border-red-200 p-2 px-4 rounded-md transition font-bold"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      
      {arrContacts.length > limit && (
        <div className="mt-8 flex justify-center items-center gap-3 select-none">
          <button
            onClick={() => setPage(page => Math.max(1, page - 1))}
            className={`px-3 py-1 rounded-md font-bold ${
              page === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
            }`}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="font-semibold text-blue-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page => Math.min(totalPages, page + 1))}
            className={`px-3 py-1 rounded-md font-bold ${
              page === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
            }`}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default ContactList;
