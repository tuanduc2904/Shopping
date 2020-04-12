# Shopertino

An e-commerce mobile app

## Accepting Credit Cards Payment in your App Using Stripe

### Requirements:

[stripe account](https://stripe.com)

[heroku account](https://heroku.com)

After creating a strip account, you should get a publishable key and a secret key
For test and production mode.
[stripe api keys](https://dashboard.stripe.com/account/apikeys)

Open “src/constant.js” and update it with your stripe publishable key.
Open “stripeServer/.env” and update it with your stripe secret key

#### 1. Deploy a Middleware To Heroku To Use Stripe Payment.

First make sure you have Git and Heroku command installed.

[-install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

[-install Heroku](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

#### 2. Now you have Heroku and Git installed.

Before you can deploy your middleware app to Heroku, you need to initialize a local Git repository and commit your application code to it.

- The following example demonstrates how to initialize a Git repository for your middleware app: stripeServer, that lives in the stripeServer directory:

One after the other, Run command:

```bash
cd stripeServer
git init
git add .
git commit -m "My first commit"
```

“NOTE: Be sure to initialize the Git repository in your app’s root directory. If your app is in a subdirectory of your repository, it won’t run when it is pushed to Heroku.”

#### 3. Next Create a Heroku remote.

“NOTE: You should note that the command bellow will prompt you to press any key to open a browser where you will be required to enter your Heroku account details”

Run command:

```bash
heroku create
```

You should then get a new link for your middleware app on Heroku.
The link should look something like this:

“https://xxxxx-xxxx-xxxxx.herokuapp.com/“

copy this link somewhere.

Open “src/constant.js” and update it with the copied link there.

#### 4. Next, confirm that a remote named heroku has been set for your app:

Run Command:

```bash
git remote -v
```

#### 5. Finally, Deploying your code:

Run Command:

```bash
git push heroku master
```

And that is all. You have your middleware app on heroku now.

## Using Google Pay in your App with stripe

### setup steps for production

- first you will have to request production access [here](https://services.google.com/fb/forms/googlepayAPIenable/)
- After that, Google API team will send you a confirmation mail from "googlepay-api-support@google.com" that they've started processing.
- With approval, Google provides you with instructions for registration and production access to the Google Pay API.
- Google reviews your submitted integration in google's production environment, with the API set to ENVIRONMENT_PRODUCTION (file “src/constant.js” with ANDROID_PAYMENT_MODE update to production), to complete end-to-end transactions.
- With approval, Google provides launch clearance.

for more information, visit [here](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist)

## Using Apple Pay in your App with stripe

### setup steps for production

In order to run Apple Pay on an Apple device (as opposed to a simulator), there's an extra step you need to complete in Xcode. Without completing this step, Apple Pay will say that it is not supported - even if Apple Pay is set up correctly on the device.

- Create a merchant ID.

- Create a Payment Processing certificate.

- Enable Apple Pay in Xcode.

vist [here](https://developer.apple.com/documentation/passkit/apple_pay/setting_up_apple_pay_requirements) to set up all three requirements

- Then, navigate to the Capabilities tab in your Xcode project and turn Apple Pay on. Then, add your Apple Pay Merchant ID to the 'Merchant IDs' section by clicking the '+' icon. Finally, make sure that the checkbox next to your merchant ID is blue and checked off.

## Generate an access token for your shopify storefront

You will need an access token to access your shopify store from your new mobile app.

Generating an access token for your Shopify storefront can be simplified into three simple steps.

1. Login to your Shopify admin dashboard of the store you want to connect.

2. Create an App in shopify to serve as a middleware by filling a simple short form.

3. Copy the generated storefront access token after successfully creating an App.

### To achieve these simple steps, Follow the detailed steps bellow:

- From your Shopify admin dashboard, at the left menu list, go to Apps.

- Click Manage private apps, near the bottom of the page.

![alt manage-private-apps](./assets/readme/manage-private-apps.png)

- Click Create a new private app.

- In the App details section, enter a name for the private app and a contact email address. (Shopify uses the email address to contact the developer if there is an issue with the private app, such as when an API change might break it).

- In the Admin API section, select the areas of your store that you want the app to be able to access.

- Make sure you select **ALLOW** app to access your Storefront data.

![alt allow-storefront-data](./assets/readme/allow-storefront-data.png)

- In the Storefront API permissions section, select which types of data you want to expose to the app.
- Now Click Save, and your storefront access token will be created.

After your access token has been created successfully, you will be routed to a page with different sections:

- App Details.
- Admin API.
- Storefront API.

Scroll to the bottom to see and copy the newly created Storefront access token, and update ".src/contact.js" with this access token.

![alt store-front-access-token](./assets/readme/store-front-access-token.png)
