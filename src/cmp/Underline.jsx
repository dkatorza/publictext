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
  const editableDiv = useRef(
    document.execCommand('defaultParagraphSeparator', false, 'p')
  );

  const getTextSelection = () => {
    const selection = window.getSelection();
    return selection;
  };

  const setRangeSelection = (selectedText, range, textNode) => {
    selectedText.removeRange(range);
    range = document.createRange();
    range.setStart(textNode, 0);
    range.setEnd(textNode, textNode.length);
    return selectedText.addRange(range);
  };

  const createNewElement = (range, tag) => {
    const content = range.extractContents();
    const element = document.createElement(tag);
    element.appendChild(content);
    range.insertNode(element);
  };

  const setElementTag = (tag) => {
    const selectedText = getTextSelection();
    if (!selectedText.toString()) return;

    let range = selectedText.getRangeAt(0);
    const textNode = document.createTextNode(selectedText.toString());
    const targetElement = document.getElementsByTagName(tag);

    if (
      (targetElement.length > 0 &&
        range.startContainer.nextSibling !== null &&
        range.startContainer.nextSibling.tagName.toLowerCase() === tag) ||
      (targetElement.length > 0 &&
        range.startContainer.parentNode !== null &&
        range.startContainer.parentNode.tagName.toLowerCase() === tag)
    ) {
      for (let i = 0; i < targetElement.length; i++) {
        if (
          selectedText.containsNode(
            document.getElementsByTagName(tag).item(i),
            true
          )
        ) {
          document.getElementsByTagName(tag)[i].replaceWith(textNode);
        }
      }
      setRangeSelection(selectedText, range, textNode);
      return;
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
            // onClick={() => onCommandFire('underline')}
          >
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
