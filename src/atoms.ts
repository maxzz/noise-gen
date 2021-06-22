import { atom } from 'jotai';
import { defAppSettings, storeChangesDebounced } from './utils/LocalStoreParams';
import { WorkerEx } from './hooks/useCanvasWorker';
import { GENPARAMS, GenParams, I2W, I4W, PresetData, PRESET_H, PRESET_W, RenderParams } from './utils/types';
import uuid from './utils/uuid';
import { atomWithCallback } from './hooks/atomsX';
import { defPresets, storePresets } from './utils/LocalStorePresets';

//#region Offscreen canvas and Worker

export const OffscreenCanvasAtom = atom<OffscreenCanvas | null>(null);
export const RenderWorkerAtom = atom<WorkerEx | null>(null);

//#endregion Offscreen canvas and Worker

//#region Generator current params

// GenParams

export const GenParamsRawAtom = atom<GenParams>(defAppSettings.renderParams.genParams);

export const GenParamsAtom = atom(
	(get) => get(GenParamsRawAtom),
	(get, set, params: GenParams) => {
		set(GenParamsRawAtom, params);
		storeChangesDebounced(get);
	}
);

export const N1Atom = atom(
	(get) => get(GenParamsAtom).n1,
	(get, set, update: number) => set(GenParamsAtom, { ...get(GenParamsAtom), n1: update })
);

export const N2Atom = atom(
	(get) => get(GenParamsAtom).n2,
	(get, set, update: number) => set(GenParamsAtom, { ...get(GenParamsAtom), n2: update })
);

export const DistortionAtom = atom(
	(get) => get(GenParamsAtom).distortion,
	(get, set, update: number) => set(GenParamsAtom, { ...get(GenParamsAtom), distortion: update })
);

export const DotDiameterAtom = atom(
	(get) => get(GenParamsAtom).dotDiameter,
	(get, set, update: number) => set(GenParamsAtom, { ...get(GenParamsAtom), dotDiameter: update })
);

// Current seed, color, and canvas color

export const ColorAtom = atomWithCallback(defAppSettings.renderParams.color, (_, get) => storeChangesDebounced(get));
export const ColorCanvasAtom = atomWithCallback(defAppSettings.canvasBg, (_, get) => storeChangesDebounced(get));
export const SeedAtom = atomWithCallback(defAppSettings.renderParams.seed, (_, get) => storeChangesDebounced(get));

export const RandomSeedAtom = atom(
	(get) => get(SeedAtom),
	(_get, set) => set(SeedAtom, `${Math.random()}`.replace(/^0\./, '')));

function Random(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export const GeneratePresetAtom = atom(
	null,
	(_get, set) => {
		let newSet: GenParams = {
			n1: Random(GENPARAMS.min.n1, GENPARAMS.gen.n1),
			n2: Random(GENPARAMS.min.n2, GENPARAMS.gen.n2),
			distortion: Random(GENPARAMS.min.distortion, GENPARAMS.gen.distortion),
			dotDiameter: Random(GENPARAMS.min.dotDiameter, GENPARAMS.gen.dotDiameter),
		};
		set(GenParamsAtom, newSet);
	}
);

export const RenderParamsAtom = atom<RenderParams, RenderParams>(
	(get) => {
		return {
			seed: get(SeedAtom),
			color: get(ColorAtom),
			genParams: get(GenParamsAtom)
		};
	},
	(_get, set, renderParams: RenderParams) => {
		set(ColorAtom, renderParams.color);
		set(SeedAtom, renderParams.seed);
		set(GenParamsAtom, renderParams.genParams);
	}
);

//#endregion Generator current params

//#region Presets

export const PresetsAtom = atomWithCallback<PresetData[]>(defPresets(), (_, get) => storePresets(get));

export const RemovePresetAtom = atom(
	null,
	(get, set, id: string) => set(PresetsAtom, get(PresetsAtom).filter((item: PresetData) => item.id !== id))
);

export const UpdatePresetPreviewAtom = atom(
	null,
	(get, set, preview: I4W.PreviewId) => {
		let reader = new FileReader();
		reader.onloadend = function () {
			if (reader.result) {
				let presets = get(PresetsAtom);
				let presetIdx = presets.findIndex((preset: PresetData) => preset.id === preview.id);
				if (presetIdx < 0) {
					console.log('preset not found. removed', preview);
					return;
				}

				const preset: PresetData = {
					id: uuid(),
					preview: reader.result as string,
					renderParams: preview.renderParams,
				};
				presets[presetIdx] = preset;
				set(PresetsAtom, [...presets]);
			}
		};
		reader.readAsDataURL(preview.blob);
	}
);


export const InitPreviewsUpdateAtom = atom(
	null,
	(get, set) => {
		const worker = get(RenderWorkerAtom);
		const presets = get(PresetsAtom);
		const canvasSize = get(ManualSizeAtom);
		if (worker) {
			console.log('preview worker init');
	
			presets.forEach((preset: PresetData) => {
				if (!preset.preview) {
					const msg: I2W.GetPreviewId = {
						type: 'get-preview-id',
						smallWidth: PRESET_W,
						smallHeight: PRESET_H,
						largeWidth: canvasSize.w,
						largeHeight: canvasSize.h,
				
						id: preset.id,
						renderParams: preset.renderParams,
					};
					console.log('send request msg', worker, msg);
	
					worker?.postMessage(msg);
				}
			});
		}
	}
);

const AppendPresetAtom = atom(
	null,
	(get, set, preset: PresetData) => set(PresetsAtom, [...get(PresetsAtom), preset])
);

export const CreateAppendPresetAtom = atom(
	null,
	(_get, set, data: I4W.Preview) => {
		let reader = new FileReader();
		reader.onloadend = function () {
			if (reader.result) {
				const preset: PresetData = {
					id: uuid(),
					preview: reader.result as string,
					renderParams: data.renderParams,
				};
				set(AppendPresetAtom, preset);
			}
		};
		reader.readAsDataURL(data.blob);
	}
);

//#endregion Presets

// Canvas size

export const ManualSizeAtom = atom({ w: 325, h: 300 });

//#region Application background

// Set Application background

const _AppBackgroundUrlAtom = atom('');

export const AppBackgroundUrlAtom = atom(
	(get) => get(_AppBackgroundUrlAtom),
	(get, set, blob: Blob | null) => {
		let current = get(_AppBackgroundUrlAtom);
		if (current) {
			window.URL.revokeObjectURL(current);
		}
		set(_AppBackgroundUrlAtom, blob ? window.URL.createObjectURL(blob) : '');
	}
);

export const AppBackgroundActiveAtom = atom(
	(get) => !!get(_AppBackgroundUrlAtom)
);

//#endregion Application background
