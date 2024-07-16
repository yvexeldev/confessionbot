import { Context } from 'grammy';
import { User } from '../models/User';

// returns user if exists, creates it if not
export async function newUser(ctx: Context) {
    const user = await User.findOne({ where: { telegram_id: String(ctx.from?.id) } });
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
    const user = await newUser(ctx);
    user.step = step;
    await user.save();
}

export async function checkStep(ctx: Context, step: string) {
    const user = await newUser(ctx);
    return user.step === step;
}

export async function changeNickname(ctx: Context, nickname: string) {
    const stepcheck = await checkStep(ctx, 'set_nickname');
    if (!stepcheck) {
        return;
    }
    const user = await newUser(ctx);
    user.nickname = nickname;
    await user.save();
}

export async function deleteNickname(ctx: Context) {
    const stepcheck = await checkStep(ctx, 'set_nickname');
    if (!stepcheck) {
        return;
    }
    const user = await newUser(ctx);
    user.nickname = '';
    await user.save();
}

export async function setCrown(ctx: Context) {
    const user = await newUser(ctx);
    user.has_crown = true;
    await user.save();
}
