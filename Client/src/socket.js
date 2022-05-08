import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
 //const sockets = io('http://localhost:3000', { autoConnect: true, forceNew: true });
const sockets = io.connect(ENDPOINT);
export default sockets