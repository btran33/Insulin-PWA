<script>
    import HamburgerMenu from "./btn-icons/HamburgerMenu.svelte"
    import XIcon from "./btn-icons/XIcon.svelte";
    import SwitchTheme from "./SwitchTheme.svelte";

    export let title = ''
</script>

<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content grid grid-flow-col grid-cols-3 px-5">
      <!-- Page content here -->
      <label for="my-drawer" class="btn drawer-button w-fit"><HamburgerMenu /></label>
      <div class="text-center text-3xl font-bold my-5 gap-4 "> {title} </div>
      
    </div> 

    <div class="drawer-side ">
      <label for="my-drawer" ></label>
      <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content grid grid-rows-3">
        <!-- Sidebar content here -->
        <div class="grid  grid-cols-3 justify-items-stretch h-fit border-b-2">
            <div/>
            <div class="text-center text-xl my-5 "> History </div>
            <div class="grid grid-flow-col justify-end ">
                <label for="my-drawer" class="btn btn-circle btn-sm drawer-button"><XIcon/></label>
            </div>

        </div>

        <div class="border border-red-500">

        </div>

        
        <div class="border border-red-500">
            <SwitchTheme/>
        </div>

      </ul>
    </div>
</div>

