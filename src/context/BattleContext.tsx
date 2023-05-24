import { createContext, useState } from 'react';
import { skill, Unit, Army, ActionName } from '../types';

interface ProviderProps {
  children: JSX.Element;
}

interface BattleContextProps {
  heroStats: Unit;
  setHeroStats: React.Dispatch<React.SetStateAction<Unit>>;
  playerRace: string;
  setPlayerRace: React.Dispatch<React.SetStateAction<string>>;
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  action: ActionName;
  setAction: React.Dispatch<React.SetStateAction<ActionName>>;
  playerArmy: Army;
  setPlayerArmy: React.Dispatch<React.SetStateAction<Army>>;
  enemyArmy: Army;
  setEnemyArmy: React.Dispatch<React.SetStateAction<Army>>;
  unitsInBoard: Army;
  setUnitsInBoard: React.Dispatch<React.SetStateAction<Army>>;
  unitPosition: number;
  setUnitPosition: React.Dispatch<React.SetStateAction<number>>;
  isInFight: boolean;
  setIsInFight: React.Dispatch<React.SetStateAction<boolean>>;
  playingUnit: Unit;
  setPlayingUnit: React.Dispatch<React.SetStateAction<Unit>>;
  targetUnit: Unit;
  setTargetUnit: React.Dispatch<React.SetStateAction<Unit>>;
  deadUnit: Unit;
  setDeadUnit: React.Dispatch<React.SetStateAction<Unit>>;
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
  isDamaging: boolean;
  setIsDamaging: React.Dispatch<React.SetStateAction<boolean>>;
  magicUsedInTurn: number;
  setMagicUsedInTurn: React.Dispatch<React.SetStateAction<number>>;
}

export const BattleContext = createContext({} as BattleContextProps);

export const BattleContextProvider = ({ children }: ProviderProps) => {
  const [heroStats, setHeroStats] = useState<Unit>({} as Unit);
  const [playerRace, setPlayerRace] = useState('');

  const [playerArmy, setPlayerArmy] = useState<Army>([]);
  const [enemyArmy, setEnemyArmy] = useState<Army>([]);

  const [addedDryexaRanger, setAddedDryexaRanger] = useState(false);
  const [addedSkeletons, setAddedSkeletons] = useState(false);

  const [isInFight, setIsInFight] = useState<boolean>(false);
  const [action, setAction] = useState<ActionName>('Combat: Clear Action');
  const [turn, setTurn] = useState('');
  const [playingUnit, setPlayingUnit] = useState<Unit>({} as Unit);
  const [targetUnit, setTargetUnit] = useState<Unit>({} as Unit);
  const [deadUnit, setDeadUnit] = useState<Unit>({} as Unit);

  const [actionImage, setActionImage] = useState<skill>({} as skill);
  const [battleMessageText, setBattleMessageText] = useState('');
  const [showBattleMessage, setShowBattleMessage] = useState(false);
  const [isDamaging, setIsDamaging] = useState(false);
  const [magicUsedInTurn, setMagicUsedInTurn] = useState(0);

  const [unitsInBoard, setUnitsInBoard] = useState<Army>([]);
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
        isDamaging,
        setIsDamaging,
        magicUsedInTurn,
        setMagicUsedInTurn,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};
