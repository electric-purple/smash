import { writable } from 'svelte/store';
//import type firebase from 'firebase/app';

// import type { User } from 'firebase/auth';
type User = string;

const authStore = writable<{
	isLoggedIn: boolean;
	user?: User;
	firebaseControlled: boolean;
}>({
	isLoggedIn: false,
	firebaseControlled: false
});

export default {
	subscribe: authStore.subscribe,
	set: authStore.set
};



	// import authStore from '$stores/authStore';
	// onMount(() => {
	// 	if (browser) {
	// 		getAppAuth().onAuthStateChanged((user) => {
	// 			authStore.set({
	// 				isLoggedIn: user !== null,
	// 				user,
	// 				firebaseControlled: true
	// 			});
	// 		});
	// 	}
	// });
