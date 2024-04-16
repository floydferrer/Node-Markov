const { MarkovMachine } = require('./markov');

let mm = new MarkovMachine('the cat in the hat');
describe('makeChain functions', function(){
    test('separate words array', function(){
        const res = mm.words;
        expect(res).toEqual(['the', 'cat', 'in', 'the', 'hat']);
    });
    test('create chains', function(){
        const chain = mm.chains;
        expect(chain).toEqual({
            'the': ['cat', 'hat'],
            'cat': ['in'],
            'in': ['the'],
            'hat': [null]
        });
    });
})

describe('makeText functions', function(){
    const ranWord = mm.generateWord(Object.keys(mm.chains)); //excludes last word
    test('random word generation', function(){
        expect(ranWord).toEqual(expect.any(String));
    })
    test('null break', function(){
        const lastWord = Object.keys(mm.chains)[Object.keys(mm.chains).length-1];
        const lastWordValue = mm.chains[Object.keys(mm.chains)[Object.keys(mm.chains).length-1]];
        expect(lastWord).toEqual('hat');
        expect(lastWordValue).toEqual([null]);
    })
})