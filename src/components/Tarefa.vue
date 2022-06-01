<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{tarefa.descricao || "Nova tarefa"}}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
            <div class="column">
                {{tarefa.projeto.nome}}
            </div>
        </div>
    </Box>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from './Box.vue'

export default defineComponent({
    name: 'Tarefa',
    components: { 
      Cronometro,
      Box
    },
    props: {
        tarefa: {
            type: Object as () => ITarefa,
            required: true,
        },
    },
})
</script>

<style scoped>

</style>
