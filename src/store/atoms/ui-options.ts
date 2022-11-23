import { atomWithCallback } from "@/hooks/atomsX";
import { defAppSettings, storeAppParams } from "../io";

//export const openPresetsAtom = atom(true);
export const openPresetsAtom = atomWithCallback(defAppSettings.uiOptions.openPresets, ({get}) => storeAppParams(get));;
