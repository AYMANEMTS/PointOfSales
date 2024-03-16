import beepSound from "../assets/sound/beep-29.mp3"
import { Audio } from 'expo-av';
const func = {
    setErrors: (errors,setFunc) => {
        Object.keys(errors).forEach((field) => {
            setFunc(field, {
                type: 'manual',
                message: errors[field],
            })
        })
    },
    playSound: async () => {
        const {sound} = await Audio.Sound.createAsync(beepSound)
        await sound.playAsync()
    }
}
export default func