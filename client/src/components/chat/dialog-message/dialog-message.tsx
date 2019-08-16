import * as React from 'react';
import EmojiPicker from 'emoji-picker-react';

import {IconSend, IconAttach} from 'components/icons';
import {styleNames} from 'utils/stylenames';

import styles from './dialog-message.scss';

const sn = styleNames(styles);

const setCursorToEnd = element => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(element, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
};

export const DialogMessage = ({onSubmit}) => {

    const [isEmoji, toggleEmoji] = React.useState(false);
    const inputRef = React.createRef<HTMLDivElement>();
    const attachmentRef = React.createRef<HTMLDivElement>();

    const [attachments, setAttachments] = React.useState([]);

    const inputAreaHandler = ({ ctrlKey, keyCode}) => {
        const {current: inputField} = inputRef;

        if (ctrlKey && keyCode === 13) {
            const span = document.createTextNode('\n ');

            inputField.appendChild(span);
            setCursorToEnd(span);

            return undefined;
        }

        if (keyCode === 13) {
            if (inputField.innerText || attachments.length) {
                onSubmit(inputField.innerText, attachments);
            }
            clearInput();
        }

    };

    const clearInput = () => {
        const {current: inputField} = inputRef;
        const {current: attachments} = attachmentRef;

        setTimeout(() => {
            inputField.innerHTML = null;
            inputField.innerText = null;
            attachments.innerHTML = null;
        }, 0)
    };


    const addEmoji = (e) => {
        toggleEmoji(!isEmoji);
        const {current: inputField} = inputRef;

        inputField.innerHTML = inputField.innerText.replace('\n ', '\n') + `&#x${e} `;
        setCursorToEnd(inputField);

    };

    const handlePastBuffer = (e) => {
        const {clipboardData} = e;

        if(clipboardData.files.length) {
            fileUpload(clipboardData.files[0])
        }
    };

    const fileUpload = (file) => {
      // @ts-ignore
        const reader = new FileReader();
      // @ts-ignore
        const img = document.createElement('img');

      reader.onload = ({target}) => {
          img.src = window.URL.createObjectURL(file);
          img.style.height = '30px';
          attachmentRef.current.appendChild(img);
          // @ts-ignore
          setAttachments(attachments => ([...attachments, {fileName: file.name, bufferArray: target.result}]))
      };

      reader.readAsArrayBuffer(file)
    };

    return (
        <React.Fragment>
            <div className={sn('dialog-message')}>
                <div className={sn('dialog-message__attach')}>
                    <IconAttach />
                </div>
                <div
                    ref={inputRef}
                    className={sn('dialog-message__input')}
                    onKeyDown={inputAreaHandler}
                    onPaste={handlePastBuffer}
                />
                <div className={sn('dialog-message__emoji')}>
                    <div
                        onClick={() => toggleEmoji(!isEmoji)}
                        className={sn('dialog-message__emoji-picker')}>
                    </div>
                    {isEmoji &&
                        <div className={sn('dialog-message__emoji-container')}>
                            <EmojiPicker
                                preload
                                onEmojiClick={addEmoji}
                            />
                        </div>}
                </div>
                <div
                    onClick={() => {
                        if (inputRef.current.innerText) {
                            onSubmit(inputRef.current.innerText);
                            clearInput();
                        }
                    }}
                    className={sn('dialog-message__send')}>
                    <IconSend />
                </div>
            </div>
            <div
                ref={attachmentRef}
                className={sn('dialog-attachment')}
            />
        </React.Fragment>
    );
};
