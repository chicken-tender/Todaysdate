import React from "react";
import styled from "styled-components";

const StyledPopUp = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
  }
  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  .modal .cancelBtn,
  .modal .confirmBtn {
    background-color: var(--line-color);
    color: var(--text-color);
  }

  .modal .cancelBtn:hover,
  .modal .confirmBtn:hover {
    background-color: var(--point-color);
    color: #ffffff;
  }

  .modal > section {
    /* width: 90%; */
    max-width: 400px;
    min-width: 300px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    border: 1px solid var(--point-color);
    box-shadow: rgba(0, 0, 0, 0) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  section > header {
    padding: 14px 64px 12px 12px;
    font-weight: 700;
    font-size: 1.2rem;
  }
  .modal > section > main {
    padding: 16px;
    text-align: center;
  }
  .modal > section > footer {
    padding: 0 10px 10px 0;
    text-align: right;
  }
  .modal > section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;
    margin: 0 5px;
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.3s;
  }
  input {
    border: 0.5px solid var(--input-text-color);
    border-radius: 4px;
    height: 40px;
    width: 250px;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid var(--line-color);
  margin-bottom: 1rem;
  width: 90%;
  margin: 0 auto;
`;

export const PopUpMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  line-height: 1.5rem;
`;

const UserPopUp = (props) => {
  const {
    open,
    confirm,
    close,
    type,
    header,
    children,
    confirmText,
    closeText,
    showInputField,
    inputValue,
    handleInputChange,
  } = props;

  return (
    <StyledPopUp>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {header}
              {/* <button onClick={close}>&times;</button> */}
            </header>
            <Divider />
            <main>
              {children}
              {showInputField && (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              )}
            </main>
            <footer>
              {type === "confirm" && confirmText && closeText ? (
                <>
                  <button className="confirmBtn" onClick={confirm}>
                    {confirmText}
                  </button>
                  <button className="cancelBtn" onClick={close}>
                    {closeText}
                  </button>
                </>
              ) : (
                <button className="cancelBtn" onClick={close}>
                  {closeText}
                </button>
              )}
            </footer>
          </section>
        )}
      </div>
    </StyledPopUp>
  );
};

export default UserPopUp;
