<template>
    <div>
        <tracks :page='page'/>
    </div>
</template>

<script>
import Tracks from '@/components/Tracks'

    export default {
        name: 'Home',

        data(){
            return {
                page: 'home',
            }
        },

        mounted(){
            this.$store.dispatch('getTracks', { genre: 'electronic', page: 1 })
        },

        components:{
            Tracks
        }
    }
</script>

<style scoped>

</style>