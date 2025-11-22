import { Seat, SeatMap, SeatStatus, SeatType } from '../types/movie'

// Generate seat map for a room
export function generateSeatMap(roomId: number, rows: number = 8, seatsPerRow: number = 12): SeatMap {
  const seats: Seat[] = []
  const rowLabels = 'ABCDEFGHIJ'.split('')
  
  // Randomly occupy some seats for demo
  const occupiedSeats = new Set<string>()
  const occupiedCount = Math.floor((rows * seatsPerRow) * 0.3) // 30% occupied
  
  while (occupiedSeats.size < occupiedCount) {
    const randomRow = Math.floor(Math.random() * rows)
    const randomSeat = Math.floor(Math.random() * seatsPerRow) + 1
    occupiedSeats.add(`${rowLabels[randomRow]}${randomSeat}`)
  }
  
  for (let r = 0; r < rows; r++) {
    const rowLabel = rowLabels[r]
    
    for (let s = 1; s <= seatsPerRow; s++) {
      const seatId = `${rowLabel}${s}`
      let type = SeatType.STANDARD
      let price = 100000
      
      // VIP rows (rows D, E, F in the middle)
      if (r >= 3 && r <= 5) {
        type = SeatType.VIP
        price = 150000
      }
      
      // Couple seats (last 2 seats in VIP rows)
      if (r >= 3 && r <= 5 && s >= seatsPerRow - 1) {
        type = SeatType.COUPLE
        price = 200000
      }
      
      seats.push({
        id: seatId,
        row: rowLabel,
        number: s,
        type,
        status: occupiedSeats.has(seatId) ? SeatStatus.OCCUPIED : SeatStatus.AVAILABLE,
        price
      })
    }
  }
  
  return {
    roomId,
    rows,
    seatsPerRow,
    seats
  }
}

// Mock seat maps for different rooms
export const SEAT_MAPS: Record<number, SeatMap> = {
  1: generateSeatMap(1, 8, 12),
  2: generateSeatMap(2, 10, 14),
  3: generateSeatMap(3, 8, 10)
}

export function getSeatMapByRoomId(roomId: number): SeatMap | undefined {
  return SEAT_MAPS[roomId]
}
