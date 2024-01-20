// src/lib/sessionStore.js
import { writable } from 'svelte/store';

export const userSession = writable(null); // This store will hold the user's session data
