import { Ticketpay } from "./Ticketpay.entity"; 
import { UsersS } from "./user.entity";
import { loginS } from "./login.entity";
import { concert } from "./concert.entity";

const entities = [UsersS,Ticketpay,loginS,concert];

export {UsersS,Ticketpay,loginS,concert};
export default entities;