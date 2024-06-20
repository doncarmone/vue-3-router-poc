import App from "@/App.vue"
import router from "@/router";
import { mount } from "@vue/test-utils"
import type { RouteLocationNormalized } from "vue-router";


describe('router', () => {

    const wrapper = mount(App, {
        global: {
            plugins: [router]
        }
    });

    test('should renders home page when visiting /', async () => {
        await router.push('/');
        await router.isReady();
        expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web');

    })

    test('should renders home page when visiting /features', async () => {
        await router.push('/features');
        await router.isReady();
        expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');

        await router.replace('/');
        await router.push({ name: 'features' });
        expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');
    })

    test('should renders home page when visiting /pricing', async () => {
        await router.push('/pricing');
        await router.isReady();
        expect(wrapper.html()).toContain('Flexible');
    })

    test('should renders home page when visiting /contact', async () => {
        await router.push('/contact');
        await router.isReady();
        expect(wrapper.html()).toContain('Feedback');
    })


    test('should renders login when Pokemon Page when visiting /pokemon/:id and no auth', async () => {
        localStorage.clear();

        await router.push('/pokemon/25');
        await router.isReady();


        expect(wrapper.html()).toContain('Login');
    })

    test('should renders Pokemon Page when visiting /pokemon/:id', async () => {
        localStorage.setItem('userId', 'ABC-123456')

        await router.push('/pokemon/25');
        await router.isReady();


        expect(wrapper.find('h1').text()).toContain('Pokemon #25');
    })

    test('should convert the segment into numbers', () => {
        const route: RouteLocationNormalized = {
            matched: [],
            fullPath: '/pokemon/2',
            query: {},
            hash: '',
            redirectedFrom: undefined,
            name: undefined,
            meta: {},
            path: '',
            params: { id: '2' },
        };

        const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

        const { id } = (pokemonRoute?.props as any).default(route);

        expect(pokemonRoute).toBeTruthy();
        expect(id).toBe(2);
    });


    test('should return default value if argument is not a number', () => {
        const route: any = {
            fullPath: '/pokemon/2',
            params: { id: '2abc' },
        };

        const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

        const { id } = (pokemonRoute?.props as any).default(route);

        expect(pokemonRoute).toBeTruthy();
        expect(id).toBe(1);
    });
})