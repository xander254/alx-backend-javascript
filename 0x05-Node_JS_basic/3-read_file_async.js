const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const lines = data.split('\n').filter(line => line.trim() !== '');

      if (lines.length === 0) {
        throw new Error('Cannot load the database');
      }

      const headers = lines[0].split(',');
      const fieldIndex = headers.indexOf('field');
      const nameIndex = headers.indexOf('firstname');

      const studentsByField = {};
      let total = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;

        const parts = line.split(',');
        const field = parts[fieldIndex];
        const name = parts[nameIndex];

        if (field && name) {
          total += 1;
          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(name);
        }
      }

      console.log(`Number of students: ${total}`);
      for (const field in studentsByField) {
        const names = studentsByField[field].join(', ');
        console.log(
          `Number of students in ${field}: ${studentsByField[field].length}. List: ${names}`
        );
      }
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;