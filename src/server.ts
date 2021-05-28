import * as aws from "aws-sdk";
import axios from "axios";
import Aigle from "aigle";
import { config } from "../configs";

interface MessageBody {
  userId: string;
  achievementId: string;
}

enum Method {
  sqs = "sqs",
  rest = "rest",
}

async function rest(num: number) {
  await Aigle.timesLimit(Number(num), async (i) => {
    const body: MessageBody = {
      userId: "taka",
      achievementId: `a${i}`,
    };
    await axios.post(`${config.restUrl}/achievements`, body);
  });
}

async function sqs(num: number) {
  const client = new aws.SQS({
    region: config.sqs.region,
    endpoint: config.sqs.endpoint,
  });
  const queueUrl = `${config.sqs.urlPrefix}${config.sqs.names.achievementQueue}`;
  await Aigle.timesLimit(Number(num), async (i) => {
    const body: MessageBody = {
      userId: "taka",
      achievementId: `a${i}`,
    };
    await client
      .sendMessage({ QueueUrl: queueUrl, MessageBody: JSON.stringify(body) })
      .promise();
  });
}

async function main() {
  console.time("runTime");
  console.log('START!');
  const [num, method] = process.argv.slice(2);
  const n = Number(num);
  switch (method) {
    case Method.sqs: {
      await sqs(n);
      break;
    }
    case Method.rest: {
      await rest(n);
      break;
    }
  }
  console.log('DONE!');
  console.timeEnd("runTime");
}

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

