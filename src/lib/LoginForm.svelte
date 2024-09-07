<script lang="ts">
	interface LoginData {
		email: string;
		password: string;
	}

	let formData: LoginData = {
		email: '',
		password: ''
	};

	let errorMessage = '';
	let isLoading = false;

	async function handleSubmit() {
		if (isLoading) return;

		isLoading = true;
		errorMessage = '';

		try {
			const response = await fetch('https://api-nodejs-todolist.herokuapp.com/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			console.log(formData);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			// Handle successful login here
			console.log('Login successful:', data);
			// You might want to store the token or redirect to another page
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : String(error);
		} finally {
			isLoading = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<h2>Login Form</h2>

	{#if errorMessage}
		<p class="error-message">{errorMessage}</p>
	{/if}

	<div>
		<label for="email">Email:</label>
		<input id="email" name="email" type="email" bind:value={formData.email} required />
	</div>

	<div>
		<label for="password">Password:</label>
		<input id="password" name="password" type="password" bind:value={formData.password} required />
	</div>

	<button type="submit" disabled={isLoading}>
		{isLoading ? 'Logging in...' : 'Login'}
	</button>
</form>

<style>
	form {
		max-width: 300px;
		margin: 20px auto;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	label {
		display: block;
		margin-bottom: 5px;
	}

	input {
		width: 100%;
		height: 35px;
		margin-bottom: 15px;
		padding: 5px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		width: 100%;
		height: 40px;
		font-size: 16px;
		color: white;
		background-color: #007bff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}

	.error-message {
		color: red;
		margin-bottom: 10px;
	}
</style>
