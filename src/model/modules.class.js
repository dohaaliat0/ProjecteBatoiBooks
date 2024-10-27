import Module from './module.class';
import '../services/modules.api.js';
import {getDBModules} from "../services/modules.api.js";

export default class Modules {
    constructor() {
        this.data = [];
    }

 async populate() {
     const users = await getDBModules();
     this.data = users.map((item) => new Module(
         item.code,
         item.cliteral,
         item.vliteral,
         item.courseId
     ))
    }
    
    getModuleByCode(code) {
        const module = this.data.find(item => item.code === code);
        if (!module) {
            if (!module) {
                throw new Error(`No existe un módulo con el código: ${code}`); // Usa comillas invertidas
            }
                    }
        return module;
    }

    toString() {
        return this.data.map(module => module.code).join('\n');
    }
}
