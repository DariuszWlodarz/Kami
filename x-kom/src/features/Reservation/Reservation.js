import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setReservedSeats } from '../../app/slice'
import Seat from '../../uiComponents/Seat/Seat'
import styles from './Reservetion.module.scss'

const Reservation = () => {
  const [seatsData, setSeatsData] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const numberOfSeatsToReserve = useSelector(state => state.reservation.sitsToReserve)
  const shouldBeNextToEachOther = useSelector(state => state.reservation.shouldBeNextToEachOther)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    fetch('http://localhost:3000/seats')
      .then(response => response.json())
      .then(data => {
        setSeatsData(data)
        const saved = localStorage.getItem('selectedSeats')
        const requested = localStorage.getItem('requestedSeats')
        if (saved) {
          const localSave = JSON.parse(saved)
          setSelectedSeats(localSave)
          localSave.forEach(item => {
            const newSeatsData = [...data]
            newSeatsData[item.indexInDataTable].reserved = true
            setSeatsData(newSeatsData)
          })
        }
        if(requested) {
          const localRequestedSave = JSON.parse(requested)
          const maxPossibleSeatsInRow = []
          data.forEach((seat, index) => {
            let previousSeat = null
            if(index > 0) previousSeat= data[index-1]
            if(!seat.reserved) {
              maxPossibleSeatsInRow[index] = []
            }
          })
        }
      })

  }, [])

  const generateSeats = (data) => {
    return data.map((item, index) => <Seat key={item.id} relatedIndex={index}
                                           id={item.id}
                                           posX={item.cords.x} posY={item.cords.y}
                                           reserveSeatHandler={reserveSeat}
                                           unreservedSeatHandler={unreservedSeat}
                                           isReservedByUser={selectedSeats.some((selectedSeat) => selectedSeat.id === item.id)}
                                           reserved={item.reserved}/>)
  }

  const reserveSeat = (indexInDataTable) => {
    if (selectedSeats.length < numberOfSeatsToReserve) {
      setSelectedSeats([...selectedSeats, seatsData[indexInDataTable]])
      const updData = [...seatsData]
      updData[indexInDataTable].reserved = true
      setSeatsData(updData)

      localStorage.setItem('selectedSeats', JSON.stringify([...selectedSeats, {
        ...seatsData[indexInDataTable],
        indexInDataTable: indexInDataTable
      }]))
    } else {
      alert('nope')
    }
  }

  const unreservedSeat = (id, indexInDataTable) => {
    const index = selectedSeats.findIndex((item) => item.id === id)
    selectedSeats.splice(index, 1)
    const updData = [...seatsData]
    updData[indexInDataTable].reserved = false
    setSeatsData(updData)
    setSelectedSeats([...selectedSeats])
  }

  const makeReservation = () => {
    dispatch(setReservedSeats(selectedSeats))
    history.push("/confirmation")
  }
  return (
    <div>
      <div className={styles.cinemaHall}>
        {generateSeats(seatsData)}
      </div>
      <button disabled={selectedSeats.length < numberOfSeatsToReserve}
              onClick={makeReservation}>rezerwuj {JSON.stringify(numberOfSeatsToReserve)}</button>
    </div>
  )
}

export default Reservation
