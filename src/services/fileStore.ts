let currentFile: File | null = null;

export const setUploadedFile = async (file: File) => {
  currentFile = file;
  try {
    const text = await file.text();
    sessionStorage.setItem('cached_filename', file.name);
    sessionStorage.setItem('cached_filetext', text);
  } catch (e) {
    console.warn('Could not cache uploaded file in sessionStorage', e);
  }
};

export const getUploadedFile = (fallbackName?: string): File => {
  if (currentFile) {
    return currentFile;
  }

  // Check sessionStorage fallback
  try {
    const name = sessionStorage.getItem('cached_filename') || fallbackName || 'TokenVault.sol';
    const text = sessionStorage.getItem('cached_filetext') || `// Smart Contract Due Diligence Target\npragma solidity ^0.8.20;\n\ncontract TokenVault {\n    mapping(address => uint) public balances;\n    function withdraw() external {\n        (bool s, ) = msg.sender.call{value: balances[msg.sender]}("");\n        balances[msg.sender] = 0;\n    }\n}`;
    return new File([text], name, { type: 'text/plain' });
  } catch {
    const name = fallbackName || 'TokenVault.sol';
    return new File(['// Contract Content'], name, { type: 'text/plain' });
  }
};

export const clearUploadedFile = () => {
  currentFile = null;
  try {
    sessionStorage.removeItem('cached_filename');
    sessionStorage.removeItem('cached_filetext');
  } catch {}
};
