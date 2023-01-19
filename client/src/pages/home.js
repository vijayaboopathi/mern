
import { useEffect } from "react"

import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import  WorkoutDetail from '../components/workoutDetails'
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkout = async () => {
            const res = await fetch('/api/worouts')
            const json = await res.json()
            if(res.ok){
                dispatch({type:'SET_WORKOUTS',payload:json })
            }
        }
        fetchWorkout()
    },[])
    return(
        <div className="home">
            <div className="workouts">
            {workouts && workouts.map((workout) => (
                <WorkoutDetail key={workout._id} workout={workout}/>

            ) )}
            </div>
            <WorkoutForm />
        </div>
    )
}

 export default Home