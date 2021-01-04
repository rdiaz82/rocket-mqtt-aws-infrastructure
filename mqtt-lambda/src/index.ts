import { DynamoDB } from "aws-sdk"
import { MqttEventEnvelope } from "./mqtt-event";

async function storeEvents(eventStore: string,eventEnvelope: MqttEventEnvelope): Promise<void> {
  const params = {
    TableName: eventStore,
    Item: eventEnvelope,
  }
  const dynamoDB = new DynamoDB.DocumentClient();
  await dynamoDB
    .put(params, function(err, data) {
      if (err) {
        console.log('Error', err)
      } else {
        console.log('Success', data)
      }
    })
    .promise()
}

exports.handler = async function(event:any): Promise<any> {
  //Init stuff
  const topic = process.env['topic'] ||''
  const eventStore = process.env['eventStore'] || ''
  //Prepare Data
  const envelope = new MqttEventEnvelope(topic, JSON.stringify(event))
  //Create the event!!
  await storeEvents(eventStore, envelope)
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `data saved`
  };
};