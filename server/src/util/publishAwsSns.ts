// Load the AWS SDK for Node.js
import AWS from "aws-sdk";
import { ErrnoException } from "../exception/error.interface";
import logger from "../middleware/logger";

// Set region
AWS.config.update({ region: "us-east-1" });

export const publishSNS = ({
  TopicArn,
  Message,
}: AWS.SNS.Types.PublishInput) => {
  logger.info("topic : ", TopicArn + " message: ", Message);
  // Create publish parameters
  const params = {
    Message: Message,
    TopicArn: TopicArn,
  };

  // Create promise and SNS service object
  const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then((data: AWS.SNS.Types.PublishResponse) => {
      logger.info(
        `Message ${params.Message} sent to the topic ${params.TopicArn}`
      );
      logger.info("MessageID is " + data.MessageId);
    })
    .catch((err: ErrnoException) => {
      logger.error(err);
    });
};
