export interface LoginProps {
  username: string
  password: string
}

export interface ModalData {
  roomId?: number
  name?: string
  city?: string
  district?: string
  ward?: string
  numberFloor?: number
  houseNumber?: string
  apartmentId?: number
}

export interface CreateApartmentProps {
  name: string
  city: string
  district: string
  ward: string
  numberFloor: number
  houseNumber: string
  address: string
}

export interface CreateCustomerProps {
  name: string
  phone: string
  identityCard: string
  address: string
  city: string
  district: string
  ward: string
  houseNumber: string
  plate: string
  registeredTemporaryResidence: boolean
  roomId: number
}
