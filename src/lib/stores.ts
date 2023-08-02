import { writable } from 'svelte/store';

export const ttd = writable('');
export const days = writable('');
export const strength = writable('');
export const volume = writable('');
export const resValue = writable('');

export let defaultBoxClass = "input input-bordered input-info input-lg"
export let isSaving = writable(true)
export let historyFocus = writable({id: -1})