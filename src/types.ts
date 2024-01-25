export type Apartment = {
  id: string
  name: string
  address: string
  numberFloor: number
  rooms: number
  stayed: number
  empty: number
  sap_tra: number
  dacoc: number
  url: string
}
export type Room = {
  apartmentId: string
  billStatus: boolean
  debt: number
  deposit: number
  description: string
  floor: number
  id: number
  name: string
  rent: number
  netProceeds: number
  status: boolean
  suspenseMoney: number
}
export type Customer = {
  id: string
  name: string
  address: string
  identity: string
  temporaryResidence: boolean
  plate: string
}
