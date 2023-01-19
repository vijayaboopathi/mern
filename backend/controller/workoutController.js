const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workout

const getWorkouts = async (req, res) => {
    const workout = await Workout.find({}).sort({createsAt:-1})
    res.status(200).json(workout)
} 

// get single workout

const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: ' no such workout'})
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({err:"no suck workout"})
    }
    res.status(200).json(workout)
}

//create new workout

const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body
    try{
        const workout = await Workout.create({title,reps,load})
        res.status(200).json(workout)
    } catch(err) {
        res.status(400).json({err: err.message})
    } 
}



//delete workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: ' no such workout'})
    }
    const workout = await Workout.findByIdAndDelete({_id: id})
    if (!workout) {
        return res.status(404).json({err:"no suck workout"})
    }
    res.status(200).json(workout)
}



//update workout

const updateWork = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: ' no such workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({err:"no suck workout"})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWork,
    createWorkout
}