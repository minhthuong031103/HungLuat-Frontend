export interface LoginProps {
  username: string
  password: string
}

export interface ModalData {
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
