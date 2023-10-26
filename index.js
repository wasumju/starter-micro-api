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
        const echo = { type: 'text', text: "Test Push Message" + event.message.text };
        return client.replyMessage(event.replyToken, echo);
    } else if (event.type === 'message' && event.message.text === 'TestGet') {
        const fetch = require('node-fetch');

        fetch('https://rubber.mju.ac.th/lineapi/api/values/1200')
            .then(response => response.json())
            .then(data => {
                const echo = data; // ดึงข้อมูล JSON จากการเรียก API
                return client.replyMessage(event.replyToken, echo);
            })
            .catch(error => {
                console.error(error);
            });
    } else if (event.type === 'message' && event.message.text === 'วสุ') {
        const echo = {
            'type': 'image',
            'originalContentUrl': 'https://personnel.mju.ac.th/photomju/E801.jpg?strip=all&w=742&quality=100',
            'previewImageUrl': 'https://personnel.mju.ac.th/photomju/E801.jpg?t=2027563652&w=620&h=430'
        };
        return client.replyMessage(event.replyToken, echo);
    } else if (event.type === 'message' && event.message.text === 'Service') {
        var userId = event.source.userId;
        const echo = {
            "type": "flex",
            "altText": "คำร้อง/บริการ",
            "contents": {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "Service Center",
                            "weight": "bold",
                            "color": "#1DB446",
                            "size": "sm"
                        },
                        {
                            "type": "text",
                            "text": "คำร้อง/บริการ",
                            "weight": "bold",
                            "size": "xxl",
                            "margin": "md"
                        },
                        {
                            "type": "separator",
                            "margin": "xxl"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "xxl",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "size": "sm",
                                            "color": "#555555",
                                            "flex": 0,
                                            "text": "ขอใบรายงานผลกิจกรรมเสริมหลักสูตร",
                                            "action": {
                                                "type": "uri",
                                                "label": "action",
                                                "uri": "https://erp.mju.ac.th/"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "size": "sm",
                                            "color": "#555555",
                                            "flex": 0,
                                            "text": "ขอใบรายงานผลกิจกรรมเสริมหลักสูตร",
                                            "action": {
                                                "type": "uri",
                                                "label": "action",
                                                "uri": "https://erp.mju.ac.th/"
                                            }
                                        }
                                    ],
                                    "margin": "md"
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "size": "sm",
                                            "color": "#555555",
                                            "flex": 0,
                                            "text": "ขอใบรายงานผลกิจกรรมเสริมหลักสูตร",
                                            "action": {
                                                "type": "uri",
                                                "label": "action",
                                                "uri": "https://erp.mju.ac.th/"
                                            }
                                        }
                                    ],
                                    "margin": "md"
                                },
                                {
                                    "type": "separator",
                                    "margin": "xxl"
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "margin": "xxl",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "size": "sm",
                                            "color": "#555555",
                                            "flex": 0,
                                            "text": "ขอใบรายงานผลกิจกรรมเสริมหลักสูตร",
                                            "action": {
                                                "type": "uri",
                                                "label": "action",
                                                "uri": "https://erp.mju.ac.th/"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "size": "sm",
                                            "color": "#555555",
                                            "flex": 0,
                                            "text": "ขอใบรายงานผลกิจกรรมเสริมหลักสูตร",
                                            "action": {
                                                "type": "uri",
                                                "label": "action",
                                                "uri": "https://erp.mju.ac.th/"
                                            }
                                        }
                                    ],
                                    "margin": "md"
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "size": "sm",
                                            "color": "#555555",
                                            "flex": 0,
                                            "text": "ขอใบรายงานผลกิจกรรมเสริมหลักสูตร",
                                            "action": {
                                                "type": "uri",
                                                "label": "action",
                                                "uri": "https://erp.mju.ac.th/"
                                            }
                                        }
                                    ],
                                    "margin": "md"
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "คำร้องอื่นๆ (ผู้ดูแลจะพิจารณาส่งเรื่องให้)",
                                            "size": "sm",
                                            "color": "#555555",
                                            "action": {
                                                "type": "uri",
                                                "label": "action",
                                                "uri": "https://erp.mju.ac.th/"
                                            }
                                        }
                                    ],
                                    "margin": "md"
                                }
                            ]
                        },
                        {
                            "type": "separator",
                            "margin": "xxl"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "margin": "md",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "ติดตามคำร้อง/บริการ",
                                    "size": "xs",
                                    "color": "#449d44",
                                    "flex": 0,
                                    "action": {
                                        "type": "uri",
                                        "label": "action",
                                        "uri": "https://erp.mju.ac.th/"
                                    }
                                }
                            ]
                        }
                    ]
                },
                "styles": {
                    "footer": {
                        "separator": true
                    }
                }
            }
        }
        return client.replyMessage(event.replyToken, echo);
    } else if (event.type === 'message' && event.message.text === 'Follow-up') {
        var userId = event.source.userId;
        const echo = {
            "type": "flex",
            "altText": "สถานะงาน",
            "contents": {
                "type": "bubble",
                "size": "mega",
                "header": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "สถานะงาน",
                                    "color": "#ffffff66",
                                    "size": "sm"
                                },
                                {
                                    "type": "text",
                                    "text": "Closed",
                                    "color": "#ffffff",
                                    "size": "lg",
                                    "flex": 4,
                                    "weight": "bold"
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "เช็คเข้าร่วมกิจกรรมซ้ำของบุคลากรผ่าน MJU App",
                                    "color": "#ffffff",
                                    "size": "sm",
                                    "wrap": true
                                }
                            ]
                        }
                    ],
                    "paddingAll": "20px",
                    "backgroundColor": "#727cf5",
                    "spacing": "md",
                    "height": "154px",
                    "paddingTop": "22px"
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "Total: 2 day",
                            "color": "#b7b7b7",
                            "size": "xs"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "filler"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [],
                                            "cornerRadius": "30px",
                                            "height": "12px",
                                            "width": "12px",
                                            "borderColor": "#EF454D",
                                            "borderWidth": "2px"
                                        },
                                        {
                                            "type": "filler"
                                        }
                                    ],
                                    "flex": 0
                                },
                                {
                                    "type": "text",
                                    "text": "Open",
                                    "gravity": "center",
                                    "flex": 2,
                                    "size": "sm",
                                    "color": "#EF454D"
                                },
                                {
                                    "type": "text",
                                    "text": "10/10/2566 14:20",
                                    "size": "sm",
                                    "gravity": "center",
                                    "flex": 4
                                }
                            ],
                            "spacing": "lg",
                            "cornerRadius": "30px",
                            "margin": "xl"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "horizontal",
                                            "contents": [
                                                {
                                                    "type": "filler"
                                                },
                                                {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "contents": [],
                                                    "width": "2px",
                                                    "backgroundColor": "#B7B7B7"
                                                },
                                                {
                                                    "type": "filler"
                                                }
                                            ],
                                            "flex": 1
                                        }
                                    ],
                                    "width": "12px"
                                },
                                {
                                    "type": "text",
                                    "text": "น.ส.ญาณิศา ไชยศรีหา",
                                    "gravity": "center",
                                    "flex": 4,
                                    "size": "xs",
                                    "color": "#8c8c8c"
                                }
                            ],
                            "spacing": "lg",
                            "height": "64px"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "filler"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [],
                                            "cornerRadius": "30px",
                                            "width": "12px",
                                            "height": "12px",
                                            "borderWidth": "2px",
                                            "borderColor": "#e5a54b"
                                        },
                                        {
                                            "type": "filler"
                                        }
                                    ],
                                    "flex": 0
                                },
                                {
                                    "type": "text",
                                    "text": "In-Progress",
                                    "gravity": "center",
                                    "size": "sm",
                                    "flex": 2,
                                    "color": "#e5a54b"
                                },
                                {
                                    "type": "text",
                                    "text": "11/10/2566 10:30",
                                    "gravity": "center",
                                    "flex": 4,
                                    "size": "sm"
                                }
                            ],
                            "spacing": "lg",
                            "cornerRadius": "30px"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "horizontal",
                                            "contents": [
                                                {
                                                    "type": "filler"
                                                },
                                                {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "contents": [],
                                                    "width": "2px",
                                                    "backgroundColor": "#B7B7B7"
                                                },
                                                {
                                                    "type": "filler"
                                                }
                                            ],
                                            "flex": 1
                                        }
                                    ],
                                    "width": "12px"
                                },
                                {
                                    "type": "text",
                                    "text": "นายวสุ ไชยศรีหา",
                                    "gravity": "center",
                                    "flex": 4,
                                    "size": "xs",
                                    "color": "#8c8c8c"
                                }
                            ],
                            "spacing": "lg",
                            "height": "64px"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "filler"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [],
                                            "cornerRadius": "30px",
                                            "width": "12px",
                                            "height": "12px",
                                            "borderWidth": "2px",
                                            "borderColor": "#4bbf73"
                                        },
                                        {
                                            "type": "filler"
                                        }
                                    ],
                                    "flex": 0
                                },
                                {
                                    "type": "text",
                                    "text": "Fixed",
                                    "gravity": "center",
                                    "size": "sm",
                                    "flex": 2,
                                    "color": "#4bbf73"
                                },
                                {
                                    "type": "text",
                                    "text": "11/10/2566 09:20",
                                    "gravity": "center",
                                    "flex": 4,
                                    "size": "sm"
                                }
                            ],
                            "spacing": "lg",
                            "cornerRadius": "30px"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "horizontal",
                                            "contents": [
                                                {
                                                    "type": "filler"
                                                },
                                                {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "contents": [],
                                                    "width": "2px",
                                                    "backgroundColor": "#B7B7B7"
                                                },
                                                {
                                                    "type": "filler"
                                                }
                                            ],
                                            "flex": 1
                                        }
                                    ],
                                    "width": "12px"
                                },
                                {
                                    "type": "text",
                                    "text": "นายวสุ ไชยศรีหา",
                                    "gravity": "center",
                                    "flex": 4,
                                    "size": "xs",
                                    "color": "#8c8c8c"
                                }
                            ],
                            "spacing": "lg",
                            "height": "64px"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "filler"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [],
                                            "cornerRadius": "30px",
                                            "width": "12px",
                                            "height": "12px",
                                            "borderWidth": "2px",
                                            "borderColor": "#313a46"
                                        },
                                        {
                                            "type": "filler"
                                        }
                                    ],
                                    "flex": 0
                                },
                                {
                                    "type": "text",
                                    "text": "Closed",
                                    "gravity": "center",
                                    "size": "sm",
                                    "flex": 2,
                                    "color": "#313a46"
                                },
                                {
                                    "type": "text",
                                    "text": "12/10/2566 09:20",
                                    "gravity": "center",
                                    "flex": 4,
                                    "size": "sm"
                                }
                            ],
                            "spacing": "lg",
                            "cornerRadius": "30px"
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "horizontal",
                                            "contents": [
                                                {
                                                    "type": "filler"
                                                },
                                                {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "contents": [],
                                                    "width": "2px",
                                                    "backgroundColor": "#B7B7B7"
                                                },
                                                {
                                                    "type": "filler"
                                                }
                                            ],
                                            "flex": 1
                                        }
                                    ],
                                    "width": "12px"
                                },
                                {
                                    "type": "text",
                                    "text": "น.ส.ญาณิศา ไชยศรีหา",
                                    "gravity": "center",
                                    "flex": 4,
                                    "size": "xs",
                                    "color": "#8c8c8c"
                                }
                            ],
                            "spacing": "lg",
                            "height": "64px"
                        }
                    ]
                }
            }
        }
        return client.replyMessage(event.replyToken, echo);
    } else if (event.type === 'message' && event.message.text === 'Notify2') {
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
    } else if (event.type === 'message' && event.message.text === 'Notify') {
        var userId = event.source.userId;
        const echo = {
            "type": "flex",
            "altText": "สมัครแจ้งเตือน",
            "contents": {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://erp.mju.ac.th/images/notifylogo.png",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "https://erp.mju.ac.th/lineAccountManage.aspx?lineAccountManage=" + userId + ":" + event.replyToken
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "button",
                            "style": "secondary",
                            "height": "md",
                            "action": {
                                "type": "uri",
                                "label": "สมัครแจ้งเตือน (คลิ๊กที่นี่)",
                                "uri": "https://erp.mju.ac.th/lineAccountManage.aspx?lineAccountManage=" + userId + ":" + event.replyToken
                            },
                            "color": "#8ABE53"
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

        fetch('https://rubber.mju.ac.th/lineapi/api/values', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // สามารถเพิ่ม headers อื่น ๆ ที่ต้องการ
            },
            body: JSON.stringify({
                eventType: event.type,
                userId: event.source.userId,
                replyToken: event.replyToken,
                messageType: event.message.type,
                messageText: event.message.text,
                eventText: ''
            })
        })
            .then(response => response.json()) // สามารถใช้ .text(), .json(), หรือเมธอดอื่น ๆ สำหรับการดึงข้อมูลเป็นรูปแบบที่ต้องการ
            .then(data => {
                console.log(data); // การตอบกลับจากเซิร์ฟเวอร์
            })
            .catch(error => {
                console.error(error);
            });


        //const axios = require('axios');

        //axios
        //    .post('https://rubber.mju.ac.th/lineapi/api/values', {
        //        eventType: event.type,
        //        userId: event.source.userId,
        //        replyToken: event.replyToken,
        //        messageType: event.message.type,
        //        messageText: event.message.text,
        //        eventText: JSON.stringify(event)
        //    })
        //    .then(res => {
        //        console.log(`statusCode: ${res.status}`)
        //        console.log(res)
        //    })
        //    .catch(error => {
        //        console.error(error)
        //        const echo = { type: 'text', text: "error : " + error };
        //        return client.replyMessage(event.replyToken, echo);
        //    });

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
