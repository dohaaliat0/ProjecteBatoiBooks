import Module from './module.class';

export default class Modules {
    constructor() {
        this.data = [
            new Module('AAAA', 'Matemáticas', 'Curso de matemáticas básicas'),
            new Module('BBBB', 'Historia', 'Curso de historia mundial')
        ];
        
            
    }


    async populate() {
        try {
            const modules = await this.getDBModules(); // Asegúrate de que getDBModules devuelva un array de módulos
            this.data = modules.map(item => new Module(item.code, item.name, item.description)); // Ajusta los parámetros según el constructor de Module
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    }
    
    getModuleByCode(code) {
        const module = this.data.find(item => item.code === code);
        if (!module) {
            throw new Error('No existe un módulo con el código: ${code}');
        }
        return module;
    }

    toString() {
        return this.data.map(module => module.toString()).join('\n');
    }
}
