import { AzureMember, IUser } from "@fluidframework/azure-client";

export type EntryData = {
    id: string;
    numCol: number;
    numRow: number;
    content?: string;
    author: AzureMember;
}