!function(exports, global) {
    global["true"] = exports, function() {
        PureChat = function(socketUrl, userId, domainId, authToken, identifyStatus, errorStatus, restrictTransports, poppedOut, emailMD5Hash) {
            function registerHandler(type) {
                t.socket.on(type, function(args) {
                    callCallback[type] ? callCallback[type].call(t, args) : callCallback.default.call(t, type, args);
                });
            }
            var t = this;
            this.currentUserId = userId, this.currentDomainId = domainId, this.currentAuthToken = authToken, 
            this.poppedOut = poppedOut, this.emailMD5Hash = emailMD5Hash, null !== restrictTransports && restrictTransports || (io.transports = [ "websocket", "flashsocket" ]);
            var socketConfig = {
                "reconnection limit": 15e3,
                "max reconnection attempts": 1/0
            };
            this.socket = io.connect(socketUrl, socketConfig), this.socket.socket.connecting || this.socket.socket.reconnect(), 
            this.callbacks = {
                message: null,
                joined: null,
                left: null,
                roomdestroyed: null
            }, this.messageQueue = [], registerHandler("message"), registerHandler("joined"), 
            registerHandler("left"), registerHandler("roomdestroyed"), registerHandler("typing"), 
            registerHandler("reidentify"), registerHandler("userdeleted"), registerHandler("chat-counts"), 
            registerHandler("opInvite"), this.socket.on("connect", function() {
                t.identify(t.currentUserId, t.currentDomainId, t.currentAuthToken, identifyStatus, t.poppedOut, t.emailMD5Hash);
            }), this.socket.on("disconnect", function() {}), errorStatus && this.socket.on("error", errorStatus);
        }, PureChat.prototype.disconnect = function() {
            this.socket.disconnect(), this.socket.socket.disconnect(), this.socket.removeAllListeners(), 
            this.socket = null;
        }, PureChat.prototype.identify = function(userId, domainId, authToken, status, poppedOut, emailMD5Hash) {
            this.currentUserId = userId, this.currentDomainId = domainId, this.currentAuthToken = authToken, 
            this.deviceType = PureChat.enums.deviceType.desktop, this.poppedOut = poppedOut, 
            this.protocolVersion = "2.0", this.emailMD5Hash = emailMD5Hash, this.socket.emit("identify", {
                userId: this.currentUserId,
                domainId: this.currentDomainId,
                authToken: this.currentAuthToken,
                deviceType: this.deviceType,
                deviceVersion: PureChat.deviceVersion,
                poppedOut: this.poppedOut,
                protocolVersion: this.protocolVersion,
                emailMD5Hash: this.emailMD5Hash
            }, status);
        }, PureChat.prototype.sendmessage = function(message, roomId, status) {
            this.socket.emit("sendmessage", {
                message: message,
                roomId: roomId
            }, status);
        }, PureChat.prototype.sendtyping = function(roomId, isTyping, statusCallback) {
            this.socket.emit("sendtyping", {
                roomId: roomId,
                isTyping: isTyping
            }, statusCallback);
        }, PureChat.prototype.destroyself = function(status) {
            this.socket.emit("destroyself", status);
        }, PureChat.prototype.join = function(roomId, invisible, status) {
            this.socket.emit("join", {
                roomId: roomId,
                invisible: invisible
            }, status);
        }, PureChat.prototype.leave = function(roomId, status) {
            this.socket.emit("leave", {
                roomId: roomId
            }, status);
        }, PureChat.prototype.closeroom = function(roomId, status) {
            this.socket.emit("closeroom", {
                roomId: roomId
            }, status);
        }, PureChat.prototype.createoperatorroom = function(roomName, otherUserIds, status, visitorEmailHash) {
            this.socket.emit("createoperatorroom", {
                roomName: roomName,
                otherUserIds: otherUserIds
            }, status, visitorEmailHash);
        }, PureChat.prototype.sendcurrentstate = function(status) {
            this.socket.emit("sendcurrentstate", {}, status);
        }, PureChat.prototype.getuser = function(status) {
            this.socket.emit("getuser", status);
        }, PureChat.prototype.getusers = function(status) {
            this.socket.emit("getusers", status);
        }, PureChat.prototype.sendroomhistory = function(roomId, status) {
            this.socket.emit("sendroomhistory", {
                roomId: roomId
            }, status);
        }, PureChat.prototype.setavailable = function(userId, connectionId, available, statusCallback) {
            this.socket.emit("setavailable", {
                userId: userId,
                connectionId: connectionId,
                available: available
            }, statusCallback);
        }, PureChat.prototype.forcedisconnect = function(userId, connectionId, statusCallback) {
            this.socket.emit("forcedisconnect", {
                userId: userId,
                connectionId: connectionId
            }, statusCallback);
        }, PureChat.prototype.startdemo = function(widgetId, statusCallback) {
            this.socket.emit("startdemo", {
                widgetId: widgetId
            }, statusCallback);
        }, PureChat.prototype.sendInvite = function(userId, roomId, roomName, fromName, statusCallback) {
            this.socket.emit("opInvite", {
                userId: userId,
                roomId: roomId,
                roomName: roomName,
                fromName: fromName
            }, statusCallback);
        }, PureChat.deviceVersion = 1, PureChat.enums = {
            deviceType: {
                desktop: 0,
                ios: 1
            },
            roomType: {
                account: 0,
                operator: 1,
                visitor: 2
            }
        };
        var callCallback = {
            message: function(args) {
                var escapedUserDisplayName = args.userDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), escapedRoomDisplayName = args.roomDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), escapedMessage = (args.message || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                this.trigger("message", args.userId, escapedUserDisplayName, args.roomId, escapedRoomDisplayName, args.time, escapedMessage.length > 0 ? escapedMessage : null, args.isHistory, args.timeElapsed, args.protocolVersion, args.emailMD5Hash, args.fromOperator, args.roomUtcOffset);
            },
            joined: function(args) {
                var escapedUserDisplayName = args.userDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), escapedRoomDisplayName = args.roomDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                this.trigger("joined", args.userId, escapedUserDisplayName, args.roomId, escapedRoomDisplayName, args.time, args.isHistory);
            },
            left: function(args) {
                var escapedUserDisplayName = args.userDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), escapedRoomDisplayName = args.roomDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                this.trigger("left", args.userId, escapedUserDisplayName, args.roomId, escapedRoomDisplayName, args.time, args.isHistory);
            },
            roomdestroyed: function(args) {
                var escapedRoomDisplayName = args.roomDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                this.trigger("roomdestroyed", args.roomId, escapedRoomDisplayName, args.time);
            },
            typing: function(args) {
                var escapedUserDisplayName = args.userDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                args.roomDisplayName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), 
                this.trigger("typing", args.userId, escapedUserDisplayName, args.roomId, args.roomDisplayName, args.isTyping, args.time);
            },
            "default": function(event, args) {
                this.trigger(event, args);
            }
        }, array = [];
        array.push;
        var slice = array.slice;
        array.splice, PureChat.prototype.on = function(name, callback, context) {
            if (!eventsApi(this, "on", name, [ callback, context ]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            return events.push({
                callback: callback,
                context: context,
                ctx: context || this
            }), this;
        }, PureChat.prototype.once = function(name, callback, context) {
            if (!eventsApi(this, "once", name, [ callback, context ]) || !callback) return this;
            var self = this, once = _.once(function() {
                self.off(name, once), callback.apply(this, arguments);
            });
            return once._callback = callback, this.on(name, once, context);
        }, PureChat.prototype.off = function(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, "off", name, [ callback, context ])) return this;
            if (!name && !callback && !context) return this._events = void 0, this;
            for (names = name ? [ name ] : _.keys(this._events), i = 0, l = names.length; l > i; i++) if (name = names[i], 
            events = this._events[name]) {
                if (this._events[name] = retain = [], callback || context) for (j = 0, k = events.length; k > j; j++) ev = events[j], 
                (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) && retain.push(ev);
                retain.length || delete this._events[name];
            }
            return this;
        }, PureChat.prototype.trigger = function(name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, "trigger", name, args)) return this;
            var events = this._events[name], allEvents = this._events.all;
            return events && triggerEvents(events, args), allEvents && triggerEvents(allEvents, arguments), 
            this;
        }, PureChat.prototype.stopListening = function(obj, name, callback) {
            var listeningTo = this._listeningTo;
            if (!listeningTo) return this;
            var remove = !name && !callback;
            callback || "object" != typeof name || (callback = this), obj && ((listeningTo = {})[obj._listenId] = obj);
            for (var id in listeningTo) obj = listeningTo[id], obj.off(name, callback, this), 
            (remove || _.isEmpty(obj._events)) && delete this._listeningTo[id];
            return this;
        };
        var eventSplitter = /\s+/, eventsApi = function(obj, action, name, rest) {
            if (!name) return !0;
            if ("object" == typeof name) {
                for (var key in name) obj[action].apply(obj, [ key, name[key] ].concat(rest));
                return !1;
            }
            if (eventSplitter.test(name)) {
                for (var names = name.split(eventSplitter), i = 0, l = names.length; l > i; i++) obj[action].apply(obj, [ names[i] ].concat(rest));
                return !1;
            }
            return !0;
        }, triggerEvents = function(events, args) {
            var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
            switch (args.length) {
              case 0:
                for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx);
                return;

              case 1:
                for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1);
                return;

              case 2:
                for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1, a2);
                return;

              case 3:
                for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                return;

              default:
                for (;++i < l; ) (ev = events[i]).callback.apply(ev.ctx, args);
            }
        };
    }(), exports = void 0;
    var global$ = window.$, $ = window.$pureChatJquery, purechatSpinner = {};
    !function(root, factory) {
        root.Spinner = factory();
    }(purechatSpinner, function() {
        "use strict";
        function createEl(tag, prop) {
            var n, el = document.createElement(tag || "div");
            for (n in prop) el[n] = prop[n];
            return el;
        }
        function ins(parent) {
            for (var i = 1, n = arguments.length; n > i; i++) parent.appendChild(arguments[i]);
            return parent;
        }
        function addAnimation(alpha, trail, i, lines) {
            var name = [ "opacity", trail, ~~(100 * alpha), i, lines ].join("-"), start = .01 + 100 * (i / lines), z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha), prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase(), pre = prefix && "-" + prefix + "-" || "";
            return animations[name] || (sheet.insertRule("@" + pre + "keyframes " + name + "{" + "0%{opacity:" + z + "}" + start + "%{opacity:" + alpha + "}" + (start + .01) + "%{opacity:1}" + (start + trail) % 100 + "%{opacity:" + alpha + "}" + "100%{opacity:" + z + "}" + "}", sheet.cssRules.length), 
            animations[name] = 1), name;
        }
        function vendor(el, prop) {
            var pp, i, s = el.style;
            if (void 0 !== s[prop]) return prop;
            for (prop = prop.charAt(0).toUpperCase() + prop.slice(1), i = 0; i < prefixes.length; i++) if (pp = prefixes[i] + prop, 
            void 0 !== s[pp]) return pp;
        }
        function css(el, prop) {
            for (var n in prop) el.style[vendor(el, n) || n] = prop[n];
            return el;
        }
        function merge(obj) {
            for (var i = 1; i < arguments.length; i++) {
                var def = arguments[i];
                for (var n in def) void 0 === obj[n] && (obj[n] = def[n]);
            }
            return obj;
        }
        function pos(el) {
            for (var o = {
                x: el.offsetLeft,
                y: el.offsetTop
            }; el = el.offsetParent; ) o.x += el.offsetLeft, o.y += el.offsetTop;
            return o;
        }
        function Spinner(o) {
            return "undefined" == typeof this ? new Spinner(o) : (this.opts = merge(o || {}, Spinner.defaults, defaults), 
            void 0);
        }
        function initVML() {
            function vml(tag, attr) {
                return createEl("<" + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
            }
            sheet.addRule(".spin-vml", "behavior:url(#default#VML)"), Spinner.prototype.lines = function(el, o) {
                function grp() {
                    return css(vml("group", {
                        coordsize: s + " " + s,
                        coordorigin: -r + " " + -r
                    }), {
                        width: s,
                        height: s
                    });
                }
                function seg(i, dx, filter) {
                    ins(g, ins(css(grp(), {
                        rotation: 360 / o.lines * i + "deg",
                        left: ~~dx
                    }), ins(css(vml("roundrect", {
                        arcsize: o.corners
                    }), {
                        width: r,
                        height: o.width,
                        left: o.radius,
                        top: -o.width >> 1,
                        filter: filter
                    }), vml("fill", {
                        color: o.color,
                        opacity: o.opacity
                    }), vml("stroke", {
                        opacity: 0
                    }))));
                }
                var i, r = o.length + o.width, s = 2 * r, margin = 2 * -(o.width + o.length) + "px", g = css(grp(), {
                    position: "absolute",
                    top: margin,
                    left: margin
                });
                if (o.shadow) for (i = 1; i <= o.lines; i++) seg(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                for (i = 1; i <= o.lines; i++) seg(i);
                return ins(el, g);
            }, Spinner.prototype.opacity = function(el, i, val, o) {
                var c = el.firstChild;
                o = o.shadow && o.lines || 0, c && i + o < c.childNodes.length && (c = c.childNodes[i + o], 
                c = c && c.firstChild, c = c && c.firstChild, c && (c.opacity = val));
            };
        }
        var useCssAnimations, prefixes = [ "webkit", "Moz", "ms", "O" ], animations = {}, sheet = function() {
            var el = createEl("style", {
                type: "text/css"
            });
            return ins(document.getElementsByTagName("head")[0], el), el.sheet || el.styleSheet;
        }(), defaults = {
            lines: 12,
            length: 7,
            width: 5,
            radius: 10,
            rotate: 0,
            corners: 1,
            color: "#000",
            direction: 1,
            speed: 1,
            trail: 100,
            opacity: .25,
            fps: 20,
            zIndex: 2e9,
            className: "spinner",
            top: "auto",
            left: "auto",
            position: "relative"
        };
        Spinner.defaults = {}, merge(Spinner.prototype, {
            spin: function(target) {
                this.stop();
                var ep, tp, self = this, o = self.opts, el = self.el = css(createEl(0, {
                    className: o.className
                }), {
                    position: o.position,
                    width: 0,
                    zIndex: o.zIndex
                }), mid = o.radius + o.length + o.width;
                if (target && (target.insertBefore(el, target.firstChild || null), tp = pos(target), 
                ep = pos(el), css(el, {
                    left: ("auto" == o.left ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + "px",
                    top: ("auto" == o.top ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + "px"
                })), el.setAttribute("role", "progressbar"), self.lines(el, self.opts), !useCssAnimations) {
                    var alpha, i = 0, start = (o.lines - 1) * (1 - o.direction) / 2, fps = o.fps, f = fps / o.speed, ostep = (1 - o.opacity) / (f * o.trail / 100), astep = f / o.lines;
                    !function anim() {
                        i++;
                        for (var j = 0; j < o.lines; j++) alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity), 
                        self.opacity(el, j * o.direction + start, alpha, o);
                        self.timeout = self.el && setTimeout(anim, ~~(1e3 / fps));
                    }();
                }
                return self;
            },
            stop: function() {
                var el = this.el;
                return el && (clearTimeout(this.timeout), el.parentNode && el.parentNode.removeChild(el), 
                this.el = void 0), this;
            },
            lines: function(el, o) {
                function fill(color, shadow) {
                    return css(createEl(), {
                        position: "absolute",
                        width: o.length + o.width + "px",
                        height: o.width + "px",
                        background: color,
                        boxShadow: shadow,
                        transformOrigin: "left",
                        transform: "rotate(" + ~~(360 / o.lines * i + o.rotate) + "deg) translate(" + o.radius + "px" + ",0)",
                        borderRadius: (o.corners * o.width >> 1) + "px"
                    });
                }
                for (var seg, i = 0, start = (o.lines - 1) * (1 - o.direction) / 2; i < o.lines; i++) seg = css(createEl(), {
                    position: "absolute",
                    top: 1 + ~(o.width / 2) + "px",
                    transform: o.hwaccel ? "translate3d(0,0,0)" : "",
                    opacity: o.opacity,
                    animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"
                }), o.shadow && ins(seg, css(fill("#000", "0 0 4px #000"), {
                    top: "2px"
                })), ins(el, ins(seg, fill(o.color, "0 0 1px rgba(0,0,0,.1)")));
                return el;
            },
            opacity: function(el, i, val) {
                i < el.childNodes.length && (el.childNodes[i].style.opacity = val);
            }
        });
        var probe = css(createEl("group"), {
            behavior: "url(#default#VML)"
        });
        return !vendor(probe, "transform") && probe.adj ? initVML() : useCssAnimations = vendor(probe, "animation"), 
        Spinner;
    }), function() {
        var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, d = e.filter, g = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, _ = Object.keys, j = i.bind, w = function(n) {
            return n instanceof w ? n : this instanceof w ? (this._wrapped = n, void 0) : new w(n);
        };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = w), 
        exports._ = w) : n._ = w, w.VERSION = "1.4.4";
        var A = w.each = w.forEach = function(n, t, e) {
            if (null != n) if (s && n.forEach === s) n.forEach(t, e); else if (n.length === +n.length) {
                for (var u = 0, i = n.length; i > u; u++) if (t.call(e, n[u], u, n) === r) return;
            } else for (var a in n) if (w.has(n, a) && t.call(e, n[a], a, n) === r) return;
        };
        w.map = w.collect = function(n, t, r) {
            var e = [];
            return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
                e[e.length] = t.call(r, n, u, i);
            }), e);
        };
        var O = "Reduce of empty array with no initial value";
        w.reduce = w.foldl = w.inject = function(n, t, r, e) {
            var u = arguments.length > 2;
            if (null == n && (n = []), h && n.reduce === h) return e && (t = w.bind(t, e)), 
            u ? n.reduce(t, r) : n.reduce(t);
            if (A(n, function(n, i, a) {
                u ? r = t.call(e, r, n, i, a) : (r = n, u = !0);
            }), !u) throw new TypeError(O);
            return r;
        }, w.reduceRight = w.foldr = function(n, t, r, e) {
            var u = arguments.length > 2;
            if (null == n && (n = []), v && n.reduceRight === v) return e && (t = w.bind(t, e)), 
            u ? n.reduceRight(t, r) : n.reduceRight(t);
            var i = n.length;
            if (i !== +i) {
                var a = w.keys(n);
                i = a.length;
            }
            if (A(n, function(o, c, l) {
                c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0);
            }), !u) throw new TypeError(O);
            return r;
        }, w.find = w.detect = function(n, t, r) {
            var e;
            return E(n, function(n, u, i) {
                return t.call(r, n, u, i) ? (e = n, !0) : void 0;
            }), e;
        }, w.filter = w.select = function(n, t, r) {
            var e = [];
            return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function(n, u, i) {
                t.call(r, n, u, i) && (e[e.length] = n);
            }), e);
        }, w.reject = function(n, t, r) {
            return w.filter(n, function(n, e, u) {
                return !t.call(r, n, e, u);
            }, r);
        }, w.every = w.all = function(n, t, e) {
            t || (t = w.identity);
            var u = !0;
            return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function(n, i, a) {
                return (u = u && t.call(e, n, i, a)) ? void 0 : r;
            }), !!u);
        };
        var E = w.some = w.any = function(n, t, e) {
            t || (t = w.identity);
            var u = !1;
            return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
                return u || (u = t.call(e, n, i, a)) ? r : void 0;
            }), !!u);
        };
        w.contains = w.include = function(n, t) {
            return null == n ? !1 : y && n.indexOf === y ? -1 != n.indexOf(t) : E(n, function(n) {
                return n === t;
            });
        }, w.invoke = function(n, t) {
            var r = o.call(arguments, 2), e = w.isFunction(t);
            return w.map(n, function(n) {
                return (e ? t : n[t]).apply(n, r);
            });
        }, w.pluck = function(n, t) {
            return w.map(n, function(n) {
                return n[t];
            });
        }, w.where = function(n, t, r) {
            return w.isEmpty(t) ? r ? null : [] : w[r ? "find" : "filter"](n, function(n) {
                for (var r in t) if (t[r] !== n[r]) return !1;
                return !0;
            });
        }, w.findWhere = function(n, t) {
            return w.where(n, t, !0);
        }, w.max = function(n, t, r) {
            if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.max.apply(Math, n);
            if (!t && w.isEmpty(n)) return -1 / 0;
            var e = {
                computed: -1 / 0,
                value: -1 / 0
            };
            return A(n, function(n, u, i) {
                var a = t ? t.call(r, n, u, i) : n;
                a >= e.computed && (e = {
                    value: n,
                    computed: a
                });
            }), e.value;
        }, w.min = function(n, t, r) {
            if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.min.apply(Math, n);
            if (!t && w.isEmpty(n)) return 1 / 0;
            var e = {
                computed: 1 / 0,
                value: 1 / 0
            };
            return A(n, function(n, u, i) {
                var a = t ? t.call(r, n, u, i) : n;
                e.computed > a && (e = {
                    value: n,
                    computed: a
                });
            }), e.value;
        }, w.shuffle = function(n) {
            var t, r = 0, e = [];
            return A(n, function(n) {
                t = w.random(r++), e[r - 1] = e[t], e[t] = n;
            }), e;
        };
        var k = function(n) {
            return w.isFunction(n) ? n : function(t) {
                return t[n];
            };
        };
        w.sortBy = function(n, t, r) {
            var e = k(t);
            return w.pluck(w.map(n, function(n, t, u) {
                return {
                    value: n,
                    index: t,
                    criteria: e.call(r, n, t, u)
                };
            }).sort(function(n, t) {
                var r = n.criteria, e = t.criteria;
                if (r !== e) {
                    if (r > e || void 0 === r) return 1;
                    if (e > r || void 0 === e) return -1;
                }
                return n.index < t.index ? -1 : 1;
            }), "value");
        };
        var F = function(n, t, r, e) {
            var u = {}, i = k(t || w.identity);
            return A(n, function(t, a) {
                var o = i.call(r, t, a, n);
                e(u, o, t);
            }), u;
        };
        w.groupBy = function(n, t, r) {
            return F(n, t, r, function(n, t, r) {
                (w.has(n, t) ? n[t] : n[t] = []).push(r);
            });
        }, w.countBy = function(n, t, r) {
            return F(n, t, r, function(n, t) {
                w.has(n, t) || (n[t] = 0), n[t]++;
            });
        }, w.sortedIndex = function(n, t, r, e) {
            r = null == r ? w.identity : k(r);
            for (var u = r.call(e, t), i = 0, a = n.length; a > i; ) {
                var o = i + a >>> 1;
                u > r.call(e, n[o]) ? i = o + 1 : a = o;
            }
            return i;
        }, w.toArray = function(n) {
            return n ? w.isArray(n) ? o.call(n) : n.length === +n.length ? w.map(n, w.identity) : w.values(n) : [];
        }, w.size = function(n) {
            return null == n ? 0 : n.length === +n.length ? n.length : w.keys(n).length;
        }, w.first = w.head = w.take = function(n, t, r) {
            return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t);
        }, w.initial = function(n, t, r) {
            return o.call(n, 0, n.length - (null == t || r ? 1 : t));
        }, w.last = function(n, t, r) {
            return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0));
        }, w.rest = w.tail = w.drop = function(n, t, r) {
            return o.call(n, null == t || r ? 1 : t);
        }, w.compact = function(n) {
            return w.filter(n, w.identity);
        };
        var R = function(n, t, r) {
            return A(n, function(n) {
                w.isArray(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n);
            }), r;
        };
        w.flatten = function(n, t) {
            return R(n, t, []);
        }, w.without = function(n) {
            return w.difference(n, o.call(arguments, 1));
        }, w.uniq = w.unique = function(n, t, r, e) {
            w.isFunction(t) && (e = r, r = t, t = !1);
            var u = r ? w.map(n, r, e) : n, i = [], a = [];
            return A(u, function(r, e) {
                (t ? e && a[a.length - 1] === r : w.contains(a, r)) || (a.push(r), i.push(n[e]));
            }), i;
        }, w.union = function() {
            return w.uniq(c.apply(e, arguments));
        }, w.intersection = function(n) {
            var t = o.call(arguments, 1);
            return w.filter(w.uniq(n), function(n) {
                return w.every(t, function(t) {
                    return w.indexOf(t, n) >= 0;
                });
            });
        }, w.difference = function(n) {
            var t = c.apply(e, o.call(arguments, 1));
            return w.filter(n, function(n) {
                return !w.contains(t, n);
            });
        }, w.zip = function() {
            for (var n = o.call(arguments), t = w.max(w.pluck(n, "length")), r = Array(t), e = 0; t > e; e++) r[e] = w.pluck(n, "" + e);
            return r;
        }, w.object = function(n, t) {
            if (null == n) return {};
            for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
            return r;
        }, w.indexOf = function(n, t, r) {
            if (null == n) return -1;
            var e = 0, u = n.length;
            if (r) {
                if ("number" != typeof r) return e = w.sortedIndex(n, t), n[e] === t ? e : -1;
                e = 0 > r ? Math.max(0, u + r) : r;
            }
            if (y && n.indexOf === y) return n.indexOf(t, r);
            for (;u > e; e++) if (n[e] === t) return e;
            return -1;
        }, w.lastIndexOf = function(n, t, r) {
            if (null == n) return -1;
            var e = null != r;
            if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
            for (var u = e ? r : n.length; u--; ) if (n[u] === t) return u;
            return -1;
        }, w.range = function(n, t, r) {
            1 >= arguments.length && (t = n || 0, n = 0), r = arguments[2] || 1;
            for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e); e > u; ) i[u++] = n, 
            n += r;
            return i;
        }, w.bind = function(n, t) {
            if (n.bind === j && j) return j.apply(n, o.call(arguments, 1));
            var r = o.call(arguments, 2);
            return function() {
                return n.apply(t, r.concat(o.call(arguments)));
            };
        }, w.partial = function(n) {
            var t = o.call(arguments, 1);
            return function() {
                return n.apply(this, t.concat(o.call(arguments)));
            };
        }, w.bindAll = function(n) {
            var t = o.call(arguments, 1);
            return 0 === t.length && (t = w.functions(n)), A(t, function(t) {
                n[t] = w.bind(n[t], n);
            }), n;
        }, w.memoize = function(n, t) {
            var r = {};
            return t || (t = w.identity), function() {
                var e = t.apply(this, arguments);
                return w.has(r, e) ? r[e] : r[e] = n.apply(this, arguments);
            };
        }, w.delay = function(n, t) {
            var r = o.call(arguments, 2);
            return setTimeout(function() {
                return n.apply(null, r);
            }, t);
        }, w.defer = function(n) {
            return w.delay.apply(w, [ n, 1 ].concat(o.call(arguments, 1)));
        }, w.throttle = function(n, t) {
            var r, e, u, i, a = 0, o = function() {
                a = new Date(), u = null, i = n.apply(r, e);
            };
            return function() {
                var c = new Date(), l = t - (c - a);
                return r = this, e = arguments, 0 >= l ? (clearTimeout(u), u = null, a = c, i = n.apply(r, e)) : u || (u = setTimeout(o, l)), 
                i;
            };
        }, w.debounce = function(n, t, r) {
            var e, u;
            return function() {
                var i = this, a = arguments, o = function() {
                    e = null, r || (u = n.apply(i, a));
                }, c = r && !e;
                return clearTimeout(e), e = setTimeout(o, t), c && (u = n.apply(i, a)), u;
            };
        }, w.once = function(n) {
            var t, r = !1;
            return function() {
                return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t);
            };
        }, w.wrap = function(n, t) {
            return function() {
                var r = [ n ];
                return a.apply(r, arguments), t.apply(this, r);
            };
        }, w.compose = function() {
            var n = arguments;
            return function() {
                for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [ n[r].apply(this, t) ];
                return t[0];
            };
        }, w.after = function(n, t) {
            return 0 >= n ? t() : function() {
                return 1 > --n ? t.apply(this, arguments) : void 0;
            };
        }, w.keys = _ || function(n) {
            if (n !== Object(n)) throw new TypeError("Invalid object");
            var t = [];
            for (var r in n) w.has(n, r) && (t[t.length] = r);
            return t;
        }, w.values = function(n) {
            var t = [];
            for (var r in n) w.has(n, r) && t.push(n[r]);
            return t;
        }, w.pairs = function(n) {
            var t = [];
            for (var r in n) w.has(n, r) && t.push([ r, n[r] ]);
            return t;
        }, w.invert = function(n) {
            var t = {};
            for (var r in n) w.has(n, r) && (t[n[r]] = r);
            return t;
        }, w.functions = w.methods = function(n) {
            var t = [];
            for (var r in n) w.isFunction(n[r]) && t.push(r);
            return t.sort();
        }, w.extend = function(n) {
            return A(o.call(arguments, 1), function(t) {
                if (t) for (var r in t) n[r] = t[r];
            }), n;
        }, w.pick = function(n) {
            var t = {}, r = c.apply(e, o.call(arguments, 1));
            return A(r, function(r) {
                r in n && (t[r] = n[r]);
            }), t;
        }, w.omit = function(n) {
            var t = {}, r = c.apply(e, o.call(arguments, 1));
            for (var u in n) w.contains(r, u) || (t[u] = n[u]);
            return t;
        }, w.defaults = function(n) {
            return A(o.call(arguments, 1), function(t) {
                if (t) for (var r in t) null == n[r] && (n[r] = t[r]);
            }), n;
        }, w.clone = function(n) {
            return w.isObject(n) ? w.isArray(n) ? n.slice() : w.extend({}, n) : n;
        }, w.tap = function(n, t) {
            return t(n), n;
        };
        var I = function(n, t, r, e) {
            if (n === t) return 0 !== n || 1 / n == 1 / t;
            if (null == n || null == t) return n === t;
            n instanceof w && (n = n._wrapped), t instanceof w && (t = t._wrapped);
            var u = l.call(n);
            if (u != l.call(t)) return !1;
            switch (u) {
              case "[object String]":
                return n == t + "";

              case "[object Number]":
                return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;

              case "[object Date]":
              case "[object Boolean]":
                return +n == +t;

              case "[object RegExp]":
                return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase;
            }
            if ("object" != typeof n || "object" != typeof t) return !1;
            for (var i = r.length; i--; ) if (r[i] == n) return e[i] == t;
            r.push(n), e.push(t);
            var a = 0, o = !0;
            if ("[object Array]" == u) {
                if (a = n.length, o = a == t.length) for (;a-- && (o = I(n[a], t[a], r, e)); ) ;
            } else {
                var c = n.constructor, f = t.constructor;
                if (c !== f && !(w.isFunction(c) && c instanceof c && w.isFunction(f) && f instanceof f)) return !1;
                for (var s in n) if (w.has(n, s) && (a++, !(o = w.has(t, s) && I(n[s], t[s], r, e)))) break;
                if (o) {
                    for (s in t) if (w.has(t, s) && !a--) break;
                    o = !a;
                }
            }
            return r.pop(), e.pop(), o;
        };
        w.isEqual = function(n, t) {
            return I(n, t, [], []);
        }, w.isEmpty = function(n) {
            if (null == n) return !0;
            if (w.isArray(n) || w.isString(n)) return 0 === n.length;
            for (var t in n) if (w.has(n, t)) return !1;
            return !0;
        }, w.isElement = function(n) {
            return !(!n || 1 !== n.nodeType);
        }, w.isArray = x || function(n) {
            return "[object Array]" == l.call(n);
        }, w.isObject = function(n) {
            return n === Object(n);
        }, A([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(n) {
            w["is" + n] = function(t) {
                return l.call(t) == "[object " + n + "]";
            };
        }), w.isArguments(arguments) || (w.isArguments = function(n) {
            return !(!n || !w.has(n, "callee"));
        }), "function" != typeof /./ && (w.isFunction = function(n) {
            return "function" == typeof n;
        }), w.isFinite = function(n) {
            return isFinite(n) && !isNaN(parseFloat(n));
        }, w.isNaN = function(n) {
            return w.isNumber(n) && n != +n;
        }, w.isBoolean = function(n) {
            return n === !0 || n === !1 || "[object Boolean]" == l.call(n);
        }, w.isNull = function(n) {
            return null === n;
        }, w.isUndefined = function(n) {
            return void 0 === n;
        }, w.has = function(n, t) {
            return f.call(n, t);
        }, w.noConflict = function() {
            return n._ = t, this;
        }, w.identity = function(n) {
            return n;
        }, w.times = function(n, t, r) {
            for (var e = Array(n), u = 0; n > u; u++) e[u] = t.call(r, u);
            return e;
        }, w.random = function(n, t) {
            return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
        };
        var M = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        M.unescape = w.invert(M.escape);
        var S = {
            escape: RegExp("[" + w.keys(M.escape).join("") + "]", "g"),
            unescape: RegExp("(" + w.keys(M.unescape).join("|") + ")", "g")
        };
        w.each([ "escape", "unescape" ], function(n) {
            w[n] = function(t) {
                return null == t ? "" : ("" + t).replace(S[n], function(t) {
                    return M[n][t];
                });
            };
        }), w.result = function(n, t) {
            if (null == n) return null;
            var r = n[t];
            return w.isFunction(r) ? r.call(n) : r;
        }, w.mixin = function(n) {
            A(w.functions(n), function(t) {
                var r = w[t] = n[t];
                w.prototype[t] = function() {
                    var n = [ this._wrapped ];
                    return a.apply(n, arguments), D.call(this, r.apply(w, n));
                };
            });
        };
        var N = 0;
        w.uniqueId = function(n) {
            var t = ++N + "";
            return n ? n + t : t;
        }, w.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var T = /(.)^/, q = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        w.template = function(n, t, r) {
            var e;
            r = w.defaults({}, r, w.templateSettings);
            var u = RegExp([ (r.escape || T).source, (r.interpolate || T).source, (r.evaluate || T).source ].join("|") + "|$", "g"), i = 0, a = "__p+='";
            n.replace(u, function(t, r, e, u, o) {
                return a += n.slice(i, o).replace(B, function(n) {
                    return "\\" + q[n];
                }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), 
                u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t;
            }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
            try {
                e = Function(r.variable || "obj", "_", a);
            } catch (o) {
                throw o.source = a, o;
            }
            if (t) return e(t, w);
            var c = function(n) {
                return e.call(this, n, w);
            };
            return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c;
        }, w.chain = function(n) {
            return w(n).chain();
        };
        var D = function(n) {
            return this._chain ? w(n).chain() : n;
        };
        w.mixin(w), A([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(n) {
            var t = e[n];
            w.prototype[n] = function() {
                var r = this._wrapped;
                return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], 
                D.call(this, r);
            };
        }), A([ "concat", "join", "slice" ], function(n) {
            var t = e[n];
            w.prototype[n] = function() {
                return D.call(this, t.apply(this._wrapped, arguments));
            };
        }), w.extend(w.prototype, {
            chain: function() {
                return this._chain = !0, this;
            },
            value: function() {
                return this._wrapped;
            }
        });
    }.call(this), function(root, factory) {
        root.Backbone = factory(root, {}, root._, root.jQuery || root.Zepto || root.ender || root.$);
    }(this, function(root, Backbone, _, $) {
        var previousBackbone = root.Backbone, array = [];
        array.push;
        var slice = array.slice;
        array.splice, Backbone.VERSION = "1.1.2", Backbone.$ = $, Backbone.noConflict = function() {
            return root.Backbone = previousBackbone, this;
        }, Backbone.emulateHTTP = !1, Backbone.emulateJSON = !1;
        var Events = Backbone.Events = {
            on: function(name, callback, context) {
                if (!eventsApi(this, "on", name, [ callback, context ]) || !callback) return this;
                this._events || (this._events = {});
                var events = this._events[name] || (this._events[name] = []);
                return events.push({
                    callback: callback,
                    context: context,
                    ctx: context || this
                }), this;
            },
            once: function(name, callback, context) {
                if (!eventsApi(this, "once", name, [ callback, context ]) || !callback) return this;
                var self = this, once = _.once(function() {
                    self.off(name, once), callback.apply(this, arguments);
                });
                return once._callback = callback, this.on(name, once, context);
            },
            off: function(name, callback, context) {
                var retain, ev, events, names, i, l, j, k;
                if (!this._events || !eventsApi(this, "off", name, [ callback, context ])) return this;
                if (!name && !callback && !context) return this._events = void 0, this;
                for (names = name ? [ name ] : _.keys(this._events), i = 0, l = names.length; l > i; i++) if (name = names[i], 
                events = this._events[name]) {
                    if (this._events[name] = retain = [], callback || context) for (j = 0, k = events.length; k > j; j++) ev = events[j], 
                    (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) && retain.push(ev);
                    retain.length || delete this._events[name];
                }
                return this;
            },
            trigger: function(name) {
                if (!this._events) return this;
                var args = slice.call(arguments, 1);
                if (!eventsApi(this, "trigger", name, args)) return this;
                var events = this._events[name], allEvents = this._events.all;
                return events && triggerEvents(events, args), allEvents && triggerEvents(allEvents, arguments), 
                this;
            },
            stopListening: function(obj, name, callback) {
                var listeningTo = this._listeningTo;
                if (!listeningTo) return this;
                var remove = !name && !callback;
                callback || "object" != typeof name || (callback = this), obj && ((listeningTo = {})[obj._listenId] = obj);
                for (var id in listeningTo) obj = listeningTo[id], obj.off(name, callback, this), 
                (remove || _.isEmpty(obj._events)) && delete this._listeningTo[id];
                return this;
            }
        }, eventSplitter = /\s+/, eventsApi = function(obj, action, name, rest) {
            if (!name) return !0;
            if ("object" == typeof name) {
                for (var key in name) obj[action].apply(obj, [ key, name[key] ].concat(rest));
                return !1;
            }
            if (eventSplitter.test(name)) {
                for (var names = name.split(eventSplitter), i = 0, l = names.length; l > i; i++) obj[action].apply(obj, [ names[i] ].concat(rest));
                return !1;
            }
            return !0;
        }, triggerEvents = function(events, args) {
            var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
            switch (args.length) {
              case 0:
                for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx);
                return;

              case 1:
                for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1);
                return;

              case 2:
                for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1, a2);
                return;

              case 3:
                for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                return;

              default:
                for (;++i < l; ) (ev = events[i]).callback.apply(ev.ctx, args);
                return;
            }
        }, listenMethods = {
            listenTo: "on",
            listenToOnce: "once"
        };
        _.each(listenMethods, function(implementation, method) {
            Events[method] = function(obj, name, callback) {
                var listeningTo = this._listeningTo || (this._listeningTo = {}), id = obj._listenId || (obj._listenId = _.uniqueId("l"));
                return listeningTo[id] = obj, callback || "object" != typeof name || (callback = this), 
                obj[implementation](name, callback, this), this;
            };
        }), Events.bind = Events.on, Events.unbind = Events.off, _.extend(Backbone, Events);
        var Model = Backbone.Model = function(attributes, options) {
            var attrs = attributes || {};
            options || (options = {}), this.cid = _.uniqueId("c"), this.attributes = {}, options.collection && (this.collection = options.collection), 
            options.parse && (attrs = this.parse(attrs, options) || {}), attrs = _.defaults({}, attrs, _.result(this, "defaults")), 
            this.set(attrs, options), this.changed = {}, this.initialize.apply(this, arguments);
        };
        _.extend(Model.prototype, Events, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function() {
                return _.clone(this.attributes);
            },
            sync: function() {
                return Backbone.sync.apply(this, arguments);
            },
            get: function(attr) {
                return this.attributes[attr];
            },
            escape: function(attr) {
                return _.escape(this.get(attr));
            },
            has: function(attr) {
                return null != this.get(attr);
            },
            set: function(key, val, options) {
                var attr, attrs, unset, changes, silent, changing, prev, current;
                if (null == key) return this;
                if ("object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, 
                options || (options = {}), !this._validate(attrs, options)) return !1;
                unset = options.unset, silent = options.silent, changes = [], changing = this._changing, 
                this._changing = !0, changing || (this._previousAttributes = _.clone(this.attributes), 
                this.changed = {}), current = this.attributes, prev = this._previousAttributes, 
                this.idAttribute in attrs && (this.id = attrs[this.idAttribute]);
                for (attr in attrs) val = attrs[attr], _.isEqual(current[attr], val) || changes.push(attr), 
                _.isEqual(prev[attr], val) ? delete this.changed[attr] : this.changed[attr] = val, 
                unset ? delete current[attr] : current[attr] = val;
                if (!silent) {
                    changes.length && (this._pending = options);
                    for (var i = 0, l = changes.length; l > i; i++) this.trigger("change:" + changes[i], this, current[changes[i]], options);
                }
                if (changing) return this;
                if (!silent) for (;this._pending; ) options = this._pending, this._pending = !1, 
                this.trigger("change", this, options);
                return this._pending = !1, this._changing = !1, this;
            },
            unset: function(attr, options) {
                return this.set(attr, void 0, _.extend({}, options, {
                    unset: !0
                }));
            },
            clear: function(options) {
                var attrs = {};
                for (var key in this.attributes) attrs[key] = void 0;
                return this.set(attrs, _.extend({}, options, {
                    unset: !0
                }));
            },
            hasChanged: function(attr) {
                return null == attr ? !_.isEmpty(this.changed) : _.has(this.changed, attr);
            },
            changedAttributes: function(diff) {
                if (!diff) return this.hasChanged() ? _.clone(this.changed) : !1;
                var val, changed = !1, old = this._changing ? this._previousAttributes : this.attributes;
                for (var attr in diff) _.isEqual(old[attr], val = diff[attr]) || ((changed || (changed = {}))[attr] = val);
                return changed;
            },
            previous: function(attr) {
                return null != attr && this._previousAttributes ? this._previousAttributes[attr] : null;
            },
            previousAttributes: function() {
                return _.clone(this._previousAttributes);
            },
            fetch: function(options) {
                options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
                var model = this, success = options.success;
                return options.success = function(resp) {
                    return model.set(model.parse(resp, options), options) ? (success && success(model, resp, options), 
                    model.trigger("sync", model, resp, options), void 0) : !1;
                }, wrapError(this, options), this.sync("read", this, options);
            },
            save: function(key, val, options) {
                var attrs, method, xhr, attributes = this.attributes;
                if (null == key || "object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, 
                options = _.extend({
                    validate: !0
                }, options), attrs && !options.wait) {
                    if (!this.set(attrs, options)) return !1;
                } else if (!this._validate(attrs, options)) return !1;
                attrs && options.wait && (this.attributes = _.extend({}, attributes, attrs)), void 0 === options.parse && (options.parse = !0);
                var model = this, success = options.success;
                return options.success = function(resp) {
                    model.attributes = attributes;
                    var serverAttrs = model.parse(resp, options);
                    return options.wait && (serverAttrs = _.extend(attrs || {}, serverAttrs)), _.isObject(serverAttrs) && !model.set(serverAttrs, options) ? !1 : (success && success(model, resp, options), 
                    model.trigger("sync", model, resp, options), void 0);
                }, wrapError(this, options), method = this.isNew() ? "create" : options.patch ? "patch" : "update", 
                "patch" === method && (options.attrs = attrs), xhr = this.sync(method, this, options), 
                attrs && options.wait && (this.attributes = attributes), xhr;
            },
            destroy: function(options) {
                options = options ? _.clone(options) : {};
                var model = this, success = options.success, destroy = function() {
                    model.trigger("destroy", model, model.collection, options);
                };
                if (options.success = function(resp) {
                    (options.wait || model.isNew()) && destroy(), success && success(model, resp, options), 
                    model.isNew() || model.trigger("sync", model, resp, options);
                }, this.isNew()) return options.success(), !1;
                wrapError(this, options);
                var xhr = this.sync("delete", this, options);
                return options.wait || destroy(), xhr;
            },
            url: function() {
                var base = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
                return this.isNew() ? base : base.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id);
            },
            parse: function(resp) {
                return resp;
            },
            clone: function() {
                return new this.constructor(this.attributes);
            },
            isNew: function() {
                return !this.has(this.idAttribute);
            },
            isValid: function(options) {
                return this._validate({}, _.extend(options || {}, {
                    validate: !0
                }));
            },
            _validate: function(attrs, options) {
                if (!options.validate || !this.validate) return !0;
                attrs = _.extend({}, this.attributes, attrs);
                var error = this.validationError = this.validate(attrs, options) || null;
                return error ? (this.trigger("invalid", this, error, _.extend(options, {
                    validationError: error
                })), !1) : !0;
            }
        });
        var modelMethods = [ "keys", "values", "pairs", "invert", "pick", "omit" ];
        _.each(modelMethods, function(method) {
            Model.prototype[method] = function() {
                var args = slice.call(arguments);
                return args.unshift(this.attributes), _[method].apply(_, args);
            };
        });
        var Collection = Backbone.Collection = function(models, options) {
            options || (options = {}), options.model && (this.model = options.model), void 0 !== options.comparator && (this.comparator = options.comparator), 
            this._reset(), this.initialize.apply(this, arguments), models && this.reset(models, _.extend({
                silent: !0
            }, options));
        }, setOptions = {
            add: !0,
            remove: !0,
            merge: !0
        }, addOptions = {
            add: !0,
            remove: !1
        };
        _.extend(Collection.prototype, Events, {
            model: Model,
            initialize: function() {},
            toJSON: function(options) {
                return this.map(function(model) {
                    return model.toJSON(options);
                });
            },
            sync: function() {
                return Backbone.sync.apply(this, arguments);
            },
            add: function(models, options) {
                return this.set(models, _.extend({
                    merge: !1
                }, options, addOptions));
            },
            remove: function(models, options) {
                var singular = !_.isArray(models);
                models = singular ? [ models ] : _.clone(models), options || (options = {});
                var i, l, index, model;
                for (i = 0, l = models.length; l > i; i++) model = models[i] = this.get(models[i]), 
                model && (delete this._byId[model.id], delete this._byId[model.cid], index = this.indexOf(model), 
                this.models.splice(index, 1), this.length--, options.silent || (options.index = index, 
                model.trigger("remove", model, this, options)), this._removeReference(model, options));
                return singular ? models[0] : models;
            },
            set: function(models, options) {
                options = _.defaults({}, options, setOptions), options.parse && (models = this.parse(models, options));
                var singular = !_.isArray(models);
                models = singular ? models ? [ models ] : [] : _.clone(models);
                var i, l, id, model, attrs, existing, sort, at = options.at, targetModel = this.model, sortable = this.comparator && null == at && options.sort !== !1, sortAttr = _.isString(this.comparator) ? this.comparator : null, toAdd = [], toRemove = [], modelMap = {}, add = options.add, merge = options.merge, remove = options.remove, order = !sortable && add && remove ? [] : !1;
                for (i = 0, l = models.length; l > i; i++) {
                    if (attrs = models[i] || {}, id = attrs instanceof Model ? model = attrs : attrs[targetModel.prototype.idAttribute || "id"], 
                    existing = this.get(id)) remove && (modelMap[existing.cid] = !0), merge && (attrs = attrs === model ? model.attributes : attrs, 
                    options.parse && (attrs = existing.parse(attrs, options)), existing.set(attrs, options), 
                    sortable && !sort && existing.hasChanged(sortAttr) && (sort = !0)), models[i] = existing; else if (add) {
                        if (model = models[i] = this._prepareModel(attrs, options), !model) continue;
                        toAdd.push(model), this._addReference(model, options);
                    }
                    model = existing || model, !order || !model.isNew() && modelMap[model.id] || order.push(model), 
                    modelMap[model.id] = !0;
                }
                if (remove) {
                    for (i = 0, l = this.length; l > i; ++i) modelMap[(model = this.models[i]).cid] || toRemove.push(model);
                    toRemove.length && this.remove(toRemove, options);
                }
                if (toAdd.length || order && order.length) if (sortable && (sort = !0), this.length += toAdd.length, 
                null != at) for (i = 0, l = toAdd.length; l > i; i++) this.models.splice(at + i, 0, toAdd[i]); else {
                    order && (this.models.length = 0);
                    var orderedModels = order || toAdd;
                    for (i = 0, l = orderedModels.length; l > i; i++) this.models.push(orderedModels[i]);
                }
                if (sort && this.sort({
                    silent: !0
                }), !options.silent) {
                    for (i = 0, l = toAdd.length; l > i; i++) (model = toAdd[i]).trigger("add", model, this, options);
                    (sort || order && order.length) && this.trigger("sort", this, options);
                }
                return singular ? models[0] : models;
            },
            reset: function(models, options) {
                options || (options = {});
                for (var i = 0, l = this.models.length; l > i; i++) this._removeReference(this.models[i], options);
                return options.previousModels = this.models, this._reset(), models = this.add(models, _.extend({
                    silent: !0
                }, options)), options.silent || this.trigger("reset", this, options), models;
            },
            push: function(model, options) {
                return this.add(model, _.extend({
                    at: this.length
                }, options));
            },
            pop: function(options) {
                var model = this.at(this.length - 1);
                return this.remove(model, options), model;
            },
            unshift: function(model, options) {
                return this.add(model, _.extend({
                    at: 0
                }, options));
            },
            shift: function(options) {
                var model = this.at(0);
                return this.remove(model, options), model;
            },
            slice: function() {
                return slice.apply(this.models, arguments);
            },
            get: function(obj) {
                return null == obj ? void 0 : this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
            },
            at: function(index) {
                return this.models[index];
            },
            where: function(attrs, first) {
                return _.isEmpty(attrs) ? first ? void 0 : [] : this[first ? "find" : "filter"](function(model) {
                    for (var key in attrs) if (attrs[key] !== model.get(key)) return !1;
                    return !0;
                });
            },
            findWhere: function(attrs) {
                return this.where(attrs, !0);
            },
            sort: function(options) {
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return options || (options = {}), _.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(_.bind(this.comparator, this)), 
                options.silent || this.trigger("sort", this, options), this;
            },
            pluck: function(attr) {
                return _.invoke(this.models, "get", attr);
            },
            fetch: function(options) {
                options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
                var success = options.success, collection = this;
                return options.success = function(resp) {
                    var method = options.reset ? "reset" : "set";
                    collection[method](resp, options), success && success(collection, resp, options), 
                    collection.trigger("sync", collection, resp, options);
                }, wrapError(this, options), this.sync("read", this, options);
            },
            create: function(model, options) {
                if (options = options ? _.clone(options) : {}, !(model = this._prepareModel(model, options))) return !1;
                options.wait || this.add(model, options);
                var collection = this, success = options.success;
                return options.success = function(model, resp) {
                    options.wait && collection.add(model, options), success && success(model, resp, options);
                }, model.save(null, options), model;
            },
            parse: function(resp) {
                return resp;
            },
            clone: function() {
                return new this.constructor(this.models);
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {};
            },
            _prepareModel: function(attrs, options) {
                if (attrs instanceof Model) return attrs;
                options = options ? _.clone(options) : {}, options.collection = this;
                var model = new this.model(attrs, options);
                return model.validationError ? (this.trigger("invalid", this, model.validationError, options), 
                !1) : model;
            },
            _addReference: function(model) {
                this._byId[model.cid] = model, null != model.id && (this._byId[model.id] = model), 
                model.collection || (model.collection = this), model.on("all", this._onModelEvent, this);
            },
            _removeReference: function(model) {
                this === model.collection && delete model.collection, model.off("all", this._onModelEvent, this);
            },
            _onModelEvent: function(event, model, collection, options) {
                ("add" !== event && "remove" !== event || collection === this) && ("destroy" === event && this.remove(model, options), 
                model && event === "change:" + model.idAttribute && (delete this._byId[model.previous(model.idAttribute)], 
                null != model.id && (this._byId[model.id] = model)), this.trigger.apply(this, arguments));
            }
        });
        var methods = [ "forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample" ];
        _.each(methods, function(method) {
            Collection.prototype[method] = function() {
                var args = slice.call(arguments);
                return args.unshift(this.models), _[method].apply(_, args);
            };
        });
        var attributeMethods = [ "groupBy", "countBy", "sortBy", "indexBy" ];
        _.each(attributeMethods, function(method) {
            Collection.prototype[method] = function(value, context) {
                var iterator = _.isFunction(value) ? value : function(model) {
                    return model.get(value);
                };
                return _[method](this.models, iterator, context);
            };
        });
        var View = Backbone.View = function(options) {
            this.cid = _.uniqueId("view"), options || (options = {}), _.extend(this, _.pick(options, viewOptions)), 
            this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents();
        }, delegateEventSplitter = /^(\S+)\s*(.*)$/, viewOptions = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
        _.extend(View.prototype, Events, {
            tagName: "div",
            $: function(selector) {
                return this.$el.find(selector);
            },
            initialize: function() {},
            render: function() {
                return this;
            },
            remove: function() {
                return this.$el.remove(), this.stopListening(), this;
            },
            setElement: function(element, delegate) {
                return this.$el && this.undelegateEvents(), this.$el = element instanceof Backbone.$ ? element : Backbone.$(element), 
                this.el = this.$el[0], delegate !== !1 && this.delegateEvents(), this;
            },
            delegateEvents: function(events) {
                if (!events && !(events = _.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var key in events) {
                    var method = events[key];
                    if (_.isFunction(method) || (method = this[events[key]]), method) {
                        var match = key.match(delegateEventSplitter), eventName = match[1], selector = match[2];
                        method = _.bind(method, this), eventName += ".delegateEvents" + this.cid, "" === selector ? this.$el.on(eventName, method) : this.$el.on(eventName, selector, method);
                    }
                }
                return this;
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this;
            },
            _ensureElement: function() {
                if (this.el) this.setElement(_.result(this, "el"), !1); else {
                    var attrs = _.extend({}, _.result(this, "attributes"));
                    this.id && (attrs.id = _.result(this, "id")), this.className && (attrs["class"] = _.result(this, "className"));
                    var $el = Backbone.$("<" + _.result(this, "tagName") + ">").attr(attrs);
                    this.setElement($el, !1);
                }
            }
        }), Backbone.sync = function(method, model, options) {
            var type = methodMap[method];
            _.defaults(options || (options = {}), {
                emulateHTTP: Backbone.emulateHTTP,
                emulateJSON: Backbone.emulateJSON
            });
            var params = {
                type: type,
                dataType: "json"
            };
            if (options.url || (params.url = _.result(model, "url") || urlError()), null != options.data || !model || "create" !== method && "update" !== method && "patch" !== method || (params.contentType = "application/json", 
            params.data = JSON.stringify(options.attrs || model.toJSON(options))), options.emulateJSON && (params.contentType = "application/x-www-form-urlencoded", 
            params.data = params.data ? {
                model: params.data
            } : {}), options.emulateHTTP && ("PUT" === type || "DELETE" === type || "PATCH" === type)) {
                params.type = "POST", options.emulateJSON && (params.data._method = type);
                var beforeSend = options.beforeSend;
                options.beforeSend = function(xhr) {
                    return xhr.setRequestHeader("X-HTTP-Method-Override", type), beforeSend ? beforeSend.apply(this, arguments) : void 0;
                };
            }
            "GET" === params.type || options.emulateJSON || (params.processData = !1), "PATCH" === params.type && noXhrPatch && (params.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            });
            var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
            return model.trigger("request", model, xhr, options), xhr;
        };
        var noXhrPatch = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && new XMLHttpRequest().dispatchEvent), methodMap = {
            create: "POST",
            update: "PUT",
            patch: "PATCH",
            "delete": "DELETE",
            read: "GET"
        };
        Backbone.ajax = function() {
            return Backbone.$.ajax.apply(Backbone.$, arguments);
        };
        var Router = Backbone.Router = function(options) {
            options || (options = {}), options.routes && (this.routes = options.routes), this._bindRoutes(), 
            this.initialize.apply(this, arguments);
        }, optionalParam = /\((.*?)\)/g, namedParam = /(\(\?)?:\w+/g, splatParam = /\*\w+/g, escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        _.extend(Router.prototype, Events, {
            initialize: function() {},
            route: function(route, name, callback) {
                _.isRegExp(route) || (route = this._routeToRegExp(route)), _.isFunction(name) && (callback = name, 
                name = ""), callback || (callback = this[name]);
                var router = this;
                return Backbone.history.route(route, function(fragment) {
                    var args = router._extractParameters(route, fragment);
                    router.execute(callback, args), router.trigger.apply(router, [ "route:" + name ].concat(args)), 
                    router.trigger("route", name, args), Backbone.history.trigger("route", router, name, args);
                }), this;
            },
            execute: function(callback, args) {
                callback && callback.apply(this, args);
            },
            navigate: function(fragment, options) {
                return Backbone.history.navigate(fragment, options), this;
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = _.result(this, "routes");
                    for (var route, routes = _.keys(this.routes); null != (route = routes.pop()); ) this.route(route, this.routes[route]);
                }
            },
            _routeToRegExp: function(route) {
                return route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
                    return optional ? match : "([^/?]+)";
                }).replace(splatParam, "([^?]*?)"), new RegExp("^" + route + "(?:\\?([\\s\\S]*))?$", "i");
            },
            _extractParameters: function(route, fragment) {
                var params = route.exec(fragment).slice(1);
                return _.map(params, function(param, i) {
                    return i === params.length - 1 ? param || null : param ? decodeURIComponent(param) : null;
                });
            }
        });
        var History = Backbone.History = function() {
            this.handlers = [], _.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, 
            this.history = window.history);
        }, routeStripper = /^[#\/]|\s+$/g, rootStripper = /^\/+|\/+$/g, isExplorer = /msie [\w.]+/, trailingSlash = /\/$/, pathStripper = /#.*$/;
        History.started = !1, _.extend(History.prototype, Events, {
            interval: 50,
            atRoot: function() {
                return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root;
            },
            getHash: function(window) {
                var match = (window || this).location.href.match(/#(.*)$/);
                return match ? match[1] : "";
            },
            getFragment: function(fragment, forcePushState) {
                if (null == fragment) if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                    fragment = decodeURI(this.location.pathname + this.location.search);
                    var root = this.root.replace(trailingSlash, "");
                    fragment.indexOf(root) || (fragment = fragment.slice(root.length));
                } else fragment = this.getHash();
                return fragment.replace(routeStripper, "");
            },
            start: function(options) {
                if (History.started) throw new Error("Backbone.history has already been started");
                History.started = !0, this.options = _.extend({
                    root: "/"
                }, this.options, options), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, 
                this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var fragment = this.getFragment(), docMode = document.documentMode, oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || 7 >= docMode);
                if (this.root = ("/" + this.root + "/").replace(rootStripper, "/"), oldIE && this._wantsHashChange) {
                    var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
                    this.iframe = frame.hide().appendTo("body")[0].contentWindow, this.navigate(fragment);
                }
                this._hasPushState ? Backbone.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !oldIE ? Backbone.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), 
                this.fragment = fragment;
                var loc = this.location;
                if (this._wantsHashChange && this._wantsPushState) {
                    if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), 
                    this.location.replace(this.root + "#" + this.fragment), !0;
                    this._hasPushState && this.atRoot() && loc.hash && (this.fragment = this.getHash().replace(routeStripper, ""), 
                    this.history.replaceState({}, document.title, this.root + this.fragment));
                }
                return this.options.silent ? void 0 : this.loadUrl();
            },
            stop: function() {
                Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), 
                this._checkUrlInterval && clearInterval(this._checkUrlInterval), History.started = !1;
            },
            route: function(route, callback) {
                this.handlers.unshift({
                    route: route,
                    callback: callback
                });
            },
            checkUrl: function() {
                var current = this.getFragment();
                return current === this.fragment && this.iframe && (current = this.getFragment(this.getHash(this.iframe))), 
                current === this.fragment ? !1 : (this.iframe && this.navigate(current), this.loadUrl(), 
                void 0);
            },
            loadUrl: function(fragment) {
                return fragment = this.fragment = this.getFragment(fragment), _.any(this.handlers, function(handler) {
                    return handler.route.test(fragment) ? (handler.callback(fragment), !0) : void 0;
                });
            },
            navigate: function(fragment, options) {
                if (!History.started) return !1;
                options && options !== !0 || (options = {
                    trigger: !!options
                });
                var url = this.root + (fragment = this.getFragment(fragment || ""));
                if (fragment = fragment.replace(pathStripper, ""), this.fragment !== fragment) {
                    if (this.fragment = fragment, "" === fragment && "/" !== url && (url = url.slice(0, -1)), 
                    this._hasPushState) this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url); else {
                        if (!this._wantsHashChange) return this.location.assign(url);
                        this._updateHash(this.location, fragment, options.replace), this.iframe && fragment !== this.getFragment(this.getHash(this.iframe)) && (options.replace || this.iframe.document.open().close(), 
                        this._updateHash(this.iframe.location, fragment, options.replace));
                    }
                    return options.trigger ? this.loadUrl(fragment) : void 0;
                }
            },
            _updateHash: function(location, fragment, replace) {
                if (replace) {
                    var href = location.href.replace(/(javascript:|#).*$/, "");
                    location.replace(href + "#" + fragment);
                } else location.hash = "#" + fragment;
            }
        }), Backbone.history = new History();
        var extend = function(protoProps, staticProps) {
            var child, parent = this;
            child = protoProps && _.has(protoProps, "constructor") ? protoProps.constructor : function() {
                return parent.apply(this, arguments);
            }, _.extend(child, parent, staticProps);
            var Surrogate = function() {
                this.constructor = child;
            };
            return Surrogate.prototype = parent.prototype, child.prototype = new Surrogate(), 
            protoProps && _.extend(child.prototype, protoProps), child.__super__ = parent.prototype, 
            child;
        };
        Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
        var urlError = function() {
            throw new Error('A "url" property or function must be specified');
        }, wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                error && error(model, resp, options), model.trigger("error", model, resp, options);
            };
        };
        return Backbone;
    }), function(undefined) {
        "use strict";
        var _, Backbone, exports;
        "undefined" == typeof window ? (_ = require("underscore"), Backbone = require("backbone"), 
        exports = Backbone, "undefined" == typeof module || (module.exports = exports)) : (_ = window._, 
        Backbone = window.Backbone, exports = window), Backbone.Relational = {
            showWarnings: !0
        }, Backbone.Semaphore = {
            _permitsAvailable: null,
            _permitsUsed: 0,
            acquire: function() {
                if (this._permitsAvailable && this._permitsUsed >= this._permitsAvailable) throw new Error("Max permits acquired");
                this._permitsUsed++;
            },
            release: function() {
                if (0 === this._permitsUsed) throw new Error("All permits released");
                this._permitsUsed--;
            },
            isLocked: function() {
                return this._permitsUsed > 0;
            },
            setAvailablePermits: function(amount) {
                if (this._permitsUsed > amount) throw new Error("Available permits cannot be less than used permits");
                this._permitsAvailable = amount;
            }
        }, Backbone.BlockingQueue = function() {
            this._queue = [];
        }, _.extend(Backbone.BlockingQueue.prototype, Backbone.Semaphore, {
            _queue: null,
            add: function(func) {
                this.isBlocked() ? this._queue.push(func) : func();
            },
            process: function() {
                var queue = this._queue;
                for (this._queue = []; queue && queue.length; ) queue.shift()();
            },
            block: function() {
                this.acquire();
            },
            unblock: function() {
                this.release(), this.isBlocked() || this.process();
            },
            isBlocked: function() {
                return this.isLocked();
            }
        }), Backbone.Relational.eventQueue = new Backbone.BlockingQueue(), Backbone.Store = function() {
            this._collections = [], this._reverseRelations = [], this._orphanRelations = [], 
            this._subModels = [], this._modelScopes = [ exports ];
        }, _.extend(Backbone.Store.prototype, Backbone.Events, {
            initializeRelation: function(model, relation, options) {
                var type = _.isString(relation.type) ? Backbone[relation.type] || this.getObjectByName(relation.type) : relation.type;
                type && type.prototype instanceof Backbone.Relation ? new type(model, relation, options) : Backbone.Relational.showWarnings && "undefined" != typeof console && console.warn("Relation=%o; missing or invalid relation type!", relation);
            },
            addModelScope: function(scope) {
                this._modelScopes.push(scope);
            },
            removeModelScope: function(scope) {
                this._modelScopes = _.without(this._modelScopes, scope);
            },
            addSubModels: function(subModelTypes, superModelType) {
                this._subModels.push({
                    superModelType: superModelType,
                    subModels: subModelTypes
                });
            },
            setupSuperModel: function(modelType) {
                _.find(this._subModels, function(subModelDef) {
                    return _.find(subModelDef.subModels || [], function(subModelTypeName, typeValue) {
                        var subModelType = this.getObjectByName(subModelTypeName);
                        return modelType === subModelType ? (subModelDef.superModelType._subModels[typeValue] = modelType, 
                        modelType._superModel = subModelDef.superModelType, modelType._subModelTypeValue = typeValue, 
                        modelType._subModelTypeAttribute = subModelDef.superModelType.prototype.subModelTypeAttribute, 
                        !0) : void 0;
                    }, this);
                }, this);
            },
            addReverseRelation: function(relation) {
                var exists = _.any(this._reverseRelations, function(rel) {
                    return _.all(relation || [], function(val, key) {
                        return val === rel[key];
                    });
                });
                !exists && relation.model && relation.type && (this._reverseRelations.push(relation), 
                this._addRelation(relation.model, relation), this.retroFitRelation(relation));
            },
            addOrphanRelation: function(relation) {
                var exists = _.any(this._orphanRelations, function(rel) {
                    return _.all(relation || [], function(val, key) {
                        return val === rel[key];
                    });
                });
                !exists && relation.model && relation.type && this._orphanRelations.push(relation);
            },
            processOrphanRelations: function() {
                _.each(this._orphanRelations.slice(0), function(rel) {
                    var relatedModel = Backbone.Relational.store.getObjectByName(rel.relatedModel);
                    relatedModel && (this.initializeRelation(null, rel), this._orphanRelations = _.without(this._orphanRelations, rel));
                }, this);
            },
            _addRelation: function(type, relation) {
                type.prototype.relations || (type.prototype.relations = []), type.prototype.relations.push(relation), 
                _.each(type._subModels || [], function(subModel) {
                    this._addRelation(subModel, relation);
                }, this);
            },
            retroFitRelation: function(relation) {
                var coll = this.getCollection(relation.model, !1);
                coll && coll.each(function(model) {
                    model instanceof relation.model && new relation.type(model, relation);
                }, this);
            },
            getCollection: function(type, create) {
                type instanceof Backbone.RelationalModel && (type = type.constructor);
                for (var rootModel = type; rootModel._superModel; ) rootModel = rootModel._superModel;
                var coll = _.find(this._collections, function(item) {
                    return item.model === rootModel;
                });
                return coll || create === !1 || (coll = this._createCollection(rootModel)), coll;
            },
            getObjectByName: function(name) {
                var parts = name.split("."), type = null;
                return _.find(this._modelScopes, function(scope) {
                    return type = _.reduce(parts || [], function(memo, val) {
                        return memo ? memo[val] : undefined;
                    }, scope), type && type !== scope ? !0 : void 0;
                }, this), type;
            },
            _createCollection: function(type) {
                var coll;
                return type instanceof Backbone.RelationalModel && (type = type.constructor), type.prototype instanceof Backbone.RelationalModel && (coll = new Backbone.Collection(), 
                coll.model = type, this._collections.push(coll)), coll;
            },
            resolveIdForItem: function(type, item) {
                var id = _.isString(item) || _.isNumber(item) ? item : null;
                return null === id && (item instanceof Backbone.RelationalModel ? id = item.id : _.isObject(item) && (id = item[type.prototype.idAttribute])), 
                id || 0 === id || (id = null), id;
            },
            find: function(type, item) {
                var id = this.resolveIdForItem(type, item), coll = this.getCollection(type);
                if (coll) {
                    var obj = coll.get(id);
                    if (obj instanceof type) return obj;
                }
                return null;
            },
            register: function(model) {
                var coll = this.getCollection(model);
                if (coll) {
                    var modelColl = model.collection;
                    coll.add(model), this.listenTo(model, "destroy", this.unregister, this), this.listenTo(model, "relational:unregister", this.unregister, this), 
                    model.collection = modelColl;
                }
            },
            checkId: function(model, id) {
                var coll = this.getCollection(model), duplicate = coll && coll.get(id);
                if (duplicate && model !== duplicate) throw Backbone.Relational.showWarnings && "undefined" != typeof console && console.warn("Duplicate id! Old RelationalModel=%o, new RelationalModel=%o", duplicate, model), 
                new Error("Cannot instantiate more than one Backbone.RelationalModel with the same id per type!");
            },
            update: function(model) {
                var coll = this.getCollection(model);
                coll._onModelEvent("change:" + model.idAttribute, model, coll), model.trigger("relational:change:id", model, coll);
            },
            unregister: function(model, collection, options) {
                this.stopListening(model);
                var coll = this.getCollection(model);
                coll && coll.remove(model, options);
            },
            reset: function() {
                this.stopListening(), this._collections = [], this._subModels = [], this._modelScopes = [ exports ];
            }
        }), Backbone.Relational.store = new Backbone.Store(), Backbone.Relation = function(instance, options, opts) {
            if (this.instance = instance, options = _.isObject(options) ? options : {}, this.reverseRelation = _.defaults(options.reverseRelation || {}, this.options.reverseRelation), 
            this.options = _.defaults(options, this.options, Backbone.Relation.prototype.options), 
            this.reverseRelation.type = _.isString(this.reverseRelation.type) ? Backbone[this.reverseRelation.type] || Backbone.Relational.store.getObjectByName(this.reverseRelation.type) : this.reverseRelation.type, 
            this.key = this.options.key, this.keySource = this.options.keySource || this.key, 
            this.keyDestination = this.options.keyDestination || this.keySource || this.key, 
            this.model = this.options.model || this.instance.constructor, this.relatedModel = this.options.relatedModel, 
            !_.isFunction(this.relatedModel) || this.relatedModel.prototype instanceof Backbone.RelationalModel || (this.relatedModel = _.result(this, "relatedModel")), 
            _.isString(this.relatedModel) && (this.relatedModel = Backbone.Relational.store.getObjectByName(this.relatedModel)), 
            this.checkPreconditions() && (!this.options.isAutoRelation && this.reverseRelation.type && this.reverseRelation.key && Backbone.Relational.store.addReverseRelation(_.defaults({
                isAutoRelation: !0,
                model: this.relatedModel,
                relatedModel: this.model,
                reverseRelation: this.options
            }, this.reverseRelation)), instance)) {
                var contentKey = this.keySource;
                contentKey !== this.key && "object" == typeof this.instance.get(this.key) && (contentKey = this.key), 
                this.setKeyContents(this.instance.get(contentKey)), this.relatedCollection = Backbone.Relational.store.getCollection(this.relatedModel), 
                this.keySource !== this.key && delete this.instance.attributes[this.keySource], 
                this.instance._relations[this.key] = this, this.initialize(opts), this.options.autoFetch && this.instance.fetchRelated(this.key, _.isObject(this.options.autoFetch) ? this.options.autoFetch : {}), 
                this.listenTo(this.instance, "destroy", this.destroy).listenTo(this.relatedCollection, "relational:add relational:change:id", this.tryAddRelated).listenTo(this.relatedCollection, "relational:remove", this.removeRelated);
            }
        }, Backbone.Relation.extend = Backbone.Model.extend, _.extend(Backbone.Relation.prototype, Backbone.Events, Backbone.Semaphore, {
            options: {
                createModels: !0,
                includeInJSON: !0,
                isAutoRelation: !1,
                autoFetch: !1,
                parse: !1
            },
            instance: null,
            key: null,
            keyContents: null,
            relatedModel: null,
            relatedCollection: null,
            reverseRelation: null,
            related: null,
            checkPreconditions: function() {
                var i = this.instance, k = this.key, m = this.model, rm = this.relatedModel, warn = Backbone.Relational.showWarnings && "undefined" != typeof console;
                if (!m || !k || !rm) return warn && console.warn("Relation=%o: missing model, key or relatedModel (%o, %o, %o).", this, m, k, rm), 
                !1;
                if (!(m.prototype instanceof Backbone.RelationalModel)) return warn && console.warn("Relation=%o: model does not inherit from Backbone.RelationalModel (%o).", this, i), 
                !1;
                if (!(rm.prototype instanceof Backbone.RelationalModel)) return warn && console.warn("Relation=%o: relatedModel does not inherit from Backbone.RelationalModel (%o).", this, rm), 
                !1;
                if (this instanceof Backbone.HasMany && this.reverseRelation.type === Backbone.HasMany) return warn && console.warn("Relation=%o: relation is a HasMany, and the reverseRelation is HasMany as well.", this), 
                !1;
                if (i && _.keys(i._relations).length) {
                    var existing = _.find(i._relations, function(rel) {
                        return rel.key === k;
                    }, this);
                    if (existing) return warn && console.warn("Cannot create relation=%o on %o for model=%o: already taken by relation=%o.", this, k, i, existing), 
                    !1;
                }
                return !0;
            },
            setRelated: function(related) {
                this.related = related, this.instance.acquire(), this.instance.attributes[this.key] = related, 
                this.instance.release();
            },
            _isReverseRelation: function(relation) {
                return relation.instance instanceof this.relatedModel && this.reverseRelation.key === relation.key && this.key === relation.reverseRelation.key;
            },
            getReverseRelations: function(model) {
                var reverseRelations = [], models = _.isUndefined(model) ? this.related && (this.related.models || [ this.related ]) : [ model ];
                return _.each(models || [], function(related) {
                    _.each(related.getRelations() || [], function(relation) {
                        this._isReverseRelation(relation) && reverseRelations.push(relation);
                    }, this);
                }, this), reverseRelations;
            },
            destroy: function() {
                this.stopListening(), this instanceof Backbone.HasOne ? this.setRelated(null) : this instanceof Backbone.HasMany && this.setRelated(this._prepareCollection()), 
                _.each(this.getReverseRelations(), function(relation) {
                    relation.removeRelated(this.instance);
                }, this);
            }
        }), Backbone.HasOne = Backbone.Relation.extend({
            options: {
                reverseRelation: {
                    type: "HasMany"
                }
            },
            initialize: function(opts) {
                this.listenTo(this.instance, "relational:change:" + this.key, this.onChange);
                var related = this.findRelated(opts);
                this.setRelated(related), _.each(this.getReverseRelations(), function(relation) {
                    relation.addRelated(this.instance, opts);
                }, this);
            },
            findRelated: function(options) {
                var related = null;
                if (options = _.defaults({
                    parse: this.options.parse
                }, options), this.keyContents instanceof this.relatedModel) related = this.keyContents; else if (this.keyContents || 0 === this.keyContents) {
                    var opts = _.defaults({
                        create: this.options.createModels
                    }, options);
                    related = this.relatedModel.findOrCreate(this.keyContents, opts);
                }
                return this.related && (this.keyId = null), related;
            },
            setKeyContents: function(keyContents) {
                this.keyContents = keyContents, this.keyId = Backbone.Relational.store.resolveIdForItem(this.relatedModel, this.keyContents);
            },
            onChange: function(model, attr, options) {
                if (!this.isLocked()) {
                    this.acquire(), options = options ? _.clone(options) : {};
                    var changed = _.isUndefined(options.__related), oldRelated = changed ? this.related : options.__related;
                    if (changed) {
                        this.setKeyContents(attr);
                        var related = this.findRelated(options);
                        this.setRelated(related);
                    }
                    if (oldRelated && this.related !== oldRelated && _.each(this.getReverseRelations(oldRelated), function(relation) {
                        relation.removeRelated(this.instance, null, options);
                    }, this), _.each(this.getReverseRelations(), function(relation) {
                        relation.addRelated(this.instance, options);
                    }, this), !options.silent && this.related !== oldRelated) {
                        var dit = this;
                        this.changed = !0, Backbone.Relational.eventQueue.add(function() {
                            dit.instance.trigger("change:" + dit.key, dit.instance, dit.related, options, !0), 
                            dit.changed = !1;
                        });
                    }
                    this.release();
                }
            },
            tryAddRelated: function(model, coll, options) {
                !this.keyId && 0 !== this.keyId || model.id !== this.keyId || (this.addRelated(model, options), 
                this.keyId = null);
            },
            addRelated: function(model, options) {
                var dit = this;
                model.queue(function() {
                    if (model !== dit.related) {
                        var oldRelated = dit.related || null;
                        dit.setRelated(model), dit.onChange(dit.instance, model, _.defaults({
                            __related: oldRelated
                        }, options));
                    }
                });
            },
            removeRelated: function(model, coll, options) {
                if (this.related && model === this.related) {
                    var oldRelated = this.related || null;
                    this.setRelated(null), this.onChange(this.instance, model, _.defaults({
                        __related: oldRelated
                    }, options));
                }
            }
        }), Backbone.HasMany = Backbone.Relation.extend({
            collectionType: null,
            options: {
                reverseRelation: {
                    type: "HasOne"
                },
                collectionType: Backbone.Collection,
                collectionKey: !0,
                collectionOptions: {}
            },
            initialize: function(opts) {
                if (this.listenTo(this.instance, "relational:change:" + this.key, this.onChange), 
                this.collectionType = this.options.collectionType, !_.isFunction(this.collectionType) || this.collectionType === Backbone.Collection || this.collectionType.prototype instanceof Backbone.Collection || (this.collectionType = _.result(this, "collectionType")), 
                _.isString(this.collectionType) && (this.collectionType = Backbone.Relational.store.getObjectByName(this.collectionType)), 
                this.collectionType !== Backbone.Collection && !(this.collectionType.prototype instanceof Backbone.Collection)) throw new Error("`collectionType` must inherit from Backbone.Collection");
                var related = this.findRelated(opts);
                this.setRelated(related);
            },
            _prepareCollection: function(collection) {
                if (this.related && this.stopListening(this.related), !(collection && collection instanceof Backbone.Collection)) {
                    var options = _.isFunction(this.options.collectionOptions) ? this.options.collectionOptions(this.instance) : this.options.collectionOptions;
                    collection = new this.collectionType(null, options);
                }
                if (collection.model = this.relatedModel, this.options.collectionKey) {
                    var key = this.options.collectionKey === !0 ? this.options.reverseRelation.key : this.options.collectionKey;
                    collection[key] && collection[key] !== this.instance ? Backbone.Relational.showWarnings && "undefined" != typeof console && console.warn("Relation=%o; collectionKey=%s already exists on collection=%o", this, key, this.options.collectionKey) : key && (collection[key] = this.instance);
                }
                return this.listenTo(collection, "relational:add", this.handleAddition).listenTo(collection, "relational:remove", this.handleRemoval).listenTo(collection, "relational:reset", this.handleReset), 
                collection;
            },
            findRelated: function(options) {
                var related = null;
                if (options = _.defaults({
                    parse: this.options.parse
                }, options), this.keyContents instanceof Backbone.Collection) this._prepareCollection(this.keyContents), 
                related = this.keyContents; else {
                    var toAdd = [];
                    _.each(this.keyContents, function(attributes) {
                        if (attributes instanceof this.relatedModel) var model = attributes; else model = this.relatedModel.findOrCreate(attributes, _.extend({
                            merge: !0
                        }, options, {
                            create: this.options.createModels
                        }));
                        model && toAdd.push(model);
                    }, this), related = this.related instanceof Backbone.Collection ? this.related : this._prepareCollection(), 
                    related.set(toAdd, _.defaults({
                        merge: !1,
                        parse: !1
                    }, options));
                }
                return this.keyIds = _.difference(this.keyIds, _.pluck(related.models, "id")), related;
            },
            setKeyContents: function(keyContents) {
                this.keyContents = keyContents instanceof Backbone.Collection ? keyContents : null, 
                this.keyIds = [], this.keyContents || !keyContents && 0 !== keyContents || (this.keyContents = _.isArray(keyContents) ? keyContents : [ keyContents ], 
                _.each(this.keyContents, function(item) {
                    var itemId = Backbone.Relational.store.resolveIdForItem(this.relatedModel, item);
                    (itemId || 0 === itemId) && this.keyIds.push(itemId);
                }, this));
            },
            onChange: function(model, attr, options) {
                options = options ? _.clone(options) : {}, this.setKeyContents(attr), this.changed = !1;
                var related = this.findRelated(options);
                if (this.setRelated(related), !options.silent) {
                    var dit = this;
                    Backbone.Relational.eventQueue.add(function() {
                        dit.changed && (dit.instance.trigger("change:" + dit.key, dit.instance, dit.related, options, !0), 
                        dit.changed = !1);
                    });
                }
            },
            handleAddition: function(model, coll, options) {
                options = options ? _.clone(options) : {}, this.changed = !0, _.each(this.getReverseRelations(model), function(relation) {
                    relation.addRelated(this.instance, options);
                }, this);
                var dit = this;
                !options.silent && Backbone.Relational.eventQueue.add(function() {
                    dit.instance.trigger("add:" + dit.key, model, dit.related, options);
                });
            },
            handleRemoval: function(model, coll, options) {
                options = options ? _.clone(options) : {}, this.changed = !0, _.each(this.getReverseRelations(model), function(relation) {
                    relation.removeRelated(this.instance, null, options);
                }, this);
                var dit = this;
                !options.silent && Backbone.Relational.eventQueue.add(function() {
                    dit.instance.trigger("remove:" + dit.key, model, dit.related, options);
                });
            },
            handleReset: function(coll, options) {
                var dit = this;
                options = options ? _.clone(options) : {}, !options.silent && Backbone.Relational.eventQueue.add(function() {
                    dit.instance.trigger("reset:" + dit.key, dit.related, options);
                });
            },
            tryAddRelated: function(model, coll, options) {
                var item = _.contains(this.keyIds, model.id);
                item && (this.addRelated(model, options), this.keyIds = _.without(this.keyIds, model.id));
            },
            addRelated: function(model, options) {
                var dit = this;
                model.queue(function() {
                    dit.related && !dit.related.get(model) && dit.related.add(model, _.defaults({
                        parse: !1
                    }, options));
                });
            },
            removeRelated: function(model, coll, options) {
                this.related.get(model) && this.related.remove(model, options);
            }
        }), Backbone.RelationalModel = Backbone.Model.extend({
            relations: null,
            _relations: null,
            _isInitialized: !1,
            _deferProcessing: !1,
            _queue: null,
            _attributeChangeFired: !1,
            subModelTypeAttribute: "type",
            subModelTypes: null,
            constructor: function(attributes, options) {
                if (options && options.collection) {
                    var dit = this, collection = this.collection = options.collection;
                    delete options.collection, this._deferProcessing = !0;
                    var processQueue = function(model) {
                        model === dit && (dit._deferProcessing = !1, dit.processQueue(), collection.off("relational:add", processQueue));
                    };
                    collection.on("relational:add", processQueue), _.defer(function() {
                        processQueue(dit);
                    });
                }
                Backbone.Relational.store.processOrphanRelations(), this._queue = new Backbone.BlockingQueue(), 
                this._queue.block(), Backbone.Relational.eventQueue.block();
                try {
                    Backbone.Model.apply(this, arguments);
                } finally {
                    Backbone.Relational.eventQueue.unblock();
                }
            },
            trigger: function(eventName) {
                if (eventName.length > 5 && 0 === eventName.indexOf("change")) {
                    var dit = this, args = arguments;
                    Backbone.Relational.eventQueue.add(function() {
                        if (dit._isInitialized) {
                            var changed = !0;
                            if ("change" === eventName) changed = dit.hasChanged() || dit._attributeChangeFired, 
                            dit._attributeChangeFired = !1; else {
                                var attr = eventName.slice(7), rel = dit.getRelation(attr);
                                rel ? (changed = args[4] === !0, changed ? dit.changed[attr] = args[2] : rel.changed || delete dit.changed[attr]) : changed && (dit._attributeChangeFired = !0);
                            }
                            changed && Backbone.Model.prototype.trigger.apply(dit, args);
                        }
                    });
                } else Backbone.Model.prototype.trigger.apply(this, arguments);
                return this;
            },
            initializeRelations: function(options) {
                this.acquire(), this._relations = {}, _.each(_.result(this, "relations") || [], function(rel) {
                    Backbone.Relational.store.initializeRelation(this, rel, options);
                }, this), this._isInitialized = !0, this.release(), this.processQueue();
            },
            updateRelations: function(options) {
                this._isInitialized && !this.isLocked() && _.each(this._relations, function(rel) {
                    var val = this.attributes[rel.keySource] || this.attributes[rel.key];
                    rel.related !== val && this.trigger("relational:change:" + rel.key, this, val, options || {}), 
                    rel.keySource !== rel.key && delete rel.instance.attributes[rel.keySource];
                }, this);
            },
            queue: function(func) {
                this._queue.add(func);
            },
            processQueue: function() {
                this._isInitialized && !this._deferProcessing && this._queue.isBlocked() && this._queue.unblock();
            },
            getRelation: function(key) {
                return this._relations[key];
            },
            getRelations: function() {
                return _.values(this._relations);
            },
            fetchRelated: function(key, options, refresh) {
                options = _.extend({
                    update: !0,
                    remove: !1
                }, options);
                var setUrl, requests = [], rel = this.getRelation(key), idsToFetch = rel && (rel.keyIds && rel.keyIds.slice(0) || (rel.keyId || 0 === rel.keyId ? [ rel.keyId ] : []));
                if (refresh) {
                    var models = rel.related instanceof Backbone.Collection ? rel.related.models : [ rel.related ];
                    _.each(models, function(model) {
                        (model.id || 0 === model.id) && idsToFetch.push(model.id);
                    });
                }
                if (idsToFetch && idsToFetch.length) {
                    var created = [], models = _.map(idsToFetch, function(id) {
                        var model = Backbone.Relational.store.find(rel.relatedModel, id);
                        if (!model) {
                            var attrs = {};
                            attrs[rel.relatedModel.prototype.idAttribute] = id, model = rel.relatedModel.findOrCreate(attrs, options), 
                            created.push(model);
                        }
                        return model;
                    }, this);
                    if (rel.related instanceof Backbone.Collection && _.isFunction(rel.related.url) && (setUrl = rel.related.url(models)), 
                    setUrl && setUrl !== rel.related.url()) {
                        var opts = _.defaults({
                            error: function() {
                                var args = arguments;
                                _.each(created, function(model) {
                                    model.trigger("destroy", model, model.collection, options), options.error && options.error.apply(model, args);
                                });
                            },
                            url: setUrl
                        }, options);
                        requests = [ rel.related.fetch(opts) ];
                    } else requests = _.map(models, function(model) {
                        var opts = _.defaults({
                            error: function() {
                                _.contains(created, model) && (model.trigger("destroy", model, model.collection, options), 
                                options.error && options.error.apply(model, arguments));
                            }
                        }, options);
                        return model.fetch(opts);
                    }, this);
                }
                return requests;
            },
            get: function(attr) {
                var originalResult = Backbone.Model.prototype.get.call(this, attr);
                if (!this.dotNotation || -1 === attr.indexOf(".")) return originalResult;
                var splits = attr.split("."), result = _.reduce(splits, function(model, split) {
                    if (_.isNull(model) || _.isUndefined(model)) return undefined;
                    if (model instanceof Backbone.Model) return Backbone.Model.prototype.get.call(model, split);
                    if (model instanceof Backbone.Collection) return Backbone.Collection.prototype.at.call(model, split);
                    throw new Error("Attribute must be an instanceof Backbone.Model or Backbone.Collection. Is: " + model + ", currentSplit: " + split);
                }, this);
                if (originalResult !== undefined && result !== undefined) throw new Error("Ambiguous result for '" + attr + "'. direct result: " + originalResult + ", dotNotation: " + result);
                return originalResult || result;
            },
            set: function(key, value, options) {
                Backbone.Relational.eventQueue.block();
                var attributes;
                _.isObject(key) || null == key ? (attributes = key, options = value) : (attributes = {}, 
                attributes[key] = value);
                try {
                    var id = this.id, newId = attributes && this.idAttribute in attributes && attributes[this.idAttribute];
                    Backbone.Relational.store.checkId(this, newId);
                    var result = Backbone.Model.prototype.set.apply(this, arguments);
                    this._isInitialized || this.isLocked() ? newId && newId !== id && Backbone.Relational.store.update(this) : (this.constructor.initializeModelHierarchy(), 
                    Backbone.Relational.store.register(this), this.initializeRelations(options)), attributes && this.updateRelations(options);
                } finally {
                    Backbone.Relational.eventQueue.unblock();
                }
                return result;
            },
            clone: function() {
                var attributes = _.clone(this.attributes);
                return _.isUndefined(attributes[this.idAttribute]) || (attributes[this.idAttribute] = null), 
                _.each(this.getRelations(), function(rel) {
                    delete attributes[rel.key];
                }), new this.constructor(attributes);
            },
            toJSON: function(options) {
                if (this.isLocked()) return this.id;
                this.acquire();
                var json = Backbone.Model.prototype.toJSON.call(this, options);
                return !this.constructor._superModel || this.constructor._subModelTypeAttribute in json || (json[this.constructor._subModelTypeAttribute] = this.constructor._subModelTypeValue), 
                _.each(this._relations, function(rel) {
                    var related = json[rel.key], includeInJSON = rel.options.includeInJSON, value = null;
                    includeInJSON === !0 ? related && _.isFunction(related.toJSON) && (value = related.toJSON(options)) : _.isString(includeInJSON) ? (related instanceof Backbone.Collection ? value = related.pluck(includeInJSON) : related instanceof Backbone.Model && (value = related.get(includeInJSON)), 
                    includeInJSON === rel.relatedModel.prototype.idAttribute && (rel instanceof Backbone.HasMany ? value = value.concat(rel.keyIds) : rel instanceof Backbone.HasOne && (value = value || rel.keyId))) : _.isArray(includeInJSON) ? related instanceof Backbone.Collection ? (value = [], 
                    related.each(function(model) {
                        var curJson = {};
                        _.each(includeInJSON, function(key) {
                            curJson[key] = model.get(key);
                        }), value.push(curJson);
                    })) : related instanceof Backbone.Model && (value = {}, _.each(includeInJSON, function(key) {
                        value[key] = related.get(key);
                    })) : delete json[rel.key], includeInJSON && (json[rel.keyDestination] = value), 
                    rel.keyDestination !== rel.key && delete json[rel.key];
                }), this.release(), json;
            }
        }, {
            setup: function() {
                return this.prototype.relations = (this.prototype.relations || []).slice(0), this._subModels = {}, 
                this._superModel = null, this.prototype.hasOwnProperty("subModelTypes") ? Backbone.Relational.store.addSubModels(this.prototype.subModelTypes, this) : this.prototype.subModelTypes = null, 
                _.each(this.prototype.relations || [], function(rel) {
                    if (rel.model || (rel.model = this), rel.reverseRelation && rel.model === this) {
                        var preInitialize = !0;
                        if (_.isString(rel.relatedModel)) {
                            var relatedModel = Backbone.Relational.store.getObjectByName(rel.relatedModel);
                            preInitialize = relatedModel && relatedModel.prototype instanceof Backbone.RelationalModel;
                        }
                        preInitialize ? Backbone.Relational.store.initializeRelation(null, rel) : _.isString(rel.relatedModel) && Backbone.Relational.store.addOrphanRelation(rel);
                    }
                }, this), this;
            },
            build: function(attributes, options) {
                this.initializeModelHierarchy();
                var model = this._findSubModelType(this, attributes) || this;
                return new model(attributes, options);
            },
            _findSubModelType: function(type, attributes) {
                if (type._subModels && type.prototype.subModelTypeAttribute in attributes) {
                    var subModelTypeAttribute = attributes[type.prototype.subModelTypeAttribute], subModelType = type._subModels[subModelTypeAttribute];
                    if (subModelType) return subModelType;
                    for (subModelTypeAttribute in type._subModels) if (subModelType = this._findSubModelType(type._subModels[subModelTypeAttribute], attributes)) return subModelType;
                }
                return null;
            },
            initializeModelHierarchy: function() {
                if (this.inheritRelations(), this.prototype.subModelTypes) {
                    var resolvedSubModels = _.keys(this._subModels), unresolvedSubModels = _.omit(this.prototype.subModelTypes, resolvedSubModels);
                    _.each(unresolvedSubModels, function(subModelTypeName) {
                        var subModelType = Backbone.Relational.store.getObjectByName(subModelTypeName);
                        subModelType && subModelType.initializeModelHierarchy();
                    });
                }
            },
            inheritRelations: function() {
                if (_.isUndefined(this._superModel) || _.isNull(this._superModel)) if (Backbone.Relational.store.setupSuperModel(this), 
                this._superModel) {
                    if (this._superModel.inheritRelations(), this._superModel.prototype.relations) {
                        var inheritedRelations = _.select(this._superModel.prototype.relations || [], function(superRel) {
                            return !_.any(this.prototype.relations || [], function(rel) {
                                return superRel.relatedModel === rel.relatedModel && superRel.key === rel.key;
                            }, this);
                        }, this);
                        this.prototype.relations = inheritedRelations.concat(this.prototype.relations);
                    }
                } else this._superModel = !1;
            },
            findOrCreate: function(attributes, options) {
                options || (options = {});
                var parsedAttributes = _.isObject(attributes) && options.parse && this.prototype.parse ? this.prototype.parse(_.clone(attributes)) : attributes, model = Backbone.Relational.store.find(this, parsedAttributes);
                return _.isObject(attributes) && (model && options.merge !== !1 ? (delete options.collection, 
                delete options.url, model.set(parsedAttributes, options)) : model || options.create === !1 || (model = this.build(attributes, options))), 
                model;
            },
            find: function(attributes, options) {
                return options || (options = {}), options.create = !1, this.findOrCreate(attributes, options);
            }
        }), _.extend(Backbone.RelationalModel.prototype, Backbone.Semaphore), Backbone.Collection.prototype.__prepareModel = Backbone.Collection.prototype._prepareModel, 
        Backbone.Collection.prototype._prepareModel = function(attrs, options) {
            var model;
            return attrs instanceof Backbone.Model ? (attrs.collection || (attrs.collection = this), 
            model = attrs) : (options || (options = {}), options.collection = this, model = "undefined" != typeof this.model.findOrCreate ? this.model.findOrCreate(attrs, options) : new this.model(attrs, options), 
            model && model.isNew() && !model._validate(attrs, options) && (this.trigger("invalid", this, attrs, options), 
            model = !1)), model;
        };
        var set = Backbone.Collection.prototype.__set = Backbone.Collection.prototype.set;
        Backbone.Collection.prototype.set = function(models, options) {
            if (!(this.model.prototype instanceof Backbone.RelationalModel)) return set.apply(this, arguments);
            options && options.parse && (models = this.parse(models, options)), _.isArray(models) || (models = models ? [ models ] : []);
            var newModels = [], toAdd = [];
            return _.each(models, function(model) {
                model instanceof Backbone.Model || (model = Backbone.Collection.prototype._prepareModel.call(this, model, options)), 
                model && (toAdd.push(model), this.get(model) || this.get(model.cid) ? null != model.id && (this._byId[model.id] = model) : newModels.push(model));
            }, this), set.call(this, toAdd, _.defaults({
                parse: !1
            }, options)), _.each(newModels, function(model) {
                (this.get(model) || this.get(model.cid)) && this.trigger("relational:add", model, this, options);
            }, this), this;
        };
        var remove = Backbone.Collection.prototype.__remove = Backbone.Collection.prototype.remove;
        Backbone.Collection.prototype.remove = function(models, options) {
            if (!(this.model.prototype instanceof Backbone.RelationalModel)) return remove.apply(this, arguments);
            models = _.isArray(models) ? models.slice(0) : [ models ], options || (options = {});
            var toRemove = [];
            return _.each(models, function(model) {
                model = this.get(model) || model && this.get(model.cid), model && toRemove.push(model);
            }, this), toRemove.length && (remove.call(this, toRemove, options), _.each(toRemove, function(model) {
                this.trigger("relational:remove", model, this, options);
            }, this)), this;
        };
        var reset = Backbone.Collection.prototype.__reset = Backbone.Collection.prototype.reset;
        Backbone.Collection.prototype.reset = function(models, options) {
            return options = _.extend({
                merge: !0
            }, options), reset.call(this, models, options), this.model.prototype instanceof Backbone.RelationalModel && this.trigger("relational:reset", this, options), 
            this;
        };
        var sort = Backbone.Collection.prototype.__sort = Backbone.Collection.prototype.sort;
        Backbone.Collection.prototype.sort = function(options) {
            return sort.call(this, options), this.model.prototype instanceof Backbone.RelationalModel && this.trigger("relational:reset", this, options), 
            this;
        };
        var trigger = Backbone.Collection.prototype.__trigger = Backbone.Collection.prototype.trigger;
        Backbone.Collection.prototype.trigger = function(eventName) {
            if (!(this.model.prototype instanceof Backbone.RelationalModel)) return trigger.apply(this, arguments);
            if ("add" === eventName || "remove" === eventName || "reset" === eventName || "sort" === eventName) {
                var dit = this, args = arguments;
                _.isObject(args[3]) && (args = _.toArray(args), args[3] = _.clone(args[3])), Backbone.Relational.eventQueue.add(function() {
                    trigger.apply(dit, args);
                });
            } else trigger.apply(this, arguments);
            return this;
        }, Backbone.RelationalModel.extend = function() {
            var child = Backbone.Model.extend.apply(this, arguments);
            return child.setup(this), child;
        };
    }();
    var Marionette = function(global, Backbone, _) {
        "use strict";
        function throwError(message, name) {
            var error = new Error(message);
            throw error.name = name || "Error", error;
        }
        !function(Backbone, _) {
            var previousChildViewContainer = Backbone.ChildViewContainer;
            return Backbone.ChildViewContainer = function(Backbone, _) {
                var Container = function(views) {
                    this._views = {}, this._indexByModel = {}, this._indexByCustom = {}, this._updateLength(), 
                    _.each(views, this.add, this);
                };
                _.extend(Container.prototype, {
                    add: function(view, customIndex) {
                        var viewCid = view.cid;
                        return this._views[viewCid] = view, view.model && (this._indexByModel[view.model.cid] = viewCid), 
                        customIndex && (this._indexByCustom[customIndex] = viewCid), this._updateLength(), 
                        this;
                    },
                    findByModel: function(model) {
                        return this.findByModelCid(model.cid);
                    },
                    findByModelCid: function(modelCid) {
                        var viewCid = this._indexByModel[modelCid];
                        return this.findByCid(viewCid);
                    },
                    findByCustom: function(index) {
                        var viewCid = this._indexByCustom[index];
                        return this.findByCid(viewCid);
                    },
                    findByIndex: function(index) {
                        return _.values(this._views)[index];
                    },
                    findByCid: function(cid) {
                        return this._views[cid];
                    },
                    remove: function(view) {
                        var viewCid = view.cid;
                        return view.model && delete this._indexByModel[view.model.cid], _.any(this._indexByCustom, function(cid, key) {
                            return cid === viewCid ? (delete this._indexByCustom[key], !0) : void 0;
                        }, this), delete this._views[viewCid], this._updateLength(), this;
                    },
                    call: function(method) {
                        this.apply(method, _.tail(arguments));
                    },
                    apply: function(method, args) {
                        _.each(this._views, function(view) {
                            _.isFunction(view[method]) && view[method].apply(view, args || []);
                        });
                    },
                    _updateLength: function() {
                        this.length = _.size(this._views);
                    }
                });
                var methods = [ "forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck" ];
                return _.each(methods, function(method) {
                    Container.prototype[method] = function() {
                        var views = _.values(this._views), args = [ views ].concat(_.toArray(arguments));
                        return _[method].apply(_, args);
                    };
                }), Container;
            }(Backbone, _), Backbone.ChildViewContainer.VERSION = "0.1.4", Backbone.ChildViewContainer.noConflict = function() {
                return Backbone.ChildViewContainer = previousChildViewContainer, this;
            }, Backbone.ChildViewContainer;
        }(Backbone, _), function(Backbone, _) {
            var previousWreqr = Backbone.Wreqr, Wreqr = Backbone.Wreqr = {};
            return Backbone.Wreqr.VERSION = "1.3.1", Backbone.Wreqr.noConflict = function() {
                return Backbone.Wreqr = previousWreqr, this;
            }, Wreqr.Handlers = function(Backbone, _) {
                var Handlers = function(options) {
                    this.options = options, this._wreqrHandlers = {}, _.isFunction(this.initialize) && this.initialize(options);
                };
                return Handlers.extend = Backbone.Model.extend, _.extend(Handlers.prototype, Backbone.Events, {
                    setHandlers: function(handlers) {
                        _.each(handlers, function(handler, name) {
                            var context = null;
                            _.isObject(handler) && !_.isFunction(handler) && (context = handler.context, handler = handler.callback), 
                            this.setHandler(name, handler, context);
                        }, this);
                    },
                    setHandler: function(name, handler, context) {
                        var config = {
                            callback: handler,
                            context: context
                        };
                        this._wreqrHandlers[name] = config, this.trigger("handler:add", name, handler, context);
                    },
                    hasHandler: function(name) {
                        return !!this._wreqrHandlers[name];
                    },
                    getHandler: function(name) {
                        var config = this._wreqrHandlers[name];
                        if (config) return function() {
                            var args = Array.prototype.slice.apply(arguments);
                            return config.callback.apply(config.context, args);
                        };
                    },
                    removeHandler: function(name) {
                        delete this._wreqrHandlers[name];
                    },
                    removeAllHandlers: function() {
                        this._wreqrHandlers = {};
                    }
                }), Handlers;
            }(Backbone, _), Wreqr.CommandStorage = function() {
                var CommandStorage = function(options) {
                    this.options = options, this._commands = {}, _.isFunction(this.initialize) && this.initialize(options);
                };
                return _.extend(CommandStorage.prototype, Backbone.Events, {
                    getCommands: function(commandName) {
                        var commands = this._commands[commandName];
                        return commands || (commands = {
                            command: commandName,
                            instances: []
                        }, this._commands[commandName] = commands), commands;
                    },
                    addCommand: function(commandName, args) {
                        var command = this.getCommands(commandName);
                        command.instances.push(args);
                    },
                    clearCommands: function(commandName) {
                        var command = this.getCommands(commandName);
                        command.instances = [];
                    }
                }), CommandStorage;
            }(), Wreqr.Commands = function(Wreqr) {
                return Wreqr.Handlers.extend({
                    storageType: Wreqr.CommandStorage,
                    constructor: function(options) {
                        this.options = options || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this);
                        var args = Array.prototype.slice.call(arguments);
                        Wreqr.Handlers.prototype.constructor.apply(this, args);
                    },
                    execute: function(name, args) {
                        name = arguments[0], args = Array.prototype.slice.call(arguments, 1), this.hasHandler(name) ? this.getHandler(name).apply(this, args) : this.storage.addCommand(name, args);
                    },
                    _executeCommands: function(name, handler, context) {
                        var command = this.storage.getCommands(name);
                        _.each(command.instances, function(args) {
                            handler.apply(context, args);
                        }), this.storage.clearCommands(name);
                    },
                    _initializeStorage: function(options) {
                        var storage, StorageType = options.storageType || this.storageType;
                        storage = _.isFunction(StorageType) ? new StorageType() : StorageType, this.storage = storage;
                    }
                });
            }(Wreqr), Wreqr.RequestResponse = function(Wreqr) {
                return Wreqr.Handlers.extend({
                    request: function() {
                        var name = arguments[0], args = Array.prototype.slice.call(arguments, 1);
                        return this.hasHandler(name) ? this.getHandler(name).apply(this, args) : void 0;
                    }
                });
            }(Wreqr), Wreqr.EventAggregator = function(Backbone, _) {
                var EA = function() {};
                return EA.extend = Backbone.Model.extend, _.extend(EA.prototype, Backbone.Events), 
                EA;
            }(Backbone, _), Wreqr.Channel = function() {
                var Channel = function(channelName) {
                    this.vent = new Backbone.Wreqr.EventAggregator(), this.reqres = new Backbone.Wreqr.RequestResponse(), 
                    this.commands = new Backbone.Wreqr.Commands(), this.channelName = channelName;
                };
                return _.extend(Channel.prototype, {
                    reset: function() {
                        return this.vent.off(), this.vent.stopListening(), this.reqres.removeAllHandlers(), 
                        this.commands.removeAllHandlers(), this;
                    },
                    connectEvents: function(hash, context) {
                        return this._connect("vent", hash, context), this;
                    },
                    connectCommands: function(hash, context) {
                        return this._connect("commands", hash, context), this;
                    },
                    connectRequests: function(hash, context) {
                        return this._connect("reqres", hash, context), this;
                    },
                    _connect: function(type, hash, context) {
                        if (hash) {
                            context = context || this;
                            var method = "vent" === type ? "on" : "setHandler";
                            _.each(hash, function(fn, eventName) {
                                this[type][method](eventName, _.bind(fn, context));
                            }, this);
                        }
                    }
                }), Channel;
            }(Wreqr), Wreqr.radio = function(Wreqr) {
                var Radio = function() {
                    this._channels = {}, this.vent = {}, this.commands = {}, this.reqres = {}, this._proxyMethods();
                };
                _.extend(Radio.prototype, {
                    channel: function(channelName) {
                        if (!channelName) throw new Error("Channel must receive a name");
                        return this._getChannel(channelName);
                    },
                    _getChannel: function(channelName) {
                        var channel = this._channels[channelName];
                        return channel || (channel = new Wreqr.Channel(channelName), this._channels[channelName] = channel), 
                        channel;
                    },
                    _proxyMethods: function() {
                        _.each([ "vent", "commands", "reqres" ], function(system) {
                            _.each(messageSystems[system], function(method) {
                                this[system][method] = proxyMethod(this, system, method);
                            }, this);
                        }, this);
                    }
                });
                var messageSystems = {
                    vent: [ "on", "off", "trigger", "once", "stopListening", "listenTo", "listenToOnce" ],
                    commands: [ "execute", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers" ],
                    reqres: [ "request", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers" ]
                }, proxyMethod = function(radio, system, method) {
                    return function(channelName) {
                        var messageSystem = radio._getChannel(channelName)[system], args = Array.prototype.slice.call(arguments, 1);
                        return messageSystem[method].apply(messageSystem, args);
                    };
                };
                return new Radio();
            }(Wreqr), Backbone.Wreqr;
        }(Backbone, _);
        var Marionette = {};
        Backbone.Marionette = Marionette, Marionette.$ = Backbone.$;
        var slice = Array.prototype.slice;
        return Marionette.extend = Backbone.Model.extend, Marionette.getOption = function(target, optionName) {
            if (target && optionName) {
                var value;
                return value = target.options && optionName in target.options && void 0 !== target.options[optionName] ? target.options[optionName] : target[optionName];
            }
        }, Marionette.normalizeMethods = function(hash) {
            var method, normalizedHash = {};
            return _.each(hash, function(fn, name) {
                method = fn, _.isFunction(method) || (method = this[method]), method && (normalizedHash[name] = method);
            }, this), normalizedHash;
        }, Marionette.normalizeUIKeys = function(hash, ui) {
            return "undefined" != typeof hash ? (_.each(_.keys(hash), function(v) {
                var pattern = /@ui.[a-zA-Z_$0-9]*/g;
                v.match(pattern) && (hash[v.replace(pattern, function(r) {
                    return ui[r.slice(4)];
                })] = hash[v], delete hash[v]);
            }), hash) : void 0;
        }, Marionette.actAsCollection = function(object, listProperty) {
            var methods = [ "forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck" ];
            _.each(methods, function(method) {
                object[method] = function() {
                    var list = _.values(_.result(this, listProperty)), args = [ list ].concat(_.toArray(arguments));
                    return _[method].apply(_, args);
                };
            });
        }, Marionette.triggerMethod = function() {
            function getEventName(match, prefix, eventName) {
                return eventName.toUpperCase();
            }
            var splitter = /(^|:)(\w)/gi, triggerMethod = function(event) {
                var methodName = "on" + event.replace(splitter, getEventName), method = this[methodName];
                return _.isFunction(this.trigger) && this.trigger.apply(this, arguments), _.isFunction(method) ? method.apply(this, _.tail(arguments)) : void 0;
            };
            return triggerMethod;
        }(), Marionette.MonitorDOMRefresh = function(documentElement) {
            function handleShow(view) {
                view._isShown = !0, triggerDOMRefresh(view);
            }
            function handleRender(view) {
                view._isRendered = !0, triggerDOMRefresh(view);
            }
            function triggerDOMRefresh(view) {
                view._isShown && view._isRendered && isInDOM(view) && _.isFunction(view.triggerMethod) && view.triggerMethod("dom:refresh");
            }
            function isInDOM(view) {
                return documentElement.contains(view.el);
            }
            return function(view) {
                view.listenTo(view, "show", function() {
                    handleShow(view);
                }), view.listenTo(view, "render", function() {
                    handleRender(view);
                });
            };
        }(document.documentElement), function(Marionette) {
            function bindFromStrings(target, entity, evt, methods) {
                var methodNames = methods.split(/\s+/);
                _.each(methodNames, function(methodName) {
                    var method = target[methodName];
                    method || throwError("Method '" + methodName + "' was configured as an event handler, but does not exist."), 
                    target.listenTo(entity, evt, method);
                });
            }
            function bindToFunction(target, entity, evt, method) {
                target.listenTo(entity, evt, method);
            }
            function unbindFromStrings(target, entity, evt, methods) {
                var methodNames = methods.split(/\s+/);
                _.each(methodNames, function(methodName) {
                    var method = target[methodName];
                    target.stopListening(entity, evt, method);
                });
            }
            function unbindToFunction(target, entity, evt, method) {
                target.stopListening(entity, evt, method);
            }
            function iterateEvents(target, entity, bindings, functionCallback, stringCallback) {
                entity && bindings && (_.isFunction(bindings) && (bindings = bindings.call(target)), 
                _.each(bindings, function(methods, evt) {
                    _.isFunction(methods) ? functionCallback(target, entity, evt, methods) : stringCallback(target, entity, evt, methods);
                }));
            }
            Marionette.bindEntityEvents = function(target, entity, bindings) {
                iterateEvents(target, entity, bindings, bindToFunction, bindFromStrings);
            }, Marionette.unbindEntityEvents = function(target, entity, bindings) {
                iterateEvents(target, entity, bindings, unbindToFunction, unbindFromStrings);
            };
        }(Marionette), Marionette.Callbacks = function() {
            this._deferred = Marionette.$.Deferred(), this._callbacks = [];
        }, _.extend(Marionette.Callbacks.prototype, {
            add: function(callback, contextOverride) {
                this._callbacks.push({
                    cb: callback,
                    ctx: contextOverride
                }), this._deferred.done(function(context, options) {
                    contextOverride && (context = contextOverride), callback.call(context, options);
                });
            },
            run: function(options, context) {
                this._deferred.resolve(context, options);
            },
            reset: function() {
                var callbacks = this._callbacks;
                this._deferred = Marionette.$.Deferred(), this._callbacks = [], _.each(callbacks, function(cb) {
                    this.add(cb.cb, cb.ctx);
                }, this);
            }
        }), Marionette.Controller = function(options) {
            this.triggerMethod = Marionette.triggerMethod, this.options = options || {}, _.isFunction(this.initialize) && this.initialize(this.options);
        }, Marionette.Controller.extend = Marionette.extend, _.extend(Marionette.Controller.prototype, Backbone.Events, {
            close: function() {
                this.stopListening();
                var args = Array.prototype.slice.call(arguments);
                this.triggerMethod.apply(this, [ "close" ].concat(args)), this.off();
            }
        }), Marionette.Region = function(options) {
            if (this.options = options || {}, this.el = Marionette.getOption(this, "el"), this.el || throwError("An 'el' must be specified for a region.", "NoElError"), 
            this.initialize) {
                var args = Array.prototype.slice.apply(arguments);
                this.initialize.apply(this, args);
            }
        }, _.extend(Marionette.Region, {
            buildRegion: function(regionConfig, defaultRegionType) {
                var regionIsString = _.isString(regionConfig), regionSelectorIsString = _.isString(regionConfig.selector), regionTypeIsUndefined = _.isUndefined(regionConfig.regionType), regionIsType = _.isFunction(regionConfig);
                regionIsType || regionIsString || regionSelectorIsString || throwError("Region must be specified as a Region type, a selector string or an object with selector property");
                var selector, RegionType;
                regionIsString && (selector = regionConfig), regionConfig.selector && (selector = regionConfig.selector, 
                delete regionConfig.selector), regionIsType && (RegionType = regionConfig), !regionIsType && regionTypeIsUndefined && (RegionType = defaultRegionType), 
                regionConfig.regionType && (RegionType = regionConfig.regionType, delete regionConfig.regionType), 
                (regionIsString || regionIsType) && (regionConfig = {}), regionConfig.el = selector;
                var region = new RegionType(regionConfig);
                return regionConfig.parentEl && (region.getEl = function(selector) {
                    var parentEl = regionConfig.parentEl;
                    return _.isFunction(parentEl) && (parentEl = parentEl()), parentEl.find(selector);
                }), region;
            }
        }), _.extend(Marionette.Region.prototype, Backbone.Events, {
            show: function(view, options) {
                this.ensureEl();
                var showOptions = options || {}, isViewClosed = view.isClosed || _.isUndefined(view.$el), isDifferentView = view !== this.currentView, preventClose = !!showOptions.preventClose, _shouldCloseView = !preventClose && isDifferentView;
                return _shouldCloseView && this.close(), view.render(), Marionette.triggerMethod.call(this, "before:show", view), 
                _.isFunction(view.triggerMethod) ? view.triggerMethod("before:show") : Marionette.triggerMethod.call(view, "before:show"), 
                (isDifferentView || isViewClosed) && this.open(view), this.currentView = view, Marionette.triggerMethod.call(this, "show", view), 
                _.isFunction(view.triggerMethod) ? view.triggerMethod("show") : Marionette.triggerMethod.call(view, "show"), 
                this;
            },
            ensureEl: function() {
                this.$el && 0 !== this.$el.length || (this.$el = this.getEl(this.el));
            },
            getEl: function(selector) {
                return Marionette.$(selector);
            },
            open: function(view) {
                this.$el.empty().append(view.el);
            },
            close: function() {
                var view = this.currentView;
                view && !view.isClosed && (view.close ? view.close() : view.remove && view.remove(), 
                Marionette.triggerMethod.call(this, "close", view), delete this.currentView);
            },
            attachView: function(view) {
                this.currentView = view;
            },
            reset: function() {
                this.close(), delete this.$el;
            }
        }), Marionette.Region.extend = Marionette.extend, Marionette.RegionManager = function(Marionette) {
            var RegionManager = Marionette.Controller.extend({
                constructor: function(options) {
                    this._regions = {}, Marionette.Controller.prototype.constructor.call(this, options);
                },
                addRegions: function(regionDefinitions, defaults) {
                    var regions = {};
                    return _.each(regionDefinitions, function(definition, name) {
                        _.isString(definition) && (definition = {
                            selector: definition
                        }), definition.selector && (definition = _.defaults({}, definition, defaults));
                        var region = this.addRegion(name, definition);
                        regions[name] = region;
                    }, this), regions;
                },
                addRegion: function(name, definition) {
                    var region, isObject = _.isObject(definition), isString = _.isString(definition), hasSelector = !!definition.selector;
                    return region = isString || isObject && hasSelector ? Marionette.Region.buildRegion(definition, Marionette.Region) : _.isFunction(definition) ? Marionette.Region.buildRegion(definition, Marionette.Region) : definition, 
                    this._store(name, region), this.triggerMethod("region:add", name, region), region;
                },
                get: function(name) {
                    return this._regions[name];
                },
                removeRegion: function(name) {
                    var region = this._regions[name];
                    this._remove(name, region);
                },
                removeRegions: function() {
                    _.each(this._regions, function(region, name) {
                        this._remove(name, region);
                    }, this);
                },
                closeRegions: function() {
                    _.each(this._regions, function(region) {
                        region.close();
                    }, this);
                },
                close: function() {
                    this.removeRegions(), Marionette.Controller.prototype.close.apply(this, arguments);
                },
                _store: function(name, region) {
                    this._regions[name] = region, this._setLength();
                },
                _remove: function(name, region) {
                    region.close(), region.stopListening(), delete this._regions[name], this._setLength(), 
                    this.triggerMethod("region:remove", name, region);
                },
                _setLength: function() {
                    this.length = _.size(this._regions);
                }
            });
            return Marionette.actAsCollection(RegionManager.prototype, "_regions"), RegionManager;
        }(Marionette), Marionette.TemplateCache = function(templateId) {
            this.templateId = templateId;
        }, _.extend(Marionette.TemplateCache, {
            templateCaches: {},
            get: function(templateId) {
                var cachedTemplate = this.templateCaches[templateId];
                return cachedTemplate || (cachedTemplate = new Marionette.TemplateCache(templateId), 
                this.templateCaches[templateId] = cachedTemplate), cachedTemplate.load();
            },
            clear: function() {
                var i, args = slice.call(arguments), length = args.length;
                if (length > 0) for (i = 0; length > i; i++) delete this.templateCaches[args[i]]; else this.templateCaches = {};
            }
        }), _.extend(Marionette.TemplateCache.prototype, {
            load: function() {
                if (this.compiledTemplate) return this.compiledTemplate;
                var template = this.loadTemplate(this.templateId);
                return this.compiledTemplate = this.compileTemplate(template), this.compiledTemplate;
            },
            loadTemplate: function(templateId) {
                var template = Marionette.$(templateId).html();
                return template && 0 !== template.length || throwError("Could not find template: '" + templateId + "'", "NoTemplateError"), 
                template;
            },
            compileTemplate: function(rawTemplate) {
                return _.template(rawTemplate);
            }
        }), Marionette.Renderer = {
            render: function(template, data) {
                template || throwError("Cannot render the template since it's false, null or undefined.", "TemplateNotFoundError");
                var templateFunc;
                return templateFunc = "function" == typeof template ? template : Marionette.TemplateCache.get(template), 
                templateFunc(data);
            }
        }, Marionette.View = Backbone.View.extend({
            constructor: function(options) {
                _.bindAll(this, "render"), this.options = _.extend({}, _.result(this, "options"), _.isFunction(options) ? options.call(this) : options), 
                this.events = this.normalizeUIKeys(_.result(this, "events")), _.isObject(this.behaviors) && new Marionette.Behaviors(this), 
                Backbone.View.prototype.constructor.apply(this, arguments), Marionette.MonitorDOMRefresh(this), 
                this.listenTo(this, "show", this.onShowCalled);
            },
            triggerMethod: Marionette.triggerMethod,
            normalizeMethods: Marionette.normalizeMethods,
            getTemplate: function() {
                return Marionette.getOption(this, "template");
            },
            mixinTemplateHelpers: function(target) {
                target = target || {};
                var templateHelpers = Marionette.getOption(this, "templateHelpers");
                return _.isFunction(templateHelpers) && (templateHelpers = templateHelpers.call(this)), 
                _.extend(target, templateHelpers);
            },
            normalizeUIKeys: function(hash) {
                var ui = _.result(this, "ui");
                return Marionette.normalizeUIKeys(hash, ui);
            },
            configureTriggers: function() {
                if (this.triggers) {
                    var triggerEvents = {}, triggers = this.normalizeUIKeys(_.result(this, "triggers"));
                    return _.each(triggers, function(value, key) {
                        var hasOptions = _.isObject(value), eventName = hasOptions ? value.event : value;
                        triggerEvents[key] = function(e) {
                            if (e) {
                                var prevent = e.preventDefault, stop = e.stopPropagation, shouldPrevent = hasOptions ? value.preventDefault : prevent, shouldStop = hasOptions ? value.stopPropagation : stop;
                                shouldPrevent && prevent && prevent.apply(e), shouldStop && stop && stop.apply(e);
                            }
                            var args = {
                                view: this,
                                model: this.model,
                                collection: this.collection
                            };
                            this.triggerMethod(eventName, args);
                        };
                    }, this), triggerEvents;
                }
            },
            delegateEvents: function(events) {
                this._delegateDOMEvents(events), Marionette.bindEntityEvents(this, this.model, Marionette.getOption(this, "modelEvents")), 
                Marionette.bindEntityEvents(this, this.collection, Marionette.getOption(this, "collectionEvents"));
            },
            _delegateDOMEvents: function(events) {
                events = events || this.events, _.isFunction(events) && (events = events.call(this));
                var combinedEvents = {}, behaviorEvents = _.result(this, "behaviorEvents") || {}, triggers = this.configureTriggers();
                _.extend(combinedEvents, behaviorEvents, events, triggers), Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
            },
            undelegateEvents: function() {
                var args = Array.prototype.slice.call(arguments);
                Backbone.View.prototype.undelegateEvents.apply(this, args), Marionette.unbindEntityEvents(this, this.model, Marionette.getOption(this, "modelEvents")), 
                Marionette.unbindEntityEvents(this, this.collection, Marionette.getOption(this, "collectionEvents"));
            },
            onShowCalled: function() {},
            close: function() {
                if (!this.isClosed) {
                    var args = Array.prototype.slice.call(arguments), shouldClose = this.triggerMethod.apply(this, [ "before:close" ].concat(args));
                    shouldClose !== !1 && (this.isClosed = !0, this.triggerMethod.apply(this, [ "close" ].concat(args)), 
                    this.unbindUIElements(), this.remove());
                }
            },
            bindUIElements: function() {
                if (this.ui) {
                    this._uiBindings || (this._uiBindings = this.ui);
                    var bindings = _.result(this, "_uiBindings");
                    this.ui = {}, _.each(_.keys(bindings), function(key) {
                        var selector = bindings[key];
                        this.ui[key] = this.$(selector);
                    }, this);
                }
            },
            unbindUIElements: function() {
                this.ui && this._uiBindings && (_.each(this.ui, function($el, name) {
                    delete this.ui[name];
                }, this), this.ui = this._uiBindings, delete this._uiBindings);
            }
        }), Marionette.ItemView = Marionette.View.extend({
            constructor: function() {
                Marionette.View.prototype.constructor.apply(this, arguments);
            },
            serializeData: function() {
                var data = {};
                return this.model ? data = this.model.toJSON() : this.collection && (data = {
                    items: this.collection.toJSON()
                }), data;
            },
            render: function() {
                this.isClosed = !1, this.triggerMethod("before:render", this), this.triggerMethod("item:before:render", this);
                var data = this.serializeData();
                data = this.mixinTemplateHelpers(data);
                var template = this.getTemplate(), html = Marionette.Renderer.render(template, data);
                return this.$el.html(html), this.bindUIElements(), this.triggerMethod("render", this), 
                this.triggerMethod("item:rendered", this), this;
            },
            close: function() {
                this.isClosed || (this.triggerMethod("item:before:close"), Marionette.View.prototype.close.apply(this, arguments), 
                this.triggerMethod("item:closed"));
            }
        }), Marionette.CollectionView = Marionette.View.extend({
            itemViewEventPrefix: "itemview",
            constructor: function() {
                this._initChildViewStorage(), Marionette.View.prototype.constructor.apply(this, arguments), 
                this._initialEvents(), this.initRenderBuffer();
            },
            initRenderBuffer: function() {
                this.elBuffer = document.createDocumentFragment(), this._bufferedChildren = [];
            },
            startBuffering: function() {
                this.initRenderBuffer(), this.isBuffering = !0;
            },
            endBuffering: function() {
                this.isBuffering = !1, this.appendBuffer(this, this.elBuffer), this._triggerShowBufferedChildren(), 
                this.initRenderBuffer();
            },
            _triggerShowBufferedChildren: function() {
                this._isShown && (_.each(this._bufferedChildren, function(child) {
                    Marionette.triggerMethod.call(child, "show");
                }), this._bufferedChildren = []);
            },
            _initialEvents: function() {
                this.collection && (this.listenTo(this.collection, "add", this.addChildView), this.listenTo(this.collection, "remove", this.removeItemView), 
                this.listenTo(this.collection, "reset", this.render));
            },
            addChildView: function(item) {
                this.closeEmptyView();
                var ItemView = this.getItemView(item), index = this.collection.indexOf(item);
                this.addItemView(item, ItemView, index);
            },
            onShowCalled: function() {
                this.children.each(function(child) {
                    Marionette.triggerMethod.call(child, "show");
                });
            },
            triggerBeforeRender: function() {
                this.triggerMethod("before:render", this), this.triggerMethod("collection:before:render", this);
            },
            triggerRendered: function() {
                this.triggerMethod("render", this), this.triggerMethod("collection:rendered", this);
            },
            render: function() {
                return this.isClosed = !1, this.triggerBeforeRender(), this._renderChildren(), this.triggerRendered(), 
                this;
            },
            _renderChildren: function() {
                this.startBuffering(), this.closeEmptyView(), this.closeChildren(), this.isEmpty(this.collection) ? this.showEmptyView() : this.showCollection(), 
                this.endBuffering();
            },
            showCollection: function() {
                var ItemView;
                this.collection.each(function(item, index) {
                    ItemView = this.getItemView(item), this.addItemView(item, ItemView, index);
                }, this);
            },
            showEmptyView: function() {
                var EmptyView = this.getEmptyView();
                if (EmptyView && !this._showingEmptyView) {
                    this._showingEmptyView = !0;
                    var model = new Backbone.Model();
                    this.addItemView(model, EmptyView, 0);
                }
            },
            closeEmptyView: function() {
                this._showingEmptyView && (this.closeChildren(), delete this._showingEmptyView);
            },
            getEmptyView: function() {
                return Marionette.getOption(this, "emptyView");
            },
            getItemView: function() {
                var itemView = Marionette.getOption(this, "itemView");
                return itemView || throwError("An `itemView` must be specified", "NoItemViewError"), 
                itemView;
            },
            addItemView: function(item, ItemView, index) {
                var itemViewOptions = Marionette.getOption(this, "itemViewOptions");
                _.isFunction(itemViewOptions) && (itemViewOptions = itemViewOptions.call(this, item, index));
                var view = this.buildItemView(item, ItemView, itemViewOptions);
                return this.addChildViewEventForwarding(view), this.triggerMethod("before:item:added", view), 
                this.children.add(view), this.renderItemView(view, index), this._isShown && !this.isBuffering && Marionette.triggerMethod.call(view, "show"), 
                this.triggerMethod("after:item:added", view), view;
            },
            addChildViewEventForwarding: function(view) {
                var prefix = Marionette.getOption(this, "itemViewEventPrefix");
                this.listenTo(view, "all", function() {
                    var args = slice.call(arguments), rootEvent = args[0], itemEvents = this.normalizeMethods(this.getItemEvents());
                    args[0] = prefix + ":" + rootEvent, args.splice(1, 0, view), "undefined" != typeof itemEvents && _.isFunction(itemEvents[rootEvent]) && itemEvents[rootEvent].apply(this, args), 
                    Marionette.triggerMethod.apply(this, args);
                }, this);
            },
            getItemEvents: function() {
                return _.isFunction(this.itemEvents) ? this.itemEvents.call(this) : this.itemEvents;
            },
            renderItemView: function(view, index) {
                view.render(), this.appendHtml(this, view, index);
            },
            buildItemView: function(item, ItemViewType, itemViewOptions) {
                var options = _.extend({
                    model: item
                }, itemViewOptions);
                return new ItemViewType(options);
            },
            removeItemView: function(item) {
                var view = this.children.findByModel(item);
                this.removeChildView(view), this.checkEmpty();
            },
            removeChildView: function(view) {
                view && (view.close ? view.close() : view.remove && view.remove(), this.stopListening(view), 
                this.children.remove(view)), this.triggerMethod("item:removed", view);
            },
            isEmpty: function() {
                return !this.collection || 0 === this.collection.length;
            },
            checkEmpty: function() {
                this.isEmpty(this.collection) && this.showEmptyView();
            },
            appendBuffer: function(collectionView, buffer) {
                collectionView.$el.append(buffer);
            },
            appendHtml: function(collectionView, itemView) {
                collectionView.isBuffering ? (collectionView.elBuffer.appendChild(itemView.el), 
                collectionView._bufferedChildren.push(itemView)) : collectionView.$el.append(itemView.el);
            },
            _initChildViewStorage: function() {
                this.children = new Backbone.ChildViewContainer();
            },
            close: function() {
                this.isClosed || (this.triggerMethod("collection:before:close"), this.closeChildren(), 
                this.triggerMethod("collection:closed"), Marionette.View.prototype.close.apply(this, arguments));
            },
            closeChildren: function() {
                this.children.each(function(child) {
                    this.removeChildView(child);
                }, this), this.checkEmpty();
            }
        }), Marionette.CompositeView = Marionette.CollectionView.extend({
            constructor: function() {
                Marionette.CollectionView.prototype.constructor.apply(this, arguments);
            },
            _initialEvents: function() {
                this.once("render", function() {
                    this.collection && (this.listenTo(this.collection, "add", this.addChildView), this.listenTo(this.collection, "remove", this.removeItemView), 
                    this.listenTo(this.collection, "reset", this._renderChildren));
                });
            },
            getItemView: function() {
                var itemView = Marionette.getOption(this, "itemView") || this.constructor;
                return itemView || throwError("An `itemView` must be specified", "NoItemViewError"), 
                itemView;
            },
            serializeData: function() {
                var data = {};
                return this.model && (data = this.model.toJSON()), data;
            },
            render: function() {
                this.isRendered = !0, this.isClosed = !1, this.resetItemViewContainer(), this.triggerBeforeRender();
                var html = this.renderModel();
                return this.$el.html(html), this.bindUIElements(), this.triggerMethod("composite:model:rendered"), 
                this._renderChildren(), this.triggerMethod("composite:rendered"), this.triggerRendered(), 
                this;
            },
            _renderChildren: function() {
                this.isRendered && (this.triggerMethod("composite:collection:before:render"), Marionette.CollectionView.prototype._renderChildren.call(this), 
                this.triggerMethod("composite:collection:rendered"));
            },
            renderModel: function() {
                var data = {};
                data = this.serializeData(), data = this.mixinTemplateHelpers(data);
                var template = this.getTemplate();
                return Marionette.Renderer.render(template, data);
            },
            appendBuffer: function(compositeView, buffer) {
                var $container = this.getItemViewContainer(compositeView);
                $container.append(buffer);
            },
            appendHtml: function(compositeView, itemView) {
                if (compositeView.isBuffering) compositeView.elBuffer.appendChild(itemView.el), 
                compositeView._bufferedChildren.push(itemView); else {
                    var $container = this.getItemViewContainer(compositeView);
                    $container.append(itemView.el);
                }
            },
            getItemViewContainer: function(containerView) {
                if ("$itemViewContainer" in containerView) return containerView.$itemViewContainer;
                var container, itemViewContainer = Marionette.getOption(containerView, "itemViewContainer");
                if (itemViewContainer) {
                    var selector = _.isFunction(itemViewContainer) ? itemViewContainer.call(containerView) : itemViewContainer;
                    container = "@" === selector.charAt(0) && containerView.ui ? containerView.ui[selector.substr(4)] : containerView.$(selector), 
                    container.length <= 0 && throwError("The specified `itemViewContainer` was not found: " + containerView.itemViewContainer, "ItemViewContainerMissingError");
                } else container = containerView.$el;
                return containerView.$itemViewContainer = container, container;
            },
            resetItemViewContainer: function() {
                this.$itemViewContainer && delete this.$itemViewContainer;
            }
        }), Marionette.Layout = Marionette.ItemView.extend({
            regionType: Marionette.Region,
            constructor: function(options) {
                options = options || {}, this._firstRender = !0, this._initializeRegions(options), 
                Marionette.ItemView.prototype.constructor.call(this, options);
            },
            render: function() {
                return this.isClosed && this._initializeRegions(), this._firstRender ? this._firstRender = !1 : this.isClosed || this._reInitializeRegions(), 
                Marionette.ItemView.prototype.render.apply(this, arguments);
            },
            close: function() {
                this.isClosed || (this.regionManager.close(), Marionette.ItemView.prototype.close.apply(this, arguments));
            },
            addRegion: function(name, definition) {
                var regions = {};
                return regions[name] = definition, this._buildRegions(regions)[name];
            },
            addRegions: function(regions) {
                return this.regions = _.extend({}, this.regions, regions), this._buildRegions(regions);
            },
            removeRegion: function(name) {
                return delete this.regions[name], this.regionManager.removeRegion(name);
            },
            getRegion: function(region) {
                return this.regionManager.get(region);
            },
            _buildRegions: function(regions) {
                var that = this, defaults = {
                    regionType: Marionette.getOption(this, "regionType"),
                    parentEl: function() {
                        return that.$el;
                    }
                };
                return this.regionManager.addRegions(regions, defaults);
            },
            _initializeRegions: function(options) {
                var regions;
                this._initRegionManager(), regions = _.isFunction(this.regions) ? this.regions(options) : this.regions || {}, 
                this.addRegions(regions);
            },
            _reInitializeRegions: function() {
                this.regionManager.closeRegions(), this.regionManager.each(function(region) {
                    region.reset();
                });
            },
            _initRegionManager: function() {
                this.regionManager = new Marionette.RegionManager(), this.listenTo(this.regionManager, "region:add", function(name, region) {
                    this[name] = region, this.trigger("region:add", name, region);
                }), this.listenTo(this.regionManager, "region:remove", function(name, region) {
                    delete this[name], this.trigger("region:remove", name, region);
                });
            }
        }), Marionette.Behavior = function(_, Backbone) {
            function Behavior(options, view) {
                this.view = view, this.defaults = _.result(this, "defaults") || {}, this.options = _.extend({}, this.defaults, options), 
                this.$ = function() {
                    return this.view.$.apply(this.view, arguments);
                }, this.initialize.apply(this, arguments);
            }
            return _.extend(Behavior.prototype, Backbone.Events, {
                initialize: function() {},
                close: function() {
                    this.stopListening();
                },
                triggerMethod: Marionette.triggerMethod
            }), Behavior.extend = Marionette.extend, Behavior;
        }(_, Backbone), Marionette.Behaviors = function(Marionette, _) {
            function Behaviors(view) {
                this.behaviors = Behaviors.parseBehaviors(view, _.result(view, "behaviors")), Behaviors.wrap(view, this.behaviors, [ "bindUIElements", "unbindUIElements", "delegateEvents", "undelegateEvents", "behaviorEvents", "triggerMethod", "setElement", "close" ]);
            }
            var methods = {
                setElement: function(setElement, behaviors) {
                    setElement.apply(this, _.tail(arguments, 2)), _.each(behaviors, function(b) {
                        b.$el = this.$el;
                    }, this);
                },
                close: function(close, behaviors) {
                    var args = _.tail(arguments, 2);
                    close.apply(this, args), _.invoke(behaviors, "close", args);
                },
                bindUIElements: function(bindUIElements, behaviors) {
                    bindUIElements.apply(this), _.invoke(behaviors, bindUIElements);
                },
                unbindUIElements: function(unbindUIElements, behaviors) {
                    unbindUIElements.apply(this), _.invoke(behaviors, unbindUIElements);
                },
                triggerMethod: function(triggerMethod, behaviors) {
                    var args = _.tail(arguments, 2);
                    triggerMethod.apply(this, args), _.each(behaviors, function(b) {
                        triggerMethod.apply(b, args);
                    });
                },
                delegateEvents: function(delegateEvents, behaviors) {
                    var args = _.tail(arguments, 2);
                    delegateEvents.apply(this, args), _.each(behaviors, function(b) {
                        Marionette.bindEntityEvents(b, this.model, Marionette.getOption(b, "modelEvents")), 
                        Marionette.bindEntityEvents(b, this.collection, Marionette.getOption(b, "collectionEvents"));
                    }, this);
                },
                undelegateEvents: function(undelegateEvents, behaviors) {
                    var args = _.tail(arguments, 2);
                    undelegateEvents.apply(this, args), _.each(behaviors, function(b) {
                        Marionette.unbindEntityEvents(b, this.model, Marionette.getOption(b, "modelEvents")), 
                        Marionette.unbindEntityEvents(b, this.collection, Marionette.getOption(b, "collectionEvents"));
                    }, this);
                },
                behaviorEvents: function(behaviorEvents, behaviors) {
                    var _behaviorsEvents = {}, viewUI = _.result(this, "ui");
                    return _.each(behaviors, function(b, i) {
                        var _events = {}, behaviorEvents = _.result(b, "events") || {}, behaviorUI = _.result(b, "ui"), ui = _.extend({}, viewUI, behaviorUI);
                        behaviorEvents = Marionette.normalizeUIKeys(behaviorEvents, ui), _.each(_.keys(behaviorEvents), function(key) {
                            var whitespace = new Array(i + 2).join(" "), eventKey = key + whitespace, handler = _.isFunction(behaviorEvents[key]) ? behaviorEvents[key] : b[behaviorEvents[key]];
                            _events[eventKey] = _.bind(handler, b);
                        }), _behaviorsEvents = _.extend(_behaviorsEvents, _events);
                    }), _behaviorsEvents;
                }
            };
            return _.extend(Behaviors, {
                behaviorsLookup: function() {
                    throw new Error("You must define where your behaviors are stored. See https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.behaviors.md#behaviorslookup");
                },
                getBehaviorClass: function(options, key) {
                    return options.behaviorClass ? options.behaviorClass : _.isFunction(Behaviors.behaviorsLookup) ? Behaviors.behaviorsLookup.apply(this, arguments)[key] : Behaviors.behaviorsLookup[key];
                },
                parseBehaviors: function(view, behaviors) {
                    return _.map(behaviors, function(options, key) {
                        var BehaviorClass = Behaviors.getBehaviorClass(options, key);
                        return new BehaviorClass(options, view);
                    });
                },
                wrap: function(view, behaviors, methodNames) {
                    _.each(methodNames, function(methodName) {
                        view[methodName] = _.partial(methods[methodName], view[methodName], behaviors);
                    });
                }
            }), Behaviors;
        }(Marionette, _), Marionette.AppRouter = Backbone.Router.extend({
            constructor: function(options) {
                Backbone.Router.prototype.constructor.apply(this, arguments), this.options = options || {};
                var appRoutes = Marionette.getOption(this, "appRoutes"), controller = this._getController();
                this.processAppRoutes(controller, appRoutes), this.on("route", this._processOnRoute, this);
            },
            appRoute: function(route, methodName) {
                var controller = this._getController();
                this._addAppRoute(controller, route, methodName);
            },
            _processOnRoute: function(routeName, routeArgs) {
                var routePath = _.invert(this.appRoutes)[routeName];
                _.isFunction(this.onRoute) && this.onRoute(routeName, routePath, routeArgs);
            },
            processAppRoutes: function(controller, appRoutes) {
                if (appRoutes) {
                    var routeNames = _.keys(appRoutes).reverse();
                    _.each(routeNames, function(route) {
                        this._addAppRoute(controller, route, appRoutes[route]);
                    }, this);
                }
            },
            _getController: function() {
                return Marionette.getOption(this, "controller");
            },
            _addAppRoute: function(controller, route, methodName) {
                var method = controller[methodName];
                method || throwError("Method '" + methodName + "' was not found on the controller"), 
                this.route(route, methodName, _.bind(method, controller));
            }
        }), Marionette.Application = function(options) {
            this._initRegionManager(), this._initCallbacks = new Marionette.Callbacks(), this.vent = new Backbone.Wreqr.EventAggregator(), 
            this.commands = new Backbone.Wreqr.Commands(), this.reqres = new Backbone.Wreqr.RequestResponse(), 
            this.submodules = {}, _.extend(this, options), this.triggerMethod = Marionette.triggerMethod;
        }, _.extend(Marionette.Application.prototype, Backbone.Events, {
            execute: function() {
                this.commands.execute.apply(this.commands, arguments);
            },
            request: function() {
                return this.reqres.request.apply(this.reqres, arguments);
            },
            addInitializer: function(initializer) {
                this._initCallbacks.add(initializer);
            },
            start: function(options) {
                this.triggerMethod("initialize:before", options), this._initCallbacks.run(options, this), 
                this.triggerMethod("initialize:after", options), this.triggerMethod("start", options);
            },
            addRegions: function(regions) {
                return this._regionManager.addRegions(regions);
            },
            closeRegions: function() {
                this._regionManager.closeRegions();
            },
            removeRegion: function(region) {
                this._regionManager.removeRegion(region);
            },
            getRegion: function(region) {
                return this._regionManager.get(region);
            },
            module: function(moduleNames, moduleDefinition) {
                var ModuleClass = Marionette.Module.getClass(moduleDefinition), args = slice.call(arguments);
                return args.unshift(this), ModuleClass.create.apply(ModuleClass, args);
            },
            _initRegionManager: function() {
                this._regionManager = new Marionette.RegionManager(), this.listenTo(this._regionManager, "region:add", function(name, region) {
                    this[name] = region;
                }), this.listenTo(this._regionManager, "region:remove", function(name) {
                    delete this[name];
                });
            }
        }), Marionette.Application.extend = Marionette.extend, Marionette.Module = function(moduleName, app, options) {
            this.moduleName = moduleName, this.options = _.extend({}, this.options, options), 
            this.initialize = options.initialize || this.initialize, this.submodules = {}, this._setupInitializersAndFinalizers(), 
            this.app = app, this.startWithParent = !0, this.triggerMethod = Marionette.triggerMethod, 
            _.isFunction(this.initialize) && this.initialize(this.options, moduleName, app);
        }, Marionette.Module.extend = Marionette.extend, _.extend(Marionette.Module.prototype, Backbone.Events, {
            initialize: function() {},
            addInitializer: function(callback) {
                this._initializerCallbacks.add(callback);
            },
            addFinalizer: function(callback) {
                this._finalizerCallbacks.add(callback);
            },
            start: function(options) {
                this._isInitialized || (_.each(this.submodules, function(mod) {
                    mod.startWithParent && mod.start(options);
                }), this.triggerMethod("before:start", options), this._initializerCallbacks.run(options, this), 
                this._isInitialized = !0, this.triggerMethod("start", options));
            },
            stop: function() {
                this._isInitialized && (this._isInitialized = !1, Marionette.triggerMethod.call(this, "before:stop"), 
                _.each(this.submodules, function(mod) {
                    mod.stop();
                }), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), 
                this._finalizerCallbacks.reset(), Marionette.triggerMethod.call(this, "stop"));
            },
            addDefinition: function(moduleDefinition, customArgs) {
                this._runModuleDefinition(moduleDefinition, customArgs);
            },
            _runModuleDefinition: function(definition, customArgs) {
                if (definition) {
                    var args = _.flatten([ this, this.app, Backbone, Marionette, Marionette.$, _, customArgs ]);
                    definition.apply(this, args);
                }
            },
            _setupInitializersAndFinalizers: function() {
                this._initializerCallbacks = new Marionette.Callbacks(), this._finalizerCallbacks = new Marionette.Callbacks();
            }
        }), _.extend(Marionette.Module, {
            create: function(app, moduleNames, moduleDefinition) {
                var module = app, customArgs = slice.call(arguments);
                customArgs.splice(0, 3), moduleNames = moduleNames.split(".");
                var length = moduleNames.length, moduleDefinitions = [];
                return moduleDefinitions[length - 1] = moduleDefinition, _.each(moduleNames, function(moduleName, i) {
                    var parentModule = module;
                    module = this._getModule(parentModule, moduleName, app, moduleDefinition), this._addModuleDefinition(parentModule, module, moduleDefinitions[i], customArgs);
                }, this), module;
            },
            _getModule: function(parentModule, moduleName, app, def) {
                var options = _.extend({}, def), ModuleClass = this.getClass(def), module = parentModule[moduleName];
                return module || (module = new ModuleClass(moduleName, app, options), parentModule[moduleName] = module, 
                parentModule.submodules[moduleName] = module), module;
            },
            getClass: function(moduleDefinition) {
                var ModuleClass = Marionette.Module;
                return moduleDefinition ? moduleDefinition.prototype instanceof ModuleClass ? moduleDefinition : moduleDefinition.moduleClass || ModuleClass : ModuleClass;
            },
            _addModuleDefinition: function(parentModule, module, def, args) {
                var fn = this._getDefine(def), startWithParent = this._getStartWithParent(def, module);
                fn && module.addDefinition(fn, args), this._addStartWithParent(parentModule, module, startWithParent);
            },
            _getStartWithParent: function(def, module) {
                var swp;
                return _.isFunction(def) && def.prototype instanceof Marionette.Module ? (swp = module.constructor.prototype.startWithParent, 
                _.isUndefined(swp) ? !0 : swp) : _.isObject(def) ? (swp = def.startWithParent, _.isUndefined(swp) ? !0 : swp) : !0;
            },
            _getDefine: function(def) {
                return !_.isFunction(def) || def.prototype instanceof Marionette.Module ? _.isObject(def) ? def.define : null : def;
            },
            _addStartWithParent: function(parentModule, module, startWithParent) {
                module.startWithParent = module.startWithParent && startWithParent, module.startWithParent && !module.startWithParentIsConfigured && (module.startWithParentIsConfigured = !0, 
                parentModule.addInitializer(function(options) {
                    module.startWithParent && module.start(options);
                }));
            }
        }), Marionette;
    }(this, Backbone, _);
    window.$pureChatJquery && (Backbone.$ = window.$pureChatJquery, Marionette.$ = window.$pureChatJquery), 
    purechatApp = new Backbone.Marionette.Application(), purechatApp.start(), Backbone.Relational.showWarnings = !1, 
    purechatApp.module("Constants", function(Constants) {
        Constants.WidgetType = {
            Tab: 1,
            Button: 2,
            Image: 3,
            ImageTab: 4
        }, Constants.WidgetStates = {
            Initializing: "PCStateInitializing",
            Inactive: "PCStateInactive",
            Activating: "PCStateActivating",
            Chatting: "PCStateChatting",
            Closed: "PCStateClosed",
            Unavailable: "PCStateUnavailable"
        };
    }), purechatApp.module("Logging", function(Logging, app, Backbone, Marionette, $, _) {
        var Level = function(level, name) {
            this.level = level, this.name = name;
        };
        Level.prototype = {
            toString: function() {
                return this.name;
            },
            equals: function(level) {
                return this.level == level.level;
            },
            isGreaterOrEqual: function(level) {
                return this.level >= level.level;
            }
        }, Level.ALL = new Level(Number.MIN_VALUE, "ALL"), Level.TRACE = new Level(1e4, "TRACE"), 
        Level.DEBUG = new Level(2e4, "DEBUG"), Level.INFO = new Level(3e4, "INFO"), Level.WARN = new Level(4e4, "WARN"), 
        Level.ERROR = new Level(5e4, "ERROR"), Level.FATAL = new Level(6e4, "FATAL"), Level.OFF = new Level(Number.MAX_VALUE, "OFF");
        var LoggingController = Marionette.Controller.extend({
            initialize: function() {},
            log: function(level, message) {
                try {
                    app.pureServerUrl && $.ajax({
                        url: app.pureServerUrl + "/AjaxLogger/Log",
                        dataType: "jsonp",
                        data: {
                            level: level,
                            message: message
                        },
                        timeout: 2e4,
                        success: function() {},
                        error: function() {}
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        });
        Logging.addInitializer(function() {
            Logging.logger = new LoggingController(), Marionette.Controller.prototype.log = _.bind(Logging.logger.log, Logging.logger);
        }), Logging.addFinalizer(function() {
            Logging.log = null;
        });
    }), purechatApp.module("Utils", function(Utils, app, Backbone, Marionette, $) {
        $.throttle = function(delay, no_trailing, callback, debounce_mode) {
            function wrapper() {
                function exec() {
                    last_exec = +new Date(), callback.apply(that, args);
                }
                function clear() {
                    timeout_id = void 0;
                }
                var that = this, elapsed = +new Date() - last_exec, args = arguments;
                debounce_mode && !timeout_id && exec(), timeout_id && clearTimeout(timeout_id), 
                void 0 === debounce_mode && elapsed > delay ? exec() : no_trailing !== !0 && (timeout_id = setTimeout(debounce_mode ? clear : exec, void 0 === debounce_mode ? delay - elapsed : delay));
            }
            var timeout_id, last_exec = 0;
            return "boolean" != typeof no_trailing && (debounce_mode = callback, callback = no_trailing, 
            no_trailing = void 0), $.guid && (wrapper.guid = callback.guid = callback.guid || $.guid++), 
            wrapper;
        }, Utils.convertTimeFromUtc = function(dateTime) {
            return dateTime;
        }, Utils.linkify = function(message) {
            return message ? (message = message.replace(/&amp;/g, "&"), linkifiedMessage = message.replace(/(?=[a-zA-Z0-9])[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.(com|net|edu|gov|io|us|org|info|tv|mobi|au|nz|uk|br|es|dk|se|fi|nl|ca|sg|eu|py|it)\b([?/][-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, function(url) {
                return -1 != url.indexOf("@") ? '<a href="mailto:' + url + '" target="_blank">' + url + "</a>" : (0 != url.indexOf("http") && (url = "http://" + url), 
                '<a href="' + url + '" target="_blank">' + url + "</a>");
            })) : null;
        }, Utils.parseEmoticons = function(message) {
            function emotRegex(emot) {
                return new RegExp("([\\s.]|^)(" + emot + ")(?=[\\s.]|$)", "gim");
            }
            regexes = {
                happy: emotRegex("(:\\)|:-\\)|\\(happy\\))"),
                sad: emotRegex("(:\\(|:-\\(|\\(sad\\))"),
                grin: emotRegex("(:D|:-D|\\(grin\\))"),
                sealed: emotRegex("(:x|:-x|\\(sealed\\))"),
                wink: emotRegex("(;\\)|;-\\)|\\(wink\\))"),
                yawn: emotRegex("(\\(yawn\\))"),
                smirk: emotRegex("(\\(smirk\\))"),
                starstruck: emotRegex("(\\(starstruck\\))"),
                depressed: emotRegex("(:C|:-C|\\(depressed\\))"),
                sadnerd: emotRegex("(8\\(|8-\\(|\\(sadnerd\\))"),
                zomg: emotRegex("(D:|\\(zomg\\))"),
                speechless: emotRegex("(:\\||:-\\||\\(speechless\\))"),
                crying: emotRegex("(:'\\(|:'-\\(|\\(crying\\))"),
                relieved: emotRegex("(\\(relieved\\))"),
                satisfied: emotRegex("(\\(satisfied\\))"),
                determined: emotRegex("(\\(determined\\))"),
                tongue: emotRegex("(:p|:-p|\\(tongue\\))"),
                unsure: emotRegex("(:-\\/|\\(unsure\\))"),
                sleep: emotRegex("(-_-|\\(sleep\\))"),
                disguise: emotRegex("(8{|8-{|\\(disguise\\))"),
                cool: emotRegex("(B\\)|B-\\)|\\(cool\\))"),
                nerd: emotRegex("(8\\)|8-\\)|\\(nerd\\))"),
                lovestruck: emotRegex("(\\(lovestruck\\))"),
                angry: emotRegex("\\(angry\\)"),
                evil: emotRegex("(\\(evil\\))"),
                sick: emotRegex("(:s|:-s|\\(sick\\))"),
                embarassed: emotRegex("(\\/_\\\\|\\(embarassed\\))"),
                mustache: emotRegex("(:{|\\(mustache\\))"),
                surprised: emotRegex("(:o|:-o|\\(surprised\\))"),
                tease: emotRegex("(;p|;-p|\\(tease\\))"),
                ninja: emotRegex("\\(ninja\\)"),
                zombie: emotRegex("\\(zombie\\)")
            };
            var emoticons = {
                happy: "emote-happy",
                sad: "emote-sad",
                grin: "emote-grin",
                sealed: "emote-sealed",
                wink: "emote-wink",
                yawn: "emote-yawn",
                smirk: "emote-smirk",
                starstruck: "emote-starstruck",
                depressed: "emote-depressed",
                sadnerd: "emote-sadnerd",
                zomg: "emote-zomg",
                speechless: "emote-speechless",
                crying: "emote-crying",
                relieved: "emote-relieved",
                satisfied: "emote-satisfied",
                determined: "emote-determined",
                tongue: "emote-tongue",
                unsure: "emote-unsure",
                sleep: "emote-sleep",
                disguise: "emote-disguised",
                cool: "emote-cool",
                nerd: "emote-nerd",
                lovestruck: "emote-lovestruck",
                angry: "emote-angry",
                evil: "emote-evil",
                sick: "emote-sick",
                embarassed: "emote-embarassed",
                mustache: "emote-mustache",
                surprised: "emote-surprised",
                tease: "emote-tease",
                ninja: "emote-ninja",
                zombie: "emote-zombie"
            };
            if (message) for (var r in regexes) message = message.replace(regexes[r], function($0, $1) {
                return $1 + '<div class="emoticon ' + emoticons[r] + '" title="' + r + '"></div>';
            });
            return message;
        }, Utils.GaEvent = function(widgetSettings, eventEnabled, event) {
            var category = "GAEventCategory", eventFnc = function() {
                (window._gaq || window._ga) && (_gaq.push([ "_setAccount", widgetSettings.get("GoogId") ]), 
                window._gaq ? window._gaq.push([ "_trackEvent", widgetSettings.get(category), widgetSettings.get(event) ]) : window.ga("send", "event", widgetSettings.get(category), widgetSettings.get(event)));
            };
            widgetSettings.get("UsingGa") && widgetSettings.get(eventEnabled) && widgetSettings.get(event) && (window._gaq || window.ga || this.isOperator ? this.isOperator || eventFnc() : !function() {
                var ga = document.createElement("script");
                ga.type = "text/javascript", ga.async = !0, ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
                var loaded = !1;
                ga.onreadystatechange = ga.onload = function() {
                    loaded || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (window._gaq = window._gaq || [], 
                    eventFnc(), loaded = !0);
                }, document.getElementsByTagName("head").item(0).appendChild(ga);
            }());
        }, Utils.Notifier = function() {
            this.isTitleModified = !1, this.windowNotifyTimeout = null, this.timeoutId = null, 
            this.active = !1, this.mobileActive = !1, this.mobileAnimationInterval = null;
        }, Utils.Notifier.prototype.notify = function(message, additionalElement, mouseStopElement) {
            var t = this;
            if (!t.active) {
                t.active = !0;
                var originalTitle = document.title;
                additionalElement && (originalElementTitle = additionalElement.text());
                var switchTitle = function() {
                    return 0 == t.active ? (document.title = originalTitle, additionalElement && additionalElement.text(originalElementTitle), 
                    t.isTitleModified = !1, void 0) : (1 == t.isTitleModified ? (t.isTitleModified = !1, 
                    document.title = originalTitle, additionalElement && additionalElement.text(originalElementTitle)) : (t.isTitleModified = !0, 
                    document.title = message, additionalElement && additionalElement.text(message)), 
                    t.timeoutId = setTimeout(switchTitle, 900), void 0);
                };
                t.timeoutId = setTimeout(switchTitle, 900), mouseStopElement ? mouseStopElement.mousemove(function() {
                    t.stop();
                }) : $(document).mousemove(function() {
                    t.stop();
                });
            }
        }, Utils.Notifier.prototype.stop = function() {
            this.active = !1;
        }, Utils.escapeHtml = function(text) {
            var tempElem = $("<div/>");
            return text = tempElem.text(text || "").html();
        }, Utils.addInitializer(function() {
            "function" != typeof Date.prototype.toHourMinuteString && (Date.prototype.toHourMinuteString = function() {
                var hours = this.getHours(), minutes = this.getMinutes(), seconds = this.getSeconds(), amPM = hours >= 12 ? " PM" : " AM";
                return (0 == hours % 12 ? 1 : hours % 12) + ":" + (10 > minutes ? "0" + minutes : minutes) + ":" + (10 > seconds ? "0" + seconds : seconds) + amPM;
            });
        }), Utils.addFinalizer(function() {
            Date.prototype.toHourMinuteString = null;
        });
    }), GetReasonFromResponse = function(reason) {
        return 1 == reason ? "Available" : 2 == reason ? "NoOperators" : 3 == reason ? "ServerDowntime" : 4 == reason ? "AccountActivity" : 5 == reason ? "ChatQuotaExceeded" : 6 == reason ? "WidgetDisabled" : "";
    }, _PCcb = function(response) {
        window._checkChatAvailableDeferred.resolve({
            available: 1 == response.a,
            reason: GetReasonFromResponse(response.r)
        }), window._checkChatAvailableDeferred = null;
    }, !function(exports, global) {
        global["true"] = exports;
        var _ = global._;
        this.templates = this.templates || {}, this.templates.ChatConnecting = function(o) {
            var __t, __p = "", __e = _.escape;
            return __p += '<p class="greeting">' + (null == (__t = o.getResource("greeting", {
                visitorName: o.userName
            })) ? "" : __t) + '!</p><p class="connecting">' + __e(o.getResource("chat_connecting")) + '</p><div class="spinnerContainer" style="height:200px;"></div>';
        }, this.templates.ClosedMessage = function(o) {
            var __t, __p = "", __e = _.escape;
            return Array.prototype.join, __p += '<p class="purechat-message-note">' + __e(o.getResource("closed_message")) + "</p>", 
            o.AskForRating && (__p += '<div class="purechat-thumbs-container"><div class="purechat-thumbs purechat-thumbs-up purechat-thumbs-selectable pc-icon-thumbs-up"></div><div class="purechat-thumbs purechat-thumbs-down purechat-thumbs-selectable pc-icon-thumbs-down"></div></div><p class="purechat-rating-thanks purechat-message-note"></p>'), 
            o.CtaButton && (__p += '<form class="purechat-form purechat-ended-form" action=""><a href="' + __e(o.getResource("button_cta_url")) + '" class="btn purechat-cta-button" target="_blank">' + __e(o.getResource("button_cta")) + '</a><!--<input type="submit" class="btn" id="" value="' + __e(o.getResource("button_cta")) + '" onclick="window.open(\'' + __e(o.getResource("button_cta_url")) + "', '_blank')\">--></form>"), 
            __p += '<p class="purechat-download-container purechat-message-note"><a target="_blank" href="' + (null == (__t = o.get("pureServerUrl")) ? "" : __t) + "/VisitorWidget/Transcript?chatId=" + (null == (__t = o.get("dataController").connectionInfo.get("chatId")) ? "" : __t) + "&authToken=" + (null == (__t = o.get("dataController").connectionInfo.get("authToken")) ? "" : __t) + '">' + __e(o.getResource("closed_downloadTrans")) + "</a></p>";
        }, this.templates.ClosedMessageOperator = function(o) {
            var __t, __p = "", __e = _.escape;
            Array.prototype.join;
            var isOperatorRoom = o.get("room").roomType == PureChat.enums.roomType.operator;
            if (__p += '<script>!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = "https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs");</script><h3 class="">' + __e(o.getResource("closed_opMessage")) + '</h3><div class="closed-chat-buttons operator"><div><button type="button" data-command="removeWidget"><i class="shane-awesome close-chat-fill"></i>Close Chat Tab</button></div>', 
            !isOperatorRoom) {
                var banArgs = {
                    chatId: o.roomId,
                    visitorIPAddressId: o.visitorIPAddressId,
                    visitorIPAddress: o.visitorIPAddress,
                    performBan: !0
                }, banArgString = escape(JSON.stringify(banArgs));
                o.visitorIPAddressId > -1 && (__p += '<div><button class="btn ban-ip-button" data-chatid="' + (null == (__t = o.roomId) ? "" : __t) + "\" data-request='ban:ip' data-request-params=\"" + (null == (__t = banArgString) ? "" : __t) + '"><i class="shane-awesome manage-ip-addresses"></i>Ban IP Address</button></div>'), 
                __p += '<div><button class="btn view-transcript-operator-button" data-chatid="' + (null == (__t = o.roomId) ? "" : __t) + "\" data-command='transcript:view' data-command-params=\"" + (null == (__t = o.roomId) ? "" : __t) + '"><i class="shane-awesome view-transcript"></i>View Transcript</button></div><div><a href="/Chat/Download/' + (null == (__t = o.roomId) ? "" : __t) + '" class="button download-transcript-operator-button" data-chatid="' + (null == (__t = o.roomId) ? "" : __t) + '" target="_blank"><i class="shane-awesome download-transcript"></i>Download Transcript</a></div><div><button type="submit" class="btn email-transcript-operator-button" data-chatid="' + (null == (__t = o.roomId) ? "" : __t) + '" data-command="transcript:email" data-command-params="' + (null == (__t = o.roomId) ? "" : __t) + '"><i class="shane-awesome email-transcripts"></i>Email Transcript</button></div><div><a data-trigger="exportToOntime" class="leave-button button" data-chatid="' + (null == (__t = o.roomId) ? "" : __t) + '"><i class="shane-awesome export-transcript"></i>Export Transcript</a></div><div>';
                var name = o.visitorName && "Visitor" != o.visitorName ? "%20with%20" + o.visitorName + "!" : "!";
                __p += '<a href="https://twitter.com/intent/tweet?original_referer=' + (null == (__t = escape(pcDashboard.Settings.get("siteRootUrl"))) ? "" : __t) + "&text=Just%20had%20a%20great%20chat" + (null == (__t = name) ? "" : __t) + '&tw_p=tweetbutton&url=%20&via=PureChat" class="button full-page"><i class="fa fa-twitter" style="margin-top: 0.3em"></i>Share</a></div>';
            }
            return __p += "</div>";
        }, this.templates.EmailSent = function(o) {
            var __t, __p = "";
            return _.escape, __p += '<div class="purechat-enterinfo-container purechat-email-success"><p>Email Sent!</p><table><tr><td>Name: </td><td>' + (null == (__t = o.Name) ? "" : __t) + "</td></tr><tr><td>Email: </td><td>" + (null == (__t = o.Email) ? "" : __t) + "</td></tr><tr><td>Question: </td><td>" + (null == (__t = o.Question) ? "" : __t) + "</td></tr></table></div>";
        }, this.templates.Empty = function() {
            var __p = "";
            return _.escape, __p += "";
        }, this.templates.MessageList = function() {
            var __p = "";
            return _.escape, __p += '<div class="purechat-message-display-container"><div class="purechat-message-display purechat-clearfix"></div></div><div class="purechat-send-form-container"><form class="purechat-send-form" action=""><textarea type="text" class="purechat-send-form-message" name="purechat-send-form-message" /><div class="disableTextArea" style=""/></form></div><div class="purechat-confirm-close-modal" style="display: none;"><span class="message">Are you sure you want to close the chat?</span><div class="modal-button-bar"><button type="button" class="btn close-chat">Yes</button><button type="button" class="btn cancel">No</button></div></div><div class="purchat-confirm-close-modal-overlay" style="display: none;"></div>';
        }, this.templates.MessageView = function(o) {
            var __t, __p = "";
            _.escape, Array.prototype.join;
            var fallbackImage = o.fromOperator ? o.rootUrl + "/content/images/avatars/1avatar-operator.png" : o.rootUrl + "/content/images/avatars/1avatar-user.png";
            if ("note" == o.type) __p += '<p class="purechat-message-note important">' + (null == (__t = o.message) ? "" : __t) + "</p>"; else if ("message" == o.type && o.message) {
                var m = o.message.replace(/\n/g, "<br/>"), message = purechatApp.Utils.parseEmoticons(m);
                message = purechatApp.Utils.linkify(message), __p += '<div class="purechat-message-container ' + (null == (__t = o.myMessage ? "purechat-message-right" : "purechat-message-left") ? "" : __t) + '"><img class="gravitar operator-gravatar ' + (null == (__t = o.myMessage ? "right" : "left") ? "" : __t) + '" height="50" width="50" src="https://secure.gravatar.com/avatar/' + (null == (__t = o.senderGravatarHash) ? "" : __t) + "?s=35&d=" + (null == (__t = encodeURIComponent(fallbackImage)) ? "" : __t) + '" alt="Operator avatar"/><div class="purechat-message"><span class="purechat-displayname">' + (null == (__t = o.userName) ? "" : __t) + '</span><span class="name-message-separator">:</span> <span>' + (null == (__t = message) ? "" : __t) + '</span> <span class="message-time-separator">-</span> <span class="time">' + (null == (__t = o.time) ? "" : __t) + '</span></div><div class="timestamp"><span class="time">' + (null == (__t = o.time) ? "" : __t) + "</span></div></div>";
            }
            return __p;
        }, this.templates.StartChatForm = function(o) {
            var __t, __p = "", __e = _.escape;
            return Array.prototype.join, o.EmailForm ? __p += '<div class="purechat-enterinfo-container"><p>' + (null == (__t = purechatApp.Utils.linkify(o.getResource("noOperators_email_message"))) ? "" : __t) + "</p></div>" : (o.AskForName || o.AskForEmail || o.AskForQuestion) && (__p += '<div class="purechat-enterinfo-container"><p>' + (null == (__t = purechatApp.Utils.linkify(o.getResource("label_initial"))) ? "" : __t) + "</p></div>"), 
            __p += o.EmailForm ? '<form class="purechat-form purechat-email-form" action="">' : '<form class="purechat-form purechat-init-form" action="">', 
            __p += '<p class="alert alert-error init-error general-error" style="display: none;"></p>', 
            o.AskForName && (__p += '<p class="alert alert-error init-error please-entername" style="display: none;">' + __e(o.getResource("error_enterName")) + '</p><input type="text" class="purechat-name-input" autocomplete="off" name="purechat-name-input" placeholder="' + __e(o.getResource("placeholder_name")) + '" maxlength="40">'), 
            o.AskForEmail && (__p += '<p class="alert alert-error init-error please-enteremail" style="display: none;">' + __e(o.getResource("error_enterEmail")) + '</p><input type="email" class="purechat-email-input" name="purechat-email-input" placeholder="' + __e(o.getResource("placeholder_email")) + '">'), 
            o.AskForQuestion && (__p += '<p class="alert alert-error init-error please-enterquestion" style="display: none;">' + __e(o.getResource("error_enterQuestion")) + '</p><textarea class="purechat-question-input" name="purechat-question-input" placeholder="' + __e(o.getResource("placeholder_question")) + '" rows="3"></textarea>'), 
            __p += o.EmailForm ? '<input type="submit" class="btn" id="purechat-name-submit" value="' + __e(o.getResource("button_sendEmail")) + '" style="' + (null == (__t = o.AskForName || o.AskForQuestion || o.AskForEmail ? "" : "margin-top: 20px !important;") ? "" : __t) + ' display: inline"><span class="purechat-email-error">An Error Occurred</span>' : '<input type="submit" class="btn" id="purechat-name-submit" value="' + __e(o.getResource("button_startChat")) + '" style="' + (null == (__t = o.AskForName || o.AskForQuestion || o.AskForEmail ? "" : "margin-top: 20px !important;") ? "" : __t) + '">', 
            __p += "</form>";
        }, this.templates.Widget = function(o) {
            var __t, __p = "", __e = _.escape;
            Array.prototype.join;
            var mobile = o.get("RequestFromMobileDevice") && o.get("AllowWidgetOnMobile");
            return __p += '<div class="purechat-expanded"><div class="purechat-collapsed-outer"><div class="purechat-widget-inner purechat-clearfix"><div class="purechat-widget-header"><div class="purechat-menu btn-toolbar"><button data-trigger="restartChat" class="btn btn-mini btn-restart" title="Start a new chat" style="display: inline-block;"><i class="pc-icon-repeat" title="Start a new chat"></i></button><button data-trigger="popOutChat" class="btn btn-mini btn-pop-out" title="Pop out" style="display: inline-block;"><i class="pc-icon-share"></i></button><button data-trigger="expand" class="btn btn-mini actions btn-expand" title="Expand Widget" style="display: inline-block;"><i class="pc-icon-plus"></i></button><button data-trigger="collapse" class="btn btn-mini actions btn-collapse" title="Collapse Widget" style="display: inline-block;"><i class="pc-icon-minus"></i></button><button data-trigger="closeChat" class="btn btn-mini btn-close" title="Close chat session" style="display: inline-block;"><i class="pc-icon-remove"></i></button></div><div class="purechat-widget-title"><img src="' + (null == (__t = o.absoluteUrl("/Content/images/widget-logo-32.png")) ? "" : __t) + '" class="purechat-title-image-out-of-way small" alt="" /><img src="' + (null == (__t = o.absoluteUrl("/Content/images/widget-logo-64.png")) ? "" : __t) + '" class="purechat-title-image-out-of-way large" alt="" />', 
            o.get("RequestFromMobileDevice") && o.get("AllowWidgetOnMobile") && (__p += '<img src="' + (null == (__t = o.absoluteUrl("/content/images/widget-logo-32-highlight.png")) ? "" : __t) + '" alt="" class="purechat-title-image-out-of-way-hilight small" /><img src="' + (null == (__t = o.absoluteUrl("/content/images/widget-logo-64-highlight.png")) ? "" : __t) + '" alt="" class="purechat-title-image-out-of-way-hilight large" />'), 
            __p += '&nbsp;<span class="purechat-widget-title-link"></span></div></div><div class="purechat-content-wrapper"><div class="purechat-content"></div>', 
            __p += o.get("RequestFromMobileDevice") && o.get("AllowWidgetOnMobile") ? '<div style="display: block; width: 100% !important; font-size: 10px !important; margin-bottom: 10px !important; text-align: center !important; position: absolute !important; bottom: 0 !important; left: 0 !important;"><span style="font-size: 10px !important;">' + __e(o.getResource("poweredby")) + ' </span><a target="_blank" href="' + (null == (__t = o.poweredByUrl()) ? "" : __t) + '" style="font-size: 10px !important; color: #2980b9 !important;">PureChat.com</a></div>' : '<div style="display: block; width: 100% !important; font-size: 10px !important; margin-bottom: 10px !important; text-align: center !important;"><span style="font-size: 10px !important;">' + __e(o.getResource("poweredby")) + ' </span><a target="_blank" href="' + (null == (__t = o.poweredByUrl()) ? "" : __t) + '" style="font-size: 10px !important; text-decoration: underline !important;">PureChat.com</a></div>', 
            __p += '</div></div></div></div><div class="purechat-button-expand purechat-collapsed ' + (null == (__t = o.get("CollapsedWidgetImageUrl") ? "purechat-collapsed-image" : "purechat-collapsed-default") ? "" : __t) + '">', 
            !mobile && o.get("CollapsedWidgetImageUrl") && o.showImage() && !o.isTabTop() && (__p += '<img class="collapsed-image" src="' + (null == (__t = o.absoluteCollapsedImageUrl()) ? "" : __t) + '" data-trigger="expand" style="' + (null == (__t = o.collapsedImageCss()) ? "" : __t) + '" />'), 
            o.showTab() && (__p += '<div class="purechat-collapsed-outer" data-trigger="expand"><div class="purechat-widget-inner purechat-clearfix"><div class="purechat-widget-header"><div class="purechat-menu btn-toolbar">', 
            mobile || o.get("isDirectAccess") || !o.get("ShowMinimizeWidgetButton") || (__p += '<button type="button" data-trigger="superMinimize" class="btn btn-mini actions purechat-super-minimize-link-button" style="display: inline-block;"><i class="pc-icon-caret-down"></i></button>'), 
            __p += '<button data-trigger="expand" class="btn btn-mini actions btn-expand" title="Expand Widget" style="display: inline-block;"><i class="pc-icon-plus"></i></button><button data-trigger="collapse" class="btn btn-mini actions btn-collapse" title="Collapse Widget" style="display: inline-block;"><i class="pc-icon-minus"></i></button></div><div class="purechat-widget-title"><img src="' + (null == (__t = o.absoluteUrl("/Content/images/widget-logo-32.png")) ? "" : __t) + '" class="purechat-title-image-out-of-way small" alt="" /><img src="' + (null == (__t = o.absoluteUrl("/Content/images/widget-logo-64.png")) ? "" : __t) + '" class="purechat-title-image-out-of-way large" alt="" />', 
            mobile && (__p += '<img src="' + (null == (__t = o.absoluteUrl("/content/images/widget-logo-32-highlight.png")) ? "" : __t) + '" alt="" class="purechat-title-image-out-of-way-hilight small" /><img src="' + (null == (__t = o.absoluteUrl("/content/images/widget-logo-64-highlight.png")) ? "" : __t) + '" alt="" class="purechat-title-image-out-of-way-hilight large" />'), 
            __p += '&nbsp;<span class="purechat-widget-title-link">' + __e(o.getResource("title_initial")) + "</span></div></div></div></div>"), 
            !mobile && o.get("CollapsedWidgetImageUrl") && o.showImage() && o.isTabTop() && (__p += '<img class="collapsed-image" src="' + (null == (__t = o.absoluteCollapsedImageUrl()) ? "" : __t) + '" data-trigger="expand" style="' + (null == (__t = o.collapsedImageCss()) ? "" : __t) + '" />'), 
            __p += '</div><div class="purechat-mobile-overlay hide"></div>';
        }, this.templates.WidgetDirectAccess = function(o) {
            var __t, __p = "", __e = _.escape;
            return Array.prototype.join, __p += '<div class="purechat-expanded"><div class="purechat-widget-inner purechat-clearfix"><div class="purechat-widget-header"><div class="purechat-menu btn-toolbar"><button data-trigger="restartChat" class="btn btn-mini btn-restart" title="Start a new chat"><i class="pc-icon-repeat" title="Start a new chat"></i></button><button data-trigger="closeChat" class="btn btn-mini btn-close" title="Close chat session"><i class="pc-icon-remove"></i></button></div><div class="purechat-widget-title"><img src="' + (null == (__t = o.absoluteUrl("/Content/images/widget-logo-32.png")) ? "" : __t) + '" class="purechat-title-image-out-of-way small" alt="" /><img src="' + (null == (__t = o.absoluteUrl("/Content/images/widget-logo-64.png")) ? "" : __t) + '" class="purechat-title-image-out-of-way large" alt="" />', 
            __p += o.get("RequestFromMobileDevice") && o.get("AllowWidgetOnMobile") ? '<img src="' + (null == (__t = o.absoluteUrl("/content/images/widget-logo-32-highlight.png")) ? "" : __t) + '" alt="" class="purechat-title-image-out-of-way-hilight small" /><img src="' + (null == (__t = o.absoluteUrl("/content/images/widget-logo-64-highlight.png")) ? "" : __t) + '" alt="" class="purechat-title-image-out-of-way-hilight large" />&nbsp;<span class="purechat-widget-title-link">PureChat</span>' : '<img class="purechat-title-image" src="' + (null == (__t = o.absoluteUrl("/Content/images/icon-small.png")) ? "" : __t) + '">&nbsp;<span class="purechat-widget-title-link">PureChat</span>', 
            __p += '</div></div><div class="purechat-content"></div><div class="purechat-poweredby-container"><span class="purechat-poweredby">' + __e(o.getResource("poweredby")) + ' </span><a target="_blank" href="' + (null == (__t = o.poweredByUrl()) ? "" : __t) + '">PureChat.com</a></div></div></div>';
        }, this.templates.WidgetOperator = function(o) {
            var __p = "";
            return _.escape, Array.prototype.join, __p += '<div class="purechat-widget-inner purechat-clearfix"><div class="purechat-widget-header"><div class="menu btn-toolbar"><span data-trigger="cannedResponses" class="purechat-canned-responses btn-group"><a class="dropdown-toggle btn" data-toggle="dropdown" data-ajax="false">&nbsp;<i class="icon-ellipsis-horizontal icon-white"></i>&nbsp;</a><ul class="dropdown-menu bottom-up"></ul></span>', 
            __p += o.attributes.isInvisible ? '<button data-trigger="requeueChat" class="btn btn-mini requeue-button"><i class="fa fa-reply"></i><span class="text">Leave</span></button><button data-trigger="removeWidget" class="btn btn-mini closewidget-button"><span class="text">Done</span></button>' : '<button data-trigger="exportToOntime" class="btn btn-mini leave-button"><span class="text">Export</span></button><button data-trigger="requeueChat" class="btn btn-mini requeue-button"><i class="fa fa-reply"></i><span class="text">Requeue</span></button><button data-trigger="removeWidget" class="btn btn-mini closewidget-button"><span class="text">Done</span></button><button data-trigger="closeChat" data-trigger-params=\'{"confirmation": "Are you sure you want to close this chat?"}\'  class="btn btn-mini requeue close-button"><span class="text">End Chat</span></button>', 
            __p += '</div><div class="purechat-widget-title"><a class="purechat-widget-title-link"></a></div></div><div class="purechat-chat-info"></div><div class="purechat-content"></div><div class="purechat-poweredby-container"></div></div>';
        }, this.templates.WidgetPoppedOut = function(o) {
            var __t, __p = "", __e = _.escape;
            return Array.prototype.join, __p += '<div class="purechat-window purechat-expanded"><div class="purechat-widget-inner purechat-clearfix"><div class="purechat-widget-header"><div class="purechat-menu btn-toolbar"><button data-trigger="restartChat" class="btn btn-mini btn-restart" title="Start a new chat"><i class="pc-icon-repeat" title="Start a new chat"></i></button><button data-trigger="closeChat" class="btn btn-mini btn-close" title="Close chat session"><i class="pc-icon-remove"></i></button></div><div class="purechat-widget-title"><img src="' + (null == (__t = o.absoluteUrl("/Content/images/widget-logo-32.png")) ? "" : __t) + '" class="purechat-title-image-out-of-way small" alt="" /><img src="' + (null == (__t = o.absoluteUrl("/Content/images/widget-logo-64.png")) ? "" : __t) + '" class="purechat-title-image-out-of-way large" alt="" />', 
            __p += o.get("RequestFromMobileDevice") && o.get("AllowWidgetOnMobile") ? '<img src="' + (null == (__t = o.absoluteUrl("/content/images/widget-logo-32-highlight.png")) ? "" : __t) + '" alt="" class="purechat-title-image-out-of-way-hilight small" /><img src="' + (null == (__t = o.absoluteUrl("/content/images/widget-logo-64-highlight.png")) ? "" : __t) + '" alt="" class="purechat-title-image-out-of-way-hilight large" />&nbsp;<span class="purechat-widget-title-link">PureChat</span>' : '<img class="purechat-title-image" src="' + (null == (__t = o.absoluteUrl("/Content/images/icon-small.png")) ? "" : __t) + '">&nbsp;<span class="purechat-widget-title-link">PureChat</span>', 
            __p += '</div></div><div class="purechat-content"></div><div class="purechat-poweredby-container"><span class="purechat-poweredby">' + __e(o.getResource("poweredby")) + ' </span><a target="_blank" href="' + (null == (__t = o.poweredByUrl()) ? "" : __t) + '">PureChat.com</a></div></div></div><div class="purechat-widget purechat-collapsed">', 
            __p += o.get("CollapsedWidgetImageUrl") ? '<img src="' + (null == (__t = o.get("CollapsedWidgetImageUrl")) ? "" : __t) + '" data-trigger="expand" />' : '<div class="purechat-widget-inner purechat-clearfix"><div class="purechat-widget-header"><div class="purechat-menu btn-toolbar"><!-- <button data-trigger="restartChat" class="btn btn-mini btn-restart" title="Start a new chat"><i class="pc-icon-restart" title="Start a new chat"></i></button><button data-trigger="popOutChat" class="btn btn-mini btn-pop-out" title="Pop out"><i class="pc-icon-share"></i></button><button data-trigger="closeChat" class="btn btn-mini btn-close" title="Close chat session"><i class="pc-icon-remove"></i></button>--><button data-trigger="expand" class="btn btn-mini actions btn-expand" title="Expand Widget"><i class="pc-icon-plus"></i></button><button data-trigger="collapse" class="btn btn-mini actions btn-collapse" title="Collapse Widget"><i class="pc-icon-minus"></i></button></div><div class="purechat-widget-title"><!-- <img class="purechat-title-image" src="' + (null == (__t = o.pureServerUrl) ? "" : __t) + '/Content/images/icon-small.png">&nbsp;<span class="purechat-widget-title-link">PureChat</span>--><img class="purechat-title-image" src="' + (null == (__t = o.absoluteUrl("/Content/images/icon-small.png")) ? "" : __t) + '">&nbsp;<span class="purechat-widget-title-link">PureChat</span></div></div></div>', 
            __p += "</div>";
        };
    }({}, function() {
        return this;
    }()), purechatApp.module("Models", function(Models, app, Backbone, Marionette, $, _) {
        Models.Chat = Backbone.RelationalModel.extend({
            defaults: {},
            relations: [ {
                type: Backbone.HasMany,
                key: "messages",
                relatedModel: "Message",
                collectionType: "MessageCollection",
                reverseRelation: {
                    key: "chat"
                }
            }, {
                type: Backbone.HasMany,
                key: "operators",
                relatedModel: "Operator",
                collectionType: "OperatorCollection",
                reverseRelation: {
                    key: "chat"
                }
            } ],
            chatUserNames: function() {
                var userNames = "";
                return this.get("operators").forEach(function(next) {
                    "" != userNames && (userNames += ", "), userNames += next.get("userDisplayName");
                }), userNames;
            },
            isInChat: function() {
                return this.get("userId") && this.get("chatId") && this.get("authToken");
            }
        }), Models.Message = Backbone.RelationalModel.extend({
            events: {
                "change:messageResource": function() {
                    alert("test");
                }
            }
        }), Models.MessageCollection = Backbone.Collection.extend({
            model: Models.Message
        }), Models.Operator = Backbone.RelationalModel.extend({
            idAttribute: "userId"
        }), Models.OperatorCollection = Backbone.Collection.extend({
            model: Models.Operator
        }), Models.WidgetSettings = Backbone.RelationalModel.extend({
            getResource: function(key, data) {
                var resources = this.get("StringResources");
                if (!resources) return key;
                if (data) {
                    var format = resources[key];
                    return self.compiledResources || (self.compiledResources = {}), self.compiledResources[format] || (self.compiledResources[format] = pc_.template(format, null, {
                        interpolate: /\{(.+?)\}/g
                    })), self.compiledResources[format](data);
                }
                return resources[key];
            },
            isTabTop: function() {
                return 3 == this.get("Position") || 4 == this.get("Position");
            },
            isTabLeft: function() {
                return 1 == this.get("Position") || 3 == this.get("Position");
            },
            showTab: function() {
                var mobileOverride = this.get("RequestFromMobileDevice") && this.get("AllowWidgetOnMobile");
                return this.get("WidgetType") == app.Constants.WidgetType.Tab || this.get("WidgetType") == app.Constants.WidgetType.ImageTab || mobileOverride && this.get("WidgetType") != app.Constants.WidgetType.Button;
            },
            showImage: function() {
                return this.get("WidgetType") == app.Constants.WidgetType.Image || this.get("WidgetType") == app.Constants.WidgetType.ImageTab;
            },
            collapsedImageCss: function() {
                var scale = this.get("Scale") / 100, scaledWidth = this.get("ImageWidth") * scale, scaledHeight = this.get("ImageHeight") * scale, yOffset = 0;
                this.isTabTop() ? (yOffset = this.showTab() ? 60 : 0, yOffset += this.get("ImageYOffset") || 0) : (yOffset = -(scaledHeight + (this.get("ImageYOffset") || 0)), 
                this.showTab() || (yOffset -= 10));
                var scaleCss = [ "position:absolute;", "margin-top: " + yOffset + "px;", "width: " + this.get("ImageWidth") * scale + "px;", "max-width: " + this.get("ImageWidth") * scale + "px;", "top: 0px;", "z-index: " + (this.get("ImageTop") ? 2 : 0) + ";" ];
                return this.showTab() ? (scaleCss.push("left: 50%;"), scaleCss.push("margin-left: " + -(scaledWidth / 2 - (this.get("ImageXOffset") || 0)) + "px;")) : this.isTabLeft() ? (scaleCss.push("left: 50%;"), 
                scaleCss.push("margin-left: " + (this.get("ImageXOffset") || 0) + "px;")) : (scaleCss.push("right: 50%;"), 
                scaleCss.push("margin-right: " + -(this.get("ImageXOffset") || 0) + "px;")), scaleCss.join("");
            },
            poweredByUrl: function() {
                return "http://www.purechat.com?utm_source=" + encodeURIComponent(location.hostname) + "&utm_medium=widget&utm_campaign=poweredby&support=false";
            },
            absoluteCollapsedImageUrl: function() {
                return this.get("cdnServerUrl") + this.get("CollapsedWidgetImageUrl");
            },
            absoluteUrl: function(path) {
                return this.get("cdnServerUrl") + path;
            },
            formatDateTime: function(dateString) {
                var d = new Date(dateString), formattedDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
                return formattedDate += " " + (0 == d.getHours() % 12 ? "12" : d.getHours() % 12) + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + (d.getHours() >= 12 ? "PM" : "AM");
            }
        }), Models.WidgetSettingsCollection = Backbone.Collection.extend({
            model: Models.WidgetSettings
        }), Models.ChatConnection = Backbone.Model.extend({
            persistedKeys: [ "userId", "authToken", "roomId", "chatId", "visitorName", "disabled" ],
            persistLocalStorage: function() {
                var self = this;
                return _.each(self.persistedKeys, function(key) {
                    void 0 != self.get(key) && (localStorage[key] = self.get(key));
                }), self;
            },
            clearLocalStorage: function() {
                var self = this;
                return _.each(self.persistedKeys, function(key) {
                    delete localStorage[key];
                }), self;
            },
            loadFromLocalStorage: function() {
                var self = this;
                return _.each(self.persistedKeys, function(key) {
                    self.set(key, localStorage[key]);
                }), self;
            },
            isInChat: function() {
                return this.get("userId") && this.get("authToken");
            }
        });
    }), Backbone.View.prototype.getResource = function(key, data) {
        return Marionette.getOption(this, "rm").getResource(key, pc_.defaults(data || {}, {
            chatUserNames: ""
        }));
    }, Marionette.View.prototype.mixinTemplateHelpers = function(target) {
        target = target || {};
        var templateHelpers = this.templateHelpers || {};
        return pc_.isFunction(templateHelpers) && (templateHelpers = templateHelpers.call(this)), 
        target.getResource = pc_.bind(backbone.View.prototype.getResource, this), pc_.extend(target, templateHelpers);
    }, Backbone.Marionette.Renderer.render = function(template, data) {
        var t = purechatApp.templates || templates;
        "string" == typeof template && t[template] && (template = t[template]);
        var templateFunc = "function" == typeof template ? template : Marionette.TemplateCache.get(template), html = templateFunc(data);
        return html.trim();
    }, purechatApp.module("Views", function(Views, app, Backbone, Marionette, $, _) {
        var notifier = new app.Utils.Notifier();
        Views.WidgetLayout = Marionette.Layout.extend({
            template: null,
            className: "purechat",
            windowHeightOnLoad: 0,
            optionsStepShown: !1,
            maxWidth: 700,
            regions: {
                content: ".purechat-content"
            },
            events: {
                "click [data-trigger]": "executeCommand",
                mouseenter: "peekWidget",
                mouseleave: "unpeekWidget"
            },
            modelEvents: {
                "change:operatorsAvailable": "operatorsAvailableChanged"
            },
            ui: {
                content: ".purechat-content",
                title: ".purechat-expanded .purechat-widget-title-link",
                collapsedTitle: ".purechat-collapsed .purechat-widget-title-link",
                popoutButton: '[data-trigger="popOutChat"]',
                closeButton: '[data-trigger="closeChat"]',
                removeWidgetButton: '[data-trigger="removeWidget"]',
                restartButton: '[data-trigger="restartChat"]',
                requeueButton: '[data-trigger="requeueChat"]',
                leaveButton: '[data-trigger="leaveChat"]',
                exportToOntimeButton: '[data-trigger="exportToOntime"]',
                widgetCollapsed: ".purechat-collapsed",
                widgetExpanded: ".purechat-expanded",
                collapseImage: ".collapsed-image"
            },
            templateHelpers: function() {
                return this.settings;
            },
            initialize: function() {
                this.model.set("superMinimize", "true" == (window.localStorage.superMinimize || "false").toLowerCase()), 
                Marionette.Layout.prototype.initialize.call(this), this.settings = Marionette.getOption(this, "widgetSettings"), 
                this.settings.get("isDirectAccess") ? (this.template = "WidgetDirectAccess", this.$el.addClass("purechat-widget purechat-hosted-widget")) : this.settings.get("isOperator") ? (this.template = "WidgetOperator", 
                this.$el.addClass("purechat-operator")) : this.settings.get("poppedOut") ? (this.template = "WidgetPoppedOut", 
                this.$el.addClass("purechat-window purechat-popped-out-widget")) : (this.template = "Widget", 
                this.$el.addClass("purechat-widget hide"));
                var positionCssClasses = this.settings.get("WidgetType") == app.Constants.WidgetType.Button ? "purechat-widget-button" : "";
                if (!this.model.get("isPoppedOut") && !this.settings.get("isDirectAccess")) {
                    var position = this.settings.get("Position");
                    1 === position ? positionCssClasses = "purechat-bottom purechat-bottom-left" : 2 === position ? positionCssClasses = "purechat-bottom purechat-bottom-right" : 3 === position ? positionCssClasses = "purechat-top purechat-top-left" : 4 === position && (positionCssClasses = "purechat-top purechat-top-right"), 
                    this.$el.addClass(positionCssClasses);
                }
                this.listenTo(this.settings, "change", _.bind(this.updateImageTransform, this)), 
                this.windowHeightOnLoad = $(window).height(), this.settings.get("RequestFromMobileDevice") && this.settings.get("AllowWidgetOnMobile") && $("head").append('<style type="text/css" class="purechat-dynamic-mobile-styles"></style>');
            },
            setTitle: function(title) {
                this.ui.title.text(title).attr("title", title), this.ui.collapsedTitle.text(title).attr("title", title);
            },
            clearContents: function() {
                this.ui.content.html("");
            },
            updateImageTransform: function() {
                this.ui.collapseImage && this.ui.collapseImage.attr && this.ui.collapseImage.attr("style", this.options.widgetSettings.collapsedImageCss());
            },
            hideAdditionalDetails: function() {
                this.$el.find(".purechat-widget-sliding-panel").removeClass("expanded").addClass("collapsed"), 
                this.$el.find(".additional-details").removeClass("hide"), this.$el.find(".purechat-widget-inner").removeClass("expanded"), 
                this.$el.css({
                    width: this.maxWidth - 200
                });
            },
            showAdditionalDetails: function() {
                var context = this, slidingPanel = context.$el.find(".purechat-widget-sliding-panel"), spinner = slidingPanel.find(".spinner");
                spinner.removeClass("hide");
                var headerHeight = context.$el.find(".purechat-widget-inner .purechat-widget-header").outerHeight();
                context.$el.find(".purechat-widget-inner").addClass("expanded"), slidingPanel.find(".purechat-widget-header").css({
                    height: headerHeight,
                    lineHeight: headerHeight + "px"
                }), slidingPanel.find(".purechat-additional-content").css({
                    top: headerHeight
                }), slidingPanel.removeClass("collapsed").addClass("expanded"), spinner.addClass("hide");
            },
            executeCommand: function(e) {
                e.preventDefault();
                var $this = $(e.currentTarget), command = $this.data("trigger"), commandParams = $this.data("trigger-params");
                return this.minimizeOnLoadTimeout && (this.minimizeOnLoadTimeout = clearTimeout(this.minimizeOnLoadTimeout)), 
                this.triggerMethod(command, commandParams, e);
            },
            focusInput: function() {
                this.options.widgetSettings.get("isDemo") || this.settings.get("RequestFromMobileDevice") || this.$el.find(".purechat-name-input, .purechat-email-input, .purechat-question-input, .purechat-send-form-message").first().focus();
            },
            onRender: function() {
                var self = this;
                this.settings.get("isWidget") ? (this.ui.content.addClass("purechat-widget-content"), 
                self.options.widgetSettings.get("RequestFromMobileDevice") && this.ui.content.css({
                    "overflow-y": "auto"
                })) : (this.$el.addClass("purechat-window"), this.ui.content.addClass("purechat-window-content")), 
                this.operatorsAvailableChanged(), this.setTitle(this.settings.get("title") || ""), 
                this.settings.get("isDemo") || "true" != localStorage.expanded || this.settings.get("ForcePopout") || this.settings.get("usePrototypeFallback") ? this.onCollapse(!0) : this.expand(!0), 
                self.imageLoaded = $.Deferred(), this.ui.collapseImage.length > 0 ? $(this.ui.collapseImage).load(function() {
                    self.imageLoaded.resolve();
                }) : self.imageLoaded.resolve(), this.settings.get("WidgetType") == app.Constants.WidgetType.Button && $(".purechat-button-expand").css("visibility", "visible"), 
                this.$el.hasClass("purechat-top") && this.$el.find(".pc-icon-caret-down").removeClass("pc-icon-caret-down").addClass("pc-icon-caret-up");
            },
            getResizedImageDimensions: function(originalHeight, originalWidth, ratio) {
                return {
                    height: originalHeight * ratio,
                    width: originalWidth * ratio
                };
            },
            onAfterInsertion: function() {
                var self = this;
                this.model.get("isOperator") || (self.$el.hasClass("purechat-widget-expanded") && self.settings.get("RequestFromMobileDevice") && self.settings.get("AllowWidgetOnMobile") && self.expandMobile(), 
                this.model.get("superMinimize") && (this.onCollapse(!0), this.onSuperMinimize(null, null, !0)));
            },
            onSuperMinimize: function(args, e, doTimeout) {
                e && e.stopPropagation();
                var self = this, minFnc = function() {
                    self.$el.removeClass("purechat-widget-expanded purechat-widget-collapsed"), self.$el.addClass("purechat-widget-super-collapsed"), 
                    self.$el.find(".btn-toolbar .btn-expand").show(), self.$el.find(".btn-toolbar .btn-collapse, .purechat-widget-content, .collapsed-image, .purechat-super-minimize-link-button").hide();
                    var baseAmount = 2 * -(self.$el.outerHeight() / 3);
                    console.log("Super minimize!"), self.$el.hasClass("purechat-bottom-right") || self.$el.hasClass("purechat-bottom-left") ? self.$el.css({
                        bottom: baseAmount
                    }) : self.$el.css({
                        top: baseAmount
                    }), self.model.set("superMinimized", !0), window.localStorage.superMinimize = !0;
                };
                return doTimeout ? this.minimizeOnLoadTimeout = setTimeout(minFnc, 5e3) : minFnc(), 
                !1;
            },
            peekWidget: function() {
                this.settings.get("RequestFromMobileDevice") || this.$el.removeAttr("style");
            },
            unpeekWidget: function() {
                var self = this;
                !self.settings.get("RequestFromMobileDevice") && self.$el.hasClass("purechat-widget-super-collapsed") && (self.$el.hasClass("purechat-bottom-right") || self.$el.hasClass("purechat-bottom-left") ? self.$el.css({
                    bottom: 2 * -(self.$el.outerHeight() / 3)
                }) : self.$el.css({
                    top: 2 * -(self.$el.outerHeight() / 3)
                }));
            },
            operatorsAvailableChanged: function() {
                this.settings.get("isWidget") && (this.model.get("operatorsAvailable") ? (this.$el.addClass("purechat-button-available"), 
                this.$el.removeClass("purechat-button-unavailable"), this.$el.removeAttr("disabled", "disabled")) : (this.$el.removeClass("purechat-button-available"), 
                this.$el.addClass("purechat-button-unavailable"), 0 === this.options.widgetSettings.get("UnavailableBehavior") && (this.$el.addClass("purechat-button-hidden"), 
                this.$el.attr("disabled", "disabled"))));
            },
            onExpand: function(e, externalArgs) {
                var isCollapseCommand = externalArgs.collapse, superMinimize = externalArgs.superMinimize, self = this;
                self.options.widgetSettings.get("dataController").checkChatAvailable().done(function(result) {
                    self.model.set("operatorsAvailable", result.available), isCollapseCommand || superMinimize || self.expand();
                });
            },
            mobileResize: function() {
                this.collapseMobile();
            },
            expandMobile: function(firstLoad, callback) {
                var self = this, elem = self.$el;
                elem.find(".purechat-widget-content"), elem.find(".purechat-poweredby-container"), 
                elem.find(".purechat-widget-header"), $(window).off("resize.RepositionWidget"), 
                elem.removeClass("slide-out-of-way").css({
                    left: 0
                }), elem.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
                    $(e.currentTarget) != $(e.target) && ((callback || function() {}).call(self), elem.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"));
                });
            },
            expand: function(firstLoad) {
                var self = this;
                self.$el.removeClass("purechat-widget-super-collapsed");
                var completeFnc = function() {
                    self.focusInput(), self.$el.removeClass("purechat-widget-collapsed"), self.$el.addClass("purechat-widget-expanded"), 
                    self.$el.find(".btn-toolbar .btn-expand").hide(), self.$el.find(".btn-toolbar .btn-collapse").show(), 
                    self.$el.find(".purechat-widget-content").show(), self.$el.find(".purechat-widget-content").parent().find("div:last").show(), 
                    self.ui.widgetCollapsed.hide(), self.ui.widgetExpanded.show(), self.model.set("expanded", !0), 
                    self.trigger("expanded");
                };
                window.localStorage.superMinimize = !1, !self.settings.get("isDirectAccess") && self.settings.get("ForcePopout") && !self.model.get("isPoppedOut") || self.settings.get("usePrototypeFallback") ? self.triggerMethod("popOutChat") : (self.settings.get("isDemo") || (localStorage.expanded = !0), 
                self.settings.get("RequestFromMobileDevice") && self.settings.get("AllowWidgetOnMobile") ? (self.expandMobile(firstLoad, completeFnc), 
                firstLoad && (completeFnc(), self.$el.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"))) : completeFnc());
            },
            collapseMobile: function(firstLoad, callback) {
                var self = this;
                if (!self.settings.get("isDirectAccess")) {
                    var elem = self.$el, windowWidth = $(window).width(), bigImage = windowWidth > 700;
                    if (!this.options.widgetSettings.get("killForPreview")) var timeout = setTimeout(function() {
                        elem.addClass("slide-out-of-way").css({
                            left: windowWidth - (bigImage ? 110 : 72)
                        }), timeout = clearTimeout(timeout);
                    }, 1e3);
                    (callback || function() {}).call(self), $(window).off("resize.RepositionWidget").on("resize.RepositionWidget", function() {
                        elem.addClass("nuke-transitions"), self.collapseMobile(), elem.removeClass("nuke-transitions");
                    });
                }
            },
            onCollapse: function(firstLoad) {
                var self = this;
                self.settings.get("isDemo") || (localStorage.expanded = !1), self.$el.removeClass("purechat-widget-expanded"), 
                self.$el.addClass("purechat-widget-collapsed"), self.$el.find(".btn-toolbar .btn-expand, .collapsed-image, .purechat-super-minimize-link-button").show(), 
                self.$el.find(".btn-toolbar .btn-collapse, .purechat-widget-content").hide(), self.$el.find(".purechat-widget-content").parent().find("div:last").hide();
                var inChat = self.model.get("roomId") || self.settings.get("dataController").checkInRoom();
                inChat && 2 == self.settings.get("WidgetType") ? (self.ui.widgetCollapsed.hide(), 
                self.ui.widgetExpanded.show(), self.settings.get("RequestFromMobileDevice") && self.settings.get("AllowWidgetOnMobile") && (self.$el.find(".purechat-expanded .purechat-menu .btn-expand").hide(), 
                self.ui.widgetExpanded.off("click.ExpandWidgetForMobile").on("click.ExpandWidgetForMobile", function() {
                    self.ui.widgetExpanded.off("click.ExpandWidgetForMobile"), self.expand();
                }))) : (self.ui.widgetCollapsed.show(), self.ui.widgetExpanded.hide()), self.model.set("expanded", !1), 
                self.trigger("collapsed"), self.settings.get("RequestFromMobileDevice") && self.settings.get("AllowWidgetOnMobile") && self.collapseMobile(firstLoad, function() {});
            },
            onHide: function() {
                this.$el.addClass("purechat-button-hidden");
            },
            onShow: function() {
                var self = this;
                self.imageLoaded.done(function() {
                    (0 != self.settings.get("UnavailableBehavior") || self.model.get("isPoppedOut") || self.model.get("operatorsAvailable") || self.model.get("userId")) && self.$el.removeClass("purechat-button-hidden"), 
                    self.settings.get("DisplayWidgetAnimation") && !self.model.get("expanded") && self.$el.addClass("purechat-" + self.settings.get("DisplayWidgetAnimation") + " purechat-animated");
                });
            },
            flashNotification: function(message) {
                notifier.notify(message, this.ui.title, this.$el);
            },
            setCannedResponses: function(cannedResponses) {
                var t = this;
                if (this.cannedResponses = cannedResponses, cannedResponses && window.$ && window.$().dropdown) {
                    var cannedResponsesList = $(".purechat-canned-responses ul", this.widgetContainer);
                    if (0 != cannedResponsesList.length) cannedResponsesList.html(""); else {
                        var cannedResponsesDiv = window.$('<span class="purechat-canned-responses btn-group"><a class="dropdown-toggle btn" data-toggle="dropdown" data-ajax="false">&nbsp;<i class="icon-ellipsis-horizontal icon-white"></i>&nbsp;</a><ul class="dropdown-menu bottom-up"></ul></span>');
                        cannedResponsesList = window.$("ul", cannedResponsesDiv), cannedResponsesList.dropdown(), 
                        cannedResponsesDiv.click(function() {
                            cannedResponsesDiv.find(".dropdown-toggle").dropdown("toggle");
                        }), this.addToolbarItem(cannedResponsesDiv);
                    }
                    for (var i in cannedResponses) {
                        var cannedResponse = cannedResponses[i];
                        if ("===separator===" === cannedResponse.content) cannedResponsesList.append("<div class='divider'></div>"); else {
                            var cannedResponseElement = window.$('<li data-ajax="false" data-cannedResponse="' + cannedResponse.content + '"><a href="#">' + cannedResponse.name + "</a></li>");
                            cannedResponseElement.click(function() {
                                var formMessage = t.$el.find(".purechat-send-form-message");
                                formMessage.val($(this).attr("data-cannedResponse")), formMessage.focus();
                            }), cannedResponsesList.append(cannedResponseElement);
                        }
                    }
                }
            }
        }), Views.StartChatForm = Marionette.ItemView.extend({
            template: "StartChatForm",
            className: "",
            events: {
                "submit form": "startChatSubmit"
            },
            ui: {
                form: ".purechat-form",
                userDisplayName: ".purechat-name-input",
                email: ".purechat-email-input",
                question: ".purechat-question-input",
                userDisplayNameError: ".please-entername",
                emailError: ".please-enteremail",
                questionError: ".please-enterquestion"
            },
            startChatSubmit: function(e) {
                e.preventDefault();
                var self = this;
                if (!this.submitDelay) {
                    this.submitDelay = !0, setTimeout(function() {
                        delete self.submitDelay;
                    }, 500);
                    var askForName = this.model.get("AskForName"), askForEmail = this.model.get("AskForEmail"), askForQuestion = this.model.get("AskForQuestion"), formType = Marionette.getOption(this, "FormType"), userDisplayName = "Visitor";
                    (askForName || "email" === formType) && (userDisplayName = this.ui.userDisplayName.val());
                    var userEmail = null;
                    (askForEmail || "email" === formType) && (userEmail = this.ui.email.val());
                    var initialQuestion = this.ui.question.val() || null;
                    if (this.ui.form.find(".please-entername, .please-enteremail, .please-enterquestion").hide(), 
                    "" === userDisplayName) return this.ui.userDisplayNameError.show(), !1;
                    if ("" === userEmail) return this.ui.emailError.show(), !1;
                    if (!initialQuestion && (askForQuestion || "email" === formType)) return this.questionError.show(), 
                    !1;
                    userDisplayName.length > MESSAGE_DISPLAY_WIDTH && (userDisplayName = userDisplayName.splice(0, MESSAGE_DISPLAY_WIDTH)), 
                    this.model.set("Name", userDisplayName), this.model.set("Email", userEmail), this.model.set("Question", initialQuestion), 
                    this.model.trigger("formSubmit", {
                        visitorName: app.Utils.escapeHtml(userDisplayName),
                        visitorEmail: app.Utils.escapeHtml(userEmail),
                        visitorQuestion: app.Utils.escapeHtml(initialQuestion)
                    });
                }
            }
        }), Views.EmailSent = Marionette.ItemView.extend({
            template: "EmailSent",
            className: ""
        }), Views.MessageView = Marionette.ItemView.extend({
            template: "MessageView",
            className: "purechat-message-wrapper purechat-clearfix",
            ui: {},
            onRender: function() {}
        }), Views.EmptyView = Marionette.ItemView.extend({
            template: "Empty",
            className: "empty-item",
            events: {}
        }), Views.MessageListView = Marionette.CompositeView.extend({
            template: "MessageList",
            className: "message-list-view",
            itemView: Views.MessageView,
            emptyView: Views.EmptyView,
            itemViewContainer: ".purechat-message-display",
            cannedResponseCollection: null,
            events: {
                "keydown textarea": "keyDown",
                "keyup textarea": "keyUp",
                "submit form": "postMessage",
                scrollToTop: function(e, args) {
                    this.scrollToTop(args);
                },
                "refreshAutoCompleteSource textarea": function() {
                    var self = this;
                    self.cannedResponseCollection = [], pcDashboard.CannedResponses.ResponseCollection.forEach(function(r) {
                        self.cannedResponseCollection.push({
                            label: r.get("Content"),
                            value: $("<div/>").html(r.get("Content")).text()
                        });
                    }), self.ui.textInput.trigger("disableAutoComplete").trigger("enableAutoComplete");
                },
                "disableAutoComplete textarea": function() {
                    this.ui.textInput.autocomplete("destroy");
                },
                "enableAutoComplete textarea": function() {
                    var self = this;
                    this.ui.textInput.autocomplete({
                        source: function(request, response) {
                            var term = (CurrentUser.get("cannedResponseSettings").get("MatchStartOfCannedResponse") ? "^" : "") + $.ui.autocomplete.escapeRegex(request.term), matcher = new RegExp(term, "im");
                            response($.grep(self.cannedResponseCollection, function(item) {
                                return matcher.test(item.label || item.value);
                            }));
                        },
                        delay: 100,
                        position: {
                            my: "bottom",
                            at: "top"
                        },
                        open: function() {
                            var autoWidget = $(this).autocomplete("widget");
                            $("<div />").addClass("arrow pure-chat-auto-complete-arrow").appendTo("body").position({
                                my: "center",
                                at: "left+32 bottom+5",
                                of: autoWidget
                            }).css({
                                zIndex: parseInt(autoWidget.css("z-index")) + 1
                            });
                        },
                        close: function() {
                            $(".pure-chat-auto-complete-arrow").remove();
                        }
                    }), this.ui.textInput.autocomplete("widget").addClass("canned-responses-autocomplete");
                }
            },
            ui: {
                textInput: "textarea",
                disableTextArea: ".disableTextArea",
                form: "form",
                displayContainer: ".purechat-message-display-container"
            },
            onRender: function() {
                if (this.options.settings.get("isInvisible") && (this.ui.textInput.attr("disabled", "disabled"), 
                this.ui.disableTextArea.show()), this.options.settings.get("isOperator")) {
                    if (this.cannedResponseCollection = pcDashboard.CannedResponses.ResponseCollection, 
                    0 == this.cannedResponseCollection.length) {
                        this.cannedResponseCollection = [];
                        var cannedResponses = this.options.settings.get("cannedResponses");
                        for (i in cannedResponses) if ("===separator===" !== cannedResponses[i].content) {
                            var next = {
                                label: cannedResponses[i].content,
                                value: $("<div/>").html(cannedResponses[i].content).text()
                            };
                            this.cannedResponseCollection.push(next);
                        }
                    }
                    var self = this, ac = window.$(this.ui.textInput).autocomplete({
                        source: function(request, response) {
                            var term = (CurrentUser.get("cannedResponseSettings").get("MatchStartOfCannedResponse") ? "^" : "") + $.ui.autocomplete.escapeRegex(request.term), matcher = new RegExp(term, "im"), matches = [];
                            if (self.cannedResponseCollection.models && self.cannedResponseCollection.models.length) {
                                var temp = [];
                                self.cannedResponseCollection.models.forEach(function(c) {
                                    temp.push({
                                        label: c.get("Content"),
                                        value: $("<div/>").html(c.get("Content")).text()
                                    });
                                }), matches = $.grep(temp, function(item) {
                                    return matcher.test(item.label || item.value);
                                });
                            } else matches = $.grep(self.cannedResponseCollection, function(item) {
                                return matcher.test(item.label || item.value);
                            });
                            response(matches);
                        },
                        delay: 100,
                        position: {
                            my: "bottom",
                            at: "top"
                        },
                        open: function() {
                            var autoWidget = $(this).autocomplete("widget");
                            $("<div />").addClass("arrow pure-chat-auto-complete-arrow").appendTo("body").position({
                                my: "center",
                                at: "left+32 bottom+5",
                                of: autoWidget
                            }).css({
                                zIndex: parseInt(autoWidget.css("z-index")) + 1
                            });
                        },
                        close: function() {
                            $(".pure-chat-auto-complete-arrow").remove();
                        }
                    });
                    ac.autocomplete("widget").addClass("canned-responses-autocomplete");
                }
            },
            scrollToTop: function(args) {
                var messageDisplay = this.$el.find(".purechat-message-display-container"), lastMessageHeight = messageDisplay.find(".purechat-message-wrapper:last .purechat-message-container").outerHeight(!0), messageDisplayScrollTop = messageDisplay.scrollTop(), messageDisplayInnerHeight = messageDisplay.innerHeight(), combinedHeight = messageDisplayScrollTop + messageDisplayInnerHeight + lastMessageHeight, scrollableHeight = messageDisplay[0].scrollHeight;
                args && args.forceBottom || combinedHeight >= scrollableHeight ? (messageDisplay.scrollTop(this.$el.find(".purechat-message-display").height()), 
                this.model.set("scrolledToBottom", !0)) : this.model.set("scrolledToBottom", !1);
            },
            keyDown: function(e) {
                return 13 === e.keyCode ? e.ctrlKey ? (this.ui.textInput.val(this.ui.textInput.val() + "\n"), 
                !0) : (this.triggerMethod("typingChange", !1), this.activity = !1, this.ui.form.submit(), 
                !1) : !0;
            },
            keyUp: function() {
                var self = this;
                self.typingTimeout && (clearTimeout(self.typingTimeout), self.typingTimeout = null), 
                this.typingTimeout = setTimeout(function() {
                    try {
                        "" != self.ui.textInput.val() ? (self.activity = !0, self.triggerMethod("typingChange", !0)) : (self.triggerMethod("typingChange", !1), 
                        self.activity = !1);
                    } catch (ex) {}
                }, 2e3), "" != self.ui.textInput.val() && 1 != self.activity && (self.triggerMethod("typingChange", !0), 
                self.activity = !0);
            },
            postMessage: function(e) {
                e.stopPropagation(), e.preventDefault();
                var newMessage = this.ui.textInput.val();
                this.triggerMethod("newMessage", newMessage), this.ui.textInput.val("");
                try {
                    this.ui.textInput.autocomplete("close");
                } catch (ex) {}
            },
            typing: function(userId, userDisplayName, isTyping) {
                var $container = this.$el.find(".purechat-message-display"), statusDiv = $container.find("#purechat-user-activity-" + userId);
                0 === statusDiv.length && (statusDiv = $('<p class="purechat-message-pinned" id="purechat-user-activity-' + userId + '"></p>'), 
                $container.append(statusDiv)), isTyping ? statusDiv.html(this.getResource("chat_typing", {
                    displayName: userDisplayName
                }) + '<div class="purechat-typing">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>') : statusDiv.remove();
            },
            appendBuffer: function(compositeView, buffer) {
                var $container = this.getItemViewContainer(compositeView);
                $container.append(buffer);
            },
            appendHtml: function(compositeView, itemView) {
                if (compositeView.isBuffering) compositeView.elBuffer.appendChild(itemView.el); else {
                    var $container = this.getItemViewContainer(compositeView), last = $container.find(".purechat-message-wrapper").last();
                    last.length ? last.after(itemView.el) : $container.append(itemView.el);
                }
            }
        }), Views.ClosedMessage = Marionette.ItemView.extend({
            getTemplate: function() {
                return this.options.settings.get("isOperator") ? "ClosedMessageOperator" : "ClosedMessage";
            },
            className: "purechat-closedmessage-container",
            ui: {
                ratingThanks: ".purechat-rating-thanks"
            },
            templateHelpers: function() {
                return this.options.settings;
            },
            events: {
                "click .purechat-thumbs-up": function(e) {
                    $(e.target).addClass("purechat-thumbs-selected"), this.rateChat(!0);
                },
                "click .purechat-thumbs-down": function(e) {
                    $(e.target).addClass("purechat-thumbs-selected"), this.rateChat(!1);
                },
                "click button.ban-ip-operator-button": function(e) {
                    var sender = global$(e.target);
                    global$('.operatorBanIPAddress[data-ipaddressid="' + sender.attr("data-ipaddressid") + '"]').modal("show"), 
                    global$("#BanIP-" + sender.attr("data-ipaddressid")).off("click.BanIPAddressFromOperator").on("click.BanIPAddressFromOperator", function() {
                        global$(document).trigger("ConfirmBanIPAddressFromOperator", [ global$(this), sender ]);
                    });
                },
                "click button.email-transcript-operator-button": function(e) {
                    var sender = global$(e.target), modal = global$('.operatorEmailTranscript[data-transcriptid="' + sender.attr("data-transcriptid") + '"]');
                    modal.modal("show"), modal.find(".send-email-operator-button").off("click.SendEmailFromOperator").on("click.SendEmailFromOperator", function() {
                        global$(document).trigger("SendEmailFromOperatorChat", [ global$("#EmailTranscript-" + sender.attr("data-transcriptid")) ]);
                    });
                }
            },
            rateChat: function(up) {
                this.rating || (this.rating = up ? 1 : 0, this.trigger("chat:rated", this.rating)), 
                this.$el.find(".purechat-thumbs-selectable:not(.purechat-thumbs-selected)").remove(), 
                this.ui.ratingThanks.text(this.getResource("closed_ratingThanks"));
            }
        }), Views.ChatConnectingView = Marionette.ItemView.extend({
            template: "ChatConnecting",
            className: "purechat-enterinfo-container",
            ui: {
                spinner: ".spinnerContainer",
                greeting: ".greeting",
                connecting: ".connecting"
            },
            onRender: function() {
                var spinnerOpts = {
                    length: 20,
                    radius: 20,
                    width: 10,
                    color: "#888"
                }, spinner = new purechatSpinner.Spinner(spinnerOpts).spin(), $spinner = $(spinner.el);
                $spinner.css({
                    left: "50%",
                    top: "50%"
                }), this.ui.spinner.append($spinner);
            },
            showErrorMessage: function(error) {
                this.ui.spinner.hide(), this.ui.greeting.hide(), this.ui.connecting.hide(), this.$el.append("<p>" + error + "</p>");
            }
        });
    }, purechatApp.Models), purechatApp.templates = templates;
    var pc_ = _.noConflict(), backbone = Backbone.noConflict(), defaultUiVisiblity = {
        popoutButton: !1,
        closeButton: !1,
        restartButton: !1,
        removeWidgetButton: !1,
        requeueButton: !1,
        leaveButton: !1,
        cannedResponsesButton: !1,
        exportToOntimeButton: !1
    }, DEFAULT_AVAIL_TIMEOUT = 2e4, DEFAULT_UNAVAIL_TIMEOUT = 6e5;
    PCWidgetState = Marionette.Controller.extend({
        initialize: function() {
            this.stateSettings = this.stateSettings || {}, this.stateSettings.UiVisiblity = this.stateSettings.UiVisiblity || {}, 
            pc_.defaults(this.stateSettings.UiVisiblity, defaultUiVisiblity);
        },
        setChatModel: function(model) {
            this.chatModel = model;
        },
        getChatModel: function() {
            return this.chatModel;
        },
        setWidgetView: function(view) {
            this.widgetView = view, this.listenTo(this.widgetView, "all");
        },
        getWidgetView: function() {
            return this.widgetView;
        },
        setWidgetSettings: function(settings) {
            this.settings = settings;
        },
        getWidgetSettings: function() {
            return this.settings;
        },
        setResources: function(resources) {
            this.resources = resources;
        },
        getResources: function() {
            return this.resources;
        },
        setDataController: function(dc) {
            this.dc = dc;
        },
        getDataController: function() {
            return this.dc;
        },
        setViewController: function(vc) {
            this.vc = vc;
        },
        getViewController: function() {
            return this.vc;
        },
        getResource: function(key, data) {
            return this.resources.getResource(key, data);
        },
        disable: function() {
            this.getDataController().connectionInfo.set("disabled", !0), this.getWidgetView().$el.hide();
        },
        enable: function() {
            this.getDataController().connectionInfo.set("disabled", !1), this.getWidgetView().$el.show();
        },
        onEnter: function() {
            if (this.listenTo(this.getWidgetView(), "all", function(event, parms) {
                var self = this;
                parms && parms.confirmation ? self.getViewController().showConfirmationDialog(parms.confirmation, parms.title).done(function() {
                    self.triggerMethod.call(self, event, parms);
                }) : this.triggerMethod.apply(this, arguments);
            }), this.stateSettings && this.stateSettings.UiVisiblity) {
                var view = this.getWidgetView();
                for (var next in this.stateSettings.UiVisiblity) view.ui[next] && view.ui[next].toggle(this.stateSettings.UiVisiblity[next]);
            }
        },
        onClose: function() {
            this.stopListening(this.widgetView, "all"), this.stopAvailabilityPolling();
        },
        testAvailability: function() {
            var t = this;
            t.getViewController().pageActivity || t.lastCheck && new Date() - t.lastCheck > 12e4 ? (t.lastCheck = new Date(), 
            t.getDataController().checkChatAvailable().done(function(result) {
                t.testStatusTimeOutId = clearTimeout(t.testStatusTimeOutId), t.checkAvailTimeout = result.available ? DEFAULT_AVAIL_TIMEOUT : DEFAULT_UNAVAIL_TIMEOUT, 
                result.available ? t.testStatusTimeOutId = setTimeout(function() {
                    t.testAvailability();
                }, t.checkAvailTimeout) : "AccountActivity" !== result.reason ? t.testStatusTimeOutId = setTimeout(function() {
                    t.testAvailability();
                }, t.checkAvailTimeout) : t.stopAvailabilityPolling(), t.getChatModel().set("operatorsAvailable", result.available);
            })) : (t.checkAvailTimeout = DEFAULT_AVAIL_TIMEOUT, t.testStatusTimeOutId = clearTimeout(t.testStatusTimeOutId), 
            t.testStatusTimeOutId = setTimeout(function() {
                t.testAvailability();
            }, 1500));
        },
        startAvailabilityPolling: function() {
            var t = this;
            t.checkAvailTimeout = DEFAULT_AVAIL_TIMEOUT, this.TestingStatus || (this.testStatusTimeOutId = setTimeout(function() {
                t.testAvailability();
            }, t.checkAvailTimeout)), this.TestingStatus = !0;
        },
        stopAvailabilityPolling: function() {
            this.TestingStatus = !1, this.testStatusTimeOutId = clearTimeout(this.testStatusTimeOutId);
        },
        onPopOutChat: function() {
            var settings = this.getWidgetSettings(), chatModel = this.getChatModel(), dataController = this.getDataController();
            this.getChatModel().set("poppedOut", !0), this.disable(), dataController.connectionInfo.persistLocalStorage(), 
            window.openedWindow = window.open(this.settings.get("pureServerUrl") + "/VisitorWidget/ChatWindow" + "?widgetId=" + settings.get("widgetId") + "&userId=" + dataController.connectionInfo.get("userId") + "&displayName=" + dataController.connectionInfo.get("visitorName") + "&authToken=" + dataController.connectionInfo.get("authToken") + "&roomId=" + dataController.connectionInfo.get("roomId") + "&chatId=" + dataController.connectionInfo.get("chatId") + "&origin=" + encodeURIComponent(chatModel.get("origin")), "purechatwindow", "menubar=no, location=no, resizable=yes, scrollbars=no, status=no, width=480, height=640");
        }
    }), purechatApp.module("Controllers.States", function(States, app) {
        States.PCStateInitializing = PCWidgetState.extend({
            stateSettings: {
                UiVisiblity: {}
            },
            onEnter: function() {
                PCWidgetState.prototype.onEnter.apply(this, arguments), this.getWidgetView().setTitle(this.getResource("title_initial_open"));
                var inRoom = this.getDataController().checkInRoom();
                inRoom ? this.getChatModel().set("state", app.Constants.WidgetStates.Activating) : this.getChatModel().set("state", app.Constants.WidgetStates.Inactive);
            }
        });
    }, purechatApp.Models), purechatApp.module("Controllers.States", function(States, app) {
        States.PCStateInactive = PCWidgetState.extend({
            stateSettings: {
                UiVisiblity: {}
            },
            onEnter: function() {
                PCWidgetState.prototype.onEnter.apply(this, arguments);
                var self = this, widgetSettings = self.getWidgetSettings(), doneFnc = function(result) {
                    if (result.available || ("WidgetDisabled" == result.reason || "ChatQuotaExceeded" == result.reason) && self.getWidgetSettings().set("UnavailableBehavior", 1), 
                    self.getChatModel().set("operatorsAvailable", result.available), result.available) {
                        self.getWidgetView().onShow(), self.getWidgetView().setTitle(self.getResource("title_initial"));
                        var model = new backbone.Model({
                            AskForName: self.getWidgetSettings().get("AskForName"),
                            AskForEmail: self.getWidgetSettings().get("AskForEmail"),
                            AskForQuestion: self.getWidgetSettings().get("AskForQuestion")
                        });
                        self.chatForm = new purechatApp.Views.StartChatForm({
                            rm: self.getResources(),
                            model: model,
                            settings: self.options
                        }), model.on("formSubmit", function(data) {
                            self.submittingChat || (self.submittingChat = !0, data.origin = self.chatModel.get("origin"), 
                            self.getDataController().startChat(data).done(function(chatConnectionInfo) {
                                purechatApp.Utils.GaEvent(widgetSettings, "GaTrackingChat", "GAChatEvent"), self.getWidgetView().$el.find(".purechat-init-form").find(".general-error").text("").hide(), 
                                self.status.chatInfo = chatConnectionInfo, self.status.initialData = data, self.getChatModel().set("visitorName", data.visitorName), 
                                self.getChatModel().set("visitorEmail", data.visitorEmail), self.getChatModel().set("visitorQuestion", data.visitorQuestion), 
                                self.getChatModel().set("roomId", chatConnectionInfo.get("roomId")), self.getChatModel().set("userId", chatConnectionInfo.get("userId")), 
                                self.getChatModel().set("authToken", chatConnectionInfo.get("authToken")), self.getChatModel().set("chatId", chatConnectionInfo.get("chatId")), 
                                self.getChatModel().set("state", app.Constants.WidgetStates.Chatting), self.getDataController().connectionInfo.persistLocalStorage();
                            }).fail(function(message) {
                                self.log("Error", "Unable to start chat. WidgetId: " + self.getWidgetSettings().get("widgetId") + ", Message:" + (message || "None"));
                                var widgetView = self.getWidgetView();
                                widgetView.$el.find(".purechat-init-form").find(".general-error").text("Unable to start chat. Please try again").show();
                            }).always(function() {
                                self.submittingChat = !1;
                            }));
                        }), self.getWidgetView().content.show(self.chatForm), self.listenTo(self.getChatModel(), "change:operatorsAvailable", function(model, available) {
                            available || self.getChatModel().set("state", app.Constants.WidgetStates.Unavailable);
                        }), (self.widgetView.model.get("expanded") || 0 == self.getWidgetSettings().get("UnavailableBehavior")) && (self.widgetView.model.get("expanded") && self.getWidgetView().setTitle(self.getResource("title_initial_open")), 
                        window._pcDisableAvailabilityPings || self.startAvailabilityPolling());
                    } else self.getChatModel().set("state", app.Constants.WidgetStates.Unavailable);
                };
                this.settings.get("IPIsBanned") ? doneFnc({
                    available: !this.settings.get("IPIsBanned"),
                    reason: "NoOperators"
                }) : self.getDataController().checkChatAvailable().done(doneFnc);
            },
            onExpanded: function() {
                this.getWidgetView().setTitle(this.getResource("title_initial_open")), this.startAvailabilityPolling();
            },
            onCollapsed: function() {
                this.getWidgetView().setTitle(this.getResource("title_initial")), 0 != this.getWidgetSettings().get("UnavailableBehavior") && this.stopAvailabilityPolling();
            }
        });
    }, purechatApp.Models), purechatApp.module("Controllers.States", function(States, app) {
        States.PCStateActivating = PCWidgetState.extend({
            stateSettings: {
                UiVisiblity: {}
            },
            onEnter: function() {
                var self = this;
                PCWidgetState.prototype.onEnter.apply(this, arguments);
                var m = new backbone.Model({
                    userName: self.getChatModel().get("visitorName")
                }), connectingView = new purechatApp.Views.ChatConnectingView({
                    rm: this.getResources(),
                    model: m
                });
                this.getWidgetView().content.show(connectingView), this.getDataController().connectToChatServer().done(function() {
                    self.getChatModel().set("state", app.Constants.WidgetStates.Chatting);
                }).fail(function() {
                    self.getDataController().connectionInfo.clearLocalStorage(), self.getChatModel().set("state", app.Constants.WidgetStates.Inactive);
                });
            }
        });
    }, purechatApp.Models), purechatApp.module("Controllers.States", function(States, app, Backbone, Marionette, $) {
        States.PCStateChatting = PCWidgetState.extend({
            stateSettings: {
                UiVisiblity: {
                    popoutButton: !0,
                    closeButton: !0,
                    requeueButton: !0,
                    cannedResponsesButton: !0
                }
            },
            initialize: function() {
                PCWidgetState.prototype.initialize.apply(this, arguments), this.typing = {}, this.isUserAlone = !0, 
                this.mobileAnimationInterval = null;
            },
            onEnter: function() {
                PCWidgetState.prototype.onEnter.apply(this, arguments);
                var self = this;
                self.getWidgetView().$el.removeClass("purechat-button-hidden");
                var m = new backbone.Model({
                    userName: self.getChatModel().get("visitorName")
                }), connectingView = new purechatApp.Views.ChatConnectingView({
                    rm: this.getResources(),
                    model: m
                });
                self.messageView = new purechatApp.Views.MessageListView({
                    rm: this.getResources(),
                    model: self.getChatModel(),
                    collection: self.getChatModel().get("messages"),
                    settings: self.getWidgetSettings()
                }), self.messageView.render(), self.getWidgetView().content.show(connectingView), 
                self.getDataController().connectToChatServer(this).done(function() {
                    self.chatModel.get("visitorQuestion") && self.getDataController().newMessage(self.chatModel.get("visitorQuestion")), 
                    self.chatModel.get("isOperator") || "undefined" != typeof self.chatModel.get("operators") && 0 != self.chatModel.get("operators").length || self.chatModel.get("messages").add({
                        type: "note",
                        message: self.getResource("chat_startedMessage")
                    }), self.messageView.on("newMessage", function(message) {
                        self.getDataController().newMessage(message);
                    }), self.listenTo(self.messageView, "typingChange", function(typing) {
                        self.getDataController().setTypingIndicator(typing);
                    }), self.getWidgetView().content.show(self.messageView), self.getWidgetView().onShow(), 
                    self.getWidgetView().focusInput(), self.getDataController().sendRoomHistory(), self.getViewController().trigger("stateChanged", app.Constants.WidgetStates.Chatting), 
                    self.settings.get("RequestFromMobileDevice") && self.settings.get("AllowWidgetOnMobile") && ($(window).trigger("resize.ResizeChatContent"), 
                    self.getWidgetView().$el.find(".purechat-send-form-message").off("blur.ResizeWindow").on("blur.ResizeWindow", function() {
                        $(window).trigger("resize.ResizeChatContent");
                    }), self.options.get("isDirectAccess") && ($(".direct-container-header").css("display", "none"), 
                    "function" == typeof resizeDirectAccessContainer && resizeDirectAccessContainer()));
                }).fail(function() {
                    self.getDataController().connectionInfo.clearLocalStorage(), self.getChatModel().set("state", app.Constants.WidgetStates.Inactive);
                });
            },
            onExit: function() {
                this.unbindEvents && this.unbindEvents();
            },
            onCloseChat: function() {
                var self = this, onCloseFnc = function(context) {
                    context.getDataController().closeChat().done(function() {
                        context.getChatModel().set("state", app.Constants.WidgetStates.Closed);
                    }).fail(function() {
                        alert("fail");
                    });
                }, confirmModal = self.getWidgetView().$el.find(".purechat-confirm-close-modal"), modalOverlay = self.getWidgetView().$el.find(".purchat-confirm-close-modal-overlay");
                self.options.get("RequestFromMobileDevice") && self.options.get("AllowWidgetOnMobile") ? (confirmModal.css({
                    display: "block"
                }), modalOverlay.css({
                    display: "block"
                }), confirmModal.find(".modal-button-bar .btn").off("click.PerformModalAction").on("click.PerformModalAction", function() {
                    var sender = $(this);
                    sender.hasClass("close-chat") && onCloseFnc(self), confirmModal.css({
                        display: "none"
                    }), modalOverlay.css({
                        display: "none"
                    });
                })) : onCloseFnc(self);
            },
            onExpanded: function() {
                this.messageView.scrollToTop();
            },
            flashMobileNotificationIcon: function() {
                var self = this;
                if (this.settings.get("RequestFromMobileDevice") && this.settings.get("AllowWidgetOnMobile") && "number" != typeof this.mobileAnimationInterval) {
                    var elem = this.getWidgetView().$el, triggerElems = elem.hasClass("purechat-widget-collapsed") && elem.find(".purechat-expanded").is(":visible") ? elem : [];
                    if (console.log(triggerElems), triggerElems.length > 0) {
                        var visibleIcon = elem.find(".purechat-title-image-out-of-way-hilight").filter(":visible");
                        visibleIcon.addClass("flash");
                        var isFlashing = !0;
                        this.mobileAnimationInterval = setInterval(function() {
                            isFlashing ? (visibleIcon.removeClass("flash"), isFlashing = !1) : (visibleIcon.addClass("flash"), 
                            isFlashing = !0);
                        }, 1e3), triggerElems.off("click.StopNotification").on("click.StopNotification", function(e) {
                            var sender = $(e.currentTarget);
                            self.mobileAnimationInterval = clearInterval(self.mobileAnimationInterval), visibleIcon.removeClass("flash"), 
                            triggerElems.off("click.StopNotification"), sender.trigger("click");
                        });
                    }
                }
            },
            onMessage: function(userId, userDisplayName, roomId, roomDisplayName, time, message, isHistory, timeElapsed, protocolVersion, emailMD5Hash, fromOperator) {
                var gravatarHash = this.settings.get("gravatarHash");
                if (this.chatModel.get("isOperator") && notifier.notify("New message!"), null !== message && "string" == typeof message) {
                    var date = new Date();
                    if (date.setTime(1e3 * time), "undefined" != typeof CurrentUser && null !== CurrentUser) {
                        var isInDaylightSavings = CurrentUser.get("isInDaylightSavings"), utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                        date = new Date(utcDate.getTime() + 6e4 * (CurrentUser.get("accountUtcOffset") + (isInDaylightSavings ? 60 : 0)));
                    }
                    this.chatModel.get("messages").add({
                        type: "message",
                        message: message,
                        userName: userDisplayName,
                        myMessage: userId == this.chatModel.get("userId"),
                        time: date.toHourMinuteString(),
                        senderGravatarHash: emailMD5Hash,
                        gravatarHash: gravatarHash,
                        fromOperator: fromOperator,
                        visitorGravatarHash: this.settings.get("room") && this.settings.get("room").visitorGravatarHash ? this.settings.get("room").visitorGravatarHash : "",
                        rootUrl: this.chatModel.get("cdnServerUrl")
                    });
                }
                this.chatModel.get("userId") != userId && 0 == this.chatModel.get("isOperator") && 1 == this.chatModel.get("isWidget") && 0 == this.chatModel.get("expanded") && 0 == isHistory && this.getWidgetView().flashNotification(message), 
                !this.isUserAlone || this.chatModel.get("isOperator") || isHistory || message == this.chatModel.get("Question") || (this.chatModel.get("messages").add({
                    type: "note",
                    message: this.getResource("chat_noOperatorMessage")
                }), this.messageView.scrollToTop({
                    forceBottom: !0
                })), this.messageView.scrollToTop(), $("body").trigger("ChatMessageAdded"), this.flashMobileNotificationIcon();
            },
            onTyping: function(userId, userDisplayName, roomId, roomDisplayName, isTyping) {
                this.messageView.typing(userId, userDisplayName, isTyping), this.messageView.scrollToTop();
            },
            onRoomDestroyed: function() {
                this.chatModel.set("state", app.Constants.WidgetStates.Closed);
            },
            onJoined: function(userId, userDisplayName, roomId, roomDisplayName, time) {
                if (this.chatModel.get("isOperator") || userId != this.chatModel.get("userId")) {
                    var date = new Date();
                    date.setTime(1e3 * time), this.chatModel.get("messages").add({
                        type: "note",
                        important: !0,
                        message: this.getResource("chat_joinMessage", {
                            displayName: userDisplayName
                        }),
                        time: date.toHourMinuteString()
                    });
                }
                userId != this.chatModel.get("userId") && (this.messageView.scrollToTop({
                    forceBottom: !0
                }), this.isUserAlone = !1, this.chatModel.get("operators").add({
                    userDisplayName: userDisplayName,
                    userId: userId
                }), this.chatModel.get("operators").length > 0 ? this.chatModel.get("isOperator") || this.getWidgetView().setTitle(this.getResource("chat_nowChattingWith", {
                    chatUserNames: this.chatModel.chatUserNames()
                })) : this.isUserAlone = !0), this.messageView.scrollToTop({
                    forceBottom: !0
                });
            },
            onLeft: function(userId, userDisplayName, roomId, roomDisplayName, time) {
                if (this.chatModel.get("isOperator") || userId != this.chatModel.get("userId")) {
                    var date = new Date();
                    date.setTime(1e3 * time), this.chatModel.get("messages").add({
                        type: "note",
                        message: this.getResource("chat_leftMessage", {
                            displayName: userDisplayName
                        }),
                        time: date.toHourMinuteString()
                    });
                }
                userId != this.chatModel.get("userId") && (this.messageView.scrollToTop(), this.chatModel.get("operators").remove(userId), 
                this.chatModel.get("isOperator") || (this.chatModel.chatUserNames().length > 0 ? this.getWidgetView().setTitle(this.getResource("chat_nowChattingWith", {
                    chatUserNames: this.chatModel.chatUserNames()
                })) : this.getWidgetView().setTitle(this.getResource("title_initial"))));
            }
        });
    }, purechatApp.Models), purechatApp.module("Controllers.States", function(States, app, Backbone, Marionette, $) {
        States.PCStateClosed = PCWidgetState.extend({
            stateSettings: {
                UiVisiblity: {
                    restartButton: !0,
                    removeWidgetButton: !0
                }
            },
            handleRoomClose: function(response, room) {
                var self = this, visitorIPAddress = "undefined" != typeof response && null !== response && "string" == typeof response.visitorIPAddress ? response.visitorIPAddress : "", visitorIPAddressId = "undefined" != typeof response && null !== response && response.Id ? response.Id : -1, roomName = "undefined" != typeof room && null !== room && "string" == typeof room.name ? room.name : "", visitorReferer = "undefined" != typeof room && null !== room && "string" === room.visitorReferer ? room.visitorReferer : "", roomId = "undefined" != typeof room && null !== room && "undefined" != typeof room.id ? room.id : "";
                self.options.get("isOperator") && room.roomType && room.roomType == PureChat.enums.roomType.visitor && $.ajax({
                    url: "/OnTime/WidgetIsEnabled",
                    type: "GET",
                    data: {
                        chatId: self.getDataController().connectionInfo.get("roomId")
                    }
                }).done(function(result) {
                    result.IsEnabled && self.getWidgetView().ui.exportToOntimeButton.show();
                }), self.getWidgetView().$el.removeClass("purechat-button-hidden"), self.getWidgetView().onShow(), 
                self.getDataController().connectionInfo.clearLocalStorage(), self.getWidgetView().setTitle(self.getResource("title_chatClosed"));
                var m = new backbone.Model({
                    isOperator: self.chatModel.get("isOperator"),
                    roomId: roomId,
                    visitorIPAddress: visitorIPAddress,
                    visitorIPAddressId: visitorIPAddressId,
                    visitorName: roomName,
                    visitorReferrer: visitorReferer
                });
                self.chatModel.get("isOperator") ? m.set({
                    GoogId: "",
                    GaTrackingTab: !1,
                    GaTrackingChat: !1,
                    GaTrackingThumbs: !1,
                    GAUpThumbEvent: !1,
                    GADownThumbEvent: !1,
                    GAEventCategory: !1,
                    UsingGa: !1
                }) : m.set({
                    GoogId: self.getWidgetSettings().get("GoogId"),
                    GaTrackingTab: self.getWidgetSettings().get("GaTrackingTab"),
                    GaTrackingChat: self.getWidgetSettings().get("GaTrackingChat"),
                    GaTrackingThumbs: self.getWidgetSettings().get("GaTrackingThumbs"),
                    GAUpThumbEvent: self.getWidgetSettings().get("GAUpThumbEvent"),
                    GADownThumbEvent: self.getWidgetSettings().get("GADownThumbEvent"),
                    GAEventCategory: self.getWidgetSettings().get("GAEventCategory"),
                    UsingGa: self.getWidgetSettings().get("UsingGa"),
                    AskForRating: self.getWidgetSettings().get("AskForRating"),
                    CtaButton: self.getWidgetSettings().get("CtaButton")
                });
                var closeMessage = new purechatApp.Views.ClosedMessage({
                    rm: self.getResources(),
                    model: m,
                    settings: self.options
                });
                self.listenTo(closeMessage, "chat:rated", function(up) {
                    self.getDataController().rateChat(up), up ? purechatApp.Utils.GaEvent(self.getWidgetSettings(), "GaTrackingThumbs", "GAUpThumbEvent") : purechatApp.Utils.GaEvent(self.getWidgetSettings(), "GaTrackingThumbs", "GADownThumbEvent");
                }), self.getWidgetView().content.show(closeMessage), self.options.get("isDirectAccess") && ($(".direct-container-header").css("display", "block"), 
                "function" == typeof resizeDirectAccessContainer && resizeDirectAccessContainer());
            },
            onEnter: function() {
                PCWidgetState.prototype.onEnter.apply(this, arguments);
                var self = this, room = this.options.get("room") || {};
                self.chatModel.get("isOperator") ? isNaN(parseInt(room.id)) ? self.handleRoomClose.call(self, null, room) : $.ajax({
                    type: "get",
                    dataType: "json",
                    url: "/Widget/GetVisitorIPAddress",
                    data: {
                        chatId: room.id || -1
                    }
                }).done(function(response) {
                    self.handleRoomClose.call(self, response, room);
                }) : self.handleRoomClose.call(self, null, null);
            },
            onExportToOntime: function() {
                pcDashboard.execute("ontimeexport:show", this.getDataController().connectionInfo.get("roomId"));
            },
            onRestartChat: function() {
                var self = this;
                self.getDataController().restartChat().done(function() {
                    self.getChatModel(), self.getChatModel().get("operators").reset(), self.getChatModel().get("messages").reset(), 
                    self.getDataController().connectionInfo.clearLocalStorage(), self.getChatModel().set("state", app.Constants.WidgetStates.Inactive);
                }).fail(function() {
                    alert("fail");
                });
            }
        });
    }, purechatApp.Models), purechatApp.module("Controllers.States", function(States, app, Backbone, Marionette, $) {
        States.PCStateUnavailable = PCWidgetState.extend({
            onEnter: function() {
                PCWidgetState.prototype.onEnter.apply(this, arguments);
                var self = this, behavior = this.settings.get("IPIsBanned") ? 1 : self.options.get("UnavailableBehavior");
                if (0 == behavior) self.getWidgetView().onHide(); else if (1 == behavior) self.getWidgetView().onShow(), 
                self.widgetView.model.get("expanded") ? self.getWidgetView().setTitle(this.getResource("title_noOperators")) : self.getWidgetView().setTitle(self.getResource("title_initial")), 
                $(self.getWidgetView().content.el).html('<div class="purechat-closedmessage-container">' + app.Utils.linkify(this.getResource("error_noOperators")) + "</div>"); else {
                    self.getWidgetView().onShow(), self.widgetView.model.get("expanded") ? self.getWidgetView().setTitle(this.getResource("title_noOperators")) : self.getWidgetView().setTitle(self.getResource("title_initial"));
                    var model = new backbone.Model({
                        AskForName: !0,
                        AskForEmail: !0,
                        AskForQuestion: !0,
                        EmailForm: !0
                    });
                    model.on("formSubmit", function(data) {
                        var form = $(self.getWidgetView().el).find(".purechat-form.purechat-email-form");
                        self.getDataController().submitEmailForm(data).done(function(result) {
                            if (result.success) {
                                var emailSent = new purechatApp.Views.EmailSent({
                                    rm: self.getResources(),
                                    model: model
                                });
                                self.getWidgetView().content.show(emailSent), self.getWidgetView().ui.restartButton.show(), 
                                self.getWidgetView().$el.find(".btn-restart").on("click.RestartChat", function(e) {
                                    self.restartChat.call(self, e);
                                });
                            } else form.find(".purechat-email-error").show();
                        }).fail(function() {});
                    });
                    var emailForm = new purechatApp.Views.StartChatForm({
                        rm: self.getResources(),
                        model: model,
                        settings: this.options
                    });
                    self.getWidgetView().content.show(emailForm);
                }
                self.listenTo(self.getChatModel(), "change:operatorsAvailable", function(model, available) {
                    available && self.getChatModel().set("state", app.Constants.WidgetStates.Inactive);
                });
                var isHideWidget = 0 == self.getWidgetSettings().get("UnavailableBehavior");
                (self.widgetView.model.get("expanded") && !isHideWidget || isHideWidget && self.getChatModel().get("operatorsAvailable")) && (window._pcDisableAvailabilityPings || self.startAvailabilityPolling());
            },
            onExpanded: function() {
                this.getWidgetView().setTitle(this.getResource("title_noOperators")), this.startAvailabilityPolling();
            },
            onCollapsed: function() {
                this.getWidgetView().setTitle(this.getResource("title_initial")), 0 != this.getWidgetSettings().get("UnavailableBehavior") && this.stopAvailabilityPolling();
            },
            restartChat: function(e) {
                e.stopPropagation();
                var sender = $(e.currentTarget), self = this;
                sender.off("click.RestartChat"), self.getDataController().restartChat().done(function() {
                    self.getChatModel(), self.getChatModel().get("operators").reset(), self.getChatModel().get("messages").reset(), 
                    self.getDataController().connectionInfo.clearLocalStorage(), self.getChatModel().set("state", app.Constants.WidgetStates.Inactive);
                }).fail(function() {
                    throw new Error("Failed to send email. Please try again!");
                });
            }
        });
    }, purechatApp.Models), purechatApp.module("Controllers", function(Controllers, app, Backbone, Marionette, $) {
        var BaseDataController = Marionette.Controller.extend({
            initialize: function() {
                this.connectionInfo = new purechatApp.Models.ChatConnection(), this.options.connectionInfo && this.connectionInfo.set(this.options.connectionInfo);
            },
            loadWidgetSettings: function() {
                var self = this, d = $.Deferred();
                return this.getWidgetSettings().done(function(settings) {
                    self.widgetSettings = settings, d.resolve();
                }).fail(function() {
                    d.reject();
                }), d;
            }
        }), TestDataController = BaseDataController.extend({
            initialize: function() {
                BaseDataController.prototype.initialize.apply(this, arguments), this.chatAvailable = !0;
            },
            startChat: function() {
                return this.connectionInfo.set("userId", 1), this.connectionInfo.set("authToken", "adsfasfdsdf"), 
                this.connectionInfo.set("roomId", 1), $.Deferred().resolve(this.connectionInfo);
            },
            closeChat: function() {
                return $.Deferred().resolve();
            },
            restartChat: function() {
                return $.Deferred().resolve();
            },
            connectToChatServer: function(handler) {
                var d = $.Deferred();
                return this.handler = handler, setTimeout(function() {
                    d.resolve();
                }, 2e3), d;
            },
            sendRoomHistory: function() {},
            checkInRoom: function() {
                return !1;
            },
            newMessage: function(message) {
                Marionette.getOption(this, "chatModel").get("messages").add({
                    type: "message",
                    message: message,
                    myMessage: !0,
                    userName: "Chad"
                });
            },
            checkChatAvailable: function() {
                var self = this, d = $.Deferred();
                return setTimeout(function() {
                    d.resolve({
                        available: self.chatAvailable
                    });
                }, 1), d;
            },
            getWidgetSettings: function() {
                var widgetSettings = {
                    Version: 27288,
                    WidgetWording: {
                        Id: 721,
                        AccountId: 0,
                        Title: "Chat with us test."
                    },
                    AccountId: 1,
                    Color: "000000",
                    Position: 2,
                    WidgetType: 1,
                    UnavailableBehavior: 2,
                    AskForRating: !0,
                    AskForName: !0,
                    AskForEmail: !1,
                    AskForQuestion: !0,
                    ForcePopout: !1,
                    StringResources: {
                        chat_identifyFailed: "Failed to connect to PureChat!",
                        greeting: "Hello",
                        closed_message: "Thanks for chatting. Please rate how you feel about the chat session:",
                        closed_opMessage: "This chat has ended.<br/>What would you like to do?",
                        chat_joinMessage: "{displayName} has joined the chat!",
                        placeholder_email: "Email",
                        chat_connecting: "Connecting you to the chat now...",
                        chat_nowChattingWith: "Chatting with {chatUserNames}.",
                        label_pressToBegin: "Press the button below to begin!",
                        error_enterEmail: "Please enter an email address.",
                        closed_downloadTrans: "Download chat transcript",
                        title_noOperators: "No Operators Available",
                        error_enterQuestion: "Please enter a question",
                        noOperators_email_message: "There are currently no operators available, but feel free to send us an email!",
                        poweredby: "Powered by",
                        chat_noOperatorMessage: "An operator has not yet connected. Don't worry, an operator will be by shortly! When they connect, they'll see all the messages you've sent so far.",
                        chat_typing: "{displayName} is typing",
                        title_chatClosed: "Chat Closed",
                        closed_ratingThanks: "Thanks for your rating!",
                        placeholder_name: "Name",
                        title_initial: "Chat with us test.",
                        placeholder_question: "Enter your Question",
                        label_initial_label: "Introductory Text",
                        title_initial_label: "Widget Title",
                        error_noOperators: "Sorry, no operators are currently available",
                        label_initial: "Enter your info below to begin.",
                        error_noOperators_label: "No Operators Available",
                        button_startChat: "Send Chat Request",
                        label_initial_helptext: "This is the introductory text that will be displayed after the user clicks on the PureChat widget.",
                        button_sendEmail: "Send Email",
                        chat_startedMessage: "An operator will be right with you! Feel free to hide this box and navigate around the site.",
                        chat_leftMessage: "{displayName} has left the chat!",
                        chat_connectionFailed: "Failed to connect to PureChat!",
                        button_startNewChat: "Start a new chat",
                        error_noOperators_helptext: "This is the message that will be displayed when Hide Widget When Unavailable is unchecked, and there are no operators available.",
                        error_enterName: "Please enter a name."
                    },
                    GoogId: "UA-XXXX-Y",
                    GaTrackingTab: !1,
                    GaTrackingChat: !1,
                    GaTrackingThumbs: !1,
                    GATabEvent: "Tab Opened",
                    GAChatEvent: "Chat Started",
                    GAUpThumbEvent: "Thumbs Up",
                    GADownThumbEvent: "Thumbs Down",
                    GAEventCategory: "PureChat widget",
                    UsingGa: !1,
                    ChatServerUrl: "http://chad.purechat.com:8000",
                    DisplayWidgetAnimation: "bounceInDown",
                    CollapsedWidgetImageUrl: "http://chad.purechat.com/Content/images/widgetSamples/operator1.png"
                };
                return $.Deferred().resolve(widgetSettings);
            },
            rateChat: function() {
                var d = $.Deferred();
                return d.resolve();
            },
            setTypingIndicator: function() {},
            bindEvents: function(handler) {
                this.handler = handler;
            }
        }), DemoDataController = TestDataController.extend({
            getWidgetSettings: function() {
                var d = $.Deferred();
                return window.parent && window.parent.currentWidgetSettings ? (window.parent.currentWidgetSettings.ForcePopout = !1, 
                d.resolve(window.parent.currentWidgetSettings)) : $.ajax({
                    url: Marionette.getOption(this, "pureServerUrl") + "/VisitorWidget/Widget/" + Marionette.getOption(this, "widgetId") + window.location.search,
                    dataType: "jsonp",
                    timeout: 2e4,
                    success: function(response) {
                        var widgetSettings = {
                            success: !0,
                            version: response.Version,
                            accountId: response.AccountId,
                            color: response.Color,
                            position: response.Position,
                            widgetType: response.WidgetType,
                            widgetConfig: response,
                            resources: response.StringResources,
                            googleAnalytics: response.GoogleAnalytics,
                            chatServerUrl: response.ChatServerUrl,
                            ShowMinimizeWidgetButton: response.ShowMinimizeWidgetButton
                        };
                        d.resolve(widgetSettings);
                    },
                    error: function() {
                        d.reject();
                    }
                }), d.promise();
            }
        }), PCDataController = BaseDataController.extend({
            closeChat: function() {
                return this.chatServerConnection.destroyself(), $.Deferred().resolve();
            },
            leaveChat: function() {
                return this.chatServerConnection.leave(this.connectionInfo.get("roomId")), $.Deferred().resolve();
            },
            restartChat: function() {
                return $.Deferred().resolve();
            },
            newMessage: function(message) {
                return "" == $.trim(message) ? !1 : "" == $.trim(message) ? !1 : (this.chatServerConnection.sendmessage(message, this.connectionInfo.get("roomId")), 
                void 0);
            },
            checkChatAvailable: function(accountId) {
                return accountId = accountId || this.widgetSettings.accountId, window._checkChatAvailableDeferred || (window._checkChatAvailableDeferred = $.Deferred(), 
                $.ajax({
                    url: Marionette.getOption(this, "pureServerUrl") + "/VisitorWidget/ChatAvailable",
                    data: {
                        accountId: accountId,
                        widgetId: this.options ? this.options.connectionSettings && this.options.connectionSettings.c ? this.options.connectionSettings.c : this.options.widgetId || this.options.Id : null
                    },
                    dataType: "jsonp",
                    timeout: 2e4,
                    jsonpCallback: "_PCcb",
                    error: function() {
                        window._checkChatAvailableDeferred.reject(), window._checkChatAvailableDeferred = null;
                    }
                })), window._checkChatAvailableDeferred.promise();
            },
            getWidgetSettings: function() {
                var self = this, hasAllSettings = "boolean" == typeof Marionette.getOption(this, "hasAllSettings") ? Marionette.getOption(this, "hasAllSettings") : !1, d = $.Deferred();
                return hasAllSettings ? d.resolve({
                    success: !0,
                    version: Marionette.getOption(this, "Version"),
                    accountId: Marionette.getOption(this, "AccountId"),
                    color: Marionette.getOption(this, "Color"),
                    position: Marionette.getOption(this, "Position"),
                    widgetType: Marionette.getOption(this, "WidgetType"),
                    widgetConfig: this.options,
                    resources: Marionette.getOption(this, "StringResources"),
                    googleAnalytics: Marionette.getOption(this, "GoogleAnalytics"),
                    chatServerUrl: Marionette.getOption(this, "ChatServerUrl")
                }) : $.ajax({
                    url: Marionette.getOption(this, "pureServerUrl") + "/VisitorWidget/Widget/" + Marionette.getOption(this, "widgetId"),
                    dataType: "jsonp",
                    timeout: 2e4,
                    success: function(response) {
                        if (response.Valid) {
                            0 == response.UnavailableBehavior && self.options.isDirectAccess && (response.UnavailableBehavior = 1);
                            var widgetSettings = {
                                success: !0,
                                version: response.Version,
                                accountId: response.AccountId,
                                color: response.Color,
                                position: response.Position,
                                widgetType: response.WidgetType,
                                widgetConfig: response,
                                resources: response.StringResources,
                                googleAnalytics: response.GoogleAnalytics,
                                chatServerUrl: response.ChatServerUrl
                            };
                            d.resolve(widgetSettings);
                        }
                    },
                    error: function() {
                        d.reject();
                    }
                }), d.promise();
            },
            submitEmailForm: function(data) {
                data.widgetId = Marionette.getOption(this, "widgetId");
                var d = $.Deferred();
                return $.ajax({
                    url: Marionette.getOption(this, "pureServerUrl") + "/VisitorWidget/SendEmail",
                    dataType: "jsonp",
                    type: "GET",
                    data: data
                }).done(function(result) {
                    d.resolve(result);
                }).fail(function() {}), d.promise();
            },
            startChat: function(data) {
                var self = this, d = $.Deferred(), escapedUserDisplayName = data.visitorName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), url = Marionette.getOption(this, "pureServerUrl") + "/VisitorWidget/Chat?visitorName=" + encodeURIComponent(escapedUserDisplayName) + "&widgetId=" + Marionette.getOption(this, "widgetId") + "&origin=" + encodeURIComponent(data.origin || "unknown");
                return data.visitorEmail && (url += "&visitorEmail=" + encodeURIComponent(data.visitorEmail)), 
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    timeout: 2e4,
                    success: function(response) {
                        response.user && response.room ? (self.connectionInfo.set({
                            userId: response.user.id,
                            authToken: response.user.authToken,
                            roomId: response.room.id,
                            chatId: response.chat.id
                        }), self.widgetSettings.chatServerUrl = response.server.url, d.resolve(self.connectionInfo)) : ("undefined" != typeof connectingView && null !== connectingView && connectingView.showErrorMessage(response.message), 
                        d.reject(response.message)), d.resolve();
                    },
                    error: function(xhr, textStatus, error) {
                        d.reject(textStatus + ", " + error);
                    }
                }), d;
            },
            connectToChatServer: function(bindTo) {
                function onIdentify(success) {
                    socketConnected = !0, 0 == success ? d.reject() : d.resolve();
                }
                var socketConnected, d = $.Deferred(), accountId = accountId || this.widgetSettings.accountId;
                return this.chatServerConnection ? (this.chatServerConnection.identify(this.connectionInfo.get("userId"), accountId, this.connectionInfo.get("authToken"), onIdentify, "boolean" == typeof this.options.connectionSettings.poppedOut ? this.options.connectionSettings.poppedOut : !1), 
                bindTo && this.bindEvents(bindTo)) : (this.chatServerConnection = new PureChat(this.widgetSettings.chatServerUrl + "/client", this.connectionInfo.get("userId"), accountId, this.connectionInfo.get("authToken"), onIdentify, function() {
                    socketConnected || d.reject();
                }, null, "boolean" == typeof this.options.connectionSettings.poppedOut ? this.options.connectionSettings.poppedOut : !1), 
                bindTo && this.bindEvents(bindTo)), d;
            },
            setTypingIndicator: function(isTyping) {
                this.chatServerConnection.sendtyping(this.connectionInfo.get("roomId"), isTyping);
            },
            rateChat: function(rate) {
                var d = $.Deferred();
                return $.ajax({
                    url: Marionette.getOption(this, "pureServerUrl") + "/VisitorWidget/Rate",
                    dataType: "jsonp",
                    data: {
                        chatId: this.connectionInfo.get("chatId"),
                        rating: rate,
                        authToken: this.connectionInfo.get("authToken")
                    }
                }).done(function() {}).fail(function() {}), d.promise();
            },
            checkInRoom: function() {
                return this.connectionInfo.isInChat() || this.connectionInfo.loadFromLocalStorage().isInChat();
            },
            sendRoomHistory: function(roomId) {
                this.chatServerConnection.sendroomhistory(roomId || this.connectionInfo.get("roomId"));
            },
            bindEvents: function(handler) {
                var self = this;
                self.handler = handler;
                var eventHandlers = {
                    message: function(userId, userDisplayName, roomId) {
                        self.connectionInfo.get("roomId") == roomId && handler.onMessage.apply(handler, arguments);
                    },
                    joined: function(userId, userDisplayName, roomId) {
                        self.connectionInfo.get("roomId") == roomId && handler.onJoined.apply(handler, arguments);
                    },
                    left: function(userId, userDisplayName, roomId) {
                        self.connectionInfo.get("roomId") == roomId && handler.onLeft.apply(handler, arguments);
                    },
                    roomdestroyed: function(roomId) {
                        self.connectionInfo.get("roomId") == roomId && handler.onRoomDestroyed.apply(handler, arguments);
                    },
                    typing: function(userId, userDisplayName, roomId) {
                        self.connectionInfo.get("userId") != userId && self.connectionInfo.get("roomId") == roomId && handler.onTyping.apply(handler, arguments);
                    }
                };
                self.handler.unbindEvents = function() {
                    self.chatServerConnection.off(eventHandlers);
                }, self.chatServerConnection.on(eventHandlers);
            }
        }), DashboardDataController = PCDataController.extend({
            initialize: function(options) {
                BaseDataController.prototype.initialize.apply(this, arguments), this.chatServerConnection = options.chatServerConnection;
            },
            closeChat: function() {
                return this.chatServerConnection.closeroom(this.connectionInfo.get("roomId")), $.Deferred().resolve();
            },
            connectToChatServer: function(bindTo) {
                var d = $.Deferred();
                return bindTo && this.bindEvents(bindTo), d.resolve();
            },
            getWidgetSettings: function() {
                var d = $.Deferred();
                return $.ajax({
                    url: "/User/DashboardSettings",
                    dataType: "json",
                    type: "post",
                    success: function(data) {
                        var widgetSettings = {
                            success: !0,
                            authToken: data.authToken,
                            version: "",
                            accountId: data.accountId,
                            userId: data.userId,
                            position: null,
                            widgetType: null,
                            widgetConfig: data,
                            resources: {},
                            googleAnalytics: null,
                            chatServerUrl: data.chatServerUrl
                        };
                        d.resolve(widgetSettings);
                    }
                }), d.promise();
            },
            checkInRoom: function() {
                return this.connectionInfo.get("roomId") ? !0 : !1;
            }
        });
        Controllers.DemoDataController = DemoDataController, Controllers.DashboardDataController = DashboardDataController, 
        Controllers.PCDataController = PCDataController;
    }, purechatApp.Models);
    var MESSAGE_DISPLAY_WIDTH = 40;
    purechatApp.module("Controllers", function(Controllers, app, Backbone, Marionette, $) {
        function getStartTime(time, timeElapsed) {
            var now = new Date(), utcNowDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()), differenceSeconds = utcNowDate.getTime() / 1e3 - time, newTime = parseInt(time, 10) - (parseInt(timeElapsed, 10) - differenceSeconds);
            return 1e3 * newTime;
        }
        var PureChatController = Marionette.Controller.extend({
            setChatModel: function(model) {
                this.chatModel = model;
            },
            getChatModel: function() {
                return this.chatModel;
            },
            setDataController: function(dc) {
                this.dc = dc;
            },
            getDataController: function() {
                return this.dc;
            },
            popoutChatOnExpand: function(dataController, settings, chatModel, state) {
                chatModel.set("poppedOut", !0), state.disable(), dataController.connectionInfo.persistLocalStorage();
                var url = settings.pureServerUrl + "/VisitorWidget/ChatWindow" + "?widgetId=" + settings.widgetId + "&userId=" + dataController.connectionInfo.get("userId") + "&displayName=" + dataController.connectionInfo.get("visitorName") + "&authToken=" + dataController.connectionInfo.get("authToken") + "&roomId=" + dataController.connectionInfo.get("roomId") + "&chatId=" + dataController.connectionInfo.get("chatId") + "&origin=" + encodeURIComponent(chatModel.get("origin"));
                window.openedWindow = window.open(url, "purechatwindow", "menubar=no, location=no, resizable=yes, scrollbars=no, status=no, width=480, height=640");
            },
            initialize: function(options) {
                function socketIOLoadComplete() {
                    self.options.set(self.options.get("dataController").widgetSettings.widgetConfig), 
                    self.setupPageActivityTest(), self.rm = self.options, self.options.set(self.getDataController().widgetSettings), 
                    $(".purechat-button-expand").find(".purechat-button-text").text(self.options.getResource("title_initial")), 
                    chatModel.on("change:operatorsAvailable", function(model, available) {
                        var expandButtons = $(".purechat-button-expand");
                        expandButtons.filter(":not(.purechat)").click(function(e) {
                            var dataController = self.getDataController();
                            $(e.target).hasClass("pc-icon-caret-down") || $(e.target).hasClass("purechat-super-minimize-link-button") || !(dataController.options.ForcePopout && !self.chatModel.get("isPoppedOut") || dataController.options.usePrototypeFallback) ? self.widgetLayout.triggerMethod("expand", e, {
                                collapse: $(e.target).hasClass("btn-collapse") || $(e.target).hasClass("pc-icon-minus"),
                                superMinimize: $(e.target).hasClass("pc-icon-caret-down") || $(e.target).hasClass("pc-icon-caret-up") || $(e.target).hasClass("purechat-super-minimize-link-button")
                            }) : self.popoutChatOnExpand(dataController, dataController.options, self.chatModel, self.state);
                        }), available ? (expandButtons.addClass("purechat-button-available"), expandButtons.removeClass("purechat-button-unavailable"), 
                        expandButtons.removeClass("purechat-button-hidden"), expandButtons.removeAttr("disabled")) : (0 === self.options.get("UnavailableBehavior") && (expandButtons.removeClass("purechat-button-available"), 
                        expandButtons.addClass("purechat-button-unavailable"), expandButtons.attr("disabled", "disabled")), 
                        expandButtons.each(function() {
                            var hide, next = $(this), hideString = next.attr("HideUnavailable");
                            hide = hideString ? "true" == hideString : 0 === self.options.get("UnavailableBehavior"), 
                            hide && next.addClass("purechat-button-hidden");
                        }));
                    }), self.getDataController().connectionInfo.isInChat() || self.getDataController().connectionInfo.loadFromLocalStorage(), 
                    chatModel.set("userId", self.getDataController().connectionInfo.get("userId")), 
                    self.widgetLayout = new purechatApp.Views.WidgetLayout({
                        rm: self.rm,
                        model: chatModel,
                        widgetSettings: self.options
                    }), self.widgetLayout.render(), self.widgetLayout.onHide(), self.getDataController().connectionInfo.get("disabled") && self.getDataController().connectionInfo.get("roomId") && self.widgetLayout.$el.hide();
                    var styleLoadingComplete = function() {
                        $(options.get("renderInto")).append(self.widgetLayout.$el), self.bindGobalCommand(self.widgetLayout.$el), 
                        self.triggerMethod("rendered"), self.setChatModel(chatModel), self.options.get("dataController").options.chatModel = self.getChatModel(), 
                        self.listenTo(chatModel, "change:state", self.stateChange), chatModel.set("state", self.options.get("initialState") || app.Constants.WidgetStates.Initializing), 
                        self.listenTo(self.widgetLayout.$el, "change:state", self.stateChange), self.trigger("widget:ready"), 
                        self.widgetLayout.$el.removeClass("hide"), self.widgetLayout.triggerMethod("afterInsertion");
                    };
                    if (self.options.get("isOperator")) styleLoadingComplete(); else {
                        var styleLoaded = !1, browserName = self.options.get("BrowserDetails").Browser || "";
                        parseFloat(self.options.get("BrowserDetails").Version || "");
                        var browserOS = self.options.get("BrowserDetails").OS || "Other", cssVersion = self.options.get("CssVersion");
                        if (self.options.get("RequestFromMobileDevice") && self.options.get("AllowWidgetOnMobile")) var sheetUrl = self.options.get("cdnServerUrl") + "/Content/widgetcss/mobile/" + (self.options.get("ThemeName") || "operator") + ".less?v=" + cssVersion, sheetUrl = self.options.get("cdnServerUrl") + "/VisitorWidget/WidgetCss/mobile/" + self.options.get("Color") + "/" + cssVersion + ".css"; else var sheetUrl = self.options.get("cdnServerUrl") + "/VisitorWidget/WidgetCss/" + self.options.get("StyleName") + "/" + self.options.get("Color") + "/" + cssVersion + ".css";
                        var sheet = $('<link rel="stylesheet" href="' + sheetUrl + '" type="text/css">'), count = 0;
                        if (/safari/i.test(browserName) && "Windows" == browserOS) {
                            console.log("Safari on Windows detected"), sheet.appendTo("head");
                            var interval = setInterval(function() {
                                (sheet[0].sheet || count >= 150) && (styleLoaded || (styleLoaded = !0, interval = clearInterval(interval), 
                                styleLoadingComplete())), count++;
                            }, 100);
                        } else sheet.appendTo("head").on("load", function() {
                            console.log('A "good" browser detected :D'), styleLoaded = !0, styleLoadingComplete();
                        });
                    }
                }
                var self = this;
                app.pureServerUrl = options.get("pureServerUrl"), $.Deferred();
                var chatModel = new purechatApp.Models.Chat({
                    isWidget: options.get("isWidget"),
                    position: options.get("position"),
                    pureServerUrl: options.get("pureServerUrl"),
                    cdnServerUrl: options.get("cdnServerUrl") || options.get("pureServerUrl"),
                    widgetType: app.Constants.WidgetType.Tab,
                    isOperator: options.get("isOperator"),
                    isPoppedOut: options.get("poppedOut"),
                    State: app.Constants.WidgetStates.Inactive,
                    messages: new purechatApp.Models.MessageCollection(),
                    operators: new purechatApp.Models.OperatorCollection(),
                    origin: options.get("origin") || window.location.href,
                    userId: options.get("userId")
                });
                if (options.get("isDemo") && (chatModel.set("operatorsAvailable", !0), chatModel.set("visitorName", options.get("visitorName"))), 
                window.pcDashboard) var socketIoLoaded = $.Deferred().resolve(); else var socketIoLoaded = $.ajax({
                    url: options.get("cdnServerUrl") + "/scripts/socket.io.v0.9.16.js",
                    dataType: "script",
                    cache: !0
                });
                var dcReady = self.setupDataController(options, chatModel);
                $.when(dcReady, socketIoLoaded).done(socketIOLoadComplete).fail(function() {
                    self.trigger("widget:fail");
                }), this.on("all", function() {
                    self.state && self.state.triggerMethod.apply(self.state, arguments);
                });
            },
            setupDataController: function() {
                var settingsDeferred = this.options.get("dataController").loadWidgetSettings();
                return this.setDataController(this.options.get("dataController")), settingsDeferred;
            },
            setupPageActivityTest: function() {
                var self = this, tid = null, lastX = -9999, lastY = -9999;
                self.pageActivity = !1, $(document).mousemove($.throttle(1e4, function(e) {
                    tid && clearTimeout(tid), Math.abs(lastX - e.clientX) <= 2 && Math.abs(lastY - e.clientY) <= 2 || (lastX = e.clientX, 
                    lastY = e.clientY, self.pageActivity = !0, tid = setTimeout(function() {
                        self.pageActivity = !1;
                    }, 45e3));
                }));
            },
            stateChange: function(model, newState) {
                var newState = new app.Controllers.States[newState](this.options);
                this.setState(newState);
            },
            setState: function(newState) {
                var status = {};
                null != this.state && (status = this.state.status, this.state.triggerMethod("exit"), 
                this.state.close()), this.state = newState, this.state.status = status, this.state.setChatModel(this.getChatModel()), 
                this.state.setWidgetView(this.widgetLayout), this.state.setWidgetSettings(this.options), 
                this.state.setResources(this.rm), this.state.setDataController(this.getDataController()), 
                this.state.setViewController(this), this.state.triggerMethod("enter");
            },
            bindGobalCommand: function($el) {
                var self = this;
                $el.on("click.delegateEvents", "[data-command]", function(e) {
                    e.preventDefault();
                    var $this = $(this), command = $this.data("command"), commandParams = $this.data("command-params");
                    self.trigger(command, commandParams);
                });
            },
            showConfirmationDialog: function() {
                return $.Deferred.resolve();
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this;
            },
            onClose: function() {}
        }), DashboardChatController = PureChatController.extend({
            onRendered: function() {
                if (this.widgetLayout.setCannedResponses(this.options.get("cannedResponses")), this.options.get("isInvisible") ? this.widgetLayout.setTitle(this.options.get("room").name + " (Eavesdropping)") : this.widgetLayout.setTitle(this.options.get("room").name), 
                this.options.get("room").roomType == PureChat.enums.roomType.visitor) {
                    var refererLink = this.options.get("room").visitorReferer;
                    "Unknown" != refererLink && (refererLink = '<a target="_blank" href="' + refererLink + '">' + refererLink + "</a>");
                    var startTime, referer = $('<div class="chat-referer" title="' + this.options.get("room").visitorReferer + '">' + refererLink + "</div>");
                    startTime = null != this.options.get("room").timeElapsed ? getStartTime(this.options.get("room").time, this.options.get("room").timeElapsed) : room.time;
                    var timer = $('<div class="purechat-start time"></div>');
                    timer.attr("start-time", startTime), this.widgetLayout.$el.find(".purechat-chat-info").append(timer), 
                    this.widgetLayout.$el.find(".purechat-chat-info").append(referer);
                } else {
                    var info = $('<div class="operator-bar">Operator Room</div>');
                    this.widgetLayout.$el.find(".purechat-chat-info").append(info);
                }
                pcDashboard && pcDashboard.vent.trigger("chat:selected", this.rm.get("room").id);
            },
            showConfirmationDialog: function(confirmation, title) {
                var $d = $.Deferred(), dialog = window.showConfirmationDialog({
                    title: title || "Are you sure?",
                    bodyText: confirmation,
                    onConfirm: function() {
                        $d.resolve(), dialog.modal("hide");
                    }
                });
                return $d;
            }
        });
        Controllers.DashboardChatController = DashboardChatController, Controllers.PureChatController = PureChatController;
    }, purechatApp.Models), PCWidget = function(connectionSettings) {
        connectionSettings.pureServerUrl = connectionSettings.pureServerUrl || "https://www.purechat.com";
        var dataController, dataControllerOptions = {
            test: !1,
            widgetId: connectionSettings.widgetId || connectionSettings.c,
            connectionSettings: connectionSettings,
            isWidget: connectionSettings.isWidget || connectionSettings.f,
            isOperator: void 0 == connectionSettings.d ? !1 : connectionSettings.d,
            pureServerUrl: connectionSettings.pureServerUrl,
            renderInto: $("body")
        };
        window._pcDisableAvailabilityPings = connectionSettings.DisableAvailabilityPings || connectionSettings.IPIsBanned, 
        dataController = dataControllerOptions.test ? new purechatApp.Controllers.TestDataController(dataControllerOptions) : new purechatApp.Controllers.PCDataController($.extend(connectionSettings, dataControllerOptions));
        var usePrototypeFallback = !1, prototypeErrorMessage = "";
        if ("undefined" != typeof Prototype) try {
            var splitVersion = Prototype.Version.split(/\./g);
            splitVersion.length > 0 && (usePrototypeFallback = parseInt(splitVersion[0]) >= 2 ? !1 : parseInt(splitVersion[1]) >= 7 ? !1 : !0);
        } catch (ex) {
            prototypeErrorMessage = ex;
        }
        usePrototypeFallback && (prototypeErrorMessage = "PureChat widgets are not compatible with Prototype.js versions < 1.7. Default widget behavior will popout into a new window"), 
        prototypeErrorMessage.length > 0 && "undefined" != typeof console && null !== console && console.log(prototypeErrorMessage);
        var viewOptions = {
            test: !1,
            pureServerUrl: connectionSettings.pureServerUrl,
            widgetId: connectionSettings.widgetId || connectionSettings.c,
            isWidget: connectionSettings.isWidget || connectionSettings.f,
            isOperator: void 0 == connectionSettings.d ? !1 : connectionSettings.d,
            renderInto: $("body"),
            dataController: dataController,
            usePrototypeFallback: usePrototypeFallback
        };
        viewOptions = $.extend(connectionSettings, viewOptions);
        var c1 = new purechatApp.Controllers.PureChatController(new purechatApp.Models.WidgetSettings(viewOptions));
        return c1;
    };
}({}, function() {
    return this;
}());