// JavaScript source code
! function (x, X, t, Yg) {
	function _() {
		function ZC(ZI) {
			function We(Z, w, W) {
				var y = Xy[yA](0),
					x = Z.ZU[yA](0),
					$ = y[V];
				for (Z.A && (y[$] = VV, x[$] = Z.zw, $++) ; $--;) try {
					var Y = y[$],
						z = _[yj(xB + Y)],
						X = o(Z.$, x[$]);
					z = z && z[ZJ], !z || !X || w && Y == Zg || W && Y == zG || wv(z, X)
				} catch (v) { }
			}

			function VK(X) {
				if (ZI)
					for (var $, Z, y, z = zD ? yB : "tabindex", w = o(_.x.$, _.x.zw), Y = ZS(Ym, _.k && _.k[B]), x = Y[V]; x--;) $ = Y[x], X ? (r($, z, t), Z = r($, YN + z), Z && (r($, z, Z), r($, YN + z, t))) : (y = VM($, z), y && !VM($, YN + z) && r($, YN + z, r($, z) + ""), !y && !u(Zs($), [zZ, WM, Zu, wx, "frame", YM, Wl, Xa, Xc, Vt], 2) || zm(w, $) || r($, z, -1))
			}

			function ve(z) {
				var $, Z = v.randomOrder,
					y = 0;
				for (wO = x, xG = vX = X, Wg(zz) ; Yr[V] > y;) $ = Yr[y++], !($ == z || $.C && $.C == z.C) || $.V && !o($.$, $.V) || $.Z[WH] === X || ($.zP = X, zz[e]($), $.ZH = Z ? w.ZJ(-zX) : $.Z.order || zz[V], $.w ? xG = x : (wO = X, $.zz && (vX = x)));
				for (zz.sort(function (_, $) {
					return _.ZH - $.ZH
				}), Zv = _.itemCount = zz[V], zY = Z ? 0 : Zv - 1; zY && zz[zY] != z;) zY--;
				_.x = zz[zY]
			}

			function vE($) {
				_.E = W = D({}, v), Wq = YK || Xm ? M(W.boxRoundCorners, "all") : ZL, f = Wq == ZL ? 0 : ZN(M(W.boxCornerRadius, 12)), WQ = YK ? M(W.contentRoundCorners, "all") : ZL, Yw = WQ == ZL ? 0 : ZN(M(W.contentCornerRadius, 0)), xs = W.shadowType || Xb, YH = (YK || Xm) && xs != ZL ? M(W.shadowSize, 12) : 0, Vw = M(W.shadowOpacity, .4), Zy = ZN(M(W.outerBorder, 1)), Zm = W[Wh] = ZN(M(W[Wh], 1)), zH = M(W.padding, 24), xe = M(W.panelPadding, 8), WO = ZI ? M(W.overlayOpacity, .55) : 0, Xw = M(W.controlsOpacity, .6), yo = M(W.transitionTime, .6), YI = yo ? M(W.imageTransition, vT, ZL) : ZL, Wo = WO && M(W.overlayFadeTime, .4), Zc = M(W.resizeTime, .5), Vv = W.showStartGif !== X, Xs = W.splitResize, XH = W.endAt, ZX = Xs ? X : W[ya], zb = M(W.zoomBorder, 1), wQ = W.boxBackgroundImage, vh = M(W.autoFitSpace, 5), wP = !Yv && W.enableDragMove !== X, vv = wP && W.showMoveCursor, Wp = W.stickyDragMove, XT = W.resizeTool, xv = W.enableDragResize && !Zd ? vX || W.draggerLocation != VV : t, Wb = W.boxLeftAdjust || 0, WB = W.boxTopAdjust || 0, Xe = W.showClose !== X, VX = W.outerClosePos || "tr", xg = W.enableKeyboardNav !== X, WA = W.enableSwipeNav !== X, xS = xg && M(W.showHints, yN), vz = W.enableWrap !== X, xt = W.numIndexLinks, VW = W.showIndexThumbs !== X, vw = W.pipIndexThumbs !== X, yg = W.showPlayPause !== X, (W.doAnimations === X || wr && W.mobileDoAnimations !== x) && (Zc = yo = Wo = 0), Zc || (ZX = Xs = X), W[wH] = M(W[wH], ZI), xW = W.colorTheme || ($.w ? zB : $.zz ? "blue" : Wk), yW = {
					black: 1,
					blue: 2,
					silver: 3,
					yellow: 4,
					red: 5
				}[xW] || 0, VG = W.overlayColor || ["", zB, vu, zB, "#752", "#280000"][yW], xI = W.boxColor || ["", zB, vu, "#c0c0c0", "#ed9", "#580808"][yW], Vg = W.outerBorderColor || ["", "#888", "#777", zB, "#680c0c", "#945848"][yW], vg = W.innerBorderColor || ["", "#ccc", "#aaa8be", zB, "#700", "#b64"][yW], vF = W.textColor || ["", "#aaa", "#a7a7a7", "#333", "#700", "#ca8"][yW], XE = W.strongTextColor || ["", "#d7d7d7", "#d0d0d0", zB, "#941010", "#ec9"][yW]
			}

			function Ve() {
				function s(_, $) {
					return ("0" + (xy(_, 16) + xy($, 16) >>> 1).toString(16))[yA](-2)
				}

				function U(_, z, Z, $) {
					return $ = xL(_) ? K(_, zz[y].Z) : _, $ && z && (T[e](z), p[e](Z)), $
				}
				var Z, Y, $, y, r = "Pos",
					q = "newWindowLink",
					Q = "Center",
					R = "WidgetDiv",
					T = [],
					p = [];
				if (Zv > 1) {
					var P = W.navType || yF,
						o = u(P, ["overlay", yF]);
					yp = xG && o, zc = u(P, [wx, yF]) || !wO && o, vV = M(W.showNavOverlay, !zc), Xu = W.doSlideshow, XG = W.showItemNumber !== X
				} else yp = zc = Xu = XG = xt = WA = X;
				for (YI == ZL && (yo = 0), Xu || (yg = X), xU = W.startPaused, XT = v[vN] ? Wm : XT != Wm && (VF || Zd || WF && !Ws) ? yF : XT || Zw, Z = "(\\w\\w)", Z = "(#" + Z + Z + Z + yM, Z = w.zV(Z + "\\|" + Z)[Zn](xI), Z && (xI = "#" + s(Z[2], Z[6]) + s(Z[3], Z[7]) + s(Z[4], Z[8]), XV = [Z[1], Z[5]]), (wQ || XV) && (f = 0), xF = Yw && !zH, xF && (f = Yw + Zy, Wq = WQ), f && (Zy = i(Zy, f), xF && (Yw = f - Zy)), _.Zn = Yw, _.ZT = WQ == z ? 0 : Yw, vH = f && Wq != z, Xi = f + f, XI = f ? f - Zy : 0, xh = XI + XI, zV = ZN(S(.293 * XI, f / 2 - Zy)), I = zV + Zy, zC = I + I, zH = xF ? 0 : S(zH, zV), wn = zH + zH, Xt = zH - zV, wN = S(Xt, xe), Xx = 2 * (Zy + Zm), y = Zv; y--;) vy = vy || U(zj, zj, xp), vY = vY || U(Wn, Wn, "tc"), Xg = Xg || U("info", "infoLink", xp), xf = xf || !we && !zz[y].H && U(vQ, "printLink", xp), vx = vx || U(vq, q, "tr"), VY = VY || U(Zg), Vy = Vy || U(zG);
				for (U(XG, "itemNumber", xp), U(xt, xb, "br"), y = T[V]; y--;) Y = W[T[y] + r] = W[T[y] + r] || p[y], u(Y, "c") || (l[Y] = Zo + Y + Xr);
				for (_[H] = W.controlsPos || "br", zc || Xe || yg ? (l[_[H]] = Zo + _[H] + Xr, _[xM] = u(_[H], za), _[Ww] = u(_[H], yT)) : _[H] = _[xM] = _[Ww] = t, y = T[V]; y--;) {
					$ = T[y], Y = W[$ + r];
					var O = $ + Yo,
						n = $ + Q,
						N = $ + yU;
					_[O] = u(Y, yT), _[n] = u(Y, "c"), _[N] = u(Y, za), _[n] && (Y = _[O] ? yT : "b", _[N] = !(l[Y + za] && !l[Y + "r"]))
				}
				for (y = T[V]; y--;) $ = T[y], $ != xb && $ != q && _[$ + Yo] == _[Ww] && _[$ + yU] == _[xM] && (_[$ + yU] = !_[xM]), _[$ + yn] = (_[$ + Yo] ? yT : "b") + (_[$ + yU] ? za : "r"), l[_[$ + yn]] = Zo + _[$ + yn] + Xr, _[$ + Q] && (Wr[_[$ + yn]] = x);
				Yi = Zv > 1 && _[H] && _[H] != _[xm] && _[H] != _[wW], Xg && (Zx[_[XN]] = Zo + _[XN] + R), xf && (Zx[_[Xn]] = Zo + _[Xn] + R), XG && (Zx[_[YB]] = Zo + _[YB] + R)
			}

			function VE() {
				var y, v, $, z, Y, x = P[zQ],
					Z = x[Zu],
					w = W.attachTo;
				if (w) {
					for (Z = w == ZK && (y = Zh && x.elementFromPoint(Zh.ZY, Zh.zx)) ? y[zq] : zI(w) || Z; Z && !u(Zs(Z), [Zu, xA, "form", "li", "td"], 2) ;) y = Z, Z = y[zq];
					v = w == ZK && y && y.nextSibling
				}
				_[B] = zI(B, x), _[B] || (zM(_[B] = zx(0, x), _[B].id = B), L(_[B], Z, v)), U(J, 0, Zt), U(xn, 0, Zt), U(yc), WO && U(zU, _[B]), $ = U(T, _[B]), U(Yl, $), U(xN, $), VY && U(ZY, $), Vy && U(zW, $), W.showOuterClose && U(zn, $, zZ, 1), U(WY, $), U(ys, $), z = U(Zj, $), U(l.tl, z), U(l.tr, z), Y = U(F, z), yp && (U(yy, Y, zZ), U(YZ, Y, zZ), U(ZF, Y, zZ, 2), U(Zf, Y, zZ, 3)), xG && W.enableImageResize !== X && U(yZ, Y, zZ, 6), U(l.bl, z), U(l.br, z), vy && U(wY, _[l[_[vn]]]), vY && U(wy, _[l[_[VO]]]), U(Zx.tl, _[Vo]), U(Zx.tr, _[vO]), U(Zx.bl, _[vo]), U(Zx.br, _[VP]), Xg && (_.infoLinkLeft || _.infoLinkCenter) && U(Ys, _[Zx[_[XN]]], zK), xf && (_.printLinkLeft || _.printLinkCenter) && U(yK, _[Zx[_[Xn]]], zK), XG && U(XO, _[Zx[_[YB]]], zK), xf && !_[yK] && U(yK, _[Zx[_[Xn]]], zK), Xg && !_[Ys] && U(Ys, _[Zx[_[XN]]], zK), _[H] && (Yi && L(_[l[_[H]]], $), U(yY, _[l[_[H]]]), zc && (U(Yb, _[yY]), U(Zr, _[Yb], zZ, 2), U(zR, _[Yb], zZ, 3)), (Xe || yg) && (U(ww, _[yY]), yg && (U(WX, _[ww]), U(ZA, _[WX], zZ, 4), U(Yt, _[WX], zZ, 5)), Xe && U(xO, _[ww], zZ, 1))), xt && U(zf, _[l[_[xm]]], zK), vx && U(yL, _[l[_[wW]]]), XZ(xv) && U(ZG, z)
			}

			function U(z, w, x, Y, W) {
				if (z) {
					var y, $ = _[z] = zx(x, _[B][zs]);
					if (x == zZ && ($[ZW] = VL, $[wh] = Yk, $[yB] = 777 - _.U, Y = ZZ[Y], Y && (xS === X || zd[z] || ($[E] = Y), YJ || (zT($, Y[ze](" ")[0]), Z($, ["fontSize", 1, ZH, xP])))), x == YM) {
						for ($[WI] = W ? wk : "no", Z($, ZO, W), $.frameBorder = 0, r($, "allowTransparency", "true"), y = Zi[V]; y--;) r($, yj(Zi[y] + "allowFullScreen")[Wi](), "");
						$[R] = ws
					}
					for (x == Zt && ($.alt = "", $[R] = xY, Z($, ["maxWidth", -zX, "maxHeight", -zX, Vu, "ltr"])), $[ZR] = z, $.id = z + (ZD ? "_" + ZD : ""), zM($, [B, z, "custom" == xW ? z + "_" + xW : ""]), s($), y = Zi[V]; --y;) Z($, [Zi[y] + "boxSizing", "content-box", Zi[y] + "transitionDuration", "0s"]);
					return w && L($, w), _[z] = $, ZD || (fb[z] = $), VI[e](z), $
				}
			}

			function vd(v, s) {
				function R(_, z) {
					Yx[V] && (_ = _ === x, _ || zo(R, n, YD, 77, x), xZ || (z = YX(), (z[$] != k[$] || z[Y] != k[Y]) && (D(k, z), xZ = x, zE(function ($) {
						6 == $._ && $.E[vP] !== X && $.N(t, 0, 0, _ ? $.G : Yk)
					}), xZ = X)))
				}

				function q() {
					function b(W) {
						if (w = W.touches, s = w ? w[0] : W, _._ && (!w || !w[1])) {
							var u, $ = s[Wx] - I,
								Y = s[wX] - h;
							!L && $ * $ + Y * Y > 9 && (L = x, Z(U(E, _[T]), [zN, +_[T][m][zN] + 77, Zz, ""])), L && (R[Zw] = o || r ? Yf : "", o ? Z(V, [y, S(i(D + $, 0), G), z, S(i(c + Y, 0), C)]) : k ? !f && YY.abs($) > 50 && (f = x, _[zJ](x), _[Yz]($ > 0 ? XC : yf)) : zh ? (e && (v = $ + Y, Y = v / (e + 1), $ = v - Y), Zp = $, zO = Y, _.N(X, 0, 0, _.G)) : r ? Z(_[T], [y, H + $, z, g + Y]) : u = x), zo(J, n, XR, 2222, {}), u || zp(W)
						}
					}

					function J($) {
						for (zS(n, Zw), zS(n, XR) ; v = K.pop() ;) Yj(v);
						v = "releaseCapture", W[v] && W[v](), R[Zw] = d, _[E] = Ze(_[E]), zh = X, V = _[p], _._ && V && (o ? (P[y] = V[yk], P[z] = V[yS]) : r && (q[y] = _[T][yk], q[z] = _[T][yS], xV += q[y] - H, Xv += q[z] - g), L || VJ($), wC()), V = W = l = R = w = s = t
					}
					var N, V, w, s, W, M, l, R, d, I, h, q, P, H, g, D, c, G, C, o, k, r, L, f, e, v, E = "fbCover",
						K = [];
					return function (Z) {
						var t = this,
							U = Q[F];
						return N = _.Y || _.x, V = _[p], w = Z.touches, N && V && (w && !w[1] || 1 == (Z.buttons || Z.which || Z[wx]) && O.X != zg) && (s = w ? w[0] : Z, W = s[yb], M = W[ZR] || "", l = t[zs], R = l[Zu][m], d = R[Zw], I = s[Wx], h = s[wX], q = Q[T], P = Q[p] || U, H = q[y], g = q[z], D = P[y], c = P[z], j(l[zF], w ? zk : XR, J, K), ZI || Yv || u(M, [ZY, zW]) || _.Zy(), o = k = zh = r = L = f = X, zm(_[F], W) ? N.w && (G = U[$] - P[$], C = U[Y] - P[Y], G ? o = x : w && WA ? k = x : r = wP) : M == ZG ? (e = N.zp && (N.P || U[$]) / (N.p || U[Y]), I -= Zp, h -= zO, R[Zw] = "nw-resize", zh = x) : wP && u(M, Zo, 1) && M != zU && Zs(W) != Xa && !zm(_[ZY], W) && !zm(_[zW], W) && (r = x), o || k || zh || r) ? (zS(n, Yn), (o || r) && zo(function () {
							R[Zw] = Yf
						}, n, Zw, 250), v = "setCapture", W[v] && (W[v](), j(W, "losecapture", J, K)), j(l[zF], w ? WL : Xq, b, K), zp(Z)) : Yg
					}
				}

				function r($) {
					if ($) {
						var W = $.data,
							y = wf($[YL]);
						if (y)
							if (K(VS, v.Z) !== X && u($.origin, [xa, "vimeo"])) u(W, '"event":"ready"') ? $[YL][yR]('{"method":"addEventListener","value":"finish"}', $.origin) : u(W, ['"playerState":0', '"event":"finish"']) && G(_[zw]);
							else {
								for (var Y, z = W[ze](Zb), Z = z[V]; Z--;) Y = z[Z], z[Z] = "" === z[Z] ? Yg : w.Yu(z[Z]);
								Y = z[YC](), wU(y[Y]) && y[Y].apply(y, z)
							}
					} else $ = w.zV(yR + "\\{([^}]+)\\}")[Zn](yQ().zk), $ && (P[Yc].hash = WG.zk || "_", r({
						source: XL(_[p], x),
						data: $[1],
						origin: Ym
					})), zo(r, n, yR, 222)
				}
				for (yJ || !/^en/i[zi](W[Vp]) && (W[Vp] || "en" != WV || wr) ? (yu = "100% 0", xT = "100% 100%", Wa = 0) : (yu = "0 0", xT = "0 100%", Wa = 8), W.strongControls && (yu = xT), yp && (j([_[yy], _[ZF], _[YZ], _[Zf]], [yC, Vs, XQ], function (X) {
					if (!n[_[Zj].id]) {
						var y = this,
							z = y[ZR],
							$ = X[ZT] != Ye,
							Y = u(z, [yU, WN]) ? WN : "Next";
						c(_[zU + Y], $ && ""), Z(_[Zo + Y], Yu, $ ? xT : yu), vJ(z, $), $ && (VN = x), !$ && u(z, zU) && c(y, "")
				}
				}, xX), zc && (_[yy][yB] = _[YZ][yB] = -1)), s = yI[V]; s--;) j(_[yI[s]], [yC, XQ], vj, xX), j(_[yI[s]], ["onfocus", "onblur"], Vj, xX);
				j([_[T], _[zU]], [vU, "onmousedown"], q(), xX), xg && !w.zJ && (w.zJ = x, j(P[zQ], YF, _.Zr, WT)), v.zW && (Vk ? j(P, "message", r, xX) : v.Zu || (v.z = yQ(v.z, yR + "=" + Xl(WG.ZS)).R, r())), ZD || (XM || j(P, [YD, yr], wV, WT), W[vP] !== X && j(P, YD, R, WT))
			}

			function vj(y) {
				var _ = this,
					z = _[ZR] || "",
					Y = z[V] > 3,
					$ = y[ZT] == YE || y[ZT] == Za;
				Y && vJ(z, $), z !== yV && (u(z, [ZF, Zf, yZ, ZG]) ? d(_, $ ? 1 : Xw) : Y ? Z(_, Yu, $ ? xT : yu) : Z(_, [ZH, h(_[zq], $ ? VU : ZH), ZV, h(_, ZV)[g](xK, $ ? xC : wM), "textDecoration", $ ? "underline" : ""]))
			}

			function vJ($, z) {
				z && xS == yN && _[$][E] ? n[$] || zo(function () {
					var _, z = $ == xO ? zn : $ == zn ? xO : (_ = /lay(Prev|Next)/[Zn]($)) ? Zo + _[1] : (_ = /fb(Prev|Next)/[Zn]($)) ? zU + _[1] : $;
					zd[$] = zd[z] = x, zE(function (_) {
						r(_[$], E, t), r(_[z], E, t)
					})
				}, n, $, 1777) : zS(n, $)
			}

			function Vj(W) {
				var x = this,
					w = W[ZT] == Za && !O.X;
				yV = t, (x[yC] || Yk)(W), w && (Z(_[yc], [Zk, ye, yE, 1, y, x[yk], z, x[yS], $, x[a] - 2, Y, x[zu] - 2, zN, +x[m][zN] + 77, "outline", XE + " dotted 1px"]), x.hideFocus = X, yV = x[ZR], _.Zy()), s(_[yc], w && ""), L(_[yc], w && x[wI])
			}

			function VJ(Z) {
				var z, $ = Z[yb],
					y = _[p],
					Y = x;
				!$ || O.r || Z[ZT] != zk && O.X == zg || (z = $[ZR] == yc ? yV : $[ZR] || "", u(z, [WN, yy]) ? _[Yz](XC) : u(z, ["Next", YZ]) ? _[Yz](yf) : z == ZA ? _[zJ](X) : z == Yt ? _[zJ](x) : _.zY && (z == yZ || $ == y && y[m][Zw]) ? _.zY(Z) : u(z, "Close") || v[vN] && zm(_[F], $) ? _[zw]() : zm(_[Ys], $) ? YA(_[Ys][ZJ]) : zm(_[yK], $) ? Vn(y, v.printCSS) : zm(_[zf], $) ? _[Yz](xy($.rev || $[zq].rev)) : Y = X, Y && (zp(Z), z != ZA && _[zJ](x)))
			}

			function WE() {
				var w, X, W, V;
				try {
					w = XL(_[p]), X = w[zQ], W = X && Wv(w)
				} catch (U) { }
				6 == _._ && W && !u(W, ws) && (vG ? v[Y] && v[$] || (Z([X[zF], X[Zu]], ZO, Xp), _[YD]()) : (V = W[ze]("#")[1], V && (w[yr](0, zy(zI(V, X), x)[z] + zr(z, w)), P[yr](zl[y], zl[z])), vG = x), xg && j(X, YF, _.Zr, yi), ZI || Yv || j(X[zF], [wL, zg], _.Zy, yi)), w = X = t
			}

			function vi(b) {
				var w, j, p, r, i = "borderColor",
					M = _.x,
					H = ZX && M.O,
					E = _[J],
					v = _[T],
					o = _[zU],
					O = _[WY],
					P = _[Yl],
					u = _[xN],
					a = _[ZF],
					A = _[Zf],
					l = O[m],
					D = S(120 - zC, 70),
					zz = Zq(D / 2),
					zY = v[zs],
					K = zY[Zu];
				if (b || (_.Y = _[Wy] = _.ZQ = t, xV = Xv = Zp = zO = 0, zl = zr(), k = YX(), "static" == h(K, Zk) ? yw = C() : (yw = zy(K), yw[y] += zl[y], yw[z] += zl[z]), s(v, ""), j = v[wI] || K, s(v), j == K ? ZP = yw : (ZP = zy(j), ZP[y] += zl[y], ZP[z] += zl[z]), xH = ZP[y] - yw[y], Xh = ZP[z] - yw[z], w = wR(H ? M : yG, ZX, x), H && !w[$] && (w = wR(yG, ZX, x)), ZX ? (E[R] = H && M.Zv || xY, Z(E, [y, w[y], z, w[z], $, w[$] || 1, Y, w[Y] || 1, zA, zb, Zz, ""]), c(v), L(E, _[B]), Q[J] = w, M.zh = x) : (w[y] -= ZP[y], w[z] -= ZP[z], zv(w, function (_, $) {
					Z(v, _, $)
				}), Q[T] = w, Zc && s(_[ys], Vv && "")), _.Zp = C(w[y] - zz, w[z] - zz, D, D, T), c(_[Zj]), Z(v, [z, zX, $, 0, wj, Wf]), s([v, O, _[Zj]], ""), Z(_[F], [$, 0, Y, 0, zA, Zm, Zw, wk, Vu, "ltr"]), Q[F] = C(), Zc || (Q[T][y] = v[yk], Q[T][z] = v[yS]), Z([_[ZY], _[zW]], [y, -I, yz, xQ]), _[xn][R] = "/static/img/loader.gif", o ? (Z(o, [YU, VG, Zz, ""]), d(o, WO, Wo,
					function () {
						1 == _._ && wd()
				}, 0, n)) : wd(), G(vi, 1, 1)), 1 == b) {
					if (XV) {
						var zZ = XV[0],
							ZZ = XV[1],
							zx = "linear-gradient(" + zZ + ym + ZZ + yM;
						for (r = Zi[V]; r--;) Z(O, ZV, Zi[r] + zx);
						l[ZV] || Z(O, Yd, "progid:DXImageTransform.Microsoft.Gradient(StartColorStr=" + zZ + ",EndColorStr=" + ZZ + yM)
					}
					if (!wQ || l[ZV] || l[Yd] || (l[ZV] = "url(" + wQ + yM), Z(O, YU, xI), Z([P, u], [i, Vg, YU, XV || W[ZV] ? xP : xI]), Z(_[F], i, vg), Z([_[XO], _[zf], _[yL]], [ZH, vF, i, XE]), Z([_[wY], _[wy], _[Ys], _[yK]], ZH, XE), yW)
						for (yI[e](ys), r = yI[V]; r--;) Z(_[yI[r]], ZV, h(_[yI[r]], ZV)[g](vL, xW));
					f ? (wq = h(P, YU), wB = Zy ? h(P, VU) : wq, YK ? (Z(P, [y, -I, z, -I, YO, zC, xR, zC, YU, wB]), Z(u, [y, -zV, z, -zV, YO, zV + zV, xR, zV + zV, YU, wq])) : Xm && (U(xr + Yo, u), U(xr + XD, u), U(xr + xc, u), U(xr + yU, u))) : Z([P, u], [y, -Zy, z, -Zy, zA, Zy]), s([P, u], ""), wD(), Yw && (YQ(y, z, Yw, x), YQ(q, z, Yw, x), YQ(y, N, _.ZT, x), YQ(q, N, _.ZT, x)), p = h(_[zn], $, x) / 2, Yp = ZN(S(YH, p) + vh), XF = Yp + Yp, p = -YR(p + I), Z(_[zn], ["tr" == VX ? q : y, p, z, p]), _.zg(), vD(), yp && (Z([a, A], Yu, xT), d(a, Xw), d(A, Xw)), d(_[yZ], Xw), d(_[ZG], Xw), (W.hideObjects !== X || wE) && (xj(Xa), xj("embed"), xj(YM)), W.hideJava !== X && xj("applet"), o && !XM && (Z(o, Zk, ye), wV()), YJ && xj(Xc)
				}
			}

			function wR(V, u, U) {
				var _, v = U || XH == Wj ? W.startAt : XH,
					T = zI(v),
					Z = o(V.$, V.O),
					w = U ? zl : zr();
				if (T && (_ = zy(T), _[y] += _[$] / 2, _[z] += _[Y] / 2, _[$] = _[Y] = 0), !_ && u && v !== t && Z && Z[a]) {
					_ = zy(Z);
					var s = h(Z, YG, x),
						S = h(Z, wm, x),
						X = h(Z, "borderTopWidth", x);
					_[y] += s + X - zb, _[z] += S + X - zb, _[$] -= s + h(Z, YO, x) + X + X, _[Y] -= S + h(Z, xR, x) + X + X
				}
				return !_ && v !== t && Zh.X && (_ = C(Zh.ZY + zl[y] - w[y], Zh.zx + zl[z] - w[z])), (!_ || _[y] > k[$] || _[z] > k[Y] || 0 > _[y] + _[$] || 0 > _[z] + _[Y]) && (_ = C(Zq(k[$] / 2), Zq(k[Y] / 3))), u && (_[y] -= yw[y], _[z] -= yw[z]), _[y] += w[y], _[z] += w[z], _
			}

			function wd() {
				zo(function () {
					if (_._) {
						var X = _[xn],
							x = _[J][m][Zz] ? Zs(_[p]) == Zt ? _[p] : t : _[J];
						s(X, ""), x ? (Z(X, [y, x[yk] + (x[$] - (X[$] || xk)) / 2, z, x[yS] + (x[Y] - (X[Y] || xk)) / 2, zN, +x[m][zN] + 77]), L(X, x[zq])) : _[T][a] || (s(_[ys], ""), zP(_.Zp))
					}
				}, n, "slow", 777)
			}

			function zP(o) {
				function h(_, y) {
					"id" != _ && (Z = Q[u][_], (!zt(Z) || q[Zz] || q[yz]) && (Z = y), U = y - Z, W = p[_] || 0, (_ == $ || _ == Y) && (Z = S(Z, 0), y = S(y, 0), U = y - Z, u == T && (j && _ == $ && s[W][e]([j, _, Z + zC, U]), L && (_ == $ ? s[W][e]([L, _, Z + zC, U]) : s[W][e]([L, z, Z + I, U])))), l[W] = S(l[W], YY.abs(U)), s[W][e]([q, _, Z, U]), Q[u][_] = y)
				}
				var R, u, O, q, Z, U, N, W, v, M, s = [
						[],
						[]
				],
					p = {}, l = [0, 0],
					P = [],
					K = o === x || zh || xZ ? 0 : zt(xE) ? xE : Zc,
					j = _[ZY] && !_[ZY][m][Zz] && _[ZY][m],
					L = _[zW] && !_[zW][m][Zz] && _[zW][m],
					J = arguments;
				for ("w" == o && (p[z] = 1, p[Y] = 1), "h" == o && (p[y] = 1, p[$] = 1), M = J[V]; M--;) R = J[M], u = wu(R) && R.id, O = _[u], q = O && O[m], q ? (Q[u] = Q[u] || {}, zv(R, h)) : wU(R) && (P[1] = R);
				YP = 0,
				function k($) {
					function u(_, T, s, X, W) {
						if (X == YP && w._) {
							var $, z, Z, y, Y, U = Yq(),
								x = U - T,
								S = (x + (s || x)) / 2;
							for ((!v || _ >= 1) && (_ = 1), v && xz(b(u, _ + S / v, U, x, X, W), n, WZ, Wt), $ = W ? _ : (1 > ($ = _ + _) ? $ * $ : --$ * (2 - $) + 1) / 2, Y = N[V]; Y--;) {
								if (z = N[Y], Z = z[0], !Z) {
									_ = 1;
									break
								}
								y = z[2] + z[3] * $, z[1] == YT ? zD && (1 > y ? Z[Yd] = vs + 100 * y + yM : r(Z, Yd, t)) : y += Z[m] ? 0 : "px", Z[z[1]] = y
							}
							1 == _ && (zS(n, WZ), YP = 0, (P[0] || P[1] || Yk)())
						}
					}
					$ = _[zU] && n[_[zU].id] ? 40 : K && !n[WZ] && _.Y && 1, $ ? zo(k, n, WZ, $) : (W = s[0] ? 0 : 1, N = s[W], v = K * YY.pow(i(l[W], 2e3), .7) / 100, W || (v && xu && (v = S(v, yo)), P[0] = function () {
						s[0] = P[0] = t, k()
					}), v *= 999, YP = Yq(), u(v ? 0 : 1, YP - i(Wt, v / 2), 0, YP, o === X))
				}()
			}

			function wD(X) {
				var $, v, Y, w, W = "px ",
					x = _[Yl],
					u = X && !vH ? 0 : f,
					t = "";
				for (yO = 0, X && YH && (YK ? (xs == Xb ? ($ = 1, Y = -.3) : "halo" == xs ? ($ = 0, Y = .7) : ($ = .25, Y = .45), $ = YR($ * YH) + W, v = YR(.8 * YH) + W, Y = YR(Y * YH) + W, t = $ + $ + v + Y + "rgba(0,0,0," + Vw + yM) : (U(XS + Yo, x), U(XS + XD, x), U(XS + xc, x), U(XS + yU, x), yO = YR(1.3 * YH))), w = Zi[V]; w--;) Z(x, Zi[w] + VT, t);
				YQ(y, z), YQ(q, z), YQ(y, N, u), YQ(q, N, X && xv ? 0 : u)
			}

			function YQ(K, H, w, g, u) {
				if (w = M(w, f), YK) u = "border-" + H + yl + K + "Radius", g ? Z(_[F], u, w) : (Z(_[Yl], u, w), Z([_[xN]][Xo](xF ? [_[T], _[Zj], _[WY], _[ys]] : []), u, w ? XI : 0));
				else if (Xm) {
					var j = "arcSize",
						J = 7777,
						i = K == y ^ H == z,
						t = K == y ? i ? yU : Yo : i ? XD : xc,
						O = _[XS + t],
						S = _[xr + t],
						n = _[B][zs],
						W = zx(Xd, n),
						x = zx("v:fill", n),
						v = zx(Xd, n),
						V = zx(Xd, n),
						U = f + yO,
						r = U + U,
						R = -I - yO,
						G = yO * (xs == Xb ? 1 : xs == vS ? .33 : 0),
						Q = R + G,
						m = I - f - Q,
						l = zC - f,
						k = -f - 1,
						h = k + Zy,
						p = yO / J,
						P = yO / r,
						o = t == Yo ? [
							[Y, U, z, Q, y, Q, YO, m],
							[Y, r],
							[Y, f, z, -I, y, -I, YO, l],
							[Y, Xi, N, k],
							[Y, xh, y, Zy, N, h]
						] : t == XD ? [
							[$, U, q, R, z, Q, xR, m],
							[$, r, q, 0],
							[$, f, q, -I, z, -I, xR, l],
							[$, Xi, y, k],
							[$, xh, y, h, z, Zy]
						] : t == xc ? [
							[Y, U, N, R, q, R, YG, m],
							[Y, r, N, 0, q, 0],
							[Y, f, N, -I, q, -I, YG, l],
							[Y, Xi, q, 1, z, k],
							[Y, xh, q, Zy + 1, z, h]
						] : [
							[$, U, y, Q, N, R, wm, m],
							[$, r, N, 0],
							[$, f, y, -I, N, -I, wm, l],
							[$, Xi, q, -f, N, vK],
							[$, xh, q, Zy - f, N, Zy + vK]
						];
					Z([W, x, v, V], [YS, vt, Zz, XA, Zk, ye, $, J, Y, J]), zT(O), zT(S), yO && (s(O, ""), Z(O, o[0]), Z(W, o[1]), W[j] = w ? 1 : 0, W[ZR] = "vml", W.stroked = X, x.color2 = zB, x[ZT] = "gradientRadial", x[YT] = 0, x["o:opacity2"] = .8 * Vw, i && (u = p, p = P, P = u), x.focusPosition = p + ym + P, x.focusSize = 1 - p - p + ym + (1 - P - P), L(x, W), L(W, O)), s(S, ""), Z(S, o[2]), Z(v, o[3]), Z(V, o[4]), v[j] = V[j] = w ? 1 : 0, v[ZR] = V[ZR] = Zo, v.fillColor = v.strokeColor = wB, V.fillColor = V.strokeColor = wq, L(v, S), L(V, S)
				}
			}

			function vD() {
				YW = Vx = 0, zv(l, function (Y, p) {
					var Q = "padding-",
						W = _[p],
						v = _[yY],
						V = _[ww],
						U = _[Yb],
						T = _[xO],
						t = _[WX],
						r = _[zf],
						X = u(Y, za) ? y : q,
						R = 16,
						w = 0;
					Wr[Y] && (X = yd, R = 8), Z([W, _[Zx[Y]], _[xm] == Y && r, _[wW] == Y && _[yL]], [wj, X, yE, X == yd ? "0 auto" : "", xq, X == yd ? "" : X]), Z([_[XN] == Y && _[Ys], _[Xn] == Y && _[yK], _[YB] == Y && _[XO]], [YO, X == q ? "" : R, YG, X == y ? "" : R]), _[H] == Y && (Z(YJ && X == q && v, X, 0), Z([!YJ && v, V], xq, X), c(v), s([W, v], ""), Z([U, t], [xq, _[xM] ? q : y, Q + X, Wa]), zc && Z([_[Zr], _[zR], U], [Yu, yu, Zz, ""]), Xe && (Z([V, T], [Yu, yu, Zz, ""]), Z(T, xq, X), w = T[a]), t && (Z([_[ZA], _[Yt], V, t], [Yu, yu, Zz, ""]), Z(_[ZA], z, xU ? "" : zX), Z(_[Yt], z, xU ? zX : ""), w += t[a]), Z(V, $, w), U && (w += U[a]), YW = Vx = w, Z(v, $, w)), _[xm] == Y && (!vw && VW && Z(W, ZO, Xp), Y == _[H] && Z(r, Q + X, 2), s([W, r], "")), w = xv && "br" == Y ? 1.5 : _[zn] && Y == VX ? .75 : 0, w = w && h(1.5 == w ? ZG : zn, $, x) * w, w > S(zH, xe) && Z(W, "tl" == Y ? YG : YO, YR(w))
				})
			}

			function xj($) {
				w.Zm(function (y) {
					for (var _, z = ZS($, y[zQ]), Z = z[V]; Z--;) _ = z[Z], ($ != YM || /youtube.com\/embed|vimeo.com\/video/i[zi](_[R])) && (Vi[e]([_, _[m][yz] || ""]), c(_))
				})
			}

			function XY(n) {
				if (_.x && _._) {
					var Q, T, N, P, r, m, O, l, L, u, W, h, J, y = _.x,
						i = _.Y,
						H = v.measureHTML,
						S = y.z,
						f = y.Z[ya],
						w = _[Wz],
						I = _[F],
						q = b(XY, 1);
					if (!n) return xu = yv = wp = XW = X, i && (_._ = 2, k = YX()), wA = M(v[vp], v[WI]) !== X, WR = K("autoFit", v) !== X, ZC = y.q && (v[Y] || WR) ? wA : X, Z(I, ZO, !y.u && ZC), Q = /(.+scribd.com\/)doc(\/\d+)\b/i[Zn](S), Q && (y.z = Q[1] + "embeds" + Q[2] + "/content"), ZU(f || xY, q);
					if (n) {
						if (y.w) {
							if (T = yx[S], !T || !T[R]) return ZU(S, q);
							y.P = v[$] || T[$], y.p = v[Y] || T[Y], xu = i && i.w, xu && yo && (yv = YI == vT, wp = YI == YC, XW = yv || wp || YI == Yn)
						}
						if (!(!y.q || y.H || H === X || v[$] && v[Y] && H !== x)) {
							if (m = k[$] - wn - XF - Xx, u = Yy(y.s || v[$], m), W = y.Q || v[Y], zt(W) || (W = 0), y.s = u, y.Q = W, y.u && w != _[p] && (_.Zx = w = Ze(w), _[p] = Ze(_[p])), w || (y.u ? (w = _[Wz] = U(p, I, YM, t, ZC), w[$] = u || .7 * k[$], w[Y] = W || .9 * k[Y]) : (w = U(Wz, _[B]), Z(w, [Zk, vr, !y.w && $, m, z, zX, "padding", 0, yE, 0, zA, 0, ZO, ZC])), c(w)), s([w, y.u && I], ""), _.Zx != y) {
								if (_.Zx = y, y.u) return h = j(w, wK, function () {
									Yj(h), q()
								}), w[R] = y.z;
								if (y.zj) return Vm({
									source: S,
									finish: function (_) {
										y.zX = _.responseText || "", Xz(w, y.zX), q()
									}
								});
								y.A ? (Xz(w, WU(o(y.$, S)), X, X, x), Z(w[ZJ], [Zz, WK, yz, Xp])) : y.zr && Xz(w, S)
							}
							if (1 == n) {
								for (N = ZS(Zt, w), J = N[V]; J--;)
									if (P = N[J][R], P && (T = yx[P], !T || !T[R])) return ZU(P, q);
								return G(XY, 1, 2)
							}
							if (Z(w, [$, u || "", Y, W || ""]), r = wG(y.u ? (wF(w) || {})[zF] : w[ZJ]), u = u || r[$] || 555, W = W || r[Y] || 555, O = v[VQ], O && u > O) return y.s = O, y.Q = v[Y] || 0, XY(2);
							ZC && (l = r[$] > u, L = r[Y] > W, l || L ? (L && !v[$] && (u += xl), l && !v[Y] && (W += xl)) : v[Y] || (ZC = X)), y.s = u, y.Q = W, /<\w+\b/i[zi](w[yD][WW](1)[g](/<(a|p|b|i|s|h\d|span|font)\b/gi, "")) || (v[$] || y.s++, v[Y] || y.Q++)
						}
					}
					s(w), w = t, y.P = y.P || v[$] || y.s, y.p = y.p || v[Y] || y.Q, zt(y.P) || (y.P = 0), zt(y.p) || (y.p = 0), y.P || v[$] || (v[$] = wr ? yt : "85%"), y.p || v[Y] || (v[Y] = yt), xi++, _._ && (1 == xi ? xJ(Wd) : _.N())
				}
			}

			function xJ(X, w) {
				var $, W = _.Y || {}, Y = _[p];
				if (!w) {
					for (_._ = _._ ? _.Y ? 5 : 4 : 0, zS(n, "slow"), s(_[xn]), L(_[xn]), zS(n, zw) ; $ = yi.pop() ;) Yj($);
					Xj(), _.G(x), L(_[yc]), yV = !O.X && (yV || ($ = _[T][zs][Vq]) && $[ZR]), ZQ.S.zN(), s(_[ZG], !zD && ""), Vz = Yv ? _[T] : _[Zj], d(Vz, 5 == _._ && "fade" != YI ? 1 : 0, vZ, b(xJ, X, 1), 0, n)
				}
				1 == w && (Y && (r(Y, ZB + XB, t), W.zW && (Y[R] = ws, W.zz && s(Y))), s(_[ZG]), zv(l, function ($, Y) {
					$ == _[H] && Yi || Z(_[Y], [y, "", q, "", N, "", Wf, zX, z, zX])
				}), X())
			}

			function Xj(X) {
				if (X != wo) {
					var $, Y, W = X ? "fixed" : ye,
						x = _[T],
						w = Q[T],
						v = x[yk],
						V = x[yS];
					wo = X, h(x, Zk) != W && (Z(x, Zk, W), $ = zr(), Y = X ? -1 : 1, v += ($[y] - ZP[y]) * Y, V += ($[z] - ZP[z]) * Y, w && zt(w[y]) && (w[y] += $[y] * Y, w[z] += $[z] * Y), Z(x, [y, v, z, V]))
				}
			}

			function Wd(J) {
				function e(z, $, Y, X, w, x) {
					y = t, $ && (s($), x || zT($), (Y || x) && (y = zx(zZ, Zz), Y && (y[ZW] = Xl(Y)), zT(y, v[z + "Text"] || X), y[ZR] = Zo, zM(y, B), Z(y, ZH, h($, ZH)), y[yB] = 777 - _.U, j(y, [yC, XQ], vj, yi), j(y, [Za, xo], Vj, yi), y[wh] = Yk, L(y, $), z = _[z + (x ? "" : "Link") + yn], s([$, _[l[z]], w && _[Zx[z]]], "")))
				}
				var y, d, W, Q, zy, N, C, m, S, z = _.x,
					a = z.z,
					Zy = v.altContent || "",
					T = _[p],
					A = _[F],
					Zz = _[B][zs];
				if (J || (XZ(z.zp) || (z.zp = XZ(m = v.proportionalResize) ? m : u(v[Y], "%w") || !z.q && !u(v[$], "%") && !u(v[Y], "%")), !T || z.w && Zs(T) == Zt || z.u && _.Zx == z || (fb[p] == T && yX(fb, p), T = _[p] = Ze(T)), G(Wd, 1, 1)), 1 == J && (J = 2, z.w ? (T = T || U(p, A, Zt), r(T, "alt", Zy), xu || (T[R] = yx[a][R])) : z.zW ? (T = T || U(p, A, YM, t, ZC), r(T, E, Zy), z.u && !z.H && (j(T, wK, WE, yi), z.s && WE())) : (T = U(p, A), z.zr && Xz(T, a, x), z.A && (wv(o(z.$, z.zw)[ZJ], T), zv(ZS(zZ, T)[Xo](ZS(WM, T)), function ($, _) {
					zM(_, "nofloatbox")
				}), YJ && c(ZS(Xc, T), "")), z.zj && (xL(z.zX) ? Xz(T, z.zX, x) : (J = 1, Vm({
					source: a,
					updateNode: T,
					wrap: x,
					finish: b(Wd, 2)
				}))), z.zz && Z(T, [$, yt, Y, yt]))), 2 == J) {
					for (Z(T, zA, 0), S = Xy[V]; S--;) {
						var W, M, Q = Xy[S],
							q = v[Q];
						q && (m = Vl[Zn](q), m ? (W = _[yj(xB + Q)], M = W && W[ZJ] && W[ZJ].id == m[1] ? W[ZJ] : o(z.$, m[1]), W && M && (M[zq].id == W.id && M[zq] != W ? q = "" : z.ZU[S] = M[zq] == W && _.Y ? _.Y.ZU[S] : w.ZF(M).id)) : u(Q, zj) && q == ZW ? q = (z.b || "")[g](/[-_]/g, " ") : /&lt;.+&gt;/[zi](q) ? q = vM(q) : wS[zi](q) || (q = Xl(q)), z.zT[S] = q)
					}
					for (Z([_[Zr], _[zR]], Yu, yu), zv(l, function ($, z) {
						$ != _[H] && s([_[z], _[Zx[$]]])
					}), S = Xy[V]; S--;) Q = Xy[S], W = _[yj(xB + Q)], W && (s([W, _[l[_[Q + yn]]]], ""), d = o(z.$, z.ZU[S]), d ? (y = d[ZJ], y && d != W && (zT(W), wv(y, W))) : z.zT[S] ? zT(W, z.zT[S]) : (s(W), zT(W)), u(Q, zj) && Z(ZS(Ym, W), ZH, XE));
					if (c([v[Zg] != xx[Zg] && _[ZY], v[zG] != xx[zG] && _[zW]]), W = _[XO], W && (zy = ZZ[wO ? 7 : xG ? 9 : 8], zT(W, zy[g]("%1", zY + 1)[g]("%2", Zv)), s([_[l[_[YB]]], _[Zx[_[YB]]], W], "")), e("info", _[Ys], v.info, ZZ[10], x), r(y, "rev", w.YW(yq(v.infoOptions))), e("print", _[yK], v[vQ] && !we && !z.H && z.z, ZZ[11], x), e("newWindow", _[yL], v[vq] && z.zu && z.z, ZZ[16]), y && ((v.showNewWindowIcon === X || yJ) && Z(y, [YG, 0, ZV, ZL]), N = h(y, ZV), xK[zi](N) && (yW && (N = N[g](vL, xW), Z(y, ZV, N)), ZU(N[g](/url\(([^\w\/]?)(.+)\1\)/i, "$2")[g](xK, xC))), j(y, wh, function ($) {
						return O.X && !O.r && wg(!z.H && Wv(XL(T)) || T[R] != ws && T[R] || this[ZW]) && v.closeOnNewWindow && _[zw](), zp($)
					}, yi)), W = _[zf]) {
						var P, n, I, k, D, f, zX = "&nbsp;",
							K = Zv - 1;
						for (zT(W), -1 == xt ? (P = 0, n = K) : (I = (xt >>> 1) - 1, P = zY - I, n = zY + I, 0 >= P && (n += i(1 - P, I)), zY || n++, n - K >= 0 && (P -= i(1 + n - K, I)), zY == K && P--), S = 0; Zv > S;) S = (C = S && P > S) ? P : (C = S != K && S > n) ? K : S, C && (y = zx(zK, Zz), zT(y, "..."), Z(y, ZH, h(W, ZH)), L(y, W)), k = zz[S], k.zu && (f = VW && !Zd && (k.Zk || k.Zv), f == k.Zk && ZU(f), e(xb, W, k.z, zX + (S + 1) + zX, X, x), y.rev = S, S == zY && (zM(y, "fbCurrentIndex"), Yj(y, [yC, XQ]), y.rev = ""), f && (zM(y, "fbPop" + (vw ? wJ : _.indexTop ? "down" : "up")), D = zx(Zt, Zz), D[R] = f, zM(D, "fbPopper"), L(D, y))), S++
					}
					s(_[Yb], Zv > 1 && ""), G(_.N)
				}
			}

			function vI(z) {
				function t(z) {
					var y = 0,
						Y = _[l[z]];
					return Y && (Z(Y, $, z == _[H] && V || X), y = S(_[H] == z ? _[yY][a] : 0, Zx[z] ? _[Zx[z]][a] : 0, _[vn] == z ? _[wY][a] : 0, _[VO] == z ? _[wy][a] : 0, _[xm] == z ? _[zf][a] : 0, _[wW] == z ? _[yL][a] : 0), y && y++), y
				}

				function y(y) {
					if (!U[y]) {
						var w = y[WW](0, 1) + (u(y, za) ? "r" : za),
							T = _[l[y]],
							W = _[l[w]],
							Y = t(y),
							z = W && t(w) || 0;
						z > v && (z = Y > v || Wr[y] ? v : S(i(z, X - Y - wT), 0)), w == _[H] && YW > z && (z = YW), Y = S(X - z - (z ? wT : 0), 0), y == _[H] && YW > Y && (Y = YW, W && (z = S(i(z, X - Y - wT), 0))), Z(T, $, y == _[H] && V || Y), Z(W, $, w == _[H] && V || z), U[y] = U[w] = x
					}
				}
				var X = S(z - wN - wN, 0),
					v = S(X - wT >>> 1, 0),
					V = (Yi && Q[l[_[H]]] || {})[$] || 0,
					U = {};
				W.centerNav && zc && (YW = Zq((z + h(_[Yb], $, x)) / 2 - zH), Z(_[yY], $, Yi ? yt : YW)), Z([_[zf], _[yL]], $, ""), zv(Wr, y), zv(l, y)
			}

			function WD(x, v) {
				var Z = I - zb,
					V = Q[T],
					w = Q[F],
					W = Q[J],
					u = {};
				_._ && (v || (x.zh = X, ZQ.S.Zl(x), _[J][R] = ZX, zP(C(V[y] + w[y] + Zm - zb + xH, V[z] + w[z] + Zm - zb + Xh, w[$], w[Y], J), b(WD, x, 1))), 1 == v && (D(u, V, {
					id: T
				}), Q[T] = C(W[y] + Z - xH, W[z] + Z - Xh, W[$] - Z - Z, W[Y] - Z - Z), c(_[T], ""), zP(X, u, b(WD, x, 2))), 2 == v && zo(function () {
					s(_[J]), _[J][R] = xY, L(_[J]), wc()
				}, n))
			}

			function wc(f) {
				function e() {
					new P.YT.Player(S.id)
				}
				if (_._) {
					var j, U, O = "titleOff",
						V = _.x,
						D = P[zQ],
						L = D[zF],
						S = _[p],
						J = _[F],
						i = _[wY],
						I = _[wy],
						G = _[ZG];
					if (!f) {
						if (xu = yv = XW = xE = X, !vW && (U = k, k = YX(), U[$] < k[$] || U[Y] < k[Y])) return vW = x, _.N(!(!XX && !xw));
						vW = X, j = Q[T][$] <= k[$] && Q[T][Y] <= k[Y], U = W.boxScroll, Xj(j && XM && !U && (U === X || Ws && V.u)), 4 == _._ && P == top && j && !ZD && W.pageScroll === X && L[VR] > L[wZ] && (Z(L, [wl, xl + h(L, wl, x), ZO, X]), P[yr](zl[y], zl[z]), vf = x), V.zW ? (u(S[R], V.z) || (S[R] = V.z), V.Zu == xa && (P.YT ? e() : (P.onYouTubeIframeAPIReady = e, wt(Xk + "www.youtube.com/iframe_api")))) : V.zz && ZQ.g.yY(S, V, v), Zv > 1 && (Xf = zY ? zY - 1 : vz && Zv - 1, Yh = Zv - 1 > zY ? zY + 1 : vz && 0, yP = zz[Xf] && zz[Xf].z || t, YV = zz[Yh] && zz[Yh].z || t), zc && (r(_[Zr], ZW, yP), _[Zr][E] = yP ? _[Zr][E] || _[Zr][O] || "" : "", _[Zr][O] = yP ? "" : _[Zr][E], Z(_[Zr], ZV, h(_[Zr], ZV)[g](xK, yP ? xC : wM)), r(_[zR], ZW, YV), _[zR][E] = YV ? _[zR][E] || _[zR][O] || "" : "", _[zR][O] = YV ? "" : _[zR][E], Z(_[zR], ZV, h(_[zR], ZV)[g](xK, YV ? xC : wM))), yp && (r(_[yy], ZW, yP), r(_[ZF], ZW, yP), r(_[YZ], ZW, YV), r(_[Zf], ZW, YV), c(_[yy], yP && ""), c(_[YZ], YV && "")), s(_[zn], ""), c([_[Zj], S, v[Zg] && _[ZY], v[zG] && _[zW]], ""), zv(l, function ($, Y) {
							$ == _[H] && Yi || Z(_[Y], [y, "", q, "", z, "", N, "", u($, yT) ? z : N, wb[$]]), Z(_[Y], u($, za) ? y : q, wN)
						}), Z(G, [q, xv ? -zV : Xt + Zm, N, xv ? -zV : Zl + Zm - zV]), s(G, !zD && ""), vv && (Z(i, Zw, i && wS[zi](i[yD]) ? "" : Yf), Z(I, Zw, I && wS[zi](I[yD]) ? "" : Yf)), Z(J, YU, v[wi] || (V.q && !V.u ? Wk : "")), s([J, S], ""), 5 > _._ && (wD(x), c(_[yY], ""), U = W.showMagCursor == yN && o(V.$, V.V), U && Z(U, Zw, U[m].fbCursor || ""), vv && Z([_[Zj], _[Yl], _[xN], _[XO]], Zw, Yf), A(W.afterBoxStart, _)), U = K(XB, V.Z), U && (r(S, ZB + XB, (K("tooltipOptions", V.Z) || "") + " source:`" + U + "`"), zM(S, XK)), _.G(), s(_[ys]), vl(_[T]), vZ = ZX ? 0 : M(v.fadeTime, .4), d(Vz, 1, 5 == _._ && "fade" == YI ? yo : vZ, b(wc, 1), 0, n)
					}
					1 == f && (s(G, ""), V = _.Y, V != _.x && (_.ZQ = V, V = _.Y = _.x, _[Wy] = zY), _[yV] ? (_[yV][xo](), _[yV][Za]()) : 5 > _._ && !zm(_[T], D[Vq]) && J[Za](), A(v.yT), U = W.autoEnd, U && zo(_[zw], n, zw, 999 * U), wC(V), _._ = 6, V.u && !V.H && WE(), zo(function () {
						_ && zz && (ZU(zt(Yh) && zz[Yh].w && YV, t, x), A(v.afterItemStart, _), U = !ZD && !w.Zi && vm(), U && (w.Zi = !w.Zo(t, U)))
					}, n, 0, 77))
				}
			}

			function wC($) {
				Xu && ($ && !$.zP && ($.zP = x, WC++), xU || zo(function ($) {
					if (_._)
						if ($ = W.afterSlideshow, Zv > WC || "loop" == $) _[Yz](yf);
						else if ("stop" == $) {
							for (_[zJ](x), $ = Zv; $--;) zz[$].zP = X;
							WC = 0
						} else _[zw]()
				}, n, Yn, 999 * (W.slideInterval || 4.5)))
			}

			function XJ(w, v) {
				var V = Q[F],
					S = V[$],
					u = Q.thumb,
					r = Zm - zb;
				if (_[p][$] - S > 5 && (v = -1, zP(C(0, 0, S, V[Y], p), b(XJ, w))), v || (Z(_[J], zA, zb), _[J][R] = ZX, L(_[J], _[B]), zP(x, C(Q[T][y] + V[y] + r + xH, Q[T][z] + V[z] + r + Xh, S, V[Y], J), function () {
					s(_[J], ""), G(XJ, 77, w, 1)
				})), 1 == v && (c(_[Zj]), xJ(b(XJ, w, 2))), 2 == v) {
					var W = I - zb,
						U = Q[J];
					s([_[yY], _[ZY], _[zW], _[zn]]), zP(X, C(U[y] + W - xH, U[z] + W - Xh, U[$] - W - W, U[Y] - W - W, T), b(XJ, w, 3))
				}
				3 == v && (s(_[T]), zP(C(u[y], u[z], u[$], u[Y], J),
					function () {
						u[$] ? w.Zv && (_[J][R] = w.Zv) : s(_[J]), _[zw](t, 1)
					}))
			}
			var Xx, XX, xw, WR, vh, wq, yw, wB, wQ, vH, xI, f, Xi, ZD, XI, xh, Wb, WB, Wq, wa, Vh, yW, xW, Yw, WQ, wA, Yi, Xw, Wa, YW, zV, XW, yv, wp, k, xH, Xh, xv, xV, Xv, Zp, zO, zh, wP, XH, Wp, xg, WA, vz, vZ, Vz, VH, WP, VZ, yV, XV, vy, vY, Vy, VY, xG, Xg, XG, vx, vX, xf, ZP, xu, YI, zY, Zm, vg, Yv, wo, vG, xU, ZM, Xu, Zv, wO, XU, yh, yH, Vx, xF, zc, yp, xt, yP, YV, Xf, Yh, yu, xT, Zy, Vg, VX, I, zC, Yp, XF, VG, Wo, WO, zH, wn, vf, xe, wN, vw, Xt, vW, Zc, xE, YP, XT, ZC, Vw, YH, xs, Xe, xS, VW, vv, vV, yg, Vv, Xs, Zh, zl, yG, XE, vF, zL, Zl, yo, yO, xd, xD, zb, ZX, _ = {}, v = {}, W = {}, xx = {}, Wc = -1,
				zz = [],
				n = {}, xX = [],
				yi = [],
				Vi = [],
				WC = 0,
				xi = 0,
				VI = [],
				l = {}, Wr = {}, Zx = {}, Q = {}, wb = {}, yI = [zn, ZF, Zf, yZ, Zr, zR, ZA, Yt, xO, ZG];
			return zE(function ($) {
				Wc = S(Wc, $.U), ZI && !_.k && $._ && $.zZ && (_.k = $)
			}), ZD = Yx[V], Yx[e](_), D(_, {
				_: 1,
				U: Wc + 1,
				zZ: ZI,
				ZR: Q,
				y: [],
				W: [],
				c: {
					y: [],
					W: [],
					ZV: {}
				},
				S: {
					y: [],
					W: []
				},
				j: {
					y: [],
					W: []
				},
				D: {
					y: [],
					W: []
				},
				zD: function (Z, t, $, z) {
					var y, Y, u, U;
					if (yG = t, _.x = $, !Z && A(K("beforeBoxStart", z)) === X || A(K(vR, z), _) === X) return !Z && _.ZX();
					if (_.h = z.h, _.ZW = z.ZW, Yv = _.yx = _.ZW || _.h, $.v || Yr.unshift($), _.zs = v = D({}, ZE, z), ve($), !Zv) return !Z && _.ZX();
					if (Z) y = _.Y, y && (Y = y.Z, We(y, Y[Zg] == yG.Z[Zg], Y[zG] == yG.Z[zG]), A(K(WJ, Y)));
					else {
						if (!Yv)
							for (U = Yx[V]; U--;) u = Yx[U], u && u.yx && u[zw]();
						Zh = D(O), vE($), _[wz] = (W.instanceName || $.b) + "", _.k && _.k[zJ](x), Ve(), VK(), VE(), w.t = _, A(v.ZE, _), vd($), vi()
					}
					G(XY)
				},
				Zy: function () {
					var $ = _.U,
						z = w.t.U;
					!ZI && z > $ && (_.U = z + 1, zE(function (_) {
						_.U > $ && (_.U--, _.zg())
					}), w.t = _)
				},
				zg: function () {
					if (_._)
						for (var z = [B, zU, Yl, xN, we && WS && !ZI ? "" : T, WY, ys, Zj, F, p, yy, YZ, ZF, Zf, yZ, J, Vo, vO, vo, VP, zn, ZG], $ = z[V], y = (W[zN] || -zX) + $ * _.U; $--;) Z(_[z[$]], zN, y + $)
				},
				Zr: function (z) {
					var Y = _ && _._ && (_.Y || _.x),
						Z = w.t,
						$ = z[XP],
						y = z.ctrlKey || z.shiftKey || z.altKey || z.metaKey;
					WF && y && (38 == $ || 40 == $) && ($ = 38 == $ ? 33 : 34, y = X), _ != Z ? Z && Z._ && Z.Zr(z) : xg && Y && !y && "null" != fb.typeOf(P) && !u(Zs(z[yb]), [Wl, Xc, Vt]) && ((37 == $ || 39 == $) && Zv > 1 && (zp(z), _[zJ](x), _[Yz](37 == $ ? XC : yf), xS == yN && (zc && (_[Zr][E] = _[zR][E] = ""), yp && (_[ZF][E] = _[Zf][E] = ""), zd[Zr] = zd[zR] = zd[ZF] = zd[Zf] = x)), 32 == $ && ZI && !Y.q && (zp(z), Xu && (_[zJ](!xU), yg && xS == yN && (_[ZA][E] = _[Yt][E] = "", zd[ZA] = zd[Yt] = x))), 33 != $ && 34 != $ || !_.zY || (zp(z), _[zJ](x), _.zY(34 == $), xS == yN && (_[yZ][E] = "", zd[yZ] = x)), 13 == $ && VJ(z), 27 == $ && (zp(z), _[zw]()))
				},
				pause: function ($) {
					Xu && (xU = $, $ ? zS(n, Yn) : _[Yz](yf), yg && (Z(_[ZA], z, $ ? "" : zX), Z(_[Yt], z, $ ? zX : "")))
				},
				showItem: function ($) {
					var Z = _.Y,
						z = {};
					$ = $ == XC ? yJ ? Yh : Xf : $ == yf ? yJ ? Xf : Yh : $, Z && 6 == _._ && zz[$] && A(v[Vr], _) !== X && D(z, ZE, zz[$].Z) && A(z[vR], _) !== X && (zY = $, _.x = zz[zY], xx = v, v = _.zs = z, zS(n, Yn), ZU(t, t, X), We(Z, xx[Zg] == v[Zg], xx[zG] == v[zG]), A(xx[WJ]), w.Zt(_), wd(), G(XY))
				},
				N: function (zx, Zx, zw, zi, Zw) {
					function ZW(_) {
						return ZQ.j.Zd(h + I, E + I, _, K)
					}

					function zI($) {
						$ = zg ? 2 : 0, _._ && zP(zj, C(o, O, h, E, T), C(Xt + Zr, zL - zV + ZR, w - $, U - $, F), Zs(ZT) != xA ? zF : t, b, Zy, zi || function () {
							_[T] && _._ && (ZT[R] != ZL && (ZT[R] = ZL), XW && (zy[R] = xY, s(zy), d(zy, 1), L(zy)), 4 == _._ && ZX ? WD(K) : wc())
						})
					}
					var w, U, h, E, o, O, ZV, zp, zo, ZO, j, zs, zS, zn, r, Zu, A, g, zN, P, c, Zi = "minBoxWidth",
						ZI = "minBoxHeight",
						K = _.x,
						ZH = _.Y,
						ZS = K.P,
						zM = K.p,
						zR = K.zp,
						ZU = Q[T],
						zl = K.z,
						ZL = yx[zl] && yx[zl][R] || zl,
						zz = M(v.boxLeft, W.boxLeft),
						zZ = M(v.boxTop, W.boxTop),
						zk = zt(zz),
						zK = zt(zZ),
						Zr = M(v[Zi], W[Zi] || 0),
						ZR = M(v[ZI], W[ZI] || 0),
						Zn = W.placement,
						ZZ = {}, Zt = _.h,
						zg = K.Zz && wE;
					if (yH = S(Vx, v.minContentWidth || (K.q || Yv ? 0 : 140)), yh = v.minContentHeight || (K.q || Yv ? 0 : 100), _._ && _[T]) {
						Zw || zh || (WP = VZ = 0, zv(l, function (y, z) {
							Z(_[z], $, _[z][m][$] || ZN(.7 * ZS) || 500)
						}), Z([_[ZY] && !_[ZY][m][$] && _[ZY], _[zW] && !_[zW][m][$] && _[zW]], $, ZS || 700)), zL = Zl = 0, zv(l,
							function ($, z) {
								ZZ[$ + Xr] = P = _[z][zu], u($, yT) ? zL = S(zL, P) : Zl = S(Zl, P)
							}), j = xe + xe, zL && (zL += j), Zl && (Zl += j), zL = S(zL, zH), Zl = S(Zl, zH), ZZ.Header = _[ZY] ? _[ZY][zu] : 0, ZZ.Footer = _[zW] ? _[zW][zu] : 0, ZV = S(ZZ.Header + 2, Yp), zp = S(ZZ.Footer + 2, Yp), zo = S(k[$] - wn - XF - Xx, yH), ZO = S(k[Y] - zL - Zl - ZV - zp - Xx, yh), zh && wa ? (w = wa + Zp + XX, yH > w && (A = (Zp + (yH - w)) / Zp, Zp *= A, zR && (zO *= A), w = yH), U = Vh + zO + xw, yh > U && (g = (zO + (yh - U)) / zO, zO *= g, zR && (w -= Zp * (1 - g), Zp *= g), U = yh)) : (XZ(zx) || (zx = K.w && W.stickyAutoFit && XZ(ZM) ? ZM : WR), Zx && zw ? (w = Zx, U = zw) : (XX = xw = 0, w = Yy(v[$], zo) || K.s || ZS, U = Yy(v[Y], u(v[Y], "%w") ? w : ZO) || K.Q || zM, r = Ya(w, U, v[VQ] || w, v.maxContentHeight || U, zR, X, -1), wa = w = r[$], Vh = U = r[Y], W.stickyDragResize !== X && !K.q || xZ || (Zp = zO = 0), P = Zp + zO, P && (g = P / (w / U + 1), A = P - g, w += A, U += g)), zx && (r = Ya(w, U, zo, ZO, zR, X, -1), XX += r[$] - w, xw += r[Y] - U, w = r[$], U = r[Y]), r = Ya(w, U, yH, yh, zR, x, 1), w = r[$], U = r[Y]), w = Zq(w), U = Zq(U), h = w + Xt + Xt + Zm + Zm, Zr && (P = Yy(Zr, k[$] - XF) - zC, Zr = 0, P > h && (Zr = ZN((P - h) / 2), h = P)), E = U + Zm + Zm + zL + Zl - zV - zV, ZR && (P = Yy(ZR, k[Y] - XF) - zC, ZR = 0, P > E && (ZR = ZN((P - E) / 2), E = P)), Zx && zw && 3 == Zw || vI(h), Z([_[zf], _[yL]], $, yt);
						var f = [],
							Zk = X;
						for (zv(l, function (_) {
							f[e](_ + Xr)
						}), f[e]("Header", "Footer"), c = f[V]; c--;)
							if (zs = _[Zo + f[c]], zs && zs[zu] != ZZ[f[c]]) {
								Zk = x;
								break
							}
						for (f = Xy[Xo]([xb]), c = f[V]; c--;) zS = _[yj(xB + f[c])], zs = _[l[_[f[c] + yn]]] || zS, zS && !zS[m][Zz] && 50 > zs[a] && (s(zS), Zk = x, Zw = 2);
						if (WP || (WP = w, VZ = U, VH = h), Zk && 3 != Zw) return 2 == Zw && (zx = X, vI(VH), Zx = Zx || WP, zw = zw || VZ), _.N(zx, Zx, zw, zi, (Zw || 0) + 1);
						if (xd = (ZS || w) - zo, xD = (zM || U) - ZO, zx && !zh && 2 > xi && K.s && (xd > 0 || xD > 0)) return K.s = 0 > xd && xD > 0 ? t : w, K.Q = xd > 0 && 0 > xD ? t : U, ZC = x, XY();
						if (xi = K.s = K.Q = 0, zT(_[Wz]), _.Zx = K.zX = t, zh) o = ZU[y], O = ZU[z];
						else if (XM ? (P = wo, Xj(x), Zu = zr(), Xj(P)) : (ZH && Z(_[T], [y, "", z, zX, Wf, zX]), wV(), Zu = zr(), ZH && Z(_[T], [y, ZU[y], z, ZU[z], q, ""])), Wp || xZ || (xV = Xv = 0), Zt ? o = ZW()[y] : zz == ZK && Zh.X ? o = Zh.ZY + 2 : (zk ? o = zz : (o = (k[$] - h) / 2 - I, o += Yy(zz, o)), o += Zp / 2 + xV), o += Wb, j = o + wn + Xx + w + Yp - k[$], j > 0 && (o = Zt && Zn == q ? ZW(y)[y] : o - (zk ? 0 : j)), Yp > o && (o = Zt && Zn == y ? ZW(q)[y] : zk ? zz : Yp), Zt ? O = ZW()[z] : zZ == ZK && Zh.X ? O = Zh.zx + 2 : (zK ? (O = zZ, zN = 3) : (P = k[Y] - E - zC - ZV - zp, zn = P / k[Y], zN = .15 >= zn ? 2 : .3 > zn ? 1 + zn / .15 : 3, O = P / zN + ZV, O += Yy(zZ, O)), O += zO / zN + Xv), O += WB, j = O + Xx + zL + Zl + U + zp - k[Y], j > 0 && (O = Zt && Zn == N ? ZW(z)[z] : O - (zK ? 0 : j)), ZV > O && (O = Zt && Zn == z ? ZW(N)[z] : zK ? zZ : ZV), o = Zq(o + I), O = Zq(O + I), wo || (o += Zu[y] - ZP[y], O += Zu[z] - ZP[z]), _.k && K.q && !xV && !Xv && (zz === Yg || zZ === Yg)) {
							P = ["max", "%"];
							var zG = _.k.ZR[T],
								Zg = u(ZS, P) ? 1 / 0 : (zG[y] + o) / 2,
								ZG = u(zM, P) ? 1 / 0 : (zG[z] + O) / 2;
							Zg > Zu[y] && ZG > Zu[z] && (zz === Yg && (o = i(o, Zg)), zZ === Yg && (O = i(O, ZG)))
						}
						Z(_[ZY], z, -ZZ.Header - I), zv(l, function ($, z) {
							wb[$] = Zq(((u($, yT) ? zL : Zl) - _[z][zu]) / 2 - zV)
						}), j = zg ? -1 : 0;
						var zm, b, zj, zJ = Q[F],
							zq = Q[p] || zJ,
							B = zJ[$],
							Zj = zJ[Y],
							zQ = zq[$],
							ZJ = zq[Y],
							ZT = _[p],
							zy = _[J],
							zF = C(j, j, w, U, p),
							Zy = {};
						Yi && (Zy[$] = YW, Zy[_[Ww] ? z : N] = wb[_[H]], Zy.id = l[_[H]], Q[Zy.id] || (Q[Zy.id] = Zy)), zh ? K.w && (zQ > B && zQ > w || ZJ > Zj && ZJ > U) && (A = w - B, g = U - B, zF = C(S(i(zq[y] + A / 2, 0), w - zQ), S(i(zq[z] + g / 2, 0), U - zQ), 0, 0, p)) : (XW && (zm = zY == (_[Wy] || S(Zv, 3)) - 1, zy[R] = ZT[R], b = D(zq), b[YT] = 1, b[zA] = 0, b.id = J, zP(x, b), L(zy, _[F]), s(zy, ""), r = Ya(zQ, ZJ, yv ? w : B, U, x, x), b = C(yv ? (w - r[$]) / 2 : zm ? w - 1 : 1 - r[$], (U - r[Y]) / 2, r[$], r[Y], J), yv && (b[YT] = 0), r = Ya(w, U, yv ? B : w, Zj, x, x), j = (B - r[$]) / 2, Q[p] = C(yv ? j : wp ? zm ? 1 - r[$] : B - 1 : zm ? i(j, 0) : j + (w > B ? 0 : j), (Zj - r[Y]) / 2, r[$], r[Y], p), Z(ZT, y, Q[p][y]), ZT[R] = ZL), zj = Xs && !XW && (h - ZU[$] < E - ZU[Y] ? "w" : "h")),
						function Zf() {
							G(_[zU] && n[_[zU].id] ? Zf : zj && 4 == _._ ? zP : zI, 50, _.Zp, zI)
						}()
					}
				},
				G: function (H, c) {
					var G = "useMap",
						R = _.x,
						U = _[p],
						f = _[yZ],
						m = _[ZF],
						e = _[Zf],
						k = zI(v[G]),
						E = yx[R && R.z],
						q = Q[F],
						M = U && U[a],
						P = U && U[zu];
					if (f && (Z(U, Zw, ""), _.zY = t, s(f), !H && R.w)) {
						var K = S(R.P, yH),
							l = S(R.p, yh),
							o = P - l ? M - K : 0,
							j = o ? P - l : 0;
						ZM = -30 > i(o, j) ? x : S(M - q[$], P - q[Y], o, j, xd, xD) > 30 ? X : t, ZM !== t && (_.zY = function (v) {
							function V() {
								_.G(X, ZM), wC()
							}
							var Z, x, w;
							v !== ZM && (zS(n, Yn), WR && W.inFrameResize !== X && 0 >= o ? ZM ? (M = U[a], P = U[zu], v[yb] == U && O.X ? (Z = zy(U), x = O.ZY - Z[y], w = O.zx - Z[z]) : (x = M / 2, w = P / 2), zP(C(S(i(o / 2 - (x / M - .5) * K, 0), o), S(i(j / 2 - (w / P - .5) * l, 0), j), K, l, p), V)) : zP(C(0, 0, q[$], q[Y], p), V) : (Zp = zO = XX = xw = 0, xJ(b(_.N, !ZM, ZM && K, ZM && l))))
						}, u(XT, [Zw, yF]) && Z(U, Zw, "url(" + (ZM ? w.ys : Vf) + "), default"), u(XT, [Wm, yF]) && Z(f, [Yu, ZM ? z : N, yE, YR(.293 * _.Zn), Zz, ""]))
					}
					if (yp && (s([_[yy], _[YZ], m, e]), !R.w || H || c || v[G] || (Z([_[yy], _[YZ]], [$, S(q[$] * (W.navOverlayWidth || 30) / 100, m[a]), Zz, ""]), Z([m, e], z, (q[Y] - m[zu]) * (W.navOverlayPos || 30) / 100), (vV === x || vV == yN && !VN) && Z([m, e], [yz, xQ, Zz, ""]))), !H && k && k.id && U && E) {
						for (var L, B = U[$] / E[$], zz = U[Y] / E[Y], d = ZS(WM, k), D = d[V]; D--;) {
							var J = "coords",
								I = d[D],
								T = r(I, J),
								h = r(I, YN + J);
							if (T && u(T, ym)) {
								for (h || (h = T[g](/\s/g, ""), r(I, YN + J, h)), T = h[ze](ym), L = T[V]; L--;) T[L] = Zq(+T[L] * (L % 2 ? zz : B));
								r(I, J, T.join(ym))
							}
						}
						r(U, G, "#" + k.id)
					}
					A(v.afterResize, _)
				},
				end: function (S, L) {
					function o() {
						Zc ? (s(_[ys], Vv && ""), s([_[Zj], _[yY], _[ZY], _[zW], _[zn]]), Z(_[Yl], VT, ""), Xs ? (Xs = X, U = _.Zp, U[y] = Zq(u[y] - U[$] / 2), U[z] = Zq(u[z] - U[Y] / 2), zP(K[$] < K[Y] ? "h" : "w", U, o)) : (xE = Zc, Zc = 0, zP(C(u[y] - ZP[y] + u[$] / 2, u[z] - ZP[z] + u[Y] / 2, 1, 1, T), o))) : (Z(_[T], [z, zX, yz, xQ]), G(_[zw], 1, S, 1))
					}

					function O() {
						for (s(_[zU]) ; U = Vi.pop() ;) c(U[0], U[1]);
						ZX ? (ZX = X, Z(_[J], YT, 1), d(_[J], 0, .3, O, 0, n)) : G(function () {
							_[J] && (_[J][R] = xY), A(v[WJ]), VK(x), _.ZX(), A(W.afterBoxEnd), V.a = t, V.zQ && (V.z = V.zQ, V.Z[ya] = V.ZI), S === x && w.t ? w.t[zw](x) : "self" == XU ? P[Yc].reload(x) : "back" == XU ? history.back() : XU && (P[Yc][ZW] = XU)
						}, 9)
					}
					var m, M, r, p, u, U, l = "loadPageOnClose",
						V = _.Y || _.x,
						j = P[zQ][zF],
						K = Q[T];
					if (!L) {
						if (m = 4 == _._ || 5 == _._ ? b(G, _[zw], 77, S) : !V || 2 > _._ || _.Y && A(v[Vr], _) === X || A(W.beforeBoxEnd, _) === X ? Yk : _.h && !V.zo ? b(ZQ.j.Yr, V) : 0) return m();
						_[zJ](x), A(v.YS), XU = Yv ? t : XU || xL(S) && S || fb[l] || v[l] || W[l], vf && (M = zr(), Z(j, [wl, "", ZO, ""]), P[yr](M[y], M[z])), _._ = 0, zS(n, Ym), YP = 0, k = YX(), r = zy(_[F]), p = ZD && S === x || r[y] > k[$] || r[z] > k[Y] || 0 > r[q] || 0 > r[N], ZI || p || zE(function ($) {
							$ != _ && $[T] && !$.zZ && (p = x)
						}), p && (yo = Zc = ZX = 0, s(_[T])), ZX = ZX && V.Z[ya], Xj(), wD(), w.Zt(_), ZQ.S.yr(V), u = wR(XH == Wj ? yG : V, ZX), ZQ.S.Zl(V), XH || u[$] || (u = wR(yG, ZX)), ZX ? (Q.thumb = u, XJ(V)) : xJ(o)
					}
					1 == L && (We(V), _[zU] ? d(_[zU], 0, Wo, O, 0, n) : O())
				},
				resize: function (u, U, t, s, r, S, Z) {
					if (u = u || 0, U = U || 0, S = S || 0, Z = _.x) {
						var W, R, V, P = Q[F][$] || Z.P,
							o = Q[F][Y] || Z.p,
							X = -1 == u ? P : u,
							w = -1 == U ? o : U,
							q = _.G;
						zS(n, Yn), _.Zy(), XX = xw = Zp = zO = 0, zt(t) && (v.boxLeft = -1 == t ? Q[T][y] - I - zr(y) - (Wp ? xV : 0) : t, Wb = 0), zt(s) && (v.boxTop = -1 == s ? Q[T][z] - I - zr(z) - (Wp ? Xv : 0) : s, WB = 0), Z.q && (X && w || (W = wF(_[p]), W ? R = W = W[zF] : (W = _[p][ZJ], R = _[F]), V = wG(W), ZC && R[wZ] < V[Y] && (V[$] += xl), 3 > S && (q = b(_[YD], X, w, t, s, r, S + 1)), X = X || V[$], w = w || V[Y]), ZC = wA), X && (Z.s = X, X != v[$] && (v[$] = 0)), w && (Z.Q = w, w != v[Y] && (v[Y] = 0)), xE = r === x ? 0 : r, xi = 7, _.N(0, 0, 0, q)
					}
				},
				reload: function (z, $) {
					$ = _.Y, $ && $.zu && ($.zQ || ($.zQ = $.z, $.ZI = $.Z[ya]), $.z = z || yQ($.z, {
						no_cache: Yq()
					}).R, $.w && $.ZI && ($.Z[ya] = $.z), _[Yz](_[Wy]))
				},
				goBack: function () {
					_.ZQ && YA(_.ZQ, {
						sameBox: x
					})
				},
				getIframeWindow: function ($, z) {
					return XL($ || _[p], z)
				},
				getIframeDocument: function ($) {
					return wF($ || _[p])
				},
				ZX: function () {
					var z, y, $, Z, Y = -1;
					for (w.Zt(_), zS(n, Ym), YP = 0, Yx[ZD] = t; $ = xX.pop() ;) Yj($);
					for (w.t = t, Z = Yx[V]; Z--;) z = Yx[Z], z && (y = x, z.U > Y && (Y = z.U, w.t = z));
					if (!y) {
						for (Yx[V] = 0, w.zJ = X; $ = WT.pop() ;) Yj($);
						Ze(_[B])
					}
					for (; $ = VI.pop() ;) try {
						ZD || yX(fb, $), Ze(_[$])
					} catch (W) { }
					Wg(_), vk()
				}
			})
		}

		function Yk() {
			return X
		}

		function k(z, x) {
			return function () {
				var Z, Y = fb.getInstance,
					$ = arguments,
					y = x,
					_ = Y($[y]);
				z == zw && !_ && (_ = Y($[0])) && (y = 0), $ = [][yA].call($, 0, y), _ = _ || w.t, _ ? _._ && _[z].apply(_, $) : (Z = z + Zb + $.join(Zb) + Zb, Vk ? parent[yR](Z, Ym) : Zc && (parent[Yc] = yQ(Zc, 0, yR + "{" + Z + "}").R))
			}
		}

		function zb($, _) {
			_ = _[$], _[V] && ZQ[$].B(_)
		}

		function zE(z) {
			for (var _, $ = w.n[V]; $--;) _ = w.n[$], _ && _._ && z(_, $)
		}

		function yw(Q, k) {
			function p(t) {
				t = t || {};
				var o, K, N, R, s, q, m, M, _, W = t[ZT],
					L = t.touches,
					V = L && L[0] || t,
					Z = V[yb],
					J = w.Zs(Z),
					S = V[Wx],
					U = V[wX];
				if (Zd && U && !V.pageY && (_ = zr(J), S -= _[y], U -= _[z]), W == zg ? (Zd = x, L[1] ? O.r = x : (R = x, s = S, q = U)) : W == wL ? (Zd = O.X == zg, R = x, Zd || (s = S, q = U, W = O.X || W)) : W == YF ? (13 == V[XP] || 27 == V[XP]) && (_ = zy(Z, x), s = _[y] + _[$] / 2, q = _[z] + _[Y] / 2) : u(W, [Yf, Zm]) && O.X && (m = S - O.F, M = U - O.e, O.r = W == Zm || m * m + M * M > 64), zt(s)) v(k.zf), k.zf = G(p, 777), O.X || j(Q, [WL, Xq], p), J != P && (_ = zy(w.zL(Q)), s += _[y], q += _[z]), D(O, {
					X: W,
					ZY: s,
					zx: q,
					r: X,
					F: S,
					e: U
				}), R && (O.ZG = Z, ZE.activateOnClick && vl()), (R || 27 == V[XP]) && ZQ.S.zN(O.ZG) && !R && zp(t, x);
				else {
					if (W || Wg(O), W == XR && !Zd || W == zk) {
						o = u(Zs(Z), [Wl, wx]) && r(Z, ZT)[Wi](), K = o && u(o, ["submit", "image"]) && r(Z, wz), K && (N = [Yq()], "image" == o && (_ = zy(Z, x), N[e](Zq(S - _[y]), Zq(U - _[z]))), r(Z, YN + "tap", N.join(ym)));
						var i = Z && Z[zq],
							n = w.t;
						i && n && n.E[wH] && !O.r && Z == O.ZG && Zs(Z) != l && (!zm(n[T], Z) || u(Z[ZR] + i[ZR], [ZY, zW, "vml"])) && n[zw]()
					} (!W || O.r) && Yj(Q, [WL, Xq], p)
				}
			}
			j(Q, [zg, wL, YF, Zm, zk, XR], p, t, x)
		}

		function yW() {
			wt(YW('fb[""]=R(a,G,n,c){R H(){U a.ZJ(O)?c:I}V g,z,A,s,k,h,I,r,i,l,o,B=!c,C=a.Zj.ZL,D=a.zV,J="[a-z",t=J+"\\\\d\\\\-",u="]{2,}",v="\\\\.",O=25,E=c,F=a.yQ,K=a.Zo=n[a.Y],L=[],w=[];U!R(P){R M(f,x){S(V d,p,b,j,m=c,y=f.T,Q=y-((y-2)/4<<0)-2,q=[],e=y;e--;)d=a.Z(f,e),36==d&&(d=58),d>96&&(d-=6),d>W&&(d-=5),q[e]=d-48;S(e=y-1,b=q[e],4==x&&(b=W&~b);e--;)q[e]=q[e]^b;S(e=b=0;Q>e;e++,b++)j=[[W,2,48,4],[15,4,60,2],[3,6,W,0]][p=e%3],d=a.Z((q[b]&j[0])<<j[1]|(q[b+1]&j[2])>>j[3]),m=4==x?d+m:m+d,p>1&&b++;U m}R N(f){U i=M(k[l],f),h=i.T,D(t+v+u+v+t+u).X(i)&&f||h>4&&!(h%4)&&D("^"+t+v+"]+$").X(i)&&f||4==f&&N(3)||0}S(g=M(P.14(a.Y=c)).16("|"),r=a.zn(g[3]+"-"+g[4]),z=D(t+u+v+J+u).X(C),A=F(G.Za[r]||c),s=F(G.YV[r]||c),k=F(A+" "+s),k=k&&k.16(/[,\\s]+/),l=k.T;l--;)if(L[l]=N(4))if(a.ZP(i,"."))w.19(i);else S(o=0;h>o;)w.19(i.1a(o,o+2)+"."+i.1a(o+2,o+=4));S(l=h=w.T;l--;)a.ZP(C,w[l])&&(E=B);I=!h||z&&!E?g[c.T]:B&&c,a.zm(n,c)}(["94jq$4Wc@oLyCY6m$YXnCZTQ$4brQoLyDEHZ843a8FuVS1GmCYjbCoTrQoGiCEHVDJry@1akCILq@Irw@VuXSJHeQYbnCo","Dv9luWQYPn$YzpCojb9o2z$Yjy9ZOcOY@o@1zo9YfaN5TvAo6cS1TWAFzl9YXxClulSFGWQUOgRIOg6o7z84fq@5OcREjk","RlXkClfI9IjnDIPxAEHvCUHl9ZHfCorp8J3r@EHV9Y@aDYLU@0Hn9o2mCo7XD4rU@5SmCo7p85TaCoLa84jwOI@xCkHy@4","Dn9EHbCY6m9YemCJPx@J7lDIrx9kHZ@4OmCYra@5SwOLHy@4LV@0HY85TvDEGi$0HuCo7oR0PuDJ3WQkix@oXx$53k9Zns","CUfl9YaxCo7p85Ta@5OkOJ3nCoDrDFak5YPy$4ftOleiCZHn9kHVDJry@1ak$Yjy9ZOcOVGVQFykRonaDJGcNUjo9IjnDI","PxAIvVNoTx90jU@4DvCZ3rClWxCZHn9leiNYKgOJ3xOIjkDILv9kHnOIXv$Y7wCY6m8Y7fOI@xCkHf9Z7UOJTvDI6wOL3u","@0Hy84Tr9pTrOIzrA0HU@4bxDo7VOJ3u85Sm9oLpOIbrCZTn@Y6wREjWRoHiDo7UCYrx9pXkD4ry@JXy84Tr9pTrBIzrA5","Xv9pTa$4XyBIrwCZ3n9IXr@JXy9YTnDIrx9pXZ@4XyOI@xCobr@JXq9Ybn84fi9oLz@5Xz$53l8I7VBEGu9Y@o9Irw@0qG"]),n[g[4]]=a.Zh,n.toString=R(){R b(f,x){S(V d="",p=0;f[p];)d+=g[f[p++]]+(f[p]?" ":"");m+=d+" - "+x+"\\n"}V j=!!k.T,m="";U b([1],n[g[1]]),b([2],n[g[2]]),b([9,10],C),b([3,4,6],j),j?(b([4,5,7],(A?a.zq+(s?" & ":c):c)+(s?a.Yv:c)),b([8],h),h&&(b([4,1],L.14(", ")),b([4,11,9],z?!!E:B+g[12]))):b([5,7],a.ZK),m},!a.f&&(r=H())&&(a.Zi=K&&!K(c,r)),a.zl(H)};', "function.for.length.return.var.63.test.zG.zt.....join..split...push.substring.53"), Yw, x)
		}

		function Yy(_, $) {
			return _ = "max" == _ ? yt : _ === Yg ? "0%" : _, u(_, "%") ? YR(zh(_) / 100 * $) : _ || 0
		}

		function W(z, Z, _) {
			var y, Y, $ = "<" + z;
			if (zP(_))
				for (;
					(y = _[YC]()) && (Y = _[YC]()) ;) $ += " " + y + '="' + Xl(Y) + '"';
			return $ += Z === X ? " />" : ">" + (Z || "") + "</" + z + ">"
		}

		function d($, _, Z, v, y, z) {
			function V($, s, S) {
				if (z[X] && w._) {
					var u = Yq(),
						W = u - s,
						U = (W + (S || W)) / 2;
					(x && $ >= _ || !x && _ >= $) && ($ = _);
					try {
						Y[YT] = $ + "", zD && (1 > $ ? Y[Yd] = vs + 100 * $ + yM : r(Y, Yd, t))
					} catch (R) {
						return
					}
					$ != _ ? (xz(b(V, $ + (x ? U : -U) / Z, u, W), z, X, Wt), y && $ >= T == x && (y(), y = t)) : (yX(z, X), y && y(), v && v())
				}
			}
			if (_ > 1 && (_ /= 100), Z = 999 * (Z || 0), z = z || {}, $ = zI($)) {
				var Y = $[m],
					W = Z ? +(Y[YT] || 0) : _,
					T = (W + _) / 2,
					x = _ && _ >= W,
					X = $.id || yl;
				z[X] = -1, V(W, Yq() - i(Wt, Z / 2), 0)
			}
		}

		function Ya(Z, y, x, X, w, W, Y) {
			var z, _ = x - Z,
				$ = X - y;
			return 0 > Y ? (_ = i(_, 0), $ = i($, 0)) : Y > 0 && (_ = S(_, 0), $ = S($, 0)), w && (z = Z / y, ($ * z - _) * (W ? 1 : -1) > 0 ? _ = $ * z : $ = _ / z), {
				width: ZN(Z + _),
				height: ZN(y + $)
			}
		}

		function Z(z, _, $, y) {
			if (z)
				if (y = 0, z[m])
					if (zP(_))
						for (; _[V] > y;) Z(z, _[y++], _[y++]);
					else if (_ == xq) _ = yl + _, Z(z, ["css" + _, $, m + _, $]);
					else if (_ == ZO) $ = $ === X ? xQ : $ !== x && $ || wk, Z(z, [ZO + "X", $, ZO + "Y", $]);
					else {
						_ = yj(_);
						try {
							z[m][_] = $ + (zt($) && _ != zN && _ != YT ? "px" : "")
						} catch (Y) { }
					} else if (zP(z))
						for (; z[V] > y;) Z(z[y++], _, $)
		}

		function c($, _) {
			Z($, yz, xL(_) ? _ : xQ)
		}

		function s($, _) {
			Z($, Zz, xL(_) ? _ : ZL)
		}

		function zo(z, $, _, Z, y, Y, x) {
			_ && zS($, _), $[_ || yl] = G(z, Z, y, Y, x)
		}

		function zS($, _) {
			_ = _ || yl, _ in $ ? (v($[_]), yX($, _)) : _ == Ym && zv($, function (_) {
				zS($, _)
			})
		}

		function YA(_, z, y) {
			function S($, _) {
				Yr = Yr[Xo]((zt(_) ? $ : _).y)
			}
			if (wU(w.Zo)) {
				if (_ || z) {
					ZU(t, t, X), _ = zI(_) || _, y = Zs(_), y && y != zZ && (_ = "#" + f(_)), wu(_) && !_.z && (z = yq(_.rev), _[E] && !z[zj] && (z[zj] = _[E]), _ = _[l] || _[ZW]), z = yq(z), wu(_) && _.z || (y = w.Zs(_), y && y.fb || (y = P), _ = y.fb.data.zO(_, z, x));
					var U, r, T, Y, s, v = _,
						Z = D({}, v.Z, z),
						R = K("mobileNewWindow", Z),
						$ = v,
						u = w.t;
					if (Yr = [], zE(S), w.Zm(S), Z[WH] === X) {
						for ($ = {}, s = Yr[V]; s-- && v.z != $.z;) U = Yr[s], U.C == (v.C || "null") && K(WH, U.Z) !== X && ($ = U);
						Z = D({}, $.Z, Z, {
							showThis: x
						})
					}
					$.z && (wr && R || yv && $.u && R !== X && M(K(vp, Z), K(WI, Z)) !== X ? (_ = $.zu ? $.z : W(Zu, WU(o($.$, $.z)) || $.z), wg(_)) : (u && (u.zZ || zE(function (_) {
						Y = _.Y, Y && !_.zZ && Y.z == v.z && Y.V == v.V && (_.Zy(), r = x)
					}), Y = u.Y, T = Y && !Y.Z.h && !Y.Z.ZW && K("sameBox", Z)), r || (T || (u = ZC(K("modal", Z) !== X), v.a = u), G(u.zD, 1, T, v, $, Z))))
				}
			} else G(YA, 77, _, z)
		}

		function wg($, y, Y) {
			var Z = wS[zi]($),
				z = open(Z ? "" : $, y ? "" : "_fb", Y || "") || w.Zh(ZZ[17]),
				_ = Z && z && z[zQ];
			return _ && (_.open("text/html"), _.write(Zh + W(l, $)), _.close()), !!z
		}

		function wv(_, $) {
			function X($) {
				var z, Y, x, w, _, W = $.attributes || [],
					y = $[zY] || [],
					v = $[zL];
				if (1 == v) {
					for (z = zx($.nodeName, Z), _ = W[V]; _--;) Y = W[_].nodeName, x = r($, Y), x && r(z, Y, x);
					for (z[m][YS] = $[m][YS] || "", z[zV] = $[zV] || "", _ = 0, w = y[V]; w > _; _++) y[_] && 4 > y[_][zL] && L(X(y[_]), z)
				} else 3 == v && (z = Z.createTextNode($.nodeValue));
				return z
			}
			if (_) {
				var y = _[zq],
					Y = _[zs],
					Z = $[zs],
					z = y && Z == Y ? _ : Z.adoptNode ? Z.adoptNode(_) : X(_);
				L(z, $), _ != z && (Ze(_), zT($, $[yD]))
			}
		}

		function wV(_) {
			_ ? (v(ZI), ZI = G(wV, 40)) : (v(ZI), zE(function (W, _) {
				if (_ = W[zU]) {
					var w = _[zs],
						x = w[Zu],
						X = W[T],
						v = X[yk] + X[a],
						V = X[yS] + X[zu];
					Z(_, [$, 0, Y, 0, q, yJ ? -zr(y) : ""]), Z(_, [$, S(v, x.scrollWidth, x[Zl], w[zF][Zl], YX($) + zr(y)), Y, S(V, x[VR], x[wZ], w[zF][wZ], YX(Y) + zr(z)), q, ""])
				}
			}))
		}

		function Yw() {
			vm = fb[""](w, zz, fb, "")
		}

		function YW(z, y) {
			function Z(_) {
				return (xk > _ ? "" : Z(_ / xk >>> 0)) + ((_ %= xk) > 35 ? w.zt(_ + 29) : _.toString(36))
			}
			for (var $ = y[ze]("."), _ = $[V], Y = +$[--_]; _--;) $[_] && (z = z[g](w.zV("\\b" + Z(_ + Y) + "\\b"), $[_]));
			return z
		}

		function Wv(_) {
			return _ && _[Yc] && _[Yc][ZW] || ""
		}

		function wG(Z, o, _) {
			function W(W, V) {
				var w, v = 0;
				return 1 == W[zL] && (w = zy(W, !V), (w[$] || w[Y] || W == Z) && (o || zv(X, function (_) {
					X[_] = h(W, yE + yl + _, x)
				}), _[y] = i(_[y], w[y] - X[y]), _[z] = i(_[z], w[z] - X[z]), _[q] = S(_[q], w[q] + X[q]), _[N] = S(_[N], w[N] + X[N]), v = 1)), v
			}
			if (Z = zI(Z)) {
				if (Zs(Z) == l) return wG(ZS(Zu, Z, 0));
				var v, u, T, s, U, t, w = {}, X = {}, r = Z[zY],
					R = r[V],
					Q = 5,
					p = 5,
					P = 5;
				for (w[y] = w[z] = 1 / 0, w[q] = w[N] = -1 / 0, X[y] = X[z] = X[q] = X[N] = 0, _ = D(w), W(Z, x), U = _[y], t = _[z], _ = D(w), W(Z), U -= _[y], t -= _[z]; R-- && Q;)
					for (Q -= W(r[R]), v = r[R][zY], u = v[V]; u-- && p;)
						for (p -= W(v[u]), T = v[u][zY], s = T[V]; s-- && P;) P -= W(T[s]);
				_[y] += U, _[z] += t, _[q] += U, _[N] += t, _[$] = _[q] - _[y], _[Y] = _[N] - _[z]
			}
			return _ || zy(Z)
		}

		function Vn(_, u) {
			if (_ = zI(_), _ || w.t && w.t[p]) {
				var Z, z, q, t, T, Q = wf(_),
					P = Q && Q.zs || {}, s = Zs(_) == YM,
					S = s ? XL(_) : w.Zs(_),
					y = S && S[zQ],
					o = WS ? C(0, 0, 815, 675) : zy(_),
					v = WU(_),
					U = "";
				for (w.Yt =
					function (_) {
						_ = this, j(_, "unload", b(G, A, 77, P.afterPrint)), _[zQ][Zu][Za](), A(P.beforePrint, _) !== X && _.print(), (13 > WS || WS >= 15) && _.close()
				}, s && (v = _[R], _ = y && y[Zu], _ && (v = _[yD], Z = r(_, m), wu(Z) && (Z = Z[YS]))), z = ZS("base", y, 0), z = z ? r(z, ZW) : Wv(S)[g](/(.+\/)[^\/]*(\?|$)/, "$1"), z = W("base", YJ ? "" : X, [ZW, z]), v = W(Zu, v[g](/<script[^>]*>([\s\S]*?)<\/script>/gi, ""), Z && [m, Z]), q = W("script", 'opener.fb.addEvent(self,"load",opener.fb.data.Yt)'), t = ZS("link", y)[Xo](ZS(m, y)), T = 0; t[V] > T;) U += WU(t[T++]);
				U += W(m, "html,body{border:0;margin:0;padding:0}" + (s ? l : Zu) + "{background:" + h(_[zq], YU) + "}"), u && (U += /\.css(\?|$)/i[zi](u) ? W("link", X, ["rel", "stylesheet", ZW, u]) : W(m, u)), wg(Zh + W(l, W("head", z + U + q) + v), x, "width=" + o[$] + ",height=" + o[Y])
			}
		}

		function ZU(y, z, Z, U) {
			var T, W, v = w.T.zv,
				_ = y;
			try {
				T = w._ && fb.data._
			} catch (S) { }
			if (T) {
				if (wU(z) || (z = t), XZ(Z) && (Zv = Z), zP(y)) {
					for (_ = t; y[V] && (!_ || yx[_]) ;) _ = y[YC]();
					if (_ && y[V]) return ZU(_, b(G, ZU, 77, y, z, Z), Z, x)
				}
				if (!_ && Z && Zv && !U && (I = I || ZE.preloadLimit, zt(I) || (I = (I || "5|1")[ze](Zb)[Zd ? 1 : 0] || 5), v[V] = i(v[V], I), _ = v[YC]()), _)
					if (W = yx[_]) {
						if (z && function s(_) {
							_[R] ? z(_) : G(s, 77, _)
						}(W), Z && Zv) return ZU(t, t, x)
					} else (function (_, w, y) {
						_.onload = _.onerror = function (W) {
							W = W || P.event, W && W[ZT] != wK && (w = "/static/img/floatbox/graphics/404.jpg"), u(_[R], w) ? (y[$] = _[$], y[Y] = _[Y], y[R] = _[R], _ = Ze(_), vk(), z && z(y), Z && Zv && !U && G(ZU, 77, t, t, x)) : (y.ok = X, r(_, $, t), r(_, Y, t), _[R] = w)
						}, _[R] = w
					})(zx(Zt), _, yx[_] = {
						ok: x
					});
				else z && z(t)
			}
		}
		var Zv, I, ZZ, WV, YK, Xm, XM, xl, _, Q, xz, Yr, ZI, xZ, VN, vm, YY = Math,
			S = YY.max,
			i = YY.min,
			Zq = YY.round,
			ZN = YY.ceil,
			YR = YY.floor,
			yx = w.zv,
			b = w.zl,
			A = w.yq,
			u = w.ZP,
			yj = w.zn,
			M = w.YZ,
			K = w.za,
			zx = w.zC,
			Ze = w.YR,
			L = w.yt,
			yq = w.yU,
			yQ = w.yu,
			f = w.Ze,
			o = w.Zb,
			Xz = w.Ys,
			C = w.yR,
			xL = w.yW,
			zt = w.YX,
			XZ = w.YY,
			wu = w.yw,
			wU = w.Yx,
			zP = w.Yy,
			Zs = w.ZB,
			Yq = w.yv,
			xy = w.zB,
			zh = w.zb,
			G = w.Zc,
			v = w.Yq,
			yX = w.zm,
			Wg = w.yV,
			WG = w.Zj,
			O = w.Zg,
			zz = w.Z,
			ZE = zz.baseSettings,
			Yx = w.n,
			ZQ = w.zi,
			Wu = w.ZA,
			xY = w.zd,
			yJ = w.zH,
			zI = fb.$,
			j = fb.addEvent,
			Yj = fb.removeEvent,
			zp = fb.stopEvent,
			zT = fb.setInnerHTML,
			WU = fb.getOuterHTML,
			Xl = fb.encodeHTML,
			vM = fb.decodeHTML,
			D = fb.extend,
			zv = fb.forEach,
			ZS = fb.getByTag,
			wt = fb.executeJS,
			Vm = fb.ajax,
			h = fb.getStyle,
			wf = fb.getOwnerInstance,
			zm = fb.nodeContains,
			VM = fb.hasAttribute,
			r = fb.attr,
			zM = fb.addClass,
			Zp = fb.iePre,
			XL = fb.getIframeWindow,
			wF = fb.getIframeDocument,
			YX = fb.getViewport,
			zr = fb.getScroll,
			zy = fb.getLayout,
			vl = fb.activate,
			wT = 20,
			xk = 62,
			Wt = 13,
			zd = {}, WT = [],
			Vf = Wu + "magnify_minus.cur",
			Xy = [zj, Wn, Zg, zG],
			zX = -77777,
			ws = "about:blank",
			wS = /<.+>/,
			vL = /\bwhite\b/,
			xK = /_o(ff|n)\./,
			Vl = /^#([a-z][\w\-\.:]*)$/i,
			Zc = vM(WG.i[yR] || ""),
			VL = Wv(P),
			Xk = "http" + (u(VL, "https", 1) ? "s" : "") + "://",
			Zi = ["-o-", "-ms-", "-moz-", "-webkit-", ""],
			Wf = yJ ? q : y,
			vk = b(G, P.CollectGarbage || Yk),
			Zy = ZE.contextClass || "fbContext",
			XK = ZE.tooltipClass || "fbTooltip",
			Zx = navigator,
			zH = Zx.userAgent,
			ZP = Zx.appVersion,
			WF = u(Zx.platform, "Mac", 1),
			we = u(ZP, "Android"),
			VF = P.opera && opera.version,
			Ws = u(zH, "AppleWebKit/"),
			yv = Ws && /iP.+\sOS\s\d/[zi](ZP),
			WS = Ws && !u(zH, "OPR") && zh(zH[ze]("Chrome/")[1]) || 0,
			wE = Zp(),
			zD = Zp(9),
			YJ = Zp(7),
			vK = zD && u(ZP, " x64;") ? 1 : 0,
			n = P[zQ],
			zO = n.styleSheets,
			U = zx(0, n),
			Vk = !!P[yR] && !zD,
			wr = (_ = P.screen) && _[$] && _[$] + _[Y] < 1600 * (P.devicePixelRatio || 1),
			Zd = vU in n;
		Z(U, [Zk, ye, z, zX, $, 77, Y, 77, ZO, yr]), L(U, n[Zu]), xl = w.yS = U[a] - U[Zl] || WF && 9 || P != top && !Zd && 17 || 0, _ = zx(Xd, n), Z(_, YS, vt), L(_, U), YK = "borderTopLeftRadius" in U[m], Xm = !!_.adj, Ze(_), _ = zr(), Z(U, Zk, "fixed"), P[yr](_[y], _[z] + 1), XM = _[z] != zr(z) && zy(U)[z] == zX, P[yr](_[y], _[z]), Q = Zi[V];
		for (; Q--;) xz = xz || P[yj(Zi[Q][WW](1) + "requestAnimationFrame")];
		if (xz = xz || zo, YJ)
			for (Q = zO[V]; Q--;) _ = zO[Q][YS], u(_, ".fbx#fbx") && (zO[Q][YS] = _[g](/\.png\)/g, ".gif)"));
		L(zI("fbTrash"), n[Zu]), n = zO = U = Ze(U), ZZ = w.strings = w.strings || "en|Exit (key: Esc)|Previous (key: \u2190)|Next (key: \u2192)|Play (key: spacebar)|Pause (key: spacebar)|Resize (key: Page Up/Down)|Image %1 of %2|Page %1 of %2|(%1 of %2)|Info...|Print...|A newer version of %1 is required to view this content.|%1 is required to view this content.|Open|View on|Open in a new window|Pop-up content is blocked by this browser."[ze](Zb), WV = M(ZE.language, Zx.userLanguage || Zx.language || "en")[WW](0, 2), G(
			function () {
				function _() {
					var _, $ = "\u2190",
						z = "\u2192";
					ZZ = w.strings, yJ && (_ = ZZ[2][g]($, z), ZZ[2] = ZZ[3][g](z, $), ZZ[3] = _), _ = zh(ZP[ze](" NT ")[1]), _ && 6 > _ && (ZZ[2] = ZZ[2][g]($, "<--")[g](z, "-->"), ZZ[3] = ZZ[3][g]($, "<--")[g](z, "-->"))
				}
				WV != ZZ[0] ? wt(w.Yw + WV + ".js", _) : _()
			}, 9), D(w, {
				start: YA,
				end: k(zw, 1),
				resize: k(YD, 5),
				reload: k("reload", 1),
				goBack: k("goBack", 0),
				pause: k(zJ, 1),
				showItem: k(Yz, 1),
				fade: d,
				printNode: Vn,
				preload: ZU,
				ze: zb,
				zM: zE,
				zE: yw
			}), yW(), A(ZE.afterFBLoaded), ! function () {
				function L(S, z) {
					for (; z = S.pop() ;) {
						var Z, V = "contextMouseButton",
							Y = z.$,
							$ = o(Y, z.L),
							W = u($[zV], Zy),
							v = z.v[W ? "D" : "j"],
							U = v.W,
							v = v.y,
							s = ZB + (W ? "context" : XB),
							_ = yq(r($, s));
						_[YL] && (r($, s, t), yX(z, "v"), D(_, z), zM(_, $[zV]), fb.removeClass(_, [Zy, XK]), zM(_, W ? Zy : XK), Z = w.zO(t, _, x), v[e](Z), _ = Z.Z, _.modal = _.resizeTime = _.sameBox = X, $[yB] = 0, W ? j($, [zk, YF, _[V] != q && ZK, _[V] != y && "contextmenu"], H(Z), U) : (r($, E, t), i[Y] || (j(w.zA(Y)[zQ], Xq, g), i[Y] = x), j($, [YE, Ye, zk, Za, xo, !_.autoEnd && Xq], k(Z, _), U), _.ZE = function (_) {
							var $ = _.x,
								z = _[T];
							j(z, [yC, Vs, XQ], k($, _.zs), _.W)
						}))
					}
				}

				function H($) {
					return function (_) {
						O.r || _[ZT] == YF && 13 != _[XP] || _[ZT] != zk && O.X == zg || (YA($), zp(_))
					}
				}

				function k(_, $) {
					return function (y) {
						var Z, z = y[ZT];
						O.r || z != zk && O.X == zg || (z == xo || z == Ye ? J(_) : (n(_), _.a || _.M || (Z = $.showOnce && h[Zn](P[zQ].cookie), Z && u(Z[1], Zb + escape($.$ + $.L + $[YL]) + Zb) || (_.zI = u(z, "m", 1), _.zI ? _.M = W[e](function () {
							!_.J && $.mouseSpeed >= l && p >= $.delay && (_.F = U, _.e = s, K(_, $))
						}) : (K(_, $), zp(y))))))
					}
				}

				function g($) {
					function Z() {
						var z = X,
							$ = W[V];
						for (p += 50, p && (R -= U, Q -= s, l = 20 * YY.sqrt(R * R + Q * Q)), R = U, Q = s; $--;) W[$] && (z = x, W[$]());
						z || (clearInterval(_), W[V] = _ = 0)
					}
					for (var Y = X, v = W[V]; v--;) W[v] && (Y = x);
					Y && (_ || (M = zy(w.zL(this)), p = -50, l = 0), U = $[Wx] + M[y], s = $[wX] + M[z], _ || (_ = setInterval(Z, 50), Z()))
				}

				function K(_, w) {
					if (!_.a) {
						var x, v, V, u, r = o(w.$, w.L);
						_.zo = X, _.M && (_.M = W[_.M - 1] = t), r && (x = _.yz = zy(r), _.zI ? w[zC] || (_.M = W[e](function () {
							v = _.a, v && (V = v.ZR[T], S(x[y] - U, x[z] - s, U - x[q], s - x[N]) > 3 ? m(_) : V && Z(v[T], [y, V[y] + U - _.F, z, V[z] + s - _.e]))
						})) : (_.F = O.ZY || x[y] + x[$] / 2, _.e = O.zx || x[z] + x[Y] / 2), YA(_), w.showOnce && (u = h[Zn](P[zQ].cookie), P[zQ].cookie = "fbShown=" + (u ? u[1] : Zb) + escape(w.$ + w.L + w[YL]) + "|; path=/"))
					}
				}

				function J(_) {
					n(_), _.J = G(m, 77, _)
				}

				function n(_) {
					v(_.J), _.J = 0
				}

				function m(_, $) {
					$ = _.a, _.M && (_.M = W[_.M - 1] = t), n(_), $ && $._ && !_.zo && (6 != $._ ? J(_) : (_.zo = x, $[zw]()))
				}

				function f(X, W, _, x) {
					var u = x.Z,
						Z = x.yz,
						V = u[zC],
						w = x.F - X / 2,
						v = x.e - W / 2;
					return _ = _ || u.placement, _ == yd ? V && (w = Z[y] + (Z[$] - X) / 2, v = Z[z] + (Z[Y] - W) / 2) : _ == z || _ == N ? (w += X / 4, v = V ? Z[z] + (_ == z ? -W : Z[Y]) : x.e + (_ == z ? -W - 12 : Zp(8) ? 19 : 21)) : w = V ? Z[y] + (_ == y ? -X : Z[$]) : x.F + (_ == y ? -X - 12 : 16), C(w, v)
				}
				ZQ.D = {
					B: L
				}, ZQ.j = {
					B: L,
					Zd: f,
					Yr: m
				};
				var _, R, Q, M, p, l, U, s, W = [],
					i = [],
					I = D({
						placement: N,
						delay: 80,
						mouseSpeed: 120,
						className: ""
					}, ZE, {
						autoFitSpace: 2,
						centerOnResize: X,
						colorTheme: Wk,
						enableDragMove: X,
						enableDragResize: X,
						hideObjects: X,
						innerBorder: 0,
						outerBorder: 1,
						outsideClickCloses: x,
						padding: 0,
						contentScroll: X,
						showClose: X,
						showOuterClose: X,
						titleAsCaption: X
					}),
					h = /fbShown=(.+?)(;|$)/;
				zz.d[Zy] = D({}, I, {
					boxLeft: ZK,
					boxTop: ZK,
					boxRoundCorners: ZL,
					fadeTime: 0,
					shadowSize: 8,
					shadowType: vS,
					ZW: x
				}, zz.d[Zy]), zz.d[XK] = D({}, I, {
					boxCornerRadius: 4,
					fadeTime: .2,
					shadowSize: 4,
					shadowType: Xb,
					h: x
				}, zz.d[XK])
			}(), ! function () {
				function _(c, z) {
					for (; z = c.pop() ;) {
						var $ = z.v.c,
							n = z.v.y,
							p = z.$,
							y = o(p, z.L);
						if ($ && y && !r(y, ZB + ZX)) {
							var w, R, N = "cycleInterval",
								W = yq(y),
								h = y[zY],
								Q = [];
							for (r(y, ZB + ZX, 1), yX(z, "v"), w = 0; h[V] > w;) {
								var P, v, U, m, _ = h[w++],
									H = Zs(_);
								u(H, [zZ, xA, Zt], 2) && (H == Zt && (P = zx(0, y[zs]), _[zq].replaceChild(P, _), L(_, P), _ = P), v = ZS(Zt, _, 0), v && (Z(y, Y, S(y[zu], _[zu])), U = ZS(zK, _, 0), U || (m = K(G, W) !== X && r(v, E) || K("altAsCaption", W) && r(v, "alt") || "", m && (U = zx(zK, _[zs]), zT(U, m), L(U, _))), Q[e]({
									zy: f(_),
									m: f(v),
									K: f(U),
									Zw: yq(_)[N] || yq(v)[N] || t
								})))
							}
							if (Q[V] > 1) {
								var T, _, v, s, l, g = "cycleShowControls",
									G = "titleAsCaption",
									O = K("cycleResumeOnHover", W),
									F = !O && K("cyclePauseOnHover", W),
									d = K("cycleEnableClick", W) && K(g) !== X && (K("cycleControlsPos", W) || xp),
									k = C($, z, F, O);
								for (D(z, {
									Zw: K(N, W) || 5,
									ZD: d,
									ZZ: Q,
									l: 0,
									o: M(K("cycleStartPaused", W), O)
								}), $.y[e](z), d && K(g, W) !== X && (_ = zx(zK, y[zs]), zM(_, "fbCyclerControl"), _.id = z.zc = f(_), L(_, y), j(_, [zk, ZK], k, $.W)), w = Q[V]; w--;)
									if (T = Q[w], _ = o(p, T.zy), v = o(p, T.m), w || Z(_, zN, 77), j(v, [zk, ZK], k, $.W), (F || O) && j(_, [YE, Ye], k, $.W), Zs(_) == zZ)
										for (R = n[V]; R--;) T.zy == n[R].V && (s = n[R].Z, l = $.y[V] - 1, s.yT = b(J, $, l, w), s.YS = b(I, $, l, w, x), !s[zj] && T.K && K(G, s) !== X && (s[zj] = o(p, T.K)[yD]), R = 0)
							}
							$.zS = ZE.cycleFadeTime || 1, i($), q($, $.y[0].Zw - $.zS)
						}
					}
				}

				function C(z, _, y, Z) {
					return function (Y, $) {
						$ = Y[ZT], O.r || $ != zk && O.X == zg || (v(_.YU), $ == Ye ? _.YU = G(function () {
							_.o = Z, T(_)
						}, 77) : $ == YE ? (Z && _.o && q(z, .6), _.o = y) : (_.o = !_.o, _.o || q(z, .2)), T(_))
					}
				}

				function T(_) {
					var W, V, X = _.ZD,
						x = X && o(_.$, _.zc),
						v = x && o(_.$, _.ZZ[_.l].m),
						w = 12;
					v && (s(x, XA), W = v[$] - x[a], V = v[Y] - x[zu], Z(x, [y, u(X, "r") ? W - w : u(X, "c") ? W / 2 : w, z, u(X, "b") ? V - w : w]), zT(x, ZZ[_.o ? 4 : 5][g](/\(.+\)/, _.o ? "\u25ba" : "||")))
				}

				function J(y, Y, x) {
					try {
						var z = y.y[Y],
							_ = o(z.$, z.ZZ[x].m),
							Z = r(_, ZB + R),
							$ = r(_, "longdesc");
						Z != R && (u($ || "", " ") && ($ = ""), _[R] = Z || $ || _[R], r(_, ZB + R, R))
					} catch (X) { }
				}

				function i(z) {
					for (var _, $, Z = z.y[V]; Z--;) _ = z.y[Z], _ && ($ = _.l + 1, $ >= _.ZZ[V] && ($ = 0), J(z, Z, $))
				}

				function I(u, m, M, l) {
					var p, y = u.ZV,
						_ = u.y[m],
						z = _.$,
						P = o(z, _.L),
						U = _.ZZ,
						r = M % U[V],
						X = U[_.l],
						O = o(z, X.zy),
						n = o(z, X.m),
						x = o(z, X.K),
						w = U[r],
						R = o(z, w.zy),
						q = o(z, w.m),
						W = o(z, w.K),
						Q = U[_.YT] || {}, L = o(z, Q.zy),
						k = o(z, Q.m),
						N = o(z, Q.K),
						t = l ? 0 : u.zS;
					s(R, WK);
					try {
						p = q[$]
					} catch (K) { }
					p && r != _.l && (v(y[X.m]), v(y[w.m]), v(y[X.K]), v(y[w.K]), c(L), d(k, 0), d(n, 1), d(q, 0), zD ? (c(x, ""), c([N, W])) : (d(x, 1), d(N, 0), d(W, 0)), Z(O, zN, 7), Z(R, [zN, 77, yz, Xp]), Z(P, Y, S(P[zu], R[zu])), d(q, 1, t, function () {
						d(n, 0, .7 * t, b(c, O), 0, y)
					}, zD && function () {
						c(x), c(W, "")
					}, y), zD || (x && (d(x, 1), d(x, 0, t, 0, 0, y)), W && d(W, 1, t, 0, 0, y)), T(_)), _.YT = _.l, _.l = r, i(u)
				}

				function q($, Z) {
					if (!Z) {
						var _, y, Y, W, z, x, v = $.y,
							X = -1,
							w = v[V];
						for (zE(function (_) {
							_.zZ && (X = S(_.U, X))
						}) ; w--;) _ = v[w], y = o(_.$, _.L), y && (_.o || (Y = wf(y), W = Y ? Y.U : -1, W >= X && I($, w, _.l + 1)), z = z || _.Zw, x = x || _.ZZ[_.l].Zw)
					}
					z = S(Z || x || z || 0, Z ? 0 : $.zS + .1), zo(q, $.ZV, yl, 999 * z, $)
				}
				ZQ.c = {
					B: _,
					yo: q
				}
			}(), ! function () {
				function _(x, _) {
					for (; _ = x.pop() ;)
						if (_.yX) u(_.node, {}, _);
						else if ((_.Z[zl] = M(K(zl, _.Z), _.Zz ? "medium" : 0)) && U(_), _.Zz) {
							var $, Y = yQ(_.z),
								z = Y.zK,
								Z = Y.i,
								y = {
									autoplay: 1,
									wmode: ZD,
									bgcolor: _.Z[wi] || xP
								};
							wE && (Z.wmode = zc), $ = /\.(mp4|f[4l]v)$/i[Zn](z), $ && (Z.autoend = K(VS, _.Z) === X ? 0 : 1, Z[YL] = z, z = w.ZK + "video.html"), $ = /(youtube|vimeo)\.com\/([\w\-]+)/[Zn](Y.ZS[g]("youtu.be/", "youtube.com/")[g]("/watch?v=", "/")), $ && (_.Zu = $[1], _.zU = $[2], _.Zu == xa ? (z = Xk + "www.youtube.com/embed/" + _.zU, delete Z.v, D(y, {
								fs: 1,
								autohide: 1,
								showinfo: 0,
								rel: 0,
								enablejsapi: 1
							})) : (z = Xk + "player.vimeo.com/video/" + _.zU, y.fullscreen = y.api = 1)), _.z = yQ(z, D(y, Z)).R, r(_)
						}
				}

				function r(z) {
					if (z.zU) {
						var t, y, v, V, T, u, _ = z.Z,
							s = o(z.$, z.V),
							W = K("addVideoThumb", _),
							q = z.Zu,
							S = z.zU,
							x = w.Zf[S];
						x ? (_[$] = Yy(_[$], YX($)) || x.YP || 0, _[Y] = Yy(_[Y], _[$]) || x.yp || 0, _[zj] = M(_[zj], x.Yp), t = W && x.yP, t && ZU(t,
							function (w, _) {
								w.ok && (_ = o(z.$, z.O), _ || (_ = zx(Zt, s[zs]), L(_, s, s[ZJ]), z.O = f(_)), y = _[$] || 0, y = i(w[$], y > 32 ? y : zt(W) ? W : "small" == W ? 120 : "large" == W ? 480 : 240), v = _[Y] = y * w[Y] / w[$], _[R] = w[R], U(z), "widescreen" == x.YQ && (v -= .5625 * y - 1, Z(_[zq], [YS, h(_), $, _[$], Y, _[Y] - v, ZO, X]), Z(_, [ZM, -ZN(v / 2), zA, 0]), U(z)))
							})) : K("fetchVideoInfo", _) !== X && (q == xa ? (V = "gdata.youtube.com/feeds/api/videos/", T = "?v=2&alt=jsonc&") : "vimeo" == q && (V = "vimeo.com/api/v2/video/", T = ".json?"), V && (u = "jsonc" + p++, w[u] = function (_) {
								yX(w, u), _ = _.data || _[0], _ && (w.Zf[S] = {
									Yp: _[E],
									YP: _[$] && xy(_[$]),
									yp: _[Y] && xy(_[Y]),
									YQ: _.aspectRatio,
									yP: _.thumbnail_large || _.thumbnail && _.thumbnail.hqDefault
								}, r(z))
							}, wt(Xk + V + S + T + "callback=fb.data." + u)))
					}
				}

				function U(v) {
					var S = "fbVideoPlay",
						V = v.Z[zl],
						_ = o(v.$, v.O),
						W = _ && w.ZF(_, zK);
					Z(W, [Zz, XA, Zk, vr]), W && V !== X && ZU("/static/img/floatbox/graphics/videoPlay.png", function (w) {
						ZU(_[R], function (r) {
							if (r == null || r == "null") {
							} else {
								if (w.ok && r.ok) {
									var v, u, U, t, X = fb.getByClass(S, W)[0] || zx(Zt, _[zs]),
										T = 865,
										s = .197;
									zM(X, S), X[R] = w[R], X.alt = "", "large" == V ? (T = 607, s = .21) : "small" == V && (T = 1515, s = .184), v = i(1, _[$] / T + s), U = w[$] * v, t = w[Y] * v, u = zy(_), Z(X, [y, (u[$] - U) / 2, z, (u[Y] - t) / 2, $, U, Y, t, Zk, ye, zA, 0, yE, 0, ZM, h(_, ZM, x)]), L(X, W)
								}
							}
						})
					})
				}

				function t() {
					var Z, $, y = navigator.mimeTypes,
						Y = y && y[Q],
						x = Y && Y.enabledPlugin,
						z = x && x.description || "",
						_ = 0;
					if (!z && P.ActiveXObject) try {
						z = new P.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version"), q = !!z
					} catch (X) { }
					if (Z = /^\D+(\d+)\D+(\d+)\D+(\d+)/[Zn](z))
						for (_ = Z[yA](1), $ = _[V]; $--;) _[$] = +_[$];
					return _
				}

				function n(_, $) {
					if (v && xy(_)) {
						for (_ = (_ + "")[ze](/\D+/), _[0] || _[yA](1), $ = _[V]; $--;) _[$] = +(_[$] || 0);
						return v[0] > _[0] || v[0] == _[0] && v[1] > _[1] || v[0] == _[0] && v[1] == _[1] && v[2] >= _[2]
					}
				}

				function u(u, R, _) {
					var U, s, y = {
						allowFullScreen: "true",
						allowScriptAccess: "always",
						base: "",
						bgcolor: "",
						flashvars: "",
						fullScreenAspectRatio: "",
						loop: "false",
						menu: "",
						play: "",
						quality: "autohigh",
						salign: "",
						scale: "exactfit",
						wmode: ZD
					}, w = {}, N = Xk + "get.adobe.com/flashplayer/",
						z = _.altContent || "",
						V = R.z || _[YL],
						S = yQ(V),
						p = _.id || S.b,
						t = [],
						P = "",
						T = "";
					if (R.z ? (U = s = yt, _[wi] == xP && (y.wmode = xP)) : (U = _[$] || 222, s = _[Y] || U), n(_.minFlashVersion || "9.0.115")) V = S.zK, D(w, S.i, yq(_.params)), zv(y, function (_, $, z) {
						z = _[Wi](), $ = w[_] || w[z], $ && (y[_] = $, yX(w, _), yX(w, z))
					}), V = Xl(yQ(V, w).R), t[e]("id", p, wz, p, $, U, Y, s), q ? (t[e]("classid", "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000"), y.movie = V, y.wmode = zc) : t[e](ZT, Q, "data", V), zv(y, function ($, _) {
						_ && (P += W("param", X, [wz, $, "value", _]))
					}), T = W(Xa, P, t);
					else {
						var o = "Flash Player",
							r = "background:#fff; font-size:14px; color:",
							O = Vl[Zn](z);
						z = O && zI(O[1]) || z || W(xA, W("p", ZZ[v ? 12 : 13][g]("%1", o) + "<br/>" + W(zZ, "Get " + o, [ZW, N, yb, "_fb", m, r + "blue;"]), [m, r + "#000;margin:0;padding:1em;"]), [m, r + "#000;width:100%;height:100%;"])
					}
					zT(u, T), T || (Zs(z) ? (wv(z, u), Z(z, [Zz, WK, yz, Xp])) : Xz(u, z, X, x, x)), A(_[T ? "success" : "failure"], u)
				}
				var q, p = 0,
					Q = "application/x-shockwave-flash",
					v = t();
				ZQ.g = {
					B: _,
					yY: u
				}
			}(), ! function (R) {
				function _(Z, _) {
					for (; _ = Z.pop() ;) {
						var z = _.v.S,
							$ = o(_.$, _.V);
						z && !r($, ZB + ZX) && (r($, ZB + ZX, 1), D(_, {
							zR: zm(_.v[zf], $),
							yy: Yq()
						}), z.y[e](_), j($, [YE, Ye, Za, xo, ZK], U(_), z.W, x))
					}
				}

				function U(_) {
					return function ($) {
						var y = $[ZT],
							Z = 0 > h(o(_.$, _.O), z, x);
						v(_.J), y == ZK ? Z && !_.zR ? (w(_), zp($)) : _.z && (fb[Wj](_), zp($)) : O.X != zg && (u(y, [YE, Za]) ? Z && w(_) : Z || O.X || (_.J = G(W, 77, _), zp($)))
					}
				}

				function w(W, V, _) {
					if (V = W && W.Zq, V && (_ = o(W.$, W.O), _ && 0 > _[yS] && Yq() > W.yy + 500)) {
						N(), s(_, "inline");
						var Q, w = _[a],
							u = _[zu],
							U = 0,
							t = 0,
							p = W.zR && W.v.E.maxIndexThumbSize;
						if (s(_, ""), w && p && (Q = Ya(w, u, p, p, x, X, -1), w = Q[$], u = Q[Y], Z(_, [$, w, Y, u])), V == wJ) {
							var T = W.v,
								m = T && T[F];
							if (m) {
								var M = T.E.indexPos,
									l = !M.indexOf(yT),
									k = T.ZR[F],
									P = k[$],
									K = k[Y],
									O = (P - w) / 2,
									J = S(0, (l ? T.Zn : T.ZT) - T.E[Wh]),
									I = i(P, K) / 2,
									j = i(I, J);
								L(_, m), U = h(T[zf], wj) == yd ? O : 1 == M.indexOf(za) ? i(j, O) : S(P - w - j, O), l || (t = K - u)
							}
						} else {
							s(_);
							var n = _[zq],
								H = V == yd && ZS(Zt, n)[1],
								v = zy(H || n),
								r = YX();
							s(_, ""), s(n, XA), U = v[y] + (V == y ? -w : V == q ? v[$] : (v[$] - w) / 2), t = v[z] + ("up" == V ? 2 - u : "down" == V ? v[Y] : (v[Y] - u) / 2), U + w > r[$] && (U = r[$] - w - 1), 0 > U && (U = 1), t + u > r[Y] && (t = r[Y] - u - 1), 0 > t && (t = 1), v = zy(_[wI] || _[zs][Zu]), U -= v[y], t -= v[z]
						}
						Z(_, [y, U, z, t]), R[e](W)
					}
				}

				function W(_) {
					var Y, $, x = _.Zq;
					if (x && !_.zh)
						for (v(_.J), Y = o(_.$, _.O), L(x == wJ && Y, o(_.$, _.V)), Z(Y, [y, 0, z, zX]), $ = R[V]; $--;) R[$] == _ && R.splice($, 1)
				}

				function N(Z) {
					for (var _, $, z = R[V]; z--;) _ = R[z], !_ || !_.zR && zm(o(_.$, _.V), Z) || (W(_), $ = x);
					return $
				}
				R = [], ZQ.S = {
					B: _,
					Zl: W,
					yr: w,
					zN: N
				}
			}()
	}
	var VV = "content",
		vu = "#0b183b",
		Wn = "caption2",
		vU = "ontouchstart",
		WN = "Prev",
		Vu = "direction",
		VU = "borderTopColor",
		yU = "Left",
		XS = "fbShadow",
		xr = "fbCorner",
		Xd = "v:roundrect",
		Yo = "Top",
		XD = "Right",
		xR = "paddingBottom",
		xc = "Bottom",
		wm = "paddingTop",
		vt = "behavior:url(#default#VML);",
		zB = "black",
		YO = "paddingRight",
		vT = "crossfade",
		YG = "paddingLeft",
		ZH = "color",
		xC = "_on.",
		wM = "_off.",
		Xc = "select",
		Vt = "textarea",
		XC = "prev",
		yf = "next",
		Xr = "Panel",
		Zo = "fb",
		xb = "index",
		xB = "fb-",
		yn = "Corner",
		Wm = "topleft",
		yF = "both",
		Yu = "backgroundPosition",
		yN = "once",
		WM = "area",
		wl = "marginRight",
		VT = "boxShadow",
		Yn = "slide",
		wL = "mousedown",
		Yf = "move",
		Zm = "touchcancel",
		XR = "mouseup",
		Wl = "input",
		YN = "data-",
		ym = ",",
		WL = "touchmove",
		vs = "Alpha(Opacity=",
		yM = ")",
		xq = "float",
		wk = "auto",
		xQ = "hidden",
		Ym = "*",
		YM = "iframe",
		YU = "backgroundColor",
		Zh = "<!DOCTYPE html>",
		wK = "load",
		Wk = "white",
		ZL = "none",
		vS = "hybrid",
		Xb = "drop",
		XB = "tooltip",
		Xq = "mousemove",
		Vs = "onmousemove",
		XQ = "onmouseout",
		YF = "keydown",
		Zb = "|",
		xp = "bl",
		zk = "touchend",
		yl = "-",
		VS = "autoEndVideo",
		ZO = "overflow",
		xa = "youtube",
		zK = "span",
		vr = "relative",
		Zk = "position",
		ye = "absolute",
		yE = "margin",
		ZM = "marginTop",
		ZD = "opaque",
		yt = "100%",
		xP = "transparent",
		xA = "div",
		zZ = "a",
		zc = "window",
		Xa = "object",
		WK = "block",
		Xp = "visible",
		ZB = "data-fb-",
		ZX = "active",
		Ye = "mouseout",
		ZK = "click",
		zg = "touchstart",
		YE = "mouseover",
		yT = "t",
		wj = "textAlign",
		za = "l",
		yd = "center",
		Zt = "img",
		XA = "inline-block",
		wJ = "pip",
		Wj = "start",
		zl = "addPlayButton",
		zC = "attachToHost",
		zV = "className",
		zL = "nodeType",
		zY = "childNodes",
		l = "html",
		zj = "caption",
		N = "bottom",
		q = "right",
		zA = "borderWidth",
		WJ = "afterItemEnd",
		vR = "beforeItemStart",
		Vr = "beforeItemEnd",
		XP = "keyCode",
		wz = "name",
		Za = "focus",
		xo = "blur",
		wi = "contentBackgroundColor",
		wZ = "clientHeight",
		VR = "scrollHeight",
		vq = "showNewWindow",
		vQ = "showPrint",
		zG = "footer",
		Zg = "header",
		Vq = "activeElement",
		yD = "innerHTML",
		VQ = "maxContentWidth",
		vp = "contentScroll",
		Wz = "fbCaliper",
		Yt = "fbPause",
		ZA = "fbPlay",
		zR = "fbNext",
		Zr = "fbPrev",
		xO = "fbClose",
		YT = "opacity",
		Xo = "concat",
		WZ = "size",
		yz = "visibility",
		Zz = "display",
		ZG = "fbDragger",
		yZ = "fbResizer",
		zn = "fbOuterClose",
		wy = "fbCaption2",
		wY = "fbCaption",
		yL = "fbNewWindowLink",
		XO = "fbItemNumber",
		Yd = "filter",
		ZV = "backgroundImage",
		xn = "fbSlowLoad",
		ys = "fbLoader",
		Wy = "currentIndex",
		xN = "fbInnerEdge",
		Yl = "fbEdge",
		WY = "fbBackground",
		J = "fbZoomImg",
		YD = "resize",
		zf = "fbIndex",
		wI = "offsetParent",
		zu = "offsetHeight",
		yc = "fbOutline",
		yC = "onmouseover",
		Yc = "location",
		YC = "shift",
		zw = "end",
		YL = "source",
		zW = "fbFooter",
		ZY = "fbHeader",
		zF = "documentElement",
		yb = "target",
		wx = "button",
		F = "fbContentWrapper",
		yS = "offsetTop",
		yk = "offsetLeft",
		p = "fbContent",
		Yz = "showItem",
		zJ = "pause",
		Zw = "cursor",
		zN = "zIndex",
		wX = "clientY",
		Wx = "clientX",
		vP = "centerOnResize",
		zU = "fbOverlay",
		T = "fbBox",
		ZT = "type",
		Zj = "fbBoxLiner",
		Zf = "fbOverlayNext",
		YZ = "fbRightNav",
		ZF = "fbOverlayPrev",
		yy = "fbLeftNav",
		Vp = "controlsType",
		ZR = "fbName",
		R = "src",
		Wi = "toLowerCase",
		WI = "scrolling",
		E = "title",
		yB = "tabIndex",
		wh = "onclick",
		ZW = "href",
		zs = "ownerDocument",
		WX = "fbPlayPause",
		ww = "fbSubControls",
		Yb = "fbNavControls",
		yY = "fbControls",
		Ys = "fbInfoLink",
		yK = "fbPrintLink",
		VP = "fbbrPanel",
		vo = "fbblPanel",
		vO = "fbtrPanel",
		Vo = "fbtlPanel",
		VO = "caption2Corner",
		vn = "captionCorner",
		zq = "parentNode",
		YB = "itemNumberCorner",
		Xn = "printLinkCorner",
		XN = "infoLinkCorner",
		wW = "newWindowLinkCorner",
		xm = "indexCorner",
		Ww = "controlsTop",
		xM = "controlsLeft",
		H = "controlsCorner",
		Zn = "exec",
		vN = "contentClickCloses",
		wH = "outsideClickCloses",
		ya = "zoomSource",
		Wh = "innerBorder",
		e = "push",
		WH = "showThis",
		B = "fbx",
		ZJ = "firstChild",
		yA = "slice",
		g = "replace",
		YS = "cssText",
		WW = "substring",
		V = "length",
		z = "top",
		y = "left",
		yr = "scroll",
		m = "style",
		Zl = "clientWidth",
		a = "offsetWidth",
		Zu = "body",
		Y = "height",
		$ = "width",
		zQ = "document",
		ze = "split",
		zi = "test",
		yR = "postMessage",
		P = self,
		w = P.fb && P.fb.data;
	w && (w.ZN = _)
}(!0, !1, null);