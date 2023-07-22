<script lang="ts">
    import type { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../supabaseClient";
    import { onMount } from "svelte";
    import { resValue } from "./stores";
    import { get } from "svelte/store";

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
            // if there is history, sort in descending creation time
            if (data) history = data.sort(function(a, b) {
                var keyA = new Date(a.created_at), keyB = new Date(b.created_at)
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            });
            console.log(history)

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }

    const onHistoryClick = (index: number) => {
        const ids = ['ttd', 'days', 'strength', 'volume']
        for(const id of ids) {
            getElement(id).value = history[index][id]
        }
        resValue.set(history[index].result)
    }

    const getElement = (id: string) => {
        return document.getElementById(id) as HTMLInputElement
    }

</script>

<ul>
    {#each history as row, i}
        <li><button class="btn w-full" on:click={() => onHistoryClick(i)}>
            {row}

        </button></li>
    {/each}
    <span id="history_loading" class={loading ? 'loading' : ''}></span>
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

    /* ul li a {
		display: block;
		font-weight: 700;

		-webkit-transition: all .3s ease-in;
		   -moz-transition: all .3s ease-in;
		     -o-transition: all .3s ease-in;
		        transition: all .3s ease-in;
		text-decoration: none;
		text-transform: uppercase;
		margin-top: 1rem;
	} */
</style>