import { atom } from 'jotai';
import { atomWithCallback } from '../hooks/atomsX';
import { WorkerEx } from '../hooks/useCanvasWorker';
import { GENPARAMS, GenParams, I2W, I4W, NOISEPARAMS, PresetData, PRESET_H, PRESET_W, RenderParams } from '../utils/types';
import { defAppSettings, storeAppParams } from '../utils/storageAppConfig';
import { defPresets, storePresets } from '../utils/storagePresets';
import uuid from '../utils/uuid';
import { random, withDigits } from '../utils/numbers';

//#region Offscreen canvas and Worker

export {
    OffscreenCanvasAtom,
    RenderWorkerAtom,
    ManualSizeAtom,
} from './canvas';

//#endregion Offscreen canvas and Worker

//#region Generator current params

// GenParams

export {
    GenParamsAtom,
    N1Atom,
    N2Atom,
    DistortionAtom,
    DotDiameterAtom
} from './gen-params';

// Current seed, color, and canvas color

export {
    ColorCanvasAtom,
    ExportImageSizeAtom,

    ColorAtom,
    SeedAtom,
    NoiseAtom,

    RenderParamsAtom,
    SetRenderParamsAtom,
    RandomSeedAtom,
    GeneratePresetAtom,
} from './editor-params';


// Noise Editor

export {
    SetNoiseScaleAtom,
    SetNoiseTypeAtom,
    ResetNoiseToDefaultAtom,
    ShowNoiseEditorAtom,
} from './noise-editor';

//#endregion Generator current params

//#region Presets

export {
    PresetsAtom,
    RemovePresetAtom,
    UpdatePresetPreviewAtom,
    InitPreviewsUpdateAtom,
    CreateAppendPresetAtom,
} from './presets';

//#endregion Presets

//#region Application background

// Set Application background

export {
    AppBackgroundUrlAtom,
    AppBackgroundActiveAtom,
} from './background';

//#endregion Application background
