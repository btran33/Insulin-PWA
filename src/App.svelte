<script lang="ts">
  import { onMount } from "svelte";
  import Calculator from "./lib/Calculator.svelte";
  import type { AuthSession } from '@supabase/supabase-js'
  import { supabase } from "./supabaseClient";
  import SwitchTheme from "./lib/SwitchTheme.svelte";
  import LoginModal from "./lib/LoginModal.svelte";
  import History from "./lib/History.svelte";
  import { isSaving } from "./lib/stores";
  
  let menuWidth = '16rem'
  let modal_id = 'login_modal'
  let session: AuthSession

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
    })
  })

</script>

<main style="--menu-width:{menuWidth}">
  <input id="menu-switch" type="checkbox"/>
	<nav id="menu">
		<div class="history">History</div>

		{#if session}
			<History session={session}/>
		{:else}
			<div class="signInBox">		
				Want to save calculations? 
				<div class="signInLink">
					<button onclick={modal_id+".showModal()"}>Sign In</button>
				</div>
			</div>
		{/if}

		<div class="user-interaction">
			{#if session}
				<div class="dropdown dropdown-top dropdown-hover">
					<label tabindex="0" class="btn no-animation bg-base-100 max-w-md overflow-x-hidden">
						{session.user.user_metadata.username || session.user.user_metadata.name}
					</label>
					<ul tabindex="0" class="dropdown-content z-[1] menu bg-base-100 w-fit rounded-lg">
						<li>
							<button class="font-semibold"
								on:click={() => supabase.auth.signOut()}>
							LOG OUT
							</button>
						</li>
						<li>	
							<div class="form-control">
								<label class="label cursor-pointer gap-2 grid grid-cols-2">
								  <span class="label-text font-semibold">SAVE</span> 
								  <input type="checkbox" class="checkbox" 
								  		 checked={$isSaving} on:click={() => $isSaving = !$isSaving}/>
								</label>
							</div>
						</li>
					</ul>
				</div>

			{/if}
			<SwitchTheme/>
		</div>

    <!-- Modal for login with backdrop -->
    <LoginModal modal_id={modal_id}/>

	</nav>
	
	<div class="page-wrap">
		<label for="menu-switch" id="menu-toggle"/>
		<Calculator/>

		<!-- {#if session}
			<h1>WELCOME! {session.user.email}</h1>
		{:else}
		{/if} -->
	</div>

</main>

<style>
  .page-wrap {
		padding: 3rem;
		-webkit-box-sizing: border-box;
		   -moz-box-sizing: border-box;
		        box-sizing: border-box;

		-webkit-transition: all .3s ease-in;
		   -moz-transition: all .3s ease-in;
		     -o-transition: all .3s ease-in;
		        transition: all .3s ease-in;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-content: center;
	}

	#menu {
		position: fixed;
		top: 0;
		left: calc(0px - var(--menu-width));
		width: var(--menu-width);
		height: 100%;
		padding: 2rem 10px;
		display: grid;
		grid-template-rows: min-content 1fr ;
		gap: 1rem;

		-webkit-box-sizing: border-box;
		   -moz-box-sizing: border-box;
		        box-sizing: border-box;

		-webkit-transition: all .3s ease-in;
		   -moz-transition: all .3s ease-in;
		     -o-transition: all .3s ease-in;
		        transition: all .3s ease-in;

		text-align: center;
		background-color: hsl(var(--b2));
	}

	#menu .history {
		font-size: 1.6rem;
		height: fit-content;
	}

	#menu .history:after {
		content: '';
		display: block;
		margin: auto;
		height: 2px;
		width: 0px;
		transition: width 0.6s ease, background-color 0.6s ease;
	}

	#menu-switch {
		display: none;
	}

	#menu-switch:checked ~ #menu {
		left: 0;
	}

	#menu-switch:checked ~ .page-wrap {
		margin-left: var(--menu-width);
	}

	#menu-toggle:focus {
		outline: none;
	}
	#menu-toggle {
		display: inline-block;
		position: relative;
		width: 3.2rem;
		height: 3.2rem;
		cursor: pointer;
		border: none;
		border-radius: 2rem;
		background: hsl(var(--b2));

		-webkit-box-sizing: 30px;
		   -moz-box-sizing: 30px;
		        box-sizing: 30px;
		-webkit-transition: all .3s ease-in;
		   -moz-transition: all .3s ease-in;
		     -o-transition: all .3s ease-in;
		        transition: all .3s ease-in;	
	}

	#menu-toggle:before,
	#menu-toggle:after {
		position: absolute;
		content: "";
		background-color: hsl(var(--bc));
	}

	#menu-toggle:before {
		top: 0.25rem;
		left: 1.55rem;
		width: 0.1rem;
		height: 2.7rem;
	}

	#menu-toggle:after {
		top:1.55rem;
		left: 0.25rem;
		width: 2.7rem;
		height: 0.1rem;
	}

	#menu-switch:checked ~ .page-wrap #menu-toggle {
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	#menu-switch:checked ~ #menu .history:after {
		width: 90%;
		background: hsl(var(--bc));;
	}

	#menu .user-interaction {
		display: grid;
		grid-template-columns: max-content min-content;
		justify-content: center;
		gap: 2rem;
		text-transform: none;
	}

	#menu .user-interaction li button {

		border: none;
		margin: 0.5rem;
		text-transform: capitalize;
	}

	.signInBox {
		align-self: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.signInLink {
		text-transform: uppercase;
		width: fit-content;
	}

	.signInLink:after {
		content: '';
		display: block;
		margin: auto;
		height: 2px;
		width: 0px;
		transition: width 0.4s ease, background-color 0.4s ease;
	}

	.signInLink:hover:after {
		width: 100%;
		background: hsl(var(--bc));;
	}
</style>
