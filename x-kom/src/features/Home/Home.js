import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { setBeNextToEachOther, setSitsToReserve } from '../../app/slice'

const Home = () => {
  const [numberOfSeats, setNumberOfSits] = useState(1)
  const [shouldBeNextToEachOther, setShouldBeNextToEachOther] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(setSitsToReserve(parseInt(numberOfSeats)))
    dispatch(setBeNextToEachOther(shouldBeNextToEachOther))
    localStorage.setItem('requestedSeats', JSON.stringify({
      numberOfSeats: numberOfSeats,
      shouldBeNextToEachOther: shouldBeNextToEachOther
    }))
    history.push("/reservation")
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          value={numberOfSeats}
          onChange={(event) => setNumberOfSits(event.target.value)}
        />
        <input type="checkbox"
               defaultChecked={shouldBeNextToEachOther}
               onChange={() => setShouldBeNextToEachOther(!shouldBeNextToEachOther)}/>
        <label>czy maja byc obok siebie</label>
        <button type="submit">wybierz miejsca</button>
      </form>
    </div>
  )
}

export default Home
