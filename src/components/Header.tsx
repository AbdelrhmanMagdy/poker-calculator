import React, { useState } from "react";
import {
  Text,
  Stack,
  ActionButton,
  TextField,
  DefaultButton,
  Modal,
  Button
} from "office-ui-fabric-react";
import { HistoryModalTable } from "./HistoryModalTable";
import { Player } from "./ScoreBoard";

export type HistoryItem = { [key: string]: number };
export type HeaderProps = {
  onAddPlayer: (name: string) => void;
  totalRoundCoins: number;
  baseCoins: number;
  roundNumber: number;
  allInCoins: number;
  setAllInCoins: (val: number) => void;
  players: Player[];
  historyItems: HistoryItem[];
};
export const Header = (props: HeaderProps) => {
  const {
    onAddPlayer,
    setAllInCoins,
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
              onClick={() => {onAddPlayer(addPlayerValue);setAddPlayerValue('')}}
            />
          </Stack>
            <TextField
              label="All in value:"
              placeholder="set all in value"
              style={{ textAlign: "center", maxWidth: "100px" }}
              value={allInCoins.toString()}
              onChange={(_, v) => setAllInCoins(Number(v) || 0)}
            />
        </Stack>

        <Stack verticalFill verticalAlign="end" tokens={{ childrenGap: 5 }}>
          <Text variant="large" block style={{ textAlign: "center", fontWeight:'bold' }}>
            POKER CALCULATOR
          </Text>
          <Button
            text="History"
            onClick={_ => setIsHistoryModalOpen(true)}
          />
          <Modal
            isOpen={isHistoryModalOpen}
            onDismiss={() => setIsHistoryModalOpen(false)}
          >
            <HistoryModalTable
              players={players}
              playersHistory={historyItems}
            ></HistoryModalTable>
          </Modal>
          <Text variant="large" style={{ textAlign: "center" , fontWeight:'bold'}}>
            {totalRoundCoins ? totalRoundCoins : "0"}
          </Text>
        </Stack>
      </Stack>
    </>
  );
};
