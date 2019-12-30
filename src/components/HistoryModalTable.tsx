import React, { useState } from "react";
import {
  Text,
  Stack,
  Persona,
  PersonaSize,
  DetailsList,
  IDetailsRowProps,
  IColumn,
  Icon,
  ActionButton
} from "office-ui-fabric-react";
import { Player } from "./ScoreBoard";
import { HistoryItem } from "./Game";


export type HistoryModalTableProps = {
  playersHistory: HistoryItem[];
  players: Player[]
};

export const HistoryModalTable = (props: HistoryModalTableProps) => {
  const { playersHistory, players } = props;

  const columns: IColumn[] = 
  players.map(p=>({
        key: p.name,
        name: p.name,
        fieldName: p.name,
        minWidth: 100,
  }))

  return <DetailsList items={playersHistory} columns={columns} selectionMode={0} />;
};