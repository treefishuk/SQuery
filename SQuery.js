﻿(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.$ = factory();
    }
})(this, function () {

    'use strict'; 

    var $ = {};

    var hasClass, addClass, removeClass, toggleClass, findElement, insertHtml;

    var forEach = function (items, fn) {
        if (Object.prototype.toString.call(items) !== '[object Array]') {
            items = items.split(' ');
        }
        for (var i = 0; i < items.length; i++) {
            fn(items[i], i);
        }
    };

    findElement = function (elem) {

        if (typeof elem === "string") {
            if (elem.substr(0, 1) == "#") {
                var name = elem.substring(1);
                return document.getElementById(name);
            }
            else {
                return document.querySelector(elem);
            }
        }

        return elem;

    }


    insertHtml = function (elem, position, text) {
        findElement(elem).insertAdjacentHTML(position, text);
    }


    if ('classList' in document.documentElement) {
        hasClass = function (elem, className) {
            return elem.classList.contains(className);
        };
        addClass = function (elem, className) {
            elem.classList.add(className);
        };
        removeClass = function (elem, className) {
            elem.classList.remove(className);
        };
        toggleClass = function (elem, className) {
            elem.classList.toggle(className);
        };
    } else {
        hasClass = function (elem, className) {
            return new RegExp('(^|\\s)' + className + '(\\s|$)').test(elem.className);
        };
        addClass = function (elem, className) {
            if (!hasClass(elem, className)) {
                elem.className += (elem.className ? ' ' : '') + className;
            }
        };
        removeClass = function (elem, className) {
            if (hasClass(elem, className)) {
                elem.className = elem.className.replace(new RegExp('(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
            }
        };
        toggleClass = function (elem, className) {
            (hasClass(elem, className) ? removeClass : addClass)(elem, className);
        };
    }

    // Finding Elements ---------------------------------------------------------------------------------------------------------------------------------------|

    $.find = function (elem) {
        /// <signature>
        /// <summary>Find a single element</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element</param>
        /// </signature>
        return findElement(elem);
    };

    $.findAll = function (elem, fn) {
        /// <signature>
        /// <summary>Find all elements with matching selector</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find all matching elements</param>
        /// <param name="fn" type="function">function (element, instance){}</param>
        /// </signature>
        var elements = document.querySelectorAll(elem);
        for (var i = 0; i < elements.length; i++)
            fn(elements[i], i);
    }

    // Class Manipulations -----------------------------------------------------------------------------------------------------------------------------------|

    $.hasClass = function (elem, className) {
        /// <signature>
        /// <summary>Checks if element has class</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="classes" type="string">Enter class to look for"</param>
        /// </signature>
        return hasClass(findElement(elem), className);
    };

    $.addClass = function (elem, classes) {
        /// <signature>
        /// <summary>Add classes</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="classes" type="string">Enter classes to add"</param>
        /// </signature>
        forEach(classes, function (className) {
            addClass(findElement(elem), className);
        });
    };

    $.removeClass = function (elem, classes) {
        /// <signature>
        /// <summary>Remove a class</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="classes" type="string">Enter a class to remove"</param>
        /// </signature>
        forEach(classes, function (className) {
            removeClass(findElement(elem), className);
        });
    };

    $.toggleClass = function (elem, classes) {
        /// <signature>
        /// <summary>Toggle a class</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="classes" type="string">Enter a class to toggle"</param>
        /// </signature>
        forEach(classes, function (className) {
            toggleClass(findElement(elem), className);
        });
    };

    // Events ------------------------------------------------------------------------------------------------------------------------------------------------|

    $.on = function (elem, eventName, eventHandler) {
        /// <signature>
        /// <summary>Add Event Listener</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="eventName" type="string">Enter the event name to hook into i.e "click", "hover"</param>
        /// <param name="eventHandler" type="string">Enter a function to run on event</param>
        /// </signature>
        if (window.addEventListener) {
            findElement(elem).addEventListener(eventName, eventHandler, false)
        }

        else { // IE 8 DOM
            findElement(elem).attachEvent("on" + eventName, eventHandler);
        }

    };

    // Attributes -------------------------------------------------------------------------------------------------------------------------------------------|

    $.attr = function (elem, get, set) {
        /// <signature>
        /// <summary>Get or set a data attribute</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="get" type="string">Enter the data attribute you want to get</param>
        /// <param name="set" type="string">Enter the data attribute you want to set</param>
        /// </signature>
        return (set == null) ? findElement(elem).getAttribute(get) : findElement(elem).setAttribute(get, set);
    };

    // Data Attributes -------------------------------------------------------------------------------------------------------------------------------------|

    $.data = function (elem, get, set) {
        /// <signature>
        /// <summary>Get or set a data attribute</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="get" type="string">Enter the data attribute you want to get</param>
        /// <param name="set" type="string">Enter the data attribute you want to set</param>
        /// </signature>
        return (set == null) ? findElement(elem).getAttribute("data-" + get) : findElement(elem).setAttribute("data-" + get, set);
    };

    // Hide/Show -------------------------------------------------------------------------------------------------------------------------------------------|

    $.hide = function (elem) {
        /// <signature>
        /// <summary>Hides Element by adding .hidden class</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// </signature>
        addClass(findElement(elem), "hidden");
    };

    $.show = function (elem) {
        /// <signature>
        /// <summary>Shows Element by removing .hidden class</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// </signature>
        removeClass(findElement(elem), "hidden");
    };

    // Inserting/Ammending Content -------------------------------------------------------------------------------------------------------------------------|

    $.html = function (elem, value) {
        /// <signature>
        /// <summary>Replace inner html of an element</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="value" type="string">Value of new contents of element</param>
        /// </signature>
        findElement(elem).innerHTML = value;
    };

    $.before = function (elem, value) {
        /// <signature>
        /// <summary>Add new content before opening tag of targeted element</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="value" type="string">Value of new contents to add before given element</param>
        /// </signature>
        insertHtml(elem, "beforebegin", value)
    }

    $.after = function (elem, value) {
        /// <signature>
        /// <summary>Add new content after closing tag of targeted element</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="value" type="string">Value of new contents to add after given element</param>
        /// </signature>
        insertHtml(elem, "afterend", value)
    }

    $.prepend = function (elem, value) {
        /// <signature>
        /// <summary>Add new content after opening tag of targeted element</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="value" type="string">Value of new contents to add after opening tag of given element</param>
        /// </signature>
        insertHtml(elem, "afterbegin", value)
    }

    $.append = function (elem, value) {
        /// <signature>
        /// <summary>Add new content before closing tag of targeted element</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// <param name="value" type="string">Value of new contents to add before closing tag of given element</param>
        /// </signature>
        insertHtml(elem, "beforeend", value)
    }

    $.remove = function (elem) {
        /// <signature>
        /// <summary>Remove Element</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// </signature>
        var a = findElement(elem);
        a.parentNode.removeChild(a);
    }

    // Document Ready Function ----------------------------------------------------------------------------------------------------------------------------|

    $.documentReady = function (fn) {
        /// <signature>
        /// <summary>A Cross Browser Document Ready Function</summary>
        /// <param name="fn" type="function">Enter a function to run when document is ready. Usually best to put all code inside this function.</param>
        /// </signature>
        if (document.readyState != 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState != 'loading')
                    fn();
            });
        }
    }

    // AJAX Functions ---------------------------------------------------------------------------------------------------------------------------------------|

    $.ajax = function (options) {
        /// <signature>
        /// <summary>An Ajax Wrapper based on JQuery's Implementation</summary>
        /// <param name="options" type="object">A Javascript object containing the setting for the AJAX call.
        /// &#10;url {string}
        /// &#10;type {string}
        /// &#10;data {string}
        /// &#10;success {function}
        ///</param>
        /// </signature>


        var result = new Object();
        if (options.type == "POST") {
            var request = new XMLHttpRequest();
            request.open('POST', options.url, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(options.data);
        }

        else if (options.type == "GET" || options.type == "JSON") {

            console.log("Get");

            var request = new XMLHttpRequest();
            request.open('GET', options.url, true);

            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        // Success!

                        if (options.type == "JSON") {

                            options.success(JSON.parse(this.responseText));
                        }

                        else {
                            options.success(this.responseText);
                        }

                    } else {
                        return "Error Loading Ajax Content";
                    }
                }
            };

            request.send();
            request = null;

        }

        else {

            return "No Type Specified";

        }

        return request;

    }

    $.serialize = function (elem) {
        /// <signature>
        /// <summary>Serializes form fields into an AJAX POST ready string</summary>
        /// <param name="elem" type="string">Enter a css selector inside quotation marks to find element, or an existing element variable</param>
        /// </signature>

        var form = findElement(elem);

        if (!form || form.nodeName !== "FORM") {
            return;
        }
        var i, j, q = [];
        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === "") {
                continue;
            }
            switch (form.elements[i].nodeName) {
                case 'INPUT':
                    switch (form.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (form.elements[i].checked) {
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            }
                            break;
                        case 'file':
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                    break;
                case 'SELECT':
                    switch (form.elements[i].type) {
                        case 'select-one':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                        case 'select-multiple':
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                }
                            }
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                    }
                    break;
            }
        }
        return q.join("&");
    }

    return $;

});

