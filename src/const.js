export const LoadStatus = {
  INITIAL: `initial`,
  FETCHING: `fetching`,
  SUCCESS: `success`,
  FAILURE: `failure`
};

export const SortingType = {
  POPULAR: `popular`,
  NEW: `new`,
  DISCUSSED: `discussed`
};

export const DEFAULT_SORTING_TYPE = SortingType.POPULAR;

export const effectsNames = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

export const EffectsNameToRussiaName = {
  none: `Оригинал`,
  chrome: `Хром`,
  sepia: `Сепия`,
  marvin: `Марвин`,
  phobos: `Фобос`,
  heat: `Зной`
};

export const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

export const COMMENT_COUNT_PER_STEP = 5;

export const ScaleParameter = {
  DEFAULT: 75,
  MIN: 25,
  MAX: 100,
  STEP: 25
};

export const LimitEffectValue = {
  PHOBOS_MAX: 3,
  HEAT_MAX: 3,
  HEAT_MIN: 1,
  DEFAULT: 100
};

export const SHAKE_ANIMATION_TIMEOUT = 600;
