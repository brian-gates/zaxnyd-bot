import { TrapResult } from "./TrapResult";
import { d20 } from "../utils/dice";
import { getCharacterById } from "../store/selectors";
import store from "../store";
import { Trap } from "./trap";

export const trapAttack = (trap: Trap, targetId: string): TrapResult => {
  const character = getCharacterById(store.getState(), targetId);
  const attackRoll = d20();
  const damageRoll = Math.ceil(Math.random() * trap.weapon.damageMax);
  const targetDefense = trap.weapon.targetDefense;
  const attackBonus = trap.weapon.modifiers?.attackBonus ?? 0;
  const defenseScore = character[targetDefense];
  const outcome = attackRoll + attackBonus >= defenseScore ? "hit" : "miss";

  return {
    trap,
    attackBonus,
    attackRoll,
    defenderId: targetId,
    damageRoll,
    outcome,
  };
};
