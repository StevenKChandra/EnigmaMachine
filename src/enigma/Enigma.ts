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

export class Rotor {
    private readonly rotorType: RotorType;
    private readonly ringSetting: number;
    private readonly intialSetting: number;

    /**
     * Consist of:
     * 
     *      (roman numeral) I - VIII
     */
    public static readonly RotorType = RotorType;

    private static readonly codeforA: number = "A".charCodeAt(0);
    /**
     * Make a new Reflector Object
     * @param reflectorType is an enumerated RotorType from Rotor.RotorType
     * @param ringSetting takes an alphabetical character / string of length 1
     * @param ringSetting takes an alphabetical character / string of length 1
     */
    constructor(rotorType: RotorType, ringSetting: string, initialSetting: string){
        if (ringSetting.length !== 1 || !ringSetting.charAt(0).match(/[a-zA-Z]/)){
            throw Error("ringSetting only takes a single alphabet character");
        }
        if (initialSetting.length !== 1 || !initialSetting.charAt(0).match(/[a-zA-Z]/)){
            throw Error("initialSetting only takes a single alphabet character");
        }

        this.rotorType = rotorType;
        this.ringSetting = ringSetting.toUpperCase().charCodeAt(0) - Rotor.codeforA;
        this.intialSetting = initialSetting.toUpperCase().charCodeAt(0) - Rotor.codeforA;
    }

}
