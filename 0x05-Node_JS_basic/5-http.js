// Called countStudents (from previous tasks)
function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Read file asynchronously
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(new Error('Cannot load the database'));

      const lines = data.split('\n').filter(line => line.trim() !== '');
      const students = lines.slice(1);
      const fields = {};

      for (const student of students) {
        const [firstName, , , field] = student.split(',');
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstName);
      }

      let result = `Number of students: ${students.length}`;
      for (const field in fields) {
        result += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      }

      resolve(result);
    });
  });
}
