import { db } from '../firebase-util';
import { parse } from 'json2csv';


export function sendEmail(email: any, csv: any) {

  const csvData = [
    {id: 1, value: 1}, {id: 2, value: 2}, {id: 3, value: 3}
  ];

  const csvfile = parse(csvData, ["id", "value"]);

  //for testing purposes change email manually below
  return db.collection('mail').add({
    to: 'jroland16@apu.edu',
    message: {
      subject: 'Hello from Firebase!',
      attachments: [{filename: 'test.csv', content: csvfile }],
    },
  }).then(() => console.log('Queued email for delivery!'));
}