# User (interface)

- id: string
- fullName: string
- phone: string
- email: string
- password: string

<!-- All methods are static -->

- verifyPassword(id:User.id, password:hash) => boolean
- add (user: User) => boolean
- get(id:User.id)=> User
- getAll()=> [User]
- update(user:User)=> boolean
- delete(id:User.id)=> boolean

# Admin (implements User)

- defaultAdmin: boolean

<!-- only the default admin can perform the CRUDs on other admins -->

<!-- any admin can add, get, update and delete staff using the Staff class-->

<!-- any admin can get, update and delete client using the Client class-->

<!-- any admin can add, get, update and delete branch using the Branch class-->

<!-- any admin can get, update and delete reservations using the Reservations class-->

# Staff (implements User)

- branch:Branch.id

- getAllReservations() => [reservation]

# Client (implements User)

- defaultPlateNumber: string

<!--  can add reservations using the Reservation class-->

- getAllReservations() => [reservation]

# Branch

- id:string
- name:string
- location:string
- description:string
- capacity:number
- onService:boolean
- pricePerHour:number

<!-- All methods are static -->

- add(branch:Branch)=> boolean
- get(id:Branch.id)=> Branch
- getAll()=> [Branch]
- update(branch:Branch)=> boolean
- delete(id:Branch.id)=> boolean

# Reservation

- id: string
- reservedBy:client.id
- reservationPlateNumber: string
- branch:Branch.id
- price: number
- startingTime: time
- duration: number
- reoccurrence: number

<!-- All methods are static -->
- add(reservation:Reservation)=> boolean
- get(id:Reservation.id) => Reservation
- getAll()=> [Reservation]
- update(updateReservation:Reservation)=> boolean
- delete(id:Reservation.id)=> boolean