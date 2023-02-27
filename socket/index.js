import { Server } from 'socket.io';
let onlineUsers = []
const io = new Server({cors:{
    origin:'*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
 }})

 io.on("connection", (socket)=>{
    console.log("new connection", socket.id);

    socket.on("addNewUser",(userId)=>{
        !onlineUsers.some(user=> user.userId===userId) &&
        onlineUsers.push({
            userId,
            socketId: socket.id
        })
        console.log("online users", onlineUsers);
    })

    socket.emit("getOnlineUsers", onlineUsers)

 })

 io.listen(3000)