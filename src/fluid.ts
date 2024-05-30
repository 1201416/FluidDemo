import { SharedMap } from "@fluidframework/map";
import { AzureClientProps, AzureRemoteConnectionConfig,AzureLocalConnectionConfig} from "@fluidframework/azure-client"
import { InsecureTokenProvider } from "@fluidframework/test-runtime-utils"
import { generateUser}  from "./utils.ts"


export const useAzure = "azure";
export const user = generateUser();

export const containerSchema = {
    initialObjects: {
        entries: SharedMap
    }
}

export const connectionConf : AzureRemoteConnectionConfig = {
    tenantId: "ce6aea34-ec90-4574-b685-0ce8edae1dbf",
    tokenProvider: new InsecureTokenProvider("b0de38d2f20929c7a92cb3e826e52c39", user),
    endpoint: "https://eu.fluidrelay.azure.com",
    type: "remote"
}
export const connectionConf2 : AzureLocalConnectionConfig = {
    tokenProvider: new InsecureTokenProvider("goofball", user),
    endpoint: "http://localhost:3000",
    type: "local"
}
export const connectionConfig: AzureClientProps = useAzure ? { 
    connection : connectionConf
} : { 
    connection : connectionConf2
};