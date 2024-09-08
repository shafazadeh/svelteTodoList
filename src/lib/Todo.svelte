<script lang="ts">
	import type { ITodo } from '../types/todo';
	import ProtectedRoute from './ProtectedRoute.svelte';
	export let todo: ITodo;
	export let toggleCompleted: (id: string) => void;
	export let removeTodo: (id: string) => void;
</script>

<ProtectedRoute fallback="/login">
	<li class="todo">
		<div class="todo-item">
			<input checked={todo.completed} type="checkbox" on:change={() => toggleCompleted(todo.id)} />
			<span class="todo-text" class:checked={todo.completed}> {todo.text}</span>
			<button on:click={() => removeTodo(todo.id)}>Remove</button>
		</div>
	</li>
</ProtectedRoute>

<style>
	.todo {
		font-size: 16px;
		border-bottom: 1px solid #ccc;
	}

	.todo:last-child {
		border-bottom: none;
	}

	.todo-item {
		display: flex;
		align-items: center;
		padding: 8px;
	}

	.todo-text {
		margin-left: 8px;
		flex-grow: 1;
	}

	.todo-text.checked {
		text-decoration: line-through;
		color: #666;
	}

	button {
		background-color: transparent;
		border: none;
		color: #666;
		cursor: pointer;
	}

	button:hover {
		color: red;
	}
</style>
