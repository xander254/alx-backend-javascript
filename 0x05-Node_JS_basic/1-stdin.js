process.stdout.write("Welcome to ALX, what is your name?\n");

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data) => {
  const name = data.trim();
  process.stdout.write(`Your name is: ${name}\n`);
});

process.stdin.on("end", () => {
  process.stdout.write("This important software is now closing\n");
});

process.on("SIGINT", () => {
  process.stdout.write("\nThis important software is now closing\n");
  process.exit(0);
});
