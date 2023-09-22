import { Ticketpay } from "./Ticketpay.entity"; 
import { UsersS } from "./user.entity";
import { loginS } from "./login.entity";
import { concert } from "./concert.entity";
import { TicketpayAll } from "./TicketpayAll.entity";
import { Ticketforbuyer } from "./Ticketforbuyer.entity";
const entities = [UsersS,Ticketpay,loginS,concert,TicketpayAll,Ticketforbuyer];

export {UsersS,Ticketpay,loginS,concert,TicketpayAll,Ticketforbuyer};
export default entities;