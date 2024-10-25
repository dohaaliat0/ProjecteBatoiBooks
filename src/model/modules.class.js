import Module from './module.class';

export default class Modules {
    constructor() {
        this.data = [];
    }

 async populate() {
        try {
            const modules = await this.getDBModules(); 
            this.data = modules.map(item => new Module(item.code, item.name, item.description)); 
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
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
        return this.data.map(module => module.toString()).join('\n');
    }
}
