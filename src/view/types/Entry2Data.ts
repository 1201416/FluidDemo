import { AzureMember, IUser } from "@fluidframework/azure-client";

export type Entry2Data = {
    id: string;
    numCol: number;
    numRow: number;
    content?: string;
    author: IUser;
}