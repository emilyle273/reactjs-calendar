import React, { useContext, useState, useRef } from 'react'
import { WorkoutContainer, MenuIcon, PlusButton, WorkoutName, Dot } from './styles'
import { FlexWrapper } from "../Exercise/styles"
import Exercise from "../Exercise"
import { WorkoutContext } from '../../App'

const Workout = ({ workout = {}, day, currentDay }) => {
  const [openedNewExercise, setOpenedNewExercise] = useState(false)
  const nameRef = useRef(null)
  const numberRef = useRef(null)
  const infoRef = useRef(null)
  const [state, setState] = useContext(WorkoutContext)
  const exercises = workout.exercises || []

  const handleAddExercise = (event) => {
    const days = state.days || []
  const currentDayIndex = days.findIndex(item => item.id === currentDay.id)
  const workouts = days[currentDayIndex].workouts || []
  const currentWorkoutIndex = workouts.findIndex(item => item.id === workout.id)

    const name = nameRef.current.value.trim()
    const number = numberRef.current.value.trim()
    const information = infoRef.current.value.trim()

    if(event.keyCode === 13) {
      if (!!name && !!number && !!information) {
      const newExercise = {
        id: new Date().getTime(),
        name,
        number,
        information,
      }
      workout.exercises.push(newExercise)
      workout = {
        ...workout,
      }
      workouts[currentWorkoutIndex] = {
        ...workout
      }
      days[currentDayIndex] = {
        ...currentDay,
        workouts
      }
      setState({
        ...state,
        days,
      })
    }
    setOpenedNewExercise(false)
  }
  }


   return (
   <WorkoutContainer id={day + workout.id} >
    <WorkoutName>{workout.name}</WorkoutName>
    <MenuIcon>
      <Dot />
      <Dot />
      <Dot />
    </MenuIcon>
    {exercises.map(item => (
      <Exercise
      exercise={item}
      key={workout.id + "-" + item.id}
    />
    ))}
    {openedNewExercise && (
      <Exercise
      isInput
      nameRef={nameRef}
      numberRef={numberRef}
      infoRef={infoRef}
      handleOnKeyDown={handleAddExercise}
    />
    )}
    <FlexWrapper justifyContent="flex-end" padding='3px'>
    <PlusButton onClick={() => setOpenedNewExercise(!openedNewExercise)} clicked={openedNewExercise}/>
    </FlexWrapper>
  </WorkoutContainer>
   )
}

export default Workout