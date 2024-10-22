<template>
<input type="text" :value="props.modelValue" @input="$emit('update:modelValue',$event.target.value)">
</template>
<script setup>
const props= defineProps({
   modelValue:{
        type:String,
        required:true
    }
})

</script>