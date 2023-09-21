// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

// Set region
AWS.config.update({ region: "us-east-1" });

export const publishSNS = ({ topic, message }: any) => {
  console.log("topic : ", topic + " message: ", message);
  // Create publish parameters
  var params = {
    Message: message,
    TopicArn: topic,
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then((data: any) => {
      console.log(
        `Message ${params.Message} sent to the topic ${params.TopicArn}`
      );
      console.log("MessageID is " + data.MessageId);
    })
    .catch((err: any) => {
      console.error(err, err.stack);
    });
};
