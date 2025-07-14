process.stdout.write("Welcome to ALX, what is your name?\n");
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  const name = data.trim();
  console.log(`Your name is: ${name}`);
});

process.stdin.on("end", () => {
  console.log("This important software is now closing");
});
