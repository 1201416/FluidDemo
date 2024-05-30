import { AzureMember } from "@fluidframework/azure-client";
import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { EntryData } from "../types/EntryData";
import { EntryBody } from "./EntryBody.tsx";
  
  
  export type EntryProps = Readonly<{
    id: string;
    user: AzureMember;
    setColumn: (position: number) => void;
    setRow: (position: number) => void;
    onDelete: () => void;
    setText: (text: string) => void;
  }> &
    Pick<
      EntryData,
      | "id"
      | "numCol"
      | "numRow"
      | "content"
      | "author"
    >;
  
  export function Entry(props: EntryProps) {
    const {
      id,
      numCol,
      numRow,
      setText,
      content
    } = props;

    return (
      <div className='root-class' style={{ }}>
        <EntryBody setText={setText} content={content}/>
      </div>
    );
  }