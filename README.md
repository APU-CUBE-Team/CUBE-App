# CUBE

CUBE is a cross-platform mobile application with a polymorphic UI that expedites the analyzation of satellite telemetry by improving the legibility of data that [CubeSats](https://www.cubesat.org/) return.

Team-Oriented Accounts  
![img](https://imgur.com/bkKSNxy.jpg)

Telemetry Visuals  
![img](https://i.imgur.com/ATSBzV4.jpg)

User-Oriented Team Management  
![img](https://imgur.com/X9qwb0s.jpg)

Adjustable User Attributes  
![img](https://imgur.com/WQUo3IV.jpg)

## Prerequisites

The dependencies for this project are:

- [Node.js](https://nodejs.org/en/)
- [Expo](https://expo.io/)
- [React-Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [Google Cloud Platform](https://cloud.google.com/)

Ensure you have all of these installed before you deploy this repo.

## Installation

Clone the repository to your local directory

```bash
git pull https://github.com/APU-CUBE-Team/CUBE-App.git
```

Install npm packages.

```bash
npm i
```

or

```
npm install
```

## Usage

For firebase, you will need to create a new project through their site. Then, from the console of that project, you'll find the required firebase configuration, which you'll add to your local directory create this file:
`src/util/firebase-util/index.tsx`  
<span style="color: orange;"> ⚠️ Make sure this file is listed in the _.gitignore_ on your branch. Failure to do this will leave your project unsecure.⚠</span>

```typescript
import * as firebase from "firebase";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "API_KEY_HERE",
  authDomain: "AUTH-DOMAIN-HERE",
  projectId: "PROJECT-ID-HERE",
  storageBucket: "STORAGE-BUCKET-HERE",
  messagingSenderId: "MESSAGING-SENDER-ID-HERE",
  appId: "APP-ID-HERE",
};

export const db = firebase.firestore();
export const auth = firebase.auth();
```

Navigate to the project directory via your command shell. Then, type the following to deploy:

```bash
expo start
```

## Contributing

This project is no longer in production and all dependencies are subject to deprecation.

## License

[MIT](LICENSE.txt)
