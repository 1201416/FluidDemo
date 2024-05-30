import { IUser } from "@fluidframework/azure-client";
import { Entry2Data } from "./Entry2Data";

export interface DataModel {
    getUsers: () => IUser[];
    getUser: () => IUser;
    addUser: () => void;
    getEntriesFromBoard: () => Entry2Data[];
    createEntry: (text: string) => void;
    on(event: "change", listener: () => void): this;
    off(event: "change", listener: () => void): this;
}