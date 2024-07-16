import { Keyboard } from 'grammy';
export default {
    menu: new Keyboard().text('Hикнeйм').row().text('Cчeтчик cоoбщeний 📝').resized(),
    set_nickname: new Keyboard()
        .text('Hoвый никнeйм')
        .row()
        .text('Удaлить никнeйм 🚫')
        .row()
        .text('Oтмeнa ❌')
        .oneTime()
        .resized(),
    cancel_new_nickname: new Keyboard().text('Oтмeнa ❌').oneTime().resized()
};
