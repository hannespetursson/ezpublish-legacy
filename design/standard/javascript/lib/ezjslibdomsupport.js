//
// Created on: <14-Jul-2004 14:18:58 dl>
//
// Copyright (C) 1999-2002 eZ systems as. All rights reserved.
//
// This source file is part of the eZ publish (tm) Open Source Content
// Management System.
//
// This file may be distributed and/or modified under the terms of the
// "GNU General Public License" version 2 as published by the Free
// Software Foundation and appearing in the file LICENSE.GPL included in
// the packaging of this file.
//
// Licencees holding valid "eZ publish professional licences" may use this
// file in accordance with the "eZ publish professional licence" Agreement
// provided with the Software.
//
// This file is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING
// THE WARRANTY OF DESIGN, MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE.
//
// The "eZ publish professional licence" is available at
// http://ez.no/home/licences/professional/. For pricing of this licence
// please contact us via e-mail to licence@ez.no. Further contact
// information is available at http://ez.no/home/contact/.
//              
// The "GNU General Public License" (GPL) is available at
// http://www.gnu.org/copyleft/gpl.html.
//
// Contact licence@ez.no if any conditions of this licencing isn't clear to
// you.
//
            
/*! \file ezjslibdomsupport.js 
*/

/*!    
    \brief
    
    Functions which works with HTMLElements:
        ezjslib_findHTMLChildTextNode,
        ezjslib_setTextToHTMLChildTextNode,
        ezjslib_removeHTMLChildTextNode,
        ezjslib_createHTMLChildTextNode,
        ezjslib_setHTMLNodeClassStyle,
        ezjslib_getHTMLNodeById,
        ezjslib_getHTMLChildNodeByTag,
        ezjslib_getHTMLChildNodeByProperty,
	ezjslib_getStyleObject.
*/        

/*! 
    Finds the text of \a node
*/
function ezjslib_findHTMLChildTextNode( node )
{
    if( node )
    {
        for ( var i = 0; i < node.childNodes.length; i++ ) 
        {
            if ( node.childNodes[i].nodeType == 3 )
            {
                return node.childNodes[i];
            }
        }
    }

    return null;
}

/*! 
    Finds the text of \a node and replaces it with \a text
*/
function ezjslib_setTextToHTMLChildTextNode( node, text )
{
    var textNode = ezjslib_findHTMLChildTextNode( node );
    if( textNode != null )
    {
        textNode.data = text;
    }
}

/*! 
    Finds text of \a node and removes it
*/
function ezjslib_removeHTMLChildTextNode( node )
{
    var textNode = ezjslib_findHTMLChildTextNode( node );
    if( textNode != null )
    {
        node.removeChild( textNode );
    }
}

/*! 
    Creates and appends child text node with text \a text to node \a node
*/
function ezjslib_createHTMLChildTextNode( node, text )
{
    if ( node != null )
    {
        var textNode = document.createTextNode( text );
        node.appendChild( textNode );
    }
}

/*! 
    \return HTMLElement with id \a node_id
*/
function ezjslib_getHTMLNodeById( node_id )
{
    return document.getElementById( node_id );
}

/*! 
    \return a FIRST child HTMLElement of \a node with tag \a tag
*/
function ezjslib_getHTMLChildNodeByTag( node, tag )
{
    for ( var i = 0; i < node.childNodes.length; ++i )
    {
        var child = node.childNodes[i];

        if ( child["tagName"] && child.tagName.toLowerCase() == tag )
        {
            return child;
        }
    }

    return null;
}

/*! 
    \return a FIRST child HTMLElement of \a node with property name 
    \a attrName and property value \a attrValue
*/
function ezjslib_getHTMLChildNodeByProperty( node, propName, propValue )
{
    if( node )
    {
        for ( var i = 0; i < node.childNodes.length; ++i )
        {
            var child   = node.childNodes[i];
            var value   = child[propName];
            
            if ( value && value == propValue )
            {
                return child;
            }
        }
    }

    return null;
}

/*!
    Sets 'className' property of node \a node to value \a styleClassName
*/
function ezjslib_setHTMLNodeClassStyle( node, styleClassName )
{
    if ( node )
    {
        node['className'] = styleClassName;
    }
}

/*!
  Get the style object for the element with id objID
 */
function ezjslib_getStyleObject( objID )
{
    if( document.getElementById && document.getElementById( objID ) ) // DOM
    {
        return document.getElementById( objID ).style;
    }
    else if ( document.all && document.all( objID ) ) // IE
    {
        return document.all( objID ).style;
    }
    else if ( document.layers && document.layers[objID] )
    {
        return false; // Netscape 4.x Not currently supported.
    }
    else
    {
        return false;
    }
}