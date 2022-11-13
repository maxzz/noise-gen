//#region Offscreen canvas and Worker

import { atom } from "jotai";
import { WorkerEx } from "../hooks/useCanvasWorker";

export const OffscreenCanvasAtom = atom<OffscreenCanvas | null>(null);
export const RenderWorkerAtom = atom<WorkerEx | null>(null);

//#endregion Offscreen canvas and Worker

// Canvas size

export const ManualSizeAtom = atom({ w: 325, h: 300 });
