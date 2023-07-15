<script>
    import { supabase } from "../supabaseClient";
    import { writable } from "svelte/store";
    let USERNAME_MIN_LEN = 3
    let PASSWORD_MIN_LEN = 8

    export let modal_id_signup
    let email_signup = ''
    let username = ''
    let password_signup = ''
    let reconfirm_password = ''
    let loading = false
    let isError = false
    let userNameError = writable('')
    let errorContent = writable('')

    // Handle front-end sign-up details
    const handleSignup = async () => {
        try {
            loading = true
            errorContent.set(''); userNameError.set('');
            if (username.length < 3) {
                isError = true
                userNameError.set('Must be at least ' + USERNAME_MIN_LEN + ' characters long')
            } else if (password_signup !== reconfirm_password) {
                isError = true
                errorContent.set('Mismatching password')
            } else if (password_signup.length < 8 ) {
                isError = true
                errorContent.set('Must be at least ' + PASSWORD_MIN_LEN + ' characters long')
            } else {
                const { error } = await supabase.auth.signUp({ 
                    email: email_signup, 
                    password: password_signup, 
                    options: {
                        data: {
                            username: username
                        }
                    }
                })
                if (error) throw error
                alert('Check your email for confirmation')
            }
        } catch (error) {
            isError = true
            if (error instanceof Error) {
                errorContent.set(error.message)
            }
        } finally{
            loading = false
            password_signup = ''
            reconfirm_password = ''
            if (!isError) window.location.reload()
            isError = false
        }
    }
</script>

<dialog id={modal_id_signup} class="modal" >
    
    <form method="dialog"
          class="modal-box grid justify-center  gap-5"
          on:submit|preventDefault={handleSignup}
          name="signup">

        <h3 class="font-bold text-lg">Sign Up</h3>


        <div class="w-fit">
            <span class="label-text grid justify-start">Email</span>
            <input id='email_signup' class="input input-info" type="text"
                    bind:value={email_signup} required>
        </div>
        <div class="w-fit">
            <span class="label-text grid justify-start">Username</span>
            <input id='username' class="input input-info" type="text"
                    bind:value={username} required>
            <span class="label-text grid justify-start text-red-600">{$userNameError}</span>
            
        </div>
        <div class="w-fit">
            <span class="label-text grid justify-start">Password</span>
            <input id='password_signup' class="input input-info" type="password"
                    bind:value={password_signup} required>
        </div>
        <div class="w-fit">
            <span class="label-text grid justify-start">Reconfirm Password</span>
            <input id='reconfirm_password' class="input input-info" type="password"
                    bind:value={reconfirm_password} required>
            <span class="label-text grid justify-start text-red-600">{$errorContent}</span>
        </div>

        
        <button class="btn" type="submit" disabled={loading}>
            Continue
            <span id="singup_loading" class={loading ? 'loading' : ''}></span>
        </button>
    </form>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
