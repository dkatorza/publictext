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
  const [cmdValue, setCmdValue] = useState('');
  const editableDiv = useRef(
    document.execCommand('defaultParagraphSeparator', false, 'p')
  );

  const setElementTag = (tag) => {
    let selectedText = window.getSelection();
    if (!selectedText.toString()) return;

    let range = selectedText.getRangeAt(0);
    const targetElement = document.getElementsByTagName(tag);
    const regex = new RegExp(tag);
    let textNode = document.createTextNode(selectedText.toString());

    if (
      (targetElement.length > 0 &&
        range.startContainer.nextSibling !== null &&
        range.startContainer.nextSibling.tagName.toLowerCase() === tag) ||
      (targetElement.length > 0 &&
        range.startContainer.parentNode !== null &&
        range.startContainer.parentNode.tagName.toLowerCase() === tag)
    ) {
      if (regex.test(targetElement.item(0).tagName.toLowerCase())) {
        // console.log('regex test worked');

        for (let i = 0; i < targetElement.length; i++) {
          if (
            selectedText.containsNode(
              document.querySelectorAll(tag).item(i),
              true
            )
          ) {
            console.log('found tag position:', i);

            document.getElementsByTagName(tag)[i].replaceWith(textNode);
          }
        }

        selectedText.removeAllRanges();
        range = document.createRange();

        range.setStart(textNode, 0);
        range.setEnd(textNode, textNode.length);
        selectedText.addRange(range);

        return;
      } else {
        console.log('test not working');
      }
    } else {
      console.log('newly created');
      const content = range.extractContents();
      const element = document.createElement(tag);

      element.appendChild(content);
      range.insertNode(element);
    }
  };

  // #Keeping this for future reference
  // const onCommandFire = (command) => {
  //   if (command === 'createLink') {
  //     let selection = document.getSelection();
  //     document.execCommand(`${command}`, false, `${cmdValue}` || '');
  //     selection.anchorNode.parentElement.target = '_blank';
  //   }
  //   // if (!window.getSelection().toString()) return;
  //   // const selectedTextArea = window.getSelection();
  //   // const selectedRange = selectedTextArea.getRangeAt(0);
  //   // setHighlightText(
  //   //   selectedTextArea.toString().substring(0, selectedRange.endOffset)
  //   // );
  //   // document.execCommand(`${command}`, false, `${cmdValue}` || '');
  // };

  // #Keeping this for future reference
  // const onCommandFire = (command) => {
  //   switch (command) {
  //     case 'createLink':
  //       let selection = document.getSelection();
  //       document.execCommand(`${command}`, false, `${cmdValue}` || '');
  //       selection.anchorNode.parentElement.target = '_blank';
  //       break;
  //     case 'insertHtml':
  //       document.execCommand(
  //         `${command}`,
  //         false,
  //         `` ||
  //           '<iframe src="https://oembed.link/https://youtu.be/EyFJKKLUudc" frameborder="0"  allowfullscreen></iframe>'
  //       );
  //       break;
  //     default:
  //       document.execCommand(`${command}`, false, `${cmdValue}` || '');
  //   }
  // };

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
