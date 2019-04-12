# Shopping
Step 1: $ yarn install

Step 2: Go to the Android folder in the project, open the local.properties file to edit 'sdk.dir = / Users / {your users} / Library / Android / sdk'

Step 3: $ react-native run-android || && react-native run-ios

Note: If you get an error the first time you run on an android device, the reason is that the react-native-fetch-blob library is having problems running on an Android device. If you get an error on your Android device, run react-native run-android for the second time, when all problems will be resolved.
