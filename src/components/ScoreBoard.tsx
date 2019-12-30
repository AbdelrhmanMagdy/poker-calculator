import React from "react";
import {
  Text,
  Stack,
  DetailsList,
  IColumn,
  ActionButton
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
      maxWidth:150,
      onRender: (item: any) => (
        <Stack horizontal verticalFill verticalAlign="center">
          <ActionButton
            iconProps={{ iconName: "Delete" }}
            onClick={_ => onDelete(item.name)}
          />
          <Text>{item.name}</Text>
        </Stack>
      )
    },
    {
      key: "coin",
      name: "Coins",
      fieldName: "coins",
      minWidth: 250,
      onRender: (item: any) => (
        <Stack
          horizontal
          tokens={{ childrenGap: 2 }}
          horizontalAlign="start"
          verticalAlign="center"
          verticalFill
        >
          <Text>{item.coins} ( {item.subtractedCoins} )</Text>
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
          />
        </Stack>
      )
    }
  ];

  return <DetailsList isHeaderVisible={false} items={players} columns={columns} selectionMode={0} />;
};

// <Stack
//   horizontal
//   verticalAlign="center"
//   verticalFill
//   tokens={{ childrenGap: 5 }}
// >
//   <Persona text={name} size={PersonaSize.size56} />
//   <Text variant="medium">{coins}</Text>
// </Stack>
