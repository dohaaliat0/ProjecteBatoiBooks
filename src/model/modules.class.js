// src/model/modules.class.js
import Module from './module.class';

export default class Modules {
    constructor() {
        this.data = [];
    }

    populate(data) {
        this.data = data.map(item => new Module(item));
    }

    getModuleByCode(code) {
        const module = this.data.find(item => item.code === code);
        if (!module) {
            throw new Error(`No existe un módulo con el código: ${code}`);
        }
        return module;
    }

    toString() {
        return this.data.map(module => module.toString()).join('\n');
    }
}
