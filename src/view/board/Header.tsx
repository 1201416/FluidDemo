import { CommandBar,ICommandBarItemProps,Facepile,} from "@fluentui/react";
import { AzureMember } from "@fluidframework/azure-client";
import React from "react";
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
  
  export interface HeaderProps {
    model: BoardModel;
    author: AzureMember;
    members: AzureMember[];
  }
  
  export function Header(props: HeaderProps) {
    const personas = React.useMemo(() => props.members.map(member => {return { personaName: member.userName}}), [props.members]);
  
    const onAddEntry = () => {
     const id = uuidv4();
     console.log(id)
      const newentry: EntryData = {
        id: id,
        numCol: Math.floor(Math.random()* ENTRY_SIZE.height),
        numRow: Math.floor(Math.random()* ENTRY_SIZE.width),
        author: props.author
      };
      console.log("1")
      props.model.SetEntry(id, newentry);
      console.log("2")
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
  