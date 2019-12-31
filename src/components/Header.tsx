import React, { useState } from "react";
import {
  Text,
  Stack,
  ActionButton,
  TextField,
  DefaultButton,
  Modal,
  Button,
  Icon,
  Separator
} from "office-ui-fabric-react";
import { HistoryModalTable } from "./HistoryModalTable";
import { Player } from "./ScoreBoard";

export type HistoryItem = { [key: string]: number };
export type HeaderProps = {
  totalRoundCoins: number;
  baseCoins: number;
  roundNumber: number;
  allInCoins: number;
  players: Player[];
  historyItems: HistoryItem[];
  onAddPlayer: (name: string) => void;
  setAllInCoins: (val: number) => void;
  setBaseCoins: (val: number) => void;
  onUndoRound: ()=>void;
};
export const Header = (props: HeaderProps) => {
  const {
    onAddPlayer,
    onUndoRound,
    setAllInCoins,
    setBaseCoins,
    totalRoundCoins,
    baseCoins,
    roundNumber,
    allInCoins,
    players,
    historyItems
  } = props;
  const [addPlayerValue, setAddPlayerValue] = useState("");
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);

  return (
    <>
      <Stack
        horizontal
        horizontalAlign="space-between"
        tokens={{ childrenGap: 5 }}
      >
        <Stack tokens={{ childrenGap: 10 }}>
          <Text variant="large" style={{ fontWeight: "bold" }}>
            #Round: {roundNumber}
          </Text>
          <Text variant="large" style={{ fontWeight: "bold" }}>
            Base coins: {baseCoins}
          </Text>

          <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 5 }}>
            <TextField
              placeholder="Add player"
              value={addPlayerValue}
              onChange={(_, v) => setAddPlayerValue(v || "")}
            ></TextField>
            <DefaultButton
              iconProps={{ iconName: "add" }}
              disabled={!addPlayerValue}
              onClick={() => {
                onAddPlayer(addPlayerValue);
                setAddPlayerValue("");
              }}
            />
          </Stack>
          <Stack horizontal>
            <TextField
              label="All in value:"
              placeholder="set all in value"
              style={{ textAlign: "center", maxWidth: "100px" }}
              value={allInCoins.toString()}
              onChange={(_, v) => setAllInCoins(Number(v) || 0)}
            />
            <TextField
              label="Base coins:"
              placeholder="set base coins"
              style={{ textAlign: "center", maxWidth: "100px" }}
              value={baseCoins.toString()}
              onChange={(_, v) => setBaseCoins(Number(v) || 0)}
            />
          </Stack>
        </Stack>

        <Stack verticalFill verticalAlign="end" tokens={{ childrenGap: 5 }}>
          <Text
            variant="large"
            block
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            POKER CALCULATOR
          </Text>
          <Stack
          horizontal
          horizontalAlign="center"
          >
            
          <ActionButton iconProps={{iconName:"ClipboardListMirrored"}} text="History"  onClick={_ => setIsHistoryModalOpen(true)} />
          <ActionButton iconProps={{iconName:'Undo'}} text="Undo round" disabled={roundNumber===1} onClick={onUndoRound}/>
          
          </Stack>
          <Modal
            isOpen={isHistoryModalOpen}
            onDismiss={() => setIsHistoryModalOpen(false)}
          >
            <HistoryModalTable
              players={players}
              playersHistory={historyItems}
            ></HistoryModalTable>
          </Modal>
          <Text
            variant="large"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            {totalRoundCoins ? totalRoundCoins : "0"}
          </Text>

          <Stack
            verticalFill
            horizontalAlign="center"
            verticalAlign="center"
            tokens={{ childrenGap: 5 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "gold"
              }}
              variant="medium"
            >
              {players.find(p=>p.isKing)?.name}
            <Icon
              iconName="Crown"
              style={{ color: "gold",marginLeft:'5px', fontWeight: "bolder" }}
            />
            </Text>
              <Separator/>
            <Text
              style={{
                fontWeight: "bold",
                color: "red"
              }}
              variant= "medium"
            >
              {players.find(p=>p.isCoze)?.name}
            <Icon
                iconName="Cat"
                style={{ color: "red",marginLeft:'5px', font: "50px", fontWeight: "bolder" }}    />
            </Text>

          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
