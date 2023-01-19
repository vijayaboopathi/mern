import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
const WorkoutForm = () =>{
  const {dispatch} = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [reps, setReps] = useState('')
  const [load, setLoad] = useState('')
  const [err, setErr] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, reps, load}
    const res = await fetch('/api/worouts', {
        method: 'POST' ,
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await res.json()
    if(!res.ok) {
        setErr(json.err) 
    }
    if(res.ok){
        setTitle('')
        setReps('')
        setLoad('')
        setErr(null)
        console.log("added",json )
        dispatch({type:'CREATE_WORKOUT',payload:json})
    }
  }

  return(
     <form className="create" onSubmit={handleSubmit}>
        <h3> Add new Workout</h3>
        <label>Title:</label>
        <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ></input>

        <label>Reps:</label>
        <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        ></input>

        <label>Load:</label>
        <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        ></input>
        <button>Add Workout</button>
        {err && <div className="error">{err}</div> }
     </form>
  )
}


export default WorkoutForm