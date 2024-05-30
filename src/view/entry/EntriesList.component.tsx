import { BoardModel } from "../../BoardModel.ts"
import React, { useEffect, useState } from "react";
import { EntryData } from "../types/EntryData.ts";
import './entry.component.css'

export type EntriesProps ={
    model: BoardModel;
}

export function EntriesList(props: EntriesProps){
    const {model} = props;
    const [entries, setEntries] = useState<readonly EntryData[]>([]);

    useEffect(() =>{
        const syncFluid = () =>{
            const entries: EntryData[] = model.entries;
            setEntries(entries)
        }

        syncFluid();
        model.setChangeListener(syncFluid);
        return () => model.removeChangeListener(syncFluid)
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
                                </div>
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}