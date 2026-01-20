import zod from 'zod';

export const CreateUserSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(6).max(100),
    name: zod.string().min(1).max(50),
});

export const SigninSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(6).max(100),
});

export const CreateRoomSchema = zod.object({
    roomName: zod.string().min(3).max(50),
});