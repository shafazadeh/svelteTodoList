import { writable } from 'svelte/store';

// eslint-disable-next-line prefer-const
let token: string | null = null;
const authStore = writable<{ token: string } | null>(token);

function setLogin(token: string) {
	return authStore.set({ token });
}

function logout() {
	authStore.set(null);
}

function isLogin() {
	return authStore !== null;
}

export { authStore, setLogin, logout, isLogin };

