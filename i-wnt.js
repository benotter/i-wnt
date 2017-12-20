/**
 * i-wnt.js
 * Main file
 * (C) Ben Otter, 2017
 */


/** 
 * IWntIt Class 
 */
class IWntIt 
{
    /**
     * Makes a IWntIt Obj
     * @param {{[prop:string]:string} | string} wntObj - wntObj
     */
    constructor ( wntObj )
    {
        this.wntMap = wntObj;
    }
    /**
     * Gets Values from an Object
     * @param {*} src - Thing To Grab From
     * @return {{[prop:string]:any}}
     */
    from ( src )
    {
        if ( typeof this.wntMap === 'string' )
            return this.getP( src, this.wntMap );

        let wnt = this.wntMap, ret = {};

        for ( let p in wnt )
        {
            if ( !wnt.hasOwnProperty( p ) )
                continue;

            if ( typeof wnt[ p ] === 'string' )
                ret[ p ] = this.getP( src, wnt[ p ] );
            else if ( typeof wnt[ p ] === 'object' )
            {
                let { names, values, path } = wnt[ p ];
                let valO = this.getP( src, path );

                ret[ p ] = {};

                if ( typeof values === 'string' )
                    for ( let valP in valO )
                        ret[ p ][ !!names ? this.getP( valO[ valP ], names ) : valP ] = this.getP( valO[ valP ], values );
                else if ( values instanceof IWntIt )
                    for ( let valP in valO )
                        ret[ p ][ !!names ? this.getP( valO[ valP ], names ) : valP ] = values.from( valO[ valP ] );
                else if ( typeof values === 'object' )
                    for ( let valP in valO )
                    {
                        let n = !!names ? this.getP( valO[ valP ], names ) : valP;
                        ret[ p ][ n ] = {};
                        for ( let valProp in values )
                            ret[ p ][ n ][ valProp ] = this.getP( valO[ valP ], values[ valProp ] );
                    }
            }
        }

        return ret;
    }
    /**
     * Gets the spec'ed prop from the spec'ed obj
     * @param {*} src - Thing To Grab From
     * @param {string} p - Full path of wnted prop
     * @return {*}
     */
    getP ( src, p )
    {
        let delim = this.getDelim( p ), delimR = new RegExp( '\\' + delim, 'g' );
        let pS = p.replace( /\\\./g, delim );
        let v = src, pA = pS.split( '.' );

        while ( pA.length > 0 )
            if ( ( v = v[ pA.shift().replace( delimR, '.' ) ] ) === ( void 0 ) || v === null )
                break;

        return v;
    }
    /**
     * Gets a safe deliminator for given string
     * @param {string} str - String to get safe deliminator for
     * @return {string}
     */
    getDelim ( str )
    {
        let delim = null;
        do { delim = `\\_${ Math.random().toString().substr( 2, 6 ) }`; } while ( str.match( new RegExp( delim, 'g' ) ) );
        return delim;
    }
}
/**
 * Gets an iWnt Object with the given wntObj or String for its constructor
 * @param { string | { [prop: string]: string | { path: string, names?: string, values: string | { [propName: string]: string} } } } wntObj - String or wntObj Formatted Object
 * @return {IWntIt}
 */
function iWnt ( wntObj )
{
    return new IWntIt( wntObj );
}

iWnt.IWntIt = IWntIt;

exports.iWnt = iWnt;
exports.IWntIt = IWntIt;