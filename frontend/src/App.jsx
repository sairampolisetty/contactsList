import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

import './App.css'

function App() {
      
  return (
    <>
      <h1
        className="text-center text-base sm:text-lg md:text-2xl lg:text-3xl text-blue-600 font-bold mb-5"
      >
          Contact Book
      </h1>
        <ContactForm />
        <ContactList />
    </>
  )
}

export default App
