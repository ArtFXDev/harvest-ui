import { BladeStatuses } from "types/api";
import { Blade } from "types/tractor";

export function getBladeStatus(blade: Blade): keyof BladeStatuses {
  if (blade.owners && blade.owners.length > 0) {
    return "busy";
  }

  if (blade.nimby.length > 0) {
    return "nimby";
  }

  if (Date.now() - new Date(blade.t * 1000).getTime() < 500000) {
    if (blade.note === "no free slots (1)") return "noFreeSlots";
    return "free";
  }

  return "off";
}
