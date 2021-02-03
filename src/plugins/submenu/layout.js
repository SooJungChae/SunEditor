/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */
'use strict';

export default {
    name: 'layout',
    display: 'submenu',
    add: function (core, targetElement) {
        const context = core.context;
        context.layout = {};

        /** set submenu */
        let layoutDiv = this.setSubmenu.call(core);

        /** add event listeners */
        layoutDiv.querySelector('ul').addEventListener('click', this.pickup.bind(core));

        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, layoutDiv);

        /** empty memory */
        layoutDiv = null;
    },

    setSubmenu: function () {
        const layoutList = this.context.option.layoutList;
        if (!layoutList || layoutList.length === 0) {
            throw Error('[SUNEDITOR.plugins.layout.fail] To use the "layout" plugin, please define the "layoutList" option.');
        }

        const listDiv = this.util.createElement('DIV');
        listDiv.className = 'se-list-layer';

        let list = '<div class="se-submenu se-list-inner">' +
                '<ul class="se-list-basic">';
        for (let i = 0, len = layoutList.length, t; i < len; i++) {
            t = layoutList[i];
            list += '<li><button type="button" class="se-btn-list" data-value="' + i + '" title="' + t.name + '">' + t.name + '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },

    pickup: function (e) {
        if (!/^BUTTON$/i.test(e.target.tagName)) return false;

        e.preventDefault();
        e.stopPropagation();

        const layout = this.context.option.layoutList[e.target.getAttribute('data-value')];

        if (layout.html) {
            this.setContents(layout.html);
        } else {
            this.submenuOff();
            throw Error('[SUNEDITOR.layout.fail] cause : "layoutList[i].html not found"');
        }
        
        this.submenuOff();
    }
};