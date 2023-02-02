const event = require('events')

const event_emit=new event.EventEmitter()
event_emit.on('error',(err)=>{
    console.error(err)
})
event_emit.emit('error','helo')

event_emit.once('hello',(name)=>{
    console.log("Hello "+ name);
})

event_emit.emit('hello','akil')
event_emit.emit('hello','savan')

let num_of_listener=event_emit.getMaxListeners()
console.log(num_of_listener);

let count_listener=event_emit.listenerCount('error')

console.log(count_listener);

let no_error=()=>{
    console.log("new listener....");
}

event_emit.addListener('click',no_error)

event_emit.emit('click')
