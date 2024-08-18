enum ReflectorType {
    UKWB = "satu",
    UKWC = "dua",
}

export class Reflector{
    /**
     * Consist of:
     * 
     *      UKWB
     *      UKWC
     */

    public static readonly ReflectorType = ReflectorType;
    private readonly reflector: ReflectorType;

    /**
     * Make a new Reflector Object
     * @param reflectorType is an enumerated ReflectorType from Reflector.ReflectorType
     */
    constructor (reflectorType: ReflectorType) {
        this.reflector = reflectorType;
    }
    
    public get reflectorType(): ReflectorType {
        return this.reflector;
    }
}

enum RotorType {
    I = "satu",
    II = "dua",
    III = "tiga",
    IV = "empat",
    V = "lima",
    VI = "enam",
    VII = "tujuh",
    VIII = "delapan",
}

/**
 * Helper function that checks if a string is an alphabetical character or not
 * @param c string to check
 * @returns true iff c is an alphabetical character
 */
function isAlphabeticalChar(c: string): boolean {
    return !(c.length !== 1 || !c.charAt(0).match(/[a-zA-Z]/))
}

export class Rotor {
    private readonly rotor: RotorType;
    private readonly ring: string;
    private readonly initial: string;

    /**
     * Consist of:
     * 
     *      (roman numeral) I - VIII
     */
    public static readonly RotorType = RotorType;

    /**
     * Make a new Reflector Object
     * @param reflectorType is an enumerated RotorType from Rotor.RotorType
     * @param ringSetting takes an alphabetical character / string of length 1
     * @param ringSetting takes an alphabetical character / string of length 1
     */
    constructor(rotorType: RotorType, ringSetting: string, initialSetting: string){
        if (!isAlphabeticalChar(ringSetting)){
            throw new Error("ringSetting only takes a single alphabet character");
        }
        if (!isAlphabeticalChar(initialSetting)){
            throw new Error("initialSetting only takes a single alphabet character");
        }

        this.rotor = rotorType;
        this.ring = ringSetting.toUpperCase();
        this.initial = initialSetting.toUpperCase();
    }

    public get rotorType(): RotorType {
        return this.rotor;
    }

    public get ringSetting(): string {
        return this.ring;
    }

    public get intitialSetting(): string {
        return this.initial;
    }

}

export class EnigmaSetting {
    private readonly reflector: Reflector;
    private readonly rotor:  Array<Rotor>;
    private readonly plugboard: Array<[string, string]>;

    /**
     * Make a new EnigmaSetting object
     * @param reflector is a Reflector object
     * @param rotor is an array of Rotors object, with length 3 or 4
     * @param plugboard is an array of a single alphabetical character pairs, plugboard.length < 10
     */
    constructor(reflector: Reflector, rotor: Array<Rotor>, plugboard: Array<[string, string]>) {
        if (!(rotor.length == 4 || rotor.length == 3)){
            throw new Error("rotors.length must be 3 or 4");
        }
        this.checkPlugboard(plugboard);

        this.reflector = reflector;
        this.rotor = new Array<Rotor> ();
        rotor.forEach(value => this.rotor.push(new Rotor(value.rotorType, value.ringSetting, value.intitialSetting)));
        this.plugboard = new Array<[string, string]> ();
        plugboard.forEach(value => this.plugboard.push([value[0], value[1]]));
    }

    private checkPlugboard(plugboard: Array<[string, string]>): void {
        if (plugboard.length > 10){
            throw new Error("plugboard.length must be between 0 and 10 (inclusive)");
        }
        let set: Set<string> = new Set<string> ();
        for (let connection of plugboard){
            if (!isAlphabeticalChar(connection[0]) || !isAlphabeticalChar(connection[1])){
                throw new Error("plugboard element must be a single alphabet character");
            }
            if (set.has(connection[0]) || set.has(connection[1])){
                throw new Error("plugboard cannot contain duplicate element");
            }
            set.add(connection[0]);
            set.add(connection[1]);
        }
    }
}

export class Enigma {

    private static reflectorWiring: Array<string> = new Array<string> (
        "YRUHQSLDPXNGOKMIEBFZCWVJAT",
        "FVPJIAOYEDRZXWGCTKUQSBNMHL",
    )

    private static rotorWiring: Array<string> = new Array<string> (
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "ESOVPZJAYQUIRHXLNFTGKDCMWB",
        "VZBRGITYUPSDNHLXAWMJQOFECK",
        "JPGVOUMFYQBENHZRDKASXLICTW",
        "NZJHGRCXMYSWBOUFAIVLPEKQDT",
        "FKQHTLXOCBJSPDZRAMEWNIUYGV",
    )

}