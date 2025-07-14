const fs = require("fs");

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, "utf8");
    const lines = data.split("\n").filter((line) => line.trim() !== "");

    const students = lines.slice(1);
    const fields = {};

    for (const student of students) {
      const parts = student.split(",");
      const firstName = parts[0];
      const field = parts[parts.length - 1];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    }

    console.log(`Number of students: ${students.length}`);
    for (const field in fields) {
      const names = fields[field];
      console.log(
        `Number of students in ${field}: ${names.length}. List: ${names.join(
          ", "
        )}`
      );
    }
  } catch (err) {
    throw new Error("Cannot load the database");
  }
}

module.exports = countStudents;
