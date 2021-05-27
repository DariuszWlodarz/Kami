import React from 'react'
import { useSelector } from 'react-redux'

const Confirmation = () => {
  const reserved = useSelector(state => state.reservation.reservedSeats);
  return (
    <div>
      hwdp wam w dupe
      Wybrales miejsca:

      {reserved.map(reservedSeat => <p>{`- rzad x${reservedSeat.cords.x}, miejsce  y${reservedSeat.cords.y} (${reservedSeat.id})`}</p>)}
      dziekujemy w razie problemow prosimy dgokijsieurhp;iw
    </div>
  )
}

export default Confirmation
