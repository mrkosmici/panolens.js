(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.PANOLENS = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

	const version="0.11.0";const devDependencies={"@rollup/plugin-commonjs":"^11.0.2","@rollup/plugin-inject":"^4.0.1","@rollup/plugin-json":"^4.0.2","@rollup/plugin-node-resolve":"^7.1.1","@tweenjs/tween.js":"^18.5.0",ava:"^3.5.0","browser-env":"^3.3.0",concurrently:"^5.1.0",coveralls:"^3.0.11",docdash:"^1.2.0",eslint:"^6.8.0",esm:"^3.2.25","google-closure-compiler":"^20200315.0.0","http-server":"^0.12.3",jsdoc:"^3.6.3","local-web-server":"^3.0.7",nyc:"^14.1.1",rollup:"^2.3.2",three:"^0.117.0",xmlhttprequest:"^1.8.0"};

	/**
	 * REVISION
	 * @module REVISION
	 * @example PANOLENS.REVISION
	 * @type {string} revision
	 */
	const REVISION = version.split( '.' )[ 1 ];

	/**
	 * VERSION
	 * @module VERSION
	 * @example PANOLENS.VERSION
	 * @type {string} version
	 */
	const VERSION = version;

	/**
	 * THREEJS REVISION
	 * @module THREE_REVISION
	 * @example PANOLENS.THREE_REVISION
	 * @type {string} threejs revision
	 */
	const THREE_REVISION = devDependencies.three.split( '.' )[ 1 ];

	/**
	 * THREEJS VERSION
	 * @module THREE_VERSION
	 * @example PANOLENS.THREE_VERSION
	 * @type {string} threejs version
	 */
	const THREE_VERSION = devDependencies.three.replace( /[^0-9.]/g, '' );

	/**
	 * CONTROLS
	 * @module CONTROLS
	 * @example PANOLENS.CONTROLS.ORBIT
	 * @property {number} ORBIT 0
	 * @property {number} DEVICEORIENTATION 1
	 */
	const CONTROLS = { ORBIT: 0, DEVICEORIENTATION: 1 };

	/**
	 * MODES
	 * @module MODES
	 * @example PANOLENS.MODES.UNKNOWN
	 * @property {number} UNKNOWN 0
	 * @property {number} NORMAL 1
	 * @property {number} CARDBOARD 2
	 * @property {number} STEREO 3
	 */
	const MODES = { UNKNOWN: 0, NORMAL: 1, CARDBOARD: 2, STEREO: 3 };

	/**
	 * STEREOFORMAT
	 * @module STEREOFORMAT
	 * @example PANOLENS.STEREOFORMAT.TAB
	 * @property {number} TAB 0
	 * @property {number} SBS 1
	 */
	const STEREOFORMAT = { TAB: 0, SBS: 1 };

	/**
	 * Data URI Images
	 * @module DataImage
	 * @example PANOLENS.DataImage.Info
	 * @property {string} Info Information Icon
	 * @property {string} Arrow Arrow Icon
	 * @property {string} FullscreenEnter Fullscreen Enter Icon
	 * @property {string} FullscreenLeave Fullscreen Leave Icon
	 * @property {string} VideoPlay Video Play Icon
	 * @property {string} VideoPause Video Pause Icon
	 * @property {string} WhiteTile White Tile Icon
	 * @property {string} Setting Settings Icon
	 * @property {string} ChevronRight Chevron Right Icon
	 * @property {string} Check Check Icon
	 * @property {string} ViewIndicator View Indicator Icon
	 */
	const DataImage = {
	    Info: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADBklEQVR42u2bP08UQRiHnzFaSYCI/xoksdBIqGwIiYWRUBISExpCQ0ej38FWOmlIKKhoMPEbaCxsrrHiYrQgOSlQEaICrT+LHSPZzNzt3s3c3Hn7lHvLzvv82L2dm30XKioqKgYY062BJF0HpoA7wARwBbhsPz4DjoEG8AnYNcZ8Sx1Op8IXJM1KWpdUV3nq9m9nJV1I7VNGfEzSM0mNNqR9NOwxx1L7NRMflbQm6SSgeJ4TO8Zoat+8/LKkg4jieQ4kLaf2RtKwpJ0uiufZkTScSn5S0l5C+b/sSZrstvyMpKPU5uc4kjTTjkvpeYCkaeA1/+7hvcIZMGuMqUULQNIU8Aa4ltrWwyHwyBizGzwASSPAe+B2assW7AH3jTE/i+xcZoa12Qfy2Bo3i+5cKABl99zF1GYlWFTBeULLS0DZrOsDcDNggTXgc27bLWA64BhfgHvGmB8dHUXZ1DM0S45xliKMs9bKr+klIOkqsBrwv9JtVq1DewEAT4Ch1BYdMGQdygeg7Df4SmqDAKyoyXpCszPgITCeuvoAjFuX0gE8jljUdv7bCtiOOJ7XpdUZ8L/gdXHOA5QtYH5NXXVgbrgWWn1nwFTqaiPgdPIFcDd1tRFwOl307DwRuZgXwLvctgfA04hjOp18AcReZ6sZY16e3yDpUuQxnU6+S2AkcjEpcDr1zxOXSPgCKLSa0mc4nXwB/EpdbQScTr4AGqmrjYDTyRfAx9TVRsDp5Aug8LJyH+F0cgZg58z11BUHpO5ruGh2G3ybuuqAeF2aBfAqddUB8bq0OgP2U1cegH3aOQOMMb+BrdTVB2DLupQLwLIOnKY26IBT6+ClaQDGmO/ARmqLDtiwDn7HVkcY+EdjNoTlCI+tYhO2iUppm6HKslPUq2qQKHpUe8AFsjaUXuUQWCgqXyoAG8IuME/WkNRrnAHzZfqDSgdgQ6gBc2Td3b3CMTBXtkOsIzTIjZLnQhjcVtlcEIPZLJ0LoVvt8s/Va+3yuSAG84UJRxB98cpM9dJURUVFxSDzBxKde4Lk3/h2AAAAAElFTkSuQmCC', 
	    Arrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADPklEQVR42u2bMUscQRiG30/SRaJEI1ZKUiRErNIELRUbQYSAnX8hpVUgkDYp0wgWVjYW+QcJaQzYpLojJIXhtDDEKBpj65ti58ixmdmb2ZvZ7+T2AUHudmfmeXf2bnb3O6CmpqZmgJGqOiI5AWAWwEMA0wDuArht3r4CcAagBeAbgIaI/NQOp1fhIZKLJN+SbDKcptl3keSQtk+I+BjJVyRbJaRdtEybY9p+ReKjJN+QvIwonufS9DGq7ZuXXyd5nFA8zzHJdW1vkLxDcrdC8Ty7JO9oyc+QPFCUb3NAcqZq+TmSp9rmHZySnCvjErwOIPkUwHv8+w7vF64ALIrIfrIASM4C+ADgnratgxMACyLSiB4AyREAnwE80LbswgGAJyJy4bNxyApr6wbIw4xxy3djrwCYfeeuaZsFsEbPdULXU4DZqusLgMkEA21P05EEbf8A8FhEzos28pkBLxLKL5s/r/M1kEkz9vKQHGeatf05yfmOfubNa7G5JDle5NhtBjwHMBz5yFwAWBaRT+0XzP8pZsKwcQiH2fX8Ycojb+kzxUw4ZJn7CSQXqpRPHMKCq7+iZJ71Mvdy/DftXSQ6HcJdSDaqPPKW/mPOBO+lcbvzCU35RCFM2PpwnQKzZQfdgfe0dxH5dLA6uQJ4pC2fIASrkyuA6X6QjxyC1ckVQNn7bNHlI4ZgdXIFUObiJJl8pBCsTjGfuIwA2Cv4FN7xbYjkjqsRAHuIePXoCiDF1Zk2VidXAL+1R5sAq5MrgJb2aBNgdXIF8FV7tAmwOrkCCFs73wysTtYATHFCU3vEEWm6Ci6KvgY/ao86Ik6XogDeaY86Ik6XbjPgSHvkEThCwQy45XpDRK5JbgN4GWkgUyR9H65MRQxgW0SunZ5FezK7pfwd8e8MV8UfAPdF5Jdrg8JrAbPjprZFD2wWyQP6j8ZSEufRmGlgQ9umBBvd5IOgbjFUKLu+XnWBhG+rpsFVZGUo/coJgFVf+aAATAgNACvICpL6jSsAKyH1QcEBmBD2ASwhq+7uF84ALIVWiPUEB7lQsiOEwS2VzQUxmMXSuRCqKpd/zX4rl88FMZg/mLAEcSN+MlP/aKqmpqZmkPkL0hSjwOpNKxwAAAAASUVORK5CYII=',
	    FullscreenEnter: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik03IDE0SDV2NWg1di0ySDd2LTN6bS0yLTRoMlY3aDNWNUg1djV6bTEyIDdoLTN2Mmg1di01aC0ydjN6TTE0IDV2MmgzdjNoMlY1aC01eiIvPgo8L3N2Zz4=',
	    FullscreenLeave: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE0SDE5VjE2SDE2VjE5SDE0VjE0TTUsMTRIMTBWMTlIOFYxNkg1VjE0TTgsNUgxMFYxMEg1VjhIOFY1TTE5LDhWMTBIMTRWNUgxNlY4SDE5WiIgLz48L3N2Zz4=',
	    VideoPlay: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTgsNS4xNFYxOS4xNEwxOSwxMi4xNEw4LDUuMTRaIiAvPjwvc3ZnPg==',
	    VideoPause: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZiIgZD0iTTE0LDE5LjE0SDE4VjUuMTRIMTRNNiwxOS4xNEgxMFY1LjE0SDZWMTkuMTRaIiAvPjwvc3ZnPg==',
	    WhiteTile: 'data:image/png;base64,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',
	    Setting: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAADn0lEQVR42u2bzUsVURjGnyO6CPzAMnTjppAo3LTwH1CqTfaxbeOiRS37A0wXtROFVi1aRBs3LWohSIGbQAQXViBGRhG0UIRKUCpK7q/FnOB2uc6cOXNmRnGe3eW+H8/7zLln3vNxpQoVKlQ4wjBFJAFOSRqX1O7osivpvjHmU1nChBZglvSYLYJbS0EanCvIJzWK+gnsyH34/8OuMaYjb265jwCgz6N4SWq3vodbAEmnS/KtBDgoAgyU5BteAOAkMAPcBroc7PskDWfgN+wyDwBdltMMcDI3tYBnde/pHeARMNTErgd4APzweP834oeN1dMkz5DlsFNn/yyv4kdiSK4At4AO4CqwGaDwRmza2B0210qM7YhrXU59ANAq6bWkwQTTn5KO5fIE0uVYlXTeGLOXFMx1DrjlULwKKN41x6DlnIjEEQCckPRe0okCiguJr5LOGGO+xhm5jICJQ1i8LOeJJKPYEQAMKvrtt5ZdjSf2FM0Fq/sZJI2A6UNcvCz36TiDfUcAcE1SPu/U6Mm8k/TFfu6XdFb5iX3dGPM8lQfwNod3+TowBnQ3yddtv1vPIe+b1JIBiwEJ1IAJ208k5W21trWA+V/5CHAcmAtU/A2P/DcCiTAHHE8tgCVhgLvAXgYCk17Jo/yTGfLuWe7Zd72AC8CWB4n3OAz7mLytNkZabAEXMhfeQKYfWEpJZCxA3rGUOZeA/qDF15FpAz47EvlNk9neI2e3jeWCz0BbmvipNkSMMX8kuSZYM8Z8zyqAjbHmaN5mOeYjgIXrU93MWrxHrNQjrqiDkQMLHwG+OdqF3NN3jeXKzU8AoF1SzdH8XKhJUO7HZDXLMbwAwICkJUULFxe0SbqSVQAbw3Xi7Ze0ZLmGAzAKbHs0JGU1QtvAaIjCW4B7ZOvJy2qFa5a730RPtBiaz0CgnkiZi6F5fBZDVMvho7EhcuS3xJJ2hV9IupgTqaLw0hhzab8vq23xOG/r+LDsKjLgYVzxUnU0ltwK2wDezUyJmEwqXgp/PL4rvxthaeCSI+zxuA10J8ZkWdJNSb2SLkvayKHwDRu71+ZajrG941J8agALDQ3GU/a/IvMkYCPzmCbtLNEVmacNtgs5iP9fYVNEV1Q6Hez7yNZSL+J2SarTcpqiyV2iUkG0IvPFvbz5FbEn+KEk3wMjwMeSfCsBXFBdly9CAPk9ydyffpECuB5tZfVJjaKWueOSfinln6YK4lahQoUKRxd/AcRPGTcQCAUQAAAAAElFTkSuQmCC',
	    ChevronRight: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTguNTksMTYuNThMMTMuMTcsMTJMOC41OSw3LjQxTDEwLDZMMTYsMTJMMTAsMThMOC41OSwxNi41OFoiIC8+PC9zdmc+',
	    Check: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxLDdMOSwxOUwzLjUsMTMuNUw0LjkxLDEyLjA5TDksMTYuMTdMMTkuNTksNS41OUwyMSw3WiIgLz48L3N2Zz4=',
	    ViewIndicator: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0idmlldy1pbmRpY2F0b3IiIGhlaWdodD0iMzAiIHdpZHRoPSIzMCIgdmlld0JveD0iLTIuNSAtMSAzMCAzMCI+Cgk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7ZmlsbDpub25lO30uc3Qxe3N0cm9rZS13aWR0aDo2O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCTwvc3R5bGU+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNIDEyLjUgMCBBIDEyLjUgMTIuNSAwIDAgMCAtMTIuNSAwIEEgMTIuNSAxMi41IDAgMCAwIDEyLjUgMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMywxNS41KSI+PC9wYXRoPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0gMTMgMCBMIDEwIDIgTCAxNiAyIFoiPjwvcGF0aD4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNIDIgMCBBIDIgMiAwIDAgMCAtMiAwIEEgMiAyIDAgMCAwIDIgMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMywxNS41KSI+PC9wYXRoPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGlkPSJpbmRpY2F0b3IiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMTMsMTUuNSkiPjwvcGF0aD4KCTwvZz4KPC9zdmc+'
	};

	/**
	 * @module ImageLoader
	 * @description Image loader with progress based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/ImageLoader.js}
	 */
	const ImageLoader = {

	    /**
	     * Load image
	     * @example PANOLENS.ImageLoader.load( IMAGE_URL )
	     * @method load
	     * @param  {string}   url        - An image url
	     * @param  {function} onLoad     - On load callback
	     * @param  {function} onProgress - In progress callback
	     * @param  {function} onError    - On error callback
	     */
	    load: function ( url, onLoad = () => {}, onProgress = () => {}, onError = () => {} ) {

	        // Enable cache
	        THREE.Cache.enabled = true;

	        let cached, request, arrayBufferView, blob, urlCreator, image, reference;
		
	        // Reference key
	        for ( let iconName in DataImage ) {
		
	            if ( DataImage.hasOwnProperty( iconName ) && url === DataImage[ iconName ] ) {
		
	                reference = iconName;
		
	            }
		
	        }
		
	        // Cached
	        cached = THREE.Cache.get( reference ? reference : url );
		
	        if ( cached !== undefined ) {
		
	            if ( onLoad ) {
		
	                setTimeout( function () {
		
	                    onProgress( { loaded: 1, total: 1 } );
	                    onLoad( cached );
		
	                }, 0 );
		
	            }
		
	            return cached;
		
	        }
			
	        // Construct a new XMLHttpRequest
	        urlCreator = window.URL || window.webkitURL;
	        image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );
		
	        // Add to cache
	        THREE.Cache.add( reference ? reference : url, image );
		
	        const onImageLoaded = () => {
		
	            urlCreator.revokeObjectURL( image.src );
	            onLoad( image );
		
	        };

	        if ( url.indexOf( 'data:' ) === 0 ) {

	            image.addEventListener( 'load', onImageLoaded, false );
	            image.src = url;
	            return image;
	        }
		
	        image.crossOrigin = this.crossOrigin !== undefined ? this.crossOrigin : '';
		
	        request = new window.XMLHttpRequest();
	        request.open( 'GET', url, true );
	        request.responseType = 'arraybuffer';
	        request.addEventListener( 'error', onError );
	        request.addEventListener( 'progress', event => {

	            if  ( !event ) return;

	            const { loaded, total, lengthComputable } = event;
	            
	            if ( lengthComputable ) {
		
	                onProgress( { loaded, total } );
		
	            }
		
	        } );
	        
	        request.addEventListener( 'loadend', event => {

	            if  ( !event ) return;
	            const { currentTarget: { response } } = event;

	            arrayBufferView = new Uint8Array( response );
	            blob = new window.Blob( [ arrayBufferView ] );
					
	            image.addEventListener( 'load', onImageLoaded, false );
	            image.src = urlCreator.createObjectURL( blob );
		
	        } );
		
	        request.send(null);
		
	    }

	};

	/**
	 * @module TextureLoader
	 * @description Texture loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/TextureLoader.js}
	 */
	const TextureLoader = {

	    /**
	     * Load image texture
	     * @example PANOLENS.TextureLoader.load( IMAGE_URL )
	     * @method load
	     * @param  {string}   url        - An image url
	     * @param  {function} onLoad     - On load callback
	     * @param  {function} onProgress - In progress callback
	     * @param  {function} onError    - On error callback
	     * @return {THREE.Texture}   	 - Image texture
	     */
	    load: function ( url, onLoad = () => {}, onProgress, onError ) {

	        const texture = new THREE.Texture(); 

	        ImageLoader.load( url, function ( image ) {

	            texture.image = image;

	            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
	            const isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

	            texture.format = isJPEG ? THREE.RGBFormat : THREE.RGBAFormat;
	            texture.needsUpdate = true;

	            onLoad( texture );

	        }, onProgress, onError );

	        return texture;

	    }

	};

	/**
	 * @module CubeTextureLoader
	 * @description Cube Texture Loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/CubeTextureLoader.js}
	 */
	const CubeTextureLoader = {

	    /**
	     * Load 6 images as a cube texture
	     * @example PANOLENS.CubeTextureLoader.load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] )
	     * @method load
	     * @param  {array}   urls        - array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
	     * @param  {function} onLoad     - On load callback
	     * @param  {function} onProgress - In progress callback
	     * @param  {function} onError    - On error callback
	     * @return {THREE.CubeTexture}   - Cube texture
	     */
	    load: function ( urls, onLoad = () => {}, onProgress = () => {}, onError ) {

		   let texture, loaded, progress, all, loadings;

		   texture = new THREE.CubeTexture( [] );

		   loaded = 0;
		   progress = {};
		   all = {};

		   urls.map( function ( url, index ) {

			   ImageLoader.load( url, function ( image ) {

				   texture.images[ index ] = image;
	  
				   loaded++;

				   if ( loaded === 6 ) {

					   texture.needsUpdate = true;

					   onProgress( { loaded, total: 6 } );
					   onLoad( texture );

				   }

			   }, function ( event ) {

				   progress[ index ] = { loaded: event.loaded, total: event.total };

				   all.loaded = 0;
				   all.total = 0;
				   loadings = 0;

				   for ( let i in progress ) {

					   loadings++;
					   all.loaded += progress[ i ].loaded;
					   all.total += progress[ i ].total;

				   }

				   if ( loadings < 6 ) {

					   all.total = all.total / loadings * 6;

				   }

				   onProgress( all );

			   }, onError );

		   } );

		   return texture;

	    }

	};

	/**
	 * @classdesc User Media
	 * @constructor
	 * @param {object} [constraints={ video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: { exact: 'environment' } }, audio: false }]
	 */
	function Media ( constraints ) {

	    const defaultConstraints = { video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: { exact: 'environment' } }, audio: false };

	    this.constraints = Object.assign( defaultConstraints, constraints );

	    this.container = null;
	    this.scene = null;
	    this.element = null;
	    this.devices = [];
	    this.stream = null;
	    this.ratioScalar = 1;
	    this.videoDeviceIndex = 0;

	}
	Media.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	    setContainer: function ( container ) {

	        this.container = container;

	    },

	    setScene: function ( scene ) {

	        this.scene = scene;

	    },

	    /**
	     * Enumerate devices
	     * @memberOf Media
	     * @instance
	     * @returns {Promise}
	     */
	    enumerateDevices: function () {

	        const devices = this.devices;
	        const resolvedPromise = new Promise( resolve => { resolve( devices ); } );

	        return devices.length > 0 ? resolvedPromise : window.navigator.mediaDevices.enumerateDevices();

	    },

	    /**
	     * Switch to next available video device
	     * @memberOf Media
	     * @instance
	     */
	    switchNextVideoDevice: function () {

	        const stop = this.stop.bind( this );
	        const start = this.start.bind( this );
	        const setVideDeviceIndex = this.setVideDeviceIndex.bind( this );

	        let index = this.videoDeviceIndex;

	        this.getDevices( 'video' )
	            .then( devices => {
	                stop();
	                index++;
	                if ( index >= devices.length ) {
	                    setVideDeviceIndex( 0 );
	                    index--;
	                } else {
	                    setVideDeviceIndex( index );
	                }

	                start( devices[ index ] );
	            

	            } );

	    },

	    /**
	     * Get devices
	     * @param {string} type - type keyword to match device.kind
	     * @memberOf Media
	     * @instance
	     */
	    getDevices: function ( type = 'video' ) {

	        const devices = this.devices;
	        const validate = _devices => {

	            return _devices.map( device => { 
	                
	                if ( !devices.includes( device ) ) { devices.push( device ); }
	                return device; 
	            
	            } );
	            
	        };
	        const filter = _devices => {

	            const reg = new RegExp( type, 'i' );
	            return _devices.filter( device => reg.test( device.kind ) );

	        };

	        return this.enumerateDevices()
	            .then( validate )
	            .then( filter );

	    },

	    /**
	     * Get user media
	     * @param {MediaStreamConstraints} constraints
	     * @memberOf Media
	     * @instance
	     */
	    getUserMedia: function ( constraints ) {

	        const setMediaStream = this.setMediaStream.bind( this );
	        const playVideo = this.playVideo.bind( this );
	        const onCatchError = error => { console.warn( `PANOLENS.Media: ${error}` ); };

	        return window.navigator.mediaDevices.getUserMedia( constraints )
	            .then( setMediaStream )
	            .then( playVideo )
	            .catch( onCatchError );

	    },

	    /**
	     * Set video device index
	     * @param {number} index 
	     * @memberOf Media
	     * @instance
	     */
	    setVideDeviceIndex: function ( index ) {

	        this.videoDeviceIndex = index;

	    },

	    /**
	     * Start streaming
	     * @param {MediaDeviceInfo} [targetDevice]
	     * @memberOf Media
	     * @instance
	     */
	    start: function( targetDevice ) {

	        const constraints = this.constraints;
	        const getUserMedia = this.getUserMedia.bind( this );
	        const onVideoDevices = devices => {

	            if ( !devices || devices.length === 0 ) {

	                throw Error( 'no video device found' );

	            }

	            const device = targetDevice || devices[ 0 ];
	            constraints.video.deviceId = device.deviceId;

	            return getUserMedia( constraints );

	        };

	        this.element = this.createVideoElement();

	        return this.getDevices().then( onVideoDevices );

	    },

	    /**
	     * Stop streaming
	     * @memberOf Media
	     * @instance
	     */
	    stop: function () {

	        const stream = this.stream;

	        if ( stream && stream.active ) {

	            const track = stream.getTracks()[ 0 ];

	            track.stop();

	            window.removeEventListener( 'resize', this.onWindowResize.bind( this ) );

	            this.element = null;
	            this.stream = null;

	        }

	    },

	    /**
	     * Set media stream
	     * @param {MediaStream} stream 
	     * @memberOf Media
	     * @instance
	     */
	    setMediaStream: function ( stream ) {

	        this.stream = stream;
	        this.element.srcObject = stream;

	        if ( this.scene ) {

	            this.scene.background = this.createVideoTexture();

	        }
	        
	        window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

	    },

	    /**
	     * Play video element
	     * @memberOf Media
	     * @instance
	     */
	    playVideo: function () {

	        const { element } = this;

	        if ( element ) {

	            element.play();
	            this.dispatchEvent( { type: 'play' } );

	        }

	    },

	    /**
	     * Pause video element
	     * @memberOf Media
	     * @instance
	     */
	    pauseVideo: function () {

	        const { element } = this;

	        if ( element ) {

	            element.pause();
	            this.dispatchEvent( { type: 'pause' } );

	        }

	    },

	    /**
	     * Create video texture
	     * @memberOf Media
	     * @instance
	     * @returns {THREE.VideoTexture}
	     */
	    createVideoTexture: function () {

	        const video = this.element;
	        const texture = new THREE.VideoTexture( video );

	        texture.generateMipmaps = false;
	        texture.minFilter = THREE.LinearFilter;
	        texture.magFilter = THREE.LinearFilter;
	        texture.format = THREE.RGBFormat;
	        texture.center.set( 0.5, 0.5 );

	        video.addEventListener( 'canplay', this.onWindowResize.bind( this ) );

	        return texture;

	    },

	    /**
	     * Create video element
	     * @memberOf Media
	     * @instance
	     * @returns {HTMLVideoElement}
	     * @fires Media#canplay
	     */
	    createVideoElement: function() {

	        const dispatchEvent = this.dispatchEvent.bind( this );
	        const video = document.createElement( 'video' );

	        /**
	         * Video can play event
	         * @type {object}
	         * @event Media#canplay
	         */
	        const canPlay = () => dispatchEvent( { type: 'canplay' } );
	        
	        video.setAttribute( 'autoplay', '' );
	        video.setAttribute( 'muted', '' );
	        video.setAttribute( 'playsinline', '' );

	        video.style.position = 'absolute';
	        video.style.top = '0';
	        video.style.left = '0';
	        video.style.width = '100%';
	        video.style.height = '100%';
	        video.style.objectPosition = 'center';
	        video.style.objectFit = 'cover';
	        video.style.display = this.scene ? 'none' : '';

	        video.addEventListener( 'canplay', canPlay );

	        return video;

	    },

	    /**
	     * On window resize event
	     * @param {Event} event 
	     * @memberOf Media
	     * @instance
	     */
	    onWindowResize: function () {

	        if ( this.element && this.element.videoWidth && this.element.videoHeight && this.scene ) {

	            const { clientWidth: width, clientHeight: height } = this.container;
	            const texture = this.scene.background;
	            const { videoWidth, videoHeight } = this.element;
	            const cameraRatio = videoHeight / videoWidth;
	            const viewportRatio = this.container ? width / height : 1.0;
	            const ratio = cameraRatio * viewportRatio * this.ratioScalar;

	            if ( width > height ) {
	                texture.repeat.set( ratio, 1 );
	            } else {
	                texture.repeat.set( 1, 1 / ratio );
	            }

	        }

	    }

	} );

	/**
	 * @classdesc Stereo Mixin - format based on {@link https://opticalflow.wordpress.com/2010/09/19/side-by-side-versus-top-and-bottom-3d-formats/} will be determined by image width:height ratio (TAB is 1:1, SBS is 4:1)
	 * @constructor
	 * @param {number} [eyeSep=0.064] - eye separation distance
	 */
	function Stereo ( eyeSep = 0.064 ){

	    this.format = null;
	    this.eyeSep = eyeSep;

	    this.loffset = new THREE.Vector2();
	    this.roffset = new THREE.Vector2();

	}

	Object.assign( Stereo.prototype, {

	    constructor: Stereo,

	    /**
	     * Update unifroms by stereo format
	     * @param {integer} format - { @see STEREOFORMAT }
	     * @param {object} uniforms
	     */
	    updateUniformByFormat: function( format, uniforms ) {

	        this.format = format;

	        const repeat = uniforms.repeat.value;
	        const offset = uniforms.offset.value;
	        const loffset = this.loffset;
	        const roffset = this.roffset;

	        switch ( format ) {

	        case STEREOFORMAT.TAB:
	            repeat.set( 1.0, 0.5 );
	            offset.set( 0.0, 0.5 );
	            loffset.set( 0.0, 0.5 );
	            roffset.set( 0.0, 0.0 );
	            break;

	        case STEREOFORMAT.SBS:
	            repeat.set( 0.5, 1.0 );
	            offset.set( 0.0, 0.0 );
	            loffset.set( 0.0, 0.0 );
	            roffset.set( 0.5, 0.0 );
	            break;

	        }

	    },

	    /**
	     * Update Texture for Stereo Left Eye
	     */
	    updateTextureToLeft: function( offset ) {

	        offset.copy( this.loffset );

	    },

	    /**
	     * Update Texture for Stereo Right Eye
	     */
	    updateTextureToRight: function( offset ) {

	        offset.copy( this.roffset );

	    }

	} );

	/**
	 * @classdesc Reticle 3D Sprite
	 * @constructor
	 * @param {THREE.Color} [color=0xffffff] - Color of the reticle sprite
	 * @param {boolean} [autoSelect=true] - Auto selection
	 * @param {number} [dwellTime=1500] - Duration for dwelling sequence to complete
	 */

	function Reticle ( color = 0xffffff, autoSelect = true, dwellTime = 1500 ) {

	    this.dpr = window.devicePixelRatio;

	    const { canvas, context } = this.createCanvas();
	    const material = new THREE.SpriteMaterial( { color, map: this.createCanvasTexture( canvas ) } );

	    THREE.Sprite.call( this, material );

	    this.canvasWidth = canvas.width;
	    this.canvasHeight = canvas.height;
	    this.context = context;
	    this.color = color instanceof THREE.Color ? color : new THREE.Color( color );    

	    this.autoSelect = autoSelect;
	    this.dwellTime = dwellTime;
	    this.rippleDuration = 500;
	    this.position.z = -10;
	    this.center.set( 0.5, 0.5 );
	    this.scale.set( 0.5, 0.5, 1 );

	    this.startTimestamp = null;
	    this.timerId = null;
	    this.callback = null;

	    this.frustumCulled = false;

	    this.updateCanvasArcByProgress( 0 );

	}
	Reticle.prototype = Object.assign( Object.create( THREE.Sprite.prototype ), {

	    constructor: Reticle,

	    /**
	     * Set material color
	     * @param {THREE.Color} color 
	     * @memberOf Reticle
	     * @instance
	     */
	    setColor: function ( color ) {

	        this.material.color.copy( color instanceof THREE.Color ? color : new THREE.Color( color ) );

	    },

	    /**
	     * Create canvas texture
	     * @param {HTMLCanvasElement} canvas 
	     * @memberOf Reticle
	     * @instance
	     * @returns {THREE.CanvasTexture}
	     */
	    createCanvasTexture: function ( canvas ) {

	        const texture = new THREE.CanvasTexture( canvas );
	        texture.minFilter = THREE.LinearFilter;
	        texture.magFilter = THREE.LinearFilter;
	        texture.generateMipmaps = false;

	        return texture;

	    },

	    /**
	     * Create canvas element
	     * @memberOf Reticle
	     * @instance
	     * @returns {object} object
	     * @returns {HTMLCanvasElement} object.canvas
	     * @returns {CanvasRenderingContext2D} object.context
	     */
	    createCanvas: function () {

	        const width = 32;
	        const height = 32;
	        const canvas = document.createElement( 'canvas' );
	        const context = canvas.getContext( '2d' );
	        const dpr = this.dpr;

	        canvas.width = width * dpr;
	        canvas.height = height * dpr;
	        context.scale( dpr, dpr );

	        context.shadowBlur = 5;
	        context.shadowColor = 'rgba(200,200,200,0.9)';

	        return { canvas, context };

	    },

	    /**
	     * Update canvas arc by progress
	     * @param {number} progress 
	     * @memberOf Reticle
	     * @instance
	     */
	    updateCanvasArcByProgress: function ( progress ) {

	        const context = this.context;
	        const { canvasWidth, canvasHeight, material } = this;
	        const dpr = this.dpr;
	        const degree = progress * Math.PI * 2;
	        const color = this.color.getStyle();
	        const x = canvasWidth * 0.5 / dpr;
	        const y = canvasHeight * 0.5 / dpr;
	        const lineWidth = 3;
	        
	        context.clearRect( 0, 0, canvasWidth, canvasHeight );
	        context.beginPath();

	        if ( progress === 0 ) {
	            context.arc( x, y, canvasWidth / 16, 0, 2 * Math.PI );
	            context.fillStyle = color;
	            context.fill();
	        } else {
	            context.arc( x, y, canvasWidth / 4 - lineWidth, -Math.PI / 2, -Math.PI / 2 + degree );
	            context.strokeStyle = color;
	            context.lineWidth = lineWidth;
	            context.stroke();
	        }

	        context.closePath();

	        material.map.needsUpdate = true;

	    },

	    /**
	     * Ripple effect
	     * @memberOf Reticle
	     * @instance
	     * @fires Reticle#reticle-ripple-start
	     * @fires Reticle#reticle-ripple-end
	     */
	    ripple: function () {

	        const context = this.context;
	        const { canvasWidth, canvasHeight, material } = this;
	        const duration = this.rippleDuration;
	        const timestamp = performance.now();
	        const color = this.color;
	        const dpr = this.dpr;
	        const x = canvasWidth * 0.5 / dpr;
	        const y = canvasHeight * 0.5 / dpr;

	        const update = () => {

	            const timerId = window.requestAnimationFrame( update );
	            const elapsed = performance.now() - timestamp;
	            const progress = elapsed / duration;
	            const opacity = 1.0 - progress > 0 ? 1.0 - progress : 0;
	            const radius = progress * canvasWidth * 0.5 / dpr;

	            context.clearRect( 0, 0, canvasWidth, canvasHeight );
	            context.beginPath();
	            context.arc( x, y, radius, 0, Math.PI * 2 );
	            context.fillStyle = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${opacity})`;
	            context.fill();
	            context.closePath();

	            if ( progress >= 1.0 ) {

	                window.cancelAnimationFrame( timerId );
	                this.updateCanvasArcByProgress( 0 );

	                /**
	                 * Reticle ripple end event
	                 * @type {object}
	                 * @event Reticle#reticle-ripple-end
	                 */
	                this.dispatchEvent( { type: 'reticle-ripple-end' } );

	            }

	            material.map.needsUpdate = true;

	        };

	        /**
	         * Reticle ripple start event
	         * @type {object}
	         * @event Reticle#reticle-ripple-start
	         */
	        this.dispatchEvent( { type: 'reticle-ripple-start' } );

	        update();

	    },

	    /**
	     * Make reticle visible
	     * @memberOf Reticle
	     * @instance
	     */
	    show: function () {

	        this.visible = true;

	    },

	    /**
	     * Make reticle invisible
	     * @memberOf Reticle
	     * @instance
	     */
	    hide: function () {

	        this.visible = false;

	    },

	    /**
	     * Start dwelling
	     * @param {function} callback 
	     * @memberOf Reticle
	     * @instance
	     * @fires Reticle#reticle-start
	     */
	    start: function ( callback ) {

	        if ( !this.autoSelect ) {

	            return;

	        }

	        /**
	         * Reticle start event
	         * @type {object}
	         * @event Reticle#reticle-start
	         */
	        this.dispatchEvent( { type: 'reticle-start' } );

	        this.startTimestamp = performance.now();
	        this.callback = callback;
	        this.update();

	    },

	    /**
	     * End dwelling
	     * @memberOf Reticle
	     * @instance
	     * @fires Reticle#reticle-end
	     */
	    end: function(){

	        if ( !this.startTimestamp ) { return; }

	        window.cancelAnimationFrame( this.timerId );

	        this.updateCanvasArcByProgress( 0 );
	        this.callback = null;
	        this.timerId = null;
	        this.startTimestamp = null;

	        /**
	         * Reticle end event
	         * @type {object}
	         * @event Reticle#reticle-end
	         */
	        this.dispatchEvent( { type: 'reticle-end' } );

	    },

	    /**
	     * Update dwelling
	     * @memberOf Reticle
	     * @instance
	     * @fires Reticle#reticle-update
	     */
	    update: function () {

	        this.timerId = window.requestAnimationFrame( this.update.bind( this ) );

	        const elapsed = performance.now() - this.startTimestamp;
	        const progress = elapsed / this.dwellTime;

	        this.updateCanvasArcByProgress( progress );

	        /**
	         * Reticle update event
	         * @type {object}
	         * @event Reticle#reticle-update
	         */
	        this.dispatchEvent( { type: 'reticle-update', progress } );

	        if ( progress >= 1.0 ) {

	            window.cancelAnimationFrame( this.timerId );
	            if ( this.callback ) { this.callback(); }
	            this.end();
	            this.ripple();

	        }

	    }

	} );

	var version$1 = '18.5.0';

	/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/tweenjs/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */


	var _Group = function () {
		this._tweens = {};
		this._tweensAddedDuringUpdate = {};
	};

	_Group.prototype = {
		getAll: function () {

			return Object.keys(this._tweens).map(function (tweenId) {
				return this._tweens[tweenId];
			}.bind(this));

		},

		removeAll: function () {

			this._tweens = {};

		},

		add: function (tween) {

			this._tweens[tween.getId()] = tween;
			this._tweensAddedDuringUpdate[tween.getId()] = tween;

		},

		remove: function (tween) {

			delete this._tweens[tween.getId()];
			delete this._tweensAddedDuringUpdate[tween.getId()];

		},

		update: function (time, preserve) {

			var tweenIds = Object.keys(this._tweens);

			if (tweenIds.length === 0) {
				return false;
			}

			time = time !== undefined ? time : TWEEN.now();

			// Tweens are updated in "batches". If you add a new tween during an
			// update, then the new tween will be updated in the next batch.
			// If you remove a tween during an update, it may or may not be updated.
			// However, if the removed tween was added during the current batch,
			// then it will not be updated.
			while (tweenIds.length > 0) {
				this._tweensAddedDuringUpdate = {};

				for (var i = 0; i < tweenIds.length; i++) {

					var tween = this._tweens[tweenIds[i]];

					if (tween && tween.update(time) === false) {
						tween._isPlaying = false;

						if (!preserve) {
							delete this._tweens[tweenIds[i]];
						}
					}
				}

				tweenIds = Object.keys(this._tweensAddedDuringUpdate);
			}

			return true;

		}
	};

	var TWEEN = new _Group();

	TWEEN.Group = _Group;
	TWEEN._nextId = 0;
	TWEEN.nextId = function () {
		return TWEEN._nextId++;
	};


	// Include a performance.now polyfill.
	// In node.js, use process.hrtime.
	if (typeof (self) === 'undefined' && typeof (process) !== 'undefined' && process.hrtime) {
		TWEEN.now = function () {
			var time = process.hrtime();

			// Convert [seconds, nanoseconds] to milliseconds.
			return time[0] * 1000 + time[1] / 1000000;
		};
	}
	// In a browser, use self.performance.now if it is available.
	else if (typeof (self) !== 'undefined' &&
	         self.performance !== undefined &&
			 self.performance.now !== undefined) {
		// This must be bound, because directly assigning this function
		// leads to an invocation exception in Chrome.
		TWEEN.now = self.performance.now.bind(self.performance);
	}
	// Use Date.now if it is available.
	else if (Date.now !== undefined) {
		TWEEN.now = Date.now;
	}
	// Otherwise, use 'new Date().getTime()'.
	else {
		TWEEN.now = function () {
			return new Date().getTime();
		};
	}


	TWEEN.Tween = function (object, group) {
		this._isPaused = false;
		this._pauseStart = null;
		this._object = object;
		this._valuesStart = {};
		this._valuesEnd = {};
		this._valuesStartRepeat = {};
		this._duration = 1000;
		this._repeat = 0;
		this._repeatDelayTime = undefined;
		this._yoyo = false;
		this._isPlaying = false;
		this._reversed = false;
		this._delayTime = 0;
		this._startTime = null;
		this._easingFunction = TWEEN.Easing.Linear.None;
		this._interpolationFunction = TWEEN.Interpolation.Linear;
		this._chainedTweens = [];
		this._onStartCallback = null;
		this._onStartCallbackFired = false;
		this._onUpdateCallback = null;
		this._onRepeatCallback = null;
		this._onCompleteCallback = null;
		this._onStopCallback = null;
		this._group = group || TWEEN;
		this._id = TWEEN.nextId();

	};

	TWEEN.Tween.prototype = {
		getId: function () {
			return this._id;
		},

		isPlaying: function () {
			return this._isPlaying;
		},

		isPaused: function () {
			return this._isPaused;
		},

		to: function (properties, duration) {

			this._valuesEnd = Object.create(properties);

			if (duration !== undefined) {
				this._duration = duration;
			}

			return this;

		},

		duration: function duration(d) {
			this._duration = d;
			return this;
		},

		start: function (time) {

			this._group.add(this);

			this._isPlaying = true;

			this._isPaused = false;

			this._onStartCallbackFired = false;

			this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
			this._startTime += this._delayTime;

			for (var property in this._valuesEnd) {

				// Check if an Array was provided as property value
				if (this._valuesEnd[property] instanceof Array) {

					if (this._valuesEnd[property].length === 0) {
						continue;
					}

					// Create a local copy of the Array with the start value at the front
					this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

				}

				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (this._object[property] === undefined) {
					continue;
				}

				// Save the starting value, but only once.
				if (typeof(this._valuesStart[property]) === 'undefined') {
					this._valuesStart[property] = this._object[property];
				}

				if ((this._valuesStart[property] instanceof Array) === false) {
					this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
				}

				this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

			}

			return this;

		},

		stop: function () {

			if (!this._isPlaying) {
				return this;
			}

			this._group.remove(this);

			this._isPlaying = false;

			this._isPaused = false;

			if (this._onStopCallback !== null) {
				this._onStopCallback(this._object);
			}

			this.stopChainedTweens();
			return this;

		},

		end: function () {

			this.update(Infinity);
			return this;

		},

		pause: function(time) {

			if (this._isPaused || !this._isPlaying) {
				return this;
			}

			this._isPaused = true;

			this._pauseStart = time === undefined ? TWEEN.now() : time;

			this._group.remove(this);

			return this;

		},

		resume: function(time) {

			if (!this._isPaused || !this._isPlaying) {
				return this;
			}

			this._isPaused = false;

			this._startTime += (time === undefined ? TWEEN.now() : time)
				- this._pauseStart;

			this._pauseStart = 0;

			this._group.add(this);

			return this;

		},

		stopChainedTweens: function () {

			for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
				this._chainedTweens[i].stop();
			}

		},

		group: function (group) {
			this._group = group;
			return this;
		},

		delay: function (amount) {

			this._delayTime = amount;
			return this;

		},

		repeat: function (times) {

			this._repeat = times;
			return this;

		},

		repeatDelay: function (amount) {

			this._repeatDelayTime = amount;
			return this;

		},

		yoyo: function (yoyo) {

			this._yoyo = yoyo;
			return this;

		},

		easing: function (easingFunction) {

			this._easingFunction = easingFunction;
			return this;

		},

		interpolation: function (interpolationFunction) {

			this._interpolationFunction = interpolationFunction;
			return this;

		},

		chain: function () {

			this._chainedTweens = arguments;
			return this;

		},

		onStart: function (callback) {

			this._onStartCallback = callback;
			return this;

		},

		onUpdate: function (callback) {

			this._onUpdateCallback = callback;
			return this;

		},

		onRepeat: function onRepeat(callback) {

			this._onRepeatCallback = callback;
			return this;

		},

		onComplete: function (callback) {

			this._onCompleteCallback = callback;
			return this;

		},

		onStop: function (callback) {

			this._onStopCallback = callback;
			return this;

		},

		update: function (time) {

			var property;
			var elapsed;
			var value;

			if (time < this._startTime) {
				return true;
			}

			if (this._onStartCallbackFired === false) {

				if (this._onStartCallback !== null) {
					this._onStartCallback(this._object);
				}

				this._onStartCallbackFired = true;
			}

			elapsed = (time - this._startTime) / this._duration;
			elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

			value = this._easingFunction(elapsed);

			for (property in this._valuesEnd) {

				// Don't update properties that do not exist in the source object
				if (this._valuesStart[property] === undefined) {
					continue;
				}

				var start = this._valuesStart[property] || 0;
				var end = this._valuesEnd[property];

				if (end instanceof Array) {

					this._object[property] = this._interpolationFunction(end, value);

				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if (typeof (end) === 'string') {

						if (end.charAt(0) === '+' || end.charAt(0) === '-') {
							end = start + parseFloat(end);
						} else {
							end = parseFloat(end);
						}
					}

					// Protect against non numeric properties.
					if (typeof (end) === 'number') {
						this._object[property] = start + (end - start) * value;
					}

				}

			}

			if (this._onUpdateCallback !== null) {
				this._onUpdateCallback(this._object, elapsed);
			}

			if (elapsed === 1) {

				if (this._repeat > 0) {

					if (isFinite(this._repeat)) {
						this._repeat--;
					}

					// Reassign starting values, restart by making startTime = now
					for (property in this._valuesStartRepeat) {

						if (typeof (this._valuesEnd[property]) === 'string') {
							this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
						}

						if (this._yoyo) {
							var tmp = this._valuesStartRepeat[property];

							this._valuesStartRepeat[property] = this._valuesEnd[property];
							this._valuesEnd[property] = tmp;
						}

						this._valuesStart[property] = this._valuesStartRepeat[property];

					}

					if (this._yoyo) {
						this._reversed = !this._reversed;
					}

					if (this._repeatDelayTime !== undefined) {
						this._startTime = time + this._repeatDelayTime;
					} else {
						this._startTime = time + this._delayTime;
					}

					if (this._onRepeatCallback !== null) {
						this._onRepeatCallback(this._object);
					}

					return true;

				} else {

					if (this._onCompleteCallback !== null) {

						this._onCompleteCallback(this._object);
					}

					for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
						// Make the chained tweens start exactly at the time they should,
						// even if the `update()` method was called way past the duration of the tween
						this._chainedTweens[i].start(this._startTime + this._duration);
					}

					return false;

				}

			}

			return true;

		}
	};


	TWEEN.Easing = {

		Linear: {

			None: function (k) {

				return k;

			}

		},

		Quadratic: {

			In: function (k) {

				return k * k;

			},

			Out: function (k) {

				return k * (2 - k);

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k;
				}

				return - 0.5 * (--k * (k - 2) - 1);

			}

		},

		Cubic: {

			In: function (k) {

				return k * k * k;

			},

			Out: function (k) {

				return --k * k * k + 1;

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k + 2);

			}

		},

		Quartic: {

			In: function (k) {

				return k * k * k * k;

			},

			Out: function (k) {

				return 1 - (--k * k * k * k);

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k;
				}

				return - 0.5 * ((k -= 2) * k * k * k - 2);

			}

		},

		Quintic: {

			In: function (k) {

				return k * k * k * k * k;

			},

			Out: function (k) {

				return --k * k * k * k * k + 1;

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k * k * k + 2);

			}

		},

		Sinusoidal: {

			In: function (k) {

				return 1 - Math.cos(k * Math.PI / 2);

			},

			Out: function (k) {

				return Math.sin(k * Math.PI / 2);

			},

			InOut: function (k) {

				return 0.5 * (1 - Math.cos(Math.PI * k));

			}

		},

		Exponential: {

			In: function (k) {

				return k === 0 ? 0 : Math.pow(1024, k - 1);

			},

			Out: function (k) {

				return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

			},

			InOut: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				if ((k *= 2) < 1) {
					return 0.5 * Math.pow(1024, k - 1);
				}

				return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

			}

		},

		Circular: {

			In: function (k) {

				return 1 - Math.sqrt(1 - k * k);

			},

			Out: function (k) {

				return Math.sqrt(1 - (--k * k));

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return - 0.5 * (Math.sqrt(1 - k * k) - 1);
				}

				return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

			}

		},

		Elastic: {

			In: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

			},

			Out: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

			},

			InOut: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				k *= 2;

				if (k < 1) {
					return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
				}

				return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

			}

		},

		Back: {

			In: function (k) {

				var s = 1.70158;

				return k * k * ((s + 1) * k - s);

			},

			Out: function (k) {

				var s = 1.70158;

				return --k * k * ((s + 1) * k + s) + 1;

			},

			InOut: function (k) {

				var s = 1.70158 * 1.525;

				if ((k *= 2) < 1) {
					return 0.5 * (k * k * ((s + 1) * k - s));
				}

				return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

			}

		},

		Bounce: {

			In: function (k) {

				return 1 - TWEEN.Easing.Bounce.Out(1 - k);

			},

			Out: function (k) {

				if (k < (1 / 2.75)) {
					return 7.5625 * k * k;
				} else if (k < (2 / 2.75)) {
					return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
				} else if (k < (2.5 / 2.75)) {
					return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
				} else {
					return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
				}

			},

			InOut: function (k) {

				if (k < 0.5) {
					return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
				}

				return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

			}

		}

	};

	TWEEN.Interpolation = {

		Linear: function (v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.Linear;

			if (k < 0) {
				return fn(v[0], v[1], f);
			}

			if (k > 1) {
				return fn(v[m], v[m - 1], m - f);
			}

			return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

		},

		Bezier: function (v, k) {

			var b = 0;
			var n = v.length - 1;
			var pw = Math.pow;
			var bn = TWEEN.Interpolation.Utils.Bernstein;

			for (var i = 0; i <= n; i++) {
				b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
			}

			return b;

		},

		CatmullRom: function (v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.CatmullRom;

			if (v[0] === v[m]) {

				if (k < 0) {
					i = Math.floor(f = m * (1 + k));
				}

				return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

			} else {

				if (k < 0) {
					return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
				}

				if (k > 1) {
					return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
				}

				return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

			}

		},

		Utils: {

			Linear: function (p0, p1, t) {

				return (p1 - p0) * t + p0;

			},

			Bernstein: function (n, i) {

				var fc = TWEEN.Interpolation.Utils.Factorial;

				return fc(n) / fc(i) / fc(n - i);

			},

			Factorial: (function () {

				var a = [1];

				return function (n) {

					var s = 1;

					if (a[n]) {
						return a[n];
					}

					for (var i = n; i > 1; i--) {
						s *= i;
					}

					a[n] = s;
					return s;

				};

			})(),

			CatmullRom: function (p0, p1, p2, p3, t) {

				var v0 = (p2 - p0) * 0.5;
				var v1 = (p3 - p1) * 0.5;
				var t2 = t * t;
				var t3 = t * t2;

				return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

			}

		}

	};
	TWEEN.version = version$1;

	/**
	 * @classdesc Information spot attached to panorama
	 * @constructor
	 * @param {number} [scale=300] - Default scale
	 * @param {string} [imageSrc=PANOLENS.DataImage.Info] - Image overlay info
	 * @param {boolean} [animated=true] - Enable default hover animation
	 */
	function Infospot ( scale = 300, imageSrc, animated ) {
		
	    const duration = 500, scaleFactor = 1.3;

	    imageSrc = imageSrc || DataImage.Info;

	    THREE.Sprite.call( this );

	    this.type = 'infospot';

	    this.animated = animated !== undefined ? animated : true;
	    this.isHovering = false;

	    /*
	     * TODO: Three.js bug hotfix for sprite raycasting r104
	     * https://github.com/mrdoob/three.js/issues/14624
	     */
	    this.frustumCulled = false;

	    this.element = null;
	    this.toPanorama = null;
	    this.cursorStyle = null;

	    this.mode = MODES.NORMAL;

	    this.scale.set( scale, scale, 1 );
	    this.rotation.y = Math.PI;

	    this.container = null;

	    this.originalRaycast = this.raycast;

	    // Event Handler
	    this.HANDLER_FOCUS = null;	

	    this.material.side = THREE.DoubleSide;
	    this.material.depthTest = false;
	    this.material.transparent = true;
	    this.material.opacity = 0;

	    this.scaleUpAnimation = new TWEEN.Tween();
	    this.scaleDownAnimation = new TWEEN.Tween();


	    const postLoad = function ( texture ) {

	        if ( !this.material ) { return; }

	        const ratio = texture.image.width / texture.image.height;
	        const textureScale = new THREE.Vector3();

	        texture.image.width = texture.image.naturalWidth || 64;
	        texture.image.height = texture.image.naturalHeight || 64;

	        this.scale.set( ratio * scale, scale, 1 );

	        textureScale.copy( this.scale );

	        this.scaleUpAnimation = new TWEEN.Tween( this.scale )
	            .to( { x: textureScale.x * scaleFactor, y: textureScale.y * scaleFactor }, duration )
	            .easing( TWEEN.Easing.Elastic.Out );

	        this.scaleDownAnimation = new TWEEN.Tween( this.scale )
	            .to( { x: textureScale.x, y: textureScale.y }, duration )
	            .easing( TWEEN.Easing.Elastic.Out );

	        this.material.map = texture;
	        this.material.needsUpdate = true;

	    }.bind( this );

	    // Add show and hide animations
	    this.showAnimation = new TWEEN.Tween( this.material )
	        .to( { opacity: 1 }, duration )
	        .onStart( this.enableRaycast.bind( this, true ) )
	        .easing( TWEEN.Easing.Quartic.Out );

	    this.hideAnimation = new TWEEN.Tween( this.material )
	        .to( { opacity: 0 }, duration )
	        .onStart( this.enableRaycast.bind( this, false ) )
	        .easing( TWEEN.Easing.Quartic.Out );

	    // Attach event listeners
	    this.addEventListener( 'click', this.onClick );
	    this.addEventListener( 'hover', this.onHover );
	    this.addEventListener( 'hoverenter', this.onHoverStart );
	    this.addEventListener( 'hoverleave', this.onHoverEnd );
	    this.addEventListener( 'panolens-dual-eye-effect', this.onDualEyeEffect );
	    this.addEventListener( 'panolens-container', this.setContainer.bind( this ) );
	    this.addEventListener( 'dismiss', this.onDismiss );
	    this.addEventListener( 'panolens-infospot-focus', this.setFocusMethod );

	    TextureLoader.load( imageSrc, postLoad );	

	}
	Infospot.prototype = Object.assign( Object.create( THREE.Sprite.prototype ), {

	    constructor: Infospot,

	    /**
	     * Set infospot container
	     * @param {HTMLElement|object} data - Data with container information
	     * @memberOf Infospot
	     * @instance
	     */
	    setContainer: function ( data ) {

	        let container;
		
	        if ( data instanceof HTMLElement ) {
		
	            container = data;
		
	        } else if ( data && data.container ) {
		
	            container = data.container;
		
	        }
		
	        // Append element if exists
	        if ( container && this.element ) {
		
	            container.appendChild( this.element );
		
	        }
		
	        this.container = container;
		
	    },

	    /**
	     * Get container
	     * @memberOf Infospot
	     * @instance
	     * @return {HTMLElement} - The container of this infospot
	     */
	    getContainer: function () {

	        return this.container;

	    },

	    /**
	     * This will be called by a click event
	     * Translate and lock the hovering element if any
	     * @param  {object} event - Event containing mouseEvent with clientX and clientY
	     * @memberOf Infospot
	     * @instance
	     */
	    onClick: function ( event ) {

	        if ( this.element && this.getContainer() ) {

	            this.onHoverStart( event );

	            // Lock element
	            this.lockHoverElement();

	        }

	    },

	    /**
	     * Dismiss current element if any
	     * @param  {object} event - Dismiss event
	     * @memberOf Infospot
	     * @instance
	     */
	    onDismiss: function () {

	        if ( this.element ) {

	            this.unlockHoverElement();
	            this.onHoverEnd();

	        }

	    },

	    /**
	     * This will be called by a mouse hover event
	     * Translate the hovering element if any
	     * @param  {object} event - Event containing mouseEvent with clientX and clientY
	     * @memberOf Infospot
	     * @instance
	     */
	    onHover: function () {},

	    /**
	     * This will be called on a mouse hover start
	     * Sets cursor style to 'pointer', display the element and scale up the infospot
	     * @param {object} event
	     * @memberOf Infospot
	     * @instance
	     */
	    onHoverStart: function ( event ) {

	        if ( !this.getContainer() ) { return; }

	        const cursorStyle = this.cursorStyle || ( this.mode === MODES.NORMAL ? 'pointer' : 'default' );
	        const { scaleDownAnimation, scaleUpAnimation, element } = this;

	        this.isHovering = true;
	        this.container.style.cursor = cursorStyle;
			
	        if ( this.animated ) {

	            scaleDownAnimation.stop();
	            scaleUpAnimation.start();

	        }
			
	        if ( element && event.mouseEvent.clientX >= 0 && event.mouseEvent.clientY >= 0 ) {

	            const { left, right, style } = element;

	            if ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) {

	                style.display = 'none';
	                left.style.display = 'block';
	                right.style.display = 'block';

	                // Store element width for reference
	                element._width = left.clientWidth;
	                element._height = left.clientHeight;

	            } else {

	                style.display = 'block';
	                if ( left ) { left.style.display = 'none'; }
	                if ( right ) { right.style.display = 'none'; }

	                // Store element width for reference
	                element._width = element.clientWidth;
	                element._height = element.clientHeight;

	            }
				
	        }

	    },

	    /**
	     * This will be called on a mouse hover end
	     * Sets cursor style to 'default', hide the element and scale down the infospot
	     * @memberOf Infospot
	     * @instance
	     */
	    onHoverEnd: function () {

	        if ( !this.getContainer() ) { return; }

	        const { scaleDownAnimation, scaleUpAnimation, element } = this;

	        this.isHovering = false;
	        this.container.style.cursor = 'default';

	        if ( this.animated ) {

	            scaleUpAnimation.stop();
	            scaleDownAnimation.start();

	        }

	        if ( element && !this.element.locked ) {

	            const { left, right, style } = element;

	            style.display = 'none';
	            if ( left ) { left.style.display = 'none'; }
	            if ( right ) { right.style.display = 'none'; }

	            this.unlockHoverElement();

	        }

	    },

	    /**
	     * On dual eye effect handler
	     * Creates duplicate left and right element
	     * @param  {object} event - panolens-dual-eye-effect event
	     * @memberOf Infospot
	     * @instance
	     */
	    onDualEyeEffect: function ( event ) {
			
	        if ( !this.getContainer() ) { return; }

	        let element, halfWidth, halfHeight;

	        this.mode = event.mode;

	        element = this.element;

	        halfWidth = this.container.clientWidth / 2;
	        halfHeight = this.container.clientHeight / 2;

	        if ( !element ) {

	            return;

	        }

	        if ( !element.left && !element.right ) {

	            element.left = element.cloneNode( true );
	            element.right = element.cloneNode( true );

	        }

	        if ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) {

	            element.left.style.display = element.style.display;
	            element.right.style.display = element.style.display;
	            element.style.display = 'none';

	        } else {

	            element.style.display = element.left.style.display;
	            element.left.style.display = 'none';
	            element.right.style.display = 'none';

	        }

	        // Update elements translation
	        this.translateElement( halfWidth, halfHeight );

	        this.container.appendChild( element.left );
	        this.container.appendChild( element.right );

	    },

	    /**
	     * Translate the hovering element by css transform
	     * @param  {number} x - X position on the window screen
	     * @param  {number} y - Y position on the window screen
	     * @memberOf Infospot
	     * @instance
	     */
	    translateElement: function ( x, y ) {

	        if ( !this.element._width || !this.element._height || !this.getContainer() ) {

	            return;

	        }

	        let left, top, element, width, height, delta, container;

	        container = this.container;
	        element = this.element;
	        width = element._width / 2;
	        height = element._height / 2;
	        delta = element.verticalDelta !== undefined ? element.verticalDelta : 40;

	        left = x - width;
	        top = y - height - delta;

	        if ( ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) 
					&& element.left && element.right
					&& !( x === container.clientWidth / 2 && y === container.clientHeight / 2 ) ) {

	            left = container.clientWidth / 4 - width + ( x - container.clientWidth / 2 );
	            top = container.clientHeight / 2 - height - delta + ( y - container.clientHeight / 2 );

	            this.setElementStyle( 'transform', element.left, 'translate(' + left + 'px, ' + top + 'px)' );

	            left += container.clientWidth / 2;

	            this.setElementStyle( 'transform', element.right, 'translate(' + left + 'px, ' + top + 'px)' );

	        } else {

	            this.setElementStyle( 'transform', element, 'translate(' + left + 'px, ' + top + 'px)' );

	        }

	    },

	    /**
	     * Set vendor specific css
	     * @param {string} type - CSS style name
	     * @param {HTMLElement} element - The element to be modified
	     * @param {string} value - Style value
	     * @memberOf Infospot
	     * @instance
	     */
	    setElementStyle: function ( type, element, value ) {

	        const style = element.style;

	        if ( type === 'transform' ) {

	            style.webkitTransform = style.msTransform = style.transform = value;

	        }

	    },

	    /**
	     * Set hovering text content
	     * @param {string} text - Text to be displayed
	     * @memberOf Infospot
	     * @instance
	     */
	    setText: function ( text ) {

	        if ( this.element ) {

	            this.element.textContent = text;

	        }

	    },

	    /**
	     * Set cursor css style on hover
	     * @memberOf Infospot
	     * @instance
	     */
	    setCursorHoverStyle: function ( style ) {

	        this.cursorStyle = style;

	    },

	    /**
	     * Add hovering text element
	     * @param {string} text - Text to be displayed
	     * @param {number} [delta=40] - Vertical delta to the infospot
	     * @memberOf Infospot
	     * @instance
	     */
	    addHoverText: function ( text, delta = 40 ) {

	        if ( !this.element ) {

	            this.element = document.createElement( 'div' );
	            this.element.style.display = 'none';
	            this.element.style.color = '#fff';
	            this.element.style.top = 0;
	            this.element.style.maxWidth = '50%';
	            this.element.style.maxHeight = '50%';
	            this.element.style.textShadow = '0 0 3px #000000';
	            this.element.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';
	            this.element.style.position = 'absolute';
	            this.element.classList.add( 'panolens-infospot' );
	            this.element.verticalDelta = delta;

	        }

	        this.setText( text );

	    },

	    /**
	     * Add hovering element by cloning an element
	     * @param {HTMLDOMElement} el - Element to be cloned and displayed
	     * @param {number} [delta=40] - Vertical delta to the infospot
	     * @memberOf Infospot
	     * @instance
	     */
	    addHoverElement: function ( el, delta = 40 ) {

	        if ( !this.element ) { 

	            this.element = el.cloneNode( true );
	            this.element.style.display = 'none';
	            this.element.style.top = 0;
	            this.element.style.position = 'absolute';
	            this.element.classList.add( 'panolens-infospot' );
	            this.element.verticalDelta = delta;

	        }

	    },

	    /**
	     * Remove hovering element
	     * @memberOf Infospot
	     * @instance
	     */
	    removeHoverElement: function () {

	        if ( this.element ) { 

	            if ( this.element.left ) {

	                this.container.removeChild( this.element.left );
	                this.element.left = null;

	            }

	            if ( this.element.right ) {

	                this.container.removeChild( this.element.right );
	                this.element.right = null;

	            }

	            this.container.removeChild( this.element );
	            this.element = null;

	        }

	    },

	    /**
	     * Lock hovering element
	     * @memberOf Infospot
	     * @instance
	     */
	    lockHoverElement: function () {

	        if ( this.element ) { 

	            this.element.locked = true;

	        }

	    },

	    /**
	     * Unlock hovering element
	     * @memberOf Infospot
	     * @instance
	     */
	    unlockHoverElement: function () {

	        if ( this.element ) { 

	            this.element.locked = false;

	        }

	    },

	    /**
	     * Enable raycasting
	     * @param {boolean} [enabled=true]
	     * @memberOf Infospot
	     * @instance
	     */
	    enableRaycast: function ( enabled = true ) {

	        if ( enabled ) {

	            this.raycast = this.originalRaycast;

	        } else {

	            this.raycast = () => {};

	        }

	    },

	    /**
	     * Show infospot
	     * @param  {number} [delay=0] - Delay time to show
	     * @memberOf Infospot
	     * @instance
	     */
	    show: function ( delay = 0 ) {

	        const { animated, hideAnimation, showAnimation, material } = this;

	        if ( animated ) {

	            hideAnimation.stop();
	            showAnimation.delay( delay ).start();

	        } else {

	            this.enableRaycast( true );
	            material.opacity = 1;

	        }

	    },

	    /**
	     * Hide infospot
	     * @param  {number} [delay=0] - Delay time to hide
	     * @memberOf Infospot
	     * @instance
	     */
	    hide: function ( delay = 0 ) {

	        const { animated, hideAnimation, showAnimation, material } = this;

	        if ( animated ) {

	            showAnimation.stop();
	            hideAnimation.delay( delay ).start();

	        } else {

	            this.enableRaycast( false );
	            material.opacity = 0;

	        }
			
	    },

	    /**
	     * Set focus event handler
	     * @memberOf Infospot
	     * @instance
	     */
	    setFocusMethod: function ( event ) {

	        if ( event ) {

	            this.HANDLER_FOCUS = event.method;

	        }

	    },

	    /**
	     * Focus camera center to this infospot
	     * @param {number} [duration=1000] - Duration to tween
	     * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	     * @memberOf Infospot
	     * @instance
	     */
	    focus: function ( duration, easing ) {

	        if ( this.HANDLER_FOCUS ) {

	            this.HANDLER_FOCUS( this.position, duration, easing );
	            this.onDismiss();

	        }

	    },

	    /**
	     * Dispose
	     * @memberOf Infospot
	     * @instance
	     */
	    dispose: function () {

	        const { geometry, material } = this;
	        const { map } = material;

	        this.removeHoverElement();

	        if ( this.parent ) {

	            this.parent.remove( this );

	        }

	        if ( map ) { map.dispose(); material.map = null; }
	        if ( geometry ) { geometry.dispose(); this.geometry = null; }
	        if ( material ) { material.dispose(); this.material = null; }

	    }

	} );

	/**
	 * @classdesc Widget for controls
	 * @constructor
	 * @param {HTMLElement} container - A domElement where default control widget will be attached to
	 */
	function Widget ( container ) {

	    if ( !container ) {

	        console.warn( 'PANOLENS.Widget: No container specified' );

	    }

	    THREE.EventDispatcher.call( this );

	    this.DEFAULT_TRANSITION  = 'all 0.27s ease';
	    this.TOUCH_ENABLED = !!(( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch);
	    this.PREVENT_EVENT_HANDLER = function ( event ) {
	        event.preventDefault();
	        event.stopPropagation();
	    };

	    this.container = container;

	    this.barElement = null;
	    this.fullscreenElement = null;
	    this.videoElement = null;
	    this.settingElement = null;

	    this.mainMenu = null;

	    this.activeMainItem = null;
	    this.activeSubMenu = null;
	    this.mask = null;

	}

	Widget.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	    constructor: Widget,

	    /**
	     * Add control bar
	     * @memberOf Widget
	     * @instance
	     */
	    addControlBar: function () {

	        if ( !this.container ) {

	            console.warn( 'Widget container not set' ); 
	            return; 
	        }

	        const scope = this;
	        const gradientStyle = 'linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))';

	        const bar = document.createElement( 'div' );
	        bar.style.width = '100%';
	        bar.style.height = '44px';
	        bar.style.float = 'left';
	        bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = 'translateY(-100%)';
	        bar.style.background = '-webkit-' + gradientStyle;
	        bar.style.background = '-moz-' + gradientStyle;
	        bar.style.background = '-o-' + gradientStyle;
	        bar.style.background = '-ms-' + gradientStyle;
	        bar.style.background = gradientStyle;
	        bar.style.transition = this.DEFAULT_TRANSITION;
	        bar.style.pointerEvents = 'none';
	        bar.isHidden = false;
	        bar.toggle = function () {
	            bar.isHidden = !bar.isHidden;
	            const styleTranslate = bar.isHidden ? 'translateY(0)' : 'translateY(-100%)';
	            const styleOpacity = bar.isHidden ? 0 : 1;
	            bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = styleTranslate;
	            bar.style.opacity = styleOpacity;
	        };

	        // Menu
	        const menu = this.createDefaultMenu();
	        this.mainMenu = this.createMainMenu( menu );
	        bar.appendChild( this.mainMenu );

	        // Mask
	        const mask = this.createMask();
	        this.mask = mask;
	        this.container.appendChild( mask );

	        // Dispose
	        bar.dispose = function () {

	            if ( scope.fullscreenElement ) {

	                bar.removeChild( scope.fullscreenElement );
	                scope.fullscreenElement.dispose();
	                scope.fullscreenElement = null;

	            }

	            if ( scope.settingElement ) {

	                bar.removeChild( scope.settingElement );
	                scope.settingElement.dispose();
	                scope.settingElement = null;

	            }

	            if ( scope.videoElement ) {

	                bar.removeChild( scope.videoElement );
	                scope.videoElement.dispose();
	                scope.videoElement = null;

	            }

	        };

	        this.container.appendChild( bar );

	        // Mask events
	        this.mask.addEventListener( 'mousemove', this.PREVENT_EVENT_HANDLER, true );
	        this.mask.addEventListener( 'mouseup', this.PREVENT_EVENT_HANDLER, true );
	        this.mask.addEventListener( 'mousedown', this.PREVENT_EVENT_HANDLER, true );
	        this.mask.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', function ( event ) {

	            event.preventDefault();
	            event.stopPropagation();

	            scope.mask.hide();
	            scope.settingElement.deactivate();

	        }, false );

	        // Event listener
	        this.addEventListener( 'control-bar-toggle', bar.toggle );

	        this.barElement = bar;

	    },

	    /**
	     * Create default menu
	     * @memberOf Widget
	     * @instance
	     */
	    createDefaultMenu: function () {

	        const scope = this;
	        const handler = function ( method, data ) {

	            return function () {

	                scope.dispatchEvent( { 

	                    type: 'panolens-viewer-handler', 
	                    method: method, 
	                    data: data 

	                } ); 

	            };

	        };

	        return [

	            { 
	                title: 'Control', 
	                subMenu: [ 
	                    { 
	                        title: this.TOUCH_ENABLED ? 'Touch' : 'Mouse', 
	                        handler: handler( 'enableControl', CONTROLS.ORBIT )
	                    },
	                    { 
	                        title: 'Sensor', 
	                        handler: handler( 'enableControl', CONTROLS.DEVICEORIENTATION ) 
	                    } 
	                ]
	            },

	            { 
	                title: 'Mode', 
	                subMenu: [ 
	                    { 
	                        title: 'Normal',
	                        handler: handler( 'disableEffect' )
	                    }, 
	                    { 
	                        title: 'Cardboard',
	                        handler: handler( 'enableEffect', MODES.CARDBOARD )
	                    },
	                    { 
	                        title: 'Stereoscopic',
	                        handler: handler( 'enableEffect', MODES.STEREO )
	                    }
	                ]
	            }

	        ];

	    },

	    /**
	     * Add buttons on top of control bar
	     * @param {string} name - The control button name to be created
	     * @memberOf Widget
	     * @instance
	     */
	    addControlButton: function ( name ) {

	        let element;

	        switch( name ) {

	        case 'fullscreen':

	            element = this.createFullscreenButton();
	            this.fullscreenElement = element; 

	            break;

	        case 'setting':

	            element = this.createSettingButton();
	            this.settingElement = element;

	            break;

	        case 'video':

	            element = this.createVideoControl();
	            this.videoElement = element;

	            break;

	        default:

	            return;

	        }

	        if ( !element ) {

	            return;

	        }

	        this.barElement.appendChild( element );

	    },

	    /**
	     * Create modal mask
	     * @memberOf Widget
	     * @instance
	     */
	    createMask: function () {

	        const element = document.createElement( 'div' );
	        element.style.position = 'absolute';
	        element.style.top = 0;
	        element.style.left = 0;
	        element.style.width = '100%';
	        element.style.height = '100%';
	        element.style.background = 'transparent';
	        element.style.display = 'none';

	        element.show = function () {

	            this.style.display = 'block';

	        };

	        element.hide = function () {

	            this.style.display = 'none';

	        };

	        return element;

	    },

	    /**
	     * Create Setting button to toggle menu
	     * @memberOf Widget
	     * @instance
	     */
	    createSettingButton: function () {

	        let scope = this, item;

	        function onTap ( event ) {

	            event.preventDefault();
	            event.stopPropagation();

	            scope.mainMenu.toggle();

	            if ( this.activated ) {
		
	                this.deactivate();

	            } else {

	                this.activate();

	            }

	        }

	        item = this.createCustomItem( { 

	            style: { 

	                backgroundImage: 'url("' + DataImage.Setting + '")',
	                webkitTransition: this.DEFAULT_TRANSITION,
	                transition: this.DEFAULT_TRANSITION

	            },

	            onTap: onTap

	        } );

	        item.activate = function () {

	            this.style.transform = 'rotate3d(0,0,1,90deg)';
	            this.activated = true;
	            scope.mask.show();

	        };

	        item.deactivate = function () {

	            this.style.transform = 'rotate3d(0,0,0,0)';
	            this.activated = false;
	            scope.mask.hide();

	            if ( scope.mainMenu && scope.mainMenu.visible ) {

	                scope.mainMenu.hide();
					
	            }

	            if ( scope.activeSubMenu && scope.activeSubMenu.visible ) {

	                scope.activeSubMenu.hide();

	            }

	            if ( scope.mainMenu && scope.mainMenu._width ) {

	                scope.mainMenu.changeSize( scope.mainMenu._width );
	                scope.mainMenu.unslideAll();

	            }
				
	        };

	        item.activated = false;

	        return item;

	    },

	    /**
	     * Create Fullscreen button
	     * @return {HTMLSpanElement} - The dom element icon for fullscreen
	     * @memberOf Widget
	     * @instance
	     * @fires Widget#panolens-viewer-handler
	     */
	    createFullscreenButton: function () {

	        let scope = this, item, isFullscreen = false, tapSkipped = true, stylesheetId;

	        const { container } = this;

	        stylesheetId = 'panolens-style-addon';

	        // Don't create button if no support
	        if ( !document.fullscreenEnabled       && 
				!document.webkitFullscreenEnabled &&
				!document.mozFullScreenEnabled    &&
				!document.msFullscreenEnabled ) {
	            return;
	        }

	        function onTap ( event ) {

	            event.preventDefault();
	            event.stopPropagation();

	            tapSkipped = false;

	            if ( !isFullscreen ) {

	                if ( container.requestFullscreen ) { container.requestFullscreen(); }
	                if ( container.msRequestFullscreen ) { container.msRequestFullscreen(); }
	                if ( container.mozRequestFullScreen ) { container.mozRequestFullScreen(); }
	                if ( container.webkitRequestFullscreen ) { container.webkitRequestFullscreen( Element.ALLOW_KEYBOARD_INPUT ); }
	              
	                isFullscreen = true;

	            } else {

	                if ( document.exitFullscreen ) { document.exitFullscreen(); }
	                if ( document.msExitFullscreen ) { document.msExitFullscreen(); }
	                if ( document.mozCancelFullScreen ) { document.mozCancelFullScreen(); }
	                if ( document.webkitExitFullscreen ) { document.webkitExitFullscreen( ); }

	                isFullscreen = false;

	            }

	            this.style.backgroundImage = ( isFullscreen ) 
	                ? 'url("' + DataImage.FullscreenLeave + '")' 
	                : 'url("' + DataImage.FullscreenEnter + '")';

	        }

	        function onFullScreenChange () {

	            if ( tapSkipped ) {

	                isFullscreen = !isFullscreen; 

	                item.style.backgroundImage = ( isFullscreen ) 
	                    ? 'url("' + DataImage.FullscreenLeave + '")' 
	                    : 'url("' + DataImage.FullscreenEnter + '")';

	            }

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @event Widget#panolens-viewer-handler
	             * @property {string} method - 'onWindowResize' function call on Viewer
	             */
	            scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onWindowResize' } );

	            tapSkipped = true;

	        }

	        document.addEventListener( 'fullscreenchange', onFullScreenChange, false );
	        document.addEventListener( 'webkitfullscreenchange', onFullScreenChange, false );
	        document.addEventListener( 'mozfullscreenchange', onFullScreenChange, false );
	        document.addEventListener( 'MSFullscreenChange', onFullScreenChange, false );

	        item = this.createCustomItem( { 

	            style: { 

	                backgroundImage: 'url("' + DataImage.FullscreenEnter + '")' 

	            },

	            onTap: onTap

	        } );

	        // Add fullscreen stlye if not exists
	        if ( !document.querySelector( stylesheetId ) ) {
	            const sheet = document.createElement( 'style' );
	            sheet.id = stylesheetId;
	            sheet.innerHTML = ':-webkit-full-screen { width: 100% !important; height: 100% !important }';
	            document.body.appendChild( sheet );
	        }
			
	        return item;

	    },

	    /**
	     * Create video control container
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLSpanElement} - The dom element icon for video control
	     */
	    createVideoControl: function () {

	        const item = document.createElement( 'span' );
	        item.style.display = 'none';
	        item.show = function () { 

	            item.style.display = '';

	        };

	        item.hide = function () { 

	            item.style.display = 'none';
	            item.controlButton.paused = true;
	            item.controlButton.update();

	        };

	        item.controlButton = this.createVideoControlButton();
	        item.seekBar = this.createVideoControlSeekbar();
			
	        item.appendChild( item.controlButton );
	        item.appendChild( item.seekBar );

	        item.dispose = function () {

	            item.removeChild( item.controlButton );
	            item.removeChild( item.seekBar );

	            item.controlButton.dispose();
	            item.controlButton = null;

	            item.seekBar.dispose();
	            item.seekBar = null;

	        };

	        this.addEventListener( 'video-control-show', item.show );
	        this.addEventListener( 'video-control-hide', item.hide );

	        return item;

	    },

	    /**
	     * Create video control button
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLSpanElement} - The dom element icon for video control
	     * @fires Widget#panolens-viewer-handler
	     */
	    createVideoControlButton: function () {

	        const scope = this;

	        function onTap ( event ) {

	            event.preventDefault();
	            event.stopPropagation();

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @event Widget#panolens-viewer-handler
	             * @property {string} method - 'toggleVideoPlay' function call on Viewer
	             */
	            scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVideoPlay', data: !this.paused } );

	            this.paused = !this.paused;

	            item.update();

	        }
	        const item = this.createCustomItem( { 

	            style: { 

	                float: 'left',
	                backgroundImage: 'url("' + DataImage.VideoPlay + '")'

	            },

	            onTap: onTap

	        } );

	        item.paused = true;

	        item.update = function ( paused ) {

	            this.paused = paused !== undefined ? paused : this.paused;

	            this.style.backgroundImage = 'url("' + ( this.paused 
	                ? DataImage.VideoPlay 
	                : DataImage.VideoPause ) + '")';

	        };

	        return item;

	    },

	    /**
	     * Create video seekbar
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLSpanElement} - The dom element icon for video seekbar
	     * @fires Widget#panolens-viewer-handler
	     */
	    createVideoControlSeekbar: function () {

	        let scope = this, item, progressElement, progressElementControl,
	            isDragging = false, mouseX, percentageNow, percentageNext;

	        progressElement = document.createElement( 'div' );
	        progressElement.style.width = '0%';
	        progressElement.style.height = '100%';
	        progressElement.style.backgroundColor = '#fff';

	        progressElementControl = document.createElement( 'div' );
	        progressElementControl.style.float = 'right';
	        progressElementControl.style.width = '14px';
	        progressElementControl.style.height = '14px';
	        progressElementControl.style.transform = 'translate(7px, -5px)';
	        progressElementControl.style.borderRadius = '50%';
	        progressElementControl.style.backgroundColor = '#ddd';

	        progressElementControl.addEventListener( 'mousedown', onMouseDown, { passive: true } );
	        progressElementControl.addEventListener( 'touchstart', onMouseDown,  { passive: true } );

	        function onMouseDown ( event ) {

	            event.stopPropagation();
				
	            isDragging = true;
				
	            mouseX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );

	            percentageNow = parseInt( progressElement.style.width ) / 100;

	            addControlListeners();
	        }

	        function onVideoControlDrag ( event ) {

	            if( isDragging ){

	                const clientX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );
					
	                percentageNext = ( clientX - mouseX ) / item.clientWidth;

	                percentageNext = percentageNow + percentageNext;

	                percentageNext = percentageNext > 1 ? 1 : ( ( percentageNext < 0 ) ? 0 : percentageNext );

	                item.setProgress ( percentageNext );

	                /**
	                 * Viewer handler event
	                 * @type {object}
	                 * @event Widget#panolens-viewer-handler
	                 * @property {string} method - 'setVideoCurrentTime' function call on Viewer
	                 * @property {number} data - Percentage of current video. Range from 0.0 to 1.0
	                 */
	                scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentageNext } );

	            }

	        }

	        function onVideoControlStop ( event ) {

	            event.stopPropagation();

	            isDragging = false;

	            removeControlListeners();

	        }

	        function addControlListeners () {

	            scope.container.addEventListener( 'mousemove', onVideoControlDrag, { passive: true } );
	            scope.container.addEventListener( 'mouseup', onVideoControlStop, { passive: true } );
	            scope.container.addEventListener( 'touchmove', onVideoControlDrag, { passive: true } );
	            scope.container.addEventListener( 'touchend', onVideoControlStop, { passive: true } );


	        }

	        function removeControlListeners () {

	            scope.container.removeEventListener( 'mousemove', onVideoControlDrag, false );
	            scope.container.removeEventListener( 'mouseup', onVideoControlStop, false );
	            scope.container.removeEventListener( 'touchmove', onVideoControlDrag, false );
	            scope.container.removeEventListener( 'touchend', onVideoControlStop, false );

	        }

	        function onTap ( event ) {

	            event.preventDefault();
	            event.stopPropagation();

	            if ( event.target === progressElementControl ) { return; }

	            const percentage = ( event.changedTouches && event.changedTouches.length > 0 )
	                ? ( event.changedTouches[0].pageX - event.target.getBoundingClientRect().left ) / this.clientWidth
	                : event.offsetX / this.clientWidth;

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @property {string} method - 'setVideoCurrentTime' function call on Viewer
	             * @property {number} data - Percentage of current video. Range from 0.0 to 1.0
	             */
	            scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentage } );

	            item.setProgress( event.offsetX / this.clientWidth );

	        }
	        function onDispose () {

	            removeControlListeners();
	            progressElement = null;
	            progressElementControl = null;

	        }

	        progressElement.appendChild( progressElementControl );

	        item = this.createCustomItem( {

	            style: { 

	                float: 'left',
	                width: '30%',
	                height: '4px',
	                marginTop: '20px',
	                backgroundColor: 'rgba(188,188,188,0.8)'

	            },

	            onTap: onTap,
	            onDispose: onDispose

	        } );

	        item.appendChild( progressElement );

	        item.setProgress = function( percentage ) {

	            progressElement.style.width = percentage * 100 + '%';

	        };		

	        this.addEventListener( 'video-update', function ( event ) { 

	            item.setProgress( event.percentage ); 

	        } );

	        item.progressElement = progressElement;
	        item.progressElementControl = progressElementControl;

	        return item;

	    },

	    /**
	     * Create menu item
	     * @param  {string} title - Title to display
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLElement} - An anchor tag element
	     */
	    createMenuItem: function ( title ) {

	        const scope = this; 
	        const item = document.createElement( 'a' );
	        item.textContent = title;
	        item.style.display = 'block';
	        item.style.padding = '10px';
	        item.style.textDecoration = 'none';
	        item.style.cursor = 'pointer';
	        item.style.pointerEvents = 'auto';
	        item.style.transition = this.DEFAULT_TRANSITION;

	        item.slide = function ( right ) {

	            this.style.transform = 'translateX(' + ( right ? '' : '-' ) + '100%)';

	        };

	        item.unslide = function () {

	            this.style.transform = 'translateX(0)';

	        };

	        item.setIcon = function ( url ) {

	            if ( this.icon ) {

	                this.icon.style.backgroundImage = 'url(' + url + ')';

	            }

	        };

	        item.setSelectionTitle = function ( title ) {

	            if ( this.selection ) {

	                this.selection.textContent = title;

	            }

	        };

	        item.addSelection = function ( name ) {
				
	            const selection = document.createElement( 'span' );
	            selection.style.fontSize = '13px';
	            selection.style.fontWeight = '300';
	            selection.style.float = 'right';

	            this.selection = selection;
	            this.setSelectionTitle( name );
	            this.appendChild( selection );
				
	            return this;

	        };

	        item.addIcon = function ( url = DataImage.ChevronRight, left = false, flip = false ) {
				
	            const element = document.createElement( 'span' );
	            element.style.float = left ? 'left' : 'right';
	            element.style.width = '17px';
	            element.style.height = '17px';
	            element.style[ 'margin' + ( left ? 'Right' : 'Left' ) ] = '12px';
	            element.style.backgroundSize = 'cover';

	            if ( flip ) {

	                element.style.transform = 'rotateZ(180deg)';

	            }

	            this.icon = element;
	            this.setIcon( url );
	            this.appendChild( element );

	            return this;

	        };

	        item.addSubMenu = function ( title, items ) {

	            this.subMenu = scope.createSubMenu( title, items );

	            return this;

	        };

	        item.addEventListener( 'mouseenter', function () {
				
	            this.style.backgroundColor = '#e0e0e0';

	        }, false );

	        item.addEventListener( 'mouseleave', function () {
				
	            this.style.backgroundColor = '#fafafa';

	        }, false );

	        return item;

	    },

	    /**
	     * Create menu item header
	     * @param  {string} title - Title to display
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLElement} - An anchor tag element
	     */
	    createMenuItemHeader: function ( title ) {

	        const header = this.createMenuItem( title );

	        header.style.borderBottom = '1px solid #333';
	        header.style.paddingBottom = '15px';

	        return header;

	    },

	    /**
	     * Create main menu
	     * @param  {array} menus - Menu array list
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLElement} - A span element
	     */
	    createMainMenu: function ( menus ) {
			
	        let scope = this, menu = this.createMenu();

	        menu._width = 200;
	        menu.changeSize( menu._width );

	        function onTap ( event ) {

	            event.preventDefault();
	            event.stopPropagation();

	            let mainMenu = scope.mainMenu, subMenu = this.subMenu;

	            function onNextTick () {

	                mainMenu.changeSize( subMenu.clientWidth );
	                subMenu.show();
	                subMenu.unslideAll();

	            }

	            mainMenu.hide();
	            mainMenu.slideAll();
	            mainMenu.parentElement.appendChild( subMenu );

	            scope.activeMainItem = this;
	            scope.activeSubMenu = subMenu;

	            window.requestAnimationFrame( onNextTick );

	        }
	        for ( let i = 0; i < menus.length; i++ ) {

	            const item = menu.addItem( menus[ i ].title );

	            item.style.paddingLeft = '20px';

	            item.addIcon()
	                .addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

	            if ( menus[ i ].subMenu && menus[ i ].subMenu.length > 0 ) {

	                const title = menus[ i ].subMenu[ 0 ].title;

	                item.addSelection( title )
	                    .addSubMenu( menus[ i ].title, menus[ i ].subMenu );

	            }

	        }

	        return menu;

	    },

	    /**
	     * Create sub menu
	     * @param {string} title - Sub menu title
	     * @param {array} items - Item array list
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLElement} - A span element
	     */
	    createSubMenu: function ( title, items ) {

	        let scope = this, menu, subMenu = this.createMenu();

	        subMenu.items = items;
	        subMenu.activeItem = null;

	        function onTap ( event ) {

	            event.preventDefault();
	            event.stopPropagation();

	            menu = scope.mainMenu;
	            menu.changeSize( menu._width );
	            menu.unslideAll();
	            menu.show();
	            subMenu.slideAll( true );
	            subMenu.hide();

	            if ( this.type !== 'header' ) {

	                subMenu.setActiveItem( this );
	                scope.activeMainItem.setSelectionTitle( this.textContent );

	                if ( this.handler ) { this.handler(); }

	            }

	        }

	        subMenu.addHeader( title ).addIcon( undefined, true, true ).addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

	        for ( let i = 0; i < items.length; i++ ) {

	            const item = subMenu.addItem( items[ i ].title );

	            item.style.fontWeight = 300;
	            item.handler = items[ i ].handler;
	            item.addIcon( ' ', true );
	            item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

	            if ( !subMenu.activeItem ) {

	                subMenu.setActiveItem( item );

	            }

	        }

	        subMenu.slideAll( true );

	        return subMenu;
			
	    },

	    /**
	     * Create general menu
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLElement} - A span element
	     */
	    createMenu: function () {

	        const scope = this;
	        const menu = document.createElement( 'span' );
	        const style = menu.style;

	        style.padding = '5px 0';
	        style.position = 'fixed';
	        style.bottom = '100%';
	        style.right = '14px';
	        style.backgroundColor = '#fafafa';
	        style.fontFamily = 'Helvetica Neue';
	        style.fontSize = '14px';
	        style.visibility = 'hidden';
	        style.opacity = 0;
	        style.boxShadow = '0 0 12pt rgba(0,0,0,0.25)';
	        style.borderRadius = '2px';
	        style.overflow = 'hidden';
	        style.willChange = 'width, height, opacity';
	        style.pointerEvents = 'auto';
	        style.transition = this.DEFAULT_TRANSITION;

	        menu.visible = false;

	        menu.changeSize = function ( width, height ) {

	            if ( width ) {

	                this.style.width = width + 'px';

	            }

	            if ( height ) {

	                this.style.height = height + 'px';

	            }

	        };

	        menu.show = function () {

	            this.style.opacity = 1;
	            this.style.visibility = 'visible';
	            this.visible = true;

	        };

	        menu.hide = function () {

	            this.style.opacity = 0;
	            this.style.visibility = 'hidden';
	            this.visible = false;

	        };

	        menu.toggle = function () {

	            if ( this.visible ) {

	                this.hide();

	            } else {

	                this.show();

	            }

	        };

	        menu.slideAll = function ( right ) {

	            for ( let i = 0; i < menu.children.length; i++ ){

	                if ( menu.children[ i ].slide ) {

	                    menu.children[ i ].slide( right );

	                }

	            }

	        };

	        menu.unslideAll = function () {

	            for ( let i = 0; i < menu.children.length; i++ ){

	                if ( menu.children[ i ].unslide ) {

	                    menu.children[ i ].unslide();

	                }

	            }

	        };

	        menu.addHeader = function ( title ) {

	            const header = scope.createMenuItemHeader( title );
	            header.type = 'header';

	            this.appendChild( header );

	            return header;

	        };

	        menu.addItem = function ( title ) {

	            const item = scope.createMenuItem( title );
	            item.type = 'item';

	            this.appendChild( item );

	            return item;

	        };

	        menu.setActiveItem = function ( item ) {

	            if ( this.activeItem ) {

	                this.activeItem.setIcon( ' ' );

	            }

	            item.setIcon( DataImage.Check );

	            this.activeItem = item;

	        };

	        menu.addEventListener( 'mousemove', this.PREVENT_EVENT_HANDLER, true );
	        menu.addEventListener( 'mouseup', this.PREVENT_EVENT_HANDLER, true );
	        menu.addEventListener( 'mousedown', this.PREVENT_EVENT_HANDLER, true );

	        return menu;

	    },

	    /**
	     * Create custom item element
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLSpanElement} - The dom element icon
	     */
	    createCustomItem: function ( options = {} ) {

	        const scope = this;
	        const item = options.element || document.createElement( 'span' );
	        const { onDispose } = options;

	        item.style.cursor = 'pointer';
	        item.style.float = 'right';
	        item.style.width = '44px';
	        item.style.height = '100%';
	        item.style.backgroundSize = '60%';
	        item.style.backgroundRepeat = 'no-repeat';
	        item.style.backgroundPosition = 'center';
	        item.style.webkitUserSelect = 
			item.style.MozUserSelect = 
			item.style.userSelect = 'none';
	        item.style.position = 'relative';
	        item.style.pointerEvents = 'auto';

	        // White glow on icon
	        item.addEventListener( scope.TOUCH_ENABLED ? 'touchstart' : 'mouseenter', function() {
	            item.style.filter = 
				item.style.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
	        }, { passive: true });
	        item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'mouseleave', function() {
	            item.style.filter = 
				item.style.webkitFilter = '';
	        }, { passive: true });

	        this.mergeStyleOptions( item, options.style );

	        if ( options.onTap ) {

	            item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', options.onTap, false );

	        }

	        item.dispose = function () {

	            item.removeEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', options.onTap, false );

	            if ( onDispose ) { options.onDispose(); }

	        };
			
	        return item;

	    },

	    /**
	     * Merge item css style
	     * @param  {HTMLElement} element - The element to be merged with style
	     * @param  {object} options - The style options
	     * @memberOf Widget
	     * @instance
	     * @return {HTMLElement} - The same element with merged styles
	     */
	    mergeStyleOptions: function ( element, options = {} ) {

	        for ( let property in options ){

	            if ( options.hasOwnProperty( property ) ) {

	                element.style[ property ] = options[ property ];

	            }

	        }

	        return element;

	    },

	    /**
	     * Dispose widgets by detaching dom elements from container
	     * @memberOf Widget
	     * @instance
	     */
	    dispose: function () {

	        if ( this.barElement ) {
	            this.container.removeChild( this.barElement );
	            this.barElement.dispose();
	            this.barElement = null;

	        }

	    }
		
	} );

	/**
	 * Equirectangular shader
	 * based on three.js equirect shader
	 * @author pchen66
	 */

	/**
	 * @description Equirectangular Shader
	 * @module EquirectShader
	 * @property {object} uniforms
	 * @property {THREE.Texture} uniforms.tEquirect diffuse map
	 * @property {number} uniforms.opacity image opacity
	 * @property {string} vertexShader vertex shader
	 * @property {string} fragmentShader fragment shader
	 */
	const EquirectShader = {

	    uniforms: {

	        'tEquirect': { value: new THREE.Texture() },
	        'repeat': { value: new THREE.Vector2( 1.0, 1.0 ) },
	        'offset': { value: new THREE.Vector2( 0.0, 0.0 ) },
	        'opacity': { value: 1.0 }

	    },

	    vertexShader: `
        varying vec3 vWorldDirection;
        #include <common>
        void main() {
            vWorldDirection = transformDirection( position, modelMatrix );
            #include <begin_vertex>
            #include <project_vertex>
        }
    `,

	    fragmentShader: `
        uniform sampler2D tEquirect;
        uniform vec2 repeat;
        uniform vec2 offset;
        uniform float opacity;
        varying vec3 vWorldDirection;
        #include <common>
        void main() {
            vec3 direction = normalize( vWorldDirection );
            vec2 sampleUV;
            sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
            sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;
            sampleUV *= repeat;
            sampleUV += offset;
            vec4 texColor = texture2D( tEquirect, sampleUV );
            gl_FragColor = mapTexelToLinear( texColor );
            gl_FragColor.a *= opacity;
            #include <tonemapping_fragment>
            #include <encodings_fragment>
        }
    `

	};

	/**
	 * @classdesc Base Panorama
	 * @constructor
	 * @param {THREE.Geometry} geometry - The geometry for this panorama
	 * @param {THREE.Material} material - The material for this panorama
	 */
	function Panorama () {

	    this.edgeLength = 10000;

	    THREE.Mesh.call( this, this.createGeometry( this.edgeLength ), this.createMaterial() );

	    this.type = 'panorama';

	    this.ImageQualityLow = 1;
	    this.ImageQualityFair = 2;
	    this.ImageQualityMedium = 3;
	    this.ImageQualityHigh = 4;
	    this.ImageQualitySuperHigh = 5;

	    this.animationDuration = 1000;

	    this.defaultInfospotSize = 350;

	    this.container = undefined;

	    this.loaded = false;

	    this.linkedSpots = [];

	    this.isInfospotVisible = false;
		
	    this.linkingImageURL = undefined;
	    this.linkingImageScale = undefined;

	    this.renderOrder = -1;

	    this.active = false;

	    this.infospotAnimation = new TWEEN.Tween( this ).to( {}, this.animationDuration / 2 );

	    this.addEventListener( 'load', this.fadeIn.bind( this ) );
	    this.addEventListener( 'panolens-container', this.setContainer.bind( this ) );
	    this.addEventListener( 'click', this.onClick.bind( this ) );

	    this.setupTransitions();

	}

	Panorama.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {

	    constructor: Panorama,

	    /**
	     * Create a skybox geometry
	     * @memberOf Panorama
	     * @instance
	     */
	    createGeometry: function ( edgeLength ) {

	        return new THREE.BoxBufferGeometry( edgeLength, edgeLength, edgeLength );

	    },

	    /**
	     * Create equirectangular shader material
	     * @param {THREE.Vector2} [repeat=new THREE.Vector2( 1, 1 )] - Texture Repeat
	     * @param {THREE.Vector2} [offset=new THREE.Vector2( 0, 0 )] - Texture Offset
	     * @memberOf Panorama
	     * @instance
	     */
	    createMaterial: function ( repeat = new THREE.Vector2( 1, 1 ), offset = new THREE.Vector2( 0, 0 ) ) {

	        const { fragmentShader, vertexShader } = EquirectShader;
	        const uniforms = THREE.UniformsUtils.clone( EquirectShader.uniforms );
	        
	        uniforms.repeat.value.copy( repeat );
	        uniforms.offset.value.copy( offset );
	        uniforms.opacity.value = 0.0;

	        const material = new THREE.ShaderMaterial( {

	            fragmentShader,
	            vertexShader,
	            uniforms,
	            side: THREE.BackSide,
	            transparent: true,
	            opacity: 0
	    
	        } );

	        return material;

	    },

	    /**
	     * Adding an object
	     * @memberOf Panorama
	     * @instance
	     * @param {THREE.Object3D} object - The object to be added
	     */
	    add: function ( object ) {

	        if ( arguments.length > 1 ) {

	            for ( let i = 0; i < arguments.length; i ++ ) {

	                this.add( arguments[ i ] );

	            }

	            return this;

	        }

	        // In case of infospots
	        if ( object instanceof Infospot ) {

	            const { container } = this;

	            if ( container ) { 
	                
	                object.dispatchEvent( { type: 'panolens-container', container } ); 
	            
	            }
	            
	            object.dispatchEvent( { type: 'panolens-infospot-focus', method: function ( vector, duration, easing ) {

	                /**
	                 * Infospot focus handler event
	                 * @type {object}
	                 * @event Panorama#panolens-viewer-handler
	                 * @property {string} method - Viewer function name
	                 * @property {*} data - The argument to be passed into the method
	                 */
	                this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'tweenControlCenter', data: [ vector, duration, easing ] } );


	            }.bind( this ) } );

	        }

	        THREE.Object3D.prototype.add.call( this, object );

	    },

	    getTexture: function(){

	        return this.material.uniforms.tEquirect.value;

	    },

	    load: function () {

	        this.onLoad();
			
	    },

	    /**
	     * Click event handler
	     * @param  {object} event - Click event
	     * @memberOf Panorama
	     * @instance
	     * @fires Infospot#dismiss
	     */
	    onClick: function ( event ) {

	        if ( event.intersects && event.intersects.length === 0 ) {

	            this.traverse( function ( object ) {

	                /**
	                 * Dimiss event
	                 * @type {object}
	                 * @event Infospot#dismiss
	                 */
	                object.dispatchEvent( { type: 'dismiss' } );

	            } );

	        }

	    },

	    /**
	     * Set container of this panorama 
	     * @param {HTMLElement|object} data - Data with container information
	     * @memberOf Panorama
	     * @instance
	     * @fires Infospot#panolens-container
	     */
	    setContainer: function ( data ) {

	        let container;

	        if ( data instanceof HTMLElement ) {

	            container = data;

	        } else if ( data && data.container ) {

	            container = data.container;

	        }

	        if ( container ) {

	            this.children.forEach( function ( child ) {

	                if ( child instanceof Infospot && child.dispatchEvent ) {

	                    /**
	                     * Set container event
	                     * @type {object}
	                     * @event Infospot#panolens-container
	                     * @property {HTMLElement} container - The container of this panorama
	                     */
	                    child.dispatchEvent( { type: 'panolens-container', container: container } );

	                }

	            } );

	            this.container = container;

	        }

	    },

	    /**
	     * This will be called when panorama is loaded
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#load
	     */
	    onLoad: function () {

	        this.loaded = true;

	        /**
	         * Load panorama event
	         * @type {object}
	         * @event Panorama#load
	         */
	        this.dispatchEvent( { type: 'load' } );

	    },

	    /**
	     * This will be called when panorama is in progress
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#progress
	     */
	    onProgress: function ( progress ) {

	        /**
	         * Loading panorama progress event
	         * @type {object}
	         * @event Panorama#progress
	         * @property {object} progress - The progress object containing loaded and total amount
	         */
	        this.dispatchEvent( { type: 'progress', progress: progress } );

	    },

	    /**
	     * This will be called when panorama loading has error
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#error
	     */
	    onError: function () {

	        /**
	         * Loading panorama error event
	         * @type {object}
	         * @event Panorama#error
	         */
	        this.dispatchEvent( { type: 'error' } );

	    },

	    /**
	     * Get zoom level based on window width
	     * @memberOf Panorama
	     * @instance
	     * @return {number} zoom level indicating image quality
	     */
	    getZoomLevel: function () {

	        let zoomLevel;

	        if ( window.innerWidth <= 800 ) {

	            zoomLevel = this.ImageQualityFair;

	        } else if ( window.innerWidth > 800 &&  window.innerWidth <= 1280 ) {

	            zoomLevel = this.ImageQualityMedium;

	        } else if ( window.innerWidth > 1280 && window.innerWidth <= 1920 ) {

	            zoomLevel = this.ImageQualityHigh;

	        } else if ( window.innerWidth > 1920 ) {

	            zoomLevel = this.ImageQualitySuperHigh;

	        } else {

	            zoomLevel = this.ImageQualityLow;

	        }

	        return zoomLevel;

	    },

	    /**
	     * Update texture of a panorama
	     * @memberOf Panorama
	     * @instance
	     * @param {THREE.Texture} texture - Texture to be updated
	     */
	    updateTexture: function ( texture ) {

	        this.material.uniforms.tEquirect.value = texture;

	    },

	    /**
	     * Toggle visibility of infospots in this panorama
	     * @param  {boolean} isVisible - Visibility of infospots
	     * @param  {number} delay - Delay in milliseconds to change visibility
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#infospot-animation-complete
	     */
	    toggleInfospotVisibility: function ( isVisible, delay ) {

	        delay = ( delay !== undefined ) ? delay : 0;

	        const visible = ( isVisible !== undefined ) ? isVisible : ( this.isInfospotVisible ? false : true );

	        this.traverse( function ( object ) {

	            if ( object instanceof Infospot ) {

	                if ( visible ) {

	                    object.show( delay );

	                } else {

	                    object.hide( delay );

	                }

	            }

	        } );

	        this.isInfospotVisible = visible;

	        // Animation complete event
	        this.infospotAnimation.onComplete( function () {

	            /**
	             * Complete toggling infospot visibility
	             * @event Panorama#infospot-animation-complete
	             * @type {object} 
	             */
	            this.dispatchEvent( { type: 'infospot-animation-complete', visible: visible } );

	        }.bind( this ) ).delay( delay ).start();

	    },

	    /**
	     * Set image of this panorama's linking infospot
	     * @memberOf Panorama
	     * @instance
	     * @param {string} url   - Url to the image asset
	     * @param {number} scale - Scale factor of the infospot
	     */
	    setLinkingImage: function ( url, scale ) {

	        this.linkingImageURL = url;
	        this.linkingImageScale = scale;

	    },

	    /**
	     * Link one-way panorama
	     * @param  {Panorama} pano  - The panorama to be linked to
	     * @param  {THREE.Vector3} position - The position of infospot which navigates to the pano
	     * @param  {number} [imageScale=300] - Image scale of linked infospot
	     * @param  {string} [imageSrc=DataImage.Arrow] - The image source of linked infospot
	     * @memberOf Panorama
	     * @instance
	     */
	    link: function ( pano, position, imageScale, imageSrc ) {

	        let scale, img;

	        this.visible = true;

	        if ( !position ) {

	            console.warn( 'Please specify infospot position for linking' );

	            return;

	        }

	        // Infospot scale
	        if ( imageScale !== undefined ) {

	            scale = imageScale;

	        } else if ( pano.linkingImageScale !== undefined ) {

	            scale = pano.linkingImageScale;

	        } else {

	            scale = 300;

	        }


	        // Infospot image
	        if ( imageSrc ) {

	            img = imageSrc;

	        } else if ( pano.linkingImageURL ) {

	            img = pano.linkingImageURL;

	        } else {

	            img = DataImage.Arrow;

	        }

	        // Creates a new infospot
	        const spot = new Infospot( scale, img );
	        spot.position.copy( position );
	        spot.toPanorama = pano;
	        spot.addEventListener( 'click', function () {

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @event Panorama#panolens-viewer-handler
	             * @property {string} method - Viewer function name
	             * @property {*} data - The argument to be passed into the method
	             */
	            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setPanorama', data: pano } );

	        }.bind( this ) );

	        this.linkedSpots.push( spot );

	        this.add( spot );

	        this.visible = false;

	    },

	    reset: function () {

	        this.children.length = 0;	

	    },

	    setupTransitions: function () {

	        this.fadeInAnimation = new TWEEN.Tween( this.material )
	            .easing( TWEEN.Easing.Quartic.Out )
	            .onStart( function () {

	                this.visible = true;
	                // this.material.visible = true;

	                /**
	                 * Enter panorama fade in start event
	                 * @event Panorama#enter-fade-start
	                 * @type {object} 
	                 */
	                this.dispatchEvent( { type: 'enter-fade-start' } );

	            }.bind( this ) );

	        this.fadeOutAnimation = new TWEEN.Tween( this.material )
	            .easing( TWEEN.Easing.Quartic.Out )
	            .onComplete( function () {

	                this.visible = false;
	                // this.material.visible = true;

	                /**
	                 * Leave panorama complete event
	                 * @event Panorama#leave-complete
	                 * @type {object} 
	                 */
	                this.dispatchEvent( { type: 'leave-complete' } );

	            }.bind( this ) );

	        this.enterTransition = new TWEEN.Tween( this )
	            .easing( TWEEN.Easing.Quartic.Out )
	            .onComplete( function () {

	                /**
	                 * Enter panorama and animation complete event
	                 * @event Panorama#enter-complete
	                 * @type {object} 
	                 */
	                this.dispatchEvent( { type: 'enter-complete' } );

	            }.bind ( this ) )
	            .start();

	        this.leaveTransition = new TWEEN.Tween( this )
	            .easing( TWEEN.Easing.Quartic.Out );

	    },

	    onFadeAnimationUpdate: function () {

	        const alpha = this.material.opacity;
	        const { uniforms } = this.material;

	        if ( uniforms && uniforms.opacity ) {
	            uniforms.opacity.value = alpha;
	        }

	    },

	    /**
	     * Start fading in animation
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#enter-fade-complete
	     */
	    fadeIn: function ( duration ) {

	        duration = duration >= 0 ? duration : this.animationDuration;

	        this.fadeOutAnimation.stop();
	        this.fadeInAnimation
	            .to( { opacity: 1 }, duration )
	            .onUpdate( this.onFadeAnimationUpdate.bind( this ) )
	            .onComplete( function () {

	                this.toggleInfospotVisibility( true, duration / 2 );

	                /**
	                 * Enter panorama fade complete event
	                 * @event Panorama#enter-fade-complete
	                 * @type {object} 
	                 */
	                this.dispatchEvent( { type: 'enter-fade-complete' } );			

	            }.bind( this ) )
	            .start();

	    },

	    /**
	     * Start fading out animation
	     * @memberOf Panorama
	     * @instance
	     */
	    fadeOut: function ( duration ) {

	        duration = duration >= 0 ? duration : this.animationDuration;

	        this.fadeInAnimation.stop();
	        this.fadeOutAnimation
	            .to( { opacity: 0 }, duration )
	            .onUpdate( this.onFadeAnimationUpdate.bind( this ) )
	            .start();

	    },

	    /**
	     * This will be called when entering a panorama 
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#enter
	     * @fires Panorama#enter-start
	     */
	    onEnter: function () {

	        const duration = this.animationDuration;
	        
	        /**
	         * Enter panorama event
	         * @event Panorama#enter
	         * @type {object} 
	         */
	        this.dispatchEvent( { type: 'enter' } );

	        this.leaveTransition.stop();
	        this.enterTransition
	            .to( {}, duration )
	            .onStart( function () {

	                /**
	                 * Enter panorama and animation starting event
	                 * @event Panorama#enter-start
	                 * @type {object} 
	                 */
	                this.dispatchEvent( { type: 'enter-start' } );
					
	                if ( this.loaded ) {

	                    this.fadeIn( duration );

	                } else {

	                    this.load();

	                }
					
	            }.bind( this ) )
	            .start();

	        this.children.forEach( child => {

	            child.dispatchEvent( { type: 'panorama-enter' } );

	        } );

	        this.active = true;

	    },

	    /**
	     * This will be called when leaving a panorama
	     * @memberOf Panorama
	     * @instance
	     * @fires Panorama#leave
	     */
	    onLeave: function () {

	        const duration = this.animationDuration;

	        this.enterTransition.stop();
	        this.leaveTransition
	            .to( {}, duration )
	            .onStart( function () {

	                /**
	                 * Leave panorama and animation starting event
	                 * @event Panorama#leave-start
	                 * @type {object} 
	                 */
	                this.dispatchEvent( { type: 'leave-start' } );

	                this.fadeOut( duration );
	                this.toggleInfospotVisibility( false );

	            }.bind( this ) )
	            .start();

	        /**
	         * Leave panorama event
	         * @event Panorama#leave
	         * @type {object} 
	         */
	        this.dispatchEvent( { type: 'leave' } );

	        this.children.forEach( child => {

	            child.dispatchEvent( { type: 'panorama-leave' } );

	        } );

	        this.active = false;

	    },

	    /**
	     * Dispose panorama
	     * @memberOf Panorama
	     * @instance
	     */
	    dispose: function () {

	        const { material } = this;

	        if ( material && material.uniforms && material.uniforms.tEquirect ) material.uniforms.tEquirect.value.dispose();

	        this.infospotAnimation.stop();
	        this.fadeInAnimation.stop();
	        this.fadeOutAnimation.stop();
	        this.enterTransition.stop();
	        this.leaveTransition.stop();

	        /**
	         * On panorama dispose handler
	         * @type {object}
	         * @event Panorama#panolens-viewer-handler
	         * @property {string} method - Viewer function name
	         * @property {*} data - The argument to be passed into the method
	         */
	        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onPanoramaDispose', data: this } );

	        // recursive disposal on 3d objects
	        function recursiveDispose ( object ) {

	            const { geometry, material } = object;

	            for ( let i = object.children.length - 1; i >= 0; i-- ) {

	                recursiveDispose( object.children[i] );
	                object.remove( object.children[i] );

	            }

	            if ( object instanceof Infospot ) {

	                object.dispose();

	            }
				
	            if ( geometry ) { geometry.dispose(); object.geometry = null; }
	            if ( material ) { material.dispose(); object.material = null; }

	        }

	        recursiveDispose( this );

	        if ( this.parent ) {

	            this.parent.remove( this );

	        }

	    }

	} );

	/**
	 * @classdesc Equirectangular based image panorama
	 * @constructor
	 * @param {string} image - Image url or HTMLImageElement
	 */
	function ImagePanorama ( image ) {

	    Panorama.call( this );

	    this.src = image;
	    this.type = 'image_panorama';

	}

	ImagePanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: ImagePanorama,

	    /**
	     * Load image asset
	     * @param  {*} src - Url or image element
	     * @memberOf ImagePanorama
	     * @instance
	     */
	    load: function ( src ) {

	        src = src || this.src;

	        if ( !src ) { 

	            console.warn( 'Image source undefined' );

	            return; 

	        } else if ( typeof src === 'string' ) {

	            TextureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

	        } else if ( src instanceof HTMLImageElement ) {

	            this.onLoad( new THREE.Texture( src ) );

	        }

	    },

	    /**
	     * This will be called when image is loaded
	     * @param  {THREE.Texture} texture - Texture to be updated
	     * @memberOf ImagePanorama
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        texture.minFilter = texture.magFilter = THREE.LinearFilter;
	        texture.needsUpdate = true;
			
	        this.updateTexture( texture );

	        window.requestAnimationFrame( Panorama.prototype.onLoad.bind( this ) );

	    },

	    /**
	     * Reset
	     * @memberOf ImagePanorama
	     * @instance
	     */
	    reset: function () {

	        Panorama.prototype.reset.call( this );

	    },

	    /**
	     * Dispose
	     * @memberOf ImagePanorama
	     * @instance
	     */
	    dispose: function () {

	        // Release cached image
	        THREE.Cache.remove( this.src );

	        Panorama.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Empty panorama
	 * @constructor
	 */
	function EmptyPanorama () {

	    Panorama.call( this );

	    this.type = 'empty_panorama';

	}

	EmptyPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: EmptyPanorama,

	    /**
	     * Create a skybox geometry
	     * @memberOf EmptyPanorama
	     * @instance
	     */
	    createGeometry: function() {

	        const geometry = new THREE.BufferGeometry();
	        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 1 ) );
	        return geometry;

	    },

	    /**
	     * Create material
	     * @memberOf EmptyPanorama
	     * @instance
	     */
	    createMaterial: function() {

	        new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0, transparent: true } );

	    },

	    getTexture: function () {

	        return null;

	    }

	} );

	/**
	 * @classdesc Cubemap-based panorama
	 * @constructor
	 * @param {array} images - Array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
	 */
	function CubePanorama ( images = [] ){

	    Panorama.call( this );

	    this.geometry.deleteAttribute( 'normal' );
	    this.geometry.deleteAttribute( 'uv' );

	    this.images = images;
	    this.type = 'cube_panorama';

	}

	CubePanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: CubePanorama,

	    /**
	     * Create material
	     * @memberOf CubePanorama
	     * @instance
	     */
	    createMaterial: function() {

	        const { fragmentShader, vertexShader, uniforms: _uniforms } = THREE.ShaderLib[ 'cube' ];
	        const uniforms = THREE.UniformsUtils.clone( _uniforms );
	        
	        uniforms.opacity.value = 0;
	        uniforms.envMap.value = new THREE.CubeTexture();

	        const material = new THREE.ShaderMaterial( {

	            fragmentShader,
	            vertexShader,
	            uniforms,
	            side: THREE.BackSide,
	            opacity: 0,
	            transparent: true

	        } );

	        Object.defineProperty( material, 'envMap', {

	            get: function () {

	                return this.uniforms.envMap.value;
	        
	            }
	        
	        } );

	        return material;

	    },

	    /**
	     * Load 6 images and bind listeners
	     * @memberOf CubePanorama
	     * @instance
	     */
	    load: function () {

	        CubeTextureLoader.load( 	

	            this.images, 

	            this.onLoad.bind( this ), 
	            this.onProgress.bind( this ), 
	            this.onError.bind( this ) 

	        );

	    },

	    /**
	     * This will be called when 6 textures are ready
	     * @param  {THREE.CubeTexture} texture - Cube texture
	     * @memberOf CubePanorama
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        this.material.uniforms.envMap.value = texture;

	        Panorama.prototype.onLoad.call( this );

	    },

	    getTexture: function () {

	        return this.material.uniforms.envMap.value;

	    },

	    /**
	     * Dispose
	     * @memberOf CubePanorama
	     * @instance
	     */
	    dispose: function () {	

	        const { value } = this.material.uniforms.envMap;

	        this.images.forEach( ( image ) => { THREE.Cache.remove( image ); } );

	        if ( value instanceof THREE.CubeTexture ) {

	            value.dispose();

	        }

	        Panorama.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Basic panorama with 6 pre-defined grid images
	 * @constructor
	 */
	function BasicPanorama () {

	    const images = [];

	    for ( let i = 0; i < 6; i++ ) {

	        images.push( DataImage.WhiteTile );

	    }

	    CubePanorama.call( this, images );

	    this.type = 'basic_panorama';

	}

	BasicPanorama.prototype = Object.assign( Object.create( CubePanorama.prototype ), {

	    constructor: BasicPanorama

	} );

	/**
	 * @classdesc Video Panorama
	 * @constructor
	 * @param {string} src - Equirectangular video url
	 * @param {object} [options] - Option for video settings
	 * @param {HTMLElement} [options.videoElement] - HTML5 video element contains the video
	 * @param {boolean} [options.loop=true] - Specify if the video should loop in the end
	 * @param {boolean} [options.muted=true] - Mute the video or not. Need to be true in order to autoplay on some browsers
	 * @param {boolean} [options.autoplay=false] - Specify if the video should auto play
	 * @param {boolean} [options.playsinline=true] - Specify if video should play inline for iOS. If you want it to auto play inline, set both autoplay and muted options to true
	 * @param {string} [options.crossOrigin="anonymous"] - Sets the cross-origin attribute for the video, which allows for cross-origin videos in some browsers (Firefox, Chrome). Set to either "anonymous" or "use-credentials".
	 * @param {number} [radius=5000] - The minimum radius for this panoram
	 */
	function VideoPanorama ( src, options = {} ) {

	    Panorama.call( this );

	    this.src = src;
	    this.options = Object.assign( {

	        videoElement: document.createElement( 'video' ),
	        loop: true,
	        muted: true,
	        autoplay: false,
	        playsinline: true,
	        crossOrigin: 'anonymous'

	    }, options );

	    this.videoElement = this.options.videoElement;
	    this.videoProgress = 0;

	    this.type = 'video_panorama';

	    this.addEventListener( 'leave', this.pauseVideo.bind( this ) );
	    this.addEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
	    this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
	    this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

	}
	VideoPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: VideoPanorama,

	    isMobile: function () {

	        let check = false;
	        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})( window.navigator.userAgent || window.navigator.vendor || window.opera );
	        return check;

	    },

	    /**
	     * Load video panorama
	     * @memberOf VideoPanorama
	     * @instance
	     * @fires  Panorama#panolens-viewer-handler
	     */
	    load: function () {

	        const { muted, loop, autoplay, playsinline, crossOrigin } = this.options;
	        const video = this.videoElement;
	        const onProgress = this.onProgress.bind( this );
	        const onLoad = this.onLoad.bind( this );

	        video.loop = loop;
	        video.autoplay = autoplay;
	        video.playsinline = playsinline;
	        video.crossOrigin = crossOrigin;
	        video.muted = muted;
			
	        if ( playsinline ) {

	            video.setAttribute( 'playsinline', '' );
	            video.setAttribute( 'webkit-playsinline', '' );

	        } 

	        const onloadeddata = function() {

	            const videoTexture = this.setVideoTexture( video );

	            if ( autoplay ) {

	                /**
	                 * Viewer handler event
	                 * @type {object}
	                 * @property {string} method - 'updateVideoPlayButton'
	                 * @property {boolean} data - Pause video or not
	                 */
	                this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

	            }

	            // For mobile silent autoplay
	            if ( this.isMobile() ) {

	                video.pause();

	                if ( autoplay && muted ) {

	                    /**
	                     * Viewer handler event
	                     * @type {object}
	                     * @property {string} method - 'updateVideoPlayButton'
	                     * @property {boolean} data - Pause video or not
	                     */
	                    this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

	                } else {

	                    /**
	                     * Viewer handler event
	                     * @type {object}
	                     * @property {string} method - 'updateVideoPlayButton'
	                     * @property {boolean} data - Pause video or not
	                     */
	                    this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

	                }
					
	            }

	            const loaded = () => {

	                onProgress( { loaded: 1, total: 1 } );
	                onLoad( videoTexture );

	            };

	            window.requestAnimationFrame( loaded );
				
	        };

	        /**
	         * Ready state of the audio/video element
	         * 0 = HAVE_NOTHING - no information whether or not the audio/video is ready
	         * 1 = HAVE_METADATA - metadata for the audio/video is ready
	         * 2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
	         * 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
	         * 4 = HAVE_ENOUGH_DATA - enough data available to start playing
	         */
	        if ( video.readyState > 2 ) {

	            onloadeddata.call( this );

	        } else {

	            if ( video.querySelectorAll( 'source' ).length === 0 ) {

	                const source = document.createElement( 'source' );
	                source.src = this.src;
	                video.appendChild( source );

	            }

	            video.load();
	        }

	        video.addEventListener( 'loadeddata', onloadeddata.bind( this ) );
			
	        video.addEventListener( 'timeupdate', function () {

	            this.videoProgress = video.duration >= 0 ? video.currentTime / video.duration : 0;

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @property {string} method - 'onVideoUpdate'
	             * @property {number} data - The percentage of video progress. Range from 0.0 to 1.0
	             */
	            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: this.videoProgress } );

	        }.bind( this ) );

	        video.addEventListener( 'ended', function () {
				
	            if ( !loop ) {

	                this.resetVideo();
	                this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

	            }

	        }.bind( this ), false ); 

	    },

	    onLoad: function () {

	        Panorama.prototype.onLoad.call( this );

	    },

	    /**
	     * Set video texture
	     * @memberOf VideoPanorama
	     * @instance
	     * @param {HTMLVideoElement} video  - The html5 video element
	     * @fires Panorama#panolens-viewer-handler
	     */
	    setVideoTexture: function ( video ) {

	        if ( !video ) return;

	        const videoTexture = new THREE.VideoTexture( video );
	        videoTexture.minFilter = THREE.LinearFilter;
	        videoTexture.magFilter = THREE.LinearFilter;
	        videoTexture.format = THREE.RGBFormat;

	        this.updateTexture( videoTexture );

	        return videoTexture;
		
	    },

	    /**
	     * Reset
	     * @memberOf VideoPanorama
	     * @instance
	     */
	    reset: function () {

	        this.videoElement = undefined;	

	        Panorama.prototype.reset.call( this );

	    },

	    /**
	     * Check if video is paused
	     * @memberOf VideoPanorama
	     * @instance
	     * @return {boolean} - is video paused or not
	     */
	    isVideoPaused: function () {

	        return this.videoElement.paused;

	    },

	    /**
	     * Toggle video to play or pause
	     * @memberOf VideoPanorama
	     * @instance
	     */
	    toggleVideo: function () {

	        const video = this.videoElement;

	        if ( !video ) { return; }

	        video[ video.paused ? 'play' : 'pause' ]();

	    },

	    /**
	     * Set video currentTime
	     * @memberOf VideoPanorama
	     * @instance
	     * @param {object} event - Event contains percentage. Range from 0.0 to 1.0
	     */
	    setVideoCurrentTime: function ( { percentage } ) {

	        const video = this.videoElement;

	        if ( video && !Number.isNaN( percentage ) && percentage !== 1 ) {

	            video.currentTime = video.duration * percentage;

	            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: percentage } );

	        }

	    },

	    /**
	     * Play video
	     * @memberOf VideoPanorama
	     * @instance
	     * @fires VideoPanorama#play
	     * @fires VideoPanorama#play-error
	     */
	    playVideo: function () {

	        const video = this.videoElement;
	        const playVideo = this.playVideo.bind( this );
	        const dispatchEvent = this.dispatchEvent.bind( this );
	        const onSuccess = () => {

	            /**
	             * Play event
	             * @type {object}
	             * @event VideoPanorama#play
	             *
	             */
	            dispatchEvent( { type: 'play' } );

	        };
	        const onError = ( error ) => {

	            // Error playing video. Retry next frame. Possibly Waiting for user interaction
	            window.requestAnimationFrame( playVideo );

	            /**
	             * Play event
	             * @type {object}
	             * @event VideoPanorama#play-error
	             *
	             */
	            dispatchEvent( { type: 'play-error', error } );

	        };

	        if ( video && video.paused ) {

	            video.play().then( onSuccess ).catch( onError );

	        }

	    },

	    /**
	     * Pause video
	     * @memberOf VideoPanorama
	     * @instance
	     * @fires VideoPanorama#pause
	     */
	    pauseVideo: function () {

	        const video = this.videoElement;

	        if ( video && !video.paused ) {

	            video.pause();

	        }

	        /**
	         * Pause event
	         * @type {object}
	         * @event VideoPanorama#pause
	         *
	         */
	        this.dispatchEvent( { type: 'pause' } );

	    },

	    /**
	     * Resume video
	     * @memberOf VideoPanorama
	     * @instance
	     */
	    resumeVideoProgress: function () {

	        const video = this.videoElement;

	        if ( video.readyState >= 4 && video.autoplay && !this.isMobile() ) {

	            this.playVideo();

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @property {string} method - 'updateVideoPlayButton'
	             * @property {boolean} data - Pause video or not
	             */
	            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

	        } else {

	            this.pauseVideo();

	            /**
	             * Viewer handler event
	             * @type {object}
	             * @property {string} method - 'updateVideoPlayButton'
	             * @property {boolean} data - Pause video or not
	             */
	            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

	        }

	        this.setVideoCurrentTime( { percentage: this.videoProgress } );

	    },

	    /**
	     * Reset video at stating point
	     * @memberOf VideoPanorama
	     * @instance
	     */
	    resetVideo: function () {

	        const video = this.videoElement;

	        if ( video ) {

	            this.setVideoCurrentTime( { percentage: 0 } );

	        }

	    },

	    /**
	     * Check if video is muted
	     * @memberOf VideoPanorama
	     * @instance
	     * @return {boolean} - is video muted or not
	     */
	    isVideoMuted: function () {

	        return this.videoElement.muted;

	    },

	    /**
	     * Mute video
	     * @memberOf VideoPanorama
	     * @instance
	     */
	    muteVideo: function () {

	        const video = this.videoElement;

	        if ( video && !video.muted ) {

	            video.muted = true;

	        }

	        this.dispatchEvent( { type: 'volumechange' } );

	    },

	    /**
	     * Unmute video
	     * @memberOf VideoPanorama
	     * @instance
	     */
	    unmuteVideo: function () {

	        const video = this.videoElement;

	        if ( video && this.isVideoMuted() ) {

	            video.muted = false;

	        }

	        this.dispatchEvent( { type: 'volumechange' } );

	    },

	    /**
	     * Returns the video element
	     * @memberOf VideoPanorama
	     * @instance
	     * @returns {HTMLElement}
	     */
	    getVideoElement: function () {

	        return this.videoElement;

	    },

	    /**
	     * Dispose video panorama
	     * @memberOf VideoPanorama
	     * @instance
	     */
	    dispose: function () {

	        this.pauseVideo();
			
	        this.removeEventListener( 'leave', this.pauseVideo.bind( this ) );
	        this.removeEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
	        this.removeEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
	        this.removeEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

	        Panorama.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Google Street View Loader
	 * @constructor
	 * @param {object} parameters 
	 */
	function GoogleStreetviewLoader ( parameters = {} ) {

	    this._parameters = parameters;
	    this._zoom = null;
	    this._panoId = null;
	    this._panoClient = new google.maps.StreetViewService();
	    this._count = 0;
	    this._total = 0;
	    this._canvas = [];
	    this._ctx = [];
	    this._wc = 0;
	    this._hc = 0;
	    this.result = null;
	    this.rotation = 0;
	    this.copyright = '';
	    this.onSizeChange = null;
	    this.onPanoramaLoad = null;

	    this.levelsW = [ 1, 2, 4, 7, 13, 26 ];
	    this.levelsH = [ 1, 1, 2, 4, 7, 13 ];

	    this.widths = [ 416, 832, 1664, 3328, 6656, 13312 ];
	    this.heights = [ 416, 416, 832, 1664, 3328, 6656 ];

	    this.maxW = 6656;
	    this.maxH = 6656;

	    let gl;

	    try {

	        const canvas = document.createElement( 'canvas' );

	        gl = canvas.getContext( 'experimental-webgl' );

	        if( !gl ) {

	            gl = canvas.getContext( 'webgl' );

	        }

	    }
	    catch ( error ) {

	    }

	    this.maxW = Math.max( gl.getParameter( gl.MAX_TEXTURE_SIZE ), this.maxW );
	    this.maxH = Math.max( gl.getParameter( gl.MAX_TEXTURE_SIZE ), this.maxH );

	}

	Object.assign( GoogleStreetviewLoader.prototype, {

	    constructor: GoogleStreetviewLoader,

	    /**
	     * Set progress
	     * @param {number} loaded 
	     * @param {number} total 
	     * @memberOf GoogleStreetviewLoader
	     * @instance
	     */
	    setProgress: function ( loaded, total ) {

	        if ( this.onProgress ) {

	            this.onProgress( { loaded: loaded, total: total } );

	        }
			
	    },

	    /**
	     * Adapt texture to zoom
	     * @memberOf GoogleStreetviewLoader
	     * @instance
	     */
	    adaptTextureToZoom: function () {

	        const w = this.widths [ this._zoom ];
	        const h = this.heights[ this._zoom ];

	        const maxW = this.maxW;
	        const maxH = this.maxH;

	        this._wc = Math.ceil( w / maxW );
	        this._hc = Math.ceil( h / maxH );

	        for( let y = 0; y < this._hc; y++ ) {
	            for( let x = 0; x < this._wc; x++ ) {
	                const c = document.createElement( 'canvas' );
	                if( x < ( this._wc - 1 ) ) c.width = maxW; else c.width = w - ( maxW * x );
	                if( y < ( this._hc - 1 ) ) c.height = maxH; else c.height = h - ( maxH * y );
	                this._canvas.push( c );
	                this._ctx.push( c.getContext( '2d' ) );
	            }
	        }

	    },

	    /**
	     * Compose from tile
	     * @param {number} x 
	     * @param {number} y 
	     * @param {*} texture 
	     * @memberOf GoogleStreetviewLoader
	     * @instance
	     */
	    composeFromTile: function ( x, y, texture ) {

	        const maxW = this.maxW;
	        const maxH = this.maxH;

	        x *= 512;
	        y *= 512;

	        const px = Math.floor( x / maxW );
	        const py = Math.floor( y / maxH );

	        x -= px * maxW;
	        y -= py * maxH;

	        this._ctx[ py * this._wc + px ].drawImage( texture, 0, 0, texture.width, texture.height, x, y, 512, 512 );

	        this.progress();
			
	    },

	    /**
	     * Progress
	     * @memberOf GoogleStreetviewLoader
	     * @instance
	     */
	    progress: function() {

	        this._count++;
			
	        this.setProgress( this._count, this._total );
			
	        if ( this._count === this._total) {

	            this.canvas = this._canvas;
	            this.panoId = this._panoId;
	            this.zoom = this._zoom;

	            if ( this.onPanoramaLoad ) {

	                this.onPanoramaLoad( this._canvas[ 0 ] );

	            }

	        }
	    },

	    /**
	     * Compose panorama
	     * @memberOf GoogleStreetviewLoader
	     * @instance
	     */
	    composePanorama: function () {

	        this.setProgress( 0, 1 );
			
	        const w = this.levelsW[ this._zoom ];
	        const h = this.levelsH[ this._zoom ];
	        const self = this;
				
	        this._count = 0;
	        this._total = w * h;

	        const { useWebGL } = this._parameters;

	        for( let y = 0; y < h; y++ ) {
	            for( let x = 0; x < w; x++ ) {
	                const url = 'https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=tile&zoom=' + this._zoom + '&x=' + x + '&y=' + y + '&panoid=' + this._panoId + '&nbt&fover=2';
	                ( function( x, y ) { 
	                    if( useWebGL ) {
	                        const texture = TextureLoader.load( url, null, function() {
	                            self.composeFromTile( x, y, texture );
	                        } );
	                    } else {
	                        const img = new Image();
	                        img.addEventListener( 'load', function() {
	                            self.composeFromTile( x, y, this );			
	                        } );
	                        img.crossOrigin = '';
	                        img.src = url;
	                    }
	                } )( x, y );
	            }
	        }
			
	    },

	    /**
	     * Load
	     * @param {string} panoid 
	     * @memberOf GoogleStreetviewLoader
	     * @instance
	     */
	    load: function ( panoid ) {

	        this.loadPano( panoid );

	    },

	    /**
	     * Load panorama
	     * @param {string} id
	     * @memberOf GoogleStreetviewLoader
	     * @instance
	     */
	    loadPano: function( id ) {

	        const self = this;
	        this._panoClient.getPanoramaById( id, function (result, status) {
	            if (status === google.maps.StreetViewStatus.OK) {
	                self.result = result;
	                self.copyright = result.copyright;
	                self._panoId = result.location.pano;
	                self.composePanorama();
	            }
	        });
			
	    },

	    /**
	     * Set zoom level
	     * @param {number} z 
	     * @memberOf GoogleStreetviewLoader
	     * @instance
	     */
	    setZoom: function( z ) {

	        this._zoom = z;
	        this.adaptTextureToZoom();
	    }
		
	} );

	/**
	 * @classdesc Google streetview panorama
	 * @description [How to get Panorama ID]{@link http://stackoverflow.com/questions/29916149/google-maps-streetview-how-to-get-panorama-id}
	 * @constructor
	 * @param {string} panoId - Panorama id from Google Streetview 
	 * @param {string} [apiKey] - Google Street View API Key
	 */
	function GoogleStreetviewPanorama ( panoId, apiKey ) {

	    ImagePanorama.call( this );

	    this.panoId = panoId;
	    this.gsvLoader = null;
	    this.loadRequested = false;
	    this.setupGoogleMapAPI( apiKey );

	    this.type = 'google_streetview_panorama';

	}

	GoogleStreetviewPanorama.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

	    constructor: GoogleStreetviewPanorama,

	    /**
	     * Load Google Street View by panorama id
	     * @param {string} panoId - Gogogle Street View panorama id
	     * @memberOf GoogleStreetviewPanorama
	     * @instance
	     */
	    load: function ( panoId ) {

	        this.loadRequested = true;

	        panoId = ( panoId || this.panoId ) || {};

	        if ( panoId && this.gsvLoader ) {

	            this.loadGSVLoader( panoId );

	        }

	    },

	    /**
	     * Setup Google Map API
	     * @param {string}  apiKey
	     * @memberOf GoogleStreetviewPanorama
	     * @instance
	     */
	    setupGoogleMapAPI: function ( apiKey ) {

	        const script = document.createElement( 'script' );
	        script.src = 'https://maps.googleapis.com/maps/api/js?';
	        script.src += apiKey ? 'key=' + apiKey : '';
	        script.onreadystatechange = this.setGSVLoader.bind( this );
	        script.onload = this.setGSVLoader.bind( this );

	        document.querySelector( 'head' ).appendChild( script );

	    },

	    /**
	     * Set GSV Loader
	     * @memberOf GoogleStreetviewPanorama
	     * @instance
	     */
	    setGSVLoader: function () {

	        this.gsvLoader = new GoogleStreetviewLoader();

	        if ( this.loadRequested ) {

	            this.load();

	        }

	    },

	    /**
	     * Get GSV Loader
	     * @memberOf GoogleStreetviewPanorama
	     * @instance
	     * @return {GoogleStreetviewLoader} GSV Loader instance
	     */
	    getGSVLoader: function () {

	        return this.gsvLoader;

	    },

	    /**
	     * Load GSV Loader
	     * @param  {string} panoId - Gogogle Street View panorama id
	     * @memberOf GoogleStreetviewPanorama
	     * @instance
	     */
	    loadGSVLoader: function ( panoId ) {

	        this.loadRequested = false;

	        this.gsvLoader.onProgress = this.onProgress.bind( this );

	        this.gsvLoader.onPanoramaLoad = this.onLoad.bind( this );

	        this.gsvLoader.setZoom( this.getZoomLevel() );

	        this.gsvLoader.load( panoId );

	        this.gsvLoader.loaded = true;
	    },

	    /**
	     * This will be called when panorama is loaded
	     * @param  {HTMLCanvasElement} canvas - Canvas where the tiles have been drawn
	     * @memberOf GoogleStreetviewPanorama
	     * @instance
	     */
	    onLoad: function ( canvas ) {

	        ImagePanorama.prototype.onLoad.call( this, new THREE.Texture( canvas ) );

	    },

	    /**
	     * Reset
	     * @memberOf GoogleStreetviewPanorama
	     * @instance
	     */
	    reset: function () {

	        this.gsvLoader = undefined;

	        ImagePanorama.prototype.reset.call( this );

	    }

	} );

	/**
	 * Stereographic projection shader
	 * based on http://notlion.github.io/streetview-stereographic
	 * @author pchen66
	 */

	/**
	 * @description Stereograhpic Shader
	 * @module StereographicShader
	 * @property {object} uniforms
	 * @property {THREE.Texture} uniforms.tDiffuse diffuse map
	 * @property {number} uniforms.resolution image resolution
	 * @property {THREE.Matrix4} uniforms.transform transformation matrix
	 * @property {number} uniforms.zoom image zoom factor
	 * @property {number} uniforms.opacity image opacity
	 * @property {string} vertexShader vertex shader
	 * @property {string} fragmentShader fragment shader
	 */
	const StereographicShader = {

	    uniforms: {

	        'tDiffuse': { value: new THREE.Texture() },
	        'resolution': { value: 1.0 },
	        'transform': { value: new THREE.Matrix4() },
	        'zoom': { value: 1.0 },
	        'opacity': { value: 1.0 }

	    },

	    vertexShader: `

        varying vec2 vUv;

        void main() {

            vUv = uv;
            gl_Position = vec4( position, 1.0 );

        }

    `,

	    fragmentShader: `

        uniform sampler2D tDiffuse;
        uniform float resolution;
        uniform mat4 transform;
        uniform float zoom;
        uniform float opacity;

        varying vec2 vUv;

        const float PI = 3.141592653589793;

        void main(){

            vec2 position = -1.0 +  2.0 * vUv;

            position *= vec2( zoom * resolution, zoom * 0.5 );

            float x2y2 = position.x * position.x + position.y * position.y;
            vec3 sphere_pnt = vec3( 2. * position, x2y2 - 1. ) / ( x2y2 + 1. );

            sphere_pnt = vec3( transform * vec4( sphere_pnt, 1.0 ) );

            vec2 sampleUV = vec2(
                (atan(sphere_pnt.y, sphere_pnt.x) / PI + 1.0) * 0.5,
                (asin(sphere_pnt.z) / PI + 0.5)
            );

            gl_FragColor = texture2D( tDiffuse, sampleUV );
            gl_FragColor.a *= opacity;

        }
    `
	};

	/**
	 * @classdesc Little Planet
	 * @constructor
	 * @param {string} type 		- Type of little planet basic class
	 * @param {string} source 		- URL for the image source
	 */
	function LittlePlanet ( type = 'image', source ) {

	    if ( type === 'image' ) {

	        ImagePanorama.call( this, source );

	    }

	    if ( type === 'video' ) {

	        VideoPanorama.call( this, source );

	    }

	    this.EPS = 0.000001;
	    this.frameId = null;

	    this.dragging = false;
	    this.userMouse = new THREE.Vector2();

	    this.quatA = new THREE.Quaternion();
	    this.quatB = new THREE.Quaternion();
	    this.quatCur = new THREE.Quaternion();
	    this.quatSlerp = new THREE.Quaternion();

	    this.vectorX = new THREE.Vector3( 1, 0, 0 );
	    this.vectorY = new THREE.Vector3( 0, 1, 0 );

	    this.type = 'little_planet';

	    this.addEventListener( 'window-resize', this.onWindowResize );

	}

	LittlePlanet.prototype = Object.assign( Object.create( VideoPanorama.prototype ), {

	    constructor: LittlePlanet,

	    add: function ( object ) {

	        if ( arguments.length > 1 ) {
				
	            for ( let i = 0; i < arguments.length; i ++ ) {

	                this.add( arguments[ i ] );

	            }

	            return this;

	        }

	        if ( object instanceof Infospot ) {

	            object.material.depthTest = false;
				
	        }

	        VideoPanorama.prototype.add.call( this, object );

	    },

	    /**
	     * Create a skybox geometry
	     * @memberOf LittlePlanet
	     * @instance
	     */
	    createGeometry: function ( edgeLength ) {

	        const ratio = 0.5;
	        return new THREE.PlaneBufferGeometry( edgeLength, ratio * edgeLength );

	    },

	    /**
	     * Create material
	     * @memberOf LittlePlanet
	     * @instance
	     */
	    createMaterial: function ( size = this.edgeLength ) {

	        const { fragmentShader, vertexShader, uniforms: _uniforms } = StereographicShader;
	        const uniforms = THREE.UniformsUtils.clone( _uniforms );

	        uniforms.zoom.value = size;
	        uniforms.opacity.value = 0.0;

	        return new THREE.ShaderMaterial( {

	            vertexShader,
	            fragmentShader,
	            uniforms,
	            transparent: true,
	            opacity: 0

	        } );
			
	    },

	    registerMouseEvents: function () {

	        this.container.addEventListener( 'mousedown', this.onMouseDown.bind( this ), { passive: true } );
	        this.container.addEventListener( 'mousemove', this.onMouseMove.bind( this ), { passive: true } );
	        this.container.addEventListener( 'mouseup', this.onMouseUp.bind( this ), { passive: true } );
	        this.container.addEventListener( 'touchstart', this.onMouseDown.bind( this ), { passive: true } );
	        this.container.addEventListener( 'touchmove', this.onMouseMove.bind( this ), { passive: true } );
	        this.container.addEventListener( 'touchend', this.onMouseUp.bind( this ), { passive: true } );
	        this.container.addEventListener( 'mousewheel', this.onMouseWheel.bind( this ), { passive: false } );
	        this.container.addEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), { passive: false } );
	        this.container.addEventListener( 'contextmenu', this.onContextMenu.bind( this ), { passive: true } );
			
	    },

	    unregisterMouseEvents: function () {

	        this.container.removeEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
	        this.container.removeEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
	        this.container.removeEventListener( 'mouseup', this.onMouseUp.bind( this ), false );
	        this.container.removeEventListener( 'touchstart', this.onMouseDown.bind( this ), false );
	        this.container.removeEventListener( 'touchmove', this.onMouseMove.bind( this ), false );
	        this.container.removeEventListener( 'touchend', this.onMouseUp.bind( this ), false );
	        this.container.removeEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );
	        this.container.removeEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), false );
	        this.container.removeEventListener( 'contextmenu', this.onContextMenu.bind( this ), false );
			
	    },

	    onMouseDown: function ( event ) {

	        const inputCount = ( event.touches && event.touches.length ) || 1 ;

	        switch ( inputCount ) {

	        case 1:

	            const x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
	            const y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

	            // console.log('x: ' + x + 'y: ' + y);

	            this.dragging = true;
	            this.userMouse.set( x, y );

	            break;

	        case 2:

	            const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
	            const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
	            const distance = Math.sqrt( dx * dx + dy * dy );
	            this.userMouse.pinchDistance = distance;

	            break;

	        }

	        this.onUpdateCallback();

	    },

	    onMouseMove: function ( event ) {

	        const inputCount = ( event.touches && event.touches.length ) || 1 ;

	        switch ( inputCount ) {

	        case 1:

	            const x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
	            const y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

	            const angleX = THREE.Math.degToRad( x - this.userMouse.x ) * 0.4;
	            const angleY = THREE.Math.degToRad( y - this.userMouse.y ) * 0.4;

	            if ( this.dragging ) {
	                this.quatA.setFromAxisAngle( this.vectorY, angleX );
	                this.quatB.setFromAxisAngle( this.vectorX, angleY );
	                this.quatCur.multiply( this.quatA ).multiply( this.quatB );
	                this.userMouse.set( x, y );

	            }

	            break;

	        case 2:

	            const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
	            const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
	            const distance = Math.sqrt( dx * dx + dy * dy );

	            this.addZoomDelta( this.userMouse.pinchDistance - distance );

	            break;

	        }

	    },

	    onMouseUp: function () {

	        this.dragging = false;

	    },

	    onMouseWheel: function ( event ) {

	        event.preventDefault();
	        event.stopPropagation();

	        let delta = 0;

	        if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

	            delta = event.wheelDelta;

	        } else if ( event.detail !== undefined ) { // Firefox

	            delta = - event.detail;

	        }

	        this.addZoomDelta( delta );
	        this.onUpdateCallback();

	    },

	    addZoomDelta: function ( delta ) {

	        const uniforms = this.material.uniforms;
	        const lowerBound = this.size * 0.1;
	        const upperBound = this.size * 10;

	        uniforms.zoom.value += delta;

	        if ( uniforms.zoom.value <= lowerBound ) {

	            uniforms.zoom.value = lowerBound;

	        } else if ( uniforms.zoom.value >= upperBound ) {

	            uniforms.zoom.value = upperBound;

	        }

	    },

	    onUpdateCallback: function () {

	        this.frameId = window.requestAnimationFrame( this.onUpdateCallback.bind( this ) );

	        this.quatSlerp.slerp( this.quatCur, 0.1 );

	        if ( this.material ) {

	            this.material.uniforms.transform.value.makeRotationFromQuaternion( this.quatSlerp );
	            console.log(this.quatSlerp);

	        }
	        
	        if ( !this.dragging && 1.0 - this.quatSlerp.clone().dot( this.quatCur ) < this.EPS ) {
				
	            window.cancelAnimationFrame( this.frameId );

	        }

	    },

	    reset: function () {

	        this.quatCur.set( 0, 0, 0, 1 );
	        this.quatSlerp.set( 0, 0, 0, 1 );
	        this.onUpdateCallback();

	    },

	    updateTexture: function ( texture ) {

	        this.material.uniforms.tDiffuse.value = texture;

	    },

	    getTexture: function () {

	        return this.material.uniforms.tDiffuse.value;

	    },

	    onLoad: function ( texture ) {

	        this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

	        this.registerMouseEvents();
	        this.onUpdateCallback();
			
	        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' } );

	        VideoPanorama.prototype.onLoad.call( this, texture );
			
	    },

	    onLeave: function () {

	        this.unregisterMouseEvents();

	        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl', data: CONTROLS.ORBIT } );

	        window.cancelAnimationFrame( this.frameId );

	        VideoPanorama.prototype.onLeave.call( this );
			
	    },

	    onWindowResize: function () {

	        this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

	    },

	    onContextMenu: function () {

	        this.dragging = false;

	    },

	    dispose: function () {	

	        this.unregisterMouseEvents();

	        VideoPanorama.prototype.dispose.call( this );

	    }

	});

	/**
	 * @classdesc Image Little Planet
	 * @constructor
	 * @param {string} source 		- URL for the image source
	 */
	function ImageLittlePlanet ( source ) {

	    LittlePlanet.call( this, 'image', source );

	    this.type = 'image_little_planet';

	}

	ImageLittlePlanet.prototype = Object.assign( Object.create( LittlePlanet.prototype ), {

	    constructor: ImageLittlePlanet,

	    /**
	     * On loaded with texture
	     * @param {THREE.Texture} texture
	     * @memberOf ImageLittlePlanet
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        this.updateTexture( texture );

	        LittlePlanet.prototype.onLoad.call( this, texture );

	    },
	    
	    /**
	     * Update texture
	     * @param {THREE.Texture} texture 
	     * @memberOf ImageLittlePlanet
	     * @instance
	     */
	    updateTexture: function ( texture ) {

	        texture.minFilter = texture.magFilter = THREE.LinearFilter;
			
	        this.material.uniforms[ 'tDiffuse' ].value = texture;

	    },

	    /**
	     * Dispose
	     * @memberOf ImageLittlePlanet
	     * @instance
	     */
	    dispose: function () {

	        const tDiffuse = this.material.uniforms[ 'tDiffuse' ];

	        if ( tDiffuse && tDiffuse.value ) {

	            tDiffuse.value.dispose();

	        }

	        LittlePlanet.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Video Little Planet
	 * @constructor
	 * @param {string} source 		- URL for the image source
	 */
	function VideoLittlePlanet ( source ) {

	    LittlePlanet.call( this, 'video', source );

	    this.type = 'video_little_planet';

	}

	VideoLittlePlanet.prototype = Object.assign( Object.create( LittlePlanet.prototype ), {

	    constructor: VideoLittlePlanet,

	    /**
	     * On loaded with texture
	     * @param {THREE.Texture} texture
	     * @memberOf VideoLittlePlanet
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        this.updateTexture( texture );

	        LittlePlanet.prototype.onLoad.call( this, texture );

	    },
	    
	    /**
	     * Update texture
	     * @param {THREE.Texture} texture 
	     * @memberOf VideoLittlePlanet
	     * @instance
	     */
	    updateTexture: function ( texture ) {

	        texture.minFilter = texture.magFilter = THREE.LinearFilter;
			
	        this.material.uniforms[ 'tDiffuse' ].value = texture;

	    },
			
	    /**
	     * Set video texture
	     * @memberOf VideoLittlePlanet
	     * @instance
	     * @param {HTMLVideoElement} video  - The html5 video element
	     * @fires Panorama#panolens-viewer-handler
	     */
	    setVideoTexture: function ( video ) {

	        if ( !video ) return;

	        const videoTexture = new THREE.VideoTexture( video );
	        videoTexture.minFilter = THREE.LinearFilter;
	        videoTexture.magFilter = THREE.LinearFilter;
	        videoTexture.format = THREE.RGBFormat;

	        this.updateTexture( videoTexture );

	        return videoTexture;

	    },

	    /**
	     * Dispose
	     * @memberOf VideoLittlePlanet
	     * @instance
	     */
	    dispose: function () {

	        const tDiffuse = this.material.uniforms[ 'tDiffuse' ];

	        if ( tDiffuse && tDiffuse.value ) {

	            tDiffuse.value.dispose();

	        }

	        LittlePlanet.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Camera panorama
	 * @description See {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints|MediaStreamConstraints} for constraints
	 * @param {object} - camera constraints
	 * @constructor
	 */
	function CameraPanorama ( constraints ) {

	    Panorama.call( this );

	    this.media = new Media( constraints );

	    this.type = 'camera_panorama';

	    this.addEventListener( 'enter', this.start.bind( this ) );
	    this.addEventListener( 'leave', this.stop.bind( this ) );
	    this.addEventListener( 'panolens-container', this.onPanolensContainer.bind( this ) );
	    this.addEventListener( 'panolens-scene', this.onPanolensScene.bind( this ) );

	}

	CameraPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

	    constructor: CameraPanorama,

	    /**
	     * On container event
	     * @param {object} event
	     * @memberOf CameraPanorama
	     * @instance
	     */
	    onPanolensContainer: function ( { container } ) {

	        this.media.setContainer( container );

	    },

	    /**
	     * On scene event
	     * @param {object} event 
	     * @memberOf CameraPanorama
	     * @instance
	     */
	    onPanolensScene: function ( { scene } ) {

	        this.media.setScene( scene );

	    },

	    /**
	     * Start camera streaming
	     * @memberOf CameraPanorama
	     * @instance
	     * @returns {Promise}
	     */
	    start: function () {

	        return this.media.start();

	    },

	    /**
	     * Stop camera streaming
	     * @memberOf CameraPanorama
	     * @instance
	     */
	    stop: function () {

	        this.media.stop();

	    },

	} );

	/**
	 * @classdesc Stereo Image Panorama
	 * @constructor
	 * @param {string} src - image source
	 * @param {number} [stereo=new Stereo()] - stereo mixin
	 */
	function StereoImagePanorama ( src, stereo = new Stereo() ){

	    ImagePanorama.call( this, src );

	    this.stereo = stereo;
	    this.type = 'stereo_image_panorama';

	}

	StereoImagePanorama.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

	    constructor: StereoImagePanorama,

	    /**
	     * This will be called when texture is ready
	     * @param  {THREE.Texture} texture - Image texture
	     * @memberOf StereoImagePanorama
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        const { width, height } = texture.image;
	        let format = null;

	        if ( width / height === 4 ) { 
	            
	            format = STEREOFORMAT.SBS;
	        
	        } else { 

	            format = STEREOFORMAT.TAB;
	        
	        }

	        this.stereo.updateUniformByFormat( format, this.material.uniforms );

	        this.material.uniforms[ 'tEquirect' ].value = texture;

	        ImagePanorama.prototype.onLoad.call( this, texture );

	    },

	    /**
	     * Update Texture for Stereo Left Eye
	     * @memberOf StereoImagePanorama
	     * @instance
	     */
	    updateTextureToLeft: function() {

	        this.stereo.updateTextureToLeft( this.material.uniforms.offset.value );

	    },

	    /**
	     * Update Texture for Stereo Right Eye
	     * @memberOf StereoImagePanorama
	     * @instance
	     */
	    updateTextureToRight: function() {

	        this.stereo.updateTextureToRight( this.material.uniforms.offset.value );

	    },

	    /**
	     * Dispose
	     * @memberOf StereoImagePanorama
	     * @instance
	     */
	    dispose: function () {	

	        const { value } = this.material.uniforms.tEquirect;

	        if ( value instanceof THREE.Texture ) {

	            value.dispose();

	        }

	        ImagePanorama.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Stereo Image Panorama
	 * @constructor
	 * @param {string} src - image source
	 * @param {object} options - { @see VideoPanorama }
	 * @param {number} [stereo=new Stereo()] - stereo mixin
	 */
	function StereoVideoPanorama ( src, options = {}, stereo = new Stereo() ){

	    VideoPanorama.call( this, src, options );

	    this.stereo = stereo;
	    this.type = 'stereo_video_panorama';

	}

	StereoVideoPanorama.prototype = Object.assign( Object.create( VideoPanorama.prototype ), {

	    constructor: StereoVideoPanorama,

	    /**
	     * This will be called when video texture is ready
	     * @param  {THREE.VideoTexture} texture - Video texture
	     * @memberOf StereoVideoPanorama
	     * @instance
	     */
	    onLoad: function ( texture ) {

	        const { videoWidth, videoHeight } = texture.image;
	        let format = null;

	        if ( videoWidth / videoHeight === 4 ) { 
	            
	            format = STEREOFORMAT.SBS;
	        
	        } else { 

	            format = STEREOFORMAT.TAB;
	        
	        }

	        this.stereo.updateUniformByFormat( format, this.material.uniforms );

	        this.material.uniforms[ 'tEquirect' ].value = texture;

	        VideoPanorama.prototype.onLoad.call( this );

	    },

	    /**
	     * Update Texture for Stereo Left Eye
	     * @memberOf StereoVideoPanorama
	     * @instance
	     */
	    updateTextureToLeft: function() {

	        this.stereo.updateTextureToLeft( this.material.uniforms.offset.value );

	    },

	    /**
	     * Update Texture for Stereo Right Eye
	     * @memberOf StereoVideoPanorama
	     * @instance
	     */
	    updateTextureToRight: function() {

	        this.stereo.updateTextureToRight( this.material.uniforms.offset.value );

	    },

	    /**
	     * Dispose
	     * @memberOf StereoVideoPanorama
	     * @instance
	     */
	    dispose: function () {	

	        const { value } = this.material.uniforms.tEquirect;

	        if ( value instanceof THREE.Texture ) {

	            value.dispose();

	        }

	        VideoPanorama.prototype.dispose.call( this );

	    }

	} );

	/**
	 * @classdesc Orbit Controls
	 * @constructor
	 * @external OrbitControls
	 * @param {THREE.Object} object 
	 * @param {HTMLElement} domElement 
	 */
	function OrbitControls ( object, domElement ) {

	    this.object = object;
	    this.domElement = ( domElement !== undefined ) ? domElement : document;
	    this.frameId = null;

	    // API

	    // Set to false to disable this control
	    this.enabled = true;

	    /*
	     * "target" sets the location of focus, where the control orbits around
	     * and where it pans with respect to.
	     */
	    this.target = new THREE.Vector3();

	    // center is old, deprecated; use "target" instead
	    this.center = this.target;

	    /*
	     * This option actually enables dollying in and out; left as "zoom" for
	     * backwards compatibility
	     */
	    this.noZoom = false;
	    this.zoomSpeed = 1.0;

	    // Limits to how far you can dolly in and out ( PerspectiveCamera only )
	    this.minDistance = 0;
	    this.maxDistance = Infinity;

	    // Limits to how far you can zoom in and out ( OrthographicCamera only )
	    this.minZoom = 0;
	    this.maxZoom = Infinity;

	    // Set to true to disable this control
	    this.noRotate = false;
	    this.rotateSpeed = -0.15;

	    // Set to true to disable this control
	    this.noPan = true;
	    this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	    // Set to true to automatically rotate around the target
	    this.autoRotate = false;
	    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	    /*
	     * How far you can orbit vertically, upper and lower limits.
	     * Range is 0 to Math.PI radians.
	     */
	    this.minPolarAngle = 0; // radians
	    this.maxPolarAngle = Math.PI; // radians

	    // Momentum
	  	this.momentumDampingFactor = 0.90;
	  	this.momentumScalingFactor = -0.005;
	  	this.momentumKeydownFactor = 20;

	  	// Fov
	  	this.minFov = 30;
	  	this.maxFov = 120;

	    /*
	     * How far you can orbit horizontally, upper and lower limits.
	     * If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	     */
	    this.minAzimuthAngle = - Infinity; // radians
	    this.maxAzimuthAngle = Infinity; // radians

	    // Set to true to disable use of the keys
	    this.noKeys = false;

	    // The four arrow keys
	    this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	    // Mouse buttons
	    this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	    /*
	     * //////////
	     * internals
	     */

	    const scope = this;

	    const EPS = 10e-8;
	    const MEPS = 10e-5;

	    const rotateStart = new THREE.Vector2();
	    const rotateEnd = new THREE.Vector2();
	    const rotateDelta = new THREE.Vector2();

	    const panStart = new THREE.Vector2();
	    const panEnd = new THREE.Vector2();
	    const panDelta = new THREE.Vector2();
	    const panOffset = new THREE.Vector3();

	    const offset = new THREE.Vector3();

	    const dollyStart = new THREE.Vector2();
	    const dollyEnd = new THREE.Vector2();
	    const dollyDelta = new THREE.Vector2();

	    let theta = 0;
	    let phi = 0;
	    let phiDelta = 0;
	    let thetaDelta = 0;
	    let scale = 1;
	    const pan = new THREE.Vector3();

	    const lastPosition = new THREE.Vector3();
	    const lastQuaternion = new THREE.Quaternion();

	    let momentumLeft = 0, momentumUp = 0;
	    let eventPrevious;
	    let momentumOn = false;

	    let keyUp, keyBottom, keyLeft, keyRight;

	    const STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	    let state = STATE.NONE;

	    // for reset

	    this.target0 = this.target.clone();
	    this.position0 = this.object.position.clone();
	    this.zoom0 = this.object.zoom;

	    // so camera.up is the orbit axis

	    const quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
	    const quatInverse = quat.clone().inverse();

	    // events

	    const changeEvent = { type: 'change' };
	    const startEvent = { type: 'start' };
	    const endEvent = { type: 'end' };

	    this.setLastQuaternion = function ( quaternion ) {
	        lastQuaternion.copy( quaternion );
	        scope.object.quaternion.copy( quaternion );
	    };

	    this.getLastPosition = function () {
	        return lastPosition;
	    };

	    this.rotateLeft = function ( angle ) {

	        if ( angle === undefined ) {

	            angle = getAutoRotationAngle();

	        }

	        thetaDelta -= angle;


	    };

	    this.rotateUp = function ( angle ) {

	        if ( angle === undefined ) {

	            angle = getAutoRotationAngle();

	        }

	        phiDelta -= angle;

	    };

	    // pass in distance in world space to move left
	    this.panLeft = function ( distance ) {

	        const te = this.object.matrix.elements;

	        // get X column of matrix
	        panOffset.set( te[ 0 ], te[ 1 ], te[ 2 ] );
	        panOffset.multiplyScalar( - distance );

	        pan.add( panOffset );

	    };

	    // pass in distance in world space to move up
	    this.panUp = function ( distance ) {

	        const te = this.object.matrix.elements;

	        // get Y column of matrix
	        panOffset.set( te[ 4 ], te[ 5 ], te[ 6 ] );
	        panOffset.multiplyScalar( distance );

	        pan.add( panOffset );

	    };

	    /*
	     * pass in x,y of change desired in pixel space,
	     * right and down are positive
	     */
	    this.pan = function ( deltaX, deltaY ) {

	        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	        if ( scope.object instanceof THREE.PerspectiveCamera ) {

	            // perspective
	            const position = scope.object.position;
	            const offset = position.clone().sub( scope.target );
	            let targetDistance = offset.length();

	            // half of the fov is center to top of screen
	            targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

	            // we actually don't use screenWidth, since perspective camera is fixed to screen height
	            scope.panLeft( 2 * deltaX * targetDistance / element.clientHeight );
	            scope.panUp( 2 * deltaY * targetDistance / element.clientHeight );

	        } else if ( scope.object instanceof THREE.OrthographicCamera ) {

	            // orthographic
	            scope.panLeft( deltaX * (scope.object.right - scope.object.left) / element.clientWidth );
	            scope.panUp( deltaY * (scope.object.top - scope.object.bottom) / element.clientHeight );

	        } else {

	            // camera neither orthographic or perspective
	            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

	        }

	    };

	    this.momentum = function(){
			
	        if ( !momentumOn ) return;

	        if ( Math.abs( momentumLeft ) < MEPS && Math.abs( momentumUp ) < MEPS ) { 

	            momentumOn = false; 
	            return;
	        }

	        momentumUp   *= this.momentumDampingFactor;
	        momentumLeft *= this.momentumDampingFactor;

	        thetaDelta -= this.momentumScalingFactor * momentumLeft;
	        phiDelta   -= this.momentumScalingFactor * momentumUp;

	    };

	    this.dollyIn = function ( dollyScale ) {

	        if ( dollyScale === undefined ) {

	            dollyScale = getZoomScale();

	        }

	        if ( scope.object instanceof THREE.PerspectiveCamera ) {

	            scale /= dollyScale;

	        } else if ( scope.object instanceof THREE.OrthographicCamera ) {

	            scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
	            scope.object.updateProjectionMatrix();
	            scope.dispatchEvent( changeEvent );

	        } else {

	            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

	        }

	    };

	    this.dollyOut = function ( dollyScale ) {

	        if ( dollyScale === undefined ) {

	            dollyScale = getZoomScale();

	        }

	        if ( scope.object instanceof THREE.PerspectiveCamera ) {

	            scale *= dollyScale;

	        } else if ( scope.object instanceof THREE.OrthographicCamera ) {

	            scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
	            scope.object.updateProjectionMatrix();
	            scope.dispatchEvent( changeEvent );

	        } else {

	            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

	        }

	    };

	    this.update = function ( ignoreUpdate ) {

	        const position = this.object.position;

	        offset.copy( position ).sub( this.target );

	        // rotate offset to "y-axis-is-up" space
	        offset.applyQuaternion( quat );

	        // angle from z-axis around y-axis

	        theta = Math.atan2( offset.x, offset.z );

	        // angle from y-axis

	        phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

	        if ( this.autoRotate && state === STATE.NONE ) {

	            this.rotateLeft( getAutoRotationAngle() );

	        }

	        this.momentum();

	        theta += thetaDelta;
	        phi += phiDelta;

	        // restrict theta to be between desired limits
	        theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );

	        // restrict phi to be between desired limits
	        phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

	        // restrict phi to be betwee EPS and PI-EPS
	        phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

	        let radius = offset.length() * scale;

	        // restrict radius to be between desired limits
	        radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

	        // move target to panned location
	        this.target.add( pan );

	        offset.x = radius * Math.sin( phi ) * Math.sin( theta );
	        offset.y = radius * Math.cos( phi );
	        offset.z = radius * Math.sin( phi ) * Math.cos( theta );

	        // rotate offset back to "camera-up-vector-is-up" space
	        offset.applyQuaternion( quatInverse );

	        position.copy( this.target ).add( offset );

	        this.object.lookAt( this.target );

	        thetaDelta = 0;
	        phiDelta = 0;
	        scale = 1;
	        pan.set( 0, 0, 0 );

	        /*
	         * update condition is:
	         * min(camera displacement, camera rotation in radians)^2 > EPS
	         * using small-angle approximation cos(x/2) = 1 - x^2 / 8
	         */
	        if ( lastPosition.distanceToSquared( this.object.position ) > EPS
			    || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS ) {

	            if ( ignoreUpdate !== true ) { this.dispatchEvent( changeEvent ); }

	            lastPosition.copy( this.object.position );
	            lastQuaternion.copy (this.object.quaternion );

	        }

	    };


	    this.reset = function () {

	        state = STATE.NONE;

	        this.target.copy( this.target0 );
	        this.object.position.copy( this.position0 );
	        this.object.zoom = this.zoom0;

	        this.object.updateProjectionMatrix();
	        this.dispatchEvent( changeEvent );

	        this.update();

	    };

	    this.getPolarAngle = function () {

	        return phi;

	    };

	    this.getAzimuthalAngle = function () {

	        return theta;

	    };

	    function getAutoRotationAngle() {

	        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	    }

	    function getZoomScale() {

	        return Math.pow( 0.95, scope.zoomSpeed );

	    }

	    function onMouseDown( event ) {

	        momentumOn = false;

	   		momentumLeft = momentumUp = 0;

	        if ( scope.enabled === false ) return;
	        event.preventDefault();

	        if ( event.button === scope.mouseButtons.ORBIT ) {
	            if ( scope.noRotate === true ) return;

	            state = STATE.ROTATE;

	            rotateStart.set( event.clientX, event.clientY );

	        } else if ( event.button === scope.mouseButtons.ZOOM ) {
	            if ( scope.noZoom === true ) return;

	            state = STATE.DOLLY;

	            dollyStart.set( event.clientX, event.clientY );

	        } else if ( event.button === scope.mouseButtons.PAN ) {
	            if ( scope.noPan === true ) return;

	            state = STATE.PAN;

	            panStart.set( event.clientX, event.clientY );

	        }

	        if ( state !== STATE.NONE ) {
	            document.addEventListener( 'mousemove', onMouseMove, false );
	            document.addEventListener( 'mouseup', onMouseUp, false );
	            scope.dispatchEvent( startEvent );
	        }

	        scope.update();

	    }

	    function onMouseMove( event ) {

	        if ( scope.enabled === false ) return;

	        event.preventDefault();

	        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	        if ( state === STATE.ROTATE ) {

	            if ( scope.noRotate === true ) return;

	            rotateEnd.set( event.clientX, event.clientY );
	            rotateDelta.subVectors( rotateEnd, rotateStart );

	            // rotating across whole screen goes 360 degrees around
	            scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

	            // rotating up and down along whole screen attempts to go 360, but limited to 180
	            scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

	            rotateStart.copy( rotateEnd );

	            if( eventPrevious ){
	                momentumLeft = event.clientX - eventPrevious.clientX;
	                momentumUp = event.clientY - eventPrevious.clientY;
	            }

	            eventPrevious = event;

	        } else if ( state === STATE.DOLLY ) {

	            if ( scope.noZoom === true ) return;

	            dollyEnd.set( event.clientX, event.clientY );
	            dollyDelta.subVectors( dollyEnd, dollyStart );

	            if ( dollyDelta.y > 0 ) {

	                scope.dollyIn();

	            } else if ( dollyDelta.y < 0 ) {

	                scope.dollyOut();

	            }

	            dollyStart.copy( dollyEnd );

	        } else if ( state === STATE.PAN ) {

	            if ( scope.noPan === true ) return;

	            panEnd.set( event.clientX, event.clientY );
	            panDelta.subVectors( panEnd, panStart );

	            scope.pan( panDelta.x, panDelta.y );

	            panStart.copy( panEnd );

	        }

	        if ( state !== STATE.NONE ) scope.update();

	    }

	    function onMouseUp( /* event */ ) {

	        momentumOn = true;

	        eventPrevious = undefined;

	        if ( scope.enabled === false ) return;

	        document.removeEventListener( 'mousemove', onMouseMove, false );
	        document.removeEventListener( 'mouseup', onMouseUp, false );
	        scope.dispatchEvent( endEvent );
	        state = STATE.NONE;

	    }

	    function onMouseWheel( event ) {

	        if ( scope.enabled === false || scope.noZoom === true || state !== STATE.NONE ) return;

	        event.preventDefault();
	        event.stopPropagation();

	        let delta = 0;

	        if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

	            delta = event.wheelDelta;

	        } else if ( event.detail !== undefined ) { // Firefox

	            delta = - event.detail;

	        }

	        if ( delta > 0 ) {

	            // scope.dollyOut();
	            scope.object.fov = ( scope.object.fov < scope.maxFov ) 
	                ? scope.object.fov + 1
	                : scope.maxFov;
	            scope.object.updateProjectionMatrix();

	        } else if ( delta < 0 ) {

	            // scope.dollyIn();
	            scope.object.fov = ( scope.object.fov > scope.minFov ) 
	                ? scope.object.fov - 1
	                : scope.minFov;
	            scope.object.updateProjectionMatrix();

	        }

	        scope.update();
	        scope.dispatchEvent( changeEvent );
	        scope.dispatchEvent( startEvent );
	        scope.dispatchEvent( endEvent );

	    }

	    function onKeyUp ( event ) {

	        switch ( event.keyCode ) {

	        case scope.keys.UP:
	            keyUp = false;
	            break;

	        case scope.keys.BOTTOM:
	            keyBottom = false;
	            break;

	        case scope.keys.LEFT:
	            keyLeft = false;
	            break;

	        case scope.keys.RIGHT:
	            keyRight = false;
	            break;

	        }

	    }

	    function onKeyDown( event ) {

	        if ( scope.enabled === false || scope.noKeys === true || scope.noRotate === true ) return;

	        switch ( event.keyCode ) {

	        case scope.keys.UP:
	            keyUp = true;
	            break;

	        case scope.keys.BOTTOM:
	            keyBottom = true;
	            break;

	        case scope.keys.LEFT:
	            keyLeft = true;
	            break;

	        case scope.keys.RIGHT:
	            keyRight = true;
	            break;

	        }

	        if (keyUp || keyBottom || keyLeft || keyRight) {

	            momentumOn = true;

	            if (keyUp) momentumUp = - scope.rotateSpeed * scope.momentumKeydownFactor;
	            if (keyBottom) momentumUp = scope.rotateSpeed * scope.momentumKeydownFactor;
	            if (keyLeft) momentumLeft = - scope.rotateSpeed * scope.momentumKeydownFactor;
	            if (keyRight) momentumLeft = scope.rotateSpeed * scope.momentumKeydownFactor;

	        }

	    }

	    function touchstart( event ) {

	        momentumOn = false;

	        momentumLeft = momentumUp = 0;

	        if ( scope.enabled === false ) return;

	        switch ( event.touches.length ) {

	        case 1:	// one-fingered touch: rotate

	            if ( scope.noRotate === true ) return;

	            state = STATE.TOUCH_ROTATE;

	            rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	            break;

	        case 2:	// two-fingered touch: dolly

	            if ( scope.noZoom === true ) return;

	            state = STATE.TOUCH_DOLLY;

	            const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
	            const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
	            const distance = Math.sqrt( dx * dx + dy * dy );

	            dollyStart.set( 0, distance );

	            break;

	        case 3: // three-fingered touch: pan

	            if ( scope.noPan === true ) return;

	            state = STATE.TOUCH_PAN;

	            panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	            break;

	        default:

	            state = STATE.NONE;

	        }

	        if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );

	    }

	    function touchmove( event ) {

	        if ( scope.enabled === false ) return;

	        event.preventDefault();
	        event.stopPropagation();

	        const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	        switch ( event.touches.length ) {

	        case 1: // one-fingered touch: rotate

	            if ( scope.noRotate === true ) return;
	            if ( state !== STATE.TOUCH_ROTATE ) return;

	            rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	            rotateDelta.subVectors( rotateEnd, rotateStart );

	            // rotating across whole screen goes 360 degrees around
	            scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
	            // rotating up and down along whole screen attempts to go 360, but limited to 180
	            scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

	            rotateStart.copy( rotateEnd );

	            if( eventPrevious ){
	                momentumLeft = event.touches[ 0 ].pageX - eventPrevious.pageX;
	                momentumUp = event.touches[ 0 ].pageY - eventPrevious.pageY;
	            }

	            eventPrevious = {
	                pageX: event.touches[ 0 ].pageX,
	                pageY: event.touches[ 0 ].pageY,
	            };

	            scope.update();
	            break;

	        case 2: // two-fingered touch: dolly

	            if ( scope.noZoom === true ) return;
	            if ( state !== STATE.TOUCH_DOLLY ) return;

	            const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
	            const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
	            const distance = Math.sqrt( dx * dx + dy * dy );

	            dollyEnd.set( 0, distance );
	            dollyDelta.subVectors( dollyEnd, dollyStart );

	            if ( dollyDelta.y < 0 ) {

	                scope.object.fov = ( scope.object.fov < scope.maxFov ) 
	                    ? scope.object.fov + 1
	                    : scope.maxFov;
	                scope.object.updateProjectionMatrix();

	            } else if ( dollyDelta.y > 0 ) {

	                scope.object.fov = ( scope.object.fov > scope.minFov ) 
	                    ? scope.object.fov - 1
	                    : scope.minFov;
	                scope.object.updateProjectionMatrix();

	            }

	            dollyStart.copy( dollyEnd );

	            scope.update();
	            scope.dispatchEvent( changeEvent );
	            break;

	        case 3: // three-fingered touch: pan

	            if ( scope.noPan === true ) return;
	            if ( state !== STATE.TOUCH_PAN ) return;

	            panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	            panDelta.subVectors( panEnd, panStart );

	            scope.pan( panDelta.x, panDelta.y );

	            panStart.copy( panEnd );

	            scope.update();
	            break;

	        default:

	            state = STATE.NONE;

	        }

	    }

	    function touchend( /* event */ ) {

	        momentumOn = true;

	        eventPrevious = undefined;

	        if ( scope.enabled === false ) return;

	        scope.dispatchEvent( endEvent );
	        state = STATE.NONE;

	    }

	    this.dispose = function() {

	        this.domElement.removeEventListener( 'mousedown', onMouseDown );
	        this.domElement.removeEventListener( 'mousewheel', onMouseWheel );
	        this.domElement.removeEventListener( 'DOMMouseScroll', onMouseWheel );

	        this.domElement.removeEventListener( 'touchstart', touchstart );
	        this.domElement.removeEventListener( 'touchend', touchend );
	        this.domElement.removeEventListener( 'touchmove', touchmove );

	        window.removeEventListener( 'keyup', onKeyUp );
	        window.removeEventListener( 'keydown', onKeyDown );

	    };

	    // this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
	    this.domElement.addEventListener( 'mousedown', onMouseDown, { passive: false } );
	    this.domElement.addEventListener( 'mousewheel', onMouseWheel, { passive: false } );
	    this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, { passive: false } ); // firefox

	    this.domElement.addEventListener( 'touchstart', touchstart, { passive: false } );
	    this.domElement.addEventListener( 'touchend', touchend, { passive: false } );
	    this.domElement.addEventListener( 'touchmove', touchmove, { passive: false } );

	    window.addEventListener( 'keyup', onKeyUp, { passive: false } );
	    window.addEventListener( 'keydown', onKeyDown, { passive: false } );

	    // force an update at start
	    this.update();

	}
	OrbitControls.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	    constructor: OrbitControls

	} );

	/**
	 * @classdesc Device Orientation Control
	 * @constructor
	 * @external DeviceOrientationControls
	 * @param {THREE.Camera} camera 
	 * @param {HTMLElement} domElement 
	 */
	function DeviceOrientationControls ( camera, domElement ) {

	    const scope = this;
	    const changeEvent = { type: 'change' };

	    let rotX = 0;
	    let tempX = 0;
	    let tempY = 0;

	    this.camera = camera;
	    this.camera.rotation.reorder( 'YXZ' );
	    this.domElement = ( domElement !== undefined ) ? domElement : document;

	    this.enabled = true;

	    this.deviceOrientation = null;
	    this.screenOrientation = 0;

	    this.alpha = 0;
	    this.alphaOffsetAngle = 0;

	    const onDeviceOrientationChangeEvent = function( event ) {

	        scope.deviceOrientation = event;

	    };

	    const onScreenOrientationChangeEvent = function() {

	        scope.screenOrientation = window.orientation || 0;

	    };

	    const onTouchStartEvent = function (event) {

	        event.preventDefault();
	        event.stopPropagation();

	        tempX = event.touches[ 0 ].pageX;
	        tempY = event.touches[ 0 ].pageY;

	    };

	    const onTouchMoveEvent = function (event) {

	        event.preventDefault();
	        event.stopPropagation();

	        rotX += THREE.Math.degToRad( ( tempY - event.touches[ 0 ].pageY ) / 4 );
	        scope.rotateLeft( -THREE.Math.degToRad( ( event.touches[ 0 ].pageX - tempX ) / 4 ) );

	        tempX = event.touches[ 0 ].pageX;
	        tempY = event.touches[ 0 ].pageY;

	    };

	    // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	    const setCameraQuaternion = function( quaternion, alpha, beta, gamma, orient ) {

	        const zee = new THREE.Vector3( 0, 0, 1 );

	        const euler = new THREE.Euler();

	        const q0 = new THREE.Quaternion();

	        const q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

	        let vectorFingerY;
	        const fingerQY = new THREE.Quaternion();
	        const fingerQX = new THREE.Quaternion();

	        if ( scope.screenOrientation == 0 ) {

	            vectorFingerY = new THREE.Vector3( 1, 0, 0 );
	            fingerQY.setFromAxisAngle( vectorFingerY, -rotX );

	        } else if ( scope.screenOrientation == 180 ) {

	            vectorFingerY = new THREE.Vector3( 1, 0, 0 );
	            fingerQY.setFromAxisAngle( vectorFingerY, rotX );

	        } else if ( scope.screenOrientation == 90 ) {

	            vectorFingerY = new THREE.Vector3( 0, 1, 0 );
	            fingerQY.setFromAxisAngle( vectorFingerY, rotX );

	        } else if ( scope.screenOrientation == - 90) {

	            vectorFingerY = new THREE.Vector3( 0, 1, 0 );
	            fingerQY.setFromAxisAngle( vectorFingerY, -rotX );

	        }

	        q1.multiply( fingerQY );
	        q1.multiply( fingerQX );

	        euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

	        quaternion.setFromEuler( euler ); // orient the device

	        quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

	        quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

	    };

	    this.connect = function() {

	        onScreenOrientationChangeEvent(); // run once on load

	        window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, { passive: true } );
	        window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, { passive: true } );
	        window.addEventListener( 'deviceorientation', this.update.bind( this ), { passive: true } );

	        scope.domElement.addEventListener( 'touchstart', onTouchStartEvent, { passive: false } );
	        scope.domElement.addEventListener( 'touchmove', onTouchMoveEvent, { passive: false } );

	        scope.enabled = true;

	    };

	    this.disconnect = function() {

	        window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
	        window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );
	        window.removeEventListener( 'deviceorientation', this.update.bind( this ), false );

	        scope.domElement.removeEventListener( 'touchstart', onTouchStartEvent, false );
	        scope.domElement.removeEventListener( 'touchmove', onTouchMoveEvent, false );

	        scope.enabled = false;

	    };

	    this.update = function( ignoreUpdate ) {

	        if ( scope.enabled === false || !scope.deviceOrientation ) return;

	        const alpha = scope.deviceOrientation.alpha ? THREE.Math.degToRad( scope.deviceOrientation.alpha ) + scope.alphaOffsetAngle : 0; // Z
	        const beta = scope.deviceOrientation.beta ? THREE.Math.degToRad( scope.deviceOrientation.beta ) : 0; // X'
	        const gamma = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
	        const orient = scope.screenOrientation ? THREE.Math.degToRad( scope.screenOrientation ) : 0; // O

	        setCameraQuaternion( scope.camera.quaternion, alpha, beta, gamma, orient );
	        scope.alpha = alpha;

	        if ( ignoreUpdate !== true ) { scope.dispatchEvent( changeEvent ); }

	    };

	    this.updateAlphaOffsetAngle = function( angle ) {

	        this.alphaOffsetAngle = angle;

	    };

	    this.updateRotX = function( angle ) {

	        rotX = angle;

	    };

	    this.rotateLeft = function( angle ) {

	        this.updateAlphaOffsetAngle( this.alphaOffsetAngle - angle );
	    };

	    this.rotateUp = function( angle ) {

	        this.updateRotX( rotX + angle );

	    };

	    this.dispose = function() {

	        this.disconnect();

	    };

	    this.connect();

	}
	DeviceOrientationControls.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype), {

	    constructor: DeviceOrientationControls

	} );

	/**
	 * @classdesc Google Cardboard Effect Composer
	 * @constructor
	 * @external CardboardEffect
	 * @param {THREE.WebGLRenderer} renderer 
	 */
	function CardboardEffect ( renderer ) {

	    const _camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

	    const _scene = new THREE.Scene();

	    const _stereo = new THREE.StereoCamera();
	    _stereo.aspect = 0.5;

	    const _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	    const _renderTarget = new THREE.WebGLRenderTarget( 512, 512, _params );
	    _renderTarget.scissorTest = true;
	    _renderTarget.texture.generateMipmaps = false;

	    /*
	     * Distortion Mesh ported from:
	     * https://github.com/borismus/webvr-boilerplate/blob/master/src/distortion/barrel-distortion-fragment.js
	     */

	    const distortion = new THREE.Vector2( 0.441, 0.156 );

	    const geometry = new THREE.PlaneBufferGeometry( 1, 1, 10, 20 ).deleteAttribute( 'normal' ).toNonIndexed();

	    const positions = geometry.attributes.position.array;
	    const uvs = geometry.attributes.uv.array;

	    // duplicate
	    geometry.attributes.position.count *= 2;
	    geometry.attributes.uv.count *= 2;

	    const positions2 = new Float32Array( positions.length * 2 );
	    positions2.set( positions );
	    positions2.set( positions, positions.length );

	    const uvs2 = new Float32Array( uvs.length * 2 );
	    uvs2.set( uvs );
	    uvs2.set( uvs, uvs.length );

	    const vector = new THREE.Vector2();
	    const length = positions.length / 3;

	    for ( let i = 0, l = positions2.length / 3; i < l; i ++ ) {

	        vector.x = positions2[ i * 3 + 0 ];
	        vector.y = positions2[ i * 3 + 1 ];

	        const dot = vector.dot( vector );
	        const scalar = 1.5 + ( distortion.x + distortion.y * dot ) * dot;

	        const offset = i < length ? 0 : 1;

	        positions2[ i * 3 + 0 ] = ( vector.x / scalar ) * 1.5 - 0.5 + offset;
	        positions2[ i * 3 + 1 ] = ( vector.y / scalar ) * 3.0;

	        uvs2[ i * 2 ] = ( uvs2[ i * 2 ] + offset ) * 0.5;

	    }

	    geometry.attributes.position.array = positions2;
	    geometry.attributes.uv.array = uvs2;

	    //

	    const material = new THREE.MeshBasicMaterial( { map: _renderTarget.texture } );
	    const mesh = new THREE.Mesh( geometry, material );
	    _scene.add( mesh );

	    //

	    this.setEyeSeparation = function ( eyeSep ) {

	        _stereo.eyeSep = eyeSep;

	    };

	    this.setSize = function ( width, height ) {

	        renderer.setSize( width, height );

	        const pixelRatio = renderer.getPixelRatio();

	        _renderTarget.setSize( width * pixelRatio, height * pixelRatio );

	    };

	    this.render = function ( scene, camera, panorama ) {

	        const stereoEnabled = panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama;

	        scene.updateMatrixWorld();

	        if ( stereoEnabled ) this.setEyeSeparation( panorama.stereo.eyeSep );

	        if ( camera.parent === null ) camera.updateMatrixWorld();

	        _stereo.update( camera );

	        const width = _renderTarget.width / 2;
	        const height = _renderTarget.height;

	        if ( renderer.autoClear ) renderer.clear();

	        if ( stereoEnabled ) panorama.updateTextureToLeft();

	        _renderTarget.scissor.set( 0, 0, width, height );
	        _renderTarget.viewport.set( 0, 0, width, height );
	        renderer.setRenderTarget( _renderTarget );
	        renderer.render( scene, _stereo.cameraL );

	        renderer.clearDepth();

	        if ( stereoEnabled ) panorama.updateTextureToRight();

	        _renderTarget.scissor.set( width, 0, width, height );
	        _renderTarget.viewport.set( width, 0, width, height );
	        renderer.setRenderTarget( _renderTarget );
	        renderer.render( scene, _stereo.cameraR );

	        renderer.clearDepth();

	        renderer.setRenderTarget( null );
	        renderer.render( _scene, _camera );
	    };

	}

	/**
	 * @classdesc Stereo Effect Composer
	 * @constructor
	 * @external StereoEffect
	 * @param {THREE.WebGLRenderer} renderer 
	 */
	const StereoEffect = function ( renderer ) {

	    const _stereo = new THREE.StereoCamera();
	    _stereo.aspect = 0.5;
	    const size = new THREE.Vector2();

	    this.setEyeSeparation = function ( eyeSep ) {

	        _stereo.eyeSep = eyeSep;

	    };

	    this.setSize = function ( width, height ) {

	        renderer.setSize( width, height );

	    };

	    this.render = function ( scene, camera, panorama ) {

	        const stereoEnabled = panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama;

	        scene.updateMatrixWorld();

	        if ( camera.parent === null ) camera.updateMatrixWorld();
	        
	        if ( stereoEnabled ) this.setEyeSeparation( panorama.stereo.eyeSep );

	        _stereo.update( camera );

	        renderer.getSize( size );

	        if ( renderer.autoClear ) renderer.clear();
	        renderer.setScissorTest( true );

	        if ( stereoEnabled ) panorama.updateTextureToLeft();

	        renderer.setScissor( 0, 0, size.width / 2, size.height );
	        renderer.setViewport( 0, 0, size.width / 2, size.height );
	        renderer.render( scene, _stereo.cameraL );

	        if ( stereoEnabled ) panorama.updateTextureToRight();

	        renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
	        renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
	        renderer.render( scene, _stereo.cameraR );

	        renderer.setScissorTest( false );

	        if ( stereoEnabled ) panorama.updateTextureToLeft();

	    };

	};

	/**
	 * @classdesc Viewer contains pre-defined scene, camera and renderer
	 * @constructor
	 * @param {object} [options] - Use custom or default config options
	 * @param {HTMLElement} [options.container] - A HTMLElement to host the canvas
	 * @param {THREE.Scene} [options.scene=THREE.Scene] - A THREE.Scene which contains panorama and 3D objects
	 * @param {THREE.Camera} [options.camera=THREE.PerspectiveCamera] - A THREE.Camera to view the scene
	 * @param {THREE.WebGLRenderer} [options.renderer=THREE.WebGLRenderer] - A THREE.WebGLRenderer to render canvas
	 * @param {boolean} [options.controlBar=true] - Show/hide control bar on the bottom of the container
	 * @param {array}   [options.controlButtons=[]] - Button names to mount on controlBar if controlBar exists, Defaults to ['fullscreen', 'setting', 'video']
	 * @param {boolean} [options.autoHideControlBar=false] - Auto hide control bar when click on non-active area
	 * @param {boolean} [options.autoHideInfospot=true] - Auto hide infospots when click on non-active area
	 * @param {boolean} [options.horizontalView=false] - Allow only horizontal camera control
	 * @param {number}  [options.clickTolerance=10] - Distance tolerance to tigger click / tap event
	 * @param {number}  [options.cameraFov=60] - Camera field of view value
	 * @param {boolean} [options.reverseDragging=false] - Reverse dragging direction
	 * @param {boolean} [options.enableReticle=false] - Enable reticle for mouseless interaction other than VR mode
	 * @param {number}  [options.dwellTime=1500] - Dwell time for reticle selection in ms
	 * @param {boolean} [options.autoReticleSelect=true] - Auto select a clickable target after dwellTime
	 * @param {boolean} [options.viewIndicator=false] - Adds an angle view indicator in upper left corner
	 * @param {number}  [options.indicatorSize=30] - Size of View Indicator
	 * @param {string}  [options.output=null] - Whether and where to output raycast position. Could be 'console' or 'overlay'
	 * @param {boolean} [options.autoRotate=false] - Auto rotate
	 * @param {number}  [options.autoRotateSpeed=2.0] - Auto rotate speed as in degree per second. Positive is counter-clockwise and negative is clockwise.
	 * @param {number}  [options.autoRotateActivationDuration=5000] - Duration before auto rotatation when no user interactivity in ms
	 * @param {THREE.Vector3} [options.initialLookAt=new THREE.Vector3( 0, 0, -Number.MAX_SAFE_INTEGER )] - Initial looking at vector
	 */
	function Viewer ( options = {} ) {

	    this.options = Object.assign( {

	        container: this.setupContainer( options.container ),
	        controlBar: true,
	        controlButtons: [ 'fullscreen', 'setting', 'video' ],
	        autoHideControlBar: false,
	        autoHideInfospot: true,
	        horizontalView: false,
	        clickTolerance: 10,
	        cameraFov: 60,
	        reverseDragging: false,
	        enableReticle: false,
	        dwellTime: 1500,
	        autoReticleSelect: true,
	        viewIndicator: false,
	        indicatorSize: 30,
	        output: null,
	        autoRotate: false,
	        autoRotateSpeed: 2.0,
	        autoRotateActivationDuration: 5000,
	        initialLookAt: new THREE.Vector3( 0, 0, -Number.MAX_SAFE_INTEGER )

	    }, options );

	    const { container, cameraFov, controlBar, controlButtons, viewIndicator, indicatorSize, enableReticle, reverseDragging, output, scene, camera, renderer } = this.options;
	    const { clientWidth, clientHeight } = container;

	    this.container = container;
	    this.scene = this.setupScene( scene );
	    this.sceneReticle = new THREE.Scene();
	    this.camera = this.setupCamera( cameraFov, clientWidth / clientHeight, camera );
	    this.renderer = this.setupRenderer( renderer, container );
	    this.reticle = this.addReticle( this.camera, this.sceneReticle );
	    this.control = this.setupControls( this.camera, container );
	    this.effect = this.setupEffects( this.renderer, container );

	    this.mode = MODES.NORMAL;
	    this.panorama = null;
	    this.widget = null;
	    this.hoverObject = null;
	    this.infospot = null;
	    this.pressEntityObject = null;
	    this.pressObject = null;
	    this.raycaster = new THREE.Raycaster();
	    this.raycasterPoint = new THREE.Vector2();
	    this.userMouse = new THREE.Vector2();
	    this.updateCallbacks = [];
	    this.requestAnimationId = null;
	    this.cameraFrustum = new THREE.Frustum();
	    this.cameraViewProjectionMatrix = new THREE.Matrix4();
	    this.autoRotateRequestId = null;
	    this.outputDivElement = null;
	    this.touchSupported = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
	    this.tweenLeftAnimation = new TWEEN.Tween();
	    this.tweenUpAnimation = new TWEEN.Tween();
	    this.outputEnabled = false;
	    this.viewIndicatorSize = indicatorSize;
	    this.tempEnableReticle = enableReticle;

	    this.handlerMouseUp = this.onMouseUp.bind( this );
	    this.handlerMouseDown = this.onMouseDown.bind( this );
	    this.handlerMouseMove = this.onMouseMove.bind( this );
	    this.handlerWindowResize = this.onWindowResize.bind( this );
	    this.handlerKeyDown = this.onKeyDown.bind( this );
	    this.handlerKeyUp = this.onKeyUp.bind( this );
	    this.handlerTap = this.onTap.bind( this, { clientX: clientWidth / 2, clientY: clientHeight / 2 } );

	    if ( controlBar ) this.addDefaultControlBar( controlButtons );
	    if ( viewIndicator ) this.addViewIndicator();
	    if ( reverseDragging ) this.reverseDraggingDirection();
	    if ( enableReticle ) this.enableReticleControl(); else this.registerMouseAndTouchEvents(); 
	    if ( output === 'overlay' ) this.addOutputElement();

	    this.registerEventListeners();

	    this.animate.call( this );

	}
	Viewer.prototype = Object.assign( Object.create( THREE.EventDispatcher.prototype ), {

	    constructor: Viewer,

	    setupScene: function ( scene = new THREE.Scene() ) {

	        return scene;

	    },

	    setupCamera: function ( cameraFov, ratio, camera = new THREE.PerspectiveCamera( cameraFov, ratio, 1, 10000 ) ) {

	        return camera;

	    },

	    setupRenderer: function ( renderer = new THREE.WebGLRenderer( { alpha: true, antialias: false } ), container ) {

	        const { clientWidth, clientHeight } = container;

	        renderer.setPixelRatio( window.devicePixelRatio );
	        renderer.setSize( clientWidth, clientHeight );
	        renderer.setClearColor( 0x000000, 0 );
	        renderer.autoClear = false;
	        renderer.domElement.classList.add( 'panolens-canvas' );
	        renderer.domElement.style.display = 'block';
	        container.style.backgroundColor = '#000';
	        container.appendChild( renderer.domElement );

	        return renderer;

	    },

	    setupControls: function ( camera, container ) {

	        const { autoRotate, autoRotateSpeed, horizontalView } = this.options;

	        const orbit = new OrbitControls( camera, container );
	        orbit.id = 'orbit';
	        orbit.index = CONTROLS.ORBIT;
	        orbit.minDistance = 1;
	        orbit.noPan = true;
	        orbit.autoRotate = autoRotate;
	        orbit.autoRotateSpeed = autoRotateSpeed;

	        if ( horizontalView ) {

	            orbit.minPolarAngle = Math.PI / 2;
	            orbit.maxPolarAngle = Math.PI / 2;

	        }

	        const orient = new DeviceOrientationControls( camera, container );
	        orient.id = 'device-orientation';
	        orient.index = CONTROLS.DEVICEORIENTATION;
	        orient.enabled = false;

	        this.controls = [ orbit, orient ];
	        this.OrbitControls = orbit;
	        this.DeviceOrientationControls = orient;

	        return orbit;
	 
	    },

	    setupEffects: function ( renderer, { clientWidth, clientHeight } ) {

	        const cardboard = new CardboardEffect( renderer );
	        cardboard.setSize( clientWidth, clientHeight );

	        const stereo = new StereoEffect( renderer );
	        stereo.setSize( clientWidth, clientHeight );

	        this.CardboardEffect = cardboard;
	        this.StereoEffect = stereo;

	        return cardboard;

	    },

	    setupContainer: function ( container ) {

	        if ( container ) {

	            container._width = container.clientWidth;
	            container._height = container.clientHeight;

	            return container;

	        } else {

	            const element = document.createElement( 'div' );
	            element.classList.add( 'panolens-container' );
	            element.style.width = '100%';
	            element.style.height = '100%';
	            document.body.appendChild( element );
	            
	            return element;
	            
	        }

	    },

	    /**
	     * Add an object to the scene
	     * Automatically hookup with panolens-viewer-handler listener
	     * to communicate with viewer method
	     * @param {THREE.Object3D} object - The object to be added
	     * @memberOf Viewer
	     * @instance
	     */
	    add: function ( object ) {

	        if ( arguments.length > 1 ) {

	            for ( let i = 0; i < arguments.length; i ++ ) {

	                this.add( arguments[ i ] );

	            }

	            return this;

	        }

	        this.scene.add( object );

	        // All object added to scene has 'panolens-viewer-handler' event to handle viewer communication
	        if ( object.addEventListener ) {

	            object.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

	        }

	        // All object added to scene being passed with container
	        if ( object instanceof Panorama && object.dispatchEvent ) {

	            object.dispatchEvent( { type: 'panolens-container', container: this.container } );

	        }

	        if ( object instanceof CameraPanorama ) {

	            object.dispatchEvent( { type: 'panolens-scene', scene: this.scene } );

	        }

	        // Hookup default panorama event listeners
	        if ( object instanceof Panorama ) {

	            this.addPanoramaEventListener( object );

	            if ( !this.panorama ) {

	                const { initialLookAt } = this.options;

	                this.setPanorama( object );
	                this.setControlCenter( initialLookAt );

	            }

	        }

	    },

	    /**
	     * Remove an object from the scene
	     * @param  {THREE.Object3D} object - Object to be removed
	     * @memberOf Viewer
	     * @instance
	     */
	    remove: function ( object ) {

	        if ( object.removeEventListener ) {

	            object.removeEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

	        }

	        this.scene.remove( object );

	    },

	    /**
	     * Add default control bar
	     * @param {array} array - The control buttons array
	     * @memberOf Viewer
	     * @instance
	     */
	    addDefaultControlBar: function ( array ) {

	        if ( this.widget ) {

	            console.warn( 'Default control bar exists' );
	            return;

	        }

	        const widget = new Widget( this.container );
	        widget.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );
	        widget.addControlBar();
	        array.forEach( buttonName => {

	            widget.addControlButton( buttonName );

	        } );

	        this.widget = widget;

	    },

	    /**
	     * Set a panorama to be the current one
	     * @param {Panorama} pano - Panorama to be set
	     * @memberOf Viewer
	     * @instance
	     */
	    setPanorama: function ( pano ) {

	        const leavingPanorama = this.panorama;

	        if ( pano instanceof Panorama && leavingPanorama !== pano ) {

	            // Clear exisiting infospot
	            this.hideInfospot();

	            const afterEnterComplete = function () {

	                if ( leavingPanorama ) { leavingPanorama.onLeave(); }
	                pano.removeEventListener( 'enter-fade-start', afterEnterComplete );

	            };

	            pano.addEventListener( 'enter-fade-start', afterEnterComplete );

	            // Assign and enter panorama
	            (this.panorama = pano).onEnter();
				
	        }

	    },

	    /**
	     * Event handler to execute commands from child objects
	     * @param {object} event - The dispatched event with method as function name and data as an argument
	     * @memberOf Viewer
	     * @instance
	     */
	    eventHandler: function ( event ) {

	        if ( event.method && this[ event.method ] ) {

	            this[ event.method ]( event.data );

	        }

	    },

	    /**
	     * Dispatch event to all descendants
	     * @param  {object} event - Event to be passed along
	     * @memberOf Viewer
	     * @instance
	     */
	    dispatchEventToChildren: function ( event ) {

	        this.scene.traverse( function ( object ) {

	            if ( object.dispatchEvent ) {

	                object.dispatchEvent( event );

	            }

	        });

	    },

	    /**
	     * Set widget content
	     * @method activateWidgetItem
	     * @param  {integer} controlIndex - Control index
	     * @param  {integer} mode - Modes for effects
	     * @memberOf Viewer
	     * @instance
	     */
	    activateWidgetItem: function ( controlIndex, mode ) {

	        const mainMenu = this.widget.mainMenu;
	        const ControlMenuItem = mainMenu.children[ 0 ];
	        const ModeMenuItem = mainMenu.children[ 1 ];

	        let item;

	        if ( controlIndex !== undefined ) {

	            switch ( controlIndex ) {

	            case 0:

	                item = ControlMenuItem.subMenu.children[ 1 ];

	                break;

	            case 1:

	                item = ControlMenuItem.subMenu.children[ 2 ];

	                break;
						
	            default:

	                item = ControlMenuItem.subMenu.children[ 1 ];

	                break;	

	            }

	            ControlMenuItem.subMenu.setActiveItem( item );
	            ControlMenuItem.setSelectionTitle( item.textContent );

	        }

	        if ( mode !== undefined ) {

	            switch( mode ) {

	            case MODES.CARDBOARD:

	                item = ModeMenuItem.subMenu.children[ 2 ];

	                break;

	            case MODES.STEREO:

	                item = ModeMenuItem.subMenu.children[ 3 ];
						
	                break;

	            default:

	                item = ModeMenuItem.subMenu.children[ 1 ];

	                break;
	            }

	            ModeMenuItem.subMenu.setActiveItem( item );
	            ModeMenuItem.setSelectionTitle( item.textContent );

	        }

	    },

	    /**
	     * Enable rendering effect
	     * @param  {MODES} mode - Modes for effects
	     * @memberOf Viewer
	     * @instance
	     */
	    enableEffect: function ( mode ) {

	        if ( this.mode === mode ) { return; }
	        if ( mode === MODES.NORMAL ) { this.disableEffect(); return; }
	        else { this.mode = mode; }

	        const fov = this.camera.fov;

	        switch( mode ) {

	        case MODES.CARDBOARD:

	            this.effect = this.CardboardEffect;
	            this.enableReticleControl();

	            break;

	        case MODES.STEREO:

	            this.effect = this.StereoEffect;
	            this.enableReticleControl();
					
	            break;

	        default:

	            this.effect = null;
	            this.disableReticleControl();

	            break;

	        }

	        this.activateWidgetItem( undefined, this.mode );

	        /**
	         * Dual eye effect event
	         * @type {object}
	         * @event Infospot#panolens-dual-eye-effect
	         * @property {MODES} mode - Current display mode
	         */
	        this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

	        // Force effect stereo camera to update by refreshing fov
	        this.camera.fov = fov + 10e-3;
	        this.effect.setSize( this.container.clientWidth, this.container.clientHeight );
	        this.render();
	        this.camera.fov = fov;

	        /**
	         * Dispatch mode change event
	         * @type {object}
	         * @event Viewer#mode-change
	         * @property {MODES} mode - Current display mode
	         */
	        this.dispatchEvent( { type: 'mode-change', mode: this.mode } );

	    },

	    /**
	     * Disable additional rendering effect
	     * @memberOf Viewer
	     * @instance
	     */
	    disableEffect: function () {

	        if ( this.mode === MODES.NORMAL ) { return; }

	        this.mode = MODES.NORMAL;
	        this.disableReticleControl();

	        this.activateWidgetItem( undefined, this.mode );

	        /**
	         * Dual eye effect event
	         * @type {object}
	         * @event Infospot#panolens-dual-eye-effect
	         * @property {MODES} mode - Current display mode
	         */
	        this.dispatchEventToChildren( { type: 'panolens-dual-eye-effect', mode: this.mode } );

	        this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
	        this.render();

	        /**
	         * Dispatch mode change event
	         * @type {object}
	         * @event Viewer#mode-change
	         * @property {MODES} mode - Current display mode
	         */
	        this.dispatchEvent( { type: 'mode-change', mode: this.mode } );
	    },

	    /**
	     * Enable reticle control
	     * @memberOf Viewer
	     * @instance
	     */
	    enableReticleControl: function () {

	        if ( this.reticle.visible ) { return; }

	        this.tempEnableReticle = true;

	        // Register reticle event and unregister mouse event
	        this.unregisterMouseAndTouchEvents();
	        this.reticle.show();
	        this.registerReticleEvent();
	        this.updateReticleEvent();

	    },

	    /**
	     * Disable reticle control
	     * @memberOf Viewer
	     * @instance
	     */
	    disableReticleControl: function () {

	        this.tempEnableReticle = false;

	        // Register mouse event and unregister reticle event
	        if ( !this.options.enableReticle ) {

	            this.reticle.hide();
	            this.unregisterReticleEvent();
	            this.registerMouseAndTouchEvents();

	        } else {

	            this.updateReticleEvent();

	        }

	    },

	    /**
	     * Enable auto rotation
	     * @memberOf Viewer
	     * @instance
	     */
	    enableAutoRate: function () {

	        this.options.autoRotate = true;
	        this.OrbitControls.autoRotate = true;

	    },

	    /**
	     * Disable auto rotation
	     * @memberOf Viewer
	     * @instance
	     */
	    disableAutoRate: function () {

	        clearTimeout( this.autoRotateRequestId );
	        this.options.autoRotate = false;
	        this.OrbitControls.autoRotate = false;

	    },

	    /**
	     * Toggle video play or stop
	     * @param {boolean} pause
	     * @memberOf Viewer
	     * @instance
	     * @fires Viewer#video-toggle
	     */
	    toggleVideoPlay: function ( pause ) {

	        if ( this.panorama instanceof VideoPanorama ) {

	            /**
	             * Toggle video event
	             * @type {object}
	             * @event Viewer#video-toggle
	             */
	            this.panorama.dispatchEvent( { type: 'video-toggle', pause: pause } );

	        }

	    },

	    /**
	     * Set currentTime in a video
	     * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	     * @memberOf Viewer
	     * @instance
	     * @fires Viewer#video-time
	     */
	    setVideoCurrentTime: function ( percentage ) {

	        if ( this.panorama instanceof VideoPanorama ) {

	            /**
	             * Setting video time event
	             * @type {object}
	             * @event Viewer#video-time
	             * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	             */
	            this.panorama.dispatchEvent( { type: 'video-time', percentage: percentage } );

	        }

	    },

	    /**
	     * This will be called when video updates if an widget is present
	     * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	     * @memberOf Viewer
	     * @instance
	     * @fires Viewer#video-update
	     */
	    onVideoUpdate: function ( percentage ) {

	        const { widget } = this;

	        /**
	         * Video update event
	         * @type {object}
	         * @event Viewer#video-update
	         * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	         */
	        if( widget ) { widget.dispatchEvent( { type: 'video-update', percentage: percentage } ); }

	    },

	    /**
	     * Add update callback to be called every animation frame
	     * @param {function} callback
	     * @memberOf Viewer
	     * @instance
	     */
	    addUpdateCallback: function ( fn ) {

	        if ( fn ) {

	            this.updateCallbacks.push( fn );

	        }

	    },

	    /**
	     * Remove update callback
	     * @param  {function} fn - The function to be removed
	     * @memberOf Viewer
	     * @instance
	     */
	    removeUpdateCallback: function ( fn ) {

	        const index = this.updateCallbacks.indexOf( fn );

	        if ( fn && index >= 0 ) {

	            this.updateCallbacks.splice( index, 1 );

	        }

	    },

	    /**
	     * Show video widget
	     * @memberOf Viewer
	     * @instance
	     */
	    showVideoWidget: function () {

	        const { widget } = this;

	        /**
	         * Show video widget event
	         * @type {object}
	         * @event Viewer#video-control-show
	         */
	        if( widget ) { widget.dispatchEvent( { type: 'video-control-show' } ); }

	    },

	    /**
	     * Hide video widget
	     * @memberOf Viewer
	     * @instance
	     */
	    hideVideoWidget: function () {

	        const { widget } = this;

	        /**
	         * Hide video widget
	         * @type {object}
	         * @event Viewer#video-control-hide
	         */
	        if( widget ) { widget.dispatchEvent( { type: 'video-control-hide' } ); }

	    },

	    /**
	     * Update video play button
	     * @param {boolean} paused 
	     * @memberOf Viewer
	     * @instance
	     */
	    updateVideoPlayButton: function ( paused ) {

	        const { widget } = this;

	        if ( widget && widget.videoElement && widget.videoElement.controlButton ) {

	            widget.videoElement.controlButton.update( paused );

	        }

	    },

	    /**
	     * Add default panorama event listeners
	     * @param {Panorama} pano - The panorama to be added with event listener
	     * @memberOf Viewer
	     * @instance
	     */
	    addPanoramaEventListener: function ( pano ) {

	        // Set camera control on every panorama
	        pano.addEventListener( 'enter', this.setCameraControl.bind( this ) );

	        // Show and hide widget event only when it's VideoPanorama
	        if ( pano instanceof VideoPanorama ) {

	            pano.addEventListener( 'enter-fade-start', this.showVideoWidget.bind( this ) );
	            pano.addEventListener( 'leave', function () {

	                if ( !(this.panorama instanceof VideoPanorama) ) {

	                    this.hideVideoWidget.call( this );

	                }
					
	            }.bind( this ) );

	        }

	    },

	    /**
	     * Set camera control
	     * @memberOf Viewer
	     * @instance
	     */
	    setCameraControl: function () {

	        this.OrbitControls.target.copy( this.panorama.position );

	    },

	    /**
	     * Get current camera control
	     * @return {object} - Current navigation control
	     * @memberOf Viewer
	     * @instance
	     * @returns {THREE.OrbitControls|THREE.DeviceOrientationControls}
	     */
	    getControl: function () {

	        return this.control;

	    },

	    /**
	     * Get scene
	     * @memberOf Viewer
	     * @instance
	     * @return {THREE.Scene} - Current scene which the viewer is built on
	     */
	    getScene: function () {

	        return this.scene;

	    },

	    /**
	     * Get camera
	     * @memberOf Viewer
	     * @instance
	     * @return {THREE.Camera} - The scene camera
	     */
	    getCamera: function () {

	        return this.camera;

	    },

	    /**
	     * Get renderer
	     * @memberOf Viewer
	     * @instance
	     * @return {THREE.WebGLRenderer} - The renderer using webgl
	     */
	    getRenderer: function () {

	        return this.renderer;

	    },

	    /**
	     * Get container
	     * @memberOf Viewer
	     * @instance
	     * @return {HTMLElement} - The container holds rendererd canvas
	     */
	    getContainer: function () {

	        return this.container;

	    },

	    /**
	     * Get control id
	     * @memberOf Viewer
	     * @instance
	     * @return {string} - Control id. 'orbit' or 'device-orientation'
	     */
	    getControlId: function () {

	        return this.control.id;

	    },

	    /**
	     * Get next navigation control id
	     * @memberOf Viewer
	     * @instance
	     * @return {string} - Next control id
	     */
	    getNextControlId: function () {

	        return this.controls[ this.getNextControlIndex() ].id;

	    },

	    /**
	     * Get next navigation control index
	     * @memberOf Viewer
	     * @instance
	     * @return {number} - Next control index
	     */
	    getNextControlIndex: function () {

	        const controls = this.controls;
	        const control = this.control;
	        const nextIndex = controls.indexOf( control ) + 1;

	        return ( nextIndex >= controls.length ) ? 0 : nextIndex;

	    },

	    /**
	     * Set field of view of camera
	     * @param {number} fov
	     * @memberOf Viewer
	     * @instance
	     */
	    setCameraFov: function ( fov ) {

	        this.camera.fov = fov;
	        this.camera.updateProjectionMatrix();

	    },

	    /**
	     * Get raycasted point of current panorama
	     * @memberof Viewer
	     * @instance
	     * @returns {THREE.Vector3}
	     */
	    getRaycastViewCenter: function () {

	        const raycaster = new THREE.Raycaster();
	        raycaster.setFromCamera( new THREE.Vector2( 0, 0 ), this.camera );
	        const intersect = raycaster.intersectObject( this.panorama );

	        return intersect.length > 0 ? intersect[ 0 ].point : new THREE.Vector3( 0, 0, -1 );

	    },

	    /**
	     * Enable control by index
	     * @param  {CONTROLS} index - Index of camera control
	     * @memberOf Viewer
	     * @instance
	     */
	    enableControl: function ( index ) {

	        index = ( index >= 0 && index < this.controls.length ) ? index : 0;

	        this.control.enabled = false;
	        this.control = this.controls[ index ];
	        this.control.enabled = true;
	        this.control.update();
	        
	        this.setControlCenter( this.getRaycastViewCenter() );
	        this.activateWidgetItem( index, undefined );
	        this.onChange();

	    },

	    /**
	     * Disable current control
	     * @memberOf Viewer
	     * @instance
	     */
	    disableControl: function () {

	        this.control.enabled = false;

	    },

	    /**
	     * Toggle next control
	     * @memberOf Viewer
	     * @instance
	     */
	    toggleNextControl: function () {

	        this.enableControl( this.getNextControlIndex() );

	    },

	    /**
	     * Screen Space Projection
	     * @memberOf Viewer
	     * @instance
	     */
	    getScreenVector: function ( worldVector ) {

	        const vector = worldVector.clone();
	        const widthHalf = ( this.container.clientWidth ) / 2;
	        const heightHalf = this.container.clientHeight / 2;

	        vector.project( this.camera );

	        vector.x = ( vector.x * widthHalf ) + widthHalf;
	        vector.y = - ( vector.y * heightHalf ) + heightHalf;
	        vector.z = 0;

	        return vector;

	    },

	    /**
	     * Check Sprite in Viewport
	     * @memberOf Viewer
	     * @instance
	     */
	    checkSpriteInViewport: function ( sprite ) {

	        this.camera.matrixWorldInverse.getInverse( this.camera.matrixWorld );
	        this.cameraViewProjectionMatrix.multiplyMatrices( this.camera.projectionMatrix, this.camera.matrixWorldInverse );
	        this.cameraFrustum.setFromProjectionMatrix( this.cameraViewProjectionMatrix );

	        return sprite.visible && this.cameraFrustum.intersectsSprite( sprite );

	    },

	    /**
	     * Reverse dragging direction
	     * @memberOf Viewer
	     * @instance
	     */
	    reverseDraggingDirection: function () {

	        this.OrbitControls.rotateSpeed *= -1;
	        this.OrbitControls.momentumScalingFactor *= -1;

	    },

	    /**
	     * Add reticle 
	     * @memberOf Viewer
	     * @instance
	     */
	    addReticle: function ( camera, sceneReticle ) {

	        const reticle = new Reticle( 0xffffff, true, this.options.dwellTime );
	        reticle.hide();
	        camera.add( reticle );
	        sceneReticle.add( camera );

	        return reticle;

	    },

	    rotateControlLeft: function ( left ) {

	        this.control.rotateLeft( left );

	    },

	    rotateControlUp: function ( up ) {

	        this.control.rotateUp( up );

	    },

	    rotateOrbitControl: function ( left, up ) {

	        this.rotateControlLeft( left );
	        this.rotateControlUp( up );

	    },

	    calculateCameraDirectionDelta: function ( vector ) {

	        let ha, va, chv, cvv, hv, vv, vptc;

	        chv = this.camera.getWorldDirection( new THREE.Vector3() );
	        cvv = chv.clone();

	        vptc = this.panorama.getWorldPosition( new THREE.Vector3() ).sub( this.camera.getWorldPosition( new THREE.Vector3() ) );

	        hv = vector.clone();
	        hv.add( vptc ).normalize();
	        vv = hv.clone();

	        chv.y = 0;
	        hv.y = 0;

	        ha = Math.atan2( hv.z, hv.x ) - Math.atan2( chv.z, chv.x );
	        ha = ha > Math.PI ? ha - 2 * Math.PI : ha;
	        ha = ha < -Math.PI ? ha + 2 * Math.PI : ha;
	        va = Math.abs( cvv.angleTo( chv ) + ( cvv.y * vv.y <= 0 ? vv.angleTo( hv ) : -vv.angleTo( hv ) ) );
	        va *= vv.y < cvv.y ? 1 : -1;

	        return { left: ha, up: va };

	    },

	    /**
	     * Set control center
	     * @param {THREE.Vector3} vector - Vector to be looked at the center
	     */
	    setControlCenter: function( vector ) {

	        const { left, up } = this.calculateCameraDirectionDelta( vector );
	        this.rotateOrbitControl( left, up );

	    },

	    /**
	     * Tween control looking center
	     * @param {THREE.Vector3} vector - Vector to be looked at the center
	     * @param {number} [duration=1000] - Duration to tween
	     * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	     * @memberOf Viewer
	     * @instance
	     */
	    tweenControlCenter: function ( vector, duration, easing ) {

	        if ( vector instanceof Array ) {

	            vector = vector[ 0 ];
	            duration = vector[ 1 ];
	            easing = vector[ 2 ];

	        }

	        duration = duration !== undefined ? duration : 1000;
	        easing = easing || TWEEN.Easing.Exponential.Out;

	        const { left, up } = this.calculateCameraDirectionDelta( vector );
	        const rotateControlLeft = this.rotateControlLeft.bind( this );
	        const rotateControlUp = this.rotateControlUp.bind( this );

	        const ov = { left: 0, up: 0 };
	        const nv = { left: 0, up: 0 };

	        this.tweenLeftAnimation.stop();
	        this.tweenUpAnimation.stop();

	        this.tweenLeftAnimation = new TWEEN.Tween( ov )
	            .to( { left }, duration )
	            .easing( easing )
	            .onUpdate(function(ov){
	                rotateControlLeft( ov.left - nv.left );
	                nv.left = ov.left;
	            })
	            .start();

	        this.tweenUpAnimation = new TWEEN.Tween( ov )
	            .to( { up }, duration )
	            .easing( easing )
	            .onUpdate(function(ov){
	                rotateControlUp( ov.up - nv.up );
	                nv.up = ov.up;
	            })
	            .start();

	    },

	    /**
	     * Tween control looking center by object
	     * @param {THREE.Object3D} object - Object to be looked at the center
	     * @param {number} [duration=1000] - Duration to tween
	     * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	     * @memberOf Viewer
	     * @instance
	     */
	    tweenControlCenterByObject: function ( object, duration, easing ) {

	        this.tweenControlCenter( object.getWorldPosition( new THREE.Vector3() ), duration, easing );

	    },

	    /**
	     * This is called when window size is changed
	     * @fires Viewer#window-resize
	     * @param {number} [windowWidth] - Specify if custom element has changed width
	     * @param {number} [windowHeight] - Specify if custom element has changed height
	     * @memberOf Viewer
	     * @instance
	     */
	    onWindowResize: function ( windowWidth, windowHeight ) {

	        let width, height;

	        const expand = this.container.classList.contains( 'panolens-container' ) || this.container.isFullscreen;

	        if ( windowWidth !== undefined && windowHeight !== undefined ) {

	            width = windowWidth;
	            height = windowHeight;
	            this.container._width = windowWidth;
	            this.container._height = windowHeight;

	        } else {

	            const isAndroid = /(android)/i.test(window.navigator.userAgent);

	            const adjustWidth = isAndroid 
	                ? Math.min(document.documentElement.clientWidth, window.innerWidth || 0) 
	                : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	            const adjustHeight = isAndroid 
	                ? Math.min(document.documentElement.clientHeight, window.innerHeight || 0) 
	                : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	            width = expand ? adjustWidth : this.container.clientWidth;
	            height = expand ? adjustHeight : this.container.clientHeight;

	            this.container._width = width;
	            this.container._height = height;

	        }

	        this.camera.aspect = width / height;
	        this.camera.updateProjectionMatrix();

	        this.renderer.setSize( width, height );

	        // Update reticle
	        if ( this.options.enableReticle || this.tempEnableReticle ) {

	            this.updateReticleEvent();

	        }

	        /**
	         * Window resizing event
	         * @type {object}
	         * @event Viewer#window-resize
	         * @property {number} width  - Width of the window
	         * @property {number} height - Height of the window
	         */
	        this.dispatchEvent( { type: 'window-resize', width: width, height: height });
	        this.scene.traverse( function ( object ) {

	            if ( object.dispatchEvent ) {

	                object.dispatchEvent( { type: 'window-resize', width: width, height: height });

	            }

	        } );

	    },

	    /**
	     * Add output element
	     * @memberOf Viewer
	     * @instance
	     */
	    addOutputElement: function () {

	        const element = document.createElement( 'div' );
	        element.style.position = 'absolute';
	        element.style.right = '10px';
	        element.style.top = '10px';
	        element.style.color = '#fff';
	        this.container.appendChild( element );
	        this.outputDivElement = element;

	    },

	    /**
	     * Output position in developer console by holding down Ctrl button
	     * @memberOf Viewer
	     * @instance
	     */
	    outputPosition: function () {

	        const intersects = this.raycaster.intersectObject( this.panorama, true );

	        if ( intersects.length > 0 ) {

	            const point = intersects[ 0 ].point.clone();
	            const world = this.panorama.getWorldPosition( new THREE.Vector3() );
	            point.sub( world );

	            const message = `${point.x.toFixed(2)}, ${point.y.toFixed(2)}, ${point.z.toFixed(2)}`;

	            if ( point.length() === 0 ) { return; }

	            switch ( this.options.output ) {

	            case 'console':
	                console.info( message );
	                break;

	            case 'overlay':
	                this.outputDivElement.textContent = message;
	                break;

	            }

	        }

	    },

	    /**
	     * On mouse down
	     * @param {MouseEvent} event 
	     * @memberOf Viewer
	     * @instance
	     */
	    onMouseDown: function ( event ) {

	        event.preventDefault();

	        this.userMouse.x = ( event.clientX >= 0 ) ? event.clientX : event.touches[0].clientX;
	        this.userMouse.y = ( event.clientY >= 0 ) ? event.clientY : event.touches[0].clientY;
	        this.userMouse.type = 'mousedown';
	        this.onTap( event );

	    },

	    /**
	     * On mouse move
	     * @param {MouseEvent} event 
	     * @memberOf Viewer
	     * @instance
	     */
	    onMouseMove: function ( event ) {

	        event.preventDefault();
	        this.userMouse.type = 'mousemove';
	        this.onTap( event );

	    },

	    /**
	     * On mouse up
	     * @param {MouseEvent} event 
	     * @memberOf Viewer
	     * @instance
	     */
	    onMouseUp: function ( event ) {

	        let onTarget = false;

	        this.userMouse.type = 'mouseup';

	        const type = ( this.userMouse.x >= event.clientX - this.options.clickTolerance 
					&& this.userMouse.x <= event.clientX + this.options.clickTolerance
					&& this.userMouse.y >= event.clientY - this.options.clickTolerance
					&& this.userMouse.y <= event.clientY + this.options.clickTolerance ) 
					||  ( event.changedTouches 
					&& this.userMouse.x >= event.changedTouches[0].clientX - this.options.clickTolerance
					&& this.userMouse.x <= event.changedTouches[0].clientX + this.options.clickTolerance 
					&& this.userMouse.y >= event.changedTouches[0].clientY - this.options.clickTolerance
					&& this.userMouse.y <= event.changedTouches[0].clientY + this.options.clickTolerance ) 
	            ? 'click' : undefined;

	        // Event should happen on canvas
	        if ( event && event.target && !event.target.classList.contains( 'panolens-canvas' ) ) { return; }

	        event.preventDefault();

	        if ( event.changedTouches && event.changedTouches.length === 1 ) {

	            onTarget = this.onTap( { clientX: event.changedTouches[0].clientX, clientY: event.changedTouches[0].clientY }, type );
			
	        } else {

	            onTarget = this.onTap( event, type );

	        }

	        this.userMouse.type = 'none';

	        if ( onTarget ) { 

	            return; 

	        }

	        if ( type === 'click' ) {

	            const { options: { autoHideInfospot, autoHideControlBar }, panorama, toggleControlBar } = this;

	            if ( autoHideInfospot && panorama ) {

	                panorama.toggleInfospotVisibility();

	            }

	            if ( autoHideControlBar ) {

	                toggleControlBar();

	            }

	        }

	    },

	    /**
	     * On tap eveny frame
	     * @param {MouseEvent} event 
	     * @param {string} type 
	     * @memberOf Viewer
	     * @instance
	     */
	    onTap: function ( event, type ) {

	        const { left, top } = this.container.getBoundingClientRect();
	        const { clientWidth, clientHeight } = this.container;

	        this.raycasterPoint.x = ( ( event.clientX - left ) / clientWidth ) * 2 - 1;
	        this.raycasterPoint.y = - ( ( event.clientY - top ) / clientHeight ) * 2 + 1;

	        this.raycaster.setFromCamera( this.raycasterPoint, this.camera );

	        // Return if no panorama 
	        if ( !this.panorama ) { 

	            return; 

	        }

	        // output infospot information
	        if ( event.type !== 'mousedown' && this.touchSupported || this.outputEnabled ) { 

	            this.outputPosition(); 

	        }

	        const intersects = this.raycaster.intersectObjects( this.panorama.children, true );
	        const intersect_entity = this.getConvertedIntersect( intersects );
	        const intersect = ( intersects.length > 0 ) ? intersects[0].object : undefined;

	        if ( this.userMouse.type === 'mouseup'  ) {

	            if ( intersect_entity && this.pressEntityObject === intersect_entity && this.pressEntityObject.dispatchEvent ) {

	                this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

	            }

	            this.pressEntityObject = undefined;

	        }

	        if ( this.userMouse.type === 'mouseup'  ) {

	            if ( intersect && this.pressObject === intersect && this.pressObject.dispatchEvent ) {

	                this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

	            }

	            this.pressObject = undefined;

	        }

	        if ( type === 'click' ) {
	            
	            this.panorama.dispatchEvent( { type: 'click', intersects: intersects, mouseEvent: event } );

	            if ( intersect_entity && intersect_entity.dispatchEvent ) {

	                intersect_entity.dispatchEvent( { type: 'click-entity', mouseEvent: event } );

	            }

	            if ( intersect && intersect.dispatchEvent ) {

	                intersect.dispatchEvent( { type: 'click', mouseEvent: event } );

	            }

	        } else {

	            this.panorama.dispatchEvent( { type: 'hover', intersects: intersects, mouseEvent: event } );

	            if ( ( this.hoverObject && intersects.length > 0 && this.hoverObject !== intersect_entity )
					|| ( this.hoverObject && intersects.length === 0 ) ){

	                if ( this.hoverObject.dispatchEvent ) {

	                    this.hoverObject.dispatchEvent( { type: 'hoverleave', mouseEvent: event } );

	                    this.reticle.end();

	                }

	                this.hoverObject = undefined;

	            }

	            if ( intersect_entity && intersects.length > 0 ) {

	                if ( this.hoverObject !== intersect_entity ) {

	                    this.hoverObject = intersect_entity;

	                    if ( this.hoverObject.dispatchEvent ) {

	                        this.hoverObject.dispatchEvent( { type: 'hoverenter', mouseEvent: event } );

	                        // Start reticle timer
	                        if ( this.options.autoReticleSelect && this.options.enableReticle || this.tempEnableReticle ) {
	                            this.reticle.start( this.onTap.bind( this, event, 'click' ) );
	                        }

	                    }

	                }

	                if ( this.userMouse.type === 'mousedown' && this.pressEntityObject != intersect_entity ) {

	                    this.pressEntityObject = intersect_entity;

	                    if ( this.pressEntityObject.dispatchEvent ) {

	                        this.pressEntityObject.dispatchEvent( { type: 'pressstart-entity', mouseEvent: event } );

	                    }

	                }

	                if ( this.userMouse.type === 'mousedown' && this.pressObject != intersect ) {

	                    this.pressObject = intersect;

	                    if ( this.pressObject.dispatchEvent ) {

	                        this.pressObject.dispatchEvent( { type: 'pressstart', mouseEvent: event } );

	                    }

	                }

	                if ( this.userMouse.type === 'mousemove' || this.options.enableReticle ) {

	                    if ( intersect && intersect.dispatchEvent ) {

	                        intersect.dispatchEvent( { type: 'hover', mouseEvent: event } );

	                    }

	                    if ( this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

	                        this.pressEntityObject.dispatchEvent( { type: 'pressmove-entity', mouseEvent: event } );

	                    }

	                    if ( this.pressObject && this.pressObject.dispatchEvent ) {

	                        this.pressObject.dispatchEvent( { type: 'pressmove', mouseEvent: event } );

	                    }

	                }

	            }

	            if ( !intersect_entity && this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

	                this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

	                this.pressEntityObject = undefined;

	            }

	            if ( !intersect && this.pressObject && this.pressObject.dispatchEvent ) {

	                this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

	                this.pressObject = undefined;

	            }

	        }

	        // Infospot handler
	        if ( intersect && intersect instanceof Infospot ) {

	            this.infospot = intersect;
				
	            if ( type === 'click' ) {

	                return true;

	            }
				

	        } else if ( this.infospot ) {

	            this.hideInfospot();

	        }

	        // Auto rotate
	        if ( this.options.autoRotate && this.userMouse.type !== 'mousemove' ) {

	            // Auto-rotate idle timer
	            clearTimeout( this.autoRotateRequestId );

	            if ( this.control === this.OrbitControls ) {

	                this.OrbitControls.autoRotate = false;
	                this.autoRotateRequestId = window.setTimeout( this.enableAutoRate.bind( this ), this.options.autoRotateActivationDuration );

	            }

	        }		

	    },

	    /**
	     * Get converted intersect
	     * @param {array} intersects 
	     * @memberOf Viewer
	     * @instance
	     */
	    getConvertedIntersect: function ( intersects ) {

	        let intersect;

	        for ( let i = 0; i < intersects.length; i++ ) {

	            if ( intersects[i].distance >= 0 && intersects[i].object && !intersects[i].object.passThrough ) {

	                if ( intersects[i].object.entity && intersects[i].object.entity.passThrough ) {
	                    continue;
	                } else if ( intersects[i].object.entity && !intersects[i].object.entity.passThrough ) {
	                    intersect = intersects[i].object.entity;
	                    break;
	                } else {
	                    intersect = intersects[i].object;
	                    break;
	                }

	            }

	        }

	        return intersect;

	    },

	    /**
	     * Hide infospot
	     * @memberOf Viewer
	     * @instance
	     */
	    hideInfospot: function () {

	        if ( this.infospot ) {

	            this.infospot.onHoverEnd();

	            this.infospot = undefined;

	        }

	    },

	    /**
	     * Toggle control bar
	     * @memberOf Viewer
	     * @instance
	     * @fires Viewer#control-bar-toggle
	     */
	    toggleControlBar: function () {

	        const { widget } = this;

	        /**
	         * Toggle control bar event
	         * @type {object}
	         * @event Viewer#control-bar-toggle
	         */
	        if ( widget ) {

	            widget.dispatchEvent( { type: 'control-bar-toggle' } );

	        }

	    },

	    /**
	     * On key down
	     * @param {KeyboardEvent} event 
	     * @memberOf Viewer
	     * @instance
	     */
	    onKeyDown: function ( event ) {

	        if ( this.options.output && this.options.output !== 'none' && event.key === 'Control' ) {

	            this.outputEnabled = true;

	        }

	    },

	    /**
	     * On key up
	     * @param {KeyboardEvent} event 
	     * @memberOf Viewer
	     * @instance
	     */
	    onKeyUp: function () {

	        this.outputEnabled = false;

	    },

	    /**
	     * Update control and callbacks
	     * @memberOf Viewer
	     * @instance
	     */
	    update: function () {

	        TWEEN.update();

	        this.updateCallbacks.forEach( function( callback ){ callback(); } );

	        this.control.update();

	        this.scene.traverse( function( child ){
	            if ( child instanceof Infospot 
					&& child.element 
					&& ( this.hoverObject === child 
						|| child.element.style.display !== 'none' 
						|| (child.element.left && child.element.left.style.display !== 'none')
						|| (child.element.right && child.element.right.style.display !== 'none') ) ) {
	                if ( this.checkSpriteInViewport( child ) ) {
	                    const { x, y } = this.getScreenVector( child.getWorldPosition( new THREE.Vector3() ) );
	                    child.translateElement( x, y );
	                } else {
	                    child.onDismiss();
	                }
					
	            }
	        }.bind( this ) );

	    },

	    /**
	     * Rendering function to be called on every animation frame
	     * Render reticle last
	     * @memberOf Viewer
	     * @instance
	     */
	    render: function () {

	        if ( this.mode === MODES.CARDBOARD || this.mode === MODES.STEREO ) {

	            this.renderer.clear();
	            this.effect.render( this.scene, this.camera, this.panorama );
	            this.effect.render( this.sceneReticle, this.camera );
				

	        } else {

	            this.renderer.clear();
	            this.renderer.render( this.scene, this.camera );
	            this.renderer.clearDepth();
	            this.renderer.render( this.sceneReticle, this.camera );

	        }

	    },

	    /**
	     * Animate
	     * @memberOf Viewer
	     * @instance
	     */
	    animate: function () {

	        this.requestAnimationId = window.requestAnimationFrame( this.animate.bind( this ) );

	        this.onChange();

	    },

	    /**
	     * On change
	     * @memberOf Viewer
	     * @instance
	     */
	    onChange: function () {

	        this.update();
	        this.render();

	    },

	    /**
	     * Register mouse and touch event on container
	     * @memberOf Viewer
	     * @instance
	     */
	    registerMouseAndTouchEvents: function () {

	        const options = { passive: false };

	        this.container.addEventListener( 'mousedown' , 	this.handlerMouseDown, options );
	        this.container.addEventListener( 'mousemove' , 	this.handlerMouseMove, options );
	        this.container.addEventListener( 'mouseup'	 , 	this.handlerMouseUp  , options );
	        this.container.addEventListener( 'touchstart', 	this.handlerMouseDown, options );
	        this.container.addEventListener( 'touchend'  , 	this.handlerMouseUp  , options );

	    },

	    /**
	     * Unregister mouse and touch event on container
	     * @memberOf Viewer
	     * @instance
	     */
	    unregisterMouseAndTouchEvents: function () {

	        this.container.removeEventListener( 'mousedown' ,  this.handlerMouseDown, false );
	        this.container.removeEventListener( 'mousemove' ,  this.handlerMouseMove, false );
	        this.container.removeEventListener( 'mouseup'	,  this.handlerMouseUp  , false );
	        this.container.removeEventListener( 'touchstart',  this.handlerMouseDown, false );
	        this.container.removeEventListener( 'touchend'  ,  this.handlerMouseUp  , false );

	    },

	    /**
	     * Register reticle event
	     * @memberOf Viewer
	     * @instance
	     */
	    registerReticleEvent: function () {

	        this.addUpdateCallback( this.handlerTap );

	    },

	    /**
	     * Unregister reticle event
	     * @memberOf Viewer
	     * @instance
	     */
	    unregisterReticleEvent: function () {

	        this.removeUpdateCallback( this.handlerTap );

	    },

	    /**
	     * Update reticle event
	     * @memberOf Viewer
	     * @instance
	     */
	    updateReticleEvent: function () {

	        const clientX = this.container.clientWidth / 2 + this.container.offsetLeft;
	        const clientY = this.container.clientHeight / 2;

	        this.removeUpdateCallback( this.handlerTap );
	        this.handlerTap = this.onTap.bind( this, { clientX, clientY } );
	        this.addUpdateCallback( this.handlerTap );

	    },

	    /**
	     * Register container and window listeners
	     * @memberOf Viewer
	     * @instance
	     */
	    registerEventListeners: function () {

	        // Resize Event
	        window.addEventListener( 'resize' , this.handlerWindowResize, true );

	        // Keyboard Event
	        window.addEventListener( 'keydown', this.handlerKeyDown, true );
	        window.addEventListener( 'keyup'  , this.handlerKeyUp	 , true );

	    },

	    /**
	     * Unregister container and window listeners
	     * @memberOf Viewer
	     * @instance
	     */
	    unregisterEventListeners: function () {

	        // Resize Event
	        window.removeEventListener( 'resize' , this.handlerWindowResize, true );

	        // Keyboard Event
	        window.removeEventListener( 'keydown', this.handlerKeyDown, true );
	        window.removeEventListener( 'keyup'  , this.handlerKeyUp  , true );

	    },

	    /**
	     * Dispose all scene objects and clear cache
	     * @memberOf Viewer
	     * @instance
	     */
	    dispose: function () {

	        this.disableAutoRate();

	        this.tweenLeftAnimation.stop();
	        this.tweenUpAnimation.stop();

	        // Unregister dom event listeners
	        this.unregisterEventListeners();

	        // recursive disposal on 3d objects
	        function recursiveDispose ( object ) {

	            for ( let i = object.children.length - 1; i >= 0; i-- ) {

	                recursiveDispose( object.children[i] );
	                object.remove( object.children[i] );

	            }

	            if ( object instanceof Panorama || object instanceof Infospot ) {

	                object.dispose();
	                object = null;

	            } else if ( object.dispatchEvent ){

	                object.dispatchEvent( 'dispose' );

	            }

	        }

	        recursiveDispose( this.scene );

	        // dispose widget
	        if ( this.widget ) {

	            this.widget.dispose();
	            this.widget = null;

	        }

	        // clear cache
	        if ( THREE.Cache && THREE.Cache.enabled ) {

	            THREE.Cache.clear();

	        }

	    },

	    /**
	     * Destroy viewer by disposing and stopping requestAnimationFrame
	     * @memberOf Viewer
	     * @instance
	     */
	    destroy: function () {

	        this.dispose();
	        this.render();
	        window.cancelAnimationFrame( this.requestAnimationId );		

	    },

	    /**
	     * On panorama dispose
	     * @memberOf Viewer
	     * @instance
	     */
	    onPanoramaDispose: function ( panorama ) {

	        if ( panorama instanceof VideoPanorama ) {

	            this.hideVideoWidget();

	        }

	        if ( panorama === this.panorama ) {

	            this.panorama = null;

	        }

	    },

	    /**
	     * Load ajax call
	     * @param {string} url - URL to be requested
	     * @param {function} [callback] - Callback after request completes
	     * @memberOf Viewer
	     * @instance
	     */
	    loadAsyncRequest: function ( url, callback = () => {} ) {

	        const request = new window.XMLHttpRequest();
	        request.onloadend = function ( event ) {
	            callback( event );
	        };
	        request.open( 'GET', url, true );
	        request.send( null );

	    },

	    /**
	     * View indicator in upper left
	     * @memberOf Viewer
	     * @instance
	     */
	    addViewIndicator: function () {

	        const scope = this;

	        function loadViewIndicator ( asyncEvent ) {

	            if ( asyncEvent.loaded === 0 ) return;

	            const viewIndicatorDiv = asyncEvent.target.responseXML.documentElement;
	            viewIndicatorDiv.style.width = scope.viewIndicatorSize + 'px';
	            viewIndicatorDiv.style.height = scope.viewIndicatorSize + 'px';
	            viewIndicatorDiv.style.position = 'absolute';
	            viewIndicatorDiv.style.top = '10px';
	            viewIndicatorDiv.style.left = '10px';
	            viewIndicatorDiv.style.opacity = '0.5';
	            viewIndicatorDiv.style.cursor = 'pointer';
	            viewIndicatorDiv.id = 'panolens-view-indicator-container';

	            scope.container.appendChild( viewIndicatorDiv );

	            const indicator = viewIndicatorDiv.querySelector( '#indicator' );
	            const setIndicatorD = function () {

	                scope.radius = scope.viewIndicatorSize * 0.225;
	                scope.currentPanoAngle = scope.camera.rotation.y - THREE.Math.degToRad( 90 );
	                scope.fovAngle = THREE.Math.degToRad( scope.camera.fov ) ;
	                scope.leftAngle = -scope.currentPanoAngle - scope.fovAngle / 2;
	                scope.rightAngle = -scope.currentPanoAngle + scope.fovAngle / 2;
	                scope.leftX = scope.radius * Math.cos( scope.leftAngle );
	                scope.leftY = scope.radius * Math.sin( scope.leftAngle );
	                scope.rightX = scope.radius * Math.cos( scope.rightAngle );
	                scope.rightY = scope.radius * Math.sin( scope.rightAngle );
	                scope.indicatorD = 'M ' + scope.leftX + ' ' + scope.leftY + ' A ' + scope.radius + ' ' + scope.radius + ' 0 0 1 ' + scope.rightX + ' ' + scope.rightY;

	                if ( scope.leftX && scope.leftY && scope.rightX && scope.rightY && scope.radius ) {

	                    indicator.setAttribute( 'd', scope.indicatorD );

	                }

	            };

	            scope.addUpdateCallback( setIndicatorD );

	            const indicatorOnMouseEnter = function () {

	                this.style.opacity = '1';

	            };

	            const indicatorOnMouseLeave = function () {

	                this.style.opacity = '0.5';

	            };

	            viewIndicatorDiv.addEventListener( 'mouseenter', indicatorOnMouseEnter );
	            viewIndicatorDiv.addEventListener( 'mouseleave', indicatorOnMouseLeave );
	        }

	        this.loadAsyncRequest( DataImage.ViewIndicator, loadViewIndicator );

	    },

	    /**
	     * Append custom control item to existing control bar
	     * @param {object} [option={}] - Style object to overwirte default element style. It takes 'style', 'onTap' and 'group' properties.
	     * @memberOf Viewer
	     * @instance
	     */
	    appendControlItem: function ( option ) {

	        const item = this.widget.createCustomItem( option );		

	        if ( option.group === 'video' ) {

	            this.widget.videoElement.appendChild( item );

	        } else {

	            this.widget.barElement.appendChild( item );

	        }

	        return item;

	    },

	    /**
	     * Clear all cached files
	     * @memberOf Viewer
	     * @instance
	     */
	    clearAllCache: function () {

	        THREE.Cache.clear();

	    }

	} );

	if ( THREE.REVISION != THREE_REVISION ) {

	    console.warn( `three.js version is not matched. Please consider use the target revision ${THREE_REVISION}` );

	}

	/**
	 * Panolens.js
	 * @author pchen66
	 * @namespace PANOLENS
	 */
	window.TWEEN = TWEEN;

	exports.BasicPanorama = BasicPanorama;
	exports.CONTROLS = CONTROLS;
	exports.CameraPanorama = CameraPanorama;
	exports.CubePanorama = CubePanorama;
	exports.CubeTextureLoader = CubeTextureLoader;
	exports.DataImage = DataImage;
	exports.EmptyPanorama = EmptyPanorama;
	exports.GoogleStreetviewPanorama = GoogleStreetviewPanorama;
	exports.ImageLittlePlanet = ImageLittlePlanet;
	exports.ImageLoader = ImageLoader;
	exports.ImagePanorama = ImagePanorama;
	exports.Infospot = Infospot;
	exports.LittlePlanet = LittlePlanet;
	exports.MODES = MODES;
	exports.Media = Media;
	exports.Panorama = Panorama;
	exports.REVISION = REVISION;
	exports.Reticle = Reticle;
	exports.STEREOFORMAT = STEREOFORMAT;
	exports.Stereo = Stereo;
	exports.StereoImagePanorama = StereoImagePanorama;
	exports.StereoVideoPanorama = StereoVideoPanorama;
	exports.THREE_REVISION = THREE_REVISION;
	exports.THREE_VERSION = THREE_VERSION;
	exports.TextureLoader = TextureLoader;
	exports.VERSION = VERSION;
	exports.VideoLittlePlanet = VideoLittlePlanet;
	exports.VideoPanorama = VideoPanorama;
	exports.Viewer = Viewer;
	exports.Widget = Widget;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFub2xlbnMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25zdGFudHMuanMiLCIuLi9zcmMvRGF0YUltYWdlLmpzIiwiLi4vc3JjL2xvYWRlcnMvSW1hZ2VMb2FkZXIuanMiLCIuLi9zcmMvbG9hZGVycy9UZXh0dXJlTG9hZGVyLmpzIiwiLi4vc3JjL2xvYWRlcnMvQ3ViZVRleHR1cmVMb2FkZXIuanMiLCIuLi9zcmMvYXV4aWxpYXJ5L01lZGlhLmpzIiwiLi4vc3JjL2F1eGlsaWFyeS9TdGVyZW8uanMiLCIuLi9zcmMvaW50ZXJmYWNlL1JldGljbGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvZGlzdC90d2Vlbi5lc20uanMiLCIuLi9zcmMvaW5mb3Nwb3QvSW5mb3Nwb3QuanMiLCIuLi9zcmMvd2lkZ2V0L1dpZGdldC5qcyIsIi4uL3NyYy9zaGFkZXJzL0VxdWlyZWN0U2hhZGVyLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL1Bhbm9yYW1hLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0ltYWdlUGFub3JhbWEuanMiLCIuLi9zcmMvcGFub3JhbWEvRW1wdHlQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9DdWJlUGFub3JhbWEuanMiLCIuLi9zcmMvcGFub3JhbWEvQmFzaWNQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9WaWRlb1Bhbm9yYW1hLmpzIiwiLi4vc3JjL2xvYWRlcnMvR29vZ2xlU3RyZWV0dmlld0xvYWRlci5qcyIsIi4uL3NyYy9wYW5vcmFtYS9Hb29nbGVTdHJlZXR2aWV3UGFub3JhbWEuanMiLCIuLi9zcmMvc2hhZGVycy9TdGVyZW9ncmFwaGljU2hhZGVyLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL0xpdHRsZVBsYW5ldC5qcyIsIi4uL3NyYy9wYW5vcmFtYS9JbWFnZUxpdHRsZVBsYW5ldC5qcyIsIi4uL3NyYy9wYW5vcmFtYS9WaWRlb0xpdHRsZVBsYW5ldC5qcyIsIi4uL3NyYy9wYW5vcmFtYS9DYW1lcmFQYW5vcmFtYS5qcyIsIi4uL3NyYy9wYW5vcmFtYS9TdGVyZW9JbWFnZVBhbm9yYW1hLmpzIiwiLi4vc3JjL3Bhbm9yYW1hL1N0ZXJlb1ZpZGVvUGFub3JhbWEuanMiLCIuLi9zcmMvbGliL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanMiLCIuLi9zcmMvbGliL2NvbnRyb2xzL0RldmljZU9yaWVudGF0aW9uQ29udHJvbHMuanMiLCIuLi9zcmMvbGliL2VmZmVjdHMvQ2FyZGJvYXJkRWZmZWN0LmpzIiwiLi4vc3JjL2xpYi9lZmZlY3RzL1N0ZXJlb0VmZmVjdC5qcyIsIi4uL3NyYy92aWV3ZXIvVmlld2VyLmpzIiwiLi4vc3JjL0NoZWNrLmpzIiwiLi4vc3JjL1Bhbm9sZW5zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZlcnNpb24sIGRldkRlcGVuZGVuY2llcyB9IGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5cbi8qKlxuICogUkVWSVNJT05cbiAqIEBtb2R1bGUgUkVWSVNJT05cbiAqIEBleGFtcGxlIFBBTk9MRU5TLlJFVklTSU9OXG4gKiBAdHlwZSB7c3RyaW5nfSByZXZpc2lvblxuICovXG5leHBvcnQgY29uc3QgUkVWSVNJT04gPSB2ZXJzaW9uLnNwbGl0KCAnLicgKVsgMSBdO1xuXG4vKipcbiAqIFZFUlNJT05cbiAqIEBtb2R1bGUgVkVSU0lPTlxuICogQGV4YW1wbGUgUEFOT0xFTlMuVkVSU0lPTlxuICogQHR5cGUge3N0cmluZ30gdmVyc2lvblxuICovXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IHZlcnNpb247XG5cbi8qKlxuICogVEhSRUVKUyBSRVZJU0lPTlxuICogQG1vZHVsZSBUSFJFRV9SRVZJU0lPTlxuICogQGV4YW1wbGUgUEFOT0xFTlMuVEhSRUVfUkVWSVNJT05cbiAqIEB0eXBlIHtzdHJpbmd9IHRocmVlanMgcmV2aXNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IFRIUkVFX1JFVklTSU9OID0gZGV2RGVwZW5kZW5jaWVzLnRocmVlLnNwbGl0KCAnLicgKVsgMSBdO1xuXG4vKipcbiAqIFRIUkVFSlMgVkVSU0lPTlxuICogQG1vZHVsZSBUSFJFRV9WRVJTSU9OXG4gKiBAZXhhbXBsZSBQQU5PTEVOUy5USFJFRV9WRVJTSU9OXG4gKiBAdHlwZSB7c3RyaW5nfSB0aHJlZWpzIHZlcnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IFRIUkVFX1ZFUlNJT04gPSBkZXZEZXBlbmRlbmNpZXMudGhyZWUucmVwbGFjZSggL1teMC05Ll0vZywgJycgKTtcblxuLyoqXG4gKiBDT05UUk9MU1xuICogQG1vZHVsZSBDT05UUk9MU1xuICogQGV4YW1wbGUgUEFOT0xFTlMuQ09OVFJPTFMuT1JCSVRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBPUkJJVCAwXG4gKiBAcHJvcGVydHkge251bWJlcn0gREVWSUNFT1JJRU5UQVRJT04gMVxuICovXG5leHBvcnQgY29uc3QgQ09OVFJPTFMgPSB7IE9SQklUOiAwLCBERVZJQ0VPUklFTlRBVElPTjogMSB9O1xuXG4vKipcbiAqIE1PREVTXG4gKiBAbW9kdWxlIE1PREVTXG4gKiBAZXhhbXBsZSBQQU5PTEVOUy5NT0RFUy5VTktOT1dOXG4gKiBAcHJvcGVydHkge251bWJlcn0gVU5LTk9XTiAwXG4gKiBAcHJvcGVydHkge251bWJlcn0gTk9STUFMIDFcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBDQVJEQk9BUkQgMlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFNURVJFTyAzXG4gKi9cbmV4cG9ydCBjb25zdCBNT0RFUyA9IHsgVU5LTk9XTjogMCwgTk9STUFMOiAxLCBDQVJEQk9BUkQ6IDIsIFNURVJFTzogMyB9O1xuXG4vKipcbiAqIFNURVJFT0ZPUk1BVFxuICogQG1vZHVsZSBTVEVSRU9GT1JNQVRcbiAqIEBleGFtcGxlIFBBTk9MRU5TLlNURVJFT0ZPUk1BVC5UQUJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBUQUIgMFxuICogQHByb3BlcnR5IHtudW1iZXJ9IFNCUyAxXG4gKi9cbmV4cG9ydCBjb25zdCBTVEVSRU9GT1JNQVQgPSB7IFRBQjogMCwgU0JTOiAxIH07IiwiLyoqXG4gKiBEYXRhIFVSSSBJbWFnZXNcbiAqIEBtb2R1bGUgRGF0YUltYWdlXG4gKiBAZXhhbXBsZSBQQU5PTEVOUy5EYXRhSW1hZ2UuSW5mb1xuICogQHByb3BlcnR5IHtzdHJpbmd9IEluZm8gSW5mb3JtYXRpb24gSWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IEFycm93IEFycm93IEljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBGdWxsc2NyZWVuRW50ZXIgRnVsbHNjcmVlbiBFbnRlciBJY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gRnVsbHNjcmVlbkxlYXZlIEZ1bGxzY3JlZW4gTGVhdmUgSWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IFZpZGVvUGxheSBWaWRlbyBQbGF5IEljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBWaWRlb1BhdXNlIFZpZGVvIFBhdXNlIEljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBXaGl0ZVRpbGUgV2hpdGUgVGlsZSBJY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU2V0dGluZyBTZXR0aW5ncyBJY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gQ2hldnJvblJpZ2h0IENoZXZyb24gUmlnaHQgSWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IENoZWNrIENoZWNrIEljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBWaWV3SW5kaWNhdG9yIFZpZXcgSW5kaWNhdG9yIEljb25cbiAqL1xuY29uc3QgRGF0YUltYWdlID0ge1xuICAgIEluZm86ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQUJJQUFBQVNBQkd5V3MrQUFBQUNYWndRV2NBQUFCQUFBQUFRQURxOC9oZ0FBQURCa2xFUVZSNDJ1MmJQMDhVUVJpSG56RmFTWUNJL3hva3NkQklxR3dJaVlXUlVCSVNFeHBDUTBlajM4RldPbWxJS0tob01QRWJhQ3hzcnJIaVlyUWdPU2xRRWFJQ3JUK0xIU1Baek56dDNzM2MzSG43bEh2THp2djgyTDJkbTMwWEtpb3FLZ1lZMDYyQkpGMEhwb0E3d0FSd0JiaHNQejREam9FRzhBbllOY1o4U3gxT3A4SVhKTTFLV3BkVVYzbnE5bTluSlYxSTdWTkdmRXpTTTBtTk5xUjlOT3d4eDFMN05STWZsYlFtNlNTZ2VKNFRPOFpvYXQrOC9MS2tnNGppZVE0a0xhZjJSdEt3cEowdWl1ZlprVFNjU241UzBsNUMrYi9zU1pyc3R2eU1wS1BVNXVjNGtqVFRqa3ZwZVlDa2FlQTEvKzdodmNJWk1HdU1xVVVMUU5JVThBYTRsdHJXd3lId3lCaXpHendBU1NQQWUrQjJhc3NXN0FIM2pURS9pK3hjWm9hMTJRZnkyQm8zaSs1Y0tBQmw5OXpGMUdZbFdGVEJlVUxMUzBEWnJPc0RjRE5nZ1RYZ2MyN2JMV0E2NEJoZmdIdkdtQjhkSFVYWjFETTBTNDV4bGlLTXM5YktyK2tsSU9rcXNCcnd2OUp0VnExRGV3RUFUNENoMUJZZE1HUWR5Z2VnN0RmNFNtcURBS3lveVhwQ3N6UGdJVENldXZvQWpGdVgwZ0U4amxqVWR2N2JDdGlPT0o3WHBkVVo4TC9nZFhIT0E1UXRZSDVOWFhWZ2JyZ1dXbjFud0ZUcWFpUGdkUElGY0RkMXRSRndPbDMwN0R3UnVaZ1h3THZjdGdmQTA0aGpPcDE4QWNSZVo2c1pZMTZlM3lEcFV1UXhuVTYrUzJBa2NqRXBjRHIxenhPWFNQZ0NLTFNhMG1jNG5Yd0IvRXBkYlFTY1RyNEFHcW1yallEVHlSZkF4OVRWUnNEcDVBdWc4TEp5SCtGMGNnWmc1OHoxMUJVSHBPNXJ1R2gyRzN5YnV1cUFlRjJhQmZBcWRkVUI4YnEwT2dQMlUxY2VnSDNhT1FPTU1iK0JyZFRWQjJETHVwUUx3TElPbktZMjZJQlQ2K0NsYVFER21PL0FSbXFMRHRpd0RuN0hWa2NZK0Vkak5vVGxDSSt0WWhPMmlVcHBtNkhLc2xQVXEycVFLSHBVZThBRnNqYVVYdVVRV0NncVh5b0FHOEl1TUUvV2tOUnJuQUh6WmZxRFNnZGdRNmdCYzJUZDNiM0NNVEJYdGtPc0l6VElqWkxuUWhqY1Z0bGNFSVBaTEowTG9WdnQ4cy9WYSszeXVTQUc4NFVKUnhCOThjcE05ZEpVUlVWRnhTRHpCeEtkZTRMazMvaDJBQUFBQUVsRlRrU3VRbUNDJywgXG4gICAgQXJyb3c6ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQUJJQUFBQVNBQkd5V3MrQUFBQUNYWndRV2NBQUFCQUFBQUFRQURxOC9oZ0FBQURQa2xFUVZSNDJ1MmJNVXNjUVJpRzMwL1NSYUpFSTFaS1VpUkVyTklFTFJVYlFZU0FuWDhocFZVZ2tEWXAwd2dXVmpZVytRY0phUXpZcExvakpJWGh0RERFS0JwajY1dGk1OGl4bWRtYjJadlo3K1QyQVVIdWRtZm1lWGYyYm5iM082Q21wcVptZ0pHcU9pSTVBV0FXd0VNQTB3RHVBcmh0M3I0Q2NBYWdCZUFiZ0lhSS9OUU9wMWZoSVpLTEpOK1NiREtjcHRsM2tlU1F0aytJK0JqSlZ5UmJKYVJkdEV5Ylk5cCtSZUtqSk4rUXZJd29udWZTOURHcTdadVhYeWQ1bkZBOHp6SEpkVzF2a0x4RGNyZEM4VHk3Sk85b3ljK1FQRkNVYjNOQWNxWnErVG1TcDlybUhaeVNuQ3ZqRXJ3T0lQa1V3SHY4K3c3dkY2NEFMSXJJZnJJQVNNNEMrQURnbnJhdGd4TUFDeUxTaUI0QXlSRUFud0U4MExic3dnR0FKeUp5NGJOeHlBcHI2d2JJdzR4eHkzZGpyd0NZZmVldWFac0ZzRWJQZFVMWFU0RFpxdXNMZ01rRUEyMVAwNUVFYmY4QThGaEV6b3MyOHBrQkx4TEtMNXMvci9NMWtFa3o5dktRSEdlYXRmMDV5Zm1PZnViTmE3RzVKRGxlNU5odEJqd0hNQno1eUZ3QVdCYVJUKzBYelA4cFpzS3djUWlIMmZYOFljb2piK2t6eFV3NFpKbjdDU1FYcXBSUEhNS0NxNytpWko3MU12ZHkvRGZ0WFNRNkhjSmRTRGFxUFBLVy9tUE9CTytsY2J2ekNVMzVSQ0ZNMlBwd25RS3paUWZkZ2ZlMGR4SDVkTEE2dVFKNHBDMmZJQVNya3l1QTZYNlFqeHlDMWNrVlFObjdiTkhsSTRaZ2RYSUZVT2JpSkpsOHBCQ3NUakdmdUl3QTJDdjRGTjd4Yllqa2pxc1JBSHVJZVBYb0NpREYxWmsyVmlkWEFMKzFSNXNBcTVNcmdKYjJhQk5nZFhJRjhGVjd0QW13T3JrQ0NGczczd3lzVHRZQVRIRkNVM3ZFRVdtNkNpNkt2Z1kvYW84NklrNlhvZ0RlYVk4NklrNlhialBnU0h2a0VUaEN3UXk0NVhwRFJLNUpiZ040R1drZ1V5UjlINjVNUlF4Z1cwU3VuWjVGZXpLN3Bmd2Q4ZThNVjhVZkFQZEY1SmRyZzhKckFiUGpwclpGRDJ3V3lRUDZqOFpTRXVmUm1HbGdROXVtQkJ2ZDVJT2diakZVS0x1K1huV0JoRytycHNGVlpHVW8vY29KZ0ZWZithQUFUQWdOQUN2SUNwTDZqU3NBS3lIMVFjRUJtQkQyQVN3aHErN3VGODRBTElWV2lQVUVCN2xRc2lPRXdTMlZ6UVV4bU1YU3VSQ3FLcGQvelg0cmw4OEZNWmcvbUxBRWNTTitNbFAvYUtxbXBxWm1rUGtMMGhTandPcE5LeHdBQUFBQVNVVk9SSzVDWUlJPScsXG4gICAgRnVsbHNjcmVlbkVudGVyOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCbWFXeHNQU0lqUmtaR1JrWkdJaUJvWldsbmFIUTlJakkwSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIZHBaSFJvUFNJeU5DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtJQ0FnSUR4d1lYUm9JR1E5SWswd0lEQm9NalIyTWpSSU1Ib2lJR1pwYkd3OUltNXZibVVpTHo0S0lDQWdJRHh3WVhSb0lHUTlJazAzSURFMFNEVjJOV2cxZGkweVNEZDJMVE42YlMweUxUUm9NbFkzYUROV05VZzFkalY2YlRFeUlEZG9MVE4yTW1nMWRpMDFhQzB5ZGpONlRURTBJRFYyTW1nemRqTm9NbFkxYUMwMWVpSXZQZ284TDNOMlp6ND0nLFxuICAgIEZ1bGxzY3JlZW5MZWF2ZTogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0OElVUlBRMVJaVUVVZ2MzWm5JRkJWUWt4SlF5QWlMUzh2VnpOREx5OUVWRVFnVTFaSElERXVNUzh2UlU0aUlDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OUhjbUZ3YUdsamN5OVRWa2N2TVM0eEwwUlVSQzl6ZG1jeE1TNWtkR1FpUGp4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUIzYVdSMGFEMGlNalFpSUdobGFXZG9kRDBpTWpRaUlIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSStQSEJoZEdnZ2MzUjViR1U5SW1acGJHdzZJMlptWmlJZ1pEMGlUVEUwTERFMFNERTVWakUyU0RFMlZqRTVTREUwVmpFMFRUVXNNVFJJTVRCV01UbElPRll4TmtnMVZqRTBUVGdzTlVneE1GWXhNRWcxVmpoSU9GWTFUVEU1TERoV01UQklNVFJXTlVneE5sWTRTREU1V2lJZ0x6NDhMM04yWno0PScsXG4gICAgVmlkZW9QbGF5OiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejQ4SVVSUFExUlpVRVVnYzNabklGQlZRa3hKUXlBaUxTOHZWek5ETHk5RVZFUWdVMVpISURFdU1TOHZSVTRpSUNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk5SGNtRndhR2xqY3k5VFZrY3ZNUzR4TDBSVVJDOXpkbWN4TVM1a2RHUWlQanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK1BIQmhkR2dnYzNSNWJHVTlJbVpwYkd3NkkyWm1aaUlnWkQwaVRUZ3NOUzR4TkZZeE9TNHhORXd4T1N3eE1pNHhORXc0TERVdU1UUmFJaUF2UGp3dmMzWm5QZz09JyxcbiAgICBWaWRlb1BhdXNlOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejQ4SVVSUFExUlpVRVVnYzNabklGQlZRa3hKUXlBaUxTOHZWek5ETHk5RVZFUWdVMVpISURFdU1TOHZSVTRpSUNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk5SGNtRndhR2xqY3k5VFZrY3ZNUzR4TDBSVVJDOXpkbWN4TVM1a2RHUWlQanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK1BIQmhkR2dnYzNSNWJHVTlJbVpwYkd3NkkyWm1aaUlnWkQwaVRURTBMREU1TGpFMFNERTRWalV1TVRSSU1UUk5OaXd4T1M0eE5FZ3hNRlkxTGpFMFNEWldNVGt1TVRSYUlpQXZQand2YzNablBnPT0nLFxuICAgIFdoaXRlVGlsZTogJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBZ0FBQUFJQUJBTUFBQUFHVnNuSkFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOQUFCNkpnQUFnSVFBQVBvQUFBQ0E2QUFBZFRBQUFPcGdBQUE2bUFBQUYzQ2N1bEU4QUFBQjFXbFVXSFJZVFV3NlkyOXRMbUZrYjJKbExuaHRjQUFBQUFBQVBIZzZlRzF3YldWMFlTQjRiV3h1Y3pwNFBTSmhaRzlpWlRwdWN6cHRaWFJoTHlJZ2VEcDRiWEIwYXowaVdFMVFJRU52Y21VZ05TNDBMakFpUGdvZ0lDQThjbVJtT2xKRVJpQjRiV3h1Y3pweVpHWTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1Rrdk1ESXZNakl0Y21SbUxYTjViblJoZUMxdWN5TWlQZ29nSUNBZ0lDQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlISmtaanBoWW05MWREMGlJZ29nSUNBZ0lDQWdJQ0FnSUNCNGJXeHVjenAwYVdabVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM1JwWm1Zdk1TNHdMeUkrQ2lBZ0lDQWdJQ0FnSUR4MGFXWm1Pa052YlhCeVpYTnphVzl1UGpFOEwzUnBabVk2UTI5dGNISmxjM05wYjI0K0NpQWdJQ0FnSUNBZ0lEeDBhV1ptT2s5eWFXVnVkR0YwYVc5dVBqRThMM1JwWm1ZNlQzSnBaVzUwWVhScGIyNCtDaUFnSUNBZ0lDQWdJRHgwYVdabU9sQm9iM1J2YldWMGNtbGpTVzUwWlhKd2NtVjBZWFJwYjI0K01qd3ZkR2xtWmpwUWFHOTBiMjFsZEhKcFkwbHVkR1Z5Y0hKbGRHRjBhVzl1UGdvZ0lDQWdJQ0E4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRLSUNBZ1BDOXlaR1k2VWtSR1BnbzhMM2c2ZUcxd2JXVjBZVDRLQXRpQUJRQUFBQ1JRVEZSRkFBQUFBQUFBQmdZR0J3Y0hIaDRlS3lzcng4Zkh5OHZMek16TTdPenNBQUFBQmdZRytxN1NaZ0FBQUFwMFVrNVRBUDcrL3Y3Ky92NysvaUp4L2E4QUFBT3dTVVJCVkhqYTdkMGhic05BRUFWUW82U0ZJNlhFY0FMRGNnTkx2VUJ2RUJRVmhwa1dWWVdsaFNzVkZTN3Q1UUlzaFJ0Njk1bEVBU1pQKzhjN2Exa3pETDFmeisvenl1dnpwNkZidm9kZHJMNnVEZDF5R1o1ZVhsZGViMThOM2ZJeDdBKzU4cHJtaG02NURmdkRjZDA5NTJsdTZKYWJGYkQvelZwclpqMWx6Y3lzK2ZqOXo4eFRadGJUOHJ2OHlXbHU2QllBSWdBQUFBQUFBQUFBQUFCQU02UVhFQUVBQUFBQUFBQUFnSjJnbmFBSWlJQTNRMnFBR2dBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVFKc0FEa1ZGQUFBQUFBQThCajBHUlVBRVJFQUVSRUFFUkVBRVJFQUVBQUFBQUFBQUFBQjJnbmFDSWlBQ1BwbFJBOVFBTlVBRVJBQUFBRVZRRVJRQkVSQ0JWbGZBY1ozYWVab2J1c1VLTUdCaFY2S1VFbEhHS0JFUkpSNi9meEV4UmtRWmw5L2xUOFMxb1ZzdWhxeVlNbVBLakNrenZmY0Nwc3hvaHJ3WTBRMDZFQUVBQUFBQUFBQUFBQUNnR2RJTGlBQUFBQUFBQUFBQXdFN1FUbEFFUk1DYklUVkFEUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBd0ttd1ExRVJBQUFBQUFDUFFZOUJFUkFCRVJBQkVSQUJFUkFCRVJBQkFBQUFBQUFBQUlDZG9KMmdDSWlBVDJiVUFEVkFEUkFCRVFBQVFCRlVCRVZBQkVSZ0V5dkFsSm0rVjRBcE02Yk1tREpqeW93cE02Yk1kTjBMbURLakdmSmlSRGZvUUFRQUFBQUFBQUFBQUFDQVprZ3ZJQUlBQUFBQUFBQUFBRHRCTzBFUkVBRnZodFFBTlFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFLZkNEa1ZGQUFBQUFBQThCajBHUlVBRVJFQUVSRUFFUkVBRVJFQUVBQUFBQUFBQUFBQjJnbmFDSWlBQ1BwbFJBOVFBTlVBRVJBQUFBRVZRRVJRQkVSQ0JUYXdBVTJiNlhnR216Smd5WThxTUtUT216Smd5MDNVdllNcU1ac2lMRWQyZ0F4RUFBQUFBQUFBQUFBQUFtaUc5Z0FnQUFBQUFBQUFBQU93RTdRUkZRQVM4R1ZJRDFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBSndLT3hRVkFRQUFBQUR3R1BRWUZBRVJFQUVSRUFFUkVBRVJFQUVSQUFBQUFBQUFBQURZQ2RvSmlvQUkrR1JHRFZBRDFBQVJFQUVBQUJSQlJWQUVSRUFFTnJFQ1RKbnBld1dZTW1QS2pDa3pwc3lZTW1QS1ROZTlnQ2t6bWlFdlJuU0REa1FBQUFBQUFBQUFBQUFBYUliMEFpSUFBQUFBQUFBQUFMQVR0Qk1VQVJId1prZ05VQU1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUhBcTdGQlVCQUFBQUFEQVk5QmpVQVJFUUFSRVFBUkVRQVJFUUFSRUFBQUFBQUFBQUFCZ0oyZ25LQUlpNEpNWk5VQU5VQU5FUUFRQUFGQUVGVUVSRUFFUjJNUUtNR1dtN3hWZ3lvd3BNNTBQV2VuOXVnTkdYejFYYW9jQUZnQUFBQUJKUlU1RXJrSmdnZz09JyxcbiAgICBTZXR0aW5nOiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFQUFBQUJBQ0FZQUFBQ3FhWEhlQUFBQUJtSkxSMFFBQUFBQUFBRDVRN3QvQUFBQUNYQklXWE1BQUFCSUFBQUFTQUJHeVdzK0FBQUFDWFp3UVdjQUFBQkFBQUFBUUFEcTgvaGdBQUFEbjBsRVFWUjQydTJielVzVlVSakdueU82Q1B6QU1uVGpwcEFvM0xUd0gxQ3FUZmF4YmVPaVJTMzdBMHdYdFJPRlZpMWFSQnMzTFdvaFNJR2JRQVFYVmlCR1JoRzBVSVJLVUNwSzdxL0ZuT0IydWM2Y09YTm1SbkdlM2VXK0g4Lzd6TGxuM3ZOeHBRb1ZLbFE0d2pCRkpBRk9TUnFYMU83b3NpdnB2akhtVTFuQ2hCWmdsdlNZTFlKYlMwRWFuQ3ZJSnpXSytnbnN5SDM0LzhPdU1hWWpiMjY1andDZ3o2TjRTV3Ezdm9kYkFFbW5TL0t0QkRnb0FneVU1QnRlQU9Ba01BUGNCcm9jN1Bza0RXZmdOK3d5RHdCZGx0TU1jREkzdFlCbmRlL3BIZUFSTU5URXJnZDRBUHp3ZVA4MzRvZU4xZE1rejVEbHNGTm4veXl2NGtkaVNLNEF0NEFPNENxd0dhRHdSbXphMkIwMjEwcU03WWhyWFU1OUFOQXE2Yldrd1FUVG41S081ZklFMHVWWWxYVGVHTE9YRk14MURyamxVTHdLS040MXg2RGxuSWpFRVFDY2tQUmUwb2tDaWd1SnI1TE9HR08reGhtNWpJQ0pRMWk4TE9lSkpLUFlFUUFNS3ZydHQ1WmRqU2YyRk0wRnEvc1pKSTJBNlVOY3ZDejM2VGlEZlVjQWNFMVNQdS9VNk1tOGsvVEZmdTZYZEZiNWlYM2RHUE04bFFmd05vZDMrVG93Qm5RM3lkZHR2MXZQSWUrYjFKSUJpd0VKMUlBSjIwOGs1VzIxdHJXQStWLzVDSEFjbUF0VS9BMlAvRGNDaVRBSEhFOHRnQ1ZoZ0x2QVhnWUNrMTdKby95VEdmTHVXZTdaZDcyQUM4Q1dCNG4zT0F6N21MeXROa1phYkFFWE1oZmVRS1lmV0VwSlpDeEEzckdVT1plQS9xREYxNUZwQXo0N0V2bE5rOW5lSTJlM2plV0N6MEJibXZpcE5rU01NWDhrdVNaWU04Wjh6eXFBamJIbWFONW1PZVlqZ0lYclU5M01XcnhIck5RanJxaURrUU1MSHdHK09kcUYzTk4zamVYS3pVOEFvRjFTemRIOFhLaEpVTzdIWkRYTE1id0F3SUNrSlVVTEZ4ZTBTYnFTVlFBYnczWGk3WmUwWkxtR0F6QUtiSHMwSkdVMVF0dkFhSWpDVzRCN1pPdkp5MnFGYTVhNzMwUlB0QmlhejBDZ25raVppNkY1ZkJaRFZNdmhvN0VoY3VTM3hKSjJoVjlJdXBnVHFhTHcwaGh6YWI4dnEyM3hPRy9yK0xEc0tqTGdZVnp4VW5VMGx0d0syd0RlelV5Sm1Fd3FYZ3AvUEw0cnZ4dGhhZUNTSSt6eHVBMTBKOFprV2RKTlNiMlNMa3ZheUtId0RSdTcxK1phanJHOTQxSjhhZ0FMRFEzR1UvYS9Jdk1rWUNQem1DYnRMTkVWbWFjTnRnczVpUDlmWVZORVYxUTZIZXo3eU5aU0wrSjJTYXJUY3BxaXlWMmlVa0cwSXZQRnZiejVGYkVuK0tFazN3TWp3TWVTZkNzQlhGQmRseTlDQVBrOXlkeWZmcEVDdUI1dFpmVkpqYUtXdWVPU2ZpbmxuNllLNGxhaFFvVUtSeGQvQWNSUEdUY1FDQVVRQUFBQUFFbEZUa1N1UW1DQycsXG4gICAgQ2hldnJvblJpZ2h0OiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejQ4SVVSUFExUlpVRVVnYzNabklGQlZRa3hKUXlBaUxTOHZWek5ETHk5RVZFUWdVMVpISURFdU1TOHZSVTRpSUNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk5SGNtRndhR2xqY3k5VFZrY3ZNUzR4TDBSVVJDOXpkbWN4TVM1a2RHUWlQanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK1BIQmhkR2dnWkQwaVRUZ3VOVGtzTVRZdU5UaE1NVE11TVRjc01USk1PQzQxT1N3M0xqUXhUREV3TERaTU1UWXNNVEpNTVRBc01UaE1PQzQxT1N3eE5pNDFPRm9pSUM4K1BDOXpkbWMrJyxcbiAgICBDaGVjazogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0OElVUlBRMVJaVUVVZ2MzWm5JRkJWUWt4SlF5QWlMUzh2VnpOREx5OUVWRVFnVTFaSElERXVNUzh2UlU0aUlDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OUhjbUZ3YUdsamN5OVRWa2N2TVM0eEwwUlVSQzl6ZG1jeE1TNWtkR1FpUGp4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJZ2RtVnljMmx2YmowaU1TNHhJaUIzYVdSMGFEMGlNalFpSUdobGFXZG9kRDBpTWpRaUlIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSStQSEJoZEdnZ1pEMGlUVEl4TERkTU9Td3hPVXd6TGpVc01UTXVOVXcwTGpreExERXlMakE1VERrc01UWXVNVGRNTVRrdU5Ua3NOUzQxT1V3eU1TdzNXaUlnTHo0OEwzTjJaejQ9JyxcbiAgICBWaWV3SW5kaWNhdG9yOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lQejRLUENGRVQwTlVXVkJGSUhOMlp5QlFWVUpNU1VNZ0lpMHZMMWN6UXk4dlJGUkVJRk5XUnlBeExqRXZMMFZPSWlBaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdlIzSmhjR2hwWTNNdlUxWkhMekV1TVM5RVZFUXZjM1puTVRFdVpIUmtJajRLUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIaHRiRzV6T25oc2FXNXJQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUwzaHNhVzVySWlCcFpEMGlkbWxsZHkxcGJtUnBZMkYwYjNJaUlHaGxhV2RvZEQwaU16QWlJSGRwWkhSb1BTSXpNQ0lnZG1sbGQwSnZlRDBpTFRJdU5TQXRNU0F6TUNBek1DSStDZ2s4YzNSNWJHVWdkSGx3WlQwaWRHVjRkQzlqYzNNaVBpNXpkREI3YzNSeWIydGxMWGRwWkhSb09qSTdjM1J5YjJ0bExXMXBkR1Z5YkdsdGFYUTZNVEE3Wm1sc2JEcHViMjVsTzMwdWMzUXhlM04wY205clpTMTNhV1IwYURvMk8zTjBjbTlyWlMxdGFYUmxjbXhwYldsME9qRXdPMzBLQ1R3dmMzUjViR1UrQ2drOFp6NEtDUWs4Y0dGMGFDQmpiR0Z6Y3owaWMzUXdJaUJrUFNKTklERXlMalVnTUNCQklERXlMalVnTVRJdU5TQXdJREFnTUNBdE1USXVOU0F3SUVFZ01USXVOU0F4TWk0MUlEQWdNQ0F3SURFeUxqVWdNQ0lnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTVN3d0xEQXNNU3d4TXl3eE5TNDFLU0krUEM5d1lYUm9QZ29KQ1R4d1lYUm9JR05zWVhOelBTSnpkRElpSUdROUlrMGdNVE1nTUNCTUlERXdJRElnVENBeE5pQXlJRm9pUGp3dmNHRjBhRDRLQ1FrOGNHRjBhQ0JqYkdGemN6MGljM1F5SWlCa1BTSk5JRElnTUNCQklESWdNaUF3SURBZ01DQXRNaUF3SUVFZ01pQXlJREFnTUNBd0lESWdNQ0lnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTVN3d0xEQXNNU3d4TXl3eE5TNDFLU0krUEM5d1lYUm9QZ29KQ1R4d1lYUm9JR05zWVhOelBTSnpkREVpSUdsa1BTSnBibVJwWTJGMGIzSWlJSFJ5WVc1elptOXliVDBpYldGMGNtbDRLREVzTUN3d0xERXNNVE1zTVRVdU5Ta2lQand2Y0dGMGFENEtDVHd2Wno0S1BDOXpkbWMrJ1xufTtcblxuZXhwb3J0IHsgRGF0YUltYWdlIH07IiwiaW1wb3J0IHsgRGF0YUltYWdlIH0gZnJvbSAnLi4vRGF0YUltYWdlLmpzJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAbW9kdWxlIEltYWdlTG9hZGVyXG4gKiBAZGVzY3JpcHRpb24gSW1hZ2UgbG9hZGVyIHdpdGggcHJvZ3Jlc3MgYmFzZWQgb24ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL2xvYWRlcnMvSW1hZ2VMb2FkZXIuanN9XG4gKi9cbmNvbnN0IEltYWdlTG9hZGVyID0ge1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBpbWFnZVxuICAgICAqIEBleGFtcGxlIFBBTk9MRU5TLkltYWdlTG9hZGVyLmxvYWQoIElNQUdFX1VSTCApXG4gICAgICogQG1ldGhvZCBsb2FkXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgIHVybCAgICAgICAgLSBBbiBpbWFnZSB1cmxcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Mb2FkICAgICAtIE9uIGxvYWQgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25Qcm9ncmVzcyAtIEluIHByb2dyZXNzIGNhbGxiYWNrXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IG9uRXJyb3IgICAgLSBPbiBlcnJvciBjYWxsYmFja1xuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uICggdXJsLCBvbkxvYWQgPSAoKSA9PiB7fSwgb25Qcm9ncmVzcyA9ICgpID0+IHt9LCBvbkVycm9yID0gKCkgPT4ge30gKSB7XG5cbiAgICAgICAgLy8gRW5hYmxlIGNhY2hlXG4gICAgICAgIFRIUkVFLkNhY2hlLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIGxldCBjYWNoZWQsIHJlcXVlc3QsIGFycmF5QnVmZmVyVmlldywgYmxvYiwgdXJsQ3JlYXRvciwgaW1hZ2UsIHJlZmVyZW5jZTtcblx0XG4gICAgICAgIC8vIFJlZmVyZW5jZSBrZXlcbiAgICAgICAgZm9yICggbGV0IGljb25OYW1lIGluIERhdGFJbWFnZSApIHtcblx0XG4gICAgICAgICAgICBpZiAoIERhdGFJbWFnZS5oYXNPd25Qcm9wZXJ0eSggaWNvbk5hbWUgKSAmJiB1cmwgPT09IERhdGFJbWFnZVsgaWNvbk5hbWUgXSApIHtcblx0XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlID0gaWNvbk5hbWU7XG5cdFxuICAgICAgICAgICAgfVxuXHRcbiAgICAgICAgfVxuXHRcbiAgICAgICAgLy8gQ2FjaGVkXG4gICAgICAgIGNhY2hlZCA9IFRIUkVFLkNhY2hlLmdldCggcmVmZXJlbmNlID8gcmVmZXJlbmNlIDogdXJsICk7XG5cdFxuICAgICAgICBpZiAoIGNhY2hlZCAhPT0gdW5kZWZpbmVkICkge1xuXHRcbiAgICAgICAgICAgIGlmICggb25Mb2FkICkge1xuXHRcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbiAoKSB7XG5cdFxuICAgICAgICAgICAgICAgICAgICBvblByb2dyZXNzKCB7IGxvYWRlZDogMSwgdG90YWw6IDEgfSApO1xuICAgICAgICAgICAgICAgICAgICBvbkxvYWQoIGNhY2hlZCApO1xuXHRcbiAgICAgICAgICAgICAgICB9LCAwICk7XG5cdFxuICAgICAgICAgICAgfVxuXHRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG5cdFxuICAgICAgICB9XG5cdFx0XG4gICAgICAgIC8vIENvbnN0cnVjdCBhIG5ldyBYTUxIdHRwUmVxdWVzdFxuICAgICAgICB1cmxDcmVhdG9yID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xuICAgICAgICBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAnaW1nJyApO1xuXHRcbiAgICAgICAgLy8gQWRkIHRvIGNhY2hlXG4gICAgICAgIFRIUkVFLkNhY2hlLmFkZCggcmVmZXJlbmNlID8gcmVmZXJlbmNlIDogdXJsLCBpbWFnZSApO1xuXHRcbiAgICAgICAgY29uc3Qgb25JbWFnZUxvYWRlZCA9ICgpID0+IHtcblx0XG4gICAgICAgICAgICB1cmxDcmVhdG9yLnJldm9rZU9iamVjdFVSTCggaW1hZ2Uuc3JjICk7XG4gICAgICAgICAgICBvbkxvYWQoIGltYWdlICk7XG5cdFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICggdXJsLmluZGV4T2YoICdkYXRhOicgKSA9PT0gMCApIHtcblxuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCBvbkltYWdlTG9hZGVkLCBmYWxzZSApO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgICAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgICAgICB9XG5cdFxuICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9IHRoaXMuY3Jvc3NPcmlnaW4gIT09IHVuZGVmaW5lZCA/IHRoaXMuY3Jvc3NPcmlnaW4gOiAnJztcblx0XG4gICAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub3BlbiggJ0dFVCcsIHVybCwgdHJ1ZSApO1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgb25FcnJvciApO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoICdwcm9ncmVzcycsIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgaWYgICggIWV2ZW50ICkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCB7IGxvYWRlZCwgdG90YWwsIGxlbmd0aENvbXB1dGFibGUgfSA9IGV2ZW50O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIGxlbmd0aENvbXB1dGFibGUgKSB7XG5cdFxuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MoIHsgbG9hZGVkLCB0b3RhbCB9ICk7XG5cdFxuICAgICAgICAgICAgfVxuXHRcbiAgICAgICAgfSApO1xuICAgICAgICBcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCAnbG9hZGVuZCcsIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgaWYgICggIWV2ZW50ICkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0OiB7IHJlc3BvbnNlIH0gfSA9IGV2ZW50O1xuXG4gICAgICAgICAgICBhcnJheUJ1ZmZlclZpZXcgPSBuZXcgVWludDhBcnJheSggcmVzcG9uc2UgKTtcbiAgICAgICAgICAgIGJsb2IgPSBuZXcgd2luZG93LkJsb2IoIFsgYXJyYXlCdWZmZXJWaWV3IF0gKTtcblx0XHRcdFx0XG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIG9uSW1hZ2VMb2FkZWQsIGZhbHNlICk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB1cmxDcmVhdG9yLmNyZWF0ZU9iamVjdFVSTCggYmxvYiApO1xuXHRcbiAgICAgICAgfSApO1xuXHRcbiAgICAgICAgcmVxdWVzdC5zZW5kKG51bGwpO1xuXHRcbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IEltYWdlTG9hZGVyIH07IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL0ltYWdlTG9hZGVyLmpzJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAbW9kdWxlIFRleHR1cmVMb2FkZXJcbiAqIEBkZXNjcmlwdGlvbiBUZXh0dXJlIGxvYWRlciBiYXNlZCBvbiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9zcmMvbG9hZGVycy9UZXh0dXJlTG9hZGVyLmpzfVxuICovXG5jb25zdCBUZXh0dXJlTG9hZGVyID0ge1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBpbWFnZSB0ZXh0dXJlXG4gICAgICogQGV4YW1wbGUgUEFOT0xFTlMuVGV4dHVyZUxvYWRlci5sb2FkKCBJTUFHRV9VUkwgKVxuICAgICAqIEBtZXRob2QgbG9hZFxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICB1cmwgICAgICAgIC0gQW4gaW1hZ2UgdXJsXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IG9uTG9hZCAgICAgLSBPbiBsb2FkIGNhbGxiYWNrXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259IG9uUHJvZ3Jlc3MgLSBJbiBwcm9ncmVzcyBjYWxsYmFja1xuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBvbkVycm9yICAgIC0gT24gZXJyb3IgY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtUSFJFRS5UZXh0dXJlfSAgIFx0IC0gSW1hZ2UgdGV4dHVyZVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uICggdXJsLCBvbkxvYWQgPSAoKSA9PiB7fSwgb25Qcm9ncmVzcywgb25FcnJvciApIHtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoKTsgXG5cbiAgICAgICAgSW1hZ2VMb2FkZXIubG9hZCggdXJsLCBmdW5jdGlvbiAoIGltYWdlICkge1xuXG4gICAgICAgICAgICB0ZXh0dXJlLmltYWdlID0gaW1hZ2U7XG5cbiAgICAgICAgICAgIC8vIEpQRUdzIGNhbid0IGhhdmUgYW4gYWxwaGEgY2hhbm5lbCwgc28gbWVtb3J5IGNhbiBiZSBzYXZlZCBieSBzdG9yaW5nIHRoZW0gYXMgUkdCLlxuICAgICAgICAgICAgY29uc3QgaXNKUEVHID0gdXJsLnNlYXJjaCggL1xcLihqcGd8anBlZykkLyApID4gMCB8fCB1cmwuc2VhcmNoKCAvXmRhdGFcXDppbWFnZVxcL2pwZWcvICkgPT09IDA7XG5cbiAgICAgICAgICAgIHRleHR1cmUuZm9ybWF0ID0gaXNKUEVHID8gVEhSRUUuUkdCRm9ybWF0IDogVEhSRUUuUkdCQUZvcm1hdDtcbiAgICAgICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBvbkxvYWQoIHRleHR1cmUgKTtcblxuICAgICAgICB9LCBvblByb2dyZXNzLCBvbkVycm9yICk7XG5cbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XG5cbiAgICB9XG5cbn07XG5cbmV4cG9ydCB7IFRleHR1cmVMb2FkZXIgfTsiLCJpbXBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vSW1hZ2VMb2FkZXIuanMnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBtb2R1bGUgQ3ViZVRleHR1cmVMb2FkZXJcbiAqIEBkZXNjcmlwdGlvbiBDdWJlIFRleHR1cmUgTG9hZGVyIGJhc2VkIG9uIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvbWFzdGVyL3NyYy9sb2FkZXJzL0N1YmVUZXh0dXJlTG9hZGVyLmpzfVxuICovXG5jb25zdCBDdWJlVGV4dHVyZUxvYWRlciA9IHtcblxuICAgIC8qKlxuICAgICAqIExvYWQgNiBpbWFnZXMgYXMgYSBjdWJlIHRleHR1cmVcbiAgICAgKiBAZXhhbXBsZSBQQU5PTEVOUy5DdWJlVGV4dHVyZUxvYWRlci5sb2FkKCBbICdweC5wbmcnLCAnbngucG5nJywgJ3B5LnBuZycsICdueS5wbmcnLCAncHoucG5nJywgJ256LnBuZycgXSApXG4gICAgICogQG1ldGhvZCBsb2FkXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgdXJscyAgICAgICAgLSBhcnJheSBvZiA2IHVybHMgdG8gaW1hZ2VzLCBvbmUgZm9yIGVhY2ggc2lkZSBvZiB0aGUgQ3ViZVRleHR1cmUuIFRoZSB1cmxzIHNob3VsZCBiZSBzcGVjaWZpZWQgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjogcG9zLXgsIG5lZy14LCBwb3MteSwgbmVnLXksIHBvcy16LCBuZWctelxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBvbkxvYWQgICAgIC0gT24gbG9hZCBjYWxsYmFja1xuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBvblByb2dyZXNzIC0gSW4gcHJvZ3Jlc3MgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gb25FcnJvciAgICAtIE9uIGVycm9yIGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7VEhSRUUuQ3ViZVRleHR1cmV9ICAgLSBDdWJlIHRleHR1cmVcbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbiAoIHVybHMsIG9uTG9hZCA9ICgpID0+IHt9LCBvblByb2dyZXNzID0gKCkgPT4ge30sIG9uRXJyb3IgKSB7XG5cblx0ICAgbGV0IHRleHR1cmUsIGxvYWRlZCwgcHJvZ3Jlc3MsIGFsbCwgbG9hZGluZ3M7XG5cblx0ICAgdGV4dHVyZSA9IG5ldyBUSFJFRS5DdWJlVGV4dHVyZSggW10gKTtcblxuXHQgICBsb2FkZWQgPSAwO1xuXHQgICBwcm9ncmVzcyA9IHt9O1xuXHQgICBhbGwgPSB7fTtcblxuXHQgICB1cmxzLm1hcCggZnVuY3Rpb24gKCB1cmwsIGluZGV4ICkge1xuXG5cdFx0ICAgSW1hZ2VMb2FkZXIubG9hZCggdXJsLCBmdW5jdGlvbiAoIGltYWdlICkge1xuXG5cdFx0XHQgICB0ZXh0dXJlLmltYWdlc1sgaW5kZXggXSA9IGltYWdlO1xuICBcblx0XHRcdCAgIGxvYWRlZCsrO1xuXG5cdFx0XHQgICBpZiAoIGxvYWRlZCA9PT0gNiApIHtcblxuXHRcdFx0XHQgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0XHQgICBvblByb2dyZXNzKCB7IGxvYWRlZCwgdG90YWw6IDYgfSApO1xuXHRcdFx0XHQgICBvbkxvYWQoIHRleHR1cmUgKTtcblxuXHRcdFx0ICAgfVxuXG5cdFx0ICAgfSwgZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdFx0ICAgcHJvZ3Jlc3NbIGluZGV4IF0gPSB7IGxvYWRlZDogZXZlbnQubG9hZGVkLCB0b3RhbDogZXZlbnQudG90YWwgfTtcblxuXHRcdFx0ICAgYWxsLmxvYWRlZCA9IDA7XG5cdFx0XHQgICBhbGwudG90YWwgPSAwO1xuXHRcdFx0ICAgbG9hZGluZ3MgPSAwO1xuXG5cdFx0XHQgICBmb3IgKCBsZXQgaSBpbiBwcm9ncmVzcyApIHtcblxuXHRcdFx0XHQgICBsb2FkaW5ncysrO1xuXHRcdFx0XHQgICBhbGwubG9hZGVkICs9IHByb2dyZXNzWyBpIF0ubG9hZGVkO1xuXHRcdFx0XHQgICBhbGwudG90YWwgKz0gcHJvZ3Jlc3NbIGkgXS50b3RhbDtcblxuXHRcdFx0ICAgfVxuXG5cdFx0XHQgICBpZiAoIGxvYWRpbmdzIDwgNiApIHtcblxuXHRcdFx0XHQgICBhbGwudG90YWwgPSBhbGwudG90YWwgLyBsb2FkaW5ncyAqIDY7XG5cblx0XHRcdCAgIH1cblxuXHRcdFx0ICAgb25Qcm9ncmVzcyggYWxsICk7XG5cblx0XHQgICB9LCBvbkVycm9yICk7XG5cblx0ICAgfSApO1xuXG5cdCAgIHJldHVybiB0ZXh0dXJlO1xuXG4gICAgfVxuXG59O1xuXG5leHBvcnQgeyBDdWJlVGV4dHVyZUxvYWRlciB9OyIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIFVzZXIgTWVkaWFcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtjb25zdHJhaW50cz17IHZpZGVvOiB7IHdpZHRoOiB7IGlkZWFsOiAxOTIwIH0sIGhlaWdodDogeyBpZGVhbDogMTA4MCB9LCBmYWNpbmdNb2RlOiB7IGV4YWN0OiAnZW52aXJvbm1lbnQnIH0gfSwgYXVkaW86IGZhbHNlIH1dXG4gKi9cbmZ1bmN0aW9uIE1lZGlhICggY29uc3RyYWludHMgKSB7XG5cbiAgICBjb25zdCBkZWZhdWx0Q29uc3RyYWludHMgPSB7IHZpZGVvOiB7IHdpZHRoOiB7IGlkZWFsOiAxOTIwIH0sIGhlaWdodDogeyBpZGVhbDogMTA4MCB9LCBmYWNpbmdNb2RlOiB7IGV4YWN0OiAnZW52aXJvbm1lbnQnIH0gfSwgYXVkaW86IGZhbHNlIH07XG5cbiAgICB0aGlzLmNvbnN0cmFpbnRzID0gT2JqZWN0LmFzc2lnbiggZGVmYXVsdENvbnN0cmFpbnRzLCBjb25zdHJhaW50cyApO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMuc2NlbmUgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5kZXZpY2VzID0gW107XG4gICAgdGhpcy5zdHJlYW0gPSBudWxsO1xuICAgIHRoaXMucmF0aW9TY2FsYXIgPSAxO1xuICAgIHRoaXMudmlkZW9EZXZpY2VJbmRleCA9IDA7XG5cbn07XG5cbk1lZGlhLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUgKSwge1xuXG4gICAgc2V0Q29udGFpbmVyOiBmdW5jdGlvbiAoIGNvbnRhaW5lciApIHtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgIH0sXG5cbiAgICBzZXRTY2VuZTogZnVuY3Rpb24gKCBzY2VuZSApIHtcblxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW51bWVyYXRlIGRldmljZXNcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBlbnVtZXJhdGVEZXZpY2VzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgZGV2aWNlcyA9IHRoaXMuZGV2aWNlcztcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gbmV3IFByb21pc2UoIHJlc29sdmUgPT4geyByZXNvbHZlKCBkZXZpY2VzICk7IH0gKTtcblxuICAgICAgICByZXR1cm4gZGV2aWNlcy5sZW5ndGggPiAwID8gcmVzb2x2ZWRQcm9taXNlIDogd2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN3aXRjaCB0byBuZXh0IGF2YWlsYWJsZSB2aWRlbyBkZXZpY2VcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzd2l0Y2hOZXh0VmlkZW9EZXZpY2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBzdG9wID0gdGhpcy5zdG9wLmJpbmQoIHRoaXMgKTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLnN0YXJ0LmJpbmQoIHRoaXMgKTtcbiAgICAgICAgY29uc3Qgc2V0VmlkZURldmljZUluZGV4ID0gdGhpcy5zZXRWaWRlRGV2aWNlSW5kZXguYmluZCggdGhpcyApO1xuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMudmlkZW9EZXZpY2VJbmRleDtcblxuICAgICAgICB0aGlzLmdldERldmljZXMoICd2aWRlbycgKVxuICAgICAgICAgICAgLnRoZW4oIGRldmljZXMgPT4ge1xuICAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPj0gZGV2aWNlcy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFZpZGVEZXZpY2VJbmRleCggMCApO1xuICAgICAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFZpZGVEZXZpY2VJbmRleCggaW5kZXggKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdGFydCggZGV2aWNlc1sgaW5kZXggXSApO1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH0gKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGV2aWNlc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gdHlwZSBrZXl3b3JkIHRvIG1hdGNoIGRldmljZS5raW5kXG4gICAgICogQG1lbWJlck9mIE1lZGlhXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZ2V0RGV2aWNlczogZnVuY3Rpb24gKCB0eXBlID0gJ3ZpZGVvJyApIHtcblxuICAgICAgICBjb25zdCBkZXZpY2VzID0gdGhpcy5kZXZpY2VzO1xuICAgICAgICBjb25zdCB2YWxpZGF0ZSA9IF9kZXZpY2VzID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIF9kZXZpY2VzLm1hcCggZGV2aWNlID0+IHsgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCAhZGV2aWNlcy5pbmNsdWRlcyggZGV2aWNlICkgKSB7IGRldmljZXMucHVzaCggZGV2aWNlICk7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlOyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IF9kZXZpY2VzID0+IHtcblxuICAgICAgICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCggdHlwZSwgJ2knICk7XG4gICAgICAgICAgICByZXR1cm4gX2RldmljZXMuZmlsdGVyKCBkZXZpY2UgPT4gcmVnLnRlc3QoIGRldmljZS5raW5kICkgKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVudW1lcmF0ZURldmljZXMoKVxuICAgICAgICAgICAgLnRoZW4oIHZhbGlkYXRlIClcbiAgICAgICAgICAgIC50aGVuKCBmaWx0ZXIgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBtZWRpYVxuICAgICAqIEBwYXJhbSB7TWVkaWFTdHJlYW1Db25zdHJhaW50c30gY29uc3RyYWludHNcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXRVc2VyTWVkaWE6IGZ1bmN0aW9uICggY29uc3RyYWludHMgKSB7XG5cbiAgICAgICAgY29uc3Qgc2V0TWVkaWFTdHJlYW0gPSB0aGlzLnNldE1lZGlhU3RyZWFtLmJpbmQoIHRoaXMgKTtcbiAgICAgICAgY29uc3QgcGxheVZpZGVvID0gdGhpcy5wbGF5VmlkZW8uYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCBvbkNhdGNoRXJyb3IgPSBlcnJvciA9PiB7IGNvbnNvbGUud2FybiggYFBBTk9MRU5TLk1lZGlhOiAke2Vycm9yfWAgKTsgfTtcblxuICAgICAgICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKCBjb25zdHJhaW50cyApXG4gICAgICAgICAgICAudGhlbiggc2V0TWVkaWFTdHJlYW0gKVxuICAgICAgICAgICAgLnRoZW4oIHBsYXlWaWRlbyApXG4gICAgICAgICAgICAuY2F0Y2goIG9uQ2F0Y2hFcnJvciApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCB2aWRlbyBkZXZpY2UgaW5kZXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQG1lbWJlck9mIE1lZGlhXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0VmlkZURldmljZUluZGV4OiBmdW5jdGlvbiAoIGluZGV4ICkge1xuXG4gICAgICAgIHRoaXMudmlkZW9EZXZpY2VJbmRleCA9IGluZGV4O1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHN0cmVhbWluZ1xuICAgICAqIEBwYXJhbSB7TWVkaWFEZXZpY2VJbmZvfSBbdGFyZ2V0RGV2aWNlXVxuICAgICAqIEBtZW1iZXJPZiBNZWRpYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiggdGFyZ2V0RGV2aWNlICkge1xuXG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gdGhpcy5jb25zdHJhaW50cztcbiAgICAgICAgY29uc3QgZ2V0VXNlck1lZGlhID0gdGhpcy5nZXRVc2VyTWVkaWEuYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCBvblZpZGVvRGV2aWNlcyA9IGRldmljZXMgPT4ge1xuXG4gICAgICAgICAgICBpZiAoICFkZXZpY2VzIHx8IGRldmljZXMubGVuZ3RoID09PSAwICkge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoICdubyB2aWRlbyBkZXZpY2UgZm91bmQnICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZGV2aWNlID0gdGFyZ2V0RGV2aWNlIHx8IGRldmljZXNbIDAgXTtcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gZGV2aWNlLmRldmljZUlkO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2V0VXNlck1lZGlhKCBjb25zdHJhaW50cyApO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5jcmVhdGVWaWRlb0VsZW1lbnQoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZXZpY2VzKCkudGhlbiggb25WaWRlb0RldmljZXMgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHN0cmVhbWluZ1xuICAgICAqIEBtZW1iZXJPZiBNZWRpYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBzdHJlYW0gPSB0aGlzLnN0cmVhbTtcblxuICAgICAgICBpZiAoIHN0cmVhbSAmJiBzdHJlYW0uYWN0aXZlICkge1xuXG4gICAgICAgICAgICBjb25zdCB0cmFjayA9IHN0cmVhbS5nZXRUcmFja3MoKVsgMCBdO1xuXG4gICAgICAgICAgICB0cmFjay5zdG9wKCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtID0gbnVsbDtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IG1lZGlhIHN0cmVhbVxuICAgICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IHN0cmVhbSBcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRNZWRpYVN0cmVhbTogZnVuY3Rpb24gKCBzdHJlYW0gKSB7XG5cbiAgICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIHRoaXMuZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XG5cbiAgICAgICAgaWYgKCB0aGlzLnNjZW5lICkge1xuXG4gICAgICAgICAgICB0aGlzLnNjZW5lLmJhY2tncm91bmQgPSB0aGlzLmNyZWF0ZVZpZGVvVGV4dHVyZSgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKCB0aGlzICkgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQbGF5IHZpZGVvIGVsZW1lbnRcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBwbGF5VmlkZW86IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB7IGVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBlbGVtZW50ICkge1xuXG4gICAgICAgICAgICBlbGVtZW50LnBsYXkoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGxheScgfSApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQYXVzZSB2aWRlbyBlbGVtZW50XG4gICAgICogQG1lbWJlck9mIE1lZGlhXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcGF1c2VWaWRlbzogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHsgZWxlbWVudCB9ID0gdGhpcztcblxuICAgICAgICBpZiAoIGVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGF1c2UnIH0gKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHZpZGVvIHRleHR1cmVcbiAgICAgKiBAbWVtYmVyT2YgTWVkaWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7VEhSRUUuVmlkZW9UZXh0dXJlfVxuICAgICAqL1xuICAgIGNyZWF0ZVZpZGVvVGV4dHVyZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5lbGVtZW50O1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlZpZGVvVGV4dHVyZSggdmlkZW8gKTtcblxuICAgICAgICB0ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuICAgICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG4gICAgICAgIHRleHR1cmUuZm9ybWF0ID0gVEhSRUUuUkdCRm9ybWF0O1xuICAgICAgICB0ZXh0dXJlLmNlbnRlci5zZXQoIDAuNSwgMC41ICk7XG5cbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lciggJ2NhbnBsYXknLCB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB2aWRlbyBlbGVtZW50XG4gICAgICogQG1lbWJlck9mIE1lZGlhXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge0hUTUxWaWRlb0VsZW1lbnR9XG4gICAgICogQGZpcmVzIE1lZGlhI2NhbnBsYXlcbiAgICAgKi9cbiAgICBjcmVhdGVWaWRlb0VsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IGRpc3BhdGNoRXZlbnQgPSB0aGlzLmRpc3BhdGNoRXZlbnQuYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICd2aWRlbycgKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVmlkZW8gY2FuIHBsYXkgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IE1lZGlhI2NhbnBsYXlcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGNhblBsYXkgPSAoKSA9PiBkaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdjYW5wbGF5JyB9ICk7XG4gICAgICAgIFxuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoICdhdXRvcGxheScsICcnICk7XG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSggJ211dGVkJywgJycgKTtcbiAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKCAncGxheXNpbmxpbmUnLCAnJyApO1xuXG4gICAgICAgIHZpZGVvLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdmlkZW8uc3R5bGUudG9wID0gJzAnO1xuICAgICAgICB2aWRlby5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgICB2aWRlby5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICB2aWRlby5zdHlsZS5vYmplY3RQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgICAgICB2aWRlby5zdHlsZS5vYmplY3RGaXQgPSAnY292ZXInO1xuICAgICAgICB2aWRlby5zdHlsZS5kaXNwbGF5ID0gdGhpcy5zY2VuZSA/ICdub25lJyA6ICcnO1xuXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoICdjYW5wbGF5JywgY2FuUGxheSApO1xuXG4gICAgICAgIHJldHVybiB2aWRlbztcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPbiB3aW5kb3cgcmVzaXplIGV2ZW50XG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG4gICAgICogQG1lbWJlck9mIE1lZGlhXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25XaW5kb3dSZXNpemU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIHRoaXMuZWxlbWVudCAmJiB0aGlzLmVsZW1lbnQudmlkZW9XaWR0aCAmJiB0aGlzLmVsZW1lbnQudmlkZW9IZWlnaHQgJiYgdGhpcy5zY2VuZSApIHtcblxuICAgICAgICAgICAgY29uc3QgeyBjbGllbnRXaWR0aDogd2lkdGgsIGNsaWVudEhlaWdodDogaGVpZ2h0IH0gPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmUgPSB0aGlzLnNjZW5lLmJhY2tncm91bmQ7XG4gICAgICAgICAgICBjb25zdCB7IHZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0IH0gPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjYW1lcmFSYXRpbyA9IHZpZGVvSGVpZ2h0IC8gdmlkZW9XaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdwb3J0UmF0aW8gPSB0aGlzLmNvbnRhaW5lciA/IHdpZHRoIC8gaGVpZ2h0IDogMS4wO1xuICAgICAgICAgICAgY29uc3QgcmF0aW8gPSBjYW1lcmFSYXRpbyAqIHZpZXdwb3J0UmF0aW8gKiB0aGlzLnJhdGlvU2NhbGFyO1xuXG4gICAgICAgICAgICBpZiAoIHdpZHRoID4gaGVpZ2h0ICkge1xuICAgICAgICAgICAgICAgIHRleHR1cmUucmVwZWF0LnNldCggcmF0aW8sIDEgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGV4dHVyZS5yZXBlYXQuc2V0KCAxLCAxIC8gcmF0aW8gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0gKTtcblxuZXhwb3J0IHsgTWVkaWEgfTsiLCJpbXBvcnQgeyBTVEVSRU9GT1JNQVQgfSBmcm9tICcuLi9Db25zdGFudHMnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgU3RlcmVvIE1peGluIC0gZm9ybWF0IGJhc2VkIG9uIHtAbGluayBodHRwczovL29wdGljYWxmbG93LndvcmRwcmVzcy5jb20vMjAxMC8wOS8xOS9zaWRlLWJ5LXNpZGUtdmVyc3VzLXRvcC1hbmQtYm90dG9tLTNkLWZvcm1hdHMvfSB3aWxsIGJlIGRldGVybWluZWQgYnkgaW1hZ2Ugd2lkdGg6aGVpZ2h0IHJhdGlvIChUQUIgaXMgMToxLCBTQlMgaXMgNDoxKVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gW2V5ZVNlcD0wLjA2NF0gLSBleWUgc2VwYXJhdGlvbiBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiBTdGVyZW8gKCBleWVTZXAgPSAwLjA2NCApe1xuXG4gICAgdGhpcy5mb3JtYXQgPSBudWxsO1xuICAgIHRoaXMuZXllU2VwID0gZXllU2VwO1xuXG4gICAgdGhpcy5sb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICB0aGlzLnJvZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG59XG5cbk9iamVjdC5hc3NpZ24oIFN0ZXJlby5wcm90b3R5cGUsIHtcblxuICAgIGNvbnN0cnVjdG9yOiBTdGVyZW8sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdW5pZnJvbXMgYnkgc3RlcmVvIGZvcm1hdFxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gZm9ybWF0IC0geyBAc2VlIFNURVJFT0ZPUk1BVCB9XG4gICAgICogQHBhcmFtIHtvYmplY3R9IHVuaWZvcm1zXG4gICAgICovXG4gICAgdXBkYXRlVW5pZm9ybUJ5Rm9ybWF0OiBmdW5jdGlvbiggZm9ybWF0LCB1bmlmb3JtcyApIHtcblxuICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcblxuICAgICAgICBjb25zdCByZXBlYXQgPSB1bmlmb3Jtcy5yZXBlYXQudmFsdWU7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHVuaWZvcm1zLm9mZnNldC52YWx1ZTtcbiAgICAgICAgY29uc3QgbG9mZnNldCA9IHRoaXMubG9mZnNldDtcbiAgICAgICAgY29uc3Qgcm9mZnNldCA9IHRoaXMucm9mZnNldDtcblxuICAgICAgICBzd2l0Y2ggKCBmb3JtYXQgKSB7XG5cbiAgICAgICAgY2FzZSBTVEVSRU9GT1JNQVQuVEFCOlxuICAgICAgICAgICAgcmVwZWF0LnNldCggMS4wLCAwLjUgKTtcbiAgICAgICAgICAgIG9mZnNldC5zZXQoIDAuMCwgMC41ICk7XG4gICAgICAgICAgICBsb2Zmc2V0LnNldCggMC4wLCAwLjUgKTtcbiAgICAgICAgICAgIHJvZmZzZXQuc2V0KCAwLjAsIDAuMCApO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBTVEVSRU9GT1JNQVQuU0JTOlxuICAgICAgICAgICAgcmVwZWF0LnNldCggMC41LCAxLjAgKTtcbiAgICAgICAgICAgIG9mZnNldC5zZXQoIDAuMCwgMC4wICk7XG4gICAgICAgICAgICBsb2Zmc2V0LnNldCggMC4wLCAwLjAgKTtcbiAgICAgICAgICAgIHJvZmZzZXQuc2V0KCAwLjUsIDAuMCApO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDogYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBUZXh0dXJlIGZvciBTdGVyZW8gTGVmdCBFeWVcbiAgICAgKi9cbiAgICB1cGRhdGVUZXh0dXJlVG9MZWZ0OiBmdW5jdGlvbiggb2Zmc2V0ICkge1xuXG4gICAgICAgIG9mZnNldC5jb3B5KCB0aGlzLmxvZmZzZXQgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgVGV4dHVyZSBmb3IgU3RlcmVvIFJpZ2h0IEV5ZVxuICAgICAqL1xuICAgIHVwZGF0ZVRleHR1cmVUb1JpZ2h0OiBmdW5jdGlvbiggb2Zmc2V0ICkge1xuXG4gICAgICAgIG9mZnNldC5jb3B5KCB0aGlzLnJvZmZzZXQgKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBTdGVyZW8gfTsiLCJcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIFJldGljbGUgM0QgU3ByaXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VEhSRUUuQ29sb3J9IFtjb2xvcj0weGZmZmZmZl0gLSBDb2xvciBvZiB0aGUgcmV0aWNsZSBzcHJpdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2F1dG9TZWxlY3Q9dHJ1ZV0gLSBBdXRvIHNlbGVjdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IFtkd2VsbFRpbWU9MTUwMF0gLSBEdXJhdGlvbiBmb3IgZHdlbGxpbmcgc2VxdWVuY2UgdG8gY29tcGxldGVcbiAqL1xuXG5mdW5jdGlvbiBSZXRpY2xlICggY29sb3IgPSAweGZmZmZmZiwgYXV0b1NlbGVjdCA9IHRydWUsIGR3ZWxsVGltZSA9IDE1MDAgKSB7XG5cbiAgICB0aGlzLmRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuXG4gICAgY29uc3QgeyBjYW52YXMsIGNvbnRleHQgfSA9IHRoaXMuY3JlYXRlQ2FudmFzKCk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU3ByaXRlTWF0ZXJpYWwoIHsgY29sb3IsIG1hcDogdGhpcy5jcmVhdGVDYW52YXNUZXh0dXJlKCBjYW52YXMgKSB9ICk7XG5cbiAgICBUSFJFRS5TcHJpdGUuY2FsbCggdGhpcywgbWF0ZXJpYWwgKTtcblxuICAgIHRoaXMuY2FudmFzV2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgdGhpcy5jYW52YXNIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yIGluc3RhbmNlb2YgVEhSRUUuQ29sb3IgPyBjb2xvciA6IG5ldyBUSFJFRS5Db2xvciggY29sb3IgKTsgICAgXG5cbiAgICB0aGlzLmF1dG9TZWxlY3QgPSBhdXRvU2VsZWN0O1xuICAgIHRoaXMuZHdlbGxUaW1lID0gZHdlbGxUaW1lO1xuICAgIHRoaXMucmlwcGxlRHVyYXRpb24gPSA1MDA7XG4gICAgdGhpcy5wb3NpdGlvbi56ID0gLTEwO1xuICAgIHRoaXMuY2VudGVyLnNldCggMC41LCAwLjUgKTtcbiAgICB0aGlzLnNjYWxlLnNldCggMC41LCAwLjUsIDEgKTtcblxuICAgIHRoaXMuc3RhcnRUaW1lc3RhbXAgPSBudWxsO1xuICAgIHRoaXMudGltZXJJZCA9IG51bGw7XG4gICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XG5cbiAgICB0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuICAgIHRoaXMudXBkYXRlQ2FudmFzQXJjQnlQcm9ncmVzcyggMCApO1xuXG59O1xuXG5SZXRpY2xlLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLlNwcml0ZS5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IFJldGljbGUsXG5cbiAgICAvKipcbiAgICAgKiBTZXQgbWF0ZXJpYWwgY29sb3JcbiAgICAgKiBAcGFyYW0ge1RIUkVFLkNvbG9yfSBjb2xvciBcbiAgICAgKiBAbWVtYmVyT2YgUmV0aWNsZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNldENvbG9yOiBmdW5jdGlvbiAoIGNvbG9yICkge1xuXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY29sb3IuY29weSggY29sb3IgaW5zdGFuY2VvZiBUSFJFRS5Db2xvciA/IGNvbG9yIDogbmV3IFRIUkVFLkNvbG9yKCBjb2xvciApICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGNhbnZhcyB0ZXh0dXJlXG4gICAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzIFxuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge1RIUkVFLkNhbnZhc1RleHR1cmV9XG4gICAgICovXG4gICAgY3JlYXRlQ2FudmFzVGV4dHVyZTogZnVuY3Rpb24gKCBjYW52YXMgKSB7XG5cbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5DYW52YXNUZXh0dXJlKCBjYW52YXMgKTtcbiAgICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG4gICAgICAgIHRleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB0ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBjYW52YXMgZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge29iamVjdH0gb2JqZWN0XG4gICAgICogQHJldHVybnMge0hUTUxDYW52YXNFbGVtZW50fSBvYmplY3QuY2FudmFzXG4gICAgICogQHJldHVybnMge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gb2JqZWN0LmNvbnRleHRcbiAgICAgKi9cbiAgICBjcmVhdGVDYW52YXM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IDMyO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSAzMjtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG4gICAgICAgIGNvbnN0IGRwciA9IHRoaXMuZHByO1xuXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoICogZHByO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogZHByO1xuICAgICAgICBjb250ZXh0LnNjYWxlKCBkcHIsIGRwciApO1xuXG4gICAgICAgIGNvbnRleHQuc2hhZG93Qmx1ciA9IDU7XG4gICAgICAgIGNvbnRleHQuc2hhZG93Q29sb3IgPSAncmdiYSgyMDAsMjAwLDIwMCwwLjkpJztcblxuICAgICAgICByZXR1cm4geyBjYW52YXMsIGNvbnRleHQgfTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY2FudmFzIGFyYyBieSBwcm9ncmVzc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9ncmVzcyBcbiAgICAgKiBAbWVtYmVyT2YgUmV0aWNsZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZUNhbnZhc0FyY0J5UHJvZ3Jlc3M6IGZ1bmN0aW9uICggcHJvZ3Jlc3MgKSB7XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCBtYXRlcmlhbCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgZHByID0gdGhpcy5kcHI7XG4gICAgICAgIGNvbnN0IGRlZ3JlZSA9IHByb2dyZXNzICogTWF0aC5QSSAqIDI7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvci5nZXRTdHlsZSgpO1xuICAgICAgICBjb25zdCB4ID0gY2FudmFzV2lkdGggKiAwLjUgLyBkcHI7XG4gICAgICAgIGNvbnN0IHkgPSBjYW52YXNIZWlnaHQgKiAwLjUgLyBkcHI7XG4gICAgICAgIGNvbnN0IGxpbmVXaWR0aCA9IDM7XG4gICAgICAgIFxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCggMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCApO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGlmICggcHJvZ3Jlc3MgPT09IDAgKSB7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyggeCwgeSwgY2FudmFzV2lkdGggLyAxNiwgMCwgMiAqIE1hdGguUEkgKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKCB4LCB5LCBjYW52YXNXaWR0aCAvIDQgLSBsaW5lV2lkdGgsIC1NYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAyICsgZGVncmVlICk7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIG1hdGVyaWFsLm1hcC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmlwcGxlIGVmZmVjdFxuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFJldGljbGUjcmV0aWNsZS1yaXBwbGUtc3RhcnRcbiAgICAgKiBAZmlyZXMgUmV0aWNsZSNyZXRpY2xlLXJpcHBsZS1lbmRcbiAgICAgKi9cbiAgICByaXBwbGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCB7IGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIG1hdGVyaWFsIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMucmlwcGxlRHVyYXRpb247XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3I7XG4gICAgICAgIGNvbnN0IGRwciA9IHRoaXMuZHByO1xuICAgICAgICBjb25zdCB4ID0gY2FudmFzV2lkdGggKiAwLjUgLyBkcHI7XG4gICAgICAgIGNvbnN0IHkgPSBjYW52YXNIZWlnaHQgKiAwLjUgLyBkcHI7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCB0aW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggdXBkYXRlICk7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gcGVyZm9ybWFuY2Uubm93KCkgLSB0aW1lc3RhbXA7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IGVsYXBzZWQgLyBkdXJhdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAxLjAgLSBwcm9ncmVzcyA+IDAgPyAxLjAgLSBwcm9ncmVzcyA6IDA7XG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPSBwcm9ncmVzcyAqIGNhbnZhc1dpZHRoICogMC41IC8gZHByO1xuXG4gICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCggMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCApO1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKCB4LCB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAyICk7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7Y29sb3IuciAqIDI1NX0sICR7Y29sb3IuZyAqIDI1NX0sICR7Y29sb3IuYiAqIDI1NX0sICR7b3BhY2l0eX0pYDtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgICAgaWYgKCBwcm9ncmVzcyA+PSAxLjAgKSB7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRpbWVySWQgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhc0FyY0J5UHJvZ3Jlc3MoIDAgKTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJldGljbGUgcmlwcGxlIGVuZCBldmVudFxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgICAgICogQGV2ZW50IFJldGljbGUjcmV0aWNsZS1yaXBwbGUtZW5kXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdyZXRpY2xlLXJpcHBsZS1lbmQnIH0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYXRlcmlhbC5tYXAubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldGljbGUgcmlwcGxlIHN0YXJ0IGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBSZXRpY2xlI3JldGljbGUtcmlwcGxlLXN0YXJ0XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3JldGljbGUtcmlwcGxlLXN0YXJ0JyB9ICk7XG5cbiAgICAgICAgdXBkYXRlKCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWFrZSByZXRpY2xlIHZpc2libGVcbiAgICAgKiBAbWVtYmVyT2YgUmV0aWNsZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ha2UgcmV0aWNsZSBpbnZpc2libGVcbiAgICAgKiBAbWVtYmVyT2YgUmV0aWNsZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBkd2VsbGluZ1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFxuICAgICAqIEBtZW1iZXJPZiBSZXRpY2xlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFJldGljbGUjcmV0aWNsZS1zdGFydFxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG4gICAgICAgIGlmICggIXRoaXMuYXV0b1NlbGVjdCApIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0aWNsZSBzdGFydCBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgUmV0aWNsZSNyZXRpY2xlLXN0YXJ0XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3JldGljbGUtc3RhcnQnIH0gKTtcblxuICAgICAgICB0aGlzLnN0YXJ0VGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmQgZHdlbGxpbmdcbiAgICAgKiBAbWVtYmVyT2YgUmV0aWNsZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBSZXRpY2xlI3JldGljbGUtZW5kXG4gICAgICovXG4gICAgZW5kOiBmdW5jdGlvbigpe1xuXG4gICAgICAgIGlmICggIXRoaXMuc3RhcnRUaW1lc3RhbXAgKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSggdGhpcy50aW1lcklkICk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNBcmNCeVByb2dyZXNzKCAwICk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLnRpbWVySWQgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZXN0YW1wID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0aWNsZSBlbmQgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IFJldGljbGUjcmV0aWNsZS1lbmRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncmV0aWNsZS1lbmQnIH0gKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgZHdlbGxpbmdcbiAgICAgKiBAbWVtYmVyT2YgUmV0aWNsZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBSZXRpY2xlI3JldGljbGUtdXBkYXRlXG4gICAgICovXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy50aW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy51cGRhdGUuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5zdGFydFRpbWVzdGFtcDtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBlbGFwc2VkIC8gdGhpcy5kd2VsbFRpbWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNBcmNCeVByb2dyZXNzKCBwcm9ncmVzcyApO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXRpY2xlIHVwZGF0ZSBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgUmV0aWNsZSNyZXRpY2xlLXVwZGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdyZXRpY2xlLXVwZGF0ZScsIHByb2dyZXNzIH0gKTtcblxuICAgICAgICBpZiAoIHByb2dyZXNzID49IDEuMCApIHtcblxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKCB0aGlzLnRpbWVySWQgKTtcbiAgICAgICAgICAgIGlmICggdGhpcy5jYWxsYmFjayApIHsgdGhpcy5jYWxsYmFjaygpOyB9XG4gICAgICAgICAgICB0aGlzLmVuZCgpO1xuICAgICAgICAgICAgdGhpcy5yaXBwbGUoKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0gKTtcblxuZXhwb3J0IHsgUmV0aWNsZSB9OyIsInZhciB2ZXJzaW9uID0gJzE4LjUuMCc7XG5cbi8qKlxuICogVHdlZW4uanMgLSBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXG4gKi9cblxuXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl90d2VlbnMgPSB7fTtcblx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcbn07XG5cbl9Hcm91cC5wcm90b3R5cGUgPSB7XG5cdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRyZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXTtcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV07XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xuXG5cdFx0dmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcblxuXHRcdGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xuXG5cdFx0Ly8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhblxuXHRcdC8vIHVwZGF0ZSwgdGhlbiB0aGUgbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC5cblx0XHQvLyBIb3dldmVyLCBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLFxuXHRcdC8vIHRoZW4gaXQgd2lsbCBub3QgYmUgdXBkYXRlZC5cblx0XHR3aGlsZSAodHdlZW5JZHMubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0d2Vlbklkcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdHZhciB0d2VlbiA9IHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cblx0XHRcdFx0aWYgKHR3ZWVuICYmIHR3ZWVuLnVwZGF0ZSh0aW1lKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHR0d2Vlbi5faXNQbGF5aW5nID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIXByZXNlcnZlKSB7XG5cdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fVxufTtcblxudmFyIFRXRUVOID0gbmV3IF9Hcm91cCgpO1xuXG5UV0VFTi5Hcm91cCA9IF9Hcm91cDtcblRXRUVOLl9uZXh0SWQgPSAwO1xuVFdFRU4ubmV4dElkID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gVFdFRU4uX25leHRJZCsrO1xufTtcblxuXG4vLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsLlxuLy8gSW4gbm9kZS5qcywgdXNlIHByb2Nlc3MuaHJ0aW1lLlxuaWYgKHR5cGVvZiAoc2VsZikgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiAocHJvY2VzcykgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuaHJ0aW1lKSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xuXHR9O1xufVxuLy8gSW4gYSBicm93c2VyLCB1c2Ugc2VsZi5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAodHlwZW9mIChzZWxmKSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgIHNlbGYucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdCBzZWxmLnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XG5cdC8vIFRoaXMgbXVzdCBiZSBib3VuZCwgYmVjYXVzZSBkaXJlY3RseSBhc3NpZ25pbmcgdGhpcyBmdW5jdGlvblxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXG5cdFRXRUVOLm5vdyA9IHNlbGYucGVyZm9ybWFuY2Uubm93LmJpbmQoc2VsZi5wZXJmb3JtYW5jZSk7XG59XG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHRUV0VFTi5ub3cgPSBEYXRlLm5vdztcbn1cbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXG5lbHNlIHtcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcbn1cblxuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XG5cdHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG5cdHRoaXMuX3BhdXNlU3RhcnQgPSBudWxsO1xuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0ID0ge307XG5cdHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xuXHR0aGlzLl9kdXJhdGlvbiA9IDEwMDA7XG5cdHRoaXMuX3JlcGVhdCA9IDA7XG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcblx0dGhpcy5feW95byA9IGZhbHNlO1xuXHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcblx0dGhpcy5fZGVsYXlUaW1lID0gMDtcblx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XG5cdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRXRUVOLkludGVycG9sYXRpb24uTGluZWFyO1xuXHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vblJlcGVhdENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9ncm91cCA9IGdyb3VwIHx8IFRXRUVOO1xuXHR0aGlzLl9pZCA9IFRXRUVOLm5leHRJZCgpO1xuXG59O1xuXG5UV0VFTi5Ud2Vlbi5wcm90b3R5cGUgPSB7XG5cdGdldElkOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xuXHR9LFxuXG5cdGlzUGxheWluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG5cdH0sXG5cblx0aXNQYXVzZWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5faXNQYXVzZWQ7XG5cdH0sXG5cblx0dG86IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xuXG5cdFx0dGhpcy5fdmFsdWVzRW5kID0gT2JqZWN0LmNyZWF0ZShwcm9wZXJ0aWVzKTtcblxuXHRcdGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKGQpIHtcblx0XHR0aGlzLl9kdXJhdGlvbiA9IGQ7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0c3RhcnQ6IGZ1bmN0aW9uICh0aW1lKSB7XG5cblx0XHR0aGlzLl9ncm91cC5hZGQodGhpcyk7XG5cblx0XHR0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xuXG5cdFx0dGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XG5cdFx0dGhpcy5fc3RhcnRUaW1lICs9IHRoaXMuX2RlbGF5VGltZTtcblxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxuXHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XG5cdFx0XHRpZiAodGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTYXZlIHRoZSBzdGFydGluZyB2YWx1ZSwgYnV0IG9ubHkgb25jZS5cblx0XHRcdGlmICh0eXBlb2YodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fb2JqZWN0W3Byb3BlcnR5XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSAqPSAxLjA7IC8vIEVuc3VyZXMgd2UncmUgdXNpbmcgbnVtYmVycywgbm90IHN0cmluZ3Ncblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3A6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XG5cblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fb25TdG9wQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnVwZGF0ZShJbmZpbml0eSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRwYXVzZTogZnVuY3Rpb24odGltZSkge1xuXG5cdFx0aWYgKHRoaXMuX2lzUGF1c2VkIHx8ICF0aGlzLl9pc1BsYXlpbmcpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcblxuXHRcdHRoaXMuX3BhdXNlU3RhcnQgPSB0aW1lID09PSB1bmRlZmluZWQgPyBUV0VFTi5ub3coKSA6IHRpbWU7XG5cblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlc3VtZTogZnVuY3Rpb24odGltZSkge1xuXG5cdFx0aWYgKCF0aGlzLl9pc1BhdXNlZCB8fCAhdGhpcy5faXNQbGF5aW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc3RhcnRUaW1lICs9ICh0aW1lID09PSB1bmRlZmluZWQgPyBUV0VFTi5ub3coKSA6IHRpbWUpXG5cdFx0XHQtIHRoaXMuX3BhdXNlU3RhcnQ7XG5cblx0XHR0aGlzLl9wYXVzZVN0YXJ0ID0gMDtcblxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RvcENoYWluZWRUd2VlbnM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcblx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGdyb3VwOiBmdW5jdGlvbiAoZ3JvdXApIHtcblx0XHR0aGlzLl9ncm91cCA9IGdyb3VwO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGRlbGF5OiBmdW5jdGlvbiAoYW1vdW50KSB7XG5cblx0XHR0aGlzLl9kZWxheVRpbWUgPSBhbW91bnQ7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRyZXBlYXQ6IGZ1bmN0aW9uICh0aW1lcykge1xuXG5cdFx0dGhpcy5fcmVwZWF0ID0gdGltZXM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRyZXBlYXREZWxheTogZnVuY3Rpb24gKGFtb3VudCkge1xuXG5cdFx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0eW95bzogZnVuY3Rpb24gKHlveW8pIHtcblxuXHRcdHRoaXMuX3lveW8gPSB5b3lvO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZWFzaW5nOiBmdW5jdGlvbiAoZWFzaW5nRnVuY3Rpb24pIHtcblxuXHRcdHRoaXMuX2Vhc2luZ0Z1bmN0aW9uID0gZWFzaW5nRnVuY3Rpb247XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiAoaW50ZXJwb2xhdGlvbkZ1bmN0aW9uKSB7XG5cblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uRnVuY3Rpb247XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjaGFpbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25TdGFydENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblVwZGF0ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblJlcGVhdDogZnVuY3Rpb24gb25SZXBlYXQoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uQ29tcGxldGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0b3A6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24gKHRpbWUpIHtcblxuXHRcdHZhciBwcm9wZXJ0eTtcblx0XHR2YXIgZWxhcHNlZDtcblx0XHR2YXIgdmFsdWU7XG5cblx0XHRpZiAodGltZSA8IHRoaXMuX3N0YXJ0VGltZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xuXG5cdFx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xuXHRcdGVsYXBzZWQgPSAodGhpcy5fZHVyYXRpb24gPT09IDAgfHwgZWxhcHNlZCA+IDEpID8gMSA6IGVsYXBzZWQ7XG5cblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xuXG5cdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3Rcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cdFx0XHR2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbihlbmQsIHZhbHVlKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xuXHRcdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0LCBlbGFwc2VkKTtcblx0XHR9XG5cblx0XHRpZiAoZWxhcHNlZCA9PT0gMSkge1xuXG5cdFx0XHRpZiAodGhpcy5fcmVwZWF0ID4gMCkge1xuXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVwZWF0LS07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xuXHRcdFx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0KSB7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHR0aGlzLl9yZXZlcnNlZCA9ICF0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9yZXBlYXREZWxheVRpbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX2RlbGF5VGltZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9vblJlcGVhdENhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0dGhpcy5fb25SZXBlYXRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcblx0XHRcdFx0XHQvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cblx0XHRcdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fVxufTtcblxuXG5UV0VFTi5FYXNpbmcgPSB7XG5cblx0TGluZWFyOiB7XG5cblx0XHROb25lOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gaztcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YWRyYXRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogKDIgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgtLWsgKiAoayAtIDIpIC0gMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDdWJpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVhcnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSAoLS1rICogayAqIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWludGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFNpbnVzb2lkYWw6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEV4cG9uZW50aWFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0gMTAgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoLSBNYXRoLnBvdygyLCAtIDEwICogKGsgLSAxKSkgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdENpcmN1bGFyOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnNxcnQoMSAtICgtLWsgKiBrKSk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFbGFzdGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBNYXRoLnBvdygyLCAtMTAgKiBrKSAqIE1hdGguc2luKChrIC0gMC4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0ayAqPSAyO1xuXG5cdFx0XHRpZiAoayA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0QmFjazoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzID0gMS43MDE1ODtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRCb3VuY2U6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KDEgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgKDEgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogayAqIGs7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMS41IC8gMi43NSkpICogayArIDAuNzU7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMi41IC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi42MjUgLyAyLjc1KSkgKiBrICsgMC45ODQzNzU7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgMC41KSB7XG5cdFx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLkluKGsgKiAyKSAqIDAuNTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG5cblx0XHR9XG5cblx0fVxuXG59O1xuXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xuXG5cdExpbmVhcjogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xuXG5cdFx0aWYgKGsgPCAwKSB7XG5cdFx0XHRyZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XG5cdFx0fVxuXG5cdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRyZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XG5cblx0fSxcblxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgYiA9IDA7XG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XG5cdFx0dmFyIHB3ID0gTWF0aC5wb3c7XG5cdFx0dmFyIGJuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcblx0XHRcdGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBiO1xuXG5cdH0sXG5cblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQ2F0bXVsbFJvbTtcblxuXHRcdGlmICh2WzBdID09PSB2W21dKSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRpID0gTWF0aC5mbG9vcihmID0gbSAqICgxICsgaykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRcdHJldHVybiB2W21dIC0gKGZuKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0VXRpbHM6IHtcblxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xuXG5cdFx0XHRyZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xuXG5cdFx0fSxcblxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcblxuXHRcdFx0dmFyIGZjID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XG5cblx0XHRcdHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xuXG5cdFx0fSxcblxuXHRcdEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIGEgPSBbMV07XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xuXG5cdFx0XHRcdHZhciBzID0gMTtcblxuXHRcdFx0XHRpZiAoYVtuXSkge1xuXHRcdFx0XHRcdHJldHVybiBhW25dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IG47IGkgPiAxOyBpLS0pIHtcblx0XHRcdFx0XHRzICo9IGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhW25dID0gcztcblx0XHRcdFx0cmV0dXJuIHM7XG5cblx0XHRcdH07XG5cblx0XHR9KSgpLFxuXG5cdFx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XG5cblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcblx0XHRcdHZhciB2MSA9IChwMyAtIHAxKSAqIDAuNTtcblx0XHRcdHZhciB0MiA9IHQgKiB0O1xuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xuXG5cdFx0XHRyZXR1cm4gKDIgKiBwMSAtIDIgKiBwMiArIHYwICsgdjEpICogdDMgKyAoLSAzICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblRXRUVOLnZlcnNpb24gPSB2ZXJzaW9uO1xuXG5leHBvcnQgZGVmYXVsdCBUV0VFTjtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4uL0RhdGFJbWFnZSc7XG5pbXBvcnQgeyBNT0RFUyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9UZXh0dXJlTG9hZGVyJztcbmltcG9ydCBUV0VFTiBmcm9tICdAdHdlZW5qcy90d2Vlbi5qcyc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBJbmZvcm1hdGlvbiBzcG90IGF0dGFjaGVkIHRvIHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2NhbGU9MzAwXSAtIERlZmF1bHQgc2NhbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbaW1hZ2VTcmM9UEFOT0xFTlMuRGF0YUltYWdlLkluZm9dIC0gSW1hZ2Ugb3ZlcmxheSBpbmZvXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthbmltYXRlZD10cnVlXSAtIEVuYWJsZSBkZWZhdWx0IGhvdmVyIGFuaW1hdGlvblxuICovXG5mdW5jdGlvbiBJbmZvc3BvdCAoIHNjYWxlID0gMzAwLCBpbWFnZVNyYywgYW5pbWF0ZWQgKSB7XG5cdFxuICAgIGNvbnN0IGR1cmF0aW9uID0gNTAwLCBzY2FsZUZhY3RvciA9IDEuMztcblxuICAgIGltYWdlU3JjID0gaW1hZ2VTcmMgfHwgRGF0YUltYWdlLkluZm87XG5cbiAgICBUSFJFRS5TcHJpdGUuY2FsbCggdGhpcyApO1xuXG4gICAgdGhpcy50eXBlID0gJ2luZm9zcG90JztcblxuICAgIHRoaXMuYW5pbWF0ZWQgPSBhbmltYXRlZCAhPT0gdW5kZWZpbmVkID8gYW5pbWF0ZWQgOiB0cnVlO1xuICAgIHRoaXMuaXNIb3ZlcmluZyA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgKiBUT0RPOiBUaHJlZS5qcyBidWcgaG90Zml4IGZvciBzcHJpdGUgcmF5Y2FzdGluZyByMTA0XG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvMTQ2MjRcbiAgICAgKi9cbiAgICB0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy50b1Bhbm9yYW1hID0gbnVsbDtcbiAgICB0aGlzLmN1cnNvclN0eWxlID0gbnVsbDtcblxuICAgIHRoaXMubW9kZSA9IE1PREVTLk5PUk1BTDtcblxuICAgIHRoaXMuc2NhbGUuc2V0KCBzY2FsZSwgc2NhbGUsIDEgKTtcbiAgICB0aGlzLnJvdGF0aW9uLnkgPSBNYXRoLlBJO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuXG4gICAgdGhpcy5vcmlnaW5hbFJheWNhc3QgPSB0aGlzLnJheWNhc3Q7XG5cbiAgICAvLyBFdmVudCBIYW5kbGVyXG4gICAgdGhpcy5IQU5ETEVSX0ZPQ1VTID0gbnVsbDtcdFxuXG4gICAgdGhpcy5tYXRlcmlhbC5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcbiAgICB0aGlzLm1hdGVyaWFsLmRlcHRoVGVzdCA9IGZhbHNlO1xuICAgIHRoaXMubWF0ZXJpYWwudHJhbnNwYXJlbnQgPSB0cnVlO1xuICAgIHRoaXMubWF0ZXJpYWwub3BhY2l0eSA9IDA7XG5cbiAgICB0aGlzLnNjYWxlVXBBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oKTtcbiAgICB0aGlzLnNjYWxlRG93bkFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbigpO1xuXG5cbiAgICBjb25zdCBwb3N0TG9hZCA9IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuICAgICAgICBpZiAoICF0aGlzLm1hdGVyaWFsICkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCByYXRpbyA9IHRleHR1cmUuaW1hZ2Uud2lkdGggLyB0ZXh0dXJlLmltYWdlLmhlaWdodDtcbiAgICAgICAgY29uc3QgdGV4dHVyZVNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgICAgICB0ZXh0dXJlLmltYWdlLndpZHRoID0gdGV4dHVyZS5pbWFnZS5uYXR1cmFsV2lkdGggfHwgNjQ7XG4gICAgICAgIHRleHR1cmUuaW1hZ2UuaGVpZ2h0ID0gdGV4dHVyZS5pbWFnZS5uYXR1cmFsSGVpZ2h0IHx8IDY0O1xuXG4gICAgICAgIHRoaXMuc2NhbGUuc2V0KCByYXRpbyAqIHNjYWxlLCBzY2FsZSwgMSApO1xuXG4gICAgICAgIHRleHR1cmVTY2FsZS5jb3B5KCB0aGlzLnNjYWxlICk7XG5cbiAgICAgICAgdGhpcy5zY2FsZVVwQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLnNjYWxlIClcbiAgICAgICAgICAgIC50byggeyB4OiB0ZXh0dXJlU2NhbGUueCAqIHNjYWxlRmFjdG9yLCB5OiB0ZXh0dXJlU2NhbGUueSAqIHNjYWxlRmFjdG9yIH0sIGR1cmF0aW9uIClcbiAgICAgICAgICAgIC5lYXNpbmcoIFRXRUVOLkVhc2luZy5FbGFzdGljLk91dCApO1xuXG4gICAgICAgIHRoaXMuc2NhbGVEb3duQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLnNjYWxlIClcbiAgICAgICAgICAgIC50byggeyB4OiB0ZXh0dXJlU2NhbGUueCwgeTogdGV4dHVyZVNjYWxlLnkgfSwgZHVyYXRpb24gKVxuICAgICAgICAgICAgLmVhc2luZyggVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0ICk7XG5cbiAgICAgICAgdGhpcy5tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xuICAgICAgICB0aGlzLm1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIH0uYmluZCggdGhpcyApO1xuXG4gICAgLy8gQWRkIHNob3cgYW5kIGhpZGUgYW5pbWF0aW9uc1xuICAgIHRoaXMuc2hvd0FuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5tYXRlcmlhbCApXG4gICAgICAgIC50byggeyBvcGFjaXR5OiAxIH0sIGR1cmF0aW9uIClcbiAgICAgICAgLm9uU3RhcnQoIHRoaXMuZW5hYmxlUmF5Y2FzdC5iaW5kKCB0aGlzLCB0cnVlICkgKVxuICAgICAgICAuZWFzaW5nKCBUV0VFTi5FYXNpbmcuUXVhcnRpYy5PdXQgKTtcblxuICAgIHRoaXMuaGlkZUFuaW1hdGlvbiA9IG5ldyBUV0VFTi5Ud2VlbiggdGhpcy5tYXRlcmlhbCApXG4gICAgICAgIC50byggeyBvcGFjaXR5OiAwIH0sIGR1cmF0aW9uIClcbiAgICAgICAgLm9uU3RhcnQoIHRoaXMuZW5hYmxlUmF5Y2FzdC5iaW5kKCB0aGlzLCBmYWxzZSApIClcbiAgICAgICAgLmVhc2luZyggVFdFRU4uRWFzaW5nLlF1YXJ0aWMuT3V0ICk7XG5cbiAgICAvLyBBdHRhY2ggZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLm9uQ2xpY2sgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdob3ZlcicsIHRoaXMub25Ib3ZlciApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2hvdmVyZW50ZXInLCB0aGlzLm9uSG92ZXJTdGFydCApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2hvdmVybGVhdmUnLCB0aGlzLm9uSG92ZXJFbmQgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3QnLCB0aGlzLm9uRHVhbEV5ZUVmZmVjdCApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIHRoaXMuc2V0Q29udGFpbmVyLmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2Rpc21pc3MnLCB0aGlzLm9uRGlzbWlzcyApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWluZm9zcG90LWZvY3VzJywgdGhpcy5zZXRGb2N1c01ldGhvZCApO1xuXG4gICAgVGV4dHVyZUxvYWRlci5sb2FkKCBpbWFnZVNyYywgcG9zdExvYWQgKTtcdFxuXG59O1xuXG5JbmZvc3BvdC5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5TcHJpdGUucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBJbmZvc3BvdCxcblxuICAgIC8qKlxuICAgICAqIFNldCBpbmZvc3BvdCBjb250YWluZXJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fG9iamVjdH0gZGF0YSAtIERhdGEgd2l0aCBjb250YWluZXIgaW5mb3JtYXRpb25cbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRDb250YWluZXI6IGZ1bmN0aW9uICggZGF0YSApIHtcblxuICAgICAgICBsZXQgY29udGFpbmVyO1xuXHRcbiAgICAgICAgaWYgKCBkYXRhIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XG5cdFxuICAgICAgICAgICAgY29udGFpbmVyID0gZGF0YTtcblx0XG4gICAgICAgIH0gZWxzZSBpZiAoIGRhdGEgJiYgZGF0YS5jb250YWluZXIgKSB7XG5cdFxuICAgICAgICAgICAgY29udGFpbmVyID0gZGF0YS5jb250YWluZXI7XG5cdFxuICAgICAgICB9XG5cdFxuICAgICAgICAvLyBBcHBlbmQgZWxlbWVudCBpZiBleGlzdHNcbiAgICAgICAgaWYgKCBjb250YWluZXIgJiYgdGhpcy5lbGVtZW50ICkge1xuXHRcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCggdGhpcy5lbGVtZW50ICk7XG5cdFxuICAgICAgICB9XG5cdFxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblx0XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBUaGUgY29udGFpbmVyIG9mIHRoaXMgaW5mb3Nwb3RcbiAgICAgKi9cbiAgICBnZXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCBieSBhIGNsaWNrIGV2ZW50XG4gICAgICogVHJhbnNsYXRlIGFuZCBsb2NrIHRoZSBob3ZlcmluZyBlbGVtZW50IGlmIGFueVxuICAgICAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgLSBFdmVudCBjb250YWluaW5nIG1vdXNlRXZlbnQgd2l0aCBjbGllbnRYIGFuZCBjbGllbnRZXG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25DbGljazogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIHRoaXMuZWxlbWVudCAmJiB0aGlzLmdldENvbnRhaW5lcigpICkge1xuXG4gICAgICAgICAgICB0aGlzLm9uSG92ZXJTdGFydCggZXZlbnQgKTtcblxuICAgICAgICAgICAgLy8gTG9jayBlbGVtZW50XG4gICAgICAgICAgICB0aGlzLmxvY2tIb3ZlckVsZW1lbnQoKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzbWlzcyBjdXJyZW50IGVsZW1lbnQgaWYgYW55XG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIERpc21pc3MgZXZlbnRcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkRpc21pc3M6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIHRoaXMuZWxlbWVudCApIHtcblxuICAgICAgICAgICAgdGhpcy51bmxvY2tIb3ZlckVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMub25Ib3ZlckVuZCgpO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIGJ5IGEgbW91c2UgaG92ZXIgZXZlbnRcbiAgICAgKiBUcmFuc2xhdGUgdGhlIGhvdmVyaW5nIGVsZW1lbnQgaWYgYW55XG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIEV2ZW50IGNvbnRhaW5pbmcgbW91c2VFdmVudCB3aXRoIGNsaWVudFggYW5kIGNsaWVudFlcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkhvdmVyOiBmdW5jdGlvbiAoKSB7fSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgb24gYSBtb3VzZSBob3ZlciBzdGFydFxuICAgICAqIFNldHMgY3Vyc29yIHN0eWxlIHRvICdwb2ludGVyJywgZGlzcGxheSB0aGUgZWxlbWVudCBhbmQgc2NhbGUgdXAgdGhlIGluZm9zcG90XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50XG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Ib3ZlclN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGlmICggIXRoaXMuZ2V0Q29udGFpbmVyKCkgKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGN1cnNvclN0eWxlID0gdGhpcy5jdXJzb3JTdHlsZSB8fCAoIHRoaXMubW9kZSA9PT0gTU9ERVMuTk9STUFMID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnICk7XG4gICAgICAgIGNvbnN0IHsgc2NhbGVEb3duQW5pbWF0aW9uLCBzY2FsZVVwQW5pbWF0aW9uLCBlbGVtZW50IH0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaXNIb3ZlcmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IGN1cnNvclN0eWxlO1xuXHRcdFxuICAgICAgICBpZiAoIHRoaXMuYW5pbWF0ZWQgKSB7XG5cbiAgICAgICAgICAgIHNjYWxlRG93bkFuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICBzY2FsZVVwQW5pbWF0aW9uLnN0YXJ0KCk7XG5cbiAgICAgICAgfVxuXHRcdFxuICAgICAgICBpZiAoIGVsZW1lbnQgJiYgZXZlbnQubW91c2VFdmVudC5jbGllbnRYID49IDAgJiYgZXZlbnQubW91c2VFdmVudC5jbGllbnRZID49IDAgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQsIHN0eWxlIH0gPSBlbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMubW9kZSA9PT0gTU9ERVMuQ0FSREJPQVJEIHx8IHRoaXMubW9kZSA9PT0gTU9ERVMuU1RFUkVPICkge1xuXG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBsZWZ0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIHJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgZWxlbWVudCB3aWR0aCBmb3IgcmVmZXJlbmNlXG4gICAgICAgICAgICAgICAgZWxlbWVudC5fd2lkdGggPSBsZWZ0LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuX2hlaWdodCA9IGxlZnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgaWYgKCBsZWZ0ICkgeyBsZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH1cbiAgICAgICAgICAgICAgICBpZiAoIHJpZ2h0ICkgeyByaWdodC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cbiAgICAgICAgICAgICAgICAvLyBTdG9yZSBlbGVtZW50IHdpZHRoIGZvciByZWZlcmVuY2VcbiAgICAgICAgICAgICAgICBlbGVtZW50Ll93aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5faGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIH1cblx0XHRcdFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCBvbiBhIG1vdXNlIGhvdmVyIGVuZFxuICAgICAqIFNldHMgY3Vyc29yIHN0eWxlIHRvICdkZWZhdWx0JywgaGlkZSB0aGUgZWxlbWVudCBhbmQgc2NhbGUgZG93biB0aGUgaW5mb3Nwb3RcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkhvdmVyRW5kOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5nZXRDb250YWluZXIoKSApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgeyBzY2FsZURvd25BbmltYXRpb24sIHNjYWxlVXBBbmltYXRpb24sIGVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pc0hvdmVyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcblxuICAgICAgICBpZiAoIHRoaXMuYW5pbWF0ZWQgKSB7XG5cbiAgICAgICAgICAgIHNjYWxlVXBBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgc2NhbGVEb3duQW5pbWF0aW9uLnN0YXJ0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggZWxlbWVudCAmJiAhdGhpcy5lbGVtZW50LmxvY2tlZCApIHtcblxuICAgICAgICAgICAgY29uc3QgeyBsZWZ0LCByaWdodCwgc3R5bGUgfSA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBpZiAoIGxlZnQgKSB7IGxlZnQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuICAgICAgICAgICAgaWYgKCByaWdodCApIHsgcmlnaHQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuXG4gICAgICAgICAgICB0aGlzLnVubG9ja0hvdmVyRWxlbWVudCgpO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPbiBkdWFsIGV5ZSBlZmZlY3QgaGFuZGxlclxuICAgICAqIENyZWF0ZXMgZHVwbGljYXRlIGxlZnQgYW5kIHJpZ2h0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50IC0gcGFub2xlbnMtZHVhbC1leWUtZWZmZWN0IGV2ZW50XG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25EdWFsRXllRWZmZWN0OiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFxuICAgICAgICBpZiAoICF0aGlzLmdldENvbnRhaW5lcigpICkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgZWxlbWVudCwgaGFsZldpZHRoLCBoYWxmSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMubW9kZSA9IGV2ZW50Lm1vZGU7XG5cbiAgICAgICAgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuICAgICAgICBoYWxmV2lkdGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgIGhhbGZIZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyO1xuXG4gICAgICAgIGlmICggIWVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAhZWxlbWVudC5sZWZ0ICYmICFlbGVtZW50LnJpZ2h0ICkge1xuXG4gICAgICAgICAgICBlbGVtZW50LmxlZnQgPSBlbGVtZW50LmNsb25lTm9kZSggdHJ1ZSApO1xuICAgICAgICAgICAgZWxlbWVudC5yaWdodCA9IGVsZW1lbnQuY2xvbmVOb2RlKCB0cnVlICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5tb2RlID09PSBNT0RFUy5DQVJEQk9BUkQgfHwgdGhpcy5tb2RlID09PSBNT0RFUy5TVEVSRU8gKSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5ID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICAgICAgZWxlbWVudC5yaWdodC5zdHlsZS5kaXNwbGF5ID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGVsZW1lbnQubGVmdC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICAgICAgZWxlbWVudC5sZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBlbGVtZW50LnJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBlbGVtZW50cyB0cmFuc2xhdGlvblxuICAgICAgICB0aGlzLnRyYW5zbGF0ZUVsZW1lbnQoIGhhbGZXaWR0aCwgaGFsZkhlaWdodCApO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBlbGVtZW50LmxlZnQgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIGVsZW1lbnQucmlnaHQgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgdGhlIGhvdmVyaW5nIGVsZW1lbnQgYnkgY3NzIHRyYW5zZm9ybVxuICAgICAqIEBwYXJhbSAge251bWJlcn0geCAtIFggcG9zaXRpb24gb24gdGhlIHdpbmRvdyBzY3JlZW5cbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IHkgLSBZIHBvc2l0aW9uIG9uIHRoZSB3aW5kb3cgc2NyZWVuXG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdHJhbnNsYXRlRWxlbWVudDogZnVuY3Rpb24gKCB4LCB5ICkge1xuXG4gICAgICAgIGlmICggIXRoaXMuZWxlbWVudC5fd2lkdGggfHwgIXRoaXMuZWxlbWVudC5faGVpZ2h0IHx8ICF0aGlzLmdldENvbnRhaW5lcigpICkge1xuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZWZ0LCB0b3AsIGVsZW1lbnQsIHdpZHRoLCBoZWlnaHQsIGRlbHRhLCBjb250YWluZXI7XG5cbiAgICAgICAgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIHdpZHRoID0gZWxlbWVudC5fd2lkdGggLyAyO1xuICAgICAgICBoZWlnaHQgPSBlbGVtZW50Ll9oZWlnaHQgLyAyO1xuICAgICAgICBkZWx0YSA9IGVsZW1lbnQudmVydGljYWxEZWx0YSAhPT0gdW5kZWZpbmVkID8gZWxlbWVudC52ZXJ0aWNhbERlbHRhIDogNDA7XG5cbiAgICAgICAgbGVmdCA9IHggLSB3aWR0aDtcbiAgICAgICAgdG9wID0geSAtIGhlaWdodCAtIGRlbHRhO1xuXG4gICAgICAgIGlmICggKCB0aGlzLm1vZGUgPT09IE1PREVTLkNBUkRCT0FSRCB8fCB0aGlzLm1vZGUgPT09IE1PREVTLlNURVJFTyApIFxuXHRcdFx0XHQmJiBlbGVtZW50LmxlZnQgJiYgZWxlbWVudC5yaWdodFxuXHRcdFx0XHQmJiAhKCB4ID09PSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyICYmIHkgPT09IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyICkgKSB7XG5cbiAgICAgICAgICAgIGxlZnQgPSBjb250YWluZXIuY2xpZW50V2lkdGggLyA0IC0gd2lkdGggKyAoIHggLSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyICk7XG4gICAgICAgICAgICB0b3AgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMiAtIGhlaWdodCAtIGRlbHRhICsgKCB5IC0gY29udGFpbmVyLmNsaWVudEhlaWdodCAvIDIgKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50U3R5bGUoICd0cmFuc2Zvcm0nLCBlbGVtZW50LmxlZnQsICd0cmFuc2xhdGUoJyArIGxlZnQgKyAncHgsICcgKyB0b3AgKyAncHgpJyApO1xuXG4gICAgICAgICAgICBsZWZ0ICs9IGNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDI7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RWxlbWVudFN0eWxlKCAndHJhbnNmb3JtJywgZWxlbWVudC5yaWdodCwgJ3RyYW5zbGF0ZSgnICsgbGVmdCArICdweCwgJyArIHRvcCArICdweCknICk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50U3R5bGUoICd0cmFuc2Zvcm0nLCBlbGVtZW50LCAndHJhbnNsYXRlKCcgKyBsZWZ0ICsgJ3B4LCAnICsgdG9wICsgJ3B4KScgKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHZlbmRvciBzcGVjaWZpYyBjc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIENTUyBzdHlsZSBuYW1lXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIGJlIG1vZGlmaWVkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gU3R5bGUgdmFsdWVcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRFbGVtZW50U3R5bGU6IGZ1bmN0aW9uICggdHlwZSwgZWxlbWVudCwgdmFsdWUgKSB7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBlbGVtZW50LnN0eWxlO1xuXG4gICAgICAgIGlmICggdHlwZSA9PT0gJ3RyYW5zZm9ybScgKSB7XG5cbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHN0eWxlLm1zVHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID0gdmFsdWU7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBob3ZlcmluZyB0ZXh0IGNvbnRlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRleHQgdG8gYmUgZGlzcGxheWVkXG4gICAgICogQG1lbWJlck9mIEluZm9zcG90XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0VGV4dDogZnVuY3Rpb24gKCB0ZXh0ICkge1xuXG4gICAgICAgIGlmICggdGhpcy5lbGVtZW50ICkge1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgY3Vyc29yIGNzcyBzdHlsZSBvbiBob3ZlclxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNldEN1cnNvckhvdmVyU3R5bGU6IGZ1bmN0aW9uICggc3R5bGUgKSB7XG5cbiAgICAgICAgdGhpcy5jdXJzb3JTdHlsZSA9IHN0eWxlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBob3ZlcmluZyB0ZXh0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRleHQgdG8gYmUgZGlzcGxheWVkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkZWx0YT00MF0gLSBWZXJ0aWNhbCBkZWx0YSB0byB0aGUgaW5mb3Nwb3RcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRIb3ZlclRleHQ6IGZ1bmN0aW9uICggdGV4dCwgZGVsdGEgPSA0MCApIHtcblxuICAgICAgICBpZiAoICF0aGlzLmVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9ICcjZmZmJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLm1heFdpZHRoID0gJzUwJSc7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJzUwJSc7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudGV4dFNoYWRvdyA9ICcwIDAgM3B4ICMwMDAwMDAnO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSAnXCJUcmVidWNoZXQgTVNcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ3Bhbm9sZW5zLWluZm9zcG90JyApO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnZlcnRpY2FsRGVsdGEgPSBkZWx0YTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRUZXh0KCB0ZXh0ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGhvdmVyaW5nIGVsZW1lbnQgYnkgY2xvbmluZyBhbiBlbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MRE9NRWxlbWVudH0gZWwgLSBFbGVtZW50IHRvIGJlIGNsb25lZCBhbmQgZGlzcGxheWVkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkZWx0YT00MF0gLSBWZXJ0aWNhbCBkZWx0YSB0byB0aGUgaW5mb3Nwb3RcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRIb3ZlckVsZW1lbnQ6IGZ1bmN0aW9uICggZWwsIGRlbHRhID0gNDAgKSB7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5lbGVtZW50ICkgeyBcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWwuY2xvbmVOb2RlKCB0cnVlICk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCAncGFub2xlbnMtaW5mb3Nwb3QnICk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudmVydGljYWxEZWx0YSA9IGRlbHRhO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgaG92ZXJpbmcgZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlbW92ZUhvdmVyRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5lbGVtZW50ICkgeyBcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmVsZW1lbnQubGVmdCApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQubGVmdCApO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5sZWZ0ID0gbnVsbDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRoaXMuZWxlbWVudC5yaWdodCApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQucmlnaHQgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmlnaHQgPSBudWxsO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvY2sgaG92ZXJpbmcgZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvY2tIb3ZlckVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIHRoaXMuZWxlbWVudCApIHsgXG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5sb2NrZWQgPSB0cnVlO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmxvY2sgaG92ZXJpbmcgZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVubG9ja0hvdmVyRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5lbGVtZW50ICkgeyBcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmxvY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgcmF5Y2FzdGluZ1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9dHJ1ZV1cbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBlbmFibGVSYXljYXN0OiBmdW5jdGlvbiAoIGVuYWJsZWQgPSB0cnVlICkge1xuXG4gICAgICAgIGlmICggZW5hYmxlZCApIHtcblxuICAgICAgICAgICAgdGhpcy5yYXljYXN0ID0gdGhpcy5vcmlnaW5hbFJheWNhc3Q7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5yYXljYXN0ID0gKCkgPT4ge307XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNob3cgaW5mb3Nwb3RcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IFtkZWxheT0wXSAtIERlbGF5IHRpbWUgdG8gc2hvd1xuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNob3c6IGZ1bmN0aW9uICggZGVsYXkgPSAwICkge1xuXG4gICAgICAgIGNvbnN0IHsgYW5pbWF0ZWQsIGhpZGVBbmltYXRpb24sIHNob3dBbmltYXRpb24sIG1hdGVyaWFsIH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICggYW5pbWF0ZWQgKSB7XG5cbiAgICAgICAgICAgIGhpZGVBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgc2hvd0FuaW1hdGlvbi5kZWxheSggZGVsYXkgKS5zdGFydCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW5hYmxlUmF5Y2FzdCggdHJ1ZSApO1xuICAgICAgICAgICAgbWF0ZXJpYWwub3BhY2l0eSA9IDE7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhpZGUgaW5mb3Nwb3RcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IFtkZWxheT0wXSAtIERlbGF5IHRpbWUgdG8gaGlkZVxuICAgICAqIEBtZW1iZXJPZiBJbmZvc3BvdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGhpZGU6IGZ1bmN0aW9uICggZGVsYXkgPSAwICkge1xuXG4gICAgICAgIGNvbnN0IHsgYW5pbWF0ZWQsIGhpZGVBbmltYXRpb24sIHNob3dBbmltYXRpb24sIG1hdGVyaWFsIH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICggYW5pbWF0ZWQgKSB7XG5cbiAgICAgICAgICAgIHNob3dBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgaGlkZUFuaW1hdGlvbi5kZWxheSggZGVsYXkgKS5zdGFydCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW5hYmxlUmF5Y2FzdCggZmFsc2UgKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgIH1cblx0XHRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IGZvY3VzIGV2ZW50IGhhbmRsZXJcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRGb2N1c01ldGhvZDogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICB0aGlzLkhBTkRMRVJfRk9DVVMgPSBldmVudC5tZXRob2Q7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZvY3VzIGNhbWVyYSBjZW50ZXIgdG8gdGhpcyBpbmZvc3BvdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZHVyYXRpb249MTAwMF0gLSBEdXJhdGlvbiB0byB0d2VlblxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtlYXNpbmc9VFdFRU4uRWFzaW5nLkV4cG9uZW50aWFsLk91dF0gLSBFYXNpbmcgZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmb2N1czogZnVuY3Rpb24gKCBkdXJhdGlvbiwgZWFzaW5nICkge1xuXG4gICAgICAgIGlmICggdGhpcy5IQU5ETEVSX0ZPQ1VTICkge1xuXG4gICAgICAgICAgICB0aGlzLkhBTkRMRVJfRk9DVVMoIHRoaXMucG9zaXRpb24sIGR1cmF0aW9uLCBlYXNpbmcgKTtcbiAgICAgICAgICAgIHRoaXMub25EaXNtaXNzKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc3Bvc2VcbiAgICAgKiBAbWVtYmVyT2YgSW5mb3Nwb3RcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyBnZW9tZXRyeSwgbWF0ZXJpYWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgbWFwIH0gPSBtYXRlcmlhbDtcblxuICAgICAgICB0aGlzLnJlbW92ZUhvdmVyRWxlbWVudCgpO1xuXG4gICAgICAgIGlmICggdGhpcy5wYXJlbnQgKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZSggdGhpcyApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG1hcCApIHsgbWFwLmRpc3Bvc2UoKTsgbWF0ZXJpYWwubWFwID0gbnVsbDsgfVxuICAgICAgICBpZiAoIGdlb21ldHJ5ICkgeyBnZW9tZXRyeS5kaXNwb3NlKCk7IHRoaXMuZ2VvbWV0cnkgPSBudWxsOyB9XG4gICAgICAgIGlmICggbWF0ZXJpYWwgKSB7IG1hdGVyaWFsLmRpc3Bvc2UoKTsgdGhpcy5tYXRlcmlhbCA9IG51bGw7IH1cblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBJbmZvc3BvdCB9OyIsImltcG9ydCB7IENPTlRST0xTLCBNT0RFUyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRhSW1hZ2UgfSBmcm9tICcuLi9EYXRhSW1hZ2UnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgV2lkZ2V0IGZvciBjb250cm9sc1xuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXIgLSBBIGRvbUVsZW1lbnQgd2hlcmUgZGVmYXVsdCBjb250cm9sIHdpZGdldCB3aWxsIGJlIGF0dGFjaGVkIHRvXG4gKi9cbmZ1bmN0aW9uIFdpZGdldCAoIGNvbnRhaW5lciApIHtcblxuICAgIGlmICggIWNvbnRhaW5lciApIHtcblxuICAgICAgICBjb25zb2xlLndhcm4oICdQQU5PTEVOUy5XaWRnZXQ6IE5vIGNvbnRhaW5lciBzcGVjaWZpZWQnICk7XG5cbiAgICB9XG5cbiAgICBUSFJFRS5FdmVudERpc3BhdGNoZXIuY2FsbCggdGhpcyApO1xuXG4gICAgdGhpcy5ERUZBVUxUX1RSQU5TSVRJT04gID0gJ2FsbCAwLjI3cyBlYXNlJztcbiAgICB0aGlzLlRPVUNIX0VOQUJMRUQgPSAhISgoICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyApIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCk7XG4gICAgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICB0aGlzLmJhckVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZnVsbHNjcmVlbkVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMudmlkZW9FbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnNldHRpbmdFbGVtZW50ID0gbnVsbDtcblxuICAgIHRoaXMubWFpbk1lbnUgPSBudWxsO1xuXG4gICAgdGhpcy5hY3RpdmVNYWluSXRlbSA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmVTdWJNZW51ID0gbnVsbDtcbiAgICB0aGlzLm1hc2sgPSBudWxsO1xuXG59XG5cbldpZGdldC5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBXaWRnZXQsXG5cbiAgICAvKipcbiAgICAgKiBBZGQgY29udHJvbCBiYXJcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkQ29udHJvbEJhcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggIXRoaXMuY29udGFpbmVyICkge1xuXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oICdXaWRnZXQgY29udGFpbmVyIG5vdCBzZXQnICk7IFxuICAgICAgICAgICAgcmV0dXJuOyBcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcztcbiAgICAgICAgY29uc3QgZ3JhZGllbnRTdHlsZSA9ICdsaW5lYXItZ3JhZGllbnQoYm90dG9tLCByZ2JhKDAsMCwwLDAuMiksIHJnYmEoMCwwLDAsMCkpJztcblxuICAgICAgICBjb25zdCBiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICAgICAgICBiYXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGJhci5zdHlsZS5oZWlnaHQgPSAnNDRweCc7XG4gICAgICAgIGJhci5zdHlsZS5mbG9hdCA9ICdsZWZ0JztcbiAgICAgICAgYmFyLnN0eWxlLnRyYW5zZm9ybSA9IGJhci5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBiYXIuc3R5bGUubXNUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtMTAwJSknO1xuICAgICAgICBiYXIuc3R5bGUuYmFja2dyb3VuZCA9ICctd2Via2l0LScgKyBncmFkaWVudFN0eWxlO1xuICAgICAgICBiYXIuc3R5bGUuYmFja2dyb3VuZCA9ICctbW96LScgKyBncmFkaWVudFN0eWxlO1xuICAgICAgICBiYXIuc3R5bGUuYmFja2dyb3VuZCA9ICctby0nICsgZ3JhZGllbnRTdHlsZTtcbiAgICAgICAgYmFyLnN0eWxlLmJhY2tncm91bmQgPSAnLW1zLScgKyBncmFkaWVudFN0eWxlO1xuICAgICAgICBiYXIuc3R5bGUuYmFja2dyb3VuZCA9IGdyYWRpZW50U3R5bGU7XG4gICAgICAgIGJhci5zdHlsZS50cmFuc2l0aW9uID0gdGhpcy5ERUZBVUxUX1RSQU5TSVRJT047XG4gICAgICAgIGJhci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICBiYXIuaXNIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgYmFyLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJhci5pc0hpZGRlbiA9ICFiYXIuaXNIaWRkZW47XG4gICAgICAgICAgICBjb25zdCBzdHlsZVRyYW5zbGF0ZSA9IGJhci5pc0hpZGRlbiA/ICd0cmFuc2xhdGVZKDApJyA6ICd0cmFuc2xhdGVZKC0xMDAlKSc7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU9wYWNpdHkgPSBiYXIuaXNIaWRkZW4gPyAwIDogMTtcbiAgICAgICAgICAgIGJhci5zdHlsZS50cmFuc2Zvcm0gPSBiYXIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gYmFyLnN0eWxlLm1zVHJhbnNmb3JtID0gc3R5bGVUcmFuc2xhdGU7XG4gICAgICAgICAgICBiYXIuc3R5bGUub3BhY2l0eSA9IHN0eWxlT3BhY2l0eTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBNZW51XG4gICAgICAgIGNvbnN0IG1lbnUgPSB0aGlzLmNyZWF0ZURlZmF1bHRNZW51KCk7XG4gICAgICAgIHRoaXMubWFpbk1lbnUgPSB0aGlzLmNyZWF0ZU1haW5NZW51KCBtZW51ICk7XG4gICAgICAgIGJhci5hcHBlbmRDaGlsZCggdGhpcy5tYWluTWVudSApO1xuXG4gICAgICAgIC8vIE1hc2tcbiAgICAgICAgY29uc3QgbWFzayA9IHRoaXMuY3JlYXRlTWFzaygpO1xuICAgICAgICB0aGlzLm1hc2sgPSBtYXNrO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggbWFzayApO1xuXG4gICAgICAgIC8vIERpc3Bvc2VcbiAgICAgICAgYmFyLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICggc2NvcGUuZnVsbHNjcmVlbkVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgICAgICBiYXIucmVtb3ZlQ2hpbGQoIHNjb3BlLmZ1bGxzY3JlZW5FbGVtZW50ICk7XG4gICAgICAgICAgICAgICAgc2NvcGUuZnVsbHNjcmVlbkVsZW1lbnQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHNjb3BlLmZ1bGxzY3JlZW5FbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLnNldHRpbmdFbGVtZW50ICkge1xuXG4gICAgICAgICAgICAgICAgYmFyLnJlbW92ZUNoaWxkKCBzY29wZS5zZXR0aW5nRWxlbWVudCApO1xuICAgICAgICAgICAgICAgIHNjb3BlLnNldHRpbmdFbGVtZW50LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBzY29wZS5zZXR0aW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBzY29wZS52aWRlb0VsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgICAgICBiYXIucmVtb3ZlQ2hpbGQoIHNjb3BlLnZpZGVvRWxlbWVudCApO1xuICAgICAgICAgICAgICAgIHNjb3BlLnZpZGVvRWxlbWVudC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgc2NvcGUudmlkZW9FbGVtZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIGJhciApO1xuXG4gICAgICAgIC8vIE1hc2sgZXZlbnRzXG4gICAgICAgIHRoaXMubWFzay5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcbiAgICAgICAgdGhpcy5tYXNrLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcbiAgICAgICAgdGhpcy5tYXNrLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCB0aGlzLlBSRVZFTlRfRVZFTlRfSEFORExFUiwgdHJ1ZSApO1xuICAgICAgICB0aGlzLm1hc2suYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHNjb3BlLm1hc2suaGlkZSgpO1xuICAgICAgICAgICAgc2NvcGUuc2V0dGluZ0VsZW1lbnQuZGVhY3RpdmF0ZSgpO1xuXG4gICAgICAgIH0sIGZhbHNlICk7XG5cbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAnY29udHJvbC1iYXItdG9nZ2xlJywgYmFyLnRvZ2dsZSApO1xuXG4gICAgICAgIHRoaXMuYmFyRWxlbWVudCA9IGJhcjtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgZGVmYXVsdCBtZW51XG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNyZWF0ZURlZmF1bHRNZW51OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gKCBtZXRob2QsIGRhdGEgKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCB7IFxuXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCwgXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEgXG5cbiAgICAgICAgICAgICAgICB9ICk7IFxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIFtcblxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0NvbnRyb2wnLCBcbiAgICAgICAgICAgICAgICBzdWJNZW51OiBbIFxuICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuVE9VQ0hfRU5BQkxFRCA/ICdUb3VjaCcgOiAnTW91c2UnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIoICdlbmFibGVDb250cm9sJywgQ09OVFJPTFMuT1JCSVQgKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTZW5zb3InLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIoICdlbmFibGVDb250cm9sJywgQ09OVFJPTFMuREVWSUNFT1JJRU5UQVRJT04gKSBcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnTW9kZScsIFxuICAgICAgICAgICAgICAgIHN1Yk1lbnU6IFsgXG4gICAgICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ05vcm1hbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyKCAnZGlzYWJsZUVmZmVjdCcgKVxuICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FyZGJvYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIoICdlbmFibGVFZmZlY3QnLCBNT0RFUy5DQVJEQk9BUkQgKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTdGVyZW9zY29waWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlciggJ2VuYWJsZUVmZmVjdCcsIE1PREVTLlNURVJFTyApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYnV0dG9ucyBvbiB0b3Agb2YgY29udHJvbCBiYXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBjb250cm9sIGJ1dHRvbiBuYW1lIHRvIGJlIGNyZWF0ZWRcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYWRkQ29udHJvbEJ1dHRvbjogZnVuY3Rpb24gKCBuYW1lICkge1xuXG4gICAgICAgIGxldCBlbGVtZW50O1xuXG4gICAgICAgIHN3aXRjaCggbmFtZSApIHtcblxuICAgICAgICBjYXNlICdmdWxsc2NyZWVuJzpcblxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuY3JlYXRlRnVsbHNjcmVlbkJ1dHRvbigpO1xuICAgICAgICAgICAgdGhpcy5mdWxsc2NyZWVuRWxlbWVudCA9IGVsZW1lbnQ7IFxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdzZXR0aW5nJzpcblxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuY3JlYXRlU2V0dGluZ0J1dHRvbigpO1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5nRWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3ZpZGVvJzpcblxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuY3JlYXRlVmlkZW9Db250cm9sKCk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAhZWxlbWVudCApIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbW9kYWwgbWFza1xuICAgICAqIEBtZW1iZXJPZiBXaWRnZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjcmVhdGVNYXNrOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IDA7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgZWxlbWVudC5zaG93ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudC5oaWRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgU2V0dGluZyBidXR0b24gdG8gdG9nZ2xlIG1lbnVcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgY3JlYXRlU2V0dGluZ0J1dHRvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGxldCBzY29wZSA9IHRoaXMsIGl0ZW07XG5cbiAgICAgICAgZnVuY3Rpb24gb25UYXAgKCBldmVudCApIHtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBzY29wZS5tYWluTWVudS50b2dnbGUoKTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmFjdGl2YXRlZCApIHtcblx0XG4gICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbSA9IHRoaXMuY3JlYXRlQ3VzdG9tSXRlbSggeyBcblxuICAgICAgICAgICAgc3R5bGU6IHsgXG5cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoXCInICsgRGF0YUltYWdlLlNldHRpbmcgKyAnXCIpJyxcbiAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2l0aW9uOiB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTixcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTlxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblRhcDogb25UYXBcblxuICAgICAgICB9ICk7XG5cbiAgICAgICAgaXRlbS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlM2QoMCwwLDEsOTBkZWcpJztcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLm1hc2suc2hvdygpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUzZCgwLDAsMCwwKSc7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc2NvcGUubWFzay5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmICggc2NvcGUubWFpbk1lbnUgJiYgc2NvcGUubWFpbk1lbnUudmlzaWJsZSApIHtcblxuICAgICAgICAgICAgICAgIHNjb3BlLm1haW5NZW51LmhpZGUoKTtcblx0XHRcdFx0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc2NvcGUuYWN0aXZlU3ViTWVudSAmJiBzY29wZS5hY3RpdmVTdWJNZW51LnZpc2libGUgKSB7XG5cbiAgICAgICAgICAgICAgICBzY29wZS5hY3RpdmVTdWJNZW51LmhpZGUoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLm1haW5NZW51ICYmIHNjb3BlLm1haW5NZW51Ll93aWR0aCApIHtcblxuICAgICAgICAgICAgICAgIHNjb3BlLm1haW5NZW51LmNoYW5nZVNpemUoIHNjb3BlLm1haW5NZW51Ll93aWR0aCApO1xuICAgICAgICAgICAgICAgIHNjb3BlLm1haW5NZW51LnVuc2xpZGVBbGwoKTtcblxuICAgICAgICAgICAgfVxuXHRcdFx0XG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS5hY3RpdmF0ZWQgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgRnVsbHNjcmVlbiBidXR0b25cbiAgICAgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9IC0gVGhlIGRvbSBlbGVtZW50IGljb24gZm9yIGZ1bGxzY3JlZW5cbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFdpZGdldCNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuICAgICAqL1xuICAgIGNyZWF0ZUZ1bGxzY3JlZW5CdXR0b246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgc2NvcGUgPSB0aGlzLCBpdGVtLCBpc0Z1bGxzY3JlZW4gPSBmYWxzZSwgdGFwU2tpcHBlZCA9IHRydWUsIHN0eWxlc2hlZXRJZDtcblxuICAgICAgICBjb25zdCB7IGNvbnRhaW5lciB9ID0gdGhpcztcblxuICAgICAgICBzdHlsZXNoZWV0SWQgPSAncGFub2xlbnMtc3R5bGUtYWRkb24nO1xuXG4gICAgICAgIC8vIERvbid0IGNyZWF0ZSBidXR0b24gaWYgbm8gc3VwcG9ydFxuICAgICAgICBpZiAoICFkb2N1bWVudC5mdWxsc2NyZWVuRW5hYmxlZCAgICAgICAmJiBcblx0XHRcdCFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCAmJlxuXHRcdFx0IWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbmFibGVkICAgICYmXG5cdFx0XHQhZG9jdW1lbnQubXNGdWxsc2NyZWVuRW5hYmxlZCApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uVGFwICggZXZlbnQgKSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgdGFwU2tpcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoICFpc0Z1bGxzY3JlZW4gKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNvbnRhaW5lci5yZXF1ZXN0RnVsbHNjcmVlbiApIHsgY29udGFpbmVyLnJlcXVlc3RGdWxsc2NyZWVuKCk7IH1cbiAgICAgICAgICAgICAgICBpZiAoIGNvbnRhaW5lci5tc1JlcXVlc3RGdWxsc2NyZWVuICkgeyBjb250YWluZXIubXNSZXF1ZXN0RnVsbHNjcmVlbigpOyB9XG4gICAgICAgICAgICAgICAgaWYgKCBjb250YWluZXIubW96UmVxdWVzdEZ1bGxTY3JlZW4gKSB7IGNvbnRhaW5lci5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpOyB9XG4gICAgICAgICAgICAgICAgaWYgKCBjb250YWluZXIud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gKSB7IGNvbnRhaW5lci53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiggRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVCApOyB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlzRnVsbHNjcmVlbiA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuICkgeyBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpOyB9XG4gICAgICAgICAgICAgICAgaWYgKCBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuICkgeyBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7IH1cbiAgICAgICAgICAgICAgICBpZiAoIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4gKSB7IGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTsgfVxuICAgICAgICAgICAgICAgIGlmICggZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4gKSB7IGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCApOyB9XG5cbiAgICAgICAgICAgICAgICBpc0Z1bGxzY3JlZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICggaXNGdWxsc2NyZWVuICkgXG4gICAgICAgICAgICAgICAgPyAndXJsKFwiJyArIERhdGFJbWFnZS5GdWxsc2NyZWVuTGVhdmUgKyAnXCIpJyBcbiAgICAgICAgICAgICAgICA6ICd1cmwoXCInICsgRGF0YUltYWdlLkZ1bGxzY3JlZW5FbnRlciArICdcIiknO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkZ1bGxTY3JlZW5DaGFuZ2UgKCkge1xuXG4gICAgICAgICAgICBpZiAoIHRhcFNraXBwZWQgKSB7XG5cbiAgICAgICAgICAgICAgICBpc0Z1bGxzY3JlZW4gPSAhaXNGdWxsc2NyZWVuOyBcblxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gKCBpc0Z1bGxzY3JlZW4gKSBcbiAgICAgICAgICAgICAgICAgICAgPyAndXJsKFwiJyArIERhdGFJbWFnZS5GdWxsc2NyZWVuTGVhdmUgKyAnXCIpJyBcbiAgICAgICAgICAgICAgICAgICAgOiAndXJsKFwiJyArIERhdGFJbWFnZS5GdWxsc2NyZWVuRW50ZXIgKyAnXCIpJztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICogQGV2ZW50IFdpZGdldCNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICdvbldpbmRvd1Jlc2l6ZScgZnVuY3Rpb24gY2FsbCBvbiBWaWV3ZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdvbldpbmRvd1Jlc2l6ZScgfSApO1xuXG4gICAgICAgICAgICB0YXBTa2lwcGVkID0gdHJ1ZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIGZhbHNlICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuQ2hhbmdlLCBmYWxzZSApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW96ZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbFNjcmVlbkNoYW5nZSwgZmFsc2UgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ01TRnVsbHNjcmVlbkNoYW5nZScsIG9uRnVsbFNjcmVlbkNoYW5nZSwgZmFsc2UgKTtcblxuICAgICAgICBpdGVtID0gdGhpcy5jcmVhdGVDdXN0b21JdGVtKCB7IFxuXG4gICAgICAgICAgICBzdHlsZTogeyBcblxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChcIicgKyBEYXRhSW1hZ2UuRnVsbHNjcmVlbkVudGVyICsgJ1wiKScgXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uVGFwOiBvblRhcFxuXG4gICAgICAgIH0gKTtcblxuICAgICAgICAvLyBBZGQgZnVsbHNjcmVlbiBzdGx5ZSBpZiBub3QgZXhpc3RzXG4gICAgICAgIGlmICggIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHN0eWxlc2hlZXRJZCApICkge1xuICAgICAgICAgICAgY29uc3Qgc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3R5bGUnICk7XG4gICAgICAgICAgICBzaGVldC5pZCA9IHN0eWxlc2hlZXRJZDtcbiAgICAgICAgICAgIHNoZWV0LmlubmVySFRNTCA9ICc6LXdlYmtpdC1mdWxsLXNjcmVlbiB7IHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IGhlaWdodDogMTAwJSAhaW1wb3J0YW50IH0nO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggc2hlZXQgKTtcbiAgICAgICAgfVxuXHRcdFxuICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdmlkZW8gY29udHJvbCBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fSAtIFRoZSBkb20gZWxlbWVudCBpY29uIGZvciB2aWRlbyBjb250cm9sXG4gICAgICovXG4gICAgY3JlYXRlVmlkZW9Db250cm9sOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGl0ZW0uc2hvdyA9IGZ1bmN0aW9uICgpIHsgXG5cbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS5oaWRlID0gZnVuY3Rpb24gKCkgeyBcblxuICAgICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgaXRlbS5jb250cm9sQnV0dG9uLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICBpdGVtLmNvbnRyb2xCdXR0b24udXBkYXRlKCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpdGVtLmNvbnRyb2xCdXR0b24gPSB0aGlzLmNyZWF0ZVZpZGVvQ29udHJvbEJ1dHRvbigpO1xuICAgICAgICBpdGVtLnNlZWtCYXIgPSB0aGlzLmNyZWF0ZVZpZGVvQ29udHJvbFNlZWtiYXIoKTtcblx0XHRcbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZCggaXRlbS5jb250cm9sQnV0dG9uICk7XG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoIGl0ZW0uc2Vla0JhciApO1xuXG4gICAgICAgIGl0ZW0uZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaXRlbS5yZW1vdmVDaGlsZCggaXRlbS5jb250cm9sQnV0dG9uICk7XG4gICAgICAgICAgICBpdGVtLnJlbW92ZUNoaWxkKCBpdGVtLnNlZWtCYXIgKTtcblxuICAgICAgICAgICAgaXRlbS5jb250cm9sQnV0dG9uLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGl0ZW0uY29udHJvbEJ1dHRvbiA9IG51bGw7XG5cbiAgICAgICAgICAgIGl0ZW0uc2Vla0Jhci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBpdGVtLnNlZWtCYXIgPSBudWxsO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAndmlkZW8tY29udHJvbC1zaG93JywgaXRlbS5zaG93ICk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3ZpZGVvLWNvbnRyb2wtaGlkZScsIGl0ZW0uaGlkZSApO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB2aWRlbyBjb250cm9sIGJ1dHRvblxuICAgICAqIEBtZW1iZXJPZiBXaWRnZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9IC0gVGhlIGRvbSBlbGVtZW50IGljb24gZm9yIHZpZGVvIGNvbnRyb2xcbiAgICAgKiBAZmlyZXMgV2lkZ2V0I3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG4gICAgICovXG4gICAgY3JlYXRlVmlkZW9Db250cm9sQnV0dG9uOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uVGFwICggZXZlbnQgKSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBldmVudCBXaWRnZXQjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndG9nZ2xlVmlkZW9QbGF5JyBmdW5jdGlvbiBjYWxsIG9uIFZpZXdlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3RvZ2dsZVZpZGVvUGxheScsIGRhdGE6ICF0aGlzLnBhdXNlZCB9ICk7XG5cbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gIXRoaXMucGF1c2VkO1xuXG4gICAgICAgICAgICBpdGVtLnVwZGF0ZSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlQ3VzdG9tSXRlbSggeyBcblxuICAgICAgICAgICAgc3R5bGU6IHsgXG5cbiAgICAgICAgICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChcIicgKyBEYXRhSW1hZ2UuVmlkZW9QbGF5ICsgJ1wiKSdcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25UYXA6IG9uVGFwXG5cbiAgICAgICAgfSApO1xuXG4gICAgICAgIGl0ZW0ucGF1c2VkID0gdHJ1ZTtcblxuICAgICAgICBpdGVtLnVwZGF0ZSA9IGZ1bmN0aW9uICggcGF1c2VkICkge1xuXG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IHBhdXNlZCAhPT0gdW5kZWZpbmVkID8gcGF1c2VkIDogdGhpcy5wYXVzZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIicgKyAoIHRoaXMucGF1c2VkIFxuICAgICAgICAgICAgICAgID8gRGF0YUltYWdlLlZpZGVvUGxheSBcbiAgICAgICAgICAgICAgICA6IERhdGFJbWFnZS5WaWRlb1BhdXNlICkgKyAnXCIpJztcblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB2aWRlbyBzZWVrYmFyXG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH0gLSBUaGUgZG9tIGVsZW1lbnQgaWNvbiBmb3IgdmlkZW8gc2Vla2JhclxuICAgICAqIEBmaXJlcyBXaWRnZXQjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgKi9cbiAgICBjcmVhdGVWaWRlb0NvbnRyb2xTZWVrYmFyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IHNjb3BlID0gdGhpcywgaXRlbSwgcHJvZ3Jlc3NFbGVtZW50LCBwcm9ncmVzc0VsZW1lbnRDb250cm9sLFxuICAgICAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlLCBtb3VzZVgsIHBlcmNlbnRhZ2VOb3csIHBlcmNlbnRhZ2VOZXh0O1xuXG4gICAgICAgIHByb2dyZXNzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG4gICAgICAgIHByb2dyZXNzRWxlbWVudC5zdHlsZS53aWR0aCA9ICcwJSc7XG4gICAgICAgIHByb2dyZXNzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIHByb2dyZXNzRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZic7XG5cbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG4gICAgICAgIHByb2dyZXNzRWxlbWVudENvbnRyb2wuc3R5bGUuZmxvYXQgPSAncmlnaHQnO1xuICAgICAgICBwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLndpZHRoID0gJzE0cHgnO1xuICAgICAgICBwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLmhlaWdodCA9ICcxNHB4JztcbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDdweCwgLTVweCknO1xuICAgICAgICBwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xuICAgICAgICBwcm9ncmVzc0VsZW1lbnRDb250cm9sLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZGRkJztcblxuICAgICAgICBwcm9ncmVzc0VsZW1lbnRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50Q29udHJvbC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uTW91c2VEb3duLCAgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNlRG93biAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFxuICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG5cdFx0XHRcbiAgICAgICAgICAgIG1vdXNlWCA9IGV2ZW50LmNsaWVudFggfHwgKCBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYICk7XG5cbiAgICAgICAgICAgIHBlcmNlbnRhZ2VOb3cgPSBwYXJzZUludCggcHJvZ3Jlc3NFbGVtZW50LnN0eWxlLndpZHRoICkgLyAxMDA7XG5cbiAgICAgICAgICAgIGFkZENvbnRyb2xMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uVmlkZW9Db250cm9sRHJhZyAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICBpZiggaXNEcmFnZ2luZyApe1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2xpZW50WCA9IGV2ZW50LmNsaWVudFggfHwgKCBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYICk7XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2VOZXh0ID0gKCBjbGllbnRYIC0gbW91c2VYICkgLyBpdGVtLmNsaWVudFdpZHRoO1xuXG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZU5leHQgPSBwZXJjZW50YWdlTm93ICsgcGVyY2VudGFnZU5leHQ7XG5cbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlTmV4dCA9IHBlcmNlbnRhZ2VOZXh0ID4gMSA/IDEgOiAoICggcGVyY2VudGFnZU5leHQgPCAwICkgPyAwIDogcGVyY2VudGFnZU5leHQgKTtcblxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0UHJvZ3Jlc3MgKCBwZXJjZW50YWdlTmV4dCApO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogVmlld2VyIGhhbmRsZXIgZXZlbnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICAgICAqIEBldmVudCBXaWRnZXQjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3NldFZpZGVvQ3VycmVudFRpbWUnIGZ1bmN0aW9uIGNhbGwgb24gVmlld2VyXG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEgLSBQZXJjZW50YWdlIG9mIGN1cnJlbnQgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnc2V0VmlkZW9DdXJyZW50VGltZScsIGRhdGE6IHBlcmNlbnRhZ2VOZXh0IH0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvblZpZGVvQ29udHJvbFN0b3AgKCBldmVudCApIHtcblxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgcmVtb3ZlQ29udHJvbExpc3RlbmVycygpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRDb250cm9sTGlzdGVuZXJzICgpIHtcblxuICAgICAgICAgICAgc2NvcGUuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBvblZpZGVvQ29udHJvbERyYWcsIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgICAgICBzY29wZS5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvblZpZGVvQ29udHJvbFN0b3AsIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgICAgICBzY29wZS5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIG9uVmlkZW9Db250cm9sRHJhZywgeyBwYXNzaXZlOiB0cnVlIH0gKTtcbiAgICAgICAgICAgIHNjb3BlLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBvblZpZGVvQ29udHJvbFN0b3AsIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlQ29udHJvbExpc3RlbmVycyAoKSB7XG5cbiAgICAgICAgICAgIHNjb3BlLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgb25WaWRlb0NvbnRyb2xEcmFnLCBmYWxzZSApO1xuICAgICAgICAgICAgc2NvcGUuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgb25WaWRlb0NvbnRyb2xTdG9wLCBmYWxzZSApO1xuICAgICAgICAgICAgc2NvcGUuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblZpZGVvQ29udHJvbERyYWcsIGZhbHNlICk7XG4gICAgICAgICAgICBzY29wZS5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgb25WaWRlb0NvbnRyb2xTdG9wLCBmYWxzZSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmICggZXZlbnQudGFyZ2V0ID09PSBwcm9ncmVzc0VsZW1lbnRDb250cm9sICkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9ICggZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID4gMCApXG4gICAgICAgICAgICAgICAgPyAoIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKSAvIHRoaXMuY2xpZW50V2lkdGhcbiAgICAgICAgICAgICAgICA6IGV2ZW50Lm9mZnNldFggLyB0aGlzLmNsaWVudFdpZHRoO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtICdzZXRWaWRlb0N1cnJlbnRUaW1lJyBmdW5jdGlvbiBjYWxsIG9uIFZpZXdlclxuICAgICAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEgLSBQZXJjZW50YWdlIG9mIGN1cnJlbnQgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3NldFZpZGVvQ3VycmVudFRpbWUnLCBkYXRhOiBwZXJjZW50YWdlIH0gKTtcblxuICAgICAgICAgICAgaXRlbS5zZXRQcm9ncmVzcyggZXZlbnQub2Zmc2V0WCAvIHRoaXMuY2xpZW50V2lkdGggKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uRGlzcG9zZSAoKSB7XG5cbiAgICAgICAgICAgIHJlbW92ZUNvbnRyb2xMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnRDb250cm9sID0gbnVsbDtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LmFwcGVuZENoaWxkKCBwcm9ncmVzc0VsZW1lbnRDb250cm9sICk7XG5cbiAgICAgICAgaXRlbSA9IHRoaXMuY3JlYXRlQ3VzdG9tSXRlbSgge1xuXG4gICAgICAgICAgICBzdHlsZTogeyBcblxuICAgICAgICAgICAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICczMCUnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzRweCcsXG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgxODgsMTg4LDE4OCwwLjgpJ1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblRhcDogb25UYXAsXG4gICAgICAgICAgICBvbkRpc3Bvc2U6IG9uRGlzcG9zZVxuXG4gICAgICAgIH0gKTtcblxuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKCBwcm9ncmVzc0VsZW1lbnQgKTtcblxuICAgICAgICBpdGVtLnNldFByb2dyZXNzID0gZnVuY3Rpb24oIHBlcmNlbnRhZ2UgKSB7XG5cbiAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudC5zdHlsZS53aWR0aCA9IHBlcmNlbnRhZ2UgKiAxMDAgKyAnJSc7XG5cbiAgICAgICAgfTtcdFx0XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAndmlkZW8tdXBkYXRlJywgZnVuY3Rpb24gKCBldmVudCApIHsgXG5cbiAgICAgICAgICAgIGl0ZW0uc2V0UHJvZ3Jlc3MoIGV2ZW50LnBlcmNlbnRhZ2UgKTsgXG5cbiAgICAgICAgfSApO1xuXG4gICAgICAgIGl0ZW0ucHJvZ3Jlc3NFbGVtZW50ID0gcHJvZ3Jlc3NFbGVtZW50O1xuICAgICAgICBpdGVtLnByb2dyZXNzRWxlbWVudENvbnRyb2wgPSBwcm9ncmVzc0VsZW1lbnRDb250cm9sO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBtZW51IGl0ZW1cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHRpdGxlIC0gVGl0bGUgdG8gZGlzcGxheVxuICAgICAqIEBtZW1iZXJPZiBXaWRnZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBBbiBhbmNob3IgdGFnIGVsZW1lbnRcbiAgICAgKi9cbiAgICBjcmVhdGVNZW51SXRlbTogZnVuY3Rpb24gKCB0aXRsZSApIHtcblxuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXM7IFxuICAgICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2EnICk7XG4gICAgICAgIGl0ZW0udGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgaXRlbS5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgICAgICBpdGVtLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnO1xuICAgICAgICBpdGVtLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgaXRlbS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICBpdGVtLnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTjtcblxuICAgICAgICBpdGVtLnNsaWRlID0gZnVuY3Rpb24gKCByaWdodCApIHtcblxuICAgICAgICAgICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgKCByaWdodCA/ICcnIDogJy0nICkgKyAnMTAwJSknO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS51bnNsaWRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB0aGlzLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDApJztcblxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0uc2V0SWNvbiA9IGZ1bmN0aW9uICggdXJsICkge1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuaWNvbiApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyB1cmwgKyAnKSc7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0uc2V0U2VsZWN0aW9uVGl0bGUgPSBmdW5jdGlvbiAoIHRpdGxlICkge1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuc2VsZWN0aW9uICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24udGV4dENvbnRlbnQgPSB0aXRsZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS5hZGRTZWxlY3Rpb24gPSBmdW5jdGlvbiAoIG5hbWUgKSB7XG5cdFx0XHRcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuICAgICAgICAgICAgc2VsZWN0aW9uLnN0eWxlLmZvbnRTaXplID0gJzEzcHgnO1xuICAgICAgICAgICAgc2VsZWN0aW9uLnN0eWxlLmZvbnRXZWlnaHQgPSAnMzAwJztcbiAgICAgICAgICAgIHNlbGVjdGlvbi5zdHlsZS5mbG9hdCA9ICdyaWdodCc7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25UaXRsZSggbmFtZSApO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCggc2VsZWN0aW9uICk7XG5cdFx0XHRcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS5hZGRJY29uID0gZnVuY3Rpb24gKCB1cmwgPSBEYXRhSW1hZ2UuQ2hldnJvblJpZ2h0LCBsZWZ0ID0gZmFsc2UsIGZsaXAgPSBmYWxzZSApIHtcblx0XHRcdFxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5mbG9hdCA9IGxlZnQgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxN3B4JztcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzE3cHgnO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVsgJ21hcmdpbicgKyAoIGxlZnQgPyAnUmlnaHQnIDogJ0xlZnQnICkgXSA9ICcxMnB4JztcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnY292ZXInO1xuXG4gICAgICAgICAgICBpZiAoIGZsaXAgKSB7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVaKDE4MGRlZyknO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaWNvbiA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnNldEljb24oIHVybCApO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9O1xuXG4gICAgICAgIGl0ZW0uYWRkU3ViTWVudSA9IGZ1bmN0aW9uICggdGl0bGUsIGl0ZW1zICkge1xuXG4gICAgICAgICAgICB0aGlzLnN1Yk1lbnUgPSBzY29wZS5jcmVhdGVTdWJNZW51KCB0aXRsZSwgaXRlbXMgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZTBlMGUwJztcblxuICAgICAgICB9LCBmYWxzZSApO1xuXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmYWZhZmEnO1xuXG4gICAgICAgIH0sIGZhbHNlICk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG1lbnUgaXRlbSBoZWFkZXJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHRpdGxlIC0gVGl0bGUgdG8gZGlzcGxheVxuICAgICAqIEBtZW1iZXJPZiBXaWRnZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBBbiBhbmNob3IgdGFnIGVsZW1lbnRcbiAgICAgKi9cbiAgICBjcmVhdGVNZW51SXRlbUhlYWRlcjogZnVuY3Rpb24gKCB0aXRsZSApIHtcblxuICAgICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmNyZWF0ZU1lbnVJdGVtKCB0aXRsZSApO1xuXG4gICAgICAgIGhlYWRlci5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMXB4IHNvbGlkICMzMzMnO1xuICAgICAgICBoZWFkZXIuc3R5bGUucGFkZGluZ0JvdHRvbSA9ICcxNXB4JztcblxuICAgICAgICByZXR1cm4gaGVhZGVyO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBtYWluIG1lbnVcbiAgICAgKiBAcGFyYW0gIHthcnJheX0gbWVudXMgLSBNZW51IGFycmF5IGxpc3RcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9IC0gQSBzcGFuIGVsZW1lbnRcbiAgICAgKi9cbiAgICBjcmVhdGVNYWluTWVudTogZnVuY3Rpb24gKCBtZW51cyApIHtcblx0XHRcbiAgICAgICAgbGV0IHNjb3BlID0gdGhpcywgbWVudSA9IHRoaXMuY3JlYXRlTWVudSgpO1xuXG4gICAgICAgIG1lbnUuX3dpZHRoID0gMjAwO1xuICAgICAgICBtZW51LmNoYW5nZVNpemUoIG1lbnUuX3dpZHRoICk7XG5cbiAgICAgICAgZnVuY3Rpb24gb25UYXAgKCBldmVudCApIHtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBsZXQgbWFpbk1lbnUgPSBzY29wZS5tYWluTWVudSwgc3ViTWVudSA9IHRoaXMuc3ViTWVudTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb25OZXh0VGljayAoKSB7XG5cbiAgICAgICAgICAgICAgICBtYWluTWVudS5jaGFuZ2VTaXplKCBzdWJNZW51LmNsaWVudFdpZHRoICk7XG4gICAgICAgICAgICAgICAgc3ViTWVudS5zaG93KCk7XG4gICAgICAgICAgICAgICAgc3ViTWVudS51bnNsaWRlQWxsKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWFpbk1lbnUuaGlkZSgpO1xuICAgICAgICAgICAgbWFpbk1lbnUuc2xpZGVBbGwoKTtcbiAgICAgICAgICAgIG1haW5NZW51LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIHN1Yk1lbnUgKTtcblxuICAgICAgICAgICAgc2NvcGUuYWN0aXZlTWFpbkl0ZW0gPSB0aGlzO1xuICAgICAgICAgICAgc2NvcGUuYWN0aXZlU3ViTWVudSA9IHN1Yk1lbnU7XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIG9uTmV4dFRpY2sgKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IG1lbnVzLmxlbmd0aDsgaSsrICkge1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbWVudS5hZGRJdGVtKCBtZW51c1sgaSBdLnRpdGxlICk7XG5cbiAgICAgICAgICAgIGl0ZW0uc3R5bGUucGFkZGluZ0xlZnQgPSAnMjBweCc7XG5cbiAgICAgICAgICAgIGl0ZW0uYWRkSWNvbigpXG4gICAgICAgICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgb25UYXAsIGZhbHNlICk7XG5cbiAgICAgICAgICAgIGlmICggbWVudXNbIGkgXS5zdWJNZW51ICYmIG1lbnVzWyBpIF0uc3ViTWVudS5sZW5ndGggPiAwICkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBtZW51c1sgaSBdLnN1Yk1lbnVbIDAgXS50aXRsZTtcblxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkU2VsZWN0aW9uKCB0aXRsZSApXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTdWJNZW51KCBtZW51c1sgaSBdLnRpdGxlLCBtZW51c1sgaSBdLnN1Yk1lbnUgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVudTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgc3ViIG1lbnVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGUgLSBTdWIgbWVudSB0aXRsZVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGl0ZW1zIC0gSXRlbSBhcnJheSBsaXN0XG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAtIEEgc3BhbiBlbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlU3ViTWVudTogZnVuY3Rpb24gKCB0aXRsZSwgaXRlbXMgKSB7XG5cbiAgICAgICAgbGV0IHNjb3BlID0gdGhpcywgbWVudSwgc3ViTWVudSA9IHRoaXMuY3JlYXRlTWVudSgpO1xuXG4gICAgICAgIHN1Yk1lbnUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgc3ViTWVudS5hY3RpdmVJdGVtID0gbnVsbDtcblxuICAgICAgICBmdW5jdGlvbiBvblRhcCAoIGV2ZW50ICkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIG1lbnUgPSBzY29wZS5tYWluTWVudTtcbiAgICAgICAgICAgIG1lbnUuY2hhbmdlU2l6ZSggbWVudS5fd2lkdGggKTtcbiAgICAgICAgICAgIG1lbnUudW5zbGlkZUFsbCgpO1xuICAgICAgICAgICAgbWVudS5zaG93KCk7XG4gICAgICAgICAgICBzdWJNZW51LnNsaWRlQWxsKCB0cnVlICk7XG4gICAgICAgICAgICBzdWJNZW51LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLnR5cGUgIT09ICdoZWFkZXInICkge1xuXG4gICAgICAgICAgICAgICAgc3ViTWVudS5zZXRBY3RpdmVJdGVtKCB0aGlzICk7XG4gICAgICAgICAgICAgICAgc2NvcGUuYWN0aXZlTWFpbkl0ZW0uc2V0U2VsZWN0aW9uVGl0bGUoIHRoaXMudGV4dENvbnRlbnQgKTtcblxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5oYW5kbGVyICkgeyB0aGlzLmhhbmRsZXIoKTsgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHN1Yk1lbnUuYWRkSGVhZGVyKCB0aXRsZSApLmFkZEljb24oIHVuZGVmaW5lZCwgdHJ1ZSwgdHJ1ZSApLmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ2NsaWNrJywgb25UYXAsIGZhbHNlICk7XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKysgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzdWJNZW51LmFkZEl0ZW0oIGl0ZW1zWyBpIF0udGl0bGUgKTtcblxuICAgICAgICAgICAgaXRlbS5zdHlsZS5mb250V2VpZ2h0ID0gMzAwO1xuICAgICAgICAgICAgaXRlbS5oYW5kbGVyID0gaXRlbXNbIGkgXS5oYW5kbGVyO1xuICAgICAgICAgICAgaXRlbS5hZGRJY29uKCAnICcsIHRydWUgKTtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciggc2NvcGUuVE9VQ0hfRU5BQkxFRCA/ICd0b3VjaGVuZCcgOiAnY2xpY2snLCBvblRhcCwgZmFsc2UgKTtcblxuICAgICAgICAgICAgaWYgKCAhc3ViTWVudS5hY3RpdmVJdGVtICkge1xuXG4gICAgICAgICAgICAgICAgc3ViTWVudS5zZXRBY3RpdmVJdGVtKCBpdGVtICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgc3ViTWVudS5zbGlkZUFsbCggdHJ1ZSApO1xuXG4gICAgICAgIHJldHVybiBzdWJNZW51O1xuXHRcdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgZ2VuZXJhbCBtZW51XG4gICAgICogQG1lbWJlck9mIFdpZGdldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAtIEEgc3BhbiBlbGVtZW50XG4gICAgICovXG4gICAgY3JlYXRlTWVudTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcztcbiAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG1lbnUuc3R5bGU7XG5cbiAgICAgICAgc3R5bGUucGFkZGluZyA9ICc1cHggMCc7XG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgc3R5bGUuYm90dG9tID0gJzEwMCUnO1xuICAgICAgICBzdHlsZS5yaWdodCA9ICcxNHB4JztcbiAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmYWZhZmEnO1xuICAgICAgICBzdHlsZS5mb250RmFtaWx5ID0gJ0hlbHZldGljYSBOZXVlJztcbiAgICAgICAgc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIHN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMTJwdCByZ2JhKDAsMCwwLDAuMjUpJztcbiAgICAgICAgc3R5bGUuYm9yZGVyUmFkaXVzID0gJzJweCc7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIHN0eWxlLndpbGxDaGFuZ2UgPSAnd2lkdGgsIGhlaWdodCwgb3BhY2l0eSc7XG4gICAgICAgIHN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgIHN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLkRFRkFVTFRfVFJBTlNJVElPTjtcblxuICAgICAgICBtZW51LnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICBtZW51LmNoYW5nZVNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cbiAgICAgICAgICAgIGlmICggd2lkdGggKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggaGVpZ2h0ICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LnNob3cgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgbWVudS5oaWRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB0aGlzLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIG1lbnUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMudmlzaWJsZSApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIG1lbnUuc2xpZGVBbGwgPSBmdW5jdGlvbiAoIHJpZ2h0ICkge1xuXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBtZW51LmNoaWxkcmVuLmxlbmd0aDsgaSsrICl7XG5cbiAgICAgICAgICAgICAgICBpZiAoIG1lbnUuY2hpbGRyZW5bIGkgXS5zbGlkZSApIHtcblxuICAgICAgICAgICAgICAgICAgICBtZW51LmNoaWxkcmVuWyBpIF0uc2xpZGUoIHJpZ2h0ICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIG1lbnUudW5zbGlkZUFsbCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbWVudS5jaGlsZHJlbi5sZW5ndGg7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgaWYgKCBtZW51LmNoaWxkcmVuWyBpIF0udW5zbGlkZSApIHtcblxuICAgICAgICAgICAgICAgICAgICBtZW51LmNoaWxkcmVuWyBpIF0udW5zbGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LmFkZEhlYWRlciA9IGZ1bmN0aW9uICggdGl0bGUgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHNjb3BlLmNyZWF0ZU1lbnVJdGVtSGVhZGVyKCB0aXRsZSApO1xuICAgICAgICAgICAgaGVhZGVyLnR5cGUgPSAnaGVhZGVyJztcblxuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCggaGVhZGVyICk7XG5cbiAgICAgICAgICAgIHJldHVybiBoZWFkZXI7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LmFkZEl0ZW0gPSBmdW5jdGlvbiAoIHRpdGxlICkge1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gc2NvcGUuY3JlYXRlTWVudUl0ZW0oIHRpdGxlICk7XG4gICAgICAgICAgICBpdGVtLnR5cGUgPSAnaXRlbSc7XG5cbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoIGl0ZW0gKTtcblxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LnNldEFjdGl2ZUl0ZW0gPSBmdW5jdGlvbiAoIGl0ZW0gKSB7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5hY3RpdmVJdGVtICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldEljb24oICcgJyApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uc2V0SWNvbiggRGF0YUltYWdlLkNoZWNrICk7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW07XG5cbiAgICAgICAgfTtcblxuICAgICAgICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCB0aGlzLlBSRVZFTlRfRVZFTlRfSEFORExFUiwgdHJ1ZSApO1xuICAgICAgICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcbiAgICAgICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5QUkVWRU5UX0VWRU5UX0hBTkRMRVIsIHRydWUgKTtcblxuICAgICAgICByZXR1cm4gbWVudTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgY3VzdG9tIGl0ZW0gZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBXaWRnZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9IC0gVGhlIGRvbSBlbGVtZW50IGljb25cbiAgICAgKi9cbiAgICBjcmVhdGVDdXN0b21JdGVtOiBmdW5jdGlvbiAoIG9wdGlvbnMgPSB7fSApIHtcblxuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBvcHRpb25zLmVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XG4gICAgICAgIGNvbnN0IHsgb25EaXNwb3NlIH0gPSBvcHRpb25zO1xuXG4gICAgICAgIGl0ZW0uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICBpdGVtLnN0eWxlLmZsb2F0ID0gJ3JpZ2h0JztcbiAgICAgICAgaXRlbS5zdHlsZS53aWR0aCA9ICc0NHB4JztcbiAgICAgICAgaXRlbS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNjAlJztcbiAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VXNlclNlbGVjdCA9IFxuXHRcdGl0ZW0uc3R5bGUuTW96VXNlclNlbGVjdCA9IFxuXHRcdGl0ZW0uc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcbiAgICAgICAgaXRlbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgIGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcblxuICAgICAgICAvLyBXaGl0ZSBnbG93IG9uIGljb25cbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZmlsdGVyID0gXG5cdFx0XHRpdGVtLnN0eWxlLndlYmtpdEZpbHRlciA9ICdkcm9wLXNoYWRvdygwIDAgNXB4IHJnYmEoMjU1LDI1NSwyNTUsMSkpJztcbiAgICAgICAgfSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoIHNjb3BlLlRPVUNIX0VOQUJMRUQgPyAndG91Y2hlbmQnIDogJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZmlsdGVyID0gXG5cdFx0XHRpdGVtLnN0eWxlLndlYmtpdEZpbHRlciA9ICcnO1xuICAgICAgICB9LCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgdGhpcy5tZXJnZVN0eWxlT3B0aW9ucyggaXRlbSwgb3B0aW9ucy5zdHlsZSApO1xuXG4gICAgICAgIGlmICggb3B0aW9ucy5vblRhcCApIHtcblxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsIG9wdGlvbnMub25UYXAsIGZhbHNlICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKCBzY29wZS5UT1VDSF9FTkFCTEVEID8gJ3RvdWNoZW5kJyA6ICdjbGljaycsIG9wdGlvbnMub25UYXAsIGZhbHNlICk7XG5cbiAgICAgICAgICAgIGlmICggb25EaXNwb3NlICkgeyBvcHRpb25zLm9uRGlzcG9zZSgpOyB9XG5cbiAgICAgICAgfTtcblx0XHRcbiAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgaXRlbSBjc3Mgc3R5bGVcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIGJlIG1lcmdlZCB3aXRoIHN0eWxlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIHN0eWxlIG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9IC0gVGhlIHNhbWUgZWxlbWVudCB3aXRoIG1lcmdlZCBzdHlsZXNcbiAgICAgKi9cbiAgICBtZXJnZVN0eWxlT3B0aW9uczogZnVuY3Rpb24gKCBlbGVtZW50LCBvcHRpb25zID0ge30gKSB7XG5cbiAgICAgICAgZm9yICggbGV0IHByb3BlcnR5IGluIG9wdGlvbnMgKXtcblxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLmhhc093blByb3BlcnR5KCBwcm9wZXJ0eSApICkge1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVsgcHJvcGVydHkgXSA9IG9wdGlvbnNbIHByb3BlcnR5IF07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzcG9zZSB3aWRnZXRzIGJ5IGRldGFjaGluZyBkb20gZWxlbWVudHMgZnJvbSBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgV2lkZ2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5iYXJFbGVtZW50ICkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQoIHRoaXMuYmFyRWxlbWVudCApO1xuICAgICAgICAgICAgdGhpcy5iYXJFbGVtZW50LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuYmFyRWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXHRcbn0gKTtcblxuZXhwb3J0IHsgV2lkZ2V0IH07IiwiLyoqXG4gKiBFcXVpcmVjdGFuZ3VsYXIgc2hhZGVyXG4gKiBiYXNlZCBvbiB0aHJlZS5qcyBlcXVpcmVjdCBzaGFkZXJcbiAqIEBhdXRob3IgcGNoZW42NlxuICovXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gRXF1aXJlY3Rhbmd1bGFyIFNoYWRlclxuICogQG1vZHVsZSBFcXVpcmVjdFNoYWRlclxuICogQHByb3BlcnR5IHtvYmplY3R9IHVuaWZvcm1zXG4gKiBAcHJvcGVydHkge1RIUkVFLlRleHR1cmV9IHVuaWZvcm1zLnRFcXVpcmVjdCBkaWZmdXNlIG1hcFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVuaWZvcm1zLm9wYWNpdHkgaW1hZ2Ugb3BhY2l0eVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHZlcnRleFNoYWRlciB2ZXJ0ZXggc2hhZGVyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZnJhZ21lbnRTaGFkZXIgZnJhZ21lbnQgc2hhZGVyXG4gKi9cbmNvbnN0IEVxdWlyZWN0U2hhZGVyID0ge1xuXG4gICAgdW5pZm9ybXM6IHtcblxuICAgICAgICAndEVxdWlyZWN0JzogeyB2YWx1ZTogbmV3IFRIUkVFLlRleHR1cmUoKSB9LFxuICAgICAgICAncmVwZWF0JzogeyB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoIDEuMCwgMS4wICkgfSxcbiAgICAgICAgJ29mZnNldCc6IHsgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKCAwLjAsIDAuMCApIH0sXG4gICAgICAgICdvcGFjaXR5JzogeyB2YWx1ZTogMS4wIH1cblxuICAgIH0sXG5cbiAgICB2ZXJ0ZXhTaGFkZXI6IGBcbiAgICAgICAgdmFyeWluZyB2ZWMzIHZXb3JsZERpcmVjdGlvbjtcbiAgICAgICAgI2luY2x1ZGUgPGNvbW1vbj5cbiAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgICAgdldvcmxkRGlyZWN0aW9uID0gdHJhbnNmb3JtRGlyZWN0aW9uKCBwb3NpdGlvbiwgbW9kZWxNYXRyaXggKTtcbiAgICAgICAgICAgICNpbmNsdWRlIDxiZWdpbl92ZXJ0ZXg+XG4gICAgICAgICAgICAjaW5jbHVkZSA8cHJvamVjdF92ZXJ0ZXg+XG4gICAgICAgIH1cbiAgICBgLFxuXG4gICAgZnJhZ21lbnRTaGFkZXI6IGBcbiAgICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgdEVxdWlyZWN0O1xuICAgICAgICB1bmlmb3JtIHZlYzIgcmVwZWF0O1xuICAgICAgICB1bmlmb3JtIHZlYzIgb2Zmc2V0O1xuICAgICAgICB1bmlmb3JtIGZsb2F0IG9wYWNpdHk7XG4gICAgICAgIHZhcnlpbmcgdmVjMyB2V29ybGREaXJlY3Rpb247XG4gICAgICAgICNpbmNsdWRlIDxjb21tb24+XG4gICAgICAgIHZvaWQgbWFpbigpIHtcbiAgICAgICAgICAgIHZlYzMgZGlyZWN0aW9uID0gbm9ybWFsaXplKCB2V29ybGREaXJlY3Rpb24gKTtcbiAgICAgICAgICAgIHZlYzIgc2FtcGxlVVY7XG4gICAgICAgICAgICBzYW1wbGVVVi55ID0gYXNpbiggY2xhbXAoIGRpcmVjdGlvbi55LCAtIDEuMCwgMS4wICkgKSAqIFJFQ0lQUk9DQUxfUEkgKyAwLjU7XG4gICAgICAgICAgICBzYW1wbGVVVi54ID0gYXRhbiggZGlyZWN0aW9uLnosIGRpcmVjdGlvbi54ICkgKiBSRUNJUFJPQ0FMX1BJMiArIDAuNTtcbiAgICAgICAgICAgIHNhbXBsZVVWICo9IHJlcGVhdDtcbiAgICAgICAgICAgIHNhbXBsZVVWICs9IG9mZnNldDtcbiAgICAgICAgICAgIHZlYzQgdGV4Q29sb3IgPSB0ZXh0dXJlMkQoIHRFcXVpcmVjdCwgc2FtcGxlVVYgKTtcbiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IG1hcFRleGVsVG9MaW5lYXIoIHRleENvbG9yICk7XG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IuYSAqPSBvcGFjaXR5O1xuICAgICAgICAgICAgI2luY2x1ZGUgPHRvbmVtYXBwaW5nX2ZyYWdtZW50PlxuICAgICAgICAgICAgI2luY2x1ZGUgPGVuY29kaW5nc19mcmFnbWVudD5cbiAgICAgICAgfVxuICAgIGBcblxufTtcblxuZXhwb3J0IHsgRXF1aXJlY3RTaGFkZXIgfTsiLCJpbXBvcnQgeyBJbmZvc3BvdCB9IGZyb20gJy4uL2luZm9zcG90L0luZm9zcG90JztcbmltcG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4uL0RhdGFJbWFnZSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgVFdFRU4gZnJvbSAnQHR3ZWVuanMvdHdlZW4uanMnO1xuaW1wb3J0IHsgRXF1aXJlY3RTaGFkZXIgfSBmcm9tICcuLi9zaGFkZXJzL0VxdWlyZWN0U2hhZGVyJztcblxuXG4vKipcbiAqIEBjbGFzc2Rlc2MgQmFzZSBQYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1RIUkVFLkdlb21ldHJ5fSBnZW9tZXRyeSAtIFRoZSBnZW9tZXRyeSBmb3IgdGhpcyBwYW5vcmFtYVxuICogQHBhcmFtIHtUSFJFRS5NYXRlcmlhbH0gbWF0ZXJpYWwgLSBUaGUgbWF0ZXJpYWwgZm9yIHRoaXMgcGFub3JhbWFcbiAqL1xuZnVuY3Rpb24gUGFub3JhbWEgKCkge1xuXG4gICAgdGhpcy5lZGdlTGVuZ3RoID0gMTAwMDA7XG5cbiAgICBUSFJFRS5NZXNoLmNhbGwoIHRoaXMsIHRoaXMuY3JlYXRlR2VvbWV0cnkoIHRoaXMuZWRnZUxlbmd0aCApLCB0aGlzLmNyZWF0ZU1hdGVyaWFsKCkgKTtcblxuICAgIHRoaXMudHlwZSA9ICdwYW5vcmFtYSc7XG5cbiAgICB0aGlzLkltYWdlUXVhbGl0eUxvdyA9IDE7XG4gICAgdGhpcy5JbWFnZVF1YWxpdHlGYWlyID0gMjtcbiAgICB0aGlzLkltYWdlUXVhbGl0eU1lZGl1bSA9IDM7XG4gICAgdGhpcy5JbWFnZVF1YWxpdHlIaWdoID0gNDtcbiAgICB0aGlzLkltYWdlUXVhbGl0eVN1cGVySGlnaCA9IDU7XG5cbiAgICB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uID0gMTAwMDtcblxuICAgIHRoaXMuZGVmYXVsdEluZm9zcG90U2l6ZSA9IDM1MDtcblxuICAgIHRoaXMuY29udGFpbmVyID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcblxuICAgIHRoaXMubGlua2VkU3BvdHMgPSBbXTtcblxuICAgIHRoaXMuaXNJbmZvc3BvdFZpc2libGUgPSBmYWxzZTtcblx0XG4gICAgdGhpcy5saW5raW5nSW1hZ2VVUkwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5saW5raW5nSW1hZ2VTY2FsZSA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMucmVuZGVyT3JkZXIgPSAtMTtcblxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICB0aGlzLmluZm9zcG90QW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzICkudG8oIHt9LCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uIC8gMiApO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMuZmFkZUluLmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIHRoaXMuc2V0Q29udGFpbmVyLmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5vbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgdGhpcy5zZXR1cFRyYW5zaXRpb25zKCk7XG5cbn1cblxuUGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuTWVzaC5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IFBhbm9yYW1hLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc2t5Ym94IGdlb21ldHJ5XG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgY3JlYXRlR2VvbWV0cnk6IGZ1bmN0aW9uICggZWRnZUxlbmd0aCApIHtcblxuICAgICAgICByZXR1cm4gbmV3IFRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5KCBlZGdlTGVuZ3RoLCBlZGdlTGVuZ3RoLCBlZGdlTGVuZ3RoICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGVxdWlyZWN0YW5ndWxhciBzaGFkZXIgbWF0ZXJpYWxcbiAgICAgKiBAcGFyYW0ge1RIUkVFLlZlY3RvcjJ9IFtyZXBlYXQ9bmV3IFRIUkVFLlZlY3RvcjIoIDEsIDEgKV0gLSBUZXh0dXJlIFJlcGVhdFxuICAgICAqIEBwYXJhbSB7VEhSRUUuVmVjdG9yMn0gW29mZnNldD1uZXcgVEhSRUUuVmVjdG9yMiggMCwgMCApXSAtIFRleHR1cmUgT2Zmc2V0XG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgY3JlYXRlTWF0ZXJpYWw6IGZ1bmN0aW9uICggcmVwZWF0ID0gbmV3IFRIUkVFLlZlY3RvcjIoIDEsIDEgKSwgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIoIDAsIDAgKSApIHtcblxuICAgICAgICBjb25zdCB7IGZyYWdtZW50U2hhZGVyLCB2ZXJ0ZXhTaGFkZXIgfSA9IEVxdWlyZWN0U2hhZGVyO1xuICAgICAgICBjb25zdCB1bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMuY2xvbmUoIEVxdWlyZWN0U2hhZGVyLnVuaWZvcm1zICk7XG4gICAgICAgIFxuICAgICAgICB1bmlmb3Jtcy5yZXBlYXQudmFsdWUuY29weSggcmVwZWF0ICk7XG4gICAgICAgIHVuaWZvcm1zLm9mZnNldC52YWx1ZS5jb3B5KCBvZmZzZXQgKTtcbiAgICAgICAgdW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IDAuMDtcblxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCgge1xuXG4gICAgICAgICAgICBmcmFnbWVudFNoYWRlcixcbiAgICAgICAgICAgIHZlcnRleFNoYWRlcixcbiAgICAgICAgICAgIHVuaWZvcm1zLFxuICAgICAgICAgICAgc2lkZTogVEhSRUUuQmFja1NpZGUsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICBcbiAgICAgICAgfSApO1xuXG4gICAgICAgIHJldHVybiBtYXRlcmlhbDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGRpbmcgYW4gb2JqZWN0XG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtUSFJFRS5PYmplY3QzRH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBiZSBhZGRlZFxuICAgICAqL1xuICAgIGFkZDogZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cbiAgICAgICAgaWYgKCBhcmd1bWVudHMubGVuZ3RoID4gMSApIHtcblxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArKyApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWRkKCBhcmd1bWVudHNbIGkgXSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbiBjYXNlIG9mIGluZm9zcG90c1xuICAgICAgICBpZiAoIG9iamVjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG4gICAgICAgICAgICBjb25zdCB7IGNvbnRhaW5lciB9ID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCBjb250YWluZXIgKSB7IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy1jb250YWluZXInLCBjb250YWluZXIgfSApOyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBvYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtaW5mb3Nwb3QtZm9jdXMnLCBtZXRob2Q6IGZ1bmN0aW9uICggdmVjdG9yLCBkdXJhdGlvbiwgZWFzaW5nICkge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSW5mb3Nwb3QgZm9jdXMgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZCAtIFZpZXdlciBmdW5jdGlvbiBuYW1lXG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHsqfSBkYXRhIC0gVGhlIGFyZ3VtZW50IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBtZXRob2RcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndHdlZW5Db250cm9sQ2VudGVyJywgZGF0YTogWyB2ZWN0b3IsIGR1cmF0aW9uLCBlYXNpbmcgXSB9ICk7XG5cblxuICAgICAgICAgICAgfS5iaW5kKCB0aGlzICkgfSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUuYWRkLmNhbGwoIHRoaXMsIG9iamVjdCApO1xuXG4gICAgfSxcblxuICAgIGdldFRleHR1cmU6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudEVxdWlyZWN0LnZhbHVlO1xuXG4gICAgfSxcblxuICAgIGxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLm9uTG9hZCgpO1xuXHRcdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDbGljayBldmVudCBoYW5kbGVyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIENsaWNrIGV2ZW50XG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIEluZm9zcG90I2Rpc21pc3NcbiAgICAgKi9cbiAgICBvbkNsaWNrOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGlmICggZXZlbnQuaW50ZXJzZWN0cyAmJiBldmVudC5pbnRlcnNlY3RzLmxlbmd0aCA9PT0gMCApIHtcblxuICAgICAgICAgICAgdGhpcy50cmF2ZXJzZSggZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEaW1pc3MgZXZlbnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICAgICAqIEBldmVudCBJbmZvc3BvdCNkaXNtaXNzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgb2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2Rpc21pc3MnIH0gKTtcblxuICAgICAgICAgICAgfSApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgY29udGFpbmVyIG9mIHRoaXMgcGFub3JhbWEgXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxvYmplY3R9IGRhdGEgLSBEYXRhIHdpdGggY29udGFpbmVyIGluZm9ybWF0aW9uXG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIEluZm9zcG90I3Bhbm9sZW5zLWNvbnRhaW5lclxuICAgICAqL1xuICAgIHNldENvbnRhaW5lcjogZnVuY3Rpb24gKCBkYXRhICkge1xuXG4gICAgICAgIGxldCBjb250YWluZXI7XG5cbiAgICAgICAgaWYgKCBkYXRhIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRhdGE7XG5cbiAgICAgICAgfSBlbHNlIGlmICggZGF0YSAmJiBkYXRhLmNvbnRhaW5lciApIHtcblxuICAgICAgICAgICAgY29udGFpbmVyID0gZGF0YS5jb250YWluZXI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggY29udGFpbmVyICkge1xuXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goIGZ1bmN0aW9uICggY2hpbGQgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkIGluc3RhbmNlb2YgSW5mb3Nwb3QgJiYgY2hpbGQuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogU2V0IGNvbnRhaW5lciBldmVudFxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICAgICAgICAgKiBAZXZlbnQgSW5mb3Nwb3QjcGFub2xlbnMtY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciAtIFRoZSBjb250YWluZXIgb2YgdGhpcyBwYW5vcmFtYVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtY29udGFpbmVyJywgY29udGFpbmVyOiBjb250YWluZXIgfSApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9ICk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gcGFub3JhbWEgaXMgbG9hZGVkXG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFBhbm9yYW1hI2xvYWRcbiAgICAgKi9cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvYWQgcGFub3JhbWEgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI2xvYWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnbG9hZCcgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiBwYW5vcmFtYSBpcyBpbiBwcm9ncmVzc1xuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBQYW5vcmFtYSNwcm9ncmVzc1xuICAgICAqL1xuICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uICggcHJvZ3Jlc3MgKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvYWRpbmcgcGFub3JhbWEgcHJvZ3Jlc3MgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI3Byb2dyZXNzXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBwcm9ncmVzcyAtIFRoZSBwcm9ncmVzcyBvYmplY3QgY29udGFpbmluZyBsb2FkZWQgYW5kIHRvdGFsIGFtb3VudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcm9ncmVzcycsIHByb2dyZXNzOiBwcm9ncmVzcyB9ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIHBhbm9yYW1hIGxvYWRpbmcgaGFzIGVycm9yXG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFBhbm9yYW1hI2Vycm9yXG4gICAgICovXG4gICAgb25FcnJvcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb2FkaW5nIHBhbm9yYW1hIGVycm9yIGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNlcnJvclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlcnJvcicgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB6b29tIGxldmVsIGJhc2VkIG9uIHdpbmRvdyB3aWR0aFxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gem9vbSBsZXZlbCBpbmRpY2F0aW5nIGltYWdlIHF1YWxpdHlcbiAgICAgKi9cbiAgICBnZXRab29tTGV2ZWw6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgem9vbUxldmVsO1xuXG4gICAgICAgIGlmICggd2luZG93LmlubmVyV2lkdGggPD0gODAwICkge1xuXG4gICAgICAgICAgICB6b29tTGV2ZWwgPSB0aGlzLkltYWdlUXVhbGl0eUZhaXI7XG5cbiAgICAgICAgfSBlbHNlIGlmICggd2luZG93LmlubmVyV2lkdGggPiA4MDAgJiYgIHdpbmRvdy5pbm5lcldpZHRoIDw9IDEyODAgKSB7XG5cbiAgICAgICAgICAgIHpvb21MZXZlbCA9IHRoaXMuSW1hZ2VRdWFsaXR5TWVkaXVtO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHdpbmRvdy5pbm5lcldpZHRoID4gMTI4MCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8PSAxOTIwICkge1xuXG4gICAgICAgICAgICB6b29tTGV2ZWwgPSB0aGlzLkltYWdlUXVhbGl0eUhpZ2g7XG5cbiAgICAgICAgfSBlbHNlIGlmICggd2luZG93LmlubmVyV2lkdGggPiAxOTIwICkge1xuXG4gICAgICAgICAgICB6b29tTGV2ZWwgPSB0aGlzLkltYWdlUXVhbGl0eVN1cGVySGlnaDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB6b29tTGV2ZWwgPSB0aGlzLkltYWdlUXVhbGl0eUxvdztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHpvb21MZXZlbDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGV4dHVyZSBvZiBhIHBhbm9yYW1hXG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtUSFJFRS5UZXh0dXJlfSB0ZXh0dXJlIC0gVGV4dHVyZSB0byBiZSB1cGRhdGVkXG4gICAgICovXG4gICAgdXBkYXRlVGV4dHVyZTogZnVuY3Rpb24gKCB0ZXh0dXJlICkge1xuXG4gICAgICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudEVxdWlyZWN0LnZhbHVlID0gdGV4dHVyZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdmlzaWJpbGl0eSBvZiBpbmZvc3BvdHMgaW4gdGhpcyBwYW5vcmFtYVxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IGlzVmlzaWJsZSAtIFZpc2liaWxpdHkgb2YgaW5mb3Nwb3RzXG4gICAgICogQHBhcmFtICB7bnVtYmVyfSBkZWxheSAtIERlbGF5IGluIG1pbGxpc2Vjb25kcyB0byBjaGFuZ2UgdmlzaWJpbGl0eVxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBQYW5vcmFtYSNpbmZvc3BvdC1hbmltYXRpb24tY29tcGxldGVcbiAgICAgKi9cbiAgICB0b2dnbGVJbmZvc3BvdFZpc2liaWxpdHk6IGZ1bmN0aW9uICggaXNWaXNpYmxlLCBkZWxheSApIHtcblxuICAgICAgICBkZWxheSA9ICggZGVsYXkgIT09IHVuZGVmaW5lZCApID8gZGVsYXkgOiAwO1xuXG4gICAgICAgIGNvbnN0IHZpc2libGUgPSAoIGlzVmlzaWJsZSAhPT0gdW5kZWZpbmVkICkgPyBpc1Zpc2libGUgOiAoIHRoaXMuaXNJbmZvc3BvdFZpc2libGUgPyBmYWxzZSA6IHRydWUgKTtcblxuICAgICAgICB0aGlzLnRyYXZlcnNlKCBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuICAgICAgICAgICAgaWYgKCBvYmplY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuICAgICAgICAgICAgICAgIGlmICggdmlzaWJsZSApIHtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3Quc2hvdyggZGVsYXkgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmhpZGUoIGRlbGF5ICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ICk7XG5cbiAgICAgICAgdGhpcy5pc0luZm9zcG90VmlzaWJsZSA9IHZpc2libGU7XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIGNvbXBsZXRlIGV2ZW50XG4gICAgICAgIHRoaXMuaW5mb3Nwb3RBbmltYXRpb24ub25Db21wbGV0ZSggZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbXBsZXRlIHRvZ2dsaW5nIGluZm9zcG90IHZpc2liaWxpdHlcbiAgICAgICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNpbmZvc3BvdC1hbmltYXRpb24tY29tcGxldGVcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9IFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2luZm9zcG90LWFuaW1hdGlvbi1jb21wbGV0ZScsIHZpc2libGU6IHZpc2libGUgfSApO1xuXG4gICAgICAgIH0uYmluZCggdGhpcyApICkuZGVsYXkoIGRlbGF5ICkuc3RhcnQoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgaW1hZ2Ugb2YgdGhpcyBwYW5vcmFtYSdzIGxpbmtpbmcgaW5mb3Nwb3RcbiAgICAgKiBAbWVtYmVyT2YgUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsICAgLSBVcmwgdG8gdGhlIGltYWdlIGFzc2V0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlIC0gU2NhbGUgZmFjdG9yIG9mIHRoZSBpbmZvc3BvdFxuICAgICAqL1xuICAgIHNldExpbmtpbmdJbWFnZTogZnVuY3Rpb24gKCB1cmwsIHNjYWxlICkge1xuXG4gICAgICAgIHRoaXMubGlua2luZ0ltYWdlVVJMID0gdXJsO1xuICAgICAgICB0aGlzLmxpbmtpbmdJbWFnZVNjYWxlID0gc2NhbGU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGluayBvbmUtd2F5IHBhbm9yYW1hXG4gICAgICogQHBhcmFtICB7UGFub3JhbWF9IHBhbm8gIC0gVGhlIHBhbm9yYW1hIHRvIGJlIGxpbmtlZCB0b1xuICAgICAqIEBwYXJhbSAge1RIUkVFLlZlY3RvcjN9IHBvc2l0aW9uIC0gVGhlIHBvc2l0aW9uIG9mIGluZm9zcG90IHdoaWNoIG5hdmlnYXRlcyB0byB0aGUgcGFub1xuICAgICAqIEBwYXJhbSAge251bWJlcn0gW2ltYWdlU2NhbGU9MzAwXSAtIEltYWdlIHNjYWxlIG9mIGxpbmtlZCBpbmZvc3BvdFxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW2ltYWdlU3JjPURhdGFJbWFnZS5BcnJvd10gLSBUaGUgaW1hZ2Ugc291cmNlIG9mIGxpbmtlZCBpbmZvc3BvdFxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxpbms6IGZ1bmN0aW9uICggcGFubywgcG9zaXRpb24sIGltYWdlU2NhbGUsIGltYWdlU3JjICkge1xuXG4gICAgICAgIGxldCBzY2FsZSwgaW1nO1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKCAhcG9zaXRpb24gKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUud2FybiggJ1BsZWFzZSBzcGVjaWZ5IGluZm9zcG90IHBvc2l0aW9uIGZvciBsaW5raW5nJyApO1xuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluZm9zcG90IHNjYWxlXG4gICAgICAgIGlmICggaW1hZ2VTY2FsZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBzY2FsZSA9IGltYWdlU2NhbGU7XG5cbiAgICAgICAgfSBlbHNlIGlmICggcGFuby5saW5raW5nSW1hZ2VTY2FsZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBzY2FsZSA9IHBhbm8ubGlua2luZ0ltYWdlU2NhbGU7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgc2NhbGUgPSAzMDA7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gSW5mb3Nwb3QgaW1hZ2VcbiAgICAgICAgaWYgKCBpbWFnZVNyYyApIHtcblxuICAgICAgICAgICAgaW1nID0gaW1hZ2VTcmM7XG5cbiAgICAgICAgfSBlbHNlIGlmICggcGFuby5saW5raW5nSW1hZ2VVUkwgKSB7XG5cbiAgICAgICAgICAgIGltZyA9IHBhbm8ubGlua2luZ0ltYWdlVVJMO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGltZyA9IERhdGFJbWFnZS5BcnJvdztcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlcyBhIG5ldyBpbmZvc3BvdFxuICAgICAgICBjb25zdCBzcG90ID0gbmV3IEluZm9zcG90KCBzY2FsZSwgaW1nICk7XG4gICAgICAgIHNwb3QucG9zaXRpb24uY29weSggcG9zaXRpb24gKTtcbiAgICAgICAgc3BvdC50b1Bhbm9yYW1hID0gcGFubztcbiAgICAgICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmlld2VyIGhhbmRsZXIgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSBWaWV3ZXIgZnVuY3Rpb24gbmFtZVxuICAgICAgICAgICAgICogQHByb3BlcnR5IHsqfSBkYXRhIC0gVGhlIGFyZ3VtZW50IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBtZXRob2RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIG1ldGhvZDogJ3NldFBhbm9yYW1hJywgZGF0YTogcGFubyB9ICk7XG5cbiAgICAgICAgfS5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICB0aGlzLmxpbmtlZFNwb3RzLnB1c2goIHNwb3QgKTtcblxuICAgICAgICB0aGlzLmFkZCggc3BvdCApO1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5sZW5ndGggPSAwO1x0XG5cbiAgICB9LFxuXG4gICAgc2V0dXBUcmFuc2l0aW9uczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuZmFkZUluQW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLm1hdGVyaWFsIClcbiAgICAgICAgICAgIC5lYXNpbmcoIFRXRUVOLkVhc2luZy5RdWFydGljLk91dCApXG4gICAgICAgICAgICAub25TdGFydCggZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm1hdGVyaWFsLnZpc2libGUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRW50ZXIgcGFub3JhbWEgZmFkZSBpbiBzdGFydCBldmVudFxuICAgICAgICAgICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNlbnRlci1mYWRlLXN0YXJ0XG4gICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH0gXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdlbnRlci1mYWRlLXN0YXJ0JyB9ICk7XG5cbiAgICAgICAgICAgIH0uYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgdGhpcy5mYWRlT3V0QW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzLm1hdGVyaWFsIClcbiAgICAgICAgICAgIC5lYXNpbmcoIFRXRUVOLkVhc2luZy5RdWFydGljLk91dCApXG4gICAgICAgICAgICAub25Db21wbGV0ZSggZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5tYXRlcmlhbC52aXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExlYXZlIHBhbm9yYW1hIGNvbXBsZXRlIGV2ZW50XG4gICAgICAgICAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI2xlYXZlLWNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICogQHR5cGUge29iamVjdH0gXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdsZWF2ZS1jb21wbGV0ZScgfSApO1xuXG4gICAgICAgICAgICB9LmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIHRoaXMuZW50ZXJUcmFuc2l0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzIClcbiAgICAgICAgICAgIC5lYXNpbmcoIFRXRUVOLkVhc2luZy5RdWFydGljLk91dCApXG4gICAgICAgICAgICAub25Db21wbGV0ZSggZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRW50ZXIgcGFub3JhbWEgYW5kIGFuaW1hdGlvbiBjb21wbGV0ZSBldmVudFxuICAgICAgICAgICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNlbnRlci1jb21wbGV0ZVxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9IFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZW50ZXItY29tcGxldGUnIH0gKTtcblxuICAgICAgICAgICAgfS5iaW5kICggdGhpcyApIClcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgICAgIHRoaXMubGVhdmVUcmFuc2l0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCB0aGlzIClcbiAgICAgICAgICAgIC5lYXNpbmcoIFRXRUVOLkVhc2luZy5RdWFydGljLk91dCApO1xuXG4gICAgfSxcblxuICAgIG9uRmFkZUFuaW1hdGlvblVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGFscGhhID0gdGhpcy5tYXRlcmlhbC5vcGFjaXR5O1xuICAgICAgICBjb25zdCB7IHVuaWZvcm1zIH0gPSB0aGlzLm1hdGVyaWFsO1xuXG4gICAgICAgIGlmICggdW5pZm9ybXMgJiYgdW5pZm9ybXMub3BhY2l0eSApIHtcbiAgICAgICAgICAgIHVuaWZvcm1zLm9wYWNpdHkudmFsdWUgPSBhbHBoYTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGZhZGluZyBpbiBhbmltYXRpb25cbiAgICAgKiBAbWVtYmVyT2YgUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZmlyZXMgUGFub3JhbWEjZW50ZXItZmFkZS1jb21wbGV0ZVxuICAgICAqL1xuICAgIGZhZGVJbjogZnVuY3Rpb24gKCBkdXJhdGlvbiApIHtcblxuICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uID49IDAgPyBkdXJhdGlvbiA6IHRoaXMuYW5pbWF0aW9uRHVyYXRpb247XG5cbiAgICAgICAgdGhpcy5mYWRlT3V0QW5pbWF0aW9uLnN0b3AoKTtcbiAgICAgICAgdGhpcy5mYWRlSW5BbmltYXRpb25cbiAgICAgICAgICAgIC50byggeyBvcGFjaXR5OiAxIH0sIGR1cmF0aW9uIClcbiAgICAgICAgICAgIC5vblVwZGF0ZSggdGhpcy5vbkZhZGVBbmltYXRpb25VcGRhdGUuYmluZCggdGhpcyApIClcbiAgICAgICAgICAgIC5vbkNvbXBsZXRlKCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUluZm9zcG90VmlzaWJpbGl0eSggdHJ1ZSwgZHVyYXRpb24gLyAyICk7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBFbnRlciBwYW5vcmFtYSBmYWRlIGNvbXBsZXRlIGV2ZW50XG4gICAgICAgICAgICAgICAgICogQGV2ZW50IFBhbm9yYW1hI2VudGVyLWZhZGUtY29tcGxldGVcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2VudGVyLWZhZGUtY29tcGxldGUnIH0gKTtcdFx0XHRcblxuICAgICAgICAgICAgfS5iaW5kKCB0aGlzICkgKVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgZmFkaW5nIG91dCBhbmltYXRpb25cbiAgICAgKiBAbWVtYmVyT2YgUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmYWRlT3V0OiBmdW5jdGlvbiAoIGR1cmF0aW9uICkge1xuXG4gICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gPj0gMCA/IGR1cmF0aW9uIDogdGhpcy5hbmltYXRpb25EdXJhdGlvbjtcblxuICAgICAgICB0aGlzLmZhZGVJbkFuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgIHRoaXMuZmFkZU91dEFuaW1hdGlvblxuICAgICAgICAgICAgLnRvKCB7IG9wYWNpdHk6IDAgfSwgZHVyYXRpb24gKVxuICAgICAgICAgICAgLm9uVXBkYXRlKCB0aGlzLm9uRmFkZUFuaW1hdGlvblVwZGF0ZS5iaW5kKCB0aGlzICkgKVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIGVudGVyaW5nIGEgcGFub3JhbWEgXG4gICAgICogQG1lbWJlck9mIFBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFBhbm9yYW1hI2VudGVyXG4gICAgICogQGZpcmVzIFBhbm9yYW1hI2VudGVyLXN0YXJ0XG4gICAgICovXG4gICAgb25FbnRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5hbmltYXRpb25EdXJhdGlvbjtcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbnRlciBwYW5vcmFtYSBldmVudFxuICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjZW50ZXJcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2VudGVyJyB9ICk7XG5cbiAgICAgICAgdGhpcy5sZWF2ZVRyYW5zaXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLmVudGVyVHJhbnNpdGlvblxuICAgICAgICAgICAgLnRvKCB7fSwgZHVyYXRpb24gKVxuICAgICAgICAgICAgLm9uU3RhcnQoIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEVudGVyIHBhbm9yYW1hIGFuZCBhbmltYXRpb24gc3RhcnRpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjZW50ZXItc3RhcnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2VudGVyLXN0YXJ0JyB9ICk7XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5sb2FkZWQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWRlSW4oIGR1cmF0aW9uICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRcbiAgICAgICAgICAgIH0uYmluZCggdGhpcyApIClcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggY2hpbGQgPT4ge1xuXG4gICAgICAgICAgICBjaGlsZC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vcmFtYS1lbnRlcicgfSApO1xuXG4gICAgICAgIH0gKTtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIGxlYXZpbmcgYSBwYW5vcmFtYVxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBQYW5vcmFtYSNsZWF2ZVxuICAgICAqL1xuICAgIG9uTGVhdmU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuYW5pbWF0aW9uRHVyYXRpb247XG5cbiAgICAgICAgdGhpcy5lbnRlclRyYW5zaXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLmxlYXZlVHJhbnNpdGlvblxuICAgICAgICAgICAgLnRvKCB7fSwgZHVyYXRpb24gKVxuICAgICAgICAgICAgLm9uU3RhcnQoIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExlYXZlIHBhbm9yYW1hIGFuZCBhbmltYXRpb24gc3RhcnRpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjbGVhdmUtc3RhcnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xlYXZlLXN0YXJ0JyB9ICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQoIGR1cmF0aW9uICk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVJbmZvc3BvdFZpc2liaWxpdHkoIGZhbHNlICk7XG5cbiAgICAgICAgICAgIH0uYmluZCggdGhpcyApIClcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMZWF2ZSBwYW5vcmFtYSBldmVudFxuICAgICAgICAgKiBAZXZlbnQgUGFub3JhbWEjbGVhdmVcbiAgICAgICAgICogQHR5cGUge29iamVjdH0gXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2xlYXZlJyB9ICk7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKCBjaGlsZCA9PiB7XG5cbiAgICAgICAgICAgIGNoaWxkLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9yYW1hLWxlYXZlJyB9ICk7XG5cbiAgICAgICAgfSApO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBwYW5vcmFtYVxuICAgICAqIEBtZW1iZXJPZiBQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB7IG1hdGVyaWFsIH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICggbWF0ZXJpYWwgJiYgbWF0ZXJpYWwudW5pZm9ybXMgJiYgbWF0ZXJpYWwudW5pZm9ybXMudEVxdWlyZWN0ICkgbWF0ZXJpYWwudW5pZm9ybXMudEVxdWlyZWN0LnZhbHVlLmRpc3Bvc2UoKTtcblxuICAgICAgICB0aGlzLmluZm9zcG90QW5pbWF0aW9uLnN0b3AoKTtcbiAgICAgICAgdGhpcy5mYWRlSW5BbmltYXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLmZhZGVPdXRBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLmVudGVyVHJhbnNpdGlvbi5zdG9wKCk7XG4gICAgICAgIHRoaXMubGVhdmVUcmFuc2l0aW9uLnN0b3AoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT24gcGFub3JhbWEgZGlzcG9zZSBoYW5kbGVyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBQYW5vcmFtYSNwYW5vbGVucy12aWV3ZXItaGFuZGxlclxuICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gVmlld2VyIGZ1bmN0aW9uIG5hbWVcbiAgICAgICAgICogQHByb3BlcnR5IHsqfSBkYXRhIC0gVGhlIGFyZ3VtZW50IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBtZXRob2RcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdvblBhbm9yYW1hRGlzcG9zZScsIGRhdGE6IHRoaXMgfSApO1xuXG4gICAgICAgIC8vIHJlY3Vyc2l2ZSBkaXNwb3NhbCBvbiAzZCBvYmplY3RzXG4gICAgICAgIGZ1bmN0aW9uIHJlY3Vyc2l2ZURpc3Bvc2UgKCBvYmplY3QgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHsgZ2VvbWV0cnksIG1hdGVyaWFsIH0gPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICkge1xuXG4gICAgICAgICAgICAgICAgcmVjdXJzaXZlRGlzcG9zZSggb2JqZWN0LmNoaWxkcmVuW2ldICk7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnJlbW92ZSggb2JqZWN0LmNoaWxkcmVuW2ldICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBvYmplY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdC5kaXNwb3NlKCk7XG5cbiAgICAgICAgICAgIH1cblx0XHRcdFxuICAgICAgICAgICAgaWYgKCBnZW9tZXRyeSApIHsgZ2VvbWV0cnkuZGlzcG9zZSgpOyBvYmplY3QuZ2VvbWV0cnkgPSBudWxsOyB9XG4gICAgICAgICAgICBpZiAoIG1hdGVyaWFsICkgeyBtYXRlcmlhbC5kaXNwb3NlKCk7IG9iamVjdC5tYXRlcmlhbCA9IG51bGw7IH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmVjdXJzaXZlRGlzcG9zZSggdGhpcyApO1xuXG4gICAgICAgIGlmICggdGhpcy5wYXJlbnQgKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZSggdGhpcyApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBQYW5vcmFtYSB9OyIsImltcG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi9QYW5vcmFtYSc7XG5pbXBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9UZXh0dXJlTG9hZGVyJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEVxdWlyZWN0YW5ndWxhciBiYXNlZCBpbWFnZSBwYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSBJbWFnZSB1cmwgb3IgSFRNTEltYWdlRWxlbWVudFxuICovXG5mdW5jdGlvbiBJbWFnZVBhbm9yYW1hICggaW1hZ2UgKSB7XG5cbiAgICBQYW5vcmFtYS5jYWxsKCB0aGlzICk7XG5cbiAgICB0aGlzLnNyYyA9IGltYWdlO1xuICAgIHRoaXMudHlwZSA9ICdpbWFnZV9wYW5vcmFtYSc7XG5cbn1cblxuSW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IEltYWdlUGFub3JhbWEsXG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGltYWdlIGFzc2V0XG4gICAgICogQHBhcmFtICB7Kn0gc3JjIC0gVXJsIG9yIGltYWdlIGVsZW1lbnRcbiAgICAgKiBAbWVtYmVyT2YgSW1hZ2VQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uICggc3JjICkge1xuXG4gICAgICAgIHNyYyA9IHNyYyB8fCB0aGlzLnNyYztcblxuICAgICAgICBpZiAoICFzcmMgKSB7IFxuXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oICdJbWFnZSBzb3VyY2UgdW5kZWZpbmVkJyApO1xuXG4gICAgICAgICAgICByZXR1cm47IFxuXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBzcmMgPT09ICdzdHJpbmcnICkge1xuXG4gICAgICAgICAgICBUZXh0dXJlTG9hZGVyLmxvYWQoIHNyYywgdGhpcy5vbkxvYWQuYmluZCggdGhpcyApLCB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApLCB0aGlzLm9uRXJyb3IuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggc3JjIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCApIHtcblxuICAgICAgICAgICAgdGhpcy5vbkxvYWQoIG5ldyBUSFJFRS5UZXh0dXJlKCBzcmMgKSApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gaW1hZ2UgaXMgbG9hZGVkXG4gICAgICogQHBhcmFtICB7VEhSRUUuVGV4dHVyZX0gdGV4dHVyZSAtIFRleHR1cmUgdG8gYmUgdXBkYXRlZFxuICAgICAqIEBtZW1iZXJPZiBJbWFnZVBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cbiAgICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPSB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cdFx0XG4gICAgICAgIHRoaXMudXBkYXRlVGV4dHVyZSggdGV4dHVyZSApO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIFBhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuYmluZCggdGhpcyApICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVzZXRcbiAgICAgKiBAbWVtYmVyT2YgSW1hZ2VQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgUGFub3JhbWEucHJvdG90eXBlLnJlc2V0LmNhbGwoIHRoaXMgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlXG4gICAgICogQG1lbWJlck9mIEltYWdlUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gUmVsZWFzZSBjYWNoZWQgaW1hZ2VcbiAgICAgICAgVEhSRUUuQ2FjaGUucmVtb3ZlKCB0aGlzLnNyYyApO1xuXG4gICAgICAgIFBhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBJbWFnZVBhbm9yYW1hIH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEVtcHR5IHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRW1wdHlQYW5vcmFtYSAoKSB7XG5cbiAgICBQYW5vcmFtYS5jYWxsKCB0aGlzICk7XG5cbiAgICB0aGlzLnR5cGUgPSAnZW1wdHlfcGFub3JhbWEnO1xuXG59XG5cbkVtcHR5UGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBFbXB0eVBhbm9yYW1hLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc2t5Ym94IGdlb21ldHJ5XG4gICAgICogQG1lbWJlck9mIEVtcHR5UGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjcmVhdGVHZW9tZXRyeTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBuZXcgRmxvYXQzMkFycmF5KCksIDEgKSApO1xuICAgICAgICByZXR1cm4gZ2VvbWV0cnk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG1hdGVyaWFsXG4gICAgICogQG1lbWJlck9mIEVtcHR5UGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjcmVhdGVNYXRlcmlhbDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweDAwMDAwMCwgb3BhY2l0eTogMCwgdHJhbnNwYXJlbnQ6IHRydWUgfSApO1xuXG4gICAgfSxcblxuICAgIGdldFRleHR1cmU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBFbXB0eVBhbm9yYW1hIH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCB7IEN1YmVUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9DdWJlVGV4dHVyZUxvYWRlcic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBDdWJlbWFwLWJhc2VkIHBhbm9yYW1hXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7YXJyYXl9IGltYWdlcyAtIEFycmF5IG9mIDYgdXJscyB0byBpbWFnZXMsIG9uZSBmb3IgZWFjaCBzaWRlIG9mIHRoZSBDdWJlVGV4dHVyZS4gVGhlIHVybHMgc2hvdWxkIGJlIHNwZWNpZmllZCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOiBwb3MteCwgbmVnLXgsIHBvcy15LCBuZWcteSwgcG9zLXosIG5lZy16XG4gKi9cbmZ1bmN0aW9uIEN1YmVQYW5vcmFtYSAoIGltYWdlcyA9IFtdICl7XG5cbiAgICBQYW5vcmFtYS5jYWxsKCB0aGlzICk7XG5cbiAgICB0aGlzLmdlb21ldHJ5LmRlbGV0ZUF0dHJpYnV0ZSggJ25vcm1hbCcgKTtcbiAgICB0aGlzLmdlb21ldHJ5LmRlbGV0ZUF0dHJpYnV0ZSggJ3V2JyApO1xuXG4gICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XG4gICAgdGhpcy50eXBlID0gJ2N1YmVfcGFub3JhbWEnO1xuXG59XG5cbkN1YmVQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IEN1YmVQYW5vcmFtYSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBtYXRlcmlhbFxuICAgICAqIEBtZW1iZXJPZiBDdWJlUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjcmVhdGVNYXRlcmlhbDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgeyBmcmFnbWVudFNoYWRlciwgdmVydGV4U2hhZGVyLCB1bmlmb3JtczogX3VuaWZvcm1zIH0gPSBUSFJFRS5TaGFkZXJMaWJbICdjdWJlJyBdO1xuICAgICAgICBjb25zdCB1bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMuY2xvbmUoIF91bmlmb3JtcyApO1xuICAgICAgICBcbiAgICAgICAgdW5pZm9ybXMub3BhY2l0eS52YWx1ZSA9IDA7XG4gICAgICAgIHVuaWZvcm1zLmVudk1hcC52YWx1ZSA9IG5ldyBUSFJFRS5DdWJlVGV4dHVyZSgpO1xuXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCB7XG5cbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLFxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLFxuICAgICAgICAgICAgdW5pZm9ybXMsXG4gICAgICAgICAgICBzaWRlOiBUSFJFRS5CYWNrU2lkZSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZVxuXG4gICAgICAgIH0gKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoIG1hdGVyaWFsLCAnZW52TWFwJywge1xuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zLmVudk1hcC52YWx1ZTtcbiAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB9ICk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvYWQgNiBpbWFnZXMgYW5kIGJpbmQgbGlzdGVuZXJzXG4gICAgICogQG1lbWJlck9mIEN1YmVQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBDdWJlVGV4dHVyZUxvYWRlci5sb2FkKCBcdFxuXG4gICAgICAgICAgICB0aGlzLmltYWdlcywgXG5cbiAgICAgICAgICAgIHRoaXMub25Mb2FkLmJpbmQoIHRoaXMgKSwgXG4gICAgICAgICAgICB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApLCBcbiAgICAgICAgICAgIHRoaXMub25FcnJvci5iaW5kKCB0aGlzICkgXG5cbiAgICAgICAgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gNiB0ZXh0dXJlcyBhcmUgcmVhZHlcbiAgICAgKiBAcGFyYW0gIHtUSFJFRS5DdWJlVGV4dHVyZX0gdGV4dHVyZSAtIEN1YmUgdGV4dHVyZVxuICAgICAqIEBtZW1iZXJPZiBDdWJlUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuICAgICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLmVudk1hcC52YWx1ZSA9IHRleHR1cmU7XG5cbiAgICAgICAgUGFub3JhbWEucHJvdG90eXBlLm9uTG9hZC5jYWxsKCB0aGlzICk7XG5cbiAgICB9LFxuXG4gICAgZ2V0VGV4dHVyZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLmVudk1hcC52YWx1ZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlXG4gICAgICogQG1lbWJlck9mIEN1YmVQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcdFxuXG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMubWF0ZXJpYWwudW5pZm9ybXMuZW52TWFwO1xuXG4gICAgICAgIHRoaXMuaW1hZ2VzLmZvckVhY2goICggaW1hZ2UgKSA9PiB7IFRIUkVFLkNhY2hlLnJlbW92ZSggaW1hZ2UgKTsgfSApO1xuXG4gICAgICAgIGlmICggdmFsdWUgaW5zdGFuY2VvZiBUSFJFRS5DdWJlVGV4dHVyZSApIHtcblxuICAgICAgICAgICAgdmFsdWUuZGlzcG9zZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBQYW5vcmFtYS5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKCB0aGlzICk7XG5cbiAgICB9XG5cbn0gKTtcblxuZXhwb3J0IHsgQ3ViZVBhbm9yYW1hIH07IiwiaW1wb3J0IHsgQ3ViZVBhbm9yYW1hIH0gZnJvbSAnLi9DdWJlUGFub3JhbWEnO1xuaW1wb3J0IHsgRGF0YUltYWdlIH0gZnJvbSAnLi4vRGF0YUltYWdlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEJhc2ljIHBhbm9yYW1hIHdpdGggNiBwcmUtZGVmaW5lZCBncmlkIGltYWdlc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEJhc2ljUGFub3JhbWEgKCkge1xuXG4gICAgY29uc3QgaW1hZ2VzID0gW107XG5cbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCA2OyBpKysgKSB7XG5cbiAgICAgICAgaW1hZ2VzLnB1c2goIERhdGFJbWFnZS5XaGl0ZVRpbGUgKTtcblxuICAgIH1cblxuICAgIEN1YmVQYW5vcmFtYS5jYWxsKCB0aGlzLCBpbWFnZXMgKTtcblxuICAgIHRoaXMudHlwZSA9ICdiYXNpY19wYW5vcmFtYSc7XG5cbn1cblxuQmFzaWNQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBDdWJlUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBCYXNpY1Bhbm9yYW1hXG5cbn0gKTtcblxuZXhwb3J0IHsgQmFzaWNQYW5vcmFtYSB9OyIsImltcG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi9QYW5vcmFtYSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBWaWRlbyBQYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIC0gRXF1aXJlY3Rhbmd1bGFyIHZpZGVvIHVybFxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbiBmb3IgdmlkZW8gc2V0dGluZ3NcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRpb25zLnZpZGVvRWxlbWVudF0gLSBIVE1MNSB2aWRlbyBlbGVtZW50IGNvbnRhaW5zIHRoZSB2aWRlb1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sb29wPXRydWVdIC0gU3BlY2lmeSBpZiB0aGUgdmlkZW8gc2hvdWxkIGxvb3AgaW4gdGhlIGVuZFxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5tdXRlZD10cnVlXSAtIE11dGUgdGhlIHZpZGVvIG9yIG5vdC4gTmVlZCB0byBiZSB0cnVlIGluIG9yZGVyIHRvIGF1dG9wbGF5IG9uIHNvbWUgYnJvd3NlcnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b3BsYXk9ZmFsc2VdIC0gU3BlY2lmeSBpZiB0aGUgdmlkZW8gc2hvdWxkIGF1dG8gcGxheVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5wbGF5c2lubGluZT10cnVlXSAtIFNwZWNpZnkgaWYgdmlkZW8gc2hvdWxkIHBsYXkgaW5saW5lIGZvciBpT1MuIElmIHlvdSB3YW50IGl0IHRvIGF1dG8gcGxheSBpbmxpbmUsIHNldCBib3RoIGF1dG9wbGF5IGFuZCBtdXRlZCBvcHRpb25zIHRvIHRydWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jcm9zc09yaWdpbj1cImFub255bW91c1wiXSAtIFNldHMgdGhlIGNyb3NzLW9yaWdpbiBhdHRyaWJ1dGUgZm9yIHRoZSB2aWRlbywgd2hpY2ggYWxsb3dzIGZvciBjcm9zcy1vcmlnaW4gdmlkZW9zIGluIHNvbWUgYnJvd3NlcnMgKEZpcmVmb3gsIENocm9tZSkuIFNldCB0byBlaXRoZXIgXCJhbm9ueW1vdXNcIiBvciBcInVzZS1jcmVkZW50aWFsc1wiLlxuICogQHBhcmFtIHtudW1iZXJ9IFtyYWRpdXM9NTAwMF0gLSBUaGUgbWluaW11bSByYWRpdXMgZm9yIHRoaXMgcGFub3JhbVxuICovXG5mdW5jdGlvbiBWaWRlb1Bhbm9yYW1hICggc3JjLCBvcHRpb25zID0ge30gKSB7XG5cbiAgICBQYW5vcmFtYS5jYWxsKCB0aGlzICk7XG5cbiAgICB0aGlzLnNyYyA9IHNyYztcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKCB7XG5cbiAgICAgICAgdmlkZW9FbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAndmlkZW8nICksXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIG11dGVkOiB0cnVlLFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIHBsYXlzaW5saW5lOiB0cnVlLFxuICAgICAgICBjcm9zc09yaWdpbjogJ2Fub255bW91cydcblxuICAgIH0sIG9wdGlvbnMgKTtcblxuICAgIHRoaXMudmlkZW9FbGVtZW50ID0gdGhpcy5vcHRpb25zLnZpZGVvRWxlbWVudDtcbiAgICB0aGlzLnZpZGVvUHJvZ3Jlc3MgPSAwO1xuXG4gICAgdGhpcy50eXBlID0gJ3ZpZGVvX3Bhbm9yYW1hJztcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2xlYXZlJywgdGhpcy5wYXVzZVZpZGVvLmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCB0aGlzLnJlc3VtZVZpZGVvUHJvZ3Jlc3MuYmluZCggdGhpcyApICk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAndmlkZW8tdG9nZ2xlJywgdGhpcy50b2dnbGVWaWRlby5iaW5kKCB0aGlzICkgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICd2aWRlby10aW1lJywgdGhpcy5zZXRWaWRlb0N1cnJlbnRUaW1lLmJpbmQoIHRoaXMgKSApO1xuXG59O1xuXG5WaWRlb1Bhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogVmlkZW9QYW5vcmFtYSxcblxuICAgIGlzTW9iaWxlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IGNoZWNrID0gZmFsc2U7XG4gICAgICAgIChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSkgY2hlY2sgPSB0cnVlO30pKCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCB8fCB3aW5kb3cubmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEgKTtcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvYWQgdmlkZW8gcGFub3JhbWFcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyAgUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyBtdXRlZCwgbG9vcCwgYXV0b3BsYXksIHBsYXlzaW5saW5lLCBjcm9zc09yaWdpbiB9ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuICAgICAgICBjb25zdCBvblByb2dyZXNzID0gdGhpcy5vblByb2dyZXNzLmJpbmQoIHRoaXMgKTtcbiAgICAgICAgY29uc3Qgb25Mb2FkID0gdGhpcy5vbkxvYWQuYmluZCggdGhpcyApO1xuXG4gICAgICAgIHZpZGVvLmxvb3AgPSBsb29wO1xuICAgICAgICB2aWRlby5hdXRvcGxheSA9IGF1dG9wbGF5O1xuICAgICAgICB2aWRlby5wbGF5c2lubGluZSA9IHBsYXlzaW5saW5lO1xuICAgICAgICB2aWRlby5jcm9zc09yaWdpbiA9IGNyb3NzT3JpZ2luO1xuICAgICAgICB2aWRlby5tdXRlZCA9IG11dGVkO1xuXHRcdFxuICAgICAgICBpZiAoIHBsYXlzaW5saW5lICkge1xuXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoICdwbGF5c2lubGluZScsICcnICk7XG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoICd3ZWJraXQtcGxheXNpbmxpbmUnLCAnJyApO1xuXG4gICAgICAgIH0gXG5cbiAgICAgICAgY29uc3Qgb25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHZpZGVvVGV4dHVyZSA9IHRoaXMuc2V0VmlkZW9UZXh0dXJlKCB2aWRlbyApO1xuXG4gICAgICAgICAgICBpZiAoIGF1dG9wbGF5ICkge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogVmlld2VyIGhhbmRsZXIgZXZlbnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSAtIFBhdXNlIHZpZGVvIG9yIG5vdFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiBmYWxzZSB9ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRm9yIG1vYmlsZSBzaWxlbnQgYXV0b3BsYXlcbiAgICAgICAgICAgIGlmICggdGhpcy5pc01vYmlsZSgpICkge1xuXG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcblxuICAgICAgICAgICAgICAgIGlmICggYXV0b3BsYXkgJiYgbXV0ZWQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFZpZXdlciBoYW5kbGVyIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRhdGEgLSBQYXVzZSB2aWRlbyBvciBub3RcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiBmYWxzZSB9ICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJywgZGF0YTogdHJ1ZSB9ICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBsb2FkZWQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBvblByb2dyZXNzKCB7IGxvYWRlZDogMSwgdG90YWw6IDEgfSApO1xuICAgICAgICAgICAgICAgIG9uTG9hZCggdmlkZW9UZXh0dXJlICk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGxvYWRlZCApO1xuXHRcdFx0XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWR5IHN0YXRlIG9mIHRoZSBhdWRpby92aWRlbyBlbGVtZW50XG4gICAgICAgICAqIDAgPSBIQVZFX05PVEhJTkcgLSBubyBpbmZvcm1hdGlvbiB3aGV0aGVyIG9yIG5vdCB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcbiAgICAgICAgICogMSA9IEhBVkVfTUVUQURBVEEgLSBtZXRhZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XG4gICAgICAgICAqIDIgPSBIQVZFX0NVUlJFTlRfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGlzIGF2YWlsYWJsZSwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUvbWlsbGlzZWNvbmRcbiAgICAgICAgICogMyA9IEhBVkVfRlVUVVJFX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBhbmQgYXQgbGVhc3QgdGhlIG5leHQgZnJhbWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAqIDQgPSBIQVZFX0VOT1VHSF9EQVRBIC0gZW5vdWdoIGRhdGEgYXZhaWxhYmxlIHRvIHN0YXJ0IHBsYXlpbmdcbiAgICAgICAgICovXG4gICAgICAgIGlmICggdmlkZW8ucmVhZHlTdGF0ZSA+IDIgKSB7XG5cbiAgICAgICAgICAgIG9ubG9hZGVkZGF0YS5jYWxsKCB0aGlzICk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCB2aWRlby5xdWVyeVNlbGVjdG9yQWxsKCAnc291cmNlJyApLmxlbmd0aCA9PT0gMCApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzb3VyY2UnICk7XG4gICAgICAgICAgICAgICAgc291cmNlLnNyYyA9IHRoaXMuc3JjO1xuICAgICAgICAgICAgICAgIHZpZGVvLmFwcGVuZENoaWxkKCBzb3VyY2UgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2aWRlby5sb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCAnbG9hZGVkZGF0YScsIG9ubG9hZGVkZGF0YS5iaW5kKCB0aGlzICkgKTtcblx0XHRcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lciggJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHRoaXMudmlkZW9Qcm9ncmVzcyA9IHZpZGVvLmR1cmF0aW9uID49IDAgPyB2aWRlby5jdXJyZW50VGltZSAvIHZpZGVvLmR1cmF0aW9uIDogMDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAnb25WaWRlb1VwZGF0ZSdcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhIC0gVGhlIHBlcmNlbnRhZ2Ugb2YgdmlkZW8gcHJvZ3Jlc3MuIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnb25WaWRlb1VwZGF0ZScsIGRhdGE6IHRoaXMudmlkZW9Qcm9ncmVzcyB9ICk7XG5cbiAgICAgICAgfS5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCAnZW5kZWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcbiAgICAgICAgICAgIGlmICggIWxvb3AgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VmlkZW8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJywgZGF0YTogdHJ1ZSB9ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LmJpbmQoIHRoaXMgKSwgZmFsc2UgKTsgXG5cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgUGFub3JhbWEucHJvdG90eXBlLm9uTG9hZC5jYWxsKCB0aGlzICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHZpZGVvIHRleHR1cmVcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7SFRNTFZpZGVvRWxlbWVudH0gdmlkZW8gIC0gVGhlIGh0bWw1IHZpZGVvIGVsZW1lbnRcbiAgICAgKiBAZmlyZXMgUGFub3JhbWEjcGFub2xlbnMtdmlld2VyLWhhbmRsZXJcbiAgICAgKi9cbiAgICBzZXRWaWRlb1RleHR1cmU6IGZ1bmN0aW9uICggdmlkZW8gKSB7XG5cbiAgICAgICAgaWYgKCAhdmlkZW8gKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgdmlkZW9UZXh0dXJlID0gbmV3IFRIUkVFLlZpZGVvVGV4dHVyZSggdmlkZW8gKTtcbiAgICAgICAgdmlkZW9UZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdmlkZW9UZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdmlkZW9UZXh0dXJlLmZvcm1hdCA9IFRIUkVFLlJHQkZvcm1hdDtcblxuICAgICAgICB0aGlzLnVwZGF0ZVRleHR1cmUoIHZpZGVvVGV4dHVyZSApO1xuXG4gICAgICAgIHJldHVybiB2aWRlb1RleHR1cmU7XG5cdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNldFxuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnZpZGVvRWxlbWVudCA9IHVuZGVmaW5lZDtcdFxuXG4gICAgICAgIFBhbm9yYW1hLnByb3RvdHlwZS5yZXNldC5jYWxsKCB0aGlzICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdmlkZW8gaXMgcGF1c2VkXG4gICAgICogQG1lbWJlck9mIFZpZGVvUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHZpZGVvIHBhdXNlZCBvciBub3RcbiAgICAgKi9cbiAgICBpc1ZpZGVvUGF1c2VkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnBhdXNlZDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdmlkZW8gdG8gcGxheSBvciBwYXVzZVxuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdG9nZ2xlVmlkZW86IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXG4gICAgICAgIGlmICggIXZpZGVvICkgeyByZXR1cm47IH1cblxuICAgICAgICB2aWRlb1sgdmlkZW8ucGF1c2VkID8gJ3BsYXknIDogJ3BhdXNlJyBdKCk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHZpZGVvIGN1cnJlbnRUaW1lXG4gICAgICogQG1lbWJlck9mIFZpZGVvUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBFdmVudCBjb250YWlucyBwZXJjZW50YWdlLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcbiAgICAgKi9cbiAgICBzZXRWaWRlb0N1cnJlbnRUaW1lOiBmdW5jdGlvbiAoIHsgcGVyY2VudGFnZSB9ICkge1xuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCB2aWRlbyAmJiAhTnVtYmVyLmlzTmFOKCBwZXJjZW50YWdlICkgJiYgcGVyY2VudGFnZSAhPT0gMSApIHtcblxuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSB2aWRlby5kdXJhdGlvbiAqIHBlcmNlbnRhZ2U7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICdvblZpZGVvVXBkYXRlJywgZGF0YTogcGVyY2VudGFnZSB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBsYXkgdmlkZW9cbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmaXJlcyBWaWRlb1Bhbm9yYW1hI3BsYXlcbiAgICAgKiBAZmlyZXMgVmlkZW9QYW5vcmFtYSNwbGF5LWVycm9yXG4gICAgICovXG4gICAgcGxheVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcbiAgICAgICAgY29uc3QgcGxheVZpZGVvID0gdGhpcy5wbGF5VmlkZW8uYmluZCggdGhpcyApO1xuICAgICAgICBjb25zdCBkaXNwYXRjaEV2ZW50ID0gdGhpcy5kaXNwYXRjaEV2ZW50LmJpbmQoIHRoaXMgKTtcbiAgICAgICAgY29uc3Qgb25TdWNjZXNzID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBsYXkgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAZXZlbnQgVmlkZW9QYW5vcmFtYSNwbGF5XG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwbGF5JyB9ICk7XG5cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb25FcnJvciA9ICggZXJyb3IgKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIEVycm9yIHBsYXlpbmcgdmlkZW8uIFJldHJ5IG5leHQgZnJhbWUuIFBvc3NpYmx5IFdhaXRpbmcgZm9yIHVzZXIgaW50ZXJhY3Rpb25cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHBsYXlWaWRlbyApO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBsYXkgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAZXZlbnQgVmlkZW9QYW5vcmFtYSNwbGF5LWVycm9yXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwbGF5LWVycm9yJywgZXJyb3IgfSApO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCB2aWRlbyAmJiB2aWRlby5wYXVzZWQgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKS50aGVuKCBvblN1Y2Nlc3MgKS5jYXRjaCggb25FcnJvciApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQYXVzZSB2aWRlb1xuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFZpZGVvUGFub3JhbWEjcGF1c2VcbiAgICAgKi9cbiAgICBwYXVzZVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuICAgICAgICBpZiAoIHZpZGVvICYmICF2aWRlby5wYXVzZWQgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXVzZSBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgVmlkZW9QYW5vcmFtYSNwYXVzZVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYXVzZScgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc3VtZSB2aWRlb1xuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVzdW1lVmlkZW9Qcm9ncmVzczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCB2aWRlby5yZWFkeVN0YXRlID49IDQgJiYgdmlkZW8uYXV0b3BsYXkgJiYgIXRoaXMuaXNNb2JpbGUoKSApIHtcblxuICAgICAgICAgICAgdGhpcy5wbGF5VmlkZW8oKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWaWV3ZXIgaGFuZGxlciBldmVudFxuICAgICAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2QgLSAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJ1xuICAgICAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBkYXRhIC0gUGF1c2UgdmlkZW8gb3Igbm90XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCBtZXRob2Q6ICd1cGRhdGVWaWRlb1BsYXlCdXR0b24nLCBkYXRhOiBmYWxzZSB9ICk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5wYXVzZVZpZGVvKCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmlld2VyIGhhbmRsZXIgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWV0aG9kIC0gJ3VwZGF0ZVZpZGVvUGxheUJ1dHRvbidcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSAtIFBhdXNlIHZpZGVvIG9yIG5vdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAndXBkYXRlVmlkZW9QbGF5QnV0dG9uJywgZGF0YTogdHJ1ZSB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VmlkZW9DdXJyZW50VGltZSggeyBwZXJjZW50YWdlOiB0aGlzLnZpZGVvUHJvZ3Jlc3MgfSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHZpZGVvIGF0IHN0YXRpbmcgcG9pbnRcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlc2V0VmlkZW86IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMudmlkZW9FbGVtZW50O1xuXG4gICAgICAgIGlmICggdmlkZW8gKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VmlkZW9DdXJyZW50VGltZSggeyBwZXJjZW50YWdlOiAwIH0gKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdmlkZW8gaXMgbXV0ZWRcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdmlkZW8gbXV0ZWQgb3Igbm90XG4gICAgICovXG4gICAgaXNWaWRlb011dGVkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlkZW9FbGVtZW50Lm11dGVkO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE11dGUgdmlkZW9cbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG11dGVWaWRlbzogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy52aWRlb0VsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCB2aWRlbyAmJiAhdmlkZW8ubXV0ZWQgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLm11dGVkID0gdHJ1ZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2b2x1bWVjaGFuZ2UnIH0gKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm11dGUgdmlkZW9cbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVubXV0ZVZpZGVvOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSB0aGlzLnZpZGVvRWxlbWVudDtcblxuICAgICAgICBpZiAoIHZpZGVvICYmIHRoaXMuaXNWaWRlb011dGVkKCkgKSB7XG5cbiAgICAgICAgICAgIHZpZGVvLm11dGVkID0gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAndm9sdW1lY2hhbmdlJyB9ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlkZW8gZWxlbWVudFxuICAgICAqIEBtZW1iZXJPZiBWaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGdldFZpZGVvRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZGVvRWxlbWVudDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIHZpZGVvIHBhbm9yYW1hXG4gICAgICogQG1lbWJlck9mIFZpZGVvUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5wYXVzZVZpZGVvKCk7XG5cdFx0XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2xlYXZlJywgdGhpcy5wYXVzZVZpZGVvLmJpbmQoIHRoaXMgKSApO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgdGhpcy5yZXN1bWVWaWRlb1Byb2dyZXNzLmJpbmQoIHRoaXMgKSApO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2aWRlby10b2dnbGUnLCB0aGlzLnRvZ2dsZVZpZGVvLmJpbmQoIHRoaXMgKSApO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2aWRlby10aW1lJywgdGhpcy5zZXRWaWRlb0N1cnJlbnRUaW1lLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIFBhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBWaWRlb1Bhbm9yYW1hIH07IiwiXG5pbXBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSAnLi9UZXh0dXJlTG9hZGVyJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEdvb2dsZSBTdHJlZXQgVmlldyBMb2FkZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtZXRlcnMgXG4gKi9cbmZ1bmN0aW9uIEdvb2dsZVN0cmVldHZpZXdMb2FkZXIgKCBwYXJhbWV0ZXJzID0ge30gKSB7XG5cbiAgICB0aGlzLl9wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgICB0aGlzLl96b29tID0gbnVsbDtcbiAgICB0aGlzLl9wYW5vSWQgPSBudWxsO1xuICAgIHRoaXMuX3Bhbm9DbGllbnQgPSBuZXcgZ29vZ2xlLm1hcHMuU3RyZWV0Vmlld1NlcnZpY2UoKTtcbiAgICB0aGlzLl9jb3VudCA9IDA7XG4gICAgdGhpcy5fdG90YWwgPSAwO1xuICAgIHRoaXMuX2NhbnZhcyA9IFtdO1xuICAgIHRoaXMuX2N0eCA9IFtdO1xuICAgIHRoaXMuX3djID0gMDtcbiAgICB0aGlzLl9oYyA9IDA7XG4gICAgdGhpcy5yZXN1bHQgPSBudWxsO1xuICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIHRoaXMuY29weXJpZ2h0ID0gJyc7XG4gICAgdGhpcy5vblNpemVDaGFuZ2UgPSBudWxsO1xuICAgIHRoaXMub25QYW5vcmFtYUxvYWQgPSBudWxsO1xuXG4gICAgdGhpcy5sZXZlbHNXID0gWyAxLCAyLCA0LCA3LCAxMywgMjYgXTtcbiAgICB0aGlzLmxldmVsc0ggPSBbIDEsIDEsIDIsIDQsIDcsIDEzIF07XG5cbiAgICB0aGlzLndpZHRocyA9IFsgNDE2LCA4MzIsIDE2NjQsIDMzMjgsIDY2NTYsIDEzMzEyIF07XG4gICAgdGhpcy5oZWlnaHRzID0gWyA0MTYsIDQxNiwgODMyLCAxNjY0LCAzMzI4LCA2NjU2IF07XG5cbiAgICB0aGlzLm1heFcgPSA2NjU2O1xuICAgIHRoaXMubWF4SCA9IDY2NTY7XG5cbiAgICBsZXQgZ2w7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cbiAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCggJ2V4cGVyaW1lbnRhbC13ZWJnbCcgKTtcblxuICAgICAgICBpZiggIWdsICkge1xuXG4gICAgICAgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnd2ViZ2wnICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGNhdGNoICggZXJyb3IgKSB7XG5cbiAgICB9XG5cbiAgICB0aGlzLm1heFcgPSBNYXRoLm1heCggZ2wuZ2V0UGFyYW1ldGVyKCBnbC5NQVhfVEVYVFVSRV9TSVpFICksIHRoaXMubWF4VyApO1xuICAgIHRoaXMubWF4SCA9IE1hdGgubWF4KCBnbC5nZXRQYXJhbWV0ZXIoIGdsLk1BWF9URVhUVVJFX1NJWkUgKSwgdGhpcy5tYXhIICk7XG5cbn1cblxuT2JqZWN0LmFzc2lnbiggR29vZ2xlU3RyZWV0dmlld0xvYWRlci5wcm90b3R5cGUsIHtcblxuICAgIGNvbnN0cnVjdG9yOiBHb29nbGVTdHJlZXR2aWV3TG9hZGVyLFxuXG4gICAgLyoqXG4gICAgICogU2V0IHByb2dyZXNzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxvYWRlZCBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdG90YWwgXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdMb2FkZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRQcm9ncmVzczogZnVuY3Rpb24gKCBsb2FkZWQsIHRvdGFsICkge1xuXG4gICAgICAgIGlmICggdGhpcy5vblByb2dyZXNzICkge1xuXG4gICAgICAgICAgICB0aGlzLm9uUHJvZ3Jlc3MoIHsgbG9hZGVkOiBsb2FkZWQsIHRvdGFsOiB0b3RhbCB9ICk7XG5cbiAgICAgICAgfVxuXHRcdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGFwdCB0ZXh0dXJlIHRvIHpvb21cbiAgICAgKiBAbWVtYmVyT2YgR29vZ2xlU3RyZWV0dmlld0xvYWRlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkYXB0VGV4dHVyZVRvWm9vbTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLndpZHRocyBbIHRoaXMuX3pvb20gXTtcbiAgICAgICAgY29uc3QgaCA9IHRoaXMuaGVpZ2h0c1sgdGhpcy5fem9vbSBdO1xuXG4gICAgICAgIGNvbnN0IG1heFcgPSB0aGlzLm1heFc7XG4gICAgICAgIGNvbnN0IG1heEggPSB0aGlzLm1heEg7XG5cbiAgICAgICAgdGhpcy5fd2MgPSBNYXRoLmNlaWwoIHcgLyBtYXhXICk7XG4gICAgICAgIHRoaXMuX2hjID0gTWF0aC5jZWlsKCBoIC8gbWF4SCApO1xuXG4gICAgICAgIGZvciggbGV0IHkgPSAwOyB5IDwgdGhpcy5faGM7IHkrKyApIHtcbiAgICAgICAgICAgIGZvciggbGV0IHggPSAwOyB4IDwgdGhpcy5fd2M7IHgrKyApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcbiAgICAgICAgICAgICAgICBpZiggeCA8ICggdGhpcy5fd2MgLSAxICkgKSBjLndpZHRoID0gbWF4VzsgZWxzZSBjLndpZHRoID0gdyAtICggbWF4VyAqIHggKTtcbiAgICAgICAgICAgICAgICBpZiggeSA8ICggdGhpcy5faGMgLSAxICkgKSBjLmhlaWdodCA9IG1heEg7IGVsc2UgYy5oZWlnaHQgPSBoIC0gKCBtYXhIICogeSApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5wdXNoKCBjICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LnB1c2goIGMuZ2V0Q29udGV4dCggJzJkJyApICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb21wb3NlIGZyb20gdGlsZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFxuICAgICAqIEBwYXJhbSB7Kn0gdGV4dHVyZSBcbiAgICAgKiBAbWVtYmVyT2YgR29vZ2xlU3RyZWV0dmlld0xvYWRlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNvbXBvc2VGcm9tVGlsZTogZnVuY3Rpb24gKCB4LCB5LCB0ZXh0dXJlICkge1xuXG4gICAgICAgIGNvbnN0IG1heFcgPSB0aGlzLm1heFc7XG4gICAgICAgIGNvbnN0IG1heEggPSB0aGlzLm1heEg7XG5cbiAgICAgICAgeCAqPSA1MTI7XG4gICAgICAgIHkgKj0gNTEyO1xuXG4gICAgICAgIGNvbnN0IHB4ID0gTWF0aC5mbG9vciggeCAvIG1heFcgKTtcbiAgICAgICAgY29uc3QgcHkgPSBNYXRoLmZsb29yKCB5IC8gbWF4SCApO1xuXG4gICAgICAgIHggLT0gcHggKiBtYXhXO1xuICAgICAgICB5IC09IHB5ICogbWF4SDtcblxuICAgICAgICB0aGlzLl9jdHhbIHB5ICogdGhpcy5fd2MgKyBweCBdLmRyYXdJbWFnZSggdGV4dHVyZSwgMCwgMCwgdGV4dHVyZS53aWR0aCwgdGV4dHVyZS5oZWlnaHQsIHgsIHksIDUxMiwgNTEyICk7XG5cbiAgICAgICAgdGhpcy5wcm9ncmVzcygpO1xuXHRcdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9ncmVzc1xuICAgICAqIEBtZW1iZXJPZiBHb29nbGVTdHJlZXR2aWV3TG9hZGVyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuX2NvdW50Kys7XG5cdFx0XG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoIHRoaXMuX2NvdW50LCB0aGlzLl90b3RhbCApO1xuXHRcdFxuICAgICAgICBpZiAoIHRoaXMuX2NvdW50ID09PSB0aGlzLl90b3RhbCkge1xuXG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IHRoaXMuX2NhbnZhcztcbiAgICAgICAgICAgIHRoaXMucGFub0lkID0gdGhpcy5fcGFub0lkO1xuICAgICAgICAgICAgdGhpcy56b29tID0gdGhpcy5fem9vbTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLm9uUGFub3JhbWFMb2FkICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblBhbm9yYW1hTG9hZCggdGhpcy5fY2FudmFzWyAwIF0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ29tcG9zZSBwYW5vcmFtYVxuICAgICAqIEBtZW1iZXJPZiBHb29nbGVTdHJlZXR2aWV3TG9hZGVyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgY29tcG9zZVBhbm9yYW1hOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyggMCwgMSApO1xuXHRcdFxuICAgICAgICBjb25zdCB3ID0gdGhpcy5sZXZlbHNXWyB0aGlzLl96b29tIF07XG4gICAgICAgIGNvbnN0IGggPSB0aGlzLmxldmVsc0hbIHRoaXMuX3pvb20gXTtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0XHRcbiAgICAgICAgdGhpcy5fY291bnQgPSAwO1xuICAgICAgICB0aGlzLl90b3RhbCA9IHcgKiBoO1xuXG4gICAgICAgIGNvbnN0IHsgdXNlV2ViR0wgfSA9IHRoaXMuX3BhcmFtZXRlcnM7XG5cbiAgICAgICAgZm9yKCBsZXQgeSA9IDA7IHkgPCBoOyB5KysgKSB7XG4gICAgICAgICAgICBmb3IoIGxldCB4ID0gMDsgeCA8IHc7IHgrKyApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly9nZW8wLmdncGh0LmNvbS9jYms/Y2JfY2xpZW50PW1hcHNfc3YudGFjdGlsZSZhdXRodXNlcj0wJmhsPWVuJm91dHB1dD10aWxlJnpvb209JyArIHRoaXMuX3pvb20gKyAnJng9JyArIHggKyAnJnk9JyArIHkgKyAnJnBhbm9pZD0nICsgdGhpcy5fcGFub0lkICsgJyZuYnQmZm92ZXI9Mic7XG4gICAgICAgICAgICAgICAgKCBmdW5jdGlvbiggeCwgeSApIHsgXG4gICAgICAgICAgICAgICAgICAgIGlmKCB1c2VXZWJHTCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmUgPSBUZXh0dXJlTG9hZGVyLmxvYWQoIHVybCwgbnVsbCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21wb3NlRnJvbVRpbGUoIHgsIHksIHRleHR1cmUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb21wb3NlRnJvbVRpbGUoIHgsIHksIHRoaXMgKTtcdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5jcm9zc09yaWdpbiA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gKSggeCwgeSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdFx0XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvYWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFub2lkIFxuICAgICAqIEBtZW1iZXJPZiBHb29nbGVTdHJlZXR2aWV3TG9hZGVyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgbG9hZDogZnVuY3Rpb24gKCBwYW5vaWQgKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkUGFubyggcGFub2lkICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTG9hZCBwYW5vcmFtYVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAqIEBtZW1iZXJPZiBHb29nbGVTdHJlZXR2aWV3TG9hZGVyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgbG9hZFBhbm86IGZ1bmN0aW9uKCBpZCApIHtcblxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fcGFub0NsaWVudC5nZXRQYW5vcmFtYUJ5SWQoIGlkLCBmdW5jdGlvbiAocmVzdWx0LCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLlN0cmVldFZpZXdTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBzZWxmLmNvcHlyaWdodCA9IHJlc3VsdC5jb3B5cmlnaHQ7XG4gICAgICAgICAgICAgICAgc2VsZi5fcGFub0lkID0gcmVzdWx0LmxvY2F0aW9uLnBhbm87XG4gICAgICAgICAgICAgICAgc2VsZi5jb21wb3NlUGFub3JhbWEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cdFx0XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCB6b29tIGxldmVsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHogXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdMb2FkZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRab29tOiBmdW5jdGlvbiggeiApIHtcblxuICAgICAgICB0aGlzLl96b29tID0gejtcbiAgICAgICAgdGhpcy5hZGFwdFRleHR1cmVUb1pvb20oKTtcbiAgICB9XG5cdFxufSApO1xuXG5leHBvcnQgeyBHb29nbGVTdHJlZXR2aWV3TG9hZGVyIH07IiwiaW1wb3J0IHsgSW1hZ2VQYW5vcmFtYSB9IGZyb20gJy4vSW1hZ2VQYW5vcmFtYSc7XG5pbXBvcnQgeyBHb29nbGVTdHJlZXR2aWV3TG9hZGVyIH0gZnJvbSAnLi4vbG9hZGVycy9Hb29nbGVTdHJlZXR2aWV3TG9hZGVyJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEdvb2dsZSBzdHJlZXR2aWV3IHBhbm9yYW1hXG4gKiBAZGVzY3JpcHRpb24gW0hvdyB0byBnZXQgUGFub3JhbWEgSURde0BsaW5rIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjk5MTYxNDkvZ29vZ2xlLW1hcHMtc3RyZWV0dmlldy1ob3ctdG8tZ2V0LXBhbm9yYW1hLWlkfVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFub0lkIC0gUGFub3JhbWEgaWQgZnJvbSBHb29nbGUgU3RyZWV0dmlldyBcbiAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpS2V5XSAtIEdvb2dsZSBTdHJlZXQgVmlldyBBUEkgS2V5XG4gKi9cbmZ1bmN0aW9uIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSAoIHBhbm9JZCwgYXBpS2V5ICkge1xuXG4gICAgSW1hZ2VQYW5vcmFtYS5jYWxsKCB0aGlzICk7XG5cbiAgICB0aGlzLnBhbm9JZCA9IHBhbm9JZDtcbiAgICB0aGlzLmdzdkxvYWRlciA9IG51bGw7XG4gICAgdGhpcy5sb2FkUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgdGhpcy5zZXR1cEdvb2dsZU1hcEFQSSggYXBpS2V5ICk7XG5cbiAgICB0aGlzLnR5cGUgPSAnZ29vZ2xlX3N0cmVldHZpZXdfcGFub3JhbWEnO1xuXG59XG5cbkdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBJbWFnZVBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogR29vZ2xlU3RyZWV0dmlld1Bhbm9yYW1hLFxuXG4gICAgLyoqXG4gICAgICogTG9hZCBHb29nbGUgU3RyZWV0IFZpZXcgYnkgcGFub3JhbWEgaWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFub0lkIC0gR29nb2dsZSBTdHJlZXQgVmlldyBwYW5vcmFtYSBpZFxuICAgICAqIEBtZW1iZXJPZiBHb29nbGVTdHJlZXR2aWV3UGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbiAoIHBhbm9JZCApIHtcblxuICAgICAgICB0aGlzLmxvYWRSZXF1ZXN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHBhbm9JZCA9ICggcGFub0lkIHx8IHRoaXMucGFub0lkICkgfHwge307XG5cbiAgICAgICAgaWYgKCBwYW5vSWQgJiYgdGhpcy5nc3ZMb2FkZXIgKSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEdTVkxvYWRlciggcGFub0lkICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHVwIEdvb2dsZSBNYXAgQVBJXG4gICAgICogQHBhcmFtIHtzdHJpbmd9ICBhcGlLZXlcbiAgICAgKiBAbWVtYmVyT2YgR29vZ2xlU3RyZWV0dmlld1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0dXBHb29nbGVNYXBBUEk6IGZ1bmN0aW9uICggYXBpS2V5ICkge1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzY3JpcHQnICk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzPyc7XG4gICAgICAgIHNjcmlwdC5zcmMgKz0gYXBpS2V5ID8gJ2tleT0nICsgYXBpS2V5IDogJyc7XG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLnNldEdTVkxvYWRlci5iaW5kKCB0aGlzICk7XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSB0aGlzLnNldEdTVkxvYWRlci5iaW5kKCB0aGlzICk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2hlYWQnICkuYXBwZW5kQ2hpbGQoIHNjcmlwdCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBHU1YgTG9hZGVyXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNldEdTVkxvYWRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuZ3N2TG9hZGVyID0gbmV3IEdvb2dsZVN0cmVldHZpZXdMb2FkZXIoKTtcblxuICAgICAgICBpZiAoIHRoaXMubG9hZFJlcXVlc3RlZCApIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBHU1YgTG9hZGVyXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0dvb2dsZVN0cmVldHZpZXdMb2FkZXJ9IEdTViBMb2FkZXIgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXRHU1ZMb2FkZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5nc3ZMb2FkZXI7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTG9hZCBHU1YgTG9hZGVyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBwYW5vSWQgLSBHb2dvZ2xlIFN0cmVldCBWaWV3IHBhbm9yYW1hIGlkXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGxvYWRHU1ZMb2FkZXI6IGZ1bmN0aW9uICggcGFub0lkICkge1xuXG4gICAgICAgIHRoaXMubG9hZFJlcXVlc3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZ3N2TG9hZGVyLm9uUHJvZ3Jlc3MgPSB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApO1xuXG4gICAgICAgIHRoaXMuZ3N2TG9hZGVyLm9uUGFub3JhbWFMb2FkID0gdGhpcy5vbkxvYWQuYmluZCggdGhpcyApO1xuXG4gICAgICAgIHRoaXMuZ3N2TG9hZGVyLnNldFpvb20oIHRoaXMuZ2V0Wm9vbUxldmVsKCkgKTtcblxuICAgICAgICB0aGlzLmdzdkxvYWRlci5sb2FkKCBwYW5vSWQgKTtcblxuICAgICAgICB0aGlzLmdzdkxvYWRlci5sb2FkZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gcGFub3JhbWEgaXMgbG9hZGVkXG4gICAgICogQHBhcmFtICB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhcyAtIENhbnZhcyB3aGVyZSB0aGUgdGlsZXMgaGF2ZSBiZWVuIGRyYXduXG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uTG9hZDogZnVuY3Rpb24gKCBjYW52YXMgKSB7XG5cbiAgICAgICAgSW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUub25Mb2FkLmNhbGwoIHRoaXMsIG5ldyBUSFJFRS5UZXh0dXJlKCBjYW52YXMgKSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc2V0XG4gICAgICogQG1lbWJlck9mIEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5nc3ZMb2FkZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgSW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUucmVzZXQuY2FsbCggdGhpcyApO1xuXG4gICAgfVxuXG59ICk7XG5cbmV4cG9ydCB7IEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSB9OyIsIi8qKlxuICogU3RlcmVvZ3JhcGhpYyBwcm9qZWN0aW9uIHNoYWRlclxuICogYmFzZWQgb24gaHR0cDovL25vdGxpb24uZ2l0aHViLmlvL3N0cmVldHZpZXctc3RlcmVvZ3JhcGhpY1xuICogQGF1dGhvciBwY2hlbjY2XG4gKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBTdGVyZW9ncmFocGljIFNoYWRlclxuICogQG1vZHVsZSBTdGVyZW9ncmFwaGljU2hhZGVyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdW5pZm9ybXNcbiAqIEBwcm9wZXJ0eSB7VEhSRUUuVGV4dHVyZX0gdW5pZm9ybXMudERpZmZ1c2UgZGlmZnVzZSBtYXBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1bmlmb3Jtcy5yZXNvbHV0aW9uIGltYWdlIHJlc29sdXRpb25cbiAqIEBwcm9wZXJ0eSB7VEhSRUUuTWF0cml4NH0gdW5pZm9ybXMudHJhbnNmb3JtIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVuaWZvcm1zLnpvb20gaW1hZ2Ugem9vbSBmYWN0b3JcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1bmlmb3Jtcy5vcGFjaXR5IGltYWdlIG9wYWNpdHlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB2ZXJ0ZXhTaGFkZXIgdmVydGV4IHNoYWRlclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGZyYWdtZW50U2hhZGVyIGZyYWdtZW50IHNoYWRlclxuICovXG5jb25zdCBTdGVyZW9ncmFwaGljU2hhZGVyID0ge1xuXG4gICAgdW5pZm9ybXM6IHtcblxuICAgICAgICAndERpZmZ1c2UnOiB7IHZhbHVlOiBuZXcgVEhSRUUuVGV4dHVyZSgpIH0sXG4gICAgICAgICdyZXNvbHV0aW9uJzogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgICd0cmFuc2Zvcm0nOiB7IHZhbHVlOiBuZXcgVEhSRUUuTWF0cml4NCgpIH0sXG4gICAgICAgICd6b29tJzogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgICdvcGFjaXR5JzogeyB2YWx1ZTogMS4wIH1cblxuICAgIH0sXG5cbiAgICB2ZXJ0ZXhTaGFkZXI6IGBcblxuICAgICAgICB2YXJ5aW5nIHZlYzIgdlV2O1xuXG4gICAgICAgIHZvaWQgbWFpbigpIHtcblxuICAgICAgICAgICAgdlV2ID0gdXY7XG4gICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcblxuICAgICAgICB9XG5cbiAgICBgLFxuXG4gICAgZnJhZ21lbnRTaGFkZXI6IGBcblxuICAgICAgICB1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCByZXNvbHV0aW9uO1xuICAgICAgICB1bmlmb3JtIG1hdDQgdHJhbnNmb3JtO1xuICAgICAgICB1bmlmb3JtIGZsb2F0IHpvb207XG4gICAgICAgIHVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcblxuICAgICAgICB2YXJ5aW5nIHZlYzIgdlV2O1xuXG4gICAgICAgIGNvbnN0IGZsb2F0IFBJID0gMy4xNDE1OTI2NTM1ODk3OTM7XG5cbiAgICAgICAgdm9pZCBtYWluKCl7XG5cbiAgICAgICAgICAgIHZlYzIgcG9zaXRpb24gPSAtMS4wICsgIDIuMCAqIHZVdjtcblxuICAgICAgICAgICAgcG9zaXRpb24gKj0gdmVjMiggem9vbSAqIHJlc29sdXRpb24sIHpvb20gKiAwLjUgKTtcblxuICAgICAgICAgICAgZmxvYXQgeDJ5MiA9IHBvc2l0aW9uLnggKiBwb3NpdGlvbi54ICsgcG9zaXRpb24ueSAqIHBvc2l0aW9uLnk7XG4gICAgICAgICAgICB2ZWMzIHNwaGVyZV9wbnQgPSB2ZWMzKCAyLiAqIHBvc2l0aW9uLCB4MnkyIC0gMS4gKSAvICggeDJ5MiArIDEuICk7XG5cbiAgICAgICAgICAgIHNwaGVyZV9wbnQgPSB2ZWMzKCB0cmFuc2Zvcm0gKiB2ZWM0KCBzcGhlcmVfcG50LCAxLjAgKSApO1xuXG4gICAgICAgICAgICB2ZWMyIHNhbXBsZVVWID0gdmVjMihcbiAgICAgICAgICAgICAgICAoYXRhbihzcGhlcmVfcG50LnksIHNwaGVyZV9wbnQueCkgLyBQSSArIDEuMCkgKiAwLjUsXG4gICAgICAgICAgICAgICAgKGFzaW4oc3BoZXJlX3BudC56KSAvIFBJICsgMC41KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgc2FtcGxlVVYgKTtcbiAgICAgICAgICAgIGdsX0ZyYWdDb2xvci5hICo9IG9wYWNpdHk7XG5cbiAgICAgICAgfVxuICAgIGBcbn07XG5cbmV4cG9ydCB7IFN0ZXJlb2dyYXBoaWNTaGFkZXIgfTsiLCJpbXBvcnQgeyBJbWFnZVBhbm9yYW1hIH0gZnJvbSAnLi9JbWFnZVBhbm9yYW1hJztcbmltcG9ydCB7IFZpZGVvUGFub3JhbWEgfSBmcm9tICcuL1ZpZGVvUGFub3JhbWEnO1xuaW1wb3J0IHsgSW5mb3Nwb3QgfSBmcm9tICcuLi9pbmZvc3BvdC9JbmZvc3BvdCc7XG5pbXBvcnQgeyBDT05UUk9MUyB9IGZyb20gJy4uL0NvbnN0YW50cyc7XG5pbXBvcnQgeyBTdGVyZW9ncmFwaGljU2hhZGVyIH0gZnJvbSAnLi4vc2hhZGVycy9TdGVyZW9ncmFwaGljU2hhZGVyJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIExpdHRsZSBQbGFuZXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXHRcdC0gVHlwZSBvZiBsaXR0bGUgcGxhbmV0IGJhc2ljIGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFx0XHQtIFVSTCBmb3IgdGhlIGltYWdlIHNvdXJjZVxuICovXG5mdW5jdGlvbiBMaXR0bGVQbGFuZXQgKCB0eXBlID0gJ2ltYWdlJywgc291cmNlICkge1xuXG4gICAgaWYgKCB0eXBlID09PSAnaW1hZ2UnICkge1xuXG4gICAgICAgIEltYWdlUGFub3JhbWEuY2FsbCggdGhpcywgc291cmNlICk7XG5cbiAgICB9XG5cbiAgICBpZiAoIHR5cGUgPT09ICd2aWRlbycgKSB7XG5cbiAgICAgICAgVmlkZW9QYW5vcmFtYS5jYWxsKCB0aGlzLCBzb3VyY2UgKTtcblxuICAgIH1cblxuICAgIHRoaXMuRVBTID0gMC4wMDAwMDE7XG4gICAgdGhpcy5mcmFtZUlkID0gbnVsbDtcblxuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnVzZXJNb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbiAgICB0aGlzLnF1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLnF1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLnF1YXRDdXIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMucXVhdFNsZXJwID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIHRoaXMudmVjdG9yWCA9IG5ldyBUSFJFRS5WZWN0b3IzKCAxLCAwLCAwICk7XG4gICAgdGhpcy52ZWN0b3JZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDAsIDEsIDAgKTtcblxuICAgIHRoaXMudHlwZSA9ICdsaXR0bGVfcGxhbmV0JztcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3dpbmRvdy1yZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplICk7XG5cbn1cblxuTGl0dGxlUGxhbmV0LnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFZpZGVvUGFub3JhbWEucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBMaXR0bGVQbGFuZXQsXG5cbiAgICBhZGQ6IGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG4gICAgICAgIGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKysgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZCggYXJndW1lbnRzWyBpIF0gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBvYmplY3QgaW5zdGFuY2VvZiBJbmZvc3BvdCApIHtcblxuICAgICAgICAgICAgb2JqZWN0Lm1hdGVyaWFsLmRlcHRoVGVzdCA9IGZhbHNlO1xuXHRcdFx0XG4gICAgICAgIH1cblxuICAgICAgICBWaWRlb1Bhbm9yYW1hLnByb3RvdHlwZS5hZGQuY2FsbCggdGhpcywgb2JqZWN0ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc2t5Ym94IGdlb21ldHJ5XG4gICAgICogQG1lbWJlck9mIExpdHRsZVBsYW5ldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNyZWF0ZUdlb21ldHJ5OiBmdW5jdGlvbiAoIGVkZ2VMZW5ndGggKSB7XG5cbiAgICAgICAgY29uc3QgcmF0aW8gPSAwLjU7XG4gICAgICAgIHJldHVybiBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggZWRnZUxlbmd0aCwgcmF0aW8gKiBlZGdlTGVuZ3RoICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG1hdGVyaWFsXG4gICAgICogQG1lbWJlck9mIExpdHRsZVBsYW5ldFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNyZWF0ZU1hdGVyaWFsOiBmdW5jdGlvbiAoIHNpemUgPSB0aGlzLmVkZ2VMZW5ndGggKSB7XG5cbiAgICAgICAgY29uc3QgeyBmcmFnbWVudFNoYWRlciwgdmVydGV4U2hhZGVyLCB1bmlmb3JtczogX3VuaWZvcm1zIH0gPSBTdGVyZW9ncmFwaGljU2hhZGVyO1xuICAgICAgICBjb25zdCB1bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMuY2xvbmUoIF91bmlmb3JtcyApO1xuXG4gICAgICAgIHVuaWZvcm1zLnpvb20udmFsdWUgPSBzaXplO1xuICAgICAgICB1bmlmb3Jtcy5vcGFjaXR5LnZhbHVlID0gMC4wO1xuXG4gICAgICAgIHJldHVybiBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHtcblxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLFxuICAgICAgICAgICAgZnJhZ21lbnRTaGFkZXIsXG4gICAgICAgICAgICB1bmlmb3JtcyxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuXG4gICAgICAgIH0gKTtcblx0XHRcbiAgICB9LFxuXG4gICAgcmVnaXN0ZXJNb3VzZUV2ZW50czogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2VEb3duLmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IHRydWUgfSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0aGlzLm9uTW91c2VVcC5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXdoZWVsJywgdGhpcy5vbk1vdXNlV2hlZWwuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTU1vdXNlU2Nyb2xsJywgdGhpcy5vbk1vdXNlV2hlZWwuYmluZCggdGhpcyApLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgdGhpcy5vbkNvbnRleHRNZW51LmJpbmQoIHRoaXMgKSwgeyBwYXNzaXZlOiB0cnVlIH0gKTtcblx0XHRcbiAgICB9LFxuXG4gICAgdW5yZWdpc3Rlck1vdXNlRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24uYmluZCggdGhpcyApLCBmYWxzZSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZS5iaW5kKCB0aGlzICksIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXAuYmluZCggdGhpcyApLCBmYWxzZSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIHRoaXMub25Nb3VzZURvd24uYmluZCggdGhpcyApLCBmYWxzZSApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgdGhpcy5vbk1vdXNlTW92ZS5iaW5kKCB0aGlzICksIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIHRoaXMub25Nb3VzZVVwLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNld2hlZWwnLCB0aGlzLm9uTW91c2VXaGVlbC5iaW5kKCB0aGlzICksIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdET01Nb3VzZVNjcm9sbCcsIHRoaXMub25Nb3VzZVdoZWVsLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgdGhpcy5vbkNvbnRleHRNZW51LmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblx0XHRcbiAgICB9LFxuXG4gICAgb25Nb3VzZURvd246IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICAgICAgY29uc3QgaW5wdXRDb3VudCA9ICggZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCApIHx8IDEgO1xuXG4gICAgICAgIHN3aXRjaCAoIGlucHV0Q291bnQgKSB7XG5cbiAgICAgICAgY2FzZSAxOlxuXG4gICAgICAgICAgICBjb25zdCB4ID0gKCBldmVudC5jbGllbnRYID49IDAgKSA/IGV2ZW50LmNsaWVudFggOiBldmVudC50b3VjaGVzWyAwIF0uY2xpZW50WDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSAoIGV2ZW50LmNsaWVudFkgPj0gMCApID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LnRvdWNoZXNbIDAgXS5jbGllbnRZO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygneDogJyArIHggKyAneTogJyArIHkpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXNlck1vdXNlLnNldCggeCwgeSApO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6XG5cbiAgICAgICAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuICAgICAgICAgICAgY29uc3QgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcbiAgICAgICAgICAgIHRoaXMudXNlck1vdXNlLnBpbmNoRGlzdGFuY2UgPSBkaXN0YW5jZTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25VcGRhdGVDYWxsYmFjaygpO1xuXG4gICAgfSxcblxuICAgIG9uTW91c2VNb3ZlOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGNvbnN0IGlucHV0Q291bnQgPSAoIGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggKSB8fCAxIDtcblxuICAgICAgICBzd2l0Y2ggKCBpbnB1dENvdW50ICkge1xuXG4gICAgICAgIGNhc2UgMTpcblxuICAgICAgICAgICAgY29uc3QgeCA9ICggZXZlbnQuY2xpZW50WCA+PSAwICkgPyBldmVudC5jbGllbnRYIDogZXZlbnQudG91Y2hlc1sgMCBdLmNsaWVudFg7XG4gICAgICAgICAgICBjb25zdCB5ID0gKCBldmVudC5jbGllbnRZID49IDAgKSA/IGV2ZW50LmNsaWVudFkgOiBldmVudC50b3VjaGVzWyAwIF0uY2xpZW50WTtcblxuICAgICAgICAgICAgY29uc3QgYW5nbGVYID0gVEhSRUUuTWF0aC5kZWdUb1JhZCggeCAtIHRoaXMudXNlck1vdXNlLnggKSAqIDAuNDtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlWSA9IFRIUkVFLk1hdGguZGVnVG9SYWQoIHkgLSB0aGlzLnVzZXJNb3VzZS55ICkgKiAwLjQ7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5kcmFnZ2luZyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1YXRBLnNldEZyb21BeGlzQW5nbGUoIHRoaXMudmVjdG9yWSwgYW5nbGVYICk7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWF0Qi5zZXRGcm9tQXhpc0FuZ2xlKCB0aGlzLnZlY3RvclgsIGFuZ2xlWSApO1xuICAgICAgICAgICAgICAgIHRoaXMucXVhdEN1ci5tdWx0aXBseSggdGhpcy5xdWF0QSApLm11bHRpcGx5KCB0aGlzLnF1YXRCICk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyTW91c2Uuc2V0KCB4LCB5ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOlxuXG4gICAgICAgICAgICBjb25zdCBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoIGR4ICogZHggKyBkeSAqIGR5ICk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkWm9vbURlbHRhKCB0aGlzLnVzZXJNb3VzZS5waW5jaERpc3RhbmNlIC0gZGlzdGFuY2UgKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG9uTW91c2VVcDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIH0sXG5cbiAgICBvbk1vdXNlV2hlZWw6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgbGV0IGRlbHRhID0gMDtcblxuICAgICAgICBpZiAoIGV2ZW50LndoZWVsRGVsdGEgIT09IHVuZGVmaW5lZCApIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cbiAgICAgICAgICAgIGRlbHRhID0gZXZlbnQud2hlZWxEZWx0YTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBldmVudC5kZXRhaWwgIT09IHVuZGVmaW5lZCApIHsgLy8gRmlyZWZveFxuXG4gICAgICAgICAgICBkZWx0YSA9IC0gZXZlbnQuZGV0YWlsO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZFpvb21EZWx0YSggZGVsdGEgKTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZUNhbGxiYWNrKCk7XG5cbiAgICB9LFxuXG4gICAgYWRkWm9vbURlbHRhOiBmdW5jdGlvbiAoIGRlbHRhICkge1xuXG4gICAgICAgIGNvbnN0IHVuaWZvcm1zID0gdGhpcy5tYXRlcmlhbC51bmlmb3JtcztcbiAgICAgICAgY29uc3QgbG93ZXJCb3VuZCA9IHRoaXMuc2l6ZSAqIDAuMTtcbiAgICAgICAgY29uc3QgdXBwZXJCb3VuZCA9IHRoaXMuc2l6ZSAqIDEwO1xuXG4gICAgICAgIHVuaWZvcm1zLnpvb20udmFsdWUgKz0gZGVsdGE7XG5cbiAgICAgICAgaWYgKCB1bmlmb3Jtcy56b29tLnZhbHVlIDw9IGxvd2VyQm91bmQgKSB7XG5cbiAgICAgICAgICAgIHVuaWZvcm1zLnpvb20udmFsdWUgPSBsb3dlckJvdW5kO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHVuaWZvcm1zLnpvb20udmFsdWUgPj0gdXBwZXJCb3VuZCApIHtcblxuICAgICAgICAgICAgdW5pZm9ybXMuem9vbS52YWx1ZSA9IHVwcGVyQm91bmQ7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG9uVXBkYXRlQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmZyYW1lSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLm9uVXBkYXRlQ2FsbGJhY2suYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgdGhpcy5xdWF0U2xlcnAuc2xlcnAoIHRoaXMucXVhdEN1ciwgMC4xICk7XG5cbiAgICAgICAgaWYgKCB0aGlzLm1hdGVyaWFsICkge1xuXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnRyYW5zZm9ybS52YWx1ZS5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbiggdGhpcy5xdWF0U2xlcnAgKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucXVhdFNsZXJwKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoICF0aGlzLmRyYWdnaW5nICYmIDEuMCAtIHRoaXMucXVhdFNsZXJwLmNsb25lKCkuZG90KCB0aGlzLnF1YXRDdXIgKSA8IHRoaXMuRVBTICkge1xuXHRcdFx0XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRoaXMuZnJhbWVJZCApO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMucXVhdEN1ci5zZXQoIDAsIDAsIDAsIDEgKTtcbiAgICAgICAgdGhpcy5xdWF0U2xlcnAuc2V0KCAwLCAwLCAwLCAxICk7XG4gICAgICAgIHRoaXMub25VcGRhdGVDYWxsYmFjaygpO1xuXG4gICAgfSxcblxuICAgIHVwZGF0ZVRleHR1cmU6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuICAgICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnREaWZmdXNlLnZhbHVlID0gdGV4dHVyZTtcblxuICAgIH0sXG5cbiAgICBnZXRUZXh0dXJlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudERpZmZ1c2UudmFsdWU7XG5cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cbiAgICAgICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGggLyB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5yZWdpc3Rlck1vdXNlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMub25VcGRhdGVDYWxsYmFjaygpO1xuXHRcdFxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnZGlzYWJsZUNvbnRyb2wnIH0gKTtcblxuICAgICAgICBWaWRlb1Bhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcywgdGV4dHVyZSApO1xuXHRcdFxuICAgIH0sXG5cbiAgICBvbkxlYXZlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyTW91c2VFdmVudHMoKTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgbWV0aG9kOiAnZW5hYmxlQ29udHJvbCcsIGRhdGE6IENPTlRST0xTLk9SQklUIH0gKTtcblxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRoaXMuZnJhbWVJZCApO1xuXG4gICAgICAgIFZpZGVvUGFub3JhbWEucHJvdG90eXBlLm9uTGVhdmUuY2FsbCggdGhpcyApO1xuXHRcdFxuICAgIH0sXG5cbiAgICBvbldpbmRvd1Jlc2l6ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZSA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoIC8gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuXG4gICAgfSxcblxuICAgIG9uQ29udGV4dE1lbnU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgZGlzcG9zZTogZnVuY3Rpb24gKCkge1x0XG5cbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyTW91c2VFdmVudHMoKTtcblxuICAgICAgICBWaWRlb1Bhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSk7XG5cbmV4cG9ydCB7IExpdHRsZVBsYW5ldCB9OyIsImltcG9ydCB7IExpdHRsZVBsYW5ldCB9IGZyb20gJy4vTGl0dGxlUGxhbmV0JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEltYWdlIExpdHRsZSBQbGFuZXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcdFx0LSBVUkwgZm9yIHRoZSBpbWFnZSBzb3VyY2VcbiAqL1xuZnVuY3Rpb24gSW1hZ2VMaXR0bGVQbGFuZXQgKCBzb3VyY2UgKSB7XG5cbiAgICBMaXR0bGVQbGFuZXQuY2FsbCggdGhpcywgJ2ltYWdlJywgc291cmNlICk7XG5cbiAgICB0aGlzLnR5cGUgPSAnaW1hZ2VfbGl0dGxlX3BsYW5ldCc7XG5cbn1cblxuSW1hZ2VMaXR0bGVQbGFuZXQucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggTGl0dGxlUGxhbmV0LnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogSW1hZ2VMaXR0bGVQbGFuZXQsXG5cbiAgICAvKipcbiAgICAgKiBPbiBsb2FkZWQgd2l0aCB0ZXh0dXJlXG4gICAgICogQHBhcmFtIHtUSFJFRS5UZXh0dXJlfSB0ZXh0dXJlXG4gICAgICogQG1lbWJlck9mIEltYWdlTGl0dGxlUGxhbmV0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cbiAgICAgICAgdGhpcy51cGRhdGVUZXh0dXJlKCB0ZXh0dXJlICk7XG5cbiAgICAgICAgTGl0dGxlUGxhbmV0LnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcywgdGV4dHVyZSApO1xuXG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGV4dHVyZVxuICAgICAqIEBwYXJhbSB7VEhSRUUuVGV4dHVyZX0gdGV4dHVyZSBcbiAgICAgKiBAbWVtYmVyT2YgSW1hZ2VMaXR0bGVQbGFuZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICB1cGRhdGVUZXh0dXJlOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cbiAgICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPSB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcblx0XHRcbiAgICAgICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtc1sgJ3REaWZmdXNlJyBdLnZhbHVlID0gdGV4dHVyZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlXG4gICAgICogQG1lbWJlck9mIEltYWdlTGl0dGxlUGxhbmV0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHREaWZmdXNlID0gdGhpcy5tYXRlcmlhbC51bmlmb3Jtc1sgJ3REaWZmdXNlJyBdO1xuXG4gICAgICAgIGlmICggdERpZmZ1c2UgJiYgdERpZmZ1c2UudmFsdWUgKSB7XG5cbiAgICAgICAgICAgIHREaWZmdXNlLnZhbHVlLmRpc3Bvc2UoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgTGl0dGxlUGxhbmV0LnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBJbWFnZUxpdHRsZVBsYW5ldCB9OyIsImltcG9ydCB7IExpdHRsZVBsYW5ldCB9IGZyb20gJy4vTGl0dGxlUGxhbmV0JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIFZpZGVvIExpdHRsZSBQbGFuZXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcdFx0LSBVUkwgZm9yIHRoZSBpbWFnZSBzb3VyY2VcbiAqL1xuZnVuY3Rpb24gVmlkZW9MaXR0bGVQbGFuZXQgKCBzb3VyY2UgKSB7XG5cbiAgICBMaXR0bGVQbGFuZXQuY2FsbCggdGhpcywgJ3ZpZGVvJywgc291cmNlICk7XG5cbiAgICB0aGlzLnR5cGUgPSAndmlkZW9fbGl0dGxlX3BsYW5ldCc7XG5cbn1cblxuVmlkZW9MaXR0bGVQbGFuZXQucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggTGl0dGxlUGxhbmV0LnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogVmlkZW9MaXR0bGVQbGFuZXQsXG5cbiAgICAvKipcbiAgICAgKiBPbiBsb2FkZWQgd2l0aCB0ZXh0dXJlXG4gICAgICogQHBhcmFtIHtUSFJFRS5UZXh0dXJlfSB0ZXh0dXJlXG4gICAgICogQG1lbWJlck9mIFZpZGVvTGl0dGxlUGxhbmV0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cbiAgICAgICAgdGhpcy51cGRhdGVUZXh0dXJlKCB0ZXh0dXJlICk7XG5cbiAgICAgICAgTGl0dGxlUGxhbmV0LnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcywgdGV4dHVyZSApO1xuXG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGV4dHVyZVxuICAgICAqIEBwYXJhbSB7VEhSRUUuVGV4dHVyZX0gdGV4dHVyZSBcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9MaXR0bGVQbGFuZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICB1cGRhdGVUZXh0dXJlOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cbiAgICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPSB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcblx0XHRcbiAgICAgICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtc1sgJ3REaWZmdXNlJyBdLnZhbHVlID0gdGV4dHVyZTtcblxuICAgIH0sXG5cdFx0XG4gICAgLyoqXG4gICAgICogU2V0IHZpZGVvIHRleHR1cmVcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9MaXR0bGVQbGFuZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge0hUTUxWaWRlb0VsZW1lbnR9IHZpZGVvICAtIFRoZSBodG1sNSB2aWRlbyBlbGVtZW50XG4gICAgICogQGZpcmVzIFBhbm9yYW1hI3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyXG4gICAgICovXG4gICAgc2V0VmlkZW9UZXh0dXJlOiBmdW5jdGlvbiAoIHZpZGVvICkge1xuXG4gICAgICAgIGlmICggIXZpZGVvICkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHZpZGVvVGV4dHVyZSA9IG5ldyBUSFJFRS5WaWRlb1RleHR1cmUoIHZpZGVvICk7XG4gICAgICAgIHZpZGVvVGV4dHVyZS5taW5GaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG4gICAgICAgIHZpZGVvVGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG4gICAgICAgIHZpZGVvVGV4dHVyZS5mb3JtYXQgPSBUSFJFRS5SR0JGb3JtYXQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVUZXh0dXJlKCB2aWRlb1RleHR1cmUgKTtcblxuICAgICAgICByZXR1cm4gdmlkZW9UZXh0dXJlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc3Bvc2VcbiAgICAgKiBAbWVtYmVyT2YgVmlkZW9MaXR0bGVQbGFuZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgdERpZmZ1c2UgPSB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zWyAndERpZmZ1c2UnIF07XG5cbiAgICAgICAgaWYgKCB0RGlmZnVzZSAmJiB0RGlmZnVzZS52YWx1ZSApIHtcblxuICAgICAgICAgICAgdERpZmZ1c2UudmFsdWUuZGlzcG9zZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBMaXR0bGVQbGFuZXQucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCggdGhpcyApO1xuXG4gICAgfVxuXG59ICk7XG5cbmV4cG9ydCB7IFZpZGVvTGl0dGxlUGxhbmV0IH07IiwiaW1wb3J0IHsgUGFub3JhbWEgfSBmcm9tICcuL1Bhbm9yYW1hJztcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSAnLi4vYXV4aWxpYXJ5L01lZGlhJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIENhbWVyYSBwYW5vcmFtYVxuICogQGRlc2NyaXB0aW9uIFNlZSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01lZGlhU3RyZWFtQ29uc3RyYWludHN8TWVkaWFTdHJlYW1Db25zdHJhaW50c30gZm9yIGNvbnN0cmFpbnRzXG4gKiBAcGFyYW0ge29iamVjdH0gLSBjYW1lcmEgY29uc3RyYWludHNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW1lcmFQYW5vcmFtYSAoIGNvbnN0cmFpbnRzICkge1xuXG4gICAgUGFub3JhbWEuY2FsbCggdGhpcyApO1xuXG4gICAgdGhpcy5tZWRpYSA9IG5ldyBNZWRpYSggY29uc3RyYWludHMgKTtcblxuICAgIHRoaXMudHlwZSA9ICdjYW1lcmFfcGFub3JhbWEnO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCAnZW50ZXInLCB0aGlzLnN0YXJ0LmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2xlYXZlJywgdGhpcy5zdG9wLmJpbmQoIHRoaXMgKSApO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLWNvbnRhaW5lcicsIHRoaXMub25QYW5vbGVuc0NvbnRhaW5lci5iaW5kKCB0aGlzICkgKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy1zY2VuZScsIHRoaXMub25QYW5vbGVuc1NjZW5lLmJpbmQoIHRoaXMgKSApO1xuXG59XG5cbkNhbWVyYVBhbm9yYW1hLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFBhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogQ2FtZXJhUGFub3JhbWEsXG5cbiAgICAvKipcbiAgICAgKiBPbiBjb250YWluZXIgZXZlbnRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICAgKiBAbWVtYmVyT2YgQ2FtZXJhUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvblBhbm9sZW5zQ29udGFpbmVyOiBmdW5jdGlvbiAoIHsgY29udGFpbmVyIH0gKSB7XG5cbiAgICAgICAgdGhpcy5tZWRpYS5zZXRDb250YWluZXIoIGNvbnRhaW5lciApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9uIHNjZW5lIGV2ZW50XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IFxuICAgICAqIEBtZW1iZXJPZiBDYW1lcmFQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uUGFub2xlbnNTY2VuZTogZnVuY3Rpb24gKCB7IHNjZW5lIH0gKSB7XG5cbiAgICAgICAgdGhpcy5tZWRpYS5zZXRTY2VuZSggc2NlbmUgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBjYW1lcmEgc3RyZWFtaW5nXG4gICAgICogQG1lbWJlck9mIENhbWVyYVBhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYS5zdGFydCgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3AgY2FtZXJhIHN0cmVhbWluZ1xuICAgICAqIEBtZW1iZXJPZiBDYW1lcmFQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLm1lZGlhLnN0b3AoKTtcblxuICAgIH0sXG5cbn0gKTtcblxuZXhwb3J0IHsgQ2FtZXJhUGFub3JhbWEgfTsiLCJpbXBvcnQgeyBTVEVSRU9GT1JNQVQgfSBmcm9tICcuLi9Db25zdGFudHMnO1xuaW1wb3J0IHsgSW1hZ2VQYW5vcmFtYSB9IGZyb20gJy4vSW1hZ2VQYW5vcmFtYSc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBTdGVyZW8gfSBmcm9tICcuLi9hdXhpbGlhcnkvU3RlcmVvJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIFN0ZXJlbyBJbWFnZSBQYW5vcmFtYVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIC0gaW1hZ2Ugc291cmNlXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0ZXJlbz1uZXcgU3RlcmVvKCldIC0gc3RlcmVvIG1peGluXG4gKi9cbmZ1bmN0aW9uIFN0ZXJlb0ltYWdlUGFub3JhbWEgKCBzcmMsIHN0ZXJlbyA9IG5ldyBTdGVyZW8oKSApe1xuXG4gICAgSW1hZ2VQYW5vcmFtYS5jYWxsKCB0aGlzLCBzcmMgKTtcblxuICAgIHRoaXMuc3RlcmVvID0gc3RlcmVvO1xuICAgIHRoaXMudHlwZSA9ICdzdGVyZW9faW1hZ2VfcGFub3JhbWEnO1xuXG59XG5cblN0ZXJlb0ltYWdlUGFub3JhbWEucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggSW1hZ2VQYW5vcmFtYS5wcm90b3R5cGUgKSwge1xuXG4gICAgY29uc3RydWN0b3I6IFN0ZXJlb0ltYWdlUGFub3JhbWEsXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGV4dHVyZSBpcyByZWFkeVxuICAgICAqIEBwYXJhbSAge1RIUkVFLlRleHR1cmV9IHRleHR1cmUgLSBJbWFnZSB0ZXh0dXJlXG4gICAgICogQG1lbWJlck9mIFN0ZXJlb0ltYWdlUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICggdGV4dHVyZSApIHtcblxuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRleHR1cmUuaW1hZ2U7XG4gICAgICAgIGxldCBmb3JtYXQgPSBudWxsO1xuXG4gICAgICAgIGlmICggd2lkdGggLyBoZWlnaHQgPT09IDQgKSB7IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3JtYXQgPSBTVEVSRU9GT1JNQVQuU0JTO1xuICAgICAgICBcbiAgICAgICAgfSBlbHNlIHsgXG5cbiAgICAgICAgICAgIGZvcm1hdCA9IFNURVJFT0ZPUk1BVC5UQUI7XG4gICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGVyZW8udXBkYXRlVW5pZm9ybUJ5Rm9ybWF0KCBmb3JtYXQsIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMgKTtcblxuICAgICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zWyAndEVxdWlyZWN0JyBdLnZhbHVlID0gdGV4dHVyZTtcblxuICAgICAgICBJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcywgdGV4dHVyZSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBUZXh0dXJlIGZvciBTdGVyZW8gTGVmdCBFeWVcbiAgICAgKiBAbWVtYmVyT2YgU3RlcmVvSW1hZ2VQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZVRleHR1cmVUb0xlZnQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuc3RlcmVvLnVwZGF0ZVRleHR1cmVUb0xlZnQoIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMub2Zmc2V0LnZhbHVlICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIFRleHR1cmUgZm9yIFN0ZXJlbyBSaWdodCBFeWVcbiAgICAgKiBAbWVtYmVyT2YgU3RlcmVvSW1hZ2VQYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZVRleHR1cmVUb1JpZ2h0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLnN0ZXJlby51cGRhdGVUZXh0dXJlVG9SaWdodCggdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5vZmZzZXQudmFsdWUgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlXG4gICAgICogQG1lbWJlck9mIFN0ZXJlb0ltYWdlUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XHRcblxuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnRFcXVpcmVjdDtcblxuICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgVEhSRUUuVGV4dHVyZSApIHtcblxuICAgICAgICAgICAgdmFsdWUuZGlzcG9zZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBJbWFnZVBhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBTdGVyZW9JbWFnZVBhbm9yYW1hIH07IiwiaW1wb3J0IHsgU1RFUkVPRk9STUFUIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcbmltcG9ydCB7IFZpZGVvUGFub3JhbWEgfSBmcm9tICcuL1ZpZGVvUGFub3JhbWEnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgU3RlcmVvIH0gZnJvbSAnLi4vYXV4aWxpYXJ5L1N0ZXJlbyc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBTdGVyZW8gSW1hZ2UgUGFub3JhbWFcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyAtIGltYWdlIHNvdXJjZVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSB7IEBzZWUgVmlkZW9QYW5vcmFtYSB9XG4gKiBAcGFyYW0ge251bWJlcn0gW3N0ZXJlbz1uZXcgU3RlcmVvKCldIC0gc3RlcmVvIG1peGluXG4gKi9cbmZ1bmN0aW9uIFN0ZXJlb1ZpZGVvUGFub3JhbWEgKCBzcmMsIG9wdGlvbnMgPSB7fSwgc3RlcmVvID0gbmV3IFN0ZXJlbygpICl7XG5cbiAgICBWaWRlb1Bhbm9yYW1hLmNhbGwoIHRoaXMsIHNyYywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5zdGVyZW8gPSBzdGVyZW87XG4gICAgdGhpcy50eXBlID0gJ3N0ZXJlb192aWRlb19wYW5vcmFtYSc7XG5cbn1cblxuU3RlcmVvVmlkZW9QYW5vcmFtYS5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBWaWRlb1Bhbm9yYW1hLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogU3RlcmVvVmlkZW9QYW5vcmFtYSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiB2aWRlbyB0ZXh0dXJlIGlzIHJlYWR5XG4gICAgICogQHBhcmFtICB7VEhSRUUuVmlkZW9UZXh0dXJlfSB0ZXh0dXJlIC0gVmlkZW8gdGV4dHVyZVxuICAgICAqIEBtZW1iZXJPZiBTdGVyZW9WaWRlb1Bhbm9yYW1hXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoIHRleHR1cmUgKSB7XG5cbiAgICAgICAgY29uc3QgeyB2aWRlb1dpZHRoLCB2aWRlb0hlaWdodCB9ID0gdGV4dHVyZS5pbWFnZTtcbiAgICAgICAgbGV0IGZvcm1hdCA9IG51bGw7XG5cbiAgICAgICAgaWYgKCB2aWRlb1dpZHRoIC8gdmlkZW9IZWlnaHQgPT09IDQgKSB7IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3JtYXQgPSBTVEVSRU9GT1JNQVQuU0JTO1xuICAgICAgICBcbiAgICAgICAgfSBlbHNlIHsgXG5cbiAgICAgICAgICAgIGZvcm1hdCA9IFNURVJFT0ZPUk1BVC5UQUI7XG4gICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGVyZW8udXBkYXRlVW5pZm9ybUJ5Rm9ybWF0KCBmb3JtYXQsIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMgKTtcblxuICAgICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zWyAndEVxdWlyZWN0JyBdLnZhbHVlID0gdGV4dHVyZTtcblxuICAgICAgICBWaWRlb1Bhbm9yYW1hLnByb3RvdHlwZS5vbkxvYWQuY2FsbCggdGhpcyApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBUZXh0dXJlIGZvciBTdGVyZW8gTGVmdCBFeWVcbiAgICAgKiBAbWVtYmVyT2YgU3RlcmVvVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZVRleHR1cmVUb0xlZnQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuc3RlcmVvLnVwZGF0ZVRleHR1cmVUb0xlZnQoIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMub2Zmc2V0LnZhbHVlICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIFRleHR1cmUgZm9yIFN0ZXJlbyBSaWdodCBFeWVcbiAgICAgKiBAbWVtYmVyT2YgU3RlcmVvVmlkZW9QYW5vcmFtYVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZVRleHR1cmVUb1JpZ2h0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLnN0ZXJlby51cGRhdGVUZXh0dXJlVG9SaWdodCggdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5vZmZzZXQudmFsdWUgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlXG4gICAgICogQG1lbWJlck9mIFN0ZXJlb1ZpZGVvUGFub3JhbWFcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XHRcblxuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnRFcXVpcmVjdDtcblxuICAgICAgICBpZiAoIHZhbHVlIGluc3RhbmNlb2YgVEhSRUUuVGV4dHVyZSApIHtcblxuICAgICAgICAgICAgdmFsdWUuZGlzcG9zZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBWaWRlb1Bhbm9yYW1hLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwoIHRoaXMgKTtcblxuICAgIH1cblxufSApO1xuXG5leHBvcnQgeyBTdGVyZW9WaWRlb1Bhbm9yYW1hIH07IiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2MgT3JiaXQgQ29udHJvbHNcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVybmFsIE9yYml0Q29udHJvbHNcbiAqIEBwYXJhbSB7VEhSRUUuT2JqZWN0fSBvYmplY3QgXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb21FbGVtZW50IFxuICovXG5mdW5jdGlvbiBPcmJpdENvbnRyb2xzICggb2JqZWN0LCBkb21FbGVtZW50ICkge1xuXG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gKCBkb21FbGVtZW50ICE9PSB1bmRlZmluZWQgKSA/IGRvbUVsZW1lbnQgOiBkb2N1bWVudDtcbiAgICB0aGlzLmZyYW1lSWQgPSBudWxsO1xuXG4gICAgLy8gQVBJXG5cbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGNvbnRyb2xcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgLypcbiAgICAgKiBcInRhcmdldFwiIHNldHMgdGhlIGxvY2F0aW9uIG9mIGZvY3VzLCB3aGVyZSB0aGUgY29udHJvbCBvcmJpdHMgYXJvdW5kXG4gICAgICogYW5kIHdoZXJlIGl0IHBhbnMgd2l0aCByZXNwZWN0IHRvLlxuICAgICAqL1xuICAgIHRoaXMudGFyZ2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgIC8vIGNlbnRlciBpcyBvbGQsIGRlcHJlY2F0ZWQ7IHVzZSBcInRhcmdldFwiIGluc3RlYWRcbiAgICB0aGlzLmNlbnRlciA9IHRoaXMudGFyZ2V0O1xuXG4gICAgLypcbiAgICAgKiBUaGlzIG9wdGlvbiBhY3R1YWxseSBlbmFibGVzIGRvbGx5aW5nIGluIGFuZCBvdXQ7IGxlZnQgYXMgXCJ6b29tXCIgZm9yXG4gICAgICogYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICAgKi9cbiAgICB0aGlzLm5vWm9vbSA9IGZhbHNlO1xuICAgIHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXG4gICAgLy8gTGltaXRzIHRvIGhvdyBmYXIgeW91IGNhbiBkb2xseSBpbiBhbmQgb3V0ICggUGVyc3BlY3RpdmVDYW1lcmEgb25seSApXG4gICAgdGhpcy5taW5EaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgLy8gTGltaXRzIHRvIGhvdyBmYXIgeW91IGNhbiB6b29tIGluIGFuZCBvdXQgKCBPcnRob2dyYXBoaWNDYW1lcmEgb25seSApXG4gICAgdGhpcy5taW5ab29tID0gMDtcbiAgICB0aGlzLm1heFpvb20gPSBJbmZpbml0eTtcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG4gICAgdGhpcy5ub1JvdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMucm90YXRlU3BlZWQgPSAtMC4xNTtcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG4gICAgdGhpcy5ub1BhbiA9IHRydWU7XG4gICAgdGhpcy5rZXlQYW5TcGVlZCA9IDcuMDtcdC8vIHBpeGVscyBtb3ZlZCBwZXIgYXJyb3cga2V5IHB1c2hcblxuICAgIC8vIFNldCB0byB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgcm90YXRlIGFyb3VuZCB0aGUgdGFyZ2V0XG4gICAgdGhpcy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgdGhpcy5hdXRvUm90YXRlU3BlZWQgPSAyLjA7IC8vIDMwIHNlY29uZHMgcGVyIHJvdW5kIHdoZW4gZnBzIGlzIDYwXG5cbiAgICAvKlxuICAgICAqIEhvdyBmYXIgeW91IGNhbiBvcmJpdCB2ZXJ0aWNhbGx5LCB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuICAgICAqIFJhbmdlIGlzIDAgdG8gTWF0aC5QSSByYWRpYW5zLlxuICAgICAqL1xuICAgIHRoaXMubWluUG9sYXJBbmdsZSA9IDA7IC8vIHJhZGlhbnNcbiAgICB0aGlzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJOyAvLyByYWRpYW5zXG5cbiAgICAvLyBNb21lbnR1bVxuICBcdHRoaXMubW9tZW50dW1EYW1waW5nRmFjdG9yID0gMC45MDtcbiAgXHR0aGlzLm1vbWVudHVtU2NhbGluZ0ZhY3RvciA9IC0wLjAwNTtcbiAgXHR0aGlzLm1vbWVudHVtS2V5ZG93bkZhY3RvciA9IDIwO1xuXG4gIFx0Ly8gRm92XG4gIFx0dGhpcy5taW5Gb3YgPSAzMDtcbiAgXHR0aGlzLm1heEZvdiA9IDEyMDtcblxuICAgIC8qXG4gICAgICogSG93IGZhciB5b3UgY2FuIG9yYml0IGhvcml6b250YWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAgKiBJZiBzZXQsIG11c3QgYmUgYSBzdWItaW50ZXJ2YWwgb2YgdGhlIGludGVydmFsIFsgLSBNYXRoLlBJLCBNYXRoLlBJIF0uXG4gICAgICovXG4gICAgdGhpcy5taW5BemltdXRoQW5nbGUgPSAtIEluZmluaXR5OyAvLyByYWRpYW5zXG4gICAgdGhpcy5tYXhBemltdXRoQW5nbGUgPSBJbmZpbml0eTsgLy8gcmFkaWFuc1xuXG4gICAgLy8gU2V0IHRvIHRydWUgdG8gZGlzYWJsZSB1c2Ugb2YgdGhlIGtleXNcbiAgICB0aGlzLm5vS2V5cyA9IGZhbHNlO1xuXG4gICAgLy8gVGhlIGZvdXIgYXJyb3cga2V5c1xuICAgIHRoaXMua2V5cyA9IHsgTEVGVDogMzcsIFVQOiAzOCwgUklHSFQ6IDM5LCBCT1RUT006IDQwIH07XG5cbiAgICAvLyBNb3VzZSBidXR0b25zXG4gICAgdGhpcy5tb3VzZUJ1dHRvbnMgPSB7IE9SQklUOiBUSFJFRS5NT1VTRS5MRUZULCBaT09NOiBUSFJFRS5NT1VTRS5NSURETEUsIFBBTjogVEhSRUUuTU9VU0UuUklHSFQgfTtcblxuICAgIC8qXG4gICAgICogLy8vLy8vLy8vL1xuICAgICAqIGludGVybmFsc1xuICAgICAqL1xuXG4gICAgY29uc3Qgc2NvcGUgPSB0aGlzO1xuXG4gICAgY29uc3QgRVBTID0gMTBlLTg7XG4gICAgY29uc3QgTUVQUyA9IDEwZS01O1xuXG4gICAgY29uc3Qgcm90YXRlU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuICAgIGNvbnN0IHJvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgY29uc3Qgcm90YXRlRGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG4gICAgY29uc3QgcGFuU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuICAgIGNvbnN0IHBhbkVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgY29uc3QgcGFuRGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuICAgIGNvbnN0IHBhbk9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgICBjb25zdCBvZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gICAgY29uc3QgZG9sbHlTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgY29uc3QgZG9sbHlFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuICAgIGNvbnN0IGRvbGx5RGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG4gICAgbGV0IHRoZXRhID0gMDtcbiAgICBsZXQgcGhpID0gMDtcbiAgICBsZXQgcGhpRGVsdGEgPSAwO1xuICAgIGxldCB0aGV0YURlbHRhID0gMDtcbiAgICBsZXQgc2NhbGUgPSAxO1xuICAgIGNvbnN0IHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgICBjb25zdCBsYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIGNvbnN0IGxhc3RRdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIGxldCBtb21lbnR1bUxlZnQgPSAwLCBtb21lbnR1bVVwID0gMDtcbiAgICBsZXQgZXZlbnRQcmV2aW91cztcbiAgICBsZXQgbW9tZW50dW1PbiA9IGZhbHNlO1xuXG4gICAgbGV0IGtleVVwLCBrZXlCb3R0b20sIGtleUxlZnQsIGtleVJpZ2h0O1xuXG4gICAgY29uc3QgU1RBVEUgPSB7IE5PTkU6IC0xLCBST1RBVEU6IDAsIERPTExZOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfRE9MTFk6IDQsIFRPVUNIX1BBTjogNSB9O1xuXG4gICAgbGV0IHN0YXRlID0gU1RBVEUuTk9ORTtcblxuICAgIC8vIGZvciByZXNldFxuXG4gICAgdGhpcy50YXJnZXQwID0gdGhpcy50YXJnZXQuY2xvbmUoKTtcbiAgICB0aGlzLnBvc2l0aW9uMCA9IHRoaXMub2JqZWN0LnBvc2l0aW9uLmNsb25lKCk7XG4gICAgdGhpcy56b29tMCA9IHRoaXMub2JqZWN0Lnpvb207XG5cbiAgICAvLyBzbyBjYW1lcmEudXAgaXMgdGhlIG9yYml0IGF4aXNcblxuICAgIGNvbnN0IHF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpLnNldEZyb21Vbml0VmVjdG9ycyggb2JqZWN0LnVwLCBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMSwgMCApICk7XG4gICAgY29uc3QgcXVhdEludmVyc2UgPSBxdWF0LmNsb25lKCkuaW52ZXJzZSgpO1xuXG4gICAgLy8gZXZlbnRzXG5cbiAgICBjb25zdCBjaGFuZ2VFdmVudCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcbiAgICBjb25zdCBzdGFydEV2ZW50ID0geyB0eXBlOiAnc3RhcnQnIH07XG4gICAgY29uc3QgZW5kRXZlbnQgPSB7IHR5cGU6ICdlbmQnIH07XG5cbiAgICB0aGlzLnNldExhc3RRdWF0ZXJuaW9uID0gZnVuY3Rpb24gKCBxdWF0ZXJuaW9uICkge1xuICAgICAgICBsYXN0UXVhdGVybmlvbi5jb3B5KCBxdWF0ZXJuaW9uICk7XG4gICAgICAgIHNjb3BlLm9iamVjdC5xdWF0ZXJuaW9uLmNvcHkoIHF1YXRlcm5pb24gKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRMYXN0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBsYXN0UG9zaXRpb247XG4gICAgfTtcblxuICAgIHRoaXMucm90YXRlTGVmdCA9IGZ1bmN0aW9uICggYW5nbGUgKSB7XG5cbiAgICAgICAgaWYgKCBhbmdsZSA9PT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBhbmdsZSA9IGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoZXRhRGVsdGEgLT0gYW5nbGU7XG5cblxuICAgIH07XG5cbiAgICB0aGlzLnJvdGF0ZVVwID0gZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuICAgICAgICBpZiAoIGFuZ2xlID09PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGFuZ2xlID0gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcGhpRGVsdGEgLT0gYW5nbGU7XG5cbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkaXN0YW5jZSBpbiB3b3JsZCBzcGFjZSB0byBtb3ZlIGxlZnRcbiAgICB0aGlzLnBhbkxlZnQgPSBmdW5jdGlvbiAoIGRpc3RhbmNlICkge1xuXG4gICAgICAgIGNvbnN0IHRlID0gdGhpcy5vYmplY3QubWF0cml4LmVsZW1lbnRzO1xuXG4gICAgICAgIC8vIGdldCBYIGNvbHVtbiBvZiBtYXRyaXhcbiAgICAgICAgcGFuT2Zmc2V0LnNldCggdGVbIDAgXSwgdGVbIDEgXSwgdGVbIDIgXSApO1xuICAgICAgICBwYW5PZmZzZXQubXVsdGlwbHlTY2FsYXIoIC0gZGlzdGFuY2UgKTtcblxuICAgICAgICBwYW4uYWRkKCBwYW5PZmZzZXQgKTtcblxuICAgIH07XG5cbiAgICAvLyBwYXNzIGluIGRpc3RhbmNlIGluIHdvcmxkIHNwYWNlIHRvIG1vdmUgdXBcbiAgICB0aGlzLnBhblVwID0gZnVuY3Rpb24gKCBkaXN0YW5jZSApIHtcblxuICAgICAgICBjb25zdCB0ZSA9IHRoaXMub2JqZWN0Lm1hdHJpeC5lbGVtZW50cztcblxuICAgICAgICAvLyBnZXQgWSBjb2x1bW4gb2YgbWF0cml4XG4gICAgICAgIHBhbk9mZnNldC5zZXQoIHRlWyA0IF0sIHRlWyA1IF0sIHRlWyA2IF0gKTtcbiAgICAgICAgcGFuT2Zmc2V0Lm11bHRpcGx5U2NhbGFyKCBkaXN0YW5jZSApO1xuXG4gICAgICAgIHBhbi5hZGQoIHBhbk9mZnNldCApO1xuXG4gICAgfTtcblxuICAgIC8qXG4gICAgICogcGFzcyBpbiB4LHkgb2YgY2hhbmdlIGRlc2lyZWQgaW4gcGl4ZWwgc3BhY2UsXG4gICAgICogcmlnaHQgYW5kIGRvd24gYXJlIHBvc2l0aXZlXG4gICAgICovXG4gICAgdGhpcy5wYW4gPSBmdW5jdGlvbiAoIGRlbHRhWCwgZGVsdGFZICkge1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHNjb3BlLmRvbUVsZW1lbnQuYm9keSA6IHNjb3BlLmRvbUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSApIHtcblxuICAgICAgICAgICAgLy8gcGVyc3BlY3RpdmVcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gc2NvcGUub2JqZWN0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gcG9zaXRpb24uY2xvbmUoKS5zdWIoIHNjb3BlLnRhcmdldCApO1xuICAgICAgICAgICAgbGV0IHRhcmdldERpc3RhbmNlID0gb2Zmc2V0Lmxlbmd0aCgpO1xuXG4gICAgICAgICAgICAvLyBoYWxmIG9mIHRoZSBmb3YgaXMgY2VudGVyIHRvIHRvcCBvZiBzY3JlZW5cbiAgICAgICAgICAgIHRhcmdldERpc3RhbmNlICo9IE1hdGgudGFuKCAoIHNjb3BlLm9iamVjdC5mb3YgLyAyICkgKiBNYXRoLlBJIC8gMTgwLjAgKTtcblxuICAgICAgICAgICAgLy8gd2UgYWN0dWFsbHkgZG9uJ3QgdXNlIHNjcmVlbldpZHRoLCBzaW5jZSBwZXJzcGVjdGl2ZSBjYW1lcmEgaXMgZml4ZWQgdG8gc2NyZWVuIGhlaWdodFxuICAgICAgICAgICAgc2NvcGUucGFuTGVmdCggMiAqIGRlbHRhWCAqIHRhcmdldERpc3RhbmNlIC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKTtcbiAgICAgICAgICAgIHNjb3BlLnBhblVwKCAyICogZGVsdGFZICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSApIHtcblxuICAgICAgICAgICAgLy8gb3J0aG9ncmFwaGljXG4gICAgICAgICAgICBzY29wZS5wYW5MZWZ0KCBkZWx0YVggKiAoc2NvcGUub2JqZWN0LnJpZ2h0IC0gc2NvcGUub2JqZWN0LmxlZnQpIC8gZWxlbWVudC5jbGllbnRXaWR0aCApO1xuICAgICAgICAgICAgc2NvcGUucGFuVXAoIGRlbHRhWSAqIChzY29wZS5vYmplY3QudG9wIC0gc2NvcGUub2JqZWN0LmJvdHRvbSkgLyBlbGVtZW50LmNsaWVudEhlaWdodCApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIGNhbWVyYSBuZWl0aGVyIG9ydGhvZ3JhcGhpYyBvciBwZXJzcGVjdGl2ZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCAnV0FSTklORzogT3JiaXRDb250cm9scy5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gcGFuIGRpc2FibGVkLicgKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhpcy5tb21lbnR1bSA9IGZ1bmN0aW9uKCl7XG5cdFx0XG4gICAgICAgIGlmICggIW1vbWVudHVtT24gKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCBNYXRoLmFicyggbW9tZW50dW1MZWZ0ICkgPCBNRVBTICYmIE1hdGguYWJzKCBtb21lbnR1bVVwICkgPCBNRVBTICkgeyBcblxuICAgICAgICAgICAgbW9tZW50dW1PbiA9IGZhbHNlOyBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vbWVudHVtVXAgICAqPSB0aGlzLm1vbWVudHVtRGFtcGluZ0ZhY3RvcjtcbiAgICAgICAgbW9tZW50dW1MZWZ0ICo9IHRoaXMubW9tZW50dW1EYW1waW5nRmFjdG9yO1xuXG4gICAgICAgIHRoZXRhRGVsdGEgLT0gdGhpcy5tb21lbnR1bVNjYWxpbmdGYWN0b3IgKiBtb21lbnR1bUxlZnQ7XG4gICAgICAgIHBoaURlbHRhICAgLT0gdGhpcy5tb21lbnR1bVNjYWxpbmdGYWN0b3IgKiBtb21lbnR1bVVwO1xuXG4gICAgfTtcblxuICAgIHRoaXMuZG9sbHlJbiA9IGZ1bmN0aW9uICggZG9sbHlTY2FsZSApIHtcblxuICAgICAgICBpZiAoIGRvbGx5U2NhbGUgPT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgZG9sbHlTY2FsZSA9IGdldFpvb21TY2FsZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhICkge1xuXG4gICAgICAgICAgICBzY2FsZSAvPSBkb2xseVNjYWxlO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSApIHtcblxuICAgICAgICAgICAgc2NvcGUub2JqZWN0Lnpvb20gPSBNYXRoLm1heCggdGhpcy5taW5ab29tLCBNYXRoLm1pbiggdGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tICogZG9sbHlTY2FsZSApICk7XG4gICAgICAgICAgICBzY29wZS5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oICdXQVJOSU5HOiBPcmJpdENvbnRyb2xzLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicgKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhpcy5kb2xseU91dCA9IGZ1bmN0aW9uICggZG9sbHlTY2FsZSApIHtcblxuICAgICAgICBpZiAoIGRvbGx5U2NhbGUgPT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgZG9sbHlTY2FsZSA9IGdldFpvb21TY2FsZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhICkge1xuXG4gICAgICAgICAgICBzY2FsZSAqPSBkb2xseVNjYWxlO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSApIHtcblxuICAgICAgICAgICAgc2NvcGUub2JqZWN0Lnpvb20gPSBNYXRoLm1heCggdGhpcy5taW5ab29tLCBNYXRoLm1pbiggdGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tIC8gZG9sbHlTY2FsZSApICk7XG4gICAgICAgICAgICBzY29wZS5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oICdXQVJOSU5HOiBPcmJpdENvbnRyb2xzLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicgKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoIGlnbm9yZVVwZGF0ZSApIHtcblxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuXG4gICAgICAgIG9mZnNldC5jb3B5KCBwb3NpdGlvbiApLnN1YiggdGhpcy50YXJnZXQgKTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IHRvIFwieS1heGlzLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbiggcXVhdCApO1xuXG4gICAgICAgIC8vIGFuZ2xlIGZyb20gei1heGlzIGFyb3VuZCB5LWF4aXNcblxuICAgICAgICB0aGV0YSA9IE1hdGguYXRhbjIoIG9mZnNldC54LCBvZmZzZXQueiApO1xuXG4gICAgICAgIC8vIGFuZ2xlIGZyb20geS1heGlzXG5cbiAgICAgICAgcGhpID0gTWF0aC5hdGFuMiggTWF0aC5zcXJ0KCBvZmZzZXQueCAqIG9mZnNldC54ICsgb2Zmc2V0LnogKiBvZmZzZXQueiApLCBvZmZzZXQueSApO1xuXG4gICAgICAgIGlmICggdGhpcy5hdXRvUm90YXRlICYmIHN0YXRlID09PSBTVEFURS5OT05FICkge1xuXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZUxlZnQoIGdldEF1dG9Sb3RhdGlvbkFuZ2xlKCkgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb21lbnR1bSgpO1xuXG4gICAgICAgIHRoZXRhICs9IHRoZXRhRGVsdGE7XG4gICAgICAgIHBoaSArPSBwaGlEZWx0YTtcblxuICAgICAgICAvLyByZXN0cmljdCB0aGV0YSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHRoZXRhID0gTWF0aC5tYXgoIHRoaXMubWluQXppbXV0aEFuZ2xlLCBNYXRoLm1pbiggdGhpcy5tYXhBemltdXRoQW5nbGUsIHRoZXRhICkgKTtcblxuICAgICAgICAvLyByZXN0cmljdCBwaGkgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuICAgICAgICBwaGkgPSBNYXRoLm1heCggdGhpcy5taW5Qb2xhckFuZ2xlLCBNYXRoLm1pbiggdGhpcy5tYXhQb2xhckFuZ2xlLCBwaGkgKSApO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWUgRVBTIGFuZCBQSS1FUFNcbiAgICAgICAgcGhpID0gTWF0aC5tYXgoIEVQUywgTWF0aC5taW4oIE1hdGguUEkgLSBFUFMsIHBoaSApICk7XG5cbiAgICAgICAgbGV0IHJhZGl1cyA9IG9mZnNldC5sZW5ndGgoKSAqIHNjYWxlO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHJhZGl1cyB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG4gICAgICAgIHJhZGl1cyA9IE1hdGgubWF4KCB0aGlzLm1pbkRpc3RhbmNlLCBNYXRoLm1pbiggdGhpcy5tYXhEaXN0YW5jZSwgcmFkaXVzICkgKTtcblxuICAgICAgICAvLyBtb3ZlIHRhcmdldCB0byBwYW5uZWQgbG9jYXRpb25cbiAgICAgICAgdGhpcy50YXJnZXQuYWRkKCBwYW4gKTtcblxuICAgICAgICBvZmZzZXQueCA9IHJhZGl1cyAqIE1hdGguc2luKCBwaGkgKSAqIE1hdGguc2luKCB0aGV0YSApO1xuICAgICAgICBvZmZzZXQueSA9IHJhZGl1cyAqIE1hdGguY29zKCBwaGkgKTtcbiAgICAgICAgb2Zmc2V0LnogPSByYWRpdXMgKiBNYXRoLnNpbiggcGhpICkgKiBNYXRoLmNvcyggdGhldGEgKTtcblxuICAgICAgICAvLyByb3RhdGUgb2Zmc2V0IGJhY2sgdG8gXCJjYW1lcmEtdXAtdmVjdG9yLWlzLXVwXCIgc3BhY2VcbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbiggcXVhdEludmVyc2UgKTtcblxuICAgICAgICBwb3NpdGlvbi5jb3B5KCB0aGlzLnRhcmdldCApLmFkZCggb2Zmc2V0ICk7XG5cbiAgICAgICAgdGhpcy5vYmplY3QubG9va0F0KCB0aGlzLnRhcmdldCApO1xuXG4gICAgICAgIHRoZXRhRGVsdGEgPSAwO1xuICAgICAgICBwaGlEZWx0YSA9IDA7XG4gICAgICAgIHNjYWxlID0gMTtcbiAgICAgICAgcGFuLnNldCggMCwgMCwgMCApO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIHVwZGF0ZSBjb25kaXRpb24gaXM6XG4gICAgICAgICAqIG1pbihjYW1lcmEgZGlzcGxhY2VtZW50LCBjYW1lcmEgcm90YXRpb24gaW4gcmFkaWFucyleMiA+IEVQU1xuICAgICAgICAgKiB1c2luZyBzbWFsbC1hbmdsZSBhcHByb3hpbWF0aW9uIGNvcyh4LzIpID0gMSAtIHheMiAvIDhcbiAgICAgICAgICovXG4gICAgICAgIGlmICggbGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKCB0aGlzLm9iamVjdC5wb3NpdGlvbiApID4gRVBTXG5cdFx0ICAgIHx8IDggKiAoMSAtIGxhc3RRdWF0ZXJuaW9uLmRvdCh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uKSkgPiBFUFMgKSB7XG5cbiAgICAgICAgICAgIGlmICggaWdub3JlVXBkYXRlICE9PSB0cnVlICkgeyB0aGlzLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7IH1cblxuICAgICAgICAgICAgbGFzdFBvc2l0aW9uLmNvcHkoIHRoaXMub2JqZWN0LnBvc2l0aW9uICk7XG4gICAgICAgICAgICBsYXN0UXVhdGVybmlvbi5jb3B5ICh0aGlzLm9iamVjdC5xdWF0ZXJuaW9uICk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuXG4gICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgICAgdGhpcy50YXJnZXQuY29weSggdGhpcy50YXJnZXQwICk7XG4gICAgICAgIHRoaXMub2JqZWN0LnBvc2l0aW9uLmNvcHkoIHRoaXMucG9zaXRpb24wICk7XG4gICAgICAgIHRoaXMub2JqZWN0Lnpvb20gPSB0aGlzLnpvb20wO1xuXG4gICAgICAgIHRoaXMub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRQb2xhckFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiBwaGk7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBemltdXRoYWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhldGE7XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSB7XG5cbiAgICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC8gNjAgLyA2MCAqIHNjb3BlLmF1dG9Sb3RhdGVTcGVlZDtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFpvb21TY2FsZSgpIHtcblxuICAgICAgICByZXR1cm4gTWF0aC5wb3coIDAuOTUsIHNjb3BlLnpvb21TcGVlZCApO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURvd24oIGV2ZW50ICkge1xuXG4gICAgICAgIG1vbWVudHVtT24gPSBmYWxzZTtcblxuICAgXHRcdG1vbWVudHVtTGVmdCA9IG1vbWVudHVtVXAgPSAwO1xuXG4gICAgICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCBldmVudC5idXR0b24gPT09IHNjb3BlLm1vdXNlQnV0dG9ucy5PUkJJVCApIHtcbiAgICAgICAgICAgIGlmICggc2NvcGUubm9Sb3RhdGUgPT09IHRydWUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuUk9UQVRFO1xuXG4gICAgICAgICAgICByb3RhdGVTdGFydC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBldmVudC5idXR0b24gPT09IHNjb3BlLm1vdXNlQnV0dG9ucy5aT09NICkge1xuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuRE9MTFk7XG5cbiAgICAgICAgICAgIGRvbGx5U3RhcnQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggZXZlbnQuYnV0dG9uID09PSBzY29wZS5tb3VzZUJ1dHRvbnMuUEFOICkge1xuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1BhbiA9PT0gdHJ1ZSApIHJldHVybjtcblxuICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5QQU47XG5cbiAgICAgICAgICAgIHBhblN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHN0YXRlICE9PSBTVEFURS5OT05FICkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSApO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlICk7XG4gICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCBzdGFydEV2ZW50ICk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS51cGRhdGUoKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VNb3ZlKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHNjb3BlLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gc2NvcGUuZG9tRWxlbWVudC5ib2R5IDogc2NvcGUuZG9tRWxlbWVudDtcblxuICAgICAgICBpZiAoIHN0YXRlID09PSBTVEFURS5ST1RBVEUgKSB7XG5cbiAgICAgICAgICAgIGlmICggc2NvcGUubm9Sb3RhdGUgPT09IHRydWUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIHJvdGF0ZUVuZC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcbiAgICAgICAgICAgIHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMoIHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQgKTtcblxuICAgICAgICAgICAgLy8gcm90YXRpbmcgYWNyb3NzIHdob2xlIHNjcmVlbiBnb2VzIDM2MCBkZWdyZWVzIGFyb3VuZFxuICAgICAgICAgICAgc2NvcGUucm90YXRlTGVmdCggMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRXaWR0aCAqIHNjb3BlLnJvdGF0ZVNwZWVkICk7XG5cbiAgICAgICAgICAgIC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuICAgICAgICAgICAgc2NvcGUucm90YXRlVXAoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogc2NvcGUucm90YXRlU3BlZWQgKTtcblxuICAgICAgICAgICAgcm90YXRlU3RhcnQuY29weSggcm90YXRlRW5kICk7XG5cbiAgICAgICAgICAgIGlmKCBldmVudFByZXZpb3VzICl7XG4gICAgICAgICAgICAgICAgbW9tZW50dW1MZWZ0ID0gZXZlbnQuY2xpZW50WCAtIGV2ZW50UHJldmlvdXMuY2xpZW50WDtcbiAgICAgICAgICAgICAgICBtb21lbnR1bVVwID0gZXZlbnQuY2xpZW50WSAtIGV2ZW50UHJldmlvdXMuY2xpZW50WTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnRQcmV2aW91cyA9IGV2ZW50O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHN0YXRlID09PSBTVEFURS5ET0xMWSApIHtcblxuICAgICAgICAgICAgaWYgKCBzY29wZS5ub1pvb20gPT09IHRydWUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIGRvbGx5RW5kLnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuICAgICAgICAgICAgZG9sbHlEZWx0YS5zdWJWZWN0b3JzKCBkb2xseUVuZCwgZG9sbHlTdGFydCApO1xuXG4gICAgICAgICAgICBpZiAoIGRvbGx5RGVsdGEueSA+IDAgKSB7XG5cbiAgICAgICAgICAgICAgICBzY29wZS5kb2xseUluKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGRvbGx5RGVsdGEueSA8IDAgKSB7XG5cbiAgICAgICAgICAgICAgICBzY29wZS5kb2xseU91dCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvbGx5U3RhcnQuY29weSggZG9sbHlFbmQgKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBzdGF0ZSA9PT0gU1RBVEUuUEFOICkge1xuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLm5vUGFuID09PSB0cnVlICkgcmV0dXJuO1xuXG4gICAgICAgICAgICBwYW5FbmQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG4gICAgICAgICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKCBwYW5FbmQsIHBhblN0YXJ0ICk7XG5cbiAgICAgICAgICAgIHNjb3BlLnBhbiggcGFuRGVsdGEueCwgcGFuRGVsdGEueSApO1xuXG4gICAgICAgICAgICBwYW5TdGFydC5jb3B5KCBwYW5FbmQgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBzdGF0ZSAhPT0gU1RBVEUuTk9ORSApIHNjb3BlLnVwZGF0ZSgpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCAvKiBldmVudCAqLyApIHtcblxuICAgICAgICBtb21lbnR1bU9uID0gdHJ1ZTtcblxuICAgICAgICBldmVudFByZXZpb3VzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSApO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UgKTtcbiAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCggZW5kRXZlbnQgKTtcbiAgICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVdoZWVsKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLm5vWm9vbSA9PT0gdHJ1ZSB8fCBzdGF0ZSAhPT0gU1RBVEUuTk9ORSApIHJldHVybjtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBsZXQgZGVsdGEgPSAwO1xuXG4gICAgICAgIGlmICggZXZlbnQud2hlZWxEZWx0YSAhPT0gdW5kZWZpbmVkICkgeyAvLyBXZWJLaXQgLyBPcGVyYSAvIEV4cGxvcmVyIDlcblxuICAgICAgICAgICAgZGVsdGEgPSBldmVudC53aGVlbERlbHRhO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRldGFpbCAhPT0gdW5kZWZpbmVkICkgeyAvLyBGaXJlZm94XG5cbiAgICAgICAgICAgIGRlbHRhID0gLSBldmVudC5kZXRhaWw7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggZGVsdGEgPiAwICkge1xuXG4gICAgICAgICAgICAvLyBzY29wZS5kb2xseU91dCgpO1xuICAgICAgICAgICAgc2NvcGUub2JqZWN0LmZvdiA9ICggc2NvcGUub2JqZWN0LmZvdiA8IHNjb3BlLm1heEZvdiApIFxuICAgICAgICAgICAgICAgID8gc2NvcGUub2JqZWN0LmZvdiArIDFcbiAgICAgICAgICAgICAgICA6IHNjb3BlLm1heEZvdjtcbiAgICAgICAgICAgIHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggZGVsdGEgPCAwICkge1xuXG4gICAgICAgICAgICAvLyBzY29wZS5kb2xseUluKCk7XG4gICAgICAgICAgICBzY29wZS5vYmplY3QuZm92ID0gKCBzY29wZS5vYmplY3QuZm92ID4gc2NvcGUubWluRm92ICkgXG4gICAgICAgICAgICAgICAgPyBzY29wZS5vYmplY3QuZm92IC0gMVxuICAgICAgICAgICAgICAgIDogc2NvcGUubWluRm92O1xuICAgICAgICAgICAgc2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUudXBkYXRlKCk7XG4gICAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG4gICAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoIHN0YXJ0RXZlbnQgKTtcbiAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCggZW5kRXZlbnQgKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5VXAgKCBldmVudCApIHtcblxuICAgICAgICBzd2l0Y2ggKCBldmVudC5rZXlDb2RlICkge1xuXG4gICAgICAgIGNhc2Ugc2NvcGUua2V5cy5VUDpcbiAgICAgICAgICAgIGtleVVwID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHNjb3BlLmtleXMuQk9UVE9NOlxuICAgICAgICAgICAga2V5Qm90dG9tID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHNjb3BlLmtleXMuTEVGVDpcbiAgICAgICAgICAgIGtleUxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Ugc2NvcGUua2V5cy5SSUdIVDpcbiAgICAgICAgICAgIGtleVJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oIGV2ZW50ICkge1xuXG4gICAgICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgfHwgc2NvcGUubm9LZXlzID09PSB0cnVlIHx8IHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xuXG4gICAgICAgIHN3aXRjaCAoIGV2ZW50LmtleUNvZGUgKSB7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLlVQOlxuICAgICAgICAgICAga2V5VXAgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLkJPVFRPTTpcbiAgICAgICAgICAgIGtleUJvdHRvbSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHNjb3BlLmtleXMuTEVGVDpcbiAgICAgICAgICAgIGtleUxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLlJJR0hUOlxuICAgICAgICAgICAga2V5UmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlVcCB8fCBrZXlCb3R0b20gfHwga2V5TGVmdCB8fCBrZXlSaWdodCkge1xuXG4gICAgICAgICAgICBtb21lbnR1bU9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKGtleVVwKSBtb21lbnR1bVVwID0gLSBzY29wZS5yb3RhdGVTcGVlZCAqIHNjb3BlLm1vbWVudHVtS2V5ZG93bkZhY3RvcjtcbiAgICAgICAgICAgIGlmIChrZXlCb3R0b20pIG1vbWVudHVtVXAgPSBzY29wZS5yb3RhdGVTcGVlZCAqIHNjb3BlLm1vbWVudHVtS2V5ZG93bkZhY3RvcjtcbiAgICAgICAgICAgIGlmIChrZXlMZWZ0KSBtb21lbnR1bUxlZnQgPSAtIHNjb3BlLnJvdGF0ZVNwZWVkICogc2NvcGUubW9tZW50dW1LZXlkb3duRmFjdG9yO1xuICAgICAgICAgICAgaWYgKGtleVJpZ2h0KSBtb21lbnR1bUxlZnQgPSBzY29wZS5yb3RhdGVTcGVlZCAqIHNjb3BlLm1vbWVudHVtS2V5ZG93bkZhY3RvcjtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaHN0YXJ0KCBldmVudCApIHtcblxuICAgICAgICBtb21lbnR1bU9uID0gZmFsc2U7XG5cbiAgICAgICAgbW9tZW50dW1MZWZ0ID0gbW9tZW50dW1VcCA9IDA7XG5cbiAgICAgICAgaWYgKCBzY29wZS5lbmFibGVkID09PSBmYWxzZSApIHJldHVybjtcblxuICAgICAgICBzd2l0Y2ggKCBldmVudC50b3VjaGVzLmxlbmd0aCApIHtcblxuICAgICAgICBjYXNlIDE6XHQvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLm5vUm90YXRlID09PSB0cnVlICkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblxuICAgICAgICAgICAgcm90YXRlU3RhcnQuc2V0KCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOlx0Ly8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG4gICAgICAgICAgICBpZiAoIHNjb3BlLm5vWm9vbSA9PT0gdHJ1ZSApIHJldHVybjtcblxuICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ET0xMWTtcblxuICAgICAgICAgICAgY29uc3QgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XG4gICAgICAgICAgICBjb25zdCBkeSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KCBkeCAqIGR4ICsgZHkgKiBkeSApO1xuXG4gICAgICAgICAgICBkb2xseVN0YXJ0LnNldCggMCwgZGlzdGFuY2UgKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICAgIGlmICggc2NvcGUubm9QYW4gPT09IHRydWUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUEFOO1xuXG4gICAgICAgICAgICBwYW5TdGFydC5zZXQoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggc3RhdGUgIT09IFNUQVRFLk5PTkUgKSBzY29wZS5kaXNwYXRjaEV2ZW50KCBzdGFydEV2ZW50ICk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaG1vdmUoIGV2ZW50ICkge1xuXG4gICAgICAgIGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHNjb3BlLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gc2NvcGUuZG9tRWxlbWVudC5ib2R5IDogc2NvcGUuZG9tRWxlbWVudDtcblxuICAgICAgICBzd2l0Y2ggKCBldmVudC50b3VjaGVzLmxlbmd0aCApIHtcblxuICAgICAgICBjYXNlIDE6IC8vIG9uZS1maW5nZXJlZCB0b3VjaDogcm90YXRlXG5cbiAgICAgICAgICAgIGlmICggc2NvcGUubm9Sb3RhdGUgPT09IHRydWUgKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIHN0YXRlICE9PSBTVEFURS5UT1VDSF9ST1RBVEUgKSByZXR1cm47XG5cbiAgICAgICAgICAgIHJvdGF0ZUVuZC5zZXQoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICk7XG4gICAgICAgICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKCByb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0ICk7XG5cbiAgICAgICAgICAgIC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcbiAgICAgICAgICAgIHNjb3BlLnJvdGF0ZUxlZnQoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiBzY29wZS5yb3RhdGVTcGVlZCApO1xuICAgICAgICAgICAgLy8gcm90YXRpbmcgdXAgYW5kIGRvd24gYWxvbmcgd2hvbGUgc2NyZWVuIGF0dGVtcHRzIHRvIGdvIDM2MCwgYnV0IGxpbWl0ZWQgdG8gMTgwXG4gICAgICAgICAgICBzY29wZS5yb3RhdGVVcCggMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiBzY29wZS5yb3RhdGVTcGVlZCApO1xuXG4gICAgICAgICAgICByb3RhdGVTdGFydC5jb3B5KCByb3RhdGVFbmQgKTtcblxuICAgICAgICAgICAgaWYoIGV2ZW50UHJldmlvdXMgKXtcbiAgICAgICAgICAgICAgICBtb21lbnR1bUxlZnQgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudFByZXZpb3VzLnBhZ2VYO1xuICAgICAgICAgICAgICAgIG1vbWVudHVtVXAgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudFByZXZpb3VzLnBhZ2VZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudFByZXZpb3VzID0ge1xuICAgICAgICAgICAgICAgIHBhZ2VYOiBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgcGFnZVk6IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLnVwZGF0ZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOiAvLyB0d28tZmluZ2VyZWQgdG91Y2g6IGRvbGx5XG5cbiAgICAgICAgICAgIGlmICggc2NvcGUubm9ab29tID09PSB0cnVlICkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCBzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfRE9MTFkgKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuICAgICAgICAgICAgY29uc3QgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcblxuICAgICAgICAgICAgZG9sbHlFbmQuc2V0KCAwLCBkaXN0YW5jZSApO1xuICAgICAgICAgICAgZG9sbHlEZWx0YS5zdWJWZWN0b3JzKCBkb2xseUVuZCwgZG9sbHlTdGFydCApO1xuXG4gICAgICAgICAgICBpZiAoIGRvbGx5RGVsdGEueSA8IDAgKSB7XG5cbiAgICAgICAgICAgICAgICBzY29wZS5vYmplY3QuZm92ID0gKCBzY29wZS5vYmplY3QuZm92IDwgc2NvcGUubWF4Rm92ICkgXG4gICAgICAgICAgICAgICAgICAgID8gc2NvcGUub2JqZWN0LmZvdiArIDFcbiAgICAgICAgICAgICAgICAgICAgOiBzY29wZS5tYXhGb3Y7XG4gICAgICAgICAgICAgICAgc2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggZG9sbHlEZWx0YS55ID4gMCApIHtcblxuICAgICAgICAgICAgICAgIHNjb3BlLm9iamVjdC5mb3YgPSAoIHNjb3BlLm9iamVjdC5mb3YgPiBzY29wZS5taW5Gb3YgKSBcbiAgICAgICAgICAgICAgICAgICAgPyBzY29wZS5vYmplY3QuZm92IC0gMVxuICAgICAgICAgICAgICAgICAgICA6IHNjb3BlLm1pbkZvdjtcbiAgICAgICAgICAgICAgICBzY29wZS5vYmplY3QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvbGx5U3RhcnQuY29weSggZG9sbHlFbmQgKTtcblxuICAgICAgICAgICAgc2NvcGUudXBkYXRlKCk7XG4gICAgICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cbiAgICAgICAgICAgIGlmICggc2NvcGUubm9QYW4gPT09IHRydWUgKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIHN0YXRlICE9PSBTVEFURS5UT1VDSF9QQU4gKSByZXR1cm47XG5cbiAgICAgICAgICAgIHBhbkVuZC5zZXQoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICk7XG4gICAgICAgICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKCBwYW5FbmQsIHBhblN0YXJ0ICk7XG5cbiAgICAgICAgICAgIHNjb3BlLnBhbiggcGFuRGVsdGEueCwgcGFuRGVsdGEueSApO1xuXG4gICAgICAgICAgICBwYW5TdGFydC5jb3B5KCBwYW5FbmQgKTtcblxuICAgICAgICAgICAgc2NvcGUudXBkYXRlKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2hlbmQoIC8qIGV2ZW50ICovICkge1xuXG4gICAgICAgIG1vbWVudHVtT24gPSB0cnVlO1xuXG4gICAgICAgIGV2ZW50UHJldmlvdXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCBzY29wZS5lbmFibGVkID09PSBmYWxzZSApIHJldHVybjtcblxuICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KCBlbmRFdmVudCApO1xuICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cbiAgICB9XG5cbiAgICB0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIG9uTW91c2VEb3duICk7XG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V3aGVlbCcsIG9uTW91c2VXaGVlbCApO1xuICAgICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ0RPTU1vdXNlU2Nyb2xsJywgb25Nb3VzZVdoZWVsICk7XG5cbiAgICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgdG91Y2hzdGFydCApO1xuICAgICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgdG91Y2hlbmQgKTtcbiAgICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCB0b3VjaG1vdmUgKTtcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgb25LZXlVcCApO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBvbktleURvd24gKTtcblxuICAgIH07XG5cbiAgICAvLyB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKCBldmVudCApIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfSwgZmFsc2UgKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNld2hlZWwnLCBvbk1vdXNlV2hlZWwsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnRE9NTW91c2VTY3JvbGwnLCBvbk1vdXNlV2hlZWwsIHsgcGFzc2l2ZTogZmFsc2UgfSApOyAvLyBmaXJlZm94XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0LCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgdG91Y2hlbmQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgdG91Y2htb3ZlLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBvbktleVVwLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBvbktleURvd24sIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXG4gICAgLy8gZm9yY2UgYW4gdXBkYXRlIGF0IHN0YXJ0XG4gICAgdGhpcy51cGRhdGUoKTtcblxufTtcblxuT3JiaXRDb250cm9scy5wcm90b3R5cGUgPSBPYmplY3QuYXNzaWduKCBPYmplY3QuY3JlYXRlKCBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlICksIHtcblxuICAgIGNvbnN0cnVjdG9yOiBPcmJpdENvbnRyb2xzXG5cbn0gKTtcblxuZXhwb3J0IHsgT3JiaXRDb250cm9scyB9OyIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIERldmljZSBPcmllbnRhdGlvbiBDb250cm9sXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlcm5hbCBEZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzXG4gKiBAcGFyYW0ge1RIUkVFLkNhbWVyYX0gY2FtZXJhIFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tRWxlbWVudCBcbiAqL1xuZnVuY3Rpb24gRGV2aWNlT3JpZW50YXRpb25Db250cm9scyAoIGNhbWVyYSwgZG9tRWxlbWVudCApIHtcblxuICAgIGNvbnN0IHNjb3BlID0gdGhpcztcbiAgICBjb25zdCBjaGFuZ2VFdmVudCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcblxuICAgIGxldCByb3RYID0gMDtcbiAgICBsZXQgdGVtcFggPSAwO1xuICAgIGxldCB0ZW1wWSA9IDA7XG5cbiAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICB0aGlzLmNhbWVyYS5yb3RhdGlvbi5yZW9yZGVyKCAnWVhaJyApO1xuICAgIHRoaXMuZG9tRWxlbWVudCA9ICggZG9tRWxlbWVudCAhPT0gdW5kZWZpbmVkICkgPyBkb21FbGVtZW50IDogZG9jdW1lbnQ7XG5cbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5kZXZpY2VPcmllbnRhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5zY3JlZW5PcmllbnRhdGlvbiA9IDA7XG5cbiAgICB0aGlzLmFscGhhID0gMDtcbiAgICB0aGlzLmFscGhhT2Zmc2V0QW5nbGUgPSAwO1xuXG4gICAgY29uc3Qgb25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG4gICAgICAgIHNjb3BlLmRldmljZU9yaWVudGF0aW9uID0gZXZlbnQ7XG5cbiAgICB9O1xuXG4gICAgY29uc3Qgb25TY3JlZW5PcmllbnRhdGlvbkNoYW5nZUV2ZW50ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPSB3aW5kb3cub3JpZW50YXRpb24gfHwgMDtcblxuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRlbXBYID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYO1xuICAgICAgICB0ZW1wWSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWTtcblxuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoTW92ZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgcm90WCArPSBUSFJFRS5NYXRoLmRlZ1RvUmFkKCAoIHRlbXBZIC0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICkgLyA0ICk7XG4gICAgICAgIHNjb3BlLnJvdGF0ZUxlZnQoIC1USFJFRS5NYXRoLmRlZ1RvUmFkKCAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIHRlbXBYICkgLyA0ICkgKTtcblxuICAgICAgICB0ZW1wWCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWDtcbiAgICAgICAgdGVtcFkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVk7XG5cbiAgICB9O1xuXG4gICAgLy8gVGhlIGFuZ2xlcyBhbHBoYSwgYmV0YSBhbmQgZ2FtbWEgZm9ybSBhIHNldCBvZiBpbnRyaW5zaWMgVGFpdC1CcnlhbiBhbmdsZXMgb2YgdHlwZSBaLVgnLVknJ1xuXG4gICAgY29uc3Qgc2V0Q2FtZXJhUXVhdGVybmlvbiA9IGZ1bmN0aW9uKCBxdWF0ZXJuaW9uLCBhbHBoYSwgYmV0YSwgZ2FtbWEsIG9yaWVudCApIHtcblxuICAgICAgICBjb25zdCB6ZWUgPSBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMCwgMSApO1xuXG4gICAgICAgIGNvbnN0IGV1bGVyID0gbmV3IFRIUkVFLkV1bGVyKCk7XG5cbiAgICAgICAgY29uc3QgcTAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gICAgICAgIGNvbnN0IHExID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oIC0gTWF0aC5zcXJ0KCAwLjUgKSwgMCwgMCwgTWF0aC5zcXJ0KCAwLjUgKSApOyAvLyAtIFBJLzIgYXJvdW5kIHRoZSB4LWF4aXNcblxuICAgICAgICBsZXQgdmVjdG9yRmluZ2VyWTtcbiAgICAgICAgY29uc3QgZmluZ2VyUVkgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgICAgICBjb25zdCBmaW5nZXJRWCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgICAgICAgaWYgKCBzY29wZS5zY3JlZW5PcmllbnRhdGlvbiA9PSAwICkge1xuXG4gICAgICAgICAgICB2ZWN0b3JGaW5nZXJZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDEsIDAsIDAgKTtcbiAgICAgICAgICAgIGZpbmdlclFZLnNldEZyb21BeGlzQW5nbGUoIHZlY3RvckZpbmdlclksIC1yb3RYICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPT0gMTgwICkge1xuXG4gICAgICAgICAgICB2ZWN0b3JGaW5nZXJZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDEsIDAsIDAgKTtcbiAgICAgICAgICAgIGZpbmdlclFZLnNldEZyb21BeGlzQW5nbGUoIHZlY3RvckZpbmdlclksIHJvdFggKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCBzY29wZS5zY3JlZW5PcmllbnRhdGlvbiA9PSA5MCApIHtcblxuICAgICAgICAgICAgdmVjdG9yRmluZ2VyWSA9IG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAxLCAwICk7XG4gICAgICAgICAgICBmaW5nZXJRWS5zZXRGcm9tQXhpc0FuZ2xlKCB2ZWN0b3JGaW5nZXJZLCByb3RYICk7XG5cbiAgICAgICAgfSBlbHNlIGlmICggc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPT0gLSA5MCkge1xuXG4gICAgICAgICAgICB2ZWN0b3JGaW5nZXJZID0gbmV3IFRIUkVFLlZlY3RvcjMoIDAsIDEsIDAgKTtcbiAgICAgICAgICAgIGZpbmdlclFZLnNldEZyb21BeGlzQW5nbGUoIHZlY3RvckZpbmdlclksIC1yb3RYICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHExLm11bHRpcGx5KCBmaW5nZXJRWSApO1xuICAgICAgICBxMS5tdWx0aXBseSggZmluZ2VyUVggKTtcblxuICAgICAgICBldWxlci5zZXQoIGJldGEsIGFscGhhLCAtIGdhbW1hLCAnWVhaJyApOyAvLyAnWlhZJyBmb3IgdGhlIGRldmljZSwgYnV0ICdZWFonIGZvciB1c1xuXG4gICAgICAgIHF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKCBldWxlciApOyAvLyBvcmllbnQgdGhlIGRldmljZVxuXG4gICAgICAgIHF1YXRlcm5pb24ubXVsdGlwbHkoIHExICk7IC8vIGNhbWVyYSBsb29rcyBvdXQgdGhlIGJhY2sgb2YgdGhlIGRldmljZSwgbm90IHRoZSB0b3BcblxuICAgICAgICBxdWF0ZXJuaW9uLm11bHRpcGx5KCBxMC5zZXRGcm9tQXhpc0FuZ2xlKCB6ZWUsIC0gb3JpZW50ICkgKTsgLy8gYWRqdXN0IGZvciBzY3JlZW4gb3JpZW50YXRpb25cblxuICAgIH07XG5cbiAgICB0aGlzLmNvbm5lY3QgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICBvblNjcmVlbk9yaWVudGF0aW9uQ2hhbmdlRXZlbnQoKTsgLy8gcnVuIG9uY2Ugb24gbG9hZFxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvblNjcmVlbk9yaWVudGF0aW9uQ2hhbmdlRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnZGV2aWNlb3JpZW50YXRpb24nLCBvbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlRXZlbnQsIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLnVwZGF0ZS5iaW5kKCB0aGlzICksIHsgcGFzc2l2ZTogdHJ1ZSB9ICk7XG5cbiAgICAgICAgc2NvcGUuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydEV2ZW50LCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcbiAgICAgICAgc2NvcGUuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmVFdmVudCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cbiAgICAgICAgc2NvcGUuZW5hYmxlZCA9IHRydWU7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5kaXNjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIG9uU2NyZWVuT3JpZW50YXRpb25DaGFuZ2VFdmVudCwgZmFsc2UgKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdkZXZpY2VvcmllbnRhdGlvbicsIG9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2VFdmVudCwgZmFsc2UgKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdkZXZpY2VvcmllbnRhdGlvbicsIHRoaXMudXBkYXRlLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblxuICAgICAgICBzY29wZS5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0RXZlbnQsIGZhbHNlICk7XG4gICAgICAgIHNjb3BlLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlRXZlbnQsIGZhbHNlICk7XG5cbiAgICAgICAgc2NvcGUuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oIGlnbm9yZVVwZGF0ZSApIHtcblxuICAgICAgICBpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8ICFzY29wZS5kZXZpY2VPcmllbnRhdGlvbiApIHJldHVybjtcblxuICAgICAgICBjb25zdCBhbHBoYSA9IHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmFscGhhID8gVEhSRUUuTWF0aC5kZWdUb1JhZCggc2NvcGUuZGV2aWNlT3JpZW50YXRpb24uYWxwaGEgKSArIHNjb3BlLmFscGhhT2Zmc2V0QW5nbGUgOiAwOyAvLyBaXG4gICAgICAgIGNvbnN0IGJldGEgPSBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5iZXRhID8gVEhSRUUuTWF0aC5kZWdUb1JhZCggc2NvcGUuZGV2aWNlT3JpZW50YXRpb24uYmV0YSApIDogMDsgLy8gWCdcbiAgICAgICAgY29uc3QgZ2FtbWEgPSBzY29wZS5kZXZpY2VPcmllbnRhdGlvbi5nYW1tYSA/IFRIUkVFLk1hdGguZGVnVG9SYWQoIHNjb3BlLmRldmljZU9yaWVudGF0aW9uLmdhbW1hICkgOiAwOyAvLyBZJydcbiAgICAgICAgY29uc3Qgb3JpZW50ID0gc2NvcGUuc2NyZWVuT3JpZW50YXRpb24gPyBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBzY29wZS5zY3JlZW5PcmllbnRhdGlvbiApIDogMDsgLy8gT1xuXG4gICAgICAgIHNldENhbWVyYVF1YXRlcm5pb24oIHNjb3BlLmNhbWVyYS5xdWF0ZXJuaW9uLCBhbHBoYSwgYmV0YSwgZ2FtbWEsIG9yaWVudCApO1xuICAgICAgICBzY29wZS5hbHBoYSA9IGFscGhhO1xuXG4gICAgICAgIGlmICggaWdub3JlVXBkYXRlICE9PSB0cnVlICkgeyBzY29wZS5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApOyB9XG5cbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVBbHBoYU9mZnNldEFuZ2xlID0gZnVuY3Rpb24oIGFuZ2xlICkge1xuXG4gICAgICAgIHRoaXMuYWxwaGFPZmZzZXRBbmdsZSA9IGFuZ2xlO1xuXG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlUm90WCA9IGZ1bmN0aW9uKCBhbmdsZSApIHtcblxuICAgICAgICByb3RYID0gYW5nbGU7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5yb3RhdGVMZWZ0ID0gZnVuY3Rpb24oIGFuZ2xlICkge1xuXG4gICAgICAgIHRoaXMudXBkYXRlQWxwaGFPZmZzZXRBbmdsZSggdGhpcy5hbHBoYU9mZnNldEFuZ2xlIC0gYW5nbGUgKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yb3RhdGVVcCA9IGZ1bmN0aW9uKCBhbmdsZSApIHtcblxuICAgICAgICB0aGlzLnVwZGF0ZVJvdFgoIHJvdFggKyBhbmdsZSApO1xuXG4gICAgfTtcblxuICAgIHRoaXMuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuXG4gICAgfTtcblxuICAgIHRoaXMuY29ubmVjdCgpO1xuXG59O1xuXG5EZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzLnByb3RvdHlwZSA9IE9iamVjdC5hc3NpZ24oIE9iamVjdC5jcmVhdGUoIFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUpLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogRGV2aWNlT3JpZW50YXRpb25Db250cm9sc1xuXG59ICk7XG5cbmV4cG9ydCB7IERldmljZU9yaWVudGF0aW9uQ29udHJvbHMgfTsiLCJcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFN0ZXJlb0ltYWdlUGFub3JhbWEgfSBmcm9tICcuLi8uLi9wYW5vcmFtYS9TdGVyZW9JbWFnZVBhbm9yYW1hJztcbmltcG9ydCB7IFN0ZXJlb1ZpZGVvUGFub3JhbWEgfSBmcm9tICcuLi8uLi9wYW5vcmFtYS9TdGVyZW9WaWRlb1Bhbm9yYW1hJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIEdvb2dsZSBDYXJkYm9hcmQgRWZmZWN0IENvbXBvc2VyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlcm5hbCBDYXJkYm9hcmRFZmZlY3RcbiAqIEBwYXJhbSB7VEhSRUUuV2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgXG4gKi9cbmZ1bmN0aW9uIENhcmRib2FyZEVmZmVjdCAoIHJlbmRlcmVyICkge1xuXG4gICAgY29uc3QgX2NhbWVyYSA9IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoIC0gMSwgMSwgMSwgLSAxLCAwLCAxICk7XG5cbiAgICBjb25zdCBfc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgIGNvbnN0IF9zdGVyZW8gPSBuZXcgVEhSRUUuU3RlcmVvQ2FtZXJhKCk7XG4gICAgX3N0ZXJlby5hc3BlY3QgPSAwLjU7XG5cbiAgICBjb25zdCBfcGFyYW1zID0geyBtaW5GaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlciwgbWFnRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyLCBmb3JtYXQ6IFRIUkVFLlJHQkFGb3JtYXQgfTtcblxuICAgIGNvbnN0IF9yZW5kZXJUYXJnZXQgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQoIDUxMiwgNTEyLCBfcGFyYW1zICk7XG4gICAgX3JlbmRlclRhcmdldC5zY2lzc29yVGVzdCA9IHRydWU7XG4gICAgX3JlbmRlclRhcmdldC50ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgKiBEaXN0b3J0aW9uIE1lc2ggcG9ydGVkIGZyb206XG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL2JvcmlzbXVzL3dlYnZyLWJvaWxlcnBsYXRlL2Jsb2IvbWFzdGVyL3NyYy9kaXN0b3J0aW9uL2JhcnJlbC1kaXN0b3J0aW9uLWZyYWdtZW50LmpzXG4gICAgICovXG5cbiAgICBjb25zdCBkaXN0b3J0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjIoIDAuNDQxLCAwLjE1NiApO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMSwgMSwgMTAsIDIwICkuZGVsZXRlQXR0cmlidXRlKCAnbm9ybWFsJyApLnRvTm9uSW5kZXhlZCgpO1xuXG4gICAgY29uc3QgcG9zaXRpb25zID0gZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTtcbiAgICBjb25zdCB1dnMgPSBnZW9tZXRyeS5hdHRyaWJ1dGVzLnV2LmFycmF5O1xuXG4gICAgLy8gZHVwbGljYXRlXG4gICAgZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudCAqPSAyO1xuICAgIGdlb21ldHJ5LmF0dHJpYnV0ZXMudXYuY291bnQgKj0gMjtcblxuICAgIGNvbnN0IHBvc2l0aW9uczIgPSBuZXcgRmxvYXQzMkFycmF5KCBwb3NpdGlvbnMubGVuZ3RoICogMiApO1xuICAgIHBvc2l0aW9uczIuc2V0KCBwb3NpdGlvbnMgKTtcbiAgICBwb3NpdGlvbnMyLnNldCggcG9zaXRpb25zLCBwb3NpdGlvbnMubGVuZ3RoICk7XG5cbiAgICBjb25zdCB1dnMyID0gbmV3IEZsb2F0MzJBcnJheSggdXZzLmxlbmd0aCAqIDIgKTtcbiAgICB1dnMyLnNldCggdXZzICk7XG4gICAgdXZzMi5zZXQoIHV2cywgdXZzLmxlbmd0aCApO1xuXG4gICAgY29uc3QgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICBjb25zdCBsZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoIC8gMztcblxuICAgIGZvciAoIGxldCBpID0gMCwgbCA9IHBvc2l0aW9uczIubGVuZ3RoIC8gMzsgaSA8IGw7IGkgKysgKSB7XG5cbiAgICAgICAgdmVjdG9yLnggPSBwb3NpdGlvbnMyWyBpICogMyArIDAgXTtcbiAgICAgICAgdmVjdG9yLnkgPSBwb3NpdGlvbnMyWyBpICogMyArIDEgXTtcblxuICAgICAgICBjb25zdCBkb3QgPSB2ZWN0b3IuZG90KCB2ZWN0b3IgKTtcbiAgICAgICAgY29uc3Qgc2NhbGFyID0gMS41ICsgKCBkaXN0b3J0aW9uLnggKyBkaXN0b3J0aW9uLnkgKiBkb3QgKSAqIGRvdDtcblxuICAgICAgICBjb25zdCBvZmZzZXQgPSBpIDwgbGVuZ3RoID8gMCA6IDE7XG5cbiAgICAgICAgcG9zaXRpb25zMlsgaSAqIDMgKyAwIF0gPSAoIHZlY3Rvci54IC8gc2NhbGFyICkgKiAxLjUgLSAwLjUgKyBvZmZzZXQ7XG4gICAgICAgIHBvc2l0aW9uczJbIGkgKiAzICsgMSBdID0gKCB2ZWN0b3IueSAvIHNjYWxhciApICogMy4wO1xuXG4gICAgICAgIHV2czJbIGkgKiAyIF0gPSAoIHV2czJbIGkgKiAyIF0gKyBvZmZzZXQgKSAqIDAuNTtcblxuICAgIH1cblxuICAgIGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXkgPSBwb3NpdGlvbnMyO1xuICAgIGdlb21ldHJ5LmF0dHJpYnV0ZXMudXYuYXJyYXkgPSB1dnMyO1xuXG4gICAgLy9cblxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IG1hcDogX3JlbmRlclRhcmdldC50ZXh0dXJlIH0gKTtcbiAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuICAgIF9zY2VuZS5hZGQoIG1lc2ggKTtcblxuICAgIC8vXG5cbiAgICB0aGlzLnNldEV5ZVNlcGFyYXRpb24gPSBmdW5jdGlvbiAoIGV5ZVNlcCApIHtcblxuICAgICAgICBfc3RlcmVvLmV5ZVNlcCA9IGV5ZVNlcDtcblxuICAgIH07XG5cbiAgICB0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSggd2lkdGgsIGhlaWdodCApO1xuXG4gICAgICAgIGNvbnN0IHBpeGVsUmF0aW8gPSByZW5kZXJlci5nZXRQaXhlbFJhdGlvKCk7XG5cbiAgICAgICAgX3JlbmRlclRhcmdldC5zZXRTaXplKCB3aWR0aCAqIHBpeGVsUmF0aW8sIGhlaWdodCAqIHBpeGVsUmF0aW8gKTtcblxuICAgIH07XG5cbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSwgcGFub3JhbWEgKSB7XG5cbiAgICAgICAgY29uc3Qgc3RlcmVvRW5hYmxlZCA9IHBhbm9yYW1hIGluc3RhbmNlb2YgU3RlcmVvSW1hZ2VQYW5vcmFtYSB8fCBwYW5vcmFtYSBpbnN0YW5jZW9mIFN0ZXJlb1ZpZGVvUGFub3JhbWE7XG5cbiAgICAgICAgc2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuICAgICAgICBpZiAoIHN0ZXJlb0VuYWJsZWQgKSB0aGlzLnNldEV5ZVNlcGFyYXRpb24oIHBhbm9yYW1hLnN0ZXJlby5leWVTZXAgKTtcblxuICAgICAgICBpZiAoIGNhbWVyYS5wYXJlbnQgPT09IG51bGwgKSBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKTtcblxuICAgICAgICBfc3RlcmVvLnVwZGF0ZSggY2FtZXJhICk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBfcmVuZGVyVGFyZ2V0LndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gX3JlbmRlclRhcmdldC5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKCByZW5kZXJlci5hdXRvQ2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXG4gICAgICAgIGlmICggc3RlcmVvRW5hYmxlZCApIHBhbm9yYW1hLnVwZGF0ZVRleHR1cmVUb0xlZnQoKTtcblxuICAgICAgICBfcmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCAwLCAwLCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgIF9yZW5kZXJUYXJnZXQudmlld3BvcnQuc2V0KCAwLCAwLCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgIHJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggX3JlbmRlclRhcmdldCApO1xuICAgICAgICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBfc3RlcmVvLmNhbWVyYUwgKTtcblxuICAgICAgICByZW5kZXJlci5jbGVhckRlcHRoKCk7XG5cbiAgICAgICAgaWYgKCBzdGVyZW9FbmFibGVkICkgcGFub3JhbWEudXBkYXRlVGV4dHVyZVRvUmlnaHQoKTtcblxuICAgICAgICBfcmVuZGVyVGFyZ2V0LnNjaXNzb3Iuc2V0KCB3aWR0aCwgMCwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICBfcmVuZGVyVGFyZ2V0LnZpZXdwb3J0LnNldCggd2lkdGgsIDAsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBfcmVuZGVyVGFyZ2V0ICk7XG4gICAgICAgIHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIF9zdGVyZW8uY2FtZXJhUiApO1xuXG4gICAgICAgIHJlbmRlcmVyLmNsZWFyRGVwdGgoKTtcblxuICAgICAgICByZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIG51bGwgKTtcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKCBfc2NlbmUsIF9jYW1lcmEgKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgeyBDYXJkYm9hcmRFZmZlY3QgfTsiLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBTdGVyZW9JbWFnZVBhbm9yYW1hIH0gZnJvbSAnLi4vLi4vcGFub3JhbWEvU3RlcmVvSW1hZ2VQYW5vcmFtYSc7XG5pbXBvcnQgeyBTdGVyZW9WaWRlb1Bhbm9yYW1hIH0gZnJvbSAnLi4vLi4vcGFub3JhbWEvU3RlcmVvVmlkZW9QYW5vcmFtYSc7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBTdGVyZW8gRWZmZWN0IENvbXBvc2VyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlcm5hbCBTdGVyZW9FZmZlY3RcbiAqIEBwYXJhbSB7VEhSRUUuV2ViR0xSZW5kZXJlcn0gcmVuZGVyZXIgXG4gKi9cbmNvbnN0IFN0ZXJlb0VmZmVjdCA9IGZ1bmN0aW9uICggcmVuZGVyZXIgKSB7XG5cbiAgICBjb25zdCBfc3RlcmVvID0gbmV3IFRIUkVFLlN0ZXJlb0NhbWVyYSgpO1xuICAgIF9zdGVyZW8uYXNwZWN0ID0gMC41O1xuICAgIGNvbnN0IHNpemUgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG4gICAgdGhpcy5zZXRFeWVTZXBhcmF0aW9uID0gZnVuY3Rpb24gKCBleWVTZXAgKSB7XG5cbiAgICAgICAgX3N0ZXJlby5leWVTZXAgPSBleWVTZXA7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5zZXRTaXplID0gZnVuY3Rpb24gKCB3aWR0aCwgaGVpZ2h0ICkge1xuXG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcblxuICAgIH07XG5cbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSwgcGFub3JhbWEgKSB7XG5cbiAgICAgICAgY29uc3Qgc3RlcmVvRW5hYmxlZCA9IHBhbm9yYW1hIGluc3RhbmNlb2YgU3RlcmVvSW1hZ2VQYW5vcmFtYSB8fCBwYW5vcmFtYSBpbnN0YW5jZW9mIFN0ZXJlb1ZpZGVvUGFub3JhbWE7XG5cbiAgICAgICAgc2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuICAgICAgICBpZiAoIGNhbWVyYS5wYXJlbnQgPT09IG51bGwgKSBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICggc3RlcmVvRW5hYmxlZCApIHRoaXMuc2V0RXllU2VwYXJhdGlvbiggcGFub3JhbWEuc3RlcmVvLmV5ZVNlcCApO1xuXG4gICAgICAgIF9zdGVyZW8udXBkYXRlKCBjYW1lcmEgKTtcblxuICAgICAgICByZW5kZXJlci5nZXRTaXplKCBzaXplICk7XG5cbiAgICAgICAgaWYgKCByZW5kZXJlci5hdXRvQ2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuICAgICAgICByZW5kZXJlci5zZXRTY2lzc29yVGVzdCggdHJ1ZSApO1xuXG4gICAgICAgIGlmICggc3RlcmVvRW5hYmxlZCApIHBhbm9yYW1hLnVwZGF0ZVRleHR1cmVUb0xlZnQoKTtcblxuICAgICAgICByZW5kZXJlci5zZXRTY2lzc29yKCAwLCAwLCBzaXplLndpZHRoIC8gMiwgc2l6ZS5oZWlnaHQgKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Vmlld3BvcnQoIDAsIDAsIHNpemUud2lkdGggLyAyLCBzaXplLmhlaWdodCApO1xuICAgICAgICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBfc3RlcmVvLmNhbWVyYUwgKTtcblxuICAgICAgICBpZiAoIHN0ZXJlb0VuYWJsZWQgKSBwYW5vcmFtYS51cGRhdGVUZXh0dXJlVG9SaWdodCgpO1xuXG4gICAgICAgIHJlbmRlcmVyLnNldFNjaXNzb3IoIHNpemUud2lkdGggLyAyLCAwLCBzaXplLndpZHRoIC8gMiwgc2l6ZS5oZWlnaHQgKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Vmlld3BvcnQoIHNpemUud2lkdGggLyAyLCAwLCBzaXplLndpZHRoIC8gMiwgc2l6ZS5oZWlnaHQgKTtcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgX3N0ZXJlby5jYW1lcmFSICk7XG5cbiAgICAgICAgcmVuZGVyZXIuc2V0U2Npc3NvclRlc3QoIGZhbHNlICk7XG5cbiAgICAgICAgaWYgKCBzdGVyZW9FbmFibGVkICkgcGFub3JhbWEudXBkYXRlVGV4dHVyZVRvTGVmdCgpO1xuXG4gICAgfTtcblxufTtcblxuZXhwb3J0IHsgU3RlcmVvRWZmZWN0IH07IiwiaW1wb3J0IHsgTU9ERVMsIENPTlRST0xTIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9saWIvY29udHJvbHMvT3JiaXRDb250cm9scyc7XG5pbXBvcnQgeyBEZXZpY2VPcmllbnRhdGlvbkNvbnRyb2xzIH0gZnJvbSAnLi4vbGliL2NvbnRyb2xzL0RldmljZU9yaWVudGF0aW9uQ29udHJvbHMnO1xuaW1wb3J0IHsgQ2FyZGJvYXJkRWZmZWN0IH0gZnJvbSAnLi4vbGliL2VmZmVjdHMvQ2FyZGJvYXJkRWZmZWN0JztcbmltcG9ydCB7IFN0ZXJlb0VmZmVjdCB9IGZyb20gJy4uL2xpYi9lZmZlY3RzL1N0ZXJlb0VmZmVjdCc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuLi93aWRnZXQvV2lkZ2V0JztcbmltcG9ydCB7IFJldGljbGUgfSBmcm9tICcuLi9pbnRlcmZhY2UvUmV0aWNsZSc7XG5pbXBvcnQgeyBJbmZvc3BvdCB9IGZyb20gJy4uL2luZm9zcG90L0luZm9zcG90JztcbmltcG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4uL0RhdGFJbWFnZSc7XG5pbXBvcnQgeyBQYW5vcmFtYSB9IGZyb20gJy4uL3Bhbm9yYW1hL1Bhbm9yYW1hJztcbmltcG9ydCB7IFZpZGVvUGFub3JhbWEgfSBmcm9tICcuLi9wYW5vcmFtYS9WaWRlb1Bhbm9yYW1hJztcbmltcG9ydCB7IENhbWVyYVBhbm9yYW1hIH0gZnJvbSAnLi4vcGFub3JhbWEvQ2FtZXJhUGFub3JhbWEnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IFRXRUVOIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcblxuLyoqXG4gKiBAY2xhc3NkZXNjIFZpZXdlciBjb250YWlucyBwcmUtZGVmaW5lZCBzY2VuZSwgY2FtZXJhIGFuZCByZW5kZXJlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gVXNlIGN1c3RvbSBvciBkZWZhdWx0IGNvbmZpZyBvcHRpb25zXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbb3B0aW9ucy5jb250YWluZXJdIC0gQSBIVE1MRWxlbWVudCB0byBob3N0IHRoZSBjYW52YXNcbiAqIEBwYXJhbSB7VEhSRUUuU2NlbmV9IFtvcHRpb25zLnNjZW5lPVRIUkVFLlNjZW5lXSAtIEEgVEhSRUUuU2NlbmUgd2hpY2ggY29udGFpbnMgcGFub3JhbWEgYW5kIDNEIG9iamVjdHNcbiAqIEBwYXJhbSB7VEhSRUUuQ2FtZXJhfSBbb3B0aW9ucy5jYW1lcmE9VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmFdIC0gQSBUSFJFRS5DYW1lcmEgdG8gdmlldyB0aGUgc2NlbmVcbiAqIEBwYXJhbSB7VEhSRUUuV2ViR0xSZW5kZXJlcn0gW29wdGlvbnMucmVuZGVyZXI9VEhSRUUuV2ViR0xSZW5kZXJlcl0gLSBBIFRIUkVFLldlYkdMUmVuZGVyZXIgdG8gcmVuZGVyIGNhbnZhc1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jb250cm9sQmFyPXRydWVdIC0gU2hvdy9oaWRlIGNvbnRyb2wgYmFyIG9uIHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lclxuICogQHBhcmFtIHthcnJheX0gICBbb3B0aW9ucy5jb250cm9sQnV0dG9ucz1bXV0gLSBCdXR0b24gbmFtZXMgdG8gbW91bnQgb24gY29udHJvbEJhciBpZiBjb250cm9sQmFyIGV4aXN0cywgRGVmYXVsdHMgdG8gWydmdWxsc2NyZWVuJywgJ3NldHRpbmcnLCAndmlkZW8nXVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvSGlkZUNvbnRyb2xCYXI9ZmFsc2VdIC0gQXV0byBoaWRlIGNvbnRyb2wgYmFyIHdoZW4gY2xpY2sgb24gbm9uLWFjdGl2ZSBhcmVhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG9IaWRlSW5mb3Nwb3Q9dHJ1ZV0gLSBBdXRvIGhpZGUgaW5mb3Nwb3RzIHdoZW4gY2xpY2sgb24gbm9uLWFjdGl2ZSBhcmVhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmhvcml6b250YWxWaWV3PWZhbHNlXSAtIEFsbG93IG9ubHkgaG9yaXpvbnRhbCBjYW1lcmEgY29udHJvbFxuICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0aW9ucy5jbGlja1RvbGVyYW5jZT0xMF0gLSBEaXN0YW5jZSB0b2xlcmFuY2UgdG8gdGlnZ2VyIGNsaWNrIC8gdGFwIGV2ZW50XG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmNhbWVyYUZvdj02MF0gLSBDYW1lcmEgZmllbGQgb2YgdmlldyB2YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXZlcnNlRHJhZ2dpbmc9ZmFsc2VdIC0gUmV2ZXJzZSBkcmFnZ2luZyBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZW5hYmxlUmV0aWNsZT1mYWxzZV0gLSBFbmFibGUgcmV0aWNsZSBmb3IgbW91c2VsZXNzIGludGVyYWN0aW9uIG90aGVyIHRoYW4gVlIgbW9kZVxuICogQHBhcmFtIHtudW1iZXJ9ICBbb3B0aW9ucy5kd2VsbFRpbWU9MTUwMF0gLSBEd2VsbCB0aW1lIGZvciByZXRpY2xlIHNlbGVjdGlvbiBpbiBtc1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvUmV0aWNsZVNlbGVjdD10cnVlXSAtIEF1dG8gc2VsZWN0IGEgY2xpY2thYmxlIHRhcmdldCBhZnRlciBkd2VsbFRpbWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlld0luZGljYXRvcj1mYWxzZV0gLSBBZGRzIGFuIGFuZ2xlIHZpZXcgaW5kaWNhdG9yIGluIHVwcGVyIGxlZnQgY29ybmVyXG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmluZGljYXRvclNpemU9MzBdIC0gU2l6ZSBvZiBWaWV3IEluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9ICBbb3B0aW9ucy5vdXRwdXQ9bnVsbF0gLSBXaGV0aGVyIGFuZCB3aGVyZSB0byBvdXRwdXQgcmF5Y2FzdCBwb3NpdGlvbi4gQ291bGQgYmUgJ2NvbnNvbGUnIG9yICdvdmVybGF5J1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvUm90YXRlPWZhbHNlXSAtIEF1dG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmF1dG9Sb3RhdGVTcGVlZD0yLjBdIC0gQXV0byByb3RhdGUgc3BlZWQgYXMgaW4gZGVncmVlIHBlciBzZWNvbmQuIFBvc2l0aXZlIGlzIGNvdW50ZXItY2xvY2t3aXNlIGFuZCBuZWdhdGl2ZSBpcyBjbG9ja3dpc2UuXG4gKiBAcGFyYW0ge251bWJlcn0gIFtvcHRpb25zLmF1dG9Sb3RhdGVBY3RpdmF0aW9uRHVyYXRpb249NTAwMF0gLSBEdXJhdGlvbiBiZWZvcmUgYXV0byByb3RhdGF0aW9uIHdoZW4gbm8gdXNlciBpbnRlcmFjdGl2aXR5IGluIG1zXG4gKiBAcGFyYW0ge1RIUkVFLlZlY3RvcjN9IFtvcHRpb25zLmluaXRpYWxMb29rQXQ9bmV3IFRIUkVFLlZlY3RvcjMoIDAsIDAsIC1OdW1iZXIuTUFYX1NBRkVfSU5URUdFUiApXSAtIEluaXRpYWwgbG9va2luZyBhdCB2ZWN0b3JcbiAqL1xuZnVuY3Rpb24gVmlld2VyICggb3B0aW9ucyA9IHt9ICkge1xuXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbigge1xuXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5zZXR1cENvbnRhaW5lciggb3B0aW9ucy5jb250YWluZXIgKSxcbiAgICAgICAgY29udHJvbEJhcjogdHJ1ZSxcbiAgICAgICAgY29udHJvbEJ1dHRvbnM6IFsgJ2Z1bGxzY3JlZW4nLCAnc2V0dGluZycsICd2aWRlbycgXSxcbiAgICAgICAgYXV0b0hpZGVDb250cm9sQmFyOiBmYWxzZSxcbiAgICAgICAgYXV0b0hpZGVJbmZvc3BvdDogdHJ1ZSxcbiAgICAgICAgaG9yaXpvbnRhbFZpZXc6IGZhbHNlLFxuICAgICAgICBjbGlja1RvbGVyYW5jZTogMTAsXG4gICAgICAgIGNhbWVyYUZvdjogNjAsXG4gICAgICAgIHJldmVyc2VEcmFnZ2luZzogZmFsc2UsXG4gICAgICAgIGVuYWJsZVJldGljbGU6IGZhbHNlLFxuICAgICAgICBkd2VsbFRpbWU6IDE1MDAsXG4gICAgICAgIGF1dG9SZXRpY2xlU2VsZWN0OiB0cnVlLFxuICAgICAgICB2aWV3SW5kaWNhdG9yOiBmYWxzZSxcbiAgICAgICAgaW5kaWNhdG9yU2l6ZTogMzAsXG4gICAgICAgIG91dHB1dDogbnVsbCxcbiAgICAgICAgYXV0b1JvdGF0ZTogZmFsc2UsXG4gICAgICAgIGF1dG9Sb3RhdGVTcGVlZDogMi4wLFxuICAgICAgICBhdXRvUm90YXRlQWN0aXZhdGlvbkR1cmF0aW9uOiA1MDAwLFxuICAgICAgICBpbml0aWFsTG9va0F0OiBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMCwgLU51bWJlci5NQVhfU0FGRV9JTlRFR0VSIClcblxuICAgIH0sIG9wdGlvbnMgKTtcblxuICAgIGNvbnN0IHsgY29udGFpbmVyLCBjYW1lcmFGb3YsIGNvbnRyb2xCYXIsIGNvbnRyb2xCdXR0b25zLCB2aWV3SW5kaWNhdG9yLCBpbmRpY2F0b3JTaXplLCBlbmFibGVSZXRpY2xlLCByZXZlcnNlRHJhZ2dpbmcsIG91dHB1dCwgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIgfSA9IHRoaXMub3B0aW9ucztcbiAgICBjb25zdCB7IGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgfSA9IGNvbnRhaW5lcjtcblxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuc2NlbmUgPSB0aGlzLnNldHVwU2NlbmUoIHNjZW5lICk7XG4gICAgdGhpcy5zY2VuZVJldGljbGUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuc2V0dXBDYW1lcmEoIGNhbWVyYUZvdiwgY2xpZW50V2lkdGggLyBjbGllbnRIZWlnaHQsIGNhbWVyYSApO1xuICAgIHRoaXMucmVuZGVyZXIgPSB0aGlzLnNldHVwUmVuZGVyZXIoIHJlbmRlcmVyLCBjb250YWluZXIgKTtcbiAgICB0aGlzLnJldGljbGUgPSB0aGlzLmFkZFJldGljbGUoIHRoaXMuY2FtZXJhLCB0aGlzLnNjZW5lUmV0aWNsZSApO1xuICAgIHRoaXMuY29udHJvbCA9IHRoaXMuc2V0dXBDb250cm9scyggdGhpcy5jYW1lcmEsIGNvbnRhaW5lciApO1xuICAgIHRoaXMuZWZmZWN0ID0gdGhpcy5zZXR1cEVmZmVjdHMoIHRoaXMucmVuZGVyZXIsIGNvbnRhaW5lciApO1xuXG4gICAgdGhpcy5tb2RlID0gTU9ERVMuTk9STUFMO1xuICAgIHRoaXMucGFub3JhbWEgPSBudWxsO1xuICAgIHRoaXMud2lkZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmhvdmVyT2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLmluZm9zcG90ID0gbnVsbDtcbiAgICB0aGlzLnByZXNzRW50aXR5T2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLnByZXNzT2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKTtcbiAgICB0aGlzLnJheWNhc3RlclBvaW50ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICB0aGlzLnVzZXJNb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgdGhpcy51cGRhdGVDYWxsYmFja3MgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25JZCA9IG51bGw7XG4gICAgdGhpcy5jYW1lcmFGcnVzdHVtID0gbmV3IFRIUkVFLkZydXN0dW0oKTtcbiAgICB0aGlzLmNhbWVyYVZpZXdQcm9qZWN0aW9uTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICB0aGlzLmF1dG9Sb3RhdGVSZXF1ZXN0SWQgPSBudWxsO1xuICAgIHRoaXMub3V0cHV0RGl2RWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy50b3VjaFN1cHBvcnRlZCA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2g7XG4gICAgdGhpcy50d2VlbkxlZnRBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oKTtcbiAgICB0aGlzLnR3ZWVuVXBBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oKTtcbiAgICB0aGlzLm91dHB1dEVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnZpZXdJbmRpY2F0b3JTaXplID0gaW5kaWNhdG9yU2l6ZTtcbiAgICB0aGlzLnRlbXBFbmFibGVSZXRpY2xlID0gZW5hYmxlUmV0aWNsZTtcblxuICAgIHRoaXMuaGFuZGxlck1vdXNlVXAgPSB0aGlzLm9uTW91c2VVcC5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5oYW5kbGVyTW91c2VEb3duID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5oYW5kbGVyTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5oYW5kbGVyV2luZG93UmVzaXplID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5oYW5kbGVyS2V5RG93biA9IHRoaXMub25LZXlEb3duLmJpbmQoIHRoaXMgKTtcbiAgICB0aGlzLmhhbmRsZXJLZXlVcCA9IHRoaXMub25LZXlVcC5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5oYW5kbGVyVGFwID0gdGhpcy5vblRhcC5iaW5kKCB0aGlzLCB7IGNsaWVudFg6IGNsaWVudFdpZHRoIC8gMiwgY2xpZW50WTogY2xpZW50SGVpZ2h0IC8gMiB9ICk7XG5cbiAgICBpZiAoIGNvbnRyb2xCYXIgKSB0aGlzLmFkZERlZmF1bHRDb250cm9sQmFyKCBjb250cm9sQnV0dG9ucyApO1xuICAgIGlmICggdmlld0luZGljYXRvciApIHRoaXMuYWRkVmlld0luZGljYXRvcigpO1xuICAgIGlmICggcmV2ZXJzZURyYWdnaW5nICkgdGhpcy5yZXZlcnNlRHJhZ2dpbmdEaXJlY3Rpb24oKTtcbiAgICBpZiAoIGVuYWJsZVJldGljbGUgKSB0aGlzLmVuYWJsZVJldGljbGVDb250cm9sKCk7IGVsc2UgdGhpcy5yZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHMoKTsgXG4gICAgaWYgKCBvdXRwdXQgPT09ICdvdmVybGF5JyApIHRoaXMuYWRkT3V0cHV0RWxlbWVudCgpO1xuXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB0aGlzLmFuaW1hdGUuY2FsbCggdGhpcyApO1xuXG59O1xuXG5WaWV3ZXIucHJvdG90eXBlID0gT2JqZWN0LmFzc2lnbiggT2JqZWN0LmNyZWF0ZSggVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSApLCB7XG5cbiAgICBjb25zdHJ1Y3RvcjogVmlld2VyLFxuXG4gICAgc2V0dXBTY2VuZTogZnVuY3Rpb24gKCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpICkge1xuXG4gICAgICAgIHJldHVybiBzY2VuZTtcblxuICAgIH0sXG5cbiAgICBzZXR1cENhbWVyYTogZnVuY3Rpb24gKCBjYW1lcmFGb3YsIHJhdGlvLCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIGNhbWVyYUZvdiwgcmF0aW8sIDEsIDEwMDAwICkgKSB7XG5cbiAgICAgICAgcmV0dXJuIGNhbWVyYTtcblxuICAgIH0sXG5cbiAgICBzZXR1cFJlbmRlcmVyOiBmdW5jdGlvbiAoIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoIHsgYWxwaGE6IHRydWUsIGFudGlhbGlhczogZmFsc2UgfSApLCBjb250YWluZXIgKSB7XG5cbiAgICAgICAgY29uc3QgeyBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0IH0gPSBjb250YWluZXI7XG5cbiAgICAgICAgcmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggd2luZG93LmRldmljZVBpeGVsUmF0aW8gKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSggY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCApO1xuICAgICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCwgMCApO1xuICAgICAgICByZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKCAncGFub2xlbnMtY2FudmFzJyApO1xuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoIHJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcblxuICAgICAgICByZXR1cm4gcmVuZGVyZXI7XG5cbiAgICB9LFxuXG4gICAgc2V0dXBDb250cm9sczogZnVuY3Rpb24gKCBjYW1lcmEsIGNvbnRhaW5lciApIHtcblxuICAgICAgICBjb25zdCB7IGF1dG9Sb3RhdGUsIGF1dG9Sb3RhdGVTcGVlZCwgaG9yaXpvbnRhbFZpZXcgfSA9IHRoaXMub3B0aW9ucztcblxuICAgICAgICBjb25zdCBvcmJpdCA9IG5ldyBPcmJpdENvbnRyb2xzKCBjYW1lcmEsIGNvbnRhaW5lciApO1xuICAgICAgICBvcmJpdC5pZCA9ICdvcmJpdCc7XG4gICAgICAgIG9yYml0LmluZGV4ID0gQ09OVFJPTFMuT1JCSVQ7XG4gICAgICAgIG9yYml0Lm1pbkRpc3RhbmNlID0gMTtcbiAgICAgICAgb3JiaXQubm9QYW4gPSB0cnVlO1xuICAgICAgICBvcmJpdC5hdXRvUm90YXRlID0gYXV0b1JvdGF0ZTtcbiAgICAgICAgb3JiaXQuYXV0b1JvdGF0ZVNwZWVkID0gYXV0b1JvdGF0ZVNwZWVkO1xuXG4gICAgICAgIGlmICggaG9yaXpvbnRhbFZpZXcgKSB7XG5cbiAgICAgICAgICAgIG9yYml0Lm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgICAgIG9yYml0Lm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gMjtcblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3JpZW50ID0gbmV3IERldmljZU9yaWVudGF0aW9uQ29udHJvbHMoIGNhbWVyYSwgY29udGFpbmVyICk7XG4gICAgICAgIG9yaWVudC5pZCA9ICdkZXZpY2Utb3JpZW50YXRpb24nO1xuICAgICAgICBvcmllbnQuaW5kZXggPSBDT05UUk9MUy5ERVZJQ0VPUklFTlRBVElPTjtcbiAgICAgICAgb3JpZW50LmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gWyBvcmJpdCwgb3JpZW50IF07XG4gICAgICAgIHRoaXMuT3JiaXRDb250cm9scyA9IG9yYml0O1xuICAgICAgICB0aGlzLkRldmljZU9yaWVudGF0aW9uQ29udHJvbHMgPSBvcmllbnQ7XG5cbiAgICAgICAgcmV0dXJuIG9yYml0O1xuIFxuICAgIH0sXG5cbiAgICBzZXR1cEVmZmVjdHM6IGZ1bmN0aW9uICggcmVuZGVyZXIsIHsgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCB9ICkge1xuXG4gICAgICAgIGNvbnN0IGNhcmRib2FyZCA9IG5ldyBDYXJkYm9hcmRFZmZlY3QoIHJlbmRlcmVyICk7XG4gICAgICAgIGNhcmRib2FyZC5zZXRTaXplKCBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0ICk7XG5cbiAgICAgICAgY29uc3Qgc3RlcmVvID0gbmV3IFN0ZXJlb0VmZmVjdCggcmVuZGVyZXIgKTtcbiAgICAgICAgc3RlcmVvLnNldFNpemUoIGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgKTtcblxuICAgICAgICB0aGlzLkNhcmRib2FyZEVmZmVjdCA9IGNhcmRib2FyZDtcbiAgICAgICAgdGhpcy5TdGVyZW9FZmZlY3QgPSBzdGVyZW87XG5cbiAgICAgICAgcmV0dXJuIGNhcmRib2FyZDtcblxuICAgIH0sXG5cbiAgICBzZXR1cENvbnRhaW5lcjogZnVuY3Rpb24gKCBjb250YWluZXIgKSB7XG5cbiAgICAgICAgaWYgKCBjb250YWluZXIgKSB7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5fd2lkdGggPSBjb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBjb250YWluZXIuX2hlaWdodCA9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoICdwYW5vbGVucy1jb250YWluZXInICk7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gb2JqZWN0IHRvIHRoZSBzY2VuZVxuICAgICAqIEF1dG9tYXRpY2FsbHkgaG9va3VwIHdpdGggcGFub2xlbnMtdmlld2VyLWhhbmRsZXIgbGlzdGVuZXJcbiAgICAgKiB0byBjb21tdW5pY2F0ZSB3aXRoIHZpZXdlciBtZXRob2RcbiAgICAgKiBAcGFyYW0ge1RIUkVFLk9iamVjdDNEfSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGJlIGFkZGVkXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZDogZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cbiAgICAgICAgaWYgKCBhcmd1bWVudHMubGVuZ3RoID4gMSApIHtcblxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArKyApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWRkKCBhcmd1bWVudHNbIGkgXSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjZW5lLmFkZCggb2JqZWN0ICk7XG5cbiAgICAgICAgLy8gQWxsIG9iamVjdCBhZGRlZCB0byBzY2VuZSBoYXMgJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJyBldmVudCB0byBoYW5kbGUgdmlld2VyIGNvbW11bmljYXRpb25cbiAgICAgICAgaWYgKCBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lciApIHtcblxuICAgICAgICAgICAgb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoICdwYW5vbGVucy12aWV3ZXItaGFuZGxlcicsIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbGwgb2JqZWN0IGFkZGVkIHRvIHNjZW5lIGJlaW5nIHBhc3NlZCB3aXRoIGNvbnRhaW5lclxuICAgICAgICBpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFBhbm9yYW1hICYmIG9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICBvYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncGFub2xlbnMtY29udGFpbmVyJywgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lciB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggb2JqZWN0IGluc3RhbmNlb2YgQ2FtZXJhUGFub3JhbWEgKSB7XG5cbiAgICAgICAgICAgIG9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwYW5vbGVucy1zY2VuZScsIHNjZW5lOiB0aGlzLnNjZW5lIH0gKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSG9va3VwIGRlZmF1bHQgcGFub3JhbWEgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIGlmICggb2JqZWN0IGluc3RhbmNlb2YgUGFub3JhbWEgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkUGFub3JhbWFFdmVudExpc3RlbmVyKCBvYmplY3QgKTtcblxuICAgICAgICAgICAgaWYgKCAhdGhpcy5wYW5vcmFtYSApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaW5pdGlhbExvb2tBdCB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYW5vcmFtYSggb2JqZWN0ICk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb250cm9sQ2VudGVyKCBpbml0aWFsTG9va0F0ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIG9iamVjdCBmcm9tIHRoZSBzY2VuZVxuICAgICAqIEBwYXJhbSAge1RIUkVFLk9iamVjdDNEfSBvYmplY3QgLSBPYmplY3QgdG8gYmUgcmVtb3ZlZFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICByZW1vdmU6IGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG4gICAgICAgIGlmICggb2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG5cbiAgICAgICAgICAgIG9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyKCAncGFub2xlbnMtdmlld2VyLWhhbmRsZXInLCB0aGlzLmV2ZW50SGFuZGxlci5iaW5kKCB0aGlzICkgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUoIG9iamVjdCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBkZWZhdWx0IGNvbnRyb2wgYmFyXG4gICAgICogQHBhcmFtIHthcnJheX0gYXJyYXkgLSBUaGUgY29udHJvbCBidXR0b25zIGFycmF5XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZERlZmF1bHRDb250cm9sQmFyOiBmdW5jdGlvbiAoIGFycmF5ICkge1xuXG4gICAgICAgIGlmICggdGhpcy53aWRnZXQgKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUud2FybiggJ0RlZmF1bHQgY29udHJvbCBiYXIgZXhpc3RzJyApO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3aWRnZXQgPSBuZXcgV2lkZ2V0KCB0aGlzLmNvbnRhaW5lciApO1xuICAgICAgICB3aWRnZXQuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhbm9sZW5zLXZpZXdlci1oYW5kbGVyJywgdGhpcy5ldmVudEhhbmRsZXIuYmluZCggdGhpcyApICk7XG4gICAgICAgIHdpZGdldC5hZGRDb250cm9sQmFyKCk7XG4gICAgICAgIGFycmF5LmZvckVhY2goIGJ1dHRvbk5hbWUgPT4ge1xuXG4gICAgICAgICAgICB3aWRnZXQuYWRkQ29udHJvbEJ1dHRvbiggYnV0dG9uTmFtZSApO1xuXG4gICAgICAgIH0gKTtcblxuICAgICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBwYW5vcmFtYSB0byBiZSB0aGUgY3VycmVudCBvbmVcbiAgICAgKiBAcGFyYW0ge1Bhbm9yYW1hfSBwYW5vIC0gUGFub3JhbWEgdG8gYmUgc2V0XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNldFBhbm9yYW1hOiBmdW5jdGlvbiAoIHBhbm8gKSB7XG5cbiAgICAgICAgY29uc3QgbGVhdmluZ1Bhbm9yYW1hID0gdGhpcy5wYW5vcmFtYTtcblxuICAgICAgICBpZiAoIHBhbm8gaW5zdGFuY2VvZiBQYW5vcmFtYSAmJiBsZWF2aW5nUGFub3JhbWEgIT09IHBhbm8gKSB7XG5cbiAgICAgICAgICAgIC8vIENsZWFyIGV4aXNpdGluZyBpbmZvc3BvdFxuICAgICAgICAgICAgdGhpcy5oaWRlSW5mb3Nwb3QoKTtcblxuICAgICAgICAgICAgY29uc3QgYWZ0ZXJFbnRlckNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBsZWF2aW5nUGFub3JhbWEgKSB7IGxlYXZpbmdQYW5vcmFtYS5vbkxlYXZlKCk7IH1cbiAgICAgICAgICAgICAgICBwYW5vLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgYWZ0ZXJFbnRlckNvbXBsZXRlICk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBhbm8uYWRkRXZlbnRMaXN0ZW5lciggJ2VudGVyLWZhZGUtc3RhcnQnLCBhZnRlckVudGVyQ29tcGxldGUgKTtcblxuICAgICAgICAgICAgLy8gQXNzaWduIGFuZCBlbnRlciBwYW5vcmFtYVxuICAgICAgICAgICAgKHRoaXMucGFub3JhbWEgPSBwYW5vKS5vbkVudGVyKCk7XG5cdFx0XHRcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgdG8gZXhlY3V0ZSBjb21tYW5kcyBmcm9tIGNoaWxkIG9iamVjdHNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgZGlzcGF0Y2hlZCBldmVudCB3aXRoIG1ldGhvZCBhcyBmdW5jdGlvbiBuYW1lIGFuZCBkYXRhIGFzIGFuIGFyZ3VtZW50XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGV2ZW50SGFuZGxlcjogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICBpZiAoIGV2ZW50Lm1ldGhvZCAmJiB0aGlzWyBldmVudC5tZXRob2QgXSApIHtcblxuICAgICAgICAgICAgdGhpc1sgZXZlbnQubWV0aG9kIF0oIGV2ZW50LmRhdGEgKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2ggZXZlbnQgdG8gYWxsIGRlc2NlbmRhbnRzXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAtIEV2ZW50IHRvIGJlIHBhc3NlZCBhbG9uZ1xuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNwYXRjaEV2ZW50VG9DaGlsZHJlbjogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgICB0aGlzLnNjZW5lLnRyYXZlcnNlKCBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuICAgICAgICAgICAgaWYgKCBvYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgIG9iamVjdC5kaXNwYXRjaEV2ZW50KCBldmVudCApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHdpZGdldCBjb250ZW50XG4gICAgICogQG1ldGhvZCBhY3RpdmF0ZVdpZGdldEl0ZW1cbiAgICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBjb250cm9sSW5kZXggLSBDb250cm9sIGluZGV4XG4gICAgICogQHBhcmFtICB7aW50ZWdlcn0gbW9kZSAtIE1vZGVzIGZvciBlZmZlY3RzXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFjdGl2YXRlV2lkZ2V0SXRlbTogZnVuY3Rpb24gKCBjb250cm9sSW5kZXgsIG1vZGUgKSB7XG5cbiAgICAgICAgY29uc3QgbWFpbk1lbnUgPSB0aGlzLndpZGdldC5tYWluTWVudTtcbiAgICAgICAgY29uc3QgQ29udHJvbE1lbnVJdGVtID0gbWFpbk1lbnUuY2hpbGRyZW5bIDAgXTtcbiAgICAgICAgY29uc3QgTW9kZU1lbnVJdGVtID0gbWFpbk1lbnUuY2hpbGRyZW5bIDEgXTtcblxuICAgICAgICBsZXQgaXRlbTtcblxuICAgICAgICBpZiAoIGNvbnRyb2xJbmRleCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCBjb250cm9sSW5kZXggKSB7XG5cbiAgICAgICAgICAgIGNhc2UgMDpcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBDb250cm9sTWVudUl0ZW0uc3ViTWVudS5jaGlsZHJlblsgMSBdO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBDb250cm9sTWVudUl0ZW0uc3ViTWVudS5jaGlsZHJlblsgMiBdO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICAgICAgaXRlbSA9IENvbnRyb2xNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAxIF07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcdFxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIENvbnRyb2xNZW51SXRlbS5zdWJNZW51LnNldEFjdGl2ZUl0ZW0oIGl0ZW0gKTtcbiAgICAgICAgICAgIENvbnRyb2xNZW51SXRlbS5zZXRTZWxlY3Rpb25UaXRsZSggaXRlbS50ZXh0Q29udGVudCApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG1vZGUgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgc3dpdGNoKCBtb2RlICkge1xuXG4gICAgICAgICAgICBjYXNlIE1PREVTLkNBUkRCT0FSRDpcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBNb2RlTWVudUl0ZW0uc3ViTWVudS5jaGlsZHJlblsgMiBdO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgTU9ERVMuU1RFUkVPOlxuXG4gICAgICAgICAgICAgICAgaXRlbSA9IE1vZGVNZW51SXRlbS5zdWJNZW51LmNoaWxkcmVuWyAzIF07XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gTW9kZU1lbnVJdGVtLnN1Yk1lbnUuY2hpbGRyZW5bIDEgXTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RlTWVudUl0ZW0uc3ViTWVudS5zZXRBY3RpdmVJdGVtKCBpdGVtICk7XG4gICAgICAgICAgICBNb2RlTWVudUl0ZW0uc2V0U2VsZWN0aW9uVGl0bGUoIGl0ZW0udGV4dENvbnRlbnQgKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIHJlbmRlcmluZyBlZmZlY3RcbiAgICAgKiBAcGFyYW0gIHtNT0RFU30gbW9kZSAtIE1vZGVzIGZvciBlZmZlY3RzXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGVuYWJsZUVmZmVjdDogZnVuY3Rpb24gKCBtb2RlICkge1xuXG4gICAgICAgIGlmICggdGhpcy5tb2RlID09PSBtb2RlICkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKCBtb2RlID09PSBNT0RFUy5OT1JNQUwgKSB7IHRoaXMuZGlzYWJsZUVmZmVjdCgpOyByZXR1cm47IH1cbiAgICAgICAgZWxzZSB7IHRoaXMubW9kZSA9IG1vZGU7IH1cblxuICAgICAgICBjb25zdCBmb3YgPSB0aGlzLmNhbWVyYS5mb3Y7XG5cbiAgICAgICAgc3dpdGNoKCBtb2RlICkge1xuXG4gICAgICAgIGNhc2UgTU9ERVMuQ0FSREJPQVJEOlxuXG4gICAgICAgICAgICB0aGlzLmVmZmVjdCA9IHRoaXMuQ2FyZGJvYXJkRWZmZWN0O1xuICAgICAgICAgICAgdGhpcy5lbmFibGVSZXRpY2xlQ29udHJvbCgpO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIE1PREVTLlNURVJFTzpcblxuICAgICAgICAgICAgdGhpcy5lZmZlY3QgPSB0aGlzLlN0ZXJlb0VmZmVjdDtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlUmV0aWNsZUNvbnRyb2woKTtcblx0XHRcdFx0XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICB0aGlzLmVmZmVjdCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVSZXRpY2xlQ29udHJvbCgpO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmF0ZVdpZGdldEl0ZW0oIHVuZGVmaW5lZCwgdGhpcy5tb2RlICk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIER1YWwgZXllIGVmZmVjdCBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgSW5mb3Nwb3QjcGFub2xlbnMtZHVhbC1leWUtZWZmZWN0XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TU9ERVN9IG1vZGUgLSBDdXJyZW50IGRpc3BsYXkgbW9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50VG9DaGlsZHJlbiggeyB0eXBlOiAncGFub2xlbnMtZHVhbC1leWUtZWZmZWN0JywgbW9kZTogdGhpcy5tb2RlIH0gKTtcblxuICAgICAgICAvLyBGb3JjZSBlZmZlY3Qgc3RlcmVvIGNhbWVyYSB0byB1cGRhdGUgYnkgcmVmcmVzaGluZyBmb3ZcbiAgICAgICAgdGhpcy5jYW1lcmEuZm92ID0gZm92ICsgMTBlLTM7XG4gICAgICAgIHRoaXMuZWZmZWN0LnNldFNpemUoIHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoLCB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5jYW1lcmEuZm92ID0gZm92O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwYXRjaCBtb2RlIGNoYW5nZSBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgVmlld2VyI21vZGUtY2hhbmdlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TU9ERVN9IG1vZGUgLSBDdXJyZW50IGRpc3BsYXkgbW9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdtb2RlLWNoYW5nZScsIG1vZGU6IHRoaXMubW9kZSB9ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSBhZGRpdGlvbmFsIHJlbmRlcmluZyBlZmZlY3RcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZGlzYWJsZUVmZmVjdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICggdGhpcy5tb2RlID09PSBNT0RFUy5OT1JNQUwgKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubW9kZSA9IE1PREVTLk5PUk1BTDtcbiAgICAgICAgdGhpcy5kaXNhYmxlUmV0aWNsZUNvbnRyb2woKTtcblxuICAgICAgICB0aGlzLmFjdGl2YXRlV2lkZ2V0SXRlbSggdW5kZWZpbmVkLCB0aGlzLm1vZGUgKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRHVhbCBleWUgZWZmZWN0IGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBJbmZvc3BvdCNwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3RcbiAgICAgICAgICogQHByb3BlcnR5IHtNT0RFU30gbW9kZSAtIEN1cnJlbnQgZGlzcGxheSBtb2RlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnRUb0NoaWxkcmVuKCB7IHR5cGU6ICdwYW5vbGVucy1kdWFsLWV5ZS1lZmZlY3QnLCBtb2RlOiB0aGlzLm1vZGUgfSApO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgsIHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodCApO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwYXRjaCBtb2RlIGNoYW5nZSBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgVmlld2VyI21vZGUtY2hhbmdlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TU9ERVN9IG1vZGUgLSBDdXJyZW50IGRpc3BsYXkgbW9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdtb2RlLWNoYW5nZScsIG1vZGU6IHRoaXMubW9kZSB9ICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZSByZXRpY2xlIGNvbnRyb2xcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZW5hYmxlUmV0aWNsZUNvbnRyb2w6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIHRoaXMucmV0aWNsZS52aXNpYmxlICkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnRlbXBFbmFibGVSZXRpY2xlID0gdHJ1ZTtcblxuICAgICAgICAvLyBSZWdpc3RlciByZXRpY2xlIGV2ZW50IGFuZCB1bnJlZ2lzdGVyIG1vdXNlIGV2ZW50XG4gICAgICAgIHRoaXMudW5yZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZXRpY2xlLnNob3coKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJldGljbGVFdmVudCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVJldGljbGVFdmVudCgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgcmV0aWNsZSBjb250cm9sXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc2FibGVSZXRpY2xlQ29udHJvbDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMudGVtcEVuYWJsZVJldGljbGUgPSBmYWxzZTtcblxuICAgICAgICAvLyBSZWdpc3RlciBtb3VzZSBldmVudCBhbmQgdW5yZWdpc3RlciByZXRpY2xlIGV2ZW50XG4gICAgICAgIGlmICggIXRoaXMub3B0aW9ucy5lbmFibGVSZXRpY2xlICkge1xuXG4gICAgICAgICAgICB0aGlzLnJldGljbGUuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy51bnJlZ2lzdGVyUmV0aWNsZUV2ZW50KCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTW91c2VBbmRUb3VjaEV2ZW50cygpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlUmV0aWNsZUV2ZW50KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZSBhdXRvIHJvdGF0aW9uXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGVuYWJsZUF1dG9SYXRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmF1dG9Sb3RhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLk9yYml0Q29udHJvbHMuYXV0b1JvdGF0ZSA9IHRydWU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSBhdXRvIHJvdGF0aW9uXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc2FibGVBdXRvUmF0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNsZWFyVGltZW91dCggdGhpcy5hdXRvUm90YXRlUmVxdWVzdElkICk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuT3JiaXRDb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHZpZGVvIHBsYXkgb3Igc3RvcFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGF1c2VcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFZpZXdlciN2aWRlby10b2dnbGVcbiAgICAgKi9cbiAgICB0b2dnbGVWaWRlb1BsYXk6IGZ1bmN0aW9uICggcGF1c2UgKSB7XG5cbiAgICAgICAgaWYgKCB0aGlzLnBhbm9yYW1hIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSApIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUb2dnbGUgdmlkZW8gZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAZXZlbnQgVmlld2VyI3ZpZGVvLXRvZ2dsZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnBhbm9yYW1hLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZpZGVvLXRvZ2dsZScsIHBhdXNlOiBwYXVzZSB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBjdXJyZW50VGltZSBpbiBhIHZpZGVvXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnRhZ2UgLSBQZXJjZW50YWdlIG9mIGEgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZmlyZXMgVmlld2VyI3ZpZGVvLXRpbWVcbiAgICAgKi9cbiAgICBzZXRWaWRlb0N1cnJlbnRUaW1lOiBmdW5jdGlvbiAoIHBlcmNlbnRhZ2UgKSB7XG5cbiAgICAgICAgaWYgKCB0aGlzLnBhbm9yYW1hIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSApIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTZXR0aW5nIHZpZGVvIHRpbWUgZXZlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAgICAgKiBAZXZlbnQgVmlld2VyI3ZpZGVvLXRpbWVcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwZXJjZW50YWdlIC0gUGVyY2VudGFnZSBvZiBhIHZpZGVvLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5wYW5vcmFtYS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2aWRlby10aW1lJywgcGVyY2VudGFnZTogcGVyY2VudGFnZSB9ICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgd2hlbiB2aWRlbyB1cGRhdGVzIGlmIGFuIHdpZGdldCBpcyBwcmVzZW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnRhZ2UgLSBQZXJjZW50YWdlIG9mIGEgdmlkZW8uIFJhbmdlIGZyb20gMC4wIHRvIDEuMFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZmlyZXMgVmlld2VyI3ZpZGVvLXVwZGF0ZVxuICAgICAqL1xuICAgIG9uVmlkZW9VcGRhdGU6IGZ1bmN0aW9uICggcGVyY2VudGFnZSApIHtcblxuICAgICAgICBjb25zdCB7IHdpZGdldCB9ID0gdGhpcztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVmlkZW8gdXBkYXRlIGV2ZW50XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBWaWV3ZXIjdmlkZW8tdXBkYXRlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwZXJjZW50YWdlIC0gUGVyY2VudGFnZSBvZiBhIHZpZGVvLiBSYW5nZSBmcm9tIDAuMCB0byAxLjBcbiAgICAgICAgICovXG4gICAgICAgIGlmKCB3aWRnZXQgKSB7IHdpZGdldC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd2aWRlby11cGRhdGUnLCBwZXJjZW50YWdlOiBwZXJjZW50YWdlIH0gKTsgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCB1cGRhdGUgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZFVwZGF0ZUNhbGxiYWNrOiBmdW5jdGlvbiAoIGZuICkge1xuXG4gICAgICAgIGlmICggZm4gKSB7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FsbGJhY2tzLnB1c2goIGZuICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICByZW1vdmVVcGRhdGVDYWxsYmFjazogZnVuY3Rpb24gKCBmbiApIHtcblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudXBkYXRlQ2FsbGJhY2tzLmluZGV4T2YoIGZuICk7XG5cbiAgICAgICAgaWYgKCBmbiAmJiBpbmRleCA+PSAwICkge1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbGxiYWNrcy5zcGxpY2UoIGluZGV4LCAxICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNob3cgdmlkZW8gd2lkZ2V0XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNob3dWaWRlb1dpZGdldDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IHsgd2lkZ2V0IH0gPSB0aGlzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHZpZGVvIHdpZGdldCBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgVmlld2VyI3ZpZGVvLWNvbnRyb2wtc2hvd1xuICAgICAgICAgKi9cbiAgICAgICAgaWYoIHdpZGdldCApIHsgd2lkZ2V0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ZpZGVvLWNvbnRyb2wtc2hvdycgfSApOyB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGlkZSB2aWRlbyB3aWRnZXRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgaGlkZVZpZGVvV2lkZ2V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyB3aWRnZXQgfSA9IHRoaXM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhpZGUgdmlkZW8gd2lkZ2V0XG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBldmVudCBWaWV3ZXIjdmlkZW8tY29udHJvbC1oaWRlXG4gICAgICAgICAqL1xuICAgICAgICBpZiggd2lkZ2V0ICkgeyB3aWRnZXQuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAndmlkZW8tY29udHJvbC1oaWRlJyB9ICk7IH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdmlkZW8gcGxheSBidXR0b25cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhdXNlZCBcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdXBkYXRlVmlkZW9QbGF5QnV0dG9uOiBmdW5jdGlvbiAoIHBhdXNlZCApIHtcblxuICAgICAgICBjb25zdCB7IHdpZGdldCB9ID0gdGhpcztcblxuICAgICAgICBpZiAoIHdpZGdldCAmJiB3aWRnZXQudmlkZW9FbGVtZW50ICYmIHdpZGdldC52aWRlb0VsZW1lbnQuY29udHJvbEJ1dHRvbiApIHtcblxuICAgICAgICAgICAgd2lkZ2V0LnZpZGVvRWxlbWVudC5jb250cm9sQnV0dG9uLnVwZGF0ZSggcGF1c2VkICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBkZWZhdWx0IHBhbm9yYW1hIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSB7UGFub3JhbWF9IHBhbm8gLSBUaGUgcGFub3JhbWEgdG8gYmUgYWRkZWQgd2l0aCBldmVudCBsaXN0ZW5lclxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhZGRQYW5vcmFtYUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uICggcGFubyApIHtcblxuICAgICAgICAvLyBTZXQgY2FtZXJhIGNvbnRyb2wgb24gZXZlcnkgcGFub3JhbWFcbiAgICAgICAgcGFuby5hZGRFdmVudExpc3RlbmVyKCAnZW50ZXInLCB0aGlzLnNldENhbWVyYUNvbnRyb2wuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgLy8gU2hvdyBhbmQgaGlkZSB3aWRnZXQgZXZlbnQgb25seSB3aGVuIGl0J3MgVmlkZW9QYW5vcmFtYVxuICAgICAgICBpZiAoIHBhbm8gaW5zdGFuY2VvZiBWaWRlb1Bhbm9yYW1hICkge1xuXG4gICAgICAgICAgICBwYW5vLmFkZEV2ZW50TGlzdGVuZXIoICdlbnRlci1mYWRlLXN0YXJ0JywgdGhpcy5zaG93VmlkZW9XaWRnZXQuYmluZCggdGhpcyApICk7XG4gICAgICAgICAgICBwYW5vLmFkZEV2ZW50TGlzdGVuZXIoICdsZWF2ZScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIGlmICggISh0aGlzLnBhbm9yYW1hIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSkgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlVmlkZW9XaWRnZXQuY2FsbCggdGhpcyApO1xuXG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRcbiAgICAgICAgICAgIH0uYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBjYW1lcmEgY29udHJvbFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRDYW1lcmFDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5PcmJpdENvbnRyb2xzLnRhcmdldC5jb3B5KCB0aGlzLnBhbm9yYW1hLnBvc2l0aW9uICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGN1cnJlbnQgY2FtZXJhIGNvbnRyb2xcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gQ3VycmVudCBuYXZpZ2F0aW9uIGNvbnRyb2xcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge1RIUkVFLk9yYml0Q29udHJvbHN8VEhSRUUuRGV2aWNlT3JpZW50YXRpb25Db250cm9sc31cbiAgICAgKi9cbiAgICBnZXRDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbDtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgc2NlbmVcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7VEhSRUUuU2NlbmV9IC0gQ3VycmVudCBzY2VuZSB3aGljaCB0aGUgdmlld2VyIGlzIGJ1aWx0IG9uXG4gICAgICovXG4gICAgZ2V0U2NlbmU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgY2FtZXJhXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge1RIUkVFLkNhbWVyYX0gLSBUaGUgc2NlbmUgY2FtZXJhXG4gICAgICovXG4gICAgZ2V0Q2FtZXJhOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FtZXJhO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCByZW5kZXJlclxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtUSFJFRS5XZWJHTFJlbmRlcmVyfSAtIFRoZSByZW5kZXJlciB1c2luZyB3ZWJnbFxuICAgICAqL1xuICAgIGdldFJlbmRlcmVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXI7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGNvbnRhaW5lclxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gLSBUaGUgY29udGFpbmVyIGhvbGRzIHJlbmRlcmVyZCBjYW52YXNcbiAgICAgKi9cbiAgICBnZXRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGNvbnRyb2wgaWRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAtIENvbnRyb2wgaWQuICdvcmJpdCcgb3IgJ2RldmljZS1vcmllbnRhdGlvbidcbiAgICAgKi9cbiAgICBnZXRDb250cm9sSWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sLmlkO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBuZXh0IG5hdmlnYXRpb24gY29udHJvbCBpZFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gTmV4dCBjb250cm9sIGlkXG4gICAgICovXG4gICAgZ2V0TmV4dENvbnRyb2xJZDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xzWyB0aGlzLmdldE5leHRDb250cm9sSW5kZXgoKSBdLmlkO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBuZXh0IG5hdmlnYXRpb24gY29udHJvbCBpbmRleFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gTmV4dCBjb250cm9sIGluZGV4XG4gICAgICovXG4gICAgZ2V0TmV4dENvbnRyb2xJbmRleDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGNvbnRyb2xzID0gdGhpcy5jb250cm9scztcbiAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbDtcbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gY29udHJvbHMuaW5kZXhPZiggY29udHJvbCApICsgMTtcblxuICAgICAgICByZXR1cm4gKCBuZXh0SW5kZXggPj0gY29udHJvbHMubGVuZ3RoICkgPyAwIDogbmV4dEluZGV4O1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCBmaWVsZCBvZiB2aWV3IG9mIGNhbWVyYVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmb3ZcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgc2V0Q2FtZXJhRm92OiBmdW5jdGlvbiAoIGZvdiApIHtcblxuICAgICAgICB0aGlzLmNhbWVyYS5mb3YgPSBmb3Y7XG4gICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgcmF5Y2FzdGVkIHBvaW50IG9mIGN1cnJlbnQgcGFub3JhbWFcbiAgICAgKiBAbWVtYmVyb2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge1RIUkVFLlZlY3RvcjN9XG4gICAgICovXG4gICAgZ2V0UmF5Y2FzdFZpZXdDZW50ZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCByYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKCk7XG4gICAgICAgIHJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKCBuZXcgVEhSRUUuVmVjdG9yMiggMCwgMCApLCB0aGlzLmNhbWVyYSApO1xuICAgICAgICBjb25zdCBpbnRlcnNlY3QgPSByYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0KCB0aGlzLnBhbm9yYW1hICk7XG5cbiAgICAgICAgcmV0dXJuIGludGVyc2VjdC5sZW5ndGggPiAwID8gaW50ZXJzZWN0WyAwIF0ucG9pbnQgOiBuZXcgVEhSRUUuVmVjdG9yMyggMCwgMCwgLTEgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgY29udHJvbCBieSBpbmRleFxuICAgICAqIEBwYXJhbSAge0NPTlRST0xTfSBpbmRleCAtIEluZGV4IG9mIGNhbWVyYSBjb250cm9sXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGVuYWJsZUNvbnRyb2w6IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cbiAgICAgICAgaW5kZXggPSAoIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLmNvbnRyb2xzLmxlbmd0aCApID8gaW5kZXggOiAwO1xuXG4gICAgICAgIHRoaXMuY29udHJvbC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuY29udHJvbHNbIGluZGV4IF07XG4gICAgICAgIHRoaXMuY29udHJvbC5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sLnVwZGF0ZSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXRDb250cm9sQ2VudGVyKCB0aGlzLmdldFJheWNhc3RWaWV3Q2VudGVyKCkgKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZVdpZGdldEl0ZW0oIGluZGV4LCB1bmRlZmluZWQgKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgY3VycmVudCBjb250cm9sXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc2FibGVDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5jb250cm9sLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgbmV4dCBjb250cm9sXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHRvZ2dsZU5leHRDb250cm9sOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5lbmFibGVDb250cm9sKCB0aGlzLmdldE5leHRDb250cm9sSW5kZXgoKSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNjcmVlbiBTcGFjZSBQcm9qZWN0aW9uXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldFNjcmVlblZlY3RvcjogZnVuY3Rpb24gKCB3b3JsZFZlY3RvciApIHtcblxuICAgICAgICBjb25zdCB2ZWN0b3IgPSB3b3JsZFZlY3Rvci5jbG9uZSgpO1xuICAgICAgICBjb25zdCB3aWR0aEhhbGYgPSAoIHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoICkgLyAyO1xuICAgICAgICBjb25zdCBoZWlnaHRIYWxmID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMjtcblxuICAgICAgICB2ZWN0b3IucHJvamVjdCggdGhpcy5jYW1lcmEgKTtcblxuICAgICAgICB2ZWN0b3IueCA9ICggdmVjdG9yLnggKiB3aWR0aEhhbGYgKSArIHdpZHRoSGFsZjtcbiAgICAgICAgdmVjdG9yLnkgPSAtICggdmVjdG9yLnkgKiBoZWlnaHRIYWxmICkgKyBoZWlnaHRIYWxmO1xuICAgICAgICB2ZWN0b3IueiA9IDA7XG5cbiAgICAgICAgcmV0dXJuIHZlY3RvcjtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBTcHJpdGUgaW4gVmlld3BvcnRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgY2hlY2tTcHJpdGVJblZpZXdwb3J0OiBmdW5jdGlvbiAoIHNwcml0ZSApIHtcblxuICAgICAgICB0aGlzLmNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UuZ2V0SW52ZXJzZSggdGhpcy5jYW1lcmEubWF0cml4V29ybGQgKTtcbiAgICAgICAgdGhpcy5jYW1lcmFWaWV3UHJvamVjdGlvbk1hdHJpeC5tdWx0aXBseU1hdHJpY2VzKCB0aGlzLmNhbWVyYS5wcm9qZWN0aW9uTWF0cml4LCB0aGlzLmNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKTtcbiAgICAgICAgdGhpcy5jYW1lcmFGcnVzdHVtLnNldEZyb21Qcm9qZWN0aW9uTWF0cml4KCB0aGlzLmNhbWVyYVZpZXdQcm9qZWN0aW9uTWF0cml4ICk7XG5cbiAgICAgICAgcmV0dXJuIHNwcml0ZS52aXNpYmxlICYmIHRoaXMuY2FtZXJhRnJ1c3R1bS5pbnRlcnNlY3RzU3ByaXRlKCBzcHJpdGUgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXZlcnNlIGRyYWdnaW5nIGRpcmVjdGlvblxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICByZXZlcnNlRHJhZ2dpbmdEaXJlY3Rpb246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLk9yYml0Q29udHJvbHMucm90YXRlU3BlZWQgKj0gLTE7XG4gICAgICAgIHRoaXMuT3JiaXRDb250cm9scy5tb21lbnR1bVNjYWxpbmdGYWN0b3IgKj0gLTE7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIHJldGljbGUgXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZFJldGljbGU6IGZ1bmN0aW9uICggY2FtZXJhLCBzY2VuZVJldGljbGUgKSB7XG5cbiAgICAgICAgY29uc3QgcmV0aWNsZSA9IG5ldyBSZXRpY2xlKCAweGZmZmZmZiwgdHJ1ZSwgdGhpcy5vcHRpb25zLmR3ZWxsVGltZSApO1xuICAgICAgICByZXRpY2xlLmhpZGUoKTtcbiAgICAgICAgY2FtZXJhLmFkZCggcmV0aWNsZSApO1xuICAgICAgICBzY2VuZVJldGljbGUuYWRkKCBjYW1lcmEgKTtcblxuICAgICAgICByZXR1cm4gcmV0aWNsZTtcblxuICAgIH0sXG5cbiAgICByb3RhdGVDb250cm9sTGVmdDogZnVuY3Rpb24gKCBsZWZ0ICkge1xuXG4gICAgICAgIHRoaXMuY29udHJvbC5yb3RhdGVMZWZ0KCBsZWZ0ICk7XG5cbiAgICB9LFxuXG4gICAgcm90YXRlQ29udHJvbFVwOiBmdW5jdGlvbiAoIHVwICkge1xuXG4gICAgICAgIHRoaXMuY29udHJvbC5yb3RhdGVVcCggdXAgKTtcblxuICAgIH0sXG5cbiAgICByb3RhdGVPcmJpdENvbnRyb2w6IGZ1bmN0aW9uICggbGVmdCwgdXAgKSB7XG5cbiAgICAgICAgdGhpcy5yb3RhdGVDb250cm9sTGVmdCggbGVmdCApO1xuICAgICAgICB0aGlzLnJvdGF0ZUNvbnRyb2xVcCggdXAgKTtcblxuICAgIH0sXG5cbiAgICBjYWxjdWxhdGVDYW1lcmFEaXJlY3Rpb25EZWx0YTogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cbiAgICAgICAgbGV0IGhhLCB2YSwgY2h2LCBjdnYsIGh2LCB2diwgdnB0YztcblxuICAgICAgICBjaHYgPSB0aGlzLmNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApO1xuICAgICAgICBjdnYgPSBjaHYuY2xvbmUoKTtcblxuICAgICAgICB2cHRjID0gdGhpcy5wYW5vcmFtYS5nZXRXb3JsZFBvc2l0aW9uKCBuZXcgVEhSRUUuVmVjdG9yMygpICkuc3ViKCB0aGlzLmNhbWVyYS5nZXRXb3JsZFBvc2l0aW9uKCBuZXcgVEhSRUUuVmVjdG9yMygpICkgKTtcblxuICAgICAgICBodiA9IHZlY3Rvci5jbG9uZSgpO1xuICAgICAgICBodi5hZGQoIHZwdGMgKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdnYgPSBodi5jbG9uZSgpO1xuXG4gICAgICAgIGNodi55ID0gMDtcbiAgICAgICAgaHYueSA9IDA7XG5cbiAgICAgICAgaGEgPSBNYXRoLmF0YW4yKCBodi56LCBodi54ICkgLSBNYXRoLmF0YW4yKCBjaHYueiwgY2h2LnggKTtcbiAgICAgICAgaGEgPSBoYSA+IE1hdGguUEkgPyBoYSAtIDIgKiBNYXRoLlBJIDogaGE7XG4gICAgICAgIGhhID0gaGEgPCAtTWF0aC5QSSA/IGhhICsgMiAqIE1hdGguUEkgOiBoYTtcbiAgICAgICAgdmEgPSBNYXRoLmFicyggY3Z2LmFuZ2xlVG8oIGNodiApICsgKCBjdnYueSAqIHZ2LnkgPD0gMCA/IHZ2LmFuZ2xlVG8oIGh2ICkgOiAtdnYuYW5nbGVUbyggaHYgKSApICk7XG4gICAgICAgIHZhICo9IHZ2LnkgPCBjdnYueSA/IDEgOiAtMTtcblxuICAgICAgICByZXR1cm4geyBsZWZ0OiBoYSwgdXA6IHZhIH07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IGNvbnRyb2wgY2VudGVyXG4gICAgICogQHBhcmFtIHtUSFJFRS5WZWN0b3IzfSB2ZWN0b3IgLSBWZWN0b3IgdG8gYmUgbG9va2VkIGF0IHRoZSBjZW50ZXJcbiAgICAgKi9cbiAgICBzZXRDb250cm9sQ2VudGVyOiBmdW5jdGlvbiggdmVjdG9yICkge1xuXG4gICAgICAgIGNvbnN0IHsgbGVmdCwgdXAgfSA9IHRoaXMuY2FsY3VsYXRlQ2FtZXJhRGlyZWN0aW9uRGVsdGEoIHZlY3RvciApO1xuICAgICAgICB0aGlzLnJvdGF0ZU9yYml0Q29udHJvbCggbGVmdCwgdXAgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUd2VlbiBjb250cm9sIGxvb2tpbmcgY2VudGVyXG4gICAgICogQHBhcmFtIHtUSFJFRS5WZWN0b3IzfSB2ZWN0b3IgLSBWZWN0b3IgdG8gYmUgbG9va2VkIGF0IHRoZSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTEwMDBdIC0gRHVyYXRpb24gdG8gdHdlZW5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZWFzaW5nPVRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5PdXRdIC0gRWFzaW5nIGZ1bmN0aW9uXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHR3ZWVuQ29udHJvbENlbnRlcjogZnVuY3Rpb24gKCB2ZWN0b3IsIGR1cmF0aW9uLCBlYXNpbmcgKSB7XG5cbiAgICAgICAgaWYgKCB2ZWN0b3IgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuICAgICAgICAgICAgdmVjdG9yID0gdmVjdG9yWyAwIF07XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHZlY3RvclsgMSBdO1xuICAgICAgICAgICAgZWFzaW5nID0gdmVjdG9yWyAyIF07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gIT09IHVuZGVmaW5lZCA/IGR1cmF0aW9uIDogMTAwMDtcbiAgICAgICAgZWFzaW5nID0gZWFzaW5nIHx8IFRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5PdXQ7XG5cbiAgICAgICAgY29uc3QgeyBsZWZ0LCB1cCB9ID0gdGhpcy5jYWxjdWxhdGVDYW1lcmFEaXJlY3Rpb25EZWx0YSggdmVjdG9yICk7XG4gICAgICAgIGNvbnN0IHJvdGF0ZUNvbnRyb2xMZWZ0ID0gdGhpcy5yb3RhdGVDb250cm9sTGVmdC5iaW5kKCB0aGlzICk7XG4gICAgICAgIGNvbnN0IHJvdGF0ZUNvbnRyb2xVcCA9IHRoaXMucm90YXRlQ29udHJvbFVwLmJpbmQoIHRoaXMgKTtcblxuICAgICAgICBjb25zdCBvdiA9IHsgbGVmdDogMCwgdXA6IDAgfTtcbiAgICAgICAgY29uc3QgbnYgPSB7IGxlZnQ6IDAsIHVwOiAwIH07XG5cbiAgICAgICAgdGhpcy50d2VlbkxlZnRBbmltYXRpb24uc3RvcCgpO1xuICAgICAgICB0aGlzLnR3ZWVuVXBBbmltYXRpb24uc3RvcCgpO1xuXG4gICAgICAgIHRoaXMudHdlZW5MZWZ0QW5pbWF0aW9uID0gbmV3IFRXRUVOLlR3ZWVuKCBvdiApXG4gICAgICAgICAgICAudG8oIHsgbGVmdCB9LCBkdXJhdGlvbiApXG4gICAgICAgICAgICAuZWFzaW5nKCBlYXNpbmcgKVxuICAgICAgICAgICAgLm9uVXBkYXRlKGZ1bmN0aW9uKG92KXtcbiAgICAgICAgICAgICAgICByb3RhdGVDb250cm9sTGVmdCggb3YubGVmdCAtIG52LmxlZnQgKTtcbiAgICAgICAgICAgICAgICBudi5sZWZ0ID0gb3YubGVmdDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLnR3ZWVuVXBBbmltYXRpb24gPSBuZXcgVFdFRU4uVHdlZW4oIG92IClcbiAgICAgICAgICAgIC50byggeyB1cCB9LCBkdXJhdGlvbiApXG4gICAgICAgICAgICAuZWFzaW5nKCBlYXNpbmcgKVxuICAgICAgICAgICAgLm9uVXBkYXRlKGZ1bmN0aW9uKG92KXtcbiAgICAgICAgICAgICAgICByb3RhdGVDb250cm9sVXAoIG92LnVwIC0gbnYudXAgKTtcbiAgICAgICAgICAgICAgICBudi51cCA9IG92LnVwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFR3ZWVuIGNvbnRyb2wgbG9va2luZyBjZW50ZXIgYnkgb2JqZWN0XG4gICAgICogQHBhcmFtIHtUSFJFRS5PYmplY3QzRH0gb2JqZWN0IC0gT2JqZWN0IHRvIGJlIGxvb2tlZCBhdCB0aGUgY2VudGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkdXJhdGlvbj0xMDAwXSAtIER1cmF0aW9uIHRvIHR3ZWVuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vhc2luZz1UV0VFTi5FYXNpbmcuRXhwb25lbnRpYWwuT3V0XSAtIEVhc2luZyBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0d2VlbkNvbnRyb2xDZW50ZXJCeU9iamVjdDogZnVuY3Rpb24gKCBvYmplY3QsIGR1cmF0aW9uLCBlYXNpbmcgKSB7XG5cbiAgICAgICAgdGhpcy50d2VlbkNvbnRyb2xDZW50ZXIoIG9iamVjdC5nZXRXb3JsZFBvc2l0aW9uKCBuZXcgVEhSRUUuVmVjdG9yMygpICksIGR1cmF0aW9uLCBlYXNpbmcgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGNhbGxlZCB3aGVuIHdpbmRvdyBzaXplIGlzIGNoYW5nZWRcbiAgICAgKiBAZmlyZXMgVmlld2VyI3dpbmRvdy1yZXNpemVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3dpbmRvd1dpZHRoXSAtIFNwZWNpZnkgaWYgY3VzdG9tIGVsZW1lbnQgaGFzIGNoYW5nZWQgd2lkdGhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3dpbmRvd0hlaWdodF0gLSBTcGVjaWZ5IGlmIGN1c3RvbSBlbGVtZW50IGhhcyBjaGFuZ2VkIGhlaWdodFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbldpbmRvd1Jlc2l6ZTogZnVuY3Rpb24gKCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0ICkge1xuXG4gICAgICAgIGxldCB3aWR0aCwgaGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IGV4cGFuZCA9IHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyggJ3Bhbm9sZW5zLWNvbnRhaW5lcicgKSB8fCB0aGlzLmNvbnRhaW5lci5pc0Z1bGxzY3JlZW47XG5cbiAgICAgICAgaWYgKCB3aW5kb3dXaWR0aCAhPT0gdW5kZWZpbmVkICYmIHdpbmRvd0hlaWdodCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICB3aWR0aCA9IHdpbmRvd1dpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gd2luZG93SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuX3dpZHRoID0gd2luZG93V2lkdGg7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5faGVpZ2h0ID0gd2luZG93SGVpZ2h0O1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGlzQW5kcm9pZCA9IC8oYW5kcm9pZCkvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAgICAgICAgICAgY29uc3QgYWRqdXN0V2lkdGggPSBpc0FuZHJvaWQgXG4gICAgICAgICAgICAgICAgPyBNYXRoLm1pbihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApIFxuICAgICAgICAgICAgICAgIDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcblxuICAgICAgICAgICAgY29uc3QgYWRqdXN0SGVpZ2h0ID0gaXNBbmRyb2lkIFxuICAgICAgICAgICAgICAgID8gTWF0aC5taW4oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApIFxuICAgICAgICAgICAgICAgIDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xuXG4gICAgICAgICAgICB3aWR0aCA9IGV4cGFuZCA/IGFkanVzdFdpZHRoIDogdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSBleHBhbmQgPyBhZGp1c3RIZWlnaHQgOiB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuX2hlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcblxuICAgICAgICAvLyBVcGRhdGUgcmV0aWNsZVxuICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5lbmFibGVSZXRpY2xlIHx8IHRoaXMudGVtcEVuYWJsZVJldGljbGUgKSB7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlUmV0aWNsZUV2ZW50KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaW5kb3cgcmVzaXppbmcgZXZlbnRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogQGV2ZW50IFZpZXdlciN3aW5kb3ctcmVzaXplXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aCAgLSBXaWR0aCBvZiB0aGUgd2luZG93XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBIZWlnaHQgb2YgdGhlIHdpbmRvd1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICd3aW5kb3ctcmVzaXplJywgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcbiAgICAgICAgdGhpcy5zY2VuZS50cmF2ZXJzZSggZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cbiAgICAgICAgICAgIGlmICggb2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnd2luZG93LXJlc2l6ZScsIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIG91dHB1dCBlbGVtZW50XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZE91dHB1dEVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmlnaHQgPSAnMTBweCc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gJzEwcHgnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xuICAgICAgICB0aGlzLm91dHB1dERpdkVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE91dHB1dCBwb3NpdGlvbiBpbiBkZXZlbG9wZXIgY29uc29sZSBieSBob2xkaW5nIGRvd24gQ3RybCBidXR0b25cbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb3V0cHV0UG9zaXRpb246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBpbnRlcnNlY3RzID0gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0KCB0aGlzLnBhbm9yYW1hLCB0cnVlICk7XG5cbiAgICAgICAgaWYgKCBpbnRlcnNlY3RzLmxlbmd0aCA+IDAgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gaW50ZXJzZWN0c1sgMCBdLnBvaW50LmNsb25lKCk7XG4gICAgICAgICAgICBjb25zdCB3b3JsZCA9IHRoaXMucGFub3JhbWEuZ2V0V29ybGRQb3NpdGlvbiggbmV3IFRIUkVFLlZlY3RvcjMoKSApO1xuICAgICAgICAgICAgcG9pbnQuc3ViKCB3b3JsZCApO1xuXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7cG9pbnQueC50b0ZpeGVkKDIpfSwgJHtwb2ludC55LnRvRml4ZWQoMil9LCAke3BvaW50LnoudG9GaXhlZCgyKX1gO1xuXG4gICAgICAgICAgICBpZiAoIHBvaW50Lmxlbmd0aCgpID09PSAwICkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgc3dpdGNoICggdGhpcy5vcHRpb25zLm91dHB1dCApIHtcblxuICAgICAgICAgICAgY2FzZSAnY29uc29sZSc6XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCBtZXNzYWdlICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ292ZXJsYXknOlxuICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0RGl2RWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT24gbW91c2UgZG93blxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIG9uTW91c2VEb3duOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy51c2VyTW91c2UueCA9ICggZXZlbnQuY2xpZW50WCA+PSAwICkgPyBldmVudC5jbGllbnRYIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICB0aGlzLnVzZXJNb3VzZS55ID0gKCBldmVudC5jbGllbnRZID49IDAgKSA/IGV2ZW50LmNsaWVudFkgOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICAgIHRoaXMudXNlck1vdXNlLnR5cGUgPSAnbW91c2Vkb3duJztcbiAgICAgICAgdGhpcy5vblRhcCggZXZlbnQgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPbiBtb3VzZSBtb3ZlXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Nb3VzZU1vdmU6IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy51c2VyTW91c2UudHlwZSA9ICdtb3VzZW1vdmUnO1xuICAgICAgICB0aGlzLm9uVGFwKCBldmVudCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9uIG1vdXNlIHVwXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25Nb3VzZVVwOiBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICAgIGxldCBvblRhcmdldCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudXNlck1vdXNlLnR5cGUgPSAnbW91c2V1cCc7XG5cbiAgICAgICAgY29uc3QgdHlwZSA9ICggdGhpcy51c2VyTW91c2UueCA+PSBldmVudC5jbGllbnRYIC0gdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlIFxuXHRcdFx0XHQmJiB0aGlzLnVzZXJNb3VzZS54IDw9IGV2ZW50LmNsaWVudFggKyB0aGlzLm9wdGlvbnMuY2xpY2tUb2xlcmFuY2Vcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueSA+PSBldmVudC5jbGllbnRZIC0gdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnkgPD0gZXZlbnQuY2xpZW50WSArIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZSApIFxuXHRcdFx0XHR8fCAgKCBldmVudC5jaGFuZ2VkVG91Y2hlcyBcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueCA+PSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnggPD0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCArIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZSBcblx0XHRcdFx0JiYgdGhpcy51c2VyTW91c2UueSA+PSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gdGhpcy5vcHRpb25zLmNsaWNrVG9sZXJhbmNlXG5cdFx0XHRcdCYmIHRoaXMudXNlck1vdXNlLnkgPD0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSArIHRoaXMub3B0aW9ucy5jbGlja1RvbGVyYW5jZSApIFxuICAgICAgICAgICAgPyAnY2xpY2snIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIEV2ZW50IHNob3VsZCBoYXBwZW4gb24gY2FudmFzXG4gICAgICAgIGlmICggZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmICFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCAncGFub2xlbnMtY2FudmFzJyApICkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICggZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID09PSAxICkge1xuXG4gICAgICAgICAgICBvblRhcmdldCA9IHRoaXMub25UYXAoIHsgY2xpZW50WDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgY2xpZW50WTogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSB9LCB0eXBlICk7XG5cdFx0XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIG9uVGFyZ2V0ID0gdGhpcy5vblRhcCggZXZlbnQsIHR5cGUgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51c2VyTW91c2UudHlwZSA9ICdub25lJztcblxuICAgICAgICBpZiAoIG9uVGFyZ2V0ICkgeyBcblxuICAgICAgICAgICAgcmV0dXJuOyBcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0eXBlID09PSAnY2xpY2snICkge1xuXG4gICAgICAgICAgICBjb25zdCB7IG9wdGlvbnM6IHsgYXV0b0hpZGVJbmZvc3BvdCwgYXV0b0hpZGVDb250cm9sQmFyIH0sIHBhbm9yYW1hLCB0b2dnbGVDb250cm9sQmFyIH0gPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoIGF1dG9IaWRlSW5mb3Nwb3QgJiYgcGFub3JhbWEgKSB7XG5cbiAgICAgICAgICAgICAgICBwYW5vcmFtYS50b2dnbGVJbmZvc3BvdFZpc2liaWxpdHkoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGF1dG9IaWRlQ29udHJvbEJhciApIHtcblxuICAgICAgICAgICAgICAgIHRvZ2dsZUNvbnRyb2xCYXIoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPbiB0YXAgZXZlbnkgZnJhbWVcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvblRhcDogZnVuY3Rpb24gKCBldmVudCwgdHlwZSApIHtcblxuICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCB9ID0gdGhpcy5jb250YWluZXI7XG5cbiAgICAgICAgdGhpcy5yYXljYXN0ZXJQb2ludC54ID0gKCAoIGV2ZW50LmNsaWVudFggLSBsZWZ0ICkgLyBjbGllbnRXaWR0aCApICogMiAtIDE7XG4gICAgICAgIHRoaXMucmF5Y2FzdGVyUG9pbnQueSA9IC0gKCAoIGV2ZW50LmNsaWVudFkgLSB0b3AgKSAvIGNsaWVudEhlaWdodCApICogMiArIDE7XG5cbiAgICAgICAgdGhpcy5yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSggdGhpcy5yYXljYXN0ZXJQb2ludCwgdGhpcy5jYW1lcmEgKTtcblxuICAgICAgICAvLyBSZXR1cm4gaWYgbm8gcGFub3JhbWEgXG4gICAgICAgIGlmICggIXRoaXMucGFub3JhbWEgKSB7IFxuXG4gICAgICAgICAgICByZXR1cm47IFxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdXRwdXQgaW5mb3Nwb3QgaW5mb3JtYXRpb25cbiAgICAgICAgaWYgKCBldmVudC50eXBlICE9PSAnbW91c2Vkb3duJyAmJiB0aGlzLnRvdWNoU3VwcG9ydGVkIHx8IHRoaXMub3V0cHV0RW5hYmxlZCApIHsgXG5cbiAgICAgICAgICAgIHRoaXMub3V0cHV0UG9zaXRpb24oKTsgXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGludGVyc2VjdHMgPSB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKCB0aGlzLnBhbm9yYW1hLmNoaWxkcmVuLCB0cnVlICk7XG4gICAgICAgIGNvbnN0IGludGVyc2VjdF9lbnRpdHkgPSB0aGlzLmdldENvbnZlcnRlZEludGVyc2VjdCggaW50ZXJzZWN0cyApO1xuICAgICAgICBjb25zdCBpbnRlcnNlY3QgPSAoIGludGVyc2VjdHMubGVuZ3RoID4gMCApID8gaW50ZXJzZWN0c1swXS5vYmplY3QgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCB0aGlzLnVzZXJNb3VzZS50eXBlID09PSAnbW91c2V1cCcgICkge1xuXG4gICAgICAgICAgICBpZiAoIGludGVyc2VjdF9lbnRpdHkgJiYgdGhpcy5wcmVzc0VudGl0eU9iamVjdCA9PT0gaW50ZXJzZWN0X2VudGl0eSAmJiB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RvcC1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcmVzc0VudGl0eU9iamVjdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLnVzZXJNb3VzZS50eXBlID09PSAnbW91c2V1cCcgICkge1xuXG4gICAgICAgICAgICBpZiAoIGludGVyc2VjdCAmJiB0aGlzLnByZXNzT2JqZWN0ID09PSBpbnRlcnNlY3QgJiYgdGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc3N0b3AnLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcmVzc09iamVjdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0eXBlID09PSAnY2xpY2snICkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnBhbm9yYW1hLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2NsaWNrJywgaW50ZXJzZWN0czogaW50ZXJzZWN0cywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICBpZiAoIGludGVyc2VjdF9lbnRpdHkgJiYgaW50ZXJzZWN0X2VudGl0eS5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0X2VudGl0eS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdjbGljay1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBpbnRlcnNlY3QgJiYgaW50ZXJzZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICBpbnRlcnNlY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnY2xpY2snLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLnBhbm9yYW1hLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVyJywgaW50ZXJzZWN0czogaW50ZXJzZWN0cywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICBpZiAoICggdGhpcy5ob3Zlck9iamVjdCAmJiBpbnRlcnNlY3RzLmxlbmd0aCA+IDAgJiYgdGhpcy5ob3Zlck9iamVjdCAhPT0gaW50ZXJzZWN0X2VudGl0eSApXG5cdFx0XHRcdHx8ICggdGhpcy5ob3Zlck9iamVjdCAmJiBpbnRlcnNlY3RzLmxlbmd0aCA9PT0gMCApICl7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuaG92ZXJPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvdmVyT2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVybGVhdmUnLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXRpY2xlLmVuZCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5ob3Zlck9iamVjdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGludGVyc2VjdF9lbnRpdHkgJiYgaW50ZXJzZWN0cy5sZW5ndGggPiAwICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLmhvdmVyT2JqZWN0ICE9PSBpbnRlcnNlY3RfZW50aXR5ICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJPYmplY3QgPSBpbnRlcnNlY3RfZW50aXR5O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5ob3Zlck9iamVjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvdmVyT2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVyZW50ZXInLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHJldGljbGUgdGltZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5vcHRpb25zLmF1dG9SZXRpY2xlU2VsZWN0ICYmIHRoaXMub3B0aW9ucy5lbmFibGVSZXRpY2xlIHx8IHRoaXMudGVtcEVuYWJsZVJldGljbGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXRpY2xlLnN0YXJ0KCB0aGlzLm9uVGFwLmJpbmQoIHRoaXMsIGV2ZW50LCAnY2xpY2snICkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMudXNlck1vdXNlLnR5cGUgPT09ICdtb3VzZWRvd24nICYmIHRoaXMucHJlc3NFbnRpdHlPYmplY3QgIT0gaW50ZXJzZWN0X2VudGl0eSApIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXNzRW50aXR5T2JqZWN0ID0gaW50ZXJzZWN0X2VudGl0eTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMucHJlc3NFbnRpdHlPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzc0VudGl0eU9iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc3N0YXJ0LWVudGl0eScsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMudXNlck1vdXNlLnR5cGUgPT09ICdtb3VzZWRvd24nICYmIHRoaXMucHJlc3NPYmplY3QgIT0gaW50ZXJzZWN0ICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlc3NPYmplY3QgPSBpbnRlcnNlY3Q7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnByZXNzT2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdGFydCcsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMudXNlck1vdXNlLnR5cGUgPT09ICdtb3VzZW1vdmUnIHx8IHRoaXMub3B0aW9ucy5lbmFibGVSZXRpY2xlICkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggaW50ZXJzZWN0ICYmIGludGVyc2VjdC5kaXNwYXRjaEV2ZW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnNlY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnaG92ZXInLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5wcmVzc0VudGl0eU9iamVjdCAmJiB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlc3NFbnRpdHlPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3Ntb3ZlLWVudGl0eScsIG1vdXNlRXZlbnQ6IGV2ZW50IH0gKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnByZXNzT2JqZWN0ICYmIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzc09iamVjdC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdwcmVzc21vdmUnLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggIWludGVyc2VjdF9lbnRpdHkgJiYgdGhpcy5wcmVzc0VudGl0eU9iamVjdCAmJiB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXNzRW50aXR5T2JqZWN0LmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ3ByZXNzc3RvcC1lbnRpdHknLCBtb3VzZUV2ZW50OiBldmVudCB9ICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXNzRW50aXR5T2JqZWN0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggIWludGVyc2VjdCAmJiB0aGlzLnByZXNzT2JqZWN0ICYmIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJlc3NPYmplY3QuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAncHJlc3NzdG9wJywgbW91c2VFdmVudDogZXZlbnQgfSApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzc09iamVjdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbmZvc3BvdCBoYW5kbGVyXG4gICAgICAgIGlmICggaW50ZXJzZWN0ICYmIGludGVyc2VjdCBpbnN0YW5jZW9mIEluZm9zcG90ICkge1xuXG4gICAgICAgICAgICB0aGlzLmluZm9zcG90ID0gaW50ZXJzZWN0O1xuXHRcdFx0XG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICdjbGljaycgKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgfVxuXHRcdFx0XG5cbiAgICAgICAgfSBlbHNlIGlmICggdGhpcy5pbmZvc3BvdCApIHtcblxuICAgICAgICAgICAgdGhpcy5oaWRlSW5mb3Nwb3QoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXV0byByb3RhdGVcbiAgICAgICAgaWYgKCB0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZSAmJiB0aGlzLnVzZXJNb3VzZS50eXBlICE9PSAnbW91c2Vtb3ZlJyApIHtcblxuICAgICAgICAgICAgLy8gQXV0by1yb3RhdGUgaWRsZSB0aW1lclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCB0aGlzLmF1dG9Sb3RhdGVSZXF1ZXN0SWQgKTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmNvbnRyb2wgPT09IHRoaXMuT3JiaXRDb250cm9scyApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuT3JiaXRDb250cm9scy5hdXRvUm90YXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvUm90YXRlUmVxdWVzdElkID0gd2luZG93LnNldFRpbWVvdXQoIHRoaXMuZW5hYmxlQXV0b1JhdGUuYmluZCggdGhpcyApLCB0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZUFjdGl2YXRpb25EdXJhdGlvbiApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVx0XHRcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgY29udmVydGVkIGludGVyc2VjdFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGludGVyc2VjdHMgXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldENvbnZlcnRlZEludGVyc2VjdDogZnVuY3Rpb24gKCBpbnRlcnNlY3RzICkge1xuXG4gICAgICAgIGxldCBpbnRlcnNlY3Q7XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgaW50ZXJzZWN0cy5sZW5ndGg7IGkrKyApIHtcblxuICAgICAgICAgICAgaWYgKCBpbnRlcnNlY3RzW2ldLmRpc3RhbmNlID49IDAgJiYgaW50ZXJzZWN0c1tpXS5vYmplY3QgJiYgIWludGVyc2VjdHNbaV0ub2JqZWN0LnBhc3NUaHJvdWdoICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBpbnRlcnNlY3RzW2ldLm9iamVjdC5lbnRpdHkgJiYgaW50ZXJzZWN0c1tpXS5vYmplY3QuZW50aXR5LnBhc3NUaHJvdWdoICkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBpbnRlcnNlY3RzW2ldLm9iamVjdC5lbnRpdHkgJiYgIWludGVyc2VjdHNbaV0ub2JqZWN0LmVudGl0eS5wYXNzVGhyb3VnaCApIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0ID0gaW50ZXJzZWN0c1tpXS5vYmplY3QuZW50aXR5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcnNlY3QgPSBpbnRlcnNlY3RzW2ldLm9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnRlcnNlY3Q7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGlkZSBpbmZvc3BvdFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBoaWRlSW5mb3Nwb3Q6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIHRoaXMuaW5mb3Nwb3QgKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5mb3Nwb3Qub25Ib3ZlckVuZCgpO1xuXG4gICAgICAgICAgICB0aGlzLmluZm9zcG90ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgY29udHJvbCBiYXJcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZpcmVzIFZpZXdlciNjb250cm9sLWJhci10b2dnbGVcbiAgICAgKi9cbiAgICB0b2dnbGVDb250cm9sQmFyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3QgeyB3aWRnZXQgfSA9IHRoaXM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRvZ2dsZSBjb250cm9sIGJhciBldmVudFxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAZXZlbnQgVmlld2VyI2NvbnRyb2wtYmFyLXRvZ2dsZVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCB3aWRnZXQgKSB7XG5cbiAgICAgICAgICAgIHdpZGdldC5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdjb250cm9sLWJhci10b2dnbGUnIH0gKTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT24ga2V5IGRvd25cbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IFxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvbktleURvd246IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICAgICAgaWYgKCB0aGlzLm9wdGlvbnMub3V0cHV0ICYmIHRoaXMub3B0aW9ucy5vdXRwdXQgIT09ICdub25lJyAmJiBldmVudC5rZXkgPT09ICdDb250cm9sJyApIHtcblxuICAgICAgICAgICAgdGhpcy5vdXRwdXRFbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT24ga2V5IHVwXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25LZXlVcDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMub3V0cHV0RW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb250cm9sIGFuZCBjYWxsYmFja3NcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgVFdFRU4udXBkYXRlKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYWxsYmFja3MuZm9yRWFjaCggZnVuY3Rpb24oIGNhbGxiYWNrICl7IGNhbGxiYWNrKCk7IH0gKTtcblxuICAgICAgICB0aGlzLmNvbnRyb2wudXBkYXRlKCk7XG5cbiAgICAgICAgdGhpcy5zY2VuZS50cmF2ZXJzZSggZnVuY3Rpb24oIGNoaWxkICl7XG4gICAgICAgICAgICBpZiAoIGNoaWxkIGluc3RhbmNlb2YgSW5mb3Nwb3QgXG5cdFx0XHRcdCYmIGNoaWxkLmVsZW1lbnQgXG5cdFx0XHRcdCYmICggdGhpcy5ob3Zlck9iamVjdCA9PT0gY2hpbGQgXG5cdFx0XHRcdFx0fHwgY2hpbGQuZWxlbWVudC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgXG5cdFx0XHRcdFx0fHwgKGNoaWxkLmVsZW1lbnQubGVmdCAmJiBjaGlsZC5lbGVtZW50LmxlZnQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKVxuXHRcdFx0XHRcdHx8IChjaGlsZC5lbGVtZW50LnJpZ2h0ICYmIGNoaWxkLmVsZW1lbnQucmlnaHQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSApICkge1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5jaGVja1Nwcml0ZUluVmlld3BvcnQoIGNoaWxkICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5nZXRTY3JlZW5WZWN0b3IoIGNoaWxkLmdldFdvcmxkUG9zaXRpb24oIG5ldyBUSFJFRS5WZWN0b3IzKCkgKSApO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC50cmFuc2xhdGVFbGVtZW50KCB4LCB5ICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQub25EaXNtaXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKCB0aGlzICkgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJpbmcgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuICAgICAqIFJlbmRlciByZXRpY2xlIGxhc3RcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCB0aGlzLm1vZGUgPT09IE1PREVTLkNBUkRCT0FSRCB8fCB0aGlzLm1vZGUgPT09IE1PREVTLlNURVJFTyApIHtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5lZmZlY3QucmVuZGVyKCB0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSwgdGhpcy5wYW5vcmFtYSApO1xuICAgICAgICAgICAgdGhpcy5lZmZlY3QucmVuZGVyKCB0aGlzLnNjZW5lUmV0aWNsZSwgdGhpcy5jYW1lcmEgKTtcblx0XHRcdFxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCB0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSApO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5jbGVhckRlcHRoKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZVJldGljbGUsIHRoaXMuY2FtZXJhICk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFuaW1hdGVcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgYW5pbWF0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy5hbmltYXRlLmJpbmQoIHRoaXMgKSApO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBPbiBjaGFuZ2VcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG1vdXNlIGFuZCB0b3VjaCBldmVudCBvbiBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVnaXN0ZXJNb3VzZUFuZFRvdWNoRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgcGFzc2l2ZTogZmFsc2UgfTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJyAsIFx0dGhpcy5oYW5kbGVyTW91c2VEb3duLCBvcHRpb25zICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnICwgXHR0aGlzLmhhbmRsZXJNb3VzZU1vdmUsIG9wdGlvbnMgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnXHQgLCBcdHRoaXMuaGFuZGxlck1vdXNlVXAgICwgb3B0aW9ucyApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIFx0dGhpcy5oYW5kbGVyTW91c2VEb3duLCBvcHRpb25zICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcgICwgXHR0aGlzLmhhbmRsZXJNb3VzZVVwICAsIG9wdGlvbnMgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVyIG1vdXNlIGFuZCB0b3VjaCBldmVudCBvbiBjb250YWluZXJcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdW5yZWdpc3Rlck1vdXNlQW5kVG91Y2hFdmVudHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJyAsICB0aGlzLmhhbmRsZXJNb3VzZURvd24sIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnICwgIHRoaXMuaGFuZGxlck1vdXNlTW92ZSwgZmFsc2UgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnXHQsICB0aGlzLmhhbmRsZXJNb3VzZVVwICAsIGZhbHNlICk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgIHRoaXMuaGFuZGxlck1vdXNlRG93biwgZmFsc2UgKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJyAgLCAgdGhpcy5oYW5kbGVyTW91c2VVcCAgLCBmYWxzZSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHJldGljbGUgZXZlbnRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVnaXN0ZXJSZXRpY2xlRXZlbnQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmFkZFVwZGF0ZUNhbGxiYWNrKCB0aGlzLmhhbmRsZXJUYXAgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVyIHJldGljbGUgZXZlbnRcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdW5yZWdpc3RlclJldGljbGVFdmVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMucmVtb3ZlVXBkYXRlQ2FsbGJhY2soIHRoaXMuaGFuZGxlclRhcCApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSByZXRpY2xlIGV2ZW50XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIHVwZGF0ZVJldGljbGVFdmVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGNsaWVudFggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDIgKyB0aGlzLmNvbnRhaW5lci5vZmZzZXRMZWZ0O1xuICAgICAgICBjb25zdCBjbGllbnRZID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMjtcblxuICAgICAgICB0aGlzLnJlbW92ZVVwZGF0ZUNhbGxiYWNrKCB0aGlzLmhhbmRsZXJUYXAgKTtcbiAgICAgICAgdGhpcy5oYW5kbGVyVGFwID0gdGhpcy5vblRhcC5iaW5kKCB0aGlzLCB7IGNsaWVudFgsIGNsaWVudFkgfSApO1xuICAgICAgICB0aGlzLmFkZFVwZGF0ZUNhbGxiYWNrKCB0aGlzLmhhbmRsZXJUYXAgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBjb250YWluZXIgYW5kIHdpbmRvdyBsaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgcmVnaXN0ZXJFdmVudExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIFJlc2l6ZSBFdmVudFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScgLCB0aGlzLmhhbmRsZXJXaW5kb3dSZXNpemUsIHRydWUgKTtcblxuICAgICAgICAvLyBLZXlib2FyZCBFdmVudFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCB0aGlzLmhhbmRsZXJLZXlEb3duLCB0cnVlICk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnICAsIHRoaXMuaGFuZGxlcktleVVwXHQgLCB0cnVlICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5yZWdpc3RlciBjb250YWluZXIgYW5kIHdpbmRvdyBsaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgdW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gUmVzaXplIEV2ZW50XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJyAsIHRoaXMuaGFuZGxlcldpbmRvd1Jlc2l6ZSwgdHJ1ZSApO1xuXG4gICAgICAgIC8vIEtleWJvYXJkIEV2ZW50XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMuaGFuZGxlcktleURvd24sIHRydWUgKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdrZXl1cCcgICwgdGhpcy5oYW5kbGVyS2V5VXAgICwgdHJ1ZSApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc3Bvc2UgYWxsIHNjZW5lIG9iamVjdHMgYW5kIGNsZWFyIGNhY2hlXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLmRpc2FibGVBdXRvUmF0ZSgpO1xuXG4gICAgICAgIHRoaXMudHdlZW5MZWZ0QW5pbWF0aW9uLnN0b3AoKTtcbiAgICAgICAgdGhpcy50d2VlblVwQW5pbWF0aW9uLnN0b3AoKTtcblxuICAgICAgICAvLyBVbnJlZ2lzdGVyIGRvbSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAvLyByZWN1cnNpdmUgZGlzcG9zYWwgb24gM2Qgb2JqZWN0c1xuICAgICAgICBmdW5jdGlvbiByZWN1cnNpdmVEaXNwb3NlICggb2JqZWN0ICkge1xuXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSApIHtcblxuICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZURpc3Bvc2UoIG9iamVjdC5jaGlsZHJlbltpXSApO1xuICAgICAgICAgICAgICAgIG9iamVjdC5yZW1vdmUoIG9iamVjdC5jaGlsZHJlbltpXSApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggb2JqZWN0IGluc3RhbmNlb2YgUGFub3JhbWEgfHwgb2JqZWN0IGluc3RhbmNlb2YgSW5mb3Nwb3QgKSB7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIG9iamVjdCA9IG51bGw7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIG9iamVjdC5kaXNwYXRjaEV2ZW50ICl7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QuZGlzcGF0Y2hFdmVudCggJ2Rpc3Bvc2UnICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmVjdXJzaXZlRGlzcG9zZSggdGhpcy5zY2VuZSApO1xuXG4gICAgICAgIC8vIGRpc3Bvc2Ugd2lkZ2V0XG4gICAgICAgIGlmICggdGhpcy53aWRnZXQgKSB7XG5cbiAgICAgICAgICAgIHRoaXMud2lkZ2V0LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0ID0gbnVsbDtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgY2FjaGVcbiAgICAgICAgaWYgKCBUSFJFRS5DYWNoZSAmJiBUSFJFRS5DYWNoZS5lbmFibGVkICkge1xuXG4gICAgICAgICAgICBUSFJFRS5DYWNoZS5jbGVhcigpO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHZpZXdlciBieSBkaXNwb3NpbmcgYW5kIHN0b3BwaW5nIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSggdGhpcy5yZXF1ZXN0QW5pbWF0aW9uSWQgKTtcdFx0XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT24gcGFub3JhbWEgZGlzcG9zZVxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBvblBhbm9yYW1hRGlzcG9zZTogZnVuY3Rpb24gKCBwYW5vcmFtYSApIHtcblxuICAgICAgICBpZiAoIHBhbm9yYW1hIGluc3RhbmNlb2YgVmlkZW9QYW5vcmFtYSApIHtcblxuICAgICAgICAgICAgdGhpcy5oaWRlVmlkZW9XaWRnZXQoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBwYW5vcmFtYSA9PT0gdGhpcy5wYW5vcmFtYSApIHtcblxuICAgICAgICAgICAgdGhpcy5wYW5vcmFtYSA9IG51bGw7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvYWQgYWpheCBjYWxsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFVSTCB0byBiZSByZXF1ZXN0ZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgYWZ0ZXIgcmVxdWVzdCBjb21wbGV0ZXNcbiAgICAgKiBAbWVtYmVyT2YgVmlld2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgbG9hZEFzeW5jUmVxdWVzdDogZnVuY3Rpb24gKCB1cmwsIGNhbGxiYWNrID0gKCkgPT4ge30gKSB7XG5cbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICAgICAgY2FsbGJhY2soIGV2ZW50ICk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub3BlbiggJ0dFVCcsIHVybCwgdHJ1ZSApO1xuICAgICAgICByZXF1ZXN0LnNlbmQoIG51bGwgKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWaWV3IGluZGljYXRvciBpbiB1cHBlciBsZWZ0XG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFkZFZpZXdJbmRpY2F0b3I6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXM7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9hZFZpZXdJbmRpY2F0b3IgKCBhc3luY0V2ZW50ICkge1xuXG4gICAgICAgICAgICBpZiAoIGFzeW5jRXZlbnQubG9hZGVkID09PSAwICkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCB2aWV3SW5kaWNhdG9yRGl2ID0gYXN5bmNFdmVudC50YXJnZXQucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgdmlld0luZGljYXRvckRpdi5zdHlsZS53aWR0aCA9IHNjb3BlLnZpZXdJbmRpY2F0b3JTaXplICsgJ3B4JztcbiAgICAgICAgICAgIHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUuaGVpZ2h0ID0gc2NvcGUudmlld0luZGljYXRvclNpemUgKyAncHgnO1xuICAgICAgICAgICAgdmlld0luZGljYXRvckRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICB2aWV3SW5kaWNhdG9yRGl2LnN0eWxlLnRvcCA9ICcxMHB4JztcbiAgICAgICAgICAgIHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUubGVmdCA9ICcxMHB4JztcbiAgICAgICAgICAgIHZpZXdJbmRpY2F0b3JEaXYuc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xuICAgICAgICAgICAgdmlld0luZGljYXRvckRpdi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICB2aWV3SW5kaWNhdG9yRGl2LmlkID0gJ3Bhbm9sZW5zLXZpZXctaW5kaWNhdG9yLWNvbnRhaW5lcic7XG5cbiAgICAgICAgICAgIHNjb3BlLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggdmlld0luZGljYXRvckRpdiApO1xuXG4gICAgICAgICAgICBjb25zdCBpbmRpY2F0b3IgPSB2aWV3SW5kaWNhdG9yRGl2LnF1ZXJ5U2VsZWN0b3IoICcjaW5kaWNhdG9yJyApO1xuICAgICAgICAgICAgY29uc3Qgc2V0SW5kaWNhdG9yRCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHNjb3BlLnJhZGl1cyA9IHNjb3BlLnZpZXdJbmRpY2F0b3JTaXplICogMC4yMjU7XG4gICAgICAgICAgICAgICAgc2NvcGUuY3VycmVudFBhbm9BbmdsZSA9IHNjb3BlLmNhbWVyYS5yb3RhdGlvbi55IC0gVEhSRUUuTWF0aC5kZWdUb1JhZCggOTAgKTtcbiAgICAgICAgICAgICAgICBzY29wZS5mb3ZBbmdsZSA9IFRIUkVFLk1hdGguZGVnVG9SYWQoIHNjb3BlLmNhbWVyYS5mb3YgKSA7XG4gICAgICAgICAgICAgICAgc2NvcGUubGVmdEFuZ2xlID0gLXNjb3BlLmN1cnJlbnRQYW5vQW5nbGUgLSBzY29wZS5mb3ZBbmdsZSAvIDI7XG4gICAgICAgICAgICAgICAgc2NvcGUucmlnaHRBbmdsZSA9IC1zY29wZS5jdXJyZW50UGFub0FuZ2xlICsgc2NvcGUuZm92QW5nbGUgLyAyO1xuICAgICAgICAgICAgICAgIHNjb3BlLmxlZnRYID0gc2NvcGUucmFkaXVzICogTWF0aC5jb3MoIHNjb3BlLmxlZnRBbmdsZSApO1xuICAgICAgICAgICAgICAgIHNjb3BlLmxlZnRZID0gc2NvcGUucmFkaXVzICogTWF0aC5zaW4oIHNjb3BlLmxlZnRBbmdsZSApO1xuICAgICAgICAgICAgICAgIHNjb3BlLnJpZ2h0WCA9IHNjb3BlLnJhZGl1cyAqIE1hdGguY29zKCBzY29wZS5yaWdodEFuZ2xlICk7XG4gICAgICAgICAgICAgICAgc2NvcGUucmlnaHRZID0gc2NvcGUucmFkaXVzICogTWF0aC5zaW4oIHNjb3BlLnJpZ2h0QW5nbGUgKTtcbiAgICAgICAgICAgICAgICBzY29wZS5pbmRpY2F0b3JEID0gJ00gJyArIHNjb3BlLmxlZnRYICsgJyAnICsgc2NvcGUubGVmdFkgKyAnIEEgJyArIHNjb3BlLnJhZGl1cyArICcgJyArIHNjb3BlLnJhZGl1cyArICcgMCAwIDEgJyArIHNjb3BlLnJpZ2h0WCArICcgJyArIHNjb3BlLnJpZ2h0WTtcblxuICAgICAgICAgICAgICAgIGlmICggc2NvcGUubGVmdFggJiYgc2NvcGUubGVmdFkgJiYgc2NvcGUucmlnaHRYICYmIHNjb3BlLnJpZ2h0WSAmJiBzY29wZS5yYWRpdXMgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yLnNldEF0dHJpYnV0ZSggJ2QnLCBzY29wZS5pbmRpY2F0b3JEICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLmFkZFVwZGF0ZUNhbGxiYWNrKCBzZXRJbmRpY2F0b3JEICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGluZGljYXRvck9uTW91c2VFbnRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9ICcxJztcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgaW5kaWNhdG9yT25Nb3VzZUxlYXZlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZpZXdJbmRpY2F0b3JEaXYuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZW50ZXInLCBpbmRpY2F0b3JPbk1vdXNlRW50ZXIgKTtcbiAgICAgICAgICAgIHZpZXdJbmRpY2F0b3JEaXYuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbGVhdmUnLCBpbmRpY2F0b3JPbk1vdXNlTGVhdmUgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9hZEFzeW5jUmVxdWVzdCggRGF0YUltYWdlLlZpZXdJbmRpY2F0b3IsIGxvYWRWaWV3SW5kaWNhdG9yICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGN1c3RvbSBjb250cm9sIGl0ZW0gdG8gZXhpc3RpbmcgY29udHJvbCBiYXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbj17fV0gLSBTdHlsZSBvYmplY3QgdG8gb3ZlcndpcnRlIGRlZmF1bHQgZWxlbWVudCBzdHlsZS4gSXQgdGFrZXMgJ3N0eWxlJywgJ29uVGFwJyBhbmQgJ2dyb3VwJyBwcm9wZXJ0aWVzLlxuICAgICAqIEBtZW1iZXJPZiBWaWV3ZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhcHBlbmRDb250cm9sSXRlbTogZnVuY3Rpb24gKCBvcHRpb24gKSB7XG5cbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMud2lkZ2V0LmNyZWF0ZUN1c3RvbUl0ZW0oIG9wdGlvbiApO1x0XHRcblxuICAgICAgICBpZiAoIG9wdGlvbi5ncm91cCA9PT0gJ3ZpZGVvJyApIHtcblxuICAgICAgICAgICAgdGhpcy53aWRnZXQudmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKCBpdGVtICk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy53aWRnZXQuYmFyRWxlbWVudC5hcHBlbmRDaGlsZCggaXRlbSApO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgY2FjaGVkIGZpbGVzXG4gICAgICogQG1lbWJlck9mIFZpZXdlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNsZWFyQWxsQ2FjaGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBUSFJFRS5DYWNoZS5jbGVhcigpO1xuXG4gICAgfVxuXG59ICk7XG5cbmV4cG9ydCB7IFZpZXdlciB9OyIsImltcG9ydCB7IFRIUkVFX1JFVklTSU9OIH0gZnJvbSAnLi9Db25zdGFudHMnO1xuXG5pZiAoIFRIUkVFLlJFVklTSU9OICE9IFRIUkVFX1JFVklTSU9OICkge1xuXG4gICAgY29uc29sZS53YXJuKCBgdGhyZWUuanMgdmVyc2lvbiBpcyBub3QgbWF0Y2hlZC4gUGxlYXNlIGNvbnNpZGVyIHVzZSB0aGUgdGFyZ2V0IHJldmlzaW9uICR7VEhSRUVfUkVWSVNJT059YCApO1xuXG59IiwiLyoqXG4gKiBQYW5vbGVucy5qc1xuICogQGF1dGhvciBwY2hlbjY2XG4gKiBAbmFtZXNwYWNlIFBBTk9MRU5TXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vQ29uc3RhbnRzJztcbmV4cG9ydCB7IERhdGFJbWFnZSB9IGZyb20gJy4vRGF0YUltYWdlJztcbmV4cG9ydCB7IEltYWdlTG9hZGVyIH0gZnJvbSAnLi9sb2FkZXJzL0ltYWdlTG9hZGVyJztcbmV4cG9ydCB7IFRleHR1cmVMb2FkZXIgfSBmcm9tICcuL2xvYWRlcnMvVGV4dHVyZUxvYWRlcic7XG5leHBvcnQgeyBDdWJlVGV4dHVyZUxvYWRlciB9IGZyb20gJy4vbG9hZGVycy9DdWJlVGV4dHVyZUxvYWRlcic7XG5leHBvcnQgeyBNZWRpYSB9IGZyb20gJy4vYXV4aWxpYXJ5L01lZGlhJztcbmV4cG9ydCB7IFN0ZXJlbyB9IGZyb20gJy4vYXV4aWxpYXJ5L1N0ZXJlbyc7XG5leHBvcnQgeyBSZXRpY2xlIH0gZnJvbSAnLi9pbnRlcmZhY2UvUmV0aWNsZSc7XG5leHBvcnQgeyBJbmZvc3BvdCB9IGZyb20gJy4vaW5mb3Nwb3QvSW5mb3Nwb3QnO1xuZXhwb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQvV2lkZ2V0JztcbmV4cG9ydCB7IFBhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9QYW5vcmFtYSc7XG5leHBvcnQgeyBJbWFnZVBhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9JbWFnZVBhbm9yYW1hJztcbmV4cG9ydCB7IEVtcHR5UGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL0VtcHR5UGFub3JhbWEnO1xuZXhwb3J0IHsgQ3ViZVBhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9DdWJlUGFub3JhbWEnO1xuZXhwb3J0IHsgQmFzaWNQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvQmFzaWNQYW5vcmFtYSc7XG5leHBvcnQgeyBWaWRlb1Bhbm9yYW1hIH0gZnJvbSAnLi9wYW5vcmFtYS9WaWRlb1Bhbm9yYW1hJztcbmV4cG9ydCB7IEdvb2dsZVN0cmVldHZpZXdQYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvR29vZ2xlU3RyZWV0dmlld1Bhbm9yYW1hJztcbmV4cG9ydCB7IExpdHRsZVBsYW5ldCB9IGZyb20gJy4vcGFub3JhbWEvTGl0dGxlUGxhbmV0JztcbmV4cG9ydCB7IEltYWdlTGl0dGxlUGxhbmV0IH0gZnJvbSAnLi9wYW5vcmFtYS9JbWFnZUxpdHRsZVBsYW5ldCc7XG5leHBvcnQgeyBWaWRlb0xpdHRsZVBsYW5ldCB9IGZyb20gJy4vcGFub3JhbWEvVmlkZW9MaXR0bGVQbGFuZXQnO1xuZXhwb3J0IHsgQ2FtZXJhUGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL0NhbWVyYVBhbm9yYW1hJztcbmV4cG9ydCB7IFN0ZXJlb0ltYWdlUGFub3JhbWEgfSBmcm9tICcuL3Bhbm9yYW1hL1N0ZXJlb0ltYWdlUGFub3JhbWEnO1xuZXhwb3J0IHsgU3RlcmVvVmlkZW9QYW5vcmFtYSB9IGZyb20gJy4vcGFub3JhbWEvU3RlcmVvVmlkZW9QYW5vcmFtYSc7XG5leHBvcnQgeyBWaWV3ZXIgfSBmcm9tICcuL3ZpZXdlci9WaWV3ZXInO1xuaW1wb3J0ICcuL0NoZWNrJztcblxuLy8gZXhwb3NlIFRXRUVOXG5pbXBvcnQgVFdFRU4gZnJvbSAnQHR3ZWVuanMvdHdlZW4uanMnO1xud2luZG93LlRXRUVOID0gVFdFRU47Il0sIm5hbWVzIjpbIlRIUkVFLkNhY2hlIiwiVEhSRUUuVGV4dHVyZSIsIlRIUkVFLlJHQkZvcm1hdCIsIlRIUkVFLlJHQkFGb3JtYXQiLCJUSFJFRS5DdWJlVGV4dHVyZSIsIlRIUkVFLkV2ZW50RGlzcGF0Y2hlciIsIlRIUkVFLlZpZGVvVGV4dHVyZSIsIlRIUkVFLkxpbmVhckZpbHRlciIsIlRIUkVFLlZlY3RvcjIiLCJUSFJFRS5TcHJpdGVNYXRlcmlhbCIsIlRIUkVFLlNwcml0ZSIsIlRIUkVFLkNvbG9yIiwiVEhSRUUuQ2FudmFzVGV4dHVyZSIsInZlcnNpb24iLCJUSFJFRS5Eb3VibGVTaWRlIiwiVEhSRUUuVmVjdG9yMyIsIlRIUkVFLk1lc2giLCJUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeSIsIlRIUkVFLlVuaWZvcm1zVXRpbHMiLCJUSFJFRS5TaGFkZXJNYXRlcmlhbCIsIlRIUkVFLkJhY2tTaWRlIiwiVEhSRUUuT2JqZWN0M0QiLCJUSFJFRS5CdWZmZXJHZW9tZXRyeSIsIlRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSIsIlRIUkVFLk1lc2hCYXNpY01hdGVyaWFsIiwiVEhSRUUuU2hhZGVyTGliIiwiVEhSRUUuTWF0cml4NCIsIlRIUkVFLlF1YXRlcm5pb24iLCJUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5IiwiVEhSRUUuTWF0aCIsIlRIUkVFLk1PVVNFIiwiVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEiLCJUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEiLCJUSFJFRS5FdWxlciIsIlRIUkVFLlNjZW5lIiwiVEhSRUUuU3RlcmVvQ2FtZXJhIiwiVEhSRUUuTmVhcmVzdEZpbHRlciIsIlRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0IiwiVEhSRUUuUmF5Y2FzdGVyIiwiVEhSRUUuRnJ1c3R1bSIsIlRIUkVFLldlYkdMUmVuZGVyZXIiLCJUSFJFRS5SRVZJU0lPTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDWSxPQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztBQUNsRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtBQUNZLE9BQUMsT0FBTyxHQUFHLFFBQVE7QUFDL0I7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDWSxPQUFDLGNBQWMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUc7QUFDdEU7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDWSxPQUFDLGFBQWEsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO0FBQzdFO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDWSxPQUFDLFFBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHO0FBQzNEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtD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QyxHQUFHLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDdkI7Q0FDQSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO0NBQ3RDLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUN2RDtDQUNBLEVBQUU7QUFDRjtDQUNBLENBQUMsTUFBTSxFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQzFCO0NBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDckMsRUFBRSxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN0RDtDQUNBLEVBQUU7QUFDRjtDQUNBLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQztDQUNBLEVBQUUsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0M7Q0FDQSxFQUFFLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Q0FDN0IsR0FBRyxPQUFPLEtBQUssQ0FBQztDQUNoQixHQUFHO0FBQ0g7Q0FDQSxFQUFFLElBQUksR0FBRyxJQUFJLEtBQUssU0FBUyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDakQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsRUFBRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0NBQzlCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztBQUN0QztDQUNBLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0M7Q0FD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LENBQUMsR0FBRyxDQUFDLEVBQUU7Q0FDZCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMxRCxJQUFJO0FBQ0o7Q0FDQSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtDQUNkLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNyRSxJQUFJO0FBQ0o7Q0FDQSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2hHO0NBQ0EsR0FBRztBQUNIO0NBQ0EsRUFBRTtBQUNGO0NBQ0EsQ0FBQyxLQUFLLEVBQUU7QUFDUjtDQUNBLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDL0I7Q0FDQSxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDN0I7Q0FDQSxHQUFHO0FBQ0g7Q0FDQSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDN0I7Q0FDQSxHQUFHLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUNoRDtDQUNBLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDcEM7Q0FDQSxHQUFHO0FBQ0g7Q0FDQSxFQUFFLFNBQVMsRUFBRSxDQUFDLFlBQVk7QUFDMUI7Q0FDQSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZjtDQUNBLEdBQUcsT0FBTyxVQUFVLENBQUMsRUFBRTtBQUN2QjtDQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2Q7Q0FDQSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQ2QsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqQixLQUFLO0FBQ0w7Q0FDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ1osS0FBSztBQUNMO0NBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2IsSUFBSSxPQUFPLENBQUMsQ0FBQztBQUNiO0NBQ0EsSUFBSSxDQUFDO0FBQ0w7Q0FDQSxHQUFHLEdBQUc7QUFDTjtDQUNBLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUMzQztDQUNBLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBQztDQUM1QixHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUM7Q0FDNUIsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2xCLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNuQjtDQUNBLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNsRztDQUNBLEdBQUc7QUFDSDtDQUNBLEVBQUU7QUFDRjtDQUNBLENBQUMsQ0FBQztDQUNGLEtBQUssQ0FBQyxPQUFPLEdBQUdBLFNBQU87O0NDMzdCdkI7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFFBQVEsR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEdBQUc7Q0FDdEQ7Q0FDQSxJQUFJLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQzVDO0NBQ0EsSUFBSSxRQUFRLEdBQUcsUUFBUSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDMUM7Q0FDQSxJQUFJSCxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQzlCO0NBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUMzQjtDQUNBLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEtBQUssU0FBUyxHQUFHLFFBQVEs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Q0FBQyxPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsRUFBRTtBQUMzRTtDQUNBLFFBQVEsU0FBUyxVQUFVO0FBQzNCO0NBQ0EsUUFBUSxLQUFLLENBQUM7QUFDZDtDQUNBLFlBQVksTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO0NBQzFGLFlBQVksTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQzFGO0NBQ0EsWUFBWSxNQUFNLE1BQU0sR0FBR1UsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7Q0FDN0UsWUFBWSxNQUFNLE1BQU0sR0FBR0EsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDN0U7Q0FDQSxZQUFZLEtBQUssSUFBSSxDQUFDLFFBQVEsR0FBRztDQUNqQyxnQkFBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0NBQ3BFLGdCQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Q0FDcEUsZ0JBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQzNFLGdCQUFnQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxD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QUFlLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7QUFDMUY7Q0FDQTtDQUNBLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUNsRjtDQUNBO0NBQ0EsUUFBUSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQzlEO0NBQ0EsUUFBUSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQzdDO0NBQ0E7Q0FDQSxRQUFRLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7QUFDcEY7Q0FDQTtDQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDL0I7Q0FDQSxRQUFRLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUNoRSxRQUFRLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FDNUMsUUFBUSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFD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QUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7QUFDbEY7Q0FDQSxTQUFTO0FBQ1Q7Q0FDQSxLQUFLO0FBQ0w7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksbUJBQW1CLEVBQUUsV0FBVyxVQUFVLEdBQUc7QUFDakQ7Q0FDQSxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsWUFBWSxhQUFhLEdBQUc7QUFDdEQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQztBQUMxRjtDQUNBLFNBQVM7QUFDVDtDQUNBLEtBQUs7QUFDTDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxhQUFhLEVBQUUsV0FBVyxVQUFVLEdBQUc7QUFDM0M7Q0FDQSxRQUFRLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDaEM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxRQUFRLElBQUksTUFBTSxHQUFHLEVBQUUsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUNsRztDQUNBLEtBQUs7QUFDTDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxFQUFFLEdBQUc7QUFDdkM7Q0FDQSxRQUFRLEtBQUssRUFBRSxHQUFHO0FBQ2xCO0NBQ0EsWUFBWSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztBQUM1QztDQUNBLFNBQVM7QUFDVDtDQUNBLEtBQUs7QUFDTDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElB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QUc7QUFDcEM7Q0FDQSxRQUFRLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMvQjtDQUNBLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0NBQzdGLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0NBQzdGLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0NBQzFDLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUM1QjtDQUNBLEtBQUs7QUFDTDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksV0FBVyxFQUFFLFdBQVcsS0FBSyxHQUFHO0FBQ3BDO0NBQ0EsUUFBUSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Q0FDL0IsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7Q0FDMUMsUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQzVCO0NBQ0EsS0FBSztBQUNMO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxTQUFTLEVBQUUsV0FBVyxLQUFLLEdBQUc7QUFDbEM7Q0FDQSxRQUFRLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUM3QjtDQUNBLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3hDO0NBQ0EsUUFBUSxNQUFNLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJ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
