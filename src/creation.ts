/** 
import { SharedMap,  MapFactory } from "fluid-framework";
import { TinyliciousClient } from "@fluidframework/tinylicious-client";
import { containerSchema } from "./fluid";

const client = new TinyliciousClient()

const sf = new MapFactory();

const CreateEntry = async () =>{
    const {container, services} = await client.createContainer(containerSchema)
    const board = container.
}
*/