<!--HTML-->
<template>
    <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Navbar/>

        <div class="app-main">
            <Sidebar/>

            <div class="app-main__outer">
                <slot name="content"></slot>
            </div>
        </div>

    </div>
</template>


<script>
    import Sidebar from "./partials/Sidebar";
    import Navbar from "./partials/Navbar";

    export default {
        name: "Master",
        components: {Navbar, Sidebar},
    }
</script>


<style>
    @import "../../main.css";
</style>

