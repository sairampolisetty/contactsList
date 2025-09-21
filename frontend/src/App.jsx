import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br py-8 px-2 rounded-lg">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-lg mb-2">
             Contact Book
          </h1>
          <p className="text-blue-500 text-lg font-semibold">
            Store your Contacts Easily
          </p>
        </header>
        <ContactForm />
        <ContactList />
      </div>
    </div>
  )
}

export default App
