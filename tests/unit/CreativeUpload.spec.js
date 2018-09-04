import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import HelloWorld from '@/components/CreativeUpload'

const factory = (values = {}) => {
    return shallowMount(HelloWorld, {
        propsData: {...values}
    })
};

describe('Тесты состояний кнопок при изменении свойства creativeSet', () => {
    it('пустой creativeSet', () => {
        const type = 'interstitial';
        const creativeSet = [];
        const wrapper = factory({type, creativeSet});

        expect(wrapper.findAll('.el-icon-success').length).equal(0)
    });

    it('creativeSet c dimensions другого типа', () => {
        const type = 'interstitial';
        const creativeSet = [{dimensions: {width: 320, height: 481}, assetUrl: ""}];
        const wrapper = factory({type, creativeSet});

        expect(wrapper.findAll('.el-icon-success').length).equal(0)
    });

    it('валидный creativeSet', () => {
        const type = 'interstitial';
        const creativeSet = [{dimensions: {width: 320, height: 480}, assetUrl: ""}, {dimensions: { width: 1600, height: 900 }, assetUrl: ""}];
        const wrapper = factory({type, creativeSet});

        expect(wrapper.findAll('.el-icon-success').length).equal(2)
    });
});

describe('Столбцы и варианты размеров должны соответствовать выбранному значению свойства type', () => {
    const colsTest = (type) => {
        const wrapper = factory({type});
        const cols = Object.keys(HelloWorld.data().types[type]);
        let dimensionsCount = 0;

        for (let col of cols)
            dimensionsCount += HelloWorld.data().types[type][col].dimensions.length

        expect(wrapper.findAll('.type-column').length).equal(cols.length);
        expect(wrapper.findAll('.type-column > .dimension').length).equal(dimensionsCount);
    };

    it('тест колонок для типа interstitial', () => {
        colsTest('interstitial');
    });

    it('тест колонок для типа banner', () => {
        colsTest('banner');
    });

    it('тест кол-во колонок для инвалидного типа', () => {
        const type = 'test';
        const wrapper = factory({type});

        expect(wrapper.findAll('.type-column').length).equal(0)
    });
});