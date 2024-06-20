import PokemonPage from '@/modules/pokemons/pages/PokemonPage.vue';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe } from 'vitest';


describe('main', () => {
    const wrapper = mount(PokemonPage, {
        props: {
            id: 25
        },
        global: {
            stubs: {
                RouterLink: RouterLinkStub
            }
        }
    });

    test('should render', async () => {

        expect(wrapper.find('h1').exists()).toBe(true);

    })

    test('should render pokemon name', async () => {
        const link = wrapper.findComponent(RouterLinkStub);

        expect(link.props().to).toEqual({ name: 'pokemon', params: { id: 26 } });

    })
});