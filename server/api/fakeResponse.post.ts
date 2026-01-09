export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig()
    console.log(runtimeConfig.nuxtDatabricksConnection)
    const body = await readBody(event)
    const exampleBody = {
        input: [
            {
                role: "user",
                content: "Hi, I need help finding compatible parts for my bike"
            }
        ],
        custom_inputs: {
            thread_id: "6783ed27-2c01-4a5c-bf09-72c4a38dd572"
        }
    }
    try{
        const result : DatabricksResponse = await $fetch('https://dbc-46e171e7-fc89.cloud.databricks.com/serving-endpoints/dev_kmock_compatibility_agent_compat_endpoint/invocations', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from('token' + ':' + runtimeConfig.nuxtDatabricksConnection).toString('base64')}`
            },
            body: exampleBody 
        })
        
        console.log(result)

        return mapDatabricksResponseMessage(result)
    } catch(e){
        console.error(e)
        throw createError('error communicating with chat api')
    }
    /* return {
        message:  '## Hi From the Server \n\nIt is working!' ,
        buttons: {title: 'button title', action: 'hover'},
        chips: ['yes', 'no']
    } */
})