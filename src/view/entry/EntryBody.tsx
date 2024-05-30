import React from "react";
import { TextField } from "@fluentui/react";
import { EntryData } from "../types/EntryData";

export type EntryBodyProps = Readonly<{
  setText(text: string): void;
}> &
  Pick<EntryData, "content">;

export function EntryBody(props: EntryBodyProps) {
  const { setText, content } = props;

  return (
    <div style={{ flex: 1 }}>
      <TextField
        borderless
        multiline
        resizable={false}
        autoAdjustHeight
        onChange={(event) => setText(event.currentTarget.value)}
        value={content}
        placeholder={"Enter Text Here"}
      />
    </div>
  );
}