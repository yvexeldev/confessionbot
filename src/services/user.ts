import { Context } from 'grammy';
import { User } from '../models/User';
import { Message } from '../models/Message';

// returns user if exists, creates it if not
export async function newUser(ctx: Context) {
    const user = await User.findOne({ where: { telegram_id: String(ctx.from?.id) }, include: { model: Message } });
    if (!user) {
        return await User.create({
            telegram_id: String(ctx.from?.id),
            first_name: ctx.from?.first_name,
            last_name: ctx.from?.last_name,
            username: ctx.from?.username
        });
    }
    return user;
}

export async function changeStep(ctx: Context, step: string) {
    await User.update({ step }, { where: { telegram_id: String(ctx.from?.id) } });
}

export async function checkStep(ctx: Context, step: string) {
    const user = await newUser(ctx);
    return user.step === step;
}

export async function changeNickname(ctx: Context, nickname: string) {
    await User.update({ nickname }, { where: { telegram_id: String(ctx.from?.id) } });
}

export async function deleteNickname(ctx: Context) {
    await changeNickname(ctx, '');
}


export async function getUser(id: number) {
    return await User.findByPk(id);
}
export async function getNickname(ctx: Context) {
    const user = await newUser(ctx);
    return user.nickname;
}
