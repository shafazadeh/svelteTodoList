<script lang="ts">
	import type { ITodo } from '../types/todo';
	import Todo from './Todo.svelte';

	export let todos: ITodo[];
	export let addTodo: (text: string) => void;
	export let toggleCompleted: (id: string) => void;
	export let removeTodo: (id: string) => void;

	function handleSubmit(event: SubmitEvent) {
		const text = event.target[0] as HTMLInputElement;
		console.log(text.value);
		if (text.value.length === 0) return;

		addTodo(text.value);
		text.value = '';
	}
</script>

<h1>TODO List</h1>
<form on:submit|preventDefault={handleSubmit}>
	<input placeholder="Add new todo" />
	<button type="submit">Add</button>
</form>

<ul>
	{#each todos as todo (todo.id)}
		<Todo {todo} {toggleCompleted} {removeTodo} />
	{/each}
</ul>

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

	ul {
		list-style-type: none;
		padding: 0;
	}
</style>
