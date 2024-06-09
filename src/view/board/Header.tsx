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
  
    const items: ICommandBarItemProps[] = [
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
  