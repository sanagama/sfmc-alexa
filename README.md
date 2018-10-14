# What's here?

### A prototype of the Alexa skill for Salesforce Marketing Cloud

## Setup

### 1. Setup API Integration in Marketing Cloud

See [API Integration](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/api-integration.htm) for more details.

#### Add an API Integration component

Add an `API Integration` component in Marketing Cloud.
- Make sure *Perform server-to-server requests* is *checked*.
- Select the appropriate Marketing Cloud scope for your API calls.

#### Put the API Key in Environment Variables

Get the `ClientID` and `ClientSecret` from API Integration component and put in the environment variables below on your local computer:
- `SFMC_API_CLIENTID=YOUR_CLIENTID`
- `SFMC_API_CLIENTSECRET=YOUR_CLIENTSECRET`

See [Get an API Key](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-getting-started.meta/mc-getting-started/get-api-key.htm) for more details.

### 2. Setup local dev environment

The steps below are for MacOS. Modify as needed for your specific operating system.

#### Pre-requisites

Install these on your local computer (skip what you already have!)

- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org/en/download/)
- Download [ngrok](https://ngrok.com/download) and unzip into your `HOME` folder

Next:
- Register for an [AWS Account](https://aws.amazon.com/)
- Register for an [Amazon Developer Account](https://developer.amazon.com/)
- Check out the [Alexa Skills Kit Developer Console](https://developer.amazon.com/alexa/console/ask)
- Install and setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

> *NOTE:* Use the `default` profile when you setup the `ASK CLI`

## Local development

The steps below are for MacOS. Modify as needed for your specific operating system.

### Get the source code

Open a `Terminal` window and type the commands below:
```bash
$ cd ~
$ git clone https://github.com/sanagama/sfmc-alexa.git
```

### Install dependencies
In the `Terminal` window, type the commands below to install Node package dependencies:

```bash
$ cd ~/sfmc-alexa
$ npm install
```

## Run locally on yur computer

During development, it's a pain to have to deploy your intent handler code to AWS Lambda everytime you make a change.

There's a better way! You can connect Alexa to your local development environment and not use AWS Lambda at all. This avoids deploying to AWS Lambda every time you make changes to your intent handler code. Your code changes are available to Alexa instantly.

 This approach is super useful for local debugging & testing, and for demos too!

`ngrok` is the magic sauce that makes all this happen and it's free!

### Here's how this works

- When this prototype starts, it runs a local `Express` server on your computer
- You run `ngrok` on your local computer to get an `HTTPS` endpoint (looks something like `https://XXXXXXXX.ngrok.io`)
- You configure your Alexa skill to connect to this `ngrok` endpoint
- `ngrok` proxies all Alexa requests to your local `Express` server
- Your local `Express` server uses the same Lambda functions to satisfy Alexa intents
- Life is good!

### Open the project in Visual Studio Code

- Launch Visual Studio Code
- Click `Open` and choose the folder `~/sfmc-alexa`
- In VS Code, click `View -> Terminal` to open a `Terminal` window
- In the VS Code `Terminal` window, type `npm install`

### Start `ngrok`

- In the VS Code `Terminal` window, click `+` to start a 2nd `Terminal` window
- In the 2nd `Terminal` window, type `./run-ngrok.sh` (or `./run-ngrok.bat` for Windows)
- This starts `ngrok` and gives you an `HTTPS` endpoint which will proxy all requests to your local server (looks something like `https://XXXXXXXX.ngrok.io`)
- `ngrok` is happily running in this 2nd `Terminal` window. You can switch to other windows as usual

### Update endpoint for the Alexa skill

In the VS Code, open the file `.ask/config` and replace the following line in the `default` section:

```json
"uri": "<whatever is there>",
```

with the `HTTPS` endpoint you got from `ngrok`, e.g.:

```json
"uri": "https://XXXXXXXX.ngrok.io",
```

### Deploy the Alexa skill

- In the VS Code terminal window, switch back to the 1st terminal window
- Type the following command:

```bash
$ npm run-script deploy:skill
```

Alternately, you can do this manually in the [Alexa Skills Kit Developer Console](https://developer.amazon.com/alexa/console/ask) if you wish:

- Go to [your skill's dashboard](https://developer.amazon.com/alexa/console)
- Select `Endpoint`
- Select `HTTPS`
- Enter the HTTPS url from `ngrok`
- For the `SSL certificate type` make sure you select `My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority`

### Start the local `Express` server

- In the VS Code terminal window, switch back to the 1st terminal window
- Type the following command:

```bash
$ npm start
```

This will start the `Express` server locally on your computer. And `nodemon` will automatically transpile and deploy any files you change during development or debugging.

## Deployment

When you're finished with local development, you can use the commands below to deploy to AWS:

```bash
$ cd ~/sfmc-alexa
$ npm install
$ npm run-script deploy
```

## Overview of scripts in package.json

To see the actual commands, check the file `package.json`.

| Command | Description |
| --- | --- |
| `start` | Starts the local `Express` server locall using `nodemon`, so you can call your API endpoints on http://localhost:3000 |
| `clean` | Deletes the `dist` folder |
| `build` | Does `clean` and builds sources (Lambda & local `Express` server) and puts `js` files in the `dist` folder |
| `deploy` | Does `build` and uses `ASK CLI` to deploy everything (skill, model, Lambda) to AWS |
| `deploy:force` | Does `build` and uses `ASK CLI` to deploy everything (skill, model, Lambda) to AWS. Useful if you want to overwrite the model in AWS with your local model if they are different |
| `deploy:lambda` | Does `build` and uses `ASK CLI` to deploy *only* the Lambda function AWS |
| `deploy:skill` | Deploys the skill details for the `default` profile, which also updates the `HTTPS` endpoint that the skill uses |

## Useful resources

- https://github.com/boobo94/alexa-skill-starter-pack-typescript
- https://github.com/Xzya/alexa-typescript-hello-world
- https://medium.com/@cnadeau_/allow-alexa-to-run-your-locally-hosted-skill-1786e3ca7a1b
- https://github.com/balassy/aws-lambda-typescript
- https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Developing-Your-First-Skill.html
- https://ngrok.com/
- https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
- https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html
- https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html


