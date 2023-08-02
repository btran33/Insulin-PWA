<script>
    import { supabase } from "../supabaseClient";
    import { writable } from "svelte/store";
    import SignUpModal from "./SignUpModal.svelte";

    export let modal_id
    let modal_id_signup = modal_id + '_signup'
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

    const googleLogin = async () => {
        const { data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        if (error) throw error
        window.location.replace(data.url)
    }
</script>

<div>

    <dialog id={modal_id} class="modal" >
        
        <form method="dialog"
              class="modal-box grid justify-center content-center gap-5"
              on:submit|preventDefault={handleLogin}
              name="signin">
    
            <h3 class="font-bold text-lg">Sign In</h3>
    
            <div class="w-fit">
                <span class="label-text grid justify-start">Email</span>
                <input id='email' class="input input-info" type="text"
                        bind:value={email} required>
            </div>
            <div class="w-fit">
                <span class="label-text grid justify-start">Password</span>
                <input id='password' class="input input-info" type="password"
                        bind:value={password} required>
                <span class="label-text grid justify-start text-red-600">{$errorContent}</span>
            </div>
    
            <div class="text-sm grid grid-flow-col gap-0.5">
                <div>Don't have an account? </div>
                <button class="signUpLink cursor-pointer" type="button" onclick={modal_id_signup+'.showModal()'}>Sign Up</button>
            </div>
            
            <button class="btn" type="submit" disabled={loading}>
                Continue
                <span id="login_loading" class={loading ? 'loading' : ''}></span>
            </button>

            <div>
                <button class="btn h-fit w-fit"  type="button" disabled={loading} on:click={async () => googleLogin()}>
                    <img alt="google icon" src="icons/google.svg"/>
                </button>
            </div>
        </form>
    
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

    <SignUpModal modal_id_signup={modal_id_signup}/>
</div>

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

    img {
        width: 2.5rem;
        height: auto;
    }
</style>