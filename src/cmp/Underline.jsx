import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faFont,
  faHighlighter,
  faHeading,
  faList,
  faAlignLeft,
  faIndent,
  faOutdent,
  faParagraph,
  faImage,
  faFilm,
  faListOl,
  faLink,
  faPaintbrush,
} from '@fortawesome/free-solid-svg-icons';

export const Underline = () => {
  const editableDiv = useRef();

  // Need to add listener for the Enter key so new line
  // will start with 'p' tag and note with default 'div'
  // document.execCommand('defaultParagraphSeparator', false, 'p')

  // This funciton will get the selected text inside editor-panel div.
  const getTextSelection = () => {
    const selection = window.getSelection();
    return selection;
  };

  // After the removeal of the tag element the selection will reset.
  // This function will reassign the range on the text after the removal of the tag,
  // so we can keep adding or removing the tag on the same node.
  const setRangeSelection = (selectedText, range, textNode) => {
    selectedText.removeRange(range);
    range = document.createRange();
    range.setStart(textNode, 0);
    range.setEnd(textNode, textNode.length);
    selectedText.addRange(range);
  };

  // This function will create new element and insert it in the node.
  const createNewElement = (range, tag) => {
    const content = range.extractContents();
    const element = document.createElement(tag);
    element.appendChild(content);
    range.insertNode(element);
  };

  // This main function will set the Tag or remove it based on the conditions.
  const setElementTag = (tag) => {
    const selectedText = getTextSelection();
    if (!selectedText.toString()) return;

    let range = selectedText.getRangeAt(0); //Setting the range based on the selection.
    const textNode = document.createTextNode(selectedText.toString());

    const targetTag = document.getElementsByTagName(tag);

    // Checking if the tag exist in the document.
    // Checking if the nodeType exist in the selection.
    // If not, we know that we need to create new one.

    if (targetTag.length > 0) {
      for (let i = 0; i < targetTag.length; i++) {
        if (
          selectedText.containsNode(
            document.getElementsByTagName(tag).item(i),
            true
          )
        ) {
          document.getElementsByTagName(tag)[i].after(textNode);
          range.extractContents();
        } else {
          createNewElement(range, tag); //fix - does not create a new element.
        }
      }
      setRangeSelection(selectedText, range, textNode);
    } else {
      createNewElement(range, tag);
    }
  };

  return (
    <div className='editor'>
      <section>
        <div className='editor-controllers'>
          <FontAwesomeIcon icon={faHeading} className='icon-controller' />
          <button
            className='icon-controller'
            onClick={() => setElementTag('strong')}>
            <FontAwesomeIcon icon={faBold} className='icon-controller' />
          </button>
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('italic')}
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button
            className='icon-controller'
            onClick={() => setElementTag('u')}>
            <FontAwesomeIcon icon={faUnderline} className='icon-controller' />
          </button>
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('strikeThrough')}
          >
            <FontAwesomeIcon icon={faStrikethrough} />
          </button>

          <FontAwesomeIcon icon={faFont} className='icon-controller' />
          <FontAwesomeIcon icon={faPaintbrush} className='icon-controller' />
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('hiliteColor')}
          >
            <FontAwesomeIcon icon={faHighlighter} />
          </button>
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('insertUnorderedList')}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('insertOrderedList')}
          >
            <FontAwesomeIcon icon={faListOl} />
          </button>
          <FontAwesomeIcon icon={faAlignLeft} className='icon-controller' />
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('indent')}
          >
            <FontAwesomeIcon icon={faIndent} />
          </button>
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('outdent')}
          >
            <FontAwesomeIcon icon={faOutdent} />
          </button>
          <FontAwesomeIcon icon={faParagraph} className='icon-controller' />
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('createLink')}
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <FontAwesomeIcon icon={faImage} className='icon-controller' />
          <button
            className='icon-controller'
            // onClick={() => onCommandFire('insertHtml')}
          >
            <FontAwesomeIcon icon={faFilm} />
          </button>
          <input
            type='color'
            // onChange={(e) => {
            //   setColor(e);
            // }}
          />
        </div>
      </section>
      <section>
        <div contentEditable className='editor-panel' ref={editableDiv}></div>
      </section>
    </div>
  );
};
