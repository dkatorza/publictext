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
  const [selectedText, setSelectedText] = useState(null);
  const editableDiv = useRef(
    document.execCommand('defaultParagraphSeparator', false, 'p')
  );

  useEffect(() => {
    let currSelection = window.getSelection();
    setSelectedText(currSelection);
  }, [selectedText]);

  const changeElement = () => {
    if (!selectedText.toString()) return;
    let range = selectedText.getRangeAt(0);

    console.log(selectedText.focusNode.innerHTML);

    console.log(selectedText.type);
    let content = range.extractContents();
    let element = document.createElement('strong');

    element.appendChild(content);
    range.insertNode(element);
  };

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

  const onCommandFire = (command) => {
    switch (command) {
      case 'createLink':
        let selection = document.getSelection();
        document.execCommand(`${command}`, false, `${cmdValue}` || '');
        selection.anchorNode.parentElement.target = '_blank';
        break;
      case 'insertHtml':
        document.execCommand(
          `${command}`,
          false,
          `` ||
            '<iframe src="https://oembed.link/https://youtu.be/EyFJKKLUudc" frameborder="0"  allowfullscreen></iframe>'
        );
        break;
      default:
        document.execCommand(`${command}`, false, `${cmdValue}` || '');
    }
  };

  const setColor = (e) => {
    setCmdValue(e.target.value);
    onCommandFire('hiliteColor');
  };

  return (
    <div className='editor'>
      <section>
        <div className='editor-controllers'>
          <FontAwesomeIcon icon={faHeading} className='icon-controller' />
          <button className='icon-controller' onClick={() => changeElement()}>
            <FontAwesomeIcon icon={faBold} className='icon-controller' />
          </button>
          <button
            className='icon-controller'
            onClick={() => onCommandFire('italic')}>
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button
            className='icon-controller'
            onClick={() => onCommandFire('underline')}>
            <FontAwesomeIcon icon={faUnderline} className='icon-controller' />
          </button>
          <button
            className='icon-controller'
            onClick={() => onCommandFire('strikeThrough')}>
            <FontAwesomeIcon icon={faStrikethrough} />
          </button>

          <FontAwesomeIcon icon={faFont} className='icon-controller' />
          <FontAwesomeIcon icon={faPaintbrush} className='icon-controller' />
          <button
            className='icon-controller'
            onClick={() => onCommandFire('hiliteColor')}>
            <FontAwesomeIcon icon={faHighlighter} />
          </button>
          <button
            className='icon-controller'
            onClick={() => onCommandFire('insertUnorderedList')}>
            <FontAwesomeIcon icon={faList} />
          </button>
          <button
            className='icon-controller'
            onClick={() => onCommandFire('insertOrderedList')}>
            <FontAwesomeIcon icon={faListOl} />
          </button>
          <FontAwesomeIcon icon={faAlignLeft} className='icon-controller' />
          <button
            className='icon-controller'
            onClick={() => onCommandFire('indent')}>
            <FontAwesomeIcon icon={faIndent} />
          </button>
          <button
            className='icon-controller'
            onClick={() => onCommandFire('outdent')}>
            <FontAwesomeIcon icon={faOutdent} />
          </button>
          <FontAwesomeIcon icon={faParagraph} className='icon-controller' />
          <button
            className='icon-controller'
            onClick={() => onCommandFire('createLink')}>
            <FontAwesomeIcon icon={faLink} />
          </button>
          <FontAwesomeIcon icon={faImage} className='icon-controller' />
          <button
            className='icon-controller'
            onClick={() => onCommandFire('insertHtml')}>
            <FontAwesomeIcon icon={faFilm} />
          </button>
          <input
            type='color'
            onChange={(e) => {
              setColor(e);
            }}
          />
        </div>
      </section>
      <section>
        <div contentEditable className='editor-panel' ref={editableDiv}></div>
      </section>
    </div>
  );
};
