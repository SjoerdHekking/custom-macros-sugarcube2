// FlashMessage macro by SjoerdHekking
// FireFox progressbar bug fixed by Goctionni
setup.isFontAvailable = function(fontName, testChar) {
    const testSize = '72px';
    const span = document.createElement('span');
    span.style.fontSize = testSize;
    span.style.position = 'absolute';
    span.style.left = '-9999px';
    span.textContent = testChar || 'a';
    span.style.fontFamily = 'monospace';
    document.body.appendChild(span);
    const baselineWidth = span.offsetWidth;
    span.style.fontFamily = `${fontName}, monospace`;
    const testFontWidth = span.offsetWidth;
    document.body.removeChild(span);

    return testFontWidth !== baselineWidth;
};
$(document).one(':passageend', function (ev) {
	if (setup.isFontAvailable('sc-icons', '\ue803')) {
		document.documentElement.style.setProperty('--icon-font-family', 'sc-icons');
		document.documentElement.style.setProperty('--success-icon-content', '"\\f00c"');
		document.documentElement.style.setProperty('--warning-icon-content', '"\\f071"');
		document.documentElement.style.setProperty('--error-icon-content', '"\\f06a"');
		document.documentElement.style.setProperty('--info-icon-content', '"\\f05a"');
		document.documentElement.style.setProperty('--bug-icon-content', '"\\f188"');
		document.documentElement.style.setProperty('--disabled-icon-content', '"\\f09c"');
	}
});

class FlashMessageManager {
	static DEFAULT_OPTIONS = {
	  	limit: 0,
		debug: false
	};
  
	static bag = [];
	static displayed = [];
	static _displayQueue = 0;
  
	constructor(message, flashOptions) {
		this.options = FlashMessageManager.DEFAULT_OPTIONS;
		this.singleMessage = this.formatMessage(message, flashOptions);
		this.checkLimit();
	}

	/**
	 * Sets a random ID
	 * @returns {String} UUID4 format.
	 */
	genNewID() {
		return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
	}
  
	/**
	 * Formats a message to a bag-able object with an unique ID.
	 * @param {string} message The text to format
	 * @param {Object} flashOptions The options to pass down
	 * @returns Formatted message
	 */
	formatMessage(message, flashOptions) {
		if (!message && !flashOptions) {
			return null;
		} else {
			const tempMessage = {
				message: message,
				flashOptions: flashOptions,
				id: this.genNewID()
			};
			return tempMessage;
		}
	}

	/**
	 * Check if a display limit has been set, if so, queue message, else pass them down.
	 * @returns Notification creation or queueing
	 */
	checkLimit() {
		if (this.singleMessage !== null) {
			FlashMessageManager.bag.push(this);
		}
		
		if (FlashMessageManager.bag.length === 0 ) {
			this.garbageCollection();
			return;
		}

		if ((FlashMessageManager._displayQueue >= this.options.limit) && (this.options.limit > 0)) {
			// FlashMessageManager.bag.length > this.options.limit
			if (this.options.debug) {
				console.log("Display limit ("+this.options.limit+") reached, queueing message, bag is holding: "+(FlashMessageManager.bag.length - this.options.limit)+" messages.");
			}
			return;
		}

		const nextMessage = FlashMessageManager.bag.find(
			(instance) => !FlashMessageManager.displayed.includes(instance.singleMessage.id)
		);

		if (!nextMessage) {
			if (this.options.debug) {
				console.log("Can not find more messages, the bag is probably empty, waiting for confirmation.");
			}
			return;
		}

		if (this.options.debug) {
			console.log("Displaying message:", nextMessage.singleMessage);
		}

		FlashMessageManager.create(nextMessage.singleMessage);
		FlashMessageManager.displayed.push(nextMessage.singleMessage.id);
	}

	/**
	 * If the bag has been emptied, be sure to clean the history even if it is cleaned.
	 */
	garbageCollection() {
		if (this.options.debug) {
			console.log("Confirmation, bag is empty, garbage collection started.");
		}
		FlashMessageManager.bag = [];
		FlashMessageManager.displayed = [];
		FlashMessageManager._displayQueue = 0;
	}
  
	/**
	 * Forward the message formatted and checked to the FlashMessage class.
	 * @param {Object} singleMessage Holding the message itself (String), the options (Object), and lastly the unique ID.
	 */
	static create(singleMessage) {
		FlashMessageManager._displayQueue++;
	  	new FlashMessage(singleMessage.message, singleMessage.flashOptions, singleMessage.id);
	}
}

class FlashMessage {
	static get DEFAULT_OPTIONS() {
		return {
			type: "default",
			thumb: null,
			progress: false,
			interactive: true,
			timeout: 8000,
			appear_delay: 200,
			remove_delay: 600,
			container: ".flash-container",
			classes: {
				container: "flash-container",
				visible: "flash-is-visible",
				flash: "flash-message",
				progress: "flash-progress",
				progress_hidden: "flash-is-hidden"
			},
			theme: "default",
			layout: "top-right",
			onShow: null,
			onClick: null,
			onClose: null
		};
	}

	constructor(message, options, id) {
		this.$_element = null;
		this.$_message = null;
		this.interval = null;
		this.progress_bar = null;
		this.options = {};
		this.message = message;
		this.setOptions(options);
		this.$_container = document.querySelector(this.options.container) || null;
		this._c_timeout = null; 
		this.$_progress = null;
		this._progress_value = 0;
		this.$_id = id;
		this.createContainer();
		this.createMessage();
	}

	/**
	 * An empty object is used a base, merge defaults into it, then user options.
	 * @param {Object} options - FlashMessage options.
	 * @returns {Object} - Modified FlashMessage options.
	 */
	setOptions(options = {}) {
		this.options = Object.assign({}, FlashMessage.DEFAULT_OPTIONS, options);
		return this.options;
	}

	/**
	 * Create the container for the flash messages.
	 * @returns - (If container exists do not create a new one, method returns.)
	 */
	createContainer() {
		if (this.$_container !== null && document.body.contains(this.$_container)) {
			return;
		}

		// Create the parent div with class
		this.$_container = document.createElement("div");
		this.$_container.classList.add(this.options.classes.container);

		// check if body has children, ensure div always generates on top
		if (document.body.firstChild) {
			document.body.insertBefore(this.$_container, document.body.firstChild);
		} else {
			document.body.appendChild(this.$_container);
		}

		// Accessibility enforcing
		this.$_container.setAttribute("aria-label", "Notification list");
		this.$_container.setAttribute("aria-live", "polite");
		this.$_container.tabIndex = 0;

		// prepare layout
		this.$_container.classList.add(`${this.options.layout}-flash-layout`);
	}

	/**
	 * Initialize the message, e.g. the child of the container.
	 */
	createMessage() {
		// Create child container that holds the message
		this.$_element = document.createElement("div");
		this.$_element.classList.add(this.options.classes.flash, "flash-" + this.options.type);
		this.$_element.setAttribute("data-reference", this.$_id);
		
		// create message
		this.$_message = document.createElement("span");
		this.$_message.classList.add("flash-text");
		this.$_message.innerHTML = this.message;
		this.$_element.appendChild(this.$_message);
	
		// if a custom image is needed it can be added
		if (this.options.thumb) {
			let imgElement = document.createElement("img");
			imgElement.classList.add("flash-thumb");
			imgElement.src = this.options.thumb;
			this.$_element.classList.add("flash-message-has-thumb");
			this.$_element.appendChild(imgElement);
		}
	  
		// set the theme
		this.$_element.classList.add(`${this.options.theme}-theme`);
		
		// create progress bar

		// create start of the progress
        window.setTimeout(
            () => { 
				this.$_element.classList.add(this.options.classes.visible);
				this.run();
			}, this.options.appear_delay
        );
	  
		// check if interactive, if so, bind events.
		if (this.isInteractive()) {
		  	this.bindEvents();
		}
	  
		// accessibility add
		this.$_element.setAttribute("aria-live", "polite");
		this.$_element.setAttribute("aria-label", this.message);
		this.$_element.tabIndex = 1;

		// append to container
		this.$_container.appendChild(this.$_element);
	}

	/**
	 * Initialize the progress and make a timed event.
	 */
	run() {
		this.startProgress()
		if (this.hasProgress()) {
			this._c_timeout = window.setTimeout(() => this.close(), this.options.timeout)
	  	} 
	}

	/**
	 * Stop the progress and reset the timeout.
	 */
	stop() {
		if (this._c_timeout !== null) {
		  window.clearTimeout(this._c_timeout);
		  this.stopProgress();
		  this._c_timeout = null;
		}
	}

	/**
	 * Remove the element from the parent. If the parent is empty, remove the parent.
	 */
	close() {
		this.$_element.remove();
		const container = $(this.options.container);
		if (container.children().length === 0 ) {
			container.remove();
		}
		
		FlashMessageManager._displayQueue--;
		FlashMessageManager.bag = FlashMessageManager.bag.filter((item) => item.singleMessage.id !== this.$_id);
		new FlashMessageManager();
	}

	/**
	 * Bind mouseover, mouseleave and click events
	 */
	bindEvents() {
		this.bindEvent('mouseover', _ => this.stop())
        this.bindEvent('mouseleave', _ => this.run())
        this.bindEvent('click', _ => this.close())
	}

	/**
	 * Unbind mouseover, mouseleave and click events
	 */
	unbindEvents() {
		this.unbindEvent('mouseover', _ => this.stop())
        this.unbindEvent('mouseleave', _ => this.run())
        this.unbindEvent('click', _ => this.close())
	  }

	/**
	 * Initialize the events and callback methods.
	 * @param {String} eventName - mouseover/mouseleave/click
	 * @param {String} eventHandler - what method to call
	 */
	bindEvent(eventName, eventHandler) {
		this.$_element.addEventListener(eventName, eventHandler, false);
	}

	/**
	 * Unbind the events and callback methods.
	 * @param {String} eventName - mouseover/mouseleave/click
	 * @param {String} eventHandler - what method to call
	 */
	unbindEvent(eventName, eventHandler) {
		this.$_element.removeEventListener(eventName, eventHandler, false);
	}

	/**
	 * Checks if interactivity is allowed, if not, add a class.
	 * @returns {Boolean} true / false
	 */
	isInteractive() {
		if (!this.options.interactive) {
		  this.$_element.classList.add("flash-not-interactive");
		}
		return this.options.interactive;
	}

	/**
	 * Check if progress is true.
	 * @returns {Boolean} true / false
	 */
	hasProgress() {
		return Boolean(this.options.progress);
	}

	/**
	 * Creates the progress div.
	 */
	progressBar() {
		this.$_progress = document.createElement("div");
		this.$_progress.classList.add(this.options.classes.progress);
		this.$_progress.setAttribute("role", "progressbar");
		this.$_progress.setAttribute("aria-valuemin", 0);
		this.$_progress.setAttribute("aria-valuemax", 100);
		this.$_element.appendChild(this.$_progress);
	}

	/**
	 * Set and update the progress.
	 */
	setProgress() {
		const elapsed = Date.now() - this._progress_starttime;
		const pct = Math.min(1, elapsed / this.options.timeout);
		const width = (pct * 100).toFixed(2);
		this.$_progress.setAttribute("aria-valuenow", width);
		this.$_progress.style.width = width + "%";
		this._progress_value = width; 
		if (pct >= 1) {
			this.stopProgress();
		} else {
			requestAnimationFrame(this.setProgress.bind(this));
		}
	}

	/**
	 * Initialize the progress.
	 */
	startProgress() {
		if (this.hasProgress()) {
			if (!this.$_progress) {
				this.progressBar();
			}
			this.stopProgress();
			this._progress_starttime = Date.now();
			this.$_progress.classList.remove(this.options.classes.progress_hidden);
			this.setProgress();
		}
	}

	/**
	 * Stop progress.
	 */
	stopProgress() {
		if (this.hasProgress() && this.$_progress) {
		  	this.$_progress.classList.add("flash-is-hidden");
		  	this._progress_value = 0;
		}
	}
}

window.FlashMessageManager = FlashMessageManager;

Macro.add("flash", {
	tags: ["progress", "Progress", "interactive", "Interactive", "timeout", "Timeout", "delay", "Delay", "container", "Container", "theme", "Theme", "thumb", "Thumb", "classContainer", "classcontainer", "classFlash", "classflash", "classVisible", "classvisible", "classProgress", "classprogress", "classHidden", "classhidden", "flashtype", "flashType", "layout", "Layout", "transition", "Transition"],
	handler: function () {
        const layoutArray = ["top-right", "middle-right", "bottom-right", "middle-bottom", "bottom-left", "middle-left", "top-left", "middle-top"];
		const errorArray = [];
        const defaultOptions = {
            type: "default",
			thumb: null,
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
                visible: 'flash-is-visible',
                progress: 'flash-progress',
                progress_hidden: 'flash-is-hidden'
            }
        };

		if(this.args.length <= 0)
			return this.error("First argument cannot be skipped, please insert a string via <<flash \"Text here.\">>.");
		if(this.args[0] === "")
			return this.error("First argument cannot be an empty string.");
		
		for (const pay of this.payload) {
            switch (pay.name.toLowerCase()) {
                case "flashtype":
                    if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Type must be a string.");
                    defaultOptions.type = pay.args[0];
                break;
				case "thumb":
					if (!(typeof pay.args[0] == "string"))
                        errorArray.push("Thumb must be a string.");
					defaultOptions.thumb = pay.args[0];
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
                case "transition":
                    if (!(typeof pay.args[0] == "boolean"))
                        errorArray.push("Transition must be true or false.");
                    if (pay.args[0]) {
                        $(document).one(':passagestart', function (ev) {
                            $(defaultOptions.container).remove()
                        });
                    }
                break;
            }
        }

		if (errorArray.length > 0)
			return this.error(errorArray.join("\n"));
        else {
            new FlashMessageManager(this.args[0], {
				type: defaultOptions.type,
				thumb: defaultOptions.thumb,
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