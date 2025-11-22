import { Booking } from '../types/booking'

const BOOKINGS_KEY = 'cinema_bookings'

export const bookingService = {
  createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'qrCode'>): Booking {
    const id = `BK${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const createdAt = new Date().toISOString()
    const qrCode = this.generateQRCode(id)
    
    const newBooking: Booking = {
      ...booking,
      id,
      createdAt,
      qrCode,
      status: 'confirmed'
    }
    
    // Save to localStorage
    const bookings = this.getAllBookings()
    bookings.push(newBooking)
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
    
    return newBooking
  },
  
  getBookingById(id: string): Booking | undefined {
    const bookings = this.getAllBookings()
    return bookings.find(b => b.id === id)
  },
  
  getAllBookings(): Booking[] {
    const data = localStorage.getItem(BOOKINGS_KEY)
    return data ? JSON.parse(data) : []
  },
  
  getUserBookings(userId: number): Booking[] {
    return this.getAllBookings().filter(b => b.userId === userId)
  },
  
  generateQRCode(bookingId: string): string {
    // Simple QR code data - in real app, use a QR library
    return `PTIT_CINEMA_${bookingId}`
  }
}
