import { useWorkoutsContext } from "../hooks/useWorkoutContext"


const WorkoutDetail = ({workout}) => {
   const { dispatch} = useWorkoutsContext()
    const handleClick = async () =>{
        const res =await fetch('/api/worouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await res.json()
        if(res.ok) {
            dispatch({type:'DELETE_WORKOUT',payload:json})
        }
        
    }
    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Reps :</strong>{workout.reps}</p>
            <p><strong>load (kg) :</strong>{workout.load}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>delete</span>
            
        </div>
    )

}

export default WorkoutDetail;