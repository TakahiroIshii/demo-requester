const localhost = process.env.DOCKER_LOCALHOST || "localhost";
const sqsRegion = process.env.SQS_REGION || "localhost";
const sqsEndPoint = process.env.SQS_ENDPOINT || `http://${localhost}:4566`;
const sqsUrlPrefix =
  process.env.SQS_URL_PREFIX || `http://${localhost}:4566/000000000000/`;

const restUrl = process.env.REST_URL || `http://${localhost}:3333`;

export const config = {
  restUrl,
  sqs: {
    region: sqsRegion,
    endpoint: sqsEndPoint,
    waitTime: 20,
    maxNum: 10,
    urlPrefix: sqsUrlPrefix,
    names: {
      achievementQueue: "achievementQueue",
    },
  },
};
