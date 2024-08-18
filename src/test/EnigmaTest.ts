import { Reflector, Rotor} from "../enigma/Enigma"

const assert = require('node:assert/strict');

describe("Rotor", function() {
    /**
     *  Testing Strategy:
     *      partition on ringSetting:
     *          alphabet, non alphabet
     *          length 1, length not 1
     *      partition on initialSetting:
     *          alphabet, non alphabet
     *          length 1, length not 1
     */
    it("accepts ringSetting alphabet length 1, " +
        "initialSetting alphabet length 1", function() {

        const rotor = new Rotor(Rotor.RotorType.I, "a", "b");
    });
    it("does not accepts ringSetting non alphabet", function() {
        const err: Error = new Error ("ringSetting only takes a single alphabet character");
        assert.throws(function () {
            const rotor = new Rotor(Rotor.RotorType.I, "1", "b");
        })
    });
    it("does not accepts ringSetting.length not 1", function() {
        const err: Error = new Error ("ringSetting only takes a single alphabet character");
        assert.throws(function () {
            const rotor = new Rotor(Rotor.RotorType.I, "ab", "b");
        })
    });
    it("does not accepts initialSetting non alphabet", function() {
        assert.throws(function () {
            const rotor = new Rotor(Rotor.RotorType.I, "a", "2");
        })
    });
    it("does not accepts initialSetting.length not 1", function() {
        const err: Error = new Error("initialSetting only takes a single alphabet character");
        assert.throws(function () {
            const rotor = new Rotor(Rotor.RotorType.I, "a", "bc");
        })
    });
});