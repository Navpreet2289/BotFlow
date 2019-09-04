export class Utter {
    constructor(
        id = "",
        name = "",
        multiple_alternatives = false,
        alternatives = [[""]]
    ) {
        this.id = id;
        this.name = name;
        this.alternatives = alternatives;
        this.multiple_alternatives = multiple_alternatives;
    }
};

export class Intent {
    constructor(id = "", name = "", samples = [""]) {
        this.id = id;
        this.name = name;
        this.samples = samples;
    }
};