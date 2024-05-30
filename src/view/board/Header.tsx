import { CommandBar,ICommandBarItemProps,Facepile,} from "@fluentui/react";
import { AzureMember } from "@fluidframework/azure-client";
import React, { useEffect } from "react";
import { BoardModel } from "../../BoardModel";
import { EntryData } from "../types/EntryData.ts";
import { uuidv4 } from '../../utils.ts';

export const ENTRY_SIZE = {
    width: 300,
    height: 100
}
export const DefaultColor ={
    base: "#0078D4", dark: "#99C9EE", light: "#CCE4F6"
}
export const NOTE_SIZE = {
    width: 250,
    height: 75
  }
  export interface HeaderProps {
    model: BoardModel;
    author: AzureMember;
    members: AzureMember[];
  }
  
  export function Header(props: HeaderProps) {
    const personas = React.useMemo(() => props.members.map(member => {return { personaName: member.userName}}), [props.members]);
  
    const {model} = props

    const onAddEntry = () => {
        const id = uuidv4();
    
        const newentry: EntryData = {
          id: id,
          position: {
            x: Math.floor(Math.random() * (300 - NOTE_SIZE.width)),
            y: Math.floor(Math.random() * (80 - NOTE_SIZE.height)),
          },
          author: props.author
        };
        model.SetEntry(id, newentry);
        model.entryIds.push(id);
    };

    const items: ICommandBarItemProps[] = [
      {
        key: "add",
        text: "Add entry",
        onClick: onAddEntry
      }
    ];
  
    const farItems: ICommandBarItemProps[] = [
      {
        key: "presence",
        onRender: () => <Facepile
        styles={{ root: { alignSelf: "center" } }}
        personas={personas}
      />,
      },
    ];
    return (
      <CommandBar
        styles={{ root: { paddingLeft: 0 } }}
        items={items}
        farItems={farItems}
      />
    );
  }
  