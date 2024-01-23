
export function generateReport(patient) {
  
  return `
    <html>
      <head>
        <style>
          /* Define the CSS styles for the report */
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .header h1 {
            margin: 0;
            font-size: 28px;
            color: #0077b6;
          }

          .header img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          }

          .info {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }

          .info h2 {
            margin: 0;
            font-size: 20px;
            color: #0077b6;
            width: 100%;
          }

          .info p {
            margin: 0;
            font-size: 16px;
            color: #333333;
            width: 50%;
          }

          .info img {
            width: 100%;
            margin-top: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>EzyCare Report</h1>
            <img src='${patient?.imgUrl}' alt="Patient Image">
          </div>

          <div class="info">
            <h2>Patient Information</h2>
            <p>Name: ${patient.name}</p>
            <p>Date of Birth: ${patient.dateOfBirth}</p>
            <p>Blood Group: ${patient.bloodGroup}</p>
            <p>Contact Number: ${patient.contactNumber}</p>
            <p>Address: ${patient.address}</p>
          </div>

        </div>
      </body>
    </html>
  `;
}