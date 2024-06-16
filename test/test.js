const fs = require('fs');

// Read the contents of the file
fs.readFile('phone_models.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the file contents into an array of lines
  const lines = data.split('\n');

  // Initialize the CSV string with a header row
  let csv = 'Brand,Model,Case Material\n';

  // Iterate over each line and extract brand and models
  lines.forEach(line => {
    const [brand, ...models] = line.trim().split(' / ');
    
    // Add an entry for each model with "Soft Case" as the case material
    models.forEach(model => {
      csv += `"${brand}","${model}","Soft Case"\n`;
    });
  });

  // Print or save the CSV output as needed
  console.log(csv);
});
