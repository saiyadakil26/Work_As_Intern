const cluster = require('node:cluster');

if (cluster.isPrimary) {
    const worker = cluster.fork();
    // cluster.fork();
    // cluster.fork();
    worker.on('data',(data)=>{
      console.log(data);
    })
    worker.on('exit', (code, signal) => {
      if (signal) {
        console.log(`worker was killed by signal: ${signal}`);
      } else if (code !== 0) {
        console.log(`worker exited with error code: ${code}`);
      } else {
        console.log('worker success!');
      }
    });
  }else{
    console.log("Hello from worker "+process.pid);
  }