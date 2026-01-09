export interface ButtonData {
    title: string,
    action: string
}
export interface MessageResponseMapped {
    message: string,
    buttons: ButtonData[],
    chips: string[]
}
export interface DatabricksMessage {
    text: string,
    type: string
}
export interface DatabricksOutputObject {
    content: DatabricksMessage[]
}
export interface DatabricksResponse {
    customOutputs: {
        currentStep: string,
        ownedBikes: any,
        ownedParts: any,
        selectedParts: any,
        thread_id: string
    },
    databricks_output: {
        role: string,
        type: string
    }
    id: string,
    output: DatabricksOutputObject[],
}
export interface DataBricksInput {
    role: string,
    content: string,
}
export interface DatabricksRequestBody {
    input: DataBricksInput[],
    custom_inputs: {
        thread_id: string
    }
}

export { }