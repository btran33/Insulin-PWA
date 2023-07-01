<script>
    import { writable } from "svelte/store";
    import Sun from './btn-icons/Sun.svelte'
    import Moon from './btn-icons/Moon.svelte'

    let availableTheme = ['light', 'dracula']
    let appTheme = writable({'appTheme': localStorage.getItem('appTheme')})

    // set html and localStorage with current theme
    const applyTheme = () => {
        if ($appTheme.appTheme) {
            document.getElementsByTagName('html')[0].setAttribute('data-theme', $appTheme.appTheme)
            localStorage.setItem('appTheme', $appTheme.appTheme)
        }
    }
    applyTheme()

    const toggleTheme = () => {
        ($appTheme.appTheme === availableTheme[0] || $appTheme.appTheme === null) ? 
        appTheme.set({'appTheme' : availableTheme[1]}) :
        appTheme.set({'appTheme' : availableTheme[0]})
        applyTheme()
    }
</script>
  
<div >
  <button name="theme" aria-label="switch theme"
    on:click={toggleTheme} class="btn btn-circle">
    
    {#if $appTheme.appTheme === availableTheme[0] || $appTheme.appTheme === null}
        <Sun class="w-5 h-5"/>
    {:else}
        <Moon class="w-5 h-5"/>
    {/if}

  </button>
</div>