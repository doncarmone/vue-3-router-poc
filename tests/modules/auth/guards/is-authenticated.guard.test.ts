import isAuhtenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import { describe } from 'vitest';
import type { RouteLocationNormalized } from 'vue-router';


describe('main', () => {

    const to: RouteLocationNormalized = {
        matched: [],
        fullPath: '',
        query: {},
        hash: '',
        redirectedFrom: undefined,
        name: undefined,
        path: '/home-screen',
        params: {},
        meta: {}
    }

    const from: any = {};
    const next = vi.fn();

    beforeEach(() => {
        localStorage.clear();
    })

    test('should block if not authenticated', async () => {
        await isAuhtenticatedGuard(to, from, next);
        expect(next).toHaveBeenCalledWith({ name: 'login' })
    })

    test('should call localstorage set items lastPath', async () => {
        await isAuhtenticatedGuard(to, from, next);
        const lastPath = localStorage.getItem('lastPath');
        expect(lastPath).toBe(to.path);
    })

    test('should called if not authenticated with spies', async () => {

        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        await isAuhtenticatedGuard(to, from, next);

        expect(setItemSpy).toHaveBeenCalledWith('lastPath', to.path);
    })
    test('should pass if authenticated', async () => {
        const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('ABC-12356');
        await isAuhtenticatedGuard(to, from, next);
        expect(next).toHaveBeenCalledWith();
    })
})