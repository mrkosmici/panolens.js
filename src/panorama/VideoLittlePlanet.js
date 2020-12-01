import { LittlePlanet } from './LittlePlanet';
import * as THREE from 'three';

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

export { VideoLittlePlanet };