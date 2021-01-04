import { InfrastructureRocket } from '@boostercloud/framework-provider-aws-infrastructure'
import { MQTTBridgeStack} from './mqtt-bridge'
import { MQTTBridgeParams } from './types'

const MQTTBridge = (params: MQTTBridgeParams): InfrastructureRocket => ({
  mountStack: MQTTBridgeStack.mountStack.bind(null, params),
  unmountStack: MQTTBridgeStack.unmountStack.bind(null, params),
})

export default MQTTBridge
