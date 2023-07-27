import { writable } from 'svelte/store';

export const ttd = writable('');
export const days = writable('');
export const strength = writable('');
export const volume = writable('');
export const resValue = writable('');

export const defaultBoxClass = 'input input-bordered input-info input-lg'