import {ref , onMounted , onUnmounted} from 'vue'
export function useMouse() {

    const x = ref (null)
    const y = ref (null)
    const update=(e)=>{
        const x = e.page.X
        const Y = e.page.Y
console.log('aaaaaaa')
    }

    onMounted(()=>{window.addEventListener('mouse',update)})
    onUnmounted(()=>{window.removeEventListener('mouse',update)})


    return {x,y}

    
}