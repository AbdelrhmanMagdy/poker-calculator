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
        history: [],
        isKing: false,
        isCoze: false
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

  const onUndoRound = () => {
    if(roundNumber===1){
      return
    }
    setRoundNumber(n=>n-1);
    const updatedPlayers = players.map(p=>({...p, history: p.history.slice(0,-1), subtractedCoins: 0}));
    setPlayers(updatedPlayers)
    setHistoryItems(items=>items.slice(0,-1))
  }

  const onAllIn = (name: string) => {
    const updatedPlayers = players.slice();
    const newPlayer = updatedPlayers.find(p => p.name === name);
    if (newPlayer) {
      if(newPlayer.coins<allInCoins){
        newPlayer.subtractedCoins -= newPlayer.coins;
        setTotalRoundCoins(val => val + newPlayer.coins);
        newPlayer.coins = 0;
      }else{
        newPlayer.coins -= allInCoins;
        newPlayer.subtractedCoins -= allInCoins;
        setTotalRoundCoins(val => val + allInCoins);
      }
      newPlayer.isAllInClicked = true;
    }
    setPlayers(updatedPlayers);
  };

  const onPlayerWin = (name: string) => {
    const updatedPlayers = players.slice();
    const player = updatedPlayers.find(p => p.name === name);
    if (player) {
      player.coins += totalRoundCoins;
    }
    const highestCoinValue = players.reduce((acc, player) => acc = acc > player.coins ? acc : player.coins, 0);
    const lowestCoinValue = players.reduce((acc, player) => acc = acc < player.coins ? acc : player.coins, Infinity);
    setPlayers(
      updatedPlayers.map(p => ({
        ...p,
        history:
        p.name === name
        ? [...p.history, totalRoundCoins]
        : [...p.history, p.subtractedCoins],
        subtractedCoins: 0,
        isAllInClicked: false,
        isKing: p.coins===highestCoinValue,
        isCoze: p.coins===lowestCoinValue
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
        onUndoRound={onUndoRound}
        setAllInCoins={setAllInCoins}
        totalRoundCoins={totalRoundCoins}
        baseCoins={baseCoins}
        roundNumber={roundNumber}
        allInCoins={allInCoins}
        historyItems={historyItems}
        setBaseCoins={setBaseCoins}
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
