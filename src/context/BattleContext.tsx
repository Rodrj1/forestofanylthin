import { createContext, useState } from "react";
import { skill, UnitStats } from "../types";

interface ProviderProps {
  children: JSX.Element;
}

interface BattleContextProps {
  heroStats: UnitStats;
  setHeroStats: React.Dispatch<React.SetStateAction<UnitStats>>;
  playerRace: string;
  setPlayerRace: React.Dispatch<React.SetStateAction<string>>;
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  playerArmy: UnitStats[];
  setPlayerArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>;
  enemyArmy: UnitStats[];
  setEnemyArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>;
  unitsInBoard: UnitStats[];
  setUnitsInBoard: React.Dispatch<React.SetStateAction<UnitStats[]>>;
  unitPosition: number;
  setUnitPosition: React.Dispatch<React.SetStateAction<number>>;
  isInFight: boolean;
  setIsInFight: React.Dispatch<React.SetStateAction<boolean>>;
  playingUnit: UnitStats;
  setPlayingUnit: React.Dispatch<React.SetStateAction<UnitStats>>;
  targetUnit: UnitStats;
  setTargetUnit: React.Dispatch<React.SetStateAction<UnitStats>>;
  deadUnit: UnitStats;
  setDeadUnit: React.Dispatch<React.SetStateAction<UnitStats>>;
  showBattleMessage: boolean;
  setShowBattleMessage: React.Dispatch<React.SetStateAction<boolean>>;
  battleMessageText: string;
  setBattleMessageText: React.Dispatch<React.SetStateAction<string>>;
  actionImage: skill;
  setActionImage: React.Dispatch<React.SetStateAction<skill>>;
  addedDryexaRanger: boolean;
  setAddedDryexaRanger: React.Dispatch<React.SetStateAction<boolean>>;
  addedSkeletons: boolean;
  setAddedSkeletons: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BattleContext = createContext({} as BattleContextProps);

export const BattleContextProvider = ({ children }: ProviderProps) => {
  const [heroStats, setHeroStats] = useState<UnitStats>({} as UnitStats);
  const [playerRace, setPlayerRace] = useState("");

  const [playerArmy, setPlayerArmy] = useState<UnitStats[]>([]);
  const [enemyArmy, setEnemyArmy] = useState<UnitStats[]>([]);

  const [addedDryexaRanger, setAddedDryexaRanger] = useState(false);
  const [addedSkeletons, setAddedSkeletons] = useState(false);

  const [isInFight, setIsInFight] = useState<boolean>(false);
  const [action, setAction] = useState("");
  const [turn, setTurn] = useState("");
  const [playingUnit, setPlayingUnit] = useState<UnitStats>({} as UnitStats);
  const [targetUnit, setTargetUnit] = useState<UnitStats>({} as UnitStats);
  const [deadUnit, setDeadUnit] = useState<UnitStats>({} as UnitStats);
  const [actionImage, setActionImage] = useState<skill>({} as skill);
  const [battleMessageText, setBattleMessageText] = useState("");
  const [showBattleMessage, setShowBattleMessage] = useState(false);

  const [unitsInBoard, setUnitsInBoard] = useState<UnitStats[]>([]);
  const [unitPosition, setUnitPosition] = useState(0);

  return (
    <BattleContext.Provider
      value={{
        heroStats,
        setHeroStats,
        playerRace,
        setPlayerRace,
        turn,
        setTurn,
        action,
        setAction,
        playerArmy,
        setPlayerArmy,
        enemyArmy,
        setEnemyArmy,
        unitsInBoard,
        setUnitsInBoard,
        unitPosition,
        setUnitPosition,
        isInFight,
        setIsInFight,
        showBattleMessage,
        setShowBattleMessage,
        battleMessageText,
        setBattleMessageText,
        playingUnit,
        setPlayingUnit,
        targetUnit,
        setTargetUnit,
        deadUnit,
        setDeadUnit,
        actionImage,
        setActionImage,
        addedDryexaRanger,
        setAddedDryexaRanger,
        addedSkeletons,
        setAddedSkeletons,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};
