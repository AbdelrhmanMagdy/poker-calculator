import React, { useState } from "react";
import {
  DetailsList,
  IColumn,
  Text,
} from "office-ui-fabric-react";
import { Player } from "./ScoreBoard";
import { HistoryItem } from "./Header";


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

  return playersHistory.length? <DetailsList items={playersHistory} columns={columns} selectionMode={0} />:<Text style={{textAlign:"center", fontWeight:"bold"}} variant="large"> There is no history created yet!</Text>;
};