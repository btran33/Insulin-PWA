<script lang="ts">
    import type { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../supabaseClient";
    import { onMount } from "svelte";
    import { resValue } from "./stores";
    import Trash from "./btn-icons/Trash.svelte";
    import { ttd, days, strength, volume, defaultBoxClass, historyFocus } from "./stores";


    export let session : AuthSession
    let { user } = session
    let history = []
    let historyDates = []
    let loading = false

    // channel to listen for insert/delete changes on the auth user
    const supabaseChannel = supabase.channel('on_insert_delete')
        .on('postgres_changes', { 
                event: 'INSERT', 
                schema: 'public', 
                table: 'calculations',
                filter: `user_id=eq.${user.id}`
            }, payload => {
                fetchHistory()
            })
        .on('postgres_changes', { 
                event: 'DELETE', 
                schema: 'public', 
                table: 'calculations',
                filter: `user_id=eq.${user.id}`
            }, payload => {
                fetchHistory()
            })
    supabaseChannel.subscribe()

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
                // if there is history, sort in descending creation time
                history = data.sort(function(a, b) {
                var keyA = new Date(a.created_at), keyB = new Date(b.created_at)
                if (keyA < keyB) return 1
                    if (keyA > keyB) return -1
                    return 0
                })

                historyDates = history.map((entry) => {
                    return new Date(entry.created_at)
                })
            } 

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }

    const onHistoryClick = (index: number) => {
        const inputs = [
            {'ttd': ttd}, 
            {'days': days}, 
            {'strength': strength}, 
            {'volume': volume}, 
        ]
        for(const input of inputs) {
            Object.values(input)[0].set(history[index][Object.keys(input)[0]])
            document.getElementById(Object.keys(input)[0]).setAttribute('class', defaultBoxClass)
        }
        resValue.set(history[index]['result'])

        $historyFocus.id = index
    }

    const deleteHistory = async (date: Date) => {
        if (session) {
            const { user } = session
            const { data, error } = await supabase
                .from('calculations')
                .delete()
                .eq('created_at', date.toISOString())
                .eq('user_id', user.id)

            if (error) throw error
        }
    }
</script>

<div class="history-list">
    <span id="history_loading" class={loading ? 'loading' : ''}></span>
    <div>
        {#each historyDates as row, i}
            <ul class="menu menu-horizontal text-lg mt-3 ">
                <li><a on:click={()=> onHistoryClick(i)} 
                        id={'history_'+i}
                        class={$historyFocus.id == i ? 'active' : ''}>
                    {`${
                        ('0' + (row.getMonth() + 1)).slice(-2)}-${('0' + row.getDate()).slice(-2)}: ${
                        row.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
                    }`}
                </a></li>
    
                <li><a class="h-full content-center" on:click={() => deleteHistory(row)}>
                    <Trash size={'20'}/>
                </a></li>
            </ul>
        {/each}
    </div>
</div>

<style>
    .history-list {
        padding: 0;
		overflow-x: hidden;
		overflow-y: scroll;
		scroll-behavior: smooth;
        max-height: 100%;
    }

    ul {
		padding: 0;
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