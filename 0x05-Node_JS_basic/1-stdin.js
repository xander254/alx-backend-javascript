process.stdout.write("Welcome to ALX, what is your name?\n");

process.stdin.setEncoding("utf8");

process.stdin.on("data", (input) => {
  const name = input.trim();
  console.log(`Your name is: ${name}`);
});

process.on("SIGINT", () => {
  process.stdout.write("\nThis important software is now closing\n");
  process.exit();
});

process.on("exit", () => {
  process.stdout.write("This important software is now closing\n");
});
