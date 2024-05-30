import { IFluidContainer, ISharedMap, SharedMap } from "fluid-framework";
import { AzureMember } from "@fluidframework/azure-client";
import { EntryData } from "./view/types/EntryData";

const c_entryIdPrefix = "entryId_";
const c_columnPrefix = "numCol_";
const c_rowPrefix = "numRow_";
const c_TextPrefix = "text_";
const c_authorPrefix = "author_"

export type BoardModel = Readonly<{
  CreateEntry(entryId: string, author: AzureMember): EntryData;
  MoveEntryCol(entryId: string, numberCol: number): void;
  MoveEntryRow(entryId: string, numberCol: number): void;
  SetEntry(entryId: string, newCardData: EntryData): void;
  SetEntryContent(entryId: string, entryText: string): void;
  DeleteEntry(entryId: string): void;
  entryIds: string[];
  entries: EntryData[];
  setChangeListener(listener: () => void): void;
  removeChangeListener(listener: () => void): void;
}>;

export function createBoardModel(fluid: IFluidContainer): BoardModel {
  const sharedMap: ISharedMap = fluid.initialObjects.customMap as SharedMap;
  
  if (!sharedMap) {
    console.log(fluid)
    console.log(sharedMap)
    throw new Error("SharedMap is not properly initialized");
  }
  
  const IsDeletedEntry = (entryId: string) => {
    return sharedMap.get(c_entryIdPrefix + entryId) === 0;
  };

  const SetEntryContent = (entryId: string, EntryText: string) => {
    sharedMap.set(c_TextPrefix + entryId, EntryText);
  };

  return {
    CreateEntry(entryId: string, author: AzureMember): EntryData {
      const newEntry: EntryData = {
        id: entryId,
        numCol: sharedMap.get(c_columnPrefix + entryId)!,
        numRow: sharedMap.get(c_rowPrefix + entryId)!,
        content: sharedMap.get(c_TextPrefix + entryId),
        author: sharedMap.get(c_authorPrefix+entryId)!
      };
      return newEntry;
    },

    MoveEntryCol(entryId: string, newCol: number) {
      sharedMap.set(c_columnPrefix + entryId, newCol);
    },
    MoveEntryRow(entryId: string, newRow: number) {
        sharedMap.set(c_rowPrefix + entryId, newRow);
      },

    SetEntry(entryId: string, newCardData: EntryData) {
      sharedMap.set(c_entryIdPrefix + entryId, 1);
      sharedMap.set(c_entryIdPrefix + entryId, 2);
      sharedMap.set(c_entryIdPrefix + entryId, 3);
      sharedMap.set(c_entryIdPrefix + entryId, 4);
      sharedMap.set(c_entryIdPrefix + entryId, 5);
      sharedMap.set(c_entryIdPrefix + entryId, 6);
      sharedMap.set(c_entryIdPrefix + entryId, 7);
      sharedMap.set(c_entryIdPrefix + entryId, 8);
      sharedMap.set(c_entryIdPrefix + entryId, 9);
      sharedMap.set(c_authorPrefix+entryId, newCardData.author);
      if (newCardData.content !== undefined) {
        SetEntryContent(newCardData.id, newCardData.content);
      } else {
        SetEntryContent(newCardData.id, "");
      }
    },

    SetEntryContent,

    DeleteEntry(entryId: string) {
      sharedMap.set(c_entryIdPrefix + entryId, 0);
    },

    get entryIds(): string[] {
      return (
        Array.from(sharedMap
          .keys())
          .filter((key: String) => key.includes(c_entryIdPrefix))
          .map((entryIdWithPrefix) =>
            entryIdWithPrefix.substring(c_entryIdPrefix.length)
          )
          .filter((entryId) =>  !IsDeletedEntry(entryId))
      );
    },

    get entries(): EntryData[] {
        return(
            Array.from(sharedMap.keys())
            .filter((key: string) => key.includes(c_entryIdPrefix))
            .map((idWithPrefix) =>
                idWithPrefix.substring(c_entryIdPrefix.length)
            )
            .filter((entryId) =>
                !IsDeletedEntry(entryId) && sharedMap.get(c_TextPrefix + entryId)
            ).map((id) =>{
                const numCol = sharedMap.get(c_columnPrefix + id)
                const numRow = sharedMap.get(c_rowPrefix + id)
                const content = sharedMap.get(c_TextPrefix + id)
                const author = sharedMap.get(c_authorPrefix + id)

                return{
                    id,
                    numCol,
                    numRow,
                    content,
                    author
                };
            })
        )
    },

    setChangeListener(listener: () => void): void {
      sharedMap.on("valueChanged", listener);
    },

    removeChangeListener(listener: () => void): void {
      sharedMap.off("valueChanged", listener);
    }
  };
}