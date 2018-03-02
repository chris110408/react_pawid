import {getTypeOf,isPromise } from './getType';



describe('test getTypeOfAuth', () => {

    it('undefined args will return undefined', () => {
        expect(getTypeOf(null)).toEqual('Empty');
    });
    it(' empty args will return empty', () => {
        expect(getTypeOf('')).toEqual('Empty');
    });
    it(' number will return number', () => {
        expect(getTypeOf(1)).toEqual('Number');
    });
    it(' [1] will return array', () => {
        expect(getTypeOf([1])).toEqual('Array');
    });
});


describe('test isPromise', () => {

    it( '{} will return false', () => {
        expect(isPromise({})).toEqual(false);
    });
    it( 'promise will return true', () => {
        expect(isPromise({then:()=>{}})).toEqual(true);
    });
    it( 'number will return false', () => {
        expect(isPromise(1)).toEqual(false);
    });
});