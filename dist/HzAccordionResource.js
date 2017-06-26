"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var core_1 = require("@haztivity/core");
require("jquery-ui-dist/jquery-ui.js");
var HzAccordionResource = HzAccordionResource_1 = (function (_super) {
    __extends(HzAccordionResource, _super);
    function HzAccordionResource(_$, _EventEmitterFactory, _DataOptions) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._activated = [];
        _this._DataOptions = _DataOptions;
        return _this;
    }
    HzAccordionResource.prototype.init = function (options, config) {
        this._config = config;
        this._options = options;
        this.refresh();
    };
    HzAccordionResource.prototype.refresh = function () {
        if (this._accordionInstance) {
            this._accordionInstance.destroy();
        }
        var accordionOptions = this._DataOptions.getDataOptions(this._$element, "accordion");
        this._options.accordion = this._$.extend(true, {}, HzAccordionResource_1.DEFAULTS_ACCORDION, accordionOptions);
        this._$element.accordion(this._options.accordion);
        this._accordionInstance = this._$element.accordion("instance");
        this._accordionInstance.headers.addClass(HzAccordionResource_1.CLASS_UNCOMPLETED);
        this._storeActive();
        this._assignEvents();
    };
    HzAccordionResource.prototype._assignEvents = function () {
        this._$element.off("." + HzAccordionResource_1.NAMESPACE);
        this._$element.on("accordionactivate" + "." + HzAccordionResource_1.NAMESPACE, { instance: this }, this._onPanelActivate);
        this._$element.on("accordionbeforeactivate" + "." + HzAccordionResource_1.NAMESPACE, { instance: this }, this._onBeforePanelActivate);
    };
    HzAccordionResource.prototype._onBeforePanelActivate = function (e, ui) {
        var instance = e.data.instance;
        if (instance._options.sequential != false) {
            var newHeader = ui.newHeader;
            if (newHeader && newHeader.length > 0) {
                var prevent = true, index = instance._accordionInstance.headers.index(newHeader);
                //if the header is not the first
                if (index != 0) {
                    //get the previous header
                    var sibling = instance._accordionInstance.headers.get(index - 1), siblingId = sibling.id;
                    //check if has been activated
                    if (instance._activated.indexOf(siblingId) != -1) {
                        prevent = false;
                    }
                }
                else {
                    prevent = false;
                }
                if (prevent) {
                    e.preventDefault();
                }
            }
        }
    };
    HzAccordionResource.prototype._onPanelActivate = function (e, ui) {
        e.data.instance._storeActive();
    };
    HzAccordionResource.prototype._storeActive = function () {
        if (this._accordionInstance) {
            if (this._accordionInstance.active.length > 0) {
                var id = this._accordionInstance.active.attr("id");
                if (this._activated.indexOf(id) == -1) {
                    this._activated.push(id);
                    this._accordionInstance.active.removeClass(HzAccordionResource_1.CLASS_UNCOMPLETED).addClass(HzAccordionResource_1.CLASS_COMPLETED);
                }
            }
            if (this.isCompleted() != true && this._activated.length == this._accordionInstance.headers.length) {
                this._markAsCompleted();
            }
        }
    };
    HzAccordionResource.prototype.disable = function () {
        if (_super.prototype.disable.call(this)) {
            this._$element.accordion("option", "disabled", true);
        }
    };
    HzAccordionResource.prototype.enable = function () {
        if (_super.prototype.enable.call(this)) {
            this._$element.accordion("option", "disabled", false);
        }
    };
    HzAccordionResource.prototype.destroy = function () {
        if (this._accordionInstance) {
            this._accordionInstance.destroy();
        }
        _super.prototype.destroy.call(this);
    };
    HzAccordionResource.prototype.getInstance = function () {
        return this._accordionInstance;
    };
    return HzAccordionResource;
}(core_1.ResourceController));
HzAccordionResource.NAMESPACE = "hzAccordion";
HzAccordionResource.DEFAULTS_ACCORDION = {
    heightStyle: "content"
};
HzAccordionResource = HzAccordionResource_1 = __decorate([
    core_1.Resource({
        name: "HzAccordion",
        dependencies: [
            core_1.$,
            core_1.EventEmitterFactory,
            core_1.DataOptions
        ]
    })
], HzAccordionResource);
exports.HzAccordionResource = HzAccordionResource;
var HzAccordionResource_1;
//# sourceMappingURL=HzAccordionResource.js.map