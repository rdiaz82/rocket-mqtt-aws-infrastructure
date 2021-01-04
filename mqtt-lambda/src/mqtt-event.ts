import { v1 as uuid } from 'uuid'

class EventData {
  measurementId: string
  topic: string
  data: string
  timestamp: string
  constructor(uuid:string, topic:string, data: string, timestamp: string) {
    this.measurementId = uuid
    this.topic = topic
    this.data = data
    this.timestamp = timestamp
  }
}

export class MqttEventEnvelope {
  typeName: string
  version: number
  kind: string
  entityID: string
  entityTypeName: string
  value: EventData
  createdAt: string
  requestID: string
  entityTypeName_entityID_kind:string
  
  constructor(topic: string, data: string) {
    const uid = uuid()
    const timestamp = new Date().toISOString()
    this.typeName = 'MeasurementCreated'
    this.version = 1
    this.kind = 'event'
    this.entityID = uid
    this.entityTypeName = 'Measurement'
    this.value = new EventData(uid, topic, data, timestamp)
    this.createdAt = timestamp
    this.requestID= uuid()
    this.createdAt  = timestamp,
    this.entityTypeName_entityID_kind = this.partitionKeyForEvent(this.entityTypeName,this.entityID,this.kind)
  }

  private partitionKeyForEvent(
    entityTypeName: string,
    entityID: string,
    kind: string
  ): string {
    return `${entityTypeName}-${entityID}-${kind}`
  }
  
}