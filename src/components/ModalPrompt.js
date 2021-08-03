const ModalPrompt = () => {
  return (
    <div className="PromptModal">
      <img src={promptImage} alt="icone"></img>
      <span>{promptTitle}</span>
      <p>{promptMessage}</p>
      <button>{PromptButtonLabel}</button>
    </div>
  );
};

export default ModalPrompt;
