import io from "socket.io-client";


 //const ENDPOINT = "https://eboardbackend2022.herokuapp.com/";
const sockets = io("https://eboardbackend2022.herokuapp.com", { autoConnect: true, forceNew: true });
//const sockets = io(ENDPOINT);
export default sockets