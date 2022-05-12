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

// if (
//   (targetElement.length > 0 &&
//     range.startContainer.nextSibling !== null &&
//     range.startContainer.nextSibling.tagName.toLowerCase() === tag) ||
//   (targetElement.length > 0 &&
//     range.startContainer.parentNode !== null &&
//     range.startContainer.parentNode.tagName.toLowerCase() === tag)
