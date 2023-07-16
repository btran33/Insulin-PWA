<script lang="ts">
    import type { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../supabaseClient";
    import { onMount } from "svelte";

    export let session : AuthSession
    let history = []
    let loading = false

    onMount(() => {
        fetchHistory()
    })

    const fetchHistory = async () => {
        if (!session) return 
        
        try{
            loading = true
            const { user } = session
            let { data, error} = await supabase
                .from('calculations')
                .select('*')
                .eq('user_id', user.id)

            if (error) throw error
            if (data) {
                history = data
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }

</script>

<ul>
    {#each history as row, i}
        <li><a href="#"> {row}</a></li>
    {/each}
    <span id="login_loading" class={loading ? 'loading' : ''}></span>
</ul>

<style>
    ul {
		padding: 0;
		overflow-x: hidden;
		overflow-y: scroll;
		scroll-behavior: smooth;
	}

    ::-webkit-scrollbar {
		width: 0.4rem;
	}
	
	::-webkit-scrollbar-thumb {
		border-radius: 15px;
		background: hsl(var(--bc));
	}

	::-webkit-scrollbar-thumb:hover {
		background: hsl(var(--ac));
	}

    ul li a {
		display: block;
		font-weight: 700;

		-webkit-transition: all .3s ease-in;
		   -moz-transition: all .3s ease-in;
		     -o-transition: all .3s ease-in;
		        transition: all .3s ease-in;
		text-decoration: none;
		text-transform: uppercase;
		margin-top: 1rem;
	}
</style>