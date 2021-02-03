/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */
'use strict';


export default {
    name: 'actionComponents',
    display: 'container',
    add: function (core, targetElement) {
        // @Required
        // Registering a namespace for caching as a plugin name in the context object
        const context = core.context;
        context.actionComponents = {};

        // Generate submenu HTML
        // Always bind "core" when calling a plugin function
        let listDiv = this.setSubmenu(core);

        // You must bind "core" object when registering an event.
        /** add event listeners */
        listDiv.querySelector('.se-list-basic').addEventListener('click', this.onClick.bind(core));

        // @Required
        // You must add the "submenu" element using the "core.initMenuTarget" method.
        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);

        listDiv = null;
    },

    setSubmenu: function (core) {
        const listDiv = core.util.createElement('DIV');

        listDiv.className = 'se-list-layer';
        listDiv.innerHTML = '<div class="se-submenu se-list-inner">' +
            '<ul class="se-list-basic">' +
                '<li><button type="button" class="se-btn-list" data-command="button" title="Button">Button</button></li>' +
                '<li><button type="button" class="se-btn-list" data-command="dropdown" title="Dropdown">Dropdown</button></li>' +
            '</ul>' +
        '</div>';

        return listDiv;
    },

    onClick: function (e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let command = '';

        while (!command && !/^UL$/i.test(target.tagName)) {
            command = target.getAttribute('data-command');
            if (command) break;
            target = target.parentNode;
        }

        if (!command) return;

        const plugin = this.plugins[command];
        this.actionCall(command, (plugin ? plugin.display : ''), target);
        this.containerOff();
    }
};