import type { MessageContent } from "deep-chat/dist/types/messages"
import { mapMessageContentToDbRequest } from "../utils/mapMessageContentToDbRequest"
export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig()
    const body : MessageContent = await readBody(event)
    const dbRequest = mapMessageContentToDbRequest(body)
    
    try{
        const result : DatabricksResponse = await $fetch('https://dbc-46e171e7-fc89.cloud.databricks.com/serving-endpoints/dev_kmock_compatibility_agent_compat_endpoint/invocations', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from('token' + ':' + runtimeConfig.nuxtDatabricksConnection).toString('base64')}`
            },
            body: dbRequest
        })
        
        return {message: mapDatabricksResponseMessage(result), ownedBikes: result.custom_outputs?.owned_bikes}
    } catch(e){
        console.error(e)
        throw createError('error communicating with chat api')
    }
})