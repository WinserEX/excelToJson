// Declare an empty array to store the JSON data
let jsonArray = [
    
];

// Function to convert an Excel file to JSON
function excelToJson(file) {
  // Create a new FileReader object
  let reader = new FileReader();
  
  // Define a callback function to be executed when the file has been read
  reader.onload = function(e) {
    // Get the data as a binary string
    let data = e.target.result;
    
    // Parse the data with the readAsBinaryString method
    let workbook = XLSX.read(data, { type: 'binary' });
    
    // Get the first worksheet in the workbook
    let firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Convert the worksheet to JSON
    let json = XLSX.utils.sheet_to_json(firstSheet);

    json.forEach(function(item) {
        // Check if the item has a date property
        if (item.birthDate) {
          //verify date format
          
          function getDateFormat(date) {
            console.log(date);

            if(typeof date === 'string') {
              let vDate = date.replace('/', '-');
              if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(vDate)) {
                console.log(`1st ${vDate}`);
                return 'MM-DD-YYYY';
              } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(vDate)) {
                console.log(`1st ${vDate}`);
                return 'YYYY-MM-DD';
              } else if (/^\d{2}-\d{3}$/.test(vDate)) {
                console.log(`1st ${vDate}`);
                return 'YY-DDD';
              } else if (/^\d{3}-\d{2}$/.test(vDate)) {
                console.log(`1st ${vDate}`);
                return 'DDD-YY';
              } else if (/^\d{1,2}-\d{1,2}-\d{2}$/.test(vDate)) {
                console.log(`1st ${vDate}`);
                return 'DD-MM-YYYY';
              } else {
                console.log(`1st ${vDate}`);
                return 'Invalid format';
              }
            }else{
              let vDate = date.toString();
              if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(vDate)) {
                console.log(vDate);
                return 'MM-DD-YYYY';
              } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(vDate)) {
                console.log(vDate);
                return 'YYYY-MM-DD';
              } else if (/^\d{2}-\d{3}$/.test(vDate)) {
                console.log(vDate);
                return 'YY-DDD';
              } else if (/^\d{3}-\d{2}$/.test(vDate)) {
                console.log(vDate);
                return 'DDD-YY';
              } else if (/^\d{1,2}-\d{1,2}-\d{2}$/.test(vDate)) {
                console.log(vDate);
                return 'DD-MM-YYYY';
              } else {
                console.log(vDate);
                return 'Invalid format';
              }
            }
            //Tests
            
          }
          
          let dateFormat = getDateFormat(item.birthDate)
          // Parse the date using moment.js
          let date = moment(item.birthDate, dateFormat);
          
          // Format the date using the format() method
          item.birthDate = date.format('MM/DD/YYYY');
        }
      });
    
    // Add the JSON data to the array
    jsonArray = jsonArray.concat(json);
    
    // Do something with the array
    console.log(jsonArray);

    // Select the element where the data will be rendered
    const container = document.getElementById('container');

    // Create an HTML template for each element in the array
    const html = jsonArray.map(item => `
    <div class="item">
        <h2>${item.name}</h2>
        <p>Birthdate: ${item.birthDate}</p>
    </div>
    `).join('');

    // Render the HTML in the container element
    container.innerHTML = html;
}
  
  // Read the file as a binary string
  reader.readAsBinaryString(file);
}

// Add a change event listener to the file input element
document.getElementById('fileInput').addEventListener('change', function(e) {
  // Get the uploaded file
  let file = e.target.files[0];
  
  // Check if the file is an Excel file
  if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    // Convert the file to JSON
    excelToJson(file);
  } else {
    // Display an error message
    console.error('The file must be an Excel file.');
  }

});



