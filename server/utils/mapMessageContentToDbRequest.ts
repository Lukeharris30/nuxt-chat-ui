import type { DatabricksRequestBody } from "~~/shared/types/messages";
import type { MessageContent } from "deep-chat/dist/types/messages";

export const mapMessageContentToDbRequest = (userMessages: MessageContent[]) => {
    return {
        input: userMessages.messages.map(m => {
            return {
                role: m.role,
                content: m.text
            }
        }
        ),
        custom_inputs: {
            thread_id: '6783ed27-2c01-4a5c-bf09-72c4a38dd572' 
        }
    } as DatabricksRequestBody
}