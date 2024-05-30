import React, { useEffect, useState, useCallback} from 'react';
import { AzureContainerServices } from "@fluidframework/azure-client";
import { IFluidContainer } from "fluid-framework";
import { BoardModel, createBoardModel } from '../../BoardModel.ts';
import { EntriesList } from '../entry/EntriesList.component.tsx';
import { EntrySpace } from '../entry/EntrySpace.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from './Header.tsx';
import { EntryData } from '../types/EntryData.ts';
import { Entry2Data } from '../types/Entry2Data.ts';
interface BoardOpenedComponentProps {
  container: IFluidContainer;
  services: AzureContainerServices;
}

const BoardOpenedComponent: React.FC<BoardOpenedComponentProps>=(props: {container: IFluidContainer, services: AzureContainerServices})=>{
  const { container, services } = props;
  const [model] = useState<BoardModel>(() => {
    return createBoardModel(container);
  });
  const audience = services.audience;
  const [members, setMembers] = useState(Array.from(audience.getMembers().values()));
  const authorInfo = audience.getMyself();
  const [entries, setEntries] = useState<EntryData[]>([]);

  const setMembersCallback = useCallback(() => setMembers(
    Array.from(
      audience.getMembers().values()
    )
  ), [setMembers, audience]);

  useEffect(() => {
    const syncFluid = () => {
      const entries: EntryData[] = [];
      for (let i = 0; i < 9; i++) {
        const entry: EntryData = {
          id: `entry-${i}`,
          numCol: i % 3,
          numRow: Math.floor(i / 3),
          content: "", // Assume getEntryContent is a method in BoardModel
          author: authorInfo!,
        };
        entries.push(entry);
      }
      setEntries(entries);
    };

    if (entries.length === 0) {
      syncFluid();
    }

    model.setChangeListener(syncFluid);
    return () => model.removeChangeListener(syncFluid);
  }, [model, authorInfo, entries.length]);
  
  useEffect(() => {
      container.on("connected", setMembersCallback);
      audience.on("membersChanged", setMembersCallback);
      return () => {
          container.off("connected", () => setMembersCallback);
          audience.off("membersChanged", () => setMembersCallback);
      };
    }, [container, audience, setMembersCallback]);

  return (
    <div>
      <h1>{"BOARD DEVSCOPE"}</h1>
      <Header
        model={model}
        author={authorInfo!}
        members={members}
      />
      <div className='items-list'>
        <EntriesList model={model}/>
      </div>
      <div>
        <DndProvider backend={HTML5Backend}>
        <EntrySpace
        entries = {entries}
          model = {model}
          author = {authorInfo!}
        />
        </DndProvider>
      </div>
    </div>
  );
};

export default BoardOpenedComponent;