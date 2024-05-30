import { IStyle, mergeStyles, ThemeProvider } from "@fluentui/react";
import { AzureMember } from "@fluidframework/azure-client";
import React, {useRef} from "react";
import { BoardModel } from "../../BoardModel.ts";
import { EntryData } from "../types/EntryData";
import { useDrop } from "react-dnd"
import { lightTheme } from "../../Themes.ts";
import { Entry } from "./Entry.tsx";

export type EntryProps = Readonly<{
  entries: EntryData[]
  model: BoardModel;
  author: AzureMember;
}>;

export function EntrySpace(props: EntryProps) {
  const { model } = props;
  const [entries, setEntries] = React.useState<readonly EntryData[]>([]);

  React.useEffect(() => {
    if(entries.length!==0){
    const syncLocalAndFluidState = () => {
      const entryData: EntryData[] = [];
      const ids: string[] = model.entryIds;

      for (let entryId of ids) {
        const newCardData: EntryData = model.CreateEntry(entryId, props.author);
        entryData.push(newCardData);
      }
      setEntries(entryData);
    };

    syncLocalAndFluidState();
    model.setChangeListener(syncLocalAndFluidState);
      return () => model.removeChangeListener(syncLocalAndFluidState);
    }
  }, [model]);

  const rootStyle: IStyle = {
    flexGrow: 1,
    position: "relative",
    margin: "10px",
    borderRadius: "2px",
  };

  const spaceClass = mergeStyles(rootStyle);

  const [, drop] = useDrop(() => ({
    accept: 'entry',
    drop(item: any, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()!;
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      model.MoveEntryCol(item.id, 
        top
      )
      model.MoveEntryRow(item.id,
        left
      )
      return undefined;
    },
  }), [model]);
  
  const dropRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <div id="Entry" ref={dropRef} className={spaceClass}>
      <ThemeProvider theme={lightTheme}>
        {entries.map((entry) => {
          const setColumn = (position: number) => {
            model.MoveEntryCol(entry.id, position);
          };

          const setRow = (position: number) => {
            model.MoveEntryRow(entry.id, position);
          };

          const setText = (text: string) => {
            model.SetEntryContent(entry.id, text);
          };

          const onDelete = () => {
            model.DeleteEntry(entry.id);
          };

          return (
            <Entry
              {...entry}
              id={entry.id}
              key={entry.id}
              user={props.author}
              setColumn={setColumn}
              setRow={setRow}
              onDelete={onDelete}
              setText={setText}
            />
          );
        })}
      </ThemeProvider>
    </div>
  );
}