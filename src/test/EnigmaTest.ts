import assert from 'node:assert/strict';
import { Rotor, EnigmaSetting, Reflector} from "../enigma/Enigma";
import exp from 'node:constants';

describe("Rotor", function() {
    /**
     *  Testing Strategy:
     * 
     *      test getter function on correct object
     * 
     *      partition on ringSetting:
     *          alphabet, non alphabet
     *          length 1, length not 1
     * 
     *      partition on initialSetting:
     *          alphabet, non alphabet
     *          length 1, length not 1
     */
    it("accepts ringSetting alphabet length 1, " +
        "initialSetting alphabet length 1, ", function() {
        new Rotor(Rotor.RotorType.I, "a", "b");
    });
    it("getter functions return correct values", function() {
        const rotor = new Rotor(Rotor.RotorType.I, "a", "b");
        assert.deepStrictEqual(rotor.rotorType, Rotor.RotorType.I, "getter function rotorType returns wrong value");
        assert.deepStrictEqual(rotor.ringSetting, "A", "getter function ringSetting returns wrong value");
        assert.deepStrictEqual(rotor.intitialSetting, "B", "getter function initialSetting returns wrong value");
    });
    it("does not accepts ringSetting non alphabet", function() {
        const expectedError: Error = new Error ("ringSetting only takes a single alphabet character");
        assert.throws(function () {
            new Rotor(Rotor.RotorType.I, "1", "b");
        }, expectedError);
    });
    it("does not accepts ringSetting.length not 1", function() {
        const expectedError: Error = new Error ("ringSetting only takes a single alphabet character");
        assert.throws(function () {
            new Rotor(Rotor.RotorType.I, "ab", "b");
        }, expectedError);
    });
    it("does not accepts initialSetting non alphabet", function() {
        const expectedError: Error = new Error("initialSetting only takes a single alphabet character");
        assert.throws(function () {
            new Rotor(Rotor.RotorType.I, "a", "2");
        }, expectedError);
    });
    it("does not accepts initialSetting.length not 1", function() {
        const expectedError: Error = new Error("initialSetting only takes a single alphabet character");
        assert.throws(function () {
            new Rotor(Rotor.RotorType.I, "a", "bc");
        }, expectedError);
    });
});

describe("EnigmaSetting", function() {
    /**
     *  Testing Strategy:
     * 
     *      test getter functions on correct object
     *          
     *      partition on rotor:
     *          3 <= rotor.length <= 4, rotor.length < 3, rotor.length > 4
     * 
     *      partition on plugboard:
     *          length = 0, 0 < length < 10, length = 10, length > 10
     *          there exist a duplicate character, no duplicate character
     *          there exist an element that is not alphabetical character, all elements are alphabetical character
     */
    
    const reflector: Reflector = new Reflector(Reflector.ReflectorType.UKWC);
    const rotors: Array<Rotor> = new Array <Rotor> (
        new Rotor(Rotor.RotorType.I, "a", "b"),
        new Rotor(Rotor.RotorType.IV, "c", "d"),
        new Rotor(Rotor.RotorType.III, "x", "y"),
        new Rotor(Rotor.RotorType.V, "i", "j"),
        new Rotor(Rotor.RotorType.VIII, "m", "n"),
    );
    it("accept rotors.length of exactly 3, " +
        "accepts plugboard.length of 0", function () {
        new EnigmaSetting(reflector, rotors.slice(0, 3), []);
    });
    it("accept rotors.length of exactly 4, " +
        "accepts 0 < plugboard.length < 10, " +
        "all elements are alphabetical character, " +
        "no duplicate character", function () {
        new EnigmaSetting(reflector, rotors.slice(1, 5), [["a", "b"], ["c", "d"]]);
    });
    it("accepts plugboard.length = 10, " +
        "getter functions working correctly",  function () {
        const enigmaSetting: EnigmaSetting = new EnigmaSetting(reflector, rotors.slice(1, 4), [["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"], ["i", "j"], ["k", "l"], ["m", "n"], ["o", "p"], ["q", "r"], ["s", "t"]]);
        assert.deepStrictEqual(enigmaSetting.reflector, reflector, "getter function reflector returns wrong value");
        assert.deepStrictEqual(enigmaSetting.rotor, rotors.slice(1, 4), "getter function plugboard returns wrong value");
        assert.deepStrictEqual(enigmaSetting.plugboard, [["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"], ["i", "j"], ["k", "l"], ["m", "n"], ["o", "p"], ["q", "r"], ["s", "t"]], "getter function plugboard returns wrong value");
    });
    it("rejects rotor.length < 3 ", function() {
        const expectedError: Error = new Error ("rotors.length must be 3 or 4");
        assert.throws(function() {
            new EnigmaSetting(reflector, rotors.slice(1, 3), []);
        }, expectedError);
    });
    it("rejects rotor.length > 4 ", function() {
        const expectedError: Error = new Error ("rotors.length must be 3 or 4");
        assert.throws(function() {
            new EnigmaSetting(reflector, rotors.slice(0, 5), [["a", "b"], ["c", "d"]]);
        }, expectedError);
    });
    it("rejets plugboard.length > 10", function (){
        const expectedError: Error = new Error ("plugboard.length must be between 0 and 10 (inclusive)");
        assert.throws(function() {
            new EnigmaSetting(reflector, rotors.slice(2, 5), [["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"], ["i", "j"], ["k", "l"], ["m", "n"], ["o", "p"], ["q", "r"], ["s", "t"], ["u", "v"]]);
        }, expectedError);
    });
    it("rejects if there exist an element that is not alphabetical character", function (){
        const expectedError: Error = new Error ("plugboard element must be a single alphabet character");
        assert.throws(function() {
            new EnigmaSetting(reflector, rotors.slice(0, 3), [["a", "be"], ["d", "c"]]);
        }, expectedError);
    });
    it("rejets plugboard with an duplicate element", function (){
        const expectedError: Error = new Error ("plugboard cannot contain duplicate element");
        assert.throws(function() {
            new EnigmaSetting(reflector, rotors.slice(0, 3), [["a", "b"], ["b", "c"]]);
        }, expectedError);
    });
});