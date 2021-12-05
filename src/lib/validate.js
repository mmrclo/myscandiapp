export function setValidation(inputID,notify) {
    const input = document.getElementById(inputID);
    const validityState = input.validity;
  
    if(validityState.valueMissing) {
      input.setCustomValidity('Please, submit required data');
    } else if (validityState.patternMismatch) {
      input.setCustomValidity(`Please, provide the data of indicated type: ${notify}`);
    } else {
      input.setCustomValidity('');
    }
    input.reportValidity();
} 