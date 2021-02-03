import SunEditor from '../../lib/core';
import { Module } from '../Module';

declare interface _colorPicker extends Module {
    /**
     * @description Create style input form
     * @param core Core object 
     * @returns HTML string
     */
    createStyleGroup(core: SunEditor): string;

    /**
     * @description Inpput event of style input
     * @param e Input Event
     */
    onInputStyle(e: Event): void;

    /**
     * @description Call after executing "controllersOn" method of plugin
     * @param el Style input form element.(context[plugin]._style.form)
     * @param StyleContext Style context.(context[plugin]._style)
     */
    on(el: Element, StyleContext: Object): void;
    
    /**
     * @description Init function. (Called from plugin's add method)
     * @param formEl Style input form element.(context[plugin]._style.form)
     * @param StyleContext Style context.(context[plugin]._style)
     * @param submitHandler Handler to apply style.
     * @param controllerHandler Controller call handler.
     */
    init(formEl: Element, StyleContext: Object, submitHandler: Function, controllerHandler: Function): void;
}

export default _colorPicker;