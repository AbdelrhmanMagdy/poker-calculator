import React, { useState } from "react";
import {
  Stack,
  Separator,
} from "office-ui-fabric-react";
import { Player, ScoreBoard } from "./ScoreBoard";
import { Header, HistoryItem } from "./Header";

const startingCoins = 100000;
export const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [totalRoundCoins, setTotalRoundCoins] = useState<number>(0);
  const [baseCoins, setBaseCoins] = useState<number>(1000);
  const [allInCoins, setAllInCoins] = useState<number>(9000);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  const onAddPlayer = (name:string) => {
    setPlayers(players =>
      players.concat({
        name: name,
        coins: startingCoins,
        isAllInClicked: false,
        subtractedCoins: 0,
        history: []
      })
    );
  };

  const onDelete = (name: String) => {
    setPlayers(players => {
      const items = players.slice();
      items.splice(
        players.findIndex(p => p.name === name),
        1
      );
      return items;
    });
  };

  const onSubtract = (name: string) => {
    const updatedPlayers = players.slice();
    const newPlayer = updatedPlayers.find(p => p.name === name);
    if (newPlayer) {
      newPlayer.coins -= baseCoins;
      newPlayer.subtractedCoins -= baseCoins;
    }
    setPlayers(updatedPlayers);
    setTotalRoundCoins(val => val + baseCoins);
  };
  const onAdd = (name: string) => {
    const updatedPlayers = players.slice();
    const newPlayer = updatedPlayers.find(p => p.name === name);
    if (newPlayer) {
      newPlayer.coins += baseCoins;
      newPlayer.subtractedCoins += baseCoins;
    }
    setPlayers(updatedPlayers);
    setTotalRoundCoins(val => val - baseCoins);
  };
  const onAllIn = (name: string) => {
    const updatedPlayers = players.slice();
    const newPlayer = updatedPlayers.find(p => p.name === name);
    if (newPlayer) {
      newPlayer.coins -= allInCoins;
      newPlayer.isAllInClicked = true;
      newPlayer.subtractedCoins -= allInCoins;
    }
    setPlayers(updatedPlayers);
    setTotalRoundCoins(val => val + allInCoins);
  };

  const onPlayerWin = (name: string) => {
    const updatedPlayers = players.slice();
    const newPlayer = updatedPlayers.find(p => p.name === name);
    if (newPlayer) {
      newPlayer.coins += totalRoundCoins;
    }
    setPlayers(
      updatedPlayers.map(p => ({
        ...p,
        history:
          p.name === name
            ? [...p.history, totalRoundCoins]
            : [...p.history, p.subtractedCoins],
        subtractedCoins: 0,
        isAllInClicked: false
      }))
    );
    const updatedHistory = historyItems.slice();
    const historyObject: HistoryItem = {};
    players.map(p => {
      const key = p.name;
      historyObject[key] = p.coins;
    });
    updatedHistory.push(historyObject);
    setHistoryItems(updatedHistory);
    setTotalRoundCoins(0);
    setRoundNumber(n => n + 1);
    if (roundNumber % 10 == 0) {
      setBaseCoins(c => c * 2);
      setAllInCoins(c => c * 2);
    }
  };

  return (
    <>
      <Header
        onAddPlayer={onAddPlayer}
        setAllInCoins={setAllInCoins}
        totalRoundCoins={totalRoundCoins}
        baseCoins={baseCoins}
        roundNumber={roundNumber}
        allInCoins={allInCoins}
        historyItems={historyItems}
        players={players}
      />
      <Separator />

      <Stack tokens={{ childrenGap: 20 }} style={{ margin: "15px" }}>
        <ScoreBoard
          players={players}
          onDelete={onDelete}
          onSubtract={onSubtract}
          onAdd={onAdd}
          onAllIn={onAllIn}
          onPlayerWin={onPlayerWin}
        />
      </Stack>


    </>
  );
};
