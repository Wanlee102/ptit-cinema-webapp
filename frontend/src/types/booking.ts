export interface Booking {
  id: string
  userId?: number
  movieId: number
  showtimeId: number
  cinemaName: string
  movieTitle: string
  date: string
  time: string
  seats: string[]
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
  qrCode?: string
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  E_WALLET = 'e_wallet',
  BANK_TRANSFER = 'bank_transfer'
}

export interface PaymentInfo {
  method: PaymentMethod
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
  phoneNumber?: string
  bankName?: string
}
