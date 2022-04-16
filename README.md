# sheger-parking
a parking system automation platform


# User (abstract)
- id: string
- fullName: string
- phone: string
- email: string
- password: string

- verifyPassword(password:string) => boolean
- [s] add (user: User) => boolean
- [s] get(id:User.id)=> User
- [s] getAll()=> [User]
- update(user:User)=> boolean
- delete()=> boolean

# Admin (extends User)
- addAdmin(admin:Admin)=> boolean  [default admin only]
- updateAdmin(admin:Admin)=> boolean  [default admin only]
- deleteAdmin(admin:Admin.id)=> boolean  [default admin only]

<!--  can add, get, update and delete staff using the Staff class-->

<!--  can get, update and delete Client using the Client class-->

<!--  can add, get, update and delete Branch using the Branch class-->


# Staff (extends User)
- branch:Branch.id
<!--  can get reservations using the Reservation class-->

# Client (extends User)
- defaultPlateNumber: string
- addReservation(reservation:reservation) => boolean
- getAllReservations() => [reservation] 


# Branch
- id:string
- name:string
- location:string
- description:string
- capacity:number
- onService:boolean
- pricePerHour:number

- [s] add(branch:Branch)=> boolean
- [s] get(id:Branch.id)=> Branch
- [s] getAll()=> [Branch]
- update(branch:Branch)=> boolean
- delete()=> boolean

# Reservation
- id: string
- reservedBy:client.id
- reservationPlateNumber: string
- branch:Branch.id
- price: number
- startingTime: time
- duration: number
- reoccurrence: number

- [s] getReservation(id:Reservation.id) => Reservation
- [s] getAllReservation()=> Reservation
- updateReservation(reservation:Reservation)=> boolean
- deleteReservation()=> boolean

