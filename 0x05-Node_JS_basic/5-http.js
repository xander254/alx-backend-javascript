const fs = require("fs").promises;

function countStudents(path) {
  return fs.readFile(path, "utf-8").then((data) => {
    const lines = data.split("\n").filter((line) => line.trim() !== "");
    const headers = lines.shift().split(",");

    const fieldIndex = headers.indexOf("field");
    const firstNameIndex = headers.indexOf("firstname");

    const studentsByField = {};

    for (const line of lines) {
      const parts = line.split(",");
      const field = parts[fieldIndex];
      const name = parts[firstNameIndex];

      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(name);
    }

    const total = Object.values(studentsByField).reduce(
      (acc, list) => acc + list.length,
      0
    );

    let output = `Number of students: ${total}\n`;
    for (const [field, names] of Object.entries(studentsByField)) {
      output += `Number of students in ${field}: ${
        names.length
      }. List: ${names.join(", ")}\n`;
    }

    return output.trim();
  });
}

module.exports = countStudents;
