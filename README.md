# CUBE

<b>CUBE is a cross-platform mobile application with a polymorphic UI that expedites the analyzation of satellite telemetry by improving the legibility of data that [CubeSats](https://www.cubesat.org/) return.</b>
<br />
<b>A comprehensive demonstration of the CUBE application can be viewed [here](https://youtu.be/OjAKh25UpT0).</b>
<br />
<br />


<div align="center">
<div align="center" style="display: inline-block;">

<!-- Sign-In Screen -->
<div style="display: inline-block;">
<h2 >Sign-In Screen</h2>
<img src="https://imgur.com/bkKSNxy.jpg" width="275" hspace="5"/>
</div>

<!-- Navigation -->
<div style="display: inline-block;">
<h2>Navigation</h2>
<img src=https://imgur.com/qeo66n0.jpg width="275" hspace="5" float="center"/>
</div>

<div style="display: inline-block;">
<!-- Telemetry -->
<h2 >Telemetry Screen</h2>
<img src=https://i.imgur.com/ATSBzV4.jpg width="275" hspace="5"/>
</div>

</div>

</br>
</br>

<div align="center" style="display: inline-block;">

<div style="display: inline-block;">
<!-- Team Management   -->
<h2 >Team Management Screen</h2>
<img src=https://imgur.com/X9qwb0s.jpg width="275" hspace="5"/>
</div>

<div style="display: inline-block;">
<!-- User Customization Attributes   -->
<h2>User Customization Screen</h2>
<img src=https://imgur.com/WQUo3IV.jpg width="275" hspace="5"/>
</div>
</div>
</div>

</br>
</br>

## Prerequisites

The dependencies for this project are:

- [Node.js](https://nodejs.org/en/)
- [Expo](https://expo.io/)
- [React-Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [Google Cloud Platform](https://cloud.google.com/)

<i>Ensure you have all of these installed before you deploy this repo.</i>
<br />

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

<br />

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

<i>This project is no longer in production and all dependencies are subject to deprecation.</i>

## License

[MIT](LICENSE.txt)
