import { describe, test, expect } from 'vitest';
import Module from '../src/model/module.class';

describe('Clase Module', () => {
    test('constructor crea un módulo', () => {
        const data = { code: 'AAAA', cliteral: 'Nuevo módulo', vliteral: 'Nou mòdul', courseId: '12' };
        const module = new Module(data);
        
        expect(module).toBeInstanceOf(Module);
        expect(module.code).toBe(data.code);
        expect(module.cliteral).toBe(data.cliteral);
        expect(module.vliteral).toBe(data.vliteral);
        expect(module.courseId).toBe(data.courseId);
    });

    test('toString pinta el módulo correctamente', () => {
        const data = { code: 'AAAA', cliteral: 'Nuevo módulo', vliteral: 'Nou mòdul', courseId: '12' };
        const module = new Module(data);
        
        const expectedString = 'AAAA (Nuevo módulo) (Curso ID: 12)';
        expect(module.toString()).toBe(expectedString);
    });
});
