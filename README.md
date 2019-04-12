# Shopping
Step 1: $ git clone https://github.com/tuanduc2904/Shopping.git

Step 2: $ cd Shopping

Step 3: $ yarn install

Step 4: Go to the 'android' folder in the project, open the local.properties file to edit 'sdk.dir = / Users / {your users} / Library / Android / sdk'

Step 5: $ react-native run-android || $ react-native run-ios

Note: 
- Nodejs version: v10.15.3
- JDK: jdk1.8.0_201
- Xcode version: 10.2
- (IOS) When running on ios devices, if you get the error 'No bundle URL present', then run 'react-native run-ios' again or completely solve with:
$ "react-native bundle --entry-file index.js - platform ios --dev false --bundle-output ios / main.jsbundle --assets-dest ios" in the project directory.

- (Android)If you get an error the first time you run on an android device, the reason is that the react-native-fetch-blob library is having problems running on an Android device. If you get an error on your Android device, run react-native run-android for the second time, when all problems will be resolved.

