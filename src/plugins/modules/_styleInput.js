/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2021 JiHong Lee.
 * MIT license.
 */
'use strict';

export default {
    name: 'styleInput',
    /**
     * @description Constructor
     * Require context properties when using styleInput module
     * _style: {
            value: '',
            input: null,
            form: null
        }
     * @param {Object} core Core object 
     */
    add: function (core) {
        const context = core.context;
        context.styleInput = {
            groupHTML: null
        };

        /** set menu */
        let listDiv = this.createStyleGroup(core);

        /** caching */
        context.styleInput.groupHTML = listDiv;

        /** empty memory */
        listDiv = null;
    },

    /**
     * @description Create style input form
     * @param {Object} core Core object 
     * @returns {String} HTML string
     */
    createStyleGroup: function (core) {
        return '<form class="se-style-form">' +
            '<div class="se-form-group-label">' +
                '<label>' + core.lang.controller.style + '</label>' +
            '</div>' +
            '<div class="se-form-group">' +
                '<input type="text" class="_se_style_input"/>' +
                '<button type="submit" class="se-btn-primary" title="' + core.lang.dialogBox.submitButton + '">' +
                    core.icons.checked +
                '</button>' +
            '</div>' +
        '</form>';
    },

    /**
     * @description Inpput event of style input
     * @param {Event} e Input Event
     */
    onInputStyle: function (e) {
        this.value = e.target.value.trim();
    },

    /**
     * @description Call after executing "controllersOn" method of plugin
     * @param {Element} el Style input form element.(context[plugin]._style.form)
     * @param {Object} StyleContext Style context.(context[plugin]._style)
     */
    on: function (el, StyleContext) {
        if (el) StyleContext.value = StyleContext.input.value = el.style.cssText;
    },

    /**
     * @description Init function. (Called from plugin's add method)
     * @param {Element} formEl Style input form element.(context[plugin]._style.form)
     * @param {Object} StyleContext Style context.(context[plugin]._style)
     * @param {Function} submitHandler Handler to apply style.
     * @param {Function} controllerHandler Controller call handler.
     */
    init: function (formEl, StyleContext, submitHandler, controllerHandler) {
        StyleContext.form = formEl;
        StyleContext.input = formEl.querySelector('._se_style_input');
        StyleContext.input.addEventListener('input', this.plugins.styleInput.onInputStyle.bind(StyleContext));
        formEl.addEventListener('submit', function (e) {
            e.preventDefault();
            submitHandler(StyleContext.value);
            controllerHandler();
        });
    }
};