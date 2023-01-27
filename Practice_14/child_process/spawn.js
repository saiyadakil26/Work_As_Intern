const { spawn,exec,execFile } = require('child_process');
// const bat = spawn('node',['-v'],{cwd:__dirname}); // shell:true
const bat = spawn('command.bat');

bat.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

bat.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

bat.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});