import io from "socket.io-client";


 //const ENDPOINT = "https://eboardbackend2022.herokuapp.com/";
const sockets = io("http://localhost:3000", { autoConnect: true, forceNew: true });
//const sockets = io(ENDPOINT);
export default sockets