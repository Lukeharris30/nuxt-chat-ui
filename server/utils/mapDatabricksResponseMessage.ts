import type { MessageResponseMapped, DatabricksResponse} from "~~/shared/types/messages"

export const mapDatabricksResponseMessage = (DatabricksResponse: DatabricksResponse) => {
   return {
    message: DatabricksResponse.output[0].content[0].text || 'error in the message mapping', 
    buttons: [{title: 'fakeButton', action: 'fakeType'}] ,
    chips: ['yes', 'no'],
   } as MessageResponseMapped 
}