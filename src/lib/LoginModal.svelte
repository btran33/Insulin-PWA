<script>
    import { supabase } from "../supabaseClient";
    import { writable } from "svelte/store";

    export let modal_id
    let email = ''
    let password = ''
    let loading = false
    let isError = false
    let errorContent = writable('')

    const handleLogin = async () => {
        try {
            loading = true
            errorContent.set('')
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
        } catch (error) {
            isError = true
            if (error instanceof Error) {
                errorContent.set('Incorrect email or password')
            }
        } finally{
            loading = false
            password = ''
            if (!isError) window.location.reload()
            isError = false
        }
    }

    const handleSignUp = async () => {

    }

</script>

<dialog id={modal_id} class="modal" >
    <form method="dialog" 
          class="modal-box grid justify-center content-center gap-5"
          on:submit|preventDefault={handleLogin}>

        <h3 class="font-bold text-lg">Sign In</h3>


        <div class="w-fit">
            <span class="label-text grid justify-start">Email</span>
            <input id='email' class="input input-info" type="text"
                    bind:value={email}>
        </div>
        <div class="w-fit">
            <span class="label-text grid justify-start">Password</span>
            <input id='password' class="input input-info" type="password"
                    bind:value={password}>
            <span class="label-text grid justify-start text-red-600">{$errorContent}</span>
        </div>

        <div class="text-sm grid grid-flow-col gap-0.5">
            <div>Don't have an account? </div>
            <div class="signUpLink cursor-pointer" >Sign Up</div>
        </div>

        
        <button class="btn" type="submit" disabled={loading}>Continue</button>
    </form>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>

<style>
    .signUpLink {
		width: fit-content;
	}

	.signUpLink:after {
		content: '';
		display: block;
		margin: auto;
		height: 2px;
		width: 0px;
		transition: width 0.4s ease, background-color 0.4s ease;
	}

	.signUpLink:hover:after {
		width: 100%;
		background: hsl(var(--bc));;
	}
</style>