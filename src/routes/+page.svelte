<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import LoginForm from '../lib/LoginForm.svelte';
	import TodoList from '../lib/TodoList.svelte';
	import type { ITodo } from '../types/todo';
	import { authStore, logout} from '../lib/authStore.ts';

	let isLogin: { token: string; } | null;
	authStore.subscribe((value) => {
		isLogin = value;
	});
	console.log("isLogin",isLogin)

	let todos: ITodo[] = [
		{ id: uuidv4(), text: 'Buy milk', completed: false },
		{ id: uuidv4(), text: 'Walk the dog', completed: true }
	];

	function addTodo(text: string) {
		const newTodo: ITodo = {
			id: uuidv4(),
			text,
			completed: false
		};
		todos = [...todos, newTodo];
	}

	function toggleCompleted(id: string) {
		todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
	}

	function removeTodo(id: string) {
		todos = todos.filter((todo) => todo.id !== id);
	}

	function handleLoginSuccess(){
		console.log("hi",isLogin)
	}

	function handleLogout(){
		logout()
		console.log("hi",isLogin)
	}
	
</script>

<main>
	{#if !isLogin}
		<LoginForm on:login={handleLoginSuccess} />
	{:else}
		<TodoList {todos} {addTodo} {toggleCompleted} {removeTodo} />
		<button on:click={handleLogout}>Logout</button>
	{/if}
</main>

<style>
	:global(body) {
		font-family: Arial, sans-serif;
		line-height: 1.6;
		margin: 0;
		padding: 0;
	}

	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
