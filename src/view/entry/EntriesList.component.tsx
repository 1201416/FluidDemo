import { BoardModel } from "../../BoardModel.ts"
import React, { useEffect, useState } from "react";
import { EntryData } from "../types/EntryData.ts";

export type EntriesProps ={
    model: BoardModel;
}

export function EntriesList(props: EntriesProps){
    const {model} = props;
    const [entries, setEntries] = useState<readonly EntryData[]>([]);

    useEffect(() =>{
        if(entries.length!==0){
        const syncFluid = () =>{
            const entries: EntryData[] = model.entries;
            setEntries(entries)
        }

        syncFluid();
        model.setChangeListener(syncFluid);
        return () => model.removeChangeListener(syncFluid)
        }
    }, [model])

    return(
        <div className="board-grid">
            {!!entries.length &&
                <ul>
                    {entries.map((entry, i) => {
                        return (
                            <li key={i}>
                                <div className="board-entry">
                                    <div className="left selecteditem">{entry.content}</div>
                                    <div className="right end mr-15">
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            }
            {entries.length === 0 &&
                <div className="selecteditem ml-10 pb-5">No notes selected</div>
            }
        </div>
    )
}