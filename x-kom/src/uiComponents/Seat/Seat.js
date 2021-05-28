import React from 'react'
import styles from './Seat.module.scss'

const Seat = (props) => {

  const seatClass = () => {
    if(props.isReservedByUser) return styles.selectedSeat
    if(props.reserved) return styles.reservedSeat
    if(props.available) return styles.seat
    return styles.unavailableSeat
  }
  return (<div className={seatClass()}
               style={{ top: props.posY * 25 + "px", left: props.posX * 25 + "px" }}
               onClick={() => {
                 if(props.isReservedByUser || !props.reserved) {
                   props.reserved || !props.available ? props.unreservedSeatHandler(props.id, props.relatedIndex) : props.reserveSeatHandler(props.relatedIndex)
                 }
               }}
    >
    </div>
  )
}

export default Seat
