import { auth, db} from '../firebase-util';
import { getTelDBDoc } from '../query-DB';
import { parse } from 'json2csv';
//auth.user.email

export function sendEmail(csv: any) {

  const dataPoints:any = [];
  const CSVFields:any = [];
  let currentFieldVals;
  let currentFieldTimes;

  getTelDBDoc.then(ret => {


    const data = ret.data();

    for(let k = 1; k < data[data.names[0] + "_Times"].length + 1; k++){
      dataPoints.push({ID: k});
    }
    CSVFields.push("ID");


    for(let j = 0; j < data.names.length; j++){
      currentFieldVals = data.names[j] + "_Vals";
      currentFieldTimes = data.names[j] + "_Times";
      CSVFields.push(currentFieldVals);
      CSVFields.push(currentFieldTimes);

      for(let i = 0; i < data[currentFieldVals].length; i++){
        dataPoints[i][currentFieldVals] = data[currentFieldVals][i];
        dataPoints[i][currentFieldTimes] = data[currentFieldTimes][i];
      }
    }
    console.log(dataPoints);
    console.log(CSVFields);

    const csvfile = parse(dataPoints, CSVFields);

    return db.collection('mail').add({
        to: auth.currentUser?.email,
        message: {
          subject: 'Hello from Firebase!',
          text: "Please enjoy your telemetry courtesy of CUBE.",
          attachments: [{filename: 'fox.csv', content: csvfile }],
        },
      }).then(() => console.log('Queued email for delivery!'));
  })

}