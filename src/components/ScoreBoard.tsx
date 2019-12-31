import React from "react";
import {
  Text,
  Stack,
  DetailsList,
  IColumn,
  ActionButton,
  Icon,
  Separator
} from "office-ui-fabric-react";

export type Player = {
  name: string;
  coins: number;
  subtractedCoins:number;
  isAllInClicked?: boolean;
  isKing?: boolean;
  isCoze?: boolean;
  history: number[];
};

export type ScoreBoardProps = {
  players: Player[];
  onDelete: (name: string) => void;
  onSubtract: (name: string) => void;
  onAdd: (name: string) => void;
  onAllIn: (name: string) => void;
  onPlayerWin: (name: string) => void;
};

export const ScoreBoard = (props: ScoreBoardProps) => {
  const { players, onDelete, onSubtract,onAdd, onAllIn, onPlayerWin } = props;

  const columns: IColumn[] = [
    {
      key: "playerName",
      name: "Name",
      fieldName: "name",
      minWidth: 50,
      isResizable:true,
      onRender: (item: Player) => (
        <Stack horizontal verticalFill horizontalAlign="start" verticalAlign="center" tokens={{childrenGap:5}}>
          <ActionButton
            iconProps={{ iconName: "Delete" }}
            onClick={_ => onDelete(item.name)}
          />
          
          <Text style={{fontWeight:"bold", color:item.isKing?'gold':item.isCoze?'red':'black'}} variant={item.isKing?"large":"medium"}>
            {item.name}
          </Text>
            <Separator vertical/>
          {item.isKing ?<Icon iconName="Crown" style={{color:"gold", fontWeight:'bolder'}}/>:null}
          {item.isCoze ?<Icon iconName="Cat" style={{color:"red",font:'50px', fontWeight:'bolder'}}/>:null}
        </Stack>
      )
    },
    {
      key: "coin",
      name: "Coins",
      fieldName: "coins",
      minWidth: 150,
      isResizable:true,
      onRender: (item: any) => (
        <Stack verticalFill verticalAlign="center">
          <Text>{item.coins} ( {item.subtractedCoins} )</Text>
        </Stack>
      )
    },
    {
      key: "icons",
      name: "Icons",
      fieldName: "icons",
      minWidth: 150,
      isResizable:true,
      onRender: (item: any) => (
        <Stack
          horizontal
          tokens={{ childrenGap: 2 }}
          horizontalAlign="start"
          verticalAlign="center"
          verticalFill
        >
          <ActionButton
            iconProps={{ iconName: "BoxSubtractSolid" }}
            onClick={_ => onSubtract(item.name)}
          />
          <ActionButton
            iconProps={{ iconName: "BoxAdditionSolid" }}
            onClick={_ => onAdd(item.name)}
            disabled={item.subtractedCoins>=0}
          />
          <ActionButton
            iconProps={{ iconName: "LightningBolt" }}
            onClick={_ => {
              onAllIn(item.name);
            }}
            disabled={item.isAllInClicked}
          />
          <ActionButton
            text="Win"
            style={{ color: "green" }}
            onClick={_ => {
              onPlayerWin(item.name);
            }}
            disabled={item.subtractedCoins<0}
          />
        </Stack>
      )}
  ];

  return <DetailsList isHeaderVisible={false} items={players} columns={columns} selectionMode={0} />;
};
