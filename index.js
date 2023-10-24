'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const res = require('express/lib/response');

// create LINE SDK config from env variables
const config = {
    channelAccessToken: "hkeoYwgWqSK9pzWEy1WpCCj0SisPzr4FBHyGQIxqRFOnrQljLxuAWvEBuMxa4cQMcmbsDjjWvzMFNPcUTj2GG9G6KIuvSN0OUqZRtO/kWTJuqsTzxfHM6IRMFMrzjm/i3fROyaIdDnIXyraa51ofXAdB04t89/1O/w1cDnyilFU=",
    channelSecret: "129c35cbf43f557a66f91370b550dba5",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// Dialogflow
const dialogflow = require('@google-cloud/dialogflow');
const sessionClient = new dialogflow.SessionsClient();
const projectId = 'erp-bot-qmfr';

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

// event handler
async function handleEvent(event) {
    if (event.type === 'follow') {
        const axios = require('axios')

        axios
            .post('https://rubber.mju.ac.th/lineapi/api/values', {
                eventType: event.type,
                userId: event.source.userId,
                replyToken: event.replyToken,
                messageType: event.message.type,
                messageText: event.message.text,
                eventText: JSON.stringify(event)
            })
            .then(res => {
                console.log(`statusCode: ${res.status}`)
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            })
    }

    if (event.type === 'message' && event.message.text === 'แจ้ง') {
        var userId = event.source.userId;
        const echo = { type: 'text', text: "Test Push Message" };
        return client.pushMessage('Ucffe45ba03544411cc13d023c7b57576', echo);

    } else if (event.type === 'message' && event.message.text === 'วสุ') {
        const echo = {
            'type': 'image',
            'originalContentUrl': 'https://personnel.mju.ac.th/photomju/E801.jpg?strip=all&w=742&quality=100',
            'previewImageUrl': 'https://personnel.mju.ac.th/photomju/E801.jpg?t=2027563652&w=620&h=430'
        };
        return client.replyMessage(event.replyToken, echo);

    } else if (event.type === 'message' && event.message.text === 'Notify2') {
        var userId = event.source.userId;
        const echo = {
            "type": "template",
            "altText": "สมัครแจ้งเตือน",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://erp.mju.ac.th/images/bannerline.jpg",
                "title": "เมนู",
                "text": "กดเมนูสมัครรับแจ้งเตือน",
                "actions": [{
                    "type": "uri",
                    "label": "สมัครแจ้งเตือน",
                    "uri": "https://erp.mju.ac.th/lineAccountManage.aspx?lineAccountManage=" + userId + "&replyToken=" + event.replyToken
                }]
            }
        };
        return client.replyMessage(event.replyToken, echo);
    } else if (event.type === 'message' && event.message.text === 'Notify') {
        var userId = event.source.userId;
        const echo = {
            "type": "flex",
            "altText": "สมัครแจ้งเตือน",
            "contents": {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "button",
                            "style": "secondary",
                            "color": "#C5E0B3",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "สมัครแจ้งเตือน (คลิกที่นี่)",
                                "uri": "https://erp.mju.ac.th/lineAccountManage.aspx?lineAccountManage=" + userId + ":" + event.replyToken
                            }
                        }
                    ]
                }
            }
        }
        return client.replyMessage(event.replyToken, echo);
    } else if (event.type === 'message' && event.message.text === 'Setting') {
        const echo = {
            "type": "flex",
            "altText": "ตั้งค่า",
            "contents": {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "button",
                            "style": "primary",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "ตั้งค่า (คลิกที่นี่)",
                                "uri": "https://erp.mju.ac.th/lineSetting.aspx"
                            }
                        }
                    ]
                }
            }
        }
        return client.replyMessage(event.replyToken, echo);
    } else if (event.type === 'message') {
        //try {
        //    const messageText = event.message.text;
        //    const sessionId = event.source.userId;
        //    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        //    const request = {
        //        session: sessionPath,
        //        queryInput: {
        //            text: {
        //                text: messageText,
        //                languageCode: 'en', // Replace with the appropriate language code
        //            },
        //        },
        //    };

        //    const responses = await sessionClient.detectIntent(request);
        //    const result = responses[0].queryResult;

        //    // Handle the response from Dialogflow
        //    const fulfillmentText = result.fulfillmentText;
        //    if (fulfillmentText) {
        //        const replyMessage = { type: 'text', text: fulfillmentText };
        //        return client.replyMessage(event.replyToken, replyMessage);
        //    }
        //} catch (err) {
        //    const replyMessage = { type: 'text', text: err };
        //    return client.replyMessage(event.replyToken, replyMessage);
        //}

        const axios = require('axios');

        axios
            .post('https://rubber.mju.ac.th/lineapi/api/values', {
                eventType: event.type,
                userId: event.source.userId,
                replyToken: event.replyToken,
                messageType: event.message.type,
                messageText: event.message.text,
                eventText: JSON.stringify(event)
            })
            .then(res => {
                console.log(`statusCode: ${res.status}`)
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            });

    } else {
        //try {
        //    const messageText = event.message.text;
        //    const sessionId = event.source.userId;
        //    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        //    const request = {
        //        session: sessionPath,
        //        queryInput: {
        //            text: {
        //                text: messageText,
        //                languageCode: 'en', // Replace with the appropriate language code
        //            },
        //        },
        //    };

        //    const responses = await sessionClient.detectIntent(request);
        //    const result = responses[0].queryResult;

        //    // Handle the response from Dialogflow
        //    const fulfillmentText = result.fulfillmentText;
        //    if (fulfillmentText) {
        //        const replyMessage = { type: 'text', text: fulfillmentText };
        //        return client.replyMessage(event.replyToken, replyMessage);
        //    }
        //} catch (err) {
        //    const replyMessage = { type: 'text', text: err };
        //    return client.replyMessage(event.replyToken, replyMessage);
        //}
    }

}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
