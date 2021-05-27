import React from 'react'
import styles from './Seat.module.scss'

const Seat = (props) => {
  return (<div className={props.reserved ? styles.reservedSeat : styles.seat}
               style={{ top: props.posY * 25 + "px", left: props.posX * 25 + "px" }}
               onClick={() => {
                 if(props.isReservedByUser || !props.reserved) {
                   props.reserved ? props.unreservedSeatHandler(props.id, props.relatedIndex) : props.reserveSeatHandler(props.relatedIndex)
                 }
               }}
    >
    </div>
  )
}

export default Seat
