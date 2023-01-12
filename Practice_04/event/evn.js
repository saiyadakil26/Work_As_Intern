const event=require('events')
const evnemmite=new event.EventEmitter()

const on_error=(code,msg)=>{
    console.log(`Error Occure: ${code} (${msg})`);
}
const on_error1=(code,msg)=>{
    console.log(`Error Occure: ${code} (${msg})`);
}

const f_t=()=>{
    console.log(`Wellcome Here ... `);
}

evnemmite.on('error',on_error)
evnemmite.on('error',on_error1)
evnemmite.once("First_time",f_t)
//evnemmite.emit("First_time")
//evnemmite.removeAllListeners("First_time")
evnemmite.emit("First_time")

// evnemmite.emit('error',404,'Page Not Found')
evnemmite.emit('error',404,'Page Not Found')
console.log(evnemmite.listenerCount('error'));