window.Fluidvids = function(e, t) {
        "use strict";
        var n, o, a = t.head || t.getElementsByTagName("head")[0],
            i =
            ".fluidvids-elem{position:absolute;top:0px;left:0px;max-width:800px;max-height:501px;width:100%;height:100%;}.fluidvids{max-width:800px;max-height:501px;width:100%;position:relative;}",
            l = function(e) {
                return n = new RegExp("^(https?:)?//(?:" + o.join("|") + ").*$", "i"), n.test(e)
            },
            r = function(e, t, n) {
                var o;
                return function() {
                    var a = this,
                        i = arguments;
                    clearTimeout(o), o = setTimeout(function() {
                        o = null, n || e.apply(a, i)
                    }, t), n && !o && e.apply(a, i)
                }
            },
            s = function(e) {
                var n = t.createElement("div"),
                    o = e.parentNode,
                    a = parseInt(e.height ? e.height : e.offsetHeight, 10),
                    i = parseInt(e.width ? e.width : e.offsetWidth, 10),
                    l = a / i * 100;
                o.insertBefore(n, e), e.className += " fluidvids-elem", n.className += " fluidvids", n.style.paddingTop = l + "%";
                var r = parseInt(n.height ? n.height : n.offsetHeight);
                r >= 501 && (n.style.paddingTop = "501px"), n.appendChild(e)
            },
            c = r(function() {
                for (var e = t.querySelectorAll(".fluidvids"), n = 0; n < e.length; n++) {
                    var o = e[n].querySelectorAll("iframe")[0],
                        a = parseInt(o.height ? o.height : o.offsetHeight, 10),
                        i = parseInt(o.width ? o.width : o.offsetWidth, 10),
                        l = a / i * 100;
                    e[n].style.paddingTop = l + "%";
                    var r = parseInt(e[n].height ? e[n].height : e[n].offsetHeight);
                    r >= 501 && (e[n].style.paddingTop = "501px")
                }
            }, 250);
        e.addEventListener("resize", c);
        var u = function() {
                var e = t.createElement("div");
                e.innerHTML = "<p>x</p><style>" + i + "</style>", a.appendChild(e.childNodes[1])
            },
            d = function(e) {
                var n = e || {},
                    a = n.selector || "iframe";
                o = n.players || ["www.youtube.com", "player.vimeo.com"];
                for (var i = t.querySelectorAll(a), r = 0; r < i.length; r++) {
                    var c = i[r];
                    l(c.src) && s(c)
                }
                u()
            };
        return {
            init: d
        }
    }(window, document),
    function(e, t) {
        "use strict";

        function n() {
            function n(e) {
                clearInterval(Y), e ? (S(N, "boom"), setTimeout(function() {
                    b(25, C), d(P, "next")
                }, 700)) : (S(N, "boom"), setTimeout(function() {
                    b(25, C), d(P, "previous")
                }, 700))
            }
            var o, a, i, l, r, s = t.getElementById("js-content-block"),
                c = 150,
                u = 200;
            e.addEventListener && (s.addEventListener("touchstart", function(t) {
                if ("/" === e.location.pathname) {
                    var n = t.changedTouches[0];
                    i = 0, o = n.pageX, a = n.pageY, r = (new Date).getTime()
                }
            }, !1), s.addEventListener("touchmove", function(t) {
                "/" === e.location.pathname && t.preventDefault()
            }, !1), s.addEventListener("touchend", function(t) {
                if ("/" === e.location.pathname) {
                    var s = t.changedTouches[0];
                    i = s.pageX - o, l = (new Date).getTime() - r;
                    var d = u >= l && i >= c && Math.abs(s.pageY - a) <= 100;
                    (i > 100 || -100 > i) && n(d), t.preventDefault()
                }
            }, !1))
        }

        function o() {
            for (var e = t.querySelectorAll(".portfolio-list li a"), n = 0; n < e.length; n++) B(e[n], Z(), et)
        }

        function a() {
            var e = t.getElementById("js-project-link");
            e && B(e, U(), et);
            var n = t.getElementById("js-next"),
                o = t.getElementById("js-previous");
            n && B(n, U(), lt), o && B(o, U(), rt)
        }

        function i(e) {
            F = !0, clearInterval(Y), _.setAttribute("class", "container"), _.innerHTML = "";
            var n = t.querySelectorAll(".portfolio-list")[0];
            n && n.parentNode.removeChild(n);
            var o = t.getElementById("view-more");
            o.style.display = "none", o.style.opacity = 0;
            var a = M.querySelectorAll("li");
            A(D, "white") && (S(D, "white"), S(R, "white")), z = !1, C.style.display = "block", C.style.width = "10%", L(N, /\url-\S+/g),
                I(N, "url-" + x(e));
            for (var i = 0; i < a.length; i++) {
                S(a[i], "sel");
                var l = a[i].getElementsByTagName("a")[0].getAttribute("href");
                l.match(e.split("/")[1]) && I(a[i], "sel")
            }
            ga("send", "pageview", {
                page: e
            }), "/portfolio" === e ? p(e) : e.match(/portfolio/) ? h(e) : m(e)
        }

        function l() {
            var e = new XMLHttpRequest;
            e.open("GET", "/_collections?collection=portfolio&home=true&order=desc"), e.onreadystatechange = function() {
                if (4 === e.readyState && 200 === e.status) {
                    var t = JSON.parse(e.responseText);
                    for (var n in t.collection) {
                        var o = {
                            homestyle: t.collection[n].homestyle,
                            homeimage: t.collection[n].homeimage,
                            slug: t.collection[n].slug,
                            whitenav: t.collection[n].whitenav
                        };
                        J.push(o)
                    }
                    if (1 === t.collection.length) I(N, "boom");
                    else {
                        var a = Math.floor(Math.random() * t.collection.length);
                        d(a, "next")
                    }
                }
            }, e.send()
        }

        function r() {
            var n = function(n) {
                    var o = this.parentNode.nextSibling.nextSibling.getBoundingClientRect().top,
                        a = o + c().scrollTop;
                    t.documentElement.scrollTop ? c().scrollTop = a : e.scrollBy(0, a), n.preventDefault()
                },
                o = t.querySelectorAll(".arrow-down")[0];
            B(o, U(), n)
        }

        function s() {
            t.body.scrollTop = 0
        }

        function c() {
            return t.documentElement || t.body
        }

        function u() {
            clearInterval(Y), Y = setInterval(function() {
                S(N, "boom"), setTimeout(function() {
                    b(25, C), d(P, "next")
                }, 700)
            }, 12e3)
        }

        function d(e, n) {
            clearInterval(O), e = "previous" === n ? e -= 1 : e += 1, e = e > J.length - 1 ? 0 : e, e = 0 > e ? J.length - 1 : e;
            var o = !1;
            P = e, _.setAttribute("class", "container " + J[e].homestyle);
            for (var i = _.querySelectorAll("img"), l = 0; l < i.length; l++) i[l].style.display = "none";
            var r = t.getElementById(J[e].homestyle);
            if (r) o = !0;
            else {
                var s = new Image;
                s.src = j + J[e].homeimage, s.id = J[e].homestyle, s.className = "js-img", s.alt = "homepage project image", _.appendChild(
                    s)
            }
            r = t.getElementById(J[e].homestyle);
            var c = t.getElementById("js-project-link"),
                u = t.getElementById("js-next"),
                d = t.getElementById("js-previous");
            u.setAttribute("data-index", e), d.setAttribute("data-index", e), c.setAttribute("href", J[e].slug), J[e].whitenav ? (I(D,
                "white"), I(R, "white"), z = !0) : (S(D, "white"), S(R, "white"), z = !1);
            var f = 50;
            if (O = setInterval(function() {
                f += 5, b(f, C)
            }, 1e3), o) I(N, "boom"), clearInterval(O), b(100, C), r.style.display = "inline-block", r.style.opacity = 1;
            else {
                var s = new Image;
                s.onload = function() {
                    I(N, "boom"), clearInterval(O), b(100, C), r.style.display = "inline-block", r.style.opacity = 1
                }, s.src = r.getAttribute("src")
            }
            a()
        }

        function f(n) {
            var a = new XMLHttpRequest;
            a.open("GET", "/partials/portfolio"), a.onreadystatechange = function() {
                if (4 === a.readyState)
                    if (200 === a.status) {
                        n.style.display = "block", n.style.opacity = 1;
                        var i = t.createElement("div");
                        i.innerHTML = a.responseText, n.parentNode.insertBefore(i.childNodes[1], t.getElementsByTagName("footer")[0]);
                        for (var l = t.querySelectorAll(".portfolio-list li a img"), r = 0; r < l.length; r++) w(l[r], 80 * r);
                        o()
                    } else e.location.href = href
            }, a.send()
        }

        function p(n) {
            var a = new XMLHttpRequest;
            a.addEventListener("progress", function(e) {
                E(e, C)
            }, !1), a.open("GET", "/partials/portfolio"), a.onreadystatechange = function() {
                if (4 === a.readyState)
                    if (200 === a.status) {
                        t.title = "Mike Kus â€¢ " + t.querySelectorAll(".page-foot__strap")[0].innerHTML, b(100, C), _.innerHTML =
                            a.responseText;
                        for (var i = _.querySelectorAll("img"), l = 0; l < i.length; l++) w(i[l], 80 * l);
                        o(), s()
                    } else e.location.href = n
            }, a.send()
        }

        function h(n) {
            var o = 0,
                a = 0,
                i = 75,
                l = "/_collections?collection=portfolio&slug=" + n + "&order=desc",
                c = new XMLHttpRequest;
            c.addEventListener("progress", function(e) {
                E(e, C)
            }, !1), c.open("GET", l), c.onreadystatechange = function() {
                if (4 === c.readyState)
                    if (200 === c.status) {
                        b(75, C);
                        var l = JSON.parse(c.responseText);
                        _.innerHTML = l.collection[0].body, o = _.querySelectorAll("img").length, a = Math.ceil(25 / o), t.title =
                            "Portfolio: " + l.collection[0].title + " : Mike Kus â€¢ " + t.querySelectorAll(".page-foot__strap")[0]
                            .innerHTML;
                        for (var u = _.querySelectorAll("img"), d = [], f = 0, p = 0; p < u.length; p++) d[p] = new Image, d[p].onload =
                            function() {
                                if (f++, i += a, b(i, C), f === u.length - 1) {
                                    s(), b(100, C), t.querySelectorAll(".portfolio-item__header")[0].innerHTML +=
                                        '<a class="arrow-down" href="#jump" id="jump"></a>', r();
                                    for (var e = _.querySelectorAll("section"), n = 0; n < e.length; n++) e[n].style.opacity = 1
                                }
                            }, d[p].src = u[p].getAttribute("src");
                        F = !1, Fluidvids.init({
                            selector: "iframe",
                            players: ["www.youtube.com", "player.vimeo.com"]
                        })
                    } else e.location.href = n
            }, c.send()
        }

        function m(n) {
            var o = new XMLHttpRequest;
            o.addEventListener("progress", function(e) {
                E(e, C)
            }, !1), o.open("GET", "/partials" + n), o.onreadystatechange = function() {
                if (4 === o.readyState)
                    if (200 === o.status) {
                        if (t.title = "Mike Kus â€¢ " + t.querySelectorAll(".page-foot__strap")[0].innerHTML, b(100, C), _.innerHTML =
                            o.responseText, s(), "/about" === n && (t.querySelectorAll(".portfolio-item__header")[0].innerHTML +=
                                '<a class="arrow-down" href="#jump" id="jump"></a>', r()), "/about" === n || "/contact" === n) {
                            var a = t.getElementById("js-get-in-touch");
                            a && a.addEventListener(U(), et, !1);
                            var i = 0,
                                l = 0,
                                c = 0;
                            ct = _.querySelectorAll("img"), i = ct.length, l = Math.ceil(100 / i);
                            for (var u = 0; u < ct.length; u++) c += l, b(c, C), y(ct[u], 80 * u, c);
                            for (var d = t.querySelectorAll(".portfolio-list li img"), u = 0; u < d.length; u++) w(d[u], 80 * u)
                        }
                    } else e.location.href = n
            }, o.send()
        }

        function g() {
            var e = v(t.getElementsByTagName("html")[0], "max-width").replace("px", ""),
                n = t.querySelectorAll("meta[name=viewport]")[0];
            "none" != e ? n.setAttribute("content", "width=" + e + ",initial-scale=1") : n.setAttribute("content",
                "width=device-width,initial-scale=1")
        }

        function v(e, n) {
            var o, a = (e.ownerDocument || t).defaultView;
            return a && a.getComputedStyle ? (n = n.replace(/([A-Z])/g, "-$1").toLowerCase(), a.getComputedStyle(e, null).getPropertyValue(
                n)) : e.currentStyle ? (n = n.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            }), o = e.currentStyle[n], /^\d+(em|pt|%|ex)?$/i.test(o) ? function(t) {
                var n = e.style.left,
                    o = e.runtimeStyle.left;
                return e.runtimeStyle.left = e.currentStyle.left, e.style.left = t || 0, t = e.style.pixelLeft + "px", e.style.left =
                    n, e.runtimeStyle.left = o, t
            }(o) : o) : void 0
        }

        function y(e, t, n) {
            var o = new Image;
            o.onload = function() {
                if (n)
                    for (var e = _.querySelectorAll("section"), t = 0; t < e.length; t++) e[t].style.opacity = 1
            }, o.src = e.getAttribute("src")
        }

        function w(e, t) {
            var n = new Image;
            n.onload = function() {
                setTimeout(function() {
                    e.style.opacity = 1
                }, t)
            }, n.src = e.getAttribute("src")
        }

        function E(e, t) {
            e.lengthComputable ? t.style.width = e.loaded / e.total * 100 + "%" : b(50, t)
        }

        function b(e, t) {
            t.style.width = e + "%", e >= 100 && setTimeout(function() {
                t.style.display = "none"
            }, 350)
        }

        function T(t) {
            "pushState" in history ? history.pushState(null, null, t) : e.location.href = t
        }

        function A(e, t) {
            return new RegExp(" " + t + " ").test(" " + e.className + " ")
        }

        function I(e, t) {
            e && !A(e, t) && (e.className += " " + t)
        }

        function S(e, t) {
            var n = " " + e.className.replace(/[\t\r\n]/g, " ") + " ";
            if (A(e, t)) {
                for (; n.indexOf(" " + t + " ") >= 0;) n = n.replace(" " + t + " ", " ");
                e.className = n.replace(/^\s+|\s+$/g, "")
            }
        }

        function L(e, t) {
            var n = e.className.match(t);
            S(e, n)
        }

        function x(e) {
            return e.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-")
        }

        function B(t, n, o) {
            e.addEventListener ? t.addEventListener(n, o, !1) : t.attachEvent("on" + n, o)
        }
        var j = "https://s3.amazonaws.com/mixture-mixed/1/11173",
            q = t.getElementsByTagName("body")[0],
            M = t.getElementById("js-menu-nav"),
            H = t.getElementById("js-social-nav");
        q.innerHTML += '<div id="page-loader" style="display: none;"></div>';
        var N = t.getElementsByTagName("html")[0],
            k = t.getElementById("js-overlay"),
            C = t.getElementById("page-loader"),
            _ = t.getElementById("js-content-block"),
            D = t.getElementById("js-page-head"),
            R = t.getElementById("js-project-nav"),
            X = t.getElementById("js-footer-nav"),
            G = t.getElementById("js-menu");
        M = t.getElementById("js-menu-nav"), H = t.getElementById("js-social-nav");
        var O, Y, $ = !1,
            F = !1,
            K = location.href,
            z = A(D, "white"),
            J = [],
            P = 0;
        if (!A(N, "svg")) {
            var V = t.getElementsByTagName("noscript")[0],
                W = V.childNodes[0].data;
            t.head.innerHTML += W
        }
        var U = function() {
                return e.addEventListener ? "ontouchstart" in e ? "touchstart" : "click" : "click"
            },
            Z = function() {
                return "click"
            },
            Q = function(t) {
                k.setAttribute("data-state", "visible" === k.getAttribute("data-state") ? "hidden" : "visible"), this.setAttribute(
                    "data-state", "open" === this.getAttribute("data-state") ? "closed" : "open"), "open" === this.getAttribute(
                    "data-state") && z ? (S(D, "white"), S(R, "white")) : z && (I(D, "white"), I(R, "white")), "open" === this.getAttribute(
                    "data-state") ? clearInterval(Y) : "/" === e.location.pathname && u(), t.preventDefault()
            };
        B(G, U(), Q);
        for (var et = function(e) {
            var t = this.getAttribute("href");
            _.innerHTML = "", k && (k.setAttribute("data-state", "hidden"), G.setAttribute("data-state", "hidden")), T(t), i(t), e.preventDefault()
        }, tt = k.querySelectorAll(".menu-nav li a"), nt = 0; nt < tt.length; nt++) B(tt[nt], U(), et);
        for (var ot = M.querySelectorAll("li a"), at = X.querySelectorAll("li a"), nt = 0; nt < ot.length; nt++) B(ot[nt], U(), et);
        for (var nt = 0; nt < at.length; nt++) B(at[nt], U(), et);
        var it = t.getElementById("js-get-in-touch");
        it && B(it, U(), et), e.location.pathname.match(/portfolio/) && o();
        var lt = function(e) {
                clearInterval(Y), S(N, "boom"), setTimeout(function() {
                    b(25, C), d(P, "next")
                }, 700), e.preventDefault()
            },
            rt = function(e) {
                clearInterval(Y), S(N, "boom"), setTimeout(function() {
                    b(25, C), d(P, "previous")
                }, 700), e.preventDefault()
            };
        n(), e.addEventListener && e.addEventListener("keyup", function(n) {
            if ("/" === e.location.pathname) {
                if (38 === n.keyCode || 40 === n.keyCode) {
                    var o = t.getElementById("js-project-link");
                    i(o.getAttribute("href"))
                }
                39 === n.keyCode && (clearInterval(Y), S(N, "boom"), setTimeout(function() {
                    b(25, C), d(P, "next")
                }, 700)), 37 === n.keyCode && (clearInterval(Y), S(N, "boom"), setTimeout(function() {
                    b(25, C), d(P, "previous")
                }, 700)), n.preventDefault()
            }
        }, !1), a(), Fluidvids.init({
            selector: "iframe",
            players: ["www.youtube.com", "player.vimeo.com"]
        }), setTimeout(function() {
            "/" === e.location.pathname ? l() : I(N, "boom")
        }, 100), e.addEventListener && (g(), e.addEventListener("orientationchange", function() {
            g()
        }, !1));
        var st = t.querySelectorAll(".portfolio-item__header")[0];
        if (st && "/contact" != e.location.pathname && (st.innerHTML += '<a class="arrow-down" href="#jump" id="jump"></a>', r()), "/" ===
            e.location.pathname && u(), "/portfolio" === e.location.pathname || "/about" === e.location.pathname || "/contact" === e.location
            .pathname)
            for (var ct = t.querySelectorAll(".portfolio-list li img"), nt = 0; nt < ct.length; nt++) w(ct[nt], 80 * nt);
        if (e.location.pathname.match(/portfolio/) || "/about" === e.location.pathname || "/contact" === e.location.pathname) {
            var ut = 0,
                dt = 0,
                ft = 0;
            ct = _.querySelectorAll("img"), ut = ct.length, dt = Math.ceil(100 / ut);
            for (var nt = 0; nt < ct.length; nt++) ft += dt, b(ft, C), y(ct[nt], 80 * nt, ft)
        }
        e.addEventListener && (e.addEventListener("popstate", function() {
            var t = !$ && location.href == K;
            $ = !0, t || ("/" === location.pathname && (e.location.href = "/"), i(location.pathname))
        }, !1), e.addEventListener("scroll", function() {
            var n = t.getElementById("view-more");
            if (n && "/portfolio" != e.location.pathname && e.location.pathname.match(/portfolio/)) {
                var o = t.documentElement.clientHeight,
                    a = e.pageYOffset ? e.pageYOffset + e.innerHeight : t.documentElement.scrollTop + e.innerHeight;
                a > o - 500 && !F && (F = !0, f(n))
            }
        }, !1))
    }(window, document);