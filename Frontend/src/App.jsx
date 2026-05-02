
import { useState, useEffect } from 'react'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios.get('https://notes-app-ampk.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const { title, description } = e.target.elements

    axios.post("https://notes-app-ampk.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    })
    .then(res => {
      console.log(res.data)
      fetchNotes()  // ✅ inside .then(), runs after note is saved
    })
  }

  function handleDeleteNote(noteId ) {
    axios.delete("https://notes-app-ampk.onrender.com/api/notes/" + noteId)
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }

  function handleEditNote(noteId,e){
    e.preventDefault()
   const {title, description} = e.target.elements
   axios.patch("https://notes-app-ampk.onrender.com/api/notes/" + noteId,{
    title:title.value,
    description:description.value
   })
   .then((res)=>{
    console.log(res.data)
    fetchNotes()
   })
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter Title' />
        <input name='description' type="text" placeholder='Enter Description' />
        <button>Create Note</button>
         </form>
       
      <div className="notes">
        {notes.map(note => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            <form className="note-create-form" onSubmit={(e) => handleEditNote(note._id, e)}>
        <input name='title' type="text" placeholder='Enter Title' />
        <input name='description' type="text" placeholder='Enter Description' />
        <button>Edit</button>
      </form>
          </div>
        ))}
      </div>
    </>
  )
}

export default App