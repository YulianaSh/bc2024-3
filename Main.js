const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .option('-i, --input <path>', 'Path to the input file')
  .option('-o, --output <path>', 'Path to the output file')
  .option('-d, --display', 'Display the result in the console');

program.parse(process.argv);
const options = program.opts();


if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);  
}


if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);  
}

let inputData;
try {
  inputData = fs.readFileSync(options.input, 'utf-8');
} catch (err) {
  console.error('Error reading file:', err.message);
  process.exit(1);  }


let jsonData;
try {
  jsonData = JSON.parse(inputData);
} catch (err) {
  console.error('Error parsing JSON:', err.message);
  process.exit(1);  
}

const results = jsonData.map(item => {
  return `${item.StockCode}-${item.ValCode}-${item.Attraction}`;
});

if (options.display) {
  console.log('Displaying results:');
  results.forEach(result => console.log(result));
}

if (options.output) {
  try {
    fs.writeFileSync(options.output, results.join('\n'), 'utf-8');
    console.log(`Results saved to ${options.output}`);
  } catch (err) {
    console.error('Error writing output file:', err.message);
    process.exit(1);  
  }
}

if (!options.display && !options.output) {
  process.exit(0);  
}
