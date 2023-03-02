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
        io.emit("getOnlineUsers", onlineUsers)
    });

    socket.on("sendMessage",(message)=>{
        const user = onlineUsers.find((user)=> user.userId === message.recipientId)
        if(user){
            // console.log(message);
            io.to(user.socketId).emit("getMessage", message)
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date()
            })
        }
    })
    socket.on("disconnect", ()=>{
        onlineUsers = onlineUsers.filter(user=> user.socketId !== socket.id)

        io.emit("getOnlineUsers", onlineUsers)
    })




 })

 io.listen(3000)