<script>
    import { writable } from "svelte/store";
    import Sun from './btn-icons/Sun.svelte'
    import Moon from './btn-icons/Moon.svelte'

    export let appTheme = writable({'appTheme': localStorage.getItem('appTheme')})

    // set html and localStorage with current theme
    const applyTheme = () => {
        if ($appTheme.appTheme) {
            document.getElementsByTagName('html')[0].setAttribute('data-theme', $appTheme.appTheme)
            localStorage.setItem('appTheme', $appTheme.appTheme)
        }
    }
    applyTheme()

    const toggleTheme = () => {
        ($appTheme.appTheme === 'light' || $appTheme.appTheme === null) ? 
        appTheme.set({'appTheme' : 'dark'}) :
        appTheme.set({'appTheme' : 'light'})
        applyTheme()
    }
  </script>
  
<div class="grid justify-start my-5 px-5">
  <button name="theme" aria-label="switch theme"
    on:click={toggleTheme} class="btn btn-circle">
    
    {#if $appTheme.appTheme === 'light' || $appTheme.appTheme === null}
        <Sun class="w-5 h-5"/>
    {:else}
        <Moon class="w-5 h-5"/>
    {/if}

  </button>
</div>