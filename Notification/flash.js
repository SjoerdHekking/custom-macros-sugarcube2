!function(e) {
	function t(s) {
		if(n[s]) return n[s].exports;
		var i = n[s] = {
			i: s,
			l: !1,
			exports: {}
		};
		return e[s].call(i.exports, i, i.exports, t), i.l = !0, i.exports
	}
	var n = {};
	t.m = e, t.c = n, t.d = function(e, n, s) {
		t.o(e, n) || Object.defineProperty(e, n, {
			configurable: !1,
			enumerable: !0,
			get: s
		})
	}, t.n = function(e) {
		var n = e && e.__esModule ? function() {
			return e.default
		} : function() {
			return e
		};
		return t.d(n, "a", n), n
	}, t.o = function(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, t.p = "", t(t.s = 1)
}([function(e, t, n) {
	"use strict";

	function s(e, t) {
		if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
	var i = function() {
			function e(e, t) {
				for(var n = 0; n < t.length; n++) {
					var s = t[n];
					s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
				}
			}
			return function(t, n, s) {
				return n && e(t.prototype, n), s && e(t, s), t
			}
		}(),
		r = function() {
			function e() {
				var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
					n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
				s(this, e), t && t.constructor === Object && (n = t, t = null), this.selector = t, this.options = Object.assign({}, e.DEFAULT_OPTIONS, n), this._bag = [], this._setElement(), this._process()
			}
			return i(e, [{
				key: "getBag",
				value: function() {
					return this._bag
				}
			}, {
				key: "setBag",
				value: function(e) {
					return this._bag.push(e), this
				}
			}, {
				key: "attach",
				value: function() {
					var e;
					return(e = this._bag).push.apply(e, arguments), this._checkLimit(), this
				}
			}, {
				key: "detach",
				value: function(e) {
					return this._bag = this._bag.filter(function(t) {
						return e instanceof FlashMessage && t !== e
					}), this
				}
			}, {
				key: "_setElement",
				value: function() {
					!this.selector || this.selector instanceof Element || this.selector.constructor === String && (this.selector = document.querySelectorAll(this.selector) || null)
				}
			}, {
				key: "_process",
				value: function() {
					var e = this;
					this.selector && (Array.isArray(this.selector) || this.selector.constructor === NodeList ? this.selector.forEach(function(t) {
						return e.setBag(new FlashMessage(t, e.options))
					}) : this.setBag(new FlashMessage(this.selector, this.options)), this._checkLimit())
				}
			}, {
				key: "_checkLimit",
				value: function() {
					if(this.options.limit && this._bag.length > this.options.limit)
						for(var e = 0; e < this._bag.length - this.options.limit; ++e) this._bag[e].destroy(), this.detach(this._bag[e])
				}
			}], [{
				key: "create",
				value: function() {
					return new e(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {})
				}
			}, {
				key: "DEFAULT_OPTIONS",
				get: function() {
					return {
						limit: 0
					}
				}
			}]), e
		}();
	t.a = r
}, function(e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var s = n(2),
		i = (n.n(s), n(0)),
		r = n(3),
		o = n(4);
	n.n(o);
	! function(e) {
		void 0 !== e && (e.Flash || (e.Flash = i.a), e.FlashMessage || (e.FlashMessage = r.a))
	}(window), t.default = {
		Flash: i.a,
		FlashMessage: r.a
	}
}, function(e, t) {
	"document" in self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || function(e) {
		"use strict";
		if("Element" in e) {
			var t = "classList",
				n = "prototype",
				s = e.Element[n],
				i = Object,
				r = String[n].trim || function() {
					return this.replace(/^\s+|\s+$/g, "")
				},
				o = Array[n].indexOf || function(e) {
					for(var t = 0, n = this.length; n > t; t++)
						if(t in this && this[t] === e) return t;
					return -1
				},
				a = function(e, t) {
					this.name = e, this.code = DOMException[e], this.message = t
				},
				l = function(e, t) {
					if("" === t) throw new a("SYNTAX_ERR", "An invalid or illegal string was specified");
					if(/\s/.test(t)) throw new a("INVALID_CHARACTER_ERR", "String contains an invalid character");
					return o.call(e, t)
				},
				u = function(e) {
					for(var t = r.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], s = 0, i = n.length; i > s; s++) this.push(n[s]);
					this._updateClassName = function() {
						e.setAttribute("class", "" + this)
					}
				},
				h = u[n] = [],
				c = function() {
					return new u(this)
				};
			if(a[n] = Error[n], h.item = function(e) {
					return this[e] || null
				}, h.contains = function(e) {
					return e += "", -1 !== l(this, e)
				}, h.add = function() {
					var e, t = arguments,
						n = 0,
						s = t.length,
						i = !1;
					do {
						e = t[n] + "", -1 === l(this, e) && (this.push(e), i = !0)
					} while (++n < s);
					i && this._updateClassName()
				}, h.remove = function() {
					var e, t, n = arguments,
						s = 0,
						i = n.length,
						r = !1;
					do {
						for(e = n[s] + "", t = l(this, e); - 1 !== t;) this.splice(t, 1), r = !0, t = l(this, e)
					} while (++s < i);
					r && this._updateClassName()
				}, h.toggle = function(e, t) {
					e += "";
					var n = this.contains(e),
						s = n ? !0 !== t && "remove" : !1 !== t && "add";
					return s && this[s](e), !0 === t || !1 === t ? t : !n
				}, h.toString = function() {
					return this.join(" ")
				}, i.defineProperty) {
				var _ = {
					get: c,
					enumerable: !0,
					configurable: !0
				};
				try {
					i.defineProperty(s, t, _)
				} catch(e) {
					(void 0 === e.number || -2146823252 === e.number) && (_.enumerable = !1, i.defineProperty(s, t, _))
				}
			} else i[n].__defineGetter__ && s.__defineGetter__(t, c)
		}
	}(self), function() {
		"use strict";
		var e = document.createElement("_");
		if(e.classList.add("c1", "c2"), !e.classList.contains("c2")) {
			var t = function(e) {
				var t = DOMTokenList.prototype[e];
				DOMTokenList.prototype[e] = function(e) {
					var n, s = arguments.length;
					for(n = 0; s > n; n++) e = arguments[n], t.call(this, e)
				}
			};
			t("add"), t("remove")
		}
		if(e.classList.toggle("c3", !1), e.classList.contains("c3")) {
			var n = DOMTokenList.prototype.toggle;
			DOMTokenList.prototype.toggle = function(e, t) {
				return 1 in arguments && !this.contains(e) == !t ? t : n.call(this, e)
			}
		}
		e = null
	}())
}, function(e, t, n) {
	"use strict";

	function s(e, t) {
		if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
    function genNewID() {
        var randomID = Math.floor(Math.random() * 100000000)
        return randomID;
    }
	var i = (n(0), function() {
			function e(e, t) {
				for(var n = 0; n < t.length; n++) {
					var s = t[n];
					s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
				}
			}
			return function(t, n, s) {
				return n && e(t.prototype, n), s && e(t, s), t
			}
		}()),
		r = function() {
			function e(t) {
				var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e._CONSTANTS.TYPES.ERROR,
					i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
				s(this, e), n.constructor === Object && (i = n, n = e._CONSTANTS.TYPES.ERROR), this.$_element = null, this.setOptions(i), t instanceof Element ? (this.$_element = t, this._composeMessage()) : (this.message = t, this.type = n), this.$_container = document.querySelector(this.options.container) || null, this._c_timeout = null, this.$_progress = null, this._progress_value = 0, this._progress_offset = 0, this._progress_interval = null, this._createContainer(), this._createMessage()
			}
			return i(e, null, [{
				key: "_CONSTANTS",
				get: function() {
					return {
						TYPES: {
							SUCCESS: "success",
							WARNING: "warning",
							ERROR: "error",
							INFO: "info"
						},
						THEME: "default",
                        LAYOUT: "top-right",
						CONTAINER: ".flash-container",
						CLASSES: {
							CONTAINER: "flash-container",
							VISIBLE: "is-visible",
							FLASH: "flash-message",
							PROGRESS: "flash-progress",
							PROGRESS_HIDDEN: "is-hidden"
						}
					}
				}
			}, {
				key: "DEFAULT_OPTIONS",
				get: function() {
					return {
						progress: !1,
						interactive: !0,
						timeout: 8e3,
						appear_delay: 200,
						remove_delay: 600,
						container: e._CONSTANTS.CONTAINER,
						classes: {
							container: e._CONSTANTS.CLASSES.CONTAINER,
							visible: e._CONSTANTS.CLASSES.VISIBLE,
							flash: e._CONSTANTS.CLASSES.FLASH,
							progress: e._CONSTANTS.CLASSES.PROGRESS,
							progress_hidden: e._CONSTANTS.CLASSES.PROGRESS_HIDDEN
						},
						theme: e._CONSTANTS.THEME,
                        layout: e._CONSTANTS.LAYOUT,
						onShow: null,
						onClick: null,
						onClose: null
					}
				}
			}]), i(e, [{
				key: "setOptions",
				value: function() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					return this.options = Object.assign({}, e.DEFAULT_OPTIONS, t), this
				}
			}, {
				key: "destroy",
				value: function() {
					this._close()
				}
			}, {
				key: "_createContainer",
				value: function() {
					null !== this.$_container && document.body.contains(this.$_container) || (this.$_container = document.createElement("div"), this.$_container.classList.add(this.options.classes.container), document.body.firstChild ? document.body.insertBefore(this.$_container, document.body.firstChild) : document.body.appendChild(this.$_container))
                    
                    this._setLayout()
				}
			}, {
				key: "_composeMessage",
				value: function() {
					this.message = this.$_element.dataset.message || this.$_element.innerHTML || "", this.type = this.$_element.dataset.type || e._CONSTANTS.TYPES.ERROR, void 0 !== this.$_element.dataset.progress && this.setOptions({
						progress: !0
					}), this.$_element.classList.add("flash-" + this.type)
				}
			}, {
				key: "_createMessage",
				value: function() {
					if(this.$_element) this.$_element.querySelector(".thumb") && this.$_element.classList.add("has-thumb");
					else {
						if(this.$_element = document.createElement("div"), this.$_element.classList.add(this.options.classes.flash, "flash-" + this.type), this.$_element.setAttribute("data-type", this.type), this.$_element.setAttribute("data-message", this.message), this.$_element.innerHTML = this.message, this.options.thumb) {
							var e = document.createElement("img");
							e.classList.add("thumb"), e.src = this.options.thumb, this.$_element.classList.add("has-thumb"), this.$_element.appendChild(e)
						}
						this._append()
					}
					this._setTheme(), this._hasProgress() && this._progressBar(), this.$_element.dataset.timeout && (this.options.timeout = parseInt(this.$_element.dataset.timeout, 10)), this._behavior(), !0 === this._isInteractive() && this._bindEvents(), this.$_element.setAttribute("id","flash-id-" + genNewID())
				}
			}, {
				key: "_append",
				value: function() {
					this.$_container.appendChild(this.$_element)
				}
			}, {
				key: "_behavior",
				value: function() {
					var e = this;
					this._run(), window.setTimeout(function() {
						return e.$_element.classList.add(e.options.classes.visible)
					}, this.options.appear_delay)
				}
			}, {
				key: "_run",
				value: function() {
					var e = this;
					this._startProgress(), this._c_timeout = window.setTimeout(function() {
						return e._close()
					}, this.options.timeout)
				}
			}, {
				key: "_stop",
				value: function() {
					null !== this._c_timeout && (window.clearTimeout(this._c_timeout), this._stopProgress(), this._c_timeout = null)
				}
			}, {
				key: "_close",
				value: function() {
					var e = this;
                    e.$_element.remove();
                    if ($('.flash-container').children().length === 0 ) {
                        $('.flash-container').remove()
                    }
				}
			}, {
				key: "_clear",
				value: function() {
					!this.$_container.children.length && this.$_container.parentNode.contains(this.$_container) && this.$_container.parentNode.removeChild(this.$_container)
				}
			}, {
				key: "_bindEvents",
				value: function() {
					var e = this;
					this._bindEvent("mouseover", function(t) {
						return e._stop()
					}), this._bindEvent("mouseleave", function(t) {
						return e._run()
					}), this._bindEvent("click", function(t) {
						return e._close()
					})
				}
			}, {
				key: "_bindEvent",
				value: function(e, t) {
					try {
						this.$_element.addEventListener ? this.$_element.addEventListener(e, t, !1) : this.$_element.attachEvent("on" + this._getCapitalizedEventName(e), t)
					} catch(e) {
						throw new Error("FlashMessage._bindEvent - Cannot add event on element - " + e)
					}
				}
			}, {
				key: "_unbindEvents",
				value: function() {
					var e = this;
					this._unbindEvent("mouseover", function(t) {
						return e._stop()
					}), this._unbindEvent("mouseleave", function(t) {
						return e._run()
					}), this._unbindEvent("click", function(t) {
						return e._close()
					})
				}
			}, {
				key: "_unbindEvent",
				value: function(e, t) {
					try {
						this.$_element.removeEventListener ? this.$_element.removeEventListener(e, t, !1) : this.$_element.detachEvent("on" + this._getCapitalizedEventName(e), t)
					} catch(e) {
						throw new Error("FlashMessage._unbindEvent - Cannot remove event on element - " + e)
					}
				}
			}, {
				key: "_isInteractive",
				value: function() {
					return Boolean(!0 === this.options.interactive)
				}
			}, {
				key: "_getCapitalizedEventName",
				value: function(e) {
					return e.charAt(0).toUpperCase() + e.substr(1)
				}
			}, {
				key: "_hasProgress",
				value: function() {
					return Boolean(this.options.progress)
				}
			}, {
				key: "_progressBar",
				value: function() {
					this.$_progress = document.createElement("div"), this.$_progress.classList.add(this.options.classes.progress), this.$_element.appendChild(this.$_progress)
				}
			}, {
				key: "_startProgress",
				value: function() {
					var e = this;
					this._hasProgress() && (this.$_progress || this._progressBar(), this._stopProgress(), this._progress_offset = 0, this.$_progress.classList.remove(this.options.classes.progress_hidden), this._progress_interval = window.setInterval(function() {
						return e._setProgress()
					}, 16))
				}
			}, {
				key: "_setProgress",
				value: function() {
					this.$_progress.style.width = this._progress_value + "%", this._progress_value = (100 * this._progress_offset / this.options.timeout).toFixed(2), this._progress_offset += 16, this._progress_value >= 100 && this._stopProgress()
				}
			}, {
				key: "_stopProgress",
				value: function() {
					this._hasProgress() && this.$_progress && (this.$_progress.classList.add("is-hidden"), window.clearInterval(this._progress_interval), this._progress_interval = null, this._progress_value = 0)
				}
			}, {
				key: "_setTheme",
				value: function() {
					var t = this.$_element.dataset.theme || this.options.theme || "";
					t.length && t !== e._CONSTANTS.THEME && this.$_element.classList.add(t + "-theme")
				}
			}, {
				key: "_setLayout",
				value: function() {
					var l = this.$_container.dataset.layout || this.options.layout || "";
					l.length && this.$_container.classList.add(l + "-flash-layout")
				}
			}], [{
				key: "create",
				value: function(t) {
					return new e(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e._CONSTANTS.TYPES.ERROR, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {})
				}
			}, {
				key: "success",
				value: function(t) {
					var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return new e(t, e._CONSTANTS.TYPES.SUCCESS, n)
				}
			}, {
				key: "warning",
				value: function(t) {
					var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return new e(t, e._CONSTANTS.TYPES.WARNING, n)
				}
			}, {
				key: "error",
				value: function(t) {
					var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return new e(t, e._CONSTANTS.TYPES.ERROR, n)
				}
			}, {
				key: "info",
				value: function(t) {
					var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return new e(t, e._CONSTANTS.TYPES.INFO, n)
				}
			}, {
				key: "addCustomVerbs",
				value: function() {
					for(var t = arguments.length, n = Array(t), s = 0; s < t; s++) n[s] = arguments[s];
					n && n.length && n.forEach(function(t) {
						e[t] || (e[t] = function(n) {
							var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
							return new e(n, t, s)
						})
					})
				}
			}]), e
		}();
	t.a = r
}, function(e, t) {}]);



Macro.add("flash", {
	tags: ["progress", "Progress", "interactive", "Interactive", "timeout", "Timeout", "delay", "Delay", "container", "Container", "theme", "Theme", "classContainer", "classcontainer", "classFlash", "classflash", "classVisible", "classvisible", "classProgress", "classprogress", "classHidden", "classhidden", "flashtype", "flashType", "layout", "Layout"],
	handler: function () {
        const typeArray = ["succes", "warning", "error", "info", "bug", "disabled", "default"];
        const layoutArray = ["top-right", "middle-right", "bottom-right", "middle-bottom", "bottom-left", "middle-left", "top-left", "middle-top"];

		let errorArray = [];

        let defaultOptions = {
            type: "default",
            progress: true,
            interactive: true,
            timeout: 8000,
            appear_delay: 200,
            container: '.flash-container',
            theme: 'default',
            layout: 'top-right',
            classes: {
                container: 'flash-container',
                flash: 'flash-message',
                visible: 'is-visible',
                progress: 'flash-progress',
                progress_hidden: 'is-hidden'
            }
        };

		if (!window.addEventListener && !window.attachEvent && !document.createElement) {errorArray.push("Unable to either add EvenListener, AttachEvent or createElement")};

		if(this.args.length <= 0)
			return this.error("First argument cannot be skipped, please insert a string via <<flash \"Text here.\">>.");
		if(this.args[0] === "")
			return this.error("First argument cannot be an empty string.");
		
		for (const pay of this.payload) {
            switch (pay.name.toLowerCase()) {
                case "flashtype":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Type must be a string.");
                    if (!(typeArray.includes(pay.args[0])))
                        errorArray.push("Type does not include:"+pay.args[0]);
                    defaultOptions.type = pay.args[0];
                break;
                case "layout":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Layout must be a string.");
                    if (!(layoutArray.includes(pay.args[0])))
                        errorArray.push("Layout does not include: "+pay.args[0]);
                    defaultOptions.layout = pay.args[0];
                break;
                case "progress":
                    if (!(typeof pay.args[0] == "boolean"))
                        errorArray.push("Progress must be true or false.");
                    defaultOptions.progress = pay.args[0];
                break;
                case "interactive":
                    if (!(typeof pay.args[0] == "boolean"))
                        errorArray.push("Interactive must be true or false.");
                    defaultOptions.interactive = pay.args[0];
                break;
                case "timeout":
                    if (!(typeof pay.args[0] == "number"))
                        errorArray.push("Timeout must be a number.");
                    if (pay.args[0] < 500)
                        errorArray.push("Timeout cannot be lower than 500ms.");
                    if (pay.args[0] > 100000)
                        errorArray.push("Timeout cannot be higher than 100s.");
                    defaultOptions.timeout = pay.args[0];
                break;
                case "delay":
                    if (!(typeof pay.args[0] == "number"))
                        errorArray.push("Delay must be a number.");
                    if (pay.args[0] < 50)
                        errorArray.push("Delay cannot be lower than 50ms.");
                    if (pay.args[0] > 100000)
                        errorArray.push("Delay cannot be higher than 100s.");
                    defaultOptions.appear_delay = pay.args[0];
                break;
                case "container":
                    if (!($("."+pay.args[0]).length))
                        errorArray.push("Container not found.");
                    defaultOptions.container = pay.args[0];
                break;
                case "theme":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Theme must be a string.");
                    if (!(pay.args[0] === "dark"))
                        errorArray.push("The only theme option is \"dark\".");
                    defaultOptions.theme = pay.args[0];
                break;
                case "classcontainer":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Class must be a string.");
                    defaultOptions.classes.container = pay.args[0];
                break;
                case "classflash":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Class must be a string.");
                    defaultOptions.classes.flash = pay.args[0];
                break;
                case "classvisible":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Class must be a string.");
                    defaultOptions.classes.visible = pay.args[0];
                break;
                case "classprogress":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Class must be a string.");
                    defaultOptions.classes.progress = pay.args[0];
                break;
                case "classhidden":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Class must be a string.");
                    defaultOptions.classes.progress_hidden = pay.args[0];
                break;
            }
        }

		if (errorArray.length > 0)
			return this.error(errorArray.join("\n"));
        else {
            new window.FlashMessage(this.args[0], defaultOptions.type, {
                progress: defaultOptions.progress,
                interactive: defaultOptions.interactive,
                timeout: defaultOptions.timeout,
                appear_delay: defaultOptions.appear_delay,
                container: defaultOptions.container,
                theme: defaultOptions.theme,
                layout: defaultOptions.layout,
                classes: {
                    container: defaultOptions.classes.container,
                    flash: defaultOptions.classes.flash,
                    visible: defaultOptions.classes.visible,
                    progress: defaultOptions.classes.progress,
                    progress_hidden: defaultOptions.classes.progress_hidden
                }
            });
        }
	}
});