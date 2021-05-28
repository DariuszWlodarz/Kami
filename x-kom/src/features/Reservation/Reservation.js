import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setReservedSeats } from '../../app/slice'
import Seat from '../../uiComponents/Seat/Seat'
import styles from './Reservetion.module.scss'

const Reservation = () => {
  const [seatsData, setSeatsData] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [nextToEachOtherOptions, setNextToEachOtherOptions] = useState([])
  const [validOptions, setValidOptions] = useState([])
  const numberOfSeatsToReserveFromStore = useSelector(state => state.reservation.sitsToReserve)
  const shouldBeNextToEachOtherFromStore = useSelector(state => state.reservation.shouldBeNextToEachOther)
  const [shouldBeNextToEachOther, setShouldBeNextToEachOther] = useState(shouldBeNextToEachOtherFromStore)
  const [numberOfSeatsToReserve, setNumberOfSeatsToReserve] = useState(numberOfSeatsToReserveFromStore)
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
            if (item.indexInDataTable) {
              newSeatsData[item.indexInDataTable].reserved = true
            } else {
              const index = newSeatsData.findIndex(seat => seat.id === item.id)
              newSeatsData[index].reserved = true
            }
            setSeatsData(newSeatsData)
          })
        }
        if (requested) {
          const localRequestedSave = JSON.parse(requested)
          console.log(localRequestedSave)
          setShouldBeNextToEachOther(localRequestedSave.shouldBeNextToEachOther)
          setNumberOfSeatsToReserve(parseInt(localRequestedSave.numberOfSeats))
        }
        if (shouldBeNextToEachOther) {
          getPossibleOptions(data)
        }
      })

  }, [])

  const getPossibleOptions = (data) => {
    const maxPossibleSeatsInRow = []
    data.forEach((seat, index) => {
      let previousSeat = null
      if (index > 0) previousSeat = data[index - 1]

      if (!maxPossibleSeatsInRow[seat.cords.x]) {
        maxPossibleSeatsInRow[seat.cords.x] = []
        maxPossibleSeatsInRow[seat.cords.x].push([])
      }

      if (index > 0 && seat.reserved) {
        maxPossibleSeatsInRow[seat.cords.x].push([])
      }
      if (index > 0 && seat.cords.y - previousSeat.cords.y > 1) {
        maxPossibleSeatsInRow[seat.cords.x].push([])
      }
      if (!seat.reserved) {
        const option = maxPossibleSeatsInRow[seat.cords.x].length - 1
        maxPossibleSeatsInRow[seat.cords.x][option].push(seat.id)
      }


    })
    console.log(maxPossibleSeatsInRow)
    setNextToEachOtherOptions(maxPossibleSeatsInRow)
    validateOptions()
  }
  const generateSeats = (data) => {
    return data.map((item, index) => {
      return <Seat key={item.id}
                   relatedIndex={index}
                   id={item.id}
                   posX={item.cords.x} posY={item.cords.y}
                   reserveSeatHandler={reserveSeat}
                   unreservedSeatHandler={unreservedSeat}
                   available={isAvailable(item.id)}
                   isReservedByUser={selectedSeats.some((selectedSeat) => selectedSeat.id === item.id)}
                   reserved={item.reserved}/>
    })
  }


  const validateOptions = () => {
    console.log('x', nextToEachOtherOptions)
    if (shouldBeNextToEachOther) {
      const validOptions = nextToEachOtherOptions.flatMap(row => {
        return row.filter(option => option.length >= numberOfSeatsToReserve)
      })
      console.log(validOptions.flat())
      console.log('2', nextToEachOtherOptions)
      setValidOptions(validOptions)
    }
  }
  const isAvailable = (id) => {
    if (shouldBeNextToEachOther) return validOptions.flat().includes(id)
    return true

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
